# Design system

> Owns the art direction, tokens, components, motion, imagery and design do/don't. References that
> inspired it: `design-references.md`. Sections and pages: `structure.md`. Scoring a view: `design-quality.md`
> (Phase 1). Decided by the owner 2026-10-05: **Drafting Table** + **code-drawn SVG + shader illustrations**.
> Exact token values are set in prototype S2 (`technologies.md` § Spikes); until then they are `TBD`.

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
- **High/Mid tier:** WebGL (R3F) with an ink-line shader and paper grain.
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

## Color tokens

| Token | Light (paper) | Dark (cyanotype) | Use |
| --- | --- | --- | --- |
| `--paper` | TBD (warm off-white) | TBD (Prussian blue) | page stock |
| `--ink` | TBD (graphite) | TBD (white) | text, primary lines |
| `--ink-muted` | TBD | TBD | secondary text (≥ 4.5:1 for text) |
| `--grid` | TBD (≤ 1.3:1 vs paper) | TBD | grid, rulers (decorative) |
| `--accent` | TBD (one signal colour, e.g. a red-pencil mark) | TBD | CTAs, focus, stamps |
| `--project-*` | per project theme | per project theme | sheet stock/ink/accent |

## Typography (families and licences decided in S2; licence files kept next to fonts, `assets.md`)

- **Display:** a confident grotesk or serif for the H1 and section titles. TBD.
- **Labels and technical text:** a monospace/ISO-lettering feel for sheet numbers, dimensions and the title block. TBD.
- **Body:** highly legible text face; ≥ 16 px; line length 60–75 ch.
- **Budget:** fonts ≤ 100 KB total, self-hosted, subset (pl + es glyphs), `font-display: swap` [research].

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
- **Library:** CSS + GSAP for the timeline-heavy parts; R3F only in the signature island [research].
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
