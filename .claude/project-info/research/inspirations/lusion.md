# Lusion v3 — 3D/WebGL studio (craft reference, not a personal portfolio)

- **Live:** https://lusion.co/
- **Awwwards:** https://www.awwwards.com/sites/lusion-v3 — **Site of the Day, Oct 2, 2023**; also appears on Awwwards' Sites of the Month (https://www.awwwards.com/websites/sites_of_the_month/?page=2) and Sites of the Year (https://www.awwwards.com/websites/sites_of_the_year/) listings. SOTD **8.25** (Design 8.26 · Usability 7.95 · Creativity 8.65 · Content 8.26). Developer **8.41** (Semantics 7.6 · **Animations 10.0** · Accessibility 7.4 · WPO 9.0 · Responsive 8.4 · Markup 7.8) — the highest scores in this sample.
- **Owner:** Lusion (studio). Included as max-1-of-3 studio craft reference.
- **Tags (Awwwards):** Animation, Clean, 3D, About Page.

## Practicality verdict
**Practicality 3/5 · Wow 5/5** — numeric **preloader (000→100)** with morphing white tiles; first usable desktop link at **7.3 s**; on throttled mobile the header **menu button is tappable at 0.7 s** even while loading [measured]; projects **1 click** (MENU → Projects, `/projects/<slug>` URLs); contact **0 clicks** ("LET'S TALK" pill + `mailto:` in header); mobile **works**; weight **7.5 MB at load → 14.3 MB** desktop (6 MB images, 3.7 MB video) / 8.6 MB mobile [measured].

## Visual style
- Pale lavender-white page (#eef0fa-ish), black grotesk headline "We create 3D visual storytelling and interactive web experiences that help brands stand out".
- Hero 3D is **contained in a rounded card**, not full-bleed: physics-driven glossy/matte cross-shaped "jacks" in electric blue, black and white tumbling in a dark box, reacting to the cursor.
- Scroll: giant type ("Brought to Life", "PLAY REEL") sweeps across, a blue ribbon path, duotone-blue project mockups.
- Header pills: "—" (sound), **LET'S TALK ●** (dark), **MENU ••** (light) — fixed on scroll [measured].

## Navigation
Fixed header with two pill buttons; MENU opens HOME / ABOUT US / PROJECTS / CONTACT / LABS. Real routes per project (`/projects/oryzo_ai`, `/projects/devin_ai`, …) [measured].

## How projects are shown
Featured project list on home → individual case pages; Labs site for experiments.

## Mobile
Works: same hero card made taller, "••" menu button top-right, "SCROLL TO EXPLORE" with corner "+" marks.

## Preloader / weight [measured]
Preloader with 000→100 counter ~6–7 s on desktop (GPU). 101 requests, 14.3 MB after scroll; JS only 0.46 MB.

## Steal
- **WebGL inside a framed card** in the layout instead of a full-screen takeover — the 3D is a showpiece, the page stays a page.
- **Two-pill header** (primary CTA dark + menu light), fixed — clear hierarchy, thumb-friendly on mobile.
- **Header controls live above the preloader** (menu usable during load on mobile).
- Cursor-reactive physics objects — wow that doesn't block anything.

## Skip
- Counter preloader of several seconds; 7.5 MB before the load event.

Screenshots: `img/lusion-desktop.jpg`, `img/lusion-desktop-2.jpg` (scroll: "Brought to Life" type + ribbon), `img/lusion-mobile.jpg`. (Earlier software-GL run captured the 000→100 tile preloader.)
