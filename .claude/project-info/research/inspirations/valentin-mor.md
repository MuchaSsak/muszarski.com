# Valentin Mor — freelance creative developer (Paris)

- **Live:** https://www.valentin-mor.com/ (2026 landing) · awarded 2025 version still online at https://folioln.vercel.app/ (linked from the landing as "2025 Portfolio")
- **Awwwards:** https://www.awwwards.com/sites/valentin-mor-portfolio-2025 — **Honorable Mention, Aug 4, 2025** ("VALENTIN MOR - PORTFOLIO 2025"). No jury scores published on the page (HM only).
- **Role:** "Paris-based freelance creative developer crafting motion-driven websites" (site copy). Awwwards blurb: "independent developer based in Paris".
- **Tech (seen on the 2025 version's project rows):** JS/TS, Next, React, GSAP, Three, Node/Express/MongoDB on one project.

## Practicality verdict
**Practicality 5/5 · Wow 2/5.** Usable at **0.5 s** desktop / **2.1 s** on throttled mobile [measured]. Projects: **0 clicks** (list on landing). Contact: **0 clicks** (green-dot "Open October 2026" is a `mailto:`). Mobile: **works**, same content. Weight: **0.34 MB** desktop / **0.20 MB** mobile [measured]. The fastest site in this sample; the trade-off is close to zero spectacle.

## Visual style
- Off-white page, black grotesk at ~14 px, generous whitespace, 3-column editorial grid (name / bio + work list / availability + socials).
- Only "image": an Awwwards SOTD certificate card (red) for a client project. That's social proof used as the hero.
- 2025 version (desktop-2 shot): huge bold "VALENTIN MOR" wordmark top-left, a numbered project index (001–005) on the left, a centred stack of grayscale image strips, a live clock bottom-left, "FRONTEND DEV" bottom-right.

## Navigation
- Single screen, no menu. Everything is visible at once: bio, availability, "Latest Works" (6 external links), socials (GitHub, LinkedIn, Awwwards, Instagram).
- 2025 version: header holds **DOWNLOAD RESUME (PDF)**, **email**, ABOUT. Projects open as in-page panels ("OPEN / CLOSE / VISIT LIVE"), so there are no per-project URLs.

## How projects are shown
- 2026: plain text links straight to the live client sites. No case studies.
- 2025: an expandable row per project with **TYPE / DATE / ROLE / TOOLS** + "VISIT LIVE". This is the recruiter-friendly part: role and stack for each project, shown next to the visuals.

## Mobile
Works. It reflows to one column with the availability dot top-right and the work list first. No horizontal overflow [measured].

## Preloader / weight [measured]
- No preloader. Text and links hit-testable at 0.5 s.
- Desktop: 0.15 MB at load, 0.34 MB after scroll, 22 requests. Load event fired at 2.2 s in one run and 17.6 s in another (slow third-party request). It didn't block the UI either time, so TTU is the metric that matters here.

## Steal
- **Availability as the primary CTA**: a status dot plus month ("Open October 2026"), wired to `mailto:`. For a job-seeker this becomes "Open to roles from <month>".
- **Per-project meta row**: type · date · role · tools · visit-live link. It answers "what did *you* do, with what" at a glance.
- **Résumé PDF in the header**, not buried in About.

## Skip
- Text-only work list with no visuals: too little proof of craft for a hire.
- No per-project URLs, so you can't deep-link one project in an application.

Screenshots: `img/valentin-mor-desktop.jpg`, `img/valentin-mor-mobile.jpg`, `img/valentin-mor-desktop-2.jpg` (2025 awarded version).
