---
name: lighthouse-qa
description: "Performance/SEO/accessibility/best-practices QA. Runs Lighthouse against the built site (scripts/lighthouse.mjs on the shared astro preview) and fixes issues in a loop until every page is within budget (or plateaued at/above the floor + documented). Use in every Phase 1 slice's evaluate step, whenever a change can move a score, and in a full sweep before launch. Triggers: 'lighthouse', 'pagespeed', 'core web vitals', 'improve performance/SEO score', 'accessibility audit'."
argument-hint: "[optional: routes to focus, e.g. /en/ /pl/]"
allowed-tools:
  - Read
  - Write
  - Edit
  - MultiEdit
  - Grep
  - Glob
  - Bash(node *)
  - Bash(bun *)
  - Bash(bunx *)
  - Bash(npx *)
---

# /lighthouse-qa

Audit the built site (`apps/web`, Astro static output in `dist/`) with **Lighthouse**
(the engine behind Google PageSpeed Insights) and fix issues in a loop until every
page is genuinely performant, accessible, best-practice, and SEO-friendly. This is
the objective counterpart to the visual QA loop (`tech/usage/visual-qa.md`): that
one judges how the site *looks*; this one measures how it *scores*.

## When to run

- **Every Phase 1 slice**, in its evaluate step (`working-agreement.md` § 9): the
  pages the slice touched, mobile ≥ 90 (aim 95+), within the `requirements.md`
  budgets, with the slice's own cost recorded.
- **Whenever a later change could move a score** (new heavy media, a new route, a
  font swap, an embed, a new island).
- **A full sweep of every route before launch.**

Running it on a page whose content is still missing wastes audits; running it
before the slice closes is the point.

## Lighthouse vs PageSpeed Insights

Same audit engine. **PageSpeed Insights** is Google's hosted service that runs
Lighthouse against a **public URL** and adds real-user CrUX field data.
**Lighthouse-local** audits the locally served production build, so it is what we
use while building. (A PSI check on the deployed Vercel URL is a fine post-deploy sanity check
once it is live — review deploys are noindex, so its SEO reads lower there — but it
is not part of this loop.)

## How the audit runs

The source of truth is `apps/web/scripts/lighthouse.mjs` (also `bun run lhci`). It:

1. **Audits the built site, never `bun run dev`** — dev-mode numbers are
   meaningless. It does not build: run a fresh `bun run build` first whenever the
   code changed.
2. **Uses the shared preview on port 4322.** Astro 7 allows only ONE `astro preview`
   per project, so e2e, shots and Lighthouse share it: the script reuses a running
   preview, or starts one and stops it afterwards (`--base <url>` points it elsewhere).
3. **Scores SEO without `is-crawlable`.** Review builds are noindex on purpose
   (`scripts/launch.mjs`); the launch gate (`scripts/launch-gate.mjs`, part of
   `bun run build`) checks the launch robots instead. Never flip a review build to
   indexable to make the number move.
4. Runs mobile (simulated throttling) `--runs` times per page (default 3) and takes
   the **median**; with `--desktop`, one desktop run per page as well. Pages default
   to `/en/ /pl/ /es/`.
5. Prints a table (perf, a11y, bp, seo, FCP, LCP, CLS, TBT, KB), writes
   `apps/web/lighthouse/summary.json` (gitignored), and **exits 1 on any budget miss**,
   listing each one.

Run it from `apps/web`:

```bash
bun run build
MSYS_NO_PATHCONV=1 node scripts/lighthouse.mjs                       # /en/ /pl/ /es/, mobile median of 3
MSYS_NO_PATHCONV=1 node scripts/lighthouse.mjs --runs 3 --desktop /en/ /pl/
```

(On Windows Git Bash the `MSYS_NO_PATHCONV=1` prefix stops `/en/` being rewritten
into a Windows path.)

For a **single-route deep audit** (the full report, one category, the audit details
the summary leaves out), run the `lighthouse` CLI (an `apps/web` devDependency)
against the running preview:

```bash
bunx lighthouse http://localhost:4322/en/ --only-categories=performance --skip-audits=is-crawlable \
  --chrome-flags="--headless=new" --output=json --output-path=lighthouse/en-perf.json
```

(The `lighthouse/` folder exists after one script run.) If it cannot find Chrome,
set `CHROME_PATH` to Playwright's Chromium (what the script does). The CLI is the scalpel; the script is the source of truth the budgets
are checked against.

## Scores: targets, floor, and the "good enough" rule

Drive toward the targets (the script's budgets); never ship below the floor:

| Metric (mobile median) | Target (script budget) | Floor | Notes |
| --- | --- | --- | --- |
| Performance | 95 | 90 (`CLAUDE.md` invariant, `requirements.md`) | The only score allowed to plateau between floor and target. |
| Accessibility | 100 | 100 | Near-deterministic — fix every real issue. |
| Best Practices | 100 | 100 | Near-deterministic. |
| SEO | 100 | 100 | Without `is-crawlable` (see above). |
| LCP | ≤ 2000 ms | ≤ 2500 ms (`requirements.md`) | The H1 is the LCP element. |
| CLS | ≤ 0.05 | ≤ 0.05 | |
| TBT | ≤ 100 ms | ≤ 200 ms (`requirements.md`) | |

The rule: **keep fixing while the numbers are improving.** Once performance **stops
moving across attempts** and sits **at/above the floor**, the work is "evaluated" —
record what is left and why, and move on. Accessibility, Best Practices and SEO have
no plateau: anything under 100 is a real issue to fix. Don't grind the same plateau;
don't stop at a low score you haven't actually tried to fix.

### Performance: two structural passes, then stop

Lab numbers jitter between runs on the same commit; that is why the script takes the
median of `--runs 3`. Compare against the measured baseline in
`.claude/project-info/memory/run-notes.md` and the per-slice costs in
`memory/slice-costs.md`, never against one run.

So performance work here is **strictly structural**: an island that should be static
HTML, a `client:load` that should be `client:visible` / `client:idle`, the 3D chunk on
the LCP path, an unsized or unoptimised image, a font not subset, a blocking script,
a payload a route never needed. Those are real wherever you measure them. Everything
past that — kilobyte shaving, re-auditing to see if the number moved — is tuning the
harness.

After two real structural passes: record the remaining gap with its reason (see
Safe-to-skip) and finish. Accessibility is the opposite case — cheap and stable;
trust it.

## Fix playbook (root cause — never weaken a signal)

**SEO (aim 100).**
- Missing/short `<title>` or meta description → every page passes `title` +
  `description` (through Lingui) to `BaseLayout.astro`; rules in `site/seo.md`
  § Metadata rules. Every indexable route needs both.
- Invalid `hreflang` / canonical → both come from the one path builder
  (`alternates` / `pathTo` in `src/lib/routes.ts`, `site/i18n.md`); a failure means a
  page bypassed `BaseLayout` or passed the wrong `path`. Route it through them.
- "Links are not crawlable" → navigation done with a `<button>` or a click handler
  instead of a real `<a href>` built with `pathTo`. Use real anchors.
- "Image elements do not have `[alt]`" → every `<img>` / `<Image>` needs meaningful
  `alt` (or `alt=""` if decorative).
- "Page is blocked from indexing" is expected on review builds and is skipped by the
  script; on a launch build it must not appear except on noindex,follow legal pages
  (`seo.md`).

**Accessibility (aim 100).**
- Contrast failures → the same thing `e2e/a11y.spec.ts` (axe WCAG 2.2 AA, light AND
  dark) guards; fix the token in `src/styles/global.css` (the tokens unit test checks
  AA + light/dark parity) or add a scrim; never lower the requirement.
- Missing form labels → associate every input with a visible `<label>` (label
  above, `design-quality.md` § Universal craft rules).
- Buttons/links without a discernible name → icon-only controls need `aria-label`
  (through Lingui).
- `<html lang>`, landmarks, heading order → `lang` ships from `BaseLayout.astro` per
  locale; keep one `<h1>` per page and a sane heading order.
- Touch targets → ≥ 24 × 24 px and ≥ 8 px apart, aim 44 × 44 on primary touch
  controls (`design-quality.md` § Accessibility floor).

**Best Practices (aim 100).**
- Console errors on load → fix the actual error (bad asset URL, a script error, a
  CSP violation from a new inline script). A clean console is required, and
  `e2e/i18n.spec.ts` fails on console + CSP errors too.
- Images displayed with the wrong aspect ratio → set correct `width` / `height`
  (or use `astro:assets` `<Image>` / `<Picture>`) so the intrinsic ratio matches.
- No mixed content, everything over HTTPS, no deprecated APIs.

**Performance (aim 95; document the cap).** Budgets: `requirements.md`
§ Non-functional (initial JS ≤ 150 KB gz, fonts ≤ 100 KB, initial page ≤ 1 MB, 3D
chunk ≤ ~300 KB gz).

- **Diagnose LCP before fixing it.** The H1 is the LCP (`CLAUDE.md` invariant).
  Compare LCP against Speed Index and FCP:
  - *SI good but LCP bad* → the page painted fine and one element is late. **This is
    nearly always the H1 / hero hidden by an entrance animation** (opacity 0 or
    off-screen until a script or a delayed CSS animation runs), not a slow image.
    Verify on the built HTML: `curl -s http://localhost:4322/en/ | grep -o
    'style="[^"]*opacity:0[^"]*"'`, and check the CSS of the H1 for an entrance
    class. Fix = take the entrance OFF the LCP candidate (H1, lead, primary CTA) and
    give it to a secondary piece (`design/design.md` § Motion); never start the H1
    at a low opacity.
  - *FCP also bad* → render-blocking CSS or fonts.
  - *Only then* suspect an image.
- An above-the-fold image → `astro:assets` `<Image>` / `<Picture>` with real
  `widths` / `sizes`, `loading="eager"` + `fetchpriority="high"`; never lazy-load it.
  Everything below the fold stays lazy.
- **TBT high → find what is in the client bundle, don't guess.** After a build, the
  client chunks are in `dist/_astro/*.js`; check their gzip sizes. Usual offenders:
  an island that needs no interaction (make it static), a `client:load` that should
  be `client:visible` / `client:idle` / `client:media` (`tech/conventions.md`), the
  WebGL chunk loading before LCP (it must load after LCP, with a poster fallback,
  F20), a muted video loop starting during load (start loops on visibility + first
  interaction, `lessons.md`).
- Fonts → self-hosted subset woff2 in `public/fonts/` (generated by `bun run fonts`
  into `src/styles/fonts.css`), preloaded from `BaseLayout.astro`; never a
  render-blocking `@import` or a third-party font CDN.
- Layout shift (CLS) → reserve space for images/embeds (`width` / `height`), avoid
  injecting content above existing content after load, keep the font fallback metrics.
- Third parties → Umami loads `defer` after content, never on the LCP path
  (`site/analytics.md`). Any new script needs `compliance-and-data.md` + the privacy
  policy updated first (`tech/conventions.md` § Do NOT).
- Oversized media → compress/resize source images; encode video per
  `tech/technologies.md` instead of shipping raw captures.

## Safe-to-skip (accepted — record each one)

Some audits do not apply or cannot be fixed in the lab. Record each accepted skip
with a one-line reason under a `## Safe-to-skip` heading in
`.claude/project-info/memory/slice-costs.md` (create the file if missing).
Legitimately skippable:

- **`is-crawlable` on a review build** — skipped by the script on purpose; the
  launch gate checks the launch robots.
- **CrUX "No field data"** — lab-only audit; there is no real-user data pre-launch.
- **A performance point or two lost to the signature moment** — only after the 3D /
  video already loads after LCP, lazily, with a static poster and reduced-motion
  fallback, and stays within its chunk budget. Never use this to excuse an
  unoptimised asset.

Never "skip" a real SEO/accessibility/best-practices failure — those get fixed.

## Definition of done

- [ ] A fresh `bun run build`, then `node scripts/lighthouse.mjs` (from `apps/web`)
      ran against the real routes in every locale they exist in;
      `apps/web/lighthouse/summary.json` holds the final numbers.
- [ ] Accessibility, Best Practices and SEO at 100; every real issue fixed at the
      root, not by weakening a spec/signal.
- [ ] Performance within budget (≥ 95), or plateaued at/above the 90 floor with the
      reason recorded; LCP / CLS / TBT at least within the `requirements.md` floor.
- [ ] Every outstanding audit is either fixed or listed under `## Safe-to-skip` with
      a one-line reason.
- [ ] The slice's measured cost (JS KB, LCP/CLS delta, final mobile scores) is in
      `memory/slice-costs.md`.
- [ ] `bun run check` and `bun run e2e` still green after the fixes (perf work
      didn't regress the build).
- [ ] `.claude/project-info/log.md` gets one line:
      `## [YYYY-MM-DD] <area> | Lighthouse QA (perf/a11y/bp/seo <scores>, <fixes>)`.
