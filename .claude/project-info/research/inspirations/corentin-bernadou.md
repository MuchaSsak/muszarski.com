# Corentin Bernadou — freelance developer (France)

- **Live:** https://corentinbernadou.com/
- **Awwwards:** https://www.awwwards.com/sites/corentin-bernadou-portfolio — **Site of the Day, Mar 25, 2026**. SOTD **7.42** (Design 7.51 · Usability 7.10 · Creativity 7.64 · Content 7.61). Developer **7.53** (Semantics 7.6 · Animations 8.2 · Accessibility 6.6 · WPO 8.0 · Responsive 7.2 · Markup 7.2).
- **Role:** "a freelance developer crafting animation-driven interactive experiences" (Awwwards).
- **Tech (Awwwards):** WebGL, GSAP, JavaScript. Tags: Clean, Infinite Scroll, Typography, UI design.

## Practicality verdict
**Practicality 2/5 · Wow 4/5** — the page *looks* ready at ~1.5 s, but **clicks don't register until ~23.6 s** desktop / ~26 s throttled mobile in my probe: during the intro `<html>` carries `lenis-stopped` and hit-testing returns the root element, and a real click on "Archive" at ~6 s did **not** navigate [measured]. Projects **0 clicks** once live (titles + cube on landing, `/work/<slug>` URLs); contact **≥1 click** (no `mailto:` on the home [measured]; "Available Oct. 2026" label only); mobile **works** visually; weight **1.2 MB at load, 3.5 MB total** (JS 0.78 MB, images 2.3 MB) [measured].

## Visual style
- Black canvas, **editorial-magazine framing**: pixel rulers along top/left edges, "1440px × 900px" viewport readout, "Issue N°003 / Coll. 2026 · Ref. EDI-032026-R02" catalogue codes.
- Hero: a **WebGL Rubik's-cube made of project photos** rotating/scrambling, over a giant **orange-red "FW" (Featured Works)** grotesk that bleeds off the bottom.
- Right edge: an endlessly repeating list of project titles (infinite scroll). Small grey grotesk UI.

## Navigation
- Header (fixed after scroll [measured]): **Featured Works, Archive, About** + "Available Oct. 2026".
- Real routes: `/`, `/archive`, `/about`, `/work/<slug>` (6 featured) [measured].

## How projects are shown
Photos mapped onto cube faces + an infinite title list; detail page per work. Mostly fashion/editorial client imagery (motion portraits, Issey Miyake SS25).

## Mobile
Works: centred nav, titles as a wrapped paragraph, cube below, giant "FW" at the bottom. Same 3.5 MB [measured].

## Preloader / weight [measured]
No loader screen — content is visible immediately — but interaction is locked for ~20+ s during the intro choreography (scroll stopped, clicks swallowed). JS 0.78 MB.

## Steal
- **Spec-sheet / catalogue framing** (rulers, viewport size readout, issue/ref codes) — a dev-flavoured editorial identity at zero cost.
- **One hero 3D object built from your own project imagery** (cube of thumbnails) — wow tied to content, not decoration.
- **Availability month in the header.**

## Skip
- **Visible-but-dead UI**: never lock pointer/scroll during an intro; if you must, show it and keep it under ~1 s.
- No direct contact on the landing.

Screenshots: `img/corentin-bernadou-desktop.jpg`, `img/corentin-bernadou-desktop-2.jpg` (after scroll), `img/corentin-bernadou-mobile.jpg`.
