import fs from 'node:fs';
const files = fs.readdirSync('perf').filter(f => /-(mobile|desktop)(-r\d)?\.json$/.test(f));
const by = {};
for (const f of files) {
  const m = f.match(/^(.*)-(mobile|desktop)(-r\d)?\.json$/); const key = m[1] + '|' + m[2];
  let r; try { r = JSON.parse(fs.readFileSync('perf/' + f, 'utf8')); } catch { continue; }
  if (!r.categories?.performance) continue;
  const a = r.audits; const num = k => a[k]?.numericValue ?? null;
  const reqs = a['network-requests']?.details?.items || [];
  const sum = t => reqs.filter(x => x.resourceType === t).reduce((s, x) => s + (x.transferSize || 0), 0) / 1024;
  let lcpEl = ''; try { const n = a['lcp-breakdown-insight'].details.items.find(i => i.type === 'node'); lcpEl = (n.nodeLabel || n.snippet || '').slice(0, 50); } catch {}
  (by[key] ||= []).push({ f, perf: Math.round(r.categories.performance.score * 100), a11y: Math.round(r.categories.accessibility.score * 100), seo: Math.round(r.categories.seo.score * 100), bp: Math.round(r.categories['best-practices'].score * 100),
    fcp: num('first-contentful-paint'), lcp: num('largest-contentful-paint'), tbt: num('total-blocking-time'), cls: num('cumulative-layout-shift'), si: num('speed-index'),
    tot: num('total-byte-weight') / 1024, js: sum('Script'), font: sum('Font'), img: sum('Image'), media: sum('Media'), bench: r.environment.benchmarkIndex, lcpEl, warn: (r.runWarnings || []).length, err: r.runtimeError?.code || '' });
}
const med = arr => { const s = arr.filter(v => v != null).sort((a, b) => a - b); if (!s.length) return null; const k = Math.floor(s.length / 2); return s.length % 2 ? s[k] : (s[k - 1] + s[k]) / 2; };
const out = [];
for (const [key, runs] of Object.entries(by)) {
  const [site, ff] = key.split('|'); const o = { site, ff, n: runs.length };
  for (const k of ['perf', 'a11y', 'seo', 'bp', 'fcp', 'lcp', 'tbt', 'cls', 'si', 'tot', 'js', 'font', 'img', 'media', 'bench']) o[k] = med(runs.map(r => r[k]));
  o.perfRange = Math.min(...runs.map(r => r.perf)) + '–' + Math.max(...runs.map(r => r.perf));
  o.lcpRange = (Math.min(...runs.map(r => r.lcp)) / 1000).toFixed(1) + '–' + (Math.max(...runs.map(r => r.lcp)) / 1000).toFixed(1);
  o.tbtRange = Math.round(Math.min(...runs.map(r => r.tbt))) + '–' + Math.round(Math.max(...runs.map(r => r.tbt)));
  o.benchRange = Math.round(Math.min(...runs.map(r => r.bench))) + '–' + Math.round(Math.max(...runs.map(r => r.bench)));
  o.lcpEl = runs.map(r => r.lcpEl).find(Boolean) || ''; o.err = runs.map(r => r.err).filter(Boolean).join(',');
  out.push(o);
}
out.sort((a, b) => a.ff.localeCompare(b.ff) || a.site.localeCompare(b.site));
console.log('site\tff\tn\tperf(med)\tperfRange\tLCPs\tLCPrange\tTBT\tTBTrange\tCLS\tFCP\tSI\ttotKB\tjsKB\tfontKB\timgKB\tmediaKB\ta11y\tseo\tbp\tbench\tbenchRange');
for (const o of out) console.log([o.site, o.ff, o.n, o.perf, o.perfRange, (o.lcp / 1000).toFixed(1), o.lcpRange, Math.round(o.tbt), o.tbtRange, o.cls.toFixed(3), (o.fcp / 1000).toFixed(1), (o.si / 1000).toFixed(1), Math.round(o.tot), Math.round(o.js), Math.round(o.font), Math.round(o.img), Math.round(o.media), o.a11y, o.seo, o.bp, Math.round(o.bench), o.benchRange].join('\t'));
console.log('\nLCP elements:'); for (const o of out) console.log(o.site, o.ff, '|', o.lcpEl, o.err);
fs.writeFileSync('perf/median.json', JSON.stringify(out, null, 1));
