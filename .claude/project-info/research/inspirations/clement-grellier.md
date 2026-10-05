# Clément Grellier: front-end developer (Paris)

- **Live:** https://clementgrellier.fr/
- **Awwwards:** https://www.awwwards.com/sites/clement-grellier-portfolio-1. **Site of the Day, May 24, 2025.** SOTD **7.36** (Design 7.33 · Usability 7.19 · Creativity 7.63 · Content 7.48). Developer score **7.69** (Semantics 7.4 · Animations 8.2 · Accessibility 7.2 · WPO 8.0 · Responsive 7.6 · Markup 7.6).
- **Role:** "French front-end developer, based in Paris" (Awwwards). The About page says he graduated from Gobelins, works in custom TypeScript/JavaScript (plus Vue/React), relies on CSS and GSAP, and is an Awwwards judge. Self-listed awards: Awwwards 5 SOTD / 11 HM, FWA 3 FOTD, CSSDA 9 SOTD.
- **Tags (Awwwards):** Animation, Clean, Minimal, Portfolio, About Page. Awwwards also highlights these elements: "Introduction (Loading)", "Work overview (Navigation)", "Case Study (Transition)", "Work transition".

## Practicality verdict
**Practicality 5/5 · Wow 3/5.** Text at 0.5 s. The primary CTA "See my projects" is usable at **2.9 s** on desktop and **0.6 s** on throttled mobile [measured]. Projects: **1 click** ("See my projects" → `/work`, or **"Quick overview"** → `/overview`). Contact: **1 click** (About → "Say Hello" `mailto:` + **"Book a call"** Google Calendar link). Mobile: **works**, with a thumb-friendly bottom tab bar. Weight: **1.7 MB at load / 1.9 MB total**, of which 1.5 MB is one hero video; JS 0.24 MB; 11 requests [measured]. It's the most "job-application-shaped" site in the sample.

## Visual style
- White page, black only (Awwwards palette #000/#fff). The name is set as one **full-width condensed-grotesk word "CLEMENTGRELLIER"** spanning the viewport.
- Hero: a looping video of his own interface work (a product carousel "Travel / Dine" with arrows and an "Explore" pill), so the hero *is* a demo of his front-end craft.
- Statement: "Bringing designs to life with pixel-perfect precision and smooth animations." The bio and two CTAs sit right ("See my projects" outlined pill, "Quick overview" text link).

## Navigation
- **Fixed bottom-centre pill tab bar**: Home · Work · About, with the active tab filled black [measured: `nav.nav` fixed]. It's the same on desktop and mobile.
- **"Skip to main content"** link, real routes (`/work`, `/overview`, `/about`).
- **`/overview`** is a fast carousel of all projects (GENIE, ONTO, Thirtysixstudio, Lens, Desdoigts, TURBO, LUMA, Select), each with a **"Live website"** button. It's a 30-second recruiter scan.

## How projects are shown
Two depths: `/overview` for a quick carousel with live links, and `/work` for case studies (Awwwards element "Case Study"). Projects are framed device-like on a neutral grey.

## Mobile
Works well. The wordmark scales to full width, the video and statement stack, the CTAs are large, and the bottom pill nav is sized for thumbs. No overflow [measured].

## Preloader / weight [measured]
There's a short "Introduction" loading animation (Awwwards element), but the nav is clickable within 3 s on desktop and immediately on throttled mobile. Everything except the hero video is tiny (JS 0.24 MB).

## Steal
- **"Quick overview" route**: a skim view of every project with live links, next to the deep case studies. This is exactly what a recruiter needs.
- **Bottom pill tab bar** (Home/Work/About) on all breakpoints. It's always visible, one tap, and app-like.
- **Hero = a video of your own UI work**, so the first thing a visitor sees is proof.
- **About page as a CV in prose**: education, stack (TS/JS, Vue/React, CSS, GSAP), judge role, award counts, "Say Hello" and "Book a call".
- **Skip link** and plain HTML: cheap accessibility wins (a11y 7.2).

## Skip
- No contact on the landing screen. Add an email/"Hire me" to the tab bar.
- A 1.5 MB hero video up front. Use a poster image plus lazy loading, or a shorter clip.

Screenshots: `img/clement-grellier-desktop.jpg`, `img/clement-grellier-desktop-2.jpg` (`/overview` quick carousel), `img/clement-grellier-mobile.jpg`.
