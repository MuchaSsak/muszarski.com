// Time-to-usable probe. usage: node aw-ttu.mjs <slug> <url> [maxMs]
// Polls every 250 ms from navigation start: first time a nav/project/contact link is visible AND hit-testable
// (elementFromPoint at its centre is the link or inside it, i.e. not covered by a preloader/overlay).
import { chromium } from 'playwright';
import fs from 'fs';
const [slug, url, maxArg] = process.argv.slice(2);
const MAX = parseInt(maxArg || '25000');
const args = ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'];
const b = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-gpu', '--enable-unsafe-webgpu', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
const res = { slug, url };
async function probe(kind) {
  const opts = kind === 'mobile'
    ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1' }
    : { viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36' };
  const ctx = await b.newContext(opts);
  const page = await ctx.newPage();
  if (kind === 'mobile') { const c = await ctx.newCDPSession(page); await c.send('Network.enable'); await c.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 }); await c.send('Emulation.setCPUThrottlingRate', { rate: 4 }); }
  const t0 = Date.now();
  page.goto(url, { waitUntil: 'commit', timeout: 60000 }).catch(() => {});
  const out = { firstText: null, firstLink: null, linkText: null, firstMeaningfulLink: null, mLinkText: null, frames: [] };
  const shots = [1500, 3000, 6000];
  let si = 0;
  while (Date.now() - t0 < MAX) {
    const el = Date.now() - t0;
    if (si < shots.length && el >= shots[si]) {
      await page.screenshot({ path: `aw-frames/${slug}-${kind}-${shots[si]}.jpg`, type: 'jpeg', quality: 40 }).catch(() => {});
      si++;
    }
    const r = await page.evaluate(() => {
      if (!document.body) return null;
      const txt = document.body.innerText.trim().length;
      const re = /work|project|case|portfolio|contact|mailto|about|index|archive|profile|menu|selected|lab|play/i;
      let any = null, meaningful = null;
      for (const a of document.querySelectorAll('a[href], button')) {
        const rc = a.getBoundingClientRect();
        if (rc.width < 4 || rc.height < 4 || rc.bottom <= 0 || rc.top >= innerHeight || rc.right <= 0 || rc.left >= innerWidth) continue;
        const cx = Math.min(innerWidth - 1, Math.max(0, rc.left + rc.width / 2)), cy = Math.min(innerHeight - 1, Math.max(0, rc.top + rc.height / 2));
        const hit = document.elementFromPoint(cx, cy);
        if (!hit || !(hit === a || a.contains(hit))) continue;
        // effective opacity check up the tree
        let e = a, op = 1; while (e && e.nodeType === 1) { const s = getComputedStyle(e); op *= parseFloat(s.opacity); if (s.visibility === 'hidden') op = 0; e = e.parentElement; }
        if (op < 0.5) continue;
        const label = ((a.innerText || a.getAttribute('aria-label') || '') + ' ' + (a.getAttribute('href') || '')).trim().replace(/\s+/g, ' ').slice(0, 50);
        if (!any) any = label;
        if (re.test(label)) { meaningful = label; break; }
      }
      return { txt, any, meaningful };
    }).catch(() => null);
    if (r) {
      if (out.firstText == null && r.txt > 80) out.firstText = el;
      if (out.firstLink == null && r.any) { out.firstLink = el; out.linkText = r.any; }
      if (out.firstMeaningfulLink == null && r.meaningful) { out.firstMeaningfulLink = el; out.mLinkText = r.meaningful; }
      if (out.firstMeaningfulLink != null && si >= shots.length) break;
    }
    await page.waitForTimeout(250);
  }
  await ctx.close();
  return out;
}
res.desktop = await probe('desktop');
res.mobile = await probe('mobile');
fs.writeFileSync('aw-metrics/ttu-' + slug + '.json', JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
await b.close();
