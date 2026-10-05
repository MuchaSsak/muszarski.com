# Project: PstrykWeb — websites for local businesses

> Dossier for flagship #1. Owns this project's facts, story angles, theme, rights and shot list.
> Fields: `content-model.md`. Raw research (architecture drawing spec, 11 owner questions):
> `research/2026-10-05-project-pstrykweb.md`.

## Public disclosure: public info only [user] 2026-10-05

The owner's rule, until he says otherwise ("maybe one day we will disclose more"): the site shows only what is
already public about PstrykWeb, plus innocent facts.
- **The site may show:**
  - the product as its public pages describe it: bespoke websites for local businesses, ordered through an online form
  - the public links: the landing `pstrykweb.pl` and the public konfigurator (a code link only if one ever exists; the repo is private)
  - his role: built it solo for Cetuspro (pending the OK, Q21)
  - tech that is visible from outside (Next.js, Vercel)
- **Not on the site (internal):**
  - how the sites are made: AI generation, Claude Code / agents, the pipeline (queue, runner, gates, control plane)
  - the internal tools: emails, review viewer, staff dashboard
  - the unlaunched landing v2 and its measurements
  - counts, costs, client names, prompts, hostnames
- PstrykWeb is therefore **not** evidence for the AI-workflow section. That section rests on Clockful, this
  site's own build and `lingui-translate-ai` (`brand.md` pillar 3).
- The facts below stay in the wiki so the story can open up later. **Before this repo goes public (Q13)**, scrub this
  dossier and `research/2026-10-05-project-pstrykweb.md`.

## Facts (internal reference; the public subset is the rule above)

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

Public info only (see the rule above):
- **Outcome** (recommended first):
  1. "Built PstrykWeb for Cetuspro solo: bespoke websites for local businesses, ordered through one online form."
  2. "Solo developer of PstrykWeb, a website product for local businesses (Cetuspro)."
- **Proof chip:** "Client work · built solo".
- **Stack chips:** Next.js · TypeScript · Vercel.
- **Context tag:** "Client work · Cetuspro" (pending OK).
- **Links:** "Live ↗ pstrykweb.pl" (it currently shows Cetuspro's older landing, see the caveat in Facts) + the public konfigurator.
- **Held back (internal):** the pipeline, AI, internal tools, "13 sites live", the v2 benchmarks.

## What it proves (→ `audience.md` pillars)

- Public: a commercial product for a software house's clients, built solo.
- Internal only, for when the story opens up: end-to-end ownership of the whole system, AI engineering with quality
  gates, conversion thinking in the konfigurator flow, work with the marketing team.

## Rights and confidentiality (status: **check**; NDA level now L2, target L0)

- **The contract:** Q21 and the legal research. Get a one-line email OK from Cetuspro.
- **Needs the owner's and Cetuspro's OK:**
  - naming them, and saying he built it solo
  - numbers, screenshots, live client sites (none has consent)
- **Not said for now (owner, 2026-10-05):** that the sites are AI-generated. The old landing also says "not an
  automatic generator", a marketing sensitivity for Cetuspro (Q32).
- **Must stay private:**
  - prompts, skills and rubric text
  - client names
  - run costs and the build budget
  - internal hostnames and security issues

## Presentation

- **Media kind `both`:** one sheet, two views of the public parts: browser (the konfigurator) and phone (the
  konfigurator flow). No pipeline drawing, no internal tools.
- **Theme:** paper `#F5F1EA`, ink `#13201F`, accent teal `#2D7D78` (`#28726E` for small text). Dark: paper `#0E2B29`,
  accent mint `#9FD8CB`. Contrast checked [research]. Motif: a drafted "pstryk" toggle switch. Motion: snappy.
- **Temporary media** (`assets/projects/pstrykweb/`, raw scrolls in `raw/`): show the OLD landing, stock people and
  third-party thumbnails. **Never publish.** The owner records finals: the public konfigurator flow (+ one
  consented client site, if Cetuspro OKs it). Internal tools are not recorded for the site.

## Open (project-specific)

Contract wording + Cetuspro OK · when to open up the AI story (not for now) · which client sites can be shown (consent) · years ·
what he'd do differently · 11 more questions in the research file.
