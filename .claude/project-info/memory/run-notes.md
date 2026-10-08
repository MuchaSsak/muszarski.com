# Run notes: measured command costs and gotchas

> Read at the start of every coding task (the `code` skill). MEASURED facts only, with the date; update an entry instead of
> appending a duplicate; delete what stopped being true. Machine: Windows 11, Node 22.22.0, bun 1.3.14.

## Command timings

| Command (apps/web) | Time | Measured |
| --- | --- | --- |
| `bun install` (root, cold) | 26.6 s, 1318 packages | 2026-10-05 |
| `bun install --frozen-lockfile` (clean clone, warm cache) | 5.3 s | 2026-10-05 |
| `bun run build` (64 pages + launch gate with link check) | 10.4 s | 2026-10-07 |
| `bun run test` (vitest, 152 tests in 10 files) | 1.2 s | 2026-10-06 |
| `bun run typecheck` (astro check, ~105 files) | 16 s | 2026-10-06 |
| `bun run e2e` (236 tests, 4 workers; the two tour tests wait ~8 s each) | 52 s | 2026-10-07 |
| `bun run e2e:xb` (Firefox + WebKit, 164 tests) | 1.9 min | 2026-10-07 |
| `bun run cv:pdf` (3 PDFs, 196-210 KB, 2 pages each) | 3.5 s | 2026-10-06 |
| `bun run og` (47 share images + 4 icons) | 3.7 s | 2026-10-07 |
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

## Focus and the sticky header across engines (2026-10-06, `/en/` at 1440×700, Tab × 40)

- `content-visibility: auto` (900 px placeholders) made WebKit drift focus 300-700 px after the jump: the skipped
  Writing (1044 → 354 px) and Contact (1058 → 739 px) swapped to real heights with no scroll compensation, though
  WebKit reports `overflow-anchor` support. Removed: Lighthouse mobile stayed 99, LCP 1953 ms, TBT 0.
- WebKit scrolls focus to where a stuck chapter is drawn (the Linkoglot tap target sat at 5 px under the next
  poster); Firefox leaves an element that is only partly under the header in place when focus moves up (a
  credentials row at 23 px). Both corrected in script (`tech/usage/astro.md`); the e2e focus test now runs in all
  three engines and passes.
- The motion runtime pauses every animation in offscreen sections (`.off`), so a one-shot fade on load froze the
  credentials panel at opacity 0.42 until scrolled into view; Lighthouse's axe read 1.6:1 (es desktop a11y 97, a
  race). Fixed by fading only on a real card change.

## Cross-browser smoke (2026-10-06, 9 pages × 390/1440, built site)

- Firefox (Playwright 1543) and WebKit 26.6 (Playwright 2359): 0 page errors, 0 horizontal overflow, fitted H1 lines
  fill 99 % like Chromium, sprite icons present. Variable-font advances are identical in all three engines.
- WebKit on Windows paints the glyphs at the font's default instance (thin, regular width) while laying them out with
  the real axes, so its screenshots look broken. A limitation of that port, not the site; real Safari (CoreText) still
  needs a look on a Mac or iPhone.

## Third parties under the CSP (2026-10-06, local build)

- Turnstile with Cloudflare's public test key `1x00000000000000000000AA`: the widget renders on first input, a dummy
  token arrives, no CSP violation. The first load can take > 6 s on a cold connection.
- Umami Cloud script with a dummy id: loads (200), `window.umami` exists, no CSP violation, nothing sent on localhost
  (`data-domains`).
- Lighthouse desktop: `/en/` and the case study 100 × 4, LCP 0.46 s / 0.40 s.

## Gotchas already paid for

- One `astro preview` per project (Astro 7): a second one exits with "Another astro preview server is already running".
  Everything shares port 4322.
- Git Bash: `MSYS_NO_PATHCONV=1` before any command that takes URL paths (`/en/`), or it becomes `P:/Git/en/`.
- Binaries are per package (`apps/web/node_modules/.bin`); `npx <bin>` from elsewhere hits the npm registry.
- `core.autocrlf=true` on this machine; `.gitattributes` forces LF. Python on Windows writes CRLF unless `newline="\n"`.

## Lighthouse 2026-10-07 (mobile, simulated throttling)

- Local preview, median of 3: home en/pl 98, es 99 (LCP 2.10-2.18 s: over the 2.0 s target, under the 2.5 s bar);
  blog index, CV, work and a new post 100; the case study and My life 99. a11y / best practices / SEO 100 everywhere.
- Live (www.matmuszarski.space, Vercel HTTP/2 + brotli, deploy of 461b66e), median of 5: home 99, LCP 1.78 s, TBT 19 ms.
  One earlier live median read 90 / TBT 185 ms right after a local batch: a ~250 ms style + layout task on the document
  lands just before or just after first paint, so TBT is bimodal. Real fix if it matters: a smaller home DOM (303 inline
  SVGs, How I work scenes 41 KB raw, AI section 30 KB raw).
- Home HTML 53 KB gzip (28 KB of it the inlined CSS in the head); it was 34.7 KB before the 2026-10-06 feedback rounds.
  The writing rail is capped at 8 posts (16 had pushed it to 56 KB).
- My life after the hobby prints (local preview, median of 3-5): en 92 / es 92 / pl 96, TBT 0-8 ms, LCP 2.8-3.3 s
  (photos; see `slice-costs.md`). One en median read 89 / TBT 190 ms while another session's headless Chrome ran;
  the rerun was clean. `bun run e2e` on the touched specs: 206/206 in ~2.1 min; i18n 30/30.

## Home speed regression and fix (2026-10-07 afternoon)

- Regression: home 67-74, TBT 0.7-1.1 s after the day's home rounds. Found by tracing (4x CPU, phone) and A/B CSS
  overrides injected with `page.route` on a private build (`astro build --outDir <scratch>` on its own port),
  interleaved runs, medians. Each cause and its fix:
  - the PstrykWeb chapter's loops ran while the page loaded (~2 s of main thread): loops wait for the first move;
  - the AI scene's size container inside two grids (~1 s per full layout): block flow;
  - `.off` added to every offscreen section on load restyled 1,658 elements (`.off *`): sections start paused, `.near`
    marks the visible ones;
  - Chapters set an inherited custom property (`--stick`), restyling everything inside: it sets `top`;
  - `rv-ready` faded every `.rv` block out through its transition (also the `.sbar` rules and the writing cards'
    undraw): only the reveal transitions;
  - How I work and the AI story ran `show(0)` on load (forced layouts): the first state is in the markup.
- After (quiet machine, local build, median of 3): home en 96 / pl 95 / es 95, TBT 33-93 ms, LCP 2.3-2.6 s, CLS 0; CV
  99-100, blog 98-100, work 96-97, the case study 99 (en, pl). e2e 236/236 on that build.
- LCP is the font preload: Chrome holds first paint until the preloaded font arrives, then the next frame waits for the
  parse of what is below the fold. Without the preload LCP was 1.96 s but TBT 775 ms (score 80): keep it. What would
  help: less below-the-fold DOM and CSS (home HTML 60 KB gz; 149 KB inline CSS: global 34, How I work 26, AI 25,
  credentials 19). Hidden scenes as `<template>` gained nothing (display:none costs no layout).
- The case study quotes this run (home 95+, the other pages 96-100); its report image is a real home report.

## All projects, night catalogue (2026-10-08, `/<locale>/work/`, Lighthouse mobile, median of 3)

- Interleaved A/B against the TV version (scratch builds served with gzip on their own ports): perf en/pl/es 97/97/97
  (one noisy 92 on a rerun) vs the TV's 97/95; LCP 2.28-2.48 s vs 2.26-2.28 s (the 2.0 s budget is missed by both
  locally); HTML 111 KB raw / 21.8 KB gz (TV 120 KB), page weight 254 KB (TV 290 KB); JS +1.8 KB gz (head 2.7 + page
  2.9 KB gz, both shaders start after interaction).
- The first build had TBT ~300 ms (TV ~100-160). Trace sums at 4× CPU found it in style, not script:
  - `style="--i:N"` on ~160 letter spans (the project names split for a hover wave) cost ~121 ms of style: an inline
    style per element keeps Chrome from sharing computed styles between siblings. The names went back to plain text;
    the split (`ui/HoverType.astro`) stays on the page's two titles only;
  - `container-type` on every item (cqw units) + a grid around them, `cqh` pan transforms, per-row staggered entrance
    animations and `text-wrap: balance` on names each added a little: now `--u` vw units, an `object-position` pan,
    one `rise` on the whole index, `text-wrap: wrap`.
  - After: style 450 / layout 908 ms vs the TV's 344 / 885.
- Headless Chromium draws WebGL with SwiftShader (software): the shaders starve the page and hover states look broken
  in shots. QA shaders with `--use-angle=d3d11 --enable-gpu --ignore-gpu-blocklist` (the real GPU).
- Checks on that build: `bun run check` 193 tests; e2e 233 + 2 artifacts of a plain static server (its own 404 page) + 1
  flaky that passed on rerun; Firefox + WebKit 163/164 (the same 404 artifact); no overflow at 320-2560 px.
