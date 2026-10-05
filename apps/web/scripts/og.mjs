#!/usr/bin/env node
/**
 * Share images and app icons (wiki: site/seo.md § Metadata rules, OG + Favicons). Reads every built page in dist/
 * (run after `bun run build`), takes its og:image path, title and type, and renders a 1200×630 Poster card per image
 * with Playwright: the page title fitted big, the name and role, the site host. Also renders the favicon PNGs and
 * the web manifest icons from public/favicon.svg. Outputs are committed (public/og/, public/icons/).
 *
 *   bun run build && bun run og
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const PUBLIC = join(ROOT, "public");
if (!existsSync(join(DIST, "en", "index.html"))) throw new Error("dist/ is missing: run `bun run build` first");

function* pages(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* pages(path);
    else if (name === "index.html") yield path;
  }
}

const decode = (value) =>
  value.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#x27;/g, "'");
const meta = (html, key) => decode(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`).exec(html)?.[1] ?? "");

const jobs = new Map();
for (const file of pages(DIST)) {
  const html = readFileSync(file, "utf8");
  const image = meta(html, "og:image");
  if (!image) continue;
  const path = new URL(image).pathname;
  // Pages without their own image share the home one; only the home page itself defines it.
  if (path.endsWith("/home.png") && !/[\\/]dist[\\/](en|pl|es)[\\/]index\.html$/.test(file)) continue;
  if (jobs.has(path)) continue;
  const lang = /<html lang="(\w+)"/.exec(html)?.[1] ?? "en";
  const rawTitle = decode(/<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "");
  const article = meta(html, "og:type") === "article";
  const key = path.split("/").pop().replace(/\.png$/, "");
  // "Page – Name" → the page part; the home title keeps the role part.
  const parts = rawTitle.split(" – ");
  // Posts: the H1 (the full title, without the site name); pages: the page part of <title>.
  const h1 = decode((/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html)?.[1] ?? "").replace(/<[^>]+>/g, "").trim());
  const title = key === "home" ? "Mateusz Muszarski" : article ? h1 || rawTitle : parts[0];
  const role = "";
  jobs.set(path, { path, lang, title, role, article, key });
}

const fontFile = readdirSync(join(PUBLIC, "fonts")).find((name) => name.endsWith(".woff2"));
const font = readFileSync(join(PUBLIC, "fonts", fontFile)).toString("base64");
const ROLE = { en: "Full-stack developer", pl: "Programista full stack", es: "Desarrollador full stack" };
const KIND = { en: "Blog", pl: "Blog", es: "Blog" };

const template = ({ title, role, article, lang }) => `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>
@font-face { font-family: Anybody; src: url(data:font/woff2;base64,${font}) format("woff2"); font-weight: 100 900; font-stretch: 50% 150%; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body { position: relative; padding: 56px 64px; font-family: Anybody, sans-serif; background: ${article ? "#0a0d33" : "#2433ff"}; color: #eef0ff; }
.top { display: flex; justify-content: space-between; font-weight: 800; font-size: 22px; letter-spacing: .05em; text-transform: uppercase; font-stretch: 125%; padding-bottom: 14px; border-bottom: 4px solid currentColor; }
h1 { position: absolute; left: 64px; right: 64px; bottom: 120px; font-weight: 900; line-height: .9; text-transform: uppercase; font-stretch: 72%; text-wrap: balance; }
.foot { position: absolute; left: 64px; right: 64px; bottom: 48px; display: flex; justify-content: space-between; align-items: center; font-weight: 800; font-size: 24px; letter-spacing: .04em; text-transform: uppercase; font-stretch: 115%; }
.dot { display: inline-block; width: 22px; height: 22px; margin-right: 12px; vertical-align: -3px; background: #ff4fb8; box-shadow: 4px 4px 0 #eef0ff; }
.mark { position: absolute; right: 64px; top: 112px; width: 150px; height: 150px; border-radius: 50%; background: #ff4fb8; color: #0a0d33; display: grid; place-items: center; font-weight: 900; font-size: 54px; font-stretch: 62%; transform: rotate(-8deg); }
</style></head><body>
<div class="top"><span>Mateusz Muszarski</span><span>${article ? KIND[lang] ?? "Blog" : ROLE[lang] ?? ROLE.en}</span></div>
${article ? "" : '<div class="mark">M—M</div>'}
<h1 id="t">${title.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</h1>
<div class="foot"><span><i class="dot"></i>matmuszarski.space</span><span>${role}</span></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const job of jobs.values()) {
  await page.setContent(template(job), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  // The biggest size at which the title fits its box (max 3 lines, clear of the top bar and the sticker).
  await page.evaluate(() => {
    const h1 = document.getElementById("t");
    const limit = 350;
    for (let size = 150; size >= 40; size -= 2) {
      h1.style.fontSize = `${size}px`;
      if (h1.scrollHeight <= limit && h1.scrollWidth <= h1.clientWidth) break;
    }
  });
  const out = join(PUBLIC, job.path);
  mkdirSync(dirname(out), { recursive: true });
  await page.screenshot({ path: out, type: "png" });
  console.log(`og ${job.path}`);
}

// Icons from the SVG favicon: PNG for Google (≥ 48 px), apple-touch 180, manifest 192 + 512.
const svg = readFileSync(join(PUBLIC, "favicon.svg"), "utf8");
mkdirSync(join(PUBLIC, "icons"), { recursive: true });
for (const [name, size] of [
  ["favicon-48.png", 48],
  ["apple-touch-icon.png", 180],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
]) {
  const iconPage = await browser.newPage({ viewport: { width: size, height: size } });
  await iconPage.setContent(`<html><body style="margin:0">${svg.replace("<svg ", `<svg width="${size}" height="${size}" `)}</body></html>`);
  await iconPage.screenshot({ path: join(PUBLIC, "icons", name), type: "png", omitBackground: false });
  await iconPage.close();
}
writeFileSync(
  join(PUBLIC, "manifest.webmanifest"),
  `${JSON.stringify(
    {
      name: "Mateusz Muszarski",
      short_name: "M—M",
      start_url: "/en/",
      display: "browser",
      background_color: "#2433ff",
      theme_color: "#2433ff",
      icons: [
        { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2,
  )}\n`,
);
console.log(`${jobs.size} share images, 4 icons, manifest`);
await browser.close();
