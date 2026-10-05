# Design quality: the 0–10 rubric

> Owns: scoring a rendered **view** (one route × one width × one theme) 0–10 against the **Poster** art
> direction (ported from the rejected Drafting Table 2026-10-05), plus the craft floor, accessibility gates, instant-fail list and score log behind that number. Used in
> step 3 of the slice loop (`working-agreement.md` § 9): a Phase 1 slice closes only at **≥ 8/10 with the weakest
> point named** [user]. The system being judged (tokens, type, motion, imagery, do/don't) is `design.md`, and its
> tokens beat any default here. Reference patterns: `design-references.md`. Budgets: `requirements.md`.

## Core belief

- Every pixel is intentional: nothing default, nothing accidental. **Intention + restraint**, not effort, is what
  separates fine from exceptional: a few things done perfectly beat ten done half-well [research].
- Design the **one signature moment** per view first (on home: the fitted name with its letter accordion); everything
  else supports it [research].
- **Practicality ≥ wow:** impressive within 3 s AND usable in 1 click at 390. A view that hides contact, blocks input
  or costs LCP scores as broken, not bold [user].
- A software house should see a printed poster series made for this one person: not a template, not AI-slop, not a
  costume (`design.md` § Art direction).

## Universal craft rules

Rows marked * apply to visual-led routes (home, `/work/*`, `/my-life/`); text-led routes (blog post, `/cv/`, legal)
are judged on type, measure and rhythm instead.

| Area | Rule | Source |
| --- | --- | --- |
| Type | Body **17–18 px**, line-height **1.5–1.7**, measure **60–75 ch** (blog prose 68 ch) | `design.md`, [research] |
| Type | Hero display-to-body **≈ 10:1** at ≥ 1440 is the reference; under ~5:1 on desktop or ~2.5:1 at 390 is timid, the clearest amateur tell | [research]; floors [assumption] |
| Type | Display set tight by the fit (no extra tracking); body normal; kicker labels uppercase, wide (`wdth` 115–125), +0.03–0.06 em | `design.md` |
| Type | Headline: one statement of ~3–7 words, `text-wrap: balance`, no orphans in en / pl / es (pl runs longest) | [research] |
| Type | Fluid `clamp()` with a real max; ratio ≈ 1.25 at phone, ≈ 1.333 at desktop; no size off the scale | `design.md` |
| Type | One face: **Anybody** (variable, `wdth` 50–150, `wght` 400–900). Fitted display at 900, roles condensed (`wdth` 62), labels wide; the width axis is the design tool, not a second family. Any other face is a Typography miss (a blog serif only if the blog slice adds it) | `design.md` |
| Type | Tabular numerals for dates, metrics and timers; locale-correct quotes (pl „…”), never straight `"` | `design.md`, [assumption] |
| Color | Fields only: a section takes one field (`field-hero / alt / deep / bar / accent` or a project skin) and its children read `--sbg` / `--sfg`; no ad-hoc hex in components; no opacity-faded text | `design.md` |
| Color | Flat colour fields, no gradients (the band's edge mask is the one exception); text is the field's `--sfg` at full strength, ≥ 4.5:1 | `design.md`, `tokens.test.ts` |
| Color | **Field rhythm:** neighbouring sections differ by field (a chapter's skin counts); two neighbours on the same field need a drawn 3 px rule or a band between them | `design.md` |
| Color | The accent recurs: in ≥ half the sections and in ≥ 1 non-CTA form (sticker, stamp, footer name, focus/hover shadow). One accent per theme; project skins add their own colour only inside their chapter | `design.md` |
| Layout | A real column grid on the **4 px** scale, every edge snaps; one deliberate break per view (a drawing past its frame, a dimension line across the gutter), with a one-line reason | [research] |
| Layout | Section padding and gaps from ≤ 3 steps of the scale, the same steps page-wide | [assumption] |
| Layout | **≤ 2 sections per archetype.** Menu: sticky-stacked chapters · ledger / table · process loop · editorial split · numbered index · expanding cards · large-type feature · filterable list. Repetition is the enemy, not the grid; "so it isn't a grid" is no reason | [research] |
| Layout | ≤ 3 consecutive sections on one surface; ≤ 4 consecutive ~1.0-viewport sections | [research], `structure.md` |
| Layout | **Airy ≠ empty:** content fills ≥ 55% of its section height and ≥ 50% of the content width at 1440. Fix with real layout (a visual, a split, a ledger), never padding or filler | [research] |
| Layout | Breakpoints 390 / 768 / 1024 / 1440 / 1920; fields bleed full width, content caps at 1920 (`--pad-x`); every `clamp()` has a max; fitted type fills its host, body text never runs > 75 ch | `design.md` |
| Layout | Nothing under the chrome: `scroll-padding-top` ≥ the header height; check at 1920+ where lines stop wrapping | [research] |
| Layout | At ≤ 900 every chapter stacks visual, then copy; same content as desktop | `design.md` |
| Copy | Leads ≤ ~2 sentences, card bodies ≤ ~2 lines; depth moves to the case study, never gets deleted | [research] |
| Media* | Visual mass **≈ 20–50%** of page area; ≥ 8% left after removing the single largest item; only the hero may pass 85 vh | [research] |
| Media* | ≤ 25% of content sections without a visual. Counts: a drawing (diagram, device, motif, architecture), screenshot, video, canvas, large numeral or stamp. Does not: an icon, a chip row, a logo | [research]; list [assumption] |
| Media | Every image does a job (cannot say what it shows → delete it); real UI recordings only; no stock or AI people; device frames are flat, hard-shadowed shapes, never perspective or photoreal | [research], `design.md` |
| Media | `astro:assets` with `widths`/`sizes`; sources ≥ 1600 px wide for hero/full-bleed, ≥ 800 px in content; slot 16:10 desktop, 4:5 at 390; `aspect-ratio` reserved (CLS ≤ 0.05); video muted, `playsinline`, poster, starts on visibility | [research] |
| Motion | Custom ease-out curves only, never `ease`/`linear`; durations 200–900 ms | `design.md`, [research] |
| Motion | The H1 paints final in the first frame (never faded); lead and CTAs enter in CSS, cascade done ≤ 600 ms after first paint; animate transform, opacity, `font-stretch` on display letters and SVG strokes only | [research], `design.md` |
| Motion | A living layer the owner asked for ("a lot of micro animations or loops"): the letter accordion, hover/press shadows, small loops per section, one scroll moment (the chapter stack). Dead-static fails; so do scroll-jacking, a trapping pin or any intro | [user], `CLAUDE.md` |
| Motion | Loops > 5 s carry the global pause control; loops stop offscreen (`.off`); JS loops never read layout per frame | [research], `design.md` |
| Forms | A visible field surface with a 2 px border, label above, ≥ 44 px tall, a designed focus ring | [research] |
| Craft | Branded `::selection`; a 3 px focus ring, never removed; hover never shifts layout; every hover effect has a tap, focus or scroll twin; crafted 404, empty, error, loading and toast states | [research], [user] |

## Accessibility floor (gates: a failed gate means the view is not scored)

| Gate | Bar | Source |
| --- | --- | --- |
| Standard | WCAG 2.2 AA; axe zero violations in Cobalt, Paper AND Ink (`e2e/a11y.spec.ts`) | [research] |
| Contrast | 4.5:1 body; 3:1 large text (≥ 24 px, or ≥ 19 px bold), UI and informative drawings, on every field incl. project skins; colour never the only signal | [research] |
| Focus | visible on every control, never obscured by the sticky header (2.4.11) | [research] |
| Targets | ≥ 24 × 24 px (2.5.8), ≥ 8 px apart; aim 44 × 44 on primary touch controls; nothing essential on hover | [research] |
| Structure | one h1, no skipped levels, real landmarks, a skip link; split-text headings expose one accessible name; a visible label starts the control's accessible name (2.5.3); a scrollable region has `tabindex="0"` + a label | [research] |
| Reduced motion | final state instantly; video → poster + play; WebGL → static SVG; nothing flashes > 3 /s | [research] |
| Text over media | needs a scrim or a solid field plate; canvas counts as media | [research] |
| Canvas / WebGL | `aria-hidden` canvas; every hotspot is a DOM link or text; the page works with the canvas absent | [research] |
| Zoom | reflow at 320 px and 200% zoom without horizontal scroll; pinch-zoom never disabled | [research] |

## Anti-slop: the instant-fail list

Any hit means not done, unless `design.md` asks for it by name.

| Group | Fails |
| --- | --- |
| AI look | purple→blue/pink gradients, glow orbs, sparkles, robot mascots; glassmorphism; gradient text; blob or wave dividers |
| Type | Inter, Roboto, Poppins, Montserrat, Space Grotesk, Geist, Instrument Serif, Playfair or system-ui as a face; the serif-italic accent word in a headline; timid headings the size of body |
| Layout | the generic centred hero over 3 identical icon-title-blurb cards; everything centred with uniform spacing; ≥ 3 sections on one uniform card grid; a work section that is only equal mock-up cards; masonry or tilt with no reason; wall-of-text sections; a thin list marooned in padding |
| Icons, media | emoji as bullets or icons; unmodified icon fonts; a wall of multicoloured tech logos without names (the owner asked for one-colour marks WITH names, in context: `design.md` § Tool marks); stock or AI photos of people; fake screenshots; perspective mock-ups beside flat frames |
| Motion | `ease`/`linear`; everything animating at once; parallax on body text; a dead-static page |
| Portfolio clichés | custom cursor; magnetic buttons; name marquee (or any auto-marquee without pause); "Hello" preloader, 0→100 counter or START gate; text scramble as an intro; typewriter hero; skill bars, percentages or star ratings; floating 3D laptop or room |
| Practicality | contact reachable only at the end of a long scroll; a 3D scene that blocks or replaces content on mobile; canvas or video as the first paint; scroll-jacking |
| Poster costume | grain or texture that lowers text contrast; fitted type that overflows, clips or wraps; stickers or stamps with invented facts; every section shouting at the same size |
| Chrome | a heading or CTA under the sticky header (at rest or after an anchor jump); content running the width of a 2560 monitor; no signature moment, or two competing |

## Poster checks (scored under Details/craft and Composition)

| Check | Passes when |
| --- | --- |
| Fitted type | every fitted line runs edge to edge of its host in en / pl / es at 320-2560 (build-time `cqi` + `font-stretch`, `e2e/motion.spec.ts`); never clipped, never wrapped |
| Width axis | Anybody's `wdth` carries hierarchy (fitted 900 display, condensed roles, wide kickers); no second family, no faux bold |
| Fields | each section is one flat field; neighbours differ or a 3 px rule separates them; project skins stay inside their chapter |
| One accent | the theme's accent (pink / orange) on CTAs, stickers, the footer name, hover shadows; never body text |
| Hard shadows | depth is a flat offset shadow (3 px on hover, 10-12 px on frames), never a blur glow |
| Tool marks | one colour, unaltered, always with the tool's name next to them (Simple Icons, nominative use) |
| Header | M—M mark on the hero, the full name once stuck; CV + Contact visible at every width; the menu is the full-screen poster on phones |
| Motion twins | every hover effect has a tap, focus or scroll twin; loops pause offscreen, on the button and under reduced motion |
| Themes | Paper and Ink judged as their own designs, not inversions: the fitted name, accent and fields still read |

## The score

`score = Typography×0.22 + Composition×0.28 + Motion×0.18 + Color×0.17 + Details/craft×0.15` [research]

- **Composition** (heaviest, where most failures land): grid + break, archetype variety, surface rhythm, media mass,
  fill, whitespace, mobile layout. **Color:** the field roles, field rhythm, accent recurrence, Paper and Ink.
  **Details/craft:** the Poster checks, focus, selection, states, forms, lean copy [research].
- Per category: 0–3 default or broken · 4–6 generic but clean · 7–8 clearly crafted · 9–10 exceptional [research].

| Overall | What the view looks like | Slice |
| --- | --- | --- |
| 0–3 | broken or default: overflow, unreadable text, a failed gate, a template look | blocked |
| 4–5 | generic but clean: works, yet could be any dev portfolio; poster motifs pasted on top | blocked |
| 6–7 | a competent Poster with one flat dimension: timid type, one surface all the way down, generic motion, an accent spent above the fold | blocked: fix the weakest category |
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
| Neighbouring sections on the same field with no rule or band between them, in **any** theme | Color ≤ 4 [research] |
| Accent missing from > half the sections, only above the fold, or > 1 accent in a view | Color ≤ 6 [research] |
| The H1 is not the LCP, an LCP candidate fades, or canvas/video paints first | Motion ≤ 4 [assumption] |
| Under reduced motion anything still moves, or content stays hidden | Motion ≤ 5 [assumption] |
| A fitted line clips, wraps or stops short of its host in any locale | Details ≤ 6 [assumption] |

A fired cap means the slice cannot close, whatever the weighted total says: fix the cause, then re-measure. Never
average around a cap [research; "whatever the total": assumption, since the weights alone don't guarantee it].

## Quick diagnostic (yes/no per view; any "no" is a concrete fix, not an opinion)

1. Is the H1 the first thing painted and read, and large enough to carry the view?
2. At 390, are Contact and CV one tap away without scrolling?
3. Is there exactly one signature moment, with everything else quiet?
4. Does it read as a printed poster (fitted type, flat fields, hard shadows), not a template with big text?
5. Body 17–18 px, 60–75 ch, line-height 1.5–1.7 at every width, on a 4 px grid with one intentional break?
6. One accent, recurring past the fold in a non-CTA form?
7. Does the surface flip at least every third section, with ≤ 2 sections per archetype?
8. On a visual-led route: media 20–50%, ≤ 25% of sections without a visual, every section filling its box?
9. Custom easing, purposeful motion, and the final state shown instantly under reduced motion?
10. Were Paper and Ink opened and judged as their own designs (home + two subpages)?
11. Gates met at 390 / 1024 / 1920: contrast, focus, targets, nothing under the header?
12. No horizontal overflow at 320, no text smearing at 2560?
13. Is the copy lean, and does pl fit without breaking the layout?
14. Zero instant-fail hits?
15. Is it bespoke to this owner, grounded in `design-references.md`, impossible to mistake for a template?

## How to record a score

- Score every width the loop shoots (390 / 1024 / 1920) in Cobalt; Paper and Ink at 390 + 1920. The 2560 sweep,
  reduced motion and the en / pl / es pass are pass/fail notes, not scores.
- One line per view in `screenshots/VISUAL-QA.md`, newest first; Ty/Co/Mo/Cl/De are the five category scores. The
  slice report quotes its lowest line.

```
| Date | Route | Width | Theme | Score | Ty/Co/Mo/Cl/De | Weakest point |
| YYYY-MM-DD | /en/ | 1920 | ink | 7.6 | 8/7/8/7/8 | (format example) credentials ledger: flat table, no visual |
```
