import { type Locale } from "@package/shared/locales";

/**
 * Locale typography at render time (site/i18n.md § Formatting rules). Catalogs never hold raw no-break
 * spaces, so the binding happens here:
 * - pl: a one-letter word (w, z, i, a, o, u...) never ends a line ("sierotki"),
 * - es: the same for the one-letter conjunctions and prepositions (y, e, o, u, a),
 * - all: a number stays with the unit or word after it ("390 px", "4 lata").
 */
const NBSP = "\u00a0";
const SHORT: Record<Locale, RegExp | null> = {
  pl: /(?<=^|[\s(„"])([aiouwzAIOUWZ])\s+/g,
  es: /(?<=^|[\s(¿¡"])([yeouaYEOUA])\s+/g,
  en: /(?<=^|[\s("])([aAI])\s+/g,
};
const NUMBER_UNIT = /(\d)\s+(?=[\p{L}%])/gu;

export function typo(locale: Locale, text: string): string {
  let out = text.replace(NUMBER_UNIT, `$1${NBSP}`);
  const short = SHORT[locale];
  // A lookbehind, so back-to-back short words ("a w Polsce") all bind in one pass.
  if (short) out = out.replace(short, `$1${NBSP}`);
  return out;
}
