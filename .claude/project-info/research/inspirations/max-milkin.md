# Max Milkin: front-end / React developer (design by Olha Lazarieva)

- **Live:** https://www.maxmilkin.com/
- **Awwwards:** https://www.awwwards.com/sites/max-milkin-portfolio. **Site of the Day, Dec 13, 2025.** SOTD **7.21** (Design 7.19 · Usability 7.04 · Creativity 7.50 · Content 7.19). Developer score **7.70** (Semantics 7.6 · Animations 8.4 · Accessibility 7.8 · WPO 7.4 · Responsive 7.6 · Markup 7.6). Its accessibility score of 7.8 ties for the highest in my 42-page Awwwards sample (with Eduard Bodak).
- **Owner/credits:** Olha Lazarieva (design, PRO) + Max Milkin. The preloader letters spell "REACT DEVELOPER / FRONTEND".
- **Awwwards description:** "A **performance-first developer portfolio** blending precision and storytelling. Minimal, fast, and fluid…"
- **Tech (Awwwards):** Three.js, React, Blender. Tags: Parallax, Typography, 3D, UI design.

## Practicality verdict
**Practicality 2/5 · Wow 4/5.** Despite the "performance-first" description: a **letter-scatter preloader** (`.pixi-loader`) gates the site. First usable nav at **11.5 s** on desktop. On throttled mobile, text appears at 5.1 s but **no usable link within 30 s** [measured]. An unthrottled mobile screenshot at about 9 s was still a blank sage screen. Projects: **1 click** (WORKS anchor; per-project routes like `/klausen`, `/mosaic` exist). Contact: **1 click** (CONTACT anchor, `mailto:` + LinkedIn/Telegram/WhatsApp). Mobile: **degraded** (very slow to first content). Weight: **0.55 MB at load → 5.3 MB** (2.8 MB 3D models, 1.5 MB images, JS 0.72 MB) [measured].

## Visual style
- Muted **sage-green / charcoal** palette, small condensed grotesk caps, lots of negative space.
- Preloader: hundreds of individual letters scattered in a spiral that assemble into words (percentage counter on mobile).
- Hero: a photoreal **3D stone** lit like a product shot, captioned "MINIMALISM IS NOT EMPTINESS, IT'S ESSENCE."
- About: a dark section with a big outlined word, a B/W portrait and letters falling into place (text-scramble). A circular tick-mark clock widget, and "EDITION_2.0" / "[N.002]" catalogue labels.

## Navigation
- Fixed header [measured]: ABOUT · AWARDS · WORKS · EXPERTISE · CONTACT (anchors + `/about`). Hover doubles letters ("A B O U T").
- Single long page (~10 screens) plus project sub-routes.

## How projects are shown
Works section linking to per-project routes (`/yevgeniyagrab`, `/klausen`, `/beautyinstem`, `/olhalazarieva`, `/twocapitalsstudio`, `/mosaic`, `/raine`) [measured].

## Mobile
Degraded: the preloader plus 3D scene leaves a blank screen for many seconds on mobile. Content (header, contacts) eventually renders: the page text includes LinkedIn/Telegram/WhatsApp/email.

## Preloader / weight [measured]
Preloader about 10 s on desktop (GPU), more than 30 s to an interactive link on throttled mobile. 36 requests, 5.3 MB, 2.8 MB of it `.glb`/binary 3D.

## Steal
- **Calm, restrained palette with one hero 3D object**: classy, not noisy.
- **Catalogue microlabels** ("EDITION_2.0", "[N.002]", "(ABOUT.)") as cheap typographic texture.
- **Several contact channels** (email, LinkedIn, Telegram, WhatsApp) in one block.

## Skip
- A typographic preloader that gates navigation. This site is the clearest case in the sample where the brief ("performance-first") and the measured experience diverge.
- Photoreal 3D models on the critical path for mobile.

Screenshots: `img/max-milkin-desktop.jpg` (3D stone hero, GPU run), `img/max-milkin-desktop-2.jpg` (about section, letters falling), `img/max-milkin-mobile.jpg` (blank sage screen at about 9 s). An earlier software-GL run captured the letter-scatter preloader on both desktop and mobile (86 %).
