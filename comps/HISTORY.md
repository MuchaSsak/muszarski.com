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
| 6 | 2026-10-07 | **My life toys**: ten playable cards, one per hobby (reps counter, beat pads, light, travel board, rev, Pong, film roll, party, darkroom slider, the 1% race), Web Audio sounds | replaced: "overcomplicated for users with the interactive fun components", "too much and messy/overwhelming"; now one index + one shader print per hobby | tag `history/my-life-toys` (local) · `comps/history/my-life-toys/` (shots at 1920 + 390, the last source) |

| 7 | 2026-10-08 | **CV sheet** (draft, `comps/cv/`): a designed two-page PDF (cobalt band, fitted name, sticker, date rail, pink contact slip) replacing the first CV print template (the live `public/files/*.pdf`, in git) | "make them look a whole ton better and impressive", max 2 pages; waiting for approval | v6 (all three locales): `comps/cv/v6/` · old template: `apps/web/src/pages/[locale]/cv/print/` |
| 8 | 2026-10-08 | **CV sheet v7**, English first (draft data in `apps/web/src/data/cv-draft.ts`): icon contact bar in three columns, own-project logos in the date rail, Skills and qualifications (soft skills with proof lines, the tools in small grouped rows), flags, a QR code in the contact slip; no tool logos (brand rules) | the owner's notes on v6: more visuals and icons, GitHub/LinkedIn icons, own project logos, flags, a cooler contact banner, new section order and content | `comps/cv/v7/mateusz-muszarski-cv-en.pdf`, `-p1.png`, `-p2.png` |
| 9 | 2026-10-08 | **CV sheet v8**, English first: the portfolio in a pink tile in the contact bar, no project logos, the sticker's MUSZARSKI.COM on top, a little more air, cobalt gain lines under hackathons and youth projects, Three.js Journey's scope, `muszarski.com/cv` on the slip | the owner's notes on v7: differentiate the website, drop the project logos, more living room, trim Clockful's counts and lingui-translate-ai, Freelance described generally, WebGL, Mobbin, Vercel API, the gains | `comps/cv/v8/mateusz-muszarski-cv-en.pdf`, `-p1.png`, `-p2.png` |
| 10 | 2026-10-08 | **CV rollout**: sheet v8 approved and localized (pl, es), now the live PDF; `/cv/` rebuilt with its own screen layout (cobalt head with the PDF as two sheets of paper, sticky section labels, a timeline, project cards in their colours with real media, soft-skill tiles, a pink contact band); the first print template and the old `/cv/` page (poster sheet with a framed sidebar) removed | "the cv that is current is quite good as the template"; "it would be too boring if it was the same as pdf, so i want you to go creative on it" | sheet drafts `comps/cv/v6`, `v7`, `v8` · old page: tag `history/cv-page-v1`, shots `comps/history/cv-page-v1/` (en + pl at 1920 + 390) · new: `screenshots/en_cv/`, `pl_cv/` |
| 9 | 2026-10-08 | **All projects: TV + spy room**: a yellow retro TV with a shader screen flipping through the projects, a wall of tilted cards in the project colours with drawn scenes (a timer dashboard, a terminal, a particle swirl), and a "There's more" spy room (lasers, a camera following the pointer, a safe that says "Nice try") | replaced the same day: "gone too much with illustrations and looks too vibe coded"; for the case study [user]: he didn't want to overdo the vector illustrations so often, it made the page look slightly unprofessional; it was meant to be "fun, but not that overly fun" | tag `history/work-tv-spyroom` (local) · `comps/history/work-tv-spyroom/` (en + pl at 1920 + 390) |

## Rebuilding an old version

- A comp: open the file in a browser (`python -m http.server` in `comps/`, then `/poster-r3.html`). Fonts in comps load from
  Google Fonts (OFL).
- An old app version: `git worktree add ../portfolio-drafting-table history/drafting-table`, then `bun install` and
  `bun run dev` there.
- The review page as the owner saw it: `git show history/poster-r3:comps/index.html` (each round's page is in its tag).
