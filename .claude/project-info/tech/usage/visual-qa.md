# Usage: the visual QA + gates loop

> How step 3 "Evaluate" of every slice runs (`working-agreement.md` § 9). The score rubric: `design-quality.md`.
> Measured timings: `memory/run-notes.md`. Every command runs from `apps/web` against a fresh `bun run build`.

## The gates (machine)

| Gate | Command | Fails on |
| --- | --- | --- |
| static | `bun run typecheck && bun run lint && bun run test` | type errors, lint, unit tests (routes, field tokens defined + AA, catalogs, typography, scroll-driven animations written in longhands) |
| browser | `bun run e2e` | axe WCAG 2.2 AA on every route (one theme, Cobalt), skip link, overflow 320–2560, 1920 cap, header fit per control, menu, footer, focus not under the header, motion (pause, reduced, fitted name flush), head/hreflang/switcher, console + CSP errors, page flows (the CV button's download + `/cv/` confirmation, contact, credentials, work filters) |
| cross-browser | `bun run e2e:xb` | Firefox: the browser gate's functional specs + axe + text fit; WebKit (Safari's engine): the functional specs + layout. Not WebKit text fit: its Windows build paints variable fonts at the default instance (§ Gotchas). The 404 routes run in all three |
| Lighthouse | `MSYS_NO_PATHCONV=1 node scripts/lighthouse.mjs --runs 3 --desktop /en/ /pl/ /es/` | mobile perf < 95, a11y/bp/seo < 100, LCP > 2000 ms, CLS > 0.05, TBT > 100 ms |
| text fit | `bun run e2e text-fit` (part of `bun run e2e`) | in any locale, at any gate width, in the first paint and in every switchable state (menu, How I work stops, AI beats, credentials, contact topics, hobby prints, case-study tabs): text spilling out of the box that draws it, clipped text, text past the screen edge, a word split across lines, text on text, a box drawn over text (§ Locales) |
| launch | part of `bun run build` | a launch build with any `PLACEHOLDER` marker or a noindex home |

- Add every new route to `e2e/routes.ts` the moment it exists, so the sweeps cover it.
- Never weaken a gate to pass; fix the page.

## The eyes (screenshots)

1. `MSYS_NO_PATHCONV=1 node scripts/shots.mjs --paths /en/,/pl/,/es/ --widths 390,1024,1920,2560 --full`
   (one theme, Cobalt: there is no `--themes` flag any more; `--settle` waits for entrances; `--reduced` for the reduced-motion pass). Scratch PNGs land in `screenshots/.work/<route>/<width>-cobalt.png`.
2. Read each shot. Look for: overflow, text under fixed chrome, unreadable text over media, Polish line breaks (pl runs longest),
   orphans, ultrawide emptiness, generic look. Score the view with `design-quality.md` and name the weakest point.
3. Fix the weakest point, rebuild, re-shoot. Repeat until ≥ 8 and one more pass finds nothing worth fixing.
4. `--accept` saves the 1920 + 390 webp proof to `screenshots/<route>/` and you add a row to `screenshots/VISUAL-QA.md`.
   The proof is for you and stays local: `screenshots/` is gitignored except that log [owner 2026-10-08: "lets only use the
   assets we need and rest is just for you ... or gitignored"]. Only pictures the site or a post ships are committed.
5. Record the slice's cost (JS KB, HTML gz, LCP/CLS delta) in `memory/slice-costs.md`.

## Locales: every section, every time [user 2026-10-08]

Building or editing a section is not done until it is checked in **en, pl and es at phone, laptop and desktop**. The
owner found "Wypuściłem też" spilling out of a label sized for "Also shipped" at 1440; the audit that followed found the
same class of bug in a dozen places (date tags over text at 320, a flash card word past its card, a footer arrow
parked away from its label, a Spanish footer row breaking into a ragged block).

1. **Machine, always:** `bun run e2e text-fit` on a fresh build. While iterating on one section, narrow it:
   `TEXT_FIT_WIDTHS=390,1440 bunx playwright test text-fit -g "/pl/"`. The probe (`e2e/text-fit.ts`) knows the
   site's tricks: tilted boxes are measured untransformed, sticky chapters and the header are separate layers, an
   ellipsis name counts only what shows. Opt out per element with a reason: `data-textfit="skip"` (decorative or
   scrolling text) or `data-textfit="stack"` (layers that cover each other on purpose, the My life photo deck).
   `TEXT_FIT_REPORT=<file>` writes every hit as JSON lines instead of failing (an audit).
2. **Eyes, for what the probe can't judge:** shoot the changed section with `--paths /en/,/pl/,/es/` at 390, 1440 and
   1920 and compare the locales side by side: a label or button on two lines in one locale only, a lonely word, uneven
   rows or card heights, a fitted title much smaller in one locale, accents touching the line above, a drawing pushed
   out of its frame by a longer label, untranslated words. Switchable scenes: shoot every state under reduced motion
   (the finished picture); with motion on, a 2 s shot catches staged scenes half drawn.
3. **Size for the longest locale:** stickers, tags, buttons, tickets and drawn labels never get a width tuned to the
   English word (`max-width: 6.5em` held "Also shipped", not "Wypuściłem"). Hug the content (`width: min-content`,
   `max-content`), let a pair wrap (`flex-wrap` with a basis), or shrink the type; a no-wrap tag beside a `1fr`
   column needs a wrap fallback.
4. **Typography is automatic:** every page passes through `typoHtml` (middleware): one-letter words, number + unit,
   `·` and `§` never end or start a line. Don't fight it with manual spaces; a string that still breaks badly is a
   layout problem.

## Gotchas

- Git Bash rewrites `/en/` into `P:/Git/en/`: prefix commands that take URL paths with `MSYS_NO_PATHCONV=1`.
- One `astro preview` per project (port 4322): the scripts reuse a running one; stop it before a rebuild only if files are locked.
- The 0.01 ms reduced-motion transition means a colour read right after a change is the old value: poll in tests.
- Playwright WebKit on Windows is Safari's engine, not Safari (2026-10-06, 2026-10-09). Its artifacts, none of them a
  site bug: variable fonts painted at the default instance (judge Safari by measured widths, never by those shots);
  `canPlayType` says yes to AV1, then the file fails to decode (real Safari only claims AV1 with a hardware decoder);
  every `page.screenshot()` logs "Refused to apply a stylesheet" (Playwright's injected style meets the page's meta CSP);
  `requestAnimationFrame` at ~13 fps headless; Tab skips links (Safari's default); and under `astro preview`
  (`Cache-Control: no-cache`) the preloaded font is fetched twice, once on Vercel. Check a WebKit-only finding against
  the live site before fixing it. What only a real iPhone or Mac shows: Apple font rendering, Metal shader compile
  times, Low Power Mode autoplay, the iOS download sheet.
- Full-page screenshots at device scale 2 go solid black past 16,384 device px (8,192 CSS px): shoot long pages at
  scale 1 or block by block (2026-10-08).
- Another session may already run `astro preview` (one per project): it can be serving its own `--outDir`, not your
  `dist/`. Build to your own `--outDir` and serve it on your own port (a plain static server) (2026-10-08).
- WebGL in headless Chromium needs `chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] })`,
  or shader canvases stay on their fallback. To shoot a shader transition frame by frame, `page.clock.pauseAt(...)` and
  then short `page.clock.runFor(130)` steps; `clock.install()` + one long `runFor` renders every frame and times out
  (2026-10-07, the My life prints).
