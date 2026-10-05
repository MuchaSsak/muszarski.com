---
name: commit
description: Commit finished coherent work using clear conventional commits.
model: claude-haiku-4-5
---

Fast commit. Spend <10s total — do not deliberate, do not review diffs, do not spend many tokens on this. Just very quickly do those few git commands and that's it.

The author of commits made by you should always be Claude, not the developer from previous commits. Just admit it was you via `git config`.

Always stage everything (no path exceptions):
!`git add .`

If nothing is staged, say "nothing to commit" and stop.

Otherwise make ONE conventional commit. Subject ≤50 chars, imperative mood. Add a short body ONLY when the "why" isn't obvious from the subject:

type(scope): summary

Types: feat, fix, refactor, chore, docs, test, style, perf, ci, build.

Do NOT push — the runner (`/runner/publish.sh`) owns the tokenized push. Do not run status/diff beyond the `git add .` above.

NEVER pass `--no-verify`. If the pre-commit hook blocks the commit (secret token, real `.env` file, `*.TODO` stub, unresolved `TODO_` placeholder), report the finding and stop — fixing it belongs to the calling workflow, not this skill.
