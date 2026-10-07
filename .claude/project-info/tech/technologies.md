# Technologies

> Owns the stack, versions, hosting, services, env var NAMES, commands, repo layout and tech decisions.
> Evidence: `research/2026-10-05-stack-astro-verify.md` (versions from npm 2026-10-05, spikes measured on this
> machine) + `research/2026-10-05-pstryk-reuse-audit.md` (what to copy from pstrykweb.pl). Code style: `conventions.md`.

## Stack

| Layer | Choice | Version | Why | Source |
| --- | --- | --- | --- | --- |
| Monorepo | **Turborepo** + bun workspaces: `apps/web` + `packages/shared` (`usage/turborepo.md`) | turbo 2.11.7, bun 1.3.14 | the owner's choice, same shape as his pstryk repo | [user] 2026-10-05 |
| Framework | Astro, `output: "static"`, `trailingSlash: "always"` | 7.3.5 | 0 KB JS by default; owner's own bench: Astro 100 / LCP 1.66 s vs Next 95 / 2.92 s (measured on an internal project: never quoted on the site) | [user] 2026-10-05, [research] |
| Components | React TSX via `@astrojs/react` (server-rendered; hydrate only islands) | 7.0.0 + react 19.3.0 | all sections are TSX (a React signal in the repo) | [research] |
| Language | TypeScript strict (+ `@astrojs/check`) | **~6.0.3** (+ 0.9.10) | `@astrojs/check` does not accept TS 7 | [research] |
| i18n | Lingui: core/react/cli/vite-plugin (`macroTransform: true`), format-po; `lingui-for-astro` for macros in `.astro` files | 6.9.0; 0.7.1 | owner requirement; S0 passed on the real scaffold 2026-10-05; `.po` compiled on import (no committed compiled catalog); details `site/i18n.md`, `usage/lingui.md` | [user], [research: spike] |
| Content | `@astrojs/mdx` per-locale collections (`src/content.config.ts`); `@astrojs/sitemap`; RSS written by hand (`[locale]/rss.xml.ts`) | 8.0.2; 3.7.4 | posts (incl. case study #0) and legal per locale | [research] |
| Markdown | **Sätteri** (`@astrojs/markdown-satteri`, Astro 7's default processor): plugins are Sätteri mdast/hast plugins, not remark/rehype; Shiki with the `css-variables` theme | 0.4.2 | `legalTokens` (legal placeholders) + `tableScroll` (focusable wide tables) in `astro.config.mjs` | [measured 2026-10-05] |
| Styling | Tailwind CSS + `@tailwindcss/vite` | 4.3.3 | same as the pstrykweb.pl landing | [research] |
| Signature 3D | **vanilla three** (default) or **OGL** in an Astro `<script>` island, behind a custom `client:after-load` directive (load + idle + capability probe) | three 0.186.1 / ogl 1.0.11 | measured gz: R3F + React 302 KB (the whole budget) vs three 126 KB vs OGL 14 KB. R3F only if the moment grows into several scenes | [research: § 3.1] |
| Motion | CSS first; GSAP lazily after LCP if needed; `motion` vanilla only if needed | gsap 3.15.0; motion 13.5.x (14.0 too fresh) | | [research] |
| Page transitions | native cross-document View Transitions (`@view-transition`, `view-transition-name` for card → case) | 0 KB | Chrome 126+, Safari 18.2+; Firefox navigates without animation | [research: § 3.3] |
| Smooth scroll | none (no Lenis) | — | native scroll; Lenis breaks anchors | [research] |
| CV PDF | `bun run cv:pdf`: Playwright `page.pdf()` (tagged, outline) from `/<locale>/cv/print/` of a running preview | playwright 1.63.0 | **committed** to `public/files/` (the Vercel build has no browser); the print route exposes a digest of the CV data, the script records it, `src/data/cv.test.ts` fails when the data changed after the PDFs were made [decided 2026-10-05, replaces the build-time + pdfjs plan] | [measured] |
| Contact | **`apps/web/api/contact.ts`, a plain Vercel Function** next to the static site (no Astro adapter, so `astro preview` keeps working) → `/api/contact/`; Turnstile `siteverify` + EmailJS REST via `fetch` from the server (no SDK; the template holds the recipient) [owner 2026-10-06: EmailJS on his Gmail, no Resend]; honeypot + a per-instance limit (no min fill time: it blocked fast real senders [owner 2026-10-07]); a refused EmailJS call logs its status + reason (`EmailJS refused: ...` in the Vercel logs); the real limit is one Vercel WAF rule; region fra1 (`vercel.json`) | — | works without JS (POST → 303 to `/contact/sent/` or `/contact/error/`); no DB; validation shared with the page (`src/lib/contact.ts`), imported **with its `.js` extension** (Vercel runs `api/` as native ESM; a unit test guards it) | [decided 2026-10-05] |
| Analytics | Umami Cloud Hobby (EU), script 2.3 KB gz, `data-domains` = prod host | — | cookieless; reads one localStorage opt-out key | [research: § 6] |
| Media | `astro:assets` AVIF/WebP; loops AV1 (CRF 44–48) + optional HEVC + **H.264 fallback**; ffmpeg 8.1 | — | AV1 55–64% smaller; iPhone AV1 only on A17 Pro+ | [research: § 7] |
| Testing | vitest; Playwright e2e + axe; Lighthouse script; pdfjs-dist PDF content test | — | gates in `working-agreement.md` § 2 | [research] |

## Hosting: **Vercel Pro** [user] 2026-10-05

| Option | Cost | Fits |
| --- | --- | --- |
| Vercel Hobby | $0 | **only** while the copy is employment-only. Vercel counts "advertising the sale of a product or service" as commercial [web: vercel.com/docs/limits/fair-use-guidelines, 2026-09-14] |
| Vercel Pro | $20/month | commercial use (project enquiries through the contact form; the "open to projects" line itself was removed 2026-10-06); the same tooling as pstryk (`vercel.json`, WAF rate-limit rule) |
| Cloudflare Workers (static assets + 1 Worker) | $0 | free and tolerates a freelance CTA; `@astrojs/cloudflare` 14.3.3; Turnstile is Cloudflare's; costs a port of redirects/headers |

- **Decided:** Vercel Pro ($20/month). It allows commercial use (decided for the "open to projects" line, removed 2026-10-06;
  the form still takes project enquiries), and Vercel's DPA covers only Pro and Enterprise (`legal/compliance-and-data.md`).
- **Setup:** set the serverless function region to an EU region (`fra1`); add one WAF rate-limit rule on `/api/contact/`.

## Repo layout

Turborepo (`usage/turborepo.md`): `apps/web/` (the site; folders in `conventions.md` § Folder rules) and
`packages/shared/` (the locale list). Scaffolded 2026-10-05 (slice 0).

## Commands (bun; repo root forwards to `apps/web`)

| Do | Run |
| --- | --- |
| install | `bun install` (CI/Vercel: `--frozen-lockfile`) |
| dev | `bun run dev` (astro dev, 4321) |
| typecheck / lint / unit | `bun run check` (astro check + eslint + vitest, via turbo) |
| i18n | `bun run i18n:extract` (then fill pl/es; the build compiles `.po` and fails on a missing message) |
| build | `bun run build` (astro build → launch gate: placeholder markers, share images + PDFs present, every internal link / asset / #anchor resolves, incl. sprite symbols) |
| preview | `bun run preview` (4322; one per project, shared by e2e/shots/Lighthouse) |
| e2e + a11y | `bun run e2e` (Chromium, every spec) · `bun run e2e:xb` (Firefox + WebKit, functional specs; `bunx playwright install firefox webkit` once) |
| screenshots | `MSYS_NO_PATHCONV=1 node scripts/shots.mjs --paths /en/ --widths 390,1024,1920,2560` (apps/web; one theme, so no `--themes`; `--full`, `--reduced`, `--accept`: `usage/visual-qa.md`) |
| Lighthouse | `MSYS_NO_PATHCONV=1 bun run lhci -- --runs 3 /en/ /en/work/` (`scripts/lighthouse.mjs`, median of 3, budgets; exits 1 on a miss) |
| fonts | `bun run fonts` (Anybody subset + metric fallbacks + `fit-metrics.gen.ts`; outputs committed) |
| icons | `bun run icons` (the listed Simple Icons / Tabler icons → `src/lib/icons.gen.ts`; committed) |
| CV PDFs | `bun run cv:pdf` (needs `bun run preview`; writes `public/files/*.pdf` + `cv-digest.json`; committed) |
| share images + icons | `bun run og` (after a build; writes `public/og/<locale>/*.png`, `public/icons/*`, `manifest.webmanifest`; committed) |
| video | ffmpeg by hand for now: AV1 (libsvtav1) + H.264, posters as WebP (`public/media/`) |
| wiki | `node .claude/hooks/wiki-check.mjs` |

Package manager: **bun 1.3.14** (decided at scaffold 2026-10-05 with the owner's Turborepo choice). Timings: `memory/run-notes.md`.

## Environment variables (names only)

Template with every name: `apps/web/.env.example`. Values live in the Vercel project settings only.

| Name | Purpose | Where | Required |
| --- | --- | --- | --- |
| `PUBLIC_SITE_URL` | canonical origin; default `https://matmuszarski.space` (`seo.md` § Domain); a production deploy uses `VERCEL_PROJECT_PRODUCTION_URL`, review deploys their own `VERCEL_URL` | host env | no |
| `PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | contact bot check | host env | yes |
| `EMAILJS_SERVICE_ID` / `EMAILJS_TEMPLATE_ID` / `EMAILJS_PUBLIC_KEY` / `EMAILJS_PRIVATE_KEY` | contact delivery through EmailJS (Account → Security: "Allow EmailJS API for non-browser applications" on, private key on); template: To = his Gmail, Reply-To `{{reply_to}}`, Subject `{{subject}}`, body `{{text}}`; unset = the form answers "can't send right now, copy my email" | host env | yes |
| `PUBLIC_UMAMI_WEBSITE_ID` | analytics; unset = no script | host env | no |
| `PUBLIC_UMAMI_SCRIPT_URL` / `PUBLIC_UMAMI_COLLECT_ORIGIN` | overrides for the Umami script and collector (defaults: Umami Cloud); the CSP follows them | host env | no |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | only if not verified by DNS | host env | no |
| `INDEXNOW_KEY` | IndexNow pings after deploy (not wired yet: post-launch, `seo.md`) | host env | no |
| `LAUNCH_BUILD` | true only when the owner calls the launch [owner 2026-10-06: "full prod when i say it is, regardless of whether deployed to domain"]; every other build, a production deploy on the domain included, is noindex | host env | yes |

## External services and limits

EmailJS free: 200 emails/month [web: emailjs.com/pricing, check before relying on it]. Umami Hobby: 100K events/month, 1 site, 6-month retention. Turnstile
tokens: 300 s, single use. Vercel Pro WAF: rate-limit rules included (the exact count: check the Vercel docs in S1). Node ≥ 22.19 on the build host (Lingui native tools).

## Spikes before the build (pass conditions in research § 8.2)

| # | Spike | Pass |
| --- | --- | --- |
| S0 | Lingui wiring on the real scaffold (also `site/i18n.md`) | **passed 2026-10-05**: extract → build (compile on import, fails on a missing message), 3 locales; island catalogs re-checked in S5 |
| S1 | Deploy to the chosen host: macro build on Linux, `/api/contact`, rate limit, PDF in `astro:build:done` | **part 1 passed 2026-10-05**: clean-clone `bun install --frozen-lockfile` + turbo build green, Linux native binary in `bun.lock`; first Vercel build when the owner connects the repo. Contact + 429 move to slice 10, PDF to the CV slice |
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
| 2026-10-05 | Turborepo on bun (`apps/web`, `packages/shared`) | one package | owner's choice, room for more apps/scripts [user] |
| 2026-10-05 | ~~Static Archivo + Plex cuts~~ → **one variable Anybody** (`wdth` 50-150, `wght` 400-900, 49.5 KB, preloaded) | static cuts per role | Poster needs the width axis for fitted lines and the letter accordion; one file is smaller than four cuts [measured] |
| 2026-10-05 | Fitted type sized at build time (`~/lib/fit.ts`, `cqi` + `font-stretch`) | a JS fit on load (the comps) | the H1 is the LCP: final size with no JS and no shift; LH mobile 100, CLS 0 [measured] |
| 2026-10-05 | `.po` compiled on import by `@lingui/vite-plugin` | committed compiled catalogs | one source of truth; the build still fails on a missing message |
| 2026-10-05 | Vercel Pro, functions in fra1 | Cloudflare Workers ($0), Vercel Hobby | owner's choice; commercial use + DPA [user] |
| 2026-10-05 | Correction: Lingui on Next 16.3 works with `@lingui/swc-plugin` 6.6.0 (6.7.0 is the broken build) | — | issue #253; doesn't change the Astro choice [research] |
