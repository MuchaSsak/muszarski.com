# Visual QA log

> One row per accepted view (route × width × theme), newest first. Score with `.claude/project-info/design/design-quality.md`;
> the proof shots sit next to this file in `<route>/<width>-<theme>.webp`. How: `.claude/project-info/tech/usage/visual-qa.md`.

> Rows below the Poster rebuild are the rejected Drafting Table look, archived (`comps/HISTORY.md`).

| Date | Slice | Route | Width | Theme | Score | Weakest point | Shot |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-10-06 | whole site (overnight build + polish) | `/en/` `/pl/` `/es/`, `/en/work/`, `/en/blog/`, both case studies, `/en/cv/` `/pl/cv/`, `/en/my-life/`, `/en/privacy/`, `/pl/terms/`, `/en/contact/sent/`, 404 | 1920 / 390 (+ 320-2560 layout sweep by e2e, 279/279) | Cobalt (Paper, Ink: axe on every route) | 8.0 (Ty 9 / Co 8 / Mo 8 / Cl 8 / De 7) | detail: two chapters (PstrykWeb, Clockful) and the credential cards still show drawn "Video soon" / "Photo soon" stand-ins, and My life has no photo yet (P15, P18); they read as unfinished until the owner's media lands | `en/` `pl/` `es/` `en_work/` `en_blog/` `en_blog_how-this-site-was-built/` `pl_blog_jak-powstala-ta-strona/` `en_cv/` `pl_cv/` `en_my-life/` `en_privacy/` `pl_terms/` `en_contact_sent/` `does-not-exist/` |
| 2026-10-05 | 0-2 (Poster) | `/en/` `/pl/` `/es/`: header, hero, tool band, footer | 1920 / 390 (+ 320-2560 by e2e) | Cobalt (+ Paper, Ink on `/en/`) | 7.9 (Ty 9 / Co 7 / Mo 8 / Cl 8 / De 8) | composition: at 1440-1920 the three info columns leave the lede floating in air under a huge name; the page ends at the band until the chapters land. Ink's hero/band merge fixed with a rule | `en/`, `pl/`, `es/` (`*-cobalt`, `en/*-paper`, `en/*-ink`) |
| 2026-10-05 | 1 | header + footer on `/en/` `/pl/` `/es/` | 1920 / 390 (+ 320 · 768 · 1024 · 1280 · 1440 by e2e) | light + dark | 8 | footer Elsewhere/Legal columns run short next to Work/Site (uneven fill); acceptable, the column list is owned by structure.md | `comps/history/drafting-table/{en,pl,es}/` |
| 2026-10-05 | 0 | `/specimen/` (tokens) | 1920 / 390 | light + dark | 8 | the 0.75 px chain line nearly vanishes on paper (decorative by design; never used for meaning) | `comps/history/drafting-table/specimen/` |
| 2026-10-05 | 0 | `/en/` · `/pl/` (foundation shell) | 1920 / 390 | light + dark | not scored as a page | the home is a stub until slice 2 (hero): sparse at 1920/2560 by design of the slice order | `comps/history/drafting-table/{en,pl}/` |
