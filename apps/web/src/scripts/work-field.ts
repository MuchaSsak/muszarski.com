import { PRECISION, quadProgram } from "~/scripts/gl-quad";
import { afterInteraction, motionStill, onMotion } from "~/scripts/motion";

/**
 * The All projects head (components/work/WorkHero.astro) [user 2026-10-09: the background "more colorful slightly",
 * "a bit different and better looking" than the contour lines, which moved to the footer]: a slow cloud of colour
 * printed as an ordered dither, like a screen print. Four inks (night, indigo, cobalt and an accent) are picked per
 * cell through an 8×8 Bayer matrix, so the gradient breaks into crisp square dots. The colour gathers behind the wall
 * of projects (its centre and size come from the wall's box) and stays dark behind the title; a mouse brings a glow
 * with it, and hovering or focusing a project washes the accent in that project's colour.
 * The canvas has one pixel per dither cell (3 CSS px) and the browser scales it up without smoothing: a few thousand
 * times cheaper than full resolution and sharp on every screen. It starts at the first interaction or a pointer over
 * the head, runs only while in view, ~30 fps. Paused or reduced motion: one still frame. Without WebGL: the CSS glow.
 */
const FRAG = `${PRECISION}uniform vec2 u_res;
uniform float u_time;
uniform float u_scroll;
uniform vec2 u_mouse;
uniform float u_glow;
uniform vec3 u_focus;
uniform vec3 u_tint;
uniform float u_wash;
vec2 g(vec2 p){
  p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));
  return fract(sin(p)*43758.5453)*2.-1.;
}
float n(vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(dot(g(i),f),dot(g(i+vec2(1,0)),f-vec2(1,0)),u.x),
             mix(dot(g(i+vec2(0,1)),f-vec2(0,1)),dot(g(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float s=0.,a=.5;
  for(int k=0;k<4;k++){s+=a*n(p);p=mat2(1.6,1.2,-1.2,1.6)*p;a*=.5;}
  return s;
}
float b2(vec2 a){a=floor(a);return fract(a.x*.5+a.y*a.y*.75);}
float b8(vec2 a){return (b2(.25*a)*.25+b2(.5*a))*.25+b2(a);}
void main(){
  vec2 c=gl_FragCoord.xy;
  vec2 p=c/90.+vec2(0.,u_scroll/240.);
  float t=u_time*.06;
  vec2 q=vec2(fbm(p+vec2(t,0.)),fbm(p+vec2(5.2,1.3)-t*.8));
  float f=fbm(p+1.7*q+vec2(0.,t*.5))*1.7+.5;
  vec2 d=(c-u_focus.xy)/u_focus.z;
  float focus=exp(-dot(d,d)*1.6);
  vec2 m=(c-u_mouse)/45.;
  float glow=u_glow*exp(-dot(m,m));
  float v=clamp(f*(.16+1.08*focus)+.4*glow-.05,0.,1.);
  float warm=smoothstep(.35,.65,fbm(p*.6-q+vec2(t*.4,7.))+.5);
  vec3 ink=mix(mix(vec3(1.,.31,.722),vec3(1.,.357,.122),warm*.8),u_tint,u_wash);
  float x=v*3.+b8(c)-.5;
  float l=clamp(floor(x+.5),0.,3.);
  vec3 col=l<.5?vec3(.027,.031,.11):l<1.5?vec3(.078,.098,.33):l<2.5?vec3(.141,.2,1.):ink;
  gl_FragColor=vec4(col,1.);
}`;

const CELL = 3;
const rgb = (hex: string): [number, number, number] =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];

function setup(host: HTMLElement) {
  const canvas = host.querySelector<HTMLCanvasElement>("[data-field]");
  const wall = host.querySelector<HTMLElement>("[data-wall]");
  if (!canvas) return;
  let quad: ReturnType<typeof quadProgram> | undefined;
  let started = false;
  let visible = false;
  let raf = 0;
  let last = 0;
  let movedAt = -1e9;
  let echo = false;
  let clock = (performance.now() % 1000) / 10;
  // Positions in dither cells from the canvas's bottom-left corner (the shader's frame).
  const s = {
    scroll: scrollY,
    mx: -9999,
    my: -9999,
    tx: -9999,
    ty: -9999,
    glow: 0,
    glowTo: 0,
    tint: [1, 0.31, 0.722] as [number, number, number],
    tintTo: [1, 0.31, 0.722] as [number, number, number],
    wash: 0,
    washTo: 0,
  };

  const frame = (now: number) => {
    raf = 0;
    if (!quad) return;
    // Still compiling in the background: look again next frame (a failed program leaves the CSS glow).
    if (!quad.ready()) {
      if (!quad.failed()) raf = requestAnimationFrame(frame);
      return;
    }
    const still = motionStill();
    const busy = now - movedAt < 1500 || Math.abs(s.wash - s.washTo) > 0.01 || Math.abs(s.glow - s.glowTo) > 0.01;
    if (!still && !busy && now - last < 30) {
      raf = requestAnimationFrame(frame);
      return;
    }
    const dt = Math.min(0.1, (now - (last || now)) / 1000);
    last = now;
    if (!still) {
      clock += dt;
      s.scroll = scrollY;
    }
    const k = still ? 1 : 1 - Math.pow(0.002, dt);
    const ease = still ? 1 : 1 - Math.pow(0.03, dt);
    s.mx += (s.tx - s.mx) * k;
    s.my += (s.ty - s.my) * k;
    s.glow += (s.glowTo - s.glow) * ease;
    s.wash += (s.washTo - s.wash) * ease;
    for (let i = 0; i < 3; i++) s.tint[i]! += (s.tintTo[i]! - s.tint[i]!) * ease;

    const { gl, size, u, draw } = quad;
    const box = canvas.getBoundingClientRect();
    size(Math.max(1, Math.ceil(box.width / CELL)), Math.max(1, Math.ceil(box.height / CELL)));
    // The colour gathers behind the wall: its centre, and a radius of about half its larger side.
    const w = wall?.getBoundingClientRect();
    const focus: [number, number, number] = w
      ? [
          (w.left + w.width / 2 - box.left) / CELL,
          (box.bottom - w.top - w.height / 2) / CELL,
          Math.max(w.width, w.height) / CELL / 1.6,
        ]
      : [(box.width * 0.75) / CELL, (box.height * 0.5) / CELL, (box.width * 0.3) / CELL];
    gl.uniform2f(u("u_res"), canvas.width, canvas.height);
    gl.uniform1f(u("u_time"), clock);
    gl.uniform1f(u("u_scroll"), s.scroll / CELL);
    gl.uniform2f(u("u_mouse"), s.mx, s.my);
    gl.uniform1f(u("u_glow"), s.glow);
    gl.uniform3f(u("u_focus"), ...focus);
    gl.uniform3f(u("u_tint"), ...s.tint);
    gl.uniform1f(u("u_wash"), s.wash);
    draw();
    canvas.classList.add("on");
    // WebKit shows a frame drawn on demand one draw late: a still frame is drawn twice.
    if (visible && !still && !document.hidden) raf = requestAnimationFrame(frame);
    else if (still && !echo) {
      echo = true;
      raf = requestAnimationFrame(frame);
      return;
    }
    echo = false;
  };
  const kick = () => {
    if (started && quad && !raf) raf = requestAnimationFrame(frame);
  };
  const start = () => {
    if (started) return;
    started = true;
    // A restored context (after iOS dropped it) draws again.
    quad = quadProgram(canvas, FRAG, [], kick);
    kick();
  };

  host.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    start();
    const box = canvas.getBoundingClientRect();
    s.tx = (event.clientX - box.left) / CELL;
    s.ty = (box.bottom - event.clientY) / CELL;
    if (s.mx < -9000) {
      s.mx = s.tx;
      s.my = s.ty;
    }
    s.glowTo = 1;
    movedAt = performance.now();
    kick();
  });
  host.addEventListener("pointerleave", () => {
    s.glowTo = 0;
    kick();
  });
  addEventListener("scroll", () => visible && kick(), { passive: true });

  // A project in play (hovered or focused) washes the accent ink in its colour.
  for (const link of host.querySelectorAll<HTMLElement>("[data-tint]")) {
    const on = () => {
      s.tintTo = rgb(link.dataset.tint ?? "#ff4fb8");
      s.washTo = 1;
      movedAt = performance.now();
      kick();
    };
    const off = () => {
      s.washTo = 0;
      kick();
    };
    link.addEventListener("pointerenter", on);
    link.addEventListener("pointerleave", off);
    link.addEventListener("focus", on);
    link.addEventListener("blur", off);
  }

  new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting;
    if (visible) afterInteraction(start);
    kick();
  }).observe(host);
  new ResizeObserver(() => kick()).observe(canvas);
  onMotion(() => kick());
  document.addEventListener("visibilitychange", () => kick());
}

for (const host of document.querySelectorAll<HTMLElement>("[data-field-host]")) setup(host);

/**
 * The wall leans toward a mouse (a degree or two, on its wrapper only) [user 2026-10-08: "very micro hover effects"].
 */
for (const wall of document.querySelectorAll<HTMLElement>("[data-wall]")) {
  const host = wall.closest<HTMLElement>("[data-field-host]") ?? wall;
  let raf = 0;
  host.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || motionStill() || raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const box = host.getBoundingClientRect();
      wall.style.setProperty("--lx", ((event.clientX - box.left) / box.width - 0.5).toFixed(3));
      wall.style.setProperty("--ly", ((event.clientY - box.top) / box.height - 0.5).toFixed(3));
    });
  });
  host.addEventListener("pointerleave", () => {
    wall.style.removeProperty("--lx");
    wall.style.removeProperty("--ly");
  });
}

// A tap on a title sends one thin wave through its letters (the touch twin of the letters' hover, `HoverType`).
for (const title of document.querySelectorAll<HTMLElement>("[data-ht-tap]")) {
  let timer = 0;
  title.addEventListener("click", () => {
    if (motionStill()) return;
    title.style.setProperty("--ht-run", "none");
    void title.offsetWidth;
    title.style.setProperty("--ht-run", "ht-wave");
    clearTimeout(timer);
    timer = window.setTimeout(() => title.style.removeProperty("--ht-run"), 1800);
  });
}
