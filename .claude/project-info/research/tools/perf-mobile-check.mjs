// Mobile render check: iPhone-like viewport in Chromium (NOT real WebKit/iOS). Usage: node perf/mobile-check.mjs [reduce]
import { chromium, devices } from 'playwright';
import fs from 'node:fs';
const reduce = process.argv[2] === 'reduce';
const raw0 = fs.readFileSync('perf/sites-mobile.txt','utf8'); const sites = (reduce ? raw0.split('# minimal')[0] : raw0).split(/\r?\n/).map(s=>s.trim()).filter(s=>s && !s.startsWith('#')).map(l=>l.split(/\s+/));
const browser = await chromium.launch({ headless: true, args: ['--enable-unsafe-webgpu','--ignore-gpu-blocklist'] });
const results = [];
for (const [slug, url] of sites) {
  const ctx = await browser.newContext({ ...devices['iPhone 13'], reducedMotion: reduce ? 'reduce' : 'no-preference' });
  await ctx.addInitScript(() => {
    window.__ctx = []; window.__raf = 0; window.__gpu = 0;
    const orig = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (t, ...a) { const r = orig.call(this, t, ...a); window.__ctx.push(t + (r ? '' : ':null')); return r; };
    if (window.OffscreenCanvas) { const o2 = OffscreenCanvas.prototype.getContext; OffscreenCanvas.prototype.getContext = function (t, ...a) { window.__ctx.push('offscreen-' + t); return o2.call(this, t, ...a); }; }
    const rafo = window.requestAnimationFrame; window.requestAnimationFrame = function (cb) { window.__raf++; return rafo.call(window, cb); };
    if (navigator.gpu) { const ra = navigator.gpu.requestAdapter.bind(navigator.gpu); navigator.gpu.requestAdapter = (...a) => { window.__gpu++; return ra(...a); }; }
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
  let status = 'ok';
  try { await page.goto(url, { waitUntil: 'load', timeout: 60000 }); } catch (e) { status = 'goto:' + String(e).slice(0, 60); }
  await page.waitForTimeout(12000);
  let info = {};
  try {
    const raf0 = await page.evaluate(() => window.__raf);
    await page.waitForTimeout(3000);
    info = await page.evaluate((raf0) => {
      const cs = [...document.querySelectorAll('canvas')].map(c => { const r = c.getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)}@${c.width}x${c.height}`; });
      const txt = (document.body?.innerText || '').replace(/\s+/g, ' ');
      const m = txt.match(/.{0,60}(desktop|larger screen|best (viewed|experienced)|not (available|supported) on mobile|rotate your|use a computer|on a computer).{0,60}/i);
      let renderer = '';
      try { const g = document.createElement('canvas').getContext('webgl'); const ext = g.getExtension('WEBGL_debug_renderer_info'); renderer = g.getParameter(ext.UNMASKED_RENDERER_WEBGL); } catch (e) {}
      return { canvases: cs, ctx: [...new Set(window.__ctx)].join(','), gpuReq: window.__gpu, rafPerSec: Math.round((window.__raf - raf0) / 3), desktopMsg: m ? m[0].trim() : '', textLen: txt.length, textStart: txt.slice(0, 140), renderer, scrollH: document.documentElement.scrollHeight };
    }, raf0);
  } catch (e) { status += ' eval:' + String(e).slice(0, 60); }
  await page.screenshot({ path: `perf/shot-${slug}${reduce ? '-reduce' : ''}.png` }).catch(() => {});
  results.push({ slug, url, status, ...info, errors: errors.slice(0, 2) });
  console.log(JSON.stringify(results[results.length - 1]));
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`perf/mobile-check${reduce ? '-reduce' : ''}.json`, JSON.stringify(results, null, 1));
