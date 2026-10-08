import { PRECISION, quadProgram } from "~/scripts/gl-quad";
import { motionStill, onMotion } from "~/scripts/motion";

/**
 * The footer's background on every page [user 2026-10-09: "the not colorful version of the shader can be put on
 * footer in all places ... as long as its subtle, performant and just in the background"]: the contour lines that
 * were the All projects head, in the bar's own blues, faint, fading out under the say-line and the link columns. A
 * mouse raises a low hill under itself and the scroll slides the map. One fragment shader, no library; lines are
 * anti-aliased with screen-space derivatives and fade where they would crowd into moiré.
 * The footer's script loads this module only once the footer is near the screen and the reader has interacted, so
 * no page pays for it on load. It draws only while the footer is in view, ~20 fps when nobody moves. Paused or
 * reduced motion: one still frame, redrawn only when the pointer moves. Without WebGL the plain bar stays.
 */
const FRAG = `#extension GL_OES_standard_derivatives : enable
${PRECISION}uniform vec2 u_res;
uniform float u_px;
uniform float u_time;
uniform float u_scroll;
uniform vec2 u_mouse;
uniform float u_hill;
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
  for(int k=0;k<3;k++){s+=a*n(p);p=mat2(1.6,1.2,-1.2,1.6)*p;a*=.5;}
  return s;
}
void main(){
  vec2 px=gl_FragCoord.xy/u_px;
  vec2 p=px/430.+vec2(0.,u_scroll/1500.);
  float t=u_time*.03;
  vec2 q=vec2(fbm(p+vec2(t,0.)),fbm(p+vec2(3.1,1.7)-t));
  float h=fbm(p+1.35*q);
  vec2 m=(px-u_mouse)/190.;
  float near=exp(-dot(m,m));
  h+=u_hill*.24*near;
  float v=h*11.;
  float w=length(vec2(dFdx(v),dFdy(v)));
  float d=abs(fract(v+.5)-.5)/max(w,1e-4);
  float idx=1.-step(.5,mod(floor(v+.5),5.));
  float lw=mix(.5,1.,idx)*u_px;
  float line=clamp(lw+.5-d,0.,1.)*(1.-smoothstep(.22,.55,w));
  vec3 col=mix(vec3(.3,.36,1.),vec3(.93,.94,1.),idx*.45);
  float a=line*mix(.2,.34,idx)*(1.+.7*u_hill*near);
  a*=smoothstep(1.,.62,gl_FragCoord.y/u_res.y);
  gl_FragColor=vec4(mix(vec3(.039,.051,.2),col,a),1.);
}`;

export function startFooterField(host: HTMLElement) {
  const canvas = host.querySelector<HTMLCanvasElement>("[data-contour-canvas]");
  // A restored context (after iOS dropped it) draws again.
  const quad = canvas && quadProgram(canvas, FRAG, ["OES_standard_derivatives"], () => kick());
  if (!canvas || !quad) return;
  const { gl, ready, failed, size, u, draw } = quad;
  // Thin lines want real pixels; a faint background doesn't need more than 1.25 of them.
  const ratio = () => Math.min(window.devicePixelRatio || 1, matchMedia("(pointer: coarse)").matches ? 1 : 1.25);

  let visible = true;
  let raf = 0;
  let last = 0;
  let clock = (performance.now() % 1000) / 10;
  let movedAt = -1e9;
  let echo = false;
  // Positions in CSS px from the canvas's bottom-left corner (the shader's frame).
  const s = { mx: -9999, my: -9999, tx: -9999, ty: -9999, hill: 0, hillTo: 0, scroll: scrollY };

  const frame = (now: number) => {
    raf = 0;
    // Still compiling in the background: look again next frame (a failed program leaves the plain bar).
    if (!ready()) {
      if (!failed()) raf = requestAnimationFrame(frame);
      return;
    }
    const still = motionStill();
    const busy = now - movedAt < 1500 || Math.abs(s.hill - s.hillTo) > 0.01;
    if (!still && !busy && now - last < 48) {
      raf = requestAnimationFrame(frame);
      return;
    }
    const dt = Math.min(0.1, (now - (last || now)) / 1000);
    last = now;
    // Paused or reduced motion: the map stays put while the page scrolls.
    if (!still) {
      clock += dt;
      s.scroll = scrollY;
    }
    const k = still ? 1 : 1 - Math.pow(0.0005, dt);
    s.mx += (s.tx - s.mx) * k;
    s.my += (s.ty - s.my) * k;
    s.hill += (s.hillTo - s.hill) * (still ? 1 : 1 - Math.pow(0.05, dt));
    const r = ratio();
    size(Math.max(1, Math.round(canvas.clientWidth * r)), Math.max(1, Math.round(canvas.clientHeight * r)));
    gl.uniform2f(u("u_res"), canvas.width, canvas.height);
    gl.uniform1f(u("u_px"), r);
    gl.uniform1f(u("u_time"), clock);
    gl.uniform1f(u("u_scroll"), s.scroll);
    gl.uniform2f(u("u_mouse"), s.mx, s.my);
    gl.uniform1f(u("u_hill"), s.hill);
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
  function kick() {
    if (!raf) raf = requestAnimationFrame(frame);
  }

  host.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    const box = canvas.getBoundingClientRect();
    s.tx = event.clientX - box.left;
    s.ty = box.bottom - event.clientY;
    if (s.mx < -9000) {
      s.mx = s.tx;
      s.my = s.ty;
    }
    s.hillTo = 1;
    movedAt = performance.now();
    kick();
  });
  host.addEventListener("pointerleave", () => {
    s.hillTo = 0;
    kick();
  });
  addEventListener("scroll", () => visible && kick(), { passive: true });
  new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting;
    kick();
  }).observe(host);
  new ResizeObserver(() => kick()).observe(canvas);
  onMotion(() => kick());
  document.addEventListener("visibilitychange", () => kick());
  kick();
}
