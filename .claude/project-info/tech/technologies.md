# Technologies

> Owns the stack, versions, hosting, services, env var NAMES, commands, repo layout and tech decisions.
> Evidence: `research/2026-10-05-stack-astro-verify.md` (versions from npm 2026-10-05, spikes measured on this
> machine) + `research/2026-10-05-pstryk-reuse-audit.md` (what to copy from pstrykweb.pl). Code style: `conventions.md`.

## Stack

| Layer | Choice | Version | Why | Source |
| --- | --- | --- | --- | --- |
| Framework | Astro, `output: "static"`, `trailingSlash: "always"` | 7.3.5 | 0 KB JS by default; owner's own bench: Astro 100 / LCP 1.66 s vs Next 95 / 2.92 s (measured on an internal project: never quoted on the site) | [user] 2026-10-05, [research] |
| Components | React TSX via `@astrojs/react` (server-rendered; hydrate only islands) | 7.0.0 + react 19.3.0 | all sections are TSX (a React signal in the repo) | [research] |
| Language | TypeScript strict (+ `@astrojs/check`) | **~6.0.3** (+ 0.9.10) | `@astrojs/check` does not accept TS 7 | [research] |
| i18n | Lingui: core/react/cli/vite-plugin (`macroTransform: true`), format-po; `lingui-for-astro` for macros in `.astro` files | 6.9.0; 0.7.1 | owner requirement; spike passed (macros in `.astro` + `.tsx`, 3 locales, PL plurals); details `site/i18n.md` | [user], [research: spike] |
| Content | `@astrojs/mdx` per-locale collections; `@astrojs/sitemap`; `@astrojs/rss` | 8.0.2; 3.7.4; 4.0.19 | case studies, posts, legal per locale | [research] |
| Styling | Tailwind CSS + `@tailwindcss/vite` | 4.3.3 | same as the pstrykweb.pl landing | [research] |
| Signature 3D | **vanilla three** (default) or **OGL** in an Astro `<script>` island, behind a custom `client:after-load` directive (load + idle + capability probe) | three 0.186.1 / ogl 1.0.11 | measured gz: R3F + React 302 KB (the whole budget) vs three 126 KB vs OGL 14 KB. R3F only if the moment grows into several scenes | [research: § 3.1] |
| Motion | CSS first; GSAP lazily after LCP if needed; `motion` vanilla only if needed | gsap 3.15.0; motion 13.5.x (14.0 too fresh) | | [research] |
| Page transitions | native cross-document View Transitions (`@view-transition`, `view-transition-name` for card → case) | 0 KB | Chrome 126+, Safari 18.2+; Firefox navigates without animation | [research: § 3.3] |
| Smooth scroll | none (no Lenis) | — | native scroll; Lenis breaks anchors | [research] |
| CV PDF | Playwright `page.pdf()` from `/<locale>/cv/print/` on `astro:build:done` (+ `@sparticuz/chromium` on Vercel) | playwright 1.63.0 | tagged PDF, 67 KB, the same components and data as `/cv/`; build output, never committed; a pdfjs content test fails the build when the PDF text ≠ the CV data; plan B Typst | [research: § 4] |
| Contact | `src/pages/api/contact.ts` → `/api/contact/` (trailing slash, `i18n.md`; `prerender = false`) + Turnstile `siteverify` + Resend; honeypot + min fill time; one host rate-limit rule | resend 6.32.0 | works without JS (POST → 303); no DB | [research: § 5] |
| Analytics | Umami Cloud Hobby (EU), script 2.3 KB gz, `data-domains` = prod host | — | cookieless; reads one localStorage opt-out key | [research: § 6] |
| Media | `astro:assets` AVIF/WebP; loops AV1 (CRF 44–48) + optional HEVC + **H.264 fallback**; ffmpeg 8.1 | — | AV1 55–64% smaller; iPhone AV1 only on A17 Pro+ | [research: § 7] |
| Testing | vitest; Playwright e2e + axe; Lighthouse script; pdfjs-dist PDF content test | — | gates in `working-agreement.md` § 2 | [research] |

## Hosting: **Vercel Pro** [user] 2026-10-05

| Option | Cost | Fits |
| --- | --- | --- |
| Vercel Hobby | $0 | **only** while the copy is employment-only. Vercel counts "advertising the sale of a product or service" as commercial [web: vercel.com/docs/limits/fair-use-guidelines, 2026-09-14] |
| Vercel Pro | $20/month | the "open to projects" line; the same tooling as pstryk (`vercel.json`, WAF rate-limit rule) |
| Cloudflare Workers (static assets + 1 Worker) | $0 | free and tolerates a freelance CTA; `@astrojs/cloudflare` 14.3.3; Turnstile is Cloudflare's; costs a port of redirects/headers |

- **Decided:** Vercel Pro ($20/month). It allows the "open to projects" line, and Vercel's DPA covers only Pro and Enterprise (`legal/compliance-and-data.md`).
- **Setup:** set the serverless function region to an EU region (`fra1`); add one WAF rate-limit rule on `/api/contact/`.

## Repo layout

Target folders: `conventions.md` § Folder rules. Created in Phase 1.

## Commands (set when Phase 1 scaffolds; target shape)

| Do | Run |
| --- | --- |
| dev | `npm run dev` (astro dev) |
| typecheck / lint / unit | `npm run check` (astro check + eslint + vitest) |
| i18n | `npm run i18n:extract` · `npm run i18n:compile` (`--strict`) |
| build | `npm run build` (compile catalogs → astro build → CV PDFs → SEO/link/launch gates) |
| e2e + a11y | `npm run e2e` |
| Lighthouse | `npm run lhci` |
| media | `npm run video` · `npm run og` · `npm run fonts` |
| wiki | `node .claude/hooks/wiki-check.mjs` |

Package manager: npm or bun (pstryk uses bun 1.3) [assumption: bun, decided at scaffold].

## Environment variables (names only)

| Name | Purpose | Where | Required |
| --- | --- | --- | --- |
| `PUBLIC_SITE_URL` | canonical origin (final domain, Q5) | host env | yes |
| `PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | contact bot check | host env | yes |
| `RESEND_API_KEY` / `CONTACT_TO_EMAIL` | contact delivery | host env | yes |
| `PUBLIC_UMAMI_WEBSITE_ID` | analytics; unset = no script | host env | no |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | only if not verified by DNS | host env | no |
| `INDEXNOW_KEY` | IndexNow pings after deploy | host env | no |
| `LAUNCH_BUILD` | true only for the production launch build; other builds are noindex | host env | yes |

## External services and limits

Resend free: 3,000/month, 100/day. Umami Hobby: 100K events/month, 1 site, 6-month retention. Turnstile
tokens: 300 s, single use. Vercel Pro WAF: rate-limit rules included (the exact count: check the Vercel docs in S1). Node ≥ 22.19 on the build host (Lingui native tools).

## Spikes before the build (pass conditions in research § 8.2)

| # | Spike | Pass |
| --- | --- | --- |
| S0 | Lingui wiring on the real scaffold (also `site/i18n.md`) | extract → strict compile → build, 3 locales, no catalog in island JS |
| S1 | Deploy to the chosen host: macro build on Linux, `/api/contact`, rate limit, PDF in `astro:build:done` | green build, PDFs, content test, 429 after N POSTs |
| S2 | Signature moment: vanilla three vs OGL (vs R3F) with `client:after-load` | Lighthouse mobile ≥ 95, LCP < 2.0 s, TBT < 100 ms with 3D on (stricter than the site bar on purpose: headroom for the 3D) |
| S3 | Cross-document VT card → case morph | smooth on Chrome Android + iOS 18.2+; Firefox clean |
| S4 | Real devices (non-Pro iPhone + mid Android) | codec fallback, Low Power Mode poster, PDF `download` file name |
| S5 | Lingui islands catalog + `lingui-translate-ai` on real copy | island HTML has no foreign strings; a missing PL string fails CI |

## Decisions

| Date | Decision | Rejected | Reason |
| --- | --- | --- | --- |
| 2026-10-05 | Astro 7 + React TSX | Next.js 16 | owner's bench (100 vs 95, 0 vs 180 KB JS), content-site fit; Next skill is shown by the Next case studies [user] |
| 2026-10-05 | Signature 3D in vanilla three / OGL | R3F + drei | R3F + React = 302 KB gz, the full budget [research] |
| 2026-10-05 | Native cross-document View Transitions | ClientRouter + persisted canvas | 0 KB; one signature moment needs no persistent canvas [research] |
| 2026-10-05 | CV PDF from a print route via Playwright | react-pdf, Typst (plan B) | one template, tagged output [research] |
| 2026-10-05 | No Lenis | Lenis desktop-only | native scroll, anchors, a11y [research] |
| 2026-10-05 | Vercel Pro, functions in fra1 | Cloudflare Workers ($0), Vercel Hobby | owner's choice; commercial use + DPA [user] |
| 2026-10-05 | Correction: Lingui on Next 16.3 works with `@lingui/swc-plugin` 6.6.0 (6.7.0 is the broken build) | — | issue #253; doesn't change the Astro choice [research] |
