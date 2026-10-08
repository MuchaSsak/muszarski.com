#!/usr/bin/env node
/**
 * The launch gate (wiki: placeholders.md): a launch build (scripts/launch.mjs) fails while any
 * not-real marker is left in the shipped source or the built HTML, or while the build is noindex.
 * Review builds only print what is left. Runs after `astro build`; `--launch` forces the real mode.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { isLaunchBuild } from "./launch.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MARKERS = /PLACEHOLDER|placeholder:\s*true|\.example\b/;
const SCAN = ["src", "public"];
const TEXT = /\.(astro|tsx?|mjs|json|po|md|mdx|css|txt|svg|html)$/;

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path);
    else if (TEXT.test(name)) yield path;
  }
}

const hits = [];
for (const dir of SCAN) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) continue;
  for (const file of files(abs)) {
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, index) => {
        if (MARKERS.test(line)) hits.push(`${relative(ROOT, file)}:${index + 1}: ${line.trim().slice(0, 120)}`);
      });
  }
}

// Every built page's share image and the CV PDFs must exist (`bun run og`, `bun run cv:pdf`).
const missing = [];
function* pages(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* pages(path);
    else if (name === "index.html") yield path;
  }
}
const dist = join(ROOT, "dist");
if (existsSync(dist)) {
  for (const page of pages(dist)) {
    const image = /<meta property="og:image" content="([^"]+)"/.exec(readFileSync(page, "utf8"))?.[1];
    if (image && !existsSync(join(ROOT, "public", new URL(image).pathname)))
      missing.push(`${relative(ROOT, page)}: no ${new URL(image).pathname}`);
  }
}
for (const locale of ["en", "pl", "es"]) {
  const pdf = join(ROOT, "public", "files", `mateusz-muszarski-cv-${locale}.pdf`);
  if (!existsSync(pdf)) missing.push(`no ${relative(ROOT, pdf)}`);
}

// Every internal link, asset and #anchor in the built HTML resolves (a file in dist/, and the id on that page or in
// that SVG). Broken links fail every build, review or launch. /api/ is a function, not a file.
const broken = [];
if (existsSync(dist)) {
  const ids = new Map();
  const idsOf = (file) => {
    if (!ids.has(file))
      ids.set(file, new Set([...readFileSync(file, "utf8").matchAll(/\sid="([^"]+)"/g)].map((match) => match[1])));
    return ids.get(file);
  };
  const target = (path) => {
    const file = join(dist, decodeURIComponent(path));
    if (path.endsWith("/")) return existsSync(join(file, "index.html")) ? join(file, "index.html") : null;
    return existsSync(file) && statSync(file).isFile() ? file : null;
  };
  for (const page of pages(dist)) {
    const html = readFileSync(page, "utf8").replace(/<script[\s\S]*?<\/script>/g, "");
    const pagePath = `/${relative(dist, dirname(page)).replace(/\\/g, "/")}/`.replace(/^\/\.?\/$/, "/").replace(/^\/\//, "/");
    for (const [, url] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
      if (!/^[/#]/.test(url) || url.startsWith("//") || url.startsWith("/api/")) continue;
      const [rest, hash = ""] = url.split("#");
      const path = (rest ?? "").split("?")[0] || pagePath;
      const file = target(path);
      if (!file) broken.push(`${relative(ROOT, page)}: ${url} (no file)`);
      else if (hash && /\.(html|svg)$/.test(file) && !idsOf(file).has(decodeURIComponent(hash)))
        broken.push(`${relative(ROOT, page)}: ${url} (no #${hash})`);
    }
  }
}

// SEO basics on every page (seo.md § Crawl and indexing setup): a title and a description, a canonical (not the
// print route or the root redirect), every canonical, og:url, hreflang and sitemap URL on one origin, and JSON-LD
// that parses. Like broken links, these fail every build.
const seo = [];
const robotsOf = new Map();
if (existsSync(dist)) {
  const origins = new Set();
  for (const page of pages(dist)) {
    const html = readFileSync(page, "utf8");
    const name = relative(dist, page).replace(/\\/g, "/");
    const stub = name === "index.html";
    const print = /cv\/print(-v2)?\//.test(name);
    robotsOf.set(name, /<meta name="robots" content="([^"]+)"/.exec(html)?.[1] ?? "");
    if (!/<title>[^<]+<\/title>/.test(html)) seo.push(`${name}: no <title>`);
    if (!stub && !/<meta name="description" content="[^"]{20,}"/.test(html)) seo.push(`${name}: no description`);
    if (!stub && !print && !/<link rel="canonical" href="https?:\/\//.test(html)) seo.push(`${name}: no canonical`);
    for (const [, url] of html.matchAll(
      /<(?:link rel="(?:canonical|alternate)"[^>]*?|meta property="og:url"[^>]*?) (?:href|content)="(https?:\/\/[^"]+)"/g,
    ))
      origins.add(new URL(url).origin);
    for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try {
        if (!JSON.parse(json)["@context"]) seo.push(`${name}: JSON-LD without @context`);
      } catch {
        seo.push(`${name}: JSON-LD does not parse`);
      }
    }
  }
  for (const map of readdirSync(dist).filter((file) => /^sitemap.*\.xml$/.test(file)))
    for (const [, url] of readFileSync(join(dist, map), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g))
      origins.add(new URL(url).origin);
  if (origins.size > 1)
    seo.push(`more than one origin in canonicals, hreflang, og:url and the sitemap: ${[...origins].join(", ")}`);
}

// A link that opens a new tab says so to screen readers (structure.md § External links); the print CV has no readers.
if (existsSync(dist)) {
  for (const page of pages(dist)) {
    if (/cv[\\/]print/.test(page)) continue;
    for (const [tag, body] of readFileSync(page, "utf8").matchAll(/<a\b[^>]*target="_blank"[^>]*>([\s\S]*?)<\/a>/g))
      if (!/class="sr-only"/.test(body ?? ""))
        broken.push(`${relative(ROOT, page)}: ${/href="([^"]+)"/.exec(tag)?.[1]} opens a new tab without saying so`);
  }
}

// Every picture a page shows ships as WebP (or SVG) [user 2026-10-07: "always convert to optimal webp"; design/assets.md
// § Image formats]. PNG stays only where the consumer needs it: favicons and app icons (/icons/) and share images
// (/og/: LinkedIn and some chat apps don't preview WebP). Checked in the built HTML (img, source, JSON-LD) and public/.
const images = [];
const RASTER = /\.(png|jpe?g|gif|bmp|tiff?|avif)(\?|#|$)/i;
const KEEP = /^(https?:\/\/[^/]+)?\/(icons|og)\//;
function* everyFile(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* everyFile(path);
    else yield path;
  }
}
for (const file of everyFile(join(ROOT, "public"))) {
  const rel = relative(join(ROOT, "public"), file).replaceAll("\\", "/");
  if (RASTER.test(rel) && !KEEP.test(`/${rel}`)) images.push(`public/${rel}: not WebP`);
}
if (existsSync(dist)) {
  for (const page of pages(dist)) {
    const html = readFileSync(page, "utf8");
    const urls = [
      ...[...html.matchAll(/<(?:img|source)\b[^>]*?\s(?:src|srcset)="([^"]+)"/g)].flatMap(([, value]) =>
        (value ?? "").split(",").map((part) => part.trim().split(/\s+/)[0] ?? ""),
      ),
      ...[...html.matchAll(/"(?:image|contentUrl|thumbnailUrl)":"([^"]+)"/g)].map(([, value]) => value ?? ""),
      ...[...html.matchAll(/data-(?:full|sitemap-image)="([^"]+)"/g)].map(([, value]) => value ?? ""),
    ];
    for (const url of new Set(urls))
      if (RASTER.test(url) && !KEEP.test(url)) images.push(`${relative(ROOT, page)}: ${url} is not WebP`);
  }
}

if (broken.length || seo.length || images.length) {
  if (broken.length) console.error(`launch-gate: ${broken.length} link problem(s):\n  ${broken.slice(0, 30).join("\n  ")}`);
  if (seo.length) console.error(`launch-gate: ${seo.length} SEO problem(s):\n  ${seo.slice(0, 30).join("\n  ")}`);
  if (images.length) console.error(`launch-gate: ${images.length} image(s) not WebP:\n  ${images.slice(0, 30).join("\n  ")}`);
  process.exit(1);
}

const launch = isLaunchBuild();
const home = join(ROOT, "dist", "en", "index.html");
const noindex = existsSync(home) && /<meta name="robots" content="noindex/.test(readFileSync(home, "utf8"));

if (launch) {
  const problems = [...hits, ...missing];
  if (noindex) problems.push("dist/en/index.html is noindex in a launch build");
  // Legal pages, the print route and the contact results stay out of the index; everything else is indexable.
  for (const [name, robots] of robotsOf) {
    const hidden = /(privacy|terms|cv\/print(-v2)?|contact\/(sent|error))\//.test(name) || name === "index.html";
    if (!hidden && !robots.startsWith("index")) problems.push(`${name}: robots "${robots}" in a launch build`);
    if (hidden && name !== "index.html" && !robots.startsWith("noindex")) problems.push(`${name}: should be noindex`);
  }
  if (problems.length) {
    console.error(`launch-gate: ${problems.length} problem(s) block the launch:\n  ${problems.join("\n  ")}`);
    process.exit(1);
  }
  console.log("launch-gate: clean, launch build allowed");
} else {
  console.log(`launch-gate: review build (noindex). ${hits.length} placeholder marker(s) left for launch.`);
  if (missing.length) {
    console.log(`launch-gate: ${missing.length} generated file(s) missing (bun run og / cv:pdf):`);
    for (const line of missing.slice(0, 8)) console.log(`  ${line}`);
  }
}
