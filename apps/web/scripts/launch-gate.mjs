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

const launch = isLaunchBuild();
const home = join(ROOT, "dist", "en", "index.html");
const noindex = existsSync(home) && /<meta name="robots" content="noindex/.test(readFileSync(home, "utf8"));

if (launch) {
  const problems = [...hits];
  if (noindex) problems.push("dist/en/index.html is noindex in a launch build");
  if (problems.length) {
    console.error(`launch-gate: ${problems.length} problem(s) block the launch:\n  ${problems.join("\n  ")}`);
    process.exit(1);
  }
  console.log("launch-gate: clean, launch build allowed");
} else {
  console.log(`launch-gate: review build (noindex). ${hits.length} placeholder marker(s) left for launch.`);
}
