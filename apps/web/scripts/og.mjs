#!/usr/bin/env node
/**
 * Share images and app icons (wiki: site/seo.md § Metadata rules, OG + Favicons). Reads every built page in dist/
 * (run after `bun run build`), takes its og:image path, title and type, and renders a 1200×630 poster per image with
 * Playwright, in the page's language [user 2026-10-06: "craft great opengraph images for each page and localize
 * them"]: the logo tile and name on top, the page title fitted big on the left, a drawn picture of the page on the
 * right (tool marks for home, project posters for work, the CV sheet, hobby stickers for my life, post covers for the
 * blog; a post shows its own cover and says whether it is a case study or an article), the host at the bottom. Also
 * renders the favicon PNGs and the web manifest icons from public/favicon.svg. Outputs are committed (public/og/,
 * public/icons/).
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
  value
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x27;/g, "'");
const escape = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const meta = (html, key) => decode(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`).exec(html)?.[1] ?? "");
/** The code-drawn covers a page renders (PostCover.astro), without Astro's scope attribute. */
const covers = (html) =>
  [...html.matchAll(/<svg class="cover"[\s\S]*?<\/svg>/g)].map((m) => m[0].replace(/ data-astro-cid-[\w-]+/g, ""));

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
  const key = path
    .split("/")
    .pop()
    .replace(/\.png$/, "");
  // Posts: the H1 (the full title); pages: the page part of "Page – Name".
  const h1 = decode((/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html)?.[1] ?? "").replace(/<[^>]+>/g, "").trim());
  const title = key === "home" ? "Mateusz Muszarski" : article ? h1 || rawTitle : rawTitle.split(" – ")[0];
  // A post is a case study when its source carries the `case-study` tag.
  const slug = key.replace(/^blog-/, "");
  const source = join(ROOT, "src", "content", "blog", lang, `${slug}.mdx`);
  const caseStudy = article && existsSync(source) && /^tags:.*\bcase-study\b/m.test(readFileSync(source, "utf8"));
  jobs.set(path, { path, lang, title, article, caseStudy, key, covers: covers(html) });
}

const fontFile = readdirSync(join(PUBLIC, "fonts")).find((name) => name.endsWith(".woff2"));
const font = readFileSync(join(PUBLIC, "fonts", fontFile)).toString("base64");
// The site's icon set (scripts/icons.mjs output): marks and UI icons as paths.
const iconsTs = readFileSync(join(ROOT, "src", "lib", "icons.gen.ts"), "utf8");
const ICONS = JSON.parse(/ICONS: [^=]+= (\{[\s\S]*\});\s*$/.exec(iconsTs)[1]);
const icon = (name) => {
  const item = ICONS[name];
  const paint = item.stroke
    ? 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'
    : 'fill="currentColor"';
  return `<svg viewBox="${item.viewBox}" ${paint}>${item.body}</svg>`;
};
const logo = readFileSync(join(PUBLIC, "favicon.svg"), "utf8").replace(/\s+/g, " ");

const L = {
  en: { role: "Full-stack developer", line: "Web · mobile · AI", article: "Article", case: "Case study", blog: "Blog" },
  pl: { role: "Programista full stack", line: "Web · mobile · AI", article: "Artykuł", case: "Case study", blog: "Blog" },
  es: { role: "Desarrollador full stack", line: "Web · móvil · IA", article: "Artículo", case: "Caso de estudio", blog: "Blog" },
};
/** Per page: field colours and the picture on the right. */
const SKIN = {
  home: { bg: "#2433ff", fg: "#eef0ff" },
  work: { bg: "#ffd23f", fg: "#0a0d33" },
  cv: { bg: "#c9f24a", fg: "#0a0d33" },
  "my-life": { bg: "#ff4fb8", fg: "#0a0d33" },
  blog: { bg: "#0a0d33", fg: "#eef0ff" },
  article: { bg: "#0a0d33", fg: "#eef0ff" },
  case: { bg: "#ff4fb8", fg: "#0a0d33" },
};

const tiles = (names, colours) =>
  names
    .map(
      (name, i) =>
        `<span class="tile" style="--tb:${colours[i % colours.length]};--r:${[-8, 6, -4, 9, -7, 4][i % 6]}deg">${icon(name)}</span>`,
    )
    .join("");

function art(job) {
  const { key } = job;
  if (key === "home")
    return `<div class="tiles">${tiles(
      ["si:react", "si:nextdotjs", "si:typescript", "si:expo", "si:astro", "si:claude"],
      ["#eef0ff", "#ffd23f", "#c9f24a", "#ff4fb8", "#ff5b1f", "#eef0ff"],
    )}</div>`;
  if (key === "my-life")
    return `<div class="tiles">${tiles(
      ["tb:barbell", "tb:motorbike", "tb:plane", "tb:music", "tb:device-gamepad-2", "tb:movie"],
      ["#eef0ff", "#ffd23f", "#c9f24a", "#2433ff", "#ff5b1f", "#eef0ff"],
    )}</div>`;
  if (key === "work")
    return `<div class="posters">${[
      ["#ff5b1f", "tb:device-mobile", -9],
      ["#c9f24a", "tb:browser", 4],
      ["#2433ff", "tb:planet", -3],
    ]
      .map(
        ([bg, name, r], i) => `<span class="poster" style="--pb:${bg};--r:${r}deg;--i:${i}">${icon(name)}<i></i><i></i></span>`,
      )
      .join("")}</div>`;
  if (key === "cv")
    return `<div class="sheet"><b></b><i class="w80"></i><i></i><i class="w60"></i><u></u><i></i><i class="w80"></i><i class="w60"></i><span class="pdf">PDF</span></div>`;
  if (key === "blog")
    return `<div class="fan">${job.covers
      .slice(0, 3)
      .map((svg, i) => `<span style="--i:${i}">${svg}</span>`)
      .join("")}</div>`;
  // A post: its own cover in its own palette (PostCover.astro), framed.
  return `<div class="one">${job.covers[0] ?? ""}</div>`;
}

const template = (job) => {
  const t = L[job.lang] ?? L.en;
  const skin = SKIN[job.article ? (job.caseStudy ? "case" : "article") : job.key] ?? SKIN.home;
  const kicker = job.article ? (job.caseStudy ? t.case : t.article) : job.key === "blog" ? t.blog : t.role;
  return `<!doctype html><html lang="${job.lang}"><head><meta charset="utf-8"><style>
@font-face { font-family: Anybody; src: url(data:font/woff2;base64,${font}) format("woff2"); font-weight: 100 900; font-stretch: 50% 150%; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body { position: relative; display: grid; grid-template-rows: auto 1fr auto; padding: 48px 60px 44px; font-family: Anybody, sans-serif;
  background: ${skin.bg} radial-gradient(color-mix(in srgb, ${skin.fg} 16%, transparent) 1.6px, transparent 2.2px) 0 0 / 28px 28px; color: ${skin.fg}; }
.top { display: flex; align-items: center; gap: 18px; padding-bottom: 18px; border-bottom: 4px solid currentColor; font-weight: 900; font-size: 28px; text-transform: uppercase; font-stretch: 72%; }
.top svg { width: 56px; height: 56px; box-shadow: 0 0 0 3px ${skin.fg}; transform: rotate(-4deg); }
.top .k { margin-left: auto; padding: 8px 14px; background: ${skin.fg}; color: ${skin.bg}; font-weight: 800; font-size: 20px; letter-spacing: .06em; font-stretch: 118%; }
.mid { display: grid; grid-template-columns: minmax(0, 1fr) 420px; gap: 48px; align-items: center; min-height: 0; }
h1 { font-weight: 900; line-height: .92; text-transform: uppercase; font-stretch: 72%; text-wrap: balance; }
.foot { display: flex; justify-content: space-between; align-items: center; font-weight: 800; font-size: 22px; letter-spacing: .05em; text-transform: uppercase; font-stretch: 115%; }
.dot { display: inline-block; width: 20px; height: 20px; margin-right: 12px; vertical-align: -2px; background: ${skin.bg === "#ff4fb8" ? "#ffd23f" : "#ff4fb8"}; box-shadow: 4px 4px 0 currentColor; }
.tiles { display: grid; grid-template-columns: repeat(3, 112px); gap: 26px; justify-content: center; }
.tile { display: grid; place-items: center; width: 112px; height: 112px; padding: 26px; background: var(--tb); color: #0a0d33; box-shadow: 0 0 0 4px #0a0d33, 9px 9px 0 4px #0a0d33; transform: rotate(var(--r)); }
.tile svg { width: 100%; height: 100%; }
.posters { position: relative; height: 380px; }
.poster { position: absolute; left: calc(var(--i) * 110px); top: calc(var(--i) * 30px); display: grid; align-content: start; gap: 14px; width: 200px; height: 280px; padding: 26px 22px; background: var(--pb); color: #0a0d33; box-shadow: 0 0 0 4px #0a0d33, 10px 10px 0 4px #0a0d33; transform: rotate(var(--r)); }
.poster svg { width: 70px; height: 70px; color: ${"#0a0d33"}; }
.poster:nth-child(3) svg, .poster:nth-child(3) { color: #eef0ff; }
.poster i { height: 14px; background: currentColor; opacity: .85; }
.poster i + i { width: 60%; }
.sheet { position: relative; display: grid; align-content: start; gap: 16px; width: 300px; height: 360px; margin: 0 auto; padding: 30px 28px; background: #fff; color: #0a0d33; box-shadow: 0 0 0 4px #0a0d33, 12px 12px 0 4px #0a0d33; transform: rotate(3deg); }
.sheet b { height: 34px; width: 70%; background: #0a0d33; }
.sheet i { height: 12px; background: #0a0d3355; }
.sheet .w80 { width: 80%; } .sheet .w60 { width: 60%; }
.sheet u { height: 6px; margin: 6px 0; background: #2433ff; }
.pdf { position: absolute; right: -34px; bottom: 40px; padding: 12px 20px; background: #ff4fb8; color: #0a0d33; font-weight: 900; font-size: 34px; box-shadow: 0 0 0 4px #0a0d33, 7px 7px 0 4px #0a0d33; transform: rotate(-10deg); }
.fan { position: relative; height: 360px; }
.fan span { position: absolute; left: calc(var(--i) * 50px); top: calc(var(--i) * 56px); width: 330px; transform: rotate(calc(-6deg + var(--i) * 6deg)); box-shadow: 0 0 0 4px ${skin.fg}, 10px 10px 0 4px ${skin.fg === "#0a0d33" ? "#0a0d33" : "#ff4fb8"}; }
.fan svg, .one svg { display: block; width: 100%; height: auto; }
.one { transform: rotate(3deg); box-shadow: 0 0 0 4px ${skin.fg}, 14px 14px 0 4px ${skin.fg === "#0a0d33" ? "#0a0d33" : "#ff4fb8"}; }
</style></head><body>
<div class="top">${logo}<span>Mateusz Muszarski</span><span class="k">${escape(kicker)}</span></div>
<div class="mid"><h1 id="t">${escape(job.title)}</h1>${art(job)}</div>
<div class="foot"><span><i class="dot"></i>muszarski.com</span><span>${escape(t.line)}</span></div>
</body></html>`;
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const job of jobs.values()) {
  await page.setContent(template(job), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  // The biggest size at which the title fits its column (height of the middle band, no overflow sideways).
  await page.evaluate(() => {
    const h1 = document.getElementById("t");
    const limit = h1.parentElement.clientHeight - 16;
    for (let size = 190; size >= 36; size -= 2) {
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
  await iconPage.setContent(
    `<html><body style="margin:0">${svg.replace("<svg ", `<svg width="${size}" height="${size}" `)}</body></html>`,
  );
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
