# Run notes: measured command costs and gotchas

> Read at the start of every coding task (the `code` skill). MEASURED facts only, with the date; update an entry instead of
> appending a duplicate; delete what stopped being true. Machine: Windows 11, Node 22.22.0, bun 1.3.14.

## Command timings

| Command (apps/web) | Time | Measured |
| --- | --- | --- |
| `bun install` (root, cold) | 26.6 s, 1318 packages | 2026-10-05 |
| `bun install --frozen-lockfile` (clean clone, warm cache) | 5.3 s | 2026-10-05 |
| `bun run build` (6 pages) | 6.9 s | 2026-10-05 slice 0 |
| `bun run test` (vitest, 25 tests) | 0.4 s | 2026-10-05 slice 0 |
| `bun run typecheck` (astro check, 22 files) | ~5 s | 2026-10-05 slice 0 |
| `bun run e2e` (51 tests, 4 workers) | 13.5 s | 2026-10-05 slice 0 |
| `node scripts/fonts.mjs` (cached sources) | ~3 s | 2026-10-05 |

## Gotchas already paid for

- One `astro preview` per project (Astro 7): a second one exits with "Another astro preview server is already running".
  Everything shares port 4322.
- Git Bash: `MSYS_NO_PATHCONV=1` before any command that takes URL paths (`/en/`), or it becomes `P:/Git/en/`.
- Binaries are per package (`apps/web/node_modules/.bin`); `npx <bin>` from elsewhere hits the npm registry.
- `core.autocrlf=true` on this machine; `.gitattributes` forces LF. Python on Windows writes CRLF unless `newline="\n"`.
