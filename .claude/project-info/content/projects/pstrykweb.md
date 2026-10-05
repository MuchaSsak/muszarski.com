# Project: PstrykWeb — websites for local businesses

> Dossier for flagship #1. Owns this project's facts, story angles, theme, rights and shot list.
> Fields: `content-model.md`. Raw research (architecture drawing spec, 11 owner questions):
> `research/2026-10-05-project-pstrykweb.md`.

## Facts

| Fact | Value | Source |
| --- | --- | --- |
| What | a pipeline that turns a short business-owner form into a deployed, bespoke website; plus konfigurator, emails, review viewer, staff dashboard | [user], [research] |
| Client / context | commercial project with the software house **Cetuspro (Rzeszów)**, umowa zlecenia | [user] |
| Role / team | **solo**: pipeline, API, generation system, konfigurator, emails, viewer, staff/admin panel, landing v2 | [user]; the repo calls him "Główny deweloper PstrykWeb" [research: reuse-audit § 8.2] |
| How it works | Next.js konfigurator autosaves to Supabase → one submit to a Deno + Hono control plane → a queue starts a Docker runner (GitLab CI / GitHub Actions / local) → **headless Claude Code researches, designs and builds the site, and can't finish until gates pass** (screenshots, build, e2e, Lighthouse) → each site deploys to its own Vercel project with a content editor → Resend emails a review link → the owner annotates in the viewer → edit jobs → staff dashboard with a launch switch | [research] |
| Scale | **13 sites live, built by the pipeline** (verified 2026-09-27) | [research: repo] |
| Measured | landing v2 Lighthouse mobile 99/100/100/100 (pre-launch lab build); konfigurator a11y 100, LCP 1.1–1.5 s; Astro vs Next bench 1.66 s vs 2.92 s LCP | [research: repo memory/] |
| Live site caveat | **https://pstrykweb.pl today is the OLD Next.js landing from a separate Cetuspro repo, not his.** His landing v2 (Astro 7) is built in the repo but not launched (placeholder portfolio, legal awaiting counsel) | [research] |
| Conversion data | none yet (the form is closed pre-launch) | [research] |
| Code | private | [user] |
| Years | from the repo log → research file | [research] |

## Card candidates

- **Outcome** (recommended first):
  1. "A pipeline that turns an 8-minute form into a deployed, bespoke website for a local business."
  2. "Built the system behind PstrykWeb alone, from the form to the deploy; 13 sites live so far."
  3. "Automated website production with quality gates instead of templates."
- **Proof chip:** "13 sites live, built by the pipeline" (alt: "Astro over Next: LCP 1.66 s vs 2.92 s, measured").
- **Stack chips:** Claude Code · Deno · Supabase · Next.js · Docker (alt: Astro).
- **Context tag:** "Client work · Cetuspro" (pending OK).

## What it proves (→ `audience.md` pillars)

- End-to-end ownership of a commercial system, solo.
- AI engineering with quality control: agents behind gates, not "prompt and pray". This is the strongest
  evidence for the AI-workflow section.
- Business and conversion thinking: the konfigurator flow, a measured framework choice, a staff launch switch.
- Working with a company's people (marketing team, PM, staff dashboard).

## Rights and confidentiality (status: **check**; NDA level now L2, target L0)

- **The contract:** Q21 and the legal research. Get a one-line email OK from Cetuspro.
- **Needs the owner's and Cetuspro's OK:**
  - naming them, and saying he built it solo
  - **saying the sites are AI-generated** (the old landing says "not an automatic generator", a marketing sensitivity)
  - numbers, screenshots, live client sites (none has consent)
- **Must stay private:**
  - prompts, skills and rubric text
  - client names
  - run costs and the build budget
  - internal hostnames and security issues

## Presentation

- **Media kind `both`:** one sheet, three views: browser (konfigurator / generated site), phone (konfigurator
  flow), and the pipeline drawn as a production line.
- **Theme:** paper `#F5F1EA`, ink `#13201F`, accent teal `#2D7D78` (`#28726E` for small text). Dark: paper `#0E2B29`,
  accent mint `#9FD8CB`. Contrast checked [research]. Motif: a drafted "pstryk" toggle switch + the
  production-line drawing. Motion: snappy.
- **Temporary media** (`assets/projects/pstrykweb/`, raw scrolls in `raw/`): show the OLD landing, stock people and
  third-party thumbnails. **Never publish.** The owner records finals: konfigurator flow, pipeline run, review
  viewer, staff dashboard, one consented client site.

## Open (project-specific)

Contract wording + Cetuspro OK · may we say "AI-generated"? · which client sites can be shown (consent) · years ·
what he'd do differently · 11 more questions in the research file.
