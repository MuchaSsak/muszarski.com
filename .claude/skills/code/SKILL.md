---
name: code
description: Use when the user asks to build, implement, add, fix, debug, refactor, improve, or otherwise change project code, or says "/code", "build", "implement", "fix", "debug", "refactor".
argument-hint: "[the coding goal]"
---

# Coding Goal

The standard coding loop for this project. One concrete code goal at a time:
features, bug fixes, refactors, cleanup, UI changes, API/pipeline changes,
tests, or other implementation work. Pull project facts from the wiki (never
assume the stack), match the existing codebase, verify before calling it done,
and keep the tone terse, concrete, and honest.

## Operating Modes

Decide which mode applies at the start and state it in one line.

- **Present mode** — the developer is at the machine and can run checks that
  need a human or a runtime you cannot drive (physical device, a real browser
  session, a live payment/webhook sandbox). The loop closes fully only when
  those gated checks pass for changes that require them.
- **Walk-away mode** — the developer stepped away or told you to keep going
  autonomously (e.g. a headless runner job). Run only the checks you can run alone, commit if
  the workflow calls for it, and mark human/runtime-gated checks `PENDING` in
  your summary. Never fake a result you did not see.

## Context Across Multiple Windows

This loop may span several fresh contexts. Continue until the goal meets the
done criteria; do not stop merely because the chat is long.

Follow the context-window thresholds in `@CLAUDE.md` (compact / stop-session).
At a natural checkpoint near those thresholds — after a coherent edit, after a
verify/fix cycle, or before a new subsystem — hand off rather than pushing into
exhaustion. Prefer fewer, high-signal handoffs.

To hand off: invoke the `session-handoff` skill for its structured chat-only
handoff, then append:

```text
## Restart prompt for fresh context
Continue the coding-goal loop from this handoff. Load @AGENTS.md, @CLAUDE.md, and @.claude/skills/code/SKILL.md first, then follow CLAUDE.md's Context Routing to read only the .claude/project-info wiki and usage/*.md files the goal touches, plus the files named in the handoff. Keep the same operating mode, preserve all user constraints, do not redo completed work, and continue until the goal meets this skill's done criteria.
```

Then clear via `/clear` (or ask the developer to) and resume from the restart
prompt. Treat the handoff as continuity state, not permission to broaden scope.

## The Loop

### 1. Load Context (Always First, Every Invocation)

Read the project's own `CLAUDE.md` first and follow its **Context Routing** table.
That table maps what a task touches to the specific files to read — the
`.claude/project-info/*.md` wiki (stack, design, structure, etc.) and the
`.claude/project-info/usage/*.md` library (how we use each technology, e.g.
`nextjs.md`, `playwright.md`, `motion.md`).

Load only what this goal touches; read the specific files, not the whole wiki, so
context stays lean. For any UI work also read the relevant `usage/*.md` file(s) —
they are binding conventions, not suggestions. Building or editing a contact form
/ newsletter means wiring it to the real email send path (`usage/resend.md`) — the
handler + templates already ship; a form must actually deliver mail, never be a
frontend-only stub.

Also read `.claude/project-info/memory/run-notes.md` if it exists — unconditionally,
like `IMPORTANT.md`. It is short, and it carries MEASURED facts about this project
(how long the gate's commands really take here, known-slow routes, gotchas already
paid for once). Reasoning about verification cost from guesswork instead of from
that file is how a one-line fix turns into a six-hour run.

If a needed file is missing or too vague, note the gap and proceed on the facts you
do have — never invent project facts. Respect the repo's sensitive-file policy
throughout: never read or edit real `.env`, secrets, or production credentials.

### 2. Scan Existing Patterns

Before writing anything, inspect the directory you'll touch and the nearest
sibling files. Match file naming/casing, module shape, import order, styling
approach, how constants and types are declared, test style, and error handling.
Write as if the original author wrote it. Do not introduce new conventions.

Generated projects start from the starter templates and follow these binding
conventions (details in `coding-guidelines.md` + `usage/turborepo.md`):

- **Never re-scaffold.** Root configs, `apps/nextjs-landing-page`, `packages/shared`,
  `CLAUDE.md` exist from the templates — extend them, don't recreate them.
- **Aliases:** app code via `~/<app>/*` (e.g. `~/website/lib/seo`), shared code
  via `@package/shared/*`. Never `@/`, never deep relatives. The `@package`
  scope is literal — do not rename it per project.
- **Template markers:** a `*.TODO` file is a naming/location hint (contents
  empty — implement the real file, delete the stub); a `TODO_` / ALL-UPPERCASE
  placeholder marks a value to replace. Neither may survive a finished goal —
  `grep -r "TODO_"` clean, no `*.TODO` files in touched areas.

### 3. Plan (No Halt Unless Irreversible)

State in a few lines: the goal, which files you'll add/change, how you'll verify
it, and any assumption. Per `@CLAUDE.md` autonomous rules, do not stop for
approval on routine work. Stop only for a genuinely irreversible or no-default
fork. The developer can `Esc` or type "wait" any time.

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
- User-facing strings follow the project's i18n setup (see `technologies.md`).
  Honor the documented platform/locale scope; don't silently drop a target. The
  3-locale cap in `usage/lingui.md` is an `/init-new-project` default, not an edit-job
  limit — an edit job translates more locales only when explicitly asked, and
  otherwise leaves existing catalogs as-is (empty ones fall back to source text).

### 5. Write Or Update Coverage

Match coverage to the change, using the project's documented test/e2e approach
(from `technologies.md` — e.g. the unit runner, the e2e tool, flow location).

- If a test exists near the changed code, update it or add focused regression
  coverage.
- If the goal is a meaningful user-facing flow and the project has an e2e/flow
  setup, cover the happy path plus obvious edge cases: empty/whitespace input,
  denied permission, network failure or 5xx, rate-limit (429), auth-gated vs
  public rendering, and payment success/failure when billing is involved.
- Do not build heavy new test infrastructure for a tiny change unless the risk
  justifies it. If the project documents no test approach, say so and cover what
  you can.

### 6. Static Verification (Always Run What Fits)

Run the project's documented typecheck, lint, and test commands (from
`.claude/project-info/technologies.md`) and read the actual output — do not assume. Add any
stack-specific health check the wiki documents (e.g. `expo-doctor`, `deno check`)
when config or native deps changed. A Stop hook may also enforce
typecheck/lint; that does not excuse you from reading the results and fixing
anything the change caused. If an unrelated preexisting failure blocks
verification, capture the exact failure and keep the new change clean.

**Never block a shell waiting.** No `until ... do sleep N; done`, no `sleep N && cmd`,
no polling a background task's output file. Start long commands with the Bash tool's
`run_in_background: true` (you are notified on completion; read with `TaskOutput`),
and wait on conditions with `Monitor`. A foreground wait loop blocks for the full
tool timeout even after the work has finished. See the project's `CLAUDE.md` →
"Long-running commands".

**Verify at the right granularity.** The finish gate re-runs the full build and full
e2e suite when you stop, so doing it yourself after every small fix is pure waste.
Iterate narrow — `bun run website:test:e2e:failed` re-runs only what failed,
`...:only e2e/<file>` runs one spec — then run the full suite once when you believe
the work is done.

### 7. Front-end Visual QA (any UI change on a `project_type: nextjs-landing-page` project)

A green build does not mean the page looks right. For every UI change, run the
screenshot QA loop defined in `.claude/project-info/usage/playwright.md`: start
the production server (`bun run build && bun run start` — far faster to navigate
than `next dev`), drive the Playwright MCP to load each changed route, screenshot it
at **all three widths — mobile ~390px, laptop ~1024px, desktop ~1920px** — and
**actually evaluate** each screenshot for broken layout, horizontal overflow, text
buried under the fixed/sticky header (a screenshot only shows what is on top, so
look for missing words — it bites hardest at 1920 where a headline stops wrapping),
unreadable text over media, and AI-slop against `design.md`. **Then score each view against the `project-info/design-quality.md` 0–10
rubric + quick diagnostic and iterate until it reads ≥ ~8 (professional agency
work) and bespoke** — a bug-free-but-generic view (score < 8) or any anti-slop
instant-fail hit is NOT done. Fix and re-screenshot until clean before moving to
the next feature. This runs in both modes (the browser is driveable headlessly);
it is not human-gated.

**Skip it entirely when the diff cannot have moved a pixel.** On an edit job whose
changes touch no `.tsx`, CSS, design token or `public/` image — a migration, a
service-layer fix, a `.po` string, config — there is nothing for a screenshot to
show, and the finish gate skips gates 1 and 2 for exactly that case
(`.agents/quality/diff-scope.mjs` decides, and it fails CLOSED: anything uncertain
counts as "visual changed", so you can trust the skip). Do not run the loop "to be
safe" — that is how a 25-minute CMS fix became a 5h41m run. Also skip for non-nextjs
projects (e.g. Expo).

Two non-negotiables that make this enforceable rather than eyeballed:

- **Commit the proof.** Save each changed route's final (accepted) desktop (1920) +
  mobile (390) shot to repo-root `screenshots/<route>/` (compressed webp, final-only —
  scratch in the git-ignored `screenshots/.work/`; the 1024 pass is reviewed but not
  committed, recorded as its column) and keep `screenshots/VISUAL-QA.md`
  current. A green build never proves the loop ran; these do.
- **Run the readability gate.** `e2e/contrast.spec.ts` (part of `bun run test:e2e`,
  enforced by CI) fails on unreadable solid-bg text (axe WCAG-AA) and on any text
  over a photo with no `<Scrim />`, in **light AND dark**. Never place text on an
  image without a scrim; never delete/weaken the spec to make it pass — add the scrim.
- **Run the layout gate.** `e2e/layout.spec.ts` (same `bun run test:e2e`) sweeps
  390/1024/1920/2560 for horizontal overflow, text hit-tested as sitting UNDER
  fixed/sticky chrome (at rest and at each nav anchor landing), and ultrawide text
  smear. It exists because those three are invisible to a screenshot review. Fix the
  layout — header clearance + `scroll-margin-top`, a capped content shell — never the
  thresholds.
- **Check dark once, at the end.** Iterate the loop in light, but before you call the
  change done, re-view the affected routes with `emulateMedia({ colorScheme: "dark" })`.
  Dark ships automatically via the `prefers-color-scheme` token swap, so any new
  surface/pairing has a dark rendering nobody looked at — invisible footers, vanished
  borders, a logo that disappears on the dark canvas. A failure sends you back into the
  loop. See `usage/playwright.md` → "Dark mode: the pre-finish pass".
- **Leave `/health` reporting healthy.** `e2e/health.spec.ts` (same `bun run test:e2e`)
  opens `/[locale]/health` and fails if the card is not `Database healthy` (or
  `All good` on a DB-less project). It is the one check that catches a site whose
  Supabase key, exposed schema or RLS policy is wrong — everything else can be green
  while the live page shows a red card, because that failure only exists at runtime.
  Fix the wiring (`usage/supabase.md`); never weaken the spec or drop the route.

### 7b. Lighthouse QA (nextjs-landing-page — when a change can move a score)

A change that touches media, fonts, metadata/SEO, a new route, an embed, or a large
client component can regress performance / SEO / accessibility / best-practices. Run
the **Lighthouse QA** loop (`.claude/project-info/usage/lighthouse.md` + the
`lighthouse-qa` skill): `node .agents/quality/lighthouse-audit.mjs` (or the
`lighthouse` MCP for a single route), read `screenshots/LIGHTHOUSE.md`, fix the root
cause of each outstanding audit, and re-audit until scores are strong or plateaued
high-enough (soft + plateau-aware — the same gate as init). The audit serves a
production build in launch mode (`IS_FULL_PRODUCTION=true`) so SEO reflects go-live
without changing the deployed noindex default. The finish gate
(`.agents/quality/verify-visual-qa.mjs`, gate 5) enforces this on stop.

**Skip it when the diff cannot move a score** — a back-end/service change, a
migration, a `.po` string, anything touching no UI, media, font, metadata,
`next.config` or dependency. On an edit job the finish gate skips gate 5 for exactly
that case (same `diff-scope.mjs` decision as 7, same fail-closed behaviour), so
running it anyway just burns time: each invocation is a full production rebuild plus
two audits. Also skip for non-nextjs projects.

**While iterating, don't rebuild for every audit.** `LIGHTHOUSE_SKIP_BUILD=1 node
.agents/quality/lighthouse-audit.mjs` reuses the existing `.next` build instead of
producing a fresh one each time. Only drop the flag after you've changed code that
must be rebuilt.

### 8. Human/Runtime-Gated Verification

- **Present mode:** for checks needing a human or a runtime you can't drive,
  give the developer the exact command, ask them to run it, and read the pasted
  output. If it fails, fix and re-run. Loop. Do not self-declare done.
- **Walk-away mode:** skip these — you can't run them alone. Mark them `PENDING`
  in your summary so they run when the developer returns.

### 9. Commit (then the runner pushes)

If the goal changed any `.claude/project-info/*.md` file, run `/wiki-lint` first —
it catches cross-file drift the change introduced and appends its own `lint` log
entry. Skip it for pure-code goals (keeps the cost near zero).

If this goal taught you something durable about working on THIS project — a command
that is far slower or faster than you assumed, a route that always needs special
handling, a gotcha that cost you real time — record it in
`.claude/project-info/memory/run-notes.md` (create it if missing). Update an existing
entry rather than appending a duplicate, and delete anything that stopped being true;
the file is only useful while it stays readable in 30 seconds. The finish gate
appends its own measured command timings there automatically — don't duplicate those.
Nothing secret, ever: it is committed.

When completing a headless runner job, append one line to
`.claude/project-info/log.md` before committing:
`## [YYYY-MM-DD] edit | <goal in one line, key files touched>`
(gen-\* skills already log their own `wiki-update` lines — don't duplicate them.)

Run `/commit` only when the user's workflow calls for committing. It handles the
secrets guard, staging, and message, and makes one local commit. In headless
runner jobs, **`/code` commits but does not push** — the runner script owns the
tokenized push. In an interactive session, `/commit` may push per the developer's
workflow. Do not auto-commit during planning or research.

### 10. Cost Estimate (owned by the runner — do NOT do this yourself)

`docs/ESTIMATED_CLAUDE_API_COST.md` is written deterministically by the runner
(`estimate-cost.sh` parses `ccusage` at job end) on EVERY run — pass, fail, or
dry. There is no cost-estimate skill to invoke; leave any `.TODO` stub in place,
the runner replaces it. Do not spend model turns on this.

### 11. Done Criteria

- **Present mode:** relevant static checks are green, any UI change passed the
  screenshot QA loop (and the Lighthouse QA loop where a score could move), any
  required gated check is green, and the developer hasn't flagged changes.
- **Walk-away mode:** relevant static checks are green, any UI change passed the
  screenshot QA loop (and Lighthouse QA where a score could move), coverage was
  updated or intentionally deemed unnecessary, any required gated check is marked
  `PENDING`, and the change is committed only if the workflow calls for it.

Never say "done and verified" when only static checks ran. Distinguish "built
and static-checked, gated check pending" from "fully verified."

## Hard Rules

1. One coding goal per invocation. Note adjacent work as deferred; don't sprawl.
2. Do not claim a test passed unless you saw the real output.
3. Match existing patterns over your own preferences.
4. Commit messages are specific, never "claude: changes".
5. If the change alters a documented contract, schema, or decision, update the
   matching `.claude/project-info/*.md` first (via its `gen-*` skill — it appends
   the `wiki-update` log line), then both code sides; run `/wiki-lint` before the
   commit whenever wiki files moved.
6. For bug fixes and refactors, preserve existing behavior unless the goal
   explicitly changes it.
7. Pull project facts from the project's `CLAUDE.md` routing, the
   `.claude/project-info/*.md` wiki, and the `usage/*.md` library; never hardcode a
   stack assumption they contradict.
