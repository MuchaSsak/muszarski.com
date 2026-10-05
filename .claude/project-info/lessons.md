# Lessons: how to work in this project

> Mistakes already paid for, as one-line rules. `.claude/hooks/session-start.mjs` injects the "Rules"
> section into every session and after every compaction, so it stays short: no more than 60 rules,
> merged and pruned. How to add, place and promote one: `working-agreement.md` § 7. Product facts
> live in their own page, not here.

## Rules

### The user's way of working
- Practicality ≥ wow: award sites are often impractical, slow or unusable. Every visual must be impressive within 3 s AND usable in 1 click on mobile; immersive layers are opt-in, never a gate - 2026-10-05.
- Research before designing a section: Mobbin, Awwwards (skill), the component registry (`search-registry-items`), Playwright screenshots, Lighthouse, plus plain web research - 2026-10-05.
- Prove the "product engineer" profile with evidence; never put the negative ("task executor", "klepacz", "not just a coder") in microcopy - 2026-10-05.
- Never invent project facts, metrics, testimonials or credentials. Placeholders/guessed links ARE allowed while building: say so in one short line, mark `PLACEHOLDER`, add a row to `placeholders.md`; on "finish / wrap up / go to prod" clear the register first - 2026-10-05.
- CV changed → regenerate BOTH the `/cv/` page and the PDF from the one data source; never edit one alone (`content-model.md` § CV) - 2026-10-05.
- Legal pages are formal "lawyer grade" text, not the brand voice; noindex,follow; facts with cited statutes; recommend a lawyer review - 2026-10-05.
- The owner can't verify Spanish: AI-translate es, mark it unreviewed, never claim it was reviewed - 2026-10-05.
- Phase 1 builds one slice (section/page) at a time and loops it to near-prod (shots, axe, Lighthouse, design score) before the next; never start Y while X has an open item (`working-agreement.md` § 9) - 2026-10-05.
- PstrykWeb on the site = public info only (landing URL, public konfigurator, his solo role, tech visible from outside). Never AI generation, the pipeline, internal tools or counts until the owner opens it up (`pstrykweb.md` § Public disclosure) - 2026-10-05.
- Owner-stated numbers can be off (the brief said ~6 years; it is ~4, since 2022). When an owner fact and a public source disagree, show both and ask; never pick one - 2026-10-05.

- The owner rejected the first on-screen look (Drafting Table, slices 0-1) as ugly and low-effort. A tidy, safe, minimal system is
  NOT "done": visuals must be ambitious and astonishing first, then made practical. Show several bold rendered directions and let
  the owner choose BEFORE building slices; never freeze a visual system the owner hasn't seen and approved - 2026-10-05.

- Show visual options as live comps (`comps/*.html`, real type, colour, motion) on a private artifact page the owner can
  open on desktop AND phone; stills alone hide the motion that sells a direction - 2026-10-05.
- HARD RULE: only fonts and assets licensed for free commercial use (OFL, Apache, MIT, CC0, CC BY with credit) or the owner's
  own; unknown licence = not used, in comps too. Check before adding, record it in `assets.md` - 2026-10-05.

- Less text, more to see: show tools as one-colour marks WITH their names, facts as icon tiles, products as video; a
  paragraph needs a reason to exist (owner: "sometimes less is more") - 2026-10-05.
- Every hover has a tap, focus or scroll twin; phones get the same content and a premium feel, tweaked per platform where
  that serves UX (owner: "they dont have cursors") - 2026-10-05.
- AI section = the system (wiki, hooks, MCPs, skills, subagents, automation). Typecheck/lint/tests are "the floor": one
  line, never the pitch - 2026-10-05.
- Heavy media (video, credential previews) loads on intent or near-visibility, plays only when visible, pauses offscreen;
  nothing heavy at page load - 2026-10-05.
- The review artifact is shared by link: put nothing on it that the site couldn't show (internal PstrykWeb stack, client
  names); ask those things in chat - 2026-10-05.

- Keep every version of the work (comps, old app looks, review pages) for the build-story case study: tag milestones
  `history/*`, archive old shots, index them in `comps/HISTORY.md`; never delete a superseded look - 2026-10-05.
- A visible label must start the control's accessible name (WCAG 2.5.3): use visually hidden text after the visible text
  ("PL Polski"), not an `aria-label` that replaces it; Lighthouse a11y flags the mismatch - 2026-10-05.

- Before running a production build after adding copy, run `bun run i18n:extract`: a message missing from the catalog
  renders as its id in a production build, and code that splits a string (fitted titles `a|b`) crashes - 2026-10-05.
- `.still` pauses every animation; an entrance with a delay and `both` fill then freezes on its hidden first frame.
  Mark entrances `.rise`/`.enter` (shown final when paused) and test a reload with a stored pause - 2026-10-05.

### Privacy of inputs
- `context/` is private and gitignored (the pstryk code, klepacz.pdf). Copy patterns, not files; never quote the memo verbatim or name its author in committed files - 2026-10-05.
- Research screenshots of third-party sites stay local (`research/inspirations/img/` is gitignored); the repo may go public - 2026-10-05.

### Tools and environment
- Astro 7 renders Markdown with Sätteri: `markdown.remarkPlugins`/`rehypePlugins` need `@astrojs/markdown-remark`;
  write Sätteri mdast/hast plugins (`satteri({ mdastPlugins, hastPlugins })`, visitor objects, `ctx.replaceNode`) instead
  - 2026-10-05.
- Splicing a config with a Python slice (start comment → `export default`) dropped the constants in between; replace
  named blocks, then `node --check` / build at once - 2026-10-05.
- Run prettier from the repo root (`bunx prettier --write <paths>`): run from `apps/web` it ignored the root config
  (130 cols) and re-wrapped untouched files at 80 - 2026-10-05.
- fontkit can't instance a variable WOFF2 (`getVariation` throws in cmap); measure from the TTF source and ship the
  WOFF2 - 2026-10-05.
- A grid-stacked hidden label still sets the grid's width (the header mark's invisible full name pushed CV/Contact
  off a 320 px screen); size such stacks for the visible state or stack the hidden text - 2026-10-05.
- Splicing HTML with string offsets: compute the offsets AFTER every other edit to the same string, then render-check;
  offsets taken first put the new body inside the stylesheet (blank page) - 2026-10-05.
- Heredocs through the Bash tool also break on quote-heavy content ("unexpected EOF"): write scripts with Write, then run
  them - 2026-10-05.
- Windows: the Bash tool's `cd` persists and moves the working directory for later calls; use absolute paths - 2026-10-05.
- WebSearch has a budget shared by parallel agents and runs out; prefer WebFetch of known URLs, then Playwright - 2026-10-05.
- `.gitignore` was copied from pstryk with `*.txt`, which hides `robots.txt` and `llms.txt`; that rule is removed, don't re-add it - 2026-10-05.
- Lingui on Next 16.3 needs `@lingui/swc-plugin` 6.6.0 (6.7.0 is broken); this site uses Astro, where Lingui 6.9 + `lingui-for-astro` passed a spike (pre-1.0, no MDX) - 2026-10-05.
- A muted loop starting during page load cost 270–480 ms TBT in the pstryk lab; start loops on visibility + first interaction - 2026-10-05.
- Routing: a generic phrase in one row ("case study") outscores a project name and cuts the dossier; put shared task words in every row they apply to and re-run `wiki-context.mjs --test` (Polish stems live in `routing-synonyms.json`) - 2026-10-05.
- The wiki is foldered (product/ content/ site/ design/ tech/ legal/ memory/); the hooks need README, log, lessons and working-agreement at the root; keep basenames unique - 2026-10-05.
- The Write tool decodes `\uXXXX` escapes into raw characters (a raw no-break space landed in source); write invisible characters from a script with `chr()`, or keep them out of source - 2026-10-05.
- Shell heredocs through the Bash tool lose backslashes (regexes break); write multi-line scripts with the Write tool, then run them - 2026-10-05.
- Python on Windows writes CRLF: always `open(..., "w", newline="\n")`; `.gitattributes` forces LF in git - 2026-10-05.
- Git Bash rewrites URL-path arguments (`/en/` -> `P:/Git/en/`): prefix such commands with `MSYS_NO_PATHCONV=1` - 2026-10-05.
- Astro 7 runs one `astro preview` per project: e2e, shots and Lighthouse share port 4322 and reuse a running server - 2026-10-05.
