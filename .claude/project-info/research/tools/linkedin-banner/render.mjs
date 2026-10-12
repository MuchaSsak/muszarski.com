// Renders banner.html (variants a, b, c) to 1584 x 396 PNGs, plus a sheet that shows each one as LinkedIn frames it:
// desktop (photo circle measured on the live profile, 2026-10-12) and phone width (390 px, estimated).
// Run from the repo root: node .claude/project-info/research/tools/linkedin-banner/render.mjs <outDir> [a,b,c]
// The live banner since 2026-10-12 is variant b (space remix).
import { mkdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(resolve(here, "../../../../../apps/web/package.json"));
const mod = await import(pathToFileURL(require.resolve("@playwright/test")).href);
const { chromium } = mod.chromium ? mod : mod.default;

const out = resolve(process.argv[2] ?? "banner-out");
mkdirSync(out, { recursive: true });
const variants = (process.argv[3] ?? "a,b,c").split(",");
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: 1584, height: 396 } });
page.on("pageerror", (e) => console.log("pageerror", e.message));
for (const v of variants) {
  await page.goto(`${pathToFileURL(resolve(here, "banner.html")).href}?v=${v}`);
  await page.waitForSelector("body[data-ready='1']");
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/banner-${v}.png` });
  console.log("rendered", v);
}

const rows = variants
  .map((v) => {
    const src = `data:image/png;base64,${readFileSync(`${out}/banner-${v}.png`).toString("base64")}`;
    return `<section><h2>${v.toUpperCase()}</h2>
      <div class="desk"><img src="${src}"><i></i></div>
      <div class="phone"><img src="${src}"><i></i></div></section>`;
  })
  .join("");
const sheet = await browser.newPage({ viewport: { width: 1320, height: 400 } });
await sheet.setContent(`<!doctype html><style>
  body{margin:0;padding:24px;background:#f3f2ef;font:600 18px system-ui;display:grid;gap:28px}
  section{display:flex;gap:28px;align-items:flex-start}
  h2{margin:0;width:28px}
  .desk,.phone{position:relative;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 0 0 1px #ddd}
  .desk{width:792px;height:300px}.desk img{width:792px;display:block}
  .desk i{position:absolute;left:24px;top:102px;width:160px;height:160px;border-radius:50%;background:#888;border:4px solid #fff}
  .phone{width:390px;height:190px}.phone img{width:390px;display:block}
  .phone i{position:absolute;left:16px;top:56px;width:96px;height:96px;border-radius:50%;background:#888;border:3px solid #fff}
</style>${rows}`);
await sheet.waitForTimeout(400);
await sheet.screenshot({ path: `${out}/banner-sheet.png`, fullPage: true });
await browser.close();
console.log("ok", out);
