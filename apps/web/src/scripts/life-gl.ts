/**
 * A tiny fragment-shader runner for the My life page (no library): one triangle that covers the canvas and a few
 * uniforms (u_res, u_time, u_mouse 0..1 with y up, u_burst 1 → 0 after a click). It draws only while its canvas is
 * in view and motion is on, at a capped pixel ratio; paused or under reduced motion it draws one still frame. Returns
 * null without WebGL, so the CSS painted behind the canvas stays.
 */
import { motionStill, onMotion } from "~/scripts/motion";

interface Options {
  /** The element whose pointer moves u_mouse (default: the canvas). */
  pointer?: HTMLElement;
  /** Device-pixel cap; shaders are cheap to look at, not to run. */
  dpr?: number;
  /** Where the pointer rests before it moves. */
  rest?: [number, number];
}

export function runShader(canvas: HTMLCanvasElement, frag: string, options: Options = {}) {
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) return null;
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  };
  const vs = compile(gl.VERTEX_SHADER, "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}");
  const fs = compile(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return null;
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = (name: string) => gl.getUniformLocation(program, name);
  const uRes = u("u_res");
  const uTime = u("u_time");
  const uMouse = u("u_mouse");
  const uBurst = u("u_burst");

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
      gl.viewport(0, 0, w, h);
    }
  };
  const start = performance.now();
  let raf = 0;
  let visible = false;
  const draw = (now: number) => {
    size();
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    burst *= 0.95;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, (now - start) / 1000);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uBurst, burst);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    canvas.classList.add("on");
  };
  const loop = (now: number) => {
    raf = 0;
    draw(now);
    if (visible && !motionStill() && !document.hidden) raf = requestAnimationFrame(loop);
  };
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(loop);
  };
  new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting;
    if (visible) kick();
  }).observe(canvas);
  new ResizeObserver(() => kick()).observe(canvas);
  onMotion(() => kick());
  document.addEventListener("visibilitychange", () => kick());
  // Paused, a click or a move still updates the one frame.
  target.addEventListener("pointermove", () => motionStill() && kick());
  return { kick };
}
