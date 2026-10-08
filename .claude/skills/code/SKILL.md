---
name: code
description: Use when the user asks to build, implement, add, fix, debug, refactor, improve, or otherwise change project code, or says "/code", "build", "implement", "fix", "debug", "refactor".
argument-hint: "[the coding goal]"
---

# Coding Goal

The standard coding loop for this project. One concrete code goal at a time:
features, bug fixes, refactors, cleanup, UI changes, endpoint/build-script changes,
tests, or other implementation work. Pull project facts from the wiki (never
assume the stack), match the existing codebase, verify before calling it done,
and keep the tone terse, concrete, and honest.

## Operating Modes

Decide which mode applies at the start and state it in one line.

- **Present mode** — the developer is at the machine and can run checks that
  need a human or a runtime you cannot drive (a physical phone, a real screen
  reader, a live contact-form send through Turnstile + Resend on a deploy). The
  loop closes fully only when those gated checks pass for changes that require them.
- **Walk-away mode** — the developer stepped away or told you to keep going
  autonomously. Run only the checks you can run alone, commit per `CLAUDE.local.md`,
  and mark human/runtime-gated checks `PENDING` in your summary. Never fake a
  result you did not see.

## Context Across Compactions

This loop may outlive one context window. Context compacts automatically, and
compaction is not a stop: keep working on the current goal until it meets the done
criteria; do not stop merely because the chat is long (`working-agreement.md` § 3).

After a compaction: re-read a file before editing it, check `git status` /
`git diff` for what is really done, and re-run the last failing check. Keep the
state recoverable as you go: docs updated with the change, plan status current,
long commands in the background.

Only the user pauses ("stop", "pause", "wait", an interrupt). At a pause: commit
(WIP is fine: `chore(wip): <where>`), then two lines: where you stopped, what comes
next (`working-agreement.md` § 4). "continue" / "go" resumes from that next step.
Treat that note as continuity state, not permission to broaden scope.

## The Loop

### 1. Load Context (Always First, Every Invocation)

Read the root `CLAUDE.md` first and follow its **Routing table** (the prompt hook
already lists the routed pages). That table maps what a task touches to the specific
files to read — the `.claude/project-info/` wiki (foldered `product/`, `content/`,
`site/`, `design/`, `tech/`, `legal/`; map in its `README.md`) and the
`.claude/project-info/tech/usage/*.md` library (how we use each technology:
`astro.md`, `lingui.md`, `turborepo.md`, `visual-qa.md`). Apply the `lessons.md`
Rules (the session card carries them).

Load only what this goal touches; read the specific files, not the whole wiki, so
context stays lean. For any UI work also read the relevant `tech/usage/*.md` file(s)
(`astro.md`, plus `visual-qa.md` for the QA loop) — they are binding conventions,
not suggestions. Building or editing the contact form means wiring it to the real
send path (default: the `/api/contact/` endpoint, `src/pages/api/contact.ts`, with
Turnstile + Resend, `tech/technologies.md` § Stack; the provider is open-questions
Q42, decided in slice 10) — a form must actually deliver mail, never be a
frontend-only stub.

Also read `.claude/project-info/memory/run-notes.md` if it exists — unconditionally.
It is short, and it carries MEASURED facts about this project (how long build, e2e,
shots and Lighthouse really take here, known-slow routes, gotchas already paid for
once). Reasoning about verification cost from guesswork instead of from that file is
how a one-line fix turns into a six-hour run. For a UI slice also read
`memory/slice-costs.md` (the JS / LCP budget earlier slices already spent).

If a needed file is missing or too vague, note the gap and proceed on the facts you
do have — never invent project facts. Never read or edit real `.env` files or
secrets; name env vars, never values.

### 2. Scan Existing Patterns

Before writing anything, inspect the directory you'll touch and the nearest
sibling files. Match file naming/casing, module shape, import order, styling
approach, how constants and types are declared, test style, and error handling.
Write as if the original author wrote it. Do not introduce new conventions.

The repo is a Turborepo monorepo on bun 1.3.14 and follows these binding
conventions (details in `tech/conventions.md` + `tech/usage/turborepo.md` +
`tech/usage/astro.md`):

- **Never re-scaffold.** The root configs (`package.json`, `turbo.json`,
  `tsconfig.base.json`, the one flat `eslint.config.js`, `prettier.config.js`,
  `bun.lock`, `.gitattributes`), `apps/web` (the site, `@package/web`),
  `packages/shared` (`@package/shared`) and `CLAUDE.md` exist — extend them, don't
  recreate them. Install with `bun install`; no second package manager or lockfile.
- **Aliases:** site code via `~/` (→ `apps/web/src/`, e.g. `~/lib/routes`), shared
  code via `@package/shared/*` (e.g. `@package/shared/locales`). Never `@/`, never
  deep relatives. The `@package` scope is literal — do not rename it.
- **Static and server-rendered:** Astro 7 with `output: "static"`; `.astro` and
  React 19 TSX components render on the server, and a component hydrates as an
  island only when it is interactive. Styling is Tailwind 4 on the tokens in
  `apps/web/src/styles/global.css`.
- **Placeholders:** a value that is not real yet is marked `PLACEHOLDER` in
  code/data, gets a row in `.claude/project-info/placeholders.md`, and is disclosed
  in one line in chat. Never leave an unmarked fake: a launch build fails while any
  marker remains (`scripts/launch-gate.mjs`).

### 3. Plan (No Halt Unless Irreversible)

State in a few lines: the goal, which files you'll add/change, how you'll verify
it, and any assumption. Per `CLAUDE.local.md` (autonomy), do not stop for approval
on routine work. Stop only for a genuinely irreversible or no-default fork that is
the owner's decision. In Phase 1 a goal is one slice, looped to near-prod before
the next (`working-agreement.md` § 9). The developer can `Esc` or type "wait" any time.

### 4. Build Or Fix

Make the smallest coherent change that satisfies the goal.

- **Bug/regression/unexpected behavior:** debug systematically — reproduce or
  localize the failure first, fix the root cause (not the symptom), then add
  focused regression coverage.
- **New feature or changed behavior:** if the shape isn't already decided, settle
  it in a few lines before writing code; when practical drive it test-first
  (failing test → minimal code → refactor).
- **Refactor:** preserve behavior, keep the diff scoped, verify callers still
  satisfy the same contract.
- **Cleanup:** do only the cleanup requested. Do not delete dependencies,
  scaffold, or unrelated code just because it looks unused.
- User-facing strings go through Lingui with en as the source (`site/i18n.md` +
  `tech/usage/lingui.md`): `lingui-for-astro` macros in `.astro`, Lingui macros in
  TSX. After adding or changing strings run `bun run i18n:extract`, then fill the pl
  and es `msgstr` in `apps/web/src/locales/{pl,es}/messages.po` — a production build
  fails on a missing pl/es message. es is AI-translated and stays marked unreviewed
  (header `X-Review-Status: unreviewed (AI translation)`); never claim it was
  reviewed. Long-form text lives in per-locale files, not in the catalogs. The
  locales are en, pl and es (`@package/shared/locales`); don't silently drop one.

### 5. Write Or Update Coverage

Match coverage to the change, using the project's documented test approach
(`tech/conventions.md` § Testing bar): vitest unit tests next to the code
(`apps/web/src/**/*.test.ts`), Playwright specs in `apps/web/e2e/`.

- If a test exists near the changed code, update it or add focused regression
  coverage.
- Every new route goes into `apps/web/e2e/routes.ts`, so the a11y, layout and
  i18n gates sweep it.
- If the goal is a meaningful user-facing flow, cover the happy path plus obvious
  edge cases: empty/whitespace input, very short and very long text, other locales
  (pl runs longest), network failure or 5xx, rate-limit (429), no-JS behaviour
  where the flow promises it.
- Do not build heavy new test infrastructure for a tiny change unless the risk
  justifies it.

### 6. Static Verification (Always Run What Fits)

Run the checks and read the actual output — do not assume. From `apps/web`
(`bun run <script>`), or from the repo root, where `bun run <script>` forwards via turbo:

- `bun run typecheck` (astro check), `bun run lint` (eslint), `bun run test`
  (vitest); root `bun run check` runs all three via turbo.
- `bun run build` (astro build + `scripts/launch-gate.mjs`) whenever routes, config,
  catalogs or content changed — it is also the strict Lingui compile. Review builds
  are noindex; a launch build fails while `PLACEHOLDER` markers remain.
- `bun run e2e` (Playwright against the built site via `astro preview` on 4322)
  for anything that renders. It tests `dist/`, so rebuild before re-running it.

The Stop hook (`.claude/hooks/wiki-check.mjs`) only checks that the wiki moved with
the code; it runs none of these for you. If an unrelated preexisting failure blocks
verification, capture the exact failure and keep the new change clean.

**Never block a shell waiting.** No `until ... do sleep N; done`, no `sleep N && cmd`,
no polling a background task's output file. Start long commands (`bun run preview`,
a full e2e run, Lighthouse) with the Bash tool's `run_in_background: true` (you are
notified on completion), and wait on conditions with `Monitor`. A foreground wait
loop blocks for the full tool timeout even after the work has finished
(`working-agreement.md` § 3). Astro 7 allows only ONE `astro preview` per project:
e2e, shots and Lighthouse all share the preview on 4322 and reuse it when it is up,
so never start a second one.

**Verify at the right granularity.** Nothing re-runs the full suite for you when
you stop, but running it after every small fix is pure waste. Iterate narrow (from
`apps/web`) — `bun run e2e e2e/<file>.spec.ts` runs one spec, `bun run e2e --last-failed`
re-runs only what failed, `bunx vitest run <file>` runs one unit file — then run
`bun run check`, `bun run build` and `bun run e2e` in full once when you believe
the work is done.

### 7. Front-end Visual QA (any UI change)

A green build does not mean the page looks right. For every UI change, run the
screenshot QA loop defined in `.claude/project-info/tech/usage/visual-qa.md`: build
(`bun run build`), serve it (`bun run preview`, port 4322, in the background), and
shoot each changed route from `apps/web`:

```bash
MSYS_NO_PATHCONV=1 node scripts/shots.mjs --paths /en/,/pl/,/es/ --widths 390,1440,1920,2560 [--full] [--reduced]
```

(On Windows Git Bash the `MSYS_NO_PATHCONV=1` prefix stops `/en/` being rewritten
into a Windows path.) Scratch PNGs land in repo-root `screenshots/.work/<route>/`.
**Actually evaluate** each screenshot for broken layout, horizontal overflow (the
script prints it per shot), text buried under the fixed/sticky header (a screenshot
only shows what is on top, so look for missing words — it bites hardest at 1920
where a headline stops wrapping), unreadable text over media, and AI-slop against
`design/design.md`. **Then score each view against the
`design/design-quality.md` 0–10 rubric + quick diagnostic and iterate until it
reads ≥ 8 (professional agency work) and bespoke** — a bug-free-but-generic view
(score < 8) or any anti-slop instant-fail hit is NOT done. Fix and re-shoot until
clean before moving to the next slice. This runs in both modes (the browser is
driveable headlessly); it is not human-gated.

**Skip it only when the diff cannot move a pixel.** A change that touches no
`.astro`, `.tsx`, CSS, design token, font, `public/` asset or rendered string — a
build script, a unit test, the wiki — has nothing for a screenshot to show. When in
doubt, it moved a pixel: run the loop. Do not run it "to be safe" on a diff that
provably renders nothing — that is how a 25-minute fix becomes a 5-hour run.

Non-negotiables that make this enforceable rather than eyeballed:

- **Every locale, every time [user 2026-10-08].** A section built or edited is
  checked in en, pl and es at phone, laptop and desktop before it is done: run
  `bun run e2e text-fit` (spill, clipping, off-screen text, split words, overlaps
  and boxes over text, in every locale and switchable state) and compare the
  three locales' shots side by side (`tech/usage/visual-qa.md` § Locales). Size
  stickers, tags and buttons for the longest locale, never for the English word.
- **Keep the proof local.** When a view is accepted, `--accept` writes the 1920 +
  390 webp proof to repo-root `screenshots/<route>/`; log the view in
  `screenshots/VISUAL-QA.md`. The shots are gitignored (only that log is tracked)
  [owner 2026-10-08: only commit the assets the site needs].
- **Run the readability gate.** `e2e/a11y.spec.ts` (part of `bun run e2e`) runs axe
  WCAG 2.2 AA on every route in `e2e/routes.ts` (one colour theme, Cobalt; Paper and
  Ink were cut 2026-10-06), plus the skip-link check. Never place text on an image without a scrim (`tech/conventions.md`
  § Do NOT); never delete/weaken the spec to make it pass — fix the token or add the scrim.
- **Run the layout gate.** `e2e/layout.spec.ts` (same `bun run e2e`) sweeps
  320/390/1024/1920/2560 for horizontal overflow and checks the capped content
  shell (no text block wider than the 90rem shell on an ultrawide screen). Fix the
  layout, never the thresholds. Text hidden under fixed chrome is not machine-checked
  yet: catch it in the screenshots.
- **Run the head gates.** `e2e/i18n.spec.ts` checks `<html lang>`, title,
  canonical, hreflang and the flag switcher per locale and fails on console or CSP
  errors. Fix the page, never the spec.
- **Check the other engines and motion.** Run `bun run e2e:xb` (Firefox + WebKit) when
  the change touches focus, scrolling, sticky layout or anything a browser could place
  differently (WebKit put keyboard focus under the sticky chapters on 2026-10-06). Also
  take one `--reduced` pass when the change animates anything.

### 7b. Lighthouse QA (when a change can move a score)

A change that touches media, fonts, metadata/SEO, a new route, an embed, or a
hydrated island can regress performance / SEO / accessibility / best-practices.
Run the **Lighthouse QA** loop (the `lighthouse-qa` skill): after a fresh
`bun run build`, from `apps/web` run `node scripts/lighthouse.mjs [--runs 3]
[--desktop] /en/ /pl/` (it reuses the preview on 4322 or starts one). Budgets: perf
95 target / 90 floor, a11y / best-practices / SEO 100, LCP ≤ 2000 ms, CLS ≤ 0.05,
TBT ≤ 100 ms (mobile median); the script exits 1 on a miss and writes
`apps/web/lighthouse/summary.json` (gitignored). Fix the root cause of each miss
and re-audit until within budget or plateaued at/above the floor with the reason
recorded. For a UI slice, record its own cost (JS KB, LCP/CLS delta) in
`memory/slice-costs.md`.

**Skip it when the diff cannot move a score** — a unit test, a build script that
changes no output, a `.po` fix that changes no layout, the wiki. Each run is a
rebuild plus several audits, so running it anyway just burns time.

**While iterating, don't rebuild for every audit.** Re-run the script against the
existing `dist/` and only rebuild after changing code that must be rebuilt;
narrow to the one route you are fixing.

### 8. Human/Runtime-Gated Verification

- **Present mode:** for checks needing a human or a runtime you can't drive,
  give the developer the exact command, ask them to run it, and read the pasted
  output. If it fails, fix and re-run. Loop. Do not self-declare done.
- **Walk-away mode:** skip these — you can't run them alone. Mark them `PENDING`
  in your summary so they run when the developer returns.

### 9. Commit

If the goal changed any `.claude/project-info/` file, run `/wiki-lint` first —
it runs `node .claude/hooks/wiki-check.mjs`, catches cross-file drift the change
introduced, and appends its own `lint` log entry. Skip it for pure-code goals
(keeps the cost near zero).

If this goal taught you something durable about working on THIS project, place it
per `working-agreement.md` § 7: a measured number (a command that is far slower or
faster than you assumed, a route that always needs special handling) goes in
`.claude/project-info/memory/run-notes.md` (create it if missing); a tool gotcha or
process rule goes in `lessons.md` `## Rules`. Update an existing entry rather than
appending a duplicate, and delete anything that stopped being true; the file is only
useful while it stays readable in 30 seconds. Nothing secret, ever: it is committed.

Update the wiki page that describes the changed behaviour in the same change, and
append one line to `.claude/project-info/log.md`:
`## [YYYY-MM-DD] <area> | <what changed, key files touched>`.

Then commit per `CLAUDE.local.md`: you commit, as Conventional Commits
(`tech/conventions.md` § Git), with the owner's global git identity; never skip
hooks; **push only when the owner asks**. Do not auto-commit during planning or research.

### 10. Done Criteria

- **Present mode:** relevant static checks are green, any UI change passed the
  screenshot QA loop (and the Lighthouse QA loop where a score could move), any
  required gated check is green, and the developer hasn't flagged changes.
- **Walk-away mode:** relevant static checks are green, any UI change passed the
  screenshot QA loop (and Lighthouse QA where a score could move), coverage was
  updated or intentionally deemed unnecessary, any required gated check is marked
  `PENDING`, and the change is committed.

The full bar is `working-agreement.md` § 2. Never say "done and verified" when only
static checks ran. Distinguish "built and static-checked, gated check pending" from
"fully verified." Report per `working-agreement.md` § 6, with numbers from real output.

## Hard Rules

1. One coding goal per invocation. Note adjacent work as deferred; don't sprawl.
2. Do not claim a test passed unless you saw the real output.
3. Match existing patterns over your own preferences.
4. Commit messages are specific Conventional Commits, never "claude: changes".
5. If the change alters a documented contract, schema, or decision, update the
   matching `.claude/project-info/` page first (with its `log.md` line), then the
   code; run `/wiki-lint` before the commit whenever wiki files moved.
6. For bug fixes and refactors, preserve existing behavior unless the goal
   explicitly changes it.
7. Pull project facts from the root `CLAUDE.md` routing table, the
   `.claude/project-info/` wiki, and the `tech/usage/*.md` library; never hardcode a
   stack assumption they contradict.
