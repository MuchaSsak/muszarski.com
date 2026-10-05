# Hiroto Sato: creative developer (Tokyo)

- **Live:** https://www.hirotos.com/
- **Awwwards:** https://www.awwwards.com/sites/hiroto-sato. **Site of the Day, Jul 17, 2026.** SOTD **7.24** (Design 7.08 · Usability 7.25 · Creativity 7.48 · Content 7.33). Developer score **7.05** (Semantics 7.0 · Animations 7.2 · Accessibility 6.6 · WPO 7.2 · Responsive 6.8 · Markup 7.4).
- **Role:** "a creative developer based in Japan, crafting interactive websites through design, 3D visuals, and motion" (Awwwards). On the site: "FOCUS: creative development / motion / 3D modeling".
- **Tech (Awwwards):** WebGL, GSAP, Blender.

## Practicality verdict
**Practicality 3/5 · Wow 4/5.** A short text preloader (`.preloader__text`) runs, then the nav becomes usable at **7.3 s** desktop / **11.8 s** throttled mobile [measured]. Projects: **1 click** (PROJECTS in the HTML nav, or the blue "PROJECTS ARCHIVE" sign in 3D). Contact: **1 click** (`/contact`; no `mailto:` on the home). Mobile: **works well**, the same scene recomposed vertically. Weight: **3.2 MB** (2.3 MB 3D, JS 0.71 MB) [measured]. One of the cleanest "immersive but navigable" setups, held back only by the time to first click.

## Visual style
- Bright white studio void with a single **chrome street pole** carrying Tokyo-style signage, modelled in Blender: a yellow name plate "HIROTO SATO", a round dark LCD sign "showreel ▶ start / option", a blue arrow sign "PROJECTS ARCHIVE / PR…" with scrolling text, and a **yellow traffic light** whose lamps change colour (cyan "go").
- Chrome reflections pick up a sky/city HDRI (desktop-2 after scroll: the pole rotates and the mirror shows clouds and buildings).
- Swiss UI around it: small grey caps "CREATIVE DEVELOPER", big black "HIROTO SATO", and a three-column footer with hairline rules (BASE / FOCUS / INDEX).

## Navigation
- **Two layers of nav**: diegetic (the 3D signs *are* the menu: showreel, projects archive) **and** a plain HTML nav top-right (HOME · PROJECTS · ABOUT · CONTACT), fixed on scroll [measured].
- Real routes: `/projects`, `/about`, `/contact` [measured].
- Scroll or drag rotates the pole and focuses a different sign.

## How projects are shown
The Projects archive route is linked from both the sign and the nav. The showreel sits on the LCD sign.

## Mobile
Works: the pole fills the portrait viewport, the nav is stacked right, the footer meta stacks. It's the same scene composed for portrait, not a cropped desktop.

## Preloader / weight [measured]
Text preloader, then 3D. DCL 1.4 s, load event 7.0 s (models). 27 requests, 3.2 MB.

## Steal
- **Diegetic navigation with a plain-HTML twin**: the 3D object is the menu, and an ordinary text nav does the same job for everyone else (keyboard, screen reader, impatient recruiter).
- **One hero object that carries your identity** (your name on a sign, your city's visual language), instead of a whole world.
- **Footer meta row** BASE / FOCUS / INDEX: a three-cell facts strip.
- **Portrait-specific composition** of the same 3D scene for mobile.

## Skip
- A preloader before any input. Render the HTML nav immediately and stream the 3D in.
- Contact only on a sub-page.

Screenshots: `img/hiroto-sato-desktop.jpg`, `img/hiroto-sato-desktop-2.jpg` (after scroll, pole rotated, mirror reflections), `img/hiroto-sato-mobile.jpg`.
