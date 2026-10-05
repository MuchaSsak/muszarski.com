# Requirements

> What the site must do and how we know it does. Why: `project-brief.md`. Where each thing lives:
> `structure.md`. Look: `design.md`. Project facts: `content/projects.md`. Status column: `todo` / `spike` / `built` / `verified`.

## Users and roles

| Who | Arrives from | Needs within 5–30 s | Source |
| --- | --- | --- | --- |
| Recruiter (software house first) | LinkedIn, an email link, a referral | name, role, location, availability, CV, contact | [research: hiring-perspective] |
| Tech lead / CTO | the recruiter, GitHub | 1 case study: decisions, architecture, code | [research] |
| Possible freelance client | search, a referral | "open to projects" → contact | [user] 2026-10-05 |
| Search visitor | Google or Bing: his name, role, location, blog topics | the right snippet, then content | [user] |
| AI assistant / screener | crawls the site | a plain-text summary (`/llms.txt`, server-rendered HTML) | [research] |
| Friends, community | `/my-life` | personality, Discord/Messenger | [user] |

## Features

| ID | Feature | Pri | Acceptance criteria | Status |
| --- | --- | --- | --- | --- |
| F01 | Persistent header | must | Labelled links, with CV + Contact visible at every width 320–2560. Contact opens the panel from any page in 1 click. Locale switch uses autonyms. Keyboard reachable; targets ≥ 24 px | todo |
| F02 | Hero | must | Server-rendered H1 (name + role) is the LCP. Shows positioning line, location + availability, a proof strip of real numbers only, and See work + Contact. Signature visual loads after LCP; static under reduced motion | todo |
| F03 | Project chapters (4 flagships, `content/projects.md`) | must | One skeleton; each project has its own theme tokens (`design.md`). Card anatomy per `content-model.md`. Media layout by `kind` (phone / desktop / both / live). Poster first; loop plays only when visible and after the first interaction; pauses offscreen; reduced motion → poster + play button | todo |
| F04 | All-projects page `/work/` | must | Every project (flagships first, then archive); filters by type + stack with counts; row = title, year, one line, tags, links; works at 320 px [user] 2026-10-05 | todo |
| F05 | Case study `/work/<slug>/` | must | Case-study spine (`content-model.md`); credits table; NDA label; prev/next; OG image per locale | todo |
| F06 | How I work (business thinking) | must | 3–4 principles, each with a receipt from a real project (decision → trade-off → result) linking to its case study. No unproven adjectives | todo |
| F07 | AI workflow | must | Diagram of wiki → skills → MCP → hooks → gates; proof links (npm package, public repo); the message "AI speeds code, I own decisions and verification" | todo |
| F08 | Stack + credentials | must | Grouped skill chips (no bars) that filter projects, with counts (filter = should). Credentials with Verify links; learning path with instructor names; teamwork timeline (Erasmus+, ESC, hackathons). Not 100vh | todo |
| F09 | Contact (section + panel) | must | Fields: email + message (name optional). Turnstile; delivered to the owner via Resend (never a stub). Inline success/error states. Works without JS (plain POST). Also: copy-email, links, quick facts (role, contract, location, start date, languages) | todo |
| F10 | Footer | must | Nav, locale switch, socials, legal links, RSS, "how this site was built", © | todo |
| F11 | `/cv/` + PDF | must | One data source renders the page AND the PDF per locale. Build fails if the PDF is stale. Every CV CTA is a split button: "CV" → `/cv/`, "↓ PDF" → direct download (no auto-download: iOS) [user] 2026-10-05. Print CSS | todo |
| F12 | Blog | must | Index (tag filter), post (TOC, reading time, published/updated, author box, related, share image), BlogPosting JSON-LD, RSS per locale, hreflang only between real translations | todo |
| F13 | `/my-life/` | should | Photo, interests, Discord/Messenger links; indexed; secondary nav | todo |
| F14 | Legal pages | must | `/privacy/` always; `/terms/` if required (`compliance-and-data.md`). Formal tone; `noindex,follow`; footer links; per-locale versions + prevailing-language clause | todo |
| F15 | i18n en / pl / es | must | `/<locale>/` everywhere, root redirect, switcher keeps the page, hreflang + x-default, Lingui catalogs; es marked unreviewed (`i18n.md`) | todo |
| F16 | SEO machinery | must | Per `seo.md`: titles/meta, canonical, Person `@id` JSON-LD graph, sitemap index, robots, OG per page × locale, Search Console + Bing + IndexNow, `/llms.txt` | todo |
| F17 | Analytics | must | Umami cookieless; events in `analytics.md`; no PII | todo |
| F18 | Light/dark theme | should | Light = drafting paper, dark = cyanotype. Follows the system; the toggle persists (storage in try/catch) [assumption] | todo |
| F19 | Motion safety | must | `prefers-reduced-motion` honoured everywhere; pause control for any motion > 5 s (WCAG 2.2.2) | todo |
| F20 | Signature WebGL moment | must | Lazy island after LCP; capability tiers High/Mid/Low/Reduced; poster fallback; chunk ≤ ~300 KB gz | spike |
| F21 | 404 page | should | Helpful links (work, contact, home) + a small drawing | todo |
| F22 | ⌘K palette | could | Accelerator only; every action also reachable by normal UI | todo |
| F23 | Case study #0 "how this site was built" | should | Budgets, tiers, a11y, Lighthouse CI, AI workflow, Astro choice | todo |
| F24 | `/explore` immersive hub | later | Opt-in; links to the same `/work/<slug>/` URLs | — |

## Key flows

1. **Recruiter on mobile from LinkedIn:** lands on `/en/`.
   - Name, role, location and availability are in the first viewport.
   - Tap CV → `/en/cv/` opens and the PDF downloads.
   - Tap Contact → panel → copy email. **≤ 2 taps to the CV.**
2. **Tech lead:** home → chapter → case study → code or architecture → back. Scroll position restored.
3. **Client:** sees the "open to projects" line → form → success state names the reply time.
4. **Search:** "Mateusz Muszarski" → home with the right title, snippet and OG. Role + city queries → home or blog.
5. **Locale switch** on `/en/work/x/` → `/pl/work/x/` (same page, never back to home).
6. **Contact edge cases:**
   - Input: empty or whitespace, invalid email, message over the cap.
   - Failures: Turnstile fails, network error, 429, Resend 5xx.
   - Every error keeps the typed text and offers copy-email.
   - Without JS: a plain POST → result page.

## Non-functional

| Area | Requirement | Source |
| --- | --- | --- |
| Performance | Lighthouse mobile ≥ 90 on every page; LCP ≤ 2.5 s; TBT ≤ 200 ms; CLS ≤ 0.05; initial JS ≤ 150 KB gz; fonts ≤ 100 KB; initial page ≤ 1 MB; 3D chunk ≤ ~300 KB gz; 3D assets ≤ 1 MB (mid) / 2 MB (high) | [research: synthesis TL;DR 8] |
| Usability | impressive within 3 s AND usable in 1 click on mobile; no preloader, gate or scroll-jacking; same content on mobile | [user], [research] |
| Accessibility | WCAG 2.2 AA target; reduced motion; pause control; 24 px targets; focus not obscured; pinch-zoom never disabled; DOM text/links for anything in a canvas | [research] |
| Browsers | last 2 Chrome/Edge/Firefox/Safari; iOS Safari 17+; Android Chrome; widths 320–2560 | [assumption] |
| Security | strict CSP like pstrykweb.pl; no secrets in the client; Turnstile + rate limit on the one endpoint | [repo: context/pstryk-turborepo/apps/pstrykweb.pl/astro.config.mjs] |
| Privacy | no tracking cookies; cookieless analytics; facts in `compliance-and-data.md` | [user] |
| Content truth | no invented numbers, testimonials or project facts; placeholders block launch | [user], working agreement |

## Explicitly not building

AI chatbot · blog comments · newsletter · CMS/admin · accounts · preloaders and intro gates ·
scroll-jacking · skill bars · custom cursor · name marquee · typewriter hero (`design.md` Do/Don't).
