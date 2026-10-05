import { chromium } from 'playwright';
const b = await chromium.launch({ headless: true });
const p = await b.newPage();
await p.setContent('<html><body></body></html>');
const r = await p.evaluate(async () => {
  const ctxs = []; let lostAt = null;
  for (let i = 0; i < 60; i++) {
    const c = document.createElement('canvas'); c.width = c.height = 16; document.body.appendChild(c);
    const gl = c.getContext('webgl2'); if (!gl) return { failedCreateAt: i };
    gl.clearColor(1, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT);
    ctxs.push(gl);
    await new Promise(r => setTimeout(r, 30));
    if (lostAt === null && ctxs[0].isContextLost()) { lostAt = i + 1; }
  }
  return { firstLostWhenCreating: lostAt, lostCount: ctxs.filter(g => g.isContextLost()).length, total: ctxs.length };
});
console.log(JSON.stringify(r), await b.version());
await b.close();
