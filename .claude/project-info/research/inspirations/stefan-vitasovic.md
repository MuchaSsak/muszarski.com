# Stefan Vitasović — design-driven creative developer (Stockholm)

- **Live:** https://stefanvitasovic.dev/
- **Awwwards:** https://www.awwwards.com/sites/stefan-vitasovic-portfolio25 — **Site of the Day, Sep 20, 2025**. SOTD **7.25** (Design 7.31 · Usability 6.94 · Creativity 7.51 · Content 7.38). Developer **8.04** (Semantics 8.0 · Animations 8.8 · Accessibility 7.0 · WPO 8.4 · Responsive 8.0 · Markup 7.6).
- **Role:** "design-driven creative developer focused on motion and interactivity" (Awwwards). Site copy: "Currently Lead Creative Developer at 14islands, Stockholm. MSc in electrical engineering… Awwwards Jury member since 2020" (self-reported).
- **Tech (Awwwards):** WebGL, Motion, Next.js. Tags: Experimental, Typography, Unusual Navigation, Transitions, Filters and Effects.

## Practicality verdict
**Practicality 4/5 · Wow 4/5** — text at 0.8 s but the glitch/"redaction" intro blocks clicks until **6.2 s** desktop; throttled mobile usable at **2.3 s** [measured]; projects **1 click** ("Projects") — or one wheel tick, which **changes the route** to `/projects` [measured]; contact **0 clicks** ("Available for freelance projects: hello@… / linkedin/…" fixed bottom-left on every page); mobile **works**; weight **0.25 MB at load**, 6.7 MB after visiting projects (video) / **0.26 MB** mobile [measured].

## Visual style
- Off-white paper background, **IBM-blue** display grotesk ("stefan vitasović / creative developer") at full width, black small body text.
- Signature: a **"redacted document" glitch** — stacks of black/grey/blue horizontal bars with scan-line stripes that slice over the text and resolve into content (WebGL/canvas filter); dotted grid texture.
- Projects page: two-column numbered index (01. 365 — A Year of Cartier …19.) left, scan-line-distorted project media stack right.

## Navigation
- Top-right text nav: **Intro / Projects / About** (underlined active). Routes are real (`/`, `/projects`, `/about`).
- **Scroll-to-next-route**: a wheel gesture on Intro moves you to `/projects` (unusual navigation) — fast for explorers, surprising for others; the text nav makes it recoverable.
- Contact + availability pinned bottom-left, year "2025." bottom-right.

## How projects are shown
Numbered list of 19 projects (client · type) beside a scrolling media column of screenshots/videos with a scan-line distortion; selecting a project scrolls its media into view.

## Mobile
Works. Same glitch typography (letters stutter "ssssvvvvv / ccccccdddddd" during the intro), bars cover the screen briefly, then name, bio and contact. Very light (0.26 MB) [measured].

## Preloader / weight [measured]
No progress loader; ~5–6 s intro choreography on desktop during which links don't register. DCL/load 0.7 s, 0.25 MB (JS 0.14 MB). Projects page streams ~6 MB of video.

## Steal
- **One signature effect, applied consistently** (redaction bars + scan-lines) on type and media — cheap, distinctive, no 3D.
- **Persistent availability + email line** on every route.
- **Numbered text index of all projects** next to the media — scannable for recruiters.
- **Bio with hard facts** (current role, employer, degree, years) in 4 lines.

## Skip
- Intro that blocks input for ~6 s.
- Wheel-triggered route changes (scroll-jacking across pages) — keep scroll for scrolling.

Screenshots: `img/stefan-vitasovic-desktop.jpg`, `img/stefan-vitasovic-desktop-2.jpg` (after wheel → /projects), `img/stefan-vitasovic-mobile.jpg` (mid-intro).
