// Name-search SERP capture (before/after study, research/2026-10-11-serp-baseline.md): headed Chrome with a
// persistent temp profile, full-page + first-screen shots and a DOM dump per query.
// usage (from the repo root): node .claude/project-info/research/tools/serp-capture.mjs <outDir> [id | g | nog]
// Google answers automation with a CAPTCHA: the script waits up to 5 min for a person to solve it in the window.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(path.resolve("apps/web/package.json"));
const { chromium } = require("@playwright/test");

const out = process.argv[2];
const only = process.argv[3];
fs.mkdirSync(out, { recursive: true });
const q = (s) => encodeURIComponent(s);

const G = "https://www.google.com/search?pws=0&gl=pl";
const jobs = [
  { id: "g-en-name", url: `${G}&hl=en&q=${q("Mateusz Muszarski")}` },
  { id: "g-en-name-quoted", url: `${G}&hl=en&q=${q('"Mateusz Muszarski"')}` },
  { id: "g-en-name-developer", url: `${G}&hl=en&q=${q("Mateusz Muszarski developer")}` },
  { id: "g-en-muszarski", url: `${G}&hl=en&q=${q("Muszarski")}` },
  { id: "g-en-matmuszarski", url: `${G}&hl=en&q=${q("matmuszarski")}` },
  { id: "g-pl-name", url: `https://www.google.pl/search?pws=0&gl=pl&hl=pl&q=${q("Mateusz Muszarski")}` },
  { id: "g-pl-name-programista", url: `https://www.google.pl/search?pws=0&gl=pl&hl=pl&q=${q("Mateusz Muszarski programista")}` },
  { id: "g-en-images", url: `${G}&hl=en&udm=2&q=${q("Mateusz Muszarski")}` },
  { id: "g-en-name-mobile", url: `${G}&hl=en&q=${q("Mateusz Muszarski")}`, mobile: true },
  { id: "g-en-images-mobile", url: `${G}&hl=en&udm=2&q=${q("Mateusz Muszarski")}`, mobile: true },
  { id: "bing-name", url: `https://www.bing.com/search?setlang=en&cc=PL&q=${q("Mateusz Muszarski")}` },
  { id: "bing-images", url: `https://www.bing.com/images/search?setlang=en&cc=PL&q=${q("Mateusz Muszarski")}` },
  { id: "sp-name", url: `https://www.startpage.com/do/search?language=english&q=${q("Mateusz Muszarski")}` },
  { id: "sp-name-quoted", url: `https://www.startpage.com/do/search?language=english&q=${q('"Mateusz Muszarski"')}` },
  { id: "sp-name-developer", url: `https://www.startpage.com/do/search?language=english&q=${q("Mateusz Muszarski developer")}` },
  { id: "sp-images", url: `https://www.startpage.com/do/search?language=english&cat=images&q=${q("Mateusz Muszarski")}` },
  { id: "bing-name-developer", url: `https://www.bing.com/search?setlang=en&cc=PL&q=${q("Mateusz Muszarski developer")}` },
  { id: "ddg-name", url: `https://duckduckgo.com/?kl=pl-pl&q=${q("Mateusz Muszarski")}` },
].filter((j) => !only || (only === "g" ? j.id.startsWith("g-") : only === "nog" ? !j.id.startsWith("g-") : j.id === only));

const profile = path.join(os.tmpdir(), "serp-capture-profile");
const ctxFor = async (mobile) =>
  chromium.launchPersistentContext(profile + (mobile ? "-m" : ""), {
    channel: "chrome",
    headless: false,
    locale: "en-GB",
    viewport: mobile ? { width: 412, height: 915 } : { width: 1440, height: 1000 },
    deviceScaleFactor: mobile ? 2.625 : 1,
    isMobile: mobile,
    hasTouch: mobile,
    userAgent: mobile
      ? "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36"
      : undefined,
  });

async function consent(page) {
  const bingReject = page.locator("#bnp_btn_reject, button:has-text('Reject')").first();
  if (await bingReject.isVisible({ timeout: 800 }).catch(() => false)) { await bingReject.click(); await page.waitForTimeout(1000); return false; }
  for (const label of [/^Reject all$/i, /^Odrzuć wszystko$/i, /^Decline optional cookies$/i, /^Reject$/i]) {
    const b = page.getByRole("button", { name: label }).first();
    if (await b.isVisible({ timeout: 800 }).catch(() => false)) {
      await b.click();
      await page.waitForLoadState("domcontentloaded");
      await page.waitForTimeout(1500);
      return true;
    }
  }
  return false;
}

const summary = [];
for (const mobile of [false, true]) {
  const set = jobs.filter((j) => !!j.mobile === mobile);
  if (!set.length) continue;
  const ctx = await ctxFor(mobile);
  const page = ctx.pages()[0] ?? (await ctx.newPage());
  for (const j of set) {
    await page.goto(j.url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    if (await consent(page)) await page.goto(j.url, { waitUntil: "domcontentloaded" }), await page.waitForTimeout(2500);
    // Google CAPTCHA: wait (up to 5 min) for the owner to solve it in the window, then reload the query
    const isSorry = () => /\/sorry\//.test(page.url());
    if (isSorry()) {
      console.log(j.id, "CAPTCHA: solve it in the Chrome window, waiting...");
      for (let t = 0; t < 150 && isSorry(); t++) await page.waitForTimeout(2000);
      await page.goto(j.url, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(2500);
      await consent(page);
    }
    // lazy images: scroll down and back
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    const captcha = /unusual traffic|sorry\/index|recaptcha/i.test(page.url() + (await page.content()).slice(0, 20000));
    await page.screenshot({ path: path.join(out, `${j.id}.png`), fullPage: true });
    await page.screenshot({ path: path.join(out, `${j.id}-fold.png`) });
    const data = await page.evaluate(() => {
      const links = [...document.querySelectorAll("a[href]")]
        .map((a) => ({ href: a.href, text: (a.querySelector("h3")?.innerText || a.innerText || "").trim().slice(0, 160) }))
        .filter((l) => /^https?:/.test(l.href) && !/google\.|bing\.com|duckduckgo|gstatic|microsoft\.com|youtube\.com\/(?:about|t\/)/.test(new URL(l.href).hostname + new URL(l.href).pathname) && l.text);
      const seen = new Set();
      const uniq = links.filter((l) => (seen.has(l.href) ? false : seen.add(l.href)));
      const kp = document.querySelector("#rhs, [data-attrid='title'], .kp-wholepage, .b_entityTP, #b_context .b_entityTitle");
      const organic = [...document.querySelectorAll("li.b_algo, article[data-testid=result], .w-gl .result, #search .MjjYud")].map((el, i) => ({
        rank: i + 1,
        title: (el.querySelector("h2, h3")?.innerText || "").trim(),
        cite: (el.querySelector("cite, .wgl-display-url, [data-testid=result-extras-url-link]")?.innerText || "").trim(),
      })).filter((r) => r.title);
      return {
        title: document.title,
        organic,
        knowledgePanel: kp ? kp.innerText.slice(0, 1500) : null,
        bodyText: document.body.innerText.slice(0, 12000),
        links: uniq.slice(0, 80),
      };
    });
    fs.writeFileSync(path.join(out, `${j.id}.json`), JSON.stringify({ ...j, finalUrl: page.url(), captcha, at: new Date().toISOString(), ...data }, null, 2));
    summary.push({ id: j.id, captcha, kp: !!data.knowledgePanel, links: data.links.length });
    console.log(j.id, captcha ? "CAPTCHA" : "ok", "kp:", !!data.knowledgePanel, "links:", data.links.length);
  }
  await ctx.close();
}
fs.writeFileSync(path.join(out, "summary.json"), JSON.stringify(summary, null, 2));
