# Design references (synthesis of research/inspirations/)

> Owns: which reference patterns we adopt, per section and per page, plus the anti-patterns. The art direction and
> tokens are in `design.md`. Evidence:
> - `research/2026-10-05-landing-sections-patterns.md` (38 shots, 13 notes)
> - `research/2026-10-05-subpages-patterns.md` (45 shots, 10 notes)
> - `research/2026-10-05-ui-patterns-galleries.md`, `-awwwards-dev-portfolios.md`, `-art-direction-themes.md`
> - per-source notes in `research/inspirations/*.md` (screenshots local only)
> - rebrand pass (ambition, not safety): `research/2026-10-05-rebrand-ambition.md` (41 sites; shots local only)
>
> Research informs; nothing is copied 1:1.

## Direction

- **Category:** a developer portfolio that a software house reads like an engineering drawing set.
- **Three words:** precise, crafted, candid.
- **Must never look like:** a template (Brittany Chiang clone, shadcn default grid), an AI-slop landing (purple gradients,
  sparkles, glow orbs), a game you have to learn, or a costume blueprint you can't read.

## The sheet system (from Stripe Press "fixed slots, free paint" + Clay "same camera")

| Fixed on every project sheet | Varies per project (tokens only) |
| --- | --- |
| frame (2 px + 0.75 px double border, registration marks, optional 8 mm grid at 6%) | `--paper`: light set OKLCH L 0.93–0.97, chroma ≤ 0.04; dark set L 0.12–0.22 (`design.md` § Per-project themes) |
| title block (`SHEET 0n/04` · name · context tag · role · year · REV · scale bar), bottom-right; full width under the drawing at 390 | `--ink`: brand hue, OKLCH L 0.22–0.32 (≥ 7:1 on its paper) |
| line weights per `design.md` § Imagery (2 / 1 / 0.75 px); one mono + one text face | `--accent`: strokes ≥ 2 px, arrowheads, proof chip, focus only, never body text |
| media slot 16:10 desktop / 4:5 at 390; CTA order: Case study → live action → secondary | `--motif`: one code-drawn isometric (30°) SVG object |

- **Frames are code** (`<DrawnBrowser>`, `<DrawnPhone>`, `<DrawnMonitor>`, ~2–4 KB SVG in `currentColor`). Video sits in an HTML layer over the
  screen rect (no `<foreignObject>`). Registry frames (`@magicui/iphone`, `@magicui/safari`, `@gaia/iphone-mockup`) serve as geometry references only.
- **Stacking:** desktop sheets are `position: sticky` with a ±0.6° offset (paper sliding over paper), capped at `100svh − header`.
  At ≤ 1023 px and under reduced motion they are a static stack.
- **Only the sheet in view plays.** Pause control as a title-block cell.

## Per flagship (concrete sheet compositions: landing research § "The four sheets")

| Sheet | Composition | Live action | Motif |
| --- | --- | --- | --- |
| PstrykWeb (`both`) | 2 views of the public parts only: browser (konfigurator) + overlapping phone (konfigurator flow). No pipeline drawing (dossier § Public disclosure) | Live site ↗ (after the rights OK) | isometric stack of pages / "pstryk" toggle |
| Linkoglot (`phone`) | the phone front-on at 90% height with a dimension line + 2 circular DETAIL callouts | desktop: QR stamp (build-time SVG) + badges; phone: the visitor's OS badge first | viewfinder snapping an object into a flashcard |
| Neoteric Clockful (`desktop`) | browser + numbered balloon callouts ①②③ = parts list of what he built | "Code private · walkthrough on request" (repo private, Q40; never a dead Code ↗); title-block cell `DEPLOYMENT: none (internship)` | isometric clock face with gear teeth |
| Space portfolio (`live`) | drawn monitor with the loop; dimension label "desktop · WebGL2 · ~N MB"; a "Why it was rebuilt" note | fine pointer: Launch on desktop ↗; coarse: "Desktop-only experience" + Copy link. **No WebGL on home** | orbit ellipses as compass construction lines |

## Per home section (order + rhythm: `site/structure.md`)

| Section | Adopt | From |
| --- | --- | --- |
| Hero | H1 + one value sentence as text; 4–5 fact pills readable in 3 s; full bio one tap away; proof strip generated at build time; ~0.85 svh so sheet 01 peeks; its own mobile layout | ped.ro, Stripe (0.76 hero), Railway, Metalab |
| How I work (engineering economics) | a **decision ledger** (situation → decision + rejected → business effect + how measured → case link); 4 time-boxed phases each with an exit artefact; principles with receipt chips | Evil Martians (verb + metric + scale + time), Wild, Linear Method |
| AI workflow ("process drawing") | a hairline flow: brief → wiki/context → plan (skill) → build (agent + MCPs) → **verify (tests · Playwright · Lighthouse)** → review → ship, each node linked to an artefact; real task strings; one "AI mistake I caught"; receipts (commits, % reviewed, Lighthouse); optional click-to-play chaptered session | Amp, Factory, Simon Willison colophon, Linear, Cloudflare |
| Credentials ("parts list & revisions") | a highlights strip of 4 + a ledger `YEAR · ITEM · ISSUER · TYPE · PROOF` with filter chips + counts; the proof is `Verify ↗` / `Certificate ↗` / `Repo ↗` / `On request` | basement, Büro, Craft |
| Contact ("contact slip") | a dashed tear-off slip: Copy email (+ mailto, aria-live), Book 20 min ↗ only if Q12 = yes (a link, never an embed: Cal is 2.3 MB), the split CV CTA (one PDF per locale, Q18); response-time promise + local time; a 3-field form (email · message · reason chips Hiring/Project/Other), honeypot + Turnstile | Biograph, Charma, United Carriers, Shader |
| Footer ("revision block") | last-chance contact; the 4 labelled link columns of `structure.md` § Footer; `rel="me"`; locale switch (the theme toggle stays in the header); a build-time revision row (`REV date · commit · Lighthouse · built with Astro · source · llms.txt`) | Maggie Appleton, Josh Comeau, Vercel status |

## Per page (layout specs: subpages research)

| Page | Adopt |
| --- | --- |
| `/work/` index | flagship cards on top, then a filterable list: type + stack chips with counts, **state in the URL**, every row server-rendered; a status column; mobile keeps stack + links (Brittany Chiang's archive table, Zach Leatherman's maintenance status, Jesper Landberg's FULL list) |
| Case study | sheet hero in the project theme; TL;DR; sticky TOC (collapsible on mobile); spine per `content-model.md`; credits table |
| Blog index | a dated list + one featured post + topic chips; **line-art SVG covers** per post (Linear) |
| Blog post | one H1; byline + dates + reading time; TL;DR; 68ch column; sticky TOC; build-time Shiki + Copy (CSP: no inline styles → pick a class-based theme); demos with Play/Pause; sources; author box; series/related; link to the related case study |
| `/cv/` | one typed data file → the page; the PDF is the print route via Playwright; a CI text check; single-column PDF (Bartosz Jarocki's CV as the structure model, not the look) |
| `/my-life/` | photo hero; pronunciation chip; Short/Long intro with Copy (swyx); a dated Now block; ~8 hobby cards with one concrete fact each (Josh Comeau); SVG travel map (optional lazy globe); small lightbox; Discord/Messenger |
| Legal | a short-version box; numbered TOC; numbered clauses headed as questions; version + date (from git) (37signals, Plausible, Linear) |
| 404 | a **real 404 status**; echo the path; "Did you mean…" from the route list; 3 suggestions; ⌘K prefilled if built |

## Edges almost nobody has (cheap wins, measured)

- `Person`/`ProfilePage` JSON-LD: 9/23 well-known dev portfolios have it.
- Real `/llms.txt`: 4/23. `rel="me"`: 2/23. `hreflang`: **0/23**.
- Blog markup: only 1/10 personal dev blogs mark posts for search; 5/10 posts lack a canonical; most tag posts as `og:type=website`.

## Registry components (vetted 2026-10-05; install via `search-registry-items` skill)

| Use | Component | Note |
| --- | --- | --- |
| copy email | `@hirael/copy-button` | `execCommand` fallback, aria-live |
| TOC | `@toc-cn/table-of-contents` | case studies / posts only |
| chaptered video | `@soralabs/video-player` | load on click only |
| timeline | `@dashboardcn/timeline` or `@7ovr/timeline-1` | credentials / process |
| lightbox | `@hirael/lightbox` | `/my-life/` |
| tabs / accordion / toggle | shadcn primitives | |
| frames | `@magicui/iphone`, `@magicui/safari`, `@gaia/iphone-mockup` | geometry only; redraw as line art |
| Hand-build instead | stacking (CSS sticky), `/work` filters, QR (build-time SVG), ⌘K (shadcn `command`, lazy) | — |
| Rejected | `@stealth/*` (remote deps), `@ui-layouts/css-card-stacking` (Lenis), `@payload-components/*` (CMS), paid `@shadcncraft` | — |

## Anti-patterns

- **Structure:** logo walls; skill bars; instructor photos/logos; auto-scrolling marquees without a pause; generic process cards
  ("Dig dig dig"); ten 100vh screens in a row; a booking iframe on load; mega footers; an HTML soft-404 with status 200.
- **Visual:** perspective/photoreal device mockups mixed with flat drawings; text over a busy grid; per-project fonts
  or layouts; purple AI gradients, sparkles, robot mascots, fake typing > 5 s.
