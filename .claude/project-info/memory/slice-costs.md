# Slice costs: what each slice spent of the budgets

> One row per closed slice (`working-agreement.md` § 9 step 3), so later slices know what is left. Budgets
> (`requirements.md` § Non-functional): initial JS ≤ 150 KB gz, fonts ≤ 100 KB, page ≤ 1 MB, LCP ≤ 2.5 s (target 2.0), CLS ≤ 0.05,
> TBT ≤ 200 ms (target 100). Lighthouse = mobile, simulated throttling, median of 3, review build.

| Slice | Page | HTML gz | JS shipped | Fonts | Page total | LH mobile (P/A/BP/SEO) | LCP | CLS | TBT | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 foundation | `/en/` (`/pl/`, `/es/` equal) | 7.7 KB (CSS inline) | ~1 KB inline module (theme toggle) | 47.2 KB (4 files; 11.8 KB preloaded) | 46 KB transferred | 100 / 100 / 100 / 100 | 1.05 s | 0 | 0 ms | 2026-10-05 |
| 1 header + footer | `/en/` (`/pl/`, `/es/`) | 10.7 KB (+3.0) | 0.8 KB inline (unchanged; menus are native popovers) | 47.2 KB (all 4 faces now used above the fold) | 60 KB | 100 / 100 / 100 / 100 | 1.21 s (FCP 1.06 s) | 0.011 | 0 ms | 2026-10-05 |
| 0-2 Poster (tokens, header, hero, band, footer) | `/en/` (`/pl/`, `/es/` equal) | 22.9 KB (CSS + inline icons) | 3.0 KB gz in 5 modules (fit 1.7, motion 0.5, pause 0.4, band 0.3, layout 0.1) | 49.5 KB (1 variable file, preloaded) | 79 KB | 100 / 100 / 100 / 100 | 1.65 s (FCP 1.17 s) | 0 | 0-2 ms | 2026-10-05 |
| whole site | `/en/` (`/pl/`, `/es/` equal) | 38.1 KB (CSS inline; icons in a cached 21 KB sprite) | ~9.0 KB gz (10 modules + 1 KB inline) | 49.9 KB (1 variable file, preloaded) | 152 KB | 99 / 100 / 100 / 100 | 1.95 s (FCP 1.21 s) | 0 | 0-15 ms | 2026-10-06 |
| whole site | inner pages (`/en/work/`, `/en/blog/`, `/pl/blog/`, `/es/work/`, `/en/my-life/`, `/en/privacy/`, case study, `/pl/cv/`) | 14.3-22.6 KB | 2.9-3.1 KB | 49.9 KB | 91-99 KB | 100 / 100 / 100 / 100 | 1.65-1.73 s | 0 | 0 ms | 2026-10-06 |
| owner feedback pass | `/en/` (`/pl/`, `/es/` equal) | 34.7 KB | ~7.8 KB gz (6.7 KB in 9 modules + 1.1 KB inline) | 49.9 KB | 148 KB | 99 / 100 / 100 / 100 (desktop 100 × 4) | 1.95 s | 0 | 0-38 ms | 2026-10-06 |

Notes:
- Owner feedback pass: the AI packet animation, reel playback bars and theme cycle left, so page JS fell ~9 → ~8 KB;
  inner pages (`/en/cv/`, `/en/work/`, case study, `/en/my-life/`, `/pl/blog/`) stay 100 × 4, LCP 1.65-1.73 s.
- Whole site: the home LCP was 2.03 s until the icon sprite left the HTML (54.5 → 38.1 KB gz; `memory/run-notes.md`
  § Load-time findings). `/en/work/` had CLS 0.23 from filters revealed by script; now `.js-only` (CSS), CLS 0.
- Poster 0-2: the LCP rose 1.21 → 1.65 s because the H1 now waits for the one 49.5 KB preloaded face (Archivo's H1 cut
  was 11.8 KB); still under the 2.0 s target. The accordion starts after load + idle, so TBT stays 0.
- Slice 1 CLS 0.011 (`/en/` only): the stub hero's line count changes when the body face swaps in, so the footer (inside the
  first mobile viewport on the stub page) moves. Re-check in slice 2, when the footer leaves the first viewport.
- The React client chunk (68 KB gz) is emitted into `dist/_astro/` but no page references it until an island hydrates.
- Desktop: 100 × 4, LCP 0.28 s.
