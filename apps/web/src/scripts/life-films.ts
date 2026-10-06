/**
 * The film toy's scenes (ToyFilm.astro) [user 2026-10-06: "detailed illustrations ... instead of boring text ... of
 * course everything performant still"]: one drawn parody still per film, keyed by the film's id. Own work, generic
 * hints only: no titles, logos, characters or likenesses. The module loads on the first roll, so the page carries none
 * of it; repeated parts (stars, windows, code rain, teeth) are drawn by loops here, not shipped as markup. The motion
 * is ToyFilm's (`fm-` classes) and stops with paused or reduced motion.
 */

/** A small seeded random, so a scene draws the same every time. */
const seeded = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
  return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
};
const f = (v: number) => Math.round(v * 10) / 10;

type Stop = [offset: number, color: string, opacity?: number];
const stops = (list: Stop[]) =>
  list.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a === undefined ? "" : ` stop-opacity="${a}"`}/>`).join("");
const lin = (id: string, list: Stop[], x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops(list)}</linearGradient>`;
const rad = (id: string, list: Stop[], cx = 0.5, cy = 0.5, r = 0.5) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops(list)}</radialGradient>`;

const svg = (id: string, body: string) =>
  `<svg class="fs fs-${id}" viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${body}</svg>`;

/** Dots of light across the top `maxY` of the frame. */
const stars = (seed: number, count: number, maxY: number, fill = "#eef0ff") => {
  const r = seeded(seed);
  let out = "";
  for (let i = 0; i < count; i++) out += `<circle cx="${f(r() * 160)}" cy="${f(r() * maxY)}" r="${f(0.25 + r() * 0.55)}"/>`;
  return `<g fill="${fill}">${out}</g>`;
};
/** A four-point glint. */
const glint = (x: number, y: number, s: number) =>
  `<path d="M${x} ${f(y - s)}Q${x} ${y} ${f(x + s)} ${y}Q${x} ${y} ${x} ${f(y + s)}Q${x} ${y} ${f(x - s)} ${y}Q${x} ${y} ${x} ${f(y - s)}Z"/>`;
/** Triangular teeth along a jaw line from (x0,y0) to (x1,y1); `dir` 1 points them down, -1 up. */
const teeth = (x0: number, y0: number, x1: number, y1: number, n: number, size: number, dir: 1 | -1) => {
  let d = "";
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    const x = x0 + (x1 - x0) * t;
    const y = y0 + (y1 - y0) * t;
    d += `M${f(x - size * 0.45)} ${f(y)}L${f(x + size * 0.45)} ${f(y)}L${f(x)} ${f(y + dir * size)}Z`;
  }
  return `<path d="${d}" fill="#fffbea"/>`;
};

/** Space wizards with laser swords: two blades cross over a ringed planet. */
const blade = (x: number, y: number, angle: number, len: number, glow: string, mid: string, core: string) =>
  `<g transform="translate(${x} ${y}) rotate(${angle})">` +
  `<rect class="fm-hum" x="-1" y="-5.5" width="${len + 2}" height="11" rx="5.5" fill="${glow}" opacity=".3"/>` +
  `<rect x="0" y="-2.5" width="${len}" height="5" rx="2.5" fill="${mid}"/>` +
  `<rect x="1" y="-1" width="${len - 2.5}" height="2" rx="1" fill="${core}"/>` +
  `<rect x="-15" y="-2.7" width="13" height="5.4" rx="1" fill="#c9cde0"/>` +
  `<path d="M-13 -2.7v5.4M-10.6 -2.7v5.4M-8.2 -2.7v5.4" stroke="#0a0d33" stroke-width="1"/>` +
  `<rect x="-3" y="-3.4" width="3.4" height="6.8" rx=".8" fill="#8a90ad"/>` +
  `<rect x="-6.4" y="-3.8" width="2" height="1.2" fill="#ff5b1f"/>` +
  `</g>`;
const swords = () =>
  svg(
    "swords",
    `<defs>${rad("fs-sw-sky", [[0, "#262d92"], [0.55, "#0d1046"], [1, "#07081c"]], 0.5, 0.4, 0.75)}${lin("fs-sw-pl", [[0, "#ffd23f"], [0.45, "#ff5b1f"], [1, "#ff4fb8"]], 1, 1)}</defs>` +
      `<rect width="160" height="120" fill="url(#fs-sw-sky)"/>` +
      `<ellipse cx="34" cy="30" rx="48" ry="15" fill="#2433ff" opacity=".28" transform="rotate(-12 34 30)"/>` +
      `<ellipse cx="126" cy="16" rx="36" ry="9" fill="#ff4fb8" opacity=".14"/>` +
      stars(7, 40, 120) +
      `<g class="fm-tw" fill="#eef0ff">${glint(22, 18, 2.4)}${glint(140, 40, 2)}${glint(58, 98, 1.8)}${glint(118, 8, 1.6)}</g>` +
      `<circle cx="18" cy="72" r="5" fill="#9aa5ff" opacity=".75"/><circle cx="16.5" cy="70.5" r="1.2" fill="#6f7cd6"/>` +
      `<path d="M95.8 116.7A46 8 -16 0 1 184.2 91.3" fill="none" stroke="#ffd23f" stroke-width="1.4" opacity=".5"/>` +
      `<circle cx="140" cy="104" r="30" fill="url(#fs-sw-pl)"/>` +
      `<path d="M140 74a30 30 0 0 1 0 60a21 30 0 0 0 0-60Z" fill="#0a0d33" opacity=".3"/>` +
      `<path d="M95.8 116.7A46 8 -16 0 0 184.2 91.3" fill="none" stroke="#ffd23f" stroke-width="1.8"/>` +
      blade(46, 84, -48, 96, "#2433ff", "#5f7cff", "#f2f5ff") +
      blade(114, 84, -130, 96, "#ff4fb8", "#ff71c8", "#fff1f9") +
      `<g class="fm-spark"><circle cx="81.2" cy="44.9" r="10" fill="#ffd23f" opacity=".3"/><g fill="#fff6c4">${glint(81.2, 44.9, 9)}</g><circle cx="81.2" cy="44.9" r="2" fill="#fff"/></g>` +
      `<g fill="#ffd23f"><circle cx="90" cy="39" r=".9"/><circle cx="74" cy="37" r=".7"/><circle cx="92" cy="51" r=".7"/><circle cx="70" cy="50" r=".9"/><circle cx="86" cy="33" r=".6"/></g>`,
  );

/** One ring, one volcano, a very long walk. */
const walker = (x: number, y: number) =>
  `<circle cx="${x}" cy="${f(y - 5.4)}" r="1.05"/><path d="M${f(x - 1)} ${f(y - 4.3)}h2l.5 4.3h-3Z"/>` +
  `<rect x="${f(x + 0.5)}" y="${f(y - 4.6)}" width="1.7" height="2.6" rx=".5"/>` +
  `<path d="M${f(x - 1.7)} ${f(y - 6.6)}V${y}" stroke="#0a0d33" stroke-width=".4"/>`;
const ring = () =>
  svg(
    "ring",
    `<defs>${lin("fs-rg-sky", [[0, "#16092a"], [0.5, "#5a1430"], [0.85, "#c2381f"], [1, "#ff5b1f"]])}${rad("fs-rg-glow", [[0, "#ffd23f", 0.95], [1, "#ffd23f", 0]])}${lin("fs-rg-gold", [[0, "#fff4c2"], [0.4, "#ffd23f"], [1, "#b87a0e"]], 1, 1)}</defs>` +
      `<rect width="160" height="120" fill="url(#fs-rg-sky)"/>` +
      stars(11, 16, 40, "#ffd9c4") +
      `<g class="fm-smoke" fill="#2a0f24"><circle cx="98" cy="27" r="5"/><circle cx="104" cy="32" r="7"/><circle cx="111" cy="24" r="9"/><circle cx="121" cy="17" r="11"/><circle cx="134" cy="11" r="12"/><circle cx="149" cy="8" r="13"/></g>` +
      `<path d="M54 104L94 46Q98 41 103 42.5Q108 40.5 113 42.5Q117 42 119 46L160 94V120H54Z" fill="#0a0d33"/>` +
      `<ellipse class="fm-lava" cx="106" cy="43" rx="20" ry="13" fill="url(#fs-rg-glow)"/>` +
      `<path d="M97 44Q106 39 116 44" stroke="#ffd23f" stroke-width="1.8" fill="none" stroke-linecap="round"/>` +
      `<g fill="none" stroke="#ff5b1f" stroke-linecap="round"><path d="M102 45Q99 55 103 63T100 82" stroke-width="1.6"/><path d="M111 45Q116 53 113 61T119 76" stroke-width="1.2"/></g>` +
      `<path d="M0 86L12 76L22 81L36 68L50 80L64 74L78 88L98 82L122 94L160 86V120H0Z" fill="#24102e"/>` +
      `<g fill="#0a0d33">${walker(33, 70.8)}${walker(38, 69.6)}</g>` +
      `<path d="M8 118Q30 104 24 96Q18 88 40 86Q60 84 70 80Q82 74 96 60" fill="none" stroke="#ffd23f" stroke-width=".7" stroke-dasharray="1.4 1.8" opacity=".6"/>` +
      `<path d="M0 104Q30 95 62 101T124 100T160 99V120H0Z" fill="#0a0d33"/>` +
      `<g class="fm-bob"><circle cx="34" cy="36" r="21" fill="url(#fs-rg-glow)" opacity=".5"/>` +
      `<ellipse cx="34" cy="36" rx="12" ry="9.5" transform="rotate(-24 34 36)" fill="none" stroke="#6b3f06" stroke-width="5"/>` +
      `<ellipse cx="34" cy="36" rx="12" ry="9.5" transform="rotate(-24 34 36)" fill="none" stroke="url(#fs-rg-gold)" stroke-width="3.6"/>` +
      `<ellipse cx="34" cy="36" rx="12" ry="9.5" transform="rotate(-24 34 36)" fill="none" stroke="#fffbe6" stroke-width=".8" stroke-dasharray="9 44" stroke-dashoffset="-3"/>` +
      `<g fill="#fffbe6">${glint(24.5, 28.5, 3)}</g></g>`,
  );

/** Bringing dinosaurs back was a bad idea: a head over the trees, rings in a glass of water. */
const dino = () =>
  svg(
    "dino",
    `<defs>${lin("fs-dn-sky", [[0, "#07081c"], [1, "#173a4a"]])}${lin("fs-dn-gl", [[0, "#eef0ff", 0.45], [0.5, "#eef0ff", 0.08], [1, "#eef0ff", 0.35]], 1, 0)}</defs>` +
      `<rect width="160" height="120" fill="url(#fs-dn-sky)"/>` +
      stars(23, 18, 50) +
      `<circle cx="30" cy="22" r="10" fill="#eef0ff" opacity=".92"/><circle cx="34" cy="19" r="2" fill="#c9cde0"/><circle cx="27" cy="26" r="1.4" fill="#c9cde0"/>` +
      `<path d="M0 74Q8 60 18 68Q26 54 38 64Q48 50 60 62Q72 52 84 64Q96 54 106 66Q118 56 130 66Q144 58 160 68V120H0Z" fill="#0e2a1c"/>` +
      `<g class="fm-dino">` +
      `<path d="M160 76L158 50Q156 32 140 28Q122 25 104 28Q96 29.5 95 35L95 37.5L121 41L101 46.5Q99 49.5 103 50.5L127 53Q133 57 134 76Z" fill="#1b4a2e"/>` +
      `<path d="M95 37.5L121 41L101 46.5Z" fill="#3a0d1a"/>` +
      teeth(96, 37.6, 119, 40.7, 7, 2.2, 1) +
      teeth(102, 46.2, 119, 41.6, 5, 2, -1) +
      `<path d="M104 28.5Q122 26 140 29" stroke="#2a6b3c" stroke-width="1" fill="none"/>` +
      `<path d="M127 30.5Q134 27 142 30.5" stroke="#0e2a1c" stroke-width="1.8" fill="none" stroke-linecap="round"/>` +
      `<g class="fm-eye"><circle cx="133.5" cy="33.5" r="2" fill="#c9f24a"/><rect x="133.1" y="31.8" width=".8" height="3.4" fill="#07081c"/></g>` +
      `<ellipse cx="100.5" cy="31" rx="1.4" ry=".8" fill="#0e2a1c"/>` +
      `<g fill="#14382a"><circle cx="146" cy="40" r="1.2"/><circle cx="150" cy="46" r="1"/><circle cx="143" cy="47" r=".9"/><circle cx="152" cy="54" r="1.1"/></g>` +
      `</g>` +
      `<path d="M0 88Q10 74 22 84Q32 70 46 82Q58 72 70 84Q84 74 96 86Q110 76 122 86Q136 74 148 84L160 80V120H0Z" fill="#1d4a2c"/>` +
      `<g fill="#2a6b3c"><path d="M128 86Q138 70 156 66Q142 74 132 88Z"/><path d="M8 88Q2 74 -6 70Q8 72 14 86Z"/><path d="M64 84Q70 72 82 70Q72 78 68 86Z"/></g>` +
      `<path d="M0 94Q80 86 160 94V120H0Z" fill="#0a0d33"/><path d="M0 94Q80 86 160 94" stroke="#2433ff" stroke-width=".8" fill="none"/>` +
      `<g transform="translate(48 64)">` +
      `<path d="M-8.4 9H8.4L7 26.5H-7Z" fill="#2433ff" opacity=".45"/>` +
      `<path d="M-9 0H9L7.2 26.6H-7.2Z" fill="url(#fs-dn-gl)" stroke="#eef0ff" stroke-opacity=".75" stroke-width=".6"/>` +
      `<ellipse cx="0" cy="9" rx="8.4" ry="1.8" fill="#8fa2ff" opacity=".7"/>` +
      `<g class="fm-rip" fill="none" stroke="#eef0ff" stroke-width=".5"><ellipse cx="0" cy="9" rx="7" ry="1.4"/><ellipse cx="0" cy="9" rx="7" ry="1.4"/><ellipse cx="0" cy="9" rx="7" ry="1.4"/></g>` +
      `<ellipse cx="0" cy="0" rx="9" ry="1.9" fill="none" stroke="#eef0ff" stroke-width=".6" stroke-opacity=".85"/>` +
      `<path d="M-6.6 3L-5.4 22" stroke="#fff" stroke-width="1" opacity=".5" stroke-linecap="round"/>` +
      `</g>`,
  );

/** The ship sinks; there was room on that door. */
const ship = () => {
  let holes = "";
  for (let x = 52; x <= 140; x += 4.4) holes += `<circle cx="${f(x)}" cy="62.4" r=".7"/><circle cx="${f(x + 2.2)}" cy="66" r=".6"/>`;
  let funnels = "";
  for (const x of [70, 86, 102, 118]) funnels += `<path d="M${x} 49L${f(x + 1.2)} 34H${f(x + 7.8)}L${x + 9} 49Z" fill="#e8a33a"/><path d="M${f(x + 1.2)} 34H${f(x + 7.8)}L${f(x + 8.1)} 38H${f(x + 0.9)}Z" fill="#0a0d33"/>`;
  return svg(
    "ship",
    `<defs>${lin("fs-sh-sky", [[0, "#07081c"], [0.7, "#141c5e"], [1, "#2a3590"]])}${lin("fs-sh-sea", [[0, "#121a63"], [1, "#07081c"]])}</defs>` +
      `<rect width="160" height="120" fill="url(#fs-sh-sky)"/>` +
      stars(31, 34, 66) +
      `<circle cx="134" cy="18" r="6" fill="#eef0ff"/>` +
      `<path d="M2 70L9 58L13 61L19 50L24 57L28 55L36 70Z" fill="#dfe6ff"/><path d="M19 50L22 70H36L28 55L24 57Z" fill="#b5c2f0"/>` +
      `<g transform="rotate(16 100 64)">` +
      `<path d="M60 52L58 26M136 52L140 28" stroke="#c9cde0" stroke-width=".6"/><path d="M58 26L45 58M58 26L70 49M140 28L150 58M140 28L127 49" stroke="#c9cde0" stroke-width=".3"/>` +
      funnels +
      `<rect x="62" y="49" width="66" height="3" fill="#d9d4c4"/>` +
      `<rect x="56" y="52" width="80" height="6" fill="#ece7d8"/><rect x="58" y="54" width="76" height="1.3" fill="#ffd23f"/>` +
      `<path d="M44 58Q42 66 52 72H141L150 58Z" fill="#05061a"/><path d="M44 58H150L149 59.6H44.2Z" fill="#eef0ff"/>` +
      `<g fill="#ffd23f">${holes}</g>` +
      `</g>` +
      `<rect y="70" width="160" height="50" fill="url(#fs-sh-sea)"/>` +
      `<g stroke="#ffd23f" stroke-width=".7" opacity=".5"><path d="M70 74h6M84 77h4M100 75h7M116 79h5M128 73h4"/></g>` +
      `<g class="fm-waves" fill="none" stroke="#6f8bff" stroke-width=".6" opacity=".55"><path d="M4 76q3-1.2 6 0t6 0M44 84q3-1.2 6 0t6 0M96 90q3-1.2 6 0t6 0M130 82q3-1.2 6 0t6 0M70 100q3-1.2 6 0t6 0"/></g>` +
      `<path class="fm-heart" d="M34 64.6c-1.8-2.8-6-1.6-6 1.6 0 3.2 6 6.8 6 6.8s6-3.6 6-6.8c0-3.2-4.2-4.4-6-1.6Z" fill="#ff4fb8"/>` +
      `<g class="fm-door" transform="translate(0 -4)">` +
      `<path d="M10 86L52 80L58 88L16 94Z" fill="#8a4b2a"/><path d="M16 94L58 88V90.4L16 96.4Z" fill="#4a230f"/>` +
      `<path d="M16.4 86.4L30 84.4L33.4 88.6L19.8 90.6ZM34.2 83.8L48 81.8L51.4 86L37.6 88Z" fill="none" stroke="#5c2c12" stroke-width=".6"/>` +
      `<rect x="20" y="84.6" width="12" height="3.4" rx="1.7" transform="rotate(-8 20 84.6)" fill="#ff4fb8"/><circle cx="18" cy="87.2" r="1.8" fill="#f3d9a0"/>` +
      `<rect x="37" y="82.2" width="12" height="3.4" rx="1.7" transform="rotate(-8 37 82.2)" fill="none" stroke="#eef0ff" stroke-width=".5" stroke-dasharray="1 .8"/>` +
      `<circle cx="35" cy="84.8" r="1.8" fill="none" stroke="#eef0ff" stroke-width=".5" stroke-dasharray="1 .8"/>` +
      `</g>`,
  );
};

/** Red pill or blue pill: two pills in a rain of code. */
const pills = () => {
  const r = seeded(42);
  let rain = "";
  // Each column is drawn twice, a frame height apart, so falling one frame height loops without a jump.
  for (let c = 0; c < 20; c++) {
    const x = f(1 + c * 8 + r() * 2.5);
    const len = 7 + Math.floor(r() * 10);
    const y0 = r() * 120 - 20;
    let cells = "";
    for (let k = 0; k < len; k++) {
      const head = k === len - 1;
      const w = f(1.3 + r() * 1.3);
      const look = `width="${w}" height="2.6" fill="${head ? "#f4ffd8" : "#c9f24a"}" opacity="${head ? 1 : f(0.12 + (0.6 * k) / len)}"`;
      cells += `<rect x="${x}" y="${f(y0 + k * 3.7)}" ${look}/><rect x="${x}" y="${f(y0 + k * 3.7 - 120)}" ${look}/>`;
    }
    rain += `<g>${cells}</g>`;
  }
  const pill = (x: number, y: number, a: number, grad: string, glow: string) =>
    `<g class="fm-pill"><ellipse cx="${x}" cy="${y + 15}" rx="11" ry="1.8" fill="#000" opacity=".45"/><circle cx="${x}" cy="${y}" r="22" fill="url(#${glow})"/>` +
    `<g transform="translate(${x} ${y}) rotate(${a})"><rect x="-15" y="-6.5" width="30" height="13" rx="6.5" fill="url(#${grad})"/>` +
    `<path d="M0 -6.5V6.5" stroke="#000" stroke-opacity=".28" stroke-width=".7"/><rect x="-11.5" y="-4.6" width="20" height="2.6" rx="1.3" fill="#fff" opacity=".6"/></g></g>`;
  return svg(
    "pills",
    `<defs>${rad("fs-pl-bg", [[0, "#0d2e18"], [1, "#020805"]], 0.5, 0.45, 0.7)}${lin("fs-pl-red", [[0, "#ff8a98"], [0.5, "#e5243b"], [1, "#8f0f22"]])}${lin("fs-pl-blue", [[0, "#8fa6ff"], [0.5, "#2433ff"], [1, "#10187a"]])}${rad("fs-pl-rg", [[0, "#ff2e3b", 0.45], [1, "#ff2e3b", 0]])}${rad("fs-pl-bg2", [[0, "#4f6bff", 0.5], [1, "#4f6bff", 0]])}</defs>` +
      `<rect width="160" height="120" fill="url(#fs-pl-bg)"/>` +
      `<g class="fm-rain">${rain}</g>` +
      pill(52, 56, -24, "fs-pl-red", "fs-pl-rg") +
      pill(108, 56, 24, "fs-pl-blue", "fs-pl-bg2"),
  );
};

/** A shark, a beach, and a boat that's too small. */
const shark = () => {
  let surf = "M-10 46";
  for (let i = 0; i < 18; i++) surf += "q2.5-1.4 5 0t5 0";
  return svg(
    "shark",
    `<defs>${lin("fs-sk-sky", [[0, "#ff9a5a"], [1, "#ffd23f"]])}${lin("fs-sk-sea", [[0, "#2433ff"], [0.6, "#121a63"], [1, "#07081c"]])}${lin("fs-sk-body", [[0, "#8391cc"], [1, "#45528f"]])}</defs>` +
      `<rect width="160" height="47" fill="url(#fs-sk-sky)"/>` +
      `<circle cx="124" cy="40" r="11" fill="#fff6c4"/>` +
      `<path d="M0 40Q18 35 38 41L40 47H0Z" fill="#f3d9a0"/>` +
      `<path d="M12 40V31" stroke="#0a0d33" stroke-width=".6"/><path d="M5.5 32Q12 24.5 18.5 32Z" fill="#ff4fb8"/><path d="M10 32Q12 24.5 14 32Z" fill="#eef0ff"/>` +
      `<rect y="46" width="160" height="74" fill="url(#fs-sk-sea)"/>` +
      `<g fill="#eef0ff" opacity=".07"><path d="M40 46H54L30 120H8Z"/><path d="M84 46H94L84 120H64Z"/><path d="M120 46H132L150 120H124Z"/></g>` +
      `<g class="fm-shark">` +
      `<path d="M24 78Q30 66 52 63L66 64L76 50L86 64Q112 66 132 72L150 58L148 76L156 94L132 82Q112 90 80 92L72 101L66 92Q44 92 24 78Z" fill="url(#fs-sk-body)"/>` +
      `<path d="M27 80Q44 90 66 91Q90 91 112 86Q90 86 64 85Q42 84 27 80Z" fill="#dfe3ff"/>` +
      `<path d="M25 78.6L46 82L30 86.6Q25.4 83.4 25 78.6Z" fill="#3a0d1a"/>` +
      teeth(26.5, 79.4, 44, 82, 6, 2, 1) +
      teeth(31, 86, 44, 82.6, 4, 1.8, -1) +
      `<path d="M56 70Q54 75 56 80M60 70Q58 75 60 80M64 70Q62 75 64 80" stroke="#2c3770" stroke-width=".7" fill="none"/>` +
      `<circle cx="40" cy="73" r="1.6" fill="#07081c"/><circle cx="40.5" cy="72.5" r=".5" fill="#fff"/>` +
      `<path d="M62 84L57 98L74 87Z" fill="#45528f"/>` +
      `</g>` +
      `<g fill="none" stroke="#eef0ff" stroke-width=".4" opacity=".6"><circle cx="30" cy="70" r="1"/><circle cx="27" cy="64" r=".7"/><circle cx="31" cy="58" r=".5"/></g>` +
      `<g class="fm-boat">` +
      `<path d="M79 42V29" stroke="#0a0d33" stroke-width=".7"/><path d="M79 29L84.5 30.6L79 32.2Z" fill="#ff4fb8"/>` +
      `<path d="M63 36H72V42H63Z" fill="#eef0ff"/><rect x="62" y="35" width="11" height="1.4" fill="#ff5b1f"/>` +
      `<rect x="64.4" y="37.6" width="2.6" height="2.2" fill="#2433ff"/><rect x="68.2" y="37.6" width="2.6" height="2.2" fill="#2433ff"/>` +
      `<circle cx="76" cy="38.6" r="1" fill="#0a0d33"/><path d="M75 39.8h2v2.2h-2Z" fill="#0a0d33"/>` +
      `<path d="M58 42H86L82 49H61Z" fill="#eef0ff"/><path d="M59.3 44.2H85" stroke="#ff5b1f" stroke-width="1.2"/>` +
      `</g>` +
      `<rect x="56" y="46.4" width="32" height="3.2" fill="#2433ff" opacity=".55"/>` +
      `<path class="fm-surf" d="${surf}" fill="none" stroke="#eef0ff" stroke-width=".8" opacity=".8"/>`,
  );
};

/** A dream inside a dream: a city folded over itself, a top that won't stop spinning. */
const city = (seed: number, base: number, h0: number, h1: number, fill: string, lit: string) => {
  const r = seeded(seed);
  let blocks = "";
  let windows = "";
  for (let x = -2; x < 162; ) {
    const w = 6 + r() * 9;
    const h = h0 + r() * (h1 - h0);
    blocks += `<rect x="${f(x)}" y="${f(base - h)}" width="${f(w)}" height="${f(h)}"/>`;
    for (let wy = base - h + 2.5; wy < base - 2; wy += 3.4)
      for (let wx = x + 1.5; wx < x + w - 1.5; wx += 2.6) if (r() < 0.22) windows += `<rect x="${f(wx)}" y="${f(wy)}" width="1" height="1.4"/>`;
    x += w + 0.8;
  }
  return `<g fill="${fill}">${blocks}</g><g fill="${lit}">${windows}</g>`;
};
const top = () =>
  svg(
    "top",
    `<defs>${lin("fs-tp-sky", [[0, "#9aa5ff"], [0.5, "#eef0ff"], [1, "#b8c0ff"]])}${lin("fs-tp-metal", [[0, "#5a5f80"], [0.35, "#eef0ff"], [0.6, "#b9bfd8"], [1, "#3a3f5c"]], 1, 0)}</defs>` +
      `<rect width="160" height="120" fill="url(#fs-tp-sky)"/>` +
      `<g transform="rotate(-5 80 0) translate(0 120) scale(1 -1)">${city(3, 120, 14, 36, "#2433ff", "#ffd23f")}</g>` +
      city(9, 102, 14, 42, "#0a0d33", "#ffd23f") +
      `<rect y="101.6" width="160" height="18.4" fill="#0a0d33"/>` +
      `<g fill="none" stroke="#0a0d33" stroke-width=".7" opacity=".45"><rect x="22" y="22" width="116" height="74" transform="rotate(-3 80 59)"/><rect x="38" y="32" width="84" height="54" transform="rotate(4 80 59)"/><rect x="52" y="40" width="56" height="38" transform="rotate(-6 80 59)"/></g>` +
      `<ellipse cx="80" cy="86" rx="18" ry="3.6" fill="#eef0ff" stroke="#0a0d33" stroke-width=".6"/>` +
      `<ellipse cx="80" cy="85.6" rx="7" ry="1.3" fill="#0a0d33" opacity=".3"/>` +
      `<g class="fm-whirl" fill="none" stroke="#0a0d33" stroke-width=".6" opacity=".6" stroke-linecap="round"><path d="M62 50Q57 56 62 62"/><path d="M98 50Q103 56 98 62"/><path d="M58 47Q51 56 58 65"/><path d="M102 47Q109 56 102 65"/></g>` +
      `<g class="fm-top">` +
      `<rect x="79" y="40" width="2" height="9" rx=".8" fill="#3a3f5c"/>` +
      `<path d="M67 53Q80 45 93 53L81.4 82.4Q80 85 78.6 82.4Z" fill="url(#fs-tp-metal)"/>` +
      `<ellipse cx="80" cy="53" rx="13" ry="3.2" fill="#eef0ff" stroke="#3a3f5c" stroke-width=".5"/>` +
      `<path class="fm-band" d="M69.4 58Q80 62.6 90.6 58" fill="none" stroke="#ff4fb8" stroke-width="1.6" stroke-dasharray="3 2"/>` +
      `<path class="fm-band" d="M72.6 66Q80 69 87.4 66" fill="none" stroke="#2433ff" stroke-width="1.2" stroke-dasharray="2 3"/>` +
      `</g>`,
  );

/** The toys come alive when you leave the room. */
const block = (x: number, y: number, s: number, face: string, topFace: string, letter: string) =>
  `<path d="M${x} ${y}l${f(s * 0.3)} ${f(-s * 0.3)}h${s}l${f(-s * 0.3)} ${f(s * 0.3)}Z" fill="${topFace}"/>` +
  `<path d="M${x + s} ${y}l${f(s * 0.3)} ${f(-s * 0.3)}v${s}l${f(-s * 0.3)} ${f(s * 0.3)}Z" fill="#0a0d33" opacity=".35"/>` +
  `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${face}"/>` +
  `<text x="${f(x + s / 2)}" y="${f(y + s * 0.74)}" font-size="${f(s * 0.66)}" font-weight="900" text-anchor="middle" fill="#0a0d33">${letter}</text>`;
const toys = () =>
  svg(
    "toys",
    `<defs>${lin("fs-ty-wall", [[0, "#151d9e"], [1, "#2433ff"]])}${lin("fs-ty-lt", [[0, "#ffd23f", 0.55], [1, "#ffd23f", 0]])}</defs>` +
      `<rect width="160" height="120" fill="url(#fs-ty-wall)"/>` +
      `<g opacity=".35">${stars(77, 24, 78)}</g>` +
      `<rect x="14" y="14" width="30" height="24" rx="1" fill="#0a0d33"/><rect x="16" y="16" width="26" height="20" fill="#121a63"/><circle cx="34" cy="23" r="4" fill="#eef0ff"/><path d="M29 16V36M16 26H42" stroke="#0a0d33" stroke-width="1.4"/>` +
      `<rect x="124" y="20" width="32" height="64" fill="#0a0d33"/><rect x="126" y="22" width="28" height="62" fill="#ffd23f"/>` +
      `<path d="M126 22L146 17V89L126 84Z" fill="#2a35c0"/><circle cx="143" cy="54" r="1.2" fill="#ffd23f"/>` +
      `<rect y="84" width="160" height="36" fill="#6b3418"/>` +
      `<path d="M0 92H160M0 102H160M0 114H160M30 84V92M90 84V92M60 92V102M120 92V102M20 102V114M100 102V114" stroke="#4a230f" stroke-width=".5"/>` +
      `<rect y="82.5" width="160" height="1.8" fill="#eef0ff" opacity=".35"/>` +
      `<path d="M146 84H154L150 120H110Z" fill="url(#fs-ty-lt)"/>` +
      block(6, 72, 12, "#ffd23f", "#fff0a8", "A") +
      block(19, 72, 12, "#ff4fb8", "#ffb3df", "B") +
      block(12.5, 60, 12, "#c9f24a", "#e9ffb0", "C") +
      `<g class="fm-robot">` +
      `<rect x="44" y="73" width="4" height="9" fill="#8a90ad"/><rect x="52" y="73" width="4" height="9" fill="#8a90ad"/>` +
      `<rect x="42.5" y="81" width="6.5" height="3" rx="1" fill="#3a3f5c"/><rect x="51" y="81" width="6.5" height="3" rx="1" fill="#3a3f5c"/>` +
      `<rect x="35.5" y="58" width="4.5" height="12" rx="1.6" fill="#c9cde0"/>` +
      `<g class="fm-wave"><rect x="60" y="46" width="4.5" height="13" rx="1.6" fill="#c9cde0"/></g>` +
      `<rect x="40" y="56" width="20" height="18" rx="2.5" fill="#ff5b1f"/><rect x="44" y="60" width="12" height="8" rx="1" fill="#0a0d33"/>` +
      `<circle cx="47" cy="64" r="1.2" fill="#c9f24a"/><circle cx="50.5" cy="64" r="1.2" fill="#ffd23f"/><circle cx="54" cy="64" r="1.2" fill="#ff4fb8"/>` +
      `<rect x="47.5" y="53" width="5" height="3" fill="#3a3f5c"/>` +
      `<path d="M50 38V32" stroke="#3a3f5c" stroke-width=".8"/><circle cx="50" cy="31" r="1.6" fill="#ff4fb8"/>` +
      `<rect x="39" y="42" width="2.4" height="6" rx=".8" fill="#8a90ad"/><rect x="58.6" y="42" width="2.4" height="6" rx=".8" fill="#8a90ad"/>` +
      `<rect x="41" y="38" width="18" height="15" rx="3" fill="#c9cde0"/>` +
      `<circle cx="46" cy="44.5" r="3.2" fill="#0a0d33"/><circle cx="54" cy="44.5" r="3.2" fill="#0a0d33"/>` +
      `<g class="fm-blink"><circle cx="46" cy="44.5" r="2.2" fill="#ffd23f"/><circle cx="54" cy="44.5" r="2.2" fill="#ffd23f"/><circle cx="46.7" cy="43.8" r=".7" fill="#fff"/><circle cx="54.7" cy="43.8" r=".7" fill="#fff"/></g>` +
      `<path d="M45 49.8h10" stroke="#3a3f5c" stroke-width="1.6" stroke-dasharray="1.2 .8"/>` +
      `</g>` +
      `<g class="fm-teddy">` +
      `<ellipse cx="81.5" cy="71" rx="3" ry="5.5" transform="rotate(28 81.5 71)" fill="#a5642f"/><ellipse cx="102.5" cy="71" rx="3" ry="5.5" transform="rotate(-28 102.5 71)" fill="#a5642f"/>` +
      `<ellipse cx="92" cy="74" rx="11" ry="10" fill="#b8733a"/><ellipse cx="92" cy="76" rx="6.5" ry="6" fill="#e8b98a"/>` +
      `<ellipse cx="84" cy="82" rx="4.6" ry="3.2" fill="#b8733a"/><ellipse cx="100" cy="82" rx="4.6" ry="3.2" fill="#b8733a"/>` +
      `<ellipse cx="83.4" cy="82.4" rx="2.2" ry="1.8" fill="#e8b98a"/><ellipse cx="100.6" cy="82.4" rx="2.2" ry="1.8" fill="#e8b98a"/>` +
      `<g class="fm-tilt">` +
      `<circle cx="84" cy="52" r="4" fill="#b8733a"/><circle cx="100" cy="52" r="4" fill="#b8733a"/><circle cx="84" cy="52" r="2" fill="#e8b98a"/><circle cx="100" cy="52" r="2" fill="#e8b98a"/>` +
      `<circle cx="92" cy="59" r="9.5" fill="#b8733a"/><ellipse cx="92" cy="62.5" rx="4.2" ry="3.2" fill="#e8b98a"/><ellipse cx="92" cy="61.2" rx="1.5" ry="1" fill="#0a0d33"/>` +
      `<circle cx="88.4" cy="57" r="1.2" fill="#0a0d33"/><circle cx="95.6" cy="57" r="1.2" fill="#0a0d33"/><circle cx="88.8" cy="56.6" r=".35" fill="#fff"/><circle cx="96" cy="56.6" r=".35" fill="#fff"/>` +
      `<path d="M90.5 63.8Q92 65.2 93.5 63.8" stroke="#0a0d33" stroke-width=".5" fill="none"/>` +
      `</g></g>` +
      `<g transform="rotate(-12 114 72)"><path d="M110 82V64Q114 54 118 64V82Z" fill="#eef0ff"/><path d="M111.2 59.5Q114 53.6 116.8 59.5Z" fill="#ff4fb8"/>` +
      `<circle cx="114" cy="67" r="1.9" fill="#2433ff" stroke="#0a0d33" stroke-width=".5"/><path d="M110 74L106 83H110ZM118 74L122 83H118Z" fill="#ff4fb8"/></g>` +
      `<circle cx="68" cy="89" r="5" fill="#ffd23f"/><path d="M63 89Q68 85 73 89" stroke="#ff4fb8" stroke-width="1.6" fill="none"/>`,
  );

/** A car, 88 miles per hour, and 1955: fire trails on a night road. */
const car = () =>
  svg(
    "car",
    `<defs>${lin("fs-cr-sky", [[0, "#07081c"], [0.55, "#3a0d4a"], [1, "#ff4fb8"]])}${lin("fs-cr-sun", [[0, "#ffd23f"], [1, "#ff4fb8"]])}${lin("fs-cr-fire", [[0, "#fff6c4"], [0.25, "#ffd23f"], [0.6, "#ff5b1f"], [1, "#ff5b1f", 0]])}</defs>` +
      `<rect width="160" height="60" fill="url(#fs-cr-sky)"/>` +
      stars(88, 22, 34) +
      `<circle cx="80" cy="60" r="24" fill="url(#fs-cr-sun)"/>` +
      `<g fill="#5a1450"><rect x="54" y="45" width="52" height="1.2"/><rect x="54" y="50" width="52" height="1.8"/><rect x="54" y="55" width="52" height="2.6"/></g>` +
      `<path d="M0 60L14 50L26 56L40 46L56 58L64 54L72 60ZM88 60L98 52L110 57L124 45L138 55L150 49L160 54V60Z" fill="#14163a"/>` +
      `<rect y="60" width="160" height="60" fill="#0b0c26"/>` +
      `<path d="M80 60L-120 120M80 60L-60 120M80 60L0 120M80 60L40 120M80 60L120 120M80 60L160 120M80 60L220 120M80 60L280 120M0 62H160M0 65H160M0 69.5H160M0 76H160M0 85H160M0 98H160M0 116H160" stroke="#ff4fb8" stroke-width=".5" opacity=".5"/>` +
      `<path d="M74 60H86L132 120H28Z" fill="#14163a"/>` +
      `<g fill="#ffd23f"><rect x="79.6" y="62" width=".8" height="2"/><rect x="79.3" y="67" width="1.4" height="3"/></g>` +
      `<g class="fm-fire"><path d="M59 89H66L52 120H32Z" fill="url(#fs-cr-fire)"/><path d="M94 89H101L128 120H108Z" fill="url(#fs-cr-fire)"/></g>` +
      `<ellipse cx="80" cy="90" rx="31" ry="2.4" fill="#000" opacity=".5"/>` +
      `<g class="fm-car">` +
      `<rect x="54" y="84" width="10" height="7" rx="1.5" fill="#05061a"/><rect x="96" y="84" width="10" height="7" rx="1.5" fill="#05061a"/>` +
      `<path d="M51 74H109L110 86H50Z" fill="#b9bfd8"/>` +
      `<path d="M58 74L62 64Q63 62 66 62H94Q97 62 98 64L102 74Z" fill="#d6dbee"/>` +
      `<path d="M62 73L65 65H95L98 73Z" fill="#0a0d33"/><path d="M63 71H97M63.8 69H96.2M64.6 67H95.4" stroke="#8a90ad" stroke-width=".6"/>` +
      `<rect x="51" y="74.6" width="16" height="6.2" rx="3" fill="#ff2e3b" opacity=".3"/><rect x="93" y="74.6" width="16" height="6.2" rx="3" fill="#ff2e3b" opacity=".3"/>` +
      `<rect x="52.5" y="76" width="13" height="3.4" fill="#ff2e3b"/><rect x="94.5" y="76" width="13" height="3.4" fill="#ff2e3b"/>` +
      `<rect x="66" y="76" width="28" height="3.4" fill="#3a3f5c"/><path d="M68 77.7H92" stroke="#8a90ad" stroke-width=".5" stroke-dasharray="1.4 1"/>` +
      `<path d="M50 80.6H110" stroke="#8a90ad" stroke-width=".4"/><rect x="74" y="81" width="12" height="3.6" rx=".5" fill="#ffd23f"/>` +
      `<rect x="50" y="84.6" width="60" height="1.6" fill="#3a3f5c"/>` +
      `</g>` +
      `<g class="fm-zap" fill="none" stroke="#9fd2ff" stroke-width=".7" stroke-linejoin="round"><path d="M48 72l-4-3 2-2-4-4"/><path d="M112 72l4-3-2-2 4-4"/><path d="M70 61l-2-5h3l-2-5"/><path d="M90 61l2-5h-3l2-5"/></g>` +
      `<path class="fm-bolt" d="M132 4L125 17H130L122 32L136 14H130L136 4Z" fill="#eef0ff"/>` +
      `<g><rect x="8" y="8" width="38" height="17" rx="2" fill="#07081c" stroke="#ff5b1f" stroke-width=".8"/>` +
      `<text x="11.5" y="21.6" font-size="13" font-weight="900" fill="#ff5b1f">88</text><text x="30" y="21" font-size="5" font-weight="800" fill="#ff5b1f">MPH</text></g>`,
  );

/** He said he'd be back: dark glasses, one red eye behind a cracked lens. */
const shades = () =>
  svg(
    "shades",
    `<defs>${rad("fs-sd-bg", [[0, "#4a0f22"], [1, "#07081c"]], 0.5, 0.45, 0.75)}${lin("fs-sd-lens", [[0, "#2b3050"], [0.5, "#0a0d33"], [1, "#05061a"]], 1, 1)}${rad("fs-sd-eye", [[0, "#ffffff"], [0.25, "#ff2e3b"], [1, "#ff2e3b", 0]])}</defs>` +
      `<rect width="160" height="120" fill="url(#fs-sd-bg)"/>` +
      `<path d="M0 30H160M0 60H160M0 90H160M40 0V120M120 0V120" stroke="#ff2e3b" stroke-width=".4" opacity=".3"/>` +
      `<path d="M14 120Q20 104 52 100L66 106H94L108 100Q140 104 146 120Z" fill="#0a0d33"/>` +
      `<path d="M52 100L66 106L60 120H40ZM108 100L94 106L100 120H120Z" fill="#141733"/><path d="M52 100L62 120M108 100L98 120" stroke="#3a3f5c" stroke-width=".6"/>` +
      `<path d="M66 98H94V108H66Z" fill="#1b1e40"/>` +
      `<rect x="48.6" y="44" width="4" height="13" rx="2" fill="#1b1e40"/><rect x="107.4" y="44" width="4" height="13" rx="2" fill="#1b1e40"/>` +
      `<path d="M52 46Q52 16 80 16Q108 16 108 46V78Q108 96 92 104H68Q52 96 52 78Z" fill="#1b1e40"/>` +
      `<path d="M52 42Q52 13 80 13Q108 13 108 42Q100 29 80 29Q60 29 52 42Z" fill="#0a0d33"/>` +
      `<path d="M106 50V78Q106 92 93 100" stroke="#ff2e3b" stroke-width="1" fill="none" opacity=".4"/>` +
      `<path d="M72 86Q80 88 88 86" stroke="#0a0d33" stroke-width="1.2" fill="none" stroke-linecap="round"/>` +
      `<path d="M47 44H113V48L109 49Q107 61 94.5 61Q84 61 82 50H78Q76 61 65.5 61Q53 61 51 49L47 48Z" fill="url(#fs-sd-lens)"/>` +
      `<path d="M47 44H113" stroke="#3a3f5c" stroke-width="1.2"/>` +
      `<path d="M56 47.2H62L58 57H54ZM86 47.2H92L88 57H84Z" fill="#fff" opacity=".16"/>` +
      `<g class="fm-red"><circle cx="95" cy="52" r="9" fill="url(#fs-sd-eye)" opacity=".75"/><circle cx="95" cy="52" r="1.8" fill="#fff"/></g>` +
      `<path d="M95 52l4.4-4.4M95 52l5.4 2M95 52l-3 5.4M95 52l-4.6-3" stroke="#eef0ff" stroke-width=".35" opacity=".7"/>` +
      `<circle class="fm-ret" cx="95" cy="52" r="6.4" fill="none" stroke="#ff2e3b" stroke-width=".45" stroke-dasharray="2 1.4"/>` +
      `<path d="M30 12H23V20M130 12H137V20M30 104H23V96M130 104H137V96" fill="none" stroke="#ff2e3b" stroke-width=".8"/>` +
      `<g class="fm-hud" fill="#ff2e3b" opacity=".85"><rect x="6" y="38" width="16" height="1.6"/><rect x="6" y="42" width="11" height="1.6"/><rect x="6" y="46" width="14" height="1.6"/><rect x="6" y="50" width="8" height="1.6"/><rect x="140" y="62" width="14" height="1.6"/><rect x="144" y="66" width="10" height="1.6"/><rect x="138" y="70" width="16" height="1.6"/></g>` +
      `<rect class="fm-scan" width="160" height="1.2" fill="#ff2e3b" opacity=".35"/>`,
  );

/** Scene markup by film id, built on first use. */
export const SCENES: Record<string, () => string> = { swords, ring, dino, ship, pills, shark, top, toys, car, shades };
