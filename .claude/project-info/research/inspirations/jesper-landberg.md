# Jesper Landberg — design engineer (Sweden)

- **Live:** https://jesperlandberg.com/
- **Awwwards:** https://www.awwwards.com/sites/jesper-landberg-4 — **Site of the Day, Sep 29, 2026**; page states "This site has been nominated for the Portfolio Honors". SOTD **7.73** (Design 7.72 · Usability 7.52 · Creativity 8.04 · Content 7.77). Developer **8.17** (Semantics 7.6 · Animations 9.0 · Accessibility 7.0 · WPO 8.6 · Responsive 8.4 · Markup 8.0) — highest dev score among the personal portfolios I sampled.
- **Role:** "Swedish design engineer building visually rich, motion-driven websites" (Awwwards). Site copy: "named Awwwards Independent of the Year in 2022 and 2024… usually lead or sole developer, responsible for front-end architecture, animation, interaction and CMS" (self-reported).
- **Tech (Awwwards):** GSAP, Three.js, Nuxt.js. Tags: Infinite Scroll, Animation.

## Practicality verdict
**Practicality 4/5 · Wow 5/5** — usable at **1.2 s** desktop / **5.5 s** throttled mobile [measured]; projects **0 clicks** (the landing *is* the project carousel, each card links to `/projects/<slug>`); contact **1 click** (PROFILE modal holds email + socials); mobile **works** (purpose-built vertical list); weight is the problem: **0.43 MB at load → 33.7 MB after 6 s idle** desktop (26 MB video textures, 6.5 MB 3D/binary) and **18.8 MB** on mobile [measured]. Usable fast because nothing waits for the heavy assets — they stream in behind a working UI.

## Visual style
- Pure black void with a **perspective floor grid** (thin grey lines receding to a horizon) — a "virtual showroom".
- Projects are **curved, bent video screens** (like a cylindrical cinema wall) floating on the grid; the carousel scrolls horizontally on wheel/drag with inertia; the active card faces the camera.
- Minimal UI chrome in 4 corners: JESPER LANDBERG (top-left), PROFILE (top-right), FEATURED / FULL (bottom-left), NEWSLETTER (bottom-right). Small caps grotesk, white on black. Palette: #000 / #fff only (Awwwards palette).

## Navigation
- Four-corner fixed UI, always visible. Each project card is a real link: `/projects/nathan-riley`, `/projects/casa-di-solare`, … (8 featured) [measured].
- **FEATURED / FULL toggle**: `/full` = "Full index — every project" (list view) — the escape hatch from the 3D carousel.
- PROFILE opens a modal (Awwwards element: "Home to profile — Modal/Popup"); project ↔ project transitions are WebGL (Awwwards elements "Home to project detail", "Project to project").
- Bonus: **`/llms.txt`** with sections "When to use this / Not the right referral for / What the work is made of / How to call / Work" — a machine-readable CV for AI assistants.

## How projects are shown
Each project = looping video playing *on* the bent 3D card (live preview of the actual site), title + arrow; detail page per project.

## Mobile
Works, different layout: a **vertical stack of rounded video cards** (no 3D floor), same corner UI (name / PROFILE top, FEATURED / FULL / NEWSLETTER bottom). Still streams ~11 MB of video [measured].

## Preloader / weight [measured]
No preloader; DCL 1.2 s, load 1.2 s. JS only 0.36 MB. Heavy media after load: 33.7 MB desktop / 18.8 MB mobile within ~6–10 s idle, 97 requests.

## Steal
- **Escape hatch next to the spectacle**: FEATURED (3D carousel) / FULL (plain index) toggle, always visible.
- **Project cards are links with real URLs** even inside a WebGL scene → shareable, crawlable, back-button safe.
- **Four-corner minimal chrome** that survives every view and every breakpoint.
- **Different mobile composition** (vertical list) instead of shrinking the 3D scene.
- **`llms.txt` "machine CV"** — near-zero cost, forward-looking.

## Skip
- Autoplaying high-bitrate video textures for every card (33 MB) — use short low-bitrate loops, poster frames, load only the active ±1 card, pause off-screen.
- Contact only inside a modal — for a job hunt keep an email/CTA visible in the chrome.

Screenshots: `img/jesper-landberg-desktop.jpg`, `img/jesper-landberg-desktop-2.jpg` (after wheel: carousel advanced), `img/jesper-landberg-mobile.jpg`.
