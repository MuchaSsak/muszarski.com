import { FIT_METRICS } from "~/lib/fit-metrics.gen";

/**
 * Fitted poster type at build time (design.md § Typography, "fit"). Every line of a fitted block runs edge to edge:
 * the widest line at the base width sets the font size, every other line takes the `wdth` that makes it exactly as
 * wide. Advance widths and kerning of Anybody 900 are linear in `wdth` (scripts/fonts.mjs measured 50 and 150), so
 * both answers are exact and the CSS needs no JS: the size is in `cqi` of the fit host, the width a `font-stretch`.
 */
const [LO, HI] = FIT_METRICS.wdth;
const lerp = ([a, b]: readonly [number, number], k: number) => a + (b - a) * k;

/** Width of one uppercase line in em at a given `wdth`. Throws on a character the metrics don't hold. */
export function lineEm(text: string, wdth: number): number {
  const k = (wdth - LO) / (HI - LO);
  const chars = [...text];
  let em = 0;
  chars.forEach((char, i) => {
    const adv = FIT_METRICS.adv[char];
    if (!adv) throw new Error(`fit: no metrics for "${char}" in "${text}"; add it to DISPLAY in scripts/fonts.mjs`);
    em += lerp(adv, k);
    const pair = i > 0 ? FIT_METRICS.kern[chars[i - 1] + char] : undefined;
    if (pair) em += lerp(pair, k);
  });
  return em;
}

export interface Fit {
  /** Font size in `cqi` of the host (100 = the host's inline size). */
  size: number;
  /** `wdth` per line, 50-150. */
  wdth: number[];
}

/**
 * @param lines the lines as shown (uppercased here with the locale's rules)
 * @param base the `wdth` the widest line is set at; narrower bases give taller type
 * @param fill share of the host width to fill (a hair under 1 absorbs rounding between the build and the browser)
 */
export function fitLines(lines: readonly string[], base: number, locale = "en", fill = 0.995): Fit {
  const upper = lines.map((line) => line.toLocaleUpperCase(locale));
  const target = Math.max(...upper.map((line) => lineEm(line, base)));
  const wdth = upper.map((line) => {
    const lo = lineEm(line, LO);
    const hi = lineEm(line, HI);
    const w = LO + ((target - lo) / (hi - lo)) * (HI - LO);
    return Math.round(Math.min(HI, Math.max(LO, w)) * 100) / 100;
  });
  return { size: Math.round(((100 * fill) / target) * 1000) / 1000, wdth };
}
