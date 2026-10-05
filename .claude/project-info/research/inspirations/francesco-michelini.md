# Francesco Michelini (Folio23): independent creative developer, Modena (IT)

- **Live:** https://www.francescomichelini.com/
- **Awwwards:** https://www.awwwards.com/sites/francesco-michelini-folio23. **Site of the Day, Dec 19, 2023.** SOTD **7.29** (Design 7.40 · Usability 6.98 · Creativity 7.49 · Content 7.36). Developer score **7.53** (Semantics 7.6 · Animations 8.0 · Accessibility 7.2 · WPO 7.6 · Responsive 7.6 · Markup 7.0). Design by Unlearn Studio. Also on Awwwards' portfolio-winners listing (https://www.awwwards.com/websites/winner_category_portfolio/).
- **Role:** "Italian freelance creative developer" (Awwwards). The site says "independent creative developer focusing on 3D / interaction / smooth animations… working remotely worldwide".
- **Tags (Awwwards):** Fullscreen, Portfolio, Transitions, About Page, Project Page, 404 pages.

## Practicality verdict
**Practicality 3/5 · Wow 3/5.** Text at 0.5 s, but the nav only becomes clickable at **5.5 s** desktop / **9.1 s** throttled mobile [measured], because the entry animation (scrambled-letter text decode + reveal) blocks it. Projects: **0 clicks** (the home *is* a project slider; the wheel advances it). Contact: **1+ click** (INFO page; no `mailto:` on the home [measured]). Mobile: **degraded**. The layout clips at the right edge ("MENU" button and project title cut off in the screenshot). Weight: **0.44 MB** [measured], very light.

## Visual style
- Dark charcoal background (desktop) with a warm bone/cream foreground. A random or alternate theme on mobile showed sage-green + coral (theme toggle in the header).
- A custom **slanted, stencil-like wordmark** ("MCLN"-style ligature logo) with `////////` hatch rules. Monospace uppercase body. A big "FOLIO /2023" label in a display mono.
- Project media in a wide letterbox frame with a distortion/displacement shader on hover/transition.
- Text effect: characters scramble/decode on load ("FRANCESZM MICHELITO…" mid-animation).

## Navigation
- Fixed header: PROJECTS · INFO · theme toggle (the header stays fixed after scroll [measured]). The footer has a numbered mini-nav "0 HOME / 1 PROJECTS / 2 INFO".
- Home = **fullscreen project slider** (PREV / progress ticks / NEXT; the mouse wheel moves to the next project, see desktop-2 = P/03 Heights Agency).
- **Per-project URLs** exist (`/projects/kode-immersive` …).

## How projects are shown
One project per screen: index **P/01**, big title, "VISIT ↗", and a **meta row: YEAR · AGENCY · ROLE · AWARDS** (e.g. "Malvah Studio // WebGL development / front-end development // SOTD / Developer Award / HM"). This states the developer's role inside an agency team clearly.

## Mobile
Degraded. The content renders, but the right edge clips (MENU button and project title cut off), and the scramble intro delays the first usable tap to about 9 s on throttled mobile [measured]. The WebGL frame still renders.

## Preloader / weight [measured]
No loading screen. Entry choreography of about 5 s before clicks register. Desktop 0.39 MB at load (JS 0.20 MB), 0.44 MB total, load event 0.6 s.

## Steal
- **Role + agency + awards meta row per project.** It frames agency work honestly ("I did WebGL + FE at X").
- **Numbered mini-nav (0/1/2)** and a **P/01 index**: a cheap, techy system feel.
- **Theme toggle** that swaps the whole palette.

## Skip
- Text-scramble intros that block input for 5–9 s.
- No contact on the home screen.
- Mobile layout that clips horizontally. Test at 390 px.

Screenshots: `img/francesco-michelini-desktop.jpg`, `img/francesco-michelini-desktop-2.jpg` (wheel → P/03 slider), `img/francesco-michelini-mobile.jpg`.
