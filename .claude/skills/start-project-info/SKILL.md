---
name: start-project-info
description: "Start or upgrade any project's knowledge base and working machinery before coding: gets every tool and input ready first; for a project with a UI, lets the owner pick the look from 3-4 live animated comps on a review page (rounds until they say go) before the rest of the research; then a .claude/project-info/ wiki built from the user, the repo and research; a CLAUDE.md routing table; a working agreement and a self-improving lessons loop; personal rules in CLAUDE.local.md; hooks that route pages per prompt and re-inject the rules after every compaction, so every new chat works like the best long one. Any project type. --look runs only the look phase (a rebrand); --repair audits and upgrades an existing wiki."
argument-hint: "[optional: one-line idea, repo path, URLs or files] [--look: only pick the look] [--repair: only add or upgrade the machinery]"
disable-model-invocation: true
---

# /start-project-info

Build the project's memory and working agreement before building the project. A fresh chat knows
nothing; a long chat is good because of what it accumulated: decisions, the user's preferences, the
mistakes it already made and fixed. This skill puts all of that where every session loads it
automatically, and gives every session a way to add what it learns. A wrong assumption is far cheaper
to fix in a markdown file than in shipped code.

**What it produces** (no product code):

| Piece | Where | Why |
| --- | --- | --- |
| The look (UI only) | `comps/` + a review page | 3-4 live directions, the owner's pick and every round after it, before any design is written down |
| The wiki | `.claude/project-info/` | facts, decisions, research, design rules: read instead of re-asking, re-scanning, re-researching |
| The router | root `CLAUDE.md` | routing table + invariants + "how every session works"; loaded in every session and kept through compaction |
| Working agreement + lessons | `.claude/project-info/working-agreement.md`, `lessons.md` | how sessions work; what they learned (one-line rules) |
| Personal rules | root `CLAUDE.local.md` (gitignored) | this user's language, autonomy, commit and pause rules |
| Hooks | `.claude/hooks/` + `.claude/settings.json` | session card at startup and after every compaction; routed pages per prompt; a stop check that the wiki moved with the code |

Workflow: **read → ask → get ready → pick the look → research → write → wire → verify.** Tools and
inputs are checked before any work depends on them, and the look is decided on rendered pages before
the research and the wiki describe it: a direction picked from words got built, then rejected on sight.

## Principles (the why behind every step)

- **Facts carry their source.** Tag anything non-obvious: `[user]`, `[repo: path]`, `[file: name]`,
  `[web: url]`, `[research]`, `[assumption]`. A later reader must tell a decision the user made from
  a guess you made: guesses get revisited, decisions don't.
- **Unknown beats invented.** A missing fact is written `Unknown` and goes to `open-questions.md`.
  An invented price, stat, quote or legal basis poisons every later step that trusts the wiki.
- **One owner per fact.** Each fact lives in one page; others link to it. Duplicates drift apart.
- **Dense, not long.** Tables and short bullets, 40-150 lines a page. A page skimmed in a minute gets read.
- **Only the pages the project needs.** A CLI needs no brand page; empty ceremony hides the real pages.
- **The routing table is the one list.** Every page is reachable from a row of CLAUDE.md's
  `## Routing table`, written in the words people actually type. The prompt hook matches those words;
  an unrouted page is a page nobody reads.
- **Lessons beat memory.** A correction from the user or a tool that tripped a session becomes a
  one-line rule in `lessons.md`, injected into every later session. A rule that keeps coming back is
  promoted into a mechanical check (test, lint rule, hook); enforced beats remembered.
- **Sessions don't stop themselves** (default, the user can choose otherwise): compaction is automatic
  and is not a pause; the user decides when work pauses.
- **Secrets never enter the wiki.** Name env vars, never values. Don't read real `.env` files or
  credential stores; use `.env.example` and ask where secrets live.
- **Research informs, never copies.** References are studied for patterns; no design, copy or code
  is reproduced 1:1.
- **Show, don't describe.** Taste is decided on live, moving comps at desktop and phone size, never on
  adjectives or a moodboard; ambitious first, practical second. The owner picks; you recommend.
- **Ready before it's needed.** A missing browser, tool or owner file found in Phase 2 costs one
  question; found mid-comp it costs the round.

## Phase 0 - Read the room (no questions yet)

1. **Pick the mode.**
   - *new*: no `.claude/project-info/`.
   - *extend*: the wiki exists. Read its `README.md`, `log.md`, `open-questions.md`, `lessons.md` and
     `working-agreement.md`; keep what's there, fill gaps, mark contradictions, log every change. Never
     silently overwrite a user decision.
   - *repair* (`--repair`, or a wiki without the machinery): audit and add only what's missing (rows for
     unrouted pages, the working agreement, lessons, `CLAUDE.local.md`, hooks). Skip Phases 2-4 unless asked.
   - *look* (`--look`, a rebrand on an existing wiki): Phases 2-3, then rewrite `design.md` from the
     pick and log it.
2. **Scan what the repo already answers** (targeted reads, not a crawl): manifests (`package.json`,
   `pyproject.toml`, `Cargo.toml`, `go.mod`, `Gemfile`, `pom.xml`, `*.csproj`, `pubspec.yaml`,
   `composer.json`, `Dockerfile`, CI configs, `.env.example`); docs (`README*`, `CLAUDE.md`,
   `CLAUDE.local.md`, `AGENTS.md`, `.cursor/rules`, `.github/copilot-instructions.md`, `docs/`, ADRs,
   `PLAN.md`); structure (top folders, entry points, schema/migration folders, monorepo workspaces like
   `apps/*` and `packages/*`); Claude config (`.claude/settings.json` hooks, `.claude/skills/`).
3. **Check the environment:** a git repo (and a remote)? `node --version` (the hooks need Node 18+)?
   Windows (hooks run through Git Bash; the installer sets `"shell": "bash"`)?
4. **Collect what the user handed over** in `$ARGUMENTS` or the conversation: briefs, URLs,
   screenshots, PDFs, brand files, spreadsheets, old sites.
5. **Classify the project** (it can be several; see the module table in Phase 5). Note whether it has a
   UI: that decides Phase 3.
6. **Recover what past sessions learned** (with the user's OK, it is their history): if this project
   has earlier Claude Code sessions, `node <this skill>/scripts/past-messages.mjs <project> --rules`
   prints only the user's own typed messages that look like standing rules or corrections ("always",
   "never", "from now on", "I want", "zawsze"...). They seed `lessons.md` and the working agreement,
   so the new setup starts from everything the user already taught.

## Phase 1 - Intake interview (short, batched, only real gaps)

Ask only what Phase 0 couldn't answer, in at most two batches. Use AskUserQuestion when available
(at most 4 questions per call, 2-4 options each, the recommended option first); otherwise a compact
numbered list. Offer "skip / decide later" for everything: a skipped answer becomes `Unknown` or a
default marked `[assumption]`, never a blocker.

**Batch A - the project** (pick the open ones):

| Topic | Ask |
| --- | --- |
| Goal | What is this, in one sentence? What does success look like in 3 months (a number if possible)? |
| Who | Who uses it / buys it? Who is it explicitly NOT for? |
| Scope | Must-haves for v1; nice-to-haves; hard out-of-scope. Deadline? |
| Constraints | Budget, required stack/hosting, team size, compliance (GDPR, HIPAA, accessibility), languages/locales |
| Inputs | Existing site/app/repo? Brand assets? Content? Who owns their rights? |
| Taste (no UI only) | 2-5 products they admire (and why), anything they hate, the feel in three words. With a UI, Phase 3 asks this |
| Business (if commercial) | Pricing/monetization, competitors, what they promise customers |

**Batch B - the working agreement** (always ask, also in repair mode; the default is what most owners pick):

| Topic | Ask | Default |
| --- | --- | --- |
| Language | Which language for replies and reports? | the user's chat language; code, commits and the wiki in English |
| Autonomy | Work until the task is done unless told to stop, or check in at milestones? | until done; ask only when blocked on a decision that is genuinely theirs |
| Pausing | What should happen when they pause you? | commit everything (WIP is fine), then two lines: where you stopped, what's next |
| Commits | Who commits, when, as whom, in what format? Push? | commit at every pause and finished task, as the identity they name, Conventional Commits; push only when asked |
| Done | What proves a task is done? | typecheck + lint + tests; UI also screenshots at 390/768/1024/1440, dark mode, reduced motion, long/short text |
| Hooks | Install the session, prompt and stop hooks? | yes for a git + Node project |

Personal answers (language, autonomy, pausing, commit authority, push) go to `CLAUDE.local.md`. Team
rules (commit format, definition of done, verification) go to `working-agreement.md`. If the user says
"just figure it out", take the defaults and record each as `[assumption]` with the reason.

## Phase 2 - Get ready (everything later phases need, before any of them starts)

Check each row, fix what you can yourself, then show the user one short table (ready / missing /
fallback) and ask for everything missing **in one batch**. Don't start Phase 3 with a gap you could
have closed now.

| Need | Check | If missing |
| --- | --- | --- |
| Node 18+, git | `node --version`, `git status` | no Node: hooks skipped (Phase 7); no git: offer `git init` |
| A browser to render and shoot (UI) | Playwright resolvable (`playwright` or `@playwright/test`) + Chromium | offer `npm i -D playwright && npx playwright install chromium` (a scratch folder if the repo has no `package.json` yet) |
| Publishing the review page (UI) | the Artifact tool is available | serve `comps/` locally, give the URL, send key shots in chat |
| Research tools | WebSearch / WebFetch; Mobbin, Firecrawl or other MCPs; Awwwards or registry skills | list what's absent; fall back to Playwright screenshots |
| Media tools (if video or heavy images) | `ffmpeg`, an image encoder (`sharp`, `cwebp`) | JPEG shots only; ask before installing |
| The owner's real content | the name / product line, the headline, one real product or section with its media, the logo and any colour or font that must stay, the old site's URL | ask once; images pasted in chat never reach the disk, so ask for files in `assets/` (the comps switch on when they land) |
| Licences | fonts, icons, textures, sounds, libraries the comps will use | default to free-for-commercial-use only (OFL, Apache, MIT, CC0, CC BY with credit) or the owner's own; unknown = not used |
| Folders | `comps/` (+ gitignored `comps/shots/.work/`, `comps/media/`), `research/`, `assets/` | create them |

A project without a UI checks only the rows without "(UI)" that apply.

## Phase 3 - Pick the look (any project with a UI)

Read `references/look-first.md` now and follow it. In short:

1. **Taste intake**: the feel in three words, what they admire and hate, **the floor** the new look must
   clearly beat, what must stay, the one screen that matters most.
2. **Ambition research**: 20-40 references (same category, same feel, the floor) →
   `research/<date>-look-ambition.md`.
3. **3-4 genuinely different directions** as live, animated one-file comps of that screen's hero + one
   key section, with real content, real type, colour and motion; each with a card (tagline, type,
   palette, signature, cost). Recommend one, with the reason.
4. **Shoot** at 1440 + 390: `node <this skill>/scripts/shoot.mjs comps` (serves the folder itself,
   freezes the clock with `?shot&t=`, reports overflow and console errors). Look at every shot first.
5. **Review page** `comps/index.html` as a private Artifact: the ask, your pick, per direction the shots,
   the card and "Open live"; then the pick asked with AskUserQuestion.
6. **Rounds until the owner says go**: round 2 builds the pick out to the whole screen with open choices
   (theme, font) switchable in place; later rounds map each note to its change. While they review,
   Phase 4 research that doesn't depend on the look runs in the background.
7. **Freeze and keep every version**: the pick feeds `design.md` and `design-references.md` (Phase 5);
   `comps/README.md`, `comps/HISTORY.md` (a row per round with the owner's words), a commit and a
   `history/comps-r<N>-<slug>` tag per round. A rejected look is never deleted.

The gate closes only on the owner's word. Never write `design.md` or build a screen before it.

## Phase 4 - Gather research (parallel where possible)

Run independent gathering in parallel (subagents if available) and write raw findings to
`.claude/project-info/research/` as you go, so nothing is lost if the session ends.

- **Existing product / old site**: crawl it (WebFetch, Playwright or Firecrawl). Capture structure,
  real content and microcopy verbatim, contact facts, and its real flaws. Its look is a reference for
  brand continuity, not a template.
- **Domain and competitors**: 3-6 comparable products: positioning, public pricing, standout
  features, weaknesses. Cite URLs.
- **Audience**: where they are, what they search for, their objections. Evidence over persona fiction.
- **Tech**: official docs for the likely stack (current versions, breaking changes, hosting limits,
  free-tier terms if commercial use matters). Note versions and the date checked.
- **Design research** (only with a UI, after the Phase 3 pick): the patterns the picked look still
  needs for the other screens and components: Mobbin if connected (real shipped screens), else
  Playwright screenshots of strong references and galleries (Awwwards, Land-book, Godly, SiteInspire).
  Study 10+ examples **in the picked direction's feel**; keep the best. One file per source in
  `research/inspirations/<slug>.md` (+ screenshots): what works, what to steal as a pattern, what to skip.
- **Legal/compliance signals**: personal data, cookies/trackers, regions, regulated sectors, licences.

Stop when new sources stop changing the decisions.

**Research files:** raw notes go to `research/<YYYY-MM-DD>-<topic>.md` (sources with URLs and dates;
end with "Not covered: ..."), inspirations to `research/inspirations/<slug>.md`. Raw research is
unrouted and needs no README line (the lint skips `research/`); its conclusions go into the routed
pages, and what you did not get to goes to `open-questions.md` too.

## Phase 5 - Write the wiki

Always write the **core pages**; add the **modules** the project needs. Templates for every page are
in `references/page-templates.md`: read it now, follow the structure, drop what doesn't apply.

**Core (every project):**

| Page | Owns |
| --- | --- |
| `README.md` | the map of pages (one line each) + the wiki's rules; the routing itself lives in CLAUDE.md |
| `project-brief.md` | vision, goal, success metrics, scope in/out, constraints, deadline, stakeholders |
| `requirements.md` | features, user flows, acceptance criteria, priorities, non-functional requirements |
| `technologies.md` | stack + versions, hosting, services, env var NAMES, exact commands, repo layout |
| `conventions.md` | code style, naming, folder rules, git/commit rules, testing bar, definition of done |
| `working-agreement.md` | how every session runs: start, quality bar, compaction, pausing, finishing, the report, the lessons loop |
| `lessons.md` | `## Rules`: one-line lessons, injected into every session (cap 60) |
| `open-questions.md` | every `Unknown`, who can answer it, what it blocks |
| `log.md` | append-only: `## [YYYY-MM-DD] <area> \| <what changed and why>`; `<area>` is one word or slug (`init`, `design-system`) |

**Modules (pick what applies):**

| Project has... | Add |
| --- | --- |
| customers / a market / a brand | `audience.md`, `brand.md` (identity, voice, microcopy rules, words to avoid), `competitors.md` |
| a UI | `design.md` (written from the Phase 3 pick: art direction, tokens, components, motion, imagery, do/don't), `design-references.md` (the look research + `research/inspirations/`, narrowed to the pick) |
| media, docs, fonts, icons | `assets.md` (inventory + sourcing policy + licences) and the `assets/` folder (Phase 6) |
| pages / screens / navigation | `structure.md` (sitemap or screen map, sections, CTAs, forms, embeds) |
| an API / integrations | `api.md` (contracts, auth, errors, rate limits, external services) |
| a database | `data-model.md` (entities, personal-data columns, access rules, migrations workflow) |
| personal data, cookies, payments, a regulated sector | `compliance-and-data.md` (facts only, never a compliance claim) |
| revenue | `monetization.md` (model, plans, prices, promises made to customers) |
| analytics / KPIs | `analytics.md` |
| SEO / content marketing | `seo.md` |
| multiple languages | `i18n.md` |
| infra / ops | `operations.md` |
| measured facts worth keeping (timings, costs, scores) | `memory/<topic>.md` (numbers + where they came from) |

Write order: brief → audience/brand → requirements → structure → technologies → design-references →
design → assets → compliance → the rest → working-agreement → lessons (the skeleton + what Phases 0-3
taught: the user's corrections and standing rules, environment gotchas) → README last (it maps what exists).

**A later phase's modules** (the UI of a v2, an API not started yet): don't write empty pages. List
them in README under "Not written yet (phase X)" and add an open question; write them when that
phase starts.

## Phase 6 - Assets

Create `assets/` at the repo root (or where the stack expects static files; record the choice).

- Subfolders by kind: `brand/`, `images/`, `documents/`, `references/` (research screenshots, **never shipped**).
- Names say what files are (`logo-horizontal-dark.svg`, not `IMG_2231.png`).
- Every asset gets a row in `assets.md`: file, what it is, source, **licence / rights holder**, allowed use, quality notes.
- Write the **sourcing policy**: allowed sources (client-provided, their old site, AI-generated,
  licensed stock, placeholders), forbidden ones, who decides.
- Fonts and icon sets: record the licence and keep the licence file next to the font. If a licence
  can't be verified, the asset doesn't go in.

## Phase 7 - Wire it (router, personal rules, hooks)

1. **`CLAUDE.md`** (template in `references/page-templates.md`): what the repo is in 2-4 sentences;
   `## Routing table` with the header `| Task touches | Read |`, one row per page or task area, the
   "Task touches" cell written in the words people type (synonyms included), the "Read" cell as
   backticked paths (`.claude/project-info/api.md`); `## Invariants` (the non-negotiables, each with
   its page); `## How every session works` (four bullets, the last one the pointer); `## Commands`. Plain paths, no
   `@imports` of wiki pages: an import loads the whole wiki into every session. Keep it under ~150
   lines. Monorepo: rows per app/package area. If `AGENTS.md` exists, CLAUDE.md links it instead of
   duplicating it. In extend/repair mode, merge into the existing CLAUDE.md; never drop its rules.
2. **`CLAUDE.local.md`** from the Batch B personal answers (template). It must be gitignored (the
   installer adds it); nothing personal goes into CLAUDE.md.
3. **Hooks:** `node <this skill>/scripts/install-hooks.mjs <project>` (`--dry` to preview, `--no-stop`
   for projects without code or git). It copies `session-start.mjs`, `wiki-context.mjs` and
   `wiki-check.mjs` into `.claude/hooks/`, merges three hooks into `.claude/settings.json` (keeping
   everything else) and gitignores `CLAUDE.local.md`. Re-running it updates the scripts. Then test
   (from any directory; `P` is the project path):
   ```bash
   echo '{"source":"compact"}' | CLAUDE_PROJECT_DIR="$P" node "$P/.claude/hooks/session-start.mjs"
   CLAUDE_PROJECT_DIR="$P" node "$P/.claude/hooks/wiki-context.mjs" --test "a realistic task" "another one"
   CLAUDE_PROJECT_DIR="$P" node "$P/.claude/hooks/wiki-check.mjs"
   ```
   `--test` prints each routed row with its score and the words that matched. Try at least five
   realistic prompts, **at least two in the user's own language**, plus one noise prompt ("where did I
   leave that") that must route nowhere. A miss: reword the row's "Task touches" cell, or add
   `.claude/project-info/routing-synonyms.json`: `{ "checkout": ["payments"], "zamow*": ["orders"] }`
   (keys match without diacritics; a trailing `*` matches any ending, so one stem covers an inflected
   word's forms). Noise: remove a generic word from a cell. Code areas that map to pages go in
   `.claude/project-info/wiki-check.json` (`{ "areas": [{ "prefix": "src/api/", "pages": ["api.md"] }] }`)
   so the stop check names the page to update. Hooks load when a session starts: tell the user a new
   chat activates them.
   **No Node:** skip the hooks and say so. CLAUDE.md and CLAUDE.local.md still load in every session and
   survive compaction; only per-prompt routing and the lessons re-injection are lost, so copy the five
   most important lessons into CLAUDE.md.
4. **Add to `lessons.md`** what wiring taught (shell quirks, a hook that needed tuning). Phase 5 wrote
   the skeleton and the Phase 0-3 lessons.

**How the hooks decide** (so you can tune them without reading the scripts):

| Hook | Rule |
| --- | --- |
| `session-start.mjs` | prints the agreement pointer, the in-flight git state (counts only) and the lessons' `## Rules` (cut at 8 000 chars); remembers the session's starting HEAD in the OS temp dir |
| `wiki-context.mjs` | prompt words vs each row's words: exact 1, plural 0.9, shared 5+ letter prefix 0.6, each divided by sqrt(rows holding the word); routes rows scoring ≥ 0.75 and ≥ 55 % of the best, at most 5; 2-3 letter words count only when a row or synonym uses them; prompts under 25 characters are skipped |
| `wiki-check.mjs` (lint) | routing paths exist, every page in README (basename), `# Title` first, `.md` links resolve, log entry shape, lessons `## Rules` + cap 60, config JSON valid, no key-shaped strings in the wiki / CLAUDE.md / settings.json |
| `wiki-check.mjs --stop-hook` | code changed this session (commits since the starting HEAD + the worktree) with no wiki / CLAUDE.md / README change → block once per state; a wiki change → lint, block on errors; lockfiles, logs, `.claude/hooks/` and `CLAUDE.local.md` don't count |

## Phase 8 - Verify and hand off

1. `node .claude/hooks/wiki-check.mjs` reports 0 errors (or run the quality check below by hand).
2. Read the wiki once as a stranger: contradictions between pages, facts without a source,
   placeholders (`TODO`, `TBD`, `lorem`), questions answered elsewhere. Fix trivial drift; list the
   rest in `open-questions.md`.
3. Append the session to `log.md`.
4. Report to the user, briefly and in their language:
   - the look picked (the review page link, the rounds) and the pages written (one line each), the assets collected;
   - the decisions you made for them (`[assumption]` items) so they can overrule them;
   - the machinery installed, and how to see it work (a new chat shows the session card; after a
     compaction it comes back);
   - the top open questions, ordered by what they block;
   - the next step (usually: answer the blocking questions, then build from `requirements.md`).

## How the wiki stays alive afterwards

`working-agreement.md` makes every later session close the loop: start from the routed pages and the
lessons; finish with verification → the page that describes the change + `log.md` → lessons →
commit → a short report. The stop hook catches a session that changed code without touching the wiki.
When the wiki feels stale, run `/start-project-info --repair`: it re-audits routing coverage, the
lessons cap and the hook scripts (install-hooks updates them).

## Quality check (run before reporting)

- [ ] Every page has one owner topic; no fact appears in two pages.
- [ ] Every non-obvious fact has a source tag; every guess is marked `[assumption]`.
- [ ] No invented numbers, quotes, reviews, prices, legal bases or retention periods.
- [ ] No secret values anywhere; env vars named only (`wiki-check` scans for key shapes).
- [ ] Research files cite URLs and dates; inspirations say what to steal AND what to skip.
- [ ] UI: the owner picked the look from live comps (their words in `log.md`), `design.md` is written from the pick, `comps/README.md` + `comps/HISTORY.md` exist and each round is committed and tagged; or the phase was skipped with the reason stated.
- [ ] Every asset has a licence/rights line or is flagged in `open-questions.md`.
- [ ] Pages that don't apply were not created; `README.md` lists exactly the pages that exist (raw `research/` aside) and the later-phase pages "not written yet".
- [ ] Every page is reachable from a routing-table row; five realistic prompts (two in the user's language) route correctly and a noise prompt routes nowhere (`wiki-context.mjs --test`).
- [ ] `working-agreement.md` covers start, quality bar, compaction, pausing, finishing, report, lessons.
- [ ] `lessons.md` has a seeded `## Rules` section under 60 rules.
- [ ] `CLAUDE.local.md` holds the personal answers and is gitignored; CLAUDE.md holds nothing personal.
- [ ] Hooks installed and tested, or skipped with the reason stated.
- [ ] `log.md` has today's entry; `wiki-check` reports 0 errors.

## Where this skill lives

Source of truth: `pstryk-pipeline/.claude/skills/start-project-info/` (operator-only there: its
`OPERATOR_ONLY` file keeps it out of PstrykWeb's build containers). A copy in `~/.claude/skills/`
makes `/start-project-info` available in every project; after editing the source, copy it again.
Bundled scripts (`scripts/`): `install-hooks.mjs`, `session-start.mjs`, `wiki-context.mjs`,
`wiki-check.mjs`, `past-messages.mjs` (plain Node 18+, no dependencies) and `shoot.mjs` (comp
screenshots; needs Playwright). References: `page-templates.md`, `look-first.md`.
