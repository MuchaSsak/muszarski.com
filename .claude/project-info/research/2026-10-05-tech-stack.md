# Tech Stack Options for an Immersive, Performant Developer Portfolio

Date: 2026-10-05

Scope: the framework, 3D, animation, styling, content, hosting, form, analytics and asset-pipeline options for a job-hunting developer portfolio that can sit anywhere from "flat + micro-interactions" to "fully immersive 3D", must be mobile-first, and needs strong Core Web Vitals and SEO. Every version comes from the npm registry, read on 2026-10-05. Evidence tags: [docs] official docs, release notes or registry · [data] survey or registry statistics · [measured] measured this session (method stated) · [expert] practitioner write-up · [opinion] my judgement.

## TL;DR — implications for this portfolio

1. **Recommended default: Next.js 16.3 (App Router, prerendered by default) + React 19.3 + TypeScript + React Three Fiber 9.8 / drei 10 / three r186 (WebGL renderer) + GSAP 3.15 + Lenis 1.3 + Tailwind 4.3 + typed MDX/Content Collections, deployed on Vercel.** Two reasons drive this. It sends the strongest hire signal in PL/EU (justjoin.it, 2026-10-05: React 1,446 offers and Next.js 351, against Svelte 10 and Astro 8) [measured]. And Next.js makes a single persistent WebGL canvas across routes easy, because layouts "preserve state, remain interactive, and do not rerender" on navigation [S3].
2. **Use one canvas for the whole site.** Mount a single fixed `<Canvas>` in the root layout and place 3D "moments" inside DOM sections with drei `<View>`, which uses `gl.scissor` and tracking divs to give "multiple views with a single, performant canvas" [S21]. Page transitions use React `<ViewTransition>`, which "work[s] in the App Router with no configuration" [S4]. Astro can do the same, but only with `<ClientRouter />` plus `transition:persist` on the canvas island [S11].
3. **3D carries a heavy JS cost, so it must never sit on the critical path.** Measured min+gzip (esbuild, 2026-10-05) [measured]: React + ReactDOM ≈ 67 KB, R3F + three ≈ 244 KB, plus drei (6 helpers) ≈ 92 KB and postprocessing ≈ 28 KB. That is about 430 KB before any scene code. Lazy-load the canvas after first paint. A `<canvas>` is **not** an LCP candidate [S48], so keep the LCP element as DOM text or an image. The Spline runtime (≈1.06 MB gz JS) and Rapier-compat (≈1.6 MB gz) are out for mobile.
4. **WebGPU is not production-default yet.** It is not Baseline [S28]. Firefox enables it only on Windows and on macOS 26 Apple Silicon [S29]. three's `WebGPURenderer` falls back to WebGL 2 automatically [S19], but custom shaders then have to be TSL. R3F's first-class WebGPU support is in **v10, still alpha** (10.0.0-alpha.5, 2026-09-08) [S1][S20]. Ship WebGL (R3F v9) now and treat WebGPU as a later upgrade.
5. **Treat native CSS motion APIs as progressive enhancement.**
   - Same-document View Transitions are Baseline (newly available since 2025-10-14).
   - Cross-document View Transitions and scroll-driven animations are **not** Baseline: neither ships in Firefox [S28].
   - Core scroll choreography should therefore use GSAP ScrollTrigger (≈47 KB gz with SplitText) [measured].
6. **GSAP is free for commercial use, including the former "Club" plugins** (SplitText, MorphSVG and others). The one restriction is a ban on using it in no-code visual-animation builders that compete with Webflow [S23]. A portfolio is unaffected.
7. **What award-winning portfolios run (Awwwards, 125 SOTD/HM "portfolio" sites from 2024–2026)** [measured]:
   - GSAP is the most-tagged technology (33%), and Lenis's `lenis` class appears on 55% of the 116 live sites.
   - three.js runs on 31% of them.
   - Among sites built in code, Next.js (33%) and Nuxt (22%) lead. Only 3 run Astro and none run Svelte.
   - About a third are built in Webflow or Framer, so a hand-coded developer portfolio already stands out.
8. **Hosting:**
   - Vercel Hobby is "non-commercial personal use only". Its listed commercial examples include "advertising the sale of a product or service" [S32]. A job-seeking portfolio isn't listed, but **if it advertises freelance services, plan for Pro** [opinion].
   - Hobby includes 5,000 image transformations a month [S31].
   - The fallback is Cloudflare, where requests to Workers static assets are "free and unlimited" [S34].
   - Netlify Free (300 credits; 15 per production deploy) is tight [S36].
9. **Contact form:** a route handler or Server Action sending through **Resend** (free: 3,000 emails/month, 100/day [S38]), protected by **Cloudflare Turnstile** (free, unlimited challenges, no Cloudflare DNS needed [S40]). Skip Formspree Free, which caps at 50 submissions a month [S39].
10. **Analytics and consent in Poland:**
    - Art. 399 of the Polish Electronic Communications Law (PKE) requires prior information and consent for storing *or accessing* information on the device. Its only exemptions are for transmission and for a service the user requested [S46].
    - EDPB Guidelines 2/2023 §33 say JS "instruct[ing] the browser… to send" information falls within Art. 5(3) [S45].
    - So cookieless tools (Plausible, Umami, Vercel or Cloudflare Web Analytics) are **lower-risk but not automatically exempt**. Pick one, publish a privacy notice, and avoid cookie-based tools; those would need a consent banner.
11. **Avoid for this project:**
    - Theatre.js: no npm release since 0.7.2 (2024-05-19), and development has moved to a private repo [S1][S27].
    - TanStack Start: the site still labels it "Release Candidate", and a reflected-XSS CVE fix went out on 2026-09-30 [S16][S17].
    - SvelteKit 3: released 2026-10-01, four days ago [S13]. Too fresh for a deadline-driven job hunt [opinion].
12. **Asset pipeline:**
    - Models: gltf-transform 4.5 (`inspect` first, then meshopt + KTX2/WebP textures) [S47].
    - Images: AVIF, Baseline "widely available" since 2026-07-25 [S28].
    - Video: AV1 with an H.264 fallback (AV1 only partial in Safari) [S29].
    - Social cards: generate OG images at build time with Next's `opengraph-image` [S7].

---

## 1. Version table

Source: npm registry, `npm view <pkg> version time dist-tags --json`, run 2026-10-05 [S1] [docs]. The "Released" column is the publish date of the latest version.

| Area | Package | Latest | Released | Notes |
|---|---|---|---|---|
| Framework | next | 16.3.8 | 2026-09-30 | 16.0.0 shipped 2025-10-22; canary 16.4.0-canary.60 |
| | astro | 7.3.5 | 2026-09-24 | 7.0.0 shipped 2026-06-22; beta 7.4.0-beta.1 |
| | @sveltejs/kit | 3.0.0 | 2026-10-01 | new major |
| | svelte | 5.57.1 | 2026-09-18 | |
| | nuxt | 4.5.2 | 2026-08-05 | 4.0.0 shipped 2025-07-15 |
| | @tanstack/react-start | 1.168.60 | 2026-09-30 | the site still says "Release Candidate" [S16] |
| | react-router | 8.4.0 | 2026-09-15 | 8.0.0 shipped 2026-06-17 |
| | react / react-dom | 19.3.0 | 2026-09-09 | |
| Tooling | vite | 8.3.2 | 2026-10-01 | 8.0.0 shipped 2026-03-12 (Rolldown) [S8] |
| | typescript | 7.0.2 | 2026-07-08 | native port; Next 16.3 can type-check with TS 7 [S2] |
| 3D | three | 0.186.1 (r186) | 2026-09-24 | r186.0 shipped 2026-09-08 |
| | @react-three/fiber | 9.8.1 | 2026-09-24 | v10 alpha.5 (2026-09-08); peer `react >=19 <19.4` |
| | @react-three/drei | 10.7.9 | 2026-09-25 | v11 alpha.7 (2026-09-05) |
| | @react-three/postprocessing | 3.1.3 | 2026-09-27 | postprocessing 6.39.5 |
| | @react-three/rapier | 2.2.0 | 2025-11-03 | @dimforge/rapier3d-compat 0.21.0 (2026-09-25) |
| | @threlte/core / extras | 8.6.1 / 9.22.0 | 2026-09-24 | peer `three >=0.172`, `svelte >=5` |
| | @tresjs/core | 5.9.2 | 2026-09-29 | Vue |
| | ogl | 1.0.11 | 2025-01-27 | |
| | @babylonjs/core | 9.29.0 | 2026-10-01 | 9.0.0 shipped 2026-03-26 |
| | playcanvas | 2.23.0 | 2026-10-01 | |
| | @splinetool/runtime | 2.0.66 | 2026-10-02 | react-spline 4.1.0 (2025-07-15) |
| | @needle-tools/engine | stable 5.1.14 | — | the `latest` tag points at 6.0.0-alpha.4 (2026-10-02) |
| Motion | gsap | 3.15.0 | 2026-04-13 | @gsap/react 2.1.2 |
| | motion (= framer-motion) | 14.0.0 | 2026-10-02 | 13.5.0 shipped 2026-10-01 [S24] |
| | lenis | 1.3.26 | 2026-08-05 | |
| | animejs | 4.5.0 | 2026-06-22 | v4 since 2025-04-03 |
| | @theatre/core | 0.7.2 | 2024-05-19 | stale |
| | @rive-app/canvas | 2.44.0 | 2026-09-30 | |
| | @lottiefiles/dotlottie-web | 0.80.0 | 2026-08-28 | lottie-web 5.13.0 (2025-05-21) |
| UI | tailwindcss | 4.3.3 | 2026-07-16 | |
| | shadcn (CLI) | 4.21.1 | 2026-10-01 | 4.0.0 shipped 2026-03-06 |
| Content | @mdx-js/mdx | 3.1.1 | 2025-08-29 | |
| | @content-collections/core | 0.15.3 | 2026-09-21 | |
| | velite | 0.4.0 | 2026-06-17 | |
| | @keystatic/core | 0.6.9 | 2026-08-26 | |
| | sanity / payload | 6.17.0 / 3.90.2 | 2026-09 | |
| | zod | 4.6.5 | 2026-09-13 | |
| i18n | next-intl | 4.14.9 | 2026-10-02 | |
| | @inlang/paraglide-js | 2.25.4 | 2026-09-17 | |
| Email/form | resend | 6.32.0 | 2026-10-01 | @marsidev/react-turnstile 1.6.1 |
| Analytics | @vercel/analytics | 2.0.1 | 2026-03-12 | posthog-js 1.435.9 |
| Assets | @gltf-transform/cli | 4.5.1 | 2026-09-28 | meshoptimizer 1.3.0 |
| | satori | 0.35.0 | 2026-10-02 | @vercel/og 1.0.3 |

---

## 2. Frameworks: fit for this portfolio

| | **Next.js 16.3** | **Astro 7.3** | **SvelteKit 3.0** | **Nuxt 4.5** | **TanStack Start** |
|---|---|---|---|---|---|
| Persistent WebGL canvas across routes | **Easy.** Layouts "preserve state… do not rerender" [S3] | **Opt-in.** Needs `<ClientRouter/>` and `transition:persist`; the island "with its current state will continue to be displayed" [S11]. Plain MPA reloads the canvas | **Easy.** Layouts persist (root `+layout.svelte`) [opinion, standard pattern] | **Easy.** `app.vue` and layouts wrap `<NuxtPage>` [S15] | **Easy.** Root route layout [opinion] |
| Page transitions | React `<ViewTransition>` with no config, plus `transitionTypes` on `<Link>` [S4] | ClientRouter VT with animate/swap fallback, or native cross-doc VT (CSS only) [S11] | `onNavigate` + `document.startViewTransition` [S14] | `experimental.viewTransition` [S15] | manual |
| i18n PL/EN | No built-in App Router i18n. Use a `[lang]` segment + proxy, or next-intl. New `next/root-params` (16.3) [S6][S2] | Built-in i18n routing; `domains` needs server output [S12] | Paraglide 2 (community) | @nuxtjs/i18n 10.6 | manual |
| Content / case studies | MDX, Content Collections, Velite; `import.meta.glob` in Turbopack (16.3) [S2] | **Best in class.** Content collections, live collections (6.0) [S9] | mdsvex etc. [unverified] | @nuxt/content 3.16 | manual |
| Static hosting | `output: 'export'` loses proxy, redirects, headers, default image optimisation and Server Actions [S5] | static by default | adapter-static 4.0 | `nuxt generate` | partial |
| JS shipped on content pages | RSC keep server parts out of the bundle, but the React runtime still ships (~67 KB gz) [measured] | **0 KB by default** (islands) | small runtime | Vue runtime | React runtime |
| 3D ecosystem | **Richest** (R3F, drei, uikit, postprocessing, rapier) | any (React islands or vanilla three) | Threlte 8 | TresJS 5 | R3F |
| State of JS 2025: usage / retention [S49] | 59% / 55% | 27% / **94%** | 17% / 88% | 23% / 80% | write-in only (235 mentions) |
| justjoin.it offers, 2026-10-05 [measured] | Next.js 351 · React 1,446 | Astro 8 | Svelte 10 | Nuxt 34 · Vue 98 | — |
| Awwwards SOTD/HM live sites [measured] | 21 / 116 | 3 / 116 | 0 / 116 | 14 / 116 | — |
| Maturity risk | low. 16.3 stable 2026-08-03 [S2] | low. Owned by Cloudflare since 2026-01-16, still MIT and platform-agnostic [S10] | **high churn now.** 3.0 shipped 2026-10-01; `$lib` became `#lib` and config moved to `vite.config.ts` [S13] | low | **high.** RC label; CVE fixed 2026-09-30 [S16][S17] |

Notes:
- **Next.js 16.3 highlights** [S2]:
  - Turbopack FS cache now covers `next build`, with up to 90% less dev memory.
  - Opt-in Instant Navigations via `cacheComponents` + `partialPrefetching`.
  - Root params for `[lang]`.
  - `catchError` error boundaries.
  - An experimental Rust React Compiler.
- **Next.js and locale switching** [opinion, verify in a spike]: if the root layout sits at `app/[lang]/layout.tsx` (to set `<html lang>`), switching locale changes that segment, so expect the canvas to remount on a PL/EN switch. That is acceptable, because locale switches are rare.
- **Astro 7** [S8]: Rust `.astro` compiler, Vite 8/Rolldown, builds 15–61% faster, `src/fetch.ts` advanced routing, stable route caching.
- **Astro 6** (2026-03-10) [S9]: built-in Fonts API, CSP API, live content collections, and a `workerd`-based Cloudflare dev runtime.
- **Astro trade-off:** each React island is its own root. Sharing state between page content and the persistent canvas island needs a store such as nanostores [opinion].

---

## 3. 3D engines

### Status

- **three r186** (npm 0.186.x, 2026-09) [S1][S18]:
  - Release-note items: SunLight with cascaded shadow maps, and WebGPU/TSL compute improvements. r185 brought TSL compilation "3.0x" faster.
  - `WebGPURenderer` "tries to use a WebGPU backend… If not, `WebGPURenderer` falls back to a WebGL 2 backend". `forceWebGL` forces WebGL 2 [S19].
  - Practitioner guides report that `ShaderMaterial`, `RawShaderMaterial` and `onBeforeCompile` aren't supported by `WebGPURenderer`, so custom shaders must be TSL [expert: utsubo.com/blog/webgpu-threejs-migration-guide; not confirmed in the official docs this session].
- **WebGPU browser support** [S28][S29]:
  - Not Baseline. web-features: Chrome/Edge 144 (desktop), Chrome Android 121, Safari/iOS 26.
  - caniuse global: 85.7% full + 3.1% partial.
  - Firefox is enabled only on Windows, plus macOS 26 Tahoe on Apple Silicon.
  - WebGL 2 is Baseline widely available, at 96.4%.
- **React Three Fiber**: 9.8 is stable. **v10 alpha** brings first-class WebGPU/TSL (`state.gl` → `state.renderer`), a new `useFrame` scheduler, and multiple canvases sharing one renderer [S20]. Don't build production work on the alpha.
- **Threlte 8** (Svelte 5, three ≥ 0.172) ships core, extras, rapier, theatre, xr, gltf and flex packages [S22][S1]. **TresJS 5** is the Vue equivalent. **OGL** 1.0.11 is tiny but has had no release since 2025-01.
- **Spline** is excellent for designer-made scenes, but its runtime is about 1 MB gz plus optional WASM modules [measured, below]. Use it only for an exported video or poster, or for one lazy scene.
- **Babylon.js 9 / PlayCanvas 2** are game-engine class: great tooling, but heavyweight for a portfolio. **Needle Engine**: `stable` 5.1.14, while `latest` points at a 6.0 alpha. Licence and pricing weren't verified (the pricing page returned no content) [S54].

### Measured bundle cost (min + gzip / brotli q9, esbuild, browser ESM, 2026-10-05) [measured]

Each entry imports the realistic minimum: a renderer plus a box mesh, or core plus one tween. Real apps will be larger.

| Entry | min KB | gzip KB | br KB | Notes |
|---|---|---|---|---|
| react + react-dom (client root) | 218 | 67 | 58 | baseline for any React stack |
| three: tree-shaken minimal scene | 521 | 131 | 108 | WebGLRenderer + standard material |
| three: `import *` | 725 | 186 | 151 | |
| three/webgpu: minimal scene | 769 | 211 | 171 | WebGPURenderer + node material |
| @react-three/fiber + three (React external) | 908 | 244 | 202 | R3F pulls in all of three |
| drei: 6 helpers (OrbitControls, Environment, useGLTF, Text, Float, ScrollControls) | 269 | 92 | 79 | three/R3F external |
| @react-three/postprocessing (Composer + Bloom + Noise) | 104 | 28 | 24 | three/R3F external |
| ogl: minimal | 48 | 14 | 12 | |
| gsap core | 69 | 27 | 24 | |
| gsap + ScrollTrigger + SplitText | 120 | 47 | 42 | |
| motion (vanilla `animate` + `scroll`) | 60 | 22 | 20 | |
| motion/react `motion` + `AnimatePresence` | 126 | 42 | 38 | React external |
| motion/react-m + LazyMotion(domAnimation) | 75 | 27 | 24 | React external |
| lenis | 18 | 5 | 5 | |
| animejs v4 (`animate`, `createTimeline`) | 35 | 14 | 13 | |
| lottie-web light | 168 | 48 | 42 | |
| dotlottie-web | 60 | 14 | 12 | **+ WASM 1.24 MB (496 KB gz)** |
| @rive-app/canvas | 213 | 62 | 54 | **+ WASM 1.99 MB (821 KB gz)** |
| @splinetool/runtime | 3,946 | 1,062 | 834 | + optional WASM (physics 583 KB gz, hana-ui 1.09 MB gz, …) |
| @dimforge/rapier3d-compat | 4,233 | 1,605 | 1,167 | WASM inlined as base64 |
| @babylonjs/core (barrel import) | 7,037 | 1,555 | 1,113 | deep imports would shrink this (not measured) |
| playcanvas | — | — | — | build failed (draco worker); not measured |

Implications:
- R3F's ~244 KB gz is affordable only if it loads after the LCP and only where 3D adds meaning.
- Use dotLottie/Rive for small UI animation only if the ~0.5–0.8 MB WASM is acceptable. CSS, GSAP or Motion cost less.

---

## 4. Animation and scroll

| Tool | Status and terms | Use here |
|---|---|---|
| **GSAP 3.15** | **Free incl. all plugins** ("formerly 'members-only' like SplitText and MorphSVG… at no charge"). The prohibited use is no-code visual-animation tools "that compete with Webflow". Licence effective 2025-04-30, modified 2025-05-30; AI-generated code is explicitly not a prohibited use [S23] | timelines, ScrollTrigger, SplitText reveals, route-change choreography |
| **Motion 14** (motion.dev) | 14.0 removes compat shims ("no breaking changes in Motion for React") [S25]. 13.4 added `AnimateView` for React 19.3 view transitions; 13.3 added `threeEffect` [S24]. Motion+ is a paid add-on ("one-time fee") [S24] | React UI micro-interactions, layout animations, gestures |
| **Lenis 1.3** | MIT. Wraps native scroll ("position: sticky, anchor links, and accessibility keep working"). With `prefers-reduced-motion: reduce`, smoothing is disabled. Known limits: Safari capped at 60 fps, no smoothing over iframes, nested scroll needs config, `syncTouch` is quirky on iOS < 16 [S26] | smooth wheel scroll on desktop only; keep native touch scroll on mobile [opinion] |
| CSS scroll-driven animations | **Not Baseline**: Chrome 115, Safari 26, no Firefox [S28] | progressive enhancement for decorative effects |
| View Transitions (same-document) | Baseline newly available 2025-10-14 (Firefox 144); 91.8% global [S28][S29] | route transitions via React `<ViewTransition>` |
| View Transitions (cross-document) | **Not Baseline**: Chrome 126, Safari 18.2, no Firefox; 86.0% global [S28][S29] | only relevant for MPA (Astro without ClientRouter) |
| anime.js 4.5 | active; v4 since 2025-04 [S1] | light alternative to GSAP (14 KB gz) |
| Theatre.js | 0.7.2 (2024-05-19). README: "temporarily moved development to a private repo" [S27] | **avoid** |
| Rive / dotLottie | active; heavy WASM (see §3) | designer-authored interactive icons, if needed |

---

## 5. Modern CSS support (web-features 3.40.1 published 2026-10-01; caniuse data 2026-09-30) [S28][S29]

| Feature | Baseline status | Since | Use? |
|---|---|---|---|
| Container size queries | **Widely** (2025-08-14) | Chrome 105, Firefox 110, Safari 16 | yes: component-level responsiveness |
| `:has()` | **Widely** (2026-06-19) | Chrome 105, Firefox 121, Safari 15.4 | yes |
| CSS nesting | **Widely** (2026-06-11) | | yes |
| `@property` (registered custom properties) | Newly (2024-07-09) | Firefox 128, Safari 16.4 | yes: animatable gradients and variables |
| `@starting-style`, `transition-behavior` | Newly (2024-08) | | yes: enter animations for popovers and dialogs |
| Popover | Newly (2025-01-27) | | yes: menus |
| `sibling-index()` / `sibling-count()` | Newly (2026-08-18) | Chrome 138, Firefox 154, Safari 26.2 | stagger without JS; give older browsers a fallback |
| Anchor positioning | **Not Baseline** (web-features lists only Safari 27 as full; caniuse marks Chromium partial) | | enhancement only |
| Scroll-driven animations | **Not Baseline** | | enhancement only |
| `interpolate-size` | Not Baseline (Chromium only) | | enhancement only |
| AVIF | **Widely** (2026-07-25) | | yes, default image format |
| AV1 video | caniuse 80.4% full + 14.6% partial (Safari partial) | | AV1 with H.264/HEVC fallback |

Tailwind 4.3 (latest 4.3.3) adds container-size, scrollbar (`scrollbar-width/color/gutter`), zoom and tab utilities [S30]. shadcn CLI is at 4.21.1 [S1]. Use it for accessible form, dialog and menu primitives, then restyle heavily; a stock shadcn look reads as a template [opinion].

---

## 6. Content and CMS

- **A CMS isn't warranted** [opinion]. There is a single author (a developer), fewer than about 15 case studies, and the content changes rarely. Git-based typed content (MDX + Zod schema) is free, versioned and reviewable.
- **Next.js options:** Content Collections 0.15 (Zod schemas, still 0.x), Velite 0.4 (0.x), plain MDX 3.1, or Turbopack `import.meta.glob` [S1][S2]. Generate per-project routes `/[lang]/projects/[slug]` statically with `generateStaticParams` [S6].
- **Astro:** content collections are first-class, and live collections arrived in 6.0 [S9]. This is Astro's strongest advantage.
- **If a non-developer editor is ever needed:** Keystatic 0.6 (git-based, still 0.x) before Sanity 6 or Payload 3. Pricing for Sanity and Payload Cloud wasn't checked.
- **Bilingual content:** store `title`, `summary` and `body` per locale in one entry, or keep sibling files (`slug.pl.mdx` / `slug.en.mdx`). Emit `hreflang` alternates [opinion].

---

## 7. Hosting (free-tier terms verified 2026-10-05)

| | Vercel Hobby | Cloudflare (Workers static assets / Pages) | Netlify Free |
|---|---|---|---|
| Price | free | free; Workers Paid starts at $5/month [S35] | free; Personal $9/month, Pro $20/month [S37] |
| Commercial use | **"Restricted to non-commercial personal use only."** Commercial means "financial gain of anyone involved"; examples include "advertising the sale of a product or service". Donations are OK [S32] | no restriction stated on the pricing page [S35] | not restricted in the credit docs [S36] |
| Bandwidth / requests | 100 GB Fast Data Transfer; 1M CDN requests; 1M function invocations; 100 deployments/day [S31] | **"Requests to static assets are free and unlimited"** [S34]; Workers 100k requests/day, 10 ms CPU per invocation [S35] | **300 credits/month, hard limit.** Deploy = 15 credits, 1 GB = 20, 10k requests = 2 [S36] |
| Image optimisation | 5,000 transformations/month [S31] | via Images (not checked) | — |
| Analytics included | Web Analytics: 50k events/month [S31] | Web Analytics free [S43] | — |
| Forms | — | — | form submissions free and unlimited [S36] |
| Fit | best Next.js DX (ISR, OG, Server Actions, image optimisation) | best for Astro or a Next static export; Next SSR on Cloudflare needs an adapter (not evaluated) | weakest free tier for a media-heavy site that deploys often |

Decision rule [opinion]:
- If the site only presents the person to employers ("hire me" pointing to employment), Hobby fits the wording.
- If it sells freelance services or rates, use Vercel Pro ($20 per developer seat/month [S31]) or Cloudflare.
- When in doubt, Vercel says to contact support [S32].

---

## 8. Contact form and spam

| Option | Free tier | Notes |
|---|---|---|
| **Resend** (+ Next route handler or Server Action) | 3,000 emails/month, 100/day, 30-day retention [S38] | owns the UX; needs a server (not static export) |
| Formspree | **50 submissions/month**; paid from $10/month billed annually [S39] | too small |
| Web3Forms | pricing page returned 403, **not verified** [S53] | client-side; works with static hosting |
| Netlify Forms | free and unlimited on credit plans [S36] | Netlify only |
| **Cloudflare Turnstile** | free; unlimited challenges; 20 widgets; "can be used independently without requiring other Cloudflare services" [S40] | use on any host |

Recommendation: Server Action → Zod validation → Turnstile `siteverify` → Resend. Add a honeypot field and per-IP rate limiting. Show a `mailto:` fallback.

---

## 9. Analytics and EU/Polish consent

| Tool | Storage on device | Notes |
|---|---|---|
| Plausible | "We do not use cookies, browser cache or local storage"; daily-salted hash of IP + UA; EU-hosted; claims no banner needed [S41] | paid SaaS (price not checked) or self-host |
| Umami | "does not use any cookies in the tracking code"; open source and self-hostable [S42] | Cloud pricing not checked |
| Vercel Web Analytics | no third-party cookies; visitor hash from the request, discarded after 24 h; Hobby 50k events/month [S33][S31] | zero setup on Vercel |
| Cloudflare Web Analytics | free; JS snippet; no proxy or DNS change needed; "does not collect or use your visitors' personal data" [S43] | free on any host |
| PostHog | defaults to cookies/localStorage; `persistence: 'memory'` or `disable_persistence` avoids storage [S44] | product analytics and replays are overkill here |

Legal reading:
- **PKE art. 399(1)** (Dz.U. 2024 poz. 1221, in force) [S46] allows storing or accessing information in the terminal device only after clear information and consent.
- **Art. 399(3)** exempts only access "konieczne do" (necessary for) transmitting the communication or providing the service the user requested. There is **no analytics exemption**.
- **EDPB Guidelines 2/2023 v2.0** (adopted 2024-10-07) [S45]:
  - §33: JavaScript that "instructs the browser of the user to send asynchronous requests with the targeted information… clearly falls within the scope of Article 5(3)".
  - §55: IP addresses can be in scope.
- **Conclusion** [opinion, not legal advice]:
  - Cookieless analytics removes cookies but **not** necessarily the Art. 5(3) question.
  - In practice it is low-risk, and Plausible and Umami market it as banner-free.
  - The safest option with zero banner is no client-side analytics.
  - Either way, a privacy notice is needed because the contact form processes personal data.

---

## 10. Asset pipeline

- **glTF:**
  - `gltf-transform inspect` first, because "defaults in the optimize command may not be ideal" [S47].
  - Then use meshopt for geometry (supported in three via `MeshoptDecoder`), KTX2 (ETC1S/UASTC) for GPU textures, or WebP/AVIF for smaller downloads [S47].
- **Textures:** KTX2 keeps GPU memory low on mobile. Budget under 5 MB of total 3D payload on mobile [opinion].
- **Images:** AVIF is Baseline widely available [S28]. Use Next `<Image>` with the 5k/month Hobby transformation cap in mind [S31], or pre-generate AVIF/WebP at build.
- **Video:**
  - Encode AV1 (80% full support) plus an H.264 fallback in `<source>` order [S29].
  - WebM is supported at 96% [S29].
  - Alpha video needs two encodes (VP9-alpha WebM for Chromium/Firefox, HEVC-with-alpha for Safari) [opinion; not re-verified this session].
  - Always set `poster`, and use `preload="none"` below the fold.
- **OG images:** `opengraph-image.tsx` + `ImageResponse` are "statically optimized (generated at build time and cached)" by default [S7]. In Astro, use satori 0.35 directly.

---

## 11. What award-winning portfolios use (Awwwards, measured 2026-10-05)

**Method** [measured]:
- **Sample:** Playwright crawl of `awwwards.com/websites/portfolio/?page=N` [S51] (pages 1–6, then 15, 25 … 105), keeping only cards badged **SOTD or HM**.
- **Tags:** each site page's tag list (`a.button--tag`) was read.
- **Live-site detection** fingerprinted the frameworks and libraries each live site actually serves:
  - frameworks: `/_next/static/`, `__NUXT__`/`/_nuxt/`, `astro-island`/`/_astro/`, `/_app/immutable/`, `data-wf-page`, `framerusercontent`, `wp-content`
  - libraries: `window.__THREE__`, the `lenis` class on `<html>`, `window.gsap`
- **Size:** **125 sites from 2024–2026** (35 SOTD, 90 HM; 27 from 2024, 17 from 2025, 81 from 2026). 116 live sites were reachable.
- **Caveats:** Awwwards' "portfolio" category includes agency and studio portfolios, not just personal developer ones. Tags are self-reported and optional. Live sites may have been rebuilt since the award.
- **Undercounts:** GSAP only counted when exposed as a global (bundled GSAP is missed). An earlier `ogl` regex was discarded as unreliable.

### Self-reported technology tags (n = 125)

| Tag | Sites | Share | of which SOTD |
|---|---|---|---|
| GSAP | 41 | 33% | 15 |
| WebGL | 22 | 18% | 10 |
| Figma | 22 | 18% | 6 |
| Next.js | 17 | 14% | 4 |
| Webflow | 15 | 12% | 7 |
| Three.js | 14 | 11% | 4 |
| Framer | 14 | 11% | 0 |
| Headless CMS (Contentful, DatoCMS, Sanity, Prismic, Craft) | 12 | 10% | 3 |
| Nuxt.js | 11 | 9% | 6 |
| WordPress | 8 | 6% | 1 |
| React | 7 | 6% | 0 |
| Tailwind / Vite / TypeScript | 3 / 3 / 2 | ≤ 2% | 0 |
| Astro / Svelte / Lenis | 0 / 0 / 0 | 0% | — |

### Detected on live sites (n = 116)

| Platform | Sites | Share | three.js | Lenis | `<canvas>` |
|---|---|---|---|---|---|
| Webflow | 22 | 19% | 3 | 17 | 4 |
| **Next.js** | 21 | 18% | 8 | 9 | 13 |
| WordPress | 16 | 14% | 2 | 8 | 5 |
| Vanilla / other | 16 | 14% | 8 | 7 | 10 |
| Nuxt | 14 | 12% | 7 | 8 | 9 |
| Framer | 14 | 12% | 4 | 9 | 3 |
| React (non-Next) | 6 | 5% | 1 | 1 | 1 |
| Vue (non-Nuxt) | 4 | 3% | 3 | 3 | 4 |
| Astro | 3 | 3% | 0 | 2 | 1 |
| SvelteKit / Svelte | 0 | 0% | — | — | — |
| **Totals** | 116 | | **36 (31%)** | **64 (55%)** | **50 (43%)** |

Reading:
- Award winners are mostly DOM, type and motion work: GSAP + Lenis + transitions. Full 3D is a minority; three.js appears on about a third.
- Among sites built in code (64), **Next.js is about 33%** and **Nuxt about 22%**.
- Code-built sites use a `<canvas>` far more often (Next.js 13/21, Nuxt 9/14, vanilla 10/16, about 62–64%) than Webflow/Framer sites (7/36, about 19%).
- Astro and Svelte are almost absent from award winners. That reflects the agency market's stacks, not the frameworks' ability.

### Sample of SOTD sites (2024–2026; framework detected live, extras detected live, tags self-reported)

| Awwwards slug | SOTD date | Live framework | Live extras | Tags |
|---|---|---|---|---|
| pensatori-irrazionali | 2026-09-20 | Next.js | three, lenis, gsap, canvas | WebGL, GSAP, Three.js |
| gionatan-nese-26 | 2026-09-05 | Next.js | three, canvas | WebGL, GSAP, Three.js |
| haoqi-design | 2026-08-14 | Next.js | three, lenis, canvas | Next.js, WebGL, Figma |
| warm-fuzzy | 2026-09-12 | Next.js | lenis, canvas | Motion, Figma, Next.js |
| gil-huybrecht | 2026-09-21 | Nuxt (tag says Next.js) | three, lenis, canvas | WebGL, Next.js, DatoCMS |
| leo-parpeix-portfolio-2026 | 2026-09-14 | Vue | three, lenis, canvas | WebGL, Blender |
| studio-k95-3 | 2026-08-11 | Nuxt | three, lenis, canvas | GSAP, Three.js, Nuxt.js |
| cipher | 2026-08-20 | Nuxt | three, lenis, canvas | GSAP, Nuxt.js |
| michael-gatt | 2026-08-18 | Nuxt | three, canvas | WebGL, Vue.js, Nuxt.js |
| bleibtgleich26 | 2026-09-22 | Webflow | three, lenis, gsap, canvas | GSAP, Webflow |
| nothin | 2026-08-10 | Webflow | three, lenis, gsap | WebGL, GSAP, Webflow |
| paul-kalkbrenner | 2026-09-02 | Webflow | lenis, gsap | Webflow, Figma |
| artem-shcherban-portfolio | 2026-04-05 | Webflow | lenis, gsap | GSAP, Webflow, Figma |
| artefakt | 2026-04-03 | WordPress | three, lenis, canvas | WordPress, WebGL, GSAP |
| fluid-glass | 2026-03-30 | Nuxt | lenis | GSAP, Nuxt.js |
| lacrapule-studio | 2025-10-18 | Nuxt | lenis | GSAP, Nuxt.js, Prismic |
| flabbergast-agency | 2025-10-19 | WordPress | lenis, gsap | GSAP, Three.js, BARBA.js |
| up-up | 2025-10-13 | Webflow | lenis, gsap | GSAP, BARBA.js |
| aurels-grand-theater | 2025-05-12 | Vue | canvas | — |
| davide-baratta-24 | 2024-11-18 | Astro | lenis | — |
| sparkk-2 | 2024-06-23 | Nuxt | three, lenis, gsap, canvas | — |
| noomo-labs | 2024-06-19 | Nuxt | three, gsap, canvas | — |
| studio-fables-2 | 2024-06-21 | Vanilla/other | lenis, canvas | — |
| bemo | 2024-06-16 | Webflow | lenis, gsap | — |

---

## 12. Hire-signal data (PL/EU)

| Source | React | Next.js | Vue | Nuxt | Angular | Svelte(Kit) | Astro | Three.js | WebGL |
|---|---|---|---|---|---|---|---|---|---|
| justjoin.it offers, all PL locations, keyword search, 2026-10-05 [measured][S52] | 1,446 | 351 | 98 | 34 | 1,036 | 10 | 8 | 10 | 15 |
| State of JS 2025: usage (front-end frameworks / meta-frameworks) [S49][S50] | 85% | 59% | 52% | 23% | 48% | 27% / 17% | 27% | — | — |
| State of JS 2025: retention | 72% | 55% | 84% | 80% | 48% | 86% / 88% | 94% | — | — |

- justjoin.it keyword search is fuzzy: "React" also matches React Native, and the GSAP count was discarded because it matched "SAP".
- Survey n is about 11.8k–12.1k respondents per question [S49][S50]. TypeScript returned 1,455 offers [measured].
- **Implication** [opinion]: the portfolio's code is a work sample.
  - **Next.js + React + TS + R3F** matches what Polish employers list. three.js/WebGL roles themselves are niche (10–15 offers).
  - Astro or Svelte wouldn't hurt, but they signal less. If the user wants to show breadth, use Astro or Svelte in a side project rather than the flagship.

---

## 13. Candidate stacks

### A. "Hireable React craft" (recommended)

- **Framework:** Next.js 16.3 App Router, TS 7, React 19.3, Turbopack.
- **3D:** R3F 9.8 + drei 10 (`View`, `useGLTF`, `Environment`) + @react-three/postprocessing 3. three r186 with WebGLRenderer.
- **Motion:** GSAP 3.15 (+ @gsap/react) for timelines and ScrollTrigger; Motion 14 (`m` + LazyMotion) for UI micro-interactions; Lenis 1.3 on desktop only.
- **UI:** Tailwind 4.3, shadcn primitives (restyled), modern CSS (container queries, `:has`, `@property`, `@starting-style`).
- **Content and i18n:** typed MDX via Content Collections or Velite, Zod 4. `app/[lang]` with next-intl 4 or plain dictionaries; `next/root-params`.
- **Contact:** Server Action + Turnstile + Resend.
- **Analytics:** Vercel Web Analytics or Plausible/Umami.
- **Hosting:** Vercel Hobby, or Pro if commercial.

### B. "Content-first, zero-JS by default"

- **Framework:** Astro 7.3 with `<ClientRouter />`.
- **3D:** one React (R3F) or vanilla-three island with `transition:persist`.
- **Motion:** GSAP + Lenis.
- **UI:** Tailwind 4.
- **Content and i18n:** content collections; built-in i18n routing.
- **Hosting:** Cloudflare Workers static assets.
- **Contact:** a Worker with Resend + Turnstile, or Web3Forms.

### C. "Svelte craft"

- **Framework:** SvelteKit 3.0 + Svelte 5.57.
- **3D:** Threlte 8.
- **Motion:** GSAP + Lenis; `onNavigate` view transitions.
- **i18n:** Paraglide 2.
- **UI:** Tailwind 4.
- **Hosting:** Vercel or Cloudflare.

| Criterion | A. Next.js + R3F | B. Astro + islands | C. SvelteKit + Threlte |
|---|---|---|---|
| Persistent canvas across routes | ★★★ native (root layout) [S3] | ★★ needs ClientRouter + `transition:persist`; cross-island state via store [S11] | ★★★ native layouts |
| Rich DOM motion and page transitions | ★★★ `<ViewTransition>` + GSAP/Motion [S4] | ★★★ VT built in | ★★★ `onNavigate` + VT [S14] |
| JS on text-heavy pages (CWV) | ★★ React runtime ~67 KB gz everywhere [measured] | ★★★ 0 KB unless an island loads | ★★★ small runtime |
| 3D ecosystem depth | ★★★ R3F, drei, postprocessing, uikit, rapier | ★★★ same (React island) or vanilla | ★★ Threlte (good, smaller) |
| Content authoring (typed case studies) | ★★ (Content Collections/Velite are 0.x) | ★★★ first-class collections | ★★ |
| i18n PL/EN | ★★ DIY or next-intl [S6] | ★★★ built in [S12] | ★★ Paraglide |
| SEO / metadata / OG | ★★★ Metadata API, build-time OG [S7] | ★★★ | ★★ |
| Hosting cost | ★★ Vercel Hobby is non-commercial only [S32] | ★★★ Cloudflare static is free and unlimited [S34] | ★★★ |
| Hire signal (PL) | ★★★ React 1,446 / Next 351 offers | ★ Astro 8 offers | ★ Svelte 10 offers |
| Risk / maturity (Oct 2026) | ★★★ | ★★★ | ★ 3.0 is 4 days old [S13] |
| Matches the user's stack [assumption: JS/TS, Turborepo, Supabase] | ★★★ | ★★ | ★ |

### Recommended default: **A (Next.js 16.3 + R3F 9)**, built so it can degrade to B-level performance

Why:
- **Hire signal and persistent canvas** (TL;DR #1–2): A is the only option that tops both. The site itself becomes a Next/React/TS code sample in the most-demanded PL stack.
- **CWV gap versus Astro is manageable.** The React runtime is about 67 KB gz. Keep pages as RSC, defer all 3D/GSAP behind a `requestIdleCallback`/IntersectionObserver gate, and remember the canvas can't be the LCP element [S48].

Architecture sketch [opinion]:
1. **Root layout:**
   - `app/[lang]/layout.tsx` holds `<SiteChrome>` and `<Experience>`.
   - `<Experience>` is a client component loaded with `next/dynamic({ ssr: false })` after first paint.
   - It renders a `position: fixed` full-viewport `<Canvas eventSource={document.body}>` with `<View.Port/>` [S21].
2. **Pages:** server-rendered HTML for content (SEO), with `<View>` tracking divs wherever a 3D moment lives (hero object, project thumbnails, skill sphere). The scene per route comes from the pathname through a small store.
3. **Quality tiers:**
   - **Tier 0:** reduced motion, Save-Data or weak GPU. Static poster or AVIF/AV1 video; no canvas.
   - **Tier 1:** mobile. DPR capped at 1.5, no postprocessing, `frameloop="demand"`.
   - **Tier 2:** desktop. Full effects.
4. **Transitions:** React `<ViewTransition>` for DOM morphs (project card → case-study hero), with `default="none"` discipline and the reduced-motion CSS from the Next guide [S4]. Camera and scene moves run on GSAP, driven by the same navigation.
5. **Budgets** [opinion]:
   - Initial JS ≤ 150 KB gz (no 3D).
   - 3D chunk ≤ 450 KB gz, lazy.
   - 3D assets ≤ 5 MB on mobile.
   - LCP ≤ 2.5 s at p75 [S48].
   - Lighthouse mobile ≥ 90 on content pages.
6. **Upgrade path:** move to R3F v10 + `WebGPURenderer` once v10 is stable. TSL materials then work on both WebGPU and the WebGL 2 fallback [S19][S20].

When to pick **B** instead: if the team decides the site should be content-first with only one or two 3D accents, and hosting must be free regardless of commercial use. Astro then wins on CWV and authoring. Write the 3D island in R3F so the React signal survives.

---

## Sources

All accessed 2026-10-05.

| ID | URL | Title | Date |
|---|---|---|---|
| S1 | https://www.npmjs.com/ (`npm view <pkg> version time dist-tags peerDependencies --json`) | npm registry metadata | 2026-10-05 |
| S2 | https://nextjs.org/blog/next-16-3 | Next.js 16.3 | 2026-08-03 |
| S3 | https://nextjs.org/docs/app/getting-started/layouts-and-pages | Layouts and Pages (docs v16.3.8) | updated 2026-08-25 |
| S4 | https://nextjs.org/docs/app/guides/view-transitions | Designing view transitions | updated 2026-08-25 |
| S5 | https://nextjs.org/docs/app/guides/static-exports | Static Exports | updated 2026-08-25 |
| S6 | https://nextjs.org/docs/app/guides/internationalization | Internationalization | updated 2026-06-10 |
| S7 | https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image | opengraph-image and twitter-image | updated 2026-07-09 |
| S8 | https://astro.build/blog/astro-7/ | Astro 7.0 | 2026-06-22 |
| S9 | https://astro.build/blog/astro-6/ | Astro 6.0 | 2026-03-10 |
| S10 | https://astro.build/blog/joining-cloudflare/ | The Astro Technology Company joins Cloudflare | 2026-01-16 |
| S11 | https://docs.astro.build/en/guides/view-transitions/ | Astro: View transitions | n/d |
| S12 | https://docs.astro.build/en/guides/internationalization/ | Astro: Internationalization (i18n) routing | n/d |
| S13 | https://svelte.dev/blog/sveltekit-3-is-here | SvelteKit 3 is here | 2026-10-01 |
| S14 | https://svelte.dev/docs/kit/$app-navigation | SvelteKit $app/navigation (onNavigate) | n/d |
| S15 | https://nuxt.com/docs/4.x/getting-started/transitions | Nuxt: Transitions | n/d |
| S16 | https://tanstack.com/start/latest | TanStack Start | n/d |
| S17 | https://tanstack.com/blog | TanStack blog (CVE-2026-102989 security update) | 2026-09-30 |
| S18 | https://github.com/mrdoob/three.js/releases | three.js releases (r183–r186) | 2026-09 |
| S19 | https://threejs.org/docs/pages/WebGPURenderer.html | three.js docs: WebGPURenderer | n/d |
| S20 | https://github.com/pmndrs/react-three-fiber/releases | React Three Fiber releases (v9.8, v10 alpha) | 2026-09 |
| S21 | https://drei.docs.pmnd.rs/portals/view | drei: View | n/d |
| S22 | https://threlte.xyz/docs/learn/getting-started/introduction | Threlte: Introduction | n/d |
| S23 | https://gsap.com/standard-license/ | GSAP Standard "No Charge" License | effective 2025-04-30, modified 2025-05-30 |
| S24 | https://motion.dev/changelog | Motion changelog | 2026-10-01 |
| S25 | https://github.com/motiondivision/motion/pull/3889 | v14: Remove 13.5.1 compatibility shims | 2026-10-02 |
| S26 | https://github.com/darkroomengineering/lenis | Lenis README | n/d |
| S27 | https://github.com/theatre-js/theatre | Theatre.js repo README | n/d |
| S28 | https://unpkg.com/web-features/data.json | web-features 3.40.1 (Baseline data) | 2026-10-01 |
| S29 | https://github.com/Fyrd/caniuse (fulldata-json/data-2.0.json) | caniuse data | updated 2026-09-30 |
| S30 | https://github.com/tailwindlabs/tailwindcss/releases | Tailwind CSS releases (4.3.x) | 2026-07 |
| S31 | https://vercel.com/docs/plans/hobby | Vercel Hobby Plan | updated 2026-09-14 |
| S32 | https://vercel.com/docs/limits/fair-use-guidelines | Vercel Fair Use Guidelines | updated 2026-09-14 |
| S33 | https://vercel.com/docs/analytics/privacy-policy | Vercel Web Analytics: Privacy and Compliance | updated 2026-06-26 |
| S34 | https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/ | Workers static assets: billing and limitations | updated 2026-04-23 |
| S35 | https://developers.cloudflare.com/workers/platform/pricing/ | Cloudflare Workers pricing | n/d |
| S36 | https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/ | Netlify credit-based pricing plans | n/d |
| S37 | https://www.netlify.com/pricing/ | Netlify pricing | n/d |
| S38 | https://resend.com/pricing | Resend pricing | n/d |
| S39 | https://formspree.io/plans | Formspree plans | n/d |
| S40 | https://developers.cloudflare.com/turnstile/plans/ | Turnstile plans | n/d |
| S41 | https://plausible.io/data-policy | Plausible data policy | n/d |
| S42 | https://docs.umami.is/docs/faq | Umami FAQ | n/d |
| S43 | https://developers.cloudflare.com/web-analytics/about/ | Cloudflare Web Analytics: about | n/d |
| S44 | https://posthog.com/docs/libraries/js/persistence | PostHog JS persistence | n/d |
| S45 | https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-22023-technical-scope-art-53-eprivacy-directive_en | EDPB Guidelines 2/2023 on the technical scope of Art. 5(3) ePrivacy, v2.0 | adopted 2024-10-07 |
| S46 | https://api.sejm.gov.pl/eli/acts/DU/2024/1221/text.pdf | Ustawa z dnia 12 lipca 2024 r. – Prawo komunikacji elektronicznej (Dz.U. 2024 poz. 1221), art. 399 | 2024-07-12 (status: in force; last change 2026-09-28) |
| S47 | https://gltf-transform.dev/cli | glTF Transform CLI | n/d |
| S48 | https://web.dev/articles/lcp | Largest Contentful Paint (LCP) | n/d |
| S49 | https://2025.stateofjs.com/en-US/libraries/meta-frameworks/ | State of JavaScript 2025: Meta-Frameworks (exported chart data) | 2025 survey |
| S50 | https://2025.stateofjs.com/en-US/libraries/front-end-frameworks/ | State of JavaScript 2025: Front-end Frameworks (exported chart data) | 2025 survey |
| S51 | https://www.awwwards.com/websites/portfolio/ | Awwwards: Portfolio websites (pages 1–6, 15–105) + individual /sites/ pages | crawled 2026-10-05 |
| S52 | https://justjoin.it/job-offers/all-locations?keyword=React (and Next.js, Vue, Nuxt, Svelte, Astro, Angular, Three.js, WebGL, TypeScript) | Just Join IT job board | 2026-10-05 |
| S53 | https://web3forms.com/pricing | Web3Forms pricing (HTTP 403: not verified) | n/a |
| S54 | https://needle.tools/pricing | Needle Engine pricing (no content returned: not verified) | n/a |

Not covered: Web3Forms, Plausible, Umami Cloud, Sanity and Needle pricing; Next.js-on-Cloudflare adapters (OpenNext); React Router 8 and TanStack Start feature detail; PlayCanvas bundle size; Babylon tree-shaken size; measured Lighthouse/CWV of a prototype; real-device WebGL performance on mid-range Android; accessibility audit of Lenis and 3D fallbacks; detailed legal opinion on Polish analytics consent (UODO/UKE practice).
