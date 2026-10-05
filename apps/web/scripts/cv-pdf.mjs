#!/usr/bin/env node
/**
 * The CV PDFs (wiki: content/content-model.md § CV, tech/technologies.md § CV PDF). Prints /<locale>/cv/print/ of a
 * running `astro preview` (the same data and component as /cv/) to public/files/mateusz-muszarski-cv-<locale>.pdf,
 * and records which CV data each PDF was made from (public/files/cv-digest.json, read from the page's
 * `cv-digest` meta). `src/data/cv.test.ts` fails when the data changed after the PDFs were made.
 *
 *   bun run build && bun run preview   (in another terminal)
 *   bun run cv:pdf [--base http://localhost:4322]
 *
 * The PDFs are committed: the Vercel build has no browser to print them.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const base = argv.includes("--base") ? argv[argv.indexOf("--base") + 1] : "http://localhost:4322";
const LOCALES = ["en", "pl", "es"];

const out = join(ROOT, "public", "files");
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
const digests = {};
for (const locale of LOCALES) {
  const response = await page.goto(`${base}/${locale}/cv/print/`, { waitUntil: "networkidle" });
  if (!response?.ok()) throw new Error(`${locale}: ${response?.status()} for the print route; is the preview running?`);
  await page.evaluate(() => document.fonts.ready);
  const digest = await page.locator('meta[name="cv-digest"]').getAttribute("content");
  if (!digest) throw new Error(`${locale}: no cv-digest meta on the print route`);
  const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true, tagged: true, outline: true });
  const file = join(out, `mateusz-muszarski-cv-${locale}.pdf`);
  writeFileSync(file, pdf);
  digests[locale] = digest;
  console.log(`${locale}: ${(pdf.length / 1024).toFixed(1)} KB → ${file}`);
}
writeFileSync(join(out, "cv-digest.json"), `${JSON.stringify(digests, null, 2)}\n`);
await browser.close();
