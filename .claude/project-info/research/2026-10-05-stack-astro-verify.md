# Stack verification: Astro 7 for the portfolio (vs Next.js 16)

Date: 2026-10-05. Status: complete. This file supersedes the framework pick in `2026-10-05-tech-stack.md` TL;DR #1 and synthesis TL;DR #7. Everything else in those files still stands.

Tags: [web] fetched page/docs/registry · [repo] the user's pstryk-turborepo wiki/code · [measured] measured in a throwaway spike this session (method stated) · [assumption] my judgement.

Inputs read: `2026-10-05-tech-stack.md`, `2026-10-05-synthesis.md`, `context/pstryk-turborepo/.claude/project-info/landing/research.md` §3/§6/§7, `known-issues.md` (row "Don't upgrade the Next apps to 16.3 yet"), `plans/landing-v2.md` § Tech/§ Budgets, `apps/pstrykweb.pl/{package.json,astro.config.mjs,vercel.json,scripts/encode-video.mjs}`.

## TL;DR

1. **Verdict: Astro 7.3.5 static + React 19.3 islands (sections in TSX) + TS ~6.0 + Tailwind 4.3.3 + Lingui 6.9.0.** The measured repo gap (Astro 100 / LCP 1.66 s / 0 KB JS vs Next 16.3 95 / 2.92 s / 180 KB) matters more for this site than Next's persistent-layout canvas, which the one-moment concept doesn't need (§8.3).
2. **Lingui on Astro 7 works** [measured]. Spike: astro 7.3.5 + lingui-for-astro 0.7.1 + Lingui 6.9.0 with the **new native macro transform** (`@lingui/vite-plugin` `macroTransform: true`, no Babel). Macros worked in `.astro` and `.tsx`, across 3 locales, with correct Polish plurals, hydrated islands and 0 errors.
   - Catch: catalog-as-props embeds the whole catalog in the HTML. Use locale-only islands or a separate islands catalog.
   - lingui-for-astro is pre-1.0 with one maintainer, so keep `.astro` thin and make it optional (§2.4).
   - `lingui-translate-ai init` auto-detected the spike layout.
3. **Correction to the repo:** Lingui on Next 16.3 is not dead. `@lingui/swc-plugin` **6.6.0** works on Next 16.3.4 + Turbopack (lingui/swc-plugin#253, closed 2026-09-05); 6.7.0 is the mismatched build (§2.7).
4. **WebGL** [measured, Astro build gzip]:
   - R3F + three + React minimal scene: **302 KB**, already the whole ~300 KB lazy budget.
   - Vanilla three: **126 KB**. OGL: **14 KB**. ClientRouter: **5.4 KB**.
   - Use vanilla three or OGL for the single signature moment, loaded by a custom after-load directive.
   - `transition:persist` keeps a canvas across ClientRouter navigations (verified), but it isn't needed. Use native cross-document VT: 0 KB; Chrome 126 / Safari 18.2; Firefox navigates without the animation.
5. **CV PDF:** Playwright `page.pdf()` from a print route per locale. Measured: 67 KB, tagged, text and diacritics extract cleanly, ~0.6 s.
   - Sync gate: a pdfjs content-equality test, plus a hash manifest if PDFs are committed.
   - Chromium on the Vercel build image (Amazon Linux 2023) is unproven: try `@sparticuz/chromium` (ships AL2023 libs) or build in GitHub Actions. Typst is plan B (14 ms compile, tagged).
   - Don't auto-download after navigating to `/cv/`: iOS needs a direct tap. Use a "Download PDF" `<a download>` plus `Content-Disposition: attachment`.
6. **Contact:**
   - API route with `prerender = false`, which deploys as static files + 1 function.
   - Turnstile siteverify (300 s single-use tokens; check `hostname`), Resend, honeypot.
   - **One free Vercel WAF rate-limit rule** (Hobby: 1 rule, 1M requests included). No DB.
7. **Hosting:**
   - Vercel Hobby is fine while the copy is employment-only.
   - Its fair-use page counts "Advertising the sale of a product or service" as commercial. With a freelance CTA, use **Cloudflare Workers (free; first-party Astro adapter)** or Vercel Pro ($20/month).
8. **Umami Cloud Hobby:** free, 100K events/month, 1 site, 6-month retention, US/EU servers. Script 2.3 KB gz; no cookies, but it reads `localStorage["umami.disabled"]`.
9. **Video:**
   - AV1 (SVT-AV1 CRF ~46) was **55–64% smaller** than the repo's H.264 CRF 30 at equal or better SSIM [measured].
   - On iOS 17/18, AV1 plays only on A17 Pro+/M3+ hardware, so ship AV1 → (HEVC) → H.264 sources.
   - Start loops only after first interaction and once in view (repo TBT finding).

## 1. Versions (npm registry, 2026-10-05)

Source: `https://registry.npmjs.org/<pkg>` (dist-tags + `time` + peerDependencies of `latest`), fetched 2026-10-05 [web]. "Released" = publish date of the `latest` version.

| Package | Latest | Released | Pre-release tags | Peer deps / notes |
|---|---|---|---|---|
| astro | 7.3.5 | 2026-09-24 | beta 7.4.0-beta.1 (2026-10-02) | Node ≥ 22.12 [repo] |
| @astrojs/react | 7.0.0 | 2026-09-22 | | react ^17 ∥ ^18 ∥ ^19; new peer `oxc-transform-react` ^0.145 |
| @astrojs/mdx | 8.0.2 | 2026-09-22 | beta 8.0.3-beta.0 | astro ^7.2.10 |
| @astrojs/vercel | 11.0.11 | 2026-09-22 | beta 11.0.12-beta.0 | astro ^7 |
| @astrojs/sitemap | 3.7.4 | 2026-08-31 | | can't pair translated slugs [repo] (not an issue: portfolio slugs are shared across locales) |
| @astrojs/rss | 4.0.19 | 2026-06-30 | | |
| @astrojs/cloudflare | 14.3.3 | 2026-09-22 | beta 15.0.0-beta.1 (2026-10-02) | astro ^7.2, wrangler ^4.125 |
| @astrojs/netlify | 8.2.6 | 2026-09-16 | | astro ^7 |
| @astrojs/check | 0.9.10 | 2026-07-27 | | **typescript ^5 ∥ ^6 only** (TS 7.0.2 is latest: pin TS 6.0.x as the repo does, `~6.0.3`) |
| lingui-for-astro | 0.7.1 | 2026-09-02 | | @lingui/core/cli/conf ^5 ∥ ^6; astro ^5 ∥ ^6 ∥ ^7; vite ≥ 3. 12 releases since 0.1.1 (2026-03-18) |
| @lingui/core / react / cli / conf / vite-plugin / babel-plugin-lingui-macro | **6.9.0** | **2026-10-01** | next 6.0.0-next.4 | vite-plugin: vite ^6.3 ∥ ^7 ∥ ^8, `@rolldown/plugin-babel` ^0.1.7 ∥ ^0.2, babel-plugin-lingui-macro ^5 ∥ ^6. **Newer than the 6.8 the repo verified** |
| @lingui/swc-plugin | 6.7.0 | 2026-08-27 | | no release since the repo found it broken with Next 16.3 (see §2.6) |
| @lingui/macro | 5.9.5 | 2026-04-06 | | legacy package; v6 uses the per-framework macro entry points |
| lingui-translate-ai | 1.1.0 | 2026-07-10 | | user's own CLI; deps gettext-parser 9, zod 4, commander 14 |
| three | 0.186.1 | 2026-09-24 | | r186 |
| @react-three/fiber | 9.8.1 | 2026-09-24 | alpha 10.0.0-alpha.5 (2026-09-08), canary 10.0.0-canary (2026-10-02) | **react ≥ 19 < 19.4**, three ≥ 0.156 |
| @react-three/drei | 10.7.9 | 2026-09-25 | alpha 11.0.0-alpha.7 | react ^19, fiber ^9 |
| ogl | 1.0.11 | 2025-01-27 | | no release in 20 months |
| gsap | 3.15.0 | 2026-04-13 | | free incl. plugins (tech-stack S23) |
| motion | 14.0.0 | 2026-10-02 | | 3 days old: pin 13.5.x or 14.0.x after a smoke test |
| lenis | 1.3.26 | 2026-08-05 | | |
| tailwindcss / @tailwindcss/vite | 4.3.3 | 2026-07-16 | | vite ^5.2 … ^8 |
| next | 16.3.8 | 2026-09-30 | canary 16.4.0-canary.60 (2026-10-05) | for comparison |
| react / react-dom | 19.3.0 | 2026-09-09 | | R3F caps at < 19.4 |
| resend | 6.32.0 | 2026-10-01 | | |
| @react-pdf/renderer | 4.9.0 | 2026-08-27 | | react ^16.8 … ^19 |
| playwright / playwright-core | 1.63.0 | 2026-09-04 | next 1.64.0-alpha (2026-10-05) | |
| @sparticuz/chromium | 153.0.0 | 2026-09-11 | | serverless Chromium (relevant to §4) |
| pagedjs | 0.4.3 | **2023-07-06** | beta 0.5.0-beta.2 (2024-10-04) | stale |
| @myriaddreamin/typst-ts-node-compiler | 0.7.0 | 2026-05-31 | rc 0.8.0-rc3 | Typst via npm (the `typst` npm package is a 2023 stub) |
| @upstash/ratelimit / @upstash/redis | 2.2.0 / 1.39.0 | 2026-09-23 / 09-21 | | §5 |
| @vercel/functions | 3.9.11 | 2026-10-02 | | `ipAddress()` helper |
| nanostores / @nanostores/react | 1.5.4 / 2.0.1 | 2026-09-25 / 09-02 | | cross-island state |
| vite | 8.3.2 | 2026-10-01 | | Astro 7 = Vite 8 / Rolldown |
| sharp | 0.35.5 | 2026-09-27 | | astro:assets |
| typescript | 7.0.2 | 2026-07-08 | | see @astrojs/check row |
| zod | 4.6.5 | 2026-09-13 | | |

Notes [assumption]: nothing in the Astro set is younger than 9 days except Lingui 6.9.0 (4 days) and Motion 14.0.0 (3 days). The repo's working combination is Astro 7.3.5 + @astrojs/react 7 + @astrojs/mdx 8 + Tailwind 4.3.3 + TS ~6.0.3 [repo `apps/pstrykweb.pl/package.json`].

## 2. Lingui + Astro 7 (status 2026-10-05)

### 2.1 lingui-for-astro: what it is today [web]

- Package: `lingui-for-astro` 0.7.1 (2026-09-02), repo `github.com/SegaraRai/lingui-for` (monorepo with `lingui-for-svelte` and `@lingui-for/framework-core`), MIT, created 2026-03-15. **6 stars, 1 open issue, one maintainer** (SegaraRai 245 commits; github-actions 13, Copilot 2), last push 2026-09-02 (GitHub API, accessed 2026-10-05).
- README compatibility matrix tested in CI: Lingui 5 and 6 × Astro 5/Vite 6, Astro 6/Vite 7, **Astro 7/Vite 8**. Node 22+.
- Changelog: 0.6.0 (2026-04-28) Lingui 6 support (message IDs changed, so re-extract after upgrading); 0.6.1 Astro 7 alpha; **0.7.0 (2026-07-15) "Support the stable Astro 7 release"** (PR #55) + `lingui-set` / `lingui-reset` directives; 0.7.1 dependency updates.
- Only open issue: #54 "Add support for Lingui's experimental batch extractor API" (2026-07-12). Closed bugs of note: #34 extract failed on `{/* comment */}` in `.astro` (fixed 0.4.x); #36 interpolation-markup fixes (0.5.1).
- Provides: an Astro integration that transforms `.astro` files, an `astroExtractor` for `lingui extract`, macros `t`, `Trans`, `Plural`, `Select`, `SelectOrdinal`, `msg`, `defineMessage`, `ph` from `lingui-for-astro/macro`, and runtime `setLinguiContext(Astro.locals, i18n)` / `getLinguiContext`.
- **MDX is not supported** ("If you need translated MDX content, keep separate `.mdx` files per locale"). That matches the requirement anyway (per-locale posts): a `blog` content collection with `src/content/blog/{en,pl,es}/<slug>.mdx`, UI chrome strings via Lingui.
- **React islands use the official Lingui packages**, not lingui-for-astro. Pattern from the docs: resolve the locale at the page boundary, pass `locale` (not translated strings) into each island, create the i18n instance inside the island [web: https://lingui-for.roundtrip.dev/frameworks/astro/using-islands].
- Static builds: Astro runs middleware once per prerendered page in `output: "static"`, so `src/middleware.ts` can read `context.params.locale` and call `setLinguiContext` [web: https://lingui-for.roundtrip.dev/frameworks/astro/i18n-context].

### 2.2 New since the repo spike: Lingui 6.9 native macro transform [web]

- `@lingui/vite-plugin` 6.9.0 (2026-10-01): `lingui({ macroTransform: true })` "transforms Lingui macros natively via `@lingui/native-tools`, so no Babel or SWC plugin is needed"; works with `@vitejs/plugin-react` and "Vite 8+ with Rolldown"; off by default, "will become the default in the next major". The plugin also compiles `.po` on import, so **no `lingui compile` step** [web: https://lingui.dev/ref/vite-plugin; npm README].
- `@lingui/native-tools` 0.1.5 (2026-10-01; package created 2026-09-21): Rust + SWC prebuilt binaries for macOS, Linux (glibc + musl), Windows, Android; **pre-1.0**, **Node ≥ 22.19.0**, "no WASM fallback". Vercel's build image is Linux x64, so a prebuilt exists [assumption: not tested on Vercel].
- Legacy path still exported: `linguiTransformerBabelPreset` for `@rolldown/plugin-babel` 0.2.4 (`@vitejs/plugin-react` 6 dropped its `babel` option in favour of that plugin). Use it as the fallback if native-tools misbehaves.

### 2.3 Spike: Astro 7 + React island + Lingui macros in `.astro` and `.tsx`, 3 locales [measured]

Folder: `scratchpad/astro-verify/spike` (throwaway). Exact versions: astro 7.3.5, @astrojs/react 7.0.0 (pulls @vitejs/plugin-react 6.1.2, vite 8.3.2), react/react-dom 19.3.0, lingui-for-astro 0.7.1, @lingui/{core,react,cli,conf,vite-plugin,format-po} 6.9.0, @lingui/native-tools 0.1.5, three 0.186.1, @react-three/fiber 9.8.1, ogl 1.0.11, TypeScript ~6.0.3, Node 22.22.0, npm 10.9.4, Windows 11.

Wiring (all that was needed):

```js
// astro.config.mjs
integrations: [react(), linguiForAstro()],
vite: { plugins: [lingui({ macroTransform: true })] },   // macros in .tsx + .po imports
i18n: { locales: ["en", "pl", "es"], defaultLocale: "en", routing: { prefixDefaultLocale: true } },
// lingui.config.ts: defineConfig from "lingui-for-astro/config", extractors [astroExtractor, babelExtractor]
// src/middleware.ts: setLinguiContext(context.locals, setupI18n({ locale: context.params.locale ?? "en", messages: catalog }))
// src/lib/catalog.ts: import { messages as pl } from "../locales/pl/messages.po"   (compiled by the Vite plugin)
// src/pages/[locale]/index.astro: getStaticPaths() -> en/pl/es; t`...`, <Trans>...<strong>...</strong></Trans>, <Plural value={n} one="# project" other="# projects" />
// island A (catalog-as-props): <Counter client:visible locale={locale} messages={messagesFor(locale)} />, I18nProvider + useLingui()/Trans from "@lingui/react/macro"
// island B (locale only): <LazyCounter client:idle locale={locale} />, import(`../locales/${locale}/messages.po`) inside useEffect
```

Results:

| Step | Result |
|---|---|
| `npm install` (348 packages) | OK, 60 s, no peer warnings |
| `lingui extract` | OK, 4 s: **7 messages** found across `.astro` (title, h1, `Trans` with a `<0>` tag, ICU plural) and `.tsx` (`useLingui().t` in an `aria-label`, `Trans` with `{count}`) |
| `astro build` | OK, 9 pages in 8.4 s (35 s wall incl. type generation and the first-run optimizer). Only warnings: Rolldown "chunk > 500 kB" (three) and `THREE_CJS_DEPRECATED` from R3F during SSR |
| Static HTML `/pl/` | `<html lang="pl">`, "Cześć z Astro", "Buduję <strong>szybkie</strong> strony.", **"3 projekty"** (Polish `few` plural form correct), island SSR'd as "Kliknięto 0 razy" with a translated `aria-label` |
| Hydration (Playwright Chromium, 2 clicks) | `/pl/` "Kliknięto 2 razy", `/es/` "Pulsado 2 veces"; the locale-only island loaded its own catalog chunk ("Wczytałem własny katalog" / "Cargué mi propio catálogo"); **0 console errors** |
| Lingui runtime cost in an island | `@lingui/core` + `@lingui/react` chunk 3.1 KB gz; compiled catalog chunk per locale 0.3 KB gz (7 messages) |
| JS on `/pl/` | 73.3 KB gz external (React runtime about 68 KB of it: react-dom client 63.0 + react 2.9 + scheduler 1.5 + shim/runtime 1.0) + 2.2 KB inline island loader; HTML 2.7 KB gz |

What broke / caveats:
1. **Catalog-as-props serialises the whole locale catalog into the island's `props` attribute**, including strings only `.astro` pages use (all 7 messages appeared in the HTML). Same finding as the repo. Fix: the locale-only pattern (island B), or a separate Lingui catalog for islands (`catalogs: [{ path: "src/locales/{locale}/islands", include: ["src/components/islands"] }, ...]`) [assumption: multi-catalog not spiked].
2. `astro preview` (Astro 7) bound only to IPv6 `[::1]:4391` on this Windows machine, so requests to `127.0.0.1`/`localhost` from Playwright were refused. A second start then failed with "Another astro preview server is already running ... PID 28684", and `--force` didn't replace it. This is a DX annoyance only (use `--host` explicitly). `dist/` was served with a tiny Node server instead.
3. Not tested: `lingui extract` with native-tools' `createSwcExtractor()` (faster); `astro check` on `.po` imports (needs `declare module "*.po"`, added in `src/env.d.ts`); behaviour on Vercel's Linux build image.

### 2.4 Alternatives (if lingui-for-astro is dropped)

| Wiring | How | Trade-off |
|---|---|---|
| A. **lingui-for-astro + Vite plugin native macros** (spiked) | as above | one pre-1.0, single-maintainer dependency for `.astro` files; everything else is official Lingui |
| B. Official Lingui only: macros in `.tsx`/`.ts`; `.astro` uses plain `@lingui/core` | `.astro` frontmatter: `const i18n = setupI18n({ locale, messages: { [locale]: messages } }); i18n._(pageTitle)` where `pageTitle = msg` + "`Hello`" from `@lingui/core/macro` lives in a `.ts` module (the Vite plugin transforms `.ts`); extraction with the babel extractor | no third-party adapter; `.astro` templates can't use `<Trans>` rich text, so rich-text strings go in React components rendered without `client:*` (0 KB JS). The repo plan already uses React TSX for all sections and `.astro` only for routes/layouts, which makes B cheap |
| C. Typed per-locale dictionaries (the repo landing's choice) | `dict/en.ts`, `dict/pl.ts`, ... | no `.po`, so `lingui-translate-ai` can't run on it; ruled out (Lingui is a user requirement) |

Recommendation [assumption]: **B as the architecture, A as an optional convenience.** Write sections as React components (server-rendered, no directive) using `@lingui/react/macro`; keep `.astro` for routes, `<head>` and data loading. lingui-for-astro is then only needed for a handful of layout strings (title, meta description), and dropping it later costs a few `i18n._(msg...)` calls. Every React root needs an `I18nProvider`: each top-level component rendered from `.astro` is its own root, so wrap section components (a `withI18n` HOC or a `<Section locale>` wrapper).

### 2.5 Static per-locale pages

- Routes `src/pages/[locale]/...` with `getStaticPaths()` returning `LOCALES.map(locale => ({ params: { locale } }))`; nested `[locale]/work/[slug].astro` returns locale × slug. Astro i18n config `{ locales: ["en","pl","es"], defaultLocale: "en", routing: { prefixDefaultLocale: true } }` gives `/en/...` plus `getRelativeLocaleUrl()` helpers [web: https://docs.astro.build/en/guides/internationalization/ (tech-stack S12)].
- `/` to `/en/`: a `vercel.json` redirect (308 at the edge), not `Astro.redirect` in a static page, which emits a meta-refresh page [assumption; the repo uses the vercel.json form].
- hreflang: `<link rel="alternate" hreflang="en|pl|es|x-default">` in the layout; `@astrojs/sitemap` 3.7.4's `i18n` option works when slugs are identical across locales (the repo's problem was translated slugs) [repo].
- Blog: per-locale MDX in one collection; a post missing in a locale is simply not generated there (no fallback page, no hreflang to it).

### 2.6 lingui-translate-ai in this workflow [web][measured]

- `lingui-translate-ai` 1.1.0 (2026-07-10), the user's CLI: translates empty `msgstr`, repairs bad ones, keeps terminology consistent, preserves `{placeholders}` and `<0>` tags, raw-patches PO files, `.bak` backups, dry-run, request caps, OpenRouter key from `.env` [web: https://www.npmjs.com/package/lingui-translate-ai].
- In the spike, `npx lingui-translate-ai init` auto-detected `sourceLocale: "en"`, `localesDir: "src/locales"`, `poFileName: "messages.po"` (default model `openai/gpt-4o-mini` via OpenRouter) [measured]. Translation itself not run (no API key in the spike).
- Workflow: `lingui extract` → `lingui-translate-ai translate --only-empty --dry-run` → review → run → commit `.po` → `astro build` (the Vite plugin compiles `.po`; set `failOnMissing: "catalog"` for production builds so an untranslated string fails CI) [web for the option; not spiked].
- Blog MDX sits outside Lingui, so the tool doesn't cover posts; posts are translated per file.

### 2.7 For completeness: Lingui in Next 16.3 [web]

- `@lingui/swc-plugin` is still 6.7.0 (2026-08-27). Issue lingui/swc-plugin#253 "Incompatible with Next.js 16.3.x ... Failed to deserialize program received from host" (opened 2026-09-02) was **closed 2026-09-05 as a misdiagnosis**: the maintainer pointed to plugins.swc.rs (compatibility follows `swc_core`), and the reporter confirmed **`@lingui/swc-plugin` 6.6.0 works on Next 16.3.4 with Turbopack (78 macro call sites)** [web: https://github.com/lingui/swc-plugin/issues/253]. So the repo's "Lingui in Next 16.3 is broken" was a version-pairing problem (6.7.0 targets the `@swc/core` 1.16 runner), not a dead end. The repo measured 6.7.0 only.
- Still open: #205 "Next react compiler incompatibility" (plugin order can't be controlled with `reactCompiler: true`); on 2026-09-25 the maintainer proposed `@lingui/native-tools` as a Turbopack loader plus `experimental.turbopackRustReactCompiler` [web: https://github.com/lingui/swc-plugin/issues/205]. #250: partial failures of 6.7.0 on `@swc/core` 1.16 [web].
- Net: Lingui on Next 16.3 works today by pinning `@lingui/swc-plugin@6.6.0` (or the new native-tools loader), but the pairing must be re-checked on every Next minor. On Astro/Vite the official plugin is first-party and doesn't depend on the host's SWC version.

## 3. WebGL in Astro

### 3.1 Measured island cost (same spike, Astro 7.3.5 production build, Rolldown, gzip -9 of the real `dist/_astro` chunks a page loads) [measured]

| Page (one minimal rotating lit box) | JS the page loads (gz) | Breakdown |
|---|---|---|
| R3F island (`<R3FScene client:visible />`, R3F 9.8.1 + three 0.186.1) | **301.7 KB** | React runtime 68.4 + R3F/zustand/its-fine 52.9 + **all of three 180.2** (R3F v9 imports the whole `THREE` namespace, so no tree-shaking) |
| R3F island, incremental when React already loads for another island | ≈ 233 KB | |
| Vanilla three in an Astro `<script>` (WebGLRenderer, MeshStandardMaterial, 2 lights), built alone | **126.2 KB** | tree-shaken; in the combined build it shared R3F's full three chunk (180 KB), so keep R3F and vanilla three apart |
| OGL 1.0.11 in an Astro `<script>` (custom 2-line shader) | **14.0 KB** | |
| `<ClientRouter />` only | **5.4 KB** | repo measured 5.7 KB |
| Page with Lingui React island (for comparison) | 73.3 KB | §2.3 |

Reading [assumption]:
- The synthesis cap C1 (~300 KB gz lazy 3D) is **already used up by a bare R3F scene plus React**, before drei, postprocessing, models or scene code. The earlier esbuild numbers (tech-stack §3: R3F + three 244 KB) agree within ~10 KB.
- For one signature moment on the home page, **vanilla three (≈126 KB + scene code) or OGL (≈14 KB + shaders)** fits the budget far better. R3F's value (declarative scene graph, drei helpers, `<View>` multi-scene) pays off for several scenes or a persistent world, which the "Band 2.5" concept doesn't need.
- If the user wants R3F for the hiring signal ("React + three"), it still works as a lazy island; budget about 300 KB gz and gate it on capability (below).

### 3.2 Hydration directive for the hero canvas

- `client:visible` on an above-the-fold island hydrates immediately at load (it's already intersecting), which competes with LCP: repo bench, same island: `client:visible` below the fold 100 / LCP 1.66 s vs `client:load` 98 / LCP 2.26 s [repo research.md §6].
- `client:idle` waits for `requestIdleCallback` (Astro supports `client:idle={{ timeout: N }}`) [assumption: option exists since Astro 4.15; not re-verified for 7].
- Better for this site [assumption]: a **custom client directive** (`addClientDirective` in an integration) such as `client:after-load` that waits for `load` + idle, then checks `prefers-reduced-motion`, `navigator.connection.saveData`, `deviceMemory`, and a WebGL2 probe, and only then imports the island. Otherwise the poster/video stays. The canvas is never the LCP element (web.dev, tech-stack S48), so the hero H1/poster keep LCP.
- Spike: the R3F island rendered its `<canvas>` under SwiftShader with 0 console errors (only `THREE_CJS_DEPRECATED` at SSR: R3F's server import of `three` uses `require`; harmless, but it means the island is server-rendered as an empty wrapper).

### 3.3 Keeping a canvas across navigation

| | ClientRouter + `transition:persist` | Native cross-document View Transitions (`@view-transition { navigation: auto; }`) |
|---|---|---|
| Canvas survives navigation | **Yes, verified**: in the spike, a marker set on the `<canvas>` DOM node on `/bench/vt-a/` was still on the node after clicking to `/bench/vt-b/` and after Back; same document, 1 canvas, 0 errors [measured, Playwright Chromium] | No: each page is a new document; the WebGL context, shaders and textures re-initialise (assets come from HTTP cache) |
| JS cost | 5.4 KB gz router [measured] + SPA-style lifecycle (`astro:page-load`, `astro:after-swap`; analytics must track soft navigations; inline scripts need `data-astro-rerun`) | **0 KB** |
| Browser support | the router animates where same-document VT exists and falls back to swap/animate elsewhere (tech-stack S11). Same-document VT: Baseline newly available 2025-10-14 (Chrome 111, Firefox 144, Safari 18); caniuse 91.75% | `@view-transition`: **not Baseline**. web-features 3.40.1 (2026-10-01): Chrome/Edge 126, Chrome Android 126, Safari/iOS **18.2**, **no Firefox**. caniuse (2026-09-30): 85.97% full + 1.81% partial; Firefox 144-160 "partial: View Transitions Level 1 only", i.e. same-document only, so Firefox navigates normally without the animation |
| Failure mode | router bugs affect every navigation | unsupported browsers just navigate (perfect progressive enhancement) |

Recommendation [assumption]: the concept has one signature moment on the home page, so **don't persist a canvas; use native cross-document View Transitions (0 KB) for page changes** and the card → case-study morph via `view-transition-name`. That's what the repo landing chose too [repo plans/landing-v2.md § Tech]. Add ClientRouter only if a later `/explore` layer needs a canvas that lives across routes; the spike shows `transition:persist` works.

Sources: web-features 3.40.1 `data.json` (https://unpkg.com/web-features/data.json, published 2026-10-01) and caniuse `fulldata-json/data-2.0.json` (https://github.com/Fyrd/caniuse, updated 2026-09-30), both read from the copies the tech-stack track downloaded this morning (2026-10-05).

## 4. CV PDF from the same data as `/cv`

### 4.1 Spike: one `cv.json` (EN, with Polish diacritics), three generators, same machine [measured]

Folder `scratchpad/astro-verify/cv`. A4, single column, real text, embedded TTF (Arial copied from Windows for the test only), links. Text extracted with `pdfjs-dist` (the kind of parsing ATS tools do).

| Generator | Version | Time | Size | Text extraction | Tagged PDF | Notes |
|---|---|---|---|---|---|---|
| **Playwright `page.pdf()`** from HTML/CSS (`@page { size: A4 }`, `tagged: true`, `outline: true`) | playwright 1.63.0 (Chromium) | launch 75 ms + render/pdf 549 ms (warm) | 67.2 KB | correct order; "Zażółć gęślą jaźń", "Wrocław", en dashes all intact | **yes** (StructTreeRoot) | same CSS/fonts/components as the site; 4 link annotations |
| `@react-pdf/renderer` (React primitives, Yoga layout) | 4.9.0 | 218 ms | 51.0 KB | intact, but **"Mateusz MuszarskiFull-stack"** (no break between name and role: an ATS can merge them; fixable with explicit spacing) | **no** | a second template in a non-HTML layout model |
| Typst via `@myriaddreamin/typst-ts-node-compiler` (`json("cv.json")` inside the template) | 0.7.0 | init 2,504 ms (font scan) + **compile 14 ms** | 66.2 KB | intact, correct order | **yes** | best typography/pagination control; a second template in Typst markup; prebuilt Node binding (runs on Vercel's Linux without a browser) [assumption] |
| Paged.js | 0.4.3 (2023-07-06; beta 0.5.0-beta.2 2024-10-04) | not run | | | | stale, and it needs a headless browser anyway (pagedjs-cli drives Chromium), so it adds nothing over Playwright |

All three embed fonts, keep text selectable and produce about 50–70 KB. ATS-safety comes from the layout (single column, no text in images, standard headings, dates on the same line as titles), not the tool.

### 4.2 Can Playwright run inside a Vercel build? [web][assumption]

- The build image is **Amazon Linux 2023**; extra packages can be installed via `dnf install -y …` in the Install Command (`vercel.json` `installCommand`) [web: https://vercel.com/docs/builds/build-image, last updated 2026-08-11]. Playwright's `install --with-deps` only knows apt-based distros, so its bundled Chromium likely lacks system libraries there [assumption: not tried on Vercel].
- `@sparticuz/chromium` 153.0.0 (2026-09-11) ships a Brotli-packed Chromium **plus an `al2023.tar.br` library pack** for AWS Lambda's Amazon Linux 2023, and works with `puppeteer-core` or `playwright-core` via `executablePath: await chromium.executablePath()` [web: npm README]. Same base OS as the Vercel build image, so it's the most likely way to run `page.pdf()` in a Vercel build [assumption: needs a 30-minute spike].
- Alternative that avoids the question: build in **GitHub Actions** (Ubuntu, `npx playwright install --with-deps chromium` is supported) and deploy with `vercel build && vercel deploy --prebuilt`. The same pipeline then runs Lighthouse CI [assumption].
- Last resort: generate locally, commit `public/cv/*.pdf`, and gate on a hash (below).

### 4.3 Recommendation

**Playwright `page.pdf()` from a dedicated print route, generated per locale at build time.**
- Route `src/pages/[locale]/cv/print.astro` (`noindex`, excluded from the sitemap) renders the same `src/data/cv/<locale>.ts` and the same Lingui-translated labels as `/cv`, but in an ATS layout: one column, no decorative graphics, real headings, dates inline, links as visible text.
- A small Astro integration on `astro:build:done` serves `dist/`, opens `/<locale>/cv/print/` for en/pl/es, and writes `dist/cv/mateusz-muszarski-cv-<locale>.pdf` (`tagged: true`, `outline: true`, `preferCSSPageSize: true`, then `document.fonts.ready` before printing).
- Why not the others: react-pdf and Typst both need a second template, so design and wording can drift. react-pdf also produced untagged output and a merged word. Typst is the **plan B** if Chromium can't run on the build host: pure Node, 14 ms per compile, tagged output, fed the same JSON (export `cv.<locale>.json` with labels already translated by Lingui).

**Mechanical sync check** (works for either generator, and for committed PDFs):
1. **Content test** (vitest, runs after build): for each locale, extract the PDF text with `pdfjs-dist` and assert that every `title`, `org`, `dates`, bullet, skill and contact string from `cv/<locale>` appears (whitespace-normalised). This tests "same content" directly instead of by proxy. It runs in about a second.
2. If PDFs are committed instead of built: `scripts/cv-hash.mjs` hashes the inputs (`src/data/cv/**`, the print route and its components, `src/locales/*/messages.po`, the font files) and writes `public/cv/manifest.json` `{ inputsHash, generatedAt, pdfSha256 }` when the PDFs are regenerated. `astro build` fails when the recomputed `inputsHash` ≠ manifest, with "run `npm run cv:pdf`". Add the same check as a pre-commit hook.

### 4.4 "Click → navigate to /cv/ → auto-start the download" on phones

- iOS: the `download` attribute has been supported since iOS 13 (WebKit bug 167341 "[iOS] Add support for the download attribute", fixed 2019-01-25; "enabled in the iOS 13 Developer beta 1, along with true downloads support in MobileSafari"). Later comments report wrong file names ("Unknown", "Document") for PDFs and blob downloads [web: https://bugs.webkit.org/show_bug.cgi?id=167341]. caniuse "Download attribute": iOS Safari 26.4–27.2 and Chrome Android listed as supported, 96.86% global [web: caniuse data 2026-09-30].
- Downloads started without a user gesture are a browser policy, not a spec rule. MDN's list of APIs gated by transient activation doesn't include downloads, and transient activation is window state that "expires after a timeout" [web: https://developer.mozilla.org/en-US/docs/Web/Security/User_activation, modified 2026-08-04]. A new page loaded after the click is a new window state, so an auto-download on `/cv/` load runs **without activation**.
- In practice: iOS Safari is reported to block or ignore downloads not triggered by a direct tap, and to lose activation across async work [web, low-quality sources: developer.apple.com/forums/thread/91631 and a GitHub PR, https://github.com/SVSKHD/AQUAKARTECOM/pull/118]. Chrome allows one automatic download per page, then asks "download multiple files" [assumption: from Chrome's settings UI, not re-verified today].
- **Verdict: don't build "navigate + auto-download".** It's unreliable on iOS, it surprises users, and a PDF opened in Safari's inline viewer looks like "nothing happened".
- Instead:
  - The header "CV" button goes to `/cv/`.
  - `/cv/` has a primary **"Download PDF"** `<a href="/cv/mateusz-muszarski-cv-en.pdf" download="Mateusz-Muszarski-CV-EN.pdf">` that the user taps (that tap is the gesture), plus `type="application/pdf"` and the file size in the label.
  - Optionally a second small "PDF" icon link in the header that downloads directly.
  - Serve the PDFs with `Content-Disposition: attachment; filename="Mateusz-Muszarski-CV-EN.pdf"` (`vercel.json` `headers`), which also fixes the iOS file-name bug.
  - Must test on a real iPhone and Android before launch.

## 5. Contact endpoint in Astro on Vercel

### 5.1 Actions vs API route [web]

- **Astro Actions** (`defineAction({ accept: "form", input: z.object(...), handler })`) need on-demand rendering: "Pages must be on-demand rendered when calling actions using a form action. Ensure prerendering is disabled on the page before using this API." From a prerendered page an action can still be called from client JS (`actions.contact(formData)` in an island), because the action itself is an on-demand endpoint served by the adapter. The docs ask for "the same authorization checks that you would consider for API endpoints" [web: https://docs.astro.build/en/guides/actions/].
- **API route**: `src/pages/api/contact.ts` with `export const prerender = false` and `export const POST: APIRoute = async ({ request, clientAddress }) => ...`. With `@astrojs/vercel` 11, a mostly static site with one on-demand route deploys as "prerendered static files plus one serverless function" [web: https://docs.astro.build/en/guides/integrations-guide/vercel/]. The repo confirms the same shape: "Astro + `@astrojs/vercel` = static files + one Node 22 function when an endpoint is needed" [repo research.md §6].
- Adapter options listed today: `webAnalytics`, `imagesConfig`, `imageService`, `devImageService`, `isr`, `includeFiles`, `excludeFiles`, `maxDuration`, `skewProtection` (Pro/Enterprise), `staticHeaders`, `middlewareMode: 'edge'` [web: same page]. The contact function only needs `maxDuration: 10`.

**Pick: API route** [assumption]. It works without JS (`<form method="post" action="/api/contact">`, answered with a `303` redirect to `/<locale>/contact/sent/`), the React island enhances it with `fetch` and inline errors, and there's no Actions-specific API to learn. Actions are fine too if the form is always JS-driven; their gain is Zod-typed input, which the route gets with `schema.parse` anyway.

### 5.2 Handler sequence

1. Reject anything other than `POST` with a form or JSON `Content-Type`; reject bodies over ~10 KB.
2. Honeypot field (a hidden `website` input must be empty), plus a minimum fill time (a signed timestamp in a hidden field, at least 3 s).
3. **Turnstile `siteverify`**, which is mandatory: "The client-side widget alone does not protect your forms". `POST https://challenges.cloudflare.com/turnstile/v0/siteverify` with `secret`, `response` (max 2048 chars), optional `remoteip` and `idempotency_key`. Tokens are valid for **300 s** and are **single-use** (a replay returns `timeout-or-duplicate`). Check `success`, `hostname` (must equal the site's host) and `action` (e.g. `contact`) [web: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/, updated 2026-09-16].
4. Zod-validate `name`, `email`, `message`, `locale`, `consent`.
5. **Resend** (`resend` 6.32.0): send to self with `replyTo` set to the visitor's address. Skip an auto-reply to the visitor (or send it only after Turnstile passes) so the form can't be used to mail-bomb third parties. Free plan: 3,000 emails/month, 100/day (tech-stack S38, accessed 2026-10-05).
6. Respond with `303` (no-JS) or JSON (JS). Never echo the message back unescaped.

### 5.3 Rate limiting without a database

| Option | Free allowance | Fit |
|---|---|---|
| **Vercel WAF rate-limit rule** (dashboard; or `@vercel/firewall` `checkRateLimit` in code) | "available on all plans". Hobby: **1 rate-limit rule per project**, fixed window 10 s to 10 min, keys IP or JA4 digest, **1,000,000 allowed requests included**; Hobby projects get up to 3 custom firewall rules in total. Counters are per region [web: https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting, updated 2026-08-28] | **best**: e.g. path equals `/api/contact`, 5 requests per 10 min per IP, then 429. Enforced before the function runs: no DB, no code |
| Upstash Redis + `@upstash/ratelimit` 2.2.0 | Free: 500K commands/month, 256 MB, 10 GB bandwidth, 1 database; pay-as-you-go $0.2 per 100K commands [web: https://upstash.com/pricing/redis] | works, but adds a second vendor and secrets for a form that gets a few messages a month |
| Turnstile + honeypot only | free | acceptable floor: Turnstile already stops most bots, and Resend's 100/day cap bounds the worst case |

Recommendation [assumption]: Turnstile + honeypot + **one Vercel WAF rate-limit rule on `/api/contact`**. Skip Upstash unless the site moves off Vercel. On Cloudflare, the equivalent is a Workers rate-limiting binding or a WAF rule.

### 5.4 Hosting terms (2026-10-05)

| | Vercel Hobby | Vercel Pro | Cloudflare Workers (static assets) | Netlify Free |
|---|---|---|---|---|
| Price | $0 | $20 per developer seat/month (tech-stack S31); Pro now advertises a "Flat Rate CDN" | $0; Workers Paid from $5/month (tech-stack S35) | $0; Personal $9/month, Pro $20/month [web: https://www.netlify.com/pricing/] |
| Commercial use | **"Hobby teams are restricted to non-commercial personal use only."** Commercial means use "for the purpose of financial gain of **anyone** involved in **any part of the production** of the project, including a paid employee or consultant writing the code". Examples: taking payments, **"Advertising the sale of a product or service"**, being paid to build or host the site, affiliate-first sites, ads. "Asking for Donations **does not** fall under commercial usage." If unsure, contact support [web: https://vercel.com/docs/limits/fair-use-guidelines, updated 2026-09-14] | allowed | no restriction stated on the pricing pages (tech-stack S34/S35) [assumption: Cloudflare's self-serve terms don't ban commercial use on Free; not re-read today] | not mentioned on the pricing page [web] |
| Limits that matter here | 100 GB transfer, 1M function invocations, 4 h active CPU, 5K image transformations/month; WAF rate limiting included | usage-based | static asset requests "free and unlimited" (S34); Workers Free 100K requests/day, 10 ms CPU per invocation (S35) | **300 credits/month** (a deploy costs 15, 1 GB costs 20) (S36) |
| Astro adapter | `@astrojs/vercel` 11.0.11 (Astro ^7) | same | `@astrojs/cloudflare` 14.3.3 (Astro ^7.2, wrangler ^4.125); Astro is owned by Cloudflare since 2026-01-16 (S10) | `@astrojs/netlify` 8.2.6 |

Reading for a job-seeker [assumption, not legal advice]:
- A site that only presents the person to employers (CV, case studies, "hire me" meaning employment) is personal use, so **Hobby fits**.
- The moment the site says "available for freelance", lists rates, or has a "hire me for a project" CTA, it is "advertising the sale of a ... service", which Vercel's own examples cover. That needs **Pro ($20/month)** or a different host.
- **Cloudflare Workers is the free option that tolerates a freelance CTA**: unlimited static requests, the contact endpoint as a Worker (Turnstile is Cloudflare's own), a first-party Astro adapter. Cost of moving: rewrite the `vercel.json` redirects and headers as `_redirects`/`_headers` or Worker config, and swap the Vercel WAF rule for a Workers rate-limiting binding.
- Netlify Free's 300 credits (about 20 deploys) is too tight for a site that deploys often.
- **Default:** Vercel Hobby while the copy is employment-only (the repo's tooling and the user's experience are on Vercel). Decide D5 (freelance) before launch: if yes, Cloudflare Workers ($0) or Vercel Pro ($20/month).

## 6. Umami analytics

| | Umami Cloud Hobby | Umami Cloud Pro | Self-hosted |
|---|---|---|---|
| Price | $0 | $20/month | $0 to ~$5/month |
| Limits | "Up to 100K events per month", **1 website**, **6-month retention**, no team members | 1M events/month, 2-year retention, up to 10 members; overage $0.00003/event | none (your own DB) |
| Data region | "Umami Cloud servers are located in the US and EU and adhere to GDPR and CCPA regulations" (how the region is picked per account wasn't shown on the page) | same | wherever you host (e.g. Supabase or Neon in the EU + Vercel `fra1`) |
| Effort | snippet only | snippet only | a Next.js app + Postgres to deploy, upgrade and back up |

Source: https://umami.is/pricing (accessed 2026-10-05) [web].

- **Script** `https://cloud.umami.is/script.js`: 4,810 B raw, **2,349 B gzip -9** [measured: downloaded 2026-10-05; `last-modified` 2026-10-01; `cache-control: public, max-age=86400`]. It posts to `gateway.umami.is` `/api/send`. The repo CSP already allows `cloud.umami.is` and `gateway.umami.is` (Umami changelog of 2026-06-06) [repo astro.config.mjs].
- **Storage access**: the script sets no cookies, but it **reads `localStorage.getItem("umami.disabled")`** (the opt-out flag) [measured: grep of the minified script]. Under the PKE art. 399 / EDPB 2/2023 reading in tech-stack §9, that is also "accessing" the device, though only for an opt-out flag. Mention it in the privacy notice.
- Attributes the script reads: `data-website-id`, `data-host-url`, `data-domains` (restrict to the production host so previews don't count), `data-auto-track`, `data-exclude-search`, `data-exclude-hash`, `data-do-not-track`, `data-tag`, `data-before-send`, `data-distinct-id`, `data-fetch-credentials`, `data-performance` (new, performance reporting), and `data-umami-event-*` for click events [measured: script].
- **Astro integration**: no package needed. Put `<script is:inline defer src="https://cloud.umami.is/script.js" data-website-id={PUBLIC_UMAMI_WEBSITE_ID} data-domains="<prod host>">` in the layout and render it only when the env var is set. The repo landing does exactly this with an `envField` [repo]. With ClientRouter you'd need a manual `umami.track()` on `astro:page-load`; with native cross-document VT (§3.3) every navigation is a real page load, so automatic page views just work.
- **Pick: Umami Cloud Hobby, EU region.** 100K events/month is plenty for a portfolio; 6-month retention is the trade-off. Self-host only for long retention or a fully EU data story.

## 7. Media pipeline

### 7.1 Images

- `astro:assets` (`<Image>`, `<Picture formats={["avif","webp"]}>`, `getImage()`) produces AVIF/WebP at build with sharp 0.35.5 and needs no setup [repo research.md §6: "`astro:assets` makes AVIF/WebP with no setup"]. AVIF has been Baseline widely available since 2026-07-25 (tech-stack §5), so AVIF first with a WebP fallback is enough. No Vercel image transformations are used, so the Hobby 5K/month cap doesn't apply.
- Repo lab rules worth copying: global `img, video { height: auto }` (height attributes otherwise beat `aspect-ratio`), explicit width/height, `fetchpriority="low"` everywhere except the LCP candidate [repo plans/landing-v2.md].

### 7.2 Video loop codecs (caniuse data 2026-09-30) [web]

| Codec / container | Global | Safari / iOS | Chrome / Android | Firefox |
|---|---|---|---|---|
| H.264 MP4 | **97.26%** | yes | yes | yes |
| HEVC (H.265) MP4, `hvc1` tag | 16.94% full + 76.59% partial | **yes, all iOS 15–27** | partial (needs a hardware decoder) | partial |
| AV1 MP4 | 80.39% full + 14.63% partial | **partial on iOS 17.0–27.2 and macOS: "Supported only on devices with hardware decoder, e.g. iPhone 15 Pro, M3 MacBook Pro"** | yes | yes |
| VP9 WebM | 96.05% | yes from iOS 17.4 (no alpha) | yes | yes |

So on iOS 17/18, AV1 plays only on iPhone 15 Pro and later (A17 Pro+) and M3+ Macs. Every other iPhone needs HEVC or H.264. The `<source type>` list must end with H.264.

### 7.3 Measured encodes [measured]

Source: a lossless (FFV1) 6 s, 30 fps scroll capture of the repo's built landing (`apps/pstrykweb.pl/dist/pl/`, Playwright screenshots at 1280×720), scaled to 960×540, no audio. ffmpeg 8.1.2 (gyan.dev full build), SVT-AV1 4.1.0. SSIM against the scaled source, frames aligned by index.

| Encode | Size | SSIM | Encode time |
|---|---|---|---|
| H.264 `libx264 -profile:v high -preset veryslow -crf 30` (= repo `encode-video.mjs`) | 388 KB | 0.9827 | 5.8 s |
| H.264 CRF 26 | 545 KB | 0.9892 | 5.2 s |
| HEVC `libx265 -preset slow -crf 30 -tag:v hvc1` | 254 KB | 0.9901 | 4.4 s |
| VP9 `libvpx-vp9 -crf 40 -b:v 0 -deadline good -cpu-used 2` | 279 KB | 0.9876 | 4.4 s |
| AV1 `libsvtav1 -preset 4 -crf 36 -g 240 tune=0` | 278 KB | 0.9959 | 3.9 s |
| AV1 CRF 40 | 229 KB | 0.9951 | 4.6 s |
| **AV1 CRF 46** | **177 KB** | **0.9934** | ~4 s |
| AV1 CRF 52 | 139 KB | 0.9913 | ~4 s |

Reading: at equal or better SSIM than the repo's H.264 CRF 30, AV1 is **55–64% smaller** (177/139 KB vs 388 KB) and HEVC is 35% smaller. SSIM undervalues text blur in UI recordings, so pick the CRF by eye on a real phone [assumption]. One synthetic scroll clip; real project loops (cursor, typing, transitions) will differ.

### 7.4 Recommended settings (extends the repo's `scripts/encode-video.mjs`)

Keep the repo script's structure: hashed file names, `media.gen.ts`, posters, stills, and `-an` (no audio track). Add AV1 and (optionally) HEVC next to the H.264 fallback:

```text
AV1 :  -an -vf scale=960:-2:flags=lanczos,fps=30 -c:v libsvtav1 -preset 4 -crf 44..48 -g 240 -pix_fmt yuv420p -svtav1-params tune=0 -movflags +faststart   → loop-960.<h>.av1.mp4
HEVC:  -an -vf ... -c:v libx265 -preset slow -crf 30 -tag:v hvc1 -pix_fmt yuv420p -movflags +faststart                                                 → loop-960.<h>.hevc.mp4  (optional)
H.264: (repo) -c:v libx264 -profile:v high -preset veryslow -crf 30 -pix_fmt yuv420p -movflags +faststart                                              → loop-960.<h>.mp4
```

```html
<video muted loop playsinline preload="none" width="960" height="540" aria-label="..." poster="/media/poster-960.<h>.avif">
  <source src="/media/loop-960.<h>.av1.mp4"  type='video/mp4; codecs="av01.0.04M.08"'>
  <source src="/media/loop-960.<h>.hevc.mp4" type='video/mp4; codecs="hvc1.1.6.L90.B0"'>
  <source src="/media/loop-960.<h>.mp4"      type='video/mp4; codecs="avc1.640028"'>
</video>
```

- Codec strings: from ffprobe of the spike files (AV1 Main, level index 4; HEVC Main, level 90 = 3.0). Generate them in the script from ffprobe, never by hand. Assumption to verify on a non-Pro iPhone: Safari answers "" to `canPlayType` for AV1 without a hardware decoder, so it falls through to HEVC or H.264.
- Loops: 6–12 s, 960 px wide for cards (2× a 480 CSS px card), 640 px variant for phones via a `media` attribute or JS choice, 30 fps (24 fps is enough for UI).
- **Playback policy (repo lab finding)**: starting the muted loop during load cost ~620 ms of media setup (TBT 270–480 ms, perf 87–93). So `preload="none"`, then start only after the first user interaction **and** ≥ 30% in view; pause when out of view; never autoplay under `prefers-reduced-motion`; provide a visible pause button (WCAG 2.2.2 for motion > 5 s). iOS Low Power Mode blocks autoplay, so the poster plus a play button must look intentional [repo plans/landing-v2.md; assumption for Low Power Mode].

### 7.5 Poster strategy

- `poster` takes a single URL (no `srcset`, no type fallback). The repo used an AVIF poster of 3.4 KB at 640p and 25 KB JPEG / 15 KB WebP at 960p, and found that **on phones the poster is the LCP element** when the card is larger than the H1 [repo research.md §7].
- Two options:
  - (a) `poster` = AVIF (Baseline widely) from the loop's first frame (repo: `libaom-av1 -still-picture 1 -crf 38`), ≤ 20 KB.
  - (b) Better for LCP and art direction [assumption]: no `poster` attribute. Put a `<picture>` (AVIF/WebP via `astro:assets`, correct `sizes`, `fetchpriority="high"` only for the first card) under the `<video>`, and fade the video in on `playing`. That gives responsive posters and keeps a real image as the LCP candidate.
- The first frame of the loop must equal the poster, so there's no jump when playback starts; the script already extracts both from the same timestamp.

## 8. Final

### 8.1 Recommended stack

| Package | Version (npm, 2026-10-05) | Why | Risk |
|---|---|---|---|
| astro (`output: "static"`, `trailingSlash: "always"`) | 7.3.5 | 0 KB JS by default; repo bench 100 / LCP 1.66 s vs Next 95 / 2.92 s; content collections; first-class i18n routing | low; 7.4 beta out (don't track betas) |
| @astrojs/react + react / react-dom | 7.0.0 + 19.3.0 | all sections as server-rendered TSX; islands only where interactive | React roots per island: an `I18nProvider` per root; nanostores 1.5.4 for shared state |
| typescript (+ @astrojs/check) | **~6.0.3** (+ 0.9.10) | `@astrojs/check` peers TS ^5/^6 only | TS 7 must wait |
| @lingui/core, /react, /cli, /conf, /vite-plugin (`macroTransform: true`), /format-po | 6.9.0 | user requirement; `.po` + `lingui-translate-ai` 1.1.0 workflow; native macros, no Babel; spike passed | 6.9 is 4 days old and native-tools is pre-1.0 (fallback: `linguiTransformerBabelPreset` + `@rolldown/plugin-babel` 0.2.4) |
| @lingui/native-tools | 0.1.5 | pulled in by the vite plugin | needs Node ≥ 22.19 on Vercel (set Node 22.x or 24.x) |
| lingui-for-astro | 0.7.1 (optional) | macros inside `.astro` (layout `<title>`, meta) | pre-1.0, 1 maintainer, 6 stars; architecture B keeps it optional (§2.4) |
| @astrojs/mdx | 8.0.2 | per-locale blog posts and case studies | none |
| @astrojs/sitemap / @astrojs/rss | 3.7.4 / 4.0.19 | hreflang sitemap (same slugs in every locale), RSS per locale | low |
| @astrojs/vercel | 11.0.11 | static files + one Node function for `/api/contact` | only if hosting stays on Vercel; else @astrojs/cloudflare 14.3.3 |
| tailwindcss + @tailwindcss/vite | 4.3.3 | same as the repo landing | none |
| three (vanilla) **or** ogl for the signature moment | 0.186.1 / 1.0.11 | 126 KB / 14 KB gz measured vs R3F 302 KB with React | OGL hasn't released since 2025-01. R3F 9.8.1 only if the moment grows into several scenes (it caps React < 19.4) |
| gsap (optional, lazy) | 3.15.0 | scroll and route choreography if CSS isn't enough; free incl. plugins | 27–47 KB gz; load after LCP |
| motion (vanilla `animate`/`inView` only, if needed) | 14.0.0 | small UI motion; `motion/mini` ~4.7 KB [repo] | 14.0 is 3 days old: pin 13.5.x or wait |
| lenis | 1.3.26 | skip by default (repo: "breaks anchors, no touch benefit") | |
| native CSS `@view-transition` | 0 KB | page and card → case morphs; Firefox navigates without animation | not Baseline (Chrome 126, Safari 18.2) |
| playwright (+ @sparticuz/chromium for Vercel builds) | 1.63.0 (+ 153.0.0) | CV PDF from the print route; tagged, selectable, 67 KB | Chromium on the Vercel build image unproven → spike S1; plan B Typst (`@myriaddreamin/typst-ts-node-compiler` 0.7.0) |
| pdfjs-dist (test only) | latest | PDF ↔ data content-equality test | none |
| resend | 6.32.0 | contact mail (3,000/month free) | none |
| Cloudflare Turnstile | n/a (HTTP API) | bot check, server-verified | none |
| Vercel WAF rate-limit rule | n/a | 1 free rule on Hobby; no DB | per-region counters |
| Umami Cloud Hobby | script 2.3 KB gz | cookieless page views + events, EU | 6-month retention; reads one localStorage key |
| ffmpeg (SVT-AV1 + x264, optional x265) | 8.1.x | AV1 loops 55–64% smaller than H.264 | AV1 on iPhone only with A17 Pro+ → H.264 fallback mandatory |

### 8.2 Spikes required before the build

| # | Spike | Pass condition | Time |
|---|---|---|---|
| S1 | Deploy this spike to Vercel (Hobby): native-tools macro build on Linux, `/api/contact` function, a WAF rule, **Playwright + @sparticuz/chromium PDF in `astro:build:done`** | build green; PDFs in `dist/cv/`; pdfjs content test passes; 429 after N POSTs | 1–2 h |
| S2 | Signature moment, vanilla three vs R3F, with the custom `client:after-load` directive, on Lighthouse mobile (3 runs) | Perf ≥ 95, LCP < 2.0 s, TBT < 100 ms on home with the 3D tier on | half a day |
| S3 | Cross-document VT card → case morph (`view-transition-name`) | smooth on Chrome Android + iOS Safari 18.2+; Firefox navigates cleanly | 1–2 h |
| S4 | Real devices: a non-Pro iPhone on iOS 18 + a mid-range Android | AV1 → H.264 fallback picks correctly; Low Power Mode poster state; PDF `<a download>` keeps the file name | 1 h |
| S5 | Lingui: a separate islands catalog (or the locale-only loader) + `failOnMissing` in CI + one `lingui-translate-ai` run on real copy | island HTML carries no foreign strings; a missing PL string fails CI | 1 h |

### 8.3 Verdict: Astro vs Next for THIS site

**Astro 7.**
- **The measured performance gap is real and structural.** On the same page the repo measured Astro 100 / LCP 1.66 s / 0 KB JS against Next 16.3 95 / 2.92 s / 180 KB. Even Next with zero client components shipped ~138 KB of framework JS on the LCP path. The site's thesis ("immersive-feeling but 90+ on mobile and accessible", synthesis TL;DR 3) is easier to prove and keep with 0 KB JS by default.
- **Content model fit.** The site is content pages (case studies, blog, CV) in 3 locales with one lazy 3D moment. Astro's collections, static i18n routing, MDX per locale and `astro:assets` fit it with no glue. The repo already runs the same stack in production-grade form (`apps/pstrykweb.pl`).
- **Lingui** works on Astro 7 today (spiked: `.astro` + `.tsx` macros, 3 locales, ICU plurals, hydration). Correction to the repo note: Lingui on Next 16.3 isn't dead either; `@lingui/swc-plugin` 6.6.0 works on Next 16.3.4 (issue #253). It's a fragile pairing, though, while the Vite plugin is first-party.
- **What Next would give:** the persistent root-layout canvas (not needed: one signature moment, no persistent world), React `<ViewTransition>` (native cross-doc VT covers it at 0 KB), and the hire-signal of the framework name.

**Hiring-signal angle, honestly:**
- Next.js is in far more offers (justjoin.it 2026-10-05: Next.js 351, React 1,446, Astro 8).
- But the portfolio's own framework is barely visible to the people who decide. Recruiters skim for 5–30 s and judge the content (synthesis TL;DR 1). Engineers who open the repo will see **React + TypeScript components** (every section is TSX) plus a measured, documented performance decision. "I benchmarked Next 16 vs Astro 7 and chose Astro: 100 vs 95, LCP 1.66 vs 2.92 s" is a stronger senior signal than using the default.
- The user's Next.js skill is better proven by the case studies of the apps that **are** Next.js (the pstryk app/viewer). Mention Next in those, and put "Built with Astro + React + TS, Lighthouse 100" in the footer and case study #0.
- Residual risk: a Next-only shop browsing GitHub sees `.astro` files. Low impact, mitigated by the React-first code layout.

When to reverse this: if the user wants a persistent 3D world across routes (an `/explore` hub as the main experience), or several R3F scenes woven through every page. Then Next's layout-level canvas (or Astro ClientRouter + `transition:persist`, verified working in §3.3) has to be weighed again.

---

Not covered: deploying anything to Vercel or Cloudflare (all spikes local, Windows 11); Lighthouse runs of the spike pages (sizes only; the Lighthouse comparison is the repo's 2026-09-27 bench); Playwright PDF generation on the Vercel build image (S1); real-device iOS/Android behaviour for video codec fallback, Low Power Mode and `<a download>` (S4); Safari's actual `canPlayType` answer for AV1 on non-hardware devices; Umami EU-region selection mechanics and Umami's own privacy terms; Cloudflare's self-serve terms text on commercial use (relied on the tech-stack track's pricing-page reading); Astro Actions `ActionAPIContext` fields (e.g. `clientAddress`) for Astro 7; Lingui multi-catalog splitting and `failOnMissing` behaviour (documented, not spiked); `createSwcExtractor()` speed; Typst/react-pdf with the final CV design; GSAP/Motion bundle re-measurement inside Astro; drei/postprocessing cost inside an Astro island; WebSearch used 1 of the ~8 shared budget.

## Sources (all accessed 2026-10-05)

- npm registry: `https://registry.npmjs.org/<pkg>` for every package in §1 (dist-tags, time, peerDependencies, READMEs of lingui-for-astro, lingui-translate-ai, @lingui/vite-plugin, @lingui/native-tools, @sparticuz/chromium)
- lingui-for-astro docs: https://lingui-for.roundtrip.dev/frameworks/astro/using-islands · https://lingui-for.roundtrip.dev/frameworks/astro/i18n-context
- lingui-for repo (GitHub API: repo, issues, contributors, `packages/lingui-for-astro/CHANGELOG.md`): https://github.com/SegaraRai/lingui-for
- Lingui Vite plugin reference: https://lingui.dev/ref/vite-plugin
- lingui/swc-plugin issues #253, #205, #250 and releases: https://github.com/lingui/swc-plugin/issues/253 · https://github.com/lingui/swc-plugin/issues/205 · https://github.com/lingui/swc-plugin/issues/250
- lingui-translate-ai: https://www.npmjs.com/package/lingui-translate-ai · https://github.com/MuchaSsak/lingui-translate-ai
- Astro Actions: https://docs.astro.build/en/guides/actions/
- Astro Vercel adapter: https://docs.astro.build/en/guides/integrations-guide/vercel/
- Vercel build image (updated 2026-08-11): https://vercel.com/docs/builds/build-image
- Vercel Fair Use Guidelines (updated 2026-09-14): https://vercel.com/docs/limits/fair-use-guidelines
- Vercel WAF rate limiting (updated 2026-08-28): https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting
- Cloudflare Turnstile server-side validation (updated 2026-09-16): https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- Upstash Redis pricing: https://upstash.com/pricing/redis
- Netlify pricing: https://www.netlify.com/pricing/
- Umami pricing: https://umami.is/pricing · script: https://cloud.umami.is/script.js
- WebKit bug 167341 "[iOS] Add support for the download attribute": https://bugs.webkit.org/show_bug.cgi?id=167341
- MDN, User activation (modified 2026-08-04): https://developer.mozilla.org/en-US/docs/Web/Security/User_activation
- iOS download anecdotes (low quality): https://developer.apple.com/forums/thread/91631 · https://github.com/SVSKHD/AQUAKARTECOM/pull/118
- web-features 3.40.1 data (published 2026-10-01): https://unpkg.com/web-features/data.json; caniuse full data (updated 2026-09-30): https://github.com/Fyrd/caniuse (both from the copies the tech-stack track downloaded on 2026-10-05)
- Earlier tracks reused: `2026-10-05-tech-stack.md` (S10, S12, S31, S34–S36, S38, S48), `2026-10-05-synthesis.md`
- Repo: `context/pstryk-turborepo/.claude/project-info/landing/research.md` §3/§6/§7, `known-issues.md`, `plans/landing-v2.md`, `apps/pstrykweb.pl/{package.json, astro.config.mjs, vercel.json, scripts/encode-video.mjs}`
- Spike folders (throwaway): `C:\Users\Mucha\AppData\Local\Temp\claude\c--Users-Mucha-Desktop-new-portfolio\35a99cc4-00a3-4252-ad34-8c7868834527\scratchpad\astro-verify\{spike,cv,video}`
