# Lessons: how to work in this project

> Mistakes already paid for, as one-line rules. `.claude/hooks/session-start.mjs` injects the "Rules"
> section into every session and after every compaction, so it stays short: no more than 60 rules and
> under the 8,000-character card, merged and pruned. How to add, place and promote one: `working-agreement.md` § 7.
> Product facts live in their own page, not here.

## Rules

### The user's way of working
- Deploying to the domain is not the launch: launch mode (indexable, placeholder gate) only on the owner's word (`LAUNCH_BUILD`) - 2026-10-06.
- Practicality ≥ wow: impressive within 3 s AND usable in 1 click on mobile; immersive layers are opt-in, never a gate - 2026-10-05.
- Research before designing a section: Mobbin, Awwwards (skill), the component registry, Playwright shots, Lighthouse, web research - 2026-10-05.
- Prove the "product engineer" profile with evidence; never put the negative ("task executor", "klepacz", "not just a coder") in copy - 2026-10-05.
- Never invent facts, metrics, testimonials or credentials. Placeholders are allowed while building: say so in one line, mark `PLACEHOLDER`, log it in `placeholders.md`; clear the register on "go to prod" - 2026-10-05.
- CV changed → regenerate BOTH `/cv/` and the PDF from the one data source (`bun run cv:pdf`); never edit one alone - 2026-10-05.
- Legal pages: formal "lawyer grade" text, noindex,follow, cited statutes, recommend a lawyer review - 2026-10-05.
- The owner can't verify Spanish: AI-translate es, mark it unreviewed, never claim it was reviewed - 2026-10-05.
- Build one slice at a time, looped to near-prod (shots, axe, Lighthouse, design score) before the next (`working-agreement.md` § 9) - 2026-10-05.
- PstrykWeb = public info only (the landing, "built for Cetuspro", outside-visible tech); never "solo" or "team", never a konfigurator link [2026-10-06], AI generation, the pipeline, internal tools or counts - 2026-10-05.
- Owner-stated numbers can be off (~6 years was ~4, since 2022): when an owner fact and a public source disagree, show both and ask - 2026-10-05.
- Visuals must be ambitious first, then practical: the safe minimal first look was rejected. Show bold live directions (`comps/`, artifact page, desktop + phone) and let the owner pick before freezing a system - 2026-10-05.
- HARD RULE: only fonts/assets free for commercial use (OFL, Apache, MIT, CC0, CC BY with credit) or the owner's own; unknown licence = not used; record it in `assets.md` - 2026-10-05.
- Less text, more to see: tools as one-colour marks WITH names, products as video ("sometimes less is more"); in chapters a short text description beats icon tiles; How I work tells each stop with a drawn scene, not a headline [2026-10-06] - 2026-10-05.
- AI section: examples, tool marks as pins and one line per piece; never counts ("7 skills", "3 MCP servers") - 2026-10-06.
- Every hover has a tap, focus or scroll twin; phones get the same content and a premium feel ("they dont have cursors") - 2026-10-05.
- AI section = the system (wiki, hooks, MCPs, skills, subagents). Typecheck/lint/tests are "the floor": one line, never the pitch - 2026-10-05.
- Heavy media loads near visibility, plays only when visible and after a first interaction (a load-time loop cost 270–480 ms TBT) - 2026-10-05.
- Shared review pages show nothing the site couldn't (internal PstrykWeb stack, client names); ask those in chat - 2026-10-05.
- Keep every version for the build story: tag `history/*`, archive old shots, index in `comps/HISTORY.md`; never delete a superseded look - 2026-10-05.

### Code and quality
- A visible label must start the accessible name (WCAG 2.5.3): visually hidden text after the visible text, not a replacing `aria-label` - 2026-10-05.
- Run `bun run i18n:extract` before a production build: a missing message renders as its id and fitted titles (`a|b`) crash - 2026-10-05.
- `.still` pauses every animation, freezing delayed entrances on their hidden frame: mark entrances `.rise`/`.enter` and test a stored pause - 2026-10-05.
- Never name a class after a Tailwind utility (`.ring` drew a box-shadow ring); prefix section classes (`lp-ring`) - 2026-10-05.
- `Icon.astro` forwards Astro's scope attribute, so a scoped `svg` selector also hits icons; target drawn SVGs by class - 2026-10-05.
- Inline `<script>`s render between sibling sections: count siblings with `:nth-of-type`, not `:nth-child` - 2026-10-05.
- A grid-stacked hidden label still sets the grid's width (it pushed the header off a 320 px screen); size stacks for the visible state - 2026-10-05.
- The font subset must hold every character the copy uses (en/em dash were missing and fell back to Arial): after `bun run fonts`, check coverage - 2026-10-06.
- Chrome holds first paint for a preloaded font, and HTML bytes compete with it: keep page HTML lean (icons live in the cached sprite; first-screen icons `inline`) - 2026-10-06.
- A child rule like `.dlink > span { width: 100% }` also hits an added `.sr-only` span (a 1,193 px overflow): exclude `.sr-only` or wrap the visible text - 2026-10-06.
- A focus target taller than the viewport minus the header always sits under the sticky header: cap media by viewport height (`100svh - var(--header-h)`) - 2026-10-06.

- Astro does not scope `@keyframes` names: two components' `bob` collided. Prefix keyframes per component (`hw-`, `cr-`, `ai-`) - 2026-10-06.
- Reduced motion keeps `animation-delay`: staged entrances stay hidden for their delay. Switch staged scenes off under reduced motion and `.still` - 2026-10-06.

### Privacy of inputs
- `context/` is private and gitignored: copy patterns, not files; never quote the memo or name its author in committed files - 2026-10-05.
- Research screenshots of third-party sites stay local (`research/inspirations/img/` is gitignored); the repo may go public - 2026-10-05.

### Tools and environment
- Astro 7 Markdown runs on Sätteri: write mdast/hast visitor plugins (`satteri({ mdastPlugins, hastPlugins })`, `ctx.replaceNode`), not remark/rehype - 2026-10-05.
- Splicing text by slices or offsets drops or misplaces content: replace named blocks, then `node --check` / build and render-check at once - 2026-10-05.
- Run prettier from the repo root (`bunx prettier --write <paths>`); from `apps/web` it ignores the root config - 2026-10-05.
- fontkit can't instance a variable WOFF2; measure from the TTF source and ship the WOFF2 - 2026-10-05.
- Bash heredocs break on quotes and lose backslashes, and `cat > /dev/null &&` before one hangs on stdin; Write/Edit decode `\uXXXX` into raw characters: write scripts with Write, emit invisible characters from code with `chr()` - 2026-10-05.
- Python on Windows writes CRLF: always `open(..., "w", newline="\n")` (a fixer pass caught 6 files on 2026-10-06) - 2026-10-05.
- Git Bash rewrites URL-path arguments (`/en/` → `P:/Git/en/`): prefix with `MSYS_NO_PATHCONV=1`, also for `bun run lhci` - 2026-10-05.
- The Bash tool's `cd` persists: use absolute paths - 2026-10-05.
- Playwright WebKit on Windows paints variable fonts at the default instance (layout is right): judge Safari by measured widths, never by those screenshots - 2026-10-06.
- One `astro preview` per project: e2e, shots and Lighthouse share port 4322 and reuse a running server - 2026-10-05.
- After a Playwright update, run `./node_modules/.bin/playwright install chromium` in `apps/web` (browser version mismatch) - 2026-10-06.
- No `content-visibility: auto` here: its 900 px placeholders made WebKit land focus 300–700 px off, and Lighthouse gained nothing (99, LCP 1953 ms with or without) - 2026-10-06.
- WebKit scrolls focus to where a stuck sticky chapter is drawn (under the next poster): `Chapters.astro` re-scrolls to the flow position; test focus in Firefox + WebKit (`bun run e2e:xb`) - 2026-10-06.
- The owner works on two PCs: `git pull` first; on a merge take one side's `.po`, re-add the other side's changed msgids, `bun run i18n:extract`; regenerate PDFs, never merge them - 2026-10-06.
- WebSearch has a budget shared by parallel agents; prefer WebFetch of known URLs, then Playwright - 2026-10-05.
- Host redirects live in ONE place (Vercel → Domains): a www → apex rule in `vercel.json` against the dashboard's apex → www looped every font and script while the cached HTML still loaded (Arial titles overflowed) - 2026-10-06.
- `api/` runs on Vercel as native ESM: relative imports need `.js` (`../src/lib/contact.js`) or every request 500s; tests and `tsc` don't catch it (a unit test does now). Read `vercel logs --status-code 500 -x` first - 2026-10-06.
- Never derive analytics domains from the build origin (a preview host got baked in, Umami dropped every real visit): list the production hosts explicitly - 2026-10-06.
- `.gitignore` must not ignore `*.txt` (it hid `robots.txt` and `llms.txt`) - 2026-10-05.
- Routing: a generic phrase in one row outscores a project name; put shared task words in every row they apply to and re-run `wiki-context.mjs --test` - 2026-10-05.
- The wiki is foldered; the hooks need README, log, lessons and working-agreement at the root; keep basenames unique - 2026-10-05.
