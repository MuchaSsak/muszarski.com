# Performance, Mobile, WebGL/WebGPU, Accessibility & SEO — Immersive AND Fast

Date: 2026-10-05

## TL;DR — implications for this portfolio

1. **Mobile is the first impression, even in desktop-heavy Poland.** Worldwide web traffic is 59 % mobile; Poland is 56 % desktop / 43 % mobile (StatCounter, Sep 2026) [data]. LinkedIn is used mostly via its app, so links open in phone WebViews. No primary data on recruiter devices exists — design so the phone version can win the job on its own.
2. **Nobody in the genre disables mobile any more** — all 10 famous immersive portfolios measured render on a 390-px viewport (only one still warns "best viewed on desktop") [measured]. The old site's "3D off on mobile" is below the bar.
3. **Immersive portfolios are slow in practice, not in principle**: LH mobile median **35.5 vs 74.5** for minimal ones; **~11.4 MiB vs ~0.85 MiB** transferred (11.9 vs 0.89 MB; the raw medians are 11,637 vs 869 KiB, unit fixed 2026-10-08); good lab LCP on **1 of 16** sites; perf ≥ 90 on **1 of 16**, and **no** immersive site above 64 [measured, LH 13.5, median of 3]. Scoring 90+ *with* 3D is a real differentiator.
4. **Architecture = SSR HTML first, 3D as a lazy, optional layer.** The only fast immersive site (Jesper Landberg, LCP 1.1 s) puts its bio text in HTML; the slowest make a loader or the canvas the LCP. `<canvas>` is never an LCP candidate [expert, web.dev] — all real content must be DOM text/AVIF.
5. **Budget** (§7): LCP ≤ 2.5 s lab mobile, TBT ≤ 200 ms, CLS ≤ 0.05, initial JS ≤ 150 KB gz, fonts ≤ 100 KB, initial page ≤ 1 MB; 3D chunk lazy ≤ 200–250 KB gz + assets ≤ 1 MB (mid) / 2 MB (high). A React-Three-Fiber + drei stack alone is **310–400 KB gz** before any model; tree-shaken three is 131 KB; OGL 14 KB [measured, esbuild].
6. **Stay on WebGL 2 (`WebGLRenderer`), not WebGPU.** three.js's own manual still calls `WebGPURenderer` "experimental"; a minimal WebGPU bundle is 240 vs 131 KB gz; WebGPU is missing on Firefox Android/Linux and ~12 % of iPhones (pre-iOS 26) while WebGL 2 is at 96 % [expert + data + measured].
7. **Tier it** (§6): High = full scene; Mid (most phones) = same scene at DPR ≤ 1.5, no post-FX, render-on-demand, paused offscreen; Low/Save-Data/WebGL fail = AVIF poster, no 3D download; Reduced motion = static frame, no smooth-scroll/parallax/autoplay. `detect-gpu`'s benchmark data froze in Dec 2025 → back it with runtime `PerformanceMonitor`.
8. **Plan for iOS reality**: rAF ≈ 60 fps cap on iPhone, 30 fps in Low Power Mode; Low Power Mode can block muted autoplay; canvas memory caps (~224–384 MB reported); context loss on backgrounding — handle `webglcontextlost/restored` (a WebGPURenderer WebGL-backend restore bug was only closed 2026-09-28) [expert/anecdote].
9. **Accessibility is a differentiator, not a legal duty**: the EAA (28 Jun 2025) doesn't cover a personal portfolio (Polish law also exempts service micro-enterprises) — yet every measured immersive site ignored `prefers-reduced-motion`, 4/16 disabled pinch-zoom, and canvas-only Igloo still scored LH a11y 100 [measured]. Meet WCAG 2.2 AA: pause control for > 5 s motion (2.2.2, Level A), 24 px targets (2.5.8), focus not obscured (2.4.11), drag alternatives (2.5.7), DOM overlay for 3D hotspots.
10. **SEO = SSG + per-project URLs + OG images (≥ 1200×627) + Person/ProfilePage JSON-LD.** Canvas text is not indexable or previewable; Google renders JS, but link-preview bots generally read only served HTML [expert + opinion].
11. **"Minimal" can be slow too**: two minimal sites lose LCP to > 1 MB of web fonts (9 files each); leerob.com's 95 uses system fonts. Subset 1–2 WOFF2 families incl. Polish glyphs [measured].
12. **Lighthouse CI on every PR** with these budgets; before launch test on a real mid-range Android and an iPhone in Low Power Mode (lab 3D numbers here ran on a desktop GPU and are optimistic).

---

## 1. Viewing context — who opens the link, on what

| Signal | Value | Evidence |
|---|---|---|
| Worldwide web traffic, Sep 2026 | **Mobile 58.99 % · desktop 39.26 % · tablet 1.76 %** | [data] StatCounter, page-view panel (~3 bn/month), Sep 2026 [S1] |
| Poland web traffic, Sep 2026 | **Desktop 56.07 % · mobile 43.31 % · tablet 0.62 %** | [data] StatCounter PL, Sep 2026 [S2] — Poland is one of the few markets where desktop still leads |
| LinkedIn, browser-only (linkedin.com) | ~29 % mobile (May 2026) | [data, secondary] Similarweb panel, cited by SQ Magazine [S3]; excludes the app |
| LinkedIn, all usage incl. app | ~74 % of time spent is in mobile app | [data, secondary, weak] Buffer 2026 roundup via SQ Magazine [S3]; the widely repeated "57 % of LinkedIn traffic is mobile" dates to LinkedIn's **Q4 2015** disclosure [S4] — stale |
| Recruiters/hiring managers opening portfolios on phones | **No primary study found** | Only practitioner anecdotes (e.g. Glassdoor/HN threads); one designer anecdote claims ~70 % of portfolio visits are desktop — untraceable |

**Read-across** [opinion]: a link clicked inside the LinkedIn app or a mail app opens in an **in-app WebView on a phone**. Even if the *deep* review happens on a laptop, the *first impression* (the "should I keep this tab?" moment) is plausibly on mobile. Mobile must be first-class, not a fallback — the previous site's "disabled on mobile" was its biggest miss.

---

## 2. Core Web Vitals and what load time actually costs

### 2.1 Thresholds (unchanged since INP replaced FID on 2024-03-12)

| Metric | Good | Needs improvement | Poor | Measured at |
|---|---|---|---|---|
| LCP | ≤ 2.5 s | 2.5–4 s | > 4 s | p75 of page loads, mobile & desktop separately [S5] |
| INP | ≤ 200 ms | 200–500 ms | > 500 ms | p75; only clicks, taps, key presses count — **scroll/hover don't** [S6][S7] |
| CLS | ≤ 0.1 | 0.1–0.25 | > 0.25 | p75 [S5] |

Web reality [data, HTTP Archive Web Almanac 2025, CrUX July 2025, millions of origins] [S8]:
- Only **48 % of mobile sites** pass all three CWV (desktop 56 %). Mobile: good LCP 62 %, good INP 77 %, good CLS 81 %.
- Median **mobile home page = 2,559 KB** (632 KB JS, 911 KB images, 122 KB fonts) [S9].
- LCP pass rate falls with weight: lightest pages 72 % good LCP on mobile, 2–3 MB pages 59 %, ≥ 5 MB pages 44 % [S9].

### 2.2 How a WebGL canvas interacts with the metrics

| Metric | Effect of a `<canvas>`-based hero | Source |
|---|---|---|
| **LCP** | `<canvas>` is **not an LCP candidate**. LCP = largest img / video poster-or-first-frame / background-image / text block. A full-screen canvas with no text ⇒ LCP falls on whatever text/image appears, often a late loader label or nothing meaningful. Full-viewport images and opacity:0 elements are also excluded. | [expert] web.dev LCP, updated 2025-09-04 [S10] |
| **TBT (lab) / INP (field)** | three.js parse/compile, shader compilation (`getProgramParameter` sync), texture uploads, physics WASM init, and per-frame JS all run on the main thread → long tasks → TBT in the lab, input delay in the field. A continuously running rAF loop adds per-frame main-thread work that competes with tap handlers. Measured: immersive portfolios did **10–23 s of main-thread work** under LH's 4× CPU throttle (mostly script evaluation) vs ~1.5 s for leerob/paco; median TBT ~2.2 s vs ~0.23 s. | [expert] web.dev INP [S7]; [measured] §4 |
| **CLS** | Usually near 0 for canvas sites (fixed full-screen canvas) — every immersive site measured had CLS ≤ 0.01. CLS is not where WebGL sites fail. | [measured] §4 |

### 2.3 Ranking role — be honest about it

- Google: CWV "align with what our core ranking systems seek to reward" [S11]; "There is no single signal"; "Google Search always seeks to show the most relevant content, even if the page experience is sub-par" (page updated 2026-09-22) [S12]. [expert]
- For a personal portfolio, **ranking is not the main reason to be fast** — recruiters arrive via direct links (CV, LinkedIn, email). Speed matters because of first-impression abandonment and because a slow site is itself a negative signal about engineering judgement [opinion].

### 2.4 Famous "load time vs abandonment" stats, traced

| Claim as usually quoted | What the primary actually says | Strength |
|---|---|---|
| "53 % of mobile users abandon if > 3 s" | Google/DoubleClick, 2016-09-08: "53 % of visits are **likely** to be abandoned if pages take longer than 3 seconds to load"; footnote: aggregated Google Analytics benchmark data, **n = 3.7 K mobile sites**, global, **March 2016**. Not a controlled experiment; 2016 networks/devices. [S13] | [data, old, correlational] |
| "Bounce probability +32 % from 1 s → 3 s" | Google/SOASTA 2017 neural-net study of ~11 M mobile landing pages (Think with Google benchmark page — **could not fetch primary today**, consent wall; secondary review [S14]) | [data, old] — cite with caveat |
| "0.1 s faster = +8.4 % conversions" | Deloitte for Google, *Milliseconds Make Millions*, March 2020: 0.1 s mobile speed improvement → retail conversions +8.4 %, travel +10.1 %; luxury pages/session +8.6 %; lead-gen bounce −8.3 %; 4-week observational window, EU/US brands [S15] | [data, correlational, e-commerce] |
| "Amazon: 100 ms = 1 % revenue" | No primary publication found | **untraceable** |
| Human response-time limits | 0.1 s feels instant; 1 s keeps flow of thought; **10 s** loses attention — needs progress feedback [S16] | [expert] Nielsen 1993, still the canonical framing |

Implication: none of these are about portfolios; treat them as directional. The stronger, portfolio-specific evidence is behavioural: HN commenters on Bruno Simon's 2025 folio reported 30 s+ loads with no progress indicator and closed the tab [S17] [anecdote].

---

## 3. WebGL / WebGPU state — checked 2026-10-05

### 3.1 Browser support (caniuse data pulled from Fyrd/caniuse GitHub 2026-10-05; MDN BCD same day)

| API | Chrome/Edge | Safari macOS | Safari iOS | Firefox | Chrome Android | Global (caniuse) |
|---|---|---|---|---|---|---|
| **WebGL 2** | ✅ | ✅ 15+ | ✅ 15+ | ✅ | ✅ | **96.4 %** |
| **WebGPU** | ✅ 113+ (Win/macOS/ChromeOS; Linux hardware-dependent) | ⚠️ 26+ **only on macOS 26 Tahoe** | ✅ 26+ (iOS 26) | ⚠️ 141+ **Windows only**; 145+ also macOS 26 Apple Silicon; **no Linux, no Android** | ✅ 121+ but **Android 12+ with Qualcomm/ARM GPUs** at launch [S20] | **85.7 % full + 3.1 % partial** — overstated for Android because caniuse counts all of Chrome Android |
| requestIdleCallback | ✅ | ❌ (TP only) | ❌ | ✅ | ✅ | 81 % — **needs a setTimeout fallback on Safari** |
| `prefers-reduced-motion` | ✅ | ✅ | ✅ | ✅ | ✅ | 96 % (Baseline since 2020) [S41] |
| `navigator.connection.saveData` | ✅ 65+ | ❌ | ❌ | ❌ | ✅ | Chromium-only (MDN BCD) |
| `prefers-reduced-data` | ❌ in **every** browser | | | | | MDN: "not supported by any user agent" [S42] |
| Compute Pressure (`PressureObserver`) | ✅ desktop 125+ | ❌ | ❌ | ❌ | ❌ | Chromium desktop only [S43] |

Sources: [S18] web.dev "WebGPU is now supported in major browsers" (2025-11-25), [S19] caniuse WebGPU, [S20] Chrome 121 blog, [S21] Mozilla gfx blog (Firefox 141, 2025-07-15: "Mac and Linux in the coming months, and finally on Android" — no dates), [S62] MDN BCD, [S63] caniuse raw data.

iOS reach of WebGPU [data] StatCounter iOS versions, Sep 2026 [S68]: iOS 26.6 = 56.4 %, 26.5 = 9.1 %, 26.3 = 1.9 %, iOS 27 = 2.4 %, **iOS 18.7 + 18.6 ≈ 12 %** (StatCounter notes Safari anti-fingerprinting mislabels some 26.x as 18.x) → roughly **1 in 8 iPhones still has no WebGPU**; WebGL 2 covers all of them.

### 3.2 three.js WebGPURenderer + TSL — maturity

| Fact | Evidence |
|---|---|
| Latest three = **0.186.1** (2026-09-24); r186 released 2026-09-08; cadence slowed to ~8–11 weeks in 2026 | [data] npm registry [S22]; [secondary] Utsubo [S23] |
| `WebGPURenderer` auto-falls back to a **WebGL 2 backend**; `forceWebGL: true` forces it | [expert] three.js manual [S24] |
| **Official manual (current dev branch) still says: "The renderer itself is still in an experimental state … depending on your application and scene setup, you will encounter missing features or a better performance with `WebGLRenderer`."** WebGLRenderer "is still maintained and the recommended choice for pure WebGL 2 applications". | [expert, primary] [S24] — contradicts blog claims that WebGPU is "production-ready since r171" [S23] |
| `ShaderMaterial`, `RawShaderMaterial`, `onBeforeCompile`, `EffectComposer` are **not supported** in WebGPURenderer — must port to node materials/TSL | [S24] |
| r184 (2026-04-16) added a **NodeMaterial compatibility layer to WebGLRenderer** (#32851) — TSL usable on the WebGL renderer, partially | [data] three.js release notes [S25] |
| Open bug class: WebGPURenderer's WebGL backend **did not recover after `webglcontextrestored`** (issue #34682, opened 2026-09-27, closed 2026-09-28 — fix expected in r187; verify) | [data] GitHub [S26] |
| R3F 9.8.1 supports WebGPU via async `gl` factory (`await renderer.init()`) | [expert] R3F Canvas docs [S27] |
| Bruno Simon's 2025 folio: three.js + TSL, WebGPU with WebGL fallback, Rapier physics, KTX2 (ETC1S/UASTC), Draco quantisation, heavy instancing, **mobile preset disables water blur & DoF and lowers shadow-map resolution** | [expert] Awwwards case study, 2026-03-11 [S28] |

**Decision for this portfolio** [opinion, evidence-based]: WebGPU buys nothing a portfolio hero needs, costs more bytes (see 3.4: minimal WebGPU bundle 240 KB gz vs 131 KB gz WebGL), is still labelled experimental by its maintainers, and isn't available on Firefox Android/Linux or pre-iOS-26 iPhones. **Use `WebGLRenderer` (WebGL 2)** — or OGL for a single shader plane — unless a compute-shader effect is the signature moment.

### 3.3 Mobile GPU realities that break immersive sites

| Constraint | Detail | Evidence |
|---|---|---|
| iOS canvas memory cap | Safari shows "Total canvas memory use exceeds the maximum limit" — reported limits 224 / 256 / 384 MB (iOS 15) / 576 MB (iPad); canvas bytes ≈ w × h × 4. A 390×844 viewport at DPR 3 = 1170×2532×4 ≈ **11.9 MB per buffer**, before MSAA/depth/render targets/postFX | [anecdote/expert] PQINA 2022 [S29]; issue trackers |
| iOS max canvas size | 4096 × 4096 on iOS vs > 10 000 elsewhere | [expert] MDN `<canvas>` [S30] |
| Context limit | Creating the **17th WebGL2 context lost the oldest** (limit = 16 active) — [measured] Playwright Chromium 153 headless, Windows, 60 tiny canvases created 30 ms apart; Android is reported lower (8) and one 2024 report cites ~30 on desktop Chromium 127 — "Too many active WebGL contexts" | [measured]; [anecdote] issue trackers [S31] |
| Context loss on iOS background/foreground | Widely reported since iOS 17; apps must handle `webglcontextlost` (preventDefault) + `webglcontextrestored` (rebuild GPU resources) or reload | [anecdote] three.js forum [S32]; see bug [S26] |
| rAF capped | iOS Low Power Mode throttles rAF **to 30 fps** (WebKit bug 168837, fixed-by-design 2017); iPhone Safari keeps page rendering near 60 fps even on 120 Hz ProMotion (user reports that the "Prefer Page Rendering Updates near 60fps" flag has no effect on iPhones — [anecdote]); Lenis documents "capped to 60fps on Safari … 30fps on low power mode" | [expert] WebKit [S33], Lenis README [S34] |
| Low Power Mode blocks autoplay | Muted `playsinline autoplay` video may be refused; `play()` promise rejects → show poster/play button | [expert/anecdote] [S35] |
| Thermal throttling | Sustained GPU load on phones throttles clocks within minutes — no trustworthy 2024–26 browser-specific measurement found; numbers circulating on blogs (e.g. "60→24 fps in 2 min") are untraceable | treat as [anecdote]; design for **duty-cycling** (render on demand, pause offscreen) |
| Battery/heat perception | HN users on Bruno Simon 2025: fans spinning, "consumes as many or more resources than games", lag on Snapdragon 855, iOS stutter | [anecdote] [S17] |

### 3.4 Bundle size — [measured]

Method: esbuild 0.28.2 `--bundle --minify --format=esm`, `NODE_ENV=production`, gzip -9 and brotli q11 via Node zlib; three 0.186.1, R3F 9.8.1, drei 10.7.9, React 19.3, postprocessing 6.39.5; 2026-10-05.

| Bundle | min KB | **gzip KB** | brotli KB |
|---|---|---|---|
| React 19 + ReactDOM (hello world) | 218 | **67** | 58 |
| three — tree-shaken minimal scene (renderer, mesh, std material, lights) | 521 | **131** | 108 |
| three minimal + GLTFLoader + DRACO/KTX2/meshopt loaders + OrbitControls | 712 | **190** | 157 |
| three — whole namespace (`import * as THREE`) | 725 | 186 | 151 |
| three/webgpu — minimal scene + TSL | 875 | **240** | 193 |
| three/webgpu + three/tsl whole namespace | 1083 | 299 | 239 |
| React + R3F + minimal scene (R3F pulls all of three) | 1122 | **310** | 248 |
| … + drei (OrbitControls, useGLTF, Environment, Float, PerformanceMonitor, AdaptiveDpr, View, Html, Text) | 1392 | **402** | 324 |
| … + @react-three/postprocessing (Bloom, Noise, Vignette), no Text/Html/View | 1361 | 381 | 306 |
| OGL minimal (shader plane/box) | 48 | **14** | 12 |
| GSAP + ScrollTrigger | 113 | 44 | 40 |
| Lenis | 18 | 5 | 5 |
| **Runtime decoders loaded separately** | raw | gzip | brotli |
| Draco decoder wasm + wrapper | 245 | 73 | 58 |
| Basis (KTX2) transcoder wasm + js | 571 | **257** | 212 |

Take-aways:
- A React-Three-Fiber + drei stack is **~310–400 KB gz before any model or texture** — about the entire JS of leerob.com (234 KB transfer, LH mobile perf 95). It must never be on the critical path.
- KTX2 saves GPU memory (textures stay compressed in VRAM; ETC1S/UASTC) [S36][S37], but the **Basis transcoder alone is ~257 KB gz** — only worth it when textures are big/many (e.g. > ~1 MB of PNG/JPEG equivalents) or iOS memory is at risk. For a few small textures, AVIF/WebP-in-glTF (`EXT_texture_webp`/AVIF) or baked low-res JPEG is cheaper [opinion, from these numbers]. Bruno Simon's site serves `basis_transcoder.wasm` at 515 KB — i.e. **without HTTP compression** [measured, LH network log].
- Meshopt decodes "considerably faster than Draco" and composes with gzip/brotli; meshopt decoder is tiny (JS) vs Draco's 73 KB gz wasm [expert] glTF-Transform docs [S38]; gltfpack [S39].

### 3.5 Adaptive-quality toolbox

| Tool | What it does | Caveat |
|---|---|---|
| `detect-gpu` 5.0.70 (pmndrs) | Maps GPU renderer string → benchmark fps → tier 0–3 (thresholds 0/15/30/60 fps) | Benchmark source (gfxbench) **stopped updating Dec 2025** → 2026 GPUs land on `FALLBACK`; loads benchmark JSON from unpkg unless self-hosted; iPhones are hard to distinguish (Safari exposes a generic Apple GPU string) — verify tiers on real devices. [expert] README [S40] |
| drei `PerformanceMonitor` | Averages fps over time → `onIncline`/`onDecline`/`onFallback` callbacks; flip quality at runtime | Needs a few seconds of samples; combine with an initial tier guess [S44] |
| drei `AdaptiveDpr` + R3F `performance.regress()` | Drops DPR during interaction/camera moves | R3F default DPR `[1, 2]` — already caps at 2 on DPR-3 phones [S27][S45] |
| R3F `frameloop="demand"` + `invalidate()` | Render only when something changes — the single biggest battery saver | Continuous animations need explicit invalidation [S45] |
| drei `View` | Many 3D viewports in **one** canvas via `gl.scissor`, tracking DOM elements | Avoids per-section canvases and the context limit [S46] |
| Compute Pressure API | CPU/thermal pressure states (nominal → critical) | Chromium desktop only — not useful for phones [S43] |

---

## 4. Measured: Lighthouse on 16 well-known portfolios — [measured]

### 4.1 Method and caveats (read before quoting any number)
- **Tool**: Lighthouse 13.5.0 CLI, Chromium 153.0.8010.12 (Playwright `chromium-1243` build) `--headless=new`, categories perf/a11y/SEO/best-practices, default **mobile** profile (Moto G Power emulation, 412×823 @ DPR 1.75, simulated throttling: 150 ms RTT, ~1.6 Mbps, 4× CPU). **3 sequential mobile runs per site → median** (perf range shown). Desktop (`--preset=desktop`) 1 run for a subset. 2026-10-05, from Poland.
- **GPU**: the Lighthouse Chrome (`--headless=new`, full Chrome) used the host's **real GPU — "ANGLE (NVIDIA GeForce RTX 2060 … D3D11)"** [measured via `WEBGL_debug_renderer_info`]; Samsy's own overlay reported "Engine: WebGPU, 3.6 ms, 76 FPS" during a run. Lighthouse throttles CPU and network, **not the GPU** → immersive sites got a *desktop discrete GPU*: their numbers are **optimistic** vs a real phone. Their TBT is genuine main-thread JS: main-thread work was **10–23 s** (Bruno 10.1 s, Lusion 12.4 s, Igloo 22.9 s; Jordan Breton 201 s) vs **1.4–1.7 s** for paco.me/leerob.com, dominated by "Script Evaluation" [measured, `mainthread-work-breakdown`, run 1].
- The **Playwright phone check** (§4.3) used Playwright's headless shell, which renders WebGL in **SwiftShader** (software) — so "still on loader after 15 s" there partly reflects software rendering.
- **Host contention**: the machine was shared with other agents running Playwright. Run 1 `benchmarkIndex` ranged **841–2,381** (LH warns < 1,000); runs 2–3 were mostly 1,800–2,500. Medians of 3 damp this; byte weights, LCP-element identity and a11y results are unaffected.
- **Lab ≠ field**: none of these are CrUX/RUM numbers. Several sites gate behind "Start"/"Tap to explore", so LH measures the gate, not the experience.
- **Raw data**: Lighthouse JSONs, scripts (`run-lh.mjs`, `median.mjs`, `mobile-check.mjs`, `ctx-limit.mjs`, `bundle/measure.mjs`) and phone screenshots are in the session scratchpad `…\scratchpad\tools\perf\` (not in the repo; session-specific).
- **Site choice**: immersive = famous WebGL portfolios + recent Awwwards/FWA winners (Jesper Landberg SOTD 2026-09-29, Meer Mohsin SOTD 2026-09-26, Jordan Breton FWA SOTD 2025-10-02) + two studios (Lusion, Igloo) as the craft ceiling [S64][S65]; minimal = well-known engineer/design-engineer portfolios.

### 4.2 Results — mobile (median of 3 runs)

| Site | Band | Perf (range) | LCP s | TBT ms | CLS | Total KB | JS KB | Fonts KB | a11y | LCP element / note |
|---|---|---|---|---|---|---|---|---|---|---|
| bruno-simon.com (2025 folio, WebGPU/TSL) | Immersive | **27** (27–28) | 24.3 | 3,088 | 0 | 7,552 | 1,199 | 79 | 74 | no DOM LCP candidate; Rapier wasm 1.66 MB, Basis wasm 515 KB uncompressed |
| henryheffernan.com | Immersive | **35** (35–37) | 18.7 | 1,700 | 0 | 11,491 | 723 | 177 | 100 | LCP = loader text "All Content Loaded, launching…"; 6.3 MB video |
| lusion.co (studio) | Immersive | **38** (35–38) | 10.8 | 1,367 | 0 | 10,435 | 992 | 185 | 85 | hero text; 6.5 MB images/textures |
| jesperlandberg.com (Awwwards SOTD 2026-09-29) | Immersive | **64** (30–65) | **1.1** | 2,179 | 0.002 | 23,025 | 370 | 113 | 100 | **SSR bio text = fast LCP**; but 15.3 MB of autoplay MP4 during load |
| meermohsin.me (Awwwards SOTD 2026-09-26) | Immersive | **44** (38–47) | 5.2 | 1,771 | 0 | 3,473 | 238 | 94 | 84 | portrait image |
| jordan-breton.com (FWA SOTD 2025-10-02) | Immersive | **26** (26–60) | 47.4 | 30,134 | 0.004 | 19,084 | 771 | 16 | 63 | name text; extreme main-thread work |
| samsy.ninja (WebGPU) | Immersive | **28** (27–28) | 37.0 | 2,140 | 0 | 11,783 | 1,009 | 70 | 63 | LCP = FPS debug overlay text |
| ameen-abdullah.dev (WebGPU) | Immersive | **26** (26–26) | 21.3 | 8,830 | 0 | 13,182 | 744 | 68 | 100 | LCP = preloader |
| jesse-zhou.com | Immersive | **39** (39–40) | 13.0 | 1,160 | 0.001 | 9,042 | 281 | 19 | 100 | LCP = loader "Cooking Your Ramen… 100%" |
| igloo.inc (studio) | Immersive | **36** (35–38) | 44.8 (6.4–84.7) | 5,822 | 0 | 16,954 | 422 | 0 | 100 | **no DOM text at all** — everything drawn in WebGL |
| leerob.com | Minimal | **95** (94–95) | 2.6 | 124 | 0 | 1,057 | 234 | **0** (system font) | 100 | bio paragraph |
| paco.me | Minimal | **89** (88–90) | 2.8 | 228 | 0 | 323 | 166 | 113 | 90 | text |
| rauno.me | Minimal/crafted | **83** (77–90) | 3.1 | 236 | 0 | 636 | 178 | 51 | 87 | text |
| emilkowal.ski | Minimal/crafted | **66** (60–67) | 5.4 | 493 | 0 | 2,024 | 856 | **1,059** (9 files) | 100 | text — fonts are ~half the page |
| joshwcomeau.com | Crafted (micro-interactions) | **65** (62–66) | 4.9 | 562 | 0 | 681 | 283 | 93 | 98 | article text |
| brittanychiang.com | Minimal | **65** (58–67) | 11.2 | 187 | 0 | 1,515 | 307 | **1,159** (9 files) | 96 | intro text; GTM 157 KB |

Group medians: **immersive perf 35.5 vs minimal 74.5**; total transfer **11,637 vs 869 KiB** (≈ 11.9 vs 0.89 MB, 13×); JS **~734 vs ~259 KiB** (≈ 750 vs 265 KB; units fixed 2026-10-08: these were KiB labelled MB/KB). Good lab LCP (≤ 2.5 s): **1 of 16** (Jesper Landberg — the only immersive site whose LCP is server-rendered text). Perf ≥ 90: **1 of 16** (leerob.com).

Desktop (`--preset=desktop`, 1 run; Bruno/Brittany = 2nd run at lower contention):

| Site | Perf | LCP s | TBT ms | Total KB |
|---|---|---|---|---|
| leerob.com | 100 | 0.6 | 0 | 1,126 |
| joshwcomeau.com | 100 | 0.6 | 11 | 1,014 |
| lusion.co | 90 | 0.9 | 43 | 12,659 |
| brittanychiang.com | 89 | 2.1 | 0 | 2,913 |
| jesperlandberg.com | 74 | 0.5 | 447 | 25,191 |
| henryheffernan.com | 68 | 3.7 | 246 | 11,495 |
| bruno-simon.com | 34 | 8.5 | 1,598 | 7,552 |

→ On desktop, a well-built immersive site (Lusion) can score 90; **on mobile the same site drops to 38**. The mobile gap is the whole problem.

### 4.3 Phone-viewport check (Playwright, iPhone 13 descriptor 390×664 CSS @ DPR 3, Chromium headless shell + SwiftShader, 15 s after `load`)

| Site | Renders on phone? | Gate / message | DPR used | DOM text chars | Honours reduced motion? |
|---|---|---|---|---|---|
| bruno-simon.com | Yes (WebGL2; also requested a WebGPU adapter) — still on loading ring at 15 s (software GPU) | — | 2.0 | **1** | No |
| henryheffernan.com | Yes | **"WARNING: This experience is best viewed on a desktop or laptop computer"** + START | 2.0 | 699 | No |
| lusion.co | Yes | — | **1.5** | 2,723 | No |
| jesperlandberg.com | Yes | — | 2.0 | 2,679 | No |
| meermohsin.me | Yes (3 canvases) | — | 1.6 | 3,788 | No |
| jordan-breton.com | Yes — loader at 90 % at 15 s | "Tap here to explore" | 1.0 | 218 | No |
| samsy.ninja | Yes — mobile joystick UI; WebGL fallback (no WebGPU in headless shell) | SKIP intro | 2.0 | 55 | No |
| ameen-abdullah.dev | Yes | — | 1.25 | 8,709 | No |
| jesse-zhou.com | Yes | START gate | 2.0 | **5** | No |
| igloo.inc | Yes (canvas not in light DOM) | — | n/a | **0** | No |

"No" in the reduced-motion column = with `reducedMotion: 'reduce'` emulated, the site still created its WebGL context and its rAF rate was unchanged (±4/s). Minimal sites had no canvas and no rAF loop. "Renders" = canvas created and first content painted (screenshots reviewed for 8 of 10). Chromium emulation, not WebKit/iOS.

### 4.4 What the measurements say
1. **No famous immersive portfolio blocks phones any more** — they all render on a 390-px viewport; one still warns "best viewed on desktop". Disabling mobile (the old portfolio's choice) is now below the bar of the genre.
2. **Immersive ≠ slow by necessity, but in practice the median immersive portfolio is ~13× heavier and scores ~35 on mobile.** The killers are (a) loaders/canvas-only content that leave no early DOM LCP, (b) 0.4–1.2 MB of JS evaluated up front, (c) multi-MB autoplay video/textures fetched during load.
3. **The single best pattern observed: SSR text first, WebGL as a layer** — Jesper Landberg's LCP is 1.1 s *with* a WebGL site, because the bio text is in the HTML. It still loses ~30 points to 15 MB of eagerly loaded video and 2.2 s TBT — fixable with lazy media.
4. **"Minimal" isn't automatically fast**: two minimal sites fail LCP mainly on **> 1 MB of web fonts**; leerob.com's 95 comes from system fonts + ~234 KB JS + no third parties.
5. **Lighthouse a11y ≠ accessible**: canvas-only Igloo scores 100. Real issues in the immersive set: disabled zoom, unnamed buttons, missing alt, ignoring reduced motion.

---

## 5. "Immersive but fast" architecture checklist

Principle: **the page is a fast, complete HTML document; the 3D is an optional layer that earns its bytes after the content is usable.** Every item below is checkable in code review or Lighthouse.

**Content & rendering**
1. **SSG/SSR all real content** (name, role, projects, case studies, contact) as semantic HTML. No information may exist only inside a canvas — Igloo's mobile page exposed **0 characters of DOM text** and Bruno Simon's **1** [measured, Playwright innerText] → invisible to screen readers, crawlers, Ctrl+F, translation, and LinkedIn previews.
2. **LCP element = real text or an AVIF poster**, server-rendered, visible without JS. Never let a loader label become the LCP.
3. **No blocking preloader.** If a 3D scene needs assets, show the page immediately and fade the scene in when ready (or show a poster). HN feedback on a 30 s+ preloader: people closed the tab [S17]. If a progress indicator is unavoidable (> 1 s), make it real progress (Nielsen 10 s limit) [S16].
4. **One route per project** (`/work/<slug>`) with its own title, description, OG image — shareable, indexable, back-button-safe [S47].

**Loading the 3D layer**
5. **Dynamic-import the 3D chunk** (`import()` / `next/dynamic({ssr:false})` / Astro island `client:visible`) — never in the entry bundle. Budget below (§7).
6. **Start after LCP and idle**: `requestIdleCallback` with a `setTimeout` fallback (Safari has no rIC), or on first user interaction / when the hero is visible (IntersectionObserver).
7. **Gate before downloading**: skip the chunk entirely when `prefers-reduced-motion: reduce`, `saveData === true` (Chromium only), WebGL2 unavailable, or tier = low (§6). Don't download 400 KB to then decide not to use it.
8. **Poster first, scene second**: an AVIF still (or a ≤ 1 MB muted loop) of the exact first frame sits under the canvas; cross-fade when the first frame renders. Same poster is the low-tier experience.
9. **Compress assets**: glTF via `gltf-transform optimize` [S67] / gltfpack [S39] — meshopt (fast decode, gzip-friendly) or Draco (smaller, 73 KB gz wasm decoder); textures as KTX2 (ETC1S colour / UASTC normals) only when texture volume justifies the 257 KB gz transcoder; otherwise WebP/AVIF. Serve `.wasm`/`.glb`/`.ktx2` **with brotli/gzip** (Bruno's site serves a 515 KB wasm uncompressed [measured]).
10. **Self-host decoders and detect-gpu benchmarks** (no runtime unpkg dependency) [S40].

**Running the 3D layer**
11. **One shared canvas** for all 3D (fixed, behind content) and **drei `View`/scissor** for per-section viewports — never one canvas per card (context limits, memory) [S31][S46].
12. **Render on demand** (`frameloop="demand"` + `invalidate()`); for continuous scenes, **pause when the canvas is offscreen** (IntersectionObserver) **or the tab is hidden** (`visibilitychange`).
13. **Cap DPR**: `dpr={[1, 1.5]}` on mobile, `[1, 2]` desktop; Lusion caps at 1.5 on a DPR-3 phone [measured: 585×996 backing store for 390×664 CSS]; Bruno/Jesper/Samsy use 2.0.
14. **Adapt at runtime**: initial tier from `detect-gpu` (+ `isMobile`), then drei `PerformanceMonitor` → step down DPR/effects on sustained < 50 fps; `AdaptiveDpr` during interaction.
15. **Handle context loss**: `webglcontextlost` → `preventDefault()`, show poster; `webglcontextrestored` → rebuild or **recreate the renderer on a new canvas** (WebGPURenderer WebGL-backend bug #34682 [S26]).
16. **Keep the main thread free**: precompile shaders (`renderer.compileAsync`), upload textures progressively, move heavy work (physics, particles) to a worker/OffscreenCanvas where possible (OffscreenCanvas is supported in all current engines per caniuse).
17. **Budget frames**: 16.7 ms @ 60 Hz total; assume iPhone Safari = 60 Hz cap and Low Power Mode = 30 fps [S33][S34]; design motion that still reads at 30 fps.

**Motion, scroll & input**
18. **Native scroll**. If smooth-scroll (Lenis) is used: desktop only, disabled under reduced motion, never on touch (`syncTouch: false`), and anchors/`scrollIntoView` must work [S34]. NN/g found scroll-jacking disorienting and *worse on mobile* [S48].
19. **`prefers-reduced-motion` honoured everywhere** — CSS, GSAP (`gsap.matchMedia`), the 3D loop (static frame), video (no autoplay) [S41][S49].
20. **Visible pause control** for any auto-moving content > 5 s that runs alongside other content (WCAG 2.2.2, Level A) [S50].

**Media & fonts**
21. **Images: AVIF** (95 % support) with `srcset/sizes`, explicit width/height, `loading="lazy"` below the fold, `fetchpriority="high"` on the LCP image.
22. **Video: AV1 first only with a fallback** — Safari decodes AV1 **only with hardware** (iPhone 15 Pro+, M3+), so ship `<source>` AV1 → HEVC/H.264 MP4; WebM VP9 for Chromium/Firefox; `muted playsinline`, `preload="none"` until visible; handle `play()` rejection in iOS Low Power Mode → poster + play button [S35].
23. **Fonts: ≤ 2 families, WOFF2, subset (Latin + Latin Extended-A for Polish ą ć ę ł ń ó ś ź ż), `font-display: swap` or `optional`, `size-adjust` fallback**, preload only the one used by the LCP text [S51]. Two "minimal" sites measured shipped **> 1 MB of fonts** (9 files each) and failed LCP [measured].
24. **No third-party JS on the critical path** (analytics deferred/consent-gated; brittanychiang.com's GTM was its biggest script, 157 KB [measured]).
25. **CI guardrail**: Lighthouse CI on every PR against the budgets in §7; fail the build if exceeded.

---

## 6. Device tier strategy

| Tier | How detected (combine; default to the lower tier on doubt) | What they get |
|---|---|---|
| **High** | Desktop/laptop, `detect-gpu` tier 3 (≥ 60 fps class), WebGL2 OK, no reduced-motion, `PerformanceMonitor` sustained ≥ 55 fps | Full signature scene: DPR ≤ 2, post-processing (bloom/DoF), real-time shadows, higher-res textures, pointer-driven interaction; optional desktop-only smooth scroll |
| **Mid** | Most phones & iGPU laptops: `isMobile` or tier 2; or High that declined at runtime | Same scene, cheaper: DPR ≤ 1.5, no post-FX (or one cheap pass), baked lighting/shadows, fewer instances/particles, lower texture res; render-on-demand, pause offscreen; touch = tap/drag alternatives (no hover-only) |
| **Low** | Tier 0–1, WebGL2 failure, `saveData`, context lost twice, sustained < 30 fps after downgrade, very old iOS | **No 3D download.** AVIF poster (or ≤ 1 MB muted loop if not Save-Data) + CSS micro-interactions. Optional "Load 3D" button for curious users |
| **Reduced motion** (`prefers-reduced-motion: reduce`) | Media query (96 % support) | Static poster or a single static 3D frame; no parallax, no scroll-linked motion, no autoplay video; opacity/colour cross-fades only (allowed by 2.3.3's definition) [S49] |
| **No-JS / crawler / in-app WebView** | — | Full SSR HTML: every project, case study, CV link, contact — identical information |

Rules of thumb [opinion]: the tier only changes *fidelity*, never *information*. Mobile is a designed experience (the Mid row), not a "best viewed on desktop" warning — every one of the 10 immersive sites measured renders something on a 390-px phone viewport; only Henry Heffernan's shows a desktop warning [measured].

---

## 7. Performance budget for this portfolio

Targets assume a mid-range Android (Lighthouse "Moto G Power" mobile profile: 150 ms RTT, ~1.6 Mbps, 4× CPU slowdown) and a p75 field target.

| Budget | Target | Rationale / evidence |
|---|---|---|
| **LCP** | ≤ **2.5 s** lab LH mobile (stretch 2.0 s); ≤ 2.5 s field p75 | CWV "good" = 2.5 s [S5]. Only 1 of 16 measured portfolios hits ≤ 2.5 s in LH mobile; leerob.com gets 2.6 s with ~1 MB [measured] — so this needs system/one subset font + text LCP in HTML |
| **TBT (lab) / INP (field)** | TBT ≤ **200 ms**; INP ≤ 200 ms | CWV "good" [S5]; nothing heavy before LCP |
| **CLS** | ≤ **0.05** | Explicit media dimensions, `size-adjust` fonts |
| **Lighthouse mobile performance** | ≥ **90** (home + each project page), with the 3D layer enabled on desktop | Only 1 of 16 measured portfolios reaches 90 on mobile (leerob 95; paco 89) — and **no** immersive one (best: 64) [measured]. Being the immersive portfolio that scores 90+ is a differentiator |
| **Initial JS (before LCP, gzip)** | ≤ **150 KB** (stretch 100) | React+ReactDOM alone = 67 KB gz [measured]; leerob (234 KB JS transfer) and paco (166 KB) score 95/89 [measured]; prefer islands/RSC so most components ship 0 JS |
| **Initial CSS** | ≤ 30 KB gz, inlined critical | |
| **Fonts** | ≤ **100 KB** total WOFF2, ≤ 2 families | Almanac median mobile = 122 KB [S9]; > 1 MB font payloads correlated with the worst LCPs among "minimal" sites [measured] |
| **Initial page weight (no interaction, mobile)** | ≤ **1 MB** | Almanac median mobile home = 2,559 KB; pages < 2 MB pass LCP far more often [S9] |
| **3D JS chunk (lazy, gzip)** | ≤ **200 KB** plain three (131–190 KB measured) · ≤ **250 KB** if R3F+drei on top of an existing React app (R3F stack adds ~243–335 KB over React) | §3.4 [measured] |
| **3D assets (lazy)** | High ≤ **2 MB** · Mid ≤ **1 MB** · Low **0** | Total mobile transfer: Lusion ~10 MB, Igloo ~17 MB, Bruno ~7.5 MB, immersive median ~11.9 MB (11,637 KiB) [measured] — that's the anti-target |
| **GPU memory (mobile)** | ≤ ~150 MB est. (render targets + textures) | iOS canvas caps 224–384 MB reported [S29]; KTX2 reduces VRAM |
| **Frame time** | ≤ 16.7 ms (60 Hz) on Mid tier; stay ≥ 30 fps in Low Power Mode | [S33] |
| **Draw calls** | ≤ ~100 mobile, few hundred desktop | R3F guidance: keep under 1000, ideally a few hundred [S45] |
| **Project media** | Card thumbnails AVIF ≤ 60 KB each at 2×; hero poster ≤ 120 KB; video loops ≤ 1–1.5 MB / 10 s @ 720p, lazy | |

---

## 8. Accessibility

### 8.1 WCAG 2.2 items that bite immersive portfolios

| SC | Level | What it means here | Source |
|---|---|---|---|
| **2.2.2 Pause, Stop, Hide** | **A** | Anything that moves automatically for > 5 s *alongside other content* (ambient 3D, marquee, background video) needs a pause/stop/hide mechanism; applies page-wide (non-interference) | [S50] |
| **2.3.3 Animation from Interactions** | **AAA** (not AA!) | Interaction-triggered motion (scroll-driven camera, parallax) can be disabled; sufficient technique C39 = `prefers-reduced-motion`. Not mandatory at AA — but cheap and expected by vestibular-sensitive users | [S49] |
| 2.3.1 Three Flashes | A | No > 3 flashes/s (glitch/strobe shaders!) | WCAG 2.2 |
| **2.4.7 Focus Visible** | AA | Custom cursors/overlays must not hide the focus ring | WCAG 2.2 |
| **2.4.11 Focus Not Obscured (Min.)** — new in 2.2 | AA | Sticky headers/footers/canvas overlays must not fully cover the focused element; fix with `scroll-padding` | [S52] |
| **2.5.7 Dragging Movements** — new | AA | Drag-to-rotate/orbit needs a single-pointer alternative (buttons/tap) | [S53] |
| **2.5.8 Target Size (Min.)** — new | AA | Pointer targets ≥ 24×24 CSS px (or spacing exception) — matters for icon nav, social links, project dots | [S54] |
| 2.1.1 Keyboard | A | Everything reachable/operable by keyboard — including "enter 3D", project hotspots | WCAG 2.2 |
| 1.4.3 / 1.4.11 Contrast | AA | 4.5:1 text, 3:1 UI — text over animated/3D backgrounds must pass on the *worst* frame (add a scrim) | WCAG 2.2 |

Context: WebAIM Million (Feb 2026) — 95.9 % of home pages have detectable WCAG failures; **low-contrast text on 83.9 %** of pages is #1 [S55] [data].

### 8.2 Making canvas content accessible
- Canvas is a bitmap; "content is not exposed to accessibility tools" — MDN even advises avoiding canvas for accessible content [S30]. → Put **all information in DOM** over/next to the canvas; the canvas is `aria-hidden="true"` decoration, or gets `role="img"` + `aria-label` describing the scene.
- 3D hotspots (projects in a scene) = real `<a>`/`<button>` elements positioned over the canvas (drei `<Html>` or DOM overlay synced to projected coordinates), in a logical tab order; focus moves the camera, not vice versa.
- Announce state changes ("Now viewing: Project X") via an `aria-live="polite"` region.
- `@react-three/a11y` exists but its last release is **3.0.0 from May 2022** — treat as unmaintained; build the DOM overlay yourself [data, npm S66].
- **Lighthouse a11y scores are misleading for canvas sites**: Igloo scored **100** with zero DOM text [measured]. Test manually with VoiceOver (iOS) and NVDA + keyboard.
- **Don't disable pinch-zoom.** 4 of 16 measured sites (Jordan Breton, Samsy, Lusion — and minimal rauno.me) fail Lighthouse `meta-viewport` (`user-scalable=no`/`maximum-scale`) — a common "protect the canvas" hack that breaks WCAG 1.4.4 Resize Text. Use `touch-action: none` on the canvas element only [measured].
- Other recurring automated failures on immersive sites: unnamed icon buttons (`button-name` — Bruno Simon, Jordan Breton), images without alt (`image-alt`), unnamed links, low contrast over imagery [measured, LH 13.5 / axe-core 4.13].
- **Reduced motion is ignored by the immersive sites measured**: with `prefers-reduced-motion: reduce` emulated, all of them still created a WebGL context and ran their rAF loop at the same rate [measured, Playwright — see §4.3]. Doing this right is an easy differentiator.

### 8.3 European Accessibility Act — does it apply?
- EAA (Directive (EU) 2019/882) applies from **28 June 2025** to listed products and services: computers/OS, ATMs, ticketing machines, smartphones, TV equipment, telephony, audiovisual media access, passenger transport, **banking, e-books, e-commerce** [S56].
- Poland transposed it via *ustawa o zapewnianiu spełniania wymagań dostępności niektórych produktów i usług przez podmioty gospodarcze* (passed 26 Apr 2024, in force 28 Jun 2025); **"mikroprzedsiębiorstwa, które świadczą usługi, będą wyłączone"** — micro-enterprises providing services are excluded [S57].
- **A personal, non-commercial portfolio is not a listed product/service → the EAA does not apply** [expert reading of S56/S57; not legal advice]. Polish public-sector web rules (*ustawa o dostępności cyfrowej stron internetowych i aplikacji mobilnych podmiotów publicznych*, 2019) cover public bodies, not individuals [expert, from the act's title/scope; not fetched today]. Still: hiring at EU companies that *are* in scope (banks, e-commerce) now screens for accessibility skill — a WCAG 2.2 AA portfolio is a portfolio piece in itself [opinion].

---

## 9. SEO for a JS/WebGL-heavy portfolio

| Topic | Recommendation | Evidence |
|---|---|---|
| Rendering | Google renders JS in headless Chromium after a render queue, but "server-side or pre-rendering is still a great idea … not all bots can run JavaScript". Link-preview scrapers (LinkedIn, Slack, messengers) generally read only the served HTML `<meta>` tags [opinion — widely observed, not verified here]. **SSG every page.** | [expert] Google JS SEO basics, updated 2026-03-04 [S47] |
| Canvas text | Text drawn in WebGL is not HTML → not indexable, not previewable (inference from "Google uses the rendered HTML to index") | [S47] |
| Links | Real `<a href>` for every project; History-API routes, no `#` routing | [S47] |
| Metadata | Unique `<title>` + meta description per page; canonical URL; `lang="en"` (or `pl` for a PL version with `hreflang`) | [S47] |
| OG/link previews | `og:title`, `og:description`, `og:url`, `og:image` ≥ **1200×627** (1.91:1), ≤ 5 MB — per page, including each project | [expert] LinkedIn Help [S58] |
| Structured data | `WebSite` (site name) on home [S59]; **`ProfilePage` + `mainEntity: Person`** (`name`, `jobTitle`, `image`, `sameAs` → GitHub/LinkedIn) on the About page — Google's valid examples include an "About Me" page on a blog [S60]; `CreativeWork`/`SoftwareSourceCode` per project is optional (no rich result) | [expert] |
| Sitemap | A ~10-page site "comprehensively linked" may not need one, but **a new site with few external links benefits** → ship `sitemap.xml` + `robots.txt` and submit in Search Console | [expert] Google, updated 2025-12-10 [S61] |
| Ranking reality | Relevance first; CWV are one of many signals [S12]. The real SEO goal is "your name → your site" + rich previews when a recruiter pastes the link | [opinion] |

---

## Sources

All accessed 2026-10-05.

| # | Title (publisher) | URL | Published / updated |
|---|---|---|---|
| S1 | Desktop vs Mobile vs Tablet Market Share Worldwide (StatCounter) | https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet | data Sep 2026 |
| S2 | Desktop vs Mobile vs Tablet Market Share Poland (StatCounter) | https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/poland | data Sep 2026 |
| S3 | LinkedIn Mobile vs Desktop in 2026: Three Numbers, Three Methods (SQ Magazine) | https://sqmagazine.co.uk/linkedin-mobile-vs-desktop-statistics/ | 2026 |
| S4 | LinkedIn now has 414 million members; 57% of traffic coming from mobile (LinkedIn Pulse) | https://www.linkedin.com/pulse/linkedin-now-has-414-million-members-57-traffic-coming-tony-hansen | 2016 (Q4 2015 data) |
| S5 | Web Vitals (web.dev) | https://web.dev/articles/vitals | updated 2024-10-31 |
| S6 | INP is officially a Core Web Vital (web.dev) | https://web.dev/blog/inp-cwv-launch | 2024-03-12 |
| S7 | Interaction to Next Paint (web.dev) | https://web.dev/articles/inp | updated 2025-09-02 |
| S8 | Web Almanac 2025 — Performance (HTTP Archive) | https://almanac.httparchive.org/en/2025/performance | 2025 (CrUX Jul 2025) |
| S9 | Web Almanac 2025 — Page Weight (HTTP Archive) | https://almanac.httparchive.org/en/2025/page-weight | 2025 (Jul 2025 crawl) |
| S10 | Largest Contentful Paint (web.dev) | https://web.dev/articles/lcp | updated 2025-09-04 |
| S11 | Understanding Core Web Vitals and Google search results (Google Search Central) | https://developers.google.com/search/docs/appearance/core-web-vitals | updated 2025-12-10 |
| S12 | Understanding page experience in Google Search results (Google Search Central) | https://developers.google.com/search/docs/appearance/page-experience | updated 2026-09-22 |
| S13 | The need for mobile speed (Google / DoubleClick blog) | https://blog.google/products/admanager/the-need-for-mobile-speed/ | 2016-09-08 |
| S14 | Website Performance and Conversion: A Review of the Evidence (Cazyweb, secondary) | https://cazyweb.com/research/website-performance-and-conversion-evidence/ | 2025–26 |
| S15 | Milliseconds Make Millions (Deloitte for Google) | https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html | 2020-03 |
| S16 | Response Times: The 3 Important Limits (NN/g, J. Nielsen) | https://www.nngroup.com/articles/response-times-3-important-limits/ | 1993 (updated since) |
| S17 | Bruno Simon — Hacker News discussion | https://news.ycombinator.com/item?id=46206531 | ~Dec 2025 |
| S18 | WebGPU is now supported in major browsers (web.dev) | https://web.dev/blog/webgpu-supported-major-browsers | 2025-11-25 |
| S19 | Can I use: WebGPU (+ raw data github.com/Fyrd/caniuse features-json/webgpu.json) | https://caniuse.com/webgpu | data pulled 2026-10-05 |
| S20 | What's New in WebGPU (Chrome 121) | https://developer.chrome.com/blog/new-in-webgpu-121 | 2024-01-18 |
| S21 | Shipping WebGPU on Windows in Firefox 141 (Mozilla Gfx) | https://mozillagfx.wordpress.com/2025/07/15/shipping-webgpu-on-windows-in-firefox-141/ | 2025-07-15 |
| S22 | three — npm registry | https://www.npmjs.com/package/three | 0.186.1, 2026-09-24 |
| S23 | What's New in Three.js (2026) (Utsubo, secondary) | https://www.utsubo.com/blog/threejs-2026-what-changed | 2026 |
| S24 | three.js manual — WebGPURenderer (source: mrdoob/three.js dev, manual/pages/webgpurenderer.html) | https://threejs.org/manual/#en/webgpurenderer | dev branch, read 2026-10-05 |
| S25 | three.js r184 release notes | https://github.com/mrdoob/three.js/releases/tag/r184 | 2026-04-16 |
| S26 | WebGPURenderer (WebGL backend): renderer never recovers after webglcontextrestored — issue #34682 | https://github.com/mrdoob/three.js/issues/34682 | 2026-09-27 (closed 2026-09-28) |
| S27 | Canvas — React Three Fiber docs | https://r3f.docs.pmnd.rs/api/canvas | current |
| S28 | Bruno's Portfolio Case Study (Awwwards) | https://www.awwwards.com/brunos-portfolio-case-study.html | 2026-03-11 |
| S29 | Total Canvas Memory Use Exceeds The Maximum Limit (PQINA) | https://pqina.nl/blog/total-canvas-memory-use-exceeds-the-maximum-limit/ | 2022-01-12 |
| S30 | `<canvas>` element (MDN) | https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas | current |
| S31 | "Too many active WebGL contexts" — OpenLayers issue #16118 / Chromium issue 40543269 | https://github.com/openlayers/openlayers/issues/16118 · https://issues.chromium.org/issues/40543269 | 2024-08-22 / n.d. |
| S32 | "Context Lost" when backgrounding Safari on iOS 17 (three.js forum) | https://discourse.threejs.org/t/context-lost-when-backgrounding-safari-on-ios-17-developer-beta-8/55772 | 2023– |
| S33 | WebKit Bug 168837 — throttle rAF to 30fps in low power mode | https://bugs.webkit.org/show_bug.cgi?id=168837 | 2017-02-24/28 |
| S34 | Lenis README (darkroom.engineering) | https://github.com/darkroomengineering/lenis | v1.3.26, read 2026-10-05 |
| S35 | How to enable autoplay videos in Low Power Mode on iOS and macOS (R. Leśniak) | https://lesniakrafal.com/en/article/how-to-enable-autoplay-videos-in-low-power-mode-on-ios-and-macos/ | 2023-06-07 |
| S36 | Khronos KTX 2.0 Textures Enable Compact, Visually Rich, glTF 3D Assets (Khronos) | https://www.khronos.org/news/press/khronos-ktx-2-0-textures-enable-compact-visually-rich-gltf-3d-assets | 2021-04-20 |
| S37 | KHRTextureBasisu (glTF Transform docs) | https://gltf-transform.dev/modules/extensions/classes/KHRTextureBasisu | current |
| S38 | EXTMeshoptCompression (glTF Transform docs) | https://gltf-transform.dev/modules/extensions/classes/EXTMeshoptCompression | current |
| S39 | gltfpack (meshoptimizer) | https://meshoptimizer.org/gltf/ | current |
| S40 | pmndrs/detect-gpu README | https://github.com/pmndrs/detect-gpu | v5.0.70 |
| S41 | prefers-reduced-motion (MDN) | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion | current |
| S42 | prefers-reduced-data (MDN) | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-data | current |
| S43 | Compute Pressure API (MDN) + BCD api/PressureObserver.json | https://developer.mozilla.org/en-US/docs/Web/API/Compute_Pressure_API | current |
| S44 | PerformanceMonitor (drei docs) | https://drei.docs.pmnd.rs/performances/performance-monitor | current |
| S45 | Scaling performance (React Three Fiber docs) | https://r3f.docs.pmnd.rs/advanced/scaling-performance | current |
| S46 | View (drei docs) | https://drei.docs.pmnd.rs/portals/view | current |
| S47 | Understand JavaScript SEO Basics (Google Search Central) | https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics | updated 2026-03-04 |
| S48 | Scrolljacking 101 (NN/g, S. Paul) | https://www.nngroup.com/articles/scrolljacking-101/ | 2023-08-06 |
| S49 | Understanding SC 2.3.3 Animation from Interactions (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html | WCAG 2.2 |
| S50 | Understanding SC 2.2.2 Pause, Stop, Hide (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html | WCAG 2.2 |
| S51 | Best practices for fonts (web.dev) | https://web.dev/articles/font-best-practices | 2022-10-04 |
| S52 | Understanding SC 2.4.11 Focus Not Obscured (Minimum) (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html | WCAG 2.2 |
| S53 | What's New in WCAG 2.2 (W3C WAI) | https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/ | current |
| S54 | Understanding SC 2.5.8 Target Size (Minimum) (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | WCAG 2.2 |
| S55 | The WebAIM Million (WebAIM) | https://webaim.org/projects/million/ | 2026-02 |
| S56 | European Accessibility Act (European Commission) | https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en | current |
| S57 | European Accessibility Act (EAA) — Ministerstwo Funduszy i Polityki Regionalnej | https://www.funduszeunijne.gov.pl/strony/o-funduszach/fundusze-europejskie-bez-barier/dostepnosc-plus/dostepnosc-dla-biznesu/european-accessibility-act-eaa/ | current |
| S58 | Shareable content: images and link previews (LinkedIn Help) | https://www.linkedin.com/help/linkedin/answer/a521928 | current |
| S59 | Site names in Google Search (Google Search Central) | https://developers.google.com/search/docs/appearance/site-names | updated 2025-12-10 |
| S60 | ProfilePage structured data (Google Search Central) | https://developers.google.com/search/docs/appearance/structured-data/profile-page | updated 2026-09-08 |
| S61 | Learn about sitemaps (Google Search Central) | https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview | updated 2025-12-10 |
| S62 | MDN browser-compat-data (api/NetworkInformation.json, api/PressureObserver.json) | https://github.com/mdn/browser-compat-data | main, pulled 2026-10-05 |
| S63 | caniuse raw data (avif, av1, hevc, webm, webgl2, requestidlecallback, offscreencanvas, view-transitions) | https://github.com/Fyrd/caniuse/tree/main/features-json | main, pulled 2026-10-05 |
| S64 | Best Three.js Portfolio Examples (Creative Dev Jobs) — site selection | https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025 | 2025–26 |
| S65 | Best Three.js Websites (Awwwards) — site selection (Jesper Landberg SOTD 2026-09-29, Meer Mohsin SOTD 2026-09-26) | https://www.awwwards.com/websites/three-js/ | live list |
| S66 | @react-three/a11y — npm registry | https://www.npmjs.com/package/@react-three/a11y | last release 3.0.0, 2022-05-15 |
| S67 | glTF Transform CLI | https://gltf-transform.dev/cli | current |
| S68 | iOS Version Market Share Worldwide (StatCounter) | https://gs.statcounter.com/ios-version-market-share/mobile-tablet/worldwide | data Sep 2026 |

Not covered: real-device field data (no CrUX/RUM for the measured sites; no physical iPhone/Android runs — Lighthouse ran emulated mobile on a desktop RTX 2060 GPU, the Playwright phone check on software SwiftShader); WebKit-engine (Playwright WebKit) rendering checks; battery/thermal measurement; recruiter device-usage primary research (none found); Firefox-specific WebGL behaviour; per-framework comparison (Next.js vs Astro vs SvelteKit) — only bundle sizes of 3D stacks were measured; legal advice on EAA (reading of the Directive/Polish act only).
