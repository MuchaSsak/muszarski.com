# Grégory Lallé ('24) — creative developer (Lyon)

- **Live:** https://gregorylalle.com/
- **Awwwards:** https://www.awwwards.com/sites/gregory-lalle-24 — **Site of the Day, Oct 30, 2024**. SOTD **7.48** (Design 7.59 · Usability 7.27 · Creativity 7.53 · Content 7.53). Developer **7.57** (Semantics 7.4 · Animations 8.0 · Accessibility 6.6 · WPO 8.2 · Responsive 7.4 · Markup 7.4). Listed in Awwwards' portfolio winners (https://www.awwwards.com/websites/winner_category_portfolio/).
- **Role:** "creative developer based in Lyon, France" (Awwwards); About: "Freelance creative developer focused on animations and user interactions".
- **Tags (Awwwards):** Animation, Minimal, Portfolio, Transitions, About Page.

## Practicality verdict
**Practicality 4/5 · Wow 3/5** — text and nav usable at **~0.5 s** desktop / **0.6 s** throttled mobile [measured; my automatic probe skipped the nav because inactive links are styled at 32 % opacity — a manual click on "About" at 3 s navigated to `/about`]; projects **0 clicks** (the home is the works index); contact **0 clicks** ("Contact" in the header is a `mailto:`); mobile **works**; weight is heavy: **4.4 MB at load, 14.9 MB after scroll** (3.9 MB images + 10.7 MB video previews), load event 7.8 s / 41 s across two runs [measured].

## Visual style
- **Swiss/International minimalism**: white page, near-black grotesk, a single giant headline that is literally the current nav item with a trailing comma — "Works," / "About," — while the other items sit small and grey beside it ("About, Contact").
- Big numerals (01, 05, 06, 07) as section counters; grids of project screenshots/video in grey mats.
- Centre column: a vertical project index (ORAGE, QUECHUA SS25, … FIRM) with a ◀ marker that tracks the project in view.

## Navigation
- Header = 3 words (Works, About, Contact) — the active one becomes the H1. Real routes (`/`, `/about`), project anchors `/focus#<project>` (focus view) [measured].
- About page = **BIO · SELECTED CLIENTS (one paragraph) · AWARDS table (Awwwards / CSSDA / FWA per client)** + email top-right + "Available Q1 2026." bottom-left (see desktop-2 note).

## How projects are shown
Scroll-synced grid: left/right image clusters per project, centre index highlights the current one; clicking opens a focus view. Visual-first; little text about role/stack.

## Mobile
Works: header "Grégory Lallé — Works, About, Contact" top, index list right-aligned, images stack left. 5.6 MB [measured].

## Preloader / weight [measured]
No preloader. DCL 0.5 s; load event late (7.8 s) because ~15 `<video>` + full-res images load eagerly.

## Steal
- **"Nav word becomes the headline"** typographic system — zero JS, instantly memorable, keeps wayfinding obvious.
- **Scroll-synced project index** (marker follows the project in view) — cheap, helps scanning.
- **Awards/recognition as a compact table per project** on About.
- **Availability quarter** ("Available Q1 2026") as a footer constant.

## Skip
- Eager video + full-size images (≈15 MB) — lazy-load, posters, AVIF.
- Inactive nav at 32 % grey — low contrast (a11y 6.6).

Screenshots: `img/gregory-lalle-desktop.jpg`, `img/gregory-lalle-desktop-2.jpg` (scroll: index marker on MOODERS), `img/gregory-lalle-mobile.jpg`.
