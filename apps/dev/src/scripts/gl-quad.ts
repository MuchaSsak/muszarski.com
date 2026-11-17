/**
 * One fragment shader over one triangle that covers the canvas (the footer's contour lines, the All projects head's
 * dither field). Returns null without WebGL, on a software renderer (`failIfMajorPerformanceCaveat`) or without a needed
 * extension, so the CSS painted under the canvas stays.
 * - The program compiles in the background where the browser can (`KHR_parallel_shader_compile`): `ready()` stays
 *   false, and nothing is drawn, until it is linked. Reading the link status at once can block the page for a long
 *   moment on Windows (life-gl.ts found ~1 s for a big program).
 * - A lost context (iOS drops them in background tabs) takes the canvas's `on` class away, so the CSS shows again; a
 *   restored one compiles the program again and calls `onRestored` so the caller draws.
 * - Shaders start with `PRECISION` (high where the GPU has it): a bare `mediump` is fp16 on Apple GPUs.
 */
const COMPLETION_STATUS_KHR = 0x91b1;

export const PRECISION = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
`;

export function quadProgram(canvas: HTMLCanvasElement, frag: string, extensions: string[] = [], onRestored?: () => void) {
  const gl = canvas.getContext("webgl", {
    antialias: false,
    alpha: false,
    powerPreference: "low-power",
    failIfMajorPerformanceCaveat: true,
  });
  if (!gl || extensions.some((name) => !gl.getExtension(name))) return null;
  let program: WebGLProgram | null = null;
  let state: "pending" | "ok" | "failed" = "pending";
  let background = false;
  const locations = new Map<string, WebGLUniformLocation | null>();

  const build = () => {
    for (const name of extensions) gl.getExtension(name);
    background = !!gl.getExtension("KHR_parallel_shader_compile");
    locations.clear();
    program = gl.createProgram();
    state = program ? "pending" : "failed";
    if (!program) return;
    for (const [type, source] of [
      [gl.VERTEX_SHADER, "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}"],
      [gl.FRAGMENT_SHADER, frag],
    ] as const) {
      const shader = gl.createShader(type);
      if (!shader) {
        state = "failed";
        return;
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      gl.attachShader(program, shader);
    }
    gl.bindAttribLocation(program, 0, "p");
    gl.linkProgram(program);
  };
  build();

  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    state = "failed";
    canvas.classList.remove("on");
  });
  canvas.addEventListener("webglcontextrestored", () => {
    build();
    onRestored?.();
  });

  /** True once the program is linked and in use; false while it compiles, or for good when it failed. */
  const ready = () => {
    if (state !== "pending" || !program) return state === "ok";
    if (background && !gl.getProgramParameter(program, COMPLETION_STATUS_KHR)) return false;
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      if (import.meta.env.DEV) console.warn(gl.getProgramInfoLog(program));
      state = "failed";
      return false;
    }
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    state = "ok";
    return true;
  };
  /** Sizes the drawing buffer to `w` × `h` device px (only when it changed). */
  const size = (w: number, h: number) => {
    if (canvas.width === w && canvas.height === h) return;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
  };
  return {
    gl,
    ready,
    failed: () => state === "failed",
    size,
    /** A uniform's location, looked up once per program. */
    u: (name: string) => {
      if (!locations.has(name) && program) locations.set(name, gl.getUniformLocation(program, name));
      return locations.get(name) ?? null;
    },
    draw: () => gl.drawArrays(gl.TRIANGLES, 0, 3),
  };
}
