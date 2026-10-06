/**
 * Sound for the My life toys, all synthesised (Web Audio, no files, so no licences). Nothing plays until the reader
 * presses a toy that makes sound; one switch mutes it everywhere, remembered in this browser.
 */
let ctx: AudioContext | null = null;
let muted = false;
try {
  muted = localStorage.getItem("life-sound") === "off";
} catch {
  /* storage blocked: sound on for this page */
}
const listeners = new Set<(muted: boolean) => void>();

export const isMuted = () => muted;
export function setMuted(value: boolean) {
  muted = value;
  try {
    if (value) localStorage.setItem("life-sound", "off");
    else localStorage.removeItem("life-sound");
  } catch {
    /* storage blocked */
  }
  if (value) void ctx?.suspend();
  listeners.forEach((fn) => fn(value));
}
export const onMute = (fn: (muted: boolean) => void) => listeners.add(fn);

/** The shared context, or null when muted. Call only from a reader's gesture (or after one). */
export function audio() {
  if (muted) return null;
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

const noise = (ac: AudioContext) => {
  const buffer = ac.createBuffer(1, ac.sampleRate * 0.3, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
};
let noiseBuffer: AudioBuffer | null = null;

const out = (ac: AudioContext, level: number) => {
  const gain = ac.createGain();
  gain.gain.value = level;
  gain.connect(ac.destination);
  return gain;
};

export function kick(ac: AudioContext, t = ac.currentTime) {
  const osc = ac.createOscillator();
  const gain = out(ac, 0);
  osc.connect(gain);
  osc.frequency.setValueAtTime(150, t);
  osc.frequency.exponentialRampToValueAtTime(42, t + 0.18);
  gain.gain.setValueAtTime(0.9, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
  osc.start(t);
  osc.stop(t + 0.34);
}

function hiss(ac: AudioContext, t: number, freq: number, level: number, length: number) {
  noiseBuffer ??= noise(ac);
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer;
  const filter = ac.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = freq;
  const gain = out(ac, 0);
  src.connect(filter).connect(gain);
  gain.gain.setValueAtTime(level, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + length);
  src.start(t);
  src.stop(t + length + 0.02);
}

export function snare(ac: AudioContext, t = ac.currentTime) {
  hiss(ac, t, 1400, 0.5, 0.18);
  const osc = ac.createOscillator();
  const gain = out(ac, 0);
  osc.type = "triangle";
  osc.frequency.setValueAtTime(220, t);
  osc.connect(gain);
  gain.gain.setValueAtTime(0.35, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
  osc.start(t);
  osc.stop(t + 0.12);
}

export const hat = (ac: AudioContext, t = ac.currentTime) => hiss(ac, t, 7000, 0.22, 0.05);
/** A camera shutter: two quick clicks, the curtains opening and closing. */
export function click(ac: AudioContext, t = ac.currentTime) {
  hiss(ac, t, 2600, 0.4, 0.025);
  hiss(ac, t + 0.07, 3400, 0.3, 0.03);
}

export function bass(ac: AudioContext, t = ac.currentTime, freq = 55) {
  const osc = ac.createOscillator();
  const filter = ac.createBiquadFilter();
  const gain = out(ac, 0);
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(freq, t);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(900, t);
  filter.frequency.exponentialRampToValueAtTime(180, t + 0.22);
  osc.connect(filter).connect(gain);
  gain.gain.setValueAtTime(0.32, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.26);
  osc.start(t);
  osc.stop(t + 0.28);
}

/** A little blip, for buttons that count. */
export function blip(ac: AudioContext, freq = 660) {
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = out(ac, 0);
  osc.type = "square";
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 0.06);
  osc.connect(gain);
  gain.gain.setValueAtTime(0.08, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  osc.start(t);
  osc.stop(t + 0.13);
}

/** An engine: two detuned saws through a low-pass; `set(0..1)` is the throttle. */
export function engine(ac: AudioContext) {
  const a = ac.createOscillator();
  const b = ac.createOscillator();
  const rumble = ac.createOscillator();
  const filter = ac.createBiquadFilter();
  const gain = out(ac, 0);
  a.type = "sawtooth";
  b.type = "square";
  rumble.type = "sawtooth";
  filter.type = "lowpass";
  filter.Q.value = 6;
  a.connect(filter);
  b.connect(filter);
  rumble.connect(filter);
  filter.connect(gain);
  const set = (x: number) => {
    const t = ac.currentTime;
    const f = 38 + x * 150;
    a.frequency.setTargetAtTime(f, t, 0.05);
    b.frequency.setTargetAtTime(f * 1.01, t, 0.05);
    rumble.frequency.setTargetAtTime(f / 2, t, 0.05);
    filter.frequency.setTargetAtTime(300 + x * 2400, t, 0.05);
    gain.gain.setTargetAtTime(0.06 + x * 0.12, t, 0.05);
  };
  set(0);
  a.start();
  b.start();
  rumble.start();
  return {
    set,
    stop() {
      const t = ac.currentTime;
      gain.gain.setTargetAtTime(0, t, 0.08);
      [a, b, rumble].forEach((osc) => osc.stop(t + 0.5));
    },
  };
}
