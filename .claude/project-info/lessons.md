# Lessons: how to work in this project

> Mistakes already paid for, as one-line rules. `.claude/hooks/session-start.mjs` injects the "Rules"
> section into every session and after every compaction, so it stays short: no more than 60 rules and
> under the 8,000-character card, merged and pruned. How to add, place and promote one: `working-agreement.md` § 7.
> Product facts live in their own page, not here. Promoted 2026-10-07 (still in their pages): Sätteri plugins,
> `content-visibility`, the stuck-chapter focus, MDX component CSS and `satisfies` (astro.md), fontkit, `api/` ESM
> imports and host redirects (technologies.md), production hosts (analytics.md), WebKit font shots (visual-qa.md), the
> foldered wiki (README.md); 2026-10-08: scope attribute on icons, inline scripts between sections, unscoped
> `@keyframes` (astro.md); the CV print gotchas (`.claude/skills/new-cv/references/template.md`); class prefixes,
> grid-stacked labels and child rules hitting `.sr-only` (astro.md), the legal-page style (compliance-and-data.md),
> PstrykWeb's public-info rule (pstrykweb.md), the AI section's rules (structure.md, home row 4); WebP-only pictures (the
> launch gate), sharp's composite order and touch-emulated phone shots (`.claude/skills/new-blog/scripts/capture.mjs`), prettier
> (conventions.md), routing words (README.md § Rules).

## Rules

### The user's way of working
- Deploying to the domain is not the launch: launch mode (indexable, placeholder gate) only on the owner's word (`IS_FULL_PRODUCTION`) - 2026-10-06.
- Research before designing a section: Mobbin, Awwwards (skill), the component registry, Playwright shots, Lighthouse, web research - 2026-10-05.
- Prove the "product engineer" profile with evidence; never put the negative ("task executor", "klepacz", "not just a coder") in copy - 2026-10-05.
- Owner-stated numbers can be off (~6 years was ~4, since 2022): when an owner fact and a public source disagree, show both and ask - 2026-10-05.
- Visuals ambitious first, then practical (the safe first look was rejected): show bold live directions (`comps/`, desktop + phone) and let the owner pick before freezing a system - 2026-10-05.
- Less text, more to see: tool marks WITH names, products as video, a short description over icon tiles, a drawn scene per How I work stop - 2026-10-05.
- Every hover has a tap, focus or scroll twin; phones get the same content and a premium feel ("they dont have cursors") - 2026-10-05.
- Blog voice = a person writing, not an AI answering a prompt: no "What would I do differently?" / "Takeaways" sections - 2026-10-07.
- Do exactly the one thing asked ("so overachieving"); copy stays close to the owner's words: no overselling, no counts, never repeat what the picture already shows - 2026-10-07.
- Heavy media loads near visibility, plays only when visible and after a first interaction (a load-time loop cost 270–480 ms TBT) - 2026-10-05.
- Shared review pages show nothing the site couldn't (internal PstrykWeb stack, client names); ask those in chat - 2026-10-05.
- Keep every version for the build story: tag `history/*`, archive old shots, index in `comps/HISTORY.md`; never delete a superseded look - 2026-10-05.
- Fun, not overly fun: a drawn prop in every section read as "too vibe coded"; lead with real media, type and one interesting component; a wink is an emoji, not a gag - 2026-10-08.
- Logos only where the brand's own guideline allows it, checked per brand (CC0 artwork is not permission); propose a mark, don't assume it stays (`assets.md` § CV marks) - 2026-10-08.
- Every section built or edited is checked in en, pl and es at phone, laptop and desktop before done (`bun run e2e text-fit` + the three locales' shots side by side); boxes are sized for the longest locale, never the English word (`visual-qa.md` § Locales) - 2026-10-08.
- Commit only what the site ships: QA screenshots and scratch stay local or gitignored ("why waste repo space") - 2026-10-08.
- Job terms follow job-board usage, not a literal translation ("inżynier produktu" is a factory role and implies a degree): `i18n.md` § Terminology - 2026-10-08.

### Code and quality
- A visible label must start the accessible name (WCAG 2.5.3): visually hidden text after the visible text, not a replacing `aria-label` - 2026-10-05.
- Run `bun run i18n:extract` before a production build: a missing message renders as its id and fitted titles (`a|b`) crash - 2026-10-05.
- `.still` pauses every animation, freezing delayed entrances on their hidden frame: mark entrances `.rise`/`.enter` and test a stored pause - 2026-10-05.
- Scroll-driven CSS goes in longhands (`animation-name`, `-timing-function`, `-fill-mode`, `-timeline`, `-range`): the build folds `animation` + `animation-timeline` into one shorthand Chrome rejects whole, and the effect silently never runs; check `getComputedStyle(el).animationName` in a browser, not the source. Three rules slipped back by 2026-10-09: `styles/scroll-driven.test.ts` now fails on it - 2026-10-08.
- Keep page HTML lean (icons in the cached sprite, first-screen icons `inline`) and keep the font preload: Chrome holds first paint for it, and dropping it cost TBT 33 → 775 ms - 2026-10-06.
- A focus target taller than the viewport minus the header always sits under the sticky header: cap media by viewport height (`100svh - var(--header-h)`). A scroll-driven transform moves a focus target after the focus scroll placed it (the Linkoglot phone slid under the header): drop the animation under `:has(:focus-visible)` - 2026-10-06.
- Reduced motion keeps `animation-delay`: staged entrances stay hidden for their delay. Switch staged scenes off under reduced motion and `.still` - 2026-10-06.
- Load cost hides in style and layout (`run-notes.md` 2026-10-07): animate an HTML wrapper, never an `<svg>`; no grid around a `container-type` box; no inherited custom property or `*`-read class toggled on big subtrees; no inline style per letter beyond a title. Find each with traces and CSS A/B - 2026-10-07.
- Offset a grid column with margins, not `translate` (a translated item covered the next row's buttons) - 2026-10-08.
- Never mute text with `opacity`: on a lit or animated fill it falls under 4.5:1, and the e2e axe pass sees one frame (the breaker's pink step); use weight or size - 2026-10-08.
- Posts drift with the code they explain: a feature change greps `content/blog` for its files and fixes the posts too (`post-check.mjs` flags gone files) - 2026-10-08.
- A % height inside an auto grid row resolves against the row the item itself grew (the Linkoglot phone overflowed its field): give the grid a definite track, `grid-template: minmax(0, 1fr) / minmax(0, 1fr)` - 2026-10-08.
- Reading a WebGL program's link status blocks until it compiles: one shader with ten scenes froze every browser for ~1 s on Windows (D3D). Keep programs small (one scene each), compile through `makeProgram` in `life-gl.ts` (`KHR_parallel_shader_compile`, polled per frame) and measure the longest frame gap cold - 2026-10-09.
- WebKit shows a WebGL frame drawn on demand one draw late (a pick showed the previous print): still and paused paths draw twice, on two frames in a row - 2026-10-09.
- A hover that changes the hovered box's size picks its target from rest geometry measured once, never from `:hover` on that box: the thinning title letters swapped back and forth under a resting pointer [user 2026-10-09]. An inline-block per letter holds the width but draws hairline seams where heavy letters touch - 2026-10-09.

### Privacy of inputs
- Images pasted in chat never reach the disk: ask the owner to drop the files in the repo, and build the slot so it switches on when they land - 2026-10-06.
- Research screenshots of third-party sites stay local (`research/inspirations/img/` is gitignored); the repo may go public - 2026-10-05.

### Tools and environment
- Splicing text by slices or offsets drops or misplaces content: replace named blocks, then `node --check` / build and render-check at once - 2026-10-05.
- Bash heredocs break on quotes and lose backslashes (again 2026-10-07, twice 2026-10-08), and `cd` persists: write scripts with Write, use absolute paths; Write/Edit decode `\uXXXX`, so emit invisible characters with `chr()` - 2026-10-05.
- Python on Windows writes CRLF: always `open(..., "w", newline="\n")` (a fixer pass caught 6 files on 2026-10-06) - 2026-10-05.
- Git Bash rewrites URL-path arguments (`/en/` → `P:/Git/en/`): prefix with `MSYS_NO_PATHCONV=1`, also for `bun run lhci` - 2026-10-05.
- Node on Windows reads a Git Bash path `/c/Users/...` as `C:\c\Users\...` (shots landed in a stray `C:\c`): give node scripts `C:/...` paths - 2026-10-09.
- `bun run check` stops at the first failing task: a red test hid a typecheck error that got committed. Read every task's result, re-run `astro check` after fixing a test - 2026-10-06.
- e2e role queries match substrings ("Pull-up" hit "Pull-ups"): pass `exact: true` for short names - 2026-10-06.
- Stop a server by its port's PID (`netstat -ano | grep :<port>` → `taskkill //F //PID`), never by image name: `taskkill /IM python.exe` ends every Python on the machine, other sessions' too - 2026-10-08.
- A git worktree under the long temp path builds pages with no CSS ("Filename too long") and won't delete: put A/B worktrees at a short path (`C:/Users/<you>/wtb`), remove them with `git worktree remove` - 2026-10-08.
- Headless Chromium draws WebGL with SwiftShader (software): shaders starve the page and states look broken. Shoot and QA shaders with `--use-angle=d3d11 --enable-gpu --ignore-gpu-blocklist` - 2026-10-08.
- One `astro preview` per project, and a running one may serve another session's `--outDir` (a whole audit ran on a peer's build, 2026-10-08): build to your own `--outDir`, serve it on your own port (`E2E_PORT`, `lhci --base`). A busy machine fakes regressions: check the load, rerun - 2026-10-07.
- After a Playwright update, run `./node_modules/.bin/playwright install chromium` in `apps/web` (browser version mismatch) - 2026-10-06.
- The owner works on two PCs and runs parallel sessions (one committed another's WIP, 2026-10-07): `git pull`/`git log` first, stage your own paths only; on a merge take one side's `.po`, re-add the other's msgids, extract; regenerate PDFs - 2026-10-06.
- Playwright WebKit on Windows is not Safari: half of its WebKit-only findings were artifacts (fonts at the default instance, AV1 that fails to decode, the screenshot style tripping the CSP, a double font fetch under `astro preview`). Check against the live site first (`visual-qa.md` § Gotchas) - 2026-10-09.
- WebSearch has a budget shared by parallel agents; prefer WebFetch of known URLs, then Playwright - 2026-10-05.
