import { afterInteraction, motionStill, onMotion } from "~/scripts/motion";

/**
 * The All projects TV (components/work/WorkHero.astro): a fragment shader that plays the projects' captures as
 * channels, with a CRT bulge, scanlines, a colour split, a lens under the pointer and static between channels. No
 * library. It starts after the reader's first interaction (or a pointer over the set) and only while the set is in view;
 * until then the CSS colour bars show. It flips a channel every few seconds while motion is on; the buttons flip it
 * any time and hold the flipping for a while. Paused or reduced motion: no static, no flipping, one frame per change.
 * Without WebGL a plain image takes the screen.
 */
interface Channel {
  slug: string;
  name: string;
  meta: string;
  src: string;
  /** Width / height of the capture. */
  ar: number;
  /** Letterbox (a phone poster) instead of filling the screen from the top. */
  contain: boolean;
  /** The project's colour, `#rrggbb`. */
  bg: string;
}

const CHANNEL_MS = 6000;
const HOLD_MS = 15000;

const FRAG = `precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_img;
uniform float u_ar;
uniform float u_contain;
uniform float u_pan;
uniform vec3 u_bg;
uniform float u_noise;
uniform float u_roll;
uniform float u_sig;
float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
vec3 bars(vec2 uv){
  if(uv.y>.25){
    float i=floor(uv.x*7.);
    if(i<1.)return vec3(.933,.941,1.);
    if(i<2.)return vec3(1.,.824,.247);
    if(i<3.)return vec3(.788,.949,.29);
    if(i<4.)return vec3(1.,.357,.122);
    if(i<5.)return vec3(1.,.31,.722);
    if(i<6.)return vec3(.141,.2,1.);
    return vec3(.11,.133,.42);
  }
  return mod(floor(uv.x*4.),2.)<1.?vec3(.039,.051,.2):vec3(.933,.941,1.);
}
vec3 pic(vec2 uv){
  vec2 p=vec2(uv.x,1.-uv.y);
  float k=u_ar/(u_res.x/u_res.y);
  if(u_contain<.5){
    if(k<1.)p.y=p.y*k+u_pan*(1.-k);else p.x=.5+(p.x-.5)/k;
  }else{
    if(k<1.)p.x=.5+(p.x-.5)/k;else p.y=.5+(p.y-.5)*k;
    if(p.x<0.||p.x>1.||p.y<0.||p.y>1.)return u_bg;
  }
  return texture2D(u_img,clamp(p,0.,1.)).rgb;
}
vec3 screen(vec2 uv){
  uv.y=fract(uv.y+u_roll);
  return u_sig<.5?bars(uv):pic(uv);
}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  vec2 c=uv*2.-1.;
  c+=c*(c.yx*c.yx)*vec2(.05,.07);
  uv=c*.5+.5;
  float edge=step(0.,uv.x)*step(uv.x,1.)*step(0.,uv.y)*step(uv.y,1.);
  vec2 d=uv-u_mouse;
  d.x*=u_res.x/u_res.y;
  uv-=(uv-u_mouse)*.16*exp(-dot(d,d)*14.);
  uv.x+=(hash(vec2(floor(uv.y*70.),floor(u_time*24.)))-.5)*.14*u_noise;
  float a=.0022+.006*u_noise;
  vec3 col=vec3(screen(uv+vec2(a,0.)).r,screen(uv).g,screen(uv-vec2(a,0.)).b);
  float n=hash(floor(gl_FragCoord.xy/2.)+fract(u_time*7.)*91.);
  col=mix(col,vec3(n),u_noise*.92);
  col*=.88+.12*sin(gl_FragCoord.y*1.7);
  col+=.045*(1.-smoothstep(0.,.08,abs(fract(uv.y*.5-u_time*.1)-.5)));
  vec2 v=uv-.5;
  col*=1.-dot(v,v)*.8;
  gl_FragColor=vec4(col*edge,1.);
}`;

const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];

function createScreen(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
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
  const at = (name: string) => gl.getUniformLocation(program, name);
  const u = Object.fromEntries(
    ["u_res", "u_time", "u_mouse", "u_ar", "u_contain", "u_pan", "u_bg", "u_noise", "u_roll", "u_sig"].map((name) => [name, at(name)]),
  );

  return {
    upload(image: HTMLImageElement) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    },
    draw(s: { time: number; mx: number; my: number; ar: number; contain: number; pan: number; bg: [number, number, number]; noise: number; roll: number; sig: number }) {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * ratio));
      const h = Math.max(1, Math.round(canvas.clientHeight * ratio));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(u.u_res!, w, h);
      gl.uniform1f(u.u_time!, s.time);
      gl.uniform2f(u.u_mouse!, s.mx, s.my);
      gl.uniform1f(u.u_ar!, s.ar);
      gl.uniform1f(u.u_contain!, s.contain);
      gl.uniform1f(u.u_pan!, s.pan);
      gl.uniform3f(u.u_bg!, ...s.bg);
      gl.uniform1f(u.u_noise!, s.noise);
      gl.uniform1f(u.u_roll!, s.roll);
      gl.uniform1f(u.u_sig!, s.sig);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}

function setup(tv: HTMLElement) {
  const channels = JSON.parse(tv.dataset.tv ?? "[]") as Channel[];
  const screenEl = tv.querySelector<HTMLElement>("[data-tv-screen]");
  const canvas = screenEl?.querySelector("canvas");
  if (!channels.length || !screenEl || !canvas) return;
  const still = screenEl.querySelector<HTMLImageElement>("[data-tv-img]");
  const one = <T extends HTMLElement>(selector: string) => tv.querySelector<T>(selector);
  const num = one("[data-tv-num]");
  const led = one("[data-tv-led]");
  const name = one("[data-tv-name]");
  const meta = one("[data-tv-meta]");
  const now = one("[data-tv-now]");
  const link = one<HTMLAnchorElement>("[data-tv-link]");
  const host = tv.closest<HTMLElement>("section") ?? tv;

  let index = 0;
  let pending: number | null = null;
  let switchAt = 0;
  let heldUntil = 0;
  let nextAt = 0;
  let tunedAt = 0;
  let started = false;
  let visible = false;
  let raf = 0;
  const begin = performance.now();
  const state = {
    time: 0,
    mx: -2,
    my: -2,
    tx: -2,
    ty: -2,
    ar: 1,
    contain: 0,
    pan: 0,
    bg: [0, 0, 0] as [number, number, number],
    noise: 1,
    target: 1,
    roll: 0,
    sig: 0,
  };

  // Captures load one at a time, the next channel's right after the current one.
  const loaded = new Map<number, HTMLImageElement | null>();
  const loading = new Set<number>();
  const load = (i: number) => {
    if (loaded.has(i) || loading.has(i)) return;
    loading.add(i);
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      loading.delete(i);
      loaded.set(i, image);
      kick();
    };
    image.onerror = () => {
      loading.delete(i);
      loaded.set(i, null);
      kick();
    };
    image.src = channels[i]!.src;
  };

  const label = (i: number) => {
    const channel = channels[i]!;
    const n = String(i + 1).padStart(2, "0");
    if (num) num.textContent = `CH ${n}`;
    if (led) led.textContent = n;
    if (name) name.textContent = channel.name;
    if (meta) meta.textContent = channel.meta;
    if (link) link.href = `#wk-${channel.slug}`;
    tv.style.setProperty("--ch", String(i));
    host.style.setProperty("--wh-glow", channel.bg);
  };

  const screen = createScreen(canvas);

  const go = (i: number, byUser: boolean) => {
    const target = (i + channels.length) % channels.length;
    if (byUser) {
      heldUntil = performance.now() + HOLD_MS;
      now?.setAttribute("aria-live", "polite");
    }
    pending = target;
    switchAt = performance.now();
    load(target);
    if (motionStill()) state.noise = state.target = 0;
    else state.target = 1;
    kick();
  };

  /** Swaps in the pending channel once its capture is there (and, with motion, after a beat of static). */
  const swap = (t: number) => {
    if (pending === null || !loaded.has(pending)) return;
    if (!motionStill() && t - switchAt < 260) return;
    const i = pending;
    const image = loaded.get(i);
    pending = null;
    state.target = 0;
    if (!image) return;
    const channel = channels[i]!;
    index = i;
    label(i);
    tunedAt = t;
    nextAt = t + CHANNEL_MS;
    load((i + 1) % channels.length);
    if (!screen) {
      if (still) {
        still.src = image.src;
        still.hidden = false;
      }
      return;
    }
    screen.upload(image);
    state.ar = channel.ar;
    state.contain = channel.contain ? 1 : 0;
    state.bg = rgb(channel.bg);
    state.sig = 1;
  };

  const draw = (t: number) => {
    swap(t);
    if (!screen) return;
    const moving = !motionStill();
    const up = state.target > state.noise;
    state.noise += (state.target - state.noise) * (moving ? (up ? 0.3 : 0.08) : 1);
    if (state.target > 0.5) state.roll = (state.roll + state.noise * 0.05) % 1;
    else state.roll += ((state.roll > 0.5 ? 1 : 0) - state.roll) * (moving ? 0.14 : 1);
    state.mx += (state.tx - state.mx) * 0.12;
    state.my += (state.ty - state.my) * 0.12;
    // A long page scrolls down while its channel plays.
    const k = Math.min(1, (t - tunedAt) / CHANNEL_MS);
    state.pan = moving ? 0.6 * (0.5 - 0.5 * Math.cos(k * Math.PI)) : 0;
    state.time = (t - begin) / 1000;
    screen.draw(state);
    canvas.classList.add("on");
    if (moving && pending === null && t > nextAt && t > heldUntil) go(index + 1, false);
  };

  const loop = (t: number) => {
    raf = 0;
    draw(t);
    if (screen && visible && !motionStill() && !document.hidden) raf = requestAnimationFrame(loop);
  };
  function kick() {
    if (started && !raf) raf = requestAnimationFrame(loop);
  }

  const start = () => {
    if (started) return;
    started = true;
    tv.classList.add("live");
    go(0, false);
  };

  screenEl.addEventListener("pointermove", (event) => {
    const box = canvas.getBoundingClientRect();
    state.tx = (event.clientX - box.left) / box.width;
    state.ty = 1 - (event.clientY - box.top) / box.height;
    if (state.mx < -1) {
      state.mx = state.tx;
      state.my = state.ty;
    }
    if (motionStill()) kick();
  });
  screenEl.addEventListener("pointerleave", () => {
    state.tx = state.ty = state.mx = state.my = -2;
    kick();
  });
  tv.addEventListener("pointerenter", start, { once: true });
  one("[data-tv-prev]")?.addEventListener("click", () => (start(), go((pending ?? index) - 1, true)));
  one("[data-tv-next]")?.addEventListener("click", () => (start(), go((pending ?? index) + 1, true)));

  new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting;
    if (visible) afterInteraction(start);
    kick();
  }).observe(tv);
  new ResizeObserver(() => kick()).observe(canvas);
  onMotion(() => kick());
  document.addEventListener("visibilitychange", () => kick());
}

for (const tv of document.querySelectorAll<HTMLElement>("[data-tv]")) setup(tv);
