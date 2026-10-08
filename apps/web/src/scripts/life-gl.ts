/**
 * A tiny fragment-shader runner for the My life page (no library): one triangle that covers the canvas and a few
 * uniforms (u_res, u_time, u_mouse 0..1 with y up, u_burst 1 → 0 after a click), plus the caller's own through
 * `frame` (the hobby prints set their scenes and inks there, and draw their own passes first in `prepare`). It draws
 * only while its canvas is in view and motion is on, at a capped pixel ratio; paused or under reduced motion it draws
 * one still frame. Returns null without WebGL or on a software renderer, so the CSS painted behind the canvas stays.
 * - Programs compile in the background where the browser can (`KHR_parallel_shader_compile`); nothing is drawn, and the
 *   CSS stays, until they are ready. Reading a big program's link status at once froze the page for ~1 s on Windows.
 * - A lost context (iOS drops them in background tabs) hides the canvas; a restored one is built again.
 */
import { motionStill, onMotion } from "~/scripts/motion";

/** Sets a float uniform (1-4 values) by name; the prints use it for their scenes and inks. */
export type SetUniform = (name: string, ...values: number[]) => void;

/** A linked program, or one the browser still compiles. */
export interface Program {
  /** "pending" while the browser compiles in the background (never blocks then), else "ok" or "failed". */
  status(): "pending" | "ok" | "failed";
  use(): void;
  set: SetUniform;
  /** Sets an int uniform: a sampler's texture unit. */
  int(name: string, value: number): void;
}

interface Options {
  /** The element whose pointer moves u_mouse (default: the canvas). */
  pointer?: HTMLElement;
  /** Device-pixel cap; shaders are cheap to look at, not to run. */
  dpr?: number;
  /** Where the pointer rests before it moves. */
  rest?: [number, number];
  /** Runs once the context exists, and again after a lost context comes back: makes the caller's own programs. */
  setup?: (gl: WebGLRenderingContext) => void;
  /** Runs before every draw, for passes of its own; false skips the draw while its programs still compile. */
  prepare?: (gl: WebGLRenderingContext, now: number) => boolean;
  /** Runs before every draw, after the shared uniforms, so it can add its own or override u_time. */
  frame?: (set: SetUniform, now: number, program: Program) => void;
}

const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
const COMPLETION_STATUS_KHR = 0x91b1;

/** Whether programs compile off the main thread here (Chrome, Edge, Safari; not Firefox). */
export const compilesInBackground = (gl: WebGLRenderingContext) => !!gl.getExtension("KHR_parallel_shader_compile");

/** Starts compiling a program; the full-screen triangle is attribute 0 in every program. */
export function makeProgram(gl: WebGLRenderingContext, frag: string): Program {
  const background = compilesInBackground(gl);
  const program = gl.createProgram();
  const shader = (type: number, source: string) => {
    const made = gl.createShader(type);
    if (!made || !program) return;
    gl.shaderSource(made, source);
    gl.compileShader(made);
    gl.attachShader(program, made);
    return made;
  };
  shader(gl.VERTEX_SHADER, VERT);
  const fs = shader(gl.FRAGMENT_SHADER, frag);
  if (program) {
    gl.bindAttribLocation(program, 0, "p");
    gl.linkProgram(program);
  }
  let state: "pending" | "ok" | "failed" = program && fs ? "pending" : "failed";
  const locations = new Map<string, WebGLUniformLocation | null>();
  const at = (name: string) => {
    if (!locations.has(name)) locations.set(name, gl.getUniformLocation(program!, name));
    return locations.get(name) ?? null;
  };
  return {
    status() {
      if (state !== "pending") return state;
      if (background && !gl.getProgramParameter(program!, COMPLETION_STATUS_KHR)) return state;
      state = gl.getProgramParameter(program!, gl.LINK_STATUS) ? "ok" : "failed";
      if (state === "failed" && import.meta.env.DEV) console.warn(gl.getShaderInfoLog(fs!), gl.getProgramInfoLog(program!));
      return state;
    },
    use: () => gl.useProgram(program),
    set(name, ...values) {
      const loc = at(name);
      if (values.length === 4) gl.uniform4f(loc, values[0]!, values[1]!, values[2]!, values[3]!);
      else if (values.length === 3) gl.uniform3f(loc, values[0]!, values[1]!, values[2]!);
      else if (values.length === 2) gl.uniform2f(loc, values[0]!, values[1]!);
      else gl.uniform1f(loc, values[0] ?? 0);
    },
    int: (name, value) => gl.uniform1i(at(name), value),
  };
}

export function runShader(canvas: HTMLCanvasElement, frag: string, options: Options = {}) {
  const gl = canvas.getContext("webgl", {
    antialias: false,
    alpha: false,
    powerPreference: "low-power",
    failIfMajorPerformanceCaveat: true,
  });
  if (!gl) return null;
  let main: Program;
  const build = () => {
    main = makeProgram(gl, frag);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    options.setup?.(gl);
  };
  build();

  const rest = options.rest ?? [0.5, 0.5];
  const mouse = { x: rest[0], y: rest[1], tx: rest[0], ty: rest[1] };
  let burst = 0;
  const target = options.pointer ?? canvas;
  target.addEventListener("pointermove", (event) => {
    const box = canvas.getBoundingClientRect();
    mouse.tx = (event.clientX - box.left) / box.width;
    mouse.ty = 1 - (event.clientY - box.top) / box.height;
  });
  target.addEventListener("pointerleave", () => {
    mouse.tx = rest[0];
    mouse.ty = rest[1];
  });
  target.addEventListener("pointerdown", () => (burst = 1));

  const size = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, options.dpr ?? 1.5);
    const w = Math.max(1, Math.round(canvas.clientWidth * ratio));
    const h = Math.max(1, Math.round(canvas.clientHeight * ratio));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  };
  const start = performance.now();
  let raf = 0;
  let visible = false;
  let lost = false;
  /** Draws a frame; true while the programs still compile, so the loop looks again next frame. */
  const draw = (now: number) => {
    size();
    const state = main.status();
    if (state === "failed") return false;
    if (state === "pending" || options.prepare?.(gl, now) === false) return true;
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    burst *= 0.95;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    main.use();
    main.set("u_res", canvas.width, canvas.height);
    main.set("u_time", (now - start) / 1000);
    main.set("u_mouse", mouse.x, mouse.y);
    main.set("u_burst", burst);
    options.frame?.(main.set, now, main);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    canvas.classList.add("on");
    return false;
  };
  // WebKit shows a frame drawn on demand one draw late (a pick showed the print before it): a still frame is drawn
  // twice, on two frames in a row.
  let settle = 0;
  const loop = (now: number) => {
    raf = 0;
    if (lost) return;
    const compiling = draw(now);
    if (compiling || (visible && !motionStill() && !document.hidden) || settle-- > 0) raf = requestAnimationFrame(loop);
  };
  const kick = () => {
    settle = 1;
    if (!raf && !lost) raf = requestAnimationFrame(loop);
  };
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    lost = true;
    cancelAnimationFrame(raf);
    raf = 0;
    canvas.classList.remove("on");
  });
  canvas.addEventListener("webglcontextrestored", () => {
    lost = false;
    build();
    kick();
  });
  new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting;
    if (visible) kick();
  }).observe(canvas);
  new ResizeObserver(() => kick()).observe(canvas);
  onMotion(() => kick());
  document.addEventListener("visibilitychange", () => kick());
  // Paused, a click or a move still updates the one frame.
  target.addEventListener("pointermove", () => motionStill() && kick());
  return { kick, gl };
}
