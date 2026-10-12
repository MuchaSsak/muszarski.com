# Pick the look first (Phase 3, any project with a UI)

Words don't pick a look; rendered, moving pages do. On the portfolio this skill was first built for, the art direction
was chosen in the interview from a description, two slices were built in it, and the owner rejected it on sight
("ugly", "not enough creative effort"). A day later four live comps got a pick at first look, two rounds of notes
turned the pick into a whole page, and the owner said "lets finally start coding". Doing that first saves the rebuild,
and it narrows the later research to what the chosen look needs.

**When:** *new* and *extend* with a UI, unless the owner already has a design system they want to keep (record it in
`design.md`, skip). `--look` runs only this phase on an existing wiki (a rebrand). Skip for a CLI, API or library.

**Output:** `comps/` (live comps, review page, shots, `README.md`, `HISTORY.md`), `research/<date>-look-ambition.md`, the
owner's pick in `log.md` with their words, then `design.md` + `design-references.md` frozen from the pick (Phase 5).

## 1. Taste intake (one batch, only what Phase 1 didn't answer)

| Ask | Why |
| --- | --- |
| The feel in three words | the axis every direction is judged on |
| 2-5 products or sites they admire, and why; anything they hate | the "same feel" references; the no-go list |
| **The floor**: what must the new look clearly beat (their current site, a competitor, a sister product)? | a concrete bar instead of "make it nice" |
| What stays: logo, a brand colour, a font they own | constraints every direction keeps |
| The one screen that matters most (landing hero, dashboard, main app screen) and one key section to prove the system on | what the comps show |
| How much of the traffic is phones | how hard phones get tested in the comps |
| Ambitious or safe? | default: **ambitious first, practical second**; a safe first look was rejected |

## 2. Ambition research

- 20-40 references on three axes: **same category**, **same feel** (any category), and **the floor** itself. Sources:
  Awwwards (its skill, if the project has one), Godly, Land-book, SiteInspire, Mobbin (shipped product screens), the
  component registry, the strongest products in the category. Screenshots with Playwright.
- Look for signatures (the one thing people remember), type systems, colour worlds, motion, how each section changes
  while the system holds.
- One file, `research/<YYYY-MM-DD>-look-ambition.md`: per reference the URL, what to steal as a pattern, what to skip,
  what it costs (weight, GPU, phone behaviour). End with "Directions this suggests". Third-party screenshots stay local
  (gitignore `research/inspirations/img/`): the repo may go public.
- Research informs, never copies: no layout, copy or artwork reproduced 1:1.

## 3. Three or four directions, as live comps

- **Genuinely different** on several axes at once: type family, colour world, the signature (3D, shader, type,
  illustration, photo, layout), density. Four palettes on one layout is one direction.
- One self-contained file per direction, `comps/<slug>.html`: plain HTML, inline CSS and JS, no build step. Fonts from
  Google Fonts or another OFL / Apache / MIT source (licence checked); raw WebGL or Canvas only when it is the signature.
- **Real content**: the real name, headline and one real product or section with the owner's media (dropped into
  `assets/`, copied into a gitignored `comps/media/`). Every placeholder listed in `comps/README.md`.
- **Real constraints, even in a comp:** the text renders first and the signature never blocks it; the same content on
  a phone at 390; every hover has a tap, focus or scroll twin; reduced motion works; a static fallback when WebGL is off.
- **Shot hooks:** `?shot&t=<seconds>` freezes every animation clock at `t`; `data-shot-focus` marks the key section;
  `data-shot="<name>"` marks each section (round 2 on).
- **A card per direction** (goes on the review page): name, a one-line tagline, what moves, type, palette (3-5 hex
  swatches), what changes per section or per product, cost (JS KB, GPU, the phone fallback).
- **Recommend one, with the reason.** The owner's pick may differ (on the portfolio: recommended Orbit, picked Poster);
  log both.

## 4. Shoot and check

```bash
node <skill>/scripts/shoot.mjs comps orbit poster toybox exhibit --widths=1440,390
```

The script serves `comps/` itself, freezes the clock, shoots the hero and the `data-shot-focus` section per width, and
prints horizontal overflow and console errors per page: both must be 0. Open every shot yourself before the owner does;
fix what you would not show a client.

## 5. The review page

`comps/index.html`, published as a **private Artifact** when the tool exists (load `artifact-design` first; shots go up
as files next to it). No Artifact tool: serve `comps/` locally and give the URL, and send the key shots in chat.

| Round 1 | Round 2 and later |
| --- | --- |
| meta line (project · round · date) | the newest round on top |
| H1 = the ask: "Four directions. Pick one, or mix." | "You said → changed": one row per owner note |
| one line: open each live, on desktop and on the phone; they move | a guided tour: one row per section shot + a two-line note |
| "My pick" box with the reason | a phone rail (every section at 390) |
| per direction: desktop + phone shots of the hero and the key section, the card from step 3, "Open live" | the open questions, numbered |
| the questions | older rounds below, for before/after |

- A quiet frame (neutral palette, one accent) so the comps carry the colour; light and dark.
- It shows nothing the product couldn't: no internal stack, private repo names or client names. Ask those in chat.
- Ask the pick with AskUserQuestion as well: one option per direction plus "mix", the review link in the question.

## 6. Rounds until the owner says go

- **Round 2:** the pick (or the mix) built out to the whole main screen, every section, real content where it exists.
  Choices still open (theme, font, density) switch in place: a small bottom bar and query params (`?theme=&type=`), so
  the owner compares in context, not in separate files.
- **Round 3 and on:** apply the notes; each note gets its line on the review page and a before/after where it shows.
- Every round: the owner's words quoted in `log.md`; questions you could not settle on the page and in
  `open-questions.md`; taste corrections into `lessons.md` ("less text, more to see" is a rule, not a one-off).
- The gate closes **only on the owner's word**. The comps are a mock-up to improve on, not a spec frozen pixel for pixel.
- While the owner reviews, don't idle: Phase 4 research that doesn't depend on the look (domain, audience, tech, legal)
  runs in background agents. Design research waits for the pick.

## 7. Freeze and keep every version

- `design.md` from the pick (Phase 5): the art direction and its signature, tokens copied from the comp's values, type
  and its licence, motion and reduced-motion rules, the components the comps show, Do / Don't from the owner's notes,
  and the floor it beats. `design-references.md`: the ambition research narrowed to the pick.
- `comps/README.md`: file → direction → signature; how to view and shoot; placeholders; licences.
- `comps/HISTORY.md`, one row per round, never deleted:
  `| # | Date | Version | What the owner said | Where it lives |` (quotes in the third column, tag + files in the fourth).
- Commit each round; tag it `history/comps-r<N>-<slug>`. The look the owner rejects stays in git and in `comps/`:
  the build story ("how it got here") is often worth a case study.
- The app never imports a comp: the pick is rebuilt properly in the real stack.

## What the portfolio paid for

| Don't | Do |
| --- | --- |
| choose the look from a word or a moodboard | show it rendered and moving, desktop and phone |
| lead with the safe look | ambitious first, then make it practical |
| explain on the page what the picture shows | less text, more to see: real media, real marks with names |
| a drawn prop in every section ("too vibe coded") | real media, type and one interesting component; fun, not overly fun |
| a font, texture or icon with an unknown licence | free for commercial use, or the owner's own; unknown = not used |
| assume a brand's logo may be shown | check that brand's own guideline, per brand |
| work from images pasted in chat | they never reach the disk: ask for the files in the repo |
