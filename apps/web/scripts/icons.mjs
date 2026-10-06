#!/usr/bin/env node
/**
 * Build-time icon set (wiki: design/assets.md, design/design.md § Icons). Run when the list changes: `bun run icons`.
 * The output is committed; the Vercel build never runs this.
 *
 * - Tool marks: Simple Icons 16.34.0 (package CC0-1.0). The marks stay their owners' trademarks: shown one colour,
 *   unaltered, only to name a tool he uses (nominative use).
 * - UI icons: Tabler Icons 3.49.0 (MIT); the licence text ships in public/licenses/.
 * - Vendored marks (`mk:`): a tool's own logo file from its permissively licensed repo, for tools Simple Icons lacks
 *   (scripts/marks/; the licence ships in public/licenses/). Drawn one colour, like the Simple Icons marks.
 *
 * Writes src/lib/icons.gen.ts: { "si:react": { viewBox, body, stroke }, ... } with only the icons listed below.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MODULES = join(ROOT, "node_modules");

/** Simple Icons slugs (simpleicons.org). */
const BRANDS = [
  "anthropic",
  "apple",
  "astro",
  "claude",
  "discord",
  "eslint",
  "expo",
  "github",
  "gitlab",
  "google",
  "googlesearchconsole",
  "googleplay",
  "lighthouse",
  "markdown",
  "gsap",
  "messenger",
  "modelcontextprotocol",
  "nextdotjs",
  "nodedotjs",
  "npm",
  "postgresql",
  "react",
  "reactquery",
  "resend",
  "revenuecat",
  "shadcnui",
  "supabase",
  "tailwindcss",
  "telegram",
  "threedotjs",
  "turborepo",
  "typescript",
  "udemy",
  "umami",
  "vercel",
  "vite",
  "vitest",
  "webgl",
];

/** Tabler outline icon names (tabler.io/icons). */
const UI = [
  "accessible",
  "alert-triangle",
  "arrow-down",
  "arrow-left",
  "arrow-right",
  "arrow-up",
  "arrow-up-right",
  "arrows-maximize",
  "award",
  "barbell",
  "book-2",
  "brain",
  "brand-linkedin",
  "briefcase",
  "browser",
  "building-store",
  "bulb",
  "calendar",
  "camera",
  "cards",
  "certificate",
  "chart-bar",
  "chart-line",
  "check",
  "checklist",
  "chevron-down",
  "circle-check",
  "clock",
  "clock-hour-4",
  "code",
  "coins",
  "copy",
  "credit-card",
  "cross",
  "cube",
  "database",
  "device-desktop",
  "device-gamepad-2",
  "device-mobile",
  "download",
  "external-link",
  "eye",
  "eye-off",
  "file-cv",
  "file-download",
  "file-text",
  "flame",
  "forms",
  "gauge",
  "git-branch",
  "git-pull-request",
  "hammer",
  "hand-click",
  "headphones",
  "heart",
  "home-heart",
  "language",
  "list-check",
  "mail",
  "map-pin",
  "menu-2",
  "message",
  "message-circle",
  "microphone",
  "motorbike",
  "movie",
  "music",
  "notebook",
  "palette",
  "pencil",
  "phone-call",
  "plane",
  "planet",
  "plug",
  "puzzle",
  "qrcode",
  "quote",
  "receipt-2",
  "refresh",
  "robot",
  "rocket",
  "route",
  "rss",
  "school",
  "search",
  "send",
  "shopping-cart",
  "shield-lock",
  "sparkles",
  "stack-2",
  "stars",
  "tag",
  "target",
  "terminal-2",
  "test-pipe",
  "trending-down",
  "trending-up",
  "user",
  "users",
  "users-group",
  "world",
  "x",
];

/** Tabler filled icons (solid glyphs read better than outlines at small sizes on media controls). */
const UI_FILLED = ["player-pause", "player-play", "star"];

/**
 * Vendored marks: the file, its source and licence, and a square crop around the drawing.
 * Playwright: microsoft/playwright packages/recorder/public/playwright-logo.svg, Apache-2.0 (playwright-apache-2.0.txt).
 */
const MARKS = [{ name: "playwright", file: "playwright.svg", viewBox: "19 28 360 360" }];

const icons = {};

for (const slug of BRANDS) {
  const svg = readFileSync(join(MODULES, "simple-icons", "icons", `${slug}.svg`), "utf8");
  const path = svg.match(/<path d="([^"]+)"/)?.[1];
  if (!path) throw new Error(`simple-icons/${slug}: no path`);
  icons[`si:${slug}`] = { viewBox: "0 0 24 24", body: `<path d="${path}"/>`, stroke: false };
}

for (const name of UI) {
  const svg = readFileSync(join(MODULES, "@tabler", "icons", "icons", "outline", `${name}.svg`), "utf8");
  const inner = svg
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    // Tabler's invisible 24x24 bounding box.
    .replace(/<path stroke="none" d="M0 0h24v24H0z" fill="none"\s*\/>/, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!inner) throw new Error(`tabler/${name}: empty`);
  icons[`tb:${name}`] = { viewBox: "0 0 24 24", body: inner, stroke: true };
}

for (const name of UI_FILLED) {
  const svg = readFileSync(join(MODULES, "@tabler", "icons", "icons", "filled", `${name}.svg`), "utf8");
  const inner = svg
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/<path stroke="none" d="M0 0h24v24H0z" fill="none"\s*\/>/, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!inner) throw new Error(`tabler filled/${name}: empty`);
  icons[`tbf:${name}`] = { viewBox: "0 0 24 24", body: inner, stroke: false };
}

for (const mark of MARKS) {
  const svg = readFileSync(join(ROOT, "scripts", "marks", mark.file), "utf8");
  // One colour: every shape takes currentColor from the icon.
  const paths = [...svg.matchAll(/<path d="([^"]+)"/g)].map((m) => `<path d="${m[1]}"/>`);
  if (!paths.length) throw new Error(`marks/${mark.file}: no path`);
  icons[`mk:${mark.name}`] = { viewBox: mark.viewBox, body: paths.join(""), stroke: false };
}

mkdirSync(join(ROOT, "public", "licenses"), { recursive: true });
copyFileSync(join(MODULES, "@tabler", "icons", "LICENSE"), join(ROOT, "public", "licenses", "tabler-icons-MIT.txt"));

const names = Object.keys(icons);
writeFileSync(
  join(ROOT, "src", "lib", "icons.gen.ts"),
  [
    "// GENERATED by scripts/icons.mjs - do not edit. Simple Icons 16.34.0 (CC0; marks are their owners' trademarks), Tabler Icons 3.49.0 (MIT), Playwright logo (Apache-2.0).",
    `export type IconName = ${names.map((n) => JSON.stringify(n)).join(" | ")};`,
    `export const ICONS: Record<IconName, { viewBox: string; body: string; stroke: boolean }> = ${JSON.stringify(icons, null, 2)};`,
    "",
  ].join("\n"),
);
console.log(`${names.length} icons, ${(JSON.stringify(icons).length / 1024).toFixed(1)} KB`);
