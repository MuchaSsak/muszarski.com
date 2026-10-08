#!/usr/bin/env node
/**
 * The CV sheet PDFs (wiki: content/content-model.md § CV, design/design.md § CV sheet; the new-cv skill drives it).
 * Builds the site into .cache/cv-dist/, serves it on a free port (Astro runs one dev or preview server per project, so
 * this never fights another session's), prints /<locale>/cv/print-v2/ (the same data as /cv/), fits it to at most two
 * A4 pages (one duplex sheet), writes each PDF with its metadata and checks it.
 *
 *   bun run cv:sheet [--no-build] [--base <url>] [--out <dir>] [--locales en,pl] [--png] [--stress more|less]
 *                    [--no-photo]
 *
 * `--no-build` serves the last .cache/cv-dist/ again; `--base` prints from a server you run instead.
 *
 * Fit: every size and gap of the sheet scales with one CSS variable, `--d` (0 = densest, 1 = roomiest; the body runs
 * 10 to 10.8 pt). The script looks for the roomiest `--d` that keeps the sheet within two pages, and takes one page
 * when the content fits one at a comfortable density. Content that overflows two pages at `--d: 0` is an error: cut it
 * (the new-cv skill lists what to cut first). Then the closing contact slip moves to the foot of the last page, unless
 * that would leave more than MAX_END_GAP of empty paper above it (then it follows the content).
 *
 * Checks (exit code 1 on a failure): pages <= 2; every font embedded as TrueType from Anybody (a Type 3 font or a
 * system fallback means a variable font or a missing glyph slipped in); the text layer starts with the name and holds
 * the email, the role and every section heading in order; the profile links are clickable; no placeholder text.
 * Warnings: a thin last page, no room left, and entries still marked `placeholder: true` in cv.ts (facts to confirm).
 *
 * Until the owner approves the sheet [user 2026-10-08], the output goes to comps/cv/ (drafts), not public/files/.
 * `--stress more|less` duplicates or removes entries in the page before printing, to test how the sheet flows.
 * `--no-photo` prints the variant without the photo (UK, Irish and US applications). Both variants write to
 * .cache/cv-variants/ unless `--out` says otherwise, so they never mix with the drafts.
 * `--png` also writes page previews (pdf.js in the browser, 2x) next to each PDF.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { dirname, extname, join, normalize, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";
import { PDFArray, PDFDict, PDFDocument, PDFName, PDFString } from "pdf-lib";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const arg = (name, fallback) => (argv.includes(name) ? argv[argv.indexOf(name) + 1] : fallback);
const DIST = join(ROOT, ".cache", "cv-dist");
const LOCALES = arg("--locales", "en,pl,es").split(",");
const stress = arg("--stress", "");
const noPhoto = argv.includes("--no-photo");
const variant = `${stress ? `-stress-${stress}` : ""}${noPhoto ? "-no-photo" : ""}`;
const out = resolve(ROOT, arg("--out", variant ? join(".cache", "cv-variants") : join("..", "..", "comps", "cv")));
const ROUTE = "cv/print-v2";
/** One page wins when the content fits one at this density or roomier. */
const ONE_PAGE_MIN_D = 0.4;
/** A last page filled less than this reads as a mistake: say so. */
const MIN_LAST_FILL = 0.3;
/** Above this much empty paper (mm) the contact slip follows the content instead of sitting at the page foot. */
const MAX_END_GAP = 40;

const require = createRequire(import.meta.url);
mkdirSync(out, { recursive: true });

/** A static server for the built site (the print route, its fonts and the photo are all static files). */
const TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".woff2": "font/woff2",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".json": "application/json",
};
function serve(dir) {
  const server = createServer((req, res) => {
    let file = normalize(join(dir, decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname)));
    if (!file.startsWith(dir)) return res.writeHead(403).end();
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    if (!existsSync(file)) return res.writeHead(404).end();
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
  });
  return new Promise((done) => server.listen(0, "127.0.0.1", () => done(server)));
}

let server;
let base = arg("--base", "");
if (!base) {
  if (!argv.includes("--no-build")) {
    console.log("building the site into .cache/cv-dist/ ...");
    const pkg = require.resolve("astro/package.json");
    const astro = join(dirname(pkg), JSON.parse(readFileSync(pkg, "utf8")).bin.astro);
    const build = spawnSync(process.execPath, [astro, "build", "--outDir", DIST], {
      cwd: ROOT,
      stdio: ["ignore", "ignore", "pipe"],
    });
    if (build.status !== 0) throw new Error(`astro build failed:\n${build.stderr?.toString().slice(-3000)}`);
  }
  if (!existsSync(DIST)) throw new Error("no .cache/cv-dist/ yet: run without --no-build");
  server = await serve(DIST);
  base = `http://127.0.0.1:${server.address().port}`;
}
const browser = await chromium.launch();
const page = await browser.newPage();
const report = {};
let failed = false;

const pdfAt = async (d) => {
  await page.evaluate((value) => document.documentElement.style.setProperty("--d", String(value)), d);
  return page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true, tagged: true, outline: true });
};
const pagesOf = async (pdf) => (await PDFDocument.load(pdf)).getPageCount();

/** The roomiest `--d` in [lo, hi] that keeps the sheet within `pages` (binary search, ~1/64 precision). */
async function roomiest(pages, lo = 0, hi = 1) {
  if ((await pagesOf(await pdfAt(hi))) <= pages) return hi;
  for (let i = 0; i < 6; i++) {
    const mid = (lo + hi) / 2;
    if ((await pagesOf(await pdfAt(mid))) <= pages) lo = mid;
    else hi = mid;
  }
  return lo;
}

/** Title, author, subject, keywords and language: what search engines and file browsers show (seo.md § PDF CV). */
async function withMetadata(pdf, meta, locale) {
  const doc = await PDFDocument.load(pdf);
  doc.setTitle(meta.title, { showInWindowTitleBar: true });
  doc.setAuthor(meta.author);
  doc.setSubject(meta.subject);
  doc.setKeywords(meta.keywords);
  doc.setCreator(meta.creator);
  doc.setProducer("Chromium (Skia/PDF) + pdf-lib");
  doc.setLanguage(locale);
  return Buffer.from(await doc.save({ useObjectStreams: false }));
}

/**
 * Every font in the file: subtype, base name. Every object is scanned, not only the pages' resources: Chrome can put
 * text inside form XObjects (transparency groups), whose fonts a page's /Resources doesn't list.
 */
function fontsOf(doc) {
  const fonts = new Map();
  const nameOf = (dict, key) => dict.lookupMaybe(PDFName.of(key), PDFName)?.decodeText();
  for (const [, font] of doc.context.enumerateIndirectObjects()) {
    if (!(font instanceof PDFDict) || nameOf(font, "Type") !== "Font") continue;
    let subtype = nameOf(font, "Subtype") ?? "(none)";
    // A CID font is reported with its Type0 parent.
    if (subtype.startsWith("CIDFont")) continue;
    const name = nameOf(font, "BaseFont") ?? "(none)";
    const descendants = font.lookupMaybe(PDFName.of("DescendantFonts"), PDFArray);
    if (descendants) subtype += `/${nameOf(doc.context.lookup(descendants.get(0), PDFDict), "Subtype")}`;
    fonts.set(`${subtype} ${name}`, { subtype, name });
  }
  return [...fonts.values()];
}

/** Every link annotation's URI. */
function linksOf(doc) {
  const links = [];
  for (const pdfPage of doc.getPages()) {
    for (const ref of pdfPage.node.Annots()?.asArray() ?? []) {
      const action = doc.context.lookup(ref, PDFDict).lookupMaybe(PDFName.of("A"), PDFDict);
      const uri = action?.lookupMaybe(PDFName.of("URI"), PDFString);
      if (uri) links.push(uri.decodeText());
    }
  }
  return links;
}

/**
 * The text layer per page, in content order; its runs with their baseline (pt from the page top); and how far down
 * the last line of each page sits (0-1).
 */
async function textOf(pdf) {
  const task = getDocument({ data: new Uint8Array(pdf), disableFontFace: true, verbosity: 0 });
  const doc = await task.promise;
  const pages = [];
  for (let n = 1; n <= doc.numPages; n++) {
    const pdfPage = await doc.getPage(n);
    const { height } = pdfPage.getViewport({ scale: 1 });
    const content = await pdfPage.getTextContent();
    const items = content.items.filter((item) => "str" in item && item.str.trim());
    const text = content.items.map((item) => ("str" in item ? item.str + (item.hasEOL ? "\n" : "") : "")).join("");
    // Running heads and page numbers sit in the margins (outside 18-275 mm); the fill counts body text only.
    const mm = (pt) => (pt / 72) * 25.4;
    const body = items.filter((item) => mm(height - item.transform[5]) > 18 && mm(height - item.transform[5]) < 275);
    const lowest = Math.max(0, ...body.map((item) => mm(height - item.transform[5])));
    const runs = items.map((item) => ({ str: item.str.replace(/\s+/g, " ").trim(), y: height - item.transform[5] }));
    pages.push({ text, runs, lowest, fill: Math.min(1, Math.max(0, (lowest - 14) / (275 - 14))) });
  }
  await task.destroy();
  return pages;
}

/** Page previews: pdf.js renders each page in the browser at 2x and we screenshot the canvases. */
async function previews(pdf, stem) {
  const viewer = await browser.newPage();
  const files = {
    "/pdf.mjs": require.resolve("pdfjs-dist/legacy/build/pdf.min.mjs"),
    "/pdf.worker.mjs": require.resolve("pdfjs-dist/legacy/build/pdf.worker.min.mjs"),
  };
  await viewer.route("http://cv.local/**", (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path === "/doc.pdf") return route.fulfill({ body: pdf, contentType: "application/pdf" });
    if (files[path]) return route.fulfill({ body: readFileSync(files[path]), contentType: "text/javascript" });
    return route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<!doctype html><body style='margin:0;background:#888'></body>",
    });
  });
  await viewer.goto("http://cv.local/");
  const count = await viewer.evaluate(async () => {
    const pdfjs = await import("/pdf.mjs");
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";
    const doc = await pdfjs.getDocument({ url: "/doc.pdf" }).promise;
    for (let n = 1; n <= doc.numPages; n++) {
      const pdfPage = await doc.getPage(n);
      const viewport = pdfPage.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.display = "block";
      canvas.id = `p${n}`;
      document.body.append(canvas);
      await pdfPage.render({ canvas, viewport }).promise;
    }
    return doc.numPages;
  });
  const shots = [];
  for (let n = 1; n <= count; n++) {
    const file = `${stem}-p${n}.png`;
    await viewer.locator(`#p${n}`).screenshot({ path: file });
    shots.push(file);
  }
  await viewer.close();
  return shots;
}

/** Test how the sheet flows with more or less content than the data holds. */
async function applyStress(mode) {
  await page.evaluate((how) => {
    for (const list of document.querySelectorAll("[data-cv-list]")) {
      const entries = [...list.querySelectorAll(":scope > [data-cv-entry]")];
      if (how === "more") for (const entry of entries) list.append(entry.cloneNode(true));
      if (how === "less") for (const entry of entries.slice(1)) entry.remove();
    }
  }, mode);
}

for (const locale of LOCALES) {
  const response = await page.goto(`${base}/${locale}/${ROUTE}/`, { waitUntil: "networkidle" });
  if (!response?.ok()) throw new Error(`${locale}: ${response?.status()} for /${ROUTE}/; is the preview running?`);
  await page.evaluate(() => document.fonts.ready);
  if (stress) await applyStress(stress);
  if (noPhoto) await page.evaluate(() => document.querySelector(".cs-photo")?.remove());
  const meta = await page.evaluate(() => {
    const get = (name) => document.querySelector(`meta[name="${name}"]`)?.getAttribute("content") ?? "";
    return {
      title: document.title,
      author: get("author"),
      subject: get("description"),
      keywords: get("keywords").split(/,\s*/).filter(Boolean),
      creator: get("cv-site"),
      digest: get("cv-digest"),
      headings: [...document.querySelectorAll("[data-cv-heading]")].map((h) => h.textContent.trim()),
      must: [...document.querySelectorAll("[data-cv-must]")].map((el) => el.getAttribute("data-cv-must")),
      links: [...document.querySelectorAll("[data-cv-link]")].map((el) => el.getAttribute("href")),
      placeholders: [
        ...new Set([...document.querySelectorAll("[data-cv-placeholder]")].map((el) => el.getAttribute("data-cv-placeholder"))),
      ],
      // Each entry's title and date starts: the PDF must set them on one baseline.
      dated: [...document.querySelectorAll("[data-cv-entry]")].map((el) => ({
        title: (el.querySelector("h3")?.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 10),
        when: (el.querySelector(".cs-when")?.textContent ?? "").trim().split(/\s+/)[0] ?? "",
      })),
      // Every text block in DOM order (its first characters, spaces dropped): the PDF must say them in this order.
      order: [...document.querySelectorAll("body :is(h1, h2, h3, p, li)")]
        .filter((el) => !el.closest("[aria-hidden='true']") && !el.querySelector("p, li"))
        .map((el) => el.textContent.replace(/\s+/g, "").slice(0, 18))
        .filter(Boolean),
    };
  });

  // Fit: one page if it fits comfortably, else the roomiest two.
  const dense = await pagesOf(await pdfAt(0));
  let d;
  let target;
  if (dense > 2) {
    console.error(`${locale}: ${dense} pages even at the densest setting; cut content (new-cv skill § Cutting).`);
    failed = true;
    d = 0;
    target = dense;
  } else {
    const one = dense === 1 ? await roomiest(1) : -1;
    target = one >= ONE_PAGE_MIN_D ? 1 : 2;
    d = target === 1 ? one : await roomiest(2);
  }
  // Compose the last page: the contact slip goes to the foot of the last page. The largest top margin (--end-gap)
  // that keeps the page count is found by halving, to ~2 mm. A short last page keeps the slip under its content: a
  // band alone at the foot of a mostly empty page reads as a layout error.
  const before = await textOf(await pdfAt(d));
  const contentFill = before.at(-1)?.fill ?? 0;
  const gapAt = async (mm) => {
    await page.evaluate((value) => document.documentElement.style.setProperty("--end-gap", `${value}mm`), mm);
    return pagesOf(await pdfAt(d));
  };
  let [lo, hi] = [0, 270];
  for (let i = 0; i < 8; i++) {
    const mid = (lo + hi) / 2;
    if ((await gapAt(mid)) === before.length) lo = mid;
    else hi = mid;
  }
  const gap = lo - 0.5 > MAX_END_GAP ? 0 : Math.max(0, lo - 0.5);
  await gapAt(gap);
  const printed = await pdfAt(d);
  const pdf = await withMetadata(printed, meta, locale);
  const file = join(out, `mateusz-muszarski-cv-${locale}${variant}.pdf`);
  writeFileSync(file, pdf);

  // Checks.
  const doc = await PDFDocument.load(pdf);
  const pages = doc.getPageCount();
  const fonts = fontsOf(doc);
  const links = linksOf(doc);
  const text = await textOf(pdf);
  const all = text.map((p) => p.text).join("\n");
  const flat = all.replace(/\s+/g, " ");
  const problems = [];
  if (pages > 2) problems.push(`${pages} pages (max 2)`);
  for (const font of fonts) {
    if (!/TrueType|CIDFontType2/.test(font.subtype)) problems.push(`font ${font.name} is ${font.subtype}, not TrueType`);
    if (!/Anybody/i.test(font.name)) problems.push(`font ${font.name} is a fallback: a glyph is missing from the CV fonts`);
  }
  const first = text[0]?.text.trim().split(/\s+/).slice(0, 2).join(" ") ?? "";
  if (!/^MATEUSZ MUSZARSKI/i.test(first)) problems.push(`the text layer starts with "${first}", not the name`);
  let at = 0;
  for (const heading of meta.headings) {
    const found = flat.toLocaleUpperCase(locale).indexOf(heading.toLocaleUpperCase(locale), at);
    if (found < 0) problems.push(`heading "${heading}" missing or out of order in the text layer`);
    else at = found;
  }
  const upper = flat.toLocaleUpperCase(locale);
  // Reading order: each block's start, found after the previous one (spaces dropped, case folded).
  const squeezed = all.replace(/\s+/g, "").toLocaleUpperCase(locale);
  let cursor = 0;
  for (const start of meta.order) {
    const found = squeezed.indexOf(start.toLocaleUpperCase(locale), cursor);
    if (found < 0) {
      const anywhere = squeezed.indexOf(start.toLocaleUpperCase(locale)) >= 0;
      problems.push(
        `reading order: "${start}" ${anywhere ? "comes too early in the text layer" : "is missing from the text layer"}`,
      );
    } else cursor = found;
  }
  for (const must of meta.must)
    if (!upper.includes(must.toLocaleUpperCase(locale))) problems.push(`"${must}" missing from the text layer`);
  for (const href of meta.links) if (!links.includes(href)) problems.push(`link ${href} is not clickable`);
  // Each date on its title's baseline: extractors (pdftotext -layout, ATS parsers) pair a date with the title on its
  // row. The title's run is found in content order; the date's run follows within a few runs (after the org line).
  const runs = text.flatMap((p, n) => p.runs.map((run) => ({ ...run, page: n })));
  let from = 0;
  let paired = 0;
  for (const entry of meta.dated) {
    const t = runs.findIndex((run, i) => i >= from && run.str.startsWith(entry.title));
    if (t < 0 || !entry.when) continue;
    from = t + 1;
    paired += 1;
    const w = runs.findIndex((run, i) => i > t && i <= t + 6 && run.str.startsWith(entry.when));
    if (w < 0 || runs[w].page !== runs[t].page || Math.abs(runs[w].y - runs[t].y) > 0.5)
      problems.push(`the date "${entry.when}…" is not on the baseline of "${entry.title}…"`);
  }
  // A check that finds no titles proves nothing: say so.
  if (meta.dated.length && paired < meta.dated.length / 2)
    problems.push(`the date check found only ${paired} of ${meta.dated.length} titles`);
  if (/PLACEHOLDER|undefined|\[object/i.test(all)) problems.push("placeholder or broken text in the PDF");
  const fill = contentFill;
  const warnings = [];
  if (pages === 2 && fill < MIN_LAST_FILL) warnings.push(`page 2 holds only ${Math.round(fill * 100)}% content`);
  if (d === 0 && pages === 2) warnings.push("at the densest setting: no room left; cut before adding");
  if (meta.placeholders.length)
    warnings.push(`facts still to confirm (placeholder: true in cv.ts): ${meta.placeholders.join("; ")}`);

  const shots = argv.includes("--png") ? await previews(pdf, file.replace(/\.pdf$/, "")) : [];
  report[locale] = {
    file: relative(ROOT, file),
    kb: Math.round(pdf.length / 102.4) / 10,
    pages,
    d: Math.round(d * 100) / 100,
    lastPageFill: Math.round(fill * 100) / 100,
    endGapMm: Math.round(gap * 10) / 10,
    digest: meta.digest,
    fonts: fonts.map((font) => `${font.subtype} ${font.name}`),
    links,
    problems,
    warnings,
    shots: shots.map((shot) => relative(ROOT, shot)),
  };
  if (problems.length) failed = true;
  console.log(
    `${locale}: ${pages} page(s), --d ${report[locale].d}, last page ${Math.round(fill * 100)}% content (${gap ? `+${report[locale].endGapMm} mm to the slip` : "slip follows the content"}), ${report[locale].kb} KB` +
      `${problems.length ? `\n  FAIL ${problems.join("\n  FAIL ")}` : ""}${warnings.length ? `\n  warn ${warnings.join("\n  warn ")}` : ""}`,
  );
  if (target !== pages) console.log(`  (fit aimed at ${target} page(s))`);
}
writeFileSync(join(out, `cv-sheet-report${variant}.json`), `${JSON.stringify(report, null, 2)}\n`);
await browser.close();
server?.close();
if (failed) process.exitCode = 1;
