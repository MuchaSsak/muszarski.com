import { afterInteraction, motionStill, onMotion } from "~/scripts/motion";

/**
 * The All projects head (components/work/WorkHero.astro): contour lines of a slowly warping height field, like a map
 * at night. The pointer raises a hill under itself (the lines crowd around it and take the accent), a tap or click
 * sends a ripple out, the scroll slides the map, and hovering or focusing a name in the index washes the lines in
 * that project's colour. One fragment shader, no library; lines are anti-aliased with screen-space derivatives
 * (OES_standard_derivatives) and fade where they would crowd into moiré. It starts at the first interaction (or a
 * pointer over the head), runs only while in view, at ~30 fps when nobody moves and at full rate while they do.
 * Paused or reduced motion: no drift, a frame only when the pointer moves. Without WebGL the CSS rings stay.
 */
const FRAG = `#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform vec2 u_res;
uniform float u_px;
uniform float u_time;
uniform float u_scroll;
uniform vec2 u_mouse;
uniform float u_hill;
uniform vec3 u_drop;
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
  for(int k=0;k<3;k++){s+=a*n(p);p=mat2(1.6,1.2,-1.2,1.6)*p;a*=.5;}
  return s;
}
void main(){
  vec2 px=gl_FragCoord.xy/u_px;
  vec2 p=px/430.+vec2(0.,u_scroll/1500.);
  float t=u_time*.035;
  vec2 q=vec2(fbm(p+vec2(t,0.)),fbm(p+vec2(3.1,1.7)-t));
  float h=fbm(p+1.35*q);
  vec2 m=(px-u_mouse)/170.;
  float near=exp(-dot(m,m));
  h+=u_hill*.3*near;
  float dd=length(px-u_drop.xy);
  float age=u_drop.z;
  h+=.05*sin(dd*.05-age*7.)*exp(-age*1.3)*exp(-dd*.005)*(1.-smoothstep(age*300.,age*300.+60.,dd));
  float v=h*11.;
  float w=length(vec2(dFdx(v),dFdy(v)));
  float d=abs(fract(v+.5)-.5)/max(w,1e-4);
  float idx=1.-step(.5,mod(floor(v+.5),5.));
  float lw=mix(.5,1.,idx)*u_px;
  float line=clamp(lw+.5-d,0.,1.)*(1.-smoothstep(.22,.55,w));
  float glow=clamp(u_hill*near*1.4+u_wash,0.,1.);
  vec3 col=mix(vec3(.26,.31,1.),vec3(.93,.94,1.),idx*.5);
  col=mix(col,u_tint,glow);
  float a=line*mix(.34,.56,idx)*(.6+.4*glow);
  a*=smoothstep(0.,.32,gl_FragCoord.y/u_res.y);
  vec3 bg=vec3(.027,.031,.11);
  vec3 c=mix(bg,col,a);
  c+=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5)/255.;
  gl_FragColor=vec4(c,1.);
}`;

const LIME: [number, number, number] = [0.788, 0.949, 0.29];
const rgb = (hex: string): [number, number, number] =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];

function createField(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", {
    antialias: false,
    alpha: false,
    powerPreference: "low-power",
    failIfMajorPerformanceCaveat: true,
  });
  if (!gl || !gl.getExtension("OES_standard_derivatives")) return null;
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
  const u = (name: string) => gl.getUniformLocation(program, name);
  const uRes = u("u_res");
  const uPx = u("u_px");
  const uTime = u("u_time");
  const uScroll = u("u_scroll");
  const uMouse = u("u_mouse");
  const uHill = u("u_hill");
  const uDrop = u("u_drop");
  const uTint = u("u_tint");
  const uWash = u("u_wash");

  return (s: {
    time: number;
    scroll: number;
    mx: number;
    my: number;
    hill: number;
    drop: [number, number, number];
    tint: [number, number, number];
    wash: number;
  }) => {
    // Thin lines want real pixels, so the cap is generous on desktop and tighter on phones.
    const cap = matchMedia("(pointer: coarse)").matches ? 1.25 : 1.5;
    const ratio = Math.min(window.devicePixelRatio || 1, cap);
    const w = Math.max(1, Math.round(canvas.clientWidth * ratio));
    const h = Math.max(1, Math.round(canvas.clientHeight * ratio));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    gl.uniform2f(uRes, w, h);
    gl.uniform1f(uPx, ratio);
    gl.uniform1f(uTime, s.time);
    gl.uniform1f(uScroll, s.scroll);
    gl.uniform2f(uMouse, s.mx, s.my);
    gl.uniform1f(uHill, s.hill);
    gl.uniform3f(uDrop, ...s.drop);
    gl.uniform3f(uTint, ...s.tint);
    gl.uniform1f(uWash, s.wash);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
}

function setup(host: HTMLElement) {
  const canvas = host.querySelector<HTMLCanvasElement>("[data-field]");
  if (!canvas) return;
  let draw: ReturnType<typeof createField> | undefined;
  let started = false;
  let visible = false;
  let raf = 0;
  let last = 0;
  let movedAt = -1e9;
  let dropAt = -1e9;
  // Positions in CSS px from the canvas's bottom-left corner (the shader's frame).
  const s = {
    time: 0,
    scroll: scrollY,
    mx: -9999,
    my: -9999,
    tx: -9999,
    ty: -9999,
    hill: 0,
    hillTo: 0,
    drop: [-9999, -9999, 99] as [number, number, number],
    tint: [...LIME] as [number, number, number],
    tintTo: [...LIME] as [number, number, number],
    wash: 0,
    washTo: 0,
  };
  const begin = performance.now();
  let clock = 0;

  const frame = (now: number) => {
    raf = 0;
    if (!draw) return;
    const still = motionStill();
    const busy = now - movedAt < 1500 || now - dropAt < 2500 || Math.abs(s.wash - s.washTo) > 0.01;
    // Idle: every other frame is enough for a drift this slow.
    if (!still && !busy && now - last < 30) {
      raf = requestAnimationFrame(frame);
      return;
    }
    const dt = Math.min(0.1, (now - (last || now)) / 1000);
    last = now;
    if (!still) clock += dt;
    const k = still ? 1 : 1 - Math.pow(0.0005, dt);
    s.mx += (s.tx - s.mx) * k;
    s.my += (s.ty - s.my) * k;
    s.hill += (s.hillTo - s.hill) * (still ? 1 : 1 - Math.pow(0.05, dt));
    s.wash += (s.washTo - s.wash) * (still ? 1 : 1 - Math.pow(0.02, dt));
    for (let i = 0; i < 3; i++) s.tint[i]! += (s.tintTo[i]! - s.tint[i]!) * (still ? 1 : 1 - Math.pow(0.02, dt));
    s.drop[2] = still ? 99 : (now - dropAt) / 1000;
    draw({ ...s, time: clock + (begin % 1000) / 10 });
    canvas.classList.add("on");
    if (visible && !still && !document.hidden) raf = requestAnimationFrame(frame);
  };
  const kick = () => {
    if (started && draw && !raf) raf = requestAnimationFrame(frame);
  };
  const start = () => {
    if (started) return;
    started = true;
    draw = createField(canvas);
    kick();
  };

  const at = (event: PointerEvent): [number, number] => {
    const box = canvas.getBoundingClientRect();
    return [event.clientX - box.left, box.bottom - event.clientY];
  };
  host.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    start();
    const [x, y] = at(event);
    if (s.mx < -9000) {
      s.mx = x;
      s.my = y;
    }
    s.tx = x;
    s.ty = y;
    s.hillTo = 1;
    movedAt = performance.now();
    kick();
  });
  host.addEventListener("pointerleave", () => {
    s.hillTo = 0;
    kick();
  });
  host.addEventListener("pointerdown", (event) => {
    start();
    const [x, y] = at(event);
    s.drop = [x, y, 0];
    dropAt = performance.now();
    kick();
  });
  addEventListener(
    "scroll",
    () => {
      s.scroll = scrollY;
      if (visible) kick();
    },
    { passive: true },
  );

  // The index tints the map: hover or focus a name, the lines take its colour.
  for (const link of host.querySelectorAll<HTMLElement>("[data-tint]")) {
    const on = () => {
      s.tintTo = rgb(link.dataset.tint ?? "#c9f24a");
      s.washTo = 0.55;
      kick();
    };
    const off = () => {
      s.tintTo = [...LIME];
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
