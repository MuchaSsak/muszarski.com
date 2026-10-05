// raw-HTML SEO probe of dev portfolios: JSON-LD types, h1 in HTML, footer links in raw HTML, rel=me, sitemap/robots/llms.txt
const urls = process.argv.slice(2);
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
async function head(u) { try { const r = await fetch(u, { headers: { 'user-agent': UA }, redirect: 'follow' }); const t = await r.text(); return { s: r.status, ok: r.ok && !/<html/i.test(t.slice(0, 500)) ? true : r.ok, len: t.length, t }; } catch (e) { return { s: 'ERR' }; } }
for (const u of urls) {
  const o = { url: u };
  try {
    const r = await fetch(u, { headers: { 'user-agent': UA, accept: 'text/html' }, redirect: 'follow' });
    const h = await r.text();
    o.status = r.status;
    o.h1 = /<h1[\s>]/i.test(h);
    const ld = [...h.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map(m => { try { const j = JSON.parse(m[1]); const t = x => Array.isArray(x) ? x.flatMap(t) : x ? [x['@type'], ...(x['@graph'] ? x['@graph'].flatMap(t) : []), ...(x.mainEntity ? t(x.mainEntity) : [])].flat().filter(Boolean) : []; return t(j); } catch { return ['parse-err']; } }).flat();
    o.ld = [...new Set(ld)];
    const ft = (h.match(/<footer[\s\S]*?<\/footer>/i) || [''])[0];
    o.footerLinks = (ft.match(/<a\s/gi) || []).length;
    o.footerMailto = /mailto:/i.test(ft);
    o.footerRss = /(rss|feed|atom)/i.test(ft);
    o.relMe = (h.match(/rel=["'][^"']*\bme\b/gi) || []).length;
    o.ogImage = /property=["']og:image/i.test(h);
    o.canonical = /rel=["']canonical/i.test(h);
    o.hreflang = (h.match(/hreflang=/gi) || []).length;
    const base = new URL(u).origin;
    for (const p of ['/sitemap.xml', '/robots.txt', '/llms.txt', '/rss.xml', '/feed.xml']) { const x = await head(base + p); o[p] = x.s; }
  } catch (e) { o.err = String(e).slice(0, 60); }
  console.log(JSON.stringify(o));
}
