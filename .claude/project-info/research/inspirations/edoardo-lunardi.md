# Edoardo Lunardi — Creative Web Engineer / Senior Frontend Developer (Vienna)

- **Live:** https://www.edoardolunardi.dev/
- **Awwwards:** https://www.awwwards.com/sites/edoardo-lunardi — **Site of the Day, Nov 22, 2025**. SOTD **7.18** (Design 7.03 · Usability 6.84 · Creativity 7.82 · Content 7.48). Developer **7.35** (Semantics 6.8 · Animations 7.8 · Accessibility 6.4 · WPO 8.2 · Responsive 7.6 · Markup 6.8).
- **Role:** "Senior Frontend Developer, web & design enthusiast. From Italy, based in Vienna" (Awwwards). On-site: "Creative Web Engineer with nearly a decade of experience… Sanity Pioneer 2026, and Awwwards jury member" (self-reported).
- **Tech (Awwwards):** Next.js, Tailwind, Sanity. Project pages list the stack per project (e.g. Prism: Vercel, Sanity, Astro).

## Practicality verdict
**Practicality 5/5 · Wow 4/5** — usable at **0.7 s** desktop / **0.8 s** throttled mobile [measured]; projects **1 click** (Works) or 0 (Work Gallery dock already on screen); contact **0 clicks** (✉ icon = `mailto:`, "get in touch directly" in About window); mobile **works**; weight **0.37 MB at load** but **10.5 MB after 5 s idle** on desktop (228 `<video>` previews in the gallery dock) / 3.3 MB mobile [measured]. Best combo of "developer-native wow" + instant usability in this sample; the only blemish is eager video loading.

## Visual style
- **Desktop-OS metaphor**: dark charcoal UI chrome, floating draggable "windows" (About, Featured Article, Featured Experiment, Showreel, Build Notes) with close buttons, a bottom dock ("Work Gallery") of thumbnails, desktop "file" icons top-left.
- Background: a **1-bit dithered WebGL field** (halftone dot clouds, slowly drifting) — monochrome, lightweight, unmistakably "made by an engineer".
- Type: neutral grotesk for UI + monospace for window titles and data tables. Palette black/white/grey only; colour comes from project thumbnails.
- Top bar: Home / Works / Blog / Lab / Awards + **keyboard-shortcut chips** (E-mail, T-heme, M-ute, C-ursor, K-search) + **"● AVAILABLE"** + live local time "[VIE]".

## Navigation
- Always-visible top bar with real routes: `/works`, `/blog`, `/lab`, `/awards`; **per-project URLs** `/works/<slug>` (21 works + open-source) [measured].
- Works page = **Finder-style file browser**: folder list left, detail pane right with a credits table **[CLIENT] [BRANDING] [DESIGN] [DEVELOPMENT] [YEAR] [STACK] [LINK]** + description + image grid (desktop-2 shot).
- Search (⌘K-style "K") and keyboard shortcuts — power-user affordances that double as a skill signal.

## How projects are shown
Thumbnail dock on the home → per-project page with honest credits (who designed vs who developed), stack, live link, short description, screenshot grid. Plus blog posts (technical: "A video resolution ladder in Sanity with a custom field and Cloudflare R2") and a Lab (e.g. "WebGPU Media Transition").

## Mobile
Works. Same windows stacked vertically (About opened by default), "Open Menu" text button top-right, Work Gallery dock pinned bottom. Dithered background kept. No overflow [measured].

## Preloader / weight [measured]
No preloader. Desktop: DCL 0.5 s, load 0.7 s, 0.37 MB (JS 0.25 MB) at load; after 5 s idle **10.5 MB / 245 requests**, ~9.6 MB of it video from the gallery dock. Mobile: 3.3 MB (2.5 MB video).

## Steal
- **OS/window metaphor with real routes underneath** — playful, explorable, but every window is also a URL/section; nothing is hidden behind a 3D scene.
- **Credits table per project** with explicit `[DEVELOPMENT] <me>` vs `[DESIGN] <others>` + `[STACK]` — exactly what a hiring manager needs, and honest about team work.
- **Status chip "● AVAILABLE" + local time + timezone** in the persistent bar.
- **Blog + Lab** of technical write-ups → proves depth beyond visuals (great for a job hunt).
- **Keyboard shortcuts / command palette** as a craft signal that costs ~nothing.

## Skip
- Auto-loading hundreds of video previews (9.6 MB) — use poster images + play on hover/in-view only.
- Low-contrast grey labels in the dock (accessibility scored 6.4).

Screenshots: `img/edoardo-lunardi-desktop.jpg`, `img/edoardo-lunardi-desktop-2.jpg` (Works file browser, /works/prism), `img/edoardo-lunardi-mobile.jpg`.
