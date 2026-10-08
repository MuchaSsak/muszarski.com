# Requirements

> What the site must do and how we know it does. Why: `project-brief.md`. Where each thing lives:
> `structure.md`. Look: `design.md`. Project facts: `content/projects.md`. Status column: `todo` / `spike` / `built` / `verified`.

## Users and roles

| Who | Arrives from | Needs within 5–30 s | Source |
| --- | --- | --- | --- |
| Recruiter (software house first) | LinkedIn, an email link, a referral | name, role, location, availability, CV, contact | [research: hiring-perspective] |
| Tech lead / CTO | the recruiter, GitHub | 1 case study: decisions, architecture, code | [research] |
| Possible freelance client | search, a referral | the work → contact (topic "A project"); the "open to projects" line was removed [user 2026-10-06] | [user] 2026-10-05 |
| Search visitor | Google or Bing: his name, role, location, blog topics | the right snippet, then content | [user] |
| AI assistant / screener | crawls the site | a plain-text summary (`/llms.txt`, server-rendered HTML) | [research] |
| Friends, community | `/my-life` | personality, Discord/Messenger | [user] |

## Features

| ID | Feature | Pri | Acceptance criteria | Status |
| --- | --- | --- | --- | --- |
| F01 | Persistent header | must | Labelled links, with CV + the contact CTA visible at every width 320–2560. The contact CTA reaches contact from any page in 1 click. Locale switch: drawn flags named by their autonyms (`i18n.md` § Switcher). Keyboard reachable; targets ≥ 24 px | built 2026-10-05 (contact = the home section `#contact`; no separate panel [assumption]); reworked 2026-10-06: the CTA says "Hire me", one CV button, flags |
| F02 | Hero | must | Server-rendered H1 (name + role) is the LCP. Shows positioning line, location + availability, a proof strip of real numbers only, and See work + Contact. Signature visual loads after LCP; static under reduced motion | built 2026-10-05; the hero's CTAs are See the work + Download CV (contact is the header's "Hire me", one tap away) |
| F03 | Project chapters (4 flagships, `content/projects.md`) | must | One skeleton; each project has its own theme tokens (`design.md`). Card anatomy per `content-model.md`. Media layout by `kind` (phone / desktop / both / live). Poster first; loop plays only when visible and after the first interaction; pauses offscreen; reduced motion → poster + play button | built 2026-10-05 (PstrykWeb + Clockful stages are drawn stand-ins until recordings: P18) |
| F04 | All-projects page `/work/` | must | Every project (flagships first, then archive); filters by type + stack with counts; row = title, year, one line, tags, links; works at 320 px [user] 2026-10-05 | built 2026-10-05 (`data/projects.ts`) |
| F05 | Case study `/work/<slug>/` | must | Case-study spine (`content-model.md`); credits table; NDA label; prev/next; OG image per locale | moved to the blog [user]: only case study #0 exists; chapters link Live/Store/Code |
| F06 | How I work (business thinking) | must | 3–4 principles, each with a receipt from a real project (decision → trade-off → result) linking to its case study. No unproven adjectives | built 2026-10-05 (7-stop product loop) |
| F07 | AI workflow | must | The real setup as an org chart [user 2026-10-06: "I run AI like a team"]: Me (Lead) → Claude Code (Builder) → a crew (memory = wiki + lessons, rules = hooks, research = subagents, tools = MCP servers, playbooks = skills, quality = gates), counts from the repo, never typed; the message "AI speeds code, I own decisions and verification"; one CTA to the "how this site was built" post. PstrykWeb is not used here (public info only) | built 2026-10-05 as a 7-step process; rebuilt 2026-10-06 as the org chart (`design.md` § Components) |
| F08 | Credentials (+ tools) | must | Credentials with Verify links; learning path with instructor names; teamwork (Erasmus+, ESC, hackathons); media on open; readable on every width (list + detail on wide screens, accordion on phones [user 2026-10-06]). Tools: the band under the hero + per chapter (the Stack section is cut [user] 2026-10-05). Not 100vh | built 2026-10-05 (data in `data/cv.ts`; media placeholders P11); list + detail 2026-10-06 |
| F09 | Contact (section + panel) | must | Fields: the message + a reply address (email, phone or LinkedIn), both required, + optional topic chips A job / A project / A question. No name field [assumption 2026-10-05]. Turnstile; delivered to the owner via EmailJS from the server (never a stub; Resend dropped 2026-10-06 [owner]). Inline success/error states. Works without JS (plain POST). Also: Copy email, LinkedIn and GitHub tiles; quick facts (contract, location, languages) | built 2026-10-05: Vercel Function `api/contact.ts` (EmailJS + Turnstile); not run on Vercel yet. 2026-10-06: the "Open to projects" line (it preselected A project) and the CV tile removed [user] |
| F10 | Footer | must | The 4 link columns in `structure.md` § Footer (incl. RSS and "how this site was built"), locale switch, pause motion, build-time revision row, © | built 2026-10-05 |
| F11 | `/cv/` + PDF | must | One data source renders the page AND the PDF per locale. Build fails if the PDF is stale. **One CV button** [user 2026-10-06]: a click downloads the PDF inside the tap, then opens `/cv/`, which confirms; no JS = a link to `/cv/`, whose first button is the PDF; never an auto-download on load (iOS). Details: `structure.md` § `/cv/`. Print CSS | built 2026-10-05 (PDF via `bun run cv:pdf`, committed; `cv.test.ts` digest check); the 2026-10-05 split button replaced 2026-10-06 (`layout/CvLink.astro`); the designed sheet became the PDF and `/cv/` got its own layout 2026-10-08 (`bun run cv:sheet`) |
| F12 | Blog | must | Index (tag filter), post (TOC, reading time, published/updated, author box, related, share image), BlogPosting JSON-LD, RSS per blog locale (en, pl), hreflang only between real translations | built 2026-10-05 (11 posts: 10 en/pl pairs + 1 pl-only) |
| F13 | `/my-life/` | should | Photo, interests, Discord/Messenger links; indexed; secondary nav | built 2026-10-05 (photo + copy placeholders P15, P6) |
| F14 | Legal pages | must | `/privacy/` always; `/terms/` if required (`compliance-and-data.md`). Formal tone; `noindex,follow`; footer links; per-locale versions + prevailing-language clause | built 2026-10-05: drafts, not lawyer-reviewed (P13) |
| F15 | i18n en / pl / es | must | `/<locale>/` everywhere except blog posts (en + pl only: `i18n.md` § Locale coverage), root redirect, switcher keeps the page, hreflang + x-default, Lingui catalogs; es marked unreviewed (`i18n.md`) | built 2026-10-05 |
| F16 | SEO machinery | must | Per `seo.md`: titles/meta, canonical, Person `@id` JSON-LD graph, sitemap index, robots, OG per page × locale, Search Console + Bing + IndexNow, `/llms.txt` | built 2026-10-05 (GSC/Bing/IndexNow are owner actions at launch) |
| F17 | Analytics | must | Umami cookieless; events in `analytics.md`; no PII | wired 2026-10-05 (no-op until `PUBLIC_UMAMI_WEBSITE_ID`) |
| F18 | Themes | — | ~~Cobalt (default) / Paper / Ink, cycled by one switch~~ | **cut by the owner 2026-10-06** (clutter): one theme, Cobalt (`design.md` § Themes and fields) |
| F19 | Motion safety | must | `prefers-reduced-motion` honoured everywhere; pause control for any motion > 5 s (WCAG 2.2.2) | built 2026-10-05 |
| F20 | Signature moment | must | Poster: the fitted name, final from the server (LCP), letter accordion after load; no WebGL in the hero (`design.md`) | done 2026-10-05 |
| F21 | 404 page | should | Helpful links (work, contact, home) + a small drawing | built 2026-10-05 |
| F22 | ⌘K palette | could | Accelerator only; every action also reachable by normal UI | todo |
| F23 | Case study #0 "how this site was built" | should | Budgets, tiers, a11y, Lighthouse CI, AI workflow, Astro choice | built 2026-10-05 (blog post, en + pl) |
| F24 | `/explore` immersive hub | later | Opt-in; links to the same `/work/<slug>/` URLs | — |

> **Round 3 comp (2026-10-05) proposes, pending the owner:** F06 as a 7-stop product loop (Client, Users, Conversion,
> Revenue, Code, Ship, Measure; each stop with a receipt); F07 as one task through the real setup (hooks, wiki, subagents,
> MCP, skills, lessons) with checks as one "floor" line; F08 as named monochrome tool marks + a project filter, and
> credential cards that load media only when opened; F09 message-first: one textarea, then a "Where do I reply?" field
> (email, phone or LinkedIn) that fills itself from the message (Q44). Every hover has a tap/focus/scroll twin.

## Key flows

1. **Recruiter on mobile from LinkedIn:** lands on `/en/`.
   - Name, role, location and availability are in the first viewport.
   - Tap "CV" → the PDF downloads and `/en/cv/` opens with a confirmation (one button, F11).
   - Tap "Hire me" → the contact section → copy email. **1 tap to the CV.**
2. **Tech lead:** home → chapter → case study → code or architecture → back. Scroll position restored.
3. **Client:** a chapter or "Hire me" → the form (topic "A project", optional) → success state names the reply time.
4. **Search:** "Mateusz Muszarski" → home with the right title, snippet and OG. Role + city queries → home or blog.
5. **Locale switch** on `/en/work/x/` → `/pl/work/x/` (same page, never back to home).
6. **Contact edge cases:**
   - Input: empty or whitespace, invalid email, message over the cap.
   - Failures: Turnstile fails, network error, 429, EmailJS refusal (4xx/5xx → 502).
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
