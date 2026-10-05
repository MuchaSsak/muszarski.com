# PstrykWeb turborepo: reuse audit for the portfolio

Date: 2026-10-05. Read-only audit of the user's own production repo `context/pstryk-turborepo`. The focus is its landing app `apps/pstrykweb.pl` (Astro 7.3.5 + React TSX + MDX + Tailwind 4.3, static, on Vercel), plus the Lingui implementation in the Next app `apps/app.pstrykweb.pl` and the shared locale helpers. Citations use `[repo: path]`, relative to `context/pstryk-turborepo/`.

How to read the verdicts: **reuse** = copy almost as-is (rename brand and locales). **adapt** = keep the idea and most of the code, but change it for the portfolio. **skip** = PstrykWeb-specific, or too heavy for a portfolio.

Status note: the landing is **built but mid-launch**. LEGAL.md says "Being launched (2026-10-02)", the plan still says Phase 1 "IN PROGRESS", and the placeholder Realizacje plus the counsel review of the legal texts are open [repo: .claude/project-info/legal/LEGAL.md § 2] [repo: .claude/project-info/plans/landing-v2.md § Status snapshot] [repo: .claude/project-info/known-issues.md § Landing v2]. Its Lighthouse numbers are therefore lab numbers on review builds, not field data.

---

## 1. Summary table

| Piece | Path (under `apps/pstrykweb.pl/` unless noted) | What it does | Verdict | Gotchas |
|---|---|---|---|---|
| Astro config | `astro.config.mjs` | Static output, `trailingSlash: "always"`, directory format, inlined CSS, React + MDX, Tailwind via Vite, CSP, typed `astro:env` schema | **Adapt** | No adapter: the portfolio needs `@astrojs/vercel` for the one contact function. `smartypants: false` and `syntaxHighlight: false` (CSP vs Shiki inline styles) |
| Vercel config | `vercel.json` | Host 308s to the canonical domain, `/` → `/pl/` 308, alias-segment redirects, security headers, immutable cache for `/_astro`, `/fonts`, `/media` | **Reuse** | `frame-ancestors` must be a header (meta CSP ignores it) |
| Build gates | `package.json` `build` | `astro build` → seo-gate → links → launch-gate, all on `dist/` | **Adapt** (drop seo-gate) | Gates run after the build: a failure still leaves a `dist/` behind |
| Link ratchet | `scripts/links.mjs` + `pending-links.json` | Every internal href and `#anchor` resolves; the pending list may only shrink | **Reuse as-is** | — |
| Launch gate | `scripts/launch-gate.mjs`, `scripts/launch.mjs` | Fails production on placeholders, the review noindex, or an off-origin canonical / sitemap / robots | **Adapt** | Launch detection reads `VERCEL_PROJECT_PRODUCTION_URL` at build time: attach the domain *before* the production build |
| SEO uniqueness gate | `scripts/seo-gate.mjs` | Shingle-similarity gate for 787+ programmatic regional pages | **Skip** | — |
| Review noindex | `src/layouts/BaseLayout.astro` + `LAUNCH_BUILD` | Extra `noindex,nofollow` on every non-launch build | **Reuse** | Never set `LAUNCH_BUILD` by hand |
| Head / OG / JSON-LD layout | `src/layouts/BaseLayout.astro`, `src/lib/seo.ts` | Canonical, hreflang + x-default, full OG / Twitter, font + LCP preloads, Organization / WebSite / Breadcrumb / BlogPosting / Person / ProfilePage | **Adapt** | Swap Organization for a sitewide `Person`. hreflang uses bare codes; the header switcher uses `en-GB` (inconsistent) |
| Path builder | `src/lib/routes.ts` | One module for every path, `alternates()`, `switchPath()` | **Adapt** | Blog paths hard-code `pl`. The portfolio needs per-locale post slugs (`Route.kind: "path"`) |
| Locale helpers | `src/i18n/locales.ts`, [repo: packages/shared/src/lib/localeCodes.ts] | Segment ↔ locale (`eng` ↔ `en`), `htmlLang`, `hreflangCode`, `ogLocale` | **Adapt** (drop the `eng` mapping) | `eng` was legacy only |
| Typed dictionaries | `src/i18n/index.ts`, `src/i18n/dict/{pl,en,uk}.ts`, `waitlist.ts` | `t(segment)` returns a typed object; `fmt()`; a waitlist overlay swaps CTAs by an env flag | **Fallback** if Lingui-in-Astro misbehaves | Long files (≈ 650 lines per locale); no `.po` translator workflow |
| Lingui (Next app) | [repo: apps/app.pstrykweb.pl/lingui.config.ts], [repo: apps/app.pstrykweb.pl/lib/i18n.server.ts], [repo: apps/app.pstrykweb.pl/proxy.ts] | en source, `--strict` compile, cached per-locale instance, 308 locale proxy | **Adapt the config + strict workflow** (no proxy needed: static redirects) | React Compiler breaks macro ids; Next 16.3 breaks the SWC plugin |
| Sitemaps / robots | `src/lib/sitemap.ts`, `src/pages/sitemap.xml.ts`, `src/pages/sitemaps/*`, `src/pages/robots.txt.ts` | Index + children per type × locale; lastmod only from content dates | **Reuse** | Don't use `@astrojs/sitemap` when slugs are translated |
| IndexNow | `scripts/indexnow.mjs`, `src/pages/[indexnow].txt.ts` | Live-vs-built sitemap diff → api.indexnow.org | **Optional** | Run after the deploy is live; a dry run is the default |
| OG images | `scripts/og-images.mjs` | Playwright shot of each page's hero at 1200 × 630, reduced motion; placeholder ledger | **Adapt** | Committed JPEGs go stale; consider a dedicated OG layout |
| Blog collection + pages | `src/content.config.ts`, `src/pages/[seg]/blog/*`, `src/components/blog/*`, `src/lib/blog*.ts` | Zod schema with dated `sources`, named author enum, BlogPosting, RSS, TOC, related posts, reading time | **Adapt** (also as the `work` collection) | PL-only and single-locale by design; covers are brand-specific |
| Authors | `src/data/authors.ts`, `src/pages/[seg]/blog/autor/[author].astro` | One record per person; author page; ProfilePage; "only true facts" | **Adapt** (merge into `/about`) | — |
| Blog skill | [repo: .claude/skills/write-pstrykweb-blog/], `scripts/blog-skill*.mjs` | Research → claim ledger → fetch-quote → fact-check → lint → standalone HTML; assets synced from the build | **Adapt** (fork as a portfolio post / case-study skill) | Sync-hash test needs a rebuild after every CSS change |
| Legal docs | `src/content/legal/<locale>/*.md`, `src/pages/[seg]/[dokument]/index.astro`, `src/lib/legal.ts`, `src/components/legal/LegalPage.tsx` | Markdown per locale, `{{tokens}}` from one constant, language-free anchors, print / PDF, "translated from Polish", internal `counselReview` | **Reuse the mechanism, rewrite the texts** | The texts are for CETUSPRO sp. z o.o. + konfigurator / viewer / Tally; counsel review is pending for all |
| Analytics | `src/scripts/analytics.ts` | Umami Cloud after load + idle; URL / referrer sanitised; opt-out key; GPC / DNT | **Reuse as-is** | Banner-less position is "defensible", not counsel-approved; collect host is `gateway.umami.is` (CSP) |
| Fonts | `scripts/fonts.mjs` → `public/fonts/*`, `src/styles/fonts.css`, `src/lib/fonts.gen.ts` | Variable OFL source → pinned axes → PL + Cyrillic subsets → metric-matched fallbacks | **Reuse** (Latin-Ext for es) | Outputs are committed; re-run on type change |
| Video | `scripts/encode-video.mjs`, `scripts/captions.mjs` | H.264 loops CRF 30, film CRF 26 + AAC 64k mono, AVIF / WebP poster, hashed names, VTT per locale | **Reuse** | Start playback only after interaction + 30 % in view |
| Images | `src/lib/images.ts`, `src/components/ui/Picture.tsx` | `getImage()` → AVIF + WebP srcsets, intrinsic size, only the LCP image eager / high | **Reuse as-is** | Global `img, video { height: auto }` |
| PauseMotion | `src/components/ui/PauseMotion.tsx` + `styles/global.css` | CSS-only page-wide pause (`html:has(#pw-pause-motion:checked)`) | **Adapt** (more visible; persist the choice) | Footer placement is a known 2.2.2 weakness |
| Shader | `src/scripts/shader.ts` | Raw WebGL 1, ~2 KB; after load + first interaction + idle + near viewport; hardware GL only; 30 fps; freeze < 24 fps; CSS fallback | **Reuse the contract** for the R3F signature moment | Software GL ≈ 770 ms main thread |
| Frames | `src/components/ui/Frames.tsx` | Static SVG / HTML browser + phone frames (0 KB JS), a "sample" chip | **Adapt** (case-study screenshots) | Brand-styled |
| Section / Headline | `src/components/ui/Section.tsx`, `src/components/ui/Headline.tsx` | Background-rhythm bands; split headline with highlight + Polish orphan glue | **Adapt** (the glue logic for `/pl/`) | The highlight animates, the text never does (LCP) |
| Header / Footer | `src/components/layout/Header.tsx`, `Footer.tsx`, `StickyCta.tsx` | Native-popover menus + language switcher; footer with legal line + pause switch; phone sticky CTA | **Adapt** | KSH footer data is company-only |
| 404 | `src/pages/404.astro` | One file for all locales; CSP-hashed pre-paint language pick | **Reuse the pattern** | — |
| Content tests | `src/**/*.test.ts`, `scripts/*.test.mjs`, `vitest.config.ts` | Dashes / NBSP, legal parity, sitemap / OG, stats-to-quote, contrast | **Reuse the idea** | — |
| E2E | `playwright.config.ts`, `tests/e2e/*` | Every page × 5 widths: overflow, console, 200s; axe WCAG 2.2 AA at 390 / 1440; behaviour (Esc / focus, switcher, reduced motion, pause) | **Reuse almost as-is** | Run against `astro preview` of `dist/`, never dev |
| Lighthouse | `scripts/lighthouse.mjs` | 3-run mobile median vs budgets, exit 1 on a miss | **Reuse** | Skips `is-crawlable` on noindex review builds |
| Screenshots | `scripts/shots.mjs`, `scripts/portfolio-shots.mjs` | QA shots (widths, frames, per-selector); clean tall strips of live sites | **Reuse** | — |
| Regional / geo layer | `src/lib/geo/*`, `src/components/regions/*`, `data/geo/*` | GUS BDL-driven programmatic pages | **Skip** | — |
| Konfigurator prefill / waitlist | `src/lib/konfigurator.ts`, `src/i18n/dict/waitlist.ts` | CTA URLs with a `#fragment` prefill; pre-launch overlay | **Skip** (keep the "PII only in fragments" rule) | — |

---

## 2. i18n deep-dive

### 2.1 The URL scheme exactly as built

| Rule | What the code does | Source |
|---|---|---|
| Locales / segments | URL segments `pl` (default), `eng`, `uk`. Content/catalog ids are ISO `pl`, `en`, `uk`. `eng` never reaches `Intl`, `<html lang>`, content lookups or anything sent to the app | [repo: apps/pstrykweb.pl/src/i18n/locales.ts] [repo: packages/shared/src/lib/localeCodes.ts] |
| Prefix | **Always**, Polish included (`/pl/`). Every route lives under `src/pages/[seg]/…` | [repo: apps/pstrykweb.pl/src/pages/[seg]/] |
| Root `/` | Landing: **permanent** redirect `/` → `/pl/` in `vercel.json`. `src/pages/index.astro` is only a fallback for `astro preview` and other static hosts: a `noindex` page with a meta refresh, a canonical to `/pl/` and a dark background so there is no white flash | [repo: apps/pstrykweb.pl/vercel.json] [repo: apps/pstrykweb.pl/src/pages/index.astro] |
| Root `/` in the Next app | `proxy.ts` sends `/` to `/pl/` with a **308**. The reason is in a code comment: "a temporary redirect would keep the bare path as a canonical candidate" | [repo: apps/app.pstrykweb.pl/proxy.ts] |
| Foreign / alias segments | Landing (static): `vercel.json` sends `/en/*` → `/eng/*` and `/ua/*` → `/uk/*` (permanent). App (`proxy.ts`): a first segment shaped like a locale (`/^[a-z]{2,3}(-[a-z]{2})?$/i`) is **replaced**, never prefixed (`/de/x/` → `/pl/x/`, never `/pl/de/x/`), with aliases `en→eng` and `ua→uk`. Anything else gets `/pl` prepended. The query string is kept. The matcher skips `api`, `_next/*` and any path with a dot | [repo: apps/pstrykweb.pl/vercel.json] [repo: apps/app.pstrykweb.pl/proxy.ts] |
| Trailing slash | Always. Astro `trailingSlash: "always"` + `build.format: "directory"`; Vercel `"trailingSlash": true`; Next `trailingSlash: true` (the app also builds its API paths with the slash, so a POST never goes through a 308) | [repo: apps/pstrykweb.pl/astro.config.mjs] [repo: apps/app.pstrykweb.pl/next.config.ts] |
| One path builder | `src/lib/routes.ts` is "the ONE module that builds landing paths". It provides `pagePath` / `pathTo` / `industryPath` / `blogPath` / `authorPath`, `alternates(route)` (hreflang pairs) and `switchPath(route, target)`. A typed `Route` union (`page` / `industry` / `blogPost` / `path`) is passed to the layout, so canonical, hreflang, the switcher and the sitemaps all come from one place | [repo: apps/pstrykweb.pl/src/lib/routes.ts] |
| Translated slugs | Marketing pages and industries have a slug per locale: `cennik` / `pricing` / `tsiny`, `/pl/kancelaria-prawna/` ↔ `/eng/law-firm/` ↔ `/uk/yurydychna-firma/`. The table is `LANDING_PAGE_SLUGS` in `packages/shared/src/lib/constants.ts`, so the app links the same slugs. A missing locale entry means "this page doesn't exist there" | [repo: apps/pstrykweb.pl/src/lib/routes.ts] [repo: .claude/project-info/conventions/i18n-and-routing.md] |
| Untranslated slugs | Legal and utility pages use **one Polish slug in every locale**: `/eng/polityka-prywatnosci/`, `/uk/regulamin/`, `/eng/klauzula-rodo/` | [repo: apps/pstrykweb.pl/src/pages/[seg]/[dokument]/index.astro] [repo: .claude/project-info/landing/compliance.md § 5] |
| Single-locale sections | The blog is **Polish-only** (`blogPath()` hard-codes `pl`; `blogSegments()` returns only the locales whose page table has a blog slug). Pages that exist in one locale get **no hreflang at all**, not even a lone self-reference (`hreflang={false}` on author pages; `pairs` are emitted only when there are 2+ versions) | [repo: apps/pstrykweb.pl/src/lib/routes.ts] [repo: apps/pstrykweb.pl/src/layouts/BaseLayout.astro] |
| `<html lang>` | `pl-PL` / `en-GB` / `uk-UA` (`toHtmlLang` in shared) | [repo: packages/shared/src/lib/localeCodes.ts] |
| hreflang in `<head>` | **Bare languages** `pl` / `en` / `uk` (`hreflangCode()`). The comment's reason: "The audience lives in Poland whatever language it reads, so a region (`en-GB` = 'English for the UK') would target the wrong country". `x-default` → the `pl` version, when one exists | [repo: apps/pstrykweb.pl/src/i18n/locales.ts] [repo: apps/pstrykweb.pl/src/layouts/BaseLayout.astro] |
| og:locale | `pl_PL` / `en_GB` / `uk_UA`, plus `og:locale:alternate` for the other existing versions | [repo: apps/pstrykweb.pl/src/i18n/locales.ts] |
| Language switcher | A pill button (round flag SVG + `PL`/`EN`/`UK`) opens a **native `popover`** (light dismiss, Esc and focus return come free, 0 KB framework JS). Links go to `switchPath(route, target)`: the same page in the target locale, **else that locale's home**. Each link carries `hrefLang` + `lang`, and the current one has `aria-current` and a check icon. On phones it is a 3-way switch inside the menu sheet | [repo: apps/pstrykweb.pl/src/components/layout/Header.tsx] |
| 404 | One static `404.html` for every locale. A tiny inline script (allowed by a **CSP hash computed at build**, `Astro.csp.insertScriptHash`) reads the first path segment before first paint and swaps `lang`, the title and the visible copy, so `/eng/` never flashes Polish | [repo: apps/pstrykweb.pl/src/pages/404.astro] |

**Why `eng` and not `en`.** The segment was inherited. The old landing (a separate repo, next-intl) already used `/pl/ /eng/ /uk/`, and v2 keeps that scheme "so existing URLs keep working" [repo: .claude/project-info/plans/landing-v2.md § Current facts]. The app and the viewer then copied the landing so its CTAs, flags and hreflang line up [repo: .claude/project-info/conventions/i18n-and-routing.md]. Nothing in the repo argues that `eng` is better. It costs a mapping helper (`toUrlSegment` / `fromUrlSegment`) and a standing rule that `eng` must never leak. **The portfolio has no legacy URLs, so it should use plain `en` / `pl` / `es` segments.** That removes the whole mapping layer (segment = locale id).

Small inconsistencies found (worth avoiding in the portfolio):
- The wiki says hreflang = `pl-PL` / `en-GB` / `uk-UA` and `/` → `/pl/` is "non-permanent" [repo: .claude/project-info/conventions/i18n-and-routing.md]. The code uses bare hreflang codes and a permanent redirect. In this repo, code wins.
- The header switcher's `<a hrefLang>` uses `en-GB` / `pl-PL` / `uk-UA` while the `<head>` alternates use bare codes [repo: apps/pstrykweb.pl/src/components/layout/Header.tsx]. This is harmless but inconsistent. Pick one helper.

### 2.2 How the landing localizes: typed dictionaries, not Lingui

- `src/i18n/dict/pl.ts` is the **source** (≈ 660 lines). `en.ts` / `uk.ts` are typed `: Dict` (the type of `pl`), so a missing key or a shape drift is a compile error [repo: apps/pstrykweb.pl/src/i18n/dict/pl.ts] [repo: apps/pstrykweb.pl/src/i18n/dict/en.ts].
- `t(segment)` returns the whole dictionary object for a locale. `fmt(template, vars)` fills `{placeholders}`. `formatDate()` uses `Intl.DateTimeFormat` in `Europe/Warsaw` [repo: apps/pstrykweb.pl/src/i18n/index.ts].
- Headlines are split `{ p1, hl, p2 }` (plain part, highlighted fragment, period). Prices are never typed in copy: they come from `src/data/pricing.ts` via placeholders [repo: apps/pstrykweb.pl/src/i18n/dict/pl.ts].
- A variant layer: `withWaitlist(dict, WAITLIST[locale])` swaps every CTA while the `IS_OPEN_TO_PUBLIC` switch is off. This is a neat pattern for an "available for hire / not available" switch [repo: apps/pstrykweb.pl/src/i18n/index.ts] [repo: apps/pstrykweb.pl/src/i18n/dict/waitlist.ts].
- A unit test bans raw no-break spaces (they must be written as the 6-character backslash-u escape of U+00A0) and en/em dashes in the dictionaries. Its comment says Claude's edit tools had silently decoded escapes into real characters [repo: apps/pstrykweb.pl/src/i18n/dict/escapes.test.ts].
- Long-form content (blog MDX, legal Markdown) does not use the dictionaries at all. It lives in **per-locale content collections** (`src/content/legal/<locale>/<slug>.md`) or in a single locale (the blog) [repo: apps/pstrykweb.pl/src/content.config.ts].

**Why the landing chose dictionaries.** The plan's Tech table, i18n row: "`[locale]` routes + typed per-locale dictionaries (pl source, eng, uk) + per-locale content collections … marketing copy is content; `lingui-for-astro` 0.7.1 + Lingui 6.8 verified to work if the `.po` workflow is wanted (pre-1.0, no MDX)" [repo: .claude/project-info/plans/landing-v2.md § Tech]. The dictionary header comment adds: "marketing copy is content, so no .po workflow" [repo: apps/pstrykweb.pl/src/i18n/index.ts]. The decision was made for practical reasons, not because Lingui failed. The spike worked.

### 2.3 The lingui-for-astro spike (what the repo records)

All the detail the repo keeps is in two places. The raw spike code lived in the gitignored `context/landing-v2/lab/`, which is **not** in this copy of the repo.

- Versions: **`lingui-for-astro` 0.7.1 + Lingui 6.8**, on Astro 7.3.5 [repo: .claude/project-info/landing/research.md § 6].
- Result: "Lingui in Astro works". The recorded limits are: **per-island providers**; **catalog-as-props embeds the whole catalog**; **no MDX**; **pre-1.0** [repo: .claude/project-info/landing/research.md § 6].
- Contrast with Next: "**Lingui in Next 16.3 is broken**". `@lingui/swc-plugin` 6.7.0 fails with webpack, and Turbopack skips the macro. The repo's Next 16.2.10 + plugin 6.5.1 works with webpack only. Known-issues therefore says "don't upgrade the Next apps to 16.3 yet" [repo: .claude/project-info/landing/research.md § 6] [repo: .claude/project-info/known-issues.md § Repo tooling].
- Checked today on npm (2026-10-05): `lingui-for-astro` is still **0.7.1** (published 2026-09-02); its peers are Astro ^5 / ^6 / ^7 and Lingui ^5 / ^6. `@lingui/core` latest is **6.9.0**; `astro` latest is **7.3.5**. Its README confirms the limits:
  - it transforms `.astro` files only;
  - islands need "the corresponding Lingui integration for that framework";
  - "MDX is not supported … keep separate `.mdx` files per locale";
  - the Lingui context is request-scoped and set up in middleware (`setLinguiContext(context.locals, i18n)`);
  - macros in plain `.ts` need `unplugin-lingui-macro`.

What the limits mean in practice:
- **Per-island providers.** Astro renders every React component used from `.astro` as its own root, so there is no shared React context across the page. Each React root (hydrated or not) needs its own `<I18nProvider>`, or it must receive already-translated strings.
- **Catalog-as-props.** A hydrated island that runs Lingui in the browser needs its messages passed as island props. Astro serializes island props into the HTML, so the whole locale catalog gets embedded once per island unless it is trimmed.
- **No MDX.** Lingui macros don't work inside MDX bodies. Long-form text stays one file per locale.

### 2.4 How the Next app wires Lingui (the reference for "Lingui + /<locale>/")

- `lingui.config.ts`: `sourceLocale: "en"`, `locales: ["en","pl","uk"]`, `fallbackLocales.default: "en"`, one catalog at `locales/{locale}/messages` [repo: apps/app.pstrykweb.pl/lingui.config.ts].
- Scripts:
  - `translate` = `lingui extract --clean` + compile;
  - `i18n:compile` = `lingui compile --typescript --strict`;
  - `build` = compile, then `next build --webpack`.

  `--strict` makes a missing translation (or a stale compiled `messages.ts`) **fail the build** instead of shipping a hash. The compiled `messages.ts` files are committed [repo: apps/app.pstrykweb.pl/package.json] [repo: .claude/project-info/conventions/i18n-and-routing.md].
- Ids: `useLinguiV5IdGeneration` (source string = id, hashed). A string missing from the compiled catalog renders its **hash** in production [repo: .claude/project-info/conventions/i18n-and-routing.md].
- Server: `lib/i18n.server.ts` uses static per-locale imports (no template-path dynamic import), a `cache()`d `getI18n(locale)` and `initLingui()` → `setI18n` for RSC [repo: apps/app.pstrykweb.pl/lib/i18n.server.ts]. The `[locale]/layout.tsx` owns `<html lang>`, runs `generateStaticParams` over the 3 segments and calls `notFound()` for anything else. It deliberately does **not** set `dynamicParams = false`, because that would cascade to child segments and break a foreign-slug 308 [repo: apps/app.pstrykweb.pl/app/[locale]/layout.tsx].
- Gotchas recorded in code:
  - **The React Compiler is OFF** because it runs before the Lingui SWC plugin and renames variables inside `t` / `<Trans>`, so the hashed id no longer matches the catalog and the raw id shows up [repo: apps/app.pstrykweb.pl/next.config.ts].
  - Interpolated values should be local variables so the msgid gets a readable placeholder name.
  - Same English word, two meanings → `context` [repo: .claude/project-info/conventions/i18n-and-routing.md].
  - AI fill uses `lingui-translate-ai.json` (OpenRouter, empty strings only) or the `translate` skill, followed by an alignment check: every msgid filled, placeholders and `<n>` tags identical, ICU plurals complete [repo: lingui-translate-ai.json] [repo: .claude/project-info/conventions/i18n-and-routing.md].

### 2.5 Recommendation for the portfolio (Astro 7 + React islands, en source, pl + es)

**URL scheme**

| Rule | Recommendation |
|---|---|
| Segments | `/en/` (default), `/pl/`, `/es/`, always prefixed. Segment = Lingui locale id (no `eng` mapping). Keep one tiny `locales.ts` (`LOCALES`, `isLocale`, `htmlLang`, `hreflang`, `ogLocale`) like the landing's |
| Root | `vercel.json` `/` → `/en/` **308**. Keep a fallback `src/pages/index.astro` (noindex, meta refresh, canonical `/en/`, same background colour) for `astro preview` |
| Aliases | Optional `vercel.json` permanent redirects for likely mistypes (e.g. `/pl-pl/*` → `/pl/*`). There is no `/eng/` legacy to cover |
| Trailing slash | Always (`trailingSlash: "always"`, `build.format: "directory"`, Vercel `trailingSlash: true`). Make the contact function's endpoint path end with a slash too, so its POST isn't redirected |
| `<html lang>` | `en`, `pl-PL`, `es`. Use a region only where it is true; plain `en` avoids implying en-GB/en-US |
| hreflang | Bare `en` / `pl` / `es` + `x-default` → `/en/`. Reciprocal and self-referencing, generated from one `alternates(route)` |
| og:locale | `en_US` or `en_GB` (pick one), `pl_PL`, `es_ES`; plus `og:locale:alternate` |
| Slugs | Translate only where a searcher would type the word: `/en/work/<slug>/` stays `work` in all locales, and project slugs are usually brand names and stay identical. Blog post slugs per locale can differ (`/pl/blog/<pl-slug>/`), so model them like the landing's `Route { kind: "path", paths: {en, pl, es} }`. Legal: one slug per page across locales (the landing's rule), e.g. `/pl/privacy/`, or translate them; either is fine, just be consistent |
| Single-locale pages | A post that exists only in Polish gets no hreflang. The switcher falls back to the target locale's blog index (the landing falls back to home; a section index is kinder) |
| Switcher | Copy the native-`popover` pill (0 KB JS) and `switchPath(route, target)` |

**Lingui wiring.** Recommended split: Lingui for UI chrome, content collections for long-form.

1. **Catalogs.** `lingui.config.ts` with `sourceLocale: "en"`, `locales: ["en","pl","es"]`, `fallbackLocales: { default: "en" }`, one catalog `src/locales/{locale}/messages`. Extractors: `astroExtractor` (from `lingui-for-astro/extractor`) + the babel extractor, so strings in `.astro` and `.tsx` are both extracted. Scripts: `i18n:extract` = `lingui extract --clean`; `i18n:compile` = `lingui compile --typescript --strict`; `build` = compile, then `astro build`. Commit the compiled files, and let a missing pl/es translation fail the build (the app's rule).
2. **Macros.**
   - `.astro` files (routes, layout, `<head>`): `lingui-for-astro/integration` + `lingui-for-astro/macro`.
   - React TSX: the Lingui React macros (`@lingui/react/macro` `<Trans>`, `useLingui`) compiled through `unplugin-lingui-macro/vite`, or babel-plugin-lingui-macro via the `@astrojs/react` babel option.
   - Keep the React Compiler off, or verify it doesn't rename macro variables (the app's gotcha).
3. **Request context.** Astro middleware runs for prerendered pages at build time. In `src/middleware.ts`, read the locale from `context.params.locale` (or the first path segment), `setupI18n({ locale, messages: { [locale]: compiled[locale] } })` and `setLinguiContext(context.locals, i18n)`. Each page's `getStaticPaths` yields the 3 locales.
4. **React trees: no shared context, so use explicit instances.**
   - **The landing's real pattern (verified):** there is **no `client:*` directive anywhere in `apps/pstrykweb.pl/src`**. React is only a build-time templating language. Every section (`<Hero segment>`, `<Pricing segment>` …) is its own React root, called from the `.astro` page with a `segment` prop, and calls `t(segment)` itself [repo: apps/pstrykweb.pl/src/pages/[seg]/index.astro].
   - All interactivity is plain TS modules imported from `<script>` tags (`src/scripts/*.ts`: menus, film, motion, analytics, shader), plus CSS (`:has()`, native `popover`, `<details name>`).
   - The `@astrojs/react` client bundle (`dist/_astro/client.*.js`, 191 KB raw) is emitted but **referenced by no HTML page** (checked with grep over `dist/`).
   - For Lingui this means: create **one cached `I18n` instance per locale** (`getI18n(locale)`, as in the app's `i18n.server.ts`) and pass the locale (or the instance) as a prop.
   - In components, resolve strings with `msg` descriptors + `i18n._(…)`, or the `t(i18n)` macro form. This needs no React context and works in `.astro`, TSX and plain TS alike.
   - Use `<Trans>` (rich text with inline JSX) only inside a small `<I18nProvider i18n={getI18n(locale)}>` wrapper, placed at each React root that needs it. That wrapper is the "per-island provider" limit, and it costs 0 KB in the browser when nothing hydrates.
   - Never rely on a global `i18n.activate()` during a multi-locale static build. Astro's default `build.concurrency` is 1, but it is still fragile.
5. **Hydrated islands, if any** (contact form, ⌘K palette, 3D canvas controls):
   - Prefer the landing's approach of vanilla TS + DOM over hydrating React.
   - If one must hydrate, give it **already-translated strings as props**, resolved at build. Then no Lingui runtime or catalog reaches the browser, which avoids the "catalog-as-props embeds the whole catalog" cost.
   - Give an island its own provider plus a hand-picked message subset only when it truly renders dynamic, plural-heavy text at runtime.
6. **Long-form text:**
   - Case studies, blog posts and legal texts go in **per-locale content collections**, e.g. `src/content/work/{en,pl,es}/<slug>.mdx` and `src/content/legal/{en,pl,es}/<slug>.md`, never Lingui. This is the landing's legal pattern, and the only option for MDX anyway.
   - A test should assert that every entry exists in every locale it claims, and that headings and numbering match across locales (the landing's `legal.test.ts` pattern).
   - Allow an entry to be missing in a locale on purpose. pl/es then show "available in English" or simply have no page. Never fall back silently to English inside a `/pl/` URL.
7. **Fallback plan.** If the spike shows trouble with `lingui-for-astro` 0.7.x on Astro 7 (it is pre-1.0, a third-party project at github.com/SegaraRai/lingui-for, not part of Lingui itself), keep Lingui in React only, with no `.astro` strings: pass `title` / `description` into the layout from a React-side `i18n._(msg…)`. Or drop to the landing's typed dictionaries. That is a proven 0-dependency path, and `Dict` typing gives the same "missing key fails the build" guarantee that `--strict` gives Lingui.
8. **Spike before committing (≤ 2 h).** Check these on the real stack: Astro 7.3.5 + `@astrojs/react` 7 + Lingui 6.9 + `lingui-for-astro` 0.7.1 + `unplugin-lingui-macro`:
   - extract → compile `--strict` → build;
   - a non-hydrated React section shows the right locale in all 3 builds;
   - a hydrated island with props-only strings ships 0 B of catalog (grep `dist/_astro/*.js` for a known msgid hash);
   - `astro check` passes.

   The research spike reported that this worked on Lingui 6.8 [repo: .claude/project-info/landing/research.md § 6], but nothing here re-verified it.

---

## 3. SEO machinery

### 3.1 The build pipeline is the SEO gate

`bun run build` = `astro build && node scripts/seo-gate.mjs && node scripts/links.mjs && node scripts/launch-gate.mjs` [repo: apps/pstrykweb.pl/package.json]. Every check runs on the **built `dist/`**, not on the source.

| Script | What it checks / does | Portfolio verdict |
|---|---|---|
| `scripts/seo-gate.mjs` | Uniqueness gate for the **regional programmatic pages** only. For each page that would be `index`, it requires:<br>• ≥ 8 distinct `data-fact` keys inside `<main data-gate-main>`;<br>• an insight block;<br>• ≥ 150 page-specific words;<br>• 5-word-shingle Jaccard ≤ 0.40 against the 5 nearest + 20 random siblings, with numbers and place names masked;<br>• no prose lists of place names;<br>• a dated GUS source line and a snapshot ≤ 18 months old.<br>A failing page is rewritten to `noindex,follow` and removed from `dist/sitemaps/*.xml`; a failing hub fails the build. The report goes to `.cache/`, never into `dist/`. With `REGIONS_WAVE=off` it is a no-op [repo: apps/pstrykweb.pl/scripts/seo-gate.mjs] | **Skip.** A portfolio has no programmatic pages. The idea of "gate on built HTML, auto-noindex the weak page" is worth knowing if `/blog` tag pages ever multiply |
| `scripts/links.mjs` | Every internal `href="/…"` and every `#anchor` in `dist/` must resolve to a built file and an element id. Pages linked but not built yet go in `scripts/pending-links.json`. The ratchet: a new broken link fails, and a now-resolving pending entry ("stale") also fails, so the list only shrinks. `--update` rewrites the list. Reached 0 entries on 2026-09-30 [repo: apps/pstrykweb.pl/scripts/links.mjs] [repo: .claude/project-info/plans/landing-v2.md § Pending links] | **Reuse as-is** (63 lines, no dependencies). Ideal for building the portfolio page by page |
| `scripts/launch-gate.mjs` + `scripts/launch.mjs` | `isLaunchBuild()` = `VERCEL_ENV=production` **and** `VERCEL_PROJECT_PRODUCTION_URL` is one of our hosts (fail-closed: an unknown host counts as launch), or `--launch`. On the launch build it **fails** on:<br>• any `data-placeholder` in `dist/`;<br>• a non-empty `og-placeholders.json`;<br>• the review `noindex,nofollow`;<br>• a canonical / `og:url` / sitemap `<loc>` not on `https://pstrykweb.pl/`;<br>• a robots.txt `Sitemap:` line that isn't the canonical one.<br>It **warns** on `data-sample`. On review builds it only warns. `findings()` is pure and unit-tested [repo: apps/pstrykweb.pl/scripts/launch-gate.mjs] [repo: apps/pstrykweb.pl/scripts/launch.mjs] [repo: apps/pstrykweb.pl/scripts/launch-gate.test.mjs] | **Adapt.** Swap the origin for the portfolio domain and mark unfinished case studies or invented sample metrics with `data-placeholder`. This is exactly the "nothing fake reaches production" guard a portfolio with draft case studies needs |
| `scripts/lighthouse.mjs` (`bun run lhci`) | See § 6.6 | **Adapt** |

### 3.2 Review builds are never indexed

- `astro.config.mjs` sets `site` = `PUBLIC_SITE_URL` ?? `reviewSiteUrl()` (a private project's `https://<project>.vercel.app`, so share cards resolve on review deploys) ?? `https://pstrykweb.pl` [repo: apps/pstrykweb.pl/astro.config.mjs].
- `BaseLayout.astro` adds `<meta name="robots" content="noindex,nofollow">` when `LAUNCH_BUILD` is false. It is a **separate** robots meta next to the page's own `index,follow` (marked `data-gate`), relying on "crawlers apply the most restrictive robots meta". A third tag carries `max-image-preview:large` [repo: apps/pstrykweb.pl/src/layouts/BaseLayout.astro].
- `LAUNCH_BUILD` is an `envField.boolean` whose default is computed from Vercel's system env at build time. `.env.example` says "NEVER set it" [repo: .env.example § 8].
- The env-schema pattern itself is worth copying: `astro:env` `envField` with `context: client|server`, `access: public`, defaults and enums. An unset optional variable means "feature off, never faked" (e.g. unset `PUBLIC_UMAMI_WEBSITE_ID` = no analytics script) [repo: apps/pstrykweb.pl/astro.config.mjs].
- **Portfolio verdict: reuse.** It is simple and prevents the classic "preview URL got indexed" accident.

### 3.3 Sitemaps and robots

| Piece | As built | Source |
|---|---|---|
| Approach | Own static endpoints, **not** `@astrojs/sitemap`. That integration "can't pair translated slugs" (`kancelaria-prawna` ↔ `law-firm`), and hreflang lives in `<link>` tags anyway | [repo: .claude/project-info/plans/landing-v2.md § Tech] [repo: .claude/project-info/landing/research.md § 6] |
| Index | `/sitemap.xml` = `<sitemapindex>` → `/sitemaps/core-{pl,eng,uk}.xml` + `/sitemaps/blog-pl.xml` (+ regional children when a wave is on) | [repo: apps/pstrykweb.pl/src/pages/sitemap.xml.ts] [repo: apps/pstrykweb.pl/src/lib/sitemap.ts] |
| Core list | `CORE_ROUTES` in `src/lib/sitemap.ts` is "the ONE list" read by the core sitemaps, the OG-image script and the OG unit test. A page is added there in the same change that builds it | [repo: apps/pstrykweb.pl/src/lib/sitemap.ts] |
| lastmod | Only from a **content date** (a post's `updatedAt`; an author page = their newest post), never the build time. Core pages carry none yet. No `priority` / `changefreq` (Google ignores them) | [repo: apps/pstrykweb.pl/src/pages/sitemaps/blog-[seg].xml.ts] [repo: .claude/project-info/landing/seo.md § 14] |
| robots.txt | `User-agent: * / Allow: /` + `Sitemap: <SITE_URL>/sitemap.xml`. Never block a noindex page (noindex must stay crawlable) | [repo: apps/pstrykweb.pl/src/pages/robots.txt.ts] |
| Tests | `sitemap.test.ts`: each core page listed once per locale, valid-looking XML, lastmod never the build time, and a share image exists for every core page, post and author page | [repo: apps/pstrykweb.pl/src/lib/sitemap.test.ts] |

**Portfolio verdict: reuse.** `sitemap.ts` + the three endpoint files are about 120 lines. Children: `core-{en,pl,es}.xml`, `work-*.xml`, `blog-*.xml`.

### 3.4 JSON-LD (all in `src/lib/seo.ts`)

| Type | Where | Details | Source |
|---|---|---|---|
| `Organization` (`@id` `<site>/#org`) | Every page | Raster logo `/apple-touch-icon.png` ("Google ignores SVG logos"), `email`, `sameAs` = the footer's `SOCIALS`, `contactPoint` with `availableLanguage`, `parentOrganization` CETUSPRO with `vatID` + `PostalAddress` from the one `COMPANY` constant | [repo: apps/pstrykweb.pl/src/lib/seo.ts] |
| `WebSite` (`@id` `/#website`) | **Home pages only** | `alternateName` (for the site name in results), `url` = domain root, `inLanguage`, no SearchAction ("sitelinks search box is gone") | [repo: apps/pstrykweb.pl/src/lib/seo.ts] [repo: .claude/project-info/landing/seo.md § 13] |
| `Service` + `Offer` / `UnitPriceSpecification` | Industry and regional pages | The price always comes with its conditions in the page's language; `valueAddedTaxIncluded: false` | [repo: apps/pstrykweb.pl/src/lib/seo.ts] |
| `BreadcrumbList` | Every inner page | `breadcrumbLd(items)` | same |
| `FAQPage` | Only for a visible FAQ | There have been no FAQ rich results since 2026-05-07; it is kept for semantics only | [repo: .claude/project-info/landing/seo.md § 5, § 13] |
| `BlogPosting` (`@id` `<url>#post`) | Each post | headline, description, image (the OG card), `datePublished` / `dateModified` as **Warsaw-offset ISO** (`polishDateTime`, DST-safe), `inLanguage`, `articleSection`, `wordCount`, `author` = `personLd()`, `publisher` → `#org`, `isPartOf` → `#blog`, **`citation` = the post's source URLs** | [repo: apps/pstrykweb.pl/src/lib/seo.ts] |
| `Person` (`@id` `<author page>#person`) | Inside every BlogPosting + the author page | Same `@id` and url everywhere. `jobTitle` / `image` / `sameAs` **only when true and given**. `worksFor` → `#org` | same |
| `ProfilePage` | Author page | `mainEntity` = the same Person | same |
| `Blog` | Blog index | Lists its `blogPost`s | same |
| Never | — | `Product`, `LocalBusiness` (no local address), `AggregateRating` about ourselves | [repo: .claude/project-info/landing/seo.md § 13] |

- `ldJson()` escapes `<` so content can't close the script tag. The layout always emits `[Organization, (WebSite on home), ...page jsonLd]` in one `<script type="application/ld+json">` [repo: apps/pstrykweb.pl/src/layouts/BaseLayout.astro].
- **Portfolio mapping:**
  - **Sitewide entity:** the user as a `Person` with `@id` `<site>/#person`. Fields: `jobTitle`, `image` (a real photo), `sameAs` (GitHub MuchaSsak, LinkedIn) and `knowsAbout`. Add `address` / `homeLocation` with locality and country only; this serves the "found by name + occupation + location" goal. Add `alumniOf` / `hasCredential` only if true.
  - **Pages:** `WebSite` on home; `ProfilePage` on about/home; `BlogPosting` with `author` → `#person`; `BreadcrumbList` on inner pages.
  - **Case studies:** `CreativeWork` (or `SoftwareSourceCode` when the repo is public), with `creator` → `#person`.
  - **Skip `Organization`**, unless a freelance brand is decided (D5).

### 3.5 Head / meta pattern (`BaseLayout.astro`)

The layout emits, in order [repo: apps/pstrykweb.pl/src/layouts/BaseLayout.astro]:

- **Basics:** `<title>`, description, `<meta name="author">`.
- **Robots:** three metas (the page's own value, the review-build noindex, `max-image-preview:large`).
- **URLs:** canonical as the absolute self URL with trailing slash; hreflang pairs + `x-default`, only when 2+ versions exist.
- **Preloads:**
  - Fonts, per script. Latin pages get the PL files. Cyrillic pages get the Cyrillic files plus the display face's Latin file, because "digits and punctuation are Latin in every language … loading it late re-wrapped the H1 (CLS 0.17 on /uk/tsiny/)".
  - LCP candidates, with `fetchpriority=high`.
- **Icons and browser hints:** `favicon.ico` (48) + `favicon.svg` + `apple-touch-icon.png`, `theme-color`, `format-detection telephone=no`, an optional `google-site-verification`.
- **Open Graph:** `og:type` is `article` for posts, with the `article:*` tags; `og:image` is a 1200×630 JPEG with type, size and alt; plus `og:locale:alternate`.
- **Twitter:** `summary_large_image` with title, description, image and alt.

**Portfolio verdict: reuse** almost line by line. It is the "perfect link previews" requirement from the synthesis.

### 3.6 OG image generation (`scripts/og-images.mjs`, `bun run og`)

- **What it shoots:** Playwright visits every URL in `dist/sitemaps/{core,blog}-*.xml` on `astro preview`, at a **1200×630 viewport with `reducedMotion: "reduce"`** and `bypassCSP`.
- **Per page:**
  1. Wait for fonts.
  2. Hide the nav, the language pill, CTAs, breadcrumbs and the reading bar.
  3. Stretch a blog hero to fill the frame.
  4. Wait 2.6 s for the shader.
  5. Save a **JPEG at quality 78**.
- **Output:** `public/og/<segment>/<page>.jpg`, committed. `/pl/` becomes `/og/pl/home.jpg`, mirrored by `ogImagePath()`.
- **Options:** `--only=<paths>` re-shoots single pages; `--dist=` reads another build's sitemaps.
- **Placeholder guard:** a card that caught a visible `[data-placeholder]` is logged in `scripts/og-placeholders.json`, which the launch gate refuses.
- **Test:** a unit test fails while a core page or post has no image.

[repo: apps/pstrykweb.pl/scripts/og-images.mjs] [repo: apps/pstrykweb.pl/src/lib/sitemap.test.ts]

**Portfolio verdict: adapt.** The share card *is* the page's hero, so there is no separate OG template to design and no Satori. For a portfolio, consider a dedicated OG render mode per case study, so the card reads name + role + one project metric instead of a cropped hero. Cards are committed, so they go stale after a hero change. Add a hash check that fails CI when the hero changed but the card didn't.

### 3.7 Search Console, Bing, IndexNow

- **GSC owner checklist** [repo: .claude/project-info/landing/seo.md § 16]:
  1. Add a **Domain property** verified by DNS TXT, plus URL-prefix properties for alias domains to watch their 301s.
  2. Submit the index sitemap, then each child separately (coverage is reported per sitemap).
  3. Run URL Inspection "Test live URL" on one page per template.
  4. Use "Request indexing" only for key pages.
  5. Run the Rich Results Test per template.
  6. Check weekly: indexing per sitemap, manual actions, crawl stats.

  Don't use the Indexing API, resubmit daily, ping deprecated endpoints, or list noindex URLs in sitemaps.
- **GSC is code-free:** "no code on our pages", disclosed in privacy policy § 3.7. The `PUBLIC_GOOGLE_SITE_VERIFICATION` meta is only for when DNS isn't used [repo: apps/pstrykweb.pl/astro.config.mjs] [repo: apps/pstrykweb.pl/src/content/legal/en/polityka-prywatnosci.md].
- **Bing:** "Import from Google Search Console". Call `GetUrlSubmissionQuota` before scripting submissions (young sites often get about 100/day) [repo: .claude/project-info/landing/seo.md § 16].
- **IndexNow:**
  - `src/pages/[indexnow].txt.ts` publishes `/<key>.txt` only when `INDEXNOW_KEY` is set and is 8–128 hex characters.
  - `scripts/indexnow.mjs` diffs the built sitemaps against the **live** production sitemap (added / changed lastmod / removed) and POSTs to `api.indexnow.org` in batches of ≤ 10 000.
  - It is a dry run by default. `--submit` works only on `VERCEL_ENV=production` unless `--allow-non-production` is passed, and it must run after the deploy is live.
  - Google ignores IndexNow.

  [repo: apps/pstrykweb.pl/scripts/indexnow.mjs] [repo: apps/pstrykweb.pl/src/pages/[indexnow].txt.ts]
- **Portfolio verdict:**
  - GSC checklist + Bing import: **reuse**.
  - IndexNow: **optional**. It is cheap, and Bing feeds Copilot-style search engines, but it isn't essential at about 30 URLs.

### 3.8 Other SEO details worth copying

- **Title length:** `documentTitle()` appends ` | Brand` only while the whole title stays ≤ 62 characters. The schema enforces `seoTitle` 20–60 and `description` 80–170 characters [repo: apps/pstrykweb.pl/src/lib/blog.ts] [repo: apps/pstrykweb.pl/src/content.config.ts].
- **Author meta:** every page carries `<meta name="author">` = "Mateusz Muszarski we współpracy z CetusPro". The wiki notes that "Google does not rank on it, it names who made the site" [repo: .claude/project-info/landing/seo.md § 14]. The landing is therefore a public credit for the user, useful in the case study.
- **Polish typography:**
  - `lib/markdown/typography.ts` and `Headline.tsx` glue one-letter words and number groups with no-break spaces. "1 500 zł" or a lone "w" never breaks across lines.
  - Tests cover legal references ("art. 7 ust. 2").
  - **Reuse for `/pl/`.**

  [repo: apps/pstrykweb.pl/src/lib/markdown/typography.test.ts] [repo: apps/pstrykweb.pl/src/components/ui/Headline.tsx]
- **Markdown config:** `smartypants: false` (it turns quotes into English curly quotes and `--` into dashes) and `syntaxHighlight: false` (Shiki needs inline styles the CSP forbids) [repo: apps/pstrykweb.pl/astro.config.mjs].
  - **Portfolio gotcha:** case studies *will* have code blocks.
  - Use Shiki with a CSS-variables/class theme, or allow `'unsafe-inline'` for style attributes. The landing already allows that for React `style={{}}`.

---

## 4. Blog

### 4.1 Content collection schema (`src/content.config.ts`)

- **Collection:** `blog` (`glob("*.mdx", base: "./src/content/blog")`), served at `/pl/blog/<id>/`.
- **Frontmatter fields** (zod):
  - `title`: 20–110 chars. The H1; the part after "?" / ":" is set in the italic highlight (`titleParts()`).
  - `seoTitle`: 20–60. `<title>` + og:title; the brand is appended only while it fits.
  - `description`: 80–170.
  - `author`: **`z.enum(AUTHORS.map(a => a.name))`**, so a post can't name a person without an author record.
  - `topic`: an enum.
  - `industry?`: re-tints the page and pre-fills the CTA.
  - `cover?`: an enum of drawn SVG scenes.
  - `publishedAt`, `updatedAt` ("only when the content changed").
  - `featured`: the index's lead guide.
  - `related`: ≤ 3 slugs.
  - **`sources`: ≥ 1 of `{ title, url, accessed }`.**
- **Refinements:** `updatedAt >= publishedAt`; a post needs a `cover` or an `industry`.
- **Checks a schema can't express** live in `src/lib/blog.test.ts`. That file **fails when `data/pricing.ts` changes** ("re-read the posts that quote us"), and also checks: ASCII hyphen / straight quotes only, every source dated and none in the future, related posts exist (never itself), exactly one `featured`, a named person signs every post, author records stay true and unique.

[repo: apps/pstrykweb.pl/src/content.config.ts] [repo: apps/pstrykweb.pl/src/lib/blog.test.ts]

**Portfolio verdict: adapt.** The same schema shape fits `blog` and **`work`** (case studies):
- `sources` becomes `links` / `evidence` (live URL, repo, metrics source);
- `topic` becomes `stack` / `type`;
- add `locale`, or put files in per-locale folders;
- add an `nda` level (the synthesis's NDA ladder) and a `draft: true` flag that the launch gate refuses.
- The "fails when pricing changes" idea maps to "**fails when a metric in `data/metrics.ts` changes until the case study that quotes it is re-read**".

### 4.2 Author model + author page

- **Data:** `src/data/authors.ts`, one record per person with `slug`, `name`, `role?`, `image?` ("a real photo … never AI-made"), `sameAs[]` and `bio`. "Only true facts: no job title, photo or profile link until the person gives one (Google calls invented creator details deceptive)" [repo: apps/pstrykweb.pl/src/data/authors.ts].
- **Record readers:**
  - the byline (`rel="author"` link);
  - the "O autorze" box under every post (bio + the AI-use line + contact);
  - the author page `/pl/blog/autor/<slug>/`;
  - the `Person` in BlogPosting / ProfilePage;
  - `article:author`;
  - the site-wide `<meta name="author">`.
- **The author page** [repo: apps/pstrykweb.pl/src/pages/[seg]/blog/autor/[author].astro] [repo: apps/pstrykweb.pl/src/components/blog/AuthorPage.tsx]:
  - a dark hero: breadcrumbs, name as H1, role, bio;
  - a facts list: post count, "Jak powstają teksty", contact e-mail;
  - every post they signed;
  - `ProfilePage` + `BreadcrumbList` JSON-LD;
  - `hreflang={false}` (PL only);
  - listed in the blog sitemap, `lastmod` = their newest post.
- **The how-line (the owner's wording):** "Teksty przygotowujemy z pomocą narzędzi AI, a fakty, ceny i przepisy sprawdzamy w źródłach podanych pod artykułem." An earlier line, "the author edits it and answers for it", was dropped [repo: .claude/project-info/landing/seo.md § 18].
- **E-E-A-T reasoning recorded:** Google asks "who wrote it, how, why"; a named author + a page + an honest AI-use statement answers all three "without claiming expertise we cannot show" [repo: .claude/project-info/landing/seo.md § 18].
- **Portfolio verdict: adapt.**
  - On a portfolio the author *is* the site owner, so the author page merges into `/about` (or stays as `/blog/author/<slug>/` pointing at the same `#person` `@id`).
  - Keep the honest AI-use line. For an AI-heavy developer it is on-brand, and it is a trust signal rather than a weakness.

### 4.3 Post page, index, RSS, share cards

- **Post page** [repo: apps/pstrykweb.pl/src/pages/[seg]/blog/[slug].astro] [repo: apps/pstrykweb.pl/src/components/blog/Post.tsx]:
  - `PostHero`: breadcrumbs, topic eyebrow, the two-voice H1, byline, "Opublikowano" + "Zaktualizowano" (only when it differs).
  - `PostAside`: a sticky contents list of H2s + one CTA.
  - The body is MDX inside `NamedTables.astro`: every table becomes a scrollable, named region.
  - `PostSources`: dated sources.
  - `PostAuthor`, then `RelatedPosts`.
  - A CSS reading-progress bar.
  - Industry posts wear the industry's theme.
  - MDX components: `proseComponents()` rewrites app links into this build's tracked CTA URLs [repo: apps/pstrykweb.pl/src/components/blog/Prose.tsx].
- **Index:** the `featured` guide in a deep hero, then one grid whose rhythm never leaves a card alone on its row (`gridSpans()`, tested) [repo: apps/pstrykweb.pl/src/lib/blog.ts] [repo: apps/pstrykweb.pl/src/components/blog/BlogIndex.tsx].
- **Reading time:** 200 words/min after stripping MDX syntax (`proseWords()`); the same count feeds `wordCount` [repo: apps/pstrykweb.pl/src/lib/blog.ts].
- **RSS:** `@astrojs/rss` at `/pl/blog/rss.xml`. Items have title, description, pubDate, link and the topic as category; `customData: <language>pl-pl</language>`; `trailingSlash: true`. It is announced with `<link rel="alternate" type="application/rss+xml">` on the blog pages [repo: apps/pstrykweb.pl/src/pages/[seg]/blog/rss.xml.ts].
- **Share cards:** a Playwright shot of each post's hero (§ 3.6). The sitemap test fails while a post has no card [repo: apps/pstrykweb.pl/src/lib/sitemap.test.ts].
- **Covers:** drawn React SVG scenes (`PostCover.tsx`, 366 lines) or the industry's mock site. This is PstrykWeb-specific; **skip**.
- **Portfolio verdict:** post page structure, sources block, RSS, sitemap child and the share-card test: **reuse/adapt**. For a portfolio, also emit one RSS per locale that has posts.

### 4.4 The blog skill (`write-pstrykweb-blog`) and `scripts/blog-skill*.mjs`

- **What it is:** an **operator-only** Claude Code skill. An `OPERATOR_ONLY` file keeps it out of the build containers. It researches, fact-checks and writes a Polish post, and delivers `<slug>.md` (the source of truth) + a standalone `<slug>.html` "that looks exactly like a post on pstrykweb.pl" (for review and for reels) + a `research.md` claim ledger with cached sources [repo: .claude/skills/write-pstrykweb-blog/SKILL.md].
- **Flow:**
  1. **Intake:** a named, consenting author (never "the team"; Mateusz Muszarski is offered first). Topic from the backlog in `site.json`.
  2. **Plan:** the main query as owners type it; read what already ranks; check overlap with existing posts; pick the post kind and its length band (pillar 1 800–3 000 words; industry 1 000–1 800; how-to 1 200–2 000; comparison 1 000–1 600). Scaffold with `blog.py new`.
  3. **Research:** primary sources only, opened and quoted. `fetch.py <url> --quote "…"` caches the page (HTML or PDF) and fails loudly with UNREACHABLE. One ledger row per claim: claim, URL, verbatim evidence, tier, accessed date, and a status of `potwierdzone` / `jedno źródło` / `odrzucone` / `do potwierdzenia`. Competitor price ranges need an evidence file of ≥ 5 price lists, never named in the post.
  4. **Write:** answer first in 2–4 sentences with numbers; H2s as the reader's questions; an FAQ; an honest "our part"; a bridge CTA.
  5. **Fact-check:** a read-only subagent prompt checks every sentence against its source; every sum and table cell is recomputed; frequency words ("większość", "zwykle") need a source or go.
  6. **Polish:** `blog.py fix` (H1 + sources list from the frontmatter), then `blog.py check` (a linter mirroring the site's schema, tests and claim rules).
  7. **Build:** `blog.py build` writes the standalone HTML; check screenshots at 390 / 1440.
  8. **Hand-off.**

  Publishing to the site is a separate, explicit step: `blog.py mdx`, cover port, related posts, tests, build, share image (`references/publish-to-site.md`).
- **Keeping the skill in sync with the site:**
  - `bun run blog:skill` (`scripts/blog-skill.mjs`) writes the skill's `assets/` from the built site:
    - `site.css`: the built CSS pruned to the post page (`blog-skill-css.mjs`);
    - `covers/*.html`: rendered with `react-dom/server`;
    - the fonts;
    - `site.json`: themes, prices, posts, paths, backlog;
    - `sync.json`: a fingerprint of all of it (`blog-skill-sources.mjs`).
  - `scripts/blog-skill.test.mjs` **fails while the site changed since the last sync**.
  - The lesson log adds: "After a landing CSS or dictionary change, run `bun run build` then `bun run blog:skill`".

  [repo: apps/pstrykweb.pl/scripts/blog-skill.mjs] [repo: apps/pstrykweb.pl/scripts/blog-skill.test.mjs] [repo: .claude/project-info/memory/lessons.md]
- **Portfolio verdict: adapt (high value, and a showcase in itself).** A `write-portfolio-post` / `write-case-study` skill with the same ledger + fetch-quote + fact-check + lint + standalone-HTML loop is cheap to fork. It also demonstrates the user's "Claude Code skills" expertise, and a case study can describe it.
  - Drop the PstrykWeb claim rules.
  - Keep the "no invented facts, every number has a row" core.
  - The sync-hash test is optional; it prevents drift, but it adds a build-time chore after every CSS change.

### 4.5 Fact-check rules that the code enforces (worth keeping)

| Rule | Where |
|---|---|
| Every post has ≥ 1 dated source; none dated in the future | schema + [repo: apps/pstrykweb.pl/src/lib/blog.test.ts] |
| Sources become `citation` in BlogPosting and a visible "Źródła" block | [repo: apps/pstrykweb.pl/src/lib/seo.ts] [repo: apps/pstrykweb.pl/src/components/blog/Post.tsx] |
| Our own numbers come from one data file; a change there fails until the posts are re-read | [repo: apps/pstrykweb.pl/src/lib/blog.test.ts] |
| Shown third-party statistics: verbatim quote + check date in `data/stats.ts`; `stats.test.ts` ties each figure to its quote ("at most rounded") | [repo: apps/pstrykweb.pl/src/data/stats.test.ts] [repo: .claude/project-info/landing/research.md § 8] |
| A list of commonly cited but unverifiable stats that are **never used** (e.g. "Stanford 75 % judge credibility by design", "Lindgaard 50 ms", "Akamai 100 ms = −7 %") | [repo: .claude/project-info/landing/research.md § 8] |
| Named author with consent; no invented role/photo/profile | [repo: apps/pstrykweb.pl/src/data/authors.ts] |

---

## 5. Legal

### 5.1 Which pages exist and how they're stored

| Document | Slug (same in every locale) | Status in code | Source |
|---|---|---|---|
| Privacy policy | `/<seg>/polityka-prywatnosci/` | Public, v2.0 (2026-10-02), 17 numbered sections, `counselReview: pending` | [repo: apps/pstrykweb.pl/src/content/legal/en/polityka-prywatnosci.md] |
| Terms of service (regulamin serwisu) | `/<seg>/regulamin/` | Public, v2.0, § 1–§ 18 + a model withdrawal form annex, `pending` | [repo: apps/pstrykweb.pl/src/content/legal/en/regulamin.md] |
| GDPR clause (klauzula RODO) | `/<seg>/klauzula-rodo/` | Public, v2.0, `pending` (the konfigurator's `gdprClauseUrl` links it) | [repo: .claude/project-info/legal/LEGAL.md § 14.1] |
| Transfer rules (zasady przeniesienia) | `/<seg>/zasady-przeniesienia/` | Public, v2.0, `pending` | same |
| Contest rules (regulamin konkursu) | — | **On hold, not built** (`ON_HOLD_LEGAL_PAGES` in `routes.ts`) | [repo: apps/pstrykweb.pl/src/lib/routes.ts] |

**Storage and rendering:**

- **Files:** `src/content/legal/<locale>/<Polish slug>.md` (locales `pl`, `en`, `uk`). Frontmatter: `title`, `description`, `version` (`^\d+\.\d+$`), `updated`, `counselReview: pending|approved`, which is **internal, never rendered, never blocking a build** (owner decision D14, 2026-10-02).
- **Route:** one `pages/[seg]/[dokument]/index.astro`. It loads `getEntry("legal", "<locale>/<pl-slug>")` and fills `{{company.*}}` / `{{contact.*}}` tokens from the one `COMPANY` constant (verified in the KRS API). **An unknown token fails the build** [repo: apps/pstrykweb.pl/src/lib/legal.ts] [repo: apps/pstrykweb.pl/src/content.config.ts].
- **Page parts** (`components/legal/LegalPage.tsx`):
  - `LegalHead`: version · date, "Drukuj lub zapisz PDF" + a print sheet with only the text (UŚUDE art. 8 "savable").
  - `LegalToc`: the document's own numbering, with **language-free anchors** `#pkt-4` / `#par-9`, so the footer can deep-link the same anchor in every locale.
  - Tabs to the other documents.
  - `StatsOptOut`: the analytics opt-out switch, injected at an HTML-comment marker inside policy § 4.
  - `LegalContact`.
  - On en/uk: "Translated from Polish" + a link to the Polish page; each text ends with "the Polish version prevails".

  [repo: apps/pstrykweb.pl/src/components/legal/LegalPage.tsx] [repo: .claude/project-info/landing/compliance.md § 5]
- **Tests** (`src/lib/legal.test.ts`):
  - every document exists in every locale and nothing else lives in the folder;
  - only known tokens are used, and the filled text carries the KRS data;
  - sections are numbered 1..n identically in all languages;
  - the opt-out marker appears exactly once, in the policy only;
  - links point only to existing (or pending) pages of the same language;
  - ASCII hyphen only;
  - `counselReview` is present;
  - no link to the on-hold konkurs.

  [repo: apps/pstrykweb.pl/src/lib/legal.test.ts]
- **Wiki process:** `legal/LEGAL.md` is a self-contained briefing for counsel and LLMs. Every fact is labelled `[CODE]` / `[DOCS]` / `[VERIFY]`; it has a "Last updated" line + change history; a commit hook fails a commit that touches a legal-relevant file without LEGAL.md (`Legal: n/a` opts out) [repo: .claude/project-info/legal/README.md].

**Portfolio verdict:**
- The **storage + token + test pattern: reuse.**
- The **texts: adapt heavily.** They describe CETUSPRO sp. z o.o. as controller, a konfigurator, a viewer, Tally and so on. A portfolio's controller is the user as a natural person, and its processors are Vercel, Resend, Cloudflare Turnstile and Umami.
- The **cookie and storage table** in policy § 5 and the **Umami § 4** wording are the most directly transferable paragraphs.
- The KSH art. 206 footer (company data + share capital) applies to a company. **It does not carry over to a private person's portfolio.** What a natural person must show (UŚUDE art. 5) is not analysed in the repo; see Not covered.

**Drift found (code vs wiki):**
- `known-issues.md` (Landing v2, H) and `plans/verify-before-deploy.md` § 10 still say "the launch gate fails while any legal doc is `legalReview: pending`".
- The code and LEGAL.md § 14.1 say there is **no legal build gate** since 2026-10-02. The field is now `counselReview`, and `launch-gate.mjs` has no legal check.
- The code is authoritative.

### 5.2 What `compliance.md` concluded, with how verified each fact is

The repo marks these as "**NOT legal advice**; every row with Lawyer = Y needs sign-off before launch" [repo: .claude/project-info/landing/compliance.md]. Status legend used below: **researched** = from the 2026-09-27 compliance research with sources cited inline; **decided** = an owner decision; **code** = checked in code; **vendor-read** = read from vendor pages on 2026-10-02; **counsel pending** = waiting for the lawyer.

| Topic | Conclusion as the repo states it | Sources it cites | Status |
|---|---|---|---|
| **Analytics without a banner** | PKE art. 399 (= ePrivacy 5(3)) needs consent for storing/accessing terminal info, except what is *necessary*; analytics isn't listed. EDPB 2/2023 v2 §33: JS that makes the browser send info is in scope, so "no cookies" is not automatically consent-free; §56: in scope "does not systematically mean that consent needs to be collected". UODO's own site runs Plausible with no consent mechanism. The CNIL exemption conditions apply. Digital Omnibus art. 88a is **not adopted** (as of 24.09.2026). **Position: banner-less cookieless analytics is "defensible with low, non-zero residual risk"** | creativa.legal, Grant Thornton, EDPB PDF, uodo.gov.pl/pl/1/255, CNIL sheet 16, Taylor Wessing, Acompli | researched; **counsel pending** (Lawyer: Y); fallback = a minimal analytics-only consent banner |
| Conditions that keep it defensible | 1) aggregate only, no PII in events; 2) `beforeSend` allow-lists query params (`src`, `v`, `utm_*`) and drops fragments; 3) no other trackers or leaky embeds (no Meta Pixel, GA4, Hotjar, YouTube/Vimeo, Maps iframe, **Google Fonts CDN**: LG München I, 20.01.2022, 3 O 17493/20); 4) disclose tool, purpose, data, no cookies, the hash, processor, transfers, basis 6(1)(f), the art. 399 notice; 5) an opt-out toggle on the privacy page + honour GPC; 6) Speed Insights the same or off; 7) Turnstile = security, necessary, disclosed | same + dr-datenschutz | researched; **built in code** (below) |
| **Umami** (chosen, D13) | Umami Cloud, loaded only when `PUBLIC_UMAMI_WEBSITE_ID` is set (after go-live), after `load` + idle; `data-exclude-hash`, `data-do-not-track`, `data-domains` = own host; `pwBeforeSend` sanitises URL + referrer (origin only); opt-out via `localStorage['umami.disabled']`; GPC / DNT honoured. Events are clicks only. Vendor facts: "servers in the US and EU" (no region choice), so the policy says "USA and EU"; DPA of 2026-08-02 with SCCs; visitor hash = website ID + IP + UA + monthly salt; **6 months retention on the free Hobby plan** (from third-party summaries; the pricing page didn't render) | [repo: apps/pstrykweb.pl/src/scripts/analytics.ts], [repo: .claude/project-info/legal/LEGAL.md § 6.1], umami.is/dpa, umami.is/subprocessors | code; vendor-read 2026-10-02; plan + DPA acceptance **[VERIFY]** |
| **Turnstile** | Security of a requested service = necessary; disclose it and **reference the Turnstile Privacy Addendum** (mandatory for the Invisible widget; the app uses managed + `interaction-only`, reference it anyway). Cloudflare says Turnstile uses no cookies to collect data. Policy § 6 names the signals (IP, TLS fingerprint, UA, site key + page) and Cloudflare's dual role (processor + separate controller for bot-detection improvement); basis 6(1)(f) | cloudflare.com/turnstile-privacy-policy, friendlycaptcha summary | researched; text public; counsel pending |
| **Cookies** | The landing sets **no cookies**; its only storage is `umami.disabled`, written only when the visitor opts out, and called "strictly necessary" under art. 399 ust. 3 pkt 2 PKE. The policy has a per-domain storage table (landing / app / viewer / Tally). The "all storage strictly necessary" statement is on the lawyer list (Q13) | [repo: apps/pstrykweb.pl/src/content/legal/en/polityka-prywatnosci.md § 5], [repo: .claude/project-info/landing/compliance.md § 12] | code ("confirmed by the main session 2026-10-02"); counsel pending |
| **Regulamin serwisu** | **UŚUDE art. 8**: an e-service (konkurs entry, newsletter, forms) needs a regulamin available free **before** use, in a savable form. Minimum content: types/scope, technical requirements + ban on unlawful content, conclusion/termination, complaints. "An unpublished regulamin doesn't bind". The texts also cover DSA art. 11–18 (user content), no ODR link (platform closed 20.07.2025), the consumer-like rights of sole traders (art. 385⁵ KC, art. 7aa UPK) | arslege art. 8, RPMS | researched; text public v2.0; counsel pending |
| **Privacy policy** | RODO art. 13/14 + the PKE art. 399 notice + processors + analytics + Turnstile + retention. 18 sections per LEGAL.md § 14.3 (the en file shows 17 numbered H2s). Purposes with legal basis and period each; a processor table with places of processing; transfers (DPF 2023/1795, SCC 2021/914); the right to object set out separately in bold (Art. 21(4)); complaint to the Prezes UODO | EUR-Lex GDPR | text public v2.0; counsel pending |
| **Fonts / embeds** | Self-host fonts and video; static map image + link instead of an iframe; social profiles as **plain links** (no plugins/pixels), with joint controllership for page statistics disclosed (CJEU C-210/16) | LG München; compliance D12 | decided + code |
| **No PII in URLs** | Prefill data only in the URL **fragment**, never a query string; the app strips it after reading. `utm_*` is read only from the landing page URL and deliberately **not** persisted (persisting would need consent) | RODO art. 5(1)(c), 25; Vercel docs | code |
| **Company footer** | KSH art. 206 §1 (company: firma, seat + address, court + KRS, NIP, **share capital**) + UŚUDE art. 5 (name, address, e-mail). Values verified in the official KRS API (state 24.09.2026, read 27.09.2026) | dlajurysty, Brzoziewska Kędziora, arslege art. 5 | verified (KRS API); applies to companies |
| **Accessibility law** | The EAA implementation (ustawa z 26.04.2024, applies from 28.06.2025) is "likely not applicable" (B2B; microenterprise exemption). WCAG 2.2 AA anyway | biznes.gov.pl, accessible.org, XICTRON | researched; scope confirmation optional |
| **AI visuals** | AI Act art. 50 (from 2.08.2026): disclose deepfakes; decorative non-realistic visuals are low risk; never fake people or fake client work | artificialintelligenceact.eu, EC FAQ | researched |
| **Marketing claims** | Invented numbers or testimonials = misleading (UZNK art. 16; UPNPR art. 7 pkt 25–26 for fake reviews); third-party stats must be accurate, dated, scoped and linked | UOKiK etc. | researched; enforced by tests |

**What carries over to the portfolio:**
- the Umami implementation (`analytics.ts`) and its policy wording;
- the "no third-party requests" rule (self-hosted fonts, no YouTube embeds: matters for case-study videos);
- the Turnstile paragraph + addendum reference;
- "no PII in URLs";
- "no invented metrics/testimonials" (UZNK art. 16 applies to self-promotion too, if the portfolio advertises services).
- The open "lawyer: Y" items are the same for the portfolio (banner-less analytics). The repo's own position is defensible but not counsel-approved.

---

## 6. Performance and accessibility

### 6.1 Budgets and what the build actually ships

**Budgets** (plan, "CI-enforced"):

| Metric | Budget |
|---|---|
| Lighthouse mobile (perf / a11y / BP / SEO) | ≥ 95 / 100 / 100 / 100 |
| LCP / CLS / TBT | < 2.0 s / < 0.05 / < 100 ms |
| Transfer | < 1 MB home, < 600 KB other pages |
| JS | **0 KB before LCP** |
| Fonts | ≤ 100 KB per PL page |
| Images | AVIF + WebP, explicit width/height, `fetchpriority=low` except the LCP |

[repo: .claude/project-info/plans/landing-v2.md § Budgets]

**Recorded results:**
- The lab v2 home mock: mobile 99/100/100/100 ×3, LCP 1.8 s (the H1), TBT 0, CLS 0.003, 135 KB initial; desktop 100 ×4 [repo: .claude/project-info/landing/research.md § 7].
- The built pages: "mobile Lighthouse 96–99/100/100/100 (89–92 in a slower lab run on 2026-09-30)" [repo: .claude/project-info/plans/landing-v2.md § Status snapshot].

**Measured today on the committed `dist/`** (a review build of unknown date):
- No HTML page references the React client.
- The largest page script is `BaseLayout` at 7.0 KB raw; the others are ≤ 2.7 KB each.
- The analytics loader is 212 B.
- `dist/pl/index.html` is 77.6 KB gzipped, with all CSS inlined.
- The three PL font files total **64.4 KB** (Geologica 19.8 + Inter 24.8 + Literata italic 19.7).

**Config choices behind it** [repo: apps/pstrykweb.pl/astro.config.mjs]:
- `output: "static"`, no adapter;
- `build.inlineStylesheets: "always"` (no render-blocking CSS requests);
- `compressHTML`;
- `prefetch: false`;
- `devToolbar` off;
- `image.responsiveStyles: false`.

The framework choice itself was measured: Astro 100 / LCP 1.66 s / 0 KB JS against Next 16.3 95 / 2.92 s / 180 KB [repo: .claude/project-info/landing/research.md § 6].

> **Relevance to the synthesis's stack default (Next.js 16.3).** The user's own measured benchmark contradicts it. Next keeps about 138 KB of framework JS on the LCP path even with zero client components. Next 16.3 also breaks the Lingui SWC macro (webpack) and Turbopack skips it. With Lingui as a hard requirement, the repo evidence favours Astro, which matches the user's current plan.

### 6.2 Fonts: build-time subsetting (`scripts/fonts.mjs`, `bun run fonts`)

1. Download the OFL **variable** sources from `github.com/google/fonts` (cached in `.cache/fonts/`). Fonts are never loaded from the Google CDN, for GDPR reasons (§ 5.2).
2. **Pin unused axes**, keep only the needed weight range (e.g. Geologica `wght 600–700`, other axes 0; Literata italic pinned at `opsz 48, wght 400`; Inter `opsz 14, wght 400–700`), and drop hinting for display-only faces.
3. Subset with `subset-font` into a **PL file** (Basic Latin + Latin-1 + Polish letters + a curated punctuation list: quotes, bullet, ellipsis, arrows, minus, €, ™, №, NBSP and thin spaces) and a **Cyrillic file** (U+0400–045F + Ґґ + ʼ + №). Keep only the layout features the copy uses (`kern liga clig calt ccmp locl mark mkmk rlig`).
4. Write hashed `public/fonts/<family>-<script>.<hash>.woff2` (immutable cache) + `src/styles/fonts.css` (`font-display: swap`, `unicode-range` per file) with **metric-matched local fallbacks**. `size-adjust` / `ascent-override` / `descent-override` / `line-gap-override` are computed with `fontkit` against Arial or Georgia from a frequency-weighted sample sentence, so the swap causes no layout shift. Also write `src/lib/fonts.gen.ts`, which lists the files for `<link rel=preload>`.
5. Outputs are committed; the Vercel build never runs it.

[repo: apps/pstrykweb.pl/scripts/fonts.mjs]

**Lab evidence:**
- Google Fonts CSS made render-blocking fonts cost about 3.3 s (Lighthouse 71). Self-hosted fonts + WebP gave 81–82.
- Variable Inter "duplicated per weight when requested per weight".

[repo: .claude/project-info/landing/research.md § 7]

**Portfolio verdict: reuse** (swap families; `en` / `pl` / `es` all fit a Latin + Latin-Ext subset; add `ñ á é í ó ú ü ¿ ¡` for Spanish).

### 6.3 Video (`scripts/encode-video.mjs`, `scripts/captions.mjs`)

| Output | ffmpeg settings |
|---|---|
| Muted loops `loop-640` / `loop-960` | A 10–31 s cut, `-an`, `scale=W:-2:flags=lanczos,fps=30`, libx264 `-profile:v high -preset veryslow -crf 30 -pix_fmt yuv420p -movflags +faststart` |
| Full film `film-720` | `scale=1280:-2`, libx264 high veryslow **CRF 26**, AAC **64 kbit/s mono**, faststart |
| Poster | First frame of the loop at 960 px → **AVIF** (`libaom-av1 -still-picture 1 -crf 38 -cpu-used 4`) + **WebP** (`-quality 70`) |
| Stills | JPEG `-q:v 3` at 1280 px for `astro:assets` |
| Naming | Content-hashed names (`loop-640.<sha8>.mp4`); writes `src/data/media.gen.ts` with paths, byte sizes, the loop range and the duration |
| Captions | VTT per locale, generated from one `film-captions.json`. Film captions are verbatim (they caption audio). Muted-loop captions are page copy and follow the claim rules |

[repo: apps/pstrykweb.pl/scripts/encode-video.mjs] [repo: apps/pstrykweb.pl/scripts/captions.mjs]

**Sizes:**
- Lab: loop 640p 287 KB / 960p 563 KB, poster AVIF 3.4 KB [repo: .claude/project-info/landing/research.md § 7].
- First encodes: muted loop 960p CRF 30 = 1.29 MB, 640p = 0.74 MB; full 720p = 4.19 MB.

**Playback rule:** muted autoplay **only after the first user interaction AND ≥ 30 % in view**. Never with `saveData` / reduced motion / 2g. A pause button is always visible. "Starting during load cost ~620 ms TBT in the lab" [repo: .claude/project-info/landing/design-direction.md § Motion system].

**Portfolio verdict: reuse** for the "short muted loops of the real UI" in case studies. Add a VP9/AV1 WebM variant only if the measured bytes justify it.

### 6.4 Images

- `src/lib/images.ts` `pic(image, widths, quality = 62)` runs `getImage()` at each width ≤ the source width, producing AVIF + WebP srcsets and a WebP fallback `src` with intrinsic width/height.
- `.astro` files call it and pass plain props to React. `ui/Picture.tsx` renders `<picture>`: `loading="lazy"`, `decoding="async"`, `fetchPriority="low"`, unless `priority` (the single LCP candidate: eager + high).

[repo: apps/pstrykweb.pl/src/lib/images.ts] [repo: apps/pstrykweb.pl/src/components/ui/Picture.tsx]

**Lab rules** [repo: .claude/project-info/plans/landing-v2.md § Tech]:
- Global `img, video { height: auto }`: `height` attributes otherwise beat `aspect-ratio`, and the video rendered 540 px tall.
- `min-width: 0` on every grid/flex child holding a scroller or an input.

**Portfolio verdict: reuse** as-is.

### 6.5 Motion, PauseMotion, the shader contract

- **`PauseMotion`** is a CSS-only page-wide switch (WCAG 2.2.2) [repo: apps/pstrykweb.pl/src/components/ui/PauseMotion.tsx] [repo: apps/pstrykweb.pl/src/styles/global.css]:
  - a `<label>` wrapping a visually hidden checkbox `#pw-pause-motion`;
  - `html:has(#pw-pause-motion:checked)` pauses every animation;
  - the shader listens to it;
  - rendered once per page, in the footer's legal line.

  Known weakness: a switch at the bottom of the page "is hard to find for the hero's loops … a 2.2.2 (A) weakness". The choice is deliberately not remembered across pages, because persisting it would need a new privacy-policy line [repo: .claude/project-info/known-issues.md § Landing v2]. **Portfolio: adapt.** Put the toggle in the header or next to the signature moment, and persist it in `localStorage` (a strictly necessary preference; disclose it in the policy's storage table).
- **Motion rules** [repo: .claude/project-info/landing/design-direction.md § Motion system]:
  - easing `cubic-bezier(.16,1,.3,1)`; UI 150–250 ms; reveals 600–900 ms; stagger 60–70 ms;
  - reveals happen once via one IntersectionObserver or `animation-timeline: view()` inside `@supports`;
  - **never animate the H1 or any LCP element**;
  - all motion lives inside `@media (prefers-reduced-motion: no-preference)`;
  - `[data-anim]` sections pause off-screen (`src/scripts/motion.ts`, < 1 KB);
  - menus use Popover API + `@starting-style`;
  - page transitions use cross-document View Transitions in CSS only (Firefox just navigates);
  - banned on the route: `motion/react` (+40.8 KB gz), GSAP, Lenis, Lottie/Rive.
- **The WebGL shader contract** (`src/scripts/shader.ts`, raw WebGL 1, about 2 KB, "three.js/ogl would cost 10–150 KB for one full-screen quad"). **This is the template for the portfolio's "one signature WebGL moment that never blocks content"** [repo: apps/pstrykweb.pl/src/scripts/shader.ts]:
  - starts after `load` **and** the first interaction, in an idle callback, only once its host is near the viewport;
  - until then a CSS gradient shows;
  - **hardware GL only** (`failIfMajorPerformanceCaveat` + a renderer-name check): software GL such as SwiftShader "cost ~770 ms of main thread per load, measured";
  - reduced resolution, drawn at 30 fps;
  - frozen on its last frame when the device can't hold about 24 fps;
  - stopped off-screen, in hidden tabs and under the pause switch;
  - never under reduced motion or Save-Data;
  - the CSS fallback stays for no-WebGL / no-JS.
- **Portfolio verdict: reuse the contract verbatim** for the R3F / three chunk (dynamic `import()` after the same triggers). It answers synthesis conflict C1: start lazy, gate on capability, fall back to CSS/poster.

### 6.6 CSP and headers

- **Astro 7 `security.csp`** emits a `<meta http-equiv="content-security-policy">` with hashed scripts [repo: apps/pstrykweb.pl/astro.config.mjs] [verified in `dist/pl/index.html`]:
  - `default-src 'self'`; `img-src 'self' data:`; `font-src 'self'`; `media-src 'self'`;
  - `connect-src` limited to self + app origin + Turnstile + Umami script and collect hosts (Umami Cloud collects on `gateway.umami.is` since its 2026-06-06 change);
  - `frame-src` Turnstile;
  - `object-src 'none'`; `base-uri 'self'`; `form-action 'self' <app>`;
  - scripts limited to `'self'` + Turnstile + Umami;
  - styles: `'self'` + `'unsafe-inline'` for **attributes only** (React `style={{}}` and the theme's CSS variables on `<html>`);
  - **no `unsafe-eval`**.
- An inline script that must run before paint (the 404's language picker) is hashed at build with `Astro.csp.insertScriptHash` [repo: apps/pstrykweb.pl/src/pages/404.astro].
- **`vercel.json` headers** [repo: apps/pstrykweb.pl/vercel.json]:
  - `X-Content-Type-Options: nosniff`;
  - `Referrer-Policy: strict-origin-when-cross-origin`;
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`;
  - `X-Frame-Options: DENY`;
  - a header CSP with only `frame-ancestors 'none'`, because `frame-ancestors` is ignored in a meta CSP;
  - `immutable` one-year cache for `/_astro/*`, `/fonts/*`, `/media/*.{mp4,webp,avif}`; one day + SWR one week for `/og/*` and `/flags/*`.
- **Portfolio verdict: reuse.** Add the contact function's origin (same-origin `/api/contact/`, so `'self'`) and Turnstile. Allow `blob:` / `worker-src` only if the 3D layer needs workers. Allow Shiki's inline styles only via the class-theme route (§ 3.8).

### 6.7 The Lighthouse script (`scripts/lighthouse.mjs`, `bun run lhci`)

- Serves `dist/` itself (`astro preview` on 3230) unless `--base` is given.
- Runs Lighthouse 13 via `chrome-launcher` using Playwright's Chromium.
- **Mobile:** the median of `--runs` (default 3) per metric. `--desktop` adds one desktop run per page.
- Default pages: 10 representative paths across types and locales.
- Budget: `performance 95, accessibility 100, best-practices 100, seo 100, lcp 2000, cls 0.05, tbt 100`. **Exits 1 on any miss.**
- On review builds it skips `is-crawlable`, because they are noindex by design.
- Writes `lighthouse/summary.json` (gitignored).

[repo: apps/pstrykweb.pl/scripts/lighthouse.mjs]

**Portfolio verdict: reuse.** It needs no LHCI server and fits the synthesis budgets (raise LCP to 2.5 s if the 3D tier needs it, though the shader contract keeps 3D off the LCP path).

### 6.8 Lessons from the repo relevant to a portfolio

| Lesson | Source |
|---|---|
| Slow LCP on award sites comes from **intro animations, not weight** (Telescope 0.35 MB → LCP 5.1 s). The only < 2 s sites paint the headline at once | [repo: .claude/project-info/landing/research.md § 2] |
| On 13 factory-built sites the hero headline or CTA was the LCP element held back by its entrance animation | [repo: .claude/project-info/landing/research.md § 5] |
| Video starting during load = ~620 ms TBT; gate it on interaction | [repo: .claude/project-info/landing/research.md § 7] |
| Software WebGL costs ~770 ms main thread; require hardware GL | [repo: apps/pstrykweb.pl/src/scripts/shader.ts] |
| A late Latin font subset on a non-Latin page re-wrapped the H1 (CLS 0.17): preload the subset the H1's digits/punctuation use | [repo: apps/pstrykweb.pl/src/layouts/BaseLayout.astro] |
| `document.scrollWidth` missed a horizontal overflow; use an **element-level** overflow scan at 320/360/390 | [repo: .claude/project-info/plans/landing-v2.md § Tech] [repo: apps/pstrykweb.pl/tests/e2e/helpers.ts] |
| A class name shared between a section and a component (`.alt`) caused the only contrast failure: namespace classes | [repo: .claude/project-info/plans/landing-v2.md § Tech] |
| An icon-only button lost its name on phones: `aria-label` on every icon-only state | same |
| A decorative "wall" cost ~1.8 s of style/compositing work on phones for a barely visible effect: hide it on phones | same |
| Captions without a transcript leave a WCAG 1.2.3 / 1.2.5 gap if the video adds visuals beyond narration | [repo: .claude/project-info/known-issues.md § Landing v2] |
| Claude's Write/Edit tools decode `\uXXXX` escapes into real characters (it happened while writing this file); build such characters from code points, and test for raw NBSP/dashes | [repo: .claude/project-info/memory/lessons.md] [repo: apps/pstrykweb.pl/src/i18n/dict/escapes.test.ts] |
| Windows / Git Bash turns `/pl/` arguments into paths (`MSYS_NO_PATHCONV=1`); run Python with `PYTHONUTF8=1` for Polish text | [repo: .claude/project-info/memory/lessons.md] |
| Next `output: "export"` silently drops a POST route handler. Astro + `@astrojs/vercel` = static files + one Node function when an endpoint is needed (the portfolio's contact form) | [repo: .claude/project-info/landing/research.md § 6] [repo: .claude/project-info/known-issues.md § Repo tooling] |
| Contrast is unit-tested for every theme pair (≥ 4.5:1 text, 3:1 UI), with derived colours "never hand-picked" | [repo: apps/pstrykweb.pl/src/lib/theme.test.ts] |

---

## 7. Testing and verification

### 7.1 Commands

- `bun run check` = `astro check` + `eslint .` (a landing-local flat config) + `vitest run`.
- `bun run build` runs the gates (§ 3.1).
- `bun run e2e` = Playwright against the **built** site.
- `bun run lhci` = Lighthouse budgets.

[repo: apps/pstrykweb.pl/package.json]

### 7.2 Vitest (unit; `vitest.config.ts` uses Astro's `getViteConfig`, Node env)

Tests are included from `src/**/*.test.ts`, `scripts/**/*.test.{ts,mjs}` and `tests/unit/**`. They test the content, not only code [repo: apps/pstrykweb.pl/vitest.config.ts]:

| Test | Guards |
|---|---|
| `src/i18n/dict/escapes.test.ts` | No raw NBSP, no en/em dashes in dictionaries |
| `src/lib/blog.test.ts` | Post rules (§ 4.1, § 4.5) |
| `src/lib/legal.test.ts` | Legal documents per locale, tokens, numbering, links, the opt-out marker |
| `src/lib/sitemap.test.ts` | Core list, XML, lastmod, an OG card exists for every page |
| `src/lib/prices.test.ts` | Rendered pricing keeps brutto + start fee + note |
| `src/data/stats.test.ts` | Every shown statistic matches its verbatim quote |
| `src/lib/theme.test.ts` | AA contrast for every palette pair |
| `src/lib/markdown/typography.test.ts` | Polish no-break rules |
| `src/data/portfolio.test.ts` | Portfolio data |
| `scripts/launch-gate.test.mjs` | `findings()` |
| `scripts/blog-skill.test.mjs` | Skill assets in sync |
| `scripts/geo/*.test.mjs`, `src/lib/geo/*.test.ts`, `components/regions/regions.test.ts` | The regional layer (skip for the portfolio) |

**Portfolio verdict: reuse the idea of "content tests"**: legal parity across locales, dash/NBSP rules, every case-study metric tied to a source, an OG card per page, sitemap correctness.

### 7.3 Playwright e2e (`playwright.config.ts`, `tests/e2e/*`)

- **Config:** runs against `astro preview` of `dist/` on port 3220, never `astro dev` ("Vite's client scripts and unbundled CSS are not what ships"). Desktop Chrome device, `serviceWorkers: "block"`, fully parallel (2 workers in CI / 4 locally), 120 s timeout, HTML report in `.cache/` [repo: apps/pstrykweb.pl/playwright.config.ts].
- **`pages.spec.ts`** covers every built page; `builtPages()` walks `dist/` and samples 2 per regional kind. Per page:
  - at **320 / 390 / 768 / 1024 / 1440** px: status 200, no horizontal overflow from the element-level `overflowing()` scan (ignores fixed elements and anything clipped by an ancestor), no console errors or uncaught exceptions;
  - **axe** (`@axe-core/playwright`) at 390 and 1440 with `reducedMotion: "reduce"`, tags `wcag2a wcag2aa wcag21a wcag21aa wcag22aa best-practice`, **0 violations required**.

  One test checks that every internal link and every language-switch target answers 200, from the server's view, trailing slashes included [repo: apps/pstrykweb.pl/tests/e2e/pages.spec.ts] [repo: apps/pstrykweb.pl/tests/e2e/helpers.ts].
- **`behaviour.spec.ts`** [repo: apps/pstrykweb.pl/tests/e2e/behaviour.spec.ts]:
  - forms: the address form carries `#site=`, and closed-mode variants run depending on `IS_OPEN_TO_PUBLIC`;
  - the film dialog: Esc closes it and focus returns;
  - a source popover;
  - the phone menu: Esc + focus return;
  - **language switch mapping** (`/pl/cennik/` → `/eng/pricing/`, `/pl/blog/` → `/eng/`);
  - the skip link on the first Tab;
  - an FAQ deep link opens its `<details>`;
  - **reduced motion: no infinite animation is still running** (`document.getAnimations()`);
  - **the pause switch stops every loop**;
  - the sticky pill waits until the hero CTA leaves the screen;
  - an unknown URL → the 404 page.

**Portfolio verdict: reuse both specs almost as-is.** They are framework-agnostic and directly prove the synthesis's "accessibility as a stand-out feature" claims.

### 7.4 Screenshot scripts

| Script | Viewports / output |
|---|---|
| `scripts/shots.mjs` | Default widths **390, 1440** (any list); `--full`, `--reduced`, `FRAMES=300,900,1600` (shots at those ms for motion review), `SEL` / `SELS` (per-element), `MOUSE=1`, `H=`; built-in overflow scan; writes `.cache/shots/` [repo: apps/pstrykweb.pl/scripts/shots.mjs]. The lesson log says to check **390, 768, 1024, 1100, 1440, 1920** [repo: .claude/project-info/memory/lessons.md]; the plan's guardrail lists **320 / 360 / 390 / 768 / 1024 / 1440 / 1920** [repo: .claude/project-info/plans/landing-v2.md § Guardrails] |
| `scripts/portfolio-shots.mjs` | Desktop strip: 1440 viewport, first 4 200 CSS px, saved 1 200 px wide. Mobile strip: 390 viewport, first 3 000 CSS px, saved 720 wide. Mobile-top: the first phone screen at 1 : 1.78. Before shooting it scrolls to the bottom once (fires the entrance animations), accepts common cookie banners, freezes animations and awaits fonts [repo: apps/pstrykweb.pl/scripts/portfolio-shots.mjs] |
| `scripts/og-images.mjs` | 1200 × 630, reduced motion (§ 3.6) |

**Portfolio verdict: reuse `portfolio-shots.mjs` directly** for project screenshots (the case-study tiles); **reuse `shots.mjs`** for the design QA loop.

### 7.5 Definitions of done (as the repo states them)

- **Plan acceptance criteria (binary, 10 items):**
  1. every page in every locale, with hreflang/canonical correct and `/` → `/pl/`;
  2. budgets met on 5 page types, with the JSON saved;
  3. **axe 0 violations, keyboard-only journey completes, reduced motion = no motion, no overflow at 320 px**;
  4. every CTA reaches its target with the right locale and prefill;
  5. the konkurs acceptance list;
  6. regional tier A built + gate green;
  7. posts live, dated, sourced;
  8. **no invented numbers anywhere; `launch-gate` green**;
  9. a final audit report;
  10. wiki updated, lint green.

  [repo: .claude/project-info/plans/landing-v2.md § Acceptance criteria]
- **Quality bar:** vertical slices "never far from production"; "nothing fake presented as real" (samples tracked; nothing called production-ready while any is open); edge cases are part of the feature (short and long text, all locales, 320–390 px, keyboard, screen reader, reduced motion); UI is verified with screenshots at the widths that matter, "motion as frames, not one still" [repo: .claude/project-info/conventions/working-with-claude.md § 2, § 5].
- **Pre-deploy checklist** for the landing: no placeholders, empty pending-links, research numbers re-opened and `checkedAt` updated [repo: .claude/project-info/plans/verify-before-deploy.md § 10]. Its "no draft legal page" row is stale (§ 5.1).

---

## 8. PstrykWeb facts for a future case study

### 8.1 From `business/*.md`

Source for this list: [repo: .claude/project-info/business/pstrykweb.md] [repo: .claude/project-info/business/brand-voice.md]

- **What it is:** PstrykWeb "builds modern 'wizytówka' websites for local service businesses — automatically, by the factory in this repo — and sells them as a subscription with a free prototype first". It is "a product of CetusPro (Rzeszów software house)". Shops, payments, login panels, apps and CRM/ERP are out of scope and referred to CetusPro.
- **Two markets:**
  - Poland: pstrykweb.pl → konfigurator. Free prototype in 3 business days, 2 free revision pools, pay from launch.
  - US: pstrykwebsites.com via "Forwardly AI" cold-email outreach. A site "at no cost in exchange for portfolio rights"; sending the request to the factory is manual today.
- **Pricing v5** (net + VAT):
  - 299 zł/mo for 12 months (or 1 500 zł start + 169 zł/mo);
  - 249 zł/mo for 24 months (or 3 000 zł + 119 zł/mo);
  - 8 900 zł outright;
  - buyout 2 900 zł after the contract;
  - consultation 200 zł/h.
- **Funnel:** LP → konfigurator → Deno control plane `POST /init-new-project` → queue (1 at a time) → seed repo + push proof → provision (Supabase `p_*`, GA4, Vercel, `/admin`) → headless Claude (wiki → configure → build → enforced QA gate → deploy noindex) → e-mail to the owner → prototype viewer (≤ 2 free edit requests in 7 days) → sale, which is **manual** today. "There is no CRM / deal object."
- **Throughput reality:** "the factory runs one build at a time (~3-5 sites/day)"; sites stay out of Google until sold.
- **Sites built so far:** "Polish local businesses, mostly around Rzeszów (salons, laser, makeup, notary, legal, architecture)".
- **People and domains:**
  - LP owner: Dominik Włodarczyk (PM/BA, CetusPro);
  - `app.pstrykweb.pl` live 2026-09-30; `viewer.pstrykweb.pl` live 2026-09-30;
  - control plane `deno-api.pstrykweb.deno.net`;
  - generated sites on `<slug>.vercel.app`; repos on `gitlab.cetuspro.com/pstryk/p_*` (older ones on `github.com/pstrykweb/p_*`).
- **Voice:** plain, confident, anti-agency; ASCII hyphen only; PL informal "Ty"; EN en-GB casual; UK polite "ви".
- **Never claim:** invented stats, clients, testimonials, awards, rankings or revenue effects.

`business/*.md` **does not mention the user**, so nothing there says what he built.

### 8.2 About the user's role, from other repo files (cited, not inferred)

- **Role:** the author record gives "Główny deweloper PstrykWeb" as his role (owner's words, 2026-10-02). His bio: "główny deweloper PstrykWeb - serwisu, który buduje strony internetowe dla lokalnych firm, a także stronę, na której właśnie jesteś. Przygotował poradniki dla właścicieli małych firm…" [repo: apps/pstrykweb.pl/src/data/authors.ts].
- **Public credits:**
  - Every landing page carries `<meta name="author" content="Mateusz Muszarski we współpracy z CetusPro">` [repo: .claude/project-info/landing/seo.md § 14].
  - The 8 published blog posts are signed by him [repo: apps/pstrykweb.pl/src/content/blog/*.mdx].
- **Status not settled:** LEGAL.md flags as **[VERIFY]** "whether he is an employee, an intern or a contractor", and notes that his consent to be named is not recorded anywhere yet [repo: .claude/project-info/legal/LEGAL.md § 6.14].
- **Personal rules file:** the repo has a gitignored `CLAUDE.local.md` titled "Mateusz's personal rules" [repo: CLAUDE.local.md]. This copy has **no `.git` folder**, so authorship of individual commits can't be checked here.

### 8.3 Measured, checkable facts a case study could quote (once permission exists)

| Fact | Source |
|---|---|
| Astro 7.3.5 vs Next 16.3.6 benchmark: 100 / 1.66 s / 0 KB vs 95 / 2.92 s / 180 KB; 5 000 pages build in 20–50 s vs 99–243 s | [repo: .claude/project-info/landing/research.md § 6] |
| Lab home: 99/100/100/100 mobile, LCP 1.8 s, 135 KB | [repo: .claude/project-info/landing/research.md § 7] |
| 13 live factory-built sites verified as the factory's own; Lighthouse medians per site | [repo: .claude/project-info/landing/research.md § 5] |
| Built landing: mobile Lighthouse 96–99/100/100/100; 3 locales; 8 fact-checked posts; 4 public legal texts ×3 locales; regional wave a = 787 pages, 478 indexable, behind a flag | [repo: .claude/project-info/plans/landing-v2.md § Status snapshot] [repo: .claude/project-info/known-issues.md § Landing v2] |
| Zero hydrated islands (no `client:*` directive in `src/`; the React client bundle is referenced by no built page) | checked in this audit by grep over `apps/pstrykweb.pl/src` and `dist/` |
| Konfigurator (Next 16 + Lingui en/pl/uk): autosave engine (localStorage + revisioned PATCH + three-way merge), exactly-once submit, contract test against the real validator 22/22 | [repo: .claude/project-info/log.md 2026-09-25] |
| The factory itself (headless Claude Code builds whole sites; parity across 3 runner backends; QA gates; push proof) | [repo: CLAUDE.md] [repo: .claude/project-info/pipeline/] |

**Before writing any of this up:**
- **Permission.** PstrykWeb is a CetusPro product. The synthesis's NDA ladder applies: written permission from CetusPro first (under art. 74 ust. 3 PrAut the employer holds the economic rights to code an employee writes, and his employment status is itself `[VERIFY]` in the repo).
- **Not launched yet.** The landing is mid-launch. The Realizacje section shows **fictional placeholder businesses** (a launch blocker per known-issues) and the legal texts await counsel. Don't screenshot those parts as if they were live proof.

---

## 9. Top gotchas (one screen)

1. **Lingui + Astro has never been proven in the user's code.** The landing chose typed dictionaries. The only evidence is a lab spike (`lingui-for-astro` 0.7.1 + Lingui 6.8), recorded in one line, with its code not in this copy. Spike it first (§ 2.5 step 8). Keep `.astro` thin and resolve strings through explicit per-locale `I18n` instances. MDX stays per-locale files.
2. **Use `en`, not `eng`.** `eng` was legacy from the old landing. Use bare-language hreflang, `x-default` → `/en/`, and a permanent `/` → `/en/` redirect.
3. **The landing hydrates nothing.** All interactivity is vanilla TS + CSS. Copy that discipline: the contact form and ⌘K can be vanilla too, and React stays a build-time template. Only the 3D chunk is lazy JS, under the shader contract.
4. **An endpoint needs an adapter.** The landing has none (the static output had no server code). The portfolio's contact function needs `@astrojs/vercel` with `output: "static"` + one `prerender = false` route, and its URL must end with a slash (trailing-slash rule).
5. **The CSP forbids inline styles from Shiki.** Pick a class-based highlighter theme before writing case studies with code.
6. **The wiki drifts from the code in places:** legal gate, hreflang format, redirect permanence. The repo's own rule is "the code wins", and that holds for anything copied from it.
7. **The legal texts are company texts awaiting counsel.** Reuse the structure and the Umami / Turnstile / storage paragraphs, not the wording wholesale. Banner-less analytics is "defensible with low, non-zero residual risk", not settled.
8. **A case study about PstrykWeb needs CetusPro's written permission**, and must not present the placeholder Realizacje or the unlaunched state as live proof.

Not covered:
- **The lingui-for-astro spike code.** It is in the gitignored `context/landing-v2/lab/`, absent from this copy; the only record is the one-line summary in `landing/research.md` § 6.
- **The research raw evidence** (`context/landing-v2/research/*`), for the same reason.
- **No new runs.** No Lighthouse, Playwright or build was run for this audit; all numbers are the repo's own records, plus file sizes measured on the committed `dist/`, whose build date and mode are unknown.
- **Unread code:**
  - the `apps/app.pstrykweb.pl` konfigurator beyond its i18n and proxy;
  - `apps/viewer.pstrykweb.pl`;
  - the factory, control plane and email apps;
  - `components/home/*` section internals;
  - the `PostCover` scenes;
  - the full text of `blog.py` / `fetch.py`;
  - the GDPR clause, transfer-rules and contest texts (only the privacy policy and terms headings + key sections were read).
- **Legal duties for a private person.** What a portfolio run by a natural person (not a company, maybe a JDG if freelance, D5) must show under UŚUDE art. 5 / art. 8 for a contact form. The repo analyses only a company's duties.
- **Lingui on Vite 8.** Whether `unplugin-lingui-macro` / the babel macro plugin works with Astro 7's Vite 8 + `@astrojs/react` 7 was not verified; only `lingui-for-astro`'s own compatibility table was read.
- **No `.env` files were read.** Only names from `.env.example` appear here.
- **No git history.** This copy has no `.git`, so who authored which part of the repo could not be checked.



