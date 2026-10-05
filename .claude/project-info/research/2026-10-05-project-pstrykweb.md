# Project research: PstrykWeb (websites for local businesses, generated end to end)

Date: 2026-10-05

Scope: the project story for flagship #1, so `content/content-model.md` § Project and
`design/design.md` § Per-project themes can be filled. Sources: the local read-only checkout
`context/pstryk-turborepo` (its wiki, package.json files, code), the live https://pstrykweb.pl and the public
start page of https://app.pstrykweb.pl (Playwright, no form touched), and the owner's brief. The landing
app's reusable machinery is audited separately (`2026-10-05-pstryk-reuse-audit.md`). This file is the
story, not the code audit.

Evidence tags:
- `[repo: path]`: paths are relative to `context/pstryk-turborepo/`, and `wiki/` stands for
  `context/pstryk-turborepo/.claude/project-info/`.
- `[measured]`: run this session (method stated).
- `[owner]`: the owner's own words in the brief.
- `[opinion]`: my judgement.

**Everything internal is treated as confidential until the owner and CetusPro say otherwise (§ 8).** This
file avoids client business names, hostnames of internal services, secrets and cost figures on purpose.
Where those exist, it points to the repo path instead.

---

## 0. Read this first (findings that change how the story is told)

1. **The live pstrykweb.pl is NOT the landing in this repo.**
   - It is served by Next.js. Its H1 and H2s match the old landing, which the wiki describes as the
     separate repo `CPVibeCode/pstryk-web-landing`, a static Next export on Vercel. The wiki lists a
     CetusPro PM/BA as that landing's owner and says to report its bugs to "its owner"
     [measured: Playwright probe, `/_next/` scripts, no `<meta name="author">`] [repo:
     wiki/architecture/overview.md § Domains, wiki/business/pstrykweb.md § Contact, wiki/known-issues.md §
     Landing page (separate repo)].
   - The owner's landing work in this repo is **landing v2**: `apps/pstrykweb.pl`, Astro 7 + React islands.
     It is built (84 HTML pages in the local `dist/`) [measured: `find dist -name '*.html'`], but it is
     **not launched**. It runs only on private, noindex Vercel review deploys.
   - Two launch blockers are open: a portfolio of fictional placeholder businesses, and legal pages
     waiting for counsel [repo: wiki/known-issues.md § Landing v2, rows H; wiki/log.md 2026-09-30,
     2026-10-02].
   - → Owner question Q1: which landing did you code? The temporary screenshots in § 9 show the **old**
     landing.
2. **The product is pre-launch.**
   - The konfigurator at app.pstrykweb.pl is closed behind `IS_OPEN_TO_PUBLIC`. The live page says
     "Formularz ruszy już wkrótce." and offers a waitlist and a tester-password fold
     [measured: Playwright] [repo: wiki/plans/pre-launch.md, wiki/apps/app-pstrykweb.md § What it is].
   - The factory itself is operational: 13 live prototype builds were verified on 2026-09-27 [repo:
     wiki/landing/research.md § 5; apps/pstrykweb.pl/src/data/portfolio.ts `LIVE_BUILDS`].
3. **There are no conversion or form-UX metrics.** The konfigurator's flow decisions were made from published
   evidence "once real traffic exists - there was none when this was written" [repo:
   wiki/konfigurator/onboarding-ux.md]. Any "conversion" claim would be invented.
4. **No generated site has consent to be shown.** Every `PORTFOLIO[].consent` is `null` [repo:
   apps/pstrykweb.pl/src/data/portfolio.ts]. Client sites cannot appear in the portfolio until each business
   owner agrees, on top of the CetusPro OK.
5. **The honesty tension is a CetusPro call, not ours.** The old public landing says "prawdziwi deweloperzy,
   nie automatyczny generator". The factory is AI-driven with human review, and the wiki flags this
   [repo: wiki/known-issues.md § Landing page; wiki/plans/landing-v2.md § Owner decisions #3]. A portfolio
   case study about "a calibrated AI generation system" publicly describes PstrykWeb as AI-built.
   CetusPro must approve that framing (§ 8).
6. **Commits are authored as Claude by house rule.** Work was done with Claude Code as the coding agent,
   under a wiki and mechanical gates the owner designed [repo: CLAUDE.md § Git,
   wiki/conventions/working-with-claude.md].
   - [opinion] This is a strength for the AI-automation positioning if it is framed honestly. Suggested
     line: "I designed the system, its rules and its gates. AI agents wrote much of the code inside them."
   - Owner question Q9: what share of the code did you write yourself, and how do you want to describe
     that?

---

## 1. What it is, for whom, the business model, the problem, the timeline, the scale

**What.** The wiki calls PstrykWeb "PstrykWeb's factory". One `POST` to a Deno control plane enqueues a job.
A runner then boots an ephemeral container in which **headless Claude Code builds a production-ready
Next.js site for a local business end to end**. Each site gets its own repo and its own Vercel project.
Around the factory sit the following [repo: CLAUDE.md § intro]:
- the **prototype viewer**, where clients review and request edits
- the **email** templates
- the **shared Supabase** project
- **app.pstrykweb.pl**, which holds the konfigurator form that feeds the factory and the staff dashboard
  at `/admin`

**For whom.** Polish local service businesses that need a "wizytówka" website: salons, laser and make-up
studios, a notary, legal and architecture firms, mostly around Rzeszów. Shops, payments, logins and apps
are out of scope and referred to CetusPro [repo: wiki/business/pstrykweb.md § What it is, § Two markets].

**Business model, as the repo states it** [repo: wiki/business/pstrykweb.md § Pricing v5, § The process].
- The offer: a **free prototype in 3 business days**, then 2 free revision rounds, and payment starts
  only from launch day.
- Pricing:
  - a subscription at 299 zł/mo net for 12 months, or 249 zł/mo net for 24 months
  - a "Start+" variant from 119 zł/mo with a start fee
  - outright purchase for 8 900 zł net, or a 2 900 zł buyout after the contract
- No add-ons.
- PstrykWeb is "a product of CetusPro".
- A second US market, run through a separate outreach tool, also exists in the repo. It is confidential
  and out of scope here.

**The problem it solves** [repo: wiki/landing/design-direction.md § Positioning; wiki/business/pstrykweb.md].
- Local owners usually pay an agency up front ("Strona tej klasy u agencji: 4 000 - 8 000 zł z góry") and
  wait weeks.
- With PstrykWeb they answer simple questions in about 8 minutes and get a **real deployed site with their
  own content**, not a sketch.
- They mark changes on the live page and pay only if they like it.
- The hard part for the business is producing bespoke, good-looking sites at near-zero marginal labour.
  That is the factory.

**Timeline.** There is no `.git` folder in the checkout, so these dates are indirect.

| Date | Evidence | What |
| --- | --- | --- |
| ~2026-06-25 / 07-01 | oldest own files: `.claude/templates/root/.gitattributes`, `apps/api/deno.lock`, `apps/api/routes/init-new-project/handler.ts` [measured: file mtimes; weak evidence, copies can reset mtimes] | control plane + template framework exist |
| 2026-08-02 – 08-07 | measured run incidents (edit, context kill, disk, dropped socket) [repo: wiki/memory/pipeline-performance.md] | factory running real client builds; harness hardening |
| 2026-08-03 | design-quality calibration (rejected vs good site) [repo: wiki/memory/design-quality-measurements.md] | the quality bar becomes measurable |
| 2026-09-25 | wiki created; konfigurator Phase 1 built [repo: wiki/log.md] | |
| 2026-09-26 – 09-27 | shared `/admin` CMS kit for generated sites; staff dashboard; landing v2 Phase 0 + the Astro vs Next benchmark [repo: wiki/log.md] | |
| 2026-09-29 – 10-02 | landing v2 slices, legal pages, blog, regional SEO generator, pre-launch switch [repo: wiki/log.md] | |
| 2026-09-30 | app.pstrykweb.pl and viewer.pstrykweb.pl marked live [repo: wiki/architecture/overview.md § Domains] | |
| 2026-10-02 | last log entry (the latest file mtimes are from 2026-10) [repo: wiki/log.md] | |

→ Owner question Q2 asks for the real start date and the umowa zlecenie period. `year` = 2026.

**Scale facts (each sourced).**

| Fact | Value | Source |
| --- | --- | --- |
| Apps in the monorepo | 5: Deno control plane, konfigurator + staff dashboard (Next), prototype viewer (Next), emails (React Email), landing v2 (Astro) + `packages/shared` + `supabase/` | [repo: wiki/architecture/overview.md § Repo map] |
| Generated sites live (verified) | **13** live prototype builds on 2026-09-27; at least 18 were built, and 5 of 18 have since gone offline | [repo: wiki/landing/research.md § 5; apps/pstrykweb.pl/src/data/portfolio.ts] |
| Example build payloads | 32 JSON files (init + edit, some fictional/guest) | [measured: `ls apps/api/examples`] |
| Throughput | one build at a time, a practical ceiling of ~3–5 sites/day | [repo: wiki/pipeline/queue-and-kv.md] |
| UI locales | konfigurator, staff, landing: pl / eng / uk; viewer + emails: 35 locales (35 catalogs) | [repo: wiki/apps/viewer.md § Map; wiki/apps/email.md; wiki/log.md 2026-09-27] |
| Industries | 15 landing industries (16 palettes incl. universal) | [repo: wiki/design/industries.md; wiki/log.md 2026-09-27] |
| Landing v2 content | home + 15 industry pages, pricing, portfolio, FAQ (22 questions), redesign page, 5 legal docs, blog (8 fact-checked posts), 404 | [repo: wiki/log.md 2026-09-29 – 10-02] |
| Regional SEO generator (behind a flag, off) | wave a: 787 pages / 478 indexable; wave b1: 1 410 / 878; uniqueness gate in the build | [repo: wiki/log.md 2026-09-30] |
| Landing tests | 222 tests (2026-09-30) | [repo: wiki/log.md 2026-09-30] |
| Konfigurator | 12 step ids; ~8 min essentials path; contract test vs the real plane validator 25/25; pl/uk catalogs 683 msgids (at Phase 1) | [repo: wiki/apps/app-pstrykweb.md § Code layout; wiki/log.md 2026-09-25, 2026-09-27] |
| Framework shipped into every generated site | 31 skills, 1 command, a template monorepo; ~15.7k lines of craft and usage docs for the agent | [measured: `find .claude/skills -name SKILL.md`, `wc -l` over skills + template project-info] |
| Code size | ~150k lines of TS/TSX/Astro/shell/SQL/CSS across apps, templates, scripts and CI (api 25.8k, app 38.9k, landing 40.1k, templates 23k, viewer 6.6k, scripts 6.6k, …); 65 test files | [measured: `wc -l`, excluding node_modules and build output; includes some generated files, so treat it as an order of magnitude] |

---

## 2. Architecture

### 2.1 Every app and service

| Box | What | Stack | Runs on |
| --- | --- | --- | --- |
| **Control plane** (`apps/api`) | job queue, auth, dispatch, runner backends, provisioning, scheduler, preview/edit routes, owner-password routes | Deno + Hono (`jsr:@hono/hono ^4.12`), **Deno KV** (durable compare-and-set slot + FIFO), no npm deps | Deno Deploy (or local) [repo: wiki/architecture/overview.md; apps/api/deno.json] |
| **Runner** (`apps/api/docker`) | `claude-runner` image: entrypoint, `init-new-project.sh`, `edit-project.sh`, `publish.sh`, MCP config | Docker (node:20-bookworm-slim) + Claude Code CLI + MCP servers | GitLab CI job / GitHub Actions / local Docker, kept at **behavioural parity** [repo: CLAUDE.md § Invariants; apps/api/docker/Dockerfile] |
| **Framework** (`.claude/templates|skills|commands`) | what every generated site starts from: green boilerplate (Bun + Turborepo + Next 16 + Lingui + Tailwind + Supabase + Resend), skills (`gen-*`, `code`, `lighthouse-qa`…), QA harness (`.agents/quality/*`), the site's own routing wiki + craft rubric | Markdown + Node scripts + Playwright specs | copied into each container [repo: wiki/pipeline/generation-flow.md] |
| **Generated site** (per business) | own repo (GitLab at CetusPro, older ones on GitHub) + own Vercel project, `<slug>.vercel.app`, noindex until sold; ships a shared **`/admin` CMS kit** for the business owner | Next 16, React 19, Lingui, Tailwind, shadcn/Radix, Motion, Supabase schema `p_<site>` | Vercel [repo: wiki/pipeline/cms-and-site-admin.md; wiki/design/admin-panel.md] |
| **Konfigurator** (`apps/app.pstrykweb.pl`, public) | multi-step onboarding form; autosave (localStorage + revisioned PATCH + three-way merge); exactly-once submit to the plane | Next 16 App Router (webpack, React Compiler, typedRoutes), RHF + zod, TanStack Query, Lingui 5, Tailwind 3.4, Cloudflare Turnstile | Vercel [repo: wiki/apps/app-pstrykweb.md] |
| **Staff dashboard** (same app, `/<seg>/admin`) | for the marketing/sales team: sign-ups + where each stopped, staff edits a form for its owner, consent-gated e-mails with an exact Gmail preview, "Build now", projects with live previews, edit requests with drawings, the **launch switch** (`IS_FULL_PRODUCTION` via Vercel API), queue + worded failure causes, funnel analytics, konkurs judging, Legal page, Test e-mails, "Sample data" mode | same | Vercel [repo: wiki/apps/app-pstrykweb.md § Staff dashboard] |
| **Prototype viewer** (`apps/viewer.pstrykweb.pl`) | client opens a private token link: live site in a same-origin proxied iframe, pen + comment pins, light/dark + phone/desktop switch, "Send request" = a real edit job (2 free within 7 days) | Next 16, Lingui (35 locales), supabase-js (anon RPC), TanStack Query | Vercel [repo: wiki/apps/viewer.md] |
| **Emails** (`apps/resend` + edge fn) | deploy notifications (review link + panel password), form-ready, form reminder, admin-password, konkurs/newsletter mails; per-industry look; a content bar (`check.ts`: AA contrast per industry theme, ≤ 50 vars, every string translated, no em dashes) | React Email → Resend Templates API; Supabase Edge Function `send-emails` | Resend + Supabase [repo: wiki/apps/email.md] |
| **Supabase** (one shared project) | `public` (registry `projects`, `project_edits`, konfigurator + staff + konkurs tables), `private` (rate limits), **one `p_<site>` schema per CMS site**, a shared `auth.users` pool, buckets (`konfigurator-uploads`, `site-media`), RLS auto-enabled on every new table | Postgres + RLS + Auth + Storage + Edge Functions; pg_cron, pg_net, pg_jsonschema, pg_trgm, unaccent, vault | Supabase [repo: wiki/database/overview.md] |
| **Landing v2** (`apps/pstrykweb.pl`) | sales page: home + 15 industry pages personalised per industry, pricing chart, portfolio, FAQ, blog, legal, regional SEO generator; CTAs deep-link to the konfigurator with prefill | Astro 7.3 static + React 19 islands + Tailwind 4.3, WebGL shader after first interaction | Vercel (review deploys only today) [repo: wiki/plans/landing-v2.md § Tech] |
| **CI** | GitLab: stages `verify` (templates) → `image` (build runner) → `provision` → `run` (the Claude container), with a provision/run split so the run job never sees the provisioning token. GitHub: `claude-runner.yml`, `templates.yml` (boilerplate build, also weekly), `supabase-deploy.yml` | GitLab CI, GitHub Actions | [repo: .gitlab-ci.yml; .github/workflows/; wiki/log.md 2026-09-25 security] |
| External | Cloudflare Turnstile, Mobbin (design research, required), Google (reviews/hours, GA4 per site), Vercel API, the shadcn registries (Shoogle), fal.ai (wired, never exercised) | | [repo: wiki/pipeline/mobbin.md; wiki/log.md 2026-09-27] |

### 2.2 How a business owner's form becomes a website (request flow)

Sources: wiki/architecture/overview.md § Request flows, wiki/apps/app-pstrykweb.md § Submit and the
factory, wiki/pipeline/generation-flow.md, wiki/pipeline/quality-gates.md, wiki/api/calling-the-plane.md.

1. **The landing** sends a CTA to `app.pstrykweb.pl/<lang>/<industry>/` with a prefill fragment. The
   industry slugs match 1:1.
2. **The konfigurator** saves every change to localStorage. In the background it also saves a revisioned
   `PATCH` to `public.konfigurator_submissions`; a conflict returns 409 and is resolved with a three-way
   merge. A 192-bit draft token is the credential, and the resume link carries it.
3. **Submit** passes a series of gates, each cheaper than the next:
   1. a per-instance burst limit
   2. **Turnstile**
   3. a per-IP daily limit, shared in the DB with a keyed HMAC
   4. a server-built payload made **from the stored draft, never the request body**, validated against
      a strict mirror of the plane's validator
   5. a global daily build cap
   6. a **conditional UPDATE lock** (exactly-once), followed by `after()` sending
      `POST /init-new-project` server-to-server with the owner credential
4. **The plane** stores the job, returns `202 + poll URL` and queues it. It holds one slot at a time
   through Deno KV `atomic().check()`, because Deno Deploy isolates freeze between requests.
   - A timeout becomes `unknown` and is **never auto-retried**: staff decide.
5. **Before building anything**, the plane checks that Mobbin access works. It then seeds the new repo
   with the boilerplate and **proves the push**, deploys the boilerplate so the URL answers early, and
   provisions the Supabase schema `p_<site>`, the GA4 property, the Vercel project and the owner's `/admin`
   identity.
6. **The runner** starts the container with headless Claude Code and runs `/init-new-project`:
   1. **Phase 1, wiki:** the `gen-*` skills research and write the site's own spec. The design chain is
      gated as analysis → references → design.
   2. **Phase 2, configure:** brand, locales, tokens. Gate: typecheck + lint.
   3. **Phase 3, build:** every section, i18n, consent + analytics, privacy policy. The gate is the Stop
      hook (§ 3).
   - The runner owns all git pushes: a snapshot every 5 minutes plus milestones.
7. **Deploy.** A push leads to a Vercel deploy (Git integration on GitHub, an explicit CLI on GitLab). The
   site is deployed noindex.
8. **Callback.** The plane receives the terminal status, then the `send-emails` edge function sends a
   Resend template to the owner in their language, with the review link and the `/admin` password.
9. **The viewer** opens the token link, which resolves the project through an anon RPC and shows the
   site in a same-origin proxied iframe. Annotations become `POST /preview/edit` (token + rate limit) and
   then an **edit job**, which runs the same pipeline, lighter and diff-scoped.
10. **The staff dashboard** follows everything through `GET /queue` / `GET /jobs/:id`, a daily cron and a
    once-a-minute background refresh. When a site is sold, staff flip the **launch switch**
    (`IS_FULL_PRODUCTION` through the Vercel API: indexing on). Domain, handover and payment are still
    manual.
11. **The business owner** edits content later in the site's `/admin` kit, which writes to their own
    `p_<site>` schema under RLS through `is_site_admin()`.

### 2.3 Architecture drawing spec (for the code-drawn SVG; text alternative included)

Layout: four horizontal lanes, read left to right. Top: **People**. Then: **Our apps (Vercel)**.
Then: **Factory**. Bottom: **Data & services**. A fifth column on the right is **Output**.
Line styles follow `design/design.md` § Imagery:
- continuous = request
- dashed = async or callback
- chain (centre line) = deploy

**Boxes** (id: label · sub-label):
- P1: Business owner · phone or desktop
- P2: PstrykWeb team · staff
- A1: Landing · Astro, static, 15 industries
- A2: Konfigurator · Next 16, autosave
- A3: Staff dashboard · Next 16, /admin
- A4: Prototype viewer · Next 16, annotate + request
- F1: Control plane · Deno + Hono on Deno Deploy
- F2: Queue · Deno KV, 1 slot, compare-and-set
- F3: Runner · Docker on GitLab CI / GitHub Actions / local
- F4: Headless Claude Code · skills + MCP (Playwright, Mobbin, registries, Lighthouse)
- F5: QA gate · Stop hook: screenshots, check, e2e, Lighthouse, verifiers
- D1: Supabase · Postgres + RLS + Auth + Storage
- D2: send-emails · Edge Function
- D3: Resend · React Email, 35 locales
- D4: Turnstile
- O1: Git repo per site
- O2: Vercel project per site · noindex until sold
- O3: Site /admin · CMS kit

**Arrows** (from → to: label):
1. P1 → A1: reads; CTA + industry prefill
2. A1 → A2: deep link `/<lang>/<industry>/`
3. A2 ↔ D1: autosave (revisioned PATCH, 3-way merge)
4. A2 → D4: bot check
5. A2 → F1: `POST /init-new-project` (server-to-server, exactly-once)
6. F1 → F2: enqueue → 202 + poll URL
7. F2 → F3: dispatch when the slot frees (dashed)
8. F1 → O1: seed + push proof
9. F1 → D1: provision schema + `/admin` identity
10. F1 → O2: create the project
11. F3 → F4: run `/init-new-project` (wiki → configure → build)
12. F4 ↔ F5: "done?", then bounce with failures (loop arrow)
13. F4 → O1: autosave push every 5 min
14. O1 → O2: deploy (chain line)
15. F3 → F1: terminal callback (dashed)
16. F1 → D2 → D3 → P1: e-mail with the review link + panel password
17. P1 → A4: token link
18. A4 → O2: proxied live frame
19. A4 → F1: `POST /preview/edit`, which becomes an edit job (loops back into F2)
20. P2 → A3: triage, "Build now", launch switch
21. A3 → F1: `GET /queue`, `/jobs/:id`
22. A3 → O2: Vercel API, `IS_FULL_PRODUCTION`
23. P1 → O3 → D1: owner edits content (RLS `is_site_admin()`)

**Callouts.** One part-callout per lane, drafting style:
- "Part 01: one form, ~8 min"
- "Part 02: one job at a time"
- "Part 03: the gate the agent cannot talk past"
- "Part 04: site ships with its own CMS"

**Text alternative (draft).** A business owner fills an 8-minute form on app.pstrykweb.pl. The form is
autosaved to Supabase and sent once to a Deno control plane, which queues one build at a time. A
container running an AI coding agent researches, designs and builds a bespoke Next.js site, and it
cannot finish until automated quality checks pass. The site deploys to its own Vercel project. The owner
gets an e-mail, reviews the live prototype in a viewer where they can draw on the page, and their marks
become edit jobs in the same pipeline. Staff follow every lead and build in a dashboard and switch a site
to production when it is sold.

**Redaction for the public drawing.** No hostnames, no CI provider names unless OK'd, no schema naming
scheme, no credential names. "Deno Deploy", "Vercel", "Supabase" and "Docker" are fine once permission
exists.

---

## 3. The AI generation system: how quality was calibrated

### 3.1 What is safe to describe, at this level of abstraction

**Principle 1: a framework, not templates.** Every site gets a pre-built, green boilerplate: configs,
monorepo layout, i18n, build pipeline, QA gates, a routing wiki and a craft rubric. The agent never
rebuilds plumbing. It must still **invent the design direction, the sections, the copy and the code per
brand**. Visual templates were rejected as "slop" [repo: wiki/pipeline/generation-flow.md § Two
codebases].
- The cardinal rule: when a build goes wrong, fix the root cause in the framework so every future
  site gets the fix, never patch one site [repo: CLAUDE.md § mental model].

**Principle 2: research before design, enforced by order.** Each site writes its own spec first:
brief → audience → brand → structure → design analysis → references → design, then a wiki lint.
- Each design step refuses to run until the previous step's output exists.
- Mobbin (real product UI) is required: a job that cannot reach it **does not start**, and a degraded
  fallback must be declared, never passed off as equivalent.
- A per-section research pass was added after measurement showed that sections defaulted to their most
  obvious shape.
- A legal rule applies: inspiration, never copy [repo: wiki/pipeline/mobbin.md;
  .claude/skills/gen-design-analysis/SKILL.md; wiki/memory/design-quality-measurements.md § Root causes].

**Principle 3: taste turned into numbers.** Two sibling generated sites both self-scored as passing,
were both green and had zero layout or contrast failures. A reviewer called one "blocky, cramped, cheap"
and the other "genuinely good". The owner measured both at 1440 px [repo:
wiki/memory/design-quality-measurements.md]:

| Metric (1440 px) | rejected site | good site |
| --- | --- | --- |
| media area / page area | 8.6 % | 24.1 % |
| content sections with no visual | 60 % | 29 % |
| longest run of sections on one background | 4 | 1 |
| painted colour split (dominant / secondary / accent) | 88 / 11 / 1 | 78 / 21 / 0.5 |
| hero image share of hero area | 21 % | 100 % (full-bleed + scrim) |

These findings became:
- a weighted 0–10 rubric where **a measured failure caps a category**, so an overall 8 becomes
  "arithmetically unreachable"
- an automated **design-density e2e spec**, tuned until the rejected site fails 4 of 5 checks and the
  good one passes 5 of 5
- a colour contract: 60/30/10 by painted area, with dominant and secondary at least ΔL* 25 apart and a
  real brand token layer above shadcn's neutrals
- an "anti-AI-slop" instant-fail list
- a dark-scheme review judged as its own design

[repo: .claude/templates/root/.claude/project-info/design-quality.md § Score caps, color.md]

**Principle 4: gates the agent cannot talk past.** When the agent tries to stop, a **Stop hook** runs the
real checks and sends it back with the exact failures:
- committed screenshots of every route
- a visual-QA note
- typecheck + lint + build
- e2e
- i18n, CMS, asset and admin verifiers
- Lighthouse

Supporting rules [repo: wiki/pipeline/quality-gates.md]:
- A "success" with no screenshots is downgraded to a failure (proof of work).
- The gate count is capped, and the gate fails open if a command cannot start.
- The edit gate is scoped by diff, and it **fails closed**: if anything is uncertain, the full gate runs.

**Principle 5: gate only on what you can measure faithfully.**
- The same commit scored **59** mobile performance in the container vs **88** live, with ±20 jitter in
  the container. So Lighthouse gates on accessibility, best practices and SEO; performance only blocks
  below a floor, twice at most.
- Accessibility was the opposite: the container agreed with live, so it gates [repo:
  wiki/memory/pipeline-performance.md § 8–9].
- **13 live sites lost 10–35 mobile points to hero entrance animations.** A new e2e spec now checks the
  hero headline, lead, CTA and image in the first frame with JavaScript off [repo:
  wiki/pipeline/generation-flow.md § LCP candidates].

**Principle 6: harness reliability is part of quality.**
- Rescue continuations are classified by why a run died: turn cap, context overflow, dropped connection.
  A subscription usage limit is not rescued.
- Disk is measured and pruned on every tick.
- The boilerplate itself is built in CI and weekly, after a week in which every new seed failed to
  compile unnoticed.
- The run that started this: a five-hour-plus edit where the requested work **finished in the first
  25 minutes**. The rest was QA and foreground poll loops; 2h50m was waiting.
- Fix: the docs now give the mechanism, not just the intent ("an instruction with an intent and no
  mechanism gets one invented") [repo: wiki/memory/pipeline-performance.md].

**Principle 7: a self-improvement loop.** An operator-only skill audits a live generated site. It outputs
(a) an edit-job payload that fixes that site and (b) framework root-cause fixes for every future site.
Per-site audits are stored [repo: .claude/skills/self-improve/SKILL.md; wiki/audits/].

**Iterations visible in the record:**
- 2026-08-02 – 08-07: four measured run incidents → harness fixes
- 2026-08-03: design calibration → caps + density spec
- 2026-09-26: one shared `/admin` kit instead of per-site panels, plus a "panel can't invent parts" check
- 2026-09-27: LCP spec, per-locale `<html lang>`, MCP/registry guardrails, soft vs hard payload fields
[repo: wiki/log.md; wiki/memory/*]

### 3.2 Clearly confidential (never publish)

- The prompt and orchestration text: `apps/api/lib/prompt.ts`, `.claude/commands/init-new-project.md`,
  every `SKILL.md`, the template `CLAUDE.md`. Also the exact rubric weights and cap thresholds, unless
  CetusPro agrees. They are the product's IP.
- Run cost and token figures, and the fact that builds are budgeted against a Claude **subscription**
  ("daily build cap = the Claude subscription budget") [repo: wiki/apps/app-pstrykweb.md § anti-bot]. This
  raises commercial-terms questions. Keep it out entirely.
- Client names, slugs, payloads, audits and incident logs (all name real businesses).
- Security internals: the known H-level token-scope issues, dev-mode mechanics, the credential tiers, the
  shared auth-pool design details [repo: wiki/known-issues.md § Security].

---

## 4. Case-study material (content-model § Case-study body)

### 4.1 Before-state, owned scope, constraints

- **Before.** CetusPro had a static marketing landing with a konfigurator stub ("coming soon" CTAs).
  Sites were not produced automatically [repo: wiki/business/pstrykweb.md § Two markets: "konfigurator
  CTAs `coming-soon`"]. → Q3: what existed before you started?
- **Owned** [owner]: everything in § 2. The pipeline (Deno, Supabase, Docker), API, generation system,
  emails, konfigurator, staff dashboard and the landing (v2, see § 0.1). Team "solo", with CetusPro
  stakeholders (PM, marketing) as reviewers. → Q4: confirm, and name the reviewers' roles only.
- **Constraints, from the repo:**
  - Supabase on the **free plan** (one quota for everything)
  - Vercel **Hobby** (daily crons only)
  - one build at a time on one AI credential
  - GDPR (personal data in forms, consent records, retention)
  - Polish legal claims rules ("darmowy", prices)
  - three UI languages
  - a promise of a prototype "in 3 business days"
  [repo: wiki/database/overview.md; wiki/apps/app-pstrykweb.md § Hosting; wiki/pipeline/queue-and-kv.md;
  wiki/legal/README.md]

### 4.2 Decisions with rejected options (pick 3 for the page)

| # | Decision | Rejected | Evidence | Source |
| --- | --- | --- | --- | --- |
| **D1** | **Landing v2 on Astro 7 static + React islands** | Next 16 static export (what the other apps use) | Same page, pixel-identical, Lighthouse 13 simulated mobile, 3-run medians: **Astro 100 / LCP 1.66 s / 0 KB JS** vs **Next 95 / 2.92 s / 180 KB**. Next missed LCP < 2 s even with zero client components (~138 KB framework JS). 5 000 regional pages: Astro 20–50 s / 42 MB vs Next 99–243 s / 327 MB. Also: Lingui in Next 16.3 broke, and Next export silently drops POST handlers | [repo: wiki/landing/research.md § 6; wiki/plans/landing-v2.md § Tech] |
| **D2** | **Ship a framework, let the agent invent each design** | visual templates / a re-skinnable layout | "a canned look would be slop". On the landing, a live "try your industry" re-skin was built and then **dropped**, because it suggested a template while every site is designed from scratch | [repo: wiki/pipeline/generation-flow.md; wiki/log.md 2026-09-29 (Przymierz)] |
| **D3** | **Gate only on what the container measures faithfully** (a11y / BP / SEO; perf has a floor and 2 bounces at most) | gating every category at 90 incl. mobile perf | 59 in-container vs 88 live on the same commit; ±20 jitter; one run lost its final hour and ~400k context tokens chasing harness noise | [repo: wiki/memory/pipeline-performance.md § 8–9; wiki/pipeline/quality-gates.md] |
| **D4** | **Konfigurator as onboarding: essentials first (~8 min), soft fields optional with industry defaults** | the old ~15-minute all-in form; deleting fields the build uses | Evidence review: progress indicators help only fast-then-slow and when the promised time is true (Villar 2013 meta-analysis); defaults steer strongly (Jachimowicz 2019); folds over deletion (Baymard, NN/G). The plane contract was changed to match (only facts required) | [repo: wiki/konfigurator/onboarding-ux.md; wiki/log.md 2026-09-27] |
| D5 | **Exactly-once submit; a timeout = `unknown`, never auto-retried** | retry on failure | a build costs hours and a slot in a 1-at-a-time queue; a duplicate build is worse than a staff decision | [repo: wiki/apps/app-pstrykweb.md § Submit] |
| D6 | **Queue gate in durable Deno KV with compare-and-set** | an in-process array | Deno Deploy isolates freeze after a response; two POSTs can land on two isolates | [repo: wiki/pipeline/queue-and-kv.md] |
| D7 | **One shared Supabase project, a schema per site, a shared auth pool** | (not stated in the repo; presumably a project per site) | free plan, one quota; the cost is strict RLS discipline ("never `to authenticated using (true)`") | [repo: wiki/database/overview.md] → Q5 |

[opinion] Use **D1 + D2 + D3** on the case study. D1 is a measured benchmark that recruiters understand.
D2 is the product idea. D3 shows engineering judgement about measurement. D4 is the best fit if the page
needs a UX/product decision instead of D3.

### 4.3 The hard part

**[opinion] Recommended: "Making an autonomous agent ship non-generic design, and proving it."** The idea
is to turn a reviewer's taste ("blocky, cheap") into five measured checks and score caps, then calibrate
the thresholds against a known-bad and a known-good site (fails 4/5, passes 5/5). Two calibration traps
already paid for:
- footer sub-columns counted as sections, which made the good site fail
- un-fired scroll reveals measured as empty sections

[repo: wiki/memory/design-quality-measurements.md § Calibrating]

- Mini-demo (≤ 15 lines): a **rewritten** sketch of the "media share caps Composition" check, on fake
  page data. It is not copied from the repo.
- Alternate hard part: classifying how a headless run died, so finished work is not thrown away. The
  outcome field (`subtype`) reads "success" on a context kill, so only the terminal reason identifies it
  [repo: wiki/pipeline/quality-gates.md § Harness-limit rescue]. It makes a good ≤ 15-line snippet,
  rewritten.

### 4.4 Results, only measured or stated, with how they were measured

| Result | Value | How measured | Source |
| --- | --- | --- | --- |
| Live generated prototypes | 13 (2026-09-27) | each checked for the business name, the factory health route, noindex | [repo: wiki/landing/research.md § 5] |
| Generated sites, Lighthouse | desktop 95–99 on all 13; mobile 64–89 (before the LCP fix); CLS ≤ 0.043; a11y/BP 100 except 3 sites (93–96) | median of 3 mobile runs, ±10 between runs | [repo: wiki/landing/research.md § 5] |
| A generated site measured live | `/pl` mobile 88, desktop 100, LCP 2.8 s / 0.6 s, CLS 0 | post-deploy audit of the same commit | [repo: wiki/memory/pipeline-performance.md § 8] |
| Landing v2 | Lighthouse mobile **99/100/100/100 in all three locales** (2026-09-30); earlier lab home 99/100/100/100 ×3, LCP 1.8 s, TBT 0, 135 KB initial | Lighthouse on review/lab builds, **not production** (not launched) | [repo: wiki/log.md 2026-09-30; wiki/landing/research.md § 7] |
| Landing performance work | shader gated on first interaction + near the viewport: Lighthouse mobile 72–83 → 96–99; portfolio page LCP 3.8 s → 2.3 s; UK font fix CLS 0.17 → 0 | before/after Lighthouse | [repo: wiki/log.md 2026-09-29, 2026-09-30] |
| Konfigurator | real-throttled Lighthouse 91, LCP 1.1–1.5 s (it was the post-hydration paint); a11y 100; Playwright audit of every step × 16 industry starts × 3 locales × 4 phone widths (axe WCAG 2.2 AA, overflow, tap targets) | Lighthouse + Playwright + axe | [repo: wiki/log.md 2026-09-25, 2026-09-27] |
| Contract safety | konfigurator payload builder vs the real Deno validator: 25/25 | contract test | [repo: wiki/log.md 2026-09-27] |
| Pipeline | edit-run diagnosis: work done in 25 min of a 5h41m run; fixes shipped; **re-measurement pending** ("what to compare the next run against") | stream-json log analysis | [repo: wiki/memory/pipeline-performance.md] |
| Conversion / form completion | **none, no traffic yet** | – | [repo: wiki/konfigurator/onboarding-ux.md] |

### 4.5 What I'd do differently (the repo hints; the owner decides)

These are lessons the repo states itself:
- "the boilerplate is a shipped artifact, so it needs a gate"; the build gate came after a week of broken
  seeds
- "measure before optimising"
- "ship the tool with the bar"
- "a resource the pipeline never prints will kill a run silently"

[repo: wiki/memory/pipeline-performance.md § Cross-cutting lessons]

Other candidates:
- least-privilege per-job push tokens from day one (still open) [repo: wiki/known-issues.md § Security]
- portfolio consents before designing the showcase (now a launch blocker) [repo: wiki/known-issues.md § Landing v2]

→ Q6: which one or two are truly yours?

---

## 5. Full tech list (versions from package.json / deno.json / Dockerfile; ranges as declared)

| Group | Items |
| --- | --- |
| **Runtime + monorepo** | Bun 1.3.14 (`packageManager`), Turborepo ^2 (strict env mode), TypeScript ~6.0.3, Deno (Deno Deploy; version unpinned), Node 22 types |
| **Control plane** | Hono `jsr:@hono/hono ^4.12.27`, Deno KV (`--unstable-kv`), `@std/assert ^1.0.19`, `@std/expect ^1.0.20`, `@std/testing ^1.0.19` |
| **Konfigurator + staff dashboard** | Next ^16.2.0 (webpack, `babel-plugin-react-compiler ^1.0.0`, typedRoutes), React ^19.2.0, Lingui ^5.9.3 + `@lingui/swc-plugin ^6.1.0`, react-hook-form ^7.63.0, zod ^4.1.11, `@hookform/resolvers ^5.2.2`, TanStack Query ^5.95.2, supabase-js ^2.100.1, Radix (dialog ^1.1.15, dropdown-menu ^2.1.16, popover ^1.1.15, slider ^1.3.6, slot ^1.2.3), Tailwind ^3.4.17 + tailwindcss-animate, tailwind-merge ^3.6.0, class-variance-authority ^0.7.1, lucide-react ^0.545.0, sonner ^2.0.7; Cloudflare Turnstile |
| **Landing v2** | Astro ^7.3.5, `@astrojs/react ^7.0.0`, `@astrojs/mdx ^8.0.2`, `@astrojs/rss ^4.0.19`, Tailwind ^4.3.3 via `@tailwindcss/vite`, React ^19.2.0, sharp ^0.35.5; tooling: `@astrojs/check ^0.9.10`, Vitest ^5.0.2, `@playwright/test ^1.62.1`, `@axe-core/playwright ^4.13.0`, Lighthouse ^13.5.0, subset-font ^2.9.0, fontkit ^2.0.4; hand-written WebGL shader; Umami (cookieless, decided), Tally (newsletter) |
| **Prototype viewer** | Next ^16.2.0, React ^19.2.0, Lingui ^5.9.3 (35 locales), supabase-js ^2.100.1, TanStack Query ^5.95.2, Tailwind ^3.4.17 |
| **Email** | `@react-email/components ^1.0.12`, `@react-email/render ^2.0.9`, React 19.2.3, Resend Templates API; Supabase Edge Function (Deno) |
| **Data** | Supabase: Postgres + RLS, Auth, Storage, Edge Functions; extensions pg_cron, pg_net, pg_jsonschema, pg_trgm, unaccent, vault |
| **Infra / CI** | Docker (runner `node:20-bookworm-slim`; CI `docker:27-cli`, `oven/bun:1`), GitLab CI (self-hosted at CetusPro, own registry), GitHub Actions (3 workflows), Vercel (all apps + one project per generated site; Vercel API), Deno Deploy; git hooks (commit-msg Conventional Commits + wiki-drift + legal-drift checks, pre-commit secret scan, pre-push template/schema checks) |
| **AI / agents** | Claude Code CLI (headless, `@anthropic-ai/claude-code@latest` in the image), MCP servers: Playwright MCP, shadcn, Magic UI, Aceternity UI, Shoogle (registry search), lighthouse-mcp, fal.ai image (pinned 1.0.0, never exercised), Mobbin (via `mcp-remote 0.14.3`); `lingui-translate-ai ^1.0.2` + `@openrouter/sdk ^0.12.79` (catalog translation) |
| **Generated-site template** | Next ^16.2.0, React ^19.2.0, Lingui ^5.9.3, Motion ^12.40.0, radix-ui ^1.6.0, react-hook-form ^7.72.0, zod ^4.3.6, supabase-js, Resend ^4.8.0, React Email, Tailwind ^3.4.17, Playwright ^1.56.0 + axe |

**Stack chips (≤ 5) for the card**, as ids for the skills list [opinion]:
- **`claude-code` (AI agents) · `deno` · `supabase` · `nextjs` · `docker`**
- The alternate swaps `docker` for `astro`; that fits if D1 leads the case study.
- Hono, Turborepo, Resend, Astro and Vercel go in the case study's part list.

---

## 6. Proof chips and outcome lines

**Proof chip candidates.** One goes on the card; `source` is required.

| Chip | Source | Note |
| --- | --- | --- |
| **"13 sites live, built by the pipeline"** | wiki/landing/research.md § 5; `LIVE_BUILDS.countedAt 2026-09-27` | strongest and simplest; needs the OK to publish the count, no names. Recommended |
| "LCP 1.66 s vs 2.92 s: Astro over Next, measured" | wiki/landing/research.md § 6 | good for a decision stamp on the case study |
| "Landing: Lighthouse 99/100/100/100 in 3 languages" | wiki/log.md 2026-09-30 | **review build, not production**; use only after launch or label it "pre-launch build" |
| "Konfigurator: a11y 100, LCP 1.1–1.5 s" | wiki/log.md 2026-09-27 | |
| "One form → one deployed site, ~3–5 a day" | wiki/pipeline/queue-and-kv.md | the ceiling is a capacity statement, not a measured average |

**Outcome lines.** These are one line each, results not features:
1. "A pipeline that turns an 8-minute form into a deployed, bespoke website for a local business."
2. "Built the system behind PstrykWeb alone, from the form to the deploy; 13 sites live so far."
3. "Automated website production with quality gates instead of templates: every site designed, checked
   and deployed by the pipeline."

[opinion] Line 1 for the card. Line 2's "alone" belongs in the role field.

---

## 7. Theme proposal for the project sheet

The theme is derived from the **landing v2 tokens**, which are the newest brand expression. It is
consistent with the old landing's cream + teal + graphite [repo: wiki/landing/design-direction.md §
Visual system v2; wiki/design/design-system.md § The brand in one line]. Contrast was computed with the
WCAG formula this session [measured: node script].

| Token | Light (paper) | Dark (cyanotype variant) | Contrast |
| --- | --- | --- | --- |
| `paper` | `#F5F1EA` (brand cream; reads as warm cartridge paper, fits Drafting Table) | `#0E2B29` (the brand's deep teal-black, the "30 %" surface) | – |
| `ink` | `#13201F` (teal-black) | `#F5F1EA` | 14.87:1 / 13.36:1 |
| `accent` | `#2D7D78` (brand teal) for fills, lines and text ≥ 24 px; `#28726E` for small text | `#9FD8CB` (mint, the italic highlight on dark) | 4.32:1 (large only) · 5.01:1 small-text variant / 9.42:1 |
| (secondary signal, optional) | gold `#E6B450` as the CTA fill with ink text | gold text `#F0C46A` | ink on gold 8.78:1; gold text on deep 9.17:1 |
| `grid` | `#E4DDD1` (brand hairline) | `#1B4A47` | 1.20:1 / 1.52:1 (decorative, ≤ 1.3 on light ✔; dark is a bit strong, tune in S2) |

- **`motif`** (code-drawn SVG, from the subject) [opinion]:
  - **Primary: "the pstryk switch".** A drafting-style toggle switch in orthographic view, with a dimension
    line and a few "snap" strokes. "Pstryk" is the click or snap in Polish, and the landing's own 404 is a
    light switch [repo: wiki/log.md 2026-09-30 404].
  - **Secondary, for the case-study architecture: a production line.** A form sheet enters at the left,
    passes three stations drawn as callouts ("research", "build", "gate"), and leaves as a browser
    outline that inks in. This echoes the repo's own word, "factory".
  - Use colours only. **Never the PstrykWeb logo or wordmark** without CetusPro's trademark OK.
- **`typeAccent`** (optional): the brand's signature is a headline ending in a highlighted fragment, set
  in a serif italic (Literata italic on v2). The sheet could set the outcome's last phrase in italic
  accent. Check the font budget (≤ 100 KB total): the PL subset of Literata italic measured 18 KB [repo:
  wiki/landing/research.md § 7].
- **`motion`**: "pstryk: quick, confident, never floaty" [repo: wiki/landing/design-direction.md § Motion
  system]. A short snap-in (~200 ms ease-out) for the stamp and the switch; no long drifts.
- **`media.kind`: `both`.** The desktop browser frame shows the viewer, the dashboard or a generated
  site; the overlapping phone shows the konfigurator. The konfigurator is mobile-first, and its audit
  targets 320–430 px.

**Shot list (the owner records the finals).** Use fictional data only and a dry-run or sample mode
everywhere. Never use a real lead or a real client site without that business's consent.
1. **Phone, konfigurator** (390 × 844, ~12 s loop):
   - start
   - industry chip prefilled from a landing link
   - "Co Cię wyróżnia"
   - the honest "about N min left" bar
   - summary with "Make it yours"
   - the prep beat
   Use a tester key on a dry-run deployment. **This is the phone loop.**
2. **Desktop, prototype viewer** (1440 × 900):
   - a demo prototype in the frame
   - draw with the pen, drop a pin, switch phone/desktop and light/dark
   - "Send request"
   **This is the desktop loop / poster candidate.**
3. **Desktop, staff dashboard in "Sample data" mode:** overview → sign-up detail with the timeline →
   projects grid with live previews → Queue page with a build in progress and a worded failure cause →
   the launch switch. No real names; Sample data is fictional by design [repo:
   wiki/apps/app-pstrykweb.md § Staff dashboard].
4. **Pipeline time-lapse:** the agent's committed QA screenshots of one fictional demo build (seed
   boilerplate → final), or the queue/job log with the payload hidden.
5. **A generated site** (desktop + phone scroll, light + dark): only a **fictional demo business built by
   the factory**, or a client site with written consent.
6. **Generated site `/admin` kit:** the demo preview mode (`ADMIN_PREVIEW`, example business), editing a
   text and a photo [repo: wiki/landing/design-direction.md § Positioning].
7. **Landing v2**, once launched or recorded from the review deploy:
   - the hero switching industries (re-tint + sample site)
   - the "Jak to działa" scroll story
   - the pricing chart's month slider
   - the 404 light switch
   Exclude the placeholder portfolio.
8. **E-mail:** the staff "Test e-mails" page rendering a template in the Gmail-exact preview, with
   fictional data.

---

## 8. Confidentiality map

| Safe to publish now (already public) | Needs the owner's + CetusPro's written OK | Must stay private |
| --- | --- | --- |
| PstrykWeb exists; pstrykweb.pl's public offer and prices; that it is a CetusPro product; app.pstrykweb.pl is a pre-launch form with a waitlist; the public domains | that **Mateusz built it, solo**, under an umowa zlecenie (his name is on no live page today; v2 adds "Główny deweloper PstrykWeb" only once launched [repo: wiki/log.md 2026-10-02]) | prompt, skill, command and rubric text; orchestration details beyond § 3.1's level |
| generic tech names that are visible from outside (Next.js, Vercel) | that sites are **AI-generated** (conflicts with the old landing's "nie automatyczny generator") | run costs, token use, the subscription-based build budget |
| | the architecture drawing (redacted as in § 2.3); the stack list; decisions D1–D7; the measured numbers in § 4.4 | client names, slugs, payloads, audits, incident logs, any client data |
| | screenshots or recordings of the konfigurator, viewer, dashboard and generated sites (fictional data only) | internal hostnames (control plane, registry, Git server), the Supabase project ref, env/secret names, staff account e-mail |
| | the "13 sites live" count; mentioning CetusPro by name and linking it | known security issues, dev-mode mechanics, credential tiers, auth-pool details |
| | rewritten code snippets for the hard part (no verbatim repo code) | the US-market product/outreach, internal people's names, legal drafts and counsel status, `LEGAL.md`, the free-plan quota state |
| | any **client site** (also needs that business owner's consent) | the old landing's internals (not his repo) |

- **NDA level now: L2** (anonymised: no client names, no internal hosts). **L3** for the hard part
  (rewritten on fake data).
- **Target: L0** (written permission from CetusPro).
- `rights`: `{ holder: "CETUSPRO sp. z o.o." [assumption: commissioned work], permission: pending, note:
  "umowa zlecenie; check the IP clause + ask for a written portfolio permission incl. the AI framing" }`.
- `context=client` + `permission ≠ yes` means the **launch gate blocks the project** per
  `content/content-model.md`.

---

## 9. Temporary media (captured 2026-10-05; **temporary placeholder, owner will record final**)

Method:
- Playwright 1.63 Chromium, `locale pl-PL`, scripts `pw-probe.mjs` and `pw-capture.mjs` in the
  session scratchpad `tools/`.
- First-viewport shots at DPR 2 (390) and DPR 1 (1440); full-page at DPR 1 after one scroll pass that
  fires lazy content.
- Videos are a 12 s easeInOut scroll (`recordVideo`), ~15.8 s total including load.
- No form was touched.

| File | What | Size |
| --- | --- | --- |
| `assets/projects/pstrykweb/landing-home-390-viewport.jpg` | pstrykweb.pl/pl/ first viewport, 390 × 844 @2x | 95 KB |
| `assets/projects/pstrykweb/landing-home-390-full.jpg` | full page, 390 × 13 734 | 606 KB |
| `assets/projects/pstrykweb/landing-home-1440-viewport.jpg` | first viewport, 1440 × 900 | 85 KB |
| `assets/projects/pstrykweb/landing-home-1440-full.jpg` | full page, 1440 × 9 251 | 827 KB |
| `assets/projects/pstrykweb/app-konfigurator-start-390-viewport.jpg` | app.pstrykweb.pl/pl/ ("Formularz ruszy już wkrótce" + waitlist), 390 @2x | 79 KB |
| `assets/projects/pstrykweb/app-konfigurator-start-1440-viewport.jpg` | same, 1440 | 40 KB |
| `assets/projects/pstrykweb/raw/landing-home-390-scroll.webm` | scroll recording, 390 × 844, 15.8 s | 2.0 MB |
| `assets/projects/pstrykweb/raw/landing-home-1440-scroll.webm` | scroll recording, 1440 × 900, 15.8 s | 2.2 MB |

The konfigurator page is one viewport tall, so its full-page shots matched the viewport and were not
kept.

**Do not publish any of these. They are layout placeholders only:**
1. They show the **old landing**, which is not this repo and may not be his work (§ 0.1).
2. That page contains **stock photos of people**, which design.md does not allow, and **thumbnails of
   third-party sites** ("Kilka stron, które już zrobiliśmy").
3. They show PstrykWeb branding without permission.

The admin login and the viewer were not captured, on purpose.

---

## Open questions for the owner

- **Q1.** Which landing did you code: the live one (old repo; the wiki names a CetusPro PM as its
  owner) or v2 in this monorepo (Astro, not launched yet)? Both? Can you share a review-deploy link
  or record v2 locally?
- **Q2.** The real start and end dates of the umowa zlecenie, and of the first factory run (the
  checkout has no git history; the earliest files are from ~2026-07-01).
- **Q3.** What existed before you started (old landing, konfigurator stub, any pipeline)?
- **Q4.** Team: confirm "solo". Who reviewed or decided (roles only, e.g. a CetusPro PM, marketing)?
  Did anyone else commit code?
- **Q5.** Why one shared Supabase project with a schema per site instead of a project per site (cost
  only, or also ops)? It makes a good decision row if you tell the rejected option.
- **Q6.** "What I'd do differently": pick one or two from § 4.5, or give your own.
- **Q7.** Is CetusPro OK with (a) your name + "built solo", (b) describing the sites as AI-generated,
  (c) the architecture drawing, (d) the measured numbers, (e) fictional-data screenshots, (f) the
  "13 live" count? Please get it in writing (target L0).
- **Q8.** Any real outcome to report after launch: prototypes delivered, sold sites, a form completion
  rate from the dashboard's funnel? (None exists today; the field stays without a business metric until
  then.)
- **Q9.** How do you want to describe AI-assisted development? (Commits are authored as Claude by house
  rule.) Suggested: "I designed the system, rules and gates; AI agents wrote much of the code inside
  them."
- **Q10.** May a generated client site appear, if its business owner agrees? Which ones (the wiki's
  showcase order starts with a hair salon, an architecture firm and a make-up artist)?
- **Q11.** `status`: "in-progress (pre-launch)" or "live" (the factory and apps run on their domains,
  but the form is closed)?

**Not covered:**
- the landing app's reusable code (separate audit `2026-10-05-pstryk-reuse-audit.md`)
- the US-market variant
- a line-by-line read of the prompt and skill files (confidential; only structure was read)
- the database schema columns
- the viewer's and dashboard's own research files and screenshots in `wiki/design/`
- capturing landing v2 (not public), the viewer (needs a token) and the staff dashboard (login)
- verifying the 13 prototype URLs live today (not opened, client sites)
- Lighthouse re-runs (all numbers are as recorded in the repo)
