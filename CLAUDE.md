# Mateusz Muszarski portfolio - personal site + blog built to get hired

The personal site of Mateusz Muszarski, a Polish full-stack developer: a fast, accessible Astro site with
one signature WebGL moment, project case studies, a blog, a web CV + PDF, in en / pl / es. Mental model:
**content first, wow second.** Every page is real HTML in under 3 s with contact 1 click away; visuals
(the rebrand direction the owner picks from `comps/`, 3D, video) layer on top and never block. The knowledge lives in the wiki
at `.claude/project-info/` (map: `.claude/project-info/README.md`). This file is the router and the
non-negotiables: read only the pages your task needs. Paths are plain text on purpose (no @imports).

## Routing table

| Task touches | Read |
| --- | --- |
| **How a session works here**: new chats, quality bar, definition of done, compaction, pausing, reports, lessons / memory, Phase 1 build order, one section at a time, slice, polish loop | `.claude/project-info/working-agreement.md` (+ `.claude/project-info/lessons.md`) |
| Goals, scope, priorities, success metrics, deadline, what we are NOT building | `.claude/project-info/product/project-brief.md` |
| Recruiters, hiring, software houses, audience, objections, seniority, solo concern, what employers check | `.claude/project-info/product/audience.md` |
| Copy, microcopy, wording, voice, tone, headlines, H1, positioning, CTA labels, banned words | `.claude/project-info/product/brand.md` |
| Features, acceptance criteria, user flows, recruiter flow, budgets, performance targets, Lighthouse score, accessibility, a11y | `.claude/project-info/product/requirements.md` |
| Projects overview, flagships, showcase, chapters order, archive, all projects page | `.claude/project-info/content/projects.md` |
| PstrykWeb case study, card copy, outcome, Cetuspro, pipeline, konfigurator, website generator, admin panel | `.claude/project-info/content/projects/pstrykweb.md` |
| Linkoglot case study, card copy, outcome, mobile app, App Store, Google Play, flashcards, RevenueCat | `.claude/project-info/content/projects/linkoglot.md` |
| Neoteric Clockful case study, card copy, outcome, internship, time tracking dashboard, roles permissions | `.claude/project-info/content/projects/neoteric-clockful.md` |
| Space portfolio case study, card copy, outcome, old site, matmuszarski, three.js space, immersive | `.claude/project-info/content/projects/space-portfolio.md` |
| Content model, data fields, case study template, CV / resume / PDF sync, credentials, skills, blog frontmatter | `.claude/project-info/content/content-model.md` |
| Pages, sitemap, home sections, hero, header, navigation, footer, contact form, CTA, my life page, blog layout, legal pages layout | `.claude/project-info/site/structure.md` |
| Locales, translation, Lingui, Polish, Spanish, language switcher, hreflang, URL prefix, slugs | `.claude/project-info/site/i18n.md` |
| Analytics, Umami, events, tracking, funnels, KPIs, CV downloads | `.claude/project-info/site/analytics.md` |
| SEO, Google, Search Console, Bing, IndexNow, metadata, meta tags, titles, JSON-LD, structured data, OG images, sitemap, robots, domain, ranking, blog topics | `.claude/project-info/site/seo.md` |
| Design, art direction, rebrand, directions, comps, Orbit, Poster, Toybox, Exhibit, colours, typography, motion, animation, micro animations, hover, icons, logos, illustrations, dark mode, project themes, 3D signature moment | `.claude/project-info/design/design.md` |
| Design score, design quality rubric, score a view, weakest point, anti-slop, instant fail, agency quality | `.claude/project-info/design/design-quality.md` |
| Inspiration, references, examples, Awwwards, Mobbin, layout patterns, sheet composition, registry components | `.claude/project-info/design/design-references.md` |
| Assets, images, videos, recordings, screenshots, photos, fonts, licences, logos, icons, tool marks, media sourcing | `.claude/project-info/design/assets.md` |
| Legal, privacy policy, terms, regulamin, GDPR, RODO, cookies, consent, processors, copyright, rights, permission, instructor photos | `.claude/project-info/legal/compliance-and-data.md` |
| Stack, Astro, framework, versions, hosting, Vercel, Cloudflare, env vars, commands, build, deploy, spikes, three.js bundle, PDF generation, contact endpoint, Resend, Turnstile, video encoding | `.claude/project-info/tech/technologies.md` |
| Code style, folders, git, commits, testing bar, do-not list | `.claude/project-info/tech/conventions.md` |
| Monorepo, Turborepo, bun, workspaces, packages, apps/web, packages/shared, Vercel root directory, deploy check | `.claude/project-info/tech/usage/turborepo.md` |
| Writing Astro pages and components, BaseLayout, Tailwind classes, tokens in code, scoped theme, CSP, robots, specimen | `.claude/project-info/tech/usage/astro.md` |
| Writing translatable copy, add a translation, translate a string, Lingui macros, catalogs, .po files, extract, typo helper, no-break space, orphans | `.claude/project-info/tech/usage/lingui.md` |
| Screenshots, visual QA loop, e2e gates, Playwright, axe, layout sweep, run Lighthouse, accept proof, VISUAL-QA | `.claude/project-info/tech/usage/visual-qa.md` |
| Measured numbers, run notes, command timings, how long build or e2e takes, slice costs, budget left | `.claude/project-info/memory/run-notes.md` (+ `.claude/project-info/memory/slice-costs.md`) |
| Research evidence, statistics, sources, why we decided X | `.claude/project-info/research/2026-10-05-synthesis.md` |
| Placeholders, dummy data, fake links, temporary media, not real, wrap up, finish, go to prod, production launch | `.claude/project-info/placeholders.md` (+ `.claude/project-info/open-questions.md`) |
| Anything unresolved, unknowns, blockers, owner to-dos, questions for the owner | `.claude/project-info/open-questions.md` |
| Wiki history, what changed when | `.claude/project-info/log.md` |

## Invariants (break none)

- **Practicality ≥ wow:** impressive within 3 s AND usable in 1 click on mobile. No preloader, gate or scroll-jacking; same content on mobile (`.claude/project-info/design/design.md`).
- **Text first:** the H1 is the LCP. 3D, shaders and video load after it, with a static fallback and reduced-motion support (`.claude/project-info/design/design.md`).
- **Budgets:** Lighthouse mobile ≥ 90 on every page; the JS/LCP/CLS budgets in `.claude/project-info/product/requirements.md`.
- **CV:** the `/cv/` page and the PDF come from ONE data source. Never edit one alone (`.claude/project-info/content/content-model.md`).
- **Copy:** every user-facing string goes through Lingui (en source). es is marked unreviewed. Long-form text lives in per-locale files (`.claude/project-info/site/i18n.md`).
- **Truth:** no invented facts, metrics, testimonials or credentials. Placeholders are allowed while building: disclose each one briefly in chat, mark it `PLACEHOLDER` in code/data and log it in `.claude/project-info/placeholders.md`. On "finish / wrap up / go to prod", clear that register first.
- **Rights:** client or internship work is shown only with a rights status of `ok` in its dossier (`.claude/project-info/content/projects.md`).
- **Licences (owner's hard rule):** every font, image, texture, icon, sound and library is free for commercial use (OFL, Apache, MIT,
  CC0, CC BY with its credit shown) or the owner's own work. Unknown licence = not used (`.claude/project-info/design/assets.md`).
- **Privacy of inputs:** `context/` is private. Never commit it, copy its files or quote the memo (`.claude/project-info/lessons.md`).
- Never read real `.env` files or secrets; name env vars, never values.

## How every session works

- Start: read the routed pages (the prompt hook lists them) and apply the lessons (the session card carries them).
- Keep working through compactions until the task is done or the user says stop.
- Phase 1: one section at a time, looped to near-prod before the next (`.claude/project-info/working-agreement.md` § 9).
- Finish: verify → update the page + `log.md` → add lessons → commit per the working agreement → short report.
- Details: `.claude/project-info/working-agreement.md`. Personal rules: `CLAUDE.local.md` (gitignored).

## Commands

| Do | Run |
| --- | --- |
| Lint the wiki | `node .claude/hooks/wiki-check.mjs` |
| Test prompt routing | `node .claude/hooks/wiki-context.mjs --test "<prompt>"` |
| Install / dev | `bun install` · `bun run dev` |
| Typecheck + lint + unit | `bun run check` |
| Build / e2e / Lighthouse | `bun run build` · `bun run e2e` · `bun run lhci` (all commands: `.claude/project-info/tech/technologies.md` § Commands) |
