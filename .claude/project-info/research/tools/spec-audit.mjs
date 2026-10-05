import { chromium, devices } from 'playwright';
import fs from 'fs';

const sites = (process.argv[2] || '').split(',').filter(Boolean);
const out = [];
const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'] });

async function audit(url, mode) {
  const ctxOpts = mode === 'mobile'
    ? { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } }
    : { viewport: { width: 1440, height: 900 } };
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  let bytes = 0, reqs = 0;
  page.on('requestfinished', async (r) => {
    try { const s = await r.sizes(); bytes += s.responseBodySize; reqs++; } catch {}
  });
  const t0 = Date.now();
  const res = { url, mode };
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 40000 });
    res.loadMs = Date.now() - t0;
    await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
    await page.waitForTimeout(2500);
    const info = await page.evaluate(() => {
      const paint = performance.getEntriesByType('paint').find(e => e.name === 'first-contentful-paint');
      const vis = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && r.top < innerHeight && r.bottom > 0; };
      const anchors = [...document.querySelectorAll('a')];
      const navTexts = anchors.filter(vis).map(a => (a.innerText || a.getAttribute('aria-label') || '').trim()).filter(Boolean).slice(0, 25);
      const canvases = [...document.querySelectorAll('canvas')].filter(c => { const r = c.getBoundingClientRect(); return r.width * r.height > 0.2 * innerWidth * innerHeight; }).length;
      const bodyText = (document.body.innerText || '').replace(/\s+/g, ' ');
      return {
        title: document.title,
        fcp: paint ? Math.round(paint.startTime) : null,
        bigCanvases: canvases,
        allCanvases: document.querySelectorAll('canvas').length,
        textChars: bodyText.length,
        aboveFoldLinks: navTexts,
        mailto: anchors.some(a => (a.href || '').startsWith('mailto:')),
        contactWord: /contact|get in touch|email|hire|say hi|hello@/i.test(bodyText),
        projectsWord: /project|work|case stud|selected/i.test(bodyText),
        scrollH: document.documentElement.scrollHeight,
        innerH: innerHeight,
        h1: (document.querySelector('h1')?.innerText || '').slice(0, 120),
        textSample: bodyText.slice(0, 300),
        mobileBlock: /desktop only|best (viewed|experienced) on (a )?desktop|not (available|supported) on mobile|switch to desktop|use a desktop|larger screen/i.test(bodyText),
      };
    });
    Object.assign(res, info);
  } catch (e) {
    res.error = String(e).slice(0, 200);
  }
  res.bytesKB = Math.round(bytes / 1024);
  res.requests = reqs;
  await ctx.close();
  return res;
}

for (const s of sites) {
  for (const mode of ['desktop', 'mobile']) {
    const r = await audit(s, mode);
    out.push(r);
    console.log(JSON.stringify(r));
  }
}
await browser.close();
const f = process.argv[3] || 'spec-audit-out.json';
fs.writeFileSync(f, JSON.stringify(out, null, 1));
