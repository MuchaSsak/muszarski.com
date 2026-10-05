---
name: wiki-lint
description: "Health-check the .claude/project-info wiki: runs the mechanical lint (node .claude/hooks/wiki-check.mjs), then cross-file contradictions, claims the code contradicts, leftover filler, answered Open questions, missing files. Fixes trivial drift in place, routes structural fixes to /start-project-info --repair (owner-run) and unknowns to open-questions.md, logs the pass. Use after any task that changed wiki files, or when asked to 'lint/check the wiki'."
model: claude-haiku-4-5
effort: medium
argument-hint: "[optional: files just changed, or focus area]"
allowed-tools:
  - Read
  - Write
  - Edit
  - MultiEdit
  - Glob
  - Grep
  - LS
  - Bash(node .claude/hooks/wiki-check.mjs:*)
  - Bash(grep:*)
  - Bash(date:*)
---

# /wiki-lint

Health-check `.claude/project-info/` and keep it trustworthy. A stale or
self-contradicting wiki is worse than none — this pass is the guard.

## Use when

- After any coding goal that changed one or more `.claude/project-info/` files
  (the `code` skill, step 9).
- After `/start-project-info --repair` or any bulk wiki edit.
- On explicit request ("lint the wiki", "is the wiki still accurate?").

## Context to read

Always:
- User/orchestrator input: `$ARGUMENTS` (may narrow the scope to just-changed files)
- The mechanical lint first: `node .claude/hooks/wiki-check.mjs` (exit 1 on errors). It proves what a
  script can: every routing-table path in the root `CLAUDE.md` exists, every page is listed in
  `README.md`, titles and relative links resolve, `log.md` lines have the
  `## [YYYY-MM-DD] <area> | <summary>` shape, `lessons.md` keeps `## Rules` under the 60-rule cap,
  the JSON files parse, no secret-looking strings. Fix what it reports; the checks below are the
  content truth it cannot prove.
- Every page in the `README.md` map: the root pages (`working-agreement.md`, `lessons.md`,
  `open-questions.md`, `placeholders.md`, `log.md`) and `product/`, `content/`, `site/`, `design/`,
  `tech/` (including `tech/usage/*.md` — written for this repo, so their commands and paths can drift),
  `legal/`, `memory/`. Skip `research/` (raw dated research, unrouted; conclusions live in the pages).
- Recent history: `grep "^## \[" .claude/project-info/log.md | tail -5`

Code spot-checks, only the cheap greppable ones and only when the relevant wiki page exists:
- Locales: `LOCALES` / `DEFAULT_LOCALE` / `UNREVIEWED_LOCALES` in `packages/shared/src/locales.ts`
  vs `site/i18n.md` § Locales and URL scheme
- Routes: `apps/web/src/pages/` + `ROUTES` in `apps/web/e2e/routes.ts` vs `site/structure.md` § Sitemap
- Commands: `scripts` in the root and `apps/web` `package.json` vs `tech/technologies.md` § Commands
  and the commands quoted in `tech/usage/*.md`
- Analytics provider/events in `apps/web/src` vs `site/analytics.md`
- `localStorage`/`sessionStorage`/cookie keys in `apps/web/src` vs `legal/compliance-and-data.md`
  § Cookies and browser storage
- Not-real markers: `grep -rn "PLACEHOLDER\|placeholder: true" apps/web/src` vs the rows in
  `placeholders.md`

## Checks

1. **Cross-file contradictions** — especially across ownership boundaries (one home per fact,
   `README.md` § Rules): a value quoted in a non-owning page must match the owning page verbatim
   (e.g. the H1 + proof line are authoritative in `product/brand.md`, the budgets in
   `product/requirements.md`, the tokens in `design/design.md`).
2. **Code drift** — wiki claims the spot-check greps contradict. Code wins for facts about the code;
   the owner's dated `[user]` decisions win for product facts.
3. **Leftovers** — template filler (`TBD`, `<fill me>`, lorem ipsum) or empty required sections inside
   wiki pages; a `PLACEHOLDER` in the code with no row in `placeholders.md`, or a row whose marker is
   gone from the code; a `README.md` "Not written yet" entry for a page that now exists.
4. **Answered Open questions** — `open-questions.md` rows the owner, the code, or a newer page now
   answers: move the fact into its owning page and mark the row `answered <date>` (that page's own
   convention).
5. **Missing files** — every page in the `README.md` map and every path in the `CLAUDE.md` routing
   table exists, is non-empty, and is not filler. A page listed under "Not written yet" is a
   documented skip, not a finding.
6. **Unjustified locales** (`site/i18n.md` § Locales and URL scheme) — every listed locale must name
   what it rests on (today: en, pl, es, all `[user]`), the page must match `LOCALES` in
   `packages/shared/src/locales.ts`, `DEFAULT_LOCALE` (en) must be a member, and es must stay marked
   unreviewed (`UNREVIEWED_LOCALES`, the `X-Review-Status` header in its `messages.po`,
   `placeholders.md`) until a fluent reader has reviewed it. A locale with no stated basis, or one
   the page and the code disagree on, is a finding. Never delete an owner-listed locale: route it to
   `open-questions.md`. Catch it at lint time: each locale costs a full catalog plus per-locale
   long-form files, so a wrong one gets more expensive with every slice.

## Operating rules

1. Never ask questions. Never invent facts to "fix" a gap — an unresolvable finding is routed, not guessed.
2. Fix trivial drift directly in the wiki page: one-line corrections, verbatim re-quotes from the
   owning page, marking answered Open questions, replacing a stale value the code proves wrong,
   fixing a broken path in the `CLAUDE.md` routing table.
3. Route structural problems (wrong ownership, a missing page, a section rewrite, the machinery:
   hooks, routing, session card) to `/start-project-info --repair`. The owner runs it (it is not
   model-invocable); state what it should fix and why in the report.
4. Route unresolvable items (needs owner input, external facts) to a new row in `open-questions.md`
   (question, what it blocks, who answers, default, status).
5. Finish by appending one line to `.claude/project-info/log.md`:
   `## [YYYY-MM-DD] lint | <n> findings: <one-line summary>` (or `clean`), then re-run
   `node .claude/hooks/wiki-check.mjs` and confirm it exits 0.

## Output constraints

- Report ≤ 15 lines: one line per finding — `file: problem -> action taken (fixed | routed to /start-project-info --repair | open-questions.md)` — plus a final `clean`/summary line.
- Never rewrite whole wiki pages; edits are surgical.
- Never touch code, configs, or anything outside `.claude/project-info/` and the `CLAUDE.md`
  routing table (path fixes only).
- No motivational prose. Findings only.

## What NOT to do

- Do not regenerate pages wholesale — that is `/start-project-info --repair` (owner-run) or a
  deliberate edit in the task that owns the page.
- Do not lint `research/` (raw dated research; its conclusions are linted where they live).
- Do not "improve" style, reword prose, or expand sections — drift and contradictions only.
- Do not treat a documented skip or `Unknown` with an Open question as a finding.
