# Usage: the visual QA + gates loop

> How step 3 "Evaluate" of every slice runs (`working-agreement.md` § 9). The score rubric: `design-quality.md`.
> Measured timings: `memory/run-notes.md`. Every command runs from `apps/web` against a fresh `bun run build`.

## The gates (machine)

| Gate | Command | Fails on |
| --- | --- | --- |
| static | `bun run typecheck && bun run lint && bun run test` | type errors, lint, unit tests (routes, field tokens defined + AA, catalogs, typography) |
| browser | `bun run e2e` | axe WCAG 2.2 AA on every route (one theme, Cobalt), skip link, overflow 320–2560, 1920 cap, header fit per control, menu, footer, focus not under the header, motion (pause, reduced, fitted name flush), head/hreflang/switcher, console + CSP errors, page flows (the CV button's download + `/cv/` confirmation, contact, credentials, work filters) |
| Lighthouse | `MSYS_NO_PATHCONV=1 node scripts/lighthouse.mjs --runs 3 --desktop /en/ /pl/ /es/` | mobile perf < 95, a11y/bp/seo < 100, LCP > 2000 ms, CLS > 0.05, TBT > 100 ms |
| launch | part of `bun run build` | a launch build with any `PLACEHOLDER` marker or a noindex home |

- Add every new route to `e2e/routes.ts` the moment it exists, so the sweeps cover it.
- Never weaken a gate to pass; fix the page.

## The eyes (screenshots)

1. `MSYS_NO_PATHCONV=1 node scripts/shots.mjs --paths /en/,/pl/,/es/ --widths 390,1024,1920,2560 --full`
   (one theme, Cobalt: there is no `--themes` flag any more; `--settle` waits for entrances; `--reduced` for the reduced-motion pass). Scratch PNGs land in `screenshots/.work/<route>/<width>-cobalt.png`.
2. Read each shot. Look for: overflow, text under fixed chrome, unreadable text over media, Polish line breaks (pl runs longest),
   orphans, ultrawide emptiness, generic look. Score the view with `design-quality.md` and name the weakest point.
3. Fix the weakest point, rebuild, re-shoot. Repeat until ≥ 8 and one more pass finds nothing worth fixing.
4. `--accept` saves the 1920 + 390 webp proof to `screenshots/<route>/`; add a row to `screenshots/VISUAL-QA.md`.
5. Record the slice's cost (JS KB, HTML gz, LCP/CLS delta) in `memory/slice-costs.md`.

## Gotchas

- Git Bash rewrites `/en/` into `P:/Git/en/`: prefix commands that take URL paths with `MSYS_NO_PATHCONV=1`.
- One `astro preview` per project (port 4322): the scripts reuse a running one; stop it before a rebuild only if files are locked.
- The 0.01 ms reduced-motion transition means a colour read right after a change is the old value: poll in tests.
- WebGL in headless Chromium needs `chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] })`,
  or shader canvases stay on their fallback. To shoot a shader transition frame by frame, `page.clock.pauseAt(...)` and
  then short `page.clock.runFor(130)` steps; `clock.install()` + one long `runFor` renders every frame and times out
  (2026-10-07, the My life prints).
