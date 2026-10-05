# Visual QA log

> One row per accepted view (route × width × theme), newest first. Score with `.claude/project-info/design/design-quality.md`;
> the proof shots sit next to this file in `<route>/<width>-<theme>.webp`. How: `.claude/project-info/tech/usage/visual-qa.md`.

| Date | Slice | Route | Width | Theme | Score | Weakest point | Shot |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-10-05 | 1 | header + footer on `/en/` `/pl/` `/es/` | 1920 / 390 (+ 320 · 768 · 1024 · 1280 · 1440 by e2e) | light + dark | 8 | footer Elsewhere/Legal columns run short next to Work/Site (uneven fill); acceptable, the column list is owned by structure.md | `en/`, `pl/`, `es/` |
| 2026-10-05 | 0 | `/specimen/` (tokens) | 1920 / 390 | light + dark | 8 | the 0.75 px chain line nearly vanishes on paper (decorative by design; never used for meaning) | `specimen/` |
| 2026-10-05 | 0 | `/en/` · `/pl/` (foundation shell) | 1920 / 390 | light + dark | not scored as a page | the home is a stub until slice 2 (hero): sparse at 1920/2560 by design of the slice order | `en/`, `pl/` |
