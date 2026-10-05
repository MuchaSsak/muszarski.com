import { chromium } from 'playwright';
import fs from 'node:fs';
const sites = ['stack-aw-sites.json','stack-aw-sites2.json'].flatMap(f => JSON.parse(fs.readFileSync(f,'utf8')));
const uniq = new Map(); for (const s of sites) uniq.set(s.href, s);
const all = [...uniq.values()].map(s => ({...s, year: ((s.award||[]).join(' ').match(/(\d{4})/)||[])[1]})).filter(s => ['2024','2025','2026'].includes(s.year) && s.url);
const b = await chromium.launch();
const out = [];
async function one(s) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36' });
  const p = await ctx.newPage();
  const scripts = new Set(); let bytesJS = 0;
  p.on('response', async r => { try { const u = r.url(); const ct = r.headers()['content-type']||''; if (/javascript/.test(ct) || /\.m?js(\?|$)/.test(u)) { scripts.add(u); const l = +r.headers()['content-length']||0; bytesJS += l; } } catch {} });
  try {
    await p.goto(s.url, { waitUntil: 'load', timeout: 40000 });
    await p.waitForTimeout(4000);
    const det = await p.evaluate(() => {
      const w = window, d = document, html = d.documentElement.outerHTML.slice(0, 400000);
      const has = (re) => re.test(html);
      return {
        next: !!(w.__NEXT_DATA__ || w.next || has(/\/_next\/static\//)),
        nuxt: !!(w.__NUXT__ || w.useNuxtApp || has(/\/_nuxt\//)),
        astro: has(/astro-island|data-astro-|\/_astro\//),
        svelte: has(/svelte-[a-z0-9]{4,}|__sveltekit|\/_app\/immutable\//),
        gatsby: has(/___gatsby/),
        webflow: has(/data-wf-page|webflow\.js|website-files\.com|wf-page/),
        framer: has(/framerusercontent|data-framer-/),
        wordpress: has(/wp-content|wp-includes/),
        react: !!(w.React || d.querySelector('[data-reactroot]') || [...d.querySelectorAll('*')].slice(0,300).some(e => Object.keys(e).some(k => k.startsWith('__react')))),
        vue: !!(w.__VUE__ || d.querySelector('[data-v-app]') || has(/data-v-[a-f0-9]{8}/)),
        three: !!(w.__THREE__),
        gsap: !!(w.gsap || w.GreenSockGlobals || w._gsap),
        lenis: !!(d.documentElement.classList.contains('lenis') || d.querySelector('.lenis') || w.lenis || w.Lenis),
        locomotive: has(/data-scroll-container|has-scroll-smooth/),
        canvas: d.querySelectorAll('canvas').length,
        webgl: [...d.querySelectorAll('canvas')].some(c => { try { return !!(c.getContext && (c.__webgl || false)); } catch { return false; } }),
        spline: has(/spline/),
        tailwind: has(/--tw-|tailwind/),
        generator: (d.querySelector('meta[name=generator]')||{}).content || ''
      };
    });
    const sj = [...scripts].join(' ');
    det.three = det.three || /three(\.module)?(\.min)?\.js|three-|\/three\//i.test(sj);
    det.ogl = /ogl/i.test(sj);
    det.pixi = /pixi/i.test(sj);
    det.barba = /barba/i.test(sj);
    det.vercel = /_vercel\/insights|vercel-scripts|vercel/.test(sj);
    det.nscripts = scripts.size;
    out.push({ href: s.href, url: s.url, year: s.year, tags: s.tags.map(t=>t.t), det });
    console.error(out.length, s.url, Object.entries(det).filter(([k,v])=>v===true).map(([k])=>k).join(','), 'canvas', det.canvas, det.generator);
  } catch (e) { console.error('ERR', s.url, e.message.slice(0,80)); out.push({ href: s.href, url: s.url, year: s.year, err: true }); }
  await ctx.close();
}
const q = [...all]; const workers = Array.from({length: 4}, async () => { while (q.length) await one(q.shift()); });
await Promise.all(workers);
fs.writeFileSync('stack-detect.json', JSON.stringify(out, null, 1));
await b.close();
