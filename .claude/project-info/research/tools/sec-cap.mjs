// usage: node sec-cap.mjs list.json
// list.json: [{slug, url, shots:[{vp:'d'|'m', target:'top'|'footer'|'css:<sel>'|'text:<txt>'|'y:<vh multiple>', name}] , wait}]
// Captures JPEG q70 screenshots to inspirations/img/sec-<slug>-<vp>[-name].jpg and appends probe JSON to sec-probe.jsonl
import { chromium } from 'playwright';
import fs from 'fs';
const IMG = 'C:/Users/Mucha/Desktop/new-portfolio/.claude/project-info/research/inspirations/img/';
import { fileURLToPath } from 'url';
const OUT = fileURLToPath(new URL('./data/sec-probe.jsonl', import.meta.url));
const list = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const b = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-gpu', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
const UA_D = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
const UA_M = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1';

const PROBE = () => {
  const vh = innerHeight;
  const h1s = [...document.querySelectorAll('h1')].slice(0, 2).map(h => (h.innerText || h.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120));
  const vids = [...document.querySelectorAll('video')];
  const video = { count: vids.length, preload: {}, poster: vids.filter(v => v.getAttribute('poster')).length, autoplay: vids.filter(v => v.autoplay).length, playsinline: vids.filter(v => v.hasAttribute('playsinline')).length, controls: vids.filter(v => v.controls).length, portrait: 0, landscape: 0 };
  vids.forEach(v => { const p = v.getAttribute('preload') || '(none)'; video.preload[p] = (video.preload[p] || 0) + 1; const r = v.getBoundingClientRect(); if (r.height > r.width * 1.15) video.portrait++; else if (r.width > 0) video.landscape++; });
  let sticky = 0, fixed = 0; const all = document.querySelectorAll('body *'); const N = Math.min(all.length, 8000);
  for (let i = 0; i < N; i++) { const p = getComputedStyle(all[i]).position; if (p === 'sticky') sticky++; else if (p === 'fixed') fixed++; }
  // top-level sections: section/footer/header/article not nested inside another section
  // descend from body through wrappers that hold >=85% of the parent's height in a single child, then list that container's children
  const H = el => el.getBoundingClientRect().height;
  let cur = document.body;
  for (let d = 0; d < 12; d++) {
    const kids = [...cur.children].filter(k => H(k) > 40 && getComputedStyle(k).position !== 'fixed');
    const big = kids.filter(k => H(k) > H(cur) * 0.85);
    if (kids.length === 1 || (big.length === 1 && kids.length <= 3)) cur = big[0] || kids[0]; else break;
  }
  const heights = [...cur.children].filter(k => H(k) > 40 && getComputedStyle(k).position !== 'fixed').slice(0, 40).map(k => +(H(k) / vh).toFixed(2));
  const ft = [...document.querySelectorAll('footer')].pop();
  const footer = ft ? { links: ft.querySelectorAll('a').length, mailto: !!ft.querySelector('a[href^="mailto:"]'), rss: !!ft.querySelector('a[href*="rss"],a[href*="feed"],a[href*="atom"]'), sitemap: !!ft.querySelector('a[href*="sitemap"]'), heightVh: +(ft.getBoundingClientRect().height / vh).toFixed(2), text: (ft.innerText || '').replace(/\s+/g, ' ').slice(0, 400) } : null;
  const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { const j = JSON.parse(s.textContent); const t = x => Array.isArray(x) ? x.map(t).flat() : (x && (x['@type'] || (x['@graph'] && x['@graph'].map(g => g['@type'])))); return t(j); } catch { return 'parse-err'; } }).flat();
  const canv = document.querySelectorAll('canvas').length;
  const iframes = [...document.querySelectorAll('iframe')].map(f => (f.src || '').slice(0, 80));
  const forms = [...document.querySelectorAll('form')].map(f => f.querySelectorAll('input:not([type=hidden]),textarea,select').length);
  return { h1s, video, sticky, fixed, docVh: +(document.documentElement.scrollHeight / vh).toFixed(1), sectionsVh: heights, footer, ld, canvases: canv, iframes, forms, overflowX: document.documentElement.scrollWidth > innerWidth + 2, title: document.title.slice(0, 100) };
};

async function dismiss(p) {
  for (let i = 0; i < 2; i++) {
    try {
      await p.evaluate(() => {
        const re = /^\s*(reject all|reject|decline|decline all|deny|accept all cookies|accept all|accept|allow all|agree|i agree|got it|ok|okay|only necessary|necessary only|accept cookies|allow cookies)\s*$/i;
        const els = [...document.querySelectorAll('button, a, [role=button], input[type=button]')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && re.test((e.innerText || e.value || '').trim()); });
        if (els[0]) els[0].click();
      });
      await p.waitForTimeout(500);
    } catch {}
  }
}
async function sweep(p) {
  try { await p.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < Math.min(H, 60000); y += innerHeight * 0.8) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); }); } catch {}
  await p.waitForTimeout(600);
}
async function goTarget(p, target) {
  if (!target || target === 'top') { await p.evaluate(() => scrollTo(0, 0)); return; }
  if (target === 'footer') { await p.evaluate(() => { const f = [...document.querySelectorAll('footer')].pop(); if (f) { const r = f.getBoundingClientRect(); const y = scrollY + r.top - Math.max(0, innerHeight - r.height); scrollTo(0, Math.max(0, r.height > innerHeight ? scrollY + r.top : y)); } else scrollTo(0, document.documentElement.scrollHeight); }); return; }
  if (target.startsWith('y:')) { const k = parseFloat(target.slice(2)); await p.evaluate(k => scrollTo(0, innerHeight * k), k); return; }
  if (target.startsWith('css:')) { await p.evaluate(sel => { const e = document.querySelector(sel); if (e) e.scrollIntoView({ block: 'start' }); }, target.slice(4)); return; }
  if (target.startsWith('text:')) { const t = target.slice(5); try { const loc = p.getByText(t, { exact: false }).first(); await loc.scrollIntoViewIfNeeded({ timeout: 3000 }); await p.evaluate(() => scrollBy(0, -innerHeight * 0.15)); } catch { } return; }
}

for (const e of list) {
  const rec = { slug: e.slug, url: e.url, date: new Date().toISOString() };
  // raw HTML check (SSR h1 / ld+json)
  try { const r = await fetch(e.url, { headers: { 'user-agent': UA_D, accept: 'text/html' }, redirect: 'follow' }); const html = await r.text(); rec.raw = { status: r.status, bytes: html.length, h1InHtml: /<h1[\s>]/i.test(html), ldInHtml: (html.match(/application\/ld\+json/g) || []).length, videoTags: (html.match(/<video/gi) || []).length }; } catch (err) { rec.raw = { err: String(err).slice(0, 80) }; }
  for (const vp of ['d', 'm']) {
    const shots = (e.shots || []).filter(s => s.vp === vp);
    if (!shots.length && !e.probeBoth) continue;
    const ctx = await b.newContext(vp === 'd' ? { viewport: { width: 1440, height: 900 }, userAgent: UA_D, locale: 'en-US' } : { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: UA_M, locale: 'en-US' });
    const p = await ctx.newPage();
    let bytes = 0; const cdp = await ctx.newCDPSession(p); await cdp.send('Network.enable'); cdp.on('Network.loadingFinished', ev => { bytes += ev.encodedDataLength || 0; });
    const t0 = Date.now();
    try {
      await p.goto(e.url, { waitUntil: 'domcontentloaded', timeout: 40000 });
      try { await p.waitForLoadState('networkidle', { timeout: 8000 }); } catch {}
      await p.waitForTimeout(e.wait || 2500);
      await dismiss(p);
      const bytesFirst = bytes;
      await sweep(p);
      rec[vp] = await p.evaluate(PROBE).catch(err => ({ err: String(err).slice(0, 80) }));
      rec[vp].mbFirst = +(bytesFirst / 1048576).toFixed(2);
      for (const s of shots) {
        await goTarget(p, s.target); await p.waitForTimeout(s.wait || 1200);
        const f = IMG + 'sec-' + e.slug + '-' + (vp === 'd' ? 'desktop' : 'mobile') + (s.name ? '-' + s.name : '') + '.jpg';
        await p.screenshot({ path: f, type: 'jpeg', quality: 70 });
        (rec.files ||= []).push(f.split('/').pop());
      }
      rec[vp].mbAfterSweep = +(bytes / 1048576).toFixed(2);
      rec[vp].ms = Date.now() - t0;
    } catch (err) { rec[vp] = { err: String(err).split('\n')[0].slice(0, 120) }; }
    await ctx.close();
  }
  fs.appendFileSync(OUT, JSON.stringify(rec) + '\n');
  console.log(JSON.stringify(rec).slice(0, 600));
}
await b.close();
