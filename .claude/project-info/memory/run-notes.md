# Run notes: measured command costs and gotchas

> Read at the start of every coding task (the `code` skill). MEASURED facts only, with the date; update an entry instead of
> appending a duplicate; delete what stopped being true. Machine: Windows 11, Node 22.22.0, bun 1.3.14.

## Command timings

| Command (apps/web) | Time | Measured |
| --- | --- | --- |
| `bun install` (root, cold) | 26.6 s, 1318 packages | 2026-10-05 |
| `bun install --frozen-lockfile` (clean clone, warm cache) | 5.3 s | 2026-10-05 |
| `bun run build` (50 pages + launch gate with link check) | 8.0 s | 2026-10-06 |
| `bun run test` (vitest, 156 tests in 10 files) | 0.8 s | 2026-10-06 |
| `bun run typecheck` (astro check, ~105 files) | 16 s | 2026-10-06 |
| `bun run e2e` (279 tests, 4 workers) | 46 s | 2026-10-06 |
| `bun run cv:pdf` (3 PDFs, 196-210 KB, 2 pages each) | 3.5 s | 2026-10-06 |
| `bun run og` (33 share images + 4 icons) | 3.0 s | 2026-10-06 |
| `bun run lhci` (median of 3, per page) | ~25 s a page | 2026-10-06 |
| `node scripts/fonts.mjs` (cached sources) | ~2 s | 2026-10-06 |

## Load-time findings (2026-10-06, home `/en/`, 412 px, 4× CPU, 1.6 Mbps / 150 ms)

- Chrome holds the first paint until the preloaded Anybody font has loaded; the HTML and the font share the
  bandwidth, so every HTML byte before the paint delays the LCP. LH LCP 2.03 s → 1.95 s by moving the icon sprite
  out of the HTML (home 54.5 → 38.1 KB gz; the sprite is one 21 KB gz cached file).
- The first layout (~700 ms at 4× CPU) runs while the font is still loading: Chrome lays the page out with the
  fallback (Arial Bold rebuilt 37× from the 1 MB file, ~240 ms) and again with Anybody. Windows-specific cost in
  the lab; real Android phones use another font backend. Hiding sections changed nothing (the first layout only
  covers the parsed header + hero).
- Local preview is HTTP/1.1 + gzip; Vercel is HTTP/2-3 + brotli, so the lab LCP is pessimistic. Re-measure on the
  first Vercel preview deploy.
- Scratch tools that found this (session scratchpad, not committed): a Playwright trace of the main thread
  (`FontDataManager::onMakeFromStreamArgs` events, grouped by file size) and a gzip server serving variants of `/en/`.

## Gotchas already paid for

- One `astro preview` per project (Astro 7): a second one exits with "Another astro preview server is already running".
  Everything shares port 4322.
- Git Bash: `MSYS_NO_PATHCONV=1` before any command that takes URL paths (`/en/`), or it becomes `P:/Git/en/`.
- Binaries are per package (`apps/web/node_modules/.bin`); `npx <bin>` from elsewhere hits the npm registry.
- `core.autocrlf=true` on this machine; `.gitattributes` forces LF. Python on Windows writes CRLF unless `newline="\n"`.
