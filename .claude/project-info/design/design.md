# Design system

> **REJECTED BY THE OWNER 2026-10-05, after seeing slices 0-1 on screen:** "this looks so ugly", "completely rebuild
> and rebrand", "you aren't putting in the creative effort and visual". Everything visual below (Drafting Table, paper/
> cyanotype tokens, Archivo + Plex Mono, title block, revision block) is the REJECTED direction, kept only as history.
> Do not build on it. The next step is a full rebrand (`working-agreement.md` § 9, Rebrand gate).
>
> **Rebrand directions built 2026-10-05, awaiting the owner's pick:** four live comps in `comps/` (`comps/README.md`),
> reviewed on a private artifact page. 1 Orbit (particle planet that re-forms into each project's device; recommended),
> 2 Poster (variable-width name set edge to edge, flat colour fields), 3 Toybox (ray-marched clay toys = facts),
> 4 Exhibit (night gallery, shader spotlights, museum placards). Evidence: `research/2026-10-05-rebrand-ambition.md`.
> When the owner picks, this page is rewritten for that direction.

> Owns the art direction, tokens, components, motion, imagery and design do/don't. References that
> inspired it: `design-references.md`. Sections and pages: `structure.md`. Scoring a view: `design-quality.md`
> (Phase 1). Decided by the owner 2026-10-05: **Drafting Table** + **code-drawn SVG + shader illustrations**.
> Base tokens and type below were **frozen in slice 0 (2026-10-05)** after review on screen in light + dark at 390-2560
> (the `/specimen/` sheet in review builds). Unit tests keep the AA ratios and the two dark blocks in sync.

## Art direction: "Drafting Table"

- **Mental model:** the site is an engineer's drafting table, and every page is a **sheet** in one
  drawing set. The decoration is itself proof of shipping: diagrams, dimensions and part callouts of
  real projects, not a costume [research: art-direction-themes #1 + #2].
- **Title block:** the box in the corner of an engineering drawing. Built in slice 1 as the sticky header: framed cells of
  mark + name + role, plain-word navigation, sheet number + revision (build date), language, theme, the split CV CTA and
  Contact. ≥ 768 px it hangs from the top edge inside the shell; below, a full-width bar. Availability lives in the hero
  and the contact section, so the bar stays one row in every locale [assumption 2026-10-05].
- **Sheet numbers:** A-00 home · W-01…W-04 flagships · C-01 CV · B-xx blog posts · L-01 my life · X-01 contact.
  Shown as labels only; navigation stays plain words.
- **The table itself:** a faint grid on paper: major lines every 40 px in `--grid`, minor lines every 8 px at 30% of
  `--grid` (frozen in slice 0). Rulers with mm ticks at the viewport edges (desktop
  only, decorative, `aria-hidden`). Never behind body text at a contrast that hurts reading.
- **Light theme = drafting paper:** warm off-white stock, graphite ink.
- **Dark theme = cyanotype blueprint:** Prussian-blue stock, white/cyan ink. Both are real drafting media,
  so dark mode is part of the concept, not an afterthought [assumption, Q22].

## Signature moment (one, F20)

- **What:** an **exploded-view hero.** An axonometric line drawing of "what I build" (UI, API, data, AI agents
  as stacked parts) assembles along dimension lines once the H1 has painted. Pointer moves separate the
  layers slightly; each part has a callout ("Part 01 → <project>") that is a real link.
- **High/Mid tier:** WebGL with an ink-line shader and paper grain, in **vanilla three or OGL** (spike S2,
  `technologies.md`). Not R3F: React + R3F is ~302 KB gz, the whole JS budget.
- **Low/Reduced:** the same drawing as static inline SVG, fully assembled.
- **Never:** blocks input, autoplays sound, or loads before LCP.

## Per-project themes (one skeleton, own skin)

- **One shared sheet layout:** title block (project name, outcome, context, role, year), device drawing with
  media, part list (stack), proof stamp, links. Comparable and scannable.
- **Each project sets tokens only:** `paper` (stock colour/texture: vellum, kraft, graph, black board…),
  `ink`, `accent`, `motif` (a code-drawn SVG drawn from the project's subject), optionally `typeAccent` and a
  `motion` flavour. Fields: `content-model.md` § Project.
- **Device frames are technical drawings:** orthographic outlines with dimension lines ("390 × 844"). The muted
  loop plays inside the frame.
- **Layout by `media.kind`:**
  - `phone`: portrait frame beside the copy
  - `desktop`: wide browser frame above or beside the copy
  - `both`: browser + overlapping phone
  - `live`: framed canvas, opt-in
  - At ≤ 768 px every kind stacks: frame, then copy.
- **Reveal:** as a sheet enters the viewport, its drawing inks in (stroke-draw), then resolves into the real UI
  video ("drawing → shipped"). Reduced motion: the final state, no animation.
- **Card → case study:** a View Transition morphs the sheet's frame and title block into the case-study hero.
  Browsers without it navigate instantly.
- **Dark mode:** each project sets a light and a dark token set (in its dossier); dark mode uses the dark set. A
  project whose subject is dark (the space portfolio) uses its dark stock in both themes. Light sets: `--paper`
  OKLCH L 0.93–0.97; dark sets: L 0.12–0.22; `--ink` ≥ 7:1 on its paper in both.
- **Guardrail:** themes must stay inside the paper/ink system. A project is never allowed its own layout grid or nav.

## Color tokens (frozen 2026-10-05, slice 0; `apps/web/src/styles/global.css`)

| Token | Light: drafting paper | Dark: cyanotype | Use | Contrast (light / dark) |
| --- | --- | --- | --- | --- |
| `--paper` | `#F2EFE6` warm cartridge | `#0C2240` Prussian blue | page stock | — |
| `--paper-raised` | `#FAF8F2` | `#122E55` | sheets, panels, inputs | — |
| `--ink` | `#1E2226` graphite | `#EEF4FB` white ink | text, informative lines | 13.9 / 14.4 on paper |
| `--ink-muted` | `#565B61` | `#A9BED8` | secondary text | 6.0 / 8.4 on paper; 6.5 / 7.1 raised |
| `--line` | `#B9B4A8` | `#3D5F8C` | **decorative** strokes only (construction lines) | 1.8 / 2.4 (never for meaning) |
| `--grid` | `#DEDAD0` | `#15335C` | mm grid, rulers | 1.21 / 1.26 (target ≤ 1.3) |
| `--accent` | `#B3321F` red pencil | `#FF8F7A` red pencil on blue | CTAs, focus, stamps, revision marks | 5.4 / 7.2 on paper (text-safe) |
| `--on-accent` | `#FFFFFF` | `#0C2240` | text on accent fills | 6.2 / 7.2 |
| `--project-*` | per project (dossiers) | per project | sheet stock / ink / accent | checked per dossier |

- Informative drawings (architecture, diagrams) use `--ink` (≥ 3:1, WCAG 1.4.11); `--line` is decoration only.
- One accent per view. Project sheets swap `--paper`/`--ink`/`--accent`; the chrome (title block, nav) keeps the base tokens.
- **Theme switch:** default from `prefers-color-scheme`; the toggle sets `data-theme` on `<html>`; the choice is a
  per-viewer convenience in `localStorage`, set before first paint (no flash). Built in slice 0: a ~1 KB vanilla script,
  `aria-pressed`, a cross-fade View Transition (instant under reduced motion), `theme-color` updated, works with storage blocked.
- **Scoped stock:** `.theme-light` / `.theme-dark` pin a stock on any element (the space sheet stays dark in light mode).

## Typography (frozen 2026-10-05, slice 0; OFL, subset to Latin + Latin-1 + Polish + the punctuation we use)

| Role | Face (static cut) | File | Why |
| --- | --- | --- | --- |
| Display (H1, section titles) | **Archivo Expanded** 800 (Archivo `wdth` 125, `wght` 800), preloaded | 11.8 KB | wide grotesk = engineering-plate lettering, not a default face |
| Labels (title block, dimensions, sheet numbers, chips) | **IBM Plex Mono** 400, uppercase + 0.06em tracking | 12.4 KB | technical lettering; Plex has an engineering heritage |
| Body + UI | **Archivo** 400 / 600 | 11.9 / 11.1 KB | one family keeps the bytes low |
| Blog prose (later, if needed) | Source Serif 4 | — | decided in the blog slice |

- Total **47.2 KB** in 4 files (`bun run fonts`, `apps/web/scripts/fonts.mjs`); metric-matched fallbacks (Arial / Arial Bold /
  Courier New with size-adjust and ascent/descent overrides) keep CLS at 0. Weights not shipped are never synthesized.

- **Blocked faces** (read as defaults or as AI-slop, research): Inter, Roboto, Poppins, Montserrat, Space Grotesk,
  Geist, Instrument Serif, Playfair, the serif-italic accent word.
- **Budget:** fonts ≤ 100 KB total (shipped 47.2 KB), self-hosted, only the H1 face preloaded, `font-display: swap`.
- **Scale:** fluid `clamp()` from 390 to 1440 px, ratio ≈ 1.25 on phones, ≈ 1.333 on desktop; body 17–18 px, line length
  60–75 ch (`max-w-prose` = 68ch); tabular numerals for dates and metrics. Steps: label 13 · sm 15 · base 17–18 · lg 21–24 ·
  xl 27–32 · 2xl 33–43 · 3xl 42–57 · display 40–76 px (40 px is the floor that fits "Full-stack" at 320 px).

## Spacing, grid, breakpoints

- A spacing scale on a 4 px base, aligned to the drawing grid.
- **Breakpoints:** 390 (phone), 768, 1024, 1440, 1920; content shell capped (no ultrawide smear at 2560).
- **Heights:** the hero is ~0.85 svh so sheet 01 peeks (`structure.md` § Rhythm); bands are content-height. Not every
  section is 100vh (`structure.md`).

## Components (to build; registry candidates in `design-references.md`)

- **Chrome:** title-block header, contact panel, locale switch (autonyms), theme toggle, pause-motion control.
- **Sheet system:** sheet (project chapter), device drawing (phone/browser), dimension line, part callout,
  stamp (proof chip), skill chip (filter), credential row, timeline (teamwork).
- **Pages:** case-study blocks (TL;DR, decision table, architecture drawing), prose (blog), CV sheet, legal
  document (TOC + numbered clauses), toast, form fields.

## Motion

- **Vocabulary:** ink-in (stroke-draw), assemble (parts along dimension lines), stamp, slide-in sheet. Durations
  200–900 ms, ease-out; nothing loops forever without a pause control (WCAG 2.2.2).
- **Library:** CSS + GSAP for the timeline-heavy parts; three/OGL only in the signature island [research].
- **Reduced motion:** show the final state instantly; video → poster + play button; WebGL → static SVG.

## Imagery

- **Illustrations:** code-drawn SVG (line weights: outline 2 px · detail 1 px · construction 0.75 px, never thinner because
  hairlines vanish on 1× screens; `vector-effect: non-scaling-stroke`; drafting line types: continuous,
  dashed hidden, chain centre lines; hatching for sections) and shaders (paper grain, ink bleed). They are
  fully owned, re-tinted per project, tiny.
- **Product media:** real recordings of the real UI only. Muted loops + posters per `content-model.md`.
- **Photos:** the owner's own (my-life, schema). No stock people. No AI-generated people or fake screenshots.

## Accessibility

- WCAG 2.2 AA. Visible focus (accent), 24 px targets, focus never under the sticky title block.
- Drawings are `aria-hidden` unless informative; architecture drawings get a text alternative.
- Every canvas has DOM links/text for its hotspots. Pinch-zoom is never disabled.

## Do / Don't

| Do | Don't |
| --- | --- |
| Real drafting conventions (title block, dimensions, part numbers) used with restraint | Costume blueprints: grid everywhere, unreadable cyan text |
| One signature moment, executed perfectly | Effects on every section |
| Text first, drawing second (LCP = H1) | Canvas or video as the first paint |
| Per-project tokens inside one system | A different layout or nav per project |
| Plain-word navigation; sheet numbers as labels | Clever nav that needs decoding |
| Avoid the clichés: custom cursor, magnetic everything, name marquee, "Hello" preloader, text scramble, typewriter hero, skill bars, floating 3D laptop, purple AI gradients, glassmorphism | — |
