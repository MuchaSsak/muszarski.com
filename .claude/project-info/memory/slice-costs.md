# Slice costs: what each slice spent of the budgets

> One row per closed slice (`working-agreement.md` § 9 step 3), so later slices know what is left. Budgets
> (`requirements.md` § Non-functional): initial JS ≤ 150 KB gz, fonts ≤ 100 KB, page ≤ 1 MB, LCP ≤ 2.5 s (target 2.0), CLS ≤ 0.05,
> TBT ≤ 200 ms (target 100). Lighthouse = mobile, simulated throttling, median of 3, review build.

| Slice | Page | HTML gz | JS shipped | Fonts | Page total | LH mobile (P/A/BP/SEO) | LCP | CLS | TBT | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 foundation | `/en/` (`/pl/`, `/es/` equal) | 7.7 KB (CSS inline) | ~1 KB inline module (theme toggle) | 47.2 KB (4 files; 11.8 KB preloaded) | 46 KB transferred | 100 / 100 / 100 / 100 | 1.05 s | 0 | 0 ms | 2026-10-05 |
| 1 header + footer | `/en/` (`/pl/`, `/es/`) | 10.7 KB (+3.0) | 0.8 KB inline (unchanged; menus are native popovers) | 47.2 KB (all 4 faces now used above the fold) | 60 KB | 100 / 100 / 100 / 100 | 1.21 s (FCP 1.06 s) | 0.011 | 0 ms | 2026-10-05 |
| 0-2 Poster (tokens, header, hero, band, footer) | `/en/` (`/pl/`, `/es/` equal) | 22.9 KB (CSS + inline icons) | 3.0 KB gz in 5 modules (fit 1.7, motion 0.5, pause 0.4, band 0.3, layout 0.1) | 49.5 KB (1 variable file, preloaded) | 79 KB | 100 / 100 / 100 / 100 | 1.65 s (FCP 1.17 s) | 0 | 0-2 ms | 2026-10-05 |

Notes:
- Poster 0-2: the LCP rose 1.21 → 1.65 s because the H1 now waits for the one 49.5 KB preloaded face (Archivo's H1 cut
  was 11.8 KB); still under the 2.0 s target. The accordion starts after load + idle, so TBT stays 0.
- Slice 1 CLS 0.011 (`/en/` only): the stub hero's line count changes when the body face swaps in, so the footer (inside the
  first mobile viewport on the stub page) moves. Re-check in slice 2, when the footer leaves the first viewport.
- The React client chunk (68 KB gz) is emitted into `dist/_astro/` but no page references it until an island hydrates.
- Desktop: 100 × 4, LCP 0.28 s.
