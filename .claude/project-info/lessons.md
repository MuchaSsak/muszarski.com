# Lessons: how to work in this project

> Mistakes already paid for, as one-line rules. `.claude/hooks/session-start.mjs` injects the "Rules"
> section into every session and after every compaction, so it stays short: no more than 60 rules and
> under the 8,000-character card, merged and pruned. How to add, place and promote one: `working-agreement.md` § 7.
> Product facts live in their own page, not here. Promoted 2026-10-07 (still in their pages): Sätteri plugins,
> `content-visibility`, the stuck-chapter focus, MDX component CSS and `satisfies` (astro.md), fontkit, `api/` ESM
> imports and host redirects (technologies.md), production hosts (analytics.md), WebKit font shots (visual-qa.md), the
> foldered wiki (README.md); 2026-10-08: scope attribute on icons, inline scripts between sections, unscoped
> `@keyframes` (astro.md); the CV print gotchas (`.claude/skills/new-cv/references/template.md`).

## Rules

### The user's way of working
- Deploying to the domain is not the launch: launch mode (indexable, placeholder gate) only on the owner's word (`IS_FULL_PRODUCTION`) - 2026-10-06.
- Research before designing a section: Mobbin, Awwwards (skill), the component registry, Playwright shots, Lighthouse, web research - 2026-10-05.
- Prove the "product engineer" profile with evidence; never put the negative ("task executor", "klepacz", "not just a coder") in copy - 2026-10-05.
- Legal pages: formal "lawyer grade" text, noindex,follow, cited statutes, recommend a lawyer review - 2026-10-05.
- PstrykWeb = public info only (the landing, "built for Cetuspro", outside-visible tech); never "solo" or "team", never a konfigurator link [2026-10-06], AI generation, the pipeline, internal tools or counts - 2026-10-05.
- Owner-stated numbers can be off (~6 years was ~4, since 2022): when an owner fact and a public source disagree, show both and ask - 2026-10-05.
- Visuals ambitious first, then practical (the safe first look was rejected): show bold live directions (`comps/`, desktop + phone) and let the owner pick before freezing a system - 2026-10-05.
- Less text, more to see: tools as one-colour marks WITH names, products as video ("sometimes less is more"); in chapters a short text description beats icon tiles; How I work tells each stop with a drawn scene, not a headline [2026-10-06] - 2026-10-05.
- Every picture ships as optimal WebP (`astro:assets`, `public/` too); PNG only for favicons and OG cards; the launch gate fails otherwise - 2026-10-07.
- Every hover has a tap, focus or scroll twin; phones get the same content and a premium feel ("they dont have cursors") - 2026-10-05.
- Blog voice = a person writing, not an AI answering a prompt: no "What would I do differently?" / "Takeaways" sections - 2026-10-07.
- AI section = the system (wiki, hooks, MCPs, skills, subagents) shown by example, tool marks as pins, never counts ("dont give precise numbers"); typecheck/lint/tests are "the floor", one line - 2026-10-06.
- Do exactly the one thing asked ("so overachieving"); copy stays close to the owner's words: no overselling, no counts, never repeat what the picture already shows - 2026-10-07.
- Heavy media loads near visibility, plays only when visible and after a first interaction (a load-time loop cost 270–480 ms TBT) - 2026-10-05.
- Shared review pages show nothing the site couldn't (internal PstrykWeb stack, client names); ask those in chat - 2026-10-05.
- Keep every version for the build story: tag `history/*`, archive old shots, index in `comps/HISTORY.md`; never delete a superseded look - 2026-10-05.
- Logos only where the brand's own guideline allows the use, checked per brand: most tool brands forbid it (React, GitLab, Playwright, Lighthouse, Claude), LinkedIn allows only its own artwork; CC0 artwork is not permission [user 2026-10-08: "use logos and icons when you know its okay"] - 2026-10-08.

### Code and quality
- A visible label must start the accessible name (WCAG 2.5.3): visually hidden text after the visible text, not a replacing `aria-label` - 2026-10-05.
- Run `bun run i18n:extract` before a production build: a missing message renders as its id and fitted titles (`a|b`) crash - 2026-10-05.
- `.still` pauses every animation, freezing delayed entrances on their hidden frame: mark entrances `.rise`/`.enter` and test a stored pause - 2026-10-05.
- Prefix classes: one named after a Tailwind utility (`.ring` drew a box-shadow ring) or a component (`browser` as a modifier drew a second frame) is already a selector; use `lp-ring`, `f-browser` - 2026-10-05.
- A grid-stacked hidden label still sets the grid's width (it pushed the header off a 320 px screen); size stacks for the visible state - 2026-10-05.
- Chrome holds first paint for a preloaded font, and HTML bytes compete with it: keep page HTML lean (icons in the cached sprite; first-screen icons `inline`). Keep the preload: without it home LCP fell 0.6 s but the parse landed after first paint (TBT 33 → 775 ms) - 2026-10-06.
- A child rule like `.dlink > span { width: 100% }` also hits an added `.sr-only` span (a 1,193 px overflow): exclude `.sr-only` or wrap the visible text - 2026-10-06.
- A focus target taller than the viewport minus the header always sits under the sticky header: cap media by viewport height (`100svh - var(--header-h)`) - 2026-10-06.
- Reduced motion keeps `animation-delay`: staged entrances stay hidden for their delay. Switch staged scenes off under reduced motion and `.still` - 2026-10-06.
- Load cost hides in style and layout: animate an HTML wrapper, never an `<svg>` (a layout per frame); no grid around a `container-type` box (~1 s layouts); set `top`, not an inherited custom property, on big subtrees; never toggle a class a `*` rule reads on a big ancestor (`.off *` restyled 1,658 elements: start paused, mark what is near); transition only the revealed state. Find each with traces and CSS A/B via `page.route` - 2026-10-07.
- A % height inside an auto grid row resolves against the row the item itself grew (the Linkoglot phone overflowed its field): give the grid a definite track, `grid-template: minmax(0, 1fr) / minmax(0, 1fr)` - 2026-10-08.

### Privacy of inputs
- Images pasted in chat never reach the disk: ask the owner to drop the files in the repo, and build the slot so it switches on when they land - 2026-10-06.
- Research screenshots of third-party sites stay local (`research/inspirations/img/` is gitignored); the repo may go public - 2026-10-05.

### Tools and environment
- Splicing text by slices or offsets drops or misplaces content: replace named blocks, then `node --check` / build and render-check at once - 2026-10-05.
- Run prettier from the repo root (`bunx prettier --write <paths>`; from `apps/web` it ignores the root config), never on generated files (`og.mjs` parses `icons.gen.ts` as JSON); after formatting an Astro template, diff the rendered HTML (it put a visible space in `All<sup>`) - 2026-10-05.
- Bash heredocs break on quotes and lose backslashes (again 2026-10-07, 2026-10-08), and `cd` persists: write scripts with Write, use absolute paths; Write/Edit decode `\uXXXX`, so emit invisible characters with `chr()` - 2026-10-05.
- Python on Windows writes CRLF: always `open(..., "w", newline="\n")` (a fixer pass caught 6 files on 2026-10-06) - 2026-10-05.
- Git Bash rewrites URL-path arguments (`/en/` → `P:/Git/en/`): prefix with `MSYS_NO_PATHCONV=1`, also for `bun run lhci` - 2026-10-05.
- `bun run check` stops at the first failing task: a red test hid a typecheck error that got committed. Read every task's result, re-run `astro check` after fixing a test - 2026-10-06.
- e2e role queries match substrings ("Pull-up" hit "Pull-ups"): pass `exact: true` for short names - 2026-10-06.
- Stop a server by its port's PID (`netstat -ano | grep :<port>` → `taskkill //F //PID`), never by image name: `taskkill /IM python.exe` ends every Python on the machine, other sessions' too - 2026-10-08.
- A git worktree under the long temp path builds pages with no CSS ("Filename too long") and won't delete: put A/B worktrees at a short path (`C:/Users/<you>/wtb`), remove them with `git worktree remove` - 2026-10-08.
- One `astro preview` and one `astro dev` per project: e2e, shots and Lighthouse share port 4322; for speed work build to a scratch `--outDir` and serve it on its own port (`E2E_PORT`, `lhci --base`). A busy machine fakes regressions (other sessions' headless Chrome at 100% CPU): check the load, rerun - 2026-10-07.
- After a Playwright update, run `./node_modules/.bin/playwright install chromium` in `apps/web` (browser version mismatch) - 2026-10-06.
- The owner works on two PCs and runs parallel sessions (one committed another's WIP, 2026-10-07): `git pull`/`git log` first, stage your own paths only; on a merge take one side's `.po`, re-add the other's msgids, extract; regenerate PDFs - 2026-10-06.
- WebSearch has a budget shared by parallel agents; prefer WebFetch of known URLs, then Playwright - 2026-10-05.
- Routing: a generic phrase in one row outscores a project name; put shared task words in every row they apply to and re-run `wiki-context.mjs --test` - 2026-10-05.
