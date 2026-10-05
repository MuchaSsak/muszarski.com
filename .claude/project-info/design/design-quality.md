# Design quality: the 0–10 rubric

> Owns: scoring a rendered **view** (one route × one width × one theme) 0–10 against the Drafting Table art
> direction, plus the craft floor, accessibility gates, instant-fail list and score log behind that number. Used in
> step 3 of the slice loop (`working-agreement.md` § 9): a Phase 1 slice closes only at **≥ 8/10 with the weakest
> point named** [user]. The system being judged (tokens, type, motion, imagery, do/don't) is `design.md`, and its
> tokens beat any default here. Reference patterns: `design-references.md`. Budgets: `requirements.md`.

## Core belief

- Every pixel is intentional: nothing default, nothing accidental. **Intention + restraint**, not effort, is what
  separates fine from exceptional: a few things done perfectly beat ten done half-well [research].
- Design the **one signature moment** per view first (on home: the exploded-view hero); everything else stays quiet [research].
- **Practicality ≥ wow:** impressive within 3 s AND usable in 1 click at 390. A view that hides contact, blocks input
  or costs LCP scores as broken, not bold [user].
- A software house should see an engineer's drawing set made for this one person: not a template, not AI-slop, not a
  costume (`design-references.md` § Direction).

## Universal craft rules

Rows marked * apply to visual-led routes (home, `/work/*`, `/my-life/`); text-led routes (blog post, `/cv/`, legal)
are judged on type, measure and rhythm instead.

| Area | Rule | Source |
| --- | --- | --- |
| Type | Body **17–18 px**, line-height **1.5–1.7**, measure **60–75 ch** (blog prose 68 ch) | `design.md`, [research] |
| Type | Hero display-to-body **≈ 10:1** at ≥ 1440 is the reference; under ~5:1 on desktop or ~2.5:1 at 390 is timid, the clearest amateur tell | [research]; floors [assumption] |
| Type | Display tracking −0.02 to −0.05 em; body normal; mono labels uppercase at +0.04–0.08 em | [research]; labels [assumption] |
| Type | Headline: one statement of ~3–7 words, `text-wrap: balance`, no orphans in en / pl / es (pl runs longest) | [research] |
| Type | Fluid `clamp()` with a real max; ratio ≈ 1.25 at phone, ≈ 1.333 at desktop; no size off the scale | `design.md` |
| Type | Only the faces `design.md` froze (slice 0): Archivo 400/600 body + UI, Archivo Expanded 800 display, IBM Plex Mono 400 labels; Source Serif 4 only if the blog slice adds it; mono never sets a paragraph; any other face is a Typography miss | `design.md` |
| Type | Tabular numerals for dates, metrics, sheet and revision numbers; locale-correct quotes (pl „…”), never straight `"` | `design.md`, [assumption] |
| Color | Tokens only (`--paper`, `--paper-raised`, `--ink`, `--ink-muted`, `--line`, `--grid`, `--accent`, `--project-*`); no ad-hoc hex; no pure `#000`/`#fff` surface | `design.md`, [research] |
| Color | The canvas sits at one end of the lightness scale: light paper OKLCH L 0.93–0.97, dark stock L 0.12–0.22 | `design.md` |
| Color | Hierarchy: `--ink` primary, `--ink-muted` secondary; no third grey under 4.5:1 | [assumption] |
| Color | **60/30/10 by painted area:** ~60% table paper · ~30% a genuinely different stock (a project sheet's paper, an ink-inverted band) · ~10% accent + tints. Two papers < 25 ΔL\* apart are ONE colour unless a drawn 2 px sheet frame separates them | [research]; frame exception [assumption], recalibrate on the first home build |
| Color | The accent recurs: in ≥ half the sections and in ≥ 1 non-CTA form (revision mark, stamp, arrowhead, focus ring). One accent per view; the chrome keeps red pencil | [research], `design.md` |
| Layout | A real column grid on the **4 px** scale, every edge snaps; one deliberate break per view (a drawing past its frame, a dimension line across the gutter), with a one-line reason | [research] |
| Layout | Section padding and gaps from ≤ 3 steps of the scale, the same steps page-wide | [assumption] |
| Layout | **≤ 2 sections per archetype.** Menu: sticky-stacked sheets · ledger / table · process drawing · editorial split · numbered index · offset slip / card · large-type feature · filterable list. Repetition is the enemy, not the grid; "so it isn't a grid" is no reason | [research] |
| Layout | ≤ 3 consecutive sections on one surface; ≤ 4 consecutive ~1.0-viewport sections | [research], `structure.md` |
| Layout | **Airy ≠ empty:** content fills ≥ 55% of its section height and ≥ 50% of the shell width at 1440. Fix with real layout (a drawing, a split, a ledger), never padding or filler | [research] |
| Layout | Breakpoints 390 / 768 / 1024 / 1440 / 1920; a capped, centred shell; only paper and grid bands bleed; every `clamp()` has a max; no text line > 1400 px at 2560 | `design.md`, [research] |
| Layout | Nothing under the chrome: top padding ≥ the title-block height, `scroll-margin-top` on every anchor; check at 1920+ where lines stop wrapping | [research] |
| Layout | At ≤ 768 every sheet stacks frame, then copy; same content as desktop | `design.md` |
| Copy | Leads ≤ ~2 sentences, card bodies ≤ ~2 lines; depth moves to the case study, never gets deleted | [research] |
| Media* | Visual mass **≈ 20–50%** of page area; ≥ 8% left after removing the single largest item; only the hero may pass 85 vh | [research] |
| Media* | ≤ 25% of content sections without a visual. Counts: a drawing (diagram, device, motif, architecture), screenshot, video, canvas, large numeral or stamp. Does not: an icon, a chip row, a logo | [research]; list [assumption] |
| Media | Every image does a job (cannot say what it shows → delete it); real UI recordings only; no stock or AI people; device frames are flat line drawings, never perspective or photoreal | [research], `design-references.md` |
| Media | `astro:assets` with `widths`/`sizes`; sources ≥ 1600 px wide for hero/full-bleed, ≥ 800 px in content; slot 16:10 desktop, 4:5 at 390; `aspect-ratio` reserved (CLS ≤ 0.05); video muted, `playsinline`, poster, starts on visibility | [research] |
| Motion | Custom ease-out curves only, never `ease`/`linear`; durations 200–900 ms | `design.md`, [research] |
| Motion | The H1, lead and primary CTA paint in the first frame; above-the-fold entrances in CSS, cascade done ≤ 500 ms after first paint; animate transform, opacity and SVG stroke-draw only | [research] |
| Motion | A living layer: ink-in reveals, hover/press feedback, one scroll moment (the sheet stack). Dead-static fails; so do scroll-jacking, a trapping pin or any intro | [research], `CLAUDE.md` |
| Motion | Loops > 5 s carry a pause control; only the sheet in view plays | [research] |
| Forms | A visible `--paper-raised` surface with an ink border, label above, ≥ 44 px tall, a designed focus ring | [research] |
| Craft | Branded `::selection`; an accent focus ring, never removed; hover never shifts layout; crafted 404, empty, error, loading and toast states | [research] |

## Accessibility floor (gates: a failed gate means the view is not scored)

| Gate | Bar | Source |
| --- | --- | --- |
| Standard | WCAG 2.2 AA; axe zero serious or critical, light AND dark | [research] |
| Contrast | 4.5:1 body; 3:1 large text (≥ 24 px, or ≥ 19 px bold), UI and informative drawings, on every stock incl. project papers; colour never the only signal | [research] |
| Focus | visible on every control, never obscured by the sticky title block (2.4.11) | [research] |
| Targets | ≥ 24 × 24 px (2.5.8), ≥ 8 px apart; aim 44 × 44 on primary touch controls; nothing essential on hover | [research] |
| Structure | one h1, no skipped levels, real landmarks, a skip link; split-text headings expose one accessible name; a scrollable `pre` has `tabindex="0"` + a label | [research] |
| Reduced motion | final state instantly; video → poster + play; WebGL → static SVG; nothing flashes > 3 /s | [research] |
| Text over media | needs a scrim or a solid paper plate; canvas counts as media | [research] |
| Canvas / WebGL | `aria-hidden` canvas; every hotspot is a DOM link or text; the page works with the canvas absent | [research] |
| Zoom | reflow at 320 px and 200% zoom without horizontal scroll; pinch-zoom never disabled | [research] |

## Anti-slop: the instant-fail list

Any hit means not done, unless `design.md` asks for it by name.

| Group | Fails |
| --- | --- |
| AI look | purple→blue/pink gradients, glow orbs, sparkles, robot mascots; glassmorphism; gradient text; blob or wave dividers |
| Type | Inter, Roboto, Poppins, Montserrat, Space Grotesk, Geist, Instrument Serif, Playfair or system-ui as a face; the serif-italic accent word in a headline; timid headings the size of body |
| Layout | the generic centred hero over 3 identical icon-title-blurb cards; everything centred with uniform spacing; ≥ 3 sections on one uniform card grid; a work section that is only equal mock-up cards; masonry or tilt with no reason; wall-of-text sections; a thin list marooned in padding |
| Icons, media | emoji as bullets or icons; unmodified icon fonts; a logo wall of technologies; stock or AI photos of people; fake screenshots; perspective mock-ups beside flat drawings |
| Motion | `ease`/`linear`; everything animating at once; parallax on body text; a dead-static page |
| Portfolio clichés | custom cursor; magnetic buttons; name marquee (or any auto-marquee without pause); "Hello" preloader, 0→100 counter or START gate; text scramble as an intro; typewriter hero; skill bars, percentages or star ratings; floating 3D laptop or room |
| Practicality | contact reachable only at the end of a long scroll; a 3D scene that blocks or replaces content on mobile; canvas or video as the first paint; scroll-jacking |
| Costume blueprint | unreadable cyan text; grid or drawing behind body text above 1.3:1; `--line` used for meaning; sheet numbers used as navigation; drafting marks with fake values |
| Chrome | a heading or CTA under the sticky title block (at rest or after an anchor jump); text running the width of a 2560 monitor; no signature moment, or two competing |

## Drafting Table checks (scored under Details/craft and Composition)

| Check | Passes when |
| --- | --- |
| Title block | reads as a real drawing title block: ruled cells, small mono labels (SHEET, REV, DATE) over legible values; name, role, availability, sheet no., revision/date, Contact + CV; no empty or invented cell (REV/date from the build) |
| Line weights | outline 2 px · detail 1 px · construction 0.75 px only, `non-scaling-stroke`; line types used by convention (continuous, dashed hidden, chain centre) |
| Ink roles | informative drawings in `--ink` (≥ 3:1); `--line` decorative only; `--grid` ≤ 1.3:1 and never behind body text; rulers desktop-only, `aria-hidden` |
| One accent | one accent per view (red pencil or the project's), chrome excepted; accent strokes ≥ 2 px, never body text |
| Sheet numbers | A-00, W-0n, C-01… appear as labels only; navigation stays plain words |
| Text first | squint test: text blocks lead, drawings second; no motif, grid or callout crosses body copy; the H1 is seen first |
| Real conventions | dimension lines carry true values ("390 × 844"); every part callout is a real link; restraint over coverage |
| Project sheets | same skeleton, tokens only (paper, ink, accent, motif); no own layout, nav or font; ink ≥ 7:1 on its paper |
| Cyanotype | dark judged as its own design: white ink readable, `#FF8F7A` accent, bands still separate, not a blue wash |

## The score

`score = Typography×0.22 + Composition×0.28 + Motion×0.18 + Color×0.17 + Details/craft×0.15` [research]

- **Composition** (heaviest, where most failures land): grid + break, archetype variety, surface rhythm, media mass,
  fill, whitespace, mobile layout. **Color:** the paper/ink/accent roles, 60/30/10, accent recurrence, cyanotype.
  **Details/craft:** the Drafting Table checks, focus, selection, states, forms, lean copy [research].
- Per category: 0–3 default or broken · 4–6 generic but clean · 7–8 clearly crafted · 9–10 exceptional [research].

| Overall | What the view looks like | Slice |
| --- | --- | --- |
| 0–3 | broken or default: overflow, unreadable text, a failed gate, a template look | blocked |
| 4–5 | generic but clean: works, yet could be any dev portfolio; drafting motifs pasted on top | blocked |
| 6–7 | a competent Drafting Table with one flat dimension: timid type, one surface all the way down, generic motion, an accent spent above the fold | blocked: fix the weakest category |
| **8** | **professional agency / bespoke:** every rule met, one signature moment, recognisably made for this owner | **closes the slice** [user] |
| 9–10 | award-credible: a screenshot-worthy moment with zero cost to speed, access or 1-click contact | — |

- Any instant-fail hit caps the overall score at 6 [assumption]. A slice scores as its lowest view [assumption].
- Say the score and the weakest point out loud on every pass. Re-score only after a change; never score the same
  pixels more generously the second time [research].

**Caps** (measured at 1440; text-led routes skip the media rows)

| Measured condition | Cap |
| --- | --- |
| Media < 15% / 15–20% / > 50% of page area; < 8% media after removing the largest item | Composition ≤ 5 / ≤ 7 / ≤ 5; ≤ 5 [research] |
| A bare-media section (no heading, copy or action) | Composition ≤ 4 [research] |
| ≥ 3 sections on the same uniform N-up grid | Composition ≤ 5 [research] |
| Full-bleed media > 85 vh outside the hero; > 3 consecutive sections on one surface; > 25% of sections without a visual; a section < 55% height or < 50% shell fill | Composition ≤ 6 [research] |
| Surfaces < 25 ΔL\* apart with no drawn frame, in **either** theme | Color ≤ 4 [research] |
| Second stock on < 2 non-adjacent sections | Color ≤ 5 [research] |
| Accent missing from > half the sections, only above the fold, or > 1 accent in a view | Color ≤ 6 [research] |
| The H1 is not the LCP, an LCP candidate fades, or canvas/video paints first | Motion ≤ 4 [assumption] |
| Under reduced motion anything still moves, or content stays hidden | Motion ≤ 5 [assumption] |
| The title block misses a required field or reads as decoration | Details ≤ 6 [assumption] |

A fired cap means the slice cannot close, whatever the weighted total says: fix the cause, then re-measure. Never
average around a cap [research; "whatever the total": assumption, since the weights alone don't guarantee it].

## Quick diagnostic (yes/no per view; any "no" is a concrete fix, not an opinion)

1. Is the H1 the first thing painted and read, and large enough to carry the view?
2. At 390, are Contact and CV one tap away without scrolling?
3. Is there exactly one signature moment, with everything else quiet?
4. Does it read as a sheet of a real drawing set (title block, true dimensions), not a costume?
5. Body 17–18 px, 60–75 ch, line-height 1.5–1.7 at every width, on a 4 px grid with one intentional break?
6. One accent, recurring past the fold in a non-CTA form?
7. Does the surface flip at least every third section, with ≤ 2 sections per archetype?
8. On a visual-led route: media 20–50%, ≤ 25% of sections without a visual, every section filling its box?
9. Custom easing, purposeful motion, and the final state shown instantly under reduced motion?
10. Was the other theme opened and judged as its own design (home + two subpages, ΔL\* re-measured per band)?
11. Gates met at 390 / 1024 / 1920: contrast, focus, targets, nothing under the title block?
12. No horizontal overflow at 320, no text smearing at 2560?
13. Is the copy lean, and does pl fit without breaking the layout?
14. Zero instant-fail hits?
15. Is it bespoke to this owner, grounded in `design-references.md`, impossible to mistake for a template?

## How to record a score

- Score every width × theme the loop shoots (390 / 1024 / 1920 × light / dark). The 2560 sweep, reduced motion
  and the en / pl / es pass are pass/fail notes, not scores.
- One line per view in `screenshots/VISUAL-QA.md`, newest first; Ty/Co/Mo/Cl/De are the five category scores. The
  slice report quotes its lowest line.

```
| Date | Route | Width | Theme | Score | Ty/Co/Mo/Cl/De | Weakest point |
| YYYY-MM-DD | /en/ | 1920 | dark | 7.6 | 8/7/8/7/8 | (format example) credentials ledger: flat table, no drawing |
```
