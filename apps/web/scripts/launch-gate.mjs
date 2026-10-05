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
    if (image && !existsSync(join(ROOT, "public", new URL(image).pathname))) missing.push(`${relative(ROOT, page)}: no ${new URL(image).pathname}`);
  }
}
for (const locale of ["en", "pl", "es"]) {
  const pdf = join(ROOT, "public", "files", `mateusz-muszarski-cv-${locale}.pdf`);
  if (!existsSync(pdf)) missing.push(`no ${relative(ROOT, pdf)}`);
}

const launch = isLaunchBuild();
const home = join(ROOT, "dist", "en", "index.html");
const noindex = existsSync(home) && /<meta name="robots" content="noindex/.test(readFileSync(home, "utf8"));

if (launch) {
  const problems = [...hits, ...missing];
  if (noindex) problems.push("dist/en/index.html is noindex in a launch build");
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
