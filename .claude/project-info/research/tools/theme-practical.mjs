import { chromium } from 'playwright';
import fs from 'fs';
// usage: node theme-practical.mjs urls.json [concurrency]
// urls.json: [{id, url}]  -> appends JSON lines to theme-practical.log
// Rough practicality probe: desktop (unthrottled) + mobile (390x844, 4x CPU, ~9Mbps/85ms RTT).
const list = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const conc = Number(process.argv[3] || 2);
const b = await chromium.launch({ args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-gpu-rasterization', '--autoplay-policy=no-user-gesture-required'] });
const UA_D = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
const UA_M = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36';
const PROBE = () => {
  const vw = innerWidth, vh = innerHeight;
  const vis = el => { const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return false; if (r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw) return false; const s = getComputedStyle(el); return s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.05; };
  let text = 0;
  const walker = document.createTreeWalker(document.body || document.documentElement, NodeFilter.SHOW_TEXT);
  let n; while ((n = walker.nextNode())) { const t = n.textContent.trim(); if (!t) continue; const el = n.parentElement; if (el && vis(el)) text += t.length; }
  const clickables = [...document.querySelectorAll('a,button,[role=button],[role=link]')];
  const visLinks = clickables.filter(vis);
  const label = el => ((el.innerText || '') + ' ' + (el.getAttribute('aria-label') || '') + ' ' + (el.getAttribute('href') || '')).toLowerCase();
  const reW = /work|project|case|portfolio|folio|selected/; const reC = /contact|mailto:|e-?mail|hire|get in touch|let'?s talk|linkedin|say hi|hello@/;
  const inDomC = clickables.some(e => reC.test(label(e)));
  const inDomW = clickables.some(e => reW.test(label(e)));
  const visText = (document.body?.innerText || '').slice(0, 4000).toLowerCase();
  return { text, links: visLinks.length, workVis: visLinks.some(e => reW.test(label(e))), contactVis: visLinks.some(e => reC.test(label(e))), workDom: inDomW, contactDom: inDomC,
    gate: /\b(tap to start|click to start|press start|enter site|enter the|start experience|^start$|loading|sound on|with sound)\b/m.test(visText.slice(0, 400)) && text < 200,
    canvases: document.querySelectorAll('canvas').length, overflowX: document.documentElement.scrollWidth > vw + 2, menuBtn: visLinks.some(e => /menu|nav|☰/.test(label(e)) || /menu|burger|hamburger|nav-toggle/.test((e.className || '').toString().toLowerCase())) };
};
async function probe(e, mobile) {
  const ctx = await b.newContext(mobile
    ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: UA_M }
    : { viewport: { width: 1440, height: 900 }, userAgent: UA_D });
  const p = await ctx.newPage();
  let bytes = 0; const cdp = await ctx.newCDPSession(p);
  await cdp.send('Network.enable');
  cdp.on('Network.loadingFinished', ev => { bytes += ev.encodedDataLength || 0; });
  if (mobile) {
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 85, downloadThroughput: 9 * 1024 * 1024 / 8, uploadThroughput: 3 * 1024 * 1024 / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  }
  await p.addInitScript(() => { window.__lcp = 0; try { new PerformanceObserver(l => { for (const en of l.getEntries()) window.__lcp = en.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch {} });
  const r = { id: e.id, url: e.url, mobile };
  const t0 = Date.now();
  try {
    p.goto(e.url, { waitUntil: 'load', timeout: 45000 }).then(() => { r.loadMs = Date.now() - t0; }).catch(err => { r.loadErr = err.message.split('\n')[0].slice(0, 80); });
    // poll until usable: >=150 visible text chars AND >=3 visible links
    let first = null, last = null;
    for (let t = 0; t < 25000; t += 500) {
      await p.waitForTimeout(500);
      let s; try { s = await p.evaluate(PROBE); } catch { continue; }
      last = s; if (t === 2500) r.at3s = { text: s.text, links: s.links, gate: s.gate };
      if (!first && s.text >= 150 && s.links >= 3) { first = Date.now() - t0; r.usableMs = first; r.atUsable = s; break; }
    }
    if (!first) r.usableMs = null;
    await p.waitForTimeout(1000);
    const s2 = await p.evaluate(PROBE).catch(() => last);
    r.final = s2;
    const perf = await p.evaluate(() => ({ fcp: Math.round(performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0), lcp: Math.round(window.__lcp || 0), docH: document.documentElement.scrollHeight, title: document.title })).catch(() => ({}));
    Object.assign(r, perf);
  } catch (err) { r.error = err.message.split('\n')[0]; }
  r.mbAtEnd = +(bytes / 1048576).toFixed(2);
  r.elapsedMs = Date.now() - t0;
  await ctx.close();
  const line = JSON.stringify(r); console.log(line); fs.appendFileSync('theme-practical.log', line + '\n');
}
const jobs = []; for (const e of list) { jobs.push([e, false]); if (e.mobile !== false) jobs.push([e, true]); }
let i = 0; async function worker() { while (i < jobs.length) { const j = jobs[i++]; await probe(...j); } }
await Promise.all(Array.from({ length: conc }, worker));
await b.close();
