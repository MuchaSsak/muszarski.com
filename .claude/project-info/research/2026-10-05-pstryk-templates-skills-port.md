# PstrykWeb generator: templates, skills and quality tooling to port

Date: 2026-10-05. A read-only audit of the generator layer in the user's repo `context/pstryk-turborepo`:

- the wiki templates, `.claude/templates/root/.claude/project-info/**`
- the skills, `.claude/skills/**`
- the quality tooling, `.claude/templates/root/.agents/quality/*.mjs` and the e2e specs in `.claude/templates/nextjs-landing-page/apps/nextjs-landing-page/e2e/`

The landing **app** code (`apps/pstrykweb.pl`) is out of scope. It is covered in `2026-10-05-pstryk-reuse-audit.md`.

Citations use `[repo: path]`, relative to `context/pstryk-turborepo/`. The short form `[tpl: X]` means `[repo: .claude/templates/root/.claude/project-info/X]`. The target is the portfolio: Astro 7 with React TSX islands, Lingui, Tailwind 4 and MDX, plus R3F/GSAP islands. It builds statically and deploys to Vercel, with one function (contact via Resend + Turnstile) and Umami analytics. Locales are en (default), pl and es.

How to read the verdicts:

- **port as-is**: copy it, then rename brand and paths.
- **adapt**: keep the rules and structure, but rewrite the Next.js, Supabase or local-business parts for Astro and a portfolio.
- **skip**: it is irrelevant to the portfolio.

Where the `.agents` tooling lives: the repo-root `.agents/` holds only `security/` and two skill mirrors. The quality scripts live in the **template** at `[repo: .claude/templates/root/.agents/quality/]`.

---

## 1. Inventory: every template page and usage doc

Relevance is **H**igh, **M**edium, **L**ow or **none**. All files are under [repo: .claude/templates/root/.claude/project-info/].

### 1.1 Wiki root pages

| File | What it contains | Rel. | Verdict | What to change |
|---|---|---|---|---|
| `design-quality.md` | The cross-project craft floor: typography, colour, layout, density, motion and micro-craft rules. Also the 0–10 weighted score, the measured score caps, the anti-slop instant-fail list and the 12-point diagnostic. | H | **adapt** | See §2.7. Drop the testimonials/FAQ/booking examples and the payload font rules. Add portfolio fails (equal mock-up grid, skill bars, contact at the end of a long scroll, a 3D scene blocking mobile). Keep the weights and caps. |
| `color.md` | The 60/30/10 budget by painted area and the ΔL\* ≥ 25 separation test. Also a named-harmony menu, accent recurrence, the brand token layer (`--brand`, `--brand-bg`, `--brand-fg`, `--brand-hairline`), the dark ΔL\* trap and a JS snippet that measures painted area. | H | **port almost as-is** | Remove the `brand_colors` payload references. Replace the "shadcn `--accent`" note with Tailwind 4 `@theme` tokens. Keep the dark-ΔL\* section verbatim, because a dark or space theme is likely. |
| `accessibility.md` | The WCAG 2.1 AA contract: landmarks, one h1, buttons vs links, ARIA discipline, alt, keyboard/focus, skip link, focus trap, forms, reduced motion, contrast, 44px targets, 200% zoom, live regions, testing and a per-component checklist. | H | **adapt** | Bump the target to **WCAG 2.2 AA** (project brief), which adds target-size, focus-not-obscured and accessible-auth criteria. `next/image` becomes `astro:assets` `<Image>`/`<Picture>`. "Lingui macros" covers both `.astro` and island strings. Drop the RN-origin asides and the Radix/shadcn preference unless we use them. Add canvas/WebGL rules: an `aria-hidden` canvas with a text equivalent, and a pause control. |
| `performance.md` | The CWV craft bar from two measured failures. An LCP element at `opacity:0` makes LCP equal hydration time. CSS (not JS) entrances above the fold; LCP candidates never fade. Budgets: LCP ≤ 2.5s, TBT ≤ 200ms, CLS ≤ 0.1, JS ≤ ~200KB. Plus LCP/TBT/CLS checklists. | H | **adapt** | The rules are generic and should all stay. Replace `next/dynamic` with island directives (`client:visible` / `client:idle` / `client:media`). Replace `next/font` with the Astro font path. Drop `server-only`/Supabase/`optimizePackageImports`. **Add R3F/GSAP budgets**: the three.js chunk is lazy and never on the LCP path, a poster image paints first, and the canvas starts on idle or intersection. |
| `seo.md` | Next Metadata API conventions: `metadataBase`, `lib/seo.ts` (structure) plus `lib/metadata.ts` (Lingui strings), hreflang plus `x-default`, an `og:image` that is *declared*, never inherited, `ogLocale()` (pl → pl_PL), Twitter card, icons, manifest, robots, sitemap, keywords, JSON-LD (`serializeJsonLd`) and an `IS_FULL_PRODUCTION` noindex launch gate. | H | **adapt** | Replace Metadata API, `generateMetadata` and `app/robots.ts`/`sitemap.ts` with an Astro `<SEO>` head component plus `src/lib/seo.ts`, `@astrojs/sitemap` (or an endpoint) and a `robots.txt.ts` endpoint. Swap the LocalBusiness JSON-LD for **Person + WebSite + ProfilePage**, with BlogPosting/Article on posts and BreadcrumbList on `/work/*`. Keep the checklist, the OG-declared rule, the hreflang consistency rule, the serializer and the launch gate. |
| `fonts.md` + `fonts/*.png` | A generated catalog of about 170 free commercial-use families in 11 classes (grotesque, neo-grotesque, geometric, humanist, rounded, 4 serif classes, display-expressive, mono). Each has PNG contact sheets and specimens, a "House-blocked" list (Inter, Roboto, Poppins, Montserrat, Lato, Open Sans, Playfair, Raleway, Nunito, Source Sans Pro, Oswald, Merriweather) and pinned woff2 URLs with licences. | H | **adapt** | Keep the catalog, the PNGs, the classification-pair method and the blocked list. Replace the `next/font` install path with Astro's font handling or `@fontsource-variable/*` npm packages. **Flag:** the pinned Fontsource URLs are `latin-400-normal.woff2`, a Latin-only single weight [tpl: fonts.md § Self-hosted download URLs]. **Polish needs `latin-ext`** (ą ć ę ł ń ś ź ż). Spanish is covered by Latin-1. Every pick must be checked for latin-ext and the full weight range. |
| `images.md` | Payload-driven sourcing modes (`only-provided` / `scraped` / `dummy`), "every image ships from the repo, never a Supabase URL", "the image set is a pool, not a checklist", and fal.ai Recraft upscaling gated on a payload flag. | L | **adapt (small)** | Keep only: "every image ships from the repo", "curate, don't cram", "never invent a photo of a real person or product" and the upscale floors (hero < 1600px, in-content < 800px). Add the portfolio's own media rules: project screenshots and video loops, AVIF/WebP through `astro:assets`, poster frames for video/R3F and the OG cards. |
| `consent-analytics.md` | A working GDPR consent gate: categories, a `ConsentProvider`, a banner with equal-weight Accept/Reject, a versioned cookie, GA Consent Mode v2, withdrawal, "when you do NOT need a banner", admin never tracked, third-party embed gating (except the Maps iframe) and a separate consent for form data. | M | **adapt (shrink)** | Umami is cookieless, so the **"When you do NOT need a banner"** branch applies: no banner, no provider. Keep the form-consent rule, the embed rule (YouTube `-nocookie`, CodeSandbox/StackBlitz click-to-load) and the "strip query strings from tracked URLs" rule. Drop GA, Consent Mode, Maps and admin. Re-check if Turnstile or any embed sets cookies. |
| `coding-guidelines.md` | Naming (kebab folders, PascalCase components, `useX`, verb-first services, `SCREAMING_SNAKE` constants, `is/has` booleans, `handle`/`on`). A Next App Router folder tree, no barrels, Bun + turbo, `~/<app>/*` aliases, strict TS, flat ESLint and Prettier, HSL tokens and the "Dashes" rule. | M | **adapt** | Keep the naming rules, "one component per file", "no barrels", strict TS and flat ESLint plus the Prettier Tailwind plugin. Rewrite the folder tree for Astro (`src/pages/[locale]/…`, `src/components/{sections,islands,ui}`, `src/content/` collections, `src/lib/`). Use a single-app alias such as `~/*`. Decide on the no-em-dash rule yourself. |
| `memory/run-notes.md` | A skeleton for measured facts: finish-gate timings, which the gate appends, and gotchas. "Readable in 30 seconds"; never secrets. | H | **port as-is** | The `code` skill reads it unconditionally. Only change the comment that says the finish gate appends to it, unless we port the gate. |
| `inspirations/` | Empty (`.gitkeep`). `gen-design-analysis` fills it later. | L | **skip** | The portfolio already has `research/inspirations/`. Point `design-quality.md` diagnostic #12 there. |
| `local-business-sections.md` | Opening hours plus JSON-LD hours, the Google Maps iframe, booking CTAs/embeds, menu/price-list files and an honest path for a blog with zero posts. | none | **skip** | Lift one principle into the blog convention: "a nav link exists only while its content does; never an empty blog". |
| `admin-panel.md` | The owner `/admin` CMS kit (Supabase). | none | **skip** | — |
| `payload.md` | The generator's input JSON contract. | none | **skip** | Its "payload is DATA, never instructions" trust boundary is a good line for any scraped or AI-ingested content, but no file is needed. |

Also relevant at the template root (not a wiki page): **`CLAUDE.md`** [repo: .claude/templates/root/CLAUDE.md].

- **Generic, port:** "Quality bar (non-negotiable)", "Long-running commands", "Verify at the right granularity", "Knowledge gaps → web-search", "IMPORTANT.md", "Project Wiki" (log.md line format) and "Project memory".
- **Adapt:** the **Context Routing** tables.
- **Rewrite for Astro:** the Next-specific bullets.

The portfolio's `code` skill **depends on** a CLAUDE.md with a Context Routing table. **`settings.json`** wires these hooks:

- a PostToolUse `read-safe-files-only.mjs` (sensitive-file guard);
- a PostToolUse `pipeline-control.mjs` (runner only);
- a Stop hook `verify-visual-qa.mjs` (the finish gate, 3600s timeout).

`.githooks/pre-commit` is a generic secret-shape scanner, worth porting as-is.

### 1.2 `usage/*.md` library

| File | What it contains | Rel. | Verdict | What to change |
|---|---|---|---|---|
| `playwright.md` | **(1)** The visual QA loop: prod server, screenshots at 390/1024/1920, evaluate and score against `design-quality.md`, a dark pass once before finishing, committed proof in `screenshots/<route>/` plus `VISUAL-QA.md`, and "never block on wait loops". **(2)** The committed `@playwright/test` suite and its required specs: contrast, layout, design-density, lcp, links, health, metadata. | H | **adapt** | Change the `webServer` to `astro build && astro preview` (or a static server over `dist/`). Swap the bun/turbo scripts for `pnpm`/`bun` single-app scripts. Drop the health/Supabase parts. Keep the widths, the dark pass, the proof directory and the "iterate narrow" table. |
| `lighthouse.md` | The engine (`lighthouse-audit.mjs`) builds in launch mode and serves on :3100, auditing mobile and desktop into `screenshots/LIGHTHOUSE.md` plus JSON history, fail-open. Targets: SEO/A11y/BP 100 (floor 90), Perf 90+ (floor 70), with a soft plateau-aware gate. In-container perf reads ~30 pts low, so fix structure, not kilobytes. | H | **adapt** | Change the build/serve commands to `astro build` plus `astro preview --port 3100`, and the launch flag to an env var read in `astro.config`. **Raise the Perf target to the brief's ≥90 on mobile**: a static Astro site has no cold-`next start` penalty, so the "~30 pts low" caveat mostly vanishes. Keep the PSI-on-deploy rule. |
| `lingui.md` | Lingui v5: one config, catalogs, the `extract --overwrite --clean` → **Claude fills empty `msgstr`** → `compile --typescript` pipeline, "zero empty msgstr" verification by grep, ESLint lingui plugin, a single `localeCodes` module, Next `/[locale]` routing and an init-only 3-locale cap with an overflow "paywall sentinel". | H | **adapt** | Keep the pipeline, the verification and the single-locale-module rule. Drop the monorepo catalogs, CMS, the paywall sentinel and Next routing. Astro specifics (how `.astro` files get macros, how islands get the catalog) are covered in `2026-10-05-pstryk-reuse-audit.md` §2.3–2.5. **Add:** es is AI-translated, so mark it `#, fuzzy` or put it in a review list for a native speaker (project brief). |
| `motion.md` | The Motion (framer) library and a server-first island order: CSS → tiny wrapper → client component. **EASE tokens** `out [0.16,1,0.3,1]`, `quart [0.25,1,0.5,1]`, `inOut [0.87,0,0.13,1]`; durations 150/300/500/800/1200; exits at 60–70%. Hero choreography where LCP candidates stand still, the `.enter*` / `.enter-settle` / `.enter-bloom` classes, a cascade ≤ 500ms and transform/opacity only. | H | **adapt** | Change the library to **CSS + GSAP** (ScrollTrigger) and R3F. Keep the tokens as CSS `--ease-out: cubic-bezier(.16,1,.3,1)` etc. and as GSAP `CustomEase`, or the closest built-ins `expo.out`/`quart.out`/`expo.inOut`. Keep the LCP rules and the `.enter*` CSS classes (port them from `packages/shared/src/global.css`). Add GSAP `matchMedia` for reduced motion, ScrollTrigger cleanup on Astro view transitions, and "no scroll-jacking/pinning that traps the reader". |
| `tailwind-nativewind.md` | Tailwind **v3** plus NativeWind; HSL tokens in shared `global.css`; semantic class names only; automatic dark through `prefers-color-scheme` with **no theme toggle**, plus a `?theme=` QA override (`data-theme`) and the dark palette declared twice; Prettier class order. | H | **adapt** | Move to **Tailwind 4** CSS-first `@theme` (OKLCH is fine). Drop NativeWind. Keep the semantic tokens, the double dark declaration (`@media` + `[data-theme]`) and the `?theme=` override. **Decide** whether the portfolio keeps the "no toggle" rule; dev portfolios usually ship one. If it does, the `[data-theme]` block becomes the real mechanism. |
| `resend.md` | A server-side Resend SDK in a Next Route Handler, React Email templates localized with Lingui, a shared pstrykweb.pl domain/key, an init checklist, branding the emails, wiring a form, a newsletter, compliance sync. | M | **adapt** | Move it to a single Vercel function: an Astro endpoint with `prerender = false` under `@astrojs/vercel`, or `api/contact.ts`. Use the portfolio's own domain and key, and add **Turnstile** server verification before sending. Keep "the form must really deliver", "the key is server-only, `from` is public", a rate limit and the compliance disclosure. |
| `react-hook-forms-zod.md` | One zod schema per form, RHF plus `zodResolver`, shadcn `form.tsx`, safe-not-strict regex, brand-voice errors and "client mirrors the server, never replaces it". | M | **adapt (lite)** | One contact form. Consider zod shared between the island and the endpoint, plus native constraint validation, instead of RHF (~35KB). Keep "server re-validates", the consent `z.literal(true)` (if used) and the brand-voice errors. |
| `vercel.md` | Pipeline-created project, never deploy by hand, a GitLab vs GitHub deploy model, `.vercel.app` slug guessing, a `NEXT_PUBLIC_SITE_URL` env and the `IS_FULL_PRODUCTION` launch gate. | M | **adapt** | Keep the **launch gate** (noindex until flipped) and "canonical origin from env, never a guessed URL". Drop the pipeline and slug logic. Add `@astrojs/vercel` static output with one function, and the `vercel.json` redirects (`/` → `/en/`). |
| `mobbin.md` | Mobbin as the mandatory research source: an OAuth token bridge for headless runs, a web-research fallback, how to choose references by category *and* feel, "correctly inspired" vs copying, component libraries "never forced". | M | **adapt (shrink)** | Drop the pipeline bridge; the Mobbin MCP is available interactively. Keep "how to choose references" and "what correctly inspired means". Design research is already done in `research/`, so this is mostly for top-ups. |
| `shoogle.md` | The Shoogle MCP searches all public shadcn registries, optional; one query at a time; rate-limit retry once. | L | **port as-is** | It pairs with the existing `search-registry-items` skill. Note that most registry items are React and Motion: a portfolio island cost. |
| `shadcn-ui.md` | shadcn primitives: kebab-case files, `components.json`, Radix-backed a11y. | L | **adapt or skip** | Only if we use primitives (dialog, ⌘K, sheet) in islands. shadcn supports Astro plus React. |
| `aceternity-ui.md` | Animated hero/background components (Motion), client-only, one per view, Aceternity for heroes vs Magic UI for inline accents. | L | **skip** | It duplicates the GSAP/R3F plan and ships Motion JS. Mine it for ideas only. |
| `magic-ui.md` | Animated marketing flourishes (marquee, border beam, shimmer). | L | **skip** | Same reason. If one piece is wanted, take it through Shoogle. |
| `fal-ai.md` | fal.ai generation (FLUX) and Recraft Crisp upscale, gated by payload flags. | L | **skip** | Optional for abstract blog covers or OG backgrounds only. Never photos of the owner. |
| `nextjs.md` | App Router layout, routing/links, RSC vs client, Lighthouse-friendly defaults, i18n, verify. | none | **skip → write `usage/astro.md`** | Reuse its *structure* (layout, routing, server vs island, perf defaults, i18n, verify) for a new Astro doc. |
| `sentry.md` | It says it is not for landing pages, only Expo. | none | **skip** | — |
| `supabase.md` | Shared-project schema, CMS, admin auth, RLS. | none | **skip** | — |
| `tanstack-query.md` | Data fetching for Next and Expo. | none | **skip** | — |
| `turborepo.md` | The Bun + Turborepo monorepo. | none | **skip** | Only if the portfolio becomes a monorepo. Its `<scope>:<action>` script naming is still a nice convention. |

**Missing for the portfolio (write new):**

- `usage/astro.md`: islands, content collections, `astro:assets`, view transitions, endpoints.
- `usage/gsap.md`, or fold it into `motion.md`.
- `usage/r3f.md`: lazy canvas, poster, DPR cap, `frameloop="demand"`, reduced motion and mobile fallback.
- `usage/mdx.md`: blog components, code highlighting at build time.
- `usage/umami.md`: events taxonomy, cookieless and no banner.
- `usage/turnstile.md`.

---

## 2. design-quality.md: the rubric, faithfully

Source: [tpl: design-quality.md]. The file calls itself "the universal craft standard every generated site is held to, plus a concrete 0–10 rubric and a fast diagnostic used to JUDGE the result". The goal: "work that reads agency-built, not AI-generated". `design.md` is the per-project contract, and its tokens always win. This file is the cross-project floor.

### 2.1 Core belief

- "Every pixel is intentional — nothing default, nothing accidental."
- The gap between fine and exceptional is **intention + restraint**. A few things done perfectly beat ten done mediocre.
- Design the **ONE signature moment** first: "the thing a visitor would screenshot". Keep everything else quiet.

### 2.2 Universal craft rules (numbers kept)

**Typography** (it calls this "the highest-leverage lever")
- **~10:1** display-to-body ratio on the hero, e.g. display `clamp(3rem, 8vw, 8rem)` over 16–18px body. "Timid headings are the clearest amateur tell."
- Body: **16–18px** minimum, line-height **1.5–1.7**, measure **45–75 ch**.
- Display letter-spacing **−0.02 to −0.05em**. Body and small-caps labels stay normal or positive.
- Display headline: one statement of ~3–7 words. Use `text-wrap: balance` and allow no orphans. **Never** Inter, Roboto, Arial or system-ui as the hero display face.
- Faces come from the vetted catalog (`fonts.md`). A face outside it counts as a Typography miss.

**Color and atmosphere**
- Never pure `#000` or `#fff`. Use near-black and near-white (`#0a0a0a` / `#fafaf9`).
- The canvas sits at **one end of the lightness scale**. A hue cast is fine. A mid-lightness saturated canvas needs a recorded reason, or it counts as a Color miss.
- Text hierarchy by opacity: primary 100%, secondary ~60%, tertiary ~40%.
- **ONE accent**, used sparingly, all through tokens. No ad-hoc hexes.
- **60/30/10 by painted area**: 60% canvas, 30% a *genuinely different* secondary surface, 10% accent plus tints. Two shades of one neutral (**ΔL\* < 25**, same hue) count as ONE colour. Name the harmony in `design.md`.
- The **accent must recur**. It belongs in at least half the sections and in at least one non-CTA form (index numeral, rule, underline, active state).
- shadcn `--accent` is a neutral hover surface, **not** the brand accent. Add a brand layer: `--brand`, `--brand-bg`, `--brand-fg` and `--brand-hairline`.

**Layout and composition**
- White space is a tool. Use a real grid, then break it with intent.
- **At most TWO sections may share a layout archetype.** The menu: uniform grid, staggered/masonry, editorial split, horizontal rail, sticky column with scrolling detail, full-bleed media band, overlapping cards, numbered index list, large-type feature, accordion with a companion visual.
- "A grid is not the enemy — repetition is." Irregularity needs a one-line justification. "So it isn't a grid" is not one. A masonry layout still needs a column rhythm and a deliberate set of ratios. Two or three staggered items just look misaligned.
- **Surface rhythm**: no more than **3 consecutive sections** on one background. `--brand-bg` appears on **≥2 non-adjacent** sections.
- **Airy ≠ empty**: content filling less than **55% of the section height**, or less than **50% of the shell width** at 1440px, is under-designed. Fix it with real layout, never with padding or filler.
- **Bounded width**: every section sits in a capped, centred shell. Only background bands go edge to edge. Every `clamp()` has a real max. Full-bleed media has a max-height or an aspect-ratio.
- **Nothing lives under the chrome**: top padding at least the header height, and `scroll-margin-top` on every anchor. Check at the wide end (1920+).

**Copy density**
- Say less, show more. Leads ≤ ~2 sentences; card bodies ≤ ~2 lines.
- **Visual mass ≥ ~20%** of page area is images or video. Measured evidence: 12.3% read as "blocky/cramped", 25.5% read as "genuinely good".
- The mass must be **distributed** and has a ceiling:
  - at least ~8% must remain after removing the single largest image;
  - **≤50%** overall;
  - only the hero may be a full-bleed image over 85vh;
  - decorative bands cap at ~45vh.
- An image must do a job. "If you cannot say what a photo communicates, delete it."
- **≤25%** of content sections may have zero visual element. An icon does not count.
- Testimonials and FAQ fail this most often. This is a presentation rule, not an information cut: depth moves to subpages.

**Motion** (from `usage/motion.md`)
- Custom cubic-bezier only, never `ease`/`linear`. Use a fixed duration scale.
- Load choreography goes on the hero's **secondary** pieces. The h1, lead, primary CTA and hero image paint in the first frame: "a faded headline is a performance defect".
- Animate transform and opacity only. One signature moment per view. Reduced-motion safe.
- **Must ship a living motion layer**: reveals, hover/tap transitions and one scroll moment.

**Forms**
- Fields have a visible surface, a target height of at least **44px**, a clear label and a designed `:focus-visible`.

**Micro-craft**
- Branded `::selection`, a designed focus ring, and hover feedback that never shifts layout.
- Crafted empty, error, 404 and loading states. Smart quotes.
- Their repo-wide rule: *ASCII hyphen only, never en/em dashes*, enforced by `links.spec.ts`. This is a pstryk house rule. Decide separately whether the portfolio keeps it.

### 2.3 Accessibility floor (gates)

- Contrast **4.5:1** for body, **3:1** for large text and UI, on every surface. Never text on a raw photo without a scrim.
- Colour is never the only signal.
- Touch targets **≥44×44px**, at least 8px apart. Nothing essential depends on hover.
- Visible focus, one h1 and a logical heading order, `prefers-reduced-motion` and dynamic type.
- Reserve `aspect-ratio`, so CLS is about 0.

### 2.4 Anti-AI-slop: the instant-fail list (verbatim intent)

Any hit means not done, unless `design.md` asked for it explicitly.

1. A purple→blue (or pink) gradient hero.
2. Inter or system-ui everywhere; timid headings the same size as body.
3. Emoji as UI icons; unmodified Font Awesome.
4. An identical 3-card icon-title-blurb row as the whole page.
5. Everything centred, uniform spacing, glassmorphism everywhere.
6. Blob or wave SVG dividers; gradient text on every heading.
7. `ease`/`linear` easing, everything animating at once, parallax on body text.
8. A dead-static page.
9. Near-invisible form inputs.
10. Stock handshake or laptop photos; fake AI photos of real people or products.
11. Wall-of-text sections.
12. **≥3 sections on the same uniform card grid.**
13. **Grid-avoidance slop**: masonry with no reason.
14. Testimonials as a uniform grid of text cards.
15. A thin FAQ, newsletter or booking accordion marooned in padding.
16. **8+ sections on one background.**
17. A "dominant + secondary" that is two shades of one neutral (ΔL\* < 25).
18. The accent used only above the fold.
19. A hero image that is a small rounded rectangle touching no edge, beside an overstuffed copy column.
20. A busy, low-quality wide photo as the hero.
21. Uncapped full-viewport content.
22. A headline or CTA buried under the fixed header.
23. No signature moment.

### 2.5 The score

`score = Typography×0.22 + Composition/layout/density×0.28 + Motion×0.18 + Color/atmosphere×0.17 + Details/craft×0.15`

- **Bands**: 9–10 could credibly win an award; **~8 = professional agency work (the target)**; **< 7 = ship-blocker**.
- **Per category**: 0–3 default or broken, 4–6 generic but clean, 7–8 clearly crafted, 9–10 exceptional.
- "A green build at score < 8 is not done." State the score and its gaps out loud on every QA pass.
- **Composition** is weighted heaviest "because it is where every reviewed failure has landed". It covers grid and break, variety, surface rhythm, visual mass, fill and whitespace. **Color** covers 60/30/10 and the harmony, not just whether the tokens are nice.

**Score caps.** Measured at 1440px. A cap is a hard ceiling. You cannot average around it or re-score the same view more generously.

| Measured condition | Cap |
|---|---|
| Media < 15% of page area | Composition ≤ 5 |
| Media 15–20% | Composition ≤ 7 |
| Media > 50% | Composition ≤ 5 |
| < 8% media after removing the largest image | Composition ≤ 5 |
| Any bare-photo section (no heading, copy or action) | Composition ≤ 4 |
| Full-bleed image > 85vh outside the hero | Composition ≤ 6 |
| ≥3 sections on the same uniform N-up grid | Composition ≤ 5 |
| >3 consecutive sections on the same background | Composition ≤ 6 |
| >25% of content sections with no visual | Composition ≤ 6 |
| A section filling < 55% of its height or < 50% of the shell width | Composition ≤ 6 |
| Dominant/secondary < 25 ΔL\* apart (same hue) in **either** scheme | Color ≤ 4 |
| Secondary surface on < 2 non-adjacent sections | Color ≤ 5 |
| Accent absent from > half the sections, or above the fold only | Color ≤ 6 |
| No `--brand-bg` / `--brand-fg` pair | Color ≤ 6 |

A single cap at 5 on Composition or Color makes an overall 8 arithmetically unreachable, and that is intended.

### 2.6 Quick diagnostic (yes/no per view)

1. Is the hero headline large and expressive, around 10:1 against body?
2. Is there one signature moment, with everything else quiet?
3. Is the easing custom and the motion purposeful?
4. Near-black and near-white, plus one disciplined accent?
5. A real grid with an intentional break?
6. Generous, rhythmic white space?
   - 6a. Does 60/30/10 hold? A secondary surface on ≥2 non-adjacent sections, ΔL\* ≥ 25, and an accent that recurs past the fold?
   - 6b. Do ≤2 sections share an archetype, and does the surface flip at least every third section?
   - 6c. Is media ≳20%, with ≤25% of sections lacking a visual, and does each section fill its box?
   - 6d. **Was the dark scheme opened and judged as its own design?** Check home plus two subpages, and re-measure ΔL\* per band. "A contrast sweep is NOT a dark-mode review."
7. SVG icons, plus branded selection and focus?
8. Zero anti-slop hits?
9. Contrast, touch and reduced-motion floors met at 390, 1024 and 1920?
10. Nothing under the fixed chrome, at rest and at every anchor landing? No text smearing on a wide monitor?
11. Is the copy lean?
12. Is it bespoke to *this* brand, grounded in `design-references.md` and `inspirations/final-verdict.md`?

"Mostly yes → agency-grade. Any no is a concrete fix, not an opinion."

### 2.7 What to drop or change for the portfolio

**Drop or soften (local-business or Next specific)**
- Testimonials, FAQ, newsletter and booking examples: the portfolio has none of these sections, or very few.
- The "client photos" and "offers/gallery" framing.
- `payload`/`website_font_name` references and the house-blocked font list.
- The `Reveal.tsx` mention: in Astro, this is a small island or a CSS `@starting-style`/scroll-driven rule.
- The `--accent` shadcn note, if we don't use shadcn tokens.
- The `links.spec.ts` no-em-dash rule. The wiki's own writing rules may differ.

**Re-tune for a dev portfolio**
- **Visual mass ≥20%**: project chapters will be screenshots, video loops and R3F canvases. These count as media, so keep the floor. Decide whether a WebGL canvas counts as "media" in the measuring snippet (it should). The **≤50%** ceiling matters for an immersive hero.
- **"≤25% sections with zero visual"**: code blocks, diagrams and the stack/credentials grid will be tempting text-only sections. Define what counts as a visual: a diagram, a code-as-art panel or a large numeral, yes; an icon, no.
- **"Must ship a living motion layer"** fits the GSAP/R3F plan. Add a portfolio cap: no scroll-jacking, no preloaders, no gates (project brief, "out of scope"). Add a performance cap too: mobile Lighthouse ≥90, so a signature moment that costs LCP is a defect.
- **Dark as half the product** matters doubly if the portfolio ships a space or dark theme by default. Run the 6d review in whichever scheme is *secondary*.
- **Add portfolio-specific instant-fails**, from the research files rather than this template:
  - a project grid of equal mock-up cards as the whole "work" section;
  - "skills bars" or percentages;
  - a contact link reachable only at the end of a long linear scroll (the old-site failure);
  - a 3D scene that blocks content on mobile.
- **Keep the weights and caps** as written. They are generic and evidence-based.

---

## 3. Key rules from the standards pages

Tags:

- **[G]** generic best practice: port it.
- **[N]** the rule is generic, but its mechanism is Next.js: re-express it for Astro.
- **[P]** pstryk, local-business or generator specific: drop it.

### 3.1 accessibility.md [tpl: accessibility.md]

**Semantics, ARIA and names**
- [G] Accessibility is a property of each component as written, not a pass at the end. Semantics first, ARIA second.
- [G] Real landmarks (`header`/`nav`/`main`/`footer`/`section`). The primary nav is a `<nav>`, never an animated `div`.
- [G] **Exactly one `<h1>`** per page, with no skipped levels. Choose the level for structure, never for size. Bake this into a `Heading` primitive.
- [G] `<button>` performs actions and `<a href>` navigates. Never `<div onClick>`. Lists are real lists; tables use `<th scope>`.
- [G] Icon-only controls get a localized `aria-label` (state-aware, e.g. "Stop/Send"). Decorative SVGs get `aria-hidden`.
- [G] Expose state with `aria-expanded`, `aria-current="page"`, `aria-pressed` and a real `disabled`.
- [G] `alt` is mandatory: descriptive and localized, or `alt=""` when decorative. Video gets captions. Never autoplay audio. Background video is muted and reduced-motion aware.

**Keyboard and focus**
- [G] Keyboard reaches everything. Never remove the focus outline (`focus-visible:ring-2 …`). No positive `tabindex`.
- [G] A **skip link** is the first focusable element, targeting `<main id="main" tabIndex={-1}>`.
- [G] Overlays trap focus, restore it on close and close on Escape. Move focus deliberately on route or overlay change.
- [G] This matters for Astro view transitions, which do not move focus to the new h1 by default.

**Forms, motion, contrast and targets**
- [G] Forms:
  - a `<label for>` on every input; a placeholder is not a label;
  - `fieldset`/`legend` for groups;
  - `required` plus a visible marker;
  - `aria-invalid` + `aria-describedby` on errors;
  - errors announced through a live region.
- [G] Every non-essential animation is gated on `prefers-reduced-motion`. Content stays readable if the animation never runs.
- [G] Contrast **4.5:1** for text and **3:1** for large text (≥24px, or ≥19px bold) and UI. Never colour alone. Tokens only. Verify both themes.
- [G] Targets **≥44×44px**: pad the hit area rather than shrinking the element.
- [G] Text and spacing in `rem`. The page survives **200% zoom**. **Never** use `maximum-scale=1` or `user-scalable=no`.
- [G] Async results go to `role="status"`/`aria-live`. Animated per-glyph text is collapsed into one node that has the full accessible name and `aria-hidden` pieces. This matters for any split-text GSAP headline.

**Testing**
- [G] `eslint-plugin-jsx-a11y`, axe (zero serious or critical), a keyboard-only pass, a screen-reader smoke test, and light, dark and 200% zoom.
- [N] `next/image` and `lib/seo.ts` OG alt are Next mechanics.
- [P] Expo/RN-origin notes.
- Gaps to add for the portfolio: **WCAG 2.2** (the template targets 2.1) and **canvas/WebGL** (an equivalent text, a pause/stop control for motion longer than 5s, no flashing). Also code blocks: a scrollable `pre` needs `tabindex="0"` and a label.

### 3.2 performance.md [tpl: performance.md]

**Above the fold**
- [G] **The LCP element must be visible in the server HTML.** Check with `curl … | grep 'opacity:0'`: nothing above the fold may match.
- [G] **LCP candidates never animate their visibility.** That means the hero h1, lead, primary CTA and hero image. At most a transform-only settle. The evidence: 13 sites scored 64–89 on mobile with LCP 2.5–5.4s because the h1 had a fade.
- [G] **Above-the-fold entrances are CSS, never JS.** The secondary cascade finishes ≤500ms after first paint.
- [G] An LCP image is high priority and never lazy.

**Budgets** (mobile, per route)

| Metric | Good | Investigate above |
|---|---|---|
| LCP | ≤2.5s | 2.5s |
| TBT | ≤200ms | 300ms |
| CLS | ≤0.1 | 0.1 |
| First-load JS | ≤~200KB compressed | 250KB |

- [G] Going over a budget with a documented reason is OK. Going over unexamined is not.

**TBT and CLS**
- [G] TBT is how much JS you ship. Don't ship an animation library to a static section. Heavy widgets load lazily, below the fold. Third parties load only when needed.
- [G] Size every image or embed. Animate only transform and opacity. Reserve space with `aspect-ratio`. Use metric-adjusted font fallbacks.
- [G] Never game a metric (for example starting at `opacity:0.01`). Never weaken an audit. Don't chase the last point on a media-rich hero.

**Mechanisms**
- [N] `next/dynamic`, `next/font` and `optimizePackageImports` map to Astro as:
  - islands with `client:visible`/`client:idle`;
  - Astro's font handling;
  - Vite manual chunks.
- [N] Astro's zero-JS-by-default pages make the TBT budget much easier. The real risks are the R3F/three bundle (~150KB+ gz) and GSAP plugins.
- [P] `@supabase/supabase-js` never on the client; Google Maps iframe exception.
- [P] The "container reads ~30 pts low" caveat is specific to a cold `next start`.

### 3.3 color.md [tpl: color.md]

- [G] Budget colour by **painted area**: dominant ~60% (a near-white or near-black canvas), secondary surface ~30% (a clearly different family), accent ~10% (brand plus tints).
- [G] **Separation test**:
  - in different lightness families, ΔL\* ≥ 25;
  - in the same family, only with a visible hue/chroma difference and a boundary.
  - Measured example: `#FFFCF5` vs `#F0E6D1` is ΔL\* ≈ 7, so it counts as one colour.
- [G] **Name a harmony**: monochrome+accent, analogous, complementary, split-complementary or triadic. The harmony picks *hues*; it does not license a colourful canvas. Below real conviction, default to **monochrome + accent**, with the 30% as a dark band.
- [G] **The accent recurs** in at least half the sections and in at least one non-CTA form (section index, list marker, link underline, focus ring, active state, a hairline). No decorative fakery.
- [G] **Brand token layer**: `--brand`, `--brand-ink`, `--brand-bg`, `--brand-fg`, `--brand-hairline` and `--overlay-hero`. The `--brand-bg`/`--brand-fg` *pair* makes the 30% cheap to build.
- [G] **Dark restates all three roles.** In dark, the secondary is usually *lighter* than the canvas. **Measure the dark ΔL\*.** Real example: a light-theme ΔL\* of 92 became **5.9** in dark, and every band vanished.
- [G] A token that must not move between schemes is restated in both blocks, with a comment.
- [G] Text-contrast passing tells you nothing about surface separation.
- [G] Verify with the painted-area snippet at 1440px, merging entries that fail the separation test first.
- [N] shadcn `--accent` naming.
- [P] Payload `brand_colors` honoured verbatim; `gen-design` hard overrides.

### 3.4 fonts.md [tpl: fonts.md]

- [G] Derive a **classification pair** (display class plus body class) from the art direction. Never pick a family name from memory.
- [G] **Look** at the class contact sheet, shortlist 3 per role, open the specimens, pick one, and record why it beat the other two.
- [G] Pair *across* classes. Target one display plus one body; a third face (usually mono) needs a reason. A mono is justified for a dev portfolio.
- [G] `serif-high-contrast` and `display-expressive` are display-only.
- [G] Prefer **variable** files: one request, every weight.
- [G] **House-blocked**: Inter, Roboto, Poppins, Montserrat, Lato, Open Sans, Playfair Display, Raleway, Nunito, Source Sans Pro, Oswald, Merriweather. They read as defaults. Geist is *in* the catalog (sans-grotesque), but beware: it is very common on dev portfolios too.
- [G] Self-host only from the vetted catalog (licence proof is written next to each file). Never a CDN `@import`.
- [N] `next/font/google` and `next/font/local` through `scripts/add-local-font.mjs` (which writes to `apps/nextjs-landing-page/app/fonts/`), with the `--font-<role>-face` variable trick.
- [P] `website_font_name` payload override.
- **Flag**: Fontsource URLs are pinned to the `latin` subset at a single weight. The portfolio needs **latin-ext for Polish**. Either re-pin to `latin-ext` plus the variable file, or use `@fontsource-variable/<family>` packages, which ship every subset as `unicode-range` chunks.

### 3.5 images.md [tpl: images.md]

- [G] Every image the build uses ships from the repo. No hotlinks, no third-party buckets.
- [G] The image set is a **pool, not a checklist**. Drop weak, off-brand or redundant images. Never invent a replacement for a real image.
- [G] Upscale floors: hero/full-bleed ≥1600px wide, in-content ≥800px, logo ≥512px.
- [P] Sourcing modes, payload booleans, `localize-images.mjs` for Supabase URLs, CMS image columns, the `/admin` uploads, fal Recraft gating.
- Portfolio additions:
  - every project screenshot through `astro:assets`, with explicit `widths`/`sizes`;
  - video loops as muted `playsinline` with a poster, respecting reduced motion;
  - an R3F poster image as the LCP;
  - per-locale OG cards when the card has words.

### 3.6 seo.md [tpl: seo.md]

**Head and metadata**
- [G] Metadata is in the **server/static HTML**, per route and per locale. Never set head tags client-side. Never derive them from a shared shell that can't see the locale (the Expo bug).
- [G] One absolute **site origin**, from env. Every canonical, OG URL and alternate is absolute.
- [G] Titles ≤60 chars; descriptions 140–160 with the primary keyword. Strings are localized through Lingui like everything else.
- [G] Canonical is `/{locale}{path}`. **hreflang for every locale plus `x-default`**, with **one** code set across head, sitemap and manifest.
- [G] `<html lang>` is the page's locale, set on the server.
- [G] `og:image` is **declared explicitly** on every page: 1200×630, with width, height and a localized alt. Two production sites shipped with no og:image because they relied on a convention. Add a per-locale card only when the card has words.
- [G] `og:locale` uses territory form (`pl_PL`, `en_US`, `es_ES`) through a mapping function, never `replace("-","_")`.
- [G] Twitter `summary_large_image` **must** include an image.

**Icons, robots and sitemap**
- [G] The site's own favicon set; never ship template placeholders. A real manifest whose theme and background colours are actually emitted.
- [G] One robots source. Per-page `noindex` through meta, not robots.txt alone. Generate the sitemap, with per-locale alternates.

**JSON-LD**
- [G] Escape it with `serializeJsonLd` (escape `< > & U+2028 U+2029`). Add page-level nodes only where they earn a rich result. `SearchAction` only with real search.
- [G] Keywords: deterministic, deduped, capped at ~25. This is a legacy signal and low value.

**Launch gate**
- [G] The site is **noindex/nofollow until an env flag flips**, with all other metadata still shipping. This is also useful for a portfolio before content is final.

**Mechanisms to drop or replace**
- [N] Metadata API, `generateMetadata`, `viewport` export, `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, file-convention icons.
- [P] LocalBusiness subtype with hours, geo and priceRange; offers/enrollment routes; `make-icons.mjs` monogram.
- [P] `make-icons.mjs` itself is in the nextjs template and renders through Chromium. It could be adapted to generate the portfolio's favicon set.
- **Portfolio JSON-LD:**
  - `Person`, with `name`, `jobTitle`, `address.addressRegion` "Pomorskie", `sameAs` GitHub/LinkedIn and `knowsAbout`;
  - `WebSite`;
  - `ProfilePage` on home or about;
  - `BlogPosting` on posts;
  - `CreativeWork` or `SoftwareApplication` on `/work/*`;
  - `BreadcrumbList` on subpages.

### 3.7 consent-analytics.md [tpl: consent-analytics.md]

- [G] Nothing non-essential runs before opt-in. Default is denied. Reject is as easy as Accept. The choice is versioned and can be withdrawn.
- [G] **A broken gate is worse than no analytics.** If it can't be built properly, ship without the tracker.
- [G] **If nothing non-essential is set or loaded, show no banner at all.** "A banner that gates nothing is cosmetic and annoying." This is the portfolio's case with cookieless Umami. Confirm it in `compliance-and-data.md`, and confirm Turnstile's cookie posture.
- [G] Cookie-setting embeds (YouTube, Calendly, social) are gated or replaced with privacy mode (`youtube-nocookie`, click-to-load). A plain link stays visible.
- [G] Every embed reaching a remote origin is a data touchpoint. List it in the compliance doc and the policy.
- [G] **Form consent is separate from cookie consent.** An unticked checkbox referencing the policy, validated on the **server**. Resend is disclosed as a subprocessor.
- [G] Strip query strings from tracked URLs. Never put sensitive data in analytics properties.
- [G] Banner and overlay roots are marked `data-overlay-ok`, so the layout spec doesn't flag them.
- [N] `ConsentProvider`/`useConsent`, `next/script` GA loader, RSC cookie read.
- [P] GA4 Consent Mode v2 details, the Google Maps iframe exception, `/admin` never tracked, health data.

---

## 4. Skills: what each does and how to port it

All skills are under [repo: .claude/skills/<name>/SKILL.md].

**Pre-existing portfolio copies.** The portfolio's own `code`, `lighthouse-qa`, `wiki-lint`, `awwwards`, `commit`, `search-registry-items` and `start-project-info` are **byte-identical** to the pstryk copies (no diff), so they still carry Next/generator wording:

- `lighthouse-qa` mentions `next/image`, `next/dynamic`, `next/font`, `nextjs-landing-page`, `IS_FULL_PRODUCTION`, Supabase and `bun run …`, about 20 hits.
- `wiki-lint` routes fixes to "the owning gen-\* skill" and checks payload fields.
- `code` expects `CLAUDE.md` Context Routing, `usage/*.md`, `run-notes.md`, the contrast/layout/health specs, `diff-scope.mjs` and `verify-visual-qa.mjs`.

**The portfolio's `CLAUDE.md` is empty (0 bytes)**, so the `code` skill's step 1 currently routes to nothing.

### 4.1 Skills worth porting

| Skill | What it does | Inputs → outputs | Dependencies | Port verdict and how |
|---|---|---|---|---|
| **code-privacy-policy** | A late-phase skill that generates the privacy policy *from what the code really does*. A mandatory **verification scan** greps `localStorage`/`sessionStorage`/`document.cookie`/`cookies()`, forms, analytics, embeds and the DB schema, then reconciles with `compliance-and-data.md`, wiki first. **Content rules**: 14 standard headings in order (controller, data per touchpoint, legal basis only if derivable, DB storage, cookies, analytics, subprocessors, consent and withdrawal, rights, retention, contact, transfers, children, changes and date). Unknowns are **omitted, never rendered as placeholders**; they go to `Open questions` and `IMPORTANT.md`. GDPR rights are listed only if flagged. Never claims compliance. | `compliance-and-data.md`, `company-brand.md`, `technologies.md`, `website-structure.md`, `consent-analytics.md` → the page, footer link, sitemap entries (priority 0.3), the wiki "Required pages" row and a `log.md` line | `gen-compliance-and-data`, `important-notice`, Lingui | **adapt → `code-legal-pages`** (privacy, plus terms if `compliance-and-data.md` requires them). (1) Change the route to `src/pages/[locale]/privacy.astro`, or one MDX per locale. (2) Replace the DB schema scan with a scan of the contact function: fields collected, Resend, Turnstile, Vercel function logs, rate-limit storage, retention. (3) Add Umami. (4) **The brief says legal pages are NOT indexed**, but the template makes them indexable at priority 0.3. Follow the brief: `noindex` and keep them out of the sitemap. (5) Formal "lawyer grade" tone, not the brand voice (brief). (6) **es legal text is AI-translated**: flag it for review, and consider whether the en version is the binding one. The Astro landing's real legal pages are in `2026-10-05-pstryk-reuse-audit.md` §5. **M** |
| **write-pstrykweb-blog** | Researches, fact-checks and writes a Polish PstrykWeb post. Intake requires a named, consenting author. Plan: the query, a SERP read, "People also ask" for the FAQ, overlap with existing posts, the post kind and its length. Research builds a **claim ledger** (`research.md`) where every fact has verbatim evidence and a date, confirmed by `fetch.py --quote`. A cold **fact-check** subagent pass follows, plus recomputed arithmetic. Then `blog.py fix/check`, a standalone HTML build, a 390/1440 screenshot look and a hand-off. Publishing to MDX happens only on request. | brief/topic, `assets/site.json` (prices, posts, backlog) → `<slug>.md` (frontmatter + text), `<slug>.html`, `research.md` and `.sources/` | Python 3, WebSearch/WebFetch, `pdftotext` or `pypdf`; `scripts/blog.py` (58KB: new/fix/check/build/mdx), `scripts/fetch.py` (generic); `assets/*` generated from the live site by `bun run blog:skill`; an `OPERATOR_ONLY` marker | **adapt → `write-blog`**. **Keep:** `references/research.md` (protocol, ledger, subagent prompts, "drop what you can't verify"), `scripts/fetch.py` verbatim, the research/article templates, the "answer first, then depth, honestly" structure, the fact-check pass, the filler-phrase list (rewrite it in English) and "no invented facts, quotes or authors". **Replace:** `claims.md`, with "what I may claim about myself and my projects" (metrics only with evidence, no client names without permission). `writing.md` voice, with first-person, technical and product-minded, from `brand.md`. `seo.md`, with developer and role queries instead of local SEO. Covers, with the portfolio's OG style. `blog.py check/mdx`, with the portfolio's content-collection schema. **Drop:** pricing, UZNK compliance and the standalone HTML build (use `astro preview` to look at the post). **Decide:** blog locales (en only, or en+pl). The landing's `scripts/blog-skill*.mjs` sync is covered in reuse audit §4.4. **M–L** |
| **translate** | Fills every empty `msgstr` and nothing else. It reads the **whole** `.po` first to infer register, punctuation, case, length and settled vocabulary. Rules: never touch `msgid`; keep placeholders and ICU verbatim; use real plural categories (**Polish needs `few`/`many`**); keep escapes and `<0>` tags; leave `#, fuzzy` alone. **Never copy the source into `msgstr`.** A genuinely identical string gets `#. i18n-allow-identical`. Only the ASCII hyphen. Verification has two parts: `Missing 0`, **and** `verify-i18n.mjs` (empty, multi-word identical to source, long dashes). | the extract output → the edited `.po`, compiled; a 2-line report | `model: claude-sonnet-5`, `effort: low`; `bun run translate`; `.agents/quality/verify-i18n.mjs` | **port almost as-is**. Change the script names to the portfolio's `lingui extract` / `lingui compile` commands. **es is AI-translated** (brief), so add a step that lists every es string touched for native review. On the user's "lingui-translate-ai" idea: the pstryk pipeline *deliberately* has **no automated AI fill-in tool**; Claude edits the `.po` directly [tpl: usage/lingui.md § The translate pipeline]. If a tool is adopted, keep this skill's verification half as the gate, and check the tool's current docs before wiring it. **S** |
| **important-notice** | Keeps a root `IMPORTANT.md` honest gap list. Three sections: failed/deferred, stubbed, needs-developer-action. File after 2–3 real attempts, then move on. It is the **only** channel for owner or developer messages: nothing addressed to the owner renders on the site. Never secrets. Only file what is observed. | a blocker description → `IMPORTANT.md` | none | **port as-is**, minus the paragraph about pipeline-seeded `RESEND_API_KEY`/Supabase. `CLAUDE.md` and `code-privacy-policy` depend on it. **S** |
| **session-handoff** | Builds a context-handoff artifact by reconstructing the *whole arc* (original goal and pivots, constraints, decisions, rejected approaches, key files, running state including background shell IDs, verification, deferrals, "pick up here"). It prints and saves once through `tee` to `.claude/session-state/session-handoffs/`. | the session → a handoff `.md` | `model: claude-sonnet-4-6` | **port as-is, or rely on the global one.** This environment already lists `anthropic-skills:session-handoff`. The portfolio `code` skill calls `session-handoff` by name, so make sure the name resolves. Add `.claude/session-state/` to `.gitignore` if handoffs should stay local. **S** |
| **stop-session** | Prints a stop banner, **commits as Claude** (`--author="Claude <noreply@anthropic.com>"`, never push), runs `session-handoff`, then stops: no work after it. Only when the user asks, never on context length. | — | `session-handoff`; it cites `conventions/working-with-claude.md` and `CLAUDE.local.md` | **adapt (paths only)**. Re-point the two cited files, and confirm that the user wants the auto-commit-as-Claude rule here. **S** |
| **self-improve** | Factory-only. Audits a live generated site through Playwright (both schemes, 390/1024/1440/1920), code, Lighthouse, microcopy in every locale and Mobbin. A strict **objectivity test** (only defects provable from evidence, "when in doubt, out") turns findings into an edit-job payload and framework fixes. | URL → `apps/api/examples/edit-<slug>.json`, an audit note, framework changes | Playwright, Lighthouse, Firecrawl, Mobbin MCPs; **`measure-views.js`** | **skip the skill; port two parts.** (1) **`measure-views.js`** [repo: .claude/skills/self-improve/measure-views.js] (232 lines). It is installed via `browser_evaluate`, then `await window.__sweep(1440,900)`. It measures every *cappable* rubric condition per route (media share and share excluding the largest, sections with no visual, content fill, surface rhythm, overflow, text under chrome, sub-44px targets, `CAP:` lines). Wire it into the visual QA loop so self-scores are anchored by numbers. (2) The objectivity test and "a fired cap is a prompt to go look, not a finding", in a later post-launch `audit-site` skill. **S** |
| **gen-design** | Writes `design.md`: art direction, colour system, typography, spacing, components, depth, motion, imagery, signature element, responsive behaviour, do/don't and section notes. A **two-pass** procedure: plan, then an **8-gate self-critique** (3 distinctive choices; swap test; slop scan; brand fidelity; contrast on every pairing; a **convergence scan** where a house-blocked font or an un-viewed specimen fails automatically; the colour budget; composition counts). A knowledge base with a selection algorithm and **15 directions**, among them `tech-precision`, `cinematic-showcase`, `type-forward-editorial` and `retro-futurist`. Also compose-your-own menus, an **anti-slop bank** and a craft bar. | payload + `design-references.md` + `final-verdict.md` + `fonts.md` + `color.md` → `design.md`, a `log.md` line | `fonts.md` + PNGs, `color.md`, `design-quality.md`; `effort: high` | **adapt.** This is the highest-value gen skill. Drop the "headless, never ask" rule, the payload field ownership and the hard payload overrides. Change the inputs to `research/2026-10-05-art-direction-themes.md`, `research/inspirations/`, `brand.md` and `audience.md`. Keep the two-pass gate, the directions, the anti-slop bank and the font-by-eye procedure verbatim. **M** |
| **gen-design-references** | Synthesises the inspirations into `design-references.md`: direction, gallery, project and per-section references, a **composition ledger** (the anti-repetition check, in writing) and a component palette ("fit, never force"). | `final-verdict.md` → `design-references.md` | Mobbin output | **adapt (light)**, or fold the composition ledger into `gen-design`. The research already exists. **S** |
| **gen-compliance-and-data** | Writes `compliance-and-data.md`: data touchpoints, cookies and storage, analytics data, consent requirements, regional exposure, required pages, policy inputs, open questions. | code + wiki → the page | — | **adapt**. It feeds `code-legal-pages`. `research/2026-10-05-legal-compliance.md` is only a 778-byte stub, so this is still to do. **S** |
| **gen-analytics** | Writes `analytics.md`: goals, provider, event naming, taxonomy, privacy mode, heatmaps, reporting, QA. | — | `model: claude-haiku-4-5` | **adapt for Umami** (cookieless events: contact submit, CV download, case-study read depth, outbound GitHub/demo clicks). Or write the page once by hand. **S** |

### 4.2 Skills to skip

- **scrape-website** (605 lines). It turns an existing business site into an `InitNewProjectInput` payload: crawl, content, images to a Supabase bucket or `public/images/`, brand cues, sections. It uses Firecrawl, the Playwright MCP and `deno`. **Skip.** The old `matmuszarski.space` is a three.js scene with little crawlable content. Pull the few facts you need by hand with Playwright.
- **gen-project-brief, gen-product-requirements, gen-target-audience, gen-company-brand, gen-technologies, gen-website-structure.** All are payload-driven page writers (mostly `claude-haiku-4-5`, `effort: medium`). They are **superseded** by the portfolio's `start-project-info`, whose `references/page-templates.md` already defines `project-brief.md`, `requirements.md`, `technologies.md`, `conventions.md` and `open-questions.md`. `project-brief.md` already exists. **Skip**, but patch `wiki-lint` to route structural fixes to `start-project-info --repair` or a direct edit instead of "the owning gen-\* skill".
- **gen-design-analysis.** Its research is already done in `research/`. Skip.
- **gen-monetization, gen-assets.** Skip.
- **code-supabase, code-admin-panel, fetch-google-reviews.** Skip.

### 4.3 MCP dependencies in the template

`.mcp.json` [repo: .claude/templates/root/.mcp.json] lists:

- `playwright`: headless, isolated, output to `screenshots/.work/.mcp`;
- `shadcn`, `magicui`, `aceternityui`;
- `fal-ai-image` (`FAL_KEY`);
- `shoogle` (HTTP);
- `mobbin` (HTTP).

**For the portfolio:** keep `playwright` (needed by the visual loop and `measure-views.js`), `shoogle` and `mobbin`. Drop `magicui`, `aceternityui` and `fal-ai-image`. Add a `lighthouse` MCP only if it is wanted; the script is enough.

---

## 5. `.agents` quality tooling and e2e specs

Locations:

- scripts: [repo: .claude/templates/root/.agents/quality/], with `security/` beside it;
- specs: [repo: .claude/templates/nextjs-landing-page/apps/nextjs-landing-page/e2e/];
- config: [repo: .claude/templates/nextjs-landing-page/apps/nextjs-landing-page/playwright.config.ts].

**Astro-native counterparts already exist** in the landing app: `scripts/lighthouse.mjs` (serves `dist/` with `astro preview` on 3230, budget check, median of `--runs`), `scripts/links.mjs`, `scripts/launch-gate.mjs`, `scripts/shots.mjs`, and `tests/e2e/{pages,behaviour}.spec.ts` with `playwright.config.ts` on `astro preview --port 3220`. They are covered in `2026-10-05-pstryk-reuse-audit.md` §6.7 and §7.3. **Rule of thumb:** take the *infrastructure* (serve, ports, build) from the landing's Astro scripts, and the *checks* (what to assert) from the template specs below.

### 5.1 Scripts

| Script | What it does | Next/pipeline-specific bits | Astro adaptation | Phase 1? |
|---|---|---|---|---|
| `lighthouse-audit.mjs` (17KB) | Finds Chrome (`CHROME_PATH` → `/ms-playwright` → PATH), or exits **3 = unverifiable, fail-open**. Builds in **launch mode** (`IS_FULL_PRODUCTION=true`, so SEO is scored as at go-live) and serves on **:3100**. Runs Lighthouse (global bin, else `npx lighthouse`) per route × mobile/desktop. Writes `screenshots/LIGHTHOUSE.md` plus `.work/lighthouse-latest.json` and `lighthouse-history.json` (plateau detection). Env: `LIGHTHOUSE_ROUTES`, `LIGHTHOUSE_DEVICES`, `LIGHTHOUSE_PORT`, `LIGHTHOUSE_SKIP_BUILD=1`. | `APP_DIR=apps/nextjs-landing-page`, `.next/BUILD_ID`, `bun run website:build`, `bun run start` (kills the process group because `next start` spawns children) | Swap the build check to `dist/` existing, and the build command to `astro build` with the launch env var set. Serve with `astro preview --port 3100`, or a plain static server over `dist/`. Default routes: `/en/`, `/en/work/<flagship>/`, `/en/blog/`, `/en/cv/`, one pl and one es page. **Simpler:** start from the landing's Astro `scripts/lighthouse.mjs` and graft on exit-3 fail-open, `LIGHTHOUSE.md` and the history JSON. | **Yes (S–M).** The brief makes "Lighthouse mobile ≥ 90 on every page" a launch metric, and R3F/GSAP regressions are cheapest to catch early. |
| `diff-scope.mjs` (7KB) | "Did this job's diff touch anything a screenshot or score could react to?" Diffs against `PIPELINE_BASE_SHA`, plus the dirty tree. Flags `ui`, `perf` (a superset), `i18n` and `cms`. **Fail-closed**: `unknown: true` means everything changed. Run it directly to debug. | the `PIPELINE_BASE_SHA` runner env; regexes only know `tsx/jsx/css/tailwind/components/app/public/global.css`, `next.config`, `lib/seo.` and `supabase/services` | **Add to `UI_RE`:** `\.astro$`, `\.mdx?$` under `src/content/`, `src/pages/`, `src/layouts/`, `src/styles/`, shaders (`\.(glsl\|vert\|frag)$`), `astro\.config\.`. **Add to `PERF_RE`:** `vercel\.json`, `src/assets/`. **Base SHA:** with no runner, default to `git merge-base HEAD origin/main`, or a SHA written at session start. Drop `cms`. | **No → Phase 2.** It only pays once there is a Stop-hook gate to skip. |
| `verify-visual-qa.mjs` (54KB) | The **Stop-hook finish gate**. Checks run cheapest first and block on the first failure: screenshots committed; `VISUAL-QA.md`; CMS; **i18n**; icons; email brand; admin; the IMPORTANT.md go-live note; `bun run check`; `test:e2e`; **Lighthouse soft + plateau-aware** (a11y/BP/SEO against target, perf only below its floor and at most `LH_PERF_ROUNDS`=2). **`FINISH_GATE_CAP`=5 bounces**, then it allows. Fail-open on anything that can't start. It honours `PIPELINE_DRY_RUN` and the operator STOP, and appends measured timings to `run-notes.md`. Needs `settings.json` Stop `timeout: 3600`. | project-type detection, bun/turbo scripts, the CMS/admin/email gates, the `IS_FULL_PRODUCTION` handoff, the pipeline control channel | Write a **slim `finish-gate.mjs`**: (1) if UI changed, screenshots plus `VISUAL-QA.md`; (2) `verify-i18n`; (3) `astro check` + lint + build; (4) e2e; (5) optionally Lighthouse. Keep the bounce cap, fail-open, the timing append and the `{"decision":"block"}` contract. A 1-hour Stop hook is heavy in an interactive solo repo: put it behind an env flag or a "quick" mode. | **No → Phase 2.** Phase 1: expose the same checks as a single `verify` script that the `code` skill's done criteria call by hand. |
| `verify-i18n.mjs` (8KB) | The i18n honesty check. It fails on an empty `msgstr`, on a **multi-word msgstr identical to source** (unless marked `#. i18n-allow-identical`) and on long dashes; it warns on single-word identical strings. Fail-open when there are no catalogs. | **It hardcodes `packages/shared/src/locales/<locale>/messages.po` and `packages/shared/src/lib/localeCodes.ts`.** In the portfolio it would find nothing and **exit 0 silently**, a vacuous pass. | Point it at the portfolio's catalog path (or parse `lingui.config` catalogs) and source-locale constant. Make "no catalogs found" **fail loudly** once i18n is configured. Decide whether the long-dash rule applies. | **Yes (S)**, with `translate`. |
| `verify-assets.mjs` (16KB) | Icon honesty: declared icons exist, aren't byte-identical to the placeholders, aren't a flat colour, and have real pixel sizes matching their filenames. Also no hardcoded Supabase Storage URL. | Supabase URLs, the template placeholder digests | Only checks 1, 3 and 4 matter. The portfolio has no placeholder icons to inherit. | No (optional, Phase 2). |
| `verify-cms`, `verify-admin`, `verify-email-brand`, `pipeline-control` | CMS from the DB; the admin `?key=` sign-in; email template branding; the operator STOP/inbox channel. | all pipeline or CMS | — | **Skip.** One idea from email-brand is worth keeping: the contact auto-reply carries *this* brand. |
| `security/read-safe-files-only.mjs` + `sensitive-files.json` | A PostToolUse hook on `Read\|Grep\|Glob\|LS\|Bash` that blocks sensitive paths: `.env*`, keys, dumps, `.vercel/`, `.npmrc`, credentials and so on. | none | Port as-is, plus the `settings.json` `permissions.deny` list. This enforces the user's "don't read .env" rule mechanically. | **Yes (S).** |
| `.githooks/pre-commit` | Blocks staged secret-shaped tokens (GitHub, GitLab, Anthropic, OpenAI, Slack, AWS, Google, Stripe, Supabase and more) and real `.env` files. Enable with `git config core.hooksPath .githooks`. | the `SITE_ADMIN_*` and `NEXT_PUBLIC_*SECRET` patterns | Port as-is. Replace `NEXT_PUBLIC_` with Astro's `PUBLIC_` prefix, and add Resend (`re_…`) and Turnstile secret patterns, after checking their real formats. | **Yes (S).** |

### 5.2 e2e specs

| Spec | What it does | Next-specific bits | Astro adaptation | Phase 1? |
|---|---|---|---|---|
| `playwright.config.ts` | `desktop` at a real **1920×1080** and `mobile` on Pixel 5 (the layout spec is ignored on mobile). Timeouts of 6 min per test and 15 min global. CI: 1 retry, 2 workers, `maxFailures` 10, `E2E_FAIL_FAST`. A **production** `webServer`. | `bun run start`, `ADMIN_PREVIEW=1` | `webServer.command: astro preview --port <N>` with `url: /en/` (the landing uses `npx astro preview --port 3220` with `url …/pl/`). Add scripts for `:failed`, `:only`, `:fast` and `:visual`. | **Yes (S)** |
| `routes.ts` | Shared discovery: start at `/`, follow same-origin links once, capped at **`MAX_ROUTES = 10`**. `collectAnchors()` returns in-page `#id` targets that exist. | — | For a static site, list routes deterministically from `dist/**/index.html` or the sitemap index, which gives every locale. Raise the cap or sample per template (home, one `/work/*`, blog index, one post, `/cv`, `/my-life`, `/privacy`, 404) × 3 locales. | **Yes (S)** |
| `contrast.spec.ts` | axe `color-contrast` (WCAG AA) per route, plus a DOM rule: **text over `<img>`/`<video>`/background-image needs a `[data-scrim]` ancestor**, or the media carries `data-no-scrim` with a reason. **Light and dark** on one load, with a guard proving the CSS scheme swap is live. Both projects. | `<Scrim />` component path; the `global.css` location | **Add `canvas` to the media selector.** Otherwise text over the R3F hero is never checked. If the site gets a **theme toggle** via `data-theme` + localStorage, `emulateMedia` alone may not flip it. The guard will catch that; also set `data-theme` explicitly. Needs `@axe-core/playwright`. | **Yes (S)** |
| `layout.spec.ts` | Widths **390/1024/1920/2560**. `[overflow-x]` (the document wider than the viewport, naming the outermost culprit). `[covered]`: text hit-tested (`elementFromPoint`) under fixed/sticky chrome **at scroll 0 and at each nav anchor landing**; `data-overlay-ok`, `role=dialog` and `aria-modal` are exempt. `[overstretched]`: a text line over **1400px** at 2560. | none | Generic. Watch **GSAP ScrollTrigger pins**: they become `position: fixed` while pinned. Scroll 0 is fine, but anchor landings inside a pinned section may flag, so make anchors land outside pins. Mark the ⌘K palette and the mobile menu as dialogs. | **Yes (S)** |
| `lcp.spec.ts` | Per route and width, with **JavaScript off**: rewinds clock-driven animations to t=0 and measures, then finishes them and measures again. A candidate (h1, hero lead, primary CTA, largest visible image) fails if under half of it is painted at t=0, or if more than 10% fades, blurs or clip-reveals. Transforms are ignored. | `.enter*` class names in the messages | Generic and **highly relevant** to a GSAP/R3F hero. A `<canvas>` is not an LCP candidate, so the poster `<img>` will be. Make sure split-text headline effects keep the h1 painted at t=0 (transform only). | **Yes (S)** |
| `links.spec.ts` | Routes are the **sitemap** ∪ chrome links. It fails placeholder hrefs (`""`, `#`, `javascript:void(0)` …), 404s, unsafe `target=_blank` and **em/en dashes in rendered text**. | `/sitemap.xml` path; the dash rule | `@astrojs/sitemap` writes `/sitemap-index.xml` → `sitemap-0.xml`, so follow the index. Make the dash rule optional, by the portfolio's choice. Check external links (GitHub, live demos) with HEAD, off by default. | **Yes (S)** |
| `metadata.spec.ts` | Declared icons, manifest icons and JSON-LD `logo`/`image` all **resolve by path on the test origin**. Per locale: `<html lang>`, `og:locale` and descriptions are distinct (no shared description). og:image ≥1200×630. | the Next reserved-filename trap (`app/*.png` not served) | Keep the assertions; the Next trap doesn't apply. Add hreflang: every locale plus `x-default`, reciprocal. Add canonical = self. | **Yes (S)** |
| `design-density.spec.ts` (27KB) | At 1440: visual mass 15–50% (icons under 64px don't count); ≥8% after removing the largest element; no bare-photo section or >85vh full-bleed outside the hero; ≤~1/3 sections with no visual; ≤3 consecutive same-background sections; ≤2 uniform N-up grids; section fill; **ΔL\* ≥ 25 band vs canvas in both schemes**. Sections are `document.querySelectorAll("section")`; media is `img,video,canvas,svg,picture>img`. Deliberately not checked: 60/30/10 and accent recurrence. | thresholds calibrated on two local-business sites ([repo: .claude/project-info/memory/design-quality-measurements.md]) | **Scope it to visual-led routes** (home, `/work/*`, `/my-life`). Text-led pages (`/blog/*`, `/cv`, `/privacy`) will fail the mass floor by design. Every portfolio section must be a real `<section>`. R3F `canvas` already counts as media. Re-calibrate after the first real home build, and record the numbers in `run-notes.md`. | **Phase 1 late or Phase 2 (M).** It is worth it, but only once sections exist. |
| `home.spec.ts` | `/` redirects to a locale, and the home page has no console errors. | `proxy.ts` redirect | `astro preview` does **not** apply `vercel.json` redirects. The landing serves a `noindex` meta-refresh `index.astro` as the fallback (reuse audit §2.1). Assert the fallback, and keep the console-error check. | **Yes (S)** |
| `health.spec.ts` | `/[locale]/health` must show "Database healthy" or "All good". | Supabase only | **Skip.** Replace it with a **contact-form flow spec**: `page.route('/api/contact')` mocked for 200, 400, 429 and 500; empty, whitespace and invalid input; the Turnstile widget present; the live-region announcement. This is the edge-case list from the `code` skill step 5. | **Yes (S)** as the replacement |
| `admin.spec.ts` | The `/admin` panel. | — | Skip. | No |

### 5.3 The visual QA loop itself (no script)

This is the screenshot loop in [tpl: usage/playwright.md] and the `code` skill step 7. It is the most valuable non-script piece. Port its procedure:

1. Run a prod build plus preview.
2. Take Playwright-MCP shots at **390/1024/1920**.
3. **Score against the rubric** and iterate to ≥8. Anchor the score with `measure-views.js` (§4.1).
4. Do **one dark pass** before finishing.
5. **Commit the proof**: the final 1920 and 390 webp in `screenshots/<route>/` plus `screenshots/VISUAL-QA.md`; scratch work goes in the gitignored `screenshots/.work/`.
6. **Never write a blocking wait loop.** Use `run_in_background` and `Monitor`.

---

## 6. Recommended Phase 1 port list (in order)

Effort: **S** ≤ 1h, **M** a few hours, **L** a day or more.

1. **Write `CLAUDE.md`** (currently 0 bytes). Port the template's generic sections: Quality bar, Long-running commands, Verify at the right granularity, Knowledge gaps, IMPORTANT.md, Project Wiki with the `log.md` line format, Project memory. Write an **Astro Context Routing table** pointing at the pages below. The `code` skill is blind without it. **S–M**
2. **Port the security hooks**: `.agents/security/read-safe-files-only.mjs`, `sensitive-files.json`, the `settings.json` deny list and `.githooks/pre-commit` (with `PUBLIC_` and Resend patterns). **S**
3. **`design-quality.md`**, adapted per §2.7, and **`color.md`**, almost as-is. Also put `design-quality-measurements.md` in `memory/` as the evidence appendix. **S–M**
4. **`fonts.md` + `fonts/*.png`**, with the Astro install path and the **latin-ext fix**. See reuse audit §6.2 for the landing's build-time subsetting `scripts/fonts.mjs`. **S**
5. **`accessibility.md`** (moved to 2.2 AA, plus canvas/WebGL/code-block rules) and **`performance.md`** (islands, plus R3F/GSAP budgets). **M**
6. **`usage/motion.md`**, rewritten for CSS + GSAP + R3F, keeping the EASE/duration tokens and the LCP rules. Also port the `.enter*` CSS from `packages/shared/src/global.css`. **M**
7. **`usage/tailwind.md`** (Tailwind 4 `@theme`, double dark block, decide on a toggle), **`usage/lingui.md`** (pipeline plus verification; Astro wiring per reuse audit §2.5) and a new **`usage/astro.md`**. **M**
8. **`seo.md`**, adapted: Astro head component, Person/ProfilePage JSON-LD, launch gate, hreflang/og rules. **M**
9. **`memory/run-notes.md`** as-is, plus **`important-notice`** as-is, so `IMPORTANT.md` exists. **S**
10. **e2e base**: `playwright.config.ts` on `astro preview`, `routes.ts` reading `dist/`, then **`contrast`** (+canvas), **`layout`**, **`lcp`**, **`links`**, **`metadata`** and **`home`**. Then the **contact-flow spec** instead of `health`. **M** overall, S each.
11. **`usage/playwright.md`** (the visual QA loop, adapted) and **`measure-views.js`** wired into it. **S–M**
12. **`translate`** + **`verify-i18n.mjs`** (re-pointed paths, fail loudly when catalogs are missing). **S**
13. **Lighthouse script**: the landing's Astro `scripts/lighthouse.mjs`, plus the template's fail-open, report and history. Then de-Next the existing **`lighthouse-qa`** skill and **`usage/lighthouse.md`**. Raise Perf to ≥90 mobile per the brief. **S–M**
14. **Patch the portfolio's `code` skill** for Astro: step 2 conventions (no turborepo, aliases), step 7 commands (`astro build && astro preview`), drop the `health`/Supabase gate, make the finish-gate references conditional on whether `finish-gate.mjs` exists. **Patch `wiki-lint`** to route to `start-project-info --repair` instead of gen-\*. **S–M**
15. **`gen-design`**, adapted, then run it to produce `design.md`. **M**
16. **`usage/resend.md`** + `react-hook-forms-zod.md` (lite) + a new `usage/turnstile.md` when the contact function is built. **S–M**

**Phase 2** (once the site has sections):

- `design-density.spec.ts`, scoped and recalibrated (M);
- `gen-compliance-and-data`, then `code-legal-pages` (S, then M);
- `write-blog` (M–L);
- a slim `finish-gate.mjs` Stop hook plus `diff-scope.mjs` with Astro regexes (M);
- `stop-session`/`session-handoff` path fixes (S);
- `gen-analytics` for Umami (S);
- `verify-assets` checks 1, 3 and 4 (S).

---

## Not covered

- The PstrykWeb landing **app** code (`apps/pstrykweb.pl/**`: its scripts, specs, layouts, i18n, legal pages). It is listed above only as a pointer. It is covered by the other agent in `2026-10-05-pstryk-reuse-audit.md`.
- The Next template's app code beyond the e2e specs and `playwright.config.ts`. `lib/seo.ts`, `lib/metadata.ts`, `scripts/make-icons.mjs`, `scripts/localize-images.mjs` and the components were seen only by name.
- The full bodies of these were read only through headers and key sections:
  - `fonts.md` (catalog rows);
  - `gen-design` (the 15 directions and the anti-slop bank);
  - `scrape-website`;
  - `self-improve` Phases 3–5;
  - `write-pstrykweb-blog/scripts/blog.py`;
  - the template `CLAUDE.md` safety/provenance sections;
  - `verify-visual-qa.mjs` past its header.
- `usage/mobbin.md`, `shadcn-ui.md`, `magic-ui.md`, `aceternity-ui.md`, `tanstack-query.md`, `supabase.md`, `turborepo.md` and `sentry.md` were read at heading level only, enough for a verdict. Their rule lists were not extracted.
- The template's `packages/shared/src/global.css`: the `.enter*` and `.reveal` classes and the token blocks to port were not opened.
- `docs/RUNS.md`, `.gitlab-ci.yml`, `.vscode/`, `eslint.config.js`, `tailwind.config.base.js` and `turbo.json` from the template root.
- Nothing was run. No script or spec was executed; all verdicts come from reading the source.
- **Open items to verify**, flagged in the text above:
  - whether `astro preview` works with the chosen Vercel adapter, or whether the contact function should live in Vercel's root `api/` so Astro can stay adapter-free;
  - the "lingui-translate-ai" tool's existence and current API;
  - whether Lingui compile includes `#, fuzzy` entries;
  - Turnstile's cookie posture for the no-banner decision;
  - the Resend and Turnstile secret-key formats for the pre-commit patterns.
