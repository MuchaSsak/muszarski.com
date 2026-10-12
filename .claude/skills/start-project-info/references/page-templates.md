# Page templates for `.claude/project-info/`

Starting structures for each page. Drop sections that don't apply, keep headings stable so later
sessions know where to look, and replace every `<…>` with real content or `Unknown`. Source tags:
`[user]` `[repo: path]` `[file: name]` `[web: url]` `[research]` `[assumption]`.

## Contents

- root: CLAUDE.md (the router) · CLAUDE.local.md (personal, gitignored)
- README.md · project-brief.md · requirements.md · technologies.md · conventions.md
- working-agreement.md · lessons.md · open-questions.md · log.md
- audience.md · brand.md · competitors.md
- design-references.md · design.md · research/inspirations/<slug>.md (comps and the review page: `look-first.md`)
- assets.md · structure.md · api.md · data-model.md · compliance-and-data.md
- monetization.md · analytics.md · seo.md · i18n.md · operations.md

---

## CLAUDE.md (repo root: the router, loaded in every session)

```markdown
# <Project> - <one line>

<2-4 sentences: what this repo is and the one mental model that matters.> The knowledge lives in the
wiki at `.claude/project-info/` (map: `.claude/project-info/README.md`). This file is the router and
the non-negotiables: read only the pages your task needs. Paths are plain text on purpose (no @imports).

## Routing table

| Task touches | Read |
| --- | --- |
| **How a session works here**: new chats, quality bar, compaction, pausing, reports, lessons / memory | `.claude/project-info/working-agreement.md` (+ `.claude/project-info/lessons.md`) |
| Goals, scope, priorities, what we are NOT building | `.claude/project-info/project-brief.md`, `.claude/project-info/requirements.md` |
| Stack, commands, env var names, deploy | `.claude/project-info/technologies.md` |
| Code style, folders, git, definition of done | `.claude/project-info/conventions.md` |
| <one row per page or task area, in the words people type> | `.claude/project-info/<page>.md` |
| Anything unresolved, known gaps | `.claude/project-info/open-questions.md` |

## Invariants (break none)

- <non-negotiable> (`.claude/project-info/<page>.md`)
- Never read real `.env` files or secrets; name env vars, never values.

## How every session works

- Start: read the routed pages (the prompt hook lists them) and apply the lessons (the session card carries them).
- Keep working through compactions until the task is done or the user says stop.
- Finish: verify → update the page + `log.md` → add lessons → commit per the working agreement → short report.
- Details: `.claude/project-info/working-agreement.md`. Personal rules: `CLAUDE.local.md` (gitignored).

## Commands

| Do | Run |
| --- | --- |
| dev / test / lint / build | `<exact command>` |
```

## CLAUDE.local.md (repo root, gitignored: one person's rules)

```markdown
# <Name>'s personal rules (gitignored; loaded next to CLAUDE.md in every session)

A later explicit instruction in the chat wins.

- **Language:** <reply and report language; code, commits and wiki in English>
- **Autonomy:** <work until done unless told to stop | check in at milestones>; compaction is not a pause.
- **Pausing:** when I pause you (<their words>) and when a task is finished: <commit rule>, then two lines: where you stopped, what's next.
- **Commits:** <who, as whom (`--author=...`), format>; push: <never | when asked | always>.
- **Reports:** <length, structure, anything they asked for at the end of a phase>.
- <anything else they said "always" / "never" about, with the date>
```

## README.md (the map of the wiki)

```markdown
# <Project> - project info

> The knowledge base for people and agents working on <project>. Root `CLAUDE.md` routes tasks to
> these pages; this file maps them. Last updated <date>.

## Map
- `project-brief.md` - <one line>
- `working-agreement.md` - how every session runs
- `lessons.md` - one-line lessons, injected into every session
- ...one line per page that exists...
- `log.md` - history of this wiki
- `research/` - raw research notes (unrouted; conclusions live in the pages above)

## Not written yet
- `<page>.md` (phase <X>; open question #<n>)

## Rules
- Read only what the task needs (routing table in CLAUDE.md). The code wins over a page: fix the page.
- One home per fact; link instead of copying. Update the page in the same change as the code.
- A new page gets a routing-table row in CLAUDE.md and a line here.
- Append one line to `log.md` per change. Never put secrets in a page.
```

## project-brief.md

```markdown
# Project brief

## One-liner
## Problem and why now
## Goal and success metrics   (| metric | target | by when | source |)
## Scope
- In (v1):
- Later:
- Out of scope:
## Constraints   (budget, deadline, required tech, team, legal, locales)
## Stakeholders and decision rights   (who approves what)
## Risks
```

## requirements.md

```markdown
# Requirements

## Users and roles
## Features   (| id | feature | priority must/should/could | acceptance criteria | status |)
## Key flows   (numbered steps per flow; edge cases + error states)
## Non-functional   (performance budgets, accessibility level, security, browsers/devices, uptime)
## Explicitly not building
```

## technologies.md

```markdown
# Technologies

| Layer | Choice | Version | Why | Source |
| --- | --- | --- | --- | --- |
| language / framework / styling / state / DB / auth / hosting / email / analytics / testing | | | | |

## Repo layout   (top folders and what lives where)
## Commands   (dev, test, lint, build, deploy — exact)
## Environment variables   (NAME | purpose | where set | required?)  — names only, never values
## External services and limits   (free-tier terms, quotas, commercial-use restrictions)
## Decisions   (date | decision | alternatives rejected | reason)
```

## conventions.md

```markdown
# Conventions
## Code style and naming
## Folder rules   (where new code goes)
## Error handling, logging (what must never be logged)
## Testing bar
## Git   (branches, commit format, review)
## Definition of done   (checklist)
## Do NOT
```

## open-questions.md

```markdown
# Open questions

| # | Question | Blocks | Who can answer | Default if unanswered | Status |
| --- | --- | --- | --- | --- | --- |
```

## log.md

```markdown
# Log (append-only, newest last)

## [YYYY-MM-DD] init | Created project-info: <pages>. Sources: <user brief, repo, N research sources>.
```
(`<area>` after the date is one word or slug: `init`, `api`, `design-system`; the lint rejects spaces.)

## working-agreement.md

```markdown
# Working agreement: how every session works here

> Read once per session: the SessionStart hook points here at startup and after every compaction.
> This page owns HOW we work; WHAT the project is lives in the routed pages. Personal rules:
> `CLAUDE.local.md`. The latest explicit instruction beats both.

## 1. Start
1. Read the pages the prompt hook lists and the routing-table rows the task touches, then the code.
   The code wins over a page (then fix the page).
2. Apply `lessons.md` (the session card carries its Rules). Unfinished work (uncommitted files, a
   plan in progress): read its plan or status before touching it.
3. Dated decisions in pages are settled; a new instruction that contradicts one updates that page.

## 2. Quality bar
- Do the whole ask, including messages that arrive mid-task (fold them in, say so in one line).
- Done means: <typecheck + lint + tests; UI: screenshots at 390/768/1024/1440, dark mode, reduced motion>.
- Edge cases are part of the feature: empty states, very short and very long text, other locales,
  free user input, small phones without horizontal overflow, keyboard and screen reader.
- Nothing fake presented as real: placeholders and sample data are tracked in `open-questions.md`
  (or the page that owns them) and block any "done" / "ready for production" claim.
- Research before design; a source behind every number shown to users.
- A new look or a big visual change is shown as live comps (desktop + phone) for the owner to pick
  before it is built; every version is kept (`comps/HISTORY.md`).
- Ask only when blocked on a decision that is genuinely the owner's; otherwise take the default and say so.

## 3. Long tasks and compaction
- Context compacts automatically. Compaction is not a stop: keep working on the current task.
- After a compaction: re-read a file before editing it, check `git status` / `git diff` for what is
  really done, re-run the last failing check.
- Keep the state recoverable: docs updated with the change, plan status current, long commands in the background.

## 4. Pausing and resuming
- Only the user pauses (stop, pause, wait, an interrupt). At a pause and at a finished task: commit
  per `CLAUDE.local.md`, then two lines: where you stopped, what comes next.
- "continue" / "go" resumes from that next step without asking again.

## 5. Finishing a task
1. Verify at the scale of the change and read the real output.
2. Docs in the same change: the page that describes the behaviour + a `log.md` line.
3. Lessons (§ 7).
4. Commit in <the team's message format>; author and push per `CLAUDE.local.md`. Never skip hooks.
5. Report (§ 6).

## 6. The report
- Short, in the user's language (`CLAUDE.local.md`). Order: what changed (as the user sees it) → decisions you made for them, with
  the reason → what you did NOT verify → what they must do (exact commands, env vars, deploy order) →
  what still blocks release.
- Numbers from real output ("tests 42/42"), never "should work".

## 7. The lessons loop
- Write a lesson when the user corrected you, a tool or approach failed and you found what works, you
  lost time rediscovering something, or a check caught a mistake you would make again.
- Where: a product fact or decision → its routed page; a measured number → `memory/<topic>.md`; how to
  work here (tool gotcha, process, a preference about the work) → `lessons.md` `## Rules`.
- Shape: one imperative line, why, the date. Cap 60 rules: merge duplicates, delete what stopped being true.
- Promote a lesson that keeps coming back into a mechanical check (test, lint rule, hook), then point the line at it.

## 8. The machinery
| Piece | Does |
| --- | --- |
| `CLAUDE.md` | routing table + invariants + this page's pointer; loaded every session, kept through compaction |
| `CLAUDE.local.md` | personal rules, gitignored, loaded the same way |
| `.claude/hooks/session-start.mjs` (SessionStart) | at startup, resume, clear and after every compaction: this page's pointer, the lessons, the in-flight git state |
| `.claude/hooks/wiki-context.mjs` (UserPromptSubmit) | the ≤ 5 routed pages for each prompt |
| `.claude/hooks/wiki-check.mjs` (Stop + by hand) | code changed without the wiki: blocks the stop once; lints the wiki |
```

## lessons.md

```markdown
# Lessons: how to work in this project

> Mistakes already paid for, as one-line rules. `.claude/hooks/session-start.mjs` injects the "Rules"
> section into every session and after every compaction, so it stays short: no more than 60 rules,
> merged and pruned. How to add, place and promote one: `working-agreement.md` § 7. Product facts
> live in their own page, not here.

## Rules

### The user's way of working
- <their correction, as an imperative> - <YYYY-MM-DD>.

### Tools and environment
- <gotcha + what works instead> - <YYYY-MM-DD>.

### <Area>
- <lesson> - <YYYY-MM-DD>.
```

## audience.md

```markdown
# Audience
## Primary segment   (who, context, job-to-be-done, triggers, objections, channels)
## Secondary segments
## Not for
## Evidence   (each claim with a source; inferred items marked [assumption])
```

## brand.md

```markdown
# Brand
## Identity   (name, legal entity, one-line positioning, story — facts only)
## Voice and tone   (3 adjectives, do/don't examples, formality/address form per language)
## Microcopy rules   (CTA style, punctuation rules, words to avoid, claims never to make)
## Logo, colors, fonts provided   (→ assets.md)
```

## competitors.md

```markdown
# Competitors
| Name | URL | Positioning | Pricing | Strengths | Weaknesses | Source/date |
## Where we differ
```

## research/inspirations/<slug>.md

```markdown
# <Source name> — <url or Mobbin link>
Studied: <date> · Category: <same-category | same-feel> · Platform: <web/iOS/Android>
## What works   (layout, hierarchy, spacing rhythm, density text vs visuals, motion)
## Steal (as a pattern, re-expressed in our tokens)
## Skip
## Screenshots   (files in this folder; research only, never shipped)
```

## design-references.md

```markdown
# Design references (synthesis of research/inspirations/)
## Direction   (category + mood; 3 words; what it must never look like)
## Patterns we adopt   (| pattern | seen in | why it fits us |)
## Per section / screen   (hero, nav, lists, forms, empty states… → reference patterns)
## Anti-patterns   (generic template looks to avoid)
```

## design.md

```markdown
# Design system
## Direction   (picked by <owner> on <YYYY-MM-DD> from comps round <N>: `comps/<file>.html`; the floor it beats; history: `comps/HISTORY.md`)
## Art direction   (mood, signature element — the one memorable thing)
## Color tokens   (| token | value | use | contrast notes |)  light + dark if both
## Typography   (families + licences, scale, weights, line heights)
## Spacing, radii, shadows, grid, breakpoints
## Components   (what exists / source library + licence / states)
## Motion   (durations, easing, reduced-motion rule)
## Imagery   (style, treatment, what AI imagery may and may not depict)
## Accessibility   (target level, focus, contrast, touch targets)
## Do / Don't
```

## assets.md

```markdown
# Assets
## Sourcing policy   (allowed sources; forbidden sources; who approves; AI generation yes/no)
## Inventory
| File | What | Source | Licence / rights holder | Allowed use | Notes |
## Missing / needed   (→ open-questions.md)
```

## structure.md

```markdown
# Structure
## Sitemap / screen map   (tree)
## Per page / screen   (purpose, sections in order, content source, CTA, forms, embeds)
## Navigation, footer, legal pages
```

## api.md

```markdown
# API and integrations
## Endpoints   (| method | path | auth | request | response | errors |)
## Auth model
## External services   (| service | purpose | data sent | limits | docs |)
## Rate limits, idempotency, versioning
```

## data-model.md

```markdown
# Data model
## Entities   (| table | purpose | key columns | personal data columns | owner |)
## Relationships
## Access rules   (who can read/write what)
## Migrations workflow
```

## compliance-and-data.md

```markdown
# Compliance and data (facts, not legal advice)
## Data touchpoints   (| surface | data collected | stored where | purpose | legal basis [Unknown unless given] |)
## Cookies and browser storage   (| name/key | set by | purpose | category | lifetime |)
## Processors / third parties   (| vendor | purpose | data | region [verify] |)
## Consent mechanisms   (what is actually built)
## Retention and deletion   (only what is decided; else Unknown)
## Regions / regulations in scope
## Required legal pages
```

## monetization.md

```markdown
# Monetization
## Model   (subscription / one-off / usage / ads / free)
## Plans and prices   (| plan | price | billing | includes | source |)
## Promises made to customers   (SLAs, refunds, trials — exact wording + where published)
## Payment provider and flows
```

## analytics.md

```markdown
# Analytics
## Questions we need answered
## Events   (| event | when | properties (no PII) |)
## Funnels and KPIs
## Tools, consent gating, retention
```

## seo.md

```markdown
# SEO
## Target queries per page
## Metadata rules   (title/description length, OG, structured data)
## Locales and URLs
## Content plan
```

## i18n.md

```markdown
# Internationalization
## Locales   (default first) and URL scheme
## Translation workflow and tools
## Formatting rules   (dates, currency, plurals, address forms)
```

## operations.md

```markdown
# Operations
## Environments   (dev / preview / prod: URLs, who can deploy)
## Deploy steps
## Monitoring and alerts
## Backups and restore
## Runbooks   (common incidents → fix)
```
