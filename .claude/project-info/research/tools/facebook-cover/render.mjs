// Renders cover.html to a 1638 x 606 PNG, plus a sheet that shows it as Facebook frames it (measured 2026-10-12):
// desktop, a 2.7:1 box with the profile photo below the cover, and phone web, a 390 x 132 box cropped top and bottom
// with the 104 px photo over the bottom-left corner.
// Run from the repo root: node .claude/project-info/research/tools/facebook-cover/render.mjs <outDir>
import { mkdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(resolve(here, "../../../../../apps/web/package.json"));
const mod = await import(pathToFileURL(require.resolve("@playwright/test")).href);
const { chromium } = mod.chromium ? mod : mod.default;

const out = resolve(process.argv[2] ?? "cover-out");
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: 1638, height: 606 } });
page.on("pageerror", (e) => console.log("pageerror", e.message));
await page.goto(pathToFileURL(resolve(here, "cover.html")).href);
await page.waitForSelector("body[data-ready='1']");
await page.waitForTimeout(300);
await page.screenshot({ path: `${out}/facebook-cover.png` });

const src = `data:image/png;base64,${readFileSync(`${out}/facebook-cover.png`).toString("base64")}`;
const sheet = await browser.newPage({ viewport: { width: 1320, height: 400 } });
await sheet.setContent(`<!doctype html><style>
  body{margin:0;padding:24px;background:#18191a;display:flex;gap:28px;align-items:flex-start}
  .desk,.phone{position:relative;background:#242526;border-radius:10px;overflow:hidden}
  .desk{width:820px;height:420px}.desk img{width:820px;height:303px;object-fit:cover;display:block}
  .desk i{position:absolute;left:31px;top:321px;width:110px;height:110px;border-radius:50%;background:#888;border:4px solid #242526}
  .phone{width:390px;height:260px}.phone img{width:390px;height:132px;object-fit:cover;display:block}
  .phone i{position:absolute;left:12px;top:108px;width:104px;height:104px;border-radius:50%;background:#888;border:3px solid #242526}
</style><div class="desk"><img src="${src}"><i></i></div><div class="phone"><img src="${src}"><i></i></div>`);
await sheet.waitForTimeout(400);
await sheet.screenshot({ path: `${out}/facebook-cover-sheet.png`, fullPage: true });
await browser.close();
console.log("ok", out);
