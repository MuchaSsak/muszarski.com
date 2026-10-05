---
name: wiki-lint
description: "Health-check the .claude/project-info wiki: cross-file contradictions, claims the code contradicts, leftover placeholders, answered Open questions, missing files. Fixes trivial drift in place, routes structural fixes to the owning gen-* skill, logs the pass. Use after wiki generation (init Phase 1 verify), after any task that changed wiki files, or when asked to 'lint/check the wiki'."
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
  - Bash(grep:*)
  - Bash(date:*)
---

# /wiki-lint

Health-check `.claude/project-info/*.md` and keep it trustworthy. A stale or
self-contradicting wiki is worse than none — this pass is the guard.

## Use when

- End of init Phase 1, replacing the manual "verify every file" step (subsumes it).
- After any coding goal that changed one or more `.claude/project-info/*.md` files.
- On explicit request ("lint the wiki", "is the wiki still accurate?").

## Context to read

Always:
- User/orchestrator input: `$ARGUMENTS` (may narrow the scope to just-changed files)
- Every existing `.claude/project-info/*.md` (they are budgeted small; skip `usage/*` — static library, not project state)
- Recent history: `grep "^## \[" .claude/project-info/log.md | tail -5` (if the file exists)

Code spot-checks, only the cheap greppable ones and only when the relevant wiki file exists:
- Locales: `packages/shared/src/lib/localeCodes.ts` vs `technologies.md`
- Routes: `ROUTES` in `packages/shared/src/lib/constants.ts` vs `website-structure.md`
- Analytics provider/events in code vs `analytics.md`
- `localStorage`/`sessionStorage`/cookie keys in app code vs `compliance-and-data.md`

## Checks

1. **Cross-file contradictions** — especially across field-ownership boundaries: a value quoted in a non-owning file must match the owning file verbatim (e.g. `brand_slogan` is authoritative in `company-brand.md`).
2. **Code drift** — wiki claims the spot-check greps contradict. Code wins for facts about the code; the payload wins for business facts.
3. **Leftovers** — `TODO_`, ALL-UPPERCASE placeholders, template filler, or empty required sections inside wiki files.
4. **Answered Open questions** — `Open questions` entries the payload, code, or a newer wiki file now answers: resolve and remove them.
5. **Missing files** — every non-skipped wiki file exists, is non-empty, and is not placeholder-filled. A documented skip (no analytics, no PII) is not a finding.
6. **Unjustified locales** (`technologies.md` → Internationalization) — every listed locale must name what it rests on: the payload's `website_locales`, or a concrete artefact from the old-site research (language switcher, per-language URLs, `hreflang`, duplicated copy), or "the site's own language". A locale whose only basis is an audience guess ("tourists", "near the border", "English is useful") — or one with no stated basis at all — is a finding: **delete it here in Phase 1**, and make sure `website_default_locale` is still a member of what remains. Do this at lint time, not later: each locale costs a fully hand-translated catalog and a key in every CMS `jsonb` column, so dropping it once the sections are built means editing every component and catalog instead of one wiki line. A payload that explicitly listed the locale is never a finding, however odd it looks.

## Operating rules

1. Never ask questions (headless and interactive runs alike). Never invent facts to "fix" a gap — an unresolvable finding is routed, not guessed.
2. Fix trivial drift directly in the wiki file: one-line corrections, verbatim re-quotes from the owning file, deleting answered Open questions, replacing a stale value the code proves wrong.
3. Route structural problems (wrong ownership, missing file, section rewrite) to the owning `gen-*` skill; state which skill and why in the report.
4. Route unresolvable items (needs developer input, external facts) to `IMPORTANT.md` via the `important-notice` skill.
5. Finish by appending one line to `.claude/project-info/log.md`:
   `## [YYYY-MM-DD] lint | <n> findings: <one-line summary>` (or `clean`). Create the file if missing.

## Output constraints

- Report ≤ 15 lines: one line per finding — `file: problem -> action taken (fixed | routed to gen-x | IMPORTANT.md)` — plus a final `clean`/summary line.
- Never rewrite whole wiki files; edits are surgical.
- Never touch code, configs, or anything outside `.claude/project-info/` and `IMPORTANT.md`.
- No motivational prose. Findings only.

## What NOT to do

- Do not regenerate files wholesale — that is the owning gen-* skill's job.
- Do not lint `usage/*.md` (static shipped library) or `coding-guidelines.md`/`seo.md`/`accessibility.md` content beyond placeholder leftovers.
- Do not "improve" style, reword prose, or expand sections — drift and contradictions only.
- Do not treat a documented skip or `Unknown` with an Open question as a finding.
