#!/usr/bin/env node
/**
 * Build-time font subsetting (wiki: design/design.md § Typography, design/assets.md). Run when the type
 * changes: `bun run fonts`. The outputs are committed; the Vercel build never runs this.
 *
 *  1. Downloads the OFL sources from github.com/google/fonts (cached in .cache/fonts/, gitignored).
 *  2. Instances the variable Archivo into the static cuts we use (a static cut is ~12 KB; the full
 *     wdth+wght range is ~52 KB) and subsets every face to Latin + Latin-1 (covers es) + the Polish
 *     letters + the punctuation and arrows the copy uses.
 *  3. Writes public/fonts/<id>.<hash>.woff2 (immutable names), the OFL texts next to them,
 *     src/styles/fonts.css (@font-face + metric-matched local fallbacks: size-adjust and
 *     ascent/descent/line-gap overrides from fontkit, so the swap shifts nothing) and
 *     src/lib/fonts.gen.ts (the files to preload).
 *
 * Budget: <= 100 KB of fonts per page (product/requirements.md § Budgets).
 */
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import * as fontkitModule from "fontkit";
import subsetFont from "subset-font";

const fontkit = fontkitModule.default ?? fontkitModule;
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(ROOT, ".cache", "fonts");
const OUT = join(ROOT, "public", "fonts");
const GF = "https://raw.githubusercontent.com/google/fonts/main/ofl";

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => String.fromCodePoint(from + i)).join("");
const POLISH = "ĄąĆćĘęŁłŃńÓóŚśŹźŻż";
// Quotes („ ” ‘ ’), bullet, ellipsis, angle quotes, euro, arrows (← ↑ → ↓ ↗ ↘), minus, primes, thin spaces.
const PUNCT =
  "\u2018\u2019\u201A\u201C\u201D\u201E\u2022\u2026\u2039\u203A\u20AC\u2190\u2191\u2192\u2193\u2197\u2198\u2212\u2032\u2033\u2009\u202F";
const TEXT = range(0x20, 0x7e) + range(0xa0, 0xff) + POLISH + PUNCT;
const UNICODE_RANGE =
  "U+0020-007E, U+00A0-00FF, U+0104-0107, U+0118-0119, U+0141-0144, U+015A-015B, U+0179-017C, U+2009, U+2018-201E, U+2022, U+2026, U+2032-2033, U+2039-203A, U+202F, U+20AC, U+2190-2193, U+2197-2198, U+2212";
// Layout features the copy needs; tnum/lnum for dates and metrics, case for all-caps labels.
const FEATURES = ["kern", "liga", "clig", "calt", "ccmp", "locl", "mark", "mkmk", "rlig", "tnum", "lnum", "case"];
const SAMPLE = "Full-stack product engineer. Buduję produkty od pomysłu do wdrożenia. Ingeniero de producto 0123456789";

const SOURCES = {
  archivo: { file: "archivo/Archivo%5Bwdth%2Cwght%5D.ttf", licence: "archivo/OFL.txt", name: "Archivo" },
  plexMono400: { file: "ibmplexmono/IBMPlexMono-Regular.ttf", licence: "ibmplexmono/OFL.txt", name: "IBM Plex Mono" },
};

// `avgWidth` = averageWidth(SAMPLE) of the local face (arial.ttf, arialbd.ttf, cour.ttf), measured once on
// Windows 11 2026-10-05 and kept as a constant, so the generated CSS is the same on every machine.
const SANS_FALLBACK = { local: ["Arial", "Liberation Sans", "Helvetica"], avgWidth: 0.46653 };
const SANS_BOLD_FALLBACK = {
  local: ["Arial Bold", "Arial-BoldMT", "Liberation Sans Bold", "Helvetica Bold"],
  avgWidth: 0.50118,
};
const MONO_FALLBACK = { local: ["Courier New", "Liberation Mono"], avgWidth: 0.6001 };

/** The faces we ship. `axes` instances the variable source; `preload` = on the LCP path (the H1). */
const FACES = [
  { id: "archivo-400", source: "archivo", family: "Archivo", weight: 400, axes: { wght: 400, wdth: 100 }, fallback: SANS_FALLBACK },
  { id: "archivo-600", source: "archivo", family: "Archivo", weight: 600, axes: { wght: 600, wdth: 100 }, fallback: SANS_BOLD_FALLBACK },
  {
    id: "archivo-expanded-800",
    source: "archivo",
    family: "Archivo Expanded",
    weight: 800,
    axes: { wght: 800, wdth: 125 },
    fallback: SANS_BOLD_FALLBACK,
    // Display sizes only (>= 28 px): hinting buys nothing there.
    noHinting: true,
    preload: true,
  },
  { id: "plex-mono-400", source: "plexMono400", family: "IBM Plex Mono", weight: 400, fallback: MONO_FALLBACK },
];

async function fetchCached(path, name) {
  mkdirSync(CACHE, { recursive: true });
  const file = join(CACHE, name);
  if (!existsSync(file)) {
    const res = await fetch(`${GF}/${path}`);
    if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
  return file;
}

/** Average advance of the sample text, in em (weighted by real copy, not xAvgCharWidth). */
function averageWidth(font) {
  const run = font.layout(SAMPLE);
  const total = run.glyphs.reduce((sum, glyph) => sum + glyph.advanceWidth, 0);
  return total / SAMPLE.length / font.unitsPerEm;
}

function fallbackFace(face, subset) {
  const font = fontkit.create(subset);
  const sizeAdjust = averageWidth(font) / face.fallback.avgWidth;
  const em = font.unitsPerEm;
  const pct = (value) => `${((value / em / sizeAdjust) * 100).toFixed(2)}%`;
  return [
    "@font-face {",
    `  font-family: "${face.family} Fallback";`,
    `  src: ${face.fallback.local.map((name) => `local("${name}")`).join(", ")};`,
    `  font-weight: ${face.weight};`,
    `  size-adjust: ${(sizeAdjust * 100).toFixed(2)}%;`,
    `  ascent-override: ${pct(font.ascent)};`,
    `  descent-override: ${pct(Math.abs(font.descent))};`,
    `  line-gap-override: ${pct(font.lineGap)};`,
    "}",
  ].join("\n");
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  for (const old of readdirSync(OUT)) if (old.endsWith(".woff2")) rmSync(join(OUT, old));

  const css = ["/* GENERATED by scripts/fonts.mjs - do not edit. Self-hosted OFL fonts (never a font CDN). */"];
  const manifest = [];
  let total = 0;
  for (const face of FACES) {
    const source = SOURCES[face.source];
    const buffer = readFileSync(await fetchCached(source.file, `${face.source}.ttf`));
    const licence = await fetchCached(source.licence, `${face.source}-OFL.txt`);
    copyFileSync(licence, join(OUT, `LICENSE-${source.name.replaceAll(" ", "")}.txt`));

    const out = await subsetFont(buffer, TEXT, {
      targetFormat: "woff2",
      variationAxes: face.axes,
      keepFeatures: FEATURES,
      noHinting: face.noHinting ?? false,
    });
    const hash = createHash("sha256").update(out).digest("hex").slice(0, 8);
    const name = `${face.id}.${hash}.woff2`;
    writeFileSync(join(OUT, name), out);
    total += out.length;
    manifest.push({ id: face.id, href: `/fonts/${name}`, bytes: out.length, preload: face.preload ?? false });
    css.push(
      [
        "@font-face {",
        `  font-family: "${face.family}";`,
        `  src: url("/fonts/${name}") format("woff2");`,
        "  font-style: normal;",
        `  font-weight: ${face.weight};`,
        "  font-display: swap;",
        `  unicode-range: ${UNICODE_RANGE};`,
        "}",
      ].join("\n"),
      fallbackFace(face, out),
    );
    console.log(`${name.padEnd(36)} ${(out.length / 1024).toFixed(1)} KB`);
  }
  writeFileSync(join(ROOT, "src", "styles", "fonts.css"), `${css.join("\n\n")}\n`);
  writeFileSync(
    join(ROOT, "src", "lib", "fonts.gen.ts"),
    `// GENERATED by scripts/fonts.mjs - do not edit.\nexport const FONT_FILES = ${JSON.stringify(manifest, null, 2)} as const;\n`,
  );
  console.log(`total ${(total / 1024).toFixed(1)} KB (budget 100 KB)`);
  if (total > 100 * 1024) process.exitCode = 1;
}

await main();
