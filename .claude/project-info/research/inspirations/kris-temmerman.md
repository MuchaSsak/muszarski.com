# Kris Temmerman ("Stuff by Kris Temmerman"): graphics developer (Antwerp, BE)

- **Live:** https://neuroproductions.be/
- **Awwwards:** https://www.awwwards.com/sites/stuff-by-kris-temmerman. **Site of the Day, Mar 20, 2026.** SOTD **7.32** (Design 7.24 · Usability 6.92 · Creativity 8.03 · Content 7.44). Developer score **7.33** (Semantics 6.6 · **Animations 9.0** · Accessibility 6.4 · WPO 7.8 · Responsive 7.8 · Markup 6.0). Awwwards description: "It's a Portfolio! It's a Game!"
- **Role:** on-site "A GRAPHICS DEVELOPER", "some kind of portfolio". Company: Neuro Productions Comm. V. (from the fallback page).
- **Tech (Awwwards):** WebGL, GSAP. In practice the site **requires WebGPU** (see below).

## Practicality verdict
**Practicality 1/5 · Wow 4/5.** In a browser **without a WebGPU adapter** (Playwright's bundled headless Chromium, even with WebGPU flags) the site shows **"Sorry! Can't make the WebGPU adapter I need :("**. That fallback is a text page with email, phone and address, which is the only HTML content [measured]. With a real GPU (system Chrome + RTX 2060) it renders a "choose your HERO!" character-select game. On **portrait mobile it asks you to "Turn your Device"** (landscape-only) [measured]. There are **no HTML links** on the rendered page [measured]. Projects: inside the game. Contact: only in the fallback text. Weight: **0.19 MB at load → 7.2 MB** (2.4 MB 3D, about 7 MB binary) [measured]. Text and links never became hit-testable in my probe (0 `<a>`) [measured].

## Visual style
- Loud, comic, self-deprecating: **dripping slime-green 3D wordmark** "KRIS TEMMERMAN", a handwritten "some kind of Portfolio", a **"choose your HERO!" 3D box-letter sign**, and two characters: a doodled egg-pirate and a paper cut-out of Kris's own face distorted onto a stick body ("A GRAPHICS DEVELOPER"), with RGB-split glitch.
- Snowy grey studio floor, soft shadows, film grain, pink handwritten annotations with arrows.

## Navigation
Game-style character select → game. No menu, no URLs, no HTML links [measured].

## How projects are shown
Within the game (not explored further).

## Mobile
**Blocked in portrait**: a yellow "Turn your Device" message over the rotated scene. Landscape is required.

## Preloader / weight [measured]
DCL/load 0.5 s for a 0.19 MB shell, then about 7 MB of GPU assets stream in. Without WebGPU the site stops at the fallback.

## Steal
- **Self-aware humour and a personal character**. Recruiters remember a personality, and this one costs nothing in a small dose (an illustrated avatar, handwritten annotations).
- **A graceful fallback that still shows contact details** when the fancy renderer can't run. Do this, but put the projects in the fallback too.

## Skip
- **A hard WebGPU requirement** with no WebGL2/HTML path to projects.
- Forcing landscape on phones.
- No HTML navigation or links at all.

Screenshots: `img/kris-temmerman-desktop.jpg` (GPU Chrome: choose-your-hero), `img/kris-temmerman-desktop-2.jpg`, `img/kris-temmerman-mobile.jpg` ("Turn your Device"). The no-WebGPU fallback ("Sorry! Can't make the WebGPU adapter I need") was captured in an earlier software-GL run and recorded as text.
