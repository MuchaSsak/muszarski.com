# Design system: Poster

> Owns the art direction, tokens, type, components, motion, imagery and design do/don't. Scoring a view:
> `design-quality.md`. Sections and pages: `structure.md`. Media and licences: `assets.md`.
> **History:** the owner rejected the first look (Drafting Table, slices 0-1) on 2026-10-05, picked **Poster** from four
> live directions, and refined it over rounds 2 and 3 (`comps/poster-r3.html` is the reference comp). Every version is
> kept (`comps/HISTORY.md`). Production build started 2026-10-05 [user: "lets finally start coding"]: header, hero and
> tool band are built; the comp is a mock-up to improve on, not a spec to copy pixel for pixel [user].

## Art direction

- **Mental model:** the site is a series of printed posters. Each section is one flat colour field; the type is fitted
  edge to edge; depth is a hard offset shadow; a fine print grain sits over everything [user picked, round 1].
- **Signature moment (F20):** the fitted name in the hero. It renders final from the server (no JS on the LCP path);
  after load the letters breathe as an accordion that follows the pointer and idles as a slow wave. No WebGL in the
  hero; 3D lives only inside the space chapter's own media.
- **Less text, more to see** [user, round 3]: tools as one-colour marks with names, facts as icon tiles, products as
  video, one line of copy where a paragraph was.
- **Alive, cheaply** [user]: many small loops and micro-interactions, each pausing offscreen, on the pause button and
  under reduced motion; none on the load path.
- **Same on every device** [user]: phones get the same content and a premium feel; every hover has a tap, focus or
  scroll twin; layouts are tweaked per platform where UX gains.

## Themes and fields

Cobalt is the brand and the default for everyone (not tied to the system light/dark setting). The theme switch cycles
Cobalt → Paper → Ink; the choice is stored per viewer and applied before first paint (`ThemeScript.astro`) [user kept
Cobalt + the Paper/Ink toggle, round 3, no objection]. Tokens: `apps/web/src/styles/global.css`; `tokens.test.ts`
checks AA for every field in every theme.

| Field (`.field-*`) | Cobalt | Paper | Ink | Used for |
| --- | --- | --- | --- | --- |
| hero | `#2433FF` / `#EEF0FF` | `#F1EDE2` / `#111114` | `#0B0C11` / `#EEF0FF` | hero, header at rest |
| alt | `#EEF0FF` / `#0A0D33` | `#FBFAF6` / `#111114` | `#16171E` / `#EEF0FF` | How I work, credentials |
| deep | `#2433FF` / `#EEF0FF` | `#111114` / `#F1EDE2` | `#2433FF` / `#EEF0FF` | AI |
| bar | `#0A0D33` / `#EEF0FF` | `#111114` / `#F1EDE2` | `#0B0C11` / `#EEF0FF` | header when stuck, tool band, menu, footer |
| accent | `#FF4FB8` / `#0A0D33` | `#FF4A1C` / `#111114` | `#FF4FB8` / `#0A0D33` | contact section, CTAs, sticker |

- Components read `--sbg` / `--sfg` (the field they sit on) and `--accent` / `--on-accent`, never a raw colour.
- **Project skins** (one per chapter, all themes): PstrykWeb yellow `#FFD23F` on navy, Linkoglot orange `#FF5B1F`,
  Clockful lime `#C9F24A`, Space `#07081C` with ice text; each has a `--pop` colour for its shadows. Defined when the
  chapter slices land.
- Content caps at 1920 px (`--container-poster`), centred with `--pad-x`; fields bleed full width.

## Typography

- **One face: Anybody** (OFL, variable `wdth` 50-150, `wght` 400-900), self-hosted, one 49.5 KB file, preloaded
  (`bun run fonts`). Metric-matched Arial fallbacks per weight band keep the swap shift-free.
- **The width axis is the hierarchy:** fitted display at 900; role lines condensed (`font-stretch` 62%); kickers and
  buttons wide (115-125%) uppercase; body at 100%, 17-19 px, line-height 1.5, ≤ 34-68 ch.
- **Fitted type (`Fit.astro` + `~/lib/fit.ts`):** the widest line at the base width (66 under 700 px of host, 96 above)
  sets the size; every other line takes the `wdth` that makes it exactly as wide. Advances and kerning of Anybody 900
  are linear in `wdth`, measured at 50 and 150 by `scripts/fonts.mjs` into `fit-metrics.gen.ts`, so the CSS is exact:
  `font-size` in `cqi` of the host + `font-stretch` per line. Unknown characters fail the build.
- **Letter accordion (enhancement):** after load + idle, each line splits into letters (one hidden copy speaks for
  screen readers), each letter is measured once at 50 and 150, and frames run on that linear model: letters near the
  pointer widen, a slow sine wave idles otherwise, the slope-weighted mean is subtracted so the line stays flush. No
  layout reads per frame; off when offscreen, paused or reduced motion.

## Components (built)

| Component | File | Notes |
| --- | --- | --- |
| Header | `layout/SiteHeader.astro` | sticky; on home starts on the hero field with "M—M", turns into the bar and rolls the mark into the full name once the hero name scrolls away (IntersectionObserver). ≥ 1180: Work · How I work · AI · Blog · EN PL ES · theme · CV/PDF · Contact. Below: mark · CV · Contact · Menu; phones condense button type (`wdth` 72-82) so all fit at 320 |
| Menu | same file | native popover, full-screen bar field, giant condensed links that widen on hover/focus and stagger in; CV PDF, theme, pause motion, language codes |
| Hero | `home/Hero.astro` | fitted name (H1 = LCP), 3 px rule that draws in, three columns: role · one-line lede · CTAs (See the work, Download CV) + icon facts. Entrances are CSS (`.rise`) |
| Sticker | `home/Sticker.astro` | accent disc, ring text fitted to the circle at build time per locale, "Shipping since 2022", slow spin; over the name's last letter on desktop, beside the role on phones |
| Tool band | `home/ToolBand.astro` | bar-field marquee of one-colour marks + names, edge to edge; one row from first paint (no shift), copy appended by JS; never stops on hover and has no button of its own [user 2026-10-05]: the site-wide Pause motion (menu, footer) covers WCAG 2.2.2; wraps without JS or under reduced motion |
| Footer | `layout/SiteFooter.astro` | say-line + Contact, 4 link columns, codes, pause, credits (marks, icons, font), build revision, the surname fitted in accent |
| Buttons | `global.css` `.btn` | square, uppercase, wide; `btn-line` / `btn-acc` / `btn-inv`; 3 px offset shadow on hover (fine pointers), press on tap |
| Icons | `ui/Icon.astro`, `bun run icons` | inline SVG from a generated list: Simple Icons marks (`si:`), Tabler outline (`tb:`) and filled (`tbf:`) |
| Theme switch | `layout/ThemeCycle.astro` | shows the current theme's name; cross-fade View Transition |
| Pause motion | `layout/MotionToggle.astro` + `scripts/motion.ts` | every copy in sync; stored; hidden under reduced motion |

**Built 2026-10-05 (overnight build [user: "build everything ... in one go"]):**

| Component | File | Notes |
| --- | --- | --- |
| Chapters | `home/Chapters.astro`, `home/chapters/*.astro`, `styles/chapters.css` | 4 skins (yellow, orange, lime, space); sticky stack (JS sets `--stick` so each poster sticks when its bottom meets the viewport); rights gate drops client/internship chapters at launch; "All projects" strip + npm line |
| Reel | `ui/ReelControls.astro`, `scripts/reel.ts` | sources attach after the first interaction AND near view; plays at 50% visible; chips seek + fill; expand → `<dialog>`; drawn stand-ins use the same row, inert (`live={false}`) |
| PstrykWeb stage | chapter 01 | #1 burst (ring text fitted at build), drawn order loop (CSS, 10 s), "Video soon" (P18); public info only |
| Linkoglot stage | chapter 02 | phone breaks into the title (overlap computed from the build-time fit), flash card flip, the owner's store preview as interim loop (AV1 + H.264, 0.5 MB, P8) |
| Clockful stage | chapter 03 | drawn dashboard; a real demo timer in CSS only (`@property` integer + counters), Start/Stop |
| Space stage | chapter 04 | monitor + loop cut to Mars and Jupiter (planet textures CC BY 4.0, credited; the stops with third-party logos and the uncredited lens-dirt texture are left out); CSS orrery (offset-path ellipses); Lighthouse receipt → case study |
| How I work | `home/HowIWork.astro` | 7-stop ring (CSS trig), every stop's text in the HTML, auto-advance while visible, tap holds 9 s; receipts fall back when a project is hidden by the rights gate |
| AI workflow | `home/AiWorkflow.astro`, `lib/repo-stats.ts` | 7 steps, packet on desktop, vertical run on phones; hooks/wiki/skills/lessons counted from the repo at build; MCP servers named |
| Credentials | `home/Credentials.astro` | expanding cards from `data/cv.ts`; media loads on open; vertical accordion < 900 px; all open without JS |
| Latest writing | `home/LatestWriting.astro`, `blog/PostCard.astro`, `blog/PostCover.astro` | 3 newest posts; covers are code-drawn SVG motifs |
| Contact | `home/Contact.astro`, `lib/contact.ts`, `api/contact.ts` | message first; reply field appears after typing and fills itself from the message; topic chips; Turnstile on first keystroke; works without JS (303 to `/contact/sent/` or `/contact/error/`) |
| Pages | `pages/[locale]/{work,cv,cv/print,my-life,privacy,terms,blog,blog/[slug]}` | Poster headers (fitted titles), prose on the alt field (`styles/prose.css`), sticky TOC on wide screens |

The Stack section is cut [user 2026-10-05: recruiters don't need a whole section for it]; tools show in the band and in each
chapter. Patterns came from `comps/poster-r3.html`.

## Motion

- **Vocabulary:** rise (fade + 20 px up), draw (scaleX rules), pop (sticker), spin, marquee, letter accordion, hard
  shadow on hover, stagger in the menu. Ease-out `cubic-bezier(.2,.75,.1,1)`, pop `cubic-bezier(.3,1.6,.5,1)`;
  200-900 ms.
- **Rules:** the H1 never fades or moves on load; first-screen entrances are CSS; `.rv` reveals below the fold only
  hide once the script runs (`html.rv-ready`), so a failed script hides nothing. Sections get `.off` offscreen (CSS
  loops pause); `html.still` pauses everything (WCAG 2.2.2); reduced motion shows the final state.
- **Cost:** page JS 3.0 KB gz at the hero slice (fit 1.7, motion 0.5, pause 0.4, band 0.3). The accordion reads one
  bounding box per visible block per frame (before any write), never per letter.
- **Entrances under a stored pause:** `.still *` pauses every animation, which would freeze an entrance on its hidden first
  frame; entrances carry `.rise` / `.enter` and show their final state when paused (`global.css`, `e2e/pages.spec.ts`).

## Imagery

- **Tool marks:** Simple Icons, one colour (`currentColor`), unaltered, always with the name; nominative use only.
- **Product media:** real recordings of the real UI only; "Video soon" stand-ins are logged placeholders.
- **Photos:** the owner's own. No stock or AI people, no fake screenshots.
- **Grain:** one fixed SVG-noise layer at 13% overlay; never lowers text below AA (axe checks all themes).

## Accessibility

- WCAG 2.2 AA in all three themes (axe in e2e). Visible 3 px focus; nothing under the sticky header.
- A visible label starts the accessible name (2.5.3): the mark reads "Mateusz Muszarski, home", codes read "PL Polski".
- Fitted and split text exposes one accessible name; decorative copies (`decorative`) are `aria-hidden`.
- Targets ≥ 40 px in the header, ≥ 44 px elsewhere on touch.

## Do / Don't

| Do | Don't |
| --- | --- |
| One face, the width axis for hierarchy | A second display family, faux bold, tracking hacks |
| Flat fields, hard offset shadows, grain | Gradients, glows, glassmorphism, blur shadows |
| Fit at build time, animate after load | Fit with JS on the LCP path, fade the H1 |
| Marks with names, in context | A wall of coloured logos without names |
| Many small loops, all pausable and offscreen-aware | Loops that run unseen or ignore the pause button |
| Same content on phones, tap twins for every hover | Hover-only reveals, cursor effects, scroll-jacking |
| Native cursor always [user 2026-10-05: "we not building custom cursor"] | Replacing or hiding the cursor, a follower blob, cursor labels |
| Avoid: custom cursor, magnetic everything, "Hello" preloader, text scramble, typewriter hero, skill bars, floating 3D laptop, purple AI gradients | — |
