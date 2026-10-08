#!/usr/bin/env node
/**
 * The CV PDF's fonts (wiki: content/content-model.md § CV, design/design.md § CV sheet). Chrome prints a variable
 * font into a PDF as Type 3 glyphs (measured 2026-10-08, Chromium 153), which some ATS parsers and PDF viewers handle
 * badly; a static instance embeds as TrueType with a clean text layer. So the CV sheet uses a few static instances of
 * Anybody, one per role, plus one per line of the fitted name (each word gets the width that makes it exactly as wide
 * as the widest one, the hero's fit).
 *
 *   bun run cv:fonts   (when a role or the name changes; the outputs are committed)
 *
 * Writes public/fonts/cv/anybody-<role>.<hash>.woff2, src/styles/cv-fonts.css (@font-face per role + the running
 * head) and src/lib/cv-fonts.gen.ts (the name lines and their width in em, so the sheet sizes the name at build time;
 * the sticker's outlines).
 */
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import * as fontkitModule from "fontkit";
import subsetFont from "subset-font";

import { FEATURES, fetchCached, SOURCES, TEXT } from "./fonts-shared.mjs";

const fontkit = fontkitModule.default ?? fontkitModule;
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "fonts", "cv");

/**
 * One static instance per typographic role of the sheet (design.md § CV sheet). `style` names the instance inside the
 * font (the PDF lists it as `AnybodyCV-<style>`): parsers that spot headings by a bold font name need a real name, not
 * the variable font's default "Anybody-Thin".
 */
const ROLES = [
  { id: "text", family: "CV Text", wght: 400, wdth: 100, style: "Regular" },
  { id: "strong", family: "CV Strong", wght: 700, wdth: 100, style: "Bold" },
  { id: "head", family: "CV Head", wght: 850, wdth: 78, style: "ExtraBoldCondensed" },
  { id: "label", family: "CV Label", wght: 800, wdth: 125, style: "ExtraBoldExpanded" },
];
/** The widest word of the name is set at this `wdth`; the others widen to match it. */
const NAME_BASE = 100;

/** SITE.name, read from the source so the name lives in one place. */
function siteName() {
  const match = readFileSync(join(ROOT, "src", "data", "site.ts"), "utf8").match(/\bname: "([^"]+)"/);
  if (!match) throw new Error("cv-fonts: SITE.name not found in src/data/site.ts");
  return match[1];
}

/**
 * The sticker on the band (the hero sticker's twin): a ring of text around the "M—M" mark, drawn as outlines so it
 * stays decoration and never reaches the PDF's text layer (an ATS reads the real links in the contact bar). The words
 * read the same in en, pl and es. Geometry in a 200 x 200 viewBox; the template draws the disc.
 */
const STICKER = { ring: "PORTFOLIO • MUSZARSKI.COM • ", core: "M—M", radius: 75, tracking: 0.1 };
const round = (d) => d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 10) / 10));

function stickerPaths(font) {
  const ring = font.getVariation({ wght: 800, wdth: 115 });
  const run = ring.layout(STICKER.ring);
  const advances = run.positions.map((position) => position.xAdvance / font.unitsPerEm);
  const em = advances.reduce((sum, adv) => sum + adv + STICKER.tracking, 0);
  const size = (2 * Math.PI * STICKER.radius) / em;
  const k = size / font.unitsPerEm;
  let s = 0;
  const ringD = run.glyphs.map((glyph, i) => {
    const adv = advances[i] * size;
    const angle = (s + adv / 2) / STICKER.radius;
    s += adv + STICKER.tracking * size;
    const [cos, sin] = [Math.cos(angle), Math.sin(angle)];
    const [px, py] = [100 + STICKER.radius * sin, 100 - STICKER.radius * cos];
    // Upright on the circle, baseline on the ring, centred on its slot: scale (y flips), rotate, move.
    const half = (advances[i] * font.unitsPerEm) / 2;
    return glyph.path.transform(k * cos, k * sin, k * sin, -k * cos, px - cos * k * half, py - sin * k * half).toSVG();
  });

  const core = font.getVariation({ wght: 900, wdth: 70 });
  const coreRun = core.layout(STICKER.core);
  const width = coreRun.positions.reduce((sum, position) => sum + position.xAdvance, 0);
  const kc = 92 / width;
  let x = 100 - 46;
  const coreD = coreRun.glyphs.map((glyph, i) => {
    const d = glyph.path.transform(kc, 0, 0, -kc, x, 100 + (font.capHeight * kc) / 2).toSVG();
    x += coreRun.positions[i].xAdvance * kc;
    return d;
  });
  return { ring: round(ringD.join("")), core: round(coreD.join("")), ringSize: Math.round(size * 100) / 100 };
}

/**
 * The running head on page 2 ("MATEUSZ MUSZARSKI · CV" and "2 / 2"), as outlines in SVGs for the @page margin boxes:
 * it names a loose second sheet without putting a second copy of the name, or a page number between two entries, into
 * the text layer, where a parser could read them as content. The sheet has at most two pages (cv-sheet.mjs fails a
 * third) and page 1 has no margin boxes, so the number is always "2 / 2". Cap height 1.8 mm (the 7.6 pt labels), cobalt.
 */
function runningHead(font, text) {
  const label = font.getVariation({ wght: 800, wdth: 125 });
  const run = label.layout(text);
  // Drawn in hundredths of a millimetre, so rounding to one decimal stays invisible.
  const k = 180 / font.capHeight;
  let x = 0;
  const d = run.glyphs.map((glyph, i) => {
    const path = glyph.path.transform(k, 0, 0, -k, x, 180).toSVG();
    x += run.positions[i].xAdvance * k;
    return path;
  });
  const width = Math.ceil(x);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width / 100}mm" height="1.8mm" viewBox="0 0 ${width} 180"><path fill="#2433ff" d="${round(d.join(""))}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const utf16 = (text) => Buffer.from(text, "utf16le").swap16();

/**
 * Rewrites a TrueType font's `name` table: family, style, full and PostScript names (Windows records), keeping every
 * other record the subset kept, the copyright notice included (OFL). Then reassembles the font with fresh checksums.
 */
function renameFont(ttf, names) {
  const buf = Buffer.from(ttf);
  const tables = new Map();
  for (let i = 0; i < buf.readUInt16BE(4); i++) {
    const o = 12 + 16 * i;
    const [offset, length] = [buf.readUInt32BE(o + 8), buf.readUInt32BE(o + 12)];
    tables.set(buf.toString("latin1", o, o + 4), Buffer.from(buf.subarray(offset, offset + length)));
  }
  const old = tables.get("name");
  const records = new Map();
  for (let i = 0; i < old.readUInt16BE(2); i++) {
    const r = 6 + 12 * i;
    const [platform, encoding, language, id, length, offset] = [0, 2, 4, 6, 8, 10].map((at) => old.readUInt16BE(r + at));
    const start = old.readUInt16BE(4) + offset;
    if (platform === 3 && encoding === 1 && language === 0x409) records.set(id, old.subarray(start, start + length));
  }
  for (const [id, text] of Object.entries(names)) records.set(Number(id), utf16(text));
  const ids = [...records.keys()].sort((a, b) => a - b);
  const head = Buffer.alloc(6 + 12 * ids.length);
  head.writeUInt16BE(ids.length, 2);
  head.writeUInt16BE(head.length, 4);
  let at = 0;
  ids.forEach((id, i) => {
    const r = 6 + 12 * i;
    [3, 1, 0x409, id, records.get(id).length, at].forEach((value, j) => head.writeUInt16BE(value, r + 2 * j));
    at += records.get(id).length;
  });
  tables.set("name", Buffer.concat([head, ...ids.map((id) => records.get(id))]));

  // Reassemble: tags sorted, each table 4-byte aligned, table checksums, then head.checkSumAdjustment.
  const pad = (b) => Buffer.concat([b, Buffer.alloc((4 - (b.length % 4)) % 4)]);
  const sum = (b) => {
    const padded = pad(b);
    let total = 0;
    for (let i = 0; i < padded.length; i += 4) total = (total + padded.readUInt32BE(i)) >>> 0;
    return total;
  };
  tables.get("head").writeUInt32BE(0, 8);
  const tags = [...tables.keys()].sort();
  const n = tags.length;
  const log2 = Math.floor(Math.log2(n));
  const header = Buffer.alloc(12 + 16 * n);
  buf.copy(header, 0, 0, 4);
  header.writeUInt16BE(n, 4);
  header.writeUInt16BE(2 ** log2 * 16, 6);
  header.writeUInt16BE(log2, 8);
  header.writeUInt16BE(n * 16 - 2 ** log2 * 16, 10);
  const bodies = [];
  let offset = header.length;
  let headAt = 0;
  tags.forEach((tag, i) => {
    const table = tables.get(tag);
    const o = 12 + 16 * i;
    header.write(tag, o, "latin1");
    header.writeUInt32BE(sum(table), o + 4);
    header.writeUInt32BE(offset, o + 8);
    header.writeUInt32BE(table.length, o + 12);
    if (tag === "head") headAt = offset;
    bodies.push(pad(table));
    offset += pad(table).length;
  });
  const font = Buffer.concat([header, ...bodies]);
  font.writeUInt32BE((0xb1b0afba - sum(font)) >>> 0, headAt + 8);
  return font;
}

/** Width of a line in em at wght 900 and the given wdth (kerning included). */
function lineEm(font, line, wdth) {
  const instance = font.getVariation({ wght: 900, wdth });
  return instance.layout(line).advanceWidth / font.unitsPerEm;
}

async function main() {
  const source = SOURCES.anybody;
  const buffer = readFileSync(await fetchCached(source.file, "anybody.ttf"));
  const font = fontkit.create(buffer);

  mkdirSync(OUT, { recursive: true });
  for (const old of readdirSync(OUT)) if (old.endsWith(".woff2")) rmSync(join(OUT, old));

  const write = async (id, text, axes, style) => {
    const instance = await subsetFont(buffer, text, { targetFormat: "sfnt", variationAxes: axes, keepFeatures: FEATURES });
    const named = renameFont(instance, {
      1: `Anybody CV ${style}`,
      2: "Regular",
      4: `Anybody CV ${style}`,
      6: `AnybodyCV-${style}`,
    });
    const out = await subsetFont(named, undefined, {
      targetFormat: "woff2",
      keepAllGlyphs: true,
      preserveNameIds: [0, 1, 2, 4, 6, 13, 14],
    });
    const name = `anybody-${id}.${createHash("sha256").update(out).digest("hex").slice(0, 8)}.woff2`;
    writeFileSync(join(OUT, name), out);
    console.log(`${name.padEnd(36)} ${(out.length / 1024).toFixed(1)} KB`);
    return { href: `/fonts/cv/${name}`, bytes: out.length };
  };

  const faces = [];
  for (const role of ROLES) {
    const file = await write(role.id, TEXT, { wght: role.wght, wdth: role.wdth }, role.style);
    faces.push({ ...role, ...file });
  }

  // The fitted name: one word per line, uppercase, every line exactly as wide as the widest at NAME_BASE.
  const lines = siteName()
    .split(/\s+/)
    .map((word) => word.toLocaleUpperCase("pl"));
  const target = Math.max(...lines.map((line) => lineEm(font, line, NAME_BASE)));
  const name = [];
  for (const [i, line] of lines.entries()) {
    const lo = lineEm(font, line, 50);
    const hi = lineEm(font, line, 150);
    const wdth = Math.round(Math.min(150, Math.max(50, 50 + ((target - lo) / (hi - lo)) * 100)) * 100) / 100;
    // Plus a space: the sheet keeps one at the end of each line but the last (the PDF bookmark needs it).
    const file = await write(`name-${i + 1}`, `${line} `, { wght: 900, wdth }, `BlackName${i + 1}`);
    faces.push({ id: `name-${i + 1}`, family: `CV Name ${i + 1}`, wght: 900, wdth, ...file });
    name.push({ text: line, family: `CV Name ${i + 1}`, wdth, em: Math.round(lineEm(font, line, wdth) * 1e5) / 1e5 });
  }

  const css = [
    "/* GENERATED by scripts/cv-fonts.mjs - do not edit. Static instances of Anybody (OFL) for the CV PDF. */",
    ...faces.map((face) =>
      [
        "@font-face {",
        `  font-family: "${face.family}";`,
        `  src: url("${face.href}") format("woff2");`,
        "  font-style: normal;",
        `  font-weight: ${face.wght};`,
        "  font-display: block;",
        "}",
      ].join("\n"),
    ),
  ];
  css.push(
    `/* The running head of page 2 as outlines (no text for parsers to misread). */\n@page {\n  @top-left {\n    content: ${runningHead(font, `${lines.join(" ")} · CV`)};\n  }\n  @top-right {\n    content: ${runningHead(font, "2 / 2")};\n  }\n}`,
  );
  writeFileSync(join(ROOT, "src", "styles", "cv-fonts.css"), `${css.join("\n\n")}\n`);
  writeFileSync(
    join(ROOT, "src", "lib", "cv-fonts.gen.ts"),
    `// GENERATED by scripts/cv-fonts.mjs - do not edit.
/** The files the CV sheet preloads. */
export const CV_FONT_FILES = ${JSON.stringify(faces.map((face) => face.href))} as const;
/** The fitted name: one line per word, each in its own instance; \`em\` = the line's width at 1 em. */
export const CV_NAME = ${JSON.stringify(name, null, 2)} as const;
/** The band's sticker as outlines (viewBox 0 0 200 200): the ring text and the mark. */
export const CV_STICKER = ${JSON.stringify(stickerPaths(font))} as const;
`,
  );
  const total = faces.reduce((sum, face) => sum + face.bytes, 0);
  console.log(`total ${(total / 1024).toFixed(1)} KB; name ${name.map((line) => `${line.text} wdth ${line.wdth}`).join(", ")}`);
}

await main();
