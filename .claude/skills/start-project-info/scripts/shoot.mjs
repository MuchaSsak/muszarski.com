#!/usr/bin/env node
/**
 * Screenshots of live design comps (start-project-info Phase 3, references/look-first.md):
 *
 *   node <skill>/scripts/shoot.mjs <compsDir> [page...] [--widths=1440,390] [--t=5] [--out=dir]
 *     [--q=theme=paper&type=flex] [--tag=paper] [--sections] [--full] [--reduced]
 *
 * Serves <compsDir> on a free local port (no other server needed), opens each <page>.html (default: every .html
 * except index.html) with ?shot&t=<t> so the comp freezes its animation clock, and shoots the top of the page
 * (-hero) and the [data-shot-focus] element (-focus) at each width. --sections also shoots every
 * [data-shot="name"] element; --full adds a full-page shot; --q adds query params; --tag suffixes the file names.
 * Writes JPEGs to <compsDir>/shots/.work/ (keep it gitignored) and prints horizontal overflow and console errors
 * per page and width: both should be 0.
 *
 * Needs Playwright (`playwright` or `@playwright/test`) resolvable from the current directory, the comps folder or
 * an apps/* / packages/* workspace, plus Chromium: `npm i -D playwright && npx playwright install chromium`.
 */
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = Object.fromEntries(
  args.filter((a) => a.startsWith("--")).map((a) => {
    const i = a.indexOf("=");
    return i < 0 ? [a.slice(2), "1"] : [a.slice(2, i), a.slice(i + 1)];
  }),
);
const [dirArg, ...pageArgs] = args.filter((a) => !a.startsWith("--"));
if (!dirArg) {
  console.error("usage: node shoot.mjs <compsDir> [page...] [--widths=1440,390] [--t=5] [--sections] [--full] [--reduced]");
  process.exit(2);
}
const root = path.resolve(dirArg);
const pages = pageArgs.length
  ? pageArgs.map((p) => p.replace(/\.html$/, ""))
  : readdirSync(root).filter((f) => f.endsWith(".html") && f !== "index.html").map((f) => f.slice(0, -5));
const widths = (opt.widths ?? "1440,390").split(",").map(Number);
const t = opt.t ?? "5";
const out = path.resolve(opt.out ?? path.join(root, "shots", ".work"));
mkdirSync(out, { recursive: true });

// Playwright from the project: cwd, the comps folder, then monorepo workspaces.
function loadPlaywright() {
  const cwd = process.cwd();
  const bases = [cwd, root];
  for (const group of ["apps", "packages"]) {
    const dir = path.join(cwd, group);
    if (existsSync(dir)) for (const d of readdirSync(dir)) bases.push(path.join(dir, d));
  }
  for (const base of bases) {
    const req = createRequire(path.join(base, "package.json"));
    for (const name of ["playwright", "@playwright/test"]) {
      try {
        return req(name);
      } catch {}
    }
  }
  console.error("Playwright not found. Install it: npm i -D playwright && npx playwright install chromium");
  process.exit(1);
}
const { chromium } = loadPlaywright();

const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".avif": "image/avif", ".gif": "image/gif", ".mp4": "video/mp4", ".webm": "video/webm",
  ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json", ".wasm": "application/wasm", ".txt": "text/plain",
};
const server = createServer((req, res) => {
  const rel = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = path.join(root, rel.endsWith("/") ? rel + "index.html" : rel);
  if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "content-type": TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const origin = `http://127.0.0.1:${server.address().port}`;

// A real GPU where possible, so shader comps render as the owner will see them.
const gpu = ["--enable-gpu", "--ignore-gpu-blocklist", "--enable-gpu-rasterization"];
const browser = await chromium.launch({ args: process.platform === "win32" ? ["--use-angle=d3d11", ...gpu] : gpu });
let failed = 0;
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
    await p.goto(`${origin}/${page}.html?shot&t=${t}${opt.q ? "&" + opt.q : ""}`, { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(900);
    const base = path.join(out, `${page}${opt.tag ? "-" + opt.tag : ""}-${w}`);
    await p.screenshot({ path: `${base}-hero.jpg`, type: "jpeg", quality: 82 });
    const focus = await p.$("[data-shot-focus]");
    if (focus) {
      await focus.evaluate((el) => el.scrollIntoView({ block: "center" }));
      await p.waitForTimeout(700);
      await p.screenshot({ path: `${base}-focus.jpg`, type: "jpeg", quality: 82 });
    }
    if (opt.sections) {
      // Boxes measured once at the top; the viewport takes each section's height (a full-page capture shifts the
      // layout under mobile emulation, and element shots drift by the scroll offset on long pages).
      await p.evaluate(() => scrollTo(0, 0));
      await p.waitForTimeout(300);
      const boxes = await p.evaluate(() =>
        [...document.querySelectorAll("[data-shot]")].map((e) => {
          const r = e.getBoundingClientRect();
          return { name: e.dataset.shot, y: Math.round(r.top + scrollY), height: Math.round(r.height) };
        }),
      );
      const vp = p.viewportSize();
      for (const { name, y, height } of boxes) {
        await p.setViewportSize({ width: vp.width, height: Math.max(200, height) });
        await p.evaluate((top) => scrollTo(0, top), y);
        await p.waitForTimeout(250);
        await p.screenshot({ path: `${base}-s-${name}.jpg`, type: "jpeg", quality: 82 });
      }
      await p.setViewportSize(vp);
    }
    if (opt.full) await p.screenshot({ path: `${base}-full.jpg`, type: "jpeg", quality: 70, fullPage: true });
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (overflow > 0 || errors.length) failed++;
    console.log(`${page} ${w}: overflow ${overflow}px${errors.length ? " errors: " + errors.join(" | ").slice(0, 300) : ""}`);
    await ctx.close();
  }
}
await browser.close();
server.close();
console.log(`shots in ${out}${failed ? ` · ${failed} page/width with overflow or errors` : ""}`);
process.exitCode = failed ? 1 : 0;
