#!/usr/bin/env node
/**
 * Pictures of this site for a post (the new-blog skill, references/visuals.md): framed screenshots, element crops, a
 * strip of phone screens and short muted clips. Shoot a launch-mode build so projects without cleared rights never
 * appear (`IS_FULL_PRODUCTION=true npx astro build --outDir C:/Users/<you>/wtb-shots`, then
 * `npx astro preview --outDir C:/Users/<you>/wtb-shots --port 4345` in apps/web). Chromium runs on the GPU (ANGLE D3D11):
 * the software renderer starves the shaders and their states look broken.
 *
 *   node .claude/skills/new-blog/scripts/capture.mjs page  --url /en/work/ --out src/assets/blog/work-en.webp [--phone]
 *   node .claude/skills/new-blog/scripts/capture.mjs el    --url /en/ --sel ".more" --out src/assets/blog/strip-en.webp
 *   node .claude/skills/new-blog/scripts/capture.mjs strip --urls /en/,/en/work/,/en/cv/ --out src/assets/blog/phones-en.webp
 *   node .claude/skills/new-blog/scripts/capture.mjs clip  --url /en/work/ --sel "[data-xray]" --out public/media/blog/xray
 *   node .claude/skills/new-blog/scripts/capture.mjs overflow --urls /en/blog/my-post/,/pl/blog/moj-wpis/
 *
 * Common: --base http://localhost:4345 · --wait 2500 (ms for entrances and shaders) · --reduced (reduced motion) ·
 * --dark. Paths in --out are relative to apps/web. Stills: WebP, 1200 px wide (desktop 1440×900 at 1×; --phone
 * 390×844 at 2×). Clips: --seconds 6, recorded at 1200×750 and written as <out>.av1.mp4 (AV1, CRF 46),
 * <out>.mp4 (H.264, CRF 28) and <out>-poster.webp, 960×600, with ffmpeg on the PATH.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const WEB = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "..", "apps", "web");
const require = createRequire(join(WEB, "package.json"));
const { chromium } = require("@playwright/test");
const sharp = require("sharp");

const [command, ...argv] = process.argv.slice(2);
const opt = (name, fallback) => {
  const index = argv.indexOf(`--${name}`);
  return index >= 0 ? argv[index + 1] : fallback;
};
const flag = (name) => argv.includes(`--${name}`);
// Git Bash turns `/en/` into `P:/Git/en/` (or `C:/Program Files/Git/en/`) unless MSYS_NO_PATHCONV=1: undo it.
const site = (url) => url.replace(/^[A-Za-z]:\/(?:.*?\/)?Git(?=\/)/, "");
const base = opt("base", "http://localhost:4345");
const wait = Number(opt("wait", "2500"));
const out = opt("out") && resolve(WEB, opt("out"));
const GPU = ["--use-angle=d3d11", "--enable-gpu", "--ignore-gpu-blocklist"];

const browser = await chromium.launch({ args: GPU });
const open = async (url, viewport, scale = 1) => {
  const page = await browser.newPage({
    viewport,
    deviceScaleFactor: scale,
    colorScheme: flag("dark") ? "dark" : "light",
    reducedMotion: flag("reduced") ? "reduce" : "no-preference",
  });
  await page.goto(base + site(url), { waitUntil: "networkidle" });
  // A first interaction: media on this site waits for one before it loads.
  await page.mouse.move(viewport.width / 2, viewport.height / 2);
  await page.mouse.move(viewport.width / 3, viewport.height / 3);
  return page;
};
const webp = async (input, file, width = 1200) => {
  mkdirSync(dirname(file), { recursive: true });
  const info = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(file);
  console.log(`${file.slice(WEB.length + 1)}  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`);
};
/** Moves the pointer through points in small steps, like a hand. */
const glide = async (page, points, steps = 40, pause = 25) => {
  for (let i = 0; i < points.length - 1; i++) {
    const [[ax, ay], [bx, by]] = [points[i], points[i + 1]];
    for (let s = 1; s <= steps; s++) {
      await page.mouse.move(ax + ((bx - ax) * s) / steps, ay + ((by - ay) * s) / steps);
      await page.waitForTimeout(pause);
    }
  }
};

try {
  if (command === "page") {
    const phone = flag("phone");
    const viewport = phone ? { width: 390, height: 844 } : { width: Number(opt("width", "1440")), height: Number(opt("height", "900")) };
    const page = await open(opt("url"), viewport, phone ? 2 : 1);
    if (opt("scroll")) await page.locator(opt("scroll")).first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(wait);
    await webp(await page.screenshot(), out, phone ? 780 : 1200);
  } else if (command === "el") {
    const page = await open(opt("url"), { width: Number(opt("width", "1280")), height: Number(opt("height", "900")) });
    const element = page.locator(opt("sel")).first();
    await element.scrollIntoViewIfNeeded();
    await page.waitForTimeout(wait);
    await webp(await element.screenshot(), out);
  } else if (command === "strip") {
    // Phone screens side by side on navy. Composite first, then resize: sharp resizes before it composites in one
    // pipeline, which cut the last tile off once (lessons.md).
    const [w, h, gap] = [390, 844, 28];
    const urls = opt("urls").split(",");
    const tiles = [];
    for (const url of urls) {
      const page = await open(url, { width: w, height: h }, 2);
      await page.waitForTimeout(wait);
      tiles.push(await sharp(await page.screenshot()).resize(w, h).png().toBuffer());
      await page.close();
    }
    const canvas = await sharp({
      create: { width: urls.length * w + (urls.length + 1) * gap, height: h + 2 * gap, channels: 3, background: "#0c0c33" },
    })
      .composite(tiles.map((input, i) => ({ input, left: gap + i * (w + gap), top: gap })))
      .png()
      .toBuffer();
    await webp(canvas, out, 1600);
  } else if (command === "clip") {
    const [W, H] = [1200, 750];
    const page = await open(opt("url"), { width: W, height: H });
    const element = opt("sel") ? page.locator(opt("sel")).first() : null;
    if (element) {
      await element.scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollBy(0, -60));
    }
    await page.waitForTimeout(wait);
    const box = (element && (await element.boundingBox())) ?? { x: 0, y: 0, width: W, height: H };
    const at = (x, y) => [box.x + box.width * x, box.y + box.height * y];
    const frames = join(tmpdir(), `clip-${Date.now()}`);
    mkdirSync(frames, { recursive: true });
    const cdp = await page.context().newCDPSession(page);
    const shots = [];
    cdp.on("Page.screencastFrame", async (frame) => {
      const file = join(frames, `f${String(shots.length).padStart(5, "0")}.jpg`);
      shots.push({ file, t: frame.metadata.timestamp });
      writeFileSync(file, Buffer.from(frame.data, "base64"));
      await cdp.send("Page.screencastFrameAck", { sessionId: frame.sessionId }).catch(() => {});
    });
    await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: W, maxHeight: H, everyNthFrame: 1 });
    const seconds = Number(opt("seconds", "6"));
    const path = [at(0.1, 0.2), at(0.45, 0.35), at(0.75, 0.6), at(0.35, 0.75), at(0.6, 0.4)];
    await glide(page, path, Math.round((seconds * 1000) / (path.length - 1) / 30), 25);
    if (flag("click")) {
      await page.mouse.click(...at(0.5, 0.5));
      await page.waitForTimeout(1200);
    }
    await cdp.send("Page.stopScreencast");
    await page.waitForTimeout(200);
    // The frames arrive at the page's pace: a concat list keeps their real durations.
    let list = "";
    for (let i = 0; i < shots.length; i++) {
      const duration = i + 1 < shots.length ? shots[i + 1].t - shots[i].t : 0.04;
      list += `file '${shots[i].file.split(sep).join("/")}'\nduration ${Math.max(duration, 0.001).toFixed(4)}\n`;
    }
    list += `file '${shots.at(-1).file.split(sep).join("/")}'\n`;
    writeFileSync(join(frames, "list.txt"), list);
    mkdirSync(dirname(out), { recursive: true });
    const quiet = { stdio: ["ignore", "ignore", "pipe"], env: { ...process.env, SVT_LOG: "1" } };
    const input = ["-hide_banner", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", join(frames, "list.txt")];
    const vf = ["-vf", "fps=30,scale=960:600:flags=lanczos,format=yuv420p", "-an", "-movflags", "+faststart"];
    execFileSync("ffmpeg", [...input, ...vf, "-c:v", "libsvtav1", "-crf", "46", "-preset", "6", "-g", "300", `${out}.av1.mp4`], quiet);
    execFileSync("ffmpeg", [...input, ...vf, "-c:v", "libx264", "-crf", "28", "-preset", "slow", "-profile:v", "high", `${out}.mp4`]);
    const poster = join(frames, "poster.png");
    execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", `${out}.mp4`, "-vf", "select=eq(n\\,45)", "-frames:v", "1", poster]);
    await webp(poster, `${out}-poster.webp`, 960);
    rmSync(frames, { recursive: true, force: true });
    console.log(`${shots.length} frames, ${(shots.at(-1).t - shots[0].t).toFixed(1)} s → ${out.slice(WEB.length + 1)}.{av1.mp4,mp4}`);
  } else if (command === "overflow") {
    for (const url of opt("urls").split(",")) {
      const page = await open(url, { width: Number(opt("width", "320")), height: 700 });
      const extra = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      console.log(`${extra === 0 ? "ok  " : "FAIL"} ${site(url)} at ${opt("width", "320")} px: ${extra} px of sideways scroll`);
      await page.close();
    }
  } else {
    console.log("commands: page · el · strip · clip · overflow (see the header of this file)");
  }
} finally {
  await browser.close();
}
