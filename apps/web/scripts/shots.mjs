#!/usr/bin/env node
/**
 * Visual-QA screenshots (working-agreement.md § 2, design-quality.md). Needs a running `astro preview`.
 *
 *   node scripts/shots.mjs [--base http://localhost:4322] [--paths /en/,/pl/] [--widths 390,1024,1920]
 *                          [--settle 1800] [--full] [--reduced] [--accept]
 *
 * Writes repo-root screenshots/.work/<route>/<width>-<theme>.png (gitignored scratch). With --accept, the
 * 1920 and 390 shots are also saved as webp to screenshots/<route>/ (the committed proof).
 * Prints horizontal overflow per shot so a broken layout can't hide behind a nice crop. `--settle` waits for the
 * entrance animations before the shot.
 */
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";
import sharp from "sharp";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const index = argv.indexOf(`--${name}`);
  return index >= 0 ? argv[index + 1] : fallback;
};
const base = opt("base", "http://localhost:4322");
const paths = opt("paths", "/en/").split(",");
const widths = opt("widths", "390,1024,1920").split(",").map(Number);
const settle = Number(opt("settle", "1800"));
const full = argv.includes("--full");
const reduced = argv.includes("--reduced");
const accept = argv.includes("--accept");

const slug = (path) => path.replace(/^\/|\/$/g, "").replace(/\//g, "_") || "root";
const browser = await chromium.launch();
for (const width of widths) {
  const height = width < 700 ? 844 : width < 1100 ? 1024 : width < 2000 ? 1080 : 1440;
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: width < 700 ? 2 : 1,
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  for (const path of paths) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(reduced ? 200 : settle);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const dir = join(REPO, "screenshots", ".work", slug(path));
    mkdirSync(dir, { recursive: true });
    const name = `${width}-cobalt${reduced ? "-rm" : ""}`;
    const file = join(dir, `${name}.png`);
    await page.screenshot({ path: file, fullPage: full });
    if (accept && (width === 1920 || width === 390) && !reduced) {
      const out = join(REPO, "screenshots", slug(path));
      mkdirSync(out, { recursive: true });
      await sharp(file)
        .webp({ quality: 72 })
        .toFile(join(out, `${width}-cobalt.webp`));
    }
    console.log(`${slug(path)} ${name}${overflow > 0 ? ` OVERFLOW ${overflow}px` : ""}`);
  }
  await page.close();
}
await browser.close();
