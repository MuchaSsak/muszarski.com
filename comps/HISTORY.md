# How the look got here: every version, kept

> The owner asked (2026-10-05) to keep every version of the work, old ones included, for the "how this site was built"
> case study (`site/seo.md` content plan, case study #0). Nothing below is deleted when the next version lands: comps stay
> in this folder, code versions stay in git under `history/*` tags, screenshots stay in `comps/shots/` and `comps/history/`.
> The review artifact (claude.ai, link-shared) is frozen at v4 and kept as-is; it is not updated any more.

| # | Date | Version | What the owner said | Where it lives |
| --- | --- | --- | --- | --- |
| 0 | 2026-10-05 | Phase 0: the wiki, research and hooks, no product code | "we plan together first" | tag `history/wiki-phase0` · `.claude/project-info/` |
| 1 | 2026-10-05 | **Drafting Table**: slices 0-1 in Astro (paper/cyanotype tokens, Archivo + Plex Mono, title-block header, revision-block footer) | rejected: "this looks so ugly", "not enough creative effort" | tag `history/drafting-table` · shots `comps/history/drafting-table/` (1920 + 390, light + dark, en/pl/es, specimen) |
| 2 | 2026-10-05 | **Round 1**: four live directions (Orbit, Poster, Toybox, Exhibit) on one review page | picked Poster: "it really has professional vibe" | tag `history/comps-r1-four-directions` · `orbit.html`, `poster.html`, `toybox.html`, `exhibit.html`, `shots/` |
| 3 | 2026-10-05 | **Round 2**: Poster built out to the whole home page; themes Cobalt / Paper / Ink, fonts Anybody / Roboto Flex | "definitely progress"; notes for round 3 | tag `history/poster-r2` · `poster-full.html` |
| 4 | 2026-10-05 | **Round 3**: less text, tool marks with names, a reel per project, PstrykWeb #1, product loop, AI pipeline, expanding credentials, message-first contact | "this is definitely progress … lets finally start coding"; cut the Stack section | tag `history/poster-r3` · `poster-r3.html`, `shots/r3-*` · artifact v4 |
| 5 | 2026-10-05 | **Production build**: Poster in Astro, slice by slice (header + hero first) | — | `apps/web/`, accepted shots in `screenshots/` |

## Rebuilding an old version

- A comp: open the file in a browser (`python -m http.server` in `comps/`, then `/poster-r3.html`). Fonts in comps load from
  Google Fonts (OFL).
- An old app version: `git worktree add ../portfolio-drafting-table history/drafting-table`, then `bun install` and
  `bun run dev` there.
- The review page as the owner saw it: `git show history/poster-r3:comps/index.html` (each round's page is in its tag).
