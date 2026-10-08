/**
 * What the site font (scripts/fonts.mjs) and the CV fonts (scripts/cv-fonts.mjs) share: the OFL source, its cache and
 * the characters the copy uses, so a letter added for one is never missing from the other.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(ROOT, ".cache", "fonts");
const GF = "https://raw.githubusercontent.com/google/fonts/main/ofl";

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => String.fromCodePoint(from + i)).join("");
const POLISH = "ĄąĆćĘęŁłŃńÓóŚśŹźŻż";
// Latvian and Lithuanian place names on the credentials (Saraiķi, Daugirdiškės) [owner's certificates 2026-10-06].
const BALTIC = "ĖėĶķŠš";
// En and em dash, quotes („ ” ‘ ’), bullet, ellipsis, angle quotes, euro, arrows (← ↑ → ↓ ↗ ↘), minus, primes,
// thin spaces, superscript five (Polish article numbers such as art. 385⁵).
const PUNCT =
  "\u2013\u2014\u2018\u2019\u201A\u201C\u201D\u201E\u2022\u2026\u2039\u203A\u20AC\u2190\u2191\u2192\u2193\u2197\u2198\u2212\u2032\u2033\u2009\u202F\u2075";

/** Latin + Latin-1 (covers es) + the Polish and Baltic letters + the punctuation and arrows the copy uses. */
export const TEXT = range(0x20, 0x7e) + range(0xa0, 0xff) + POLISH + BALTIC + PUNCT;
// Layout features the copy needs; tnum/lnum for dates and metrics, case for all-caps labels.
export const FEATURES = ["kern", "liga", "clig", "calt", "ccmp", "locl", "mark", "mkmk", "rlig", "tnum", "lnum", "case"];

export const SOURCES = {
  anybody: { file: "anybody/Anybody%5Bwdth%2Cwght%5D.ttf", licence: "anybody/OFL.txt", name: "Anybody" },
};

/** A google/fonts file, downloaded once into .cache/fonts/ (gitignored). */
export async function fetchCached(path, name) {
  mkdirSync(CACHE, { recursive: true });
  const file = join(CACHE, name);
  if (!existsSync(file)) {
    const res = await fetch(`${GF}/${path}`);
    if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
  return file;
}
