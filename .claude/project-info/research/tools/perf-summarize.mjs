import fs from 'node:fs';
const files = fs.readdirSync('perf').filter(f => /-(mobile|desktop)\.json$/.test(f));
const rows = [];
for (const f of files) {
  let r; try { r = JSON.parse(fs.readFileSync('perf/' + f, 'utf8')); } catch (e) { rows.push({ f, err: 'parse' }); continue; }
  const a = r.audits || {}; const c = r.categories || {};
  const num = k => a[k] && typeof a[k].numericValue === 'number' ? a[k].numericValue : null;
  const reqs = (a['network-requests']?.details?.items) || [];
  const js = reqs.filter(x => x.resourceType === 'Script').reduce((s, x) => s + (x.transferSize || 0), 0);
  const jsRes = reqs.filter(x => x.resourceType === 'Script').reduce((s, x) => s + (x.resourceSize || 0), 0);
  const img = reqs.filter(x => x.resourceType === 'Image').reduce((s, x) => s + (x.transferSize || 0), 0);
  const media = reqs.filter(x => x.resourceType === 'Media').reduce((s, x) => s + (x.transferSize || 0), 0);
  const font = reqs.filter(x => x.resourceType === 'Font').reduce((s, x) => s + (x.transferSize || 0), 0);
  const other = reqs.filter(x => /\.(glb|gltf|ktx2|bin|hdr|exr|basis|drc|wasm)(\?|$)/i.test(x.url)).reduce((s, x) => s + (x.transferSize || 0), 0);
  let lcpEl = '';
  const le = a['largest-contentful-paint-element'] || a['lcp-breakdown-insight'];
  try { const items = le.details.items; const node = (items[0].items ? items[0].items[0].node : items[0].node) || {}; lcpEl = (node.nodeLabel || node.snippet || '').slice(0, 60); } catch (e) {}
  rows.push({
    f, url: r.finalDisplayedUrl, ff: r.configSettings?.formFactor,
    perf: c.performance?.score != null ? Math.round(c.performance.score * 100) : null,
    a11y: c.accessibility?.score != null ? Math.round(c.accessibility.score * 100) : null,
    seo: c.seo?.score != null ? Math.round(c.seo.score * 100) : null,
    bp: c['best-practices']?.score != null ? Math.round(c['best-practices'].score * 100) : null,
    fcp: num('first-contentful-paint'), lcp: num('largest-contentful-paint'), tbt: num('total-blocking-time'),
    cls: num('cumulative-layout-shift'), si: num('speed-index'), tti: num('interactive'),
    totalKB: num('total-byte-weight') != null ? Math.round(num('total-byte-weight') / 1024) : null,
    jsKB: Math.round(js / 1024), jsUnzKB: Math.round(jsRes / 1024), imgKB: Math.round(img / 1024), mediaKB: Math.round(media / 1024), fontKB: Math.round(font / 1024), assets3dKB: Math.round(other / 1024),
    reqs: reqs.length, bootup: num('bootup-time'), mainThread: num('mainthread-work-breakdown'),
    bench: r.environment?.benchmarkIndex, runtimeError: r.runtimeError?.code || '', warnings: (r.runWarnings || []).map(w => w.slice(0, 80)).join(' | '), lcpEl
  });
}
const fmt = v => v == null ? '-' : (typeof v === 'number' ? (Math.abs(v) < 1 && v !== 0 ? v.toFixed(3) : Math.round(v)) : v);
console.log(['file','perf','a11y','seo','bp','FCP','LCP','TBT','CLS','SI','TTI','totKB','jsKB','jsUnzKB','imgKB','mediaKB','fontKB','3dKB','reqs','bootup','bench','err'].join('\t'));
for (const x of rows.sort((p, q) => p.f.localeCompare(q.f))) {
  console.log([x.f, x.perf, x.a11y, x.seo, x.bp, x.fcp, x.lcp, x.tbt, x.cls, x.si, x.tti, x.totalKB, x.jsKB, x.jsUnzKB, x.imgKB, x.mediaKB, x.fontKB, x.assets3dKB, x.reqs, x.bootup, x.bench, x.runtimeError].map(fmt).join('\t'));
}
console.log('\n--- LCP elements / warnings ---');
for (const x of rows) console.log(x.f, '|', x.url, '|', x.lcpEl, '|', x.warnings);
fs.writeFileSync('perf/summary.json', JSON.stringify(rows, null, 1));
