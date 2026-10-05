// Sequential Lighthouse runner. Usage: node perf/run-lh.mjs <listfile> <mode: mobile|desktop>
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
const [,, listFile, mode='mobile', suffix=''] = process.argv;
const CHROME = "C:\Users\Mucha\AppData\Local\ms-playwright\chromium-1243\chrome-win64\chrome.exe";
const sites = fs.readFileSync(listFile,'utf8').split(/\r?\n/).map(s=>s.trim()).filter(Boolean).filter(s=>!s.startsWith('#'));
for (const line of sites) {
  const [slug, url] = line.split(/\s+/);
  const out = `perf/${slug}-${mode}${suffix}.json`;
  if (fs.existsSync(out)) { console.log('skip', out); continue; }
  const args = ['node_modules/lighthouse/cli/index.js', url, '--quiet', '--chrome-flags=--headless=new', '--output=json', `--output-path=${out}`,
    '--only-categories=performance,accessibility,seo,best-practices', '--max-wait-for-load=60000'];
  if (mode === 'desktop') args.push('--preset=desktop');
  const t0 = Date.now();
  const r = spawnSync('node', args, { env: { ...process.env, CHROME_PATH: CHROME }, timeout: 420000, encoding: 'utf8' });
  console.log(new Date().toISOString(), slug, mode, 'exit', r.status, r.signal||'', ((Date.now()-t0)/1000).toFixed(0)+'s', (r.stderr||'').slice(-300).replace(/\n/g,' '));
}
console.log('DONE', mode);
