// Screenshots of the rebrand comps: node comps/shoot.mjs [page...] [--widths=1440,390] [--t=5] [--out=dir]
// Serves comps/ on 127.0.0.1:4391 (python http.server must already run there), freezes the animation clock with ?shot&t=,
// and shoots the hero (top of page) and the [data-shot-focus] element (the work section) at each width.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(new URL("../apps/web/package.json", import.meta.url));
const { chromium } = require("@playwright/test");

const args = process.argv.slice(2);
const opt = Object.fromEntries(args.filter((a) => a.startsWith("--")).map((a) => a.slice(2).split("=")));
const pages = args.filter((a) => !a.startsWith("--"));
const widths = (opt.widths ?? "1440,390").split(",").map(Number);
const t = opt.t ?? "5";
const here = path.dirname(fileURLToPath(import.meta.url));
const out = opt.out ?? path.join(here, "shots", ".work");
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  args: ["--use-angle=d3d11", "--enable-gpu", "--ignore-gpu-blocklist", "--enable-gpu-rasterization"],
});
for (const page of pages) {
  for (const w of widths) {
    const mobile = w < 600;
    const ctx = await browser.newContext({
      viewport: { width: w, height: mobile ? 844 : 900 },
      deviceScaleFactor: mobile ? 2 : 1,
      isMobile: mobile,
      hasTouch: mobile,
      reducedMotion: opt.reduced ? "reduce" : "no-preference",
    });
    const p = await ctx.newPage();
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await p.goto(`http://127.0.0.1:4391/${page}.html?shot&t=${t}`, { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(900);
    const base = path.join(out, `${page}-${w}`);
    await p.screenshot({ path: `${base}-hero.jpg`, type: "jpeg", quality: 82 });
    const focus = await p.$("[data-shot-focus]");
    if (focus) {
      await focus.evaluate((el) => el.scrollIntoView({ block: "center" }));
      await p.waitForTimeout(700);
      await p.screenshot({ path: `${base}-work.jpg`, type: "jpeg", quality: 82 });
    }
    if (opt.full) await p.screenshot({ path: `${base}-full.jpg`, type: "jpeg", quality: 70, fullPage: true });
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    console.log(`${page} ${w}: overflow ${overflow}px${errors.length ? " errors: " + errors.join(" | ").slice(0, 300) : ""}`);
    await ctx.close();
  }
}
await browser.close();
