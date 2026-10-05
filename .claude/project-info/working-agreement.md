# Working agreement: how every session works here

> Read once per session: the SessionStart hook points here at startup and after every compaction.
> This page owns HOW we work; WHAT the project is lives in the routed pages. Personal rules:
> `CLAUDE.local.md`. The latest explicit instruction beats both.

## 1. Start

1. Read the pages the prompt hook lists and the routing-table rows the task touches, then the code.
   The code wins over a page (then fix the page).
2. Apply `lessons.md` (the session card carries its Rules). If there's unfinished work (uncommitted files,
   a plan in progress), read its plan or status before touching it.
3. Dated decisions in pages are settled. A new instruction that contradicts one updates that page and `log.md`.
4. Coding tasks follow the project's `code` skill (`.claude/skills/code/SKILL.md`), adapted to Astro
   (`technologies.md`).

## 2. Quality bar

- **Do the whole ask**, including messages that arrive mid-task (fold them in, say so in one line).
- **Phase 1 works in slices**, one at a time, each looped until finished (§ 9).
- **Done means** (from the `code` skill [user] 2026-10-05):
  - typecheck (`astro check`) + lint + unit tests + e2e: commands in `technologies.md`
  - **UI:** Playwright screenshots at **390 / 1024 / 1920**, actually evaluated:
    - overflow, text under the sticky header, unreadable text over media, generic look
  - **Layout sweep** 390/1024/1920/2560: horizontal overflow, text hit-tested under fixed chrome, ultrawide smear
  - **light AND dark**, **reduced motion**, axe contrast AA
  - **Lighthouse mobile ≥ 90** (`lighthouse-qa` skill) when a change can move a score
  - **design score ≥ 8/10** (`design-quality.md`, ported in Phase 1)
  - Keep the accepted 1920 + 390 shots in `screenshots/<route>/` (webp) and `screenshots/VISUAL-QA.md`
  - Skip the visual loops only when the diff cannot move a pixel or a score
- **i18n:** en, pl and es all render. The strict Lingui compile has no missing ids. New es strings are marked
  unreviewed (`i18n.md`).
- **Edge cases are part of the feature:**
  - empty states; very short and very long text
  - other locales; free user input
  - 320 px phones without horizontal overflow
  - keyboard and screen reader
- **Nothing fake presented as real.** Placeholders and sample data are tracked in `open-questions.md`
  and block any "done" / "ready for production" claim; a launch gate enforces it.
- **Research before design** [user] 2026-10-05:
  - check Mobbin, Awwwards (skill), the component registry (`search-registry-items`), Playwright
    screenshots and Lighthouse before inventing a section
  - a source behind every number shown to users
- **Practicality ≥ wow:** every visual must pass "impressive within 3 s AND usable in 1 click" on mobile.
  Immersive parts are opt-in, never a gate.
- **Ask only when blocked** on a decision that is genuinely the owner's; otherwise take the default and say so.

## 3. Long tasks and compaction

- Context compacts automatically. Compaction is not a stop: keep working on the current task.
- After a compaction: re-read a file before editing it, check `git status` / `git diff` for what is
  really done, re-run the last failing check.
- Keep the state recoverable: docs updated with the change, plan status current, long commands in the
  background (never a foreground sleep/poll loop).

## 4. Pausing and resuming

- Only the user pauses ("stop", "pause", "wait", an interrupt). At a pause and at a finished task:
  commit per `CLAUDE.local.md` (WIP is fine), then two lines: where you stopped, what comes next.
- "continue" / "go" resumes from that next step without asking again.

## 5. Finishing a task

1. Verify at the scale of the change and read the real output.
2. Docs in the same change: the page that describes the behaviour + a `log.md` line. CV content changed →
   the page and the PDF regenerate (`content-model.md` § CV).
3. Lessons (§ 7).
4. Commit as a Conventional Commit (`conventions.md`); author and push per `CLAUDE.local.md`. Never skip hooks.
5. Report (§ 6).

## 6. The report

- Short, in English. Order:
  1. what changed (as the user sees it)
  2. decisions made for them, with the reason
  3. what was NOT verified
  4. what they must do (exact commands, env vars, deploy order)
  5. what still blocks release
- Numbers from real output ("tests 42/42", "LH mobile 96"), never "should work".

## 7. The lessons loop

- **When:** write a lesson when the user corrected you, a tool or approach failed and you found what works, you
  lost time rediscovering something, or a check caught a mistake you would make again.
- **Where:** a product fact or decision → its routed page; a measured number → `memory/<topic>.md`; how to
  work here (tool gotcha, process, a preference about the work) → `lessons.md` `## Rules`.
- **Shape:** one imperative line, why, the date. Cap 60 rules: merge duplicates, delete what stopped being true.
- **Promote:** a lesson that keeps coming back becomes a mechanical check (test, lint rule, hook); then point the line at it.

## 8. The machinery

| Piece | Does |
| --- | --- |
| `CLAUDE.md` | routing table + invariants + this page's pointer; loaded every session, kept through compaction |
| `CLAUDE.local.md` | personal rules, gitignored, loaded the same way |
| `.claude/hooks/session-start.mjs` (SessionStart) | at startup, resume, clear and after every compaction: this page's pointer, the lessons, the in-flight git state |
| `.claude/hooks/wiki-context.mjs` (UserPromptSubmit) | the ≤ 5 routed pages for each prompt |
| `.claude/hooks/wiki-check.mjs` (Stop + by hand) | code changed without the wiki: blocks the stop once; lints the wiki |

## 9. Phase 1: one section at a time [user] 2026-10-05

Build the site **one slice (a section or a page) at a time**, and finish each one, as close to production as it
can get, before starting the next. Never move to slice Y while slice X has a failing check or a known polish item.

**Order** (a spike rides along with the slice that needs it; `technologies.md` § Spikes):

| # | Slice | Spikes |
| --- | --- | --- |
| 0 | Foundation: scaffold, tokens + fonts on screen (`design.md` drafts → frozen), theme switch, i18n, layout shell, deploy | S0, S1 |
| 1 | Header (title block, split CV CTA) + footer | — |
| 2 | Hero + the signature drawing | S2 |
| 3–6 | Flagship sheets, one slice per project: PstrykWeb → Linkoglot → Clockful → space | S3, S4 |
| 7–10 | How I work → AI workflow → Stack + credentials → Contact (form + `/api/contact`) | — |
| 11+ | Pages: case studies (one each) → `/work/` → `/cv/` + PDF → blog (index, post) + "Latest writing" → `/my-life/` → legal → 404 | S5 |

**The loop for every slice** (repeat until every check passes and one more pass finds nothing worth fixing):
1. **Research** the section (Mobbin, Awwwards, registry, `design-references.md`): a short plan naming the adopted patterns.
2. **Build** with real content where it exists; every placeholder logged (`placeholders.md`).
3. **Evaluate:**
   - screenshots 390 / 1024 / 1920 + the 2560 sweep, light + dark, reduced motion, en / pl / es (pl runs longest)
   - axe AA, the keyboard path, visible focus
   - Lighthouse mobile on the page: ≥ 90 (aim 95+), within the `requirements.md` budgets; record the slice's own
     cost (JS KB, LCP/CLS delta) in `memory/` so later slices know what's left
   - design score ≥ 8/10 (`design-quality.md`), with the weakest point named
   - the slice's analytics events fire (`analytics.md`)
4. **Fix** the weakest point, then evaluate again.
5. **Close:** commit, then report in a few lines with the accepted screenshots and the numbers. The owner's feedback
   reopens the slice before anything new starts.

- A later slice that breaks an earlier one reopens the earlier one first.
- "Done" for a slice = § 2 + a green loop. Placeholders are allowed only when logged.
