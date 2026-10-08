import { motionStill } from "~/scripts/motion";

/**
 * The All projects X-ray (pages/[locale]/work/index.astro): over a capture of a live site, a square inspector lens
 * shows the page's structure, its edges drawn in light on a blueprint grid, framed like a selection with corner ticks.
 * One canvas and one WebGL context for the whole page: it moves into the capture in play and leaves when it is done.
 * - A mouse or pen over a capture opens the lens, which follows it; leaving closes it.
 * - Touch screens: when a card reaches the middle of the screen it is in play (`.on`, the caption's own move) and a scan
 *   band passes down its capture once; keyboard focus inside a card sends one too.
 * Paused or reduced motion: the lens still follows the pointer (direct manipulation), but nothing moves on its own.
 * Without WebGL nothing changes: the captures stay as they are.
 */
const FRAG = `precision mediump float;
uniform sampler2D u_img;
uniform vec2 u_res;
uniform float u_px;
uniform vec4 u_rect;
uniform vec2 u_lens;
uniform vec2 u_half;
uniform vec2 u_band;
float lum(vec2 uv){return dot(texture2D(u_img,uv).rgb,vec3(.299,.587,.114));}
float box(vec2 p,vec2 b){vec2 d=abs(p)-b;return length(max(d,0.))+min(max(d.x,d.y),0.);}
void main(){
  vec2 px=gl_FragCoord.xy;
  vec3 ink=vec3(.06,.08,.42);
  vec3 ice=vec3(.93,.94,1.);
  vec3 lime=vec3(.79,.95,.29);
  float on=step(.5,u_half.x);
  float sd=box(px-u_lens,u_half);
  float lens=on*(1.-smoothstep(-.75,.75,sd));
  float band=step(.5,u_band.y)*(1.-smoothstep(-.75,.75,abs(px.y-u_band.x)-u_band.y));
  float k=max(lens,band);
  float frame=on*(1.-smoothstep(.5*u_px,.5*u_px+1.,abs(sd)));
  vec2 c=abs(px-u_lens)-u_half;
  float tl=10.*u_px,gap=4.*u_px,th=1.5*u_px;
  float tick=on*max(
    step(gap,c.x)*step(c.x,gap+th)*step(-tl,c.y)*step(c.y,gap+th),
    step(gap,c.y)*step(c.y,gap+th)*step(-tl,c.x)*step(c.x,gap+th));
  float lead=step(.5,u_band.y)*(1.-smoothstep(.5*u_px,1.5*u_px,abs(px.y-(u_band.x-u_band.y))));
  float f=max(max(frame,tick),lead);
  if(k<.004&&f<.004){gl_FragColor=vec4(0.);return;}
  vec2 uv=(px-u_rect.xy)/u_rect.zw;
  uv.y=1.-uv.y;
  vec2 st=1.3/u_rect.zw;
  float a=lum(uv+st*vec2(-1,-1)),b=lum(uv+st*vec2(0,-1)),d=lum(uv+st*vec2(1,-1));
  float l=lum(uv+st*vec2(-1,0)),r=lum(uv+st*vec2(1,0));
  float e=lum(uv+st*vec2(-1,1)),g=lum(uv+st*vec2(0,1)),h=lum(uv+st*vec2(1,1));
  float gx=(d+2.*r+h)-(a+2.*l+e);
  float gy=(e+2.*g+h)-(a+2.*b+d);
  float inside=step(0.,uv.x)*step(uv.x,1.)*step(0.,uv.y)*step(uv.y,1.);
  float edge=smoothstep(.1,.32,length(vec2(gx,gy)))*inside;
  vec2 gp=abs(fract((px-u_rect.xy)/(16.*u_px)-.5)-.5)*16.*u_px;
  float grid=1.-smoothstep(0.,1.,min(gp.x,gp.y));
  vec3 col=ink+ice*grid*.12;
  col=mix(col,ice,edge*.95);
  vec3 outc=lime*f+col*k*(1.-f);
  gl_FragColor=vec4(outc,f+k*(1.-f));
}`;

function createLens(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", {
    antialias: false,
    premultipliedAlpha: true,
    powerPreference: "low-power",
    failIfMajorPerformanceCaveat: true,
  });
  if (!gl) return null;
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
    if (import.meta.env.DEV) console.warn(gl.getShaderInfoLog(shader));
    return null;
  };
  const vs = compile(gl.VERTEX_SHADER, "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}");
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
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
  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  // Captures are not powers of two: no mipmaps, clamped edges.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const u = (name: string) => gl.getUniformLocation(program, name);
  const uRes = u("u_res");
  const uPx = u("u_px");
  const uRect = u("u_rect");
  const uLens = u("u_lens");
  const uHalf = u("u_half");
  const uBand = u("u_band");
  return {
    upload(image: HTMLImageElement) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    },
    /** Lengths in CSS px from the canvas's bottom-left corner. */
    draw(rect: [number, number, number, number], lens: [number, number], half: number, band: [number, number]) {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * ratio));
      const h = Math.max(1, Math.round(canvas.clientHeight * ratio));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uPx, ratio);
      gl.uniform4f(uRect, rect[0] * ratio, rect[1] * ratio, rect[2] * ratio, rect[3] * ratio);
      gl.uniform2f(uLens, lens[0] * ratio, lens[1] * ratio);
      gl.uniform2f(uHalf, half * ratio, half * ratio);
      gl.uniform2f(uBand, band[0] * ratio, band[1] * ratio);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}

const views = [...document.querySelectorAll<HTMLElement>("[data-xray]")];
const canvas = document.createElement("canvas");
canvas.className = "xr";
canvas.setAttribute("aria-hidden", "true");
let lens: ReturnType<typeof createLens> | undefined;
let host: HTMLElement | null = null;
let image: HTMLImageElement | null = null;
let raf = 0;
let hovering = false;
const s = { x: 0, y: 0, tx: 0, ty: 0, half: 0, halfTo: 0, scanAt: -1 };
const SCAN_MS = 1500;

/** Where the capture's picture really is: object-fit cover, placed by its object-position (a long page pans with it). */
function pictureRect(img: HTMLImageElement, frame: DOMRect): [number, number, number, number] {
  const box = img.getBoundingClientRect();
  const scale = Math.max(box.width / img.naturalWidth, box.height / img.naturalHeight);
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  const [x, y] = getComputedStyle(img).objectPosition.split(" ");
  const at = (value: string | undefined, free: number) =>
    value?.endsWith("%") ? (parseFloat(value) / 100) * free : parseFloat(value ?? "0") || 0;
  const left = box.left + at(x, box.width - w);
  const top = box.top + at(y, box.height - h);
  return [left - frame.left, frame.bottom - (top + h), w, h];
}

/** Moves the canvas into a capture and loads its picture; false when it can't (no WebGL, no picture yet). */
function attach(view: HTMLElement) {
  if (host === view) return !!lens && !!image;
  const img = view.querySelector("img");
  if (!img) return false;
  lens ??= createLens(canvas);
  if (!lens) return false;
  host = view;
  image = null;
  view.append(canvas);
  const ready = () => {
    if (host !== view || !lens) return;
    lens.upload(img);
    image = img;
    kick();
  };
  if (img.complete && img.naturalWidth) ready();
  else img.addEventListener("load", ready, { once: true });
  return true;
}

function detach() {
  canvas.remove();
  host = null;
  image = null;
}

function frame(now: number) {
  raf = 0;
  if (!host || !lens) return;
  const still = motionStill();
  const k = still ? 1 : 0.3;
  s.x += (s.tx - s.x) * k;
  s.y += (s.ty - s.y) * k;
  s.half += (s.halfTo - s.half) * (still ? 1 : 0.22);
  const scanning = s.scanAt >= 0 && now - s.scanAt < SCAN_MS;
  if (!hovering && s.half < 0.5 && !scanning) {
    s.scanAt = -1;
    detach();
    return;
  }
  if (image) {
    const view = host.getBoundingClientRect();
    let band: [number, number] = [0, 0];
    if (scanning) {
      const t = (now - s.scanAt) / SCAN_MS;
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const half = view.height * 0.09;
      band = [view.height + half - eased * (view.height + half * 2), half];
    }
    lens.draw(pictureRect(image, view), [s.x, s.y], s.half > 0.5 ? s.half : 0, band);
  }
  raf = requestAnimationFrame(frame);
}
function kick() {
  if (!raf) raf = requestAnimationFrame(frame);
}

/** One scan band down the capture (touch and keyboard); never under paused or reduced motion. */
function scan(view: HTMLElement) {
  if (motionStill() || hovering) return;
  if (host && host !== view) {
    s.half = s.halfTo = 0;
    detach();
  }
  if (!attach(view)) return;
  s.scanAt = performance.now();
  kick();
}

for (const view of views) {
  const place = (event: PointerEvent) => {
    const box = view.getBoundingClientRect();
    s.tx = event.clientX - box.left;
    s.ty = box.bottom - event.clientY;
  };
  view.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "touch") return;
    if (host && host !== view) detach();
    if (!attach(view)) return;
    hovering = true;
    s.scanAt = -1;
    place(event);
    s.x = s.tx;
    s.y = s.ty;
    const box = view.getBoundingClientRect();
    s.halfTo = Math.max(52, Math.min(120, Math.min(box.width, box.height) * 0.24));
    kick();
  });
  view.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch" || host !== view) return;
    place(event);
    kick();
  });
  view.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "touch") return;
    hovering = false;
    s.halfTo = 0;
    kick();
  });
  // Keyboard focus inside the card: one scan.
  view.closest("[data-wk]")?.addEventListener("focusin", (event) => {
    if ((event.target as Element).matches(":focus-visible")) scan(view);
  });
}

// Touch screens: the card in the middle of the screen is in play; its capture gets one scan per visit.
const cards = [...document.querySelectorAll<HTMLElement>("[data-wk]")];
if (matchMedia("(hover: none)").matches && cards.length) {
  const seen = new WeakMap<HTMLElement, number>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const card = entry.target as HTMLElement;
        card.classList.toggle("on", entry.isIntersecting && !motionStill());
        if (!entry.isIntersecting) continue;
        const view = card.querySelector<HTMLElement>("[data-xray]");
        const last = seen.get(card) ?? -1e9;
        if (view && performance.now() - last > 8000) {
          seen.set(card, performance.now());
          scan(view);
        }
      }
    },
    { rootMargin: "-42% 0px -42% 0px" },
  );
  for (const card of cards) io.observe(card);
}
