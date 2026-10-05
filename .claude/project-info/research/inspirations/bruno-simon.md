# Bruno Simon: Bruno's Portfolio (folio 2025), creative developer & three.js educator (France)

- **Live:** https://bruno-simon.com/ · source: https://github.com/brunosimon/folio-2025 (MIT license per on-site link)
- **Awwwards:** https://www.awwwards.com/sites/brunos-portfolio. **Site of the Day, Jan 21, 2026.** SOTD **8.11** (Design 8.05 · Usability 7.83 · Creativity 8.62 · Content 8.18). Developer score **7.65** (Semantics 7.0 · Animations 8.6 · Accessibility 6.6 · WPO 8.2 · Responsive 8.2 · Markup 6.8). It also appears on Awwwards' **Sites of the Month** listing (https://www.awwwards.com/websites/sites_of_the_month/) and the **portfolio winners** listing (https://www.awwwards.com/websites/winner_category_portfolio/). The individual page only shows the SOTD badge, so I can't confirm the exact month or label for those listings. The earlier 2019 portfolio (`bruno-simon-portfolio`) appears on the Awwwards Sites of the Year and Sites of the Month listings.
- **Role:** creative developer, author of the Three.js Journey course (linked in-page).
- **Tech:** Awwwards lists WebGL, GSAP, Three.js. The repo/README and in-page credits add Three.js TSL, Rapier physics, Howler.js audio, Vite, gltf-transform/KTX2 compression. There's a "Server connected" multiplayer presence and Discord links.

## Practicality verdict
**Practicality 1/5 · Wow 5/5.** **No HTML navigation or contact in the landing view.** There are 0 visible links, and the only DOM links are credits, GitHub and Discord inside overlays [measured]. The scene reveals in about 10 s (GPU) with a hand-lettered "CLICK TO START 🔊". My automated clicks started the world only intermittently, after about 20 s. Once inside, you drive a car with the keyboard. A **hamburger + map-pin** pair top-right opens a menu of *home · options · controls · achievements · circuit · whispers · behind the scene* [measured: button data-names]. None of those is labelled "projects" or "contact". The two corner buttons have **no accessible names** [measured]. Projects: in-world, reached by driving. Contact: not on the landing (Linktree/Discord inside overlays). Mobile: **renders** the same scene and "click to start". I didn't verify the touch controls. Weight: **1.3 MB at load → 7.4 MB** (6.1 MB binary/textures, 1 MB `.glb`, JS 1.2 MB) on both desktop and mobile [measured].

## Visual style
- A low-poly, toy-like **isometric diorama**: chunky red off-road truck, cherry-blossom trees with stylised particle foliage, lanterns, a park bench, 3D extruded "BRUNO SIMON" letters you can knock over, and water with a glow.
- Day/night and seasonal palette cycles (orange dusk, purple night) per the README's weather/day-cycle systems. The start screen is a circular reveal on a purple dotted grid.
- Hand-drawn "Amatic SC" lettering + Nunito UI. Physics-driven fun: the car flips and the letters scatter.

## Navigation
- Diegetic (drive to areas) plus a fixed hamburger and map-pin in the top-right corner after start.
- No URLs per area or project. Everything is one `/` [measured].

## How projects are shown
Inside the world, as places or boards you drive to (not inspected in depth). Third-party credits and source code are linked openly.

## Mobile
It works as a scene on mobile, and the same 7.4 MB is shipped. There's no blocking message [measured], but for a recruiter on a phone the start-gate-plus-drive interaction is a high bar.

## Preloader / weight [measured]
DCL/load 1.2 s with 1.3 MB of JS-heavy payload. Then about 6 MB of world data streams in. The circular reveal plus "click to start" adds about 10 s before interaction on a GPU desktop.

## Steal
- **A persistent menu/map button inside the immersive scene**: an always-available exit from the game layer.
- **Open-sourcing the portfolio** (GitHub link in-page): a developer-credibility signal recruiters can actually inspect.
- **Physics "toy" moments** (knock-over letters) as delight, which could live in a small hero instead of a whole world.
- **Asset discipline**: KTX2/Draco/gltf-transform compression keeps a full world at about 7 MB.

## Skip
- A whole-site game as the only interface, with no projects/contact in HTML.
- Unlabelled icon buttons (no `aria-label`).
- A start gate ("click to start") before any information appears.

Screenshots: `img/bruno-simon-desktop.jpg` (start screen, about 10 s), `img/bruno-simon-desktop-2.jpg` (after start: world, truck, hamburger + map pin), `img/bruno-simon-mobile.jpg`.
