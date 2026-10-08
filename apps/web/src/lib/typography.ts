import { type Locale } from "@package/shared/locales";

/**
 * Locale typography at render time (site/i18n.md § Formatting rules). Catalogs never hold raw no-break
 * spaces, so the binding happens here:
 * - pl: a one-letter word (w, z, i, a, o, u...) never ends a line ("sierotki"),
 * - es: the same for the one-letter conjunctions and prepositions (y, e, o, u, a),
 * - all: a number stays with the unit or word after it ("390 px", "4 lata"),
 * - all: a "·" separator stays with the word before it and "§" with its number, so no line starts with either.
 *
 * `typoHtml` runs the same rules over every rendered page (middleware.ts), so text from data files, MDX and titles is
 * covered too, not only the strings passed through `typo` [user 2026-10-08: lonely "w" / "z" at line ends].
 */
const NBSP = "\u00a0";
const SHORT: Record<Locale, RegExp | null> = {
  pl: /(?<=^|[\s(„"])([aiouwzAIOUWZ])\s+/g,
  es: /(?<=^|[\s(¿¡"])([yeouaYEOUA])\s+/g,
  en: /(?<=^|[\s("])([aAI])\s+/g,
};
const NUMBER_UNIT = /(\d)\s+(?=[\p{L}%])/gu;
const SEPARATOR = /\s+(?=·\s)/g;
const SECTION = /§\s+(?=\d)/g;
/** Two-word product names read as one word ("React / Native" and "App / Store" split on the CV, 2026-10-08). */
const NAMES =
  /\b(React|App|Google|Claude|TanStack|Next|Vercel|Cloudflare|Solar System)\s+(Native|Store|Play|Code|Query|Analytics|Turnstile|Scope)\b/g;

export function typo(locale: Locale, text: string): string {
  let out = text
    .replace(NUMBER_UNIT, `$1${NBSP}`)
    .replace(SEPARATOR, NBSP)
    .replace(SECTION, `§${NBSP}`)
    .replace(NAMES, `$1${NBSP}$2`);
  const short = SHORT[locale];
  // A lookbehind, so back-to-back short words ("a w Polsce") all bind in one pass.
  if (short) out = out.replace(short, `$1${NBSP}`);
  return out;
}

/** Elements whose text is code, data or drawing, never prose. */
const RAW = /<(script|style|pre|code|kbd|samp|textarea|svg|template)\b[\s\S]*?<\/\1>/gi;
/** Marks a held raw element while the text around it is processed (a private-use character no page contains). */
const HOLD = String.fromCharCode(0xe000);
const HELD = new RegExp(`${HOLD}(\\d+)${HOLD}`, "g");

/** `typo` over the text of a whole HTML page: tags, attributes and raw elements stay byte for byte. */
export function typoHtml(locale: Locale, html: string): string {
  const raw: string[] = [];
  const held = html.replace(RAW, (block) => `${HOLD}${raw.push(block) - 1}${HOLD}`);
  const done = held.replace(
    /(^|>)([^<]+)(?=<|$)/g,
    (_, open: string, text: string) =>
      open +
      text
        .split(new RegExp(`(${HOLD}\\d+${HOLD})`))
        .map((part) => (part.startsWith(HOLD) ? part : typo(locale, part)))
        .join(""),
  );
  return done.replace(HELD, (_, i: string) => raw[Number(i)]!);
}
