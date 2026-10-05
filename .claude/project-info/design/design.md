# Design system

> Owns the art direction, tokens, components, motion, imagery and design do/don't. References that
> inspired it: `design-references.md`. Sections and pages: `structure.md`. Scoring a view: `design-quality.md`
> (Phase 1). Decided by the owner 2026-10-05: **Drafting Table** + **code-drawn SVG + shader illustrations**.
> Base tokens and type below are **Phase 0 drafts** with computed contrast [assumption]. Slice 0 of Phase 1
> (`working-agreement.md` § 9) puts them on screen, adjusts them once and freezes them (`placeholders.md` P14).

## Art direction: "Drafting Table"

- **Mental model:** the site is an engineer's drafting table, and every page is a **sheet** in one
  drawing set. The decoration is itself proof of shipping: diagrams, dimensions and part callouts of
  real projects, not a costume [research: art-direction-themes #1 + #2].
- **Title block:** the box in the corner of an engineering drawing. It always shows name, role,
  availability, sheet number, revision/date, and the Contact + CV actions. On desktop it is the header
  styled as a title block; on mobile, a compact bar.
- **Sheet numbers:** A-00 home · W-01…W-05 projects · C-01 CV · B-xx blog posts · L-01 my life · X-01 contact.
  Shown as labels only; navigation stays plain words.
- **The table itself:** a faint mm/dot grid on paper. Rulers with mm ticks at the viewport edges (desktop
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
- **Guardrail:** themes must stay inside the paper/ink system. A project is never allowed its own layout grid or nav.

## Color tokens (draft 2026-10-05; WCAG ratios computed, not yet seen on screen)

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
  per-viewer convenience in `localStorage`, set before first paint (no flash).

## Typography (draft candidates; all OFL with latin-ext for pl + es; verified in slice 0)

| Role | First choice | Alternate | Why |
| --- | --- | --- | --- |
| Display (H1, section titles) | **Archivo** (variable `wdth` 62–125): Expanded ExtraBold for the H1 | Familjen Grotesk | wide grotesk = engineering-plate lettering, not a default face |
| Labels (title block, dimensions, sheet numbers, chips) | **IBM Plex Mono** 400/500 | JetBrains Mono | technical lettering; Plex has an engineering heritage |
| Body + UI | **Archivo** normal width 400/600 | Source Serif 4 for blog prose only | one family keeps the bytes low |

- **Blocked faces** (read as defaults or as AI-slop, research): Inter, Roboto, Poppins, Montserrat, Space Grotesk,
  Geist, Instrument Serif, Playfair, the serif-italic accent word.
- **Budget:** fonts ≤ 100 KB total (target ~85 KB: Archivo 3 static cuts + Plex Mono 1 cut), self-hosted, subset
  latin + latin-ext, only the H1 face preloaded, `font-display: swap` with a metric-matched fallback (no CLS).
- **Scale:** fluid `clamp()`, ratio ≈ 1.25 on phones, ≈ 1.333 on desktop; body 17–18 px, line length 60–75 ch;
  tabular numerals for dates and metrics.

## Spacing, grid, breakpoints

- A spacing scale on a 4 px base, aligned to the drawing grid.
- **Breakpoints:** 390 (phone), 768, 1024, 1440, 1920; content shell capped (no ultrawide smear at 2560).
- **Heights:** the hero is one viewport (with the first sheet peeking); bands are content-height. Not every
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

- **Illustrations:** code-drawn SVG (line weights 0.75 / 1.5 / 3 px; drafting line types: continuous,
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
