#!/usr/bin/env node
/**
 * Lighthouse against the BUILT site, checked against the budgets (product/requirements.md § Budgets):
 * mobile (simulated throttling, the median of --runs) and, with --desktop, one desktop run per page.
 *
 *   bun run build && bun run lhci [-- --runs 3 --desktop --base http://localhost:4330 /en/ /pl/]
 *
 * Without --base it uses the preview on 4322 (Astro 7 runs one `astro preview` per project, shared with the
 * e2e suite) or starts one and stops it afterwards. Review builds
 * are noindex, so SEO is scored without `is-crawlable` (the launch gate checks the launch robots).
 * Writes lighthouse/summary.json (gitignored) and exits 1 when a budget is missed.
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const value = (name, fallback) => {
  const index = argv.indexOf(`--${name}`);
  return index >= 0 ? argv[index + 1] : fallback;
};
const runs = Number(value("runs", "3"));
const desktop = flag("desktop");
const PORT = 4322;
let base = value("base", null);
const valued = new Set(["--runs", "--base"]);
const paths = argv.filter((arg, index) => !arg.startsWith("--") && !valued.has(argv[index - 1]));
const PAGES = paths.length ? paths : ["/en/", "/pl/", "/es/"];

// The site bar is mobile >= 90 (CLAUDE.md); the working target is 95+ with headroom for later slices.
const BUDGET = { performance: 95, accessibility: 100, "best-practices": 100, seo: 100, lcp: 2000, cls: 0.05, tbt: 100 };

let server = null;
const answers = async (url) => {
  try {
    return (await fetch(`${url}/en/`)).ok;
  } catch {
    return false;
  }
};

if (!base && (await answers(`http://localhost:${PORT}`))) base = `http://localhost:${PORT}`;
if (!base) {
  base = `http://localhost:${PORT}`;
  // Astro's own bin through this Node: no shell, so the process we kill is the server itself.
  const astroBin = join(ROOT, "node_modules", "astro", "bin", "astro.mjs");
  server = spawn(process.execPath, [astroBin, "preview", "--port", String(PORT)], { cwd: ROOT, stdio: "ignore" });
  let up = false;
  for (let i = 0; i < 120 && !up; i++) {
    up = await answers(base);
    if (!up) await new Promise((resolve) => setTimeout(resolve, 500));
  }
  if (!up) {
    server.kill();
    throw new Error(`astro preview did not answer on ${base} within 60 s`);
  }
}

const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH ?? chromium.executablePath(),
  chromeFlags: ["--headless=new", "--no-sandbox"],
});
const settings = { skipAudits: ["is-crawlable"], output: "json", logLevel: "error" };

async function audit(url, mode) {
  const config =
    mode === "desktop" ? { ...desktopConfig, settings: { ...desktopConfig.settings, ...settings } } : { extends: "lighthouse:default", settings };
  const result = await lighthouse(url, { port: chrome.port, ...settings }, config);
  const { categories, audits, runtimeError } = result.lhr;
  if (runtimeError) throw new Error(`${url}: ${runtimeError.code} ${runtimeError.message}`);
  return {
    performance: Math.round(categories.performance.score * 100),
    accessibility: Math.round(categories.accessibility.score * 100),
    "best-practices": Math.round(categories["best-practices"].score * 100),
    seo: Math.round(categories.seo.score * 100),
    fcp: Math.round(audits["first-contentful-paint"].numericValue),
    lcp: Math.round(audits["largest-contentful-paint"].numericValue),
    cls: Number((audits["cumulative-layout-shift"].numericValue ?? 0).toFixed(3)),
    tbt: Math.round(audits["total-blocking-time"].numericValue),
    kb: Math.round(audits["total-byte-weight"].numericValue / 1024),
  };
}

const median = (list, key) => {
  const sorted = list.map((item) => item[key]).sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
};

const rows = [];
const misses = [];
try {
  for (const path of PAGES) {
    const url = base + path;
    const mobileRuns = [];
    for (let i = 0; i < runs; i++) mobileRuns.push(await audit(url, "mobile"));
    const mobile = Object.fromEntries(Object.keys(mobileRuns[0]).map((key) => [key, median(mobileRuns, key)]));
    rows.push({ path, mode: "mobile", ...mobile });
    for (const [key, bar] of Object.entries(BUDGET)) {
      const ok = ["lcp", "cls", "tbt"].includes(key) ? mobile[key] <= bar : mobile[key] >= bar;
      if (!ok) misses.push(`${path} mobile ${key} ${mobile[key]} (budget ${bar})`);
    }
    if (desktop) rows.push({ path, mode: "desktop", ...(await audit(url, "desktop")) });
  }
} finally {
  await chrome.kill();
  if (server) server.kill();
}

console.log("page".padEnd(28), "mode    perf a11y bp  seo   fcp    lcp    cls    tbt   KB");
for (const row of rows) {
  console.log(
    row.path.padEnd(28),
    row.mode.padEnd(7),
    String(row.performance).padStart(4),
    String(row.accessibility).padStart(4),
    String(row["best-practices"]).padStart(3),
    String(row.seo).padStart(4),
    `${row.fcp}ms`.padStart(6),
    `${row.lcp}ms`.padStart(6),
    String(row.cls).padStart(6),
    `${row.tbt}ms`.padStart(6),
    String(row.kb).padStart(4),
  );
}
mkdirSync(join(ROOT, "lighthouse"), { recursive: true });
writeFileSync(join(ROOT, "lighthouse", "summary.json"), JSON.stringify({ at: new Date().toISOString(), runs, rows, misses }, null, 2));
if (misses.length) {
  console.error(`\n${misses.length} budget miss(es):\n  ${misses.join("\n  ")}`);
  process.exit(1);
}
console.log(`\nAll ${rows.length} runs within budget.`);
