// Measures: time-to-usable (first visible, unobstructed nav/project/contact link or >=150 chars readable text in viewport),
// gate (START/ENTER button), clicks to contact, 3s screenshot. Headless Chromium + SwiftShader => WebGL slower than real GPU.
import { chromium, devices } from 'playwright';
import fs from 'fs';
const sites = process.argv[2].split(',');
const outFile = process.argv[3];
const imgDir = 'C:/Users/Mucha/Desktop/new-portfolio/.claude/project-info/research/inspirations/img/';
const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader'] });
const results = [];
const probe = () => {
  const LINK = /\b(work|projects?|case stud(y|ies)|contact|about|email|e-mail|let'?s talk|get in touch|say hi|hire me|resume|cv|experience|writing|blog|portfolio)\b/i;
  const CONTACT = /contact|email|e-mail|let'?s talk|get in touch|say hi|hire me|mailto|linkedin/i;
  const GATE = /^(start|enter|explore|begin|click to (start|begin|enter)|launch|play)\b/i;
  const unobstructed = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2 || r.bottom <= 0 || r.top >= innerHeight || r.right <= 0 || r.left >= innerWidth) return false;
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || +cs.opacity === 0) return false;
    const x = Math.min(innerWidth - 1, Math.max(0, r.left + r.width / 2)), y = Math.min(innerHeight - 1, Math.max(0, r.top + r.height / 2));
    const top = document.elementFromPoint(x, y);
    return top && (top === el || el.contains(top) || top.contains(el));
  };
  const els = [...document.querySelectorAll('a,button,[role=button]')];
  const vis = els.filter(unobstructed);
  const txt = (e) => (e.innerText || e.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ');
  const navLinks = vis.filter(e => LINK.test(txt(e)) || (e.href || '').startsWith('mailto:') || /linkedin.com/.test(e.href || ''));
  const contactVisible = vis.some(e => CONTACT.test(txt(e)) || (e.href || '').startsWith('mailto:') || /linkedin.com/.test(e.href || ''));
  const contactInDom = els.some(e => CONTACT.test(txt(e)) || (e.href || '').startsWith('mailto:') || /linkedin.com/.test(e.href || ''));
  const gate = vis.find(e => GATE.test(txt(e)));
  // readable text in viewport (not inside canvas)
  let readable = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const n = walker.currentNode; const s = n.textContent.trim(); if (s.length < 3) continue;
    const el = n.parentElement; if (!el || !unobstructed(el)) continue;
    readable += s.length; if (readable > 2000) break;
  }
  const menu = vis.find(e => /^(menu|☰|open menu|navigation)$/i.test(txt(e)) || /menu|hamburger|nav-toggle/i.test(e.getAttribute('aria-label') || '') || /hamburger|menu-button|burger/i.test(e.className || ''));
  return { navLinks: navLinks.map(txt).slice(0, 8), contactVisible, contactInDom, gate: gate ? txt(gate) : null, readable, hasMenu: !!menu };
};
for (const url of sites) {
  for (const mode of ['desktop', 'mobile']) {
    const ctx = await browser.newContext(mode === 'mobile' ? { ...devices['iPhone 13'] } : { viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const r = { url, mode };
    const t0 = Date.now();
    try {
      await page.goto(url, { waitUntil: 'commit', timeout: 40000 });
      let shot3 = false;
      while (Date.now() - t0 < 20000) {
        const el = Date.now() - t0;
        if (!shot3 && el >= 3000) { shot3 = true; const slug = url.replace(/https?:\/\/(www\.)?/, '').replace(/[^a-z0-9]+/gi, '-').replace(/-$/, ''); r.shot = `spec-3s-${slug}-${mode}.jpg`; await page.screenshot({ path: imgDir + r.shot, type: 'jpeg', quality: 60 }).catch(() => {}); }
        let p; try { p = await page.evaluate(probe); } catch { await page.waitForTimeout(250); continue; }
        if (r.firstGateMs == null && p.gate) { r.firstGateMs = el; r.gate = p.gate; }
        if (r.usableMs == null && (p.navLinks.length > 0 || p.readable >= 150)) { r.usableMs = el; r.atUsable = p; }
        if (r.usableMs != null && shot3) break;
        await page.waitForTimeout(250);
      }
      const p = await page.evaluate(probe).catch(() => null);
      r.final = p;
      // clicks to contact
      if (p) {
        if (p.contactVisible) r.clicksToContact = '1 (visible)';
        else if (p.hasMenu) {
          try {
            await page.evaluate(() => { const els = [...document.querySelectorAll('a,button,[role=button]')]; const m = els.find(e => /^(menu|☰|open menu|navigation)$/i.test((e.innerText || e.getAttribute('aria-label') || '').trim()) || /menu|hamburger|nav-toggle/i.test(e.getAttribute('aria-label') || '') || /hamburger|menu-button|burger/i.test(e.className || '')); m && m.click(); });
            await page.waitForTimeout(1200);
            const p2 = await page.evaluate(probe);
            r.clicksToContact = p2.contactVisible ? '2 (menu)' : (p.contactInDom ? 'scroll' : 'not in DOM');
          } catch { r.clicksToContact = '?'; }
        } else r.clicksToContact = p.contactInDom ? 'scroll' : (p.gate ? 'behind gate/3D' : 'not in DOM');
      }
    } catch (e) { r.error = String(e).slice(0, 150); }
    results.push(r);
    console.log(JSON.stringify({ u: r.url, m: r.mode, usableMs: r.usableMs, gateMs: r.firstGateMs, gate: r.gate, ctc: r.clicksToContact, nav: r.atUsable?.navLinks, readable: r.final?.readable, err: r.error }));
    await ctx.close();
  }
}
await browser.close();
fs.writeFileSync(outFile, JSON.stringify(results, null, 1));
