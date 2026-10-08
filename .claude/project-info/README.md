# Mateusz Muszarski portfolio - project info

> The knowledge base for people and agents working on the portfolio. Root `CLAUDE.md` routes tasks to
> these pages; this file maps them. Last updated 2026-10-05.

## Layout

```
project-info/
├─ README.md · working-agreement.md · lessons.md · open-questions.md · log.md   (root: hooks expect these here)
├─ product/    WHY + WHAT: brief, requirements, audience, brand voice
├─ content/    WHAT THE SITE SAYS: content model, project index, one dossier per project
├─ site/       HOW IT IS ORGANISED + FOUND: structure, SEO, i18n, analytics
├─ design/     HOW IT LOOKS: design system, references, quality rubric, assets
├─ tech/       HOW IT IS BUILT: technologies, conventions, usage/ library
├─ legal/      compliance facts behind the legal pages
├─ memory/     measured numbers (Lighthouse, weights, timings)
└─ research/   raw dated research (unrouted; conclusions live in the pages above)
```

## Map

Root:
- `working-agreement.md` - how every session runs: start, quality bar, compaction, pausing, finishing, report, lessons loop
- `lessons.md` - one-line lessons, injected into every session
- `open-questions.md` - every Unknown, who answers it, what it blocks
- `placeholders.md` - not-real register: every placeholder, dummy link and temporary asset in use; cleared on "wrap up / go to prod"
- `log.md` - history of this wiki

product/:
- `project-brief.md` - vision, goal, success metrics, scope in/out, constraints, risks
- `requirements.md` - users, features F01–F24 with acceptance criteria, key flows, budgets
- `audience.md` - software-house readers, what PL offers ask for, objections → evidence, seniority framing
- `brand.md` - identity, positioning (H1 + proof line), pillars, voice per locale, microcopy rules, claims never to make

content/:
- `content-model.md` - fields of project, case study, CV (+ the CV sync rule), credential, skill, blog post, site facts
- `projects.md` - project index: flagship order, dossier links, archive rules
- `projects/pstrykweb.md` - PstrykWeb (flagship 1): facts, what it proves, rights, presentation
- `projects/linkoglot.md` - Linkoglot (flagship 2)
- `projects/neoteric-clockful.md` - Neoteric Clockful (flagship 3)
- `projects/space-portfolio.md` - 3D space portfolio, the old site (flagship 4)

site/:
- `structure.md` - sitemap, sections per page, navigation, footer, CTA inventory
- `i18n.md` - locales, URL scheme, Lingui wiring, translation workflow, formatting
- `analytics.md` - Umami events, funnels, KPIs
- `seo.md` - target queries, entity strategy, JSON-LD graph, metadata rules, indexing setup, content plan, domain move

design/:
- `design.md` - Drafting Table art direction, signature moment, per-project themes, tokens, motion, imagery, do/don't
- `assets.md` - sourcing policy, asset folders (what is in git), inventory with rights, missing media
- `design-quality.md` - the 0–10 rubric for a rendered view: craft rules, a11y gates, instant fails, score bands, quick diagnostic
- `design-references.md` - the sheet system, per-flagship compositions, per-section and per-page patterns, registry components, anti-patterns

tech/:
- `technologies.md` - stack + versions, hosting options, env var names, commands, spikes S0–S5, decisions
- `conventions.md` - code style, folders, git, testing bar, do-not list
- `usage/turborepo.md` - the monorepo: layout, bun commands, Vercel settings, the pre-push deploy check
- `usage/astro.md` - how pages, components, Tailwind tokens, CSP and robots are written in `apps/web`
- `usage/lingui.md` - writing copy, the extract → translate → test → build loop, `typo()`
- `usage/visual-qa.md` - the evaluate step: gates, screenshots, scoring, accepting proof

legal/:
- `compliance-and-data.md` - GDPR scope, data touchpoints, device storage (PKE 399), processors, required legal pages, rights to showcased work, INF names

research/ (raw, unrouted): start with `research/2026-10-05-synthesis.md`; reusable measurement scripts in `research/tools/`.

memory/:
- `run-notes.md` - measured command timings and tool gotchas (read at the start of coding tasks)
- `slice-costs.md` - what each closed slice spent of the JS / font / LCP budgets

## Not written yet

- `content/credentials.md`: when the owner sends credentials (open-questions Q10)
- more `tech/usage/*.md` as stacks arrive (motion/GSAP, three/OGL, Resend + Turnstile), each in the slice that needs it

## Rules

- Read only what the task needs (routing table in CLAUDE.md). The code wins over a page: fix the page.
- One home per fact; link instead of copying. Update the page in the same change as the code.
- **Basenames are unique across the wiki,** so a bare name in backticks (`requirements.md`) is unambiguous.
  Paths in backticks are relative to `.claude/project-info/`.
- A new page gets a routing-table row in CLAUDE.md and a line here, in the right folder.
- Routing words (from lessons, 2026-10-05): a generic phrase in one row outscores a project name, so put shared task
  words in every row they apply to and re-run `node .claude/hooks/wiki-context.mjs --test "<prompt>"`.
- Append one line to `log.md` per change. Never put secrets in a page.
- Source tags on facts: `[user]` `[repo: path]` `[file: name]` `[web: url]` `[research]` `[assumption]`.
