# Samsy — Gen-02 SMSY Portfolio (Samuel Honigstein), creative developer / creative technologist

- **Live:** https://samsy.ninja/
- **Awwwards:** https://www.awwwards.com/sites/gen-02-smsy-portfolio — **Site of the Day, Oct 16, 2025**. SOTD **7.38** (Design 7.42 · Usability 6.95 · Creativity 8.03 · Content 7.25). Developer **7.66** (Semantics 7.0 · Animations 8.8 · Accessibility 7.0 · WPO 8.2 · Responsive 7.6 · Markup 7.2).
- **Role:** on-site "SMSY © 26' — クリエイティブテクノロジスト — Creative development & experience designer, raised on '90s classics".
- **Tech (Awwwards):** WebGL, GSAP, Vue.js. In-page HUD reports **"Engine: WebGPU, Frame: 4.0 ms, 77 FPS, Connected: 1"** (multiplayer presence) [observed].

## Practicality verdict
**Practicality 1/5 · Wow 5/5** — **no HTML links at all** on the page (0 `<a href>`, no `mailto:`) [measured]; first DOM text ~29 s in my desktop probe, nothing interactive detected within 30 s on throttled mobile [measured]; a **controls tutorial** (WASD / arrows / SPACE) with a **SKIP** button greets you; after skipping, an in-world HUD exposes **EXPLORE / WORKS / ABOUT** tabs (buttons, no URLs). Projects ≥2 interactions (skip + WORKS or walk); contact: not found on the landing; mobile **degraded** (scene renders, no visible touch controls or menu in my 10 s capture); weight **9.4 MB** desktop / **11.5 MB** mobile (2.8 MB 3D, 2.2–4.5 MB video) [measured].

## Visual style
- **Neon cyberpunk Tokyo arcade**: near-black space, CRT scan-lines, red glow, holographic signage in Japanese/katakana ("メタバース", "VIRTUAL", "SAVED BY ZEROS & ONES"), project screens (e.g. RTFKT "Public sale 08.367") floating as billboards.
- A cute **ghost/cat avatar with glowing eyes** you steer; red mascot "info" creatures as hotspots.
- UI: red rounded pills (EXPLORE active), red keycap glyphs for controls, debug-style FPS readout top-right, equaliser/sound toggle bottom-right.

## Navigation
- Intro gate: keyboard tutorial → SKIP → world. Then HUD tabs EXPLORE / WORKS / ABOUT; movement with keys; hotspots open project panels.
- No routes: URL stays `/` (one scroll attempt moved to `/tutorial`) [measured]; nothing deep-linkable.

## How projects are shown
Project sites as glowing screens/billboards inside the world; info creatures open details.

## Mobile
Renders the avatar and hotspots in portrait; I saw no on-screen joystick or menu within 10 s; 11.5 MB [measured]. Treat as degraded.

## Preloader / weight [measured]
Glowing-eyes loading state ~8–10 s (desktop, GPU), then tutorial. DCL 1.1 s; 3.1 MB at load → 9.4 MB.

## Steal
- **Engine/FPS HUD as a flex** — a tiny dev-credibility touch (only if numbers are good).
- **Mascot avatar** as a brand character — memorable, can be reused as a favicon/loader.
- **Tutorial with SKIP** — if you gate, at least make the gate skippable.

## Skip
- Zero HTML links / no URLs / no visible contact — unusable for recruiters, invisible to crawlers and screen readers.
- Game controls as the primary navigation.

Screenshots: `img/samsy-desktop.jpg` (WASD tutorial + SKIP), `img/samsy-desktop-2.jpg` (after SKIP: world + EXPLORE/WORKS/ABOUT HUD), `img/samsy-mobile.jpg`.
