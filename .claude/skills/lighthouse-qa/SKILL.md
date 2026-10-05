---
name: lighthouse-qa
description: "Late-phase performance/SEO/accessibility/best-practices QA. Runs Lighthouse against the built site and fixes issues in a loop until scores are strong (or plateaued high-enough + documented). Use in Phase 3 AFTER every section, the visual QA loop, analytics/consent, and the privacy policy exist. Triggers: 'lighthouse', 'pagespeed', 'core web vitals', 'improve performance/SEO score', 'accessibility audit'."
argument-hint: "[optional: routes to focus, e.g. / /pl/offers]"
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
  - mcp__lighthouse
---

# /lighthouse-qa

Audit the built `apps/nextjs-landing-page` with **Lighthouse** (the engine behind
Google PageSpeed Insights) and fix issues in a loop until the site is genuinely
performant, accessible, best-practice, and SEO-friendly. This is the objective
counterpart to the visual QA loop: that one judges how the site *looks*; this one
measures how it *scores*.

## When to run (late phase only)

Run near the END of Phase 3, after: every section is built, the visual QA
screenshot loop passed, analytics + consent are wired, and the privacy policy
exists. Lighthouse scores a finished page — running it on a half-built site wastes
audits. Re-run whenever a later change could move a score (new heavy media, a new
route, a font swap, an embed).

## Lighthouse vs PageSpeed Insights

Same audit engine. **PageSpeed Insights** is Google's hosted service that runs
Lighthouse against a **public URL** and adds real-user CrUX field data — it cannot
reach the site while it is still in-container. **Lighthouse-local** audits the
locally-served production build, so it is what we use during the build. (A public
PSI check is a fine post-deploy sanity check once the Vercel URL is live, but it is
not part of this loop.)

## How the audit runs (launch mode — important)

The deterministic runner is `.agents/quality/lighthouse-audit.mjs`. It:

1. **Builds** a **production** bundle in launch mode (`IS_FULL_PRODUCTION=true`) —
   never audits `bun run dev`; dev-mode perf numbers are meaningless. The flag is
   read at BUILD time (it bakes `robots.txt` + metadata), so a build is what flips
   SEO to launch state, not just the serve.
2. Serves that build on its own port with the same flag, so the SEO category is
   measured **as it will be at go-live (indexable)**. This does NOT change the
   deployed site — the real deploy stays `noindex` until a human flips
   `IS_FULL_PRODUCTION` in Vercel (the launch-safety gate; see
   `packages/shared/src/lib/constants.ts` + `usage/vercel.md`). The local `.next` is
   throwaway (Vercel rebuilds from source), so we audit launch behavior without
   shipping it.
3. Runs Lighthouse for each route × device (mobile + desktop) and writes:
   - `screenshots/LIGHTHOUSE.md` — the human report (scores + outstanding audits),
   - `screenshots/.work/lighthouse-latest.json` + `…-history.json` — machine scores
     the finish gate reads for plateau detection.

Run it directly:

```bash
node .agents/quality/lighthouse-audit.mjs               # audits "/" (mobile + desktop)
LIGHTHOUSE_ROUTES="/,/pl/offers,/pl/privacy-policy" node .agents/quality/lighthouse-audit.mjs
```

While iterating, use the **`lighthouse` MCP** (`run_audit` with a `url` +
`categories` + `device`) to probe a single route/category quickly without a full
sweep — e.g. re-check just `seo` on one page after a metadata fix. The MCP is the
scalpel; the script is the source of truth the gate trusts. If the MCP is not
connected in this environment, use the script only — never block on the MCP.

## Scores: targets, floor, and the "good enough" rule

Drive toward these, but do not chase a flaky last point forever:

| Category | Target | Floor ("high enough") | Gates? | Notes |
| --- | --- | --- | --- | --- |
| SEO | 100 | 90 | **yes, vs target** | Near-deterministic — 100 is expected for a landing page. |
| Accessibility | 100 | 90 | **yes, vs target** | Near-deterministic — fix every real issue. |
| Best Practices | 100 | 90 | **yes, vs target** | Near-deterministic. |
| Performance | 90+ | 70 | only under 70, max 2 attempts | This container reads **~30 pts low**. See below. |

The rule (soft, enforced by the finish gate): **keep fixing while scores are
improving.** Once they **stop moving across attempts** and are **at/above the
floor**, the work is "evaluated" — record what is maxed and why, and move on. You
do not need a perfect 100 across the board; you need every real issue fixed and
every remaining gap either fixed or honestly documented as safe-to-skip. Don't
grind the same plateau; don't stop at a low score you haven't actually tried to fix.

### Performance: two structural passes, then stop

**This container underreports mobile performance by roughly 30 points.** Measured on
one commit, same day: `/pl` mobile perf **88 live vs 59 in-container**; desktop 100 vs
96. The container serves a cold `next start` re-encoding every image variant on first
request, under three MCP servers plus a headless Chrome, plus Lighthouse's 4x CPU
throttle. Vercel serves pre-optimised variants from the edge. The number also jitters
on its own — one run recorded `/pl` mobile at 64, then 80, then 59, with no relevant
code change in between.

So performance work here is **strictly structural**: a client component that should be
a server component, an unoptimised or unsized hero image, a blocking third-party
script, a payload a route never needed. Those are real wherever you measure them.
Everything past that — font-preload tuning, kilobyte shaving, re-auditing to see if
the number moved — is tuning the harness, and the finish gate no longer asks for it
(`LH_PERF_ROUNDS`). One run spent its **final hour and ~400k tokens of context** doing
exactly that on a site that was already finished, hit the context window, then died of
a full runner disk before it could publish.

After two real structural passes: write the remaining items under
`## Safe-to-skip` in `screenshots/LIGHTHOUSE.md` with the container-vs-live reason,
and finish. Accessibility is the opposite case — cheap, stable, and where it has
disagreed with live it was the container that was right. Trust it there.

## Fix playbook (root cause — never weaken a signal)

**SEO (aim 100).**
- Missing/short `<title>` or meta description on a route → add the title+description
  pair in `lib/metadata.ts` and wire `generateMetadata` via `localizedMetadata`
  (see `usage/seo.md`). Every indexable route needs one.
- "Document does not have a valid `hreflang`" / canonical → these ship from
  `localizedMetadata`; a failure means a route bypassed it. Route it through
  `localizedMetadata({ pathname })`.
- "Links are not crawlable" → a nav/CTA using `<div onClick>`/`<button>` for
  navigation instead of `<Link href>`. Use real anchors.
- "Image elements do not have `[alt]`" → every `next/image`/`<img>` needs meaningful
  `alt` (or `alt=""` if decorative) — mirrors `usage/seo.md`.
- "Page is blocked from indexing" should NOT appear in launch mode; if it does on a
  marketing route, a stray per-route `robots: { index: false }` leaked in — remove
  it. `/health` staying noindex is correct and is not audited.

**Accessibility (aim 100).**
- Contrast failures → this is the same pain `e2e/contrast.spec.ts` guards; fix the
  token/scrim, do not lower the requirement. See `usage/playwright.md` + `accessibility.md`.
- Missing form labels → associate every input with a `<label>`/`aria-label`
  (see `usage/react-hook-forms-zod.md`).
- Buttons/links without discernible name → icon-only controls need `aria-label`.
- Missing landmark/heading order, `<html lang>` → `<html lang={locale}>` ships from
  the root layout `app/[locale]/layout.tsx` (never an `app/layout.tsx` above it);
  keep one `<h1>` per page and a sane heading order.
- Touch targets too small (mobile) → ≥ 44×44px hit area on interactive elements.

**Best Practices (aim 100).**
- Console errors on load → fix the actual error (bad image `src`, hydration
  mismatch, failed fetch). A clean console is required.
- Images displayed with wrong aspect ratio → set correct `width`/`height` (or `fill`
  + sized container) so the intrinsic ratio matches.
- Missing/incorrect `viewport` / `theme-color` → shipped from the layout's
  `viewport` export; keep it.
- No mixed content / everything over HTTPS; no deprecated APIs.

**Performance (aim high; document the cap).** Full craft bar + budgets:
`project-info/performance.md`.

- **Diagnose LCP before fixing it.** Compare LCP against Speed Index and FCP:
  - *SI good (< 2.5s) but LCP bad* → the page painted fine and one element is late.
    **This is nearly always the hero being hidden until hydration**, not a slow image.
    Verify: `curl -s <url> | grep -o 'style="[^"]*opacity:0[^"]*"'`. Any hit that
    wraps above-the-fold content is the bug. The CSS form of the same bug is an
    `.enter*` / `.reveal` class on the LCP element itself (13 shipped sites, 64-89
    mobile); `e2e/lcp.spec.ts` names the element and what holds it. Fix = take the
    entrance OFF the LCP candidate (hero `h1`, lead, primary CTA, hero image) and give
    it to a secondary hero piece (`usage/motion.md` → Page-load choreography); never
    wrap the hero in `<motion.div initial={{ opacity: 0 }}>`, and never start the fade
    at a low opacity. Measured worth ~2.5s of LCP on real sites.
  - *FCP also bad* → server/TTFB, render-blocking CSS, or fonts.
  - *Only then* suspect the image.
- LCP image too slow → the largest above-the-fold image needs `priority` on
  `next/image`; give real `sizes`; do not lazy-load the hero. Prefer `next/image`
  (AVIF/WebP, responsive) over raw `<img>`; the config already enables AVIF.
- **TBT high → find what is in the client bundle, don't guess.** After a build,
  `bun run build` prints First Load JS per route; anything over ~200KB needs a look.
  Known offenders, in order: `@supabase/supabase-js` (~53KB — must be server-only,
  `lib/supabase.ts` enforces it), `zod` + `react-hook-form` (~35KB — `next/dynamic`
  the form), `motion` (~41KB — not needed at all for plain entrances).
- Font FOIT/CLS → load brand fonts via `next/font` with `display: "swap"` and
  `preload` (see `usage/nextjs.md`), never a render-blocking `@import`.
- Layout shift (CLS) → reserve space for images/embeds (width/height), avoid
  injecting content above existing content after load.
- Unused/oversized JS → keep sections server components (RSC) where possible; add
  `"use client"` only where needed; lazy-load below-the-fold heavy client widgets
  (`next/dynamic`). Don't ship an animation lib to a static section.
- Render-blocking / third parties → GA and embeds (except the contact-section Google
  Maps iframe - lazy, never gated; `consent-analytics.md` → "Third-party embeds") load only after consent
  (`project-info/consent-analytics.md`); that already keeps them off the critical path.
- Oversized media → compress/resize source images; upscale genuinely low-res ones
  with fal.ai Recraft rather than shipping huge files (see `images.md`).

## Safe-to-skip (accepted — document each in LIGHTHOUSE.md)

Some audits do not apply to a marketing landing page. When you skip one, add a line
under a `## Safe-to-skip (with reasons)` heading in `screenshots/LIGHTHOUSE.md`.
Legitimately skippable:

- **PWA / installability** — these sites are not installable web apps (we still ship
  a manifest + theme-color for metadata; we do not chase full PWA criteria).
- **Third-party cookie / GA flags in Best Practices** — GA's own cookies, only
  present after consent; not something the site controls. Same for cookies set
  inside the contact-section Google Maps iframe (the documented exception in
  `consent-analytics.md`) - never "fix" that flag by gating or removing the map.
- **CrUX "No field data"** — lab-only audit; there is no real-user data pre-launch.
- **A performance point or two lost to a deliberately media-rich hero** — only after
  the hero image/video is already optimized (right format, sized, `priority`), state
  the trade-off. Never use this to excuse an unoptimized asset.

Never "skip" a real SEO/accessibility failure — those get fixed.

## Definition of done

- [ ] `node .agents/quality/lighthouse-audit.mjs` ran against the real routes;
      `screenshots/LIGHTHOUSE.md` reflects the final scores.
- [ ] SEO, Accessibility, Best Practices at/above floor (aim 100); every real issue
      fixed at the root, not by weakening a spec/signal.
- [ ] Performance pushed as high as reasonable; if capped, the reason is recorded.
- [ ] Every outstanding audit is either fixed or listed under `## Safe-to-skip` with
      a one-line reason.
- [ ] `bun run check` still green after the fixes (perf work didn't regress the build).
- [ ] `.claude/project-info/log.md` gets one line:
      `## [YYYY-MM-DD] <init|edit> | Lighthouse QA (perf/a11y/bp/seo <scores>, <fixes>)`.
