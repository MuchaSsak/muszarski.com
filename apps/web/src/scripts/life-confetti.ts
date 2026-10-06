/**
 * Confetti for the My life toys: one fixed canvas over the page, made on demand and removed when the last piece has
 * fallen. Never under paused or reduced motion (the caller still shows its own result).
 */
import { motionStill } from "~/scripts/motion";

const COLOURS = ["#ff4fb8", "#2433ff", "#ffd23f", "#c9f24a", "#ff5b1f", "#eef0ff"];

interface Bit {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  vr: number;
  w: number;
  h: number;
  c: string;
}

let canvas: HTMLCanvasElement | null = null;
let bits: Bit[] = [];
let raf = 0;

/** Throw `count` pieces from a point (client px), or from the top of the screen when no point is given. */
export function confetti(count = 120, from?: { x: number; y: number }) {
  if (motionStill()) return;
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, { position: "fixed", inset: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "90" });
    document.body.append(canvas);
  }
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;
  for (let i = 0; i < count; i++) {
    const angle = from ? -Math.PI / 2 + (Math.random() - 0.5) * 2.2 : Math.PI / 2 + (Math.random() - 0.5) * 0.6;
    const speed = from ? 6 + Math.random() * 9 : 2 + Math.random() * 4;
    bits.push({
      x: from ? from.x : Math.random() * innerWidth,
      y: from ? from.y : -20 - Math.random() * innerHeight * 0.3,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      c: COLOURS[i % COLOURS.length]!,
    });
  }
  if (!raf) raf = requestAnimationFrame(tick);
}

function tick() {
  raf = 0;
  if (!canvas) return;
  const ratio = canvas.width / innerWidth;
  const g = canvas.getContext("2d")!;
  g.setTransform(ratio, 0, 0, ratio, 0, 0);
  g.clearRect(0, 0, innerWidth, innerHeight);
  bits = bits.filter((b) => b.y < innerHeight + 40);
  for (const b of bits) {
    b.vy += 0.22;
    b.vx *= 0.99;
    b.x += b.vx;
    b.y += b.vy;
    b.r += b.vr;
    g.save();
    g.translate(b.x, b.y);
    g.rotate(b.r);
    g.fillStyle = b.c;
    g.fillRect(-b.w / 2, (-b.h / 2) * Math.abs(Math.cos(b.r * 2)), b.w, b.h * Math.abs(Math.cos(b.r * 2)) + 1);
    g.restore();
  }
  if (bits.length && !motionStill()) raf = requestAnimationFrame(tick);
  else {
    bits = [];
    canvas.remove();
    canvas = null;
  }
}
