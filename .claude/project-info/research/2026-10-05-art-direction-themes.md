# Art Direction & Theme Catalog for a Developer Portfolio

Date: 2026-10-05

## TL;DR — implications for this portfolio

- **Practicality is the filter, not a footnote.** Of ~50 live sites screenshotted, the award-heavy WebGL "worlds" were the least usable: START/ENTER gates (Bruno Simon, Henry Heffernan, Jesse Zhou, Henri Heymans, buche.dev, Martin Gauer, Parinaz), loaders still spinning at 30–40 s (Jordan Breton at 90 % after 40 s, Chris Pokrzywa still "Aligning pixels…" at 30 s), and 15–56 MB payloads (Parinaz 56 MB, Primland 27 MB, Aimee's Papercraft 20 MB, Igloo 16 MB) [measured]. Several also expose **zero project/contact links in the HTML** (Messenger, Igloo, Aimee's Papercraft, Jesse Zhou: 0 work/contact links in the DOM) [measured].
- **The pattern that works: themed skin on a boring skeleton.** Sites that are both distinctive and practical put normal, server-rendered navigation and content first and add the theme as paint: Niccolò Miranda (paper newspaper, ~2.3 MB, content at ~1.1 s), Wildy Riftian (pre-rendered 3D keychain as images, no WebGL, ~2.5 MB, work+contact visible instantly, SOTD 12 Sep 2025), Oryzo (photoreal desk but Intro/Features/Product/Contact nav visible), Bartosz Ciechanowski (plain article + 93 interactive canvases, 2.5 MB), Cyd Stumpel (email + "Available Oct 2026" in the header, SOTD 9 Mar 2025) [measured/data].
- **Best fit for "prove real-world shipping": an engineering-drawing (blueprint) language that turns into real UI.** It is the only theme where the decoration *is* evidence (architecture diagrams, annotated screenshots, revision blocks, stack = bill of materials), it is SVG-light, scales to 5+ case studies, and Claude Code can generate most of it [opinion].
- **Runner-up directions:** tactile paper/print "dossier" with a precise code layer; a "workbench" of AI-rendered physical objects as a project index (keytags/cartridges/cards, pre-rendered, not real-time 3D); a pencil-sketch notebook that inks itself in on interaction [opinion].
- **Diorama/miniature 3D is the highest-wow option and the riskiest.** Only acceptable as an optional, lazy-loaded hub that is never a gate (Messenger proves a light 3D world can be ~5.6 MB; Dev Site of the Year 2025) [data]. With no 3D artist, AI-generated GLBs rarely hold together as one coherent world [opinion].
- **Avoid as the main theme:** terminal/CLI (highest cliché, unusable for non-technical screeners, typing on mobile), full OS/desktop simulation (now very common; breaks on phones; PostHog's version got "breaks browser conventions / ~10 fps dragging windows" feedback on HN), cinematic scroll-film (linear — the exact failure of the old space portfolio), Liquid Glass (Apple-2025 trend, saturated in 2026, contrast risk), Y2K/chrome (reads fashion, not engineering) [opinion/anecdote].
- **Stop-motion/claymation: no live award-level developer portfolio found in this pass** — the "stop motion" hits on Awwwards were video/agency sites. Use frame-by-frame "boiling" only as a micro-accent (stepped SVG turbulence, sprite steps) [measured gap/opinion].
- **ASCII and generative shaders are accents, not themes**: ASCII loaders now appear at Igloo, Active Theory, Ghostty [measured]; grainy gradient blobs are everywhere. One signature effect, applied to real content (e.g., project screenshots dithering/ASCII-resolving into focus) beats a full-screen background [opinion].
- **AI asset generation fits pre-rendered objects, textures and line-art best**; it looks cheapest in characters, consistent illustrated worlds, and "realistic" scenes that need to match across 6+ views [opinion].
- **Non-negotiables for whichever theme wins:** no entry gate, sound off by default, contact + CV visible on the first screen and sticky, every case study a deep-linkable route, theme layers lazy-loaded after LCP with a static fallback, `prefers-reduced-motion` honoured [expert].

## Method & caveats

- ~55 live sites visited with Playwright 1.63 / headless Chromium (GPU via ANGLE-D3D11 on an RTX 2060; first pass with SwiftShader timed out on WebGL sites). Screenshots 1440×900 + 390×844 (JPEG q70) in `inspirations/img/theme-*.jpg`; every one was viewed before being described.
- **[measured]** numbers are rough: one run each, desktop unthrottled; mobile probe = 390×844, 4× CPU slowdown, ~9 Mbps / 85 ms RTT. "MB" = bytes transferred during the screenshot run (≈ first 6–40 s), not total page weight. "Usable" = first moment ≥150 visible characters and ≥3 visible links exist; overlays/loaders can fool it, so gates were confirmed by eye on screenshots.
- Award claims were read from each site's Awwwards page (`awwwards.com/sites/<slug>`) or the Awwwards 2025 annual winners page; anything else is marked [unverified].
- Web-search budget ran out mid-research; some themes (stop-motion, Y2K) have thinner live evidence — stated where so.

## The practicality rule (applies to every theme below)

| Rule | Why | Good live example |
|---|---|---|
| Real HTML nav + content at first paint; theme is progressive enhancement | Recruiters skim in seconds; crawlers and screen readers need text | Niccolò Miranda, Ciechanowski, Josh Comeau, Lynn Fisher |
| Never a gate (START / click to enter / sound prompt / loader-to-100 %) | Every gate observed added 1 extra click and often 10–40 s | Counter-examples: Henry Heffernan, Bruno Simon, Jesse Zhou, Henri Heymans, buche.dev |
| Contact + CV on screen 1 and sticky | Old portfolio buried contact at the end of a linear scroll | Cyd Stumpel (email in header), Aladin Akkari ("Me contacter" + CV pill), Dennis Snellenberg |
| Heavy layers (WebGL, video, Rive) load after LCP, behind a capability check, with a static poster fallback | Payloads of 10–56 MB observed on themed sites | Wildy Riftian (pre-rendered 3D as images, no WebGL) |
| Every project is a deep-linkable route; the themed hub is only an index | 5+ detailed case studies + certifications must be shareable | PostHog (OS chrome around normal pages; mobile collapses to a normal page) |
| Mobile gets the same content, not a "best viewed on desktop" warning | User's old site was disabled on mobile | Counter-example: Henry Heffernan mobile warning; buche.dev unscaled pixel dialog on 390 px |

**Layer model the theme must fit into** (budgets are [expert/opinion] targets, informed by the measured spread above):

| Layer | Contains | Budget | When it loads |
|---|---|---|---|
| L0 skeleton | SSG HTML: nav, name/role/availability/email/CV, project index, case-study routes, certifications, contact | critical HTML+CSS ≤ ~100 KB; LCP < 2.5 s on 4G | first, always |
| L1 theme paint | ≤2 font families (subset), 1–2 AVIF/WebP textures, CSS View Transitions, scroll-driven animations | ≤ ~300 KB | with CSS |
| L2 signature motion | inline SVG diagrams / stroke-draw, small Rive/Lottie files | ≤ ~500 KB per page | when scrolled into view |
| L3 optional heavy | WebGL/shader/3D hub, video loops | ≤ ~5–6 MB (Messenger-scale) | after LCP + idle + capability check; skipped on Save-Data / reduced-motion; static poster fallback with the same links |

---

## Theme catalog

Legend for each example line: **Award** = verified on Awwwards unless marked. **Practicality** = [measured] gate · MB transferred · projects/contact findable fast · mobile. Screenshot paths are relative to `research/inspirations/` (e.g., `research/inspirations/img/theme-paper-niccolo-miranda.jpg`); 10 strongest examples also have notes in `research/inspirations/theme-<slug>.md`.

### 1. Paper / print textures & tactile collage

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| Niccolò Miranda — "The Paper Portfolio" https://niccolomiranda.com/ | SOTD 18 Nov 2021 | `img/theme-paper-niccolo-miranda.jpg`, `-mobile.jpg` | No gate · 2.3 MB · newspaper sections + "Drag sideways" work rail visible at ~1.1 s · mobile stacks cleanly (menu needed for contact) |
| Lynn Fisher v.XIX https://lynnandtonic.com/ | — | `img/theme-paper-lynnandtonic.jpg` | No gate · 0.38 MB · book table-of-contents nav (About I … GIFs VI) instantly · no direct contact link on home |
| Wildy Riftian https://www.wildyriftian.com/ (archival papers/folders → 2026 keychain) | SOTD 12 Sep 2025 | `img/theme-paper-wildy-riftian.jpg`, `-mobile.jpg` | No gate · 2.5 MB · Home/Works/About/Contact visible ~1 s · no WebGL (pre-rendered objects) · mobile clean |
| Aimee's Papercraft World https://aimees-papercraft-world.com/ | SOTD 24 May 2026 | `img/theme-paper-aimees-papercraft*.jpg` | "Enter!" step · ~20 MB desktop / 15 MB mobile · 0 project/contact links in DOM |

- **Moves:** paper grain + torn edges, newspaper/book typographic systems (condensed display serif, rules, dotted leaders, roman numerals), physical tactility via shadows; papercraft 3D as the extreme.
- **Signals:** taste, typographic craft, attention to detail; engineering only if paired with something precise [opinion].
- **Memorability 4 · Wow 3.** **Cost:** textures (scan or AI), a strong type pairing; Paper Shaders' "paper texture" filter (https://shaders.paper.design/) makes it a CSS/WebGL one-liner [measured: library page].
- **AI feasibility:** high — paper/cardboard textures and torn-edge masks are where AI image gen looks fine; papercraft characters look cheap fast [opinion].
- **Perf/mobile:** excellent if textures are 1–2 tiled WebP/AVIF; Miranda + Lynn prove sub-2.5 MB [measured]. **A11y:** low-contrast grey-on-beige is the main risk; keep body text ≥4.5:1.
- **Cliché 2026:** medium — grain overlays are common; a full print *system* (issue numbers, folios, dossiers) is still fresh.
- **Scalability:** excellent — "issues", "dossiers", "clippings", certificates as stamped documents, contact as a tear-off slip.
- **Navigable pairing:** front page = index of articles (each case study a headline), table of contents, archive drawer.

### 2. Isometric / diorama / miniature 3D worlds

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| Messenger (abeto) https://messenger.abeto.co/ | SOTD 10 Nov 2025; **Developer Site of the Year 2025** | `img/theme-diorama-messenger.jpg`, `-mobile.jpg` | ~5.6 MB at 20 s; tiny planet rendered on desktop; mobile run still on loader at 20 s (reports say it runs smoothly on phones [anecdote]) · 0 HTML links (it's a game, not a portfolio) |
| Bruno Simon 2025 https://bruno-simon.com/ | SOTD 21 Jan 2026 (SOTM Jan 2026 reported [unverified]) | `img/theme-diorama-bruno-simon.jpg`, `-mobile.jpg` | "CLICK TO START" gate · 7.4 MB · desktop scene ready only after ~15–30 s in our run · projects reachable only by driving |
| Jesse Zhou — Jesse's Ramen https://jesse-zhou.com/ | — | `img/theme-diorama-jesse-zhou.jpg` | "START" gate · ~9 MB · nav is a 3D signpost (projects / articles / about me / credits) · 0 links in DOM |
| Jordan Breton https://jordan-breton.com/ | FWA SOTD 2 Oct 2025 [unverified, via creativedevjobs] | `img/theme-diorama-jordan-breton.jpg` | Loader at 90 % after 40 s · 18.8 MB [measured] |

- **Moves:** one hand-crafted miniature (room, shop, island, planet), orthographic or tilt-shift camera, cel/toon shading, navigation baked into objects (signposts, doors).
- **Signals:** strong 3D/graphics engineering; but in 2026 reviewers know Three.js Journey's "room portfolio" lesson, so it can read as course work [opinion].
- **Wow 5 · Memorability 5.** **Cost:** very high — modelling, baking lighting, optimisation (Draco/KTX2, BVH), camera UX. Messenger used Houdini + Blender + Substance + three-mesh-bvh [anecdote: Medium/HN summaries].
- **AI feasibility:** low-medium — AI GLB generators give single props, not a coherent baked world; mismatched styles look cheap. Feasible only as a *small* scene (one desk, one shop) with a strict low-poly palette [opinion].
- **Perf/mobile:** worst observed category — gates + 7–19 MB + long loaders [measured]. **A11y:** canvas-only content is invisible to screen readers; needs a DOM mirror.
- **Cliché 2026:** high for "my room in 3D"; medium for anything with a novel premise. **Scalability:** poor — 5+ case studies become hotspots; certifications/contact don't map to objects naturally.
- **Navigable pairing:** only as a hub with an always-visible HTML menu and direct project routes.

### 3. Animated vector illustration (SVG / Rive / Lottie)

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| Josh W. Comeau https://www.joshwcomeau.com/ | — | `img/theme-vector-joshcomeau.jpg`, `-mobile.jpg` | No gate · 0.9 MB · whimsical vector clouds over plain article index; usable ~1.8 s desktop / ~3.4 s throttled mobile |
| Adham Dannaway https://www.adhamdannaway.com/ | — | `img/theme-vector-adham.jpg`, `-mobile.jpg` | No gate · 0.8 MB · half-illustration/half-photo "designer \| <coder>" hero; nav incl. portfolio + contact visible; slow FCP in our run (~4.6 s desktop) |
| Lando Norris https://landonorris.com/ (Rive + WebGL) | **Site of the Year 2025** | `img/theme-cine-lando.jpg`, `-mobile.jpg` | No gate · 5.5–6.7 MB · 8 `.riv` files for signature, buttons, transitions [anecdote: stack teardown] · works on mobile ("tap to lock") |
| Rive https://rive.app/ (tooling reference) | — | `img/theme-vector-rive.jpg` | Marketing page; notable: Rive now ships a CLI "let an agent generate them" [measured: page copy] |

- **Moves:** state-machine characters/icons that react to cursor, scroll, hover; vector scenes as section dividers; micro-interactions on buttons.
- **Signals:** UI craft + interaction engineering (state machines), playfulness. Cassie Evans' famous SVG/GSAP portfolio is now retired (`img/theme-vector-cassie.jpg` shows a farewell note) — the genre's best-known dev site is gone [measured].
- **Wow 3–4 · Memorability 4.** **Cost:** needs illustration + rigging skill; Rive state machines are learnable; Lottie needs After Effects.
- **AI feasibility:** medium-low for characters (inconsistent across poses; obviously AI), good for abstract/icon vectors that Claude writes as SVG directly [opinion].
- **Perf/mobile:** good (vector + small runtime). **A11y:** motion-heavy → reduced-motion variants required.
- **Cliché:** medium. **Scalability:** good — a mascot or icon system can follow you through every page. **Pairing:** any nav; works as signature moments inside a normal site.

### 4. Stop-motion / claymation / hand-made frame-by-frame

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| Aralesk — Collages & Motion https://www.aralesk.es/ | HM 17 Aug 2026 | `img/theme-stopmotion-aralesk.jpg` | Rolling metal-shutter intro (tactile, not stop-motion) · 0.75 MB · no contact link in DOM · usable ~13 s on throttled mobile |
| Warm & Fuzzy https://www.warmnfuzzy.tv/ | SOTD 12 Sep 2026 | `img/theme-stopmotion-warmnfuzzy*.jpg` | Video-reel agency site, 10–13 MB, nav + contact visible — *not* stop-motion |
| AreyouDami https://www.areyoudami.com/ | Nominee 26 Sep 2026 | `img/theme-stopmotion-areyoudami*.jpg` | "TAP TO START" gate then lo-fi video hero, 12 MB |

- **Finding:** Awwwards "stop motion" results were video-led agency/filmmaker sites; **no live developer portfolio built on real stop-motion/claymation was found in this pass** [measured gap].
- **Moves (technique-level):** 8–12 fps "boiling" line (SVG `feTurbulence` seed stepping), sprite sheets with CSS `steps()`, photographed paper cut-outs, clay-rendered objects.
- **Signals:** craft/patience, little engineering. **Wow 4 · Memorability 5 · Cost:** very high if real (physical set, camera, hundreds of frames); AI video (e.g., Seedance via Higgsfield) can produce clay-look clips but frame-to-frame consistency and "AI sheen" are obvious [opinion].
- **Perf/mobile:** video weight; **a11y:** flicker risk at low fps. **Cliché:** fresh (rare). **Scalability:** poor beyond hero moments.
- **Use as:** a micro-accent (hand-made "boil" on icons, a 12-frame loader) — not a system.

### 5. Photoreal 3D / product-render realism

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| Oryzo AI https://oryzo.ai/ (by Lusion) | SOTD 13 Apr 2026 (SOTM Apr 2026 reported [unverified]) | `img/theme-real-oryzo.jpg` | No gate · 8.5–11.7 MB · photoreal cork coaster on a cutting mat with ruler, pencils, cutter; Intro/Features/Product/Contact visible; LCP ~12.9 s desktop [measured] |
| Igloo Inc https://www.igloo.inc/ | SOTD 23 Jul 2024; Site of the Year 2024 [data: Igloo's own post + search] | `img/theme-real-igloo.jpg`, `-mobile.jpg` | ASCII loader still on at 15 s; ready by 35 s (desktop and 390 px mobile render the same scene, sound off by default) · 16.3 MB · 0 HTML links |
| Lusion https://lusion.co/ | SOTD 2 Oct 2023 (v3) | `img/theme-real-lusion.jpg` | Loader at 12 s, ready by 30 s · 11.6 MB · "Let's talk" + Menu always visible |
| Apple AirPods Pro https://www.apple.com/airpods-pro/ | — | `img/theme-cine-airpods.jpg` | No gate · 8.4 MB · product-render hero + full site nav |

- **Moves:** glossy/rough PBR materials, studio lighting, macro product shots, physics inertia, scroll-scrubbed renders.
- **Signals:** high-end graphics capability; but realism is now the default look of big-studio work, so it reads as "agency", not "engineer who ships products" [opinion].
- **Wow 5 · Memorability 4 · Cost:** high real-time; **medium if pre-rendered** (AI image/video for objects is genuinely good now — product-shot style is AI's strongest suit [opinion]).
- **Perf/mobile:** heavy (8–16 MB observed). **A11y:** fine if content is DOM. **Cliché:** medium-high. **Scalability:** medium (one hero object per case study works).
- **Pairing:** objects as section anchors; real-time only in one place.

### 6. Terminal / CLI / hacker

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| Sat Naing terminal-portfolio https://terminal.satnaing.dev/ (~820 GitHub stars) | — | `img/theme-terminal-satnaing.jpg`, `-mobile.jpg` | 0.1 MB, instant — but projects/contact only after typing `help` |
| LiveTerm https://liveterm.vercel.app/ (template) | — | `img/theme-terminal-liveterm.jpg` | 0.8 MB, instant, same typing requirement |

- **Signals:** "I'm a developer" — but it's the most-forked portfolio template genre on GitHub (topics `terminal-portfolio`, many 100–800★ repos) [data: GitHub topic counts via search]; HN feedback: "un-navigatable for non-technical folks" [anecdote].
- **Wow 2 · Memorability 2 · Cost:** very low. **AI feasibility:** trivial (which is the problem). **Mobile:** typing on phones is hostile.
- **A11y:** OK if it's real text; bad if canvas. **Cliché:** highest of all themes. **Scalability:** poor for rich case studies with images.
- **Salvage:** a ⌘K command palette or a "`$ curl me`" easter egg inside a normal site gives the flavour without the cost.

### 7. OS / desktop simulation

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| Henry Heffernan https://henryheffernan.com/ (3D room → Win-95-style OS on the monitor) | — | `img/theme-os-henryheffernan.jpg`, `-mobile.jpg` | "Click start to begin" gate · 12 MB · mobile shows "best viewed on a desktop or laptop" |
| PostHog https://posthog.com/ (company site as an OS, launched Sep 2025) | — | `img/theme-os-posthog.jpg`, `-mobile.jpg` | No gate · ~6.4–7.3 MB (load event >40 s) · desktop icons + windows; **mobile collapses to a normal page inside a window frame** |
| daedalOS — Dustin Brett https://dustinbrett.com/ | — | `img/theme-os-dustinbrett.jpg` | No gate · 0.35 MB initial (lazy) · Windows-like desktop with Doom, blog, videos |
| ryOS https://os.ryo.lu/ · Poolsuite https://poolsuite.net/ · Parinaz https://www.parinazkassemi.com/ | Parinaz HM 19 Jul 2026 | `img/theme-os-ryos.jpg`, `theme-os-poolsuite.jpg`, `theme-obj-parinaz.jpg` | ryOS 9 MB, Aqua desktop + AI assistant; Poolsuite 5.4 MB; Parinaz lock-screen "Click to unlock" gate, **56 MB** |

- **Signals:** genuine engineering (window manager, state, routing, file system) — daedalOS is a serious build [opinion].
- **Wow 4 · Memorability 4 (was 5 in 2022) · Cost:** medium-high. **AI feasibility:** high for code, but Claude-built "macOS portfolio" templates are now abundant (many GitHub repos, a Bolt "macOS-style portfolio" rebuild tutorial) [data: search results].
- **Perf/mobile:** desktop metaphor breaks on phones unless it degrades like PostHog. HN on PostHog: praise for fast navigation, criticism for broken right-click/back, ~10 fps window dragging on Safari, 20 s load on Firefox Android [anecdote].
- **A11y:** windows/drag are keyboard/screen-reader hard. **Cliché:** high. **Scalability:** good (apps/folders hold anything).
- **Pairing:** it *is* a non-linear nav; borrow its ideas (multiple open panels, ⌘K, dock = sticky contact) without the full OS.

### 8. Brutalism / neo-brutalism

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| Gumroad https://gumroad.com/ | — | `img/theme-brutal-gumroad.jpg` | 0.43 MB · instant · black outlines, hard shadows, pink coins |
| Cyd Stumpel https://cydstumpel.nl/ (playful neo-brutalist/editorial; CSS View Transitions + scroll-driven animations) | SOTD 9 Mar 2025 | `img/theme-brutal-cydstumpel.jpg`, `-mobile.jpg` | No gate · 3.4 MB · **email + availability in the header**, About/Archive/Speaking/Blogs/Contact visible · mobile good |
| wizard zines (Julia Evans) https://wizardzines.com/ | — | `img/theme-hand-wizardzines.jpg` | 6.4 MB (zine covers) · neo-brutalist buttons + stick-figure speech bubble · instant nav |

- **Signals:** confidence, speed, pragmatism; little depth unless the content carries it. **Wow 2–3 · Memorability 3.**
- **Cost/AI:** lowest — whole component libraries exist (RetroUI, neobrutalism shadcn variants) → **which makes it generic** [opinion].
- **Perf/mobile/a11y:** excellent (high contrast). **Cliché:** high (Gumroad-era, templates). **Scalability:** excellent.
- **Use as:** the *UI layer* of a richer concept (hard-shadow buttons, stickers), not the concept.

### 9. Editorial / Swiss / typography-first

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| Rauno Freiberg https://rauno.me/ | — | `img/theme-edit-rauno.jpg`, `-mobile.jpg` | 0.6 MB · horizontal card deck, yellow disc, precise micro-interactions |
| Emil Kowalski https://emilkowal.ski/ | — | `img/theme-edit-emil.jpg` | 1.9 MB · projects list on screen 1 (Sonner, Vaul…) — maximum practicality, minimal theme |
| Dennis Snellenberg https://www.dennissnellenberg.nl/ | HM 15 Aug 2019 | `img/theme-edit-dennis.jpg` | 0.6 MB · Work/About/Contact top-right · marquee name |
| Juan Mora Romero https://www.juanmoraromero.com/ | Nominee 17 Sep 2026 | `img/theme-stopmotion-juanmora.jpg` | 3.1 MB · grain + grid editorial, "Available for work Oct '26", Work/About/Lab/Contact |
| Henry Desroches https://henry.codes/ (zine/dither variant) | HM 22 Jan 2025 | `img/theme-vector-henry-codes.jpg` | 0.5 MB · giant condensed type + 1-bit dithered art, garden-style index |
| Amelia Wattenberger https://wattenberger.com/ (new WIP site) | — | `img/theme-hand-wattenberger.jpg` | Big serif name + flower "this site is WIP" sticker · **31 MB, load event >40 s** — even type-led sites can blow the budget via media |

- **Signals:** taste + design-engineering precision (the "design engineer" archetype of Vercel/Linear alumni). **Wow 3 · Memorability 3.**
- **Cost:** low assets, high typographic judgment (AI can't supply taste; it can implement it). **Perf/mobile/a11y:** best-in-class.
- **Cliché:** medium — "minimal design-engineer site" is itself a 2024–26 genre. **Scalability:** excellent. **Pairing:** index + case-study routes.
- **Role here:** the **skeleton** under any theme.

### 10. Blueprint / technical drawing / engineering schematic

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| Bartosz Ciechanowski — Mechanical Watch https://ciechanow.ski/mechanical-watch/ | — | `img/theme-blueprint-ciechanowski.jpg`, `-mobile.jpg` | No gate · 2.5 MB · 93 interactive canvases inside plain article HTML · mobile perfect |
| teenage engineering https://teenage.engineering/ | — | `img/theme-blueprint-teenage.jpg` | 1.2 MB · technical-print typography, product-spec labels, ink comic art; normal nav |
| Oryzo https://oryzo.ai/ (cutting mat with mm ruler = workshop drawing language) | SOTD 13 Apr 2026 | `img/theme-real-oryzo.jpg` | see §5 |

- **Moves:** title blocks (project · role · date · REV), dimension lines and callouts pointing at real UI, exploded views of architecture, line-art that fills into colour/real screenshots, mm-grid, revision history = changelog.
- **Signals:** the strongest *engineering* signal of any theme — it literally shows how things work [opinion]. Ciechanowski is the proof that explanatory technical drawing is memorable on its own.
- **Wow 4 · Memorability 4 · Cost:** medium — SVG diagrams per project (Claude can author SVG/stroke animations well), a few line-art illustrations (AI "technical drawing / patent line art" generation is decent; check every line for nonsense geometry) [opinion].
- **Perf/mobile:** excellent (SVG/CSS). **A11y:** diagrams need text alternatives; blue-on-blue contrast must be checked.
- **Cliché:** medium — the faint "Vercel blueprint grid" is common (setproduct has a whole guide on it) [data]; a full drafting-sheet *system* is not. **Scalability:** excellent — each case study = a drawing sheet; certifications = stamped approvals; contact = "issue for construction" form.
- **Pairing:** sheet index (A-01, A-02…) + deep links; a drawing-set "binder" is naturally non-linear.

### 11. Retro game / pixel art / 8-bit / RPG

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| buche.dev — "1 bit Pixel Art Dev Portfolio" https://buche.dev/ | Nominee 28 May 2025 | `img/theme-pixel-buche.jpg`, `-mobile.jpg` | "Best with sound? YES/NO" gate · 1.7 MB · mobile renders the dialog tiny/unscaled |
| JReyes MC Portfolio https://www.jreyes-mc-portfolio.com/ (Minecraft-style 3D) | HM 29 Aug 2025 | `img/theme-pixel-jreyes.jpg` | Loader 96 % at 12 s, "First visit takes longer to load" · 16.4 MB |
| Martin Gauer https://martingauer.com/ (Game Boy cartridges) | — | `img/theme-obj-martingauer.jpg` | "PRESS HERE TO START" gate · 2.1 MB |
| Robby Leonardi interactive résumé https://rleonardi.com/interactive-resume/ | — | — | TLS certificate error in Oct 2026 [measured] — the genre's classic is effectively offline |

- **Signals:** playfulness, game-dev skills; for a generalist dev it can read junior [opinion]. **Wow 3 · Memorability 4.**
- **Cost/AI:** AI pixel art is passable for props, inconsistent for animated sprites. **Perf:** light if 2D. **Mobile:** controls are the problem. **A11y:** game-only nav is bad.
- **Cliché:** high (Kaboom.js/Pokémon-style portfolio tutorials). **Scalability:** poor. **Use as:** an optional mini-game easter egg.

### 12. Generative art / shaders / fluid / noise

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| Henri Heymans '25 https://www.henriheymans.com/ | SOTD 25 Feb 2025 | `img/theme-edit-henriheymans.jpg` | "CLICK TO ENTER" gate · 3.1 MB · grainy monochrome fluid shader · a later visit the same day hit ERR_CERT_DATE_INVALID [measured] |
| Patrick Heng https://patrickheng.com/ | SOTD 21 Jul 2020 | `img/theme-gen-patrickheng.jpg` | 1.8 MB · physics circles on flat orange, Work/About visible |
| Active Theory https://activetheory.net/ | SOTD 6 Feb 2024 (v6) | `img/theme-gen-activetheory.jpg` | ASCII loader → chrome logo + particles · WORK/CONTACT pill always visible |
| Paper Shaders https://shaders.paper.design/ (library) | — | `img/theme-gen-paper-shaders.jpg` | Zero-dependency shaders: paper texture, fluted glass, water, dithering, halftone |

- **Signals:** graphics math/GLSL; **Wow 4 · Memorability 3** (blobs blur together). **Cost:** low with libraries, high if custom.
- **Perf/mobile:** fine if one full-screen pass, capped DPR, paused off-screen. **A11y:** motion/vestibular; provide pause.
- **Cliché:** high for grainy gradient blobs. **Scalability:** n/a (background). **Use as:** one purposeful effect on real content.

### 13. Glass / liquid ("Liquid Glass", Apple WWDC 2025)

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| liquidGL https://liquidgl.naughtyduk.com/ (WebGPU/WebGL refraction library) | — | `img/theme-glass-liquidgl.jpg` | Blank until >8 s, ready by 20 s · 5.5 MB · refractive dock nav |
| Parinaz https://www.parinazkassemi.com/ (frosted lock-screen UI) | HM 19 Jul 2026 | `img/theme-obj-parinaz.jpg` | Gate + 56 MB |
| (Fluid Glass https://fluid.glass/, SOTD 30 Mar 2026, is an architectural glazing company — not the UI style; noted to avoid confusion) | | `img/theme-glass-fluid.jpg` | 7.7 MB desktop / **35.8 MB mobile** |

- **Signals:** real refraction is shader skill; `backdrop-filter` imitation signals trend-following [opinion]. **Wow 3 · Memorability 2.**
- **Perf:** backdrop-filter/refraction is expensive on low-end phones. **A11y:** text-over-glass contrast is the #1 complaint of the style [expert].
- **Cliché:** highest-growth cliché of 2025–26. **Use as:** a single nav element at most.

### 14. Hand-drawn sketch / notebook

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| ITom — Tomasz Szmajda https://itomdev.com/ (3D corridor of flat planes with hand-drawn textures; custom paint-reveal shader) | HM 30 Apr 2026; FWA SOTD + CSSDA kudos [unverified, via Codrops/search] | `img/theme-hand-itom.jpg`, `-mobile.jpg` | "Click a door to enter", **audio ON by default** · 9–14 MB · works on mobile |
| ishikawa.co — Walkable Atlas https://ishikawa.co/en/ | HM 16 Aug 2026 | `img/theme-obj-ishikawa.jpg`, `-mobile.jpg` | **0.47 MB** · stick figure walks a dotted line (A/D keys, on-screen arrows on mobile) · "View the atlas" index link |
| Maggie Appleton https://maggieappleton.com/ | — | `img/theme-hand-maggie*.jpg` | 0.4 MB · editorial skeleton, painted/sketched illustrations per essay card |
| Jhey Tompkins https://jhey.dev/ | — | `img/theme-vector-jhey.jpg` | 0.3 MB · hand-drawn signature/bear doodle + live status widgets |

- **Signals:** personality + (ITom) serious shader work; notebook "margin notes" are a natural place to explain engineering decisions [opinion].
- **Wow 4 · Memorability 5 · Cost:** medium — pencil textures are forgiving for AI generation (imperfection is the style), but a *consistent* hand across 30 drawings is hard without an illustrator [opinion].
- **Perf/mobile:** good when 2D (Ishikawa 0.47 MB). **A11y:** handwritten fonts for body text = bad; keep them for labels. **Cliché:** low-medium. **Scalability:** good (pages, tabs, sticky notes).

### 15. Y2K / chrome

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| ryOS https://os.ryo.lu/ (Mac OS X Aqua revival) | — | `img/theme-os-ryos.jpg` | 9 MB, Aqua dock, glossy icons, AI desktop assistant |
| Poolsuite https://poolsuite.net/ | — | `img/theme-os-poolsuite.jpg` | 5.4 MB, Mac-OS-9-era windows + VHS video |
| "Y2K Never Dies" (Versace Jeans Couture × nss) https://www.nssmag.com/en/p/versace-jeans-couture | HM 20 Mar 2023 | `img/theme-y2k-vjc-nss.jpg` | Film-led campaign; shows Y2K lives in fashion, not dev portfolios |

- **Evidence is thin** for Y2K developer portfolios; the one "Y2K-inspired" dev portfolio found (aladinakkari.ca) is now a dark editorial site (`img/theme-y2k-aladinakkari.jpg`) [measured].
- **Signals:** trend-awareness, fashion; weak engineering. **Cliché:** high in brand land. **Use as:** chrome type for one hero word at most.

### 16. Cinematic scroll-film

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| Lando Norris https://landonorris.com/ | **Site of the Year 2025** (also Users' Choice) | `img/theme-cine-lando*.jpg` | No gate · 5.5–6.7 MB · Store + menu always visible |
| Explore Primland https://explore.ownprimland.com/ | SOTD Feb 2026 [unverified, via utsubo] | `img/theme-cine-primland.jpg` | "Explore the map / Start without audio" · **27 MB** |
| Apple AirPods Pro https://www.apple.com/airpods-pro/ | — | `img/theme-cine-airpods.jpg` | 8.4 MB · scroll-scrubbed product film, normal nav |

- **Signals:** motion direction and performance engineering at studio scale. **Wow 5.**
- **Fatal flaw for this user:** it's linear by nature — the exact "contact took forever" problem of the old site. **Scalability:** poor for 5+ case studies. **Use as:** a 3–5 s scroll moment inside one case study.

### 17. ASCII rendering

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| Ghostty https://ghostty.org/ | — | `img/theme-ascii-ghostty.jpg`, `-mobile.jpg` | 0.56 MB · animated ASCII ghost in a window, Download/Docs CTAs |
| ASCII play — ertdfgcvb https://play.ertdfgcvb.xyz/ | — | `img/theme-ascii-ertdfgcvb.jpg` | 0.22 MB · live-coding ASCII renderer |
| Igloo / Active Theory loaders | see §5, §12 | — | ASCII as loading state [measured] |

- **Signals:** rendering knowledge (character density maps, shaders), terminal-adjacent nerdiness without the terminal UX. **Wow 3 · Memorability 3 · Cost:** low. **Perf:** cheap as a shader pass. **A11y:** decorative only (aria-hidden). **Cliché:** rising in 2025–26. **Use as:** accent (e.g., project thumbnails resolve from ASCII → screenshot).

### 18. Physical-object metaphors (desk/workbench, cards, cartridges, vinyl, archive, map/atlas, museum)

| Example | Award | Screenshot | Practicality [measured] |
|---|---|---|---|
| Wildy Riftian https://www.wildyriftian.com/ — acrylic keytags (motion / editorial / photo / branding) as category index | SOTD 12 Sep 2025 | `img/theme-paper-wildy-riftian*.jpg` | No gate · 2.5 MB · pre-rendered, no WebGL |
| Pokémon Cards CSS holographic effect — Simon Goellner https://poke-holo.simey.me/ | — | `img/theme-obj-pokeholo.jpg` | CSS-only 3D/holo cards (custom properties + blend modes) · 12.9 MB of card art |
| Martin Gauer — CSS Game Boy cartridges per topic https://martingauer.com/ | — | `img/theme-obj-martingauer.jpg` | Gate (see §11) |
| ishikawa.co — Walkable Atlas | HM 16 Aug 2026 | `img/theme-obj-ishikawa.jpg` | 0.47 MB |
| Chris Pokrzywa — 3D home-office desk https://www.chrisp.design/ | Nominee 3 Nov 2025 | `img/theme-obj-chrisp.jpg` | **Still loading at 30 s** · 4.6 MB |
| Oryzo cutting-mat desk | SOTD 13 Apr 2026 | `img/theme-real-oryzo.jpg` | see §5 |

- **Moves:** each project = one object (card, cartridge, tag, folder, record sleeve); the collection is the index; opening an object = route to the case study.
- **Signals:** product thinking + craft; CSS-only object effects (poke-holo) are a strong frontend-skill flex [opinion].
- **Wow 4 · Memorability 5 · Cost:** medium — *pre-rendered* object images are where AI generation is strongest; one consistent material set (acrylic, cardboard, plastic cartridge) keeps it coherent [opinion].
- **Perf/mobile:** good if images; bad if real-time 3D desk (Chris P.). **A11y:** objects must be real links/buttons with text labels. **Cliché:** desk scenes are common; card/tag/cartridge indexes less so. **Scalability:** very good (1 object per project; certifications as badges/patches; contact as a business card).

---

## Practicality measurements (rough, one run) [measured]

| Site | Gate / loader (seen) | FCP d / m (s) | Usable* d / m (s) | Work link in DOM | Contact link in DOM | Contact visible on screen 1 (d/m) | Mobile h-overflow |
|---|---|---|---|---|---|---|---|
| niccolomiranda | none | 1.4 / 1.2 | 1.1 / — | Y | Y | N / N | N |
| wildyriftian | none | 0.8 / 0.4 | 1.1 / 0.8 | Y | Y | Y / Y | N |
| aimees-papercraft | "Enter!" step | 0.9 / 1.9 | 0.7 / 2.1 | N | N | N / N | N |
| lynnandtonic | none | 0.6 / 0.7 | — / — | Y | N | N / N | N |
| messenger | loader (game) | 1.4 / 2.8 | — / — | N | N | N / N | N |
| bruno-simon | CLICK TO START | 4.6 / 14.4 | — / — | Y | N | N / N | N |
| jesse-zhou | START | 1.5 / 1.8 | — / — | N | N | N / N | N |
| jordan-breton | loader 90 % @40 s | 1.1 / 0.7 | — / — | Y | Y | N / N | N |
| joshwcomeau | none | 1.1 / 2.5 | 1.8 / 3.4 | N | Y | N / N | N |
| adhamdannaway | none | 4.6 / 9.6 | 5.7 / — | Y | Y | Y / N | N |
| jhey | none | 0.9 / 2.3 | 1.2 / 2.9 | N | N | N / N | N |
| aralesk | shutter intro | 0.7 / 0.7 | 0.5 / 13.0 | Y | N | N / N | N |
| warmnfuzzy | none | 1.1 / — | — / — | Y | Y | Y / Y | N |
| igloo | loader >15 s | 0.9 / 0.6 | — / — | N | N | N / N | N |
| oryzo | none | 0.9 / 5.6 | 13.1 / — | N | Y | Y / N | N |
| lusion | loader >12 s | 0.4 / 1.3 | 0.5 / 1.5 | Y | Y | Y / Y | N |
| satnaing-terminal | must type | 0.8 / 2.0 | — / — | Y | N | N / N | N |
| liveterm | must type | 2.9 / 0.5 | — / — | N | N | N / N | N |
| ghostty | none | 1.7 / 19.6 | — / — | N | N | N / N | N |
| ertdfgcvb | none | 1.2 / 2.1 | 1.4 / — | N | N | N / N | N |
| henryheffernan | START (+desktop-only warning on mobile) | 2.1 / 9.5 | — / — | N | N | N / N | N |
| posthog | none | 2.7 / — | 3.0 / — | Y | N | N / N | N |
| dustinbrett | none | 2.1 / 3.3 | — / — | N | N | N / N | N |
| ryos | none | 7.1 / 6.8 | 12.6 / 35.4 | N | N | N / N | N |
| poolsuite | none | 3.4 / 17.4 | 9.4 / 34.2 | Y | N | N / N | N |
| parinaz | Click to unlock | — / — | — / — | N | N | N / N | N |
| gumroad | none | 1.8 / 2.6 | 3.1 / 2.8 | Y | N | N / N | N |
| cydstumpel | none | 0.7 / 1.1 | 0.8 / 4.0 | Y | Y | Y / Y | N |
| wizardzines | none | 0.5 / 1.6 | 0.5 / 1.9 | Y | Y | N / N | N |
| rauno | none | 0.9 / 2.8 | — / — | Y | Y | N / N | Y |
| emilkowalski | none | 0.5 / 1.0 | 0.6 / 1.2 | N | N | N / N | N |
| dennissnellenberg | none | 0.9 / 1.0 | — / — | Y | Y | Y / N | N |
| henry-codes | none | 1.8 / 2.3 | 2.1 / 1.7 | Y | Y | N / N | N |
| juanmoraromero | none | 0.7 / 0.7 | 1.0 / 1.7 | Y | Y | Y / Y | N |
| ciechanowski-watch | none | 1.2 / 1.5 | 1.3 / 1.5 | Y | Y | Y / Y | N |
| teenage-engineering | none | 0.4 / 1.3 | 0.5 / — | N | Y | Y / N | N |
| buche | sound YES/NO | 0.4 / 0.4 | — / — | N | N | N / N | N |
| jreyes-mc | loader 96 % @12 s | 0.8 / 2.2 | — / — | Y | N | N / N | N |
| martingauer | PRESS HERE TO START | 0.4 / 0.7 | — / — | Y | Y | N / N | N |
| patrickheng | none | 1.9 / 4.7 | — / — | Y | N | N / N | N |
| activetheory | ASCII loader | 0.9 / 3.1 | 3.0 / 5.9 | Y | Y | Y / Y | N |
| henriheymans | CLICK TO ENTER | — / — | — / — | N | N | N / N | N |
| liquidgl | blank >8 s | 0.6 / 0.6 | — / — | N | N | N / N | N |
| itomdev | click a door (audio on) | 1.5 / 9.6 | 0.9 / 8.0 | Y | Y | Y / Y | N |
| maggieappleton | none | 1.1 / — | 2.3 / 1.7 | Y | Y | N / N | N |
| wattenberger | none | 1.7 / — | — / 1.1 | Y | N | N / N | N |
| landonorris | none | 2.0 / 3.2 | — / — | N | Y | N / N | N |
| airpods-pro | none | 0.8 / 1.4 | 3.4 / 12.2 | Y | Y | N / N | N |
| primland | Explore / Start without audio | 1.9 / 1.0 | 4.1 / 11.2 | N | N | N / N | N |
| poke-holo | none | 0.8 / 1.6 | 1.1 / 1.7 | N | N | N / N | N |
| ishikawa | none | 2.2 / — | 9.7 / 3.1 | Y | Y | N / N | N |
| chrisp | loader >30 s | 0.6 / 44.0 | — / — | Y | N | N / N | N |

*Usable = first moment with >=150 visible characters and >=3 visible links (polled every 0.5 s, max 25 s); '—' = not reached (also happens on deliberately minimal pages such as Lynn Fisher, or canvas-only sites). FCP '—' = page never painted text or failed to load (Parinaz: nothing in DOM text at 42 s; Henri Heymans: ERR_CERT_DATE_INVALID during this later probe, although the earlier screenshot run loaded). Mobile = 390x844, 4x CPU throttle, ~9 Mbps/85 ms. Ghostty's 19.6 s mobile FCP is likely an artefact of its continuously animating ASCII canvas under CPU throttling. 'Contact visible on screen 1' only counts a visible link/button whose text or href matches contact/mailto/email/hire/LinkedIn.

**Takeaways [measured]:** only 12 of 52 sites had a visible contact link on the first desktop screen (Wildy Riftian, Adham Dannaway, Warm & Fuzzy, Oryzo, Cyd Stumpel, Dennis Snellenberg, Juan Mora Romero, Ciechanowski, teenage engineering — plus Lusion, Active Theory and ITom, where the link sits behind a loader or door); 8 also had it on the first mobile screen; every other gated/canvas-world site scored N; the fastest distinctive sites (Wildy Riftian, Cyd Stumpel, Juan Mora Romero, Ciechanowski) all render content in ~1 s on desktop and <=4 s on throttled mobile.


## Scoring matrix (1–5; Production effort 5 = easy; Cliché safety 5 = fresh; Practicality 5 = theme can be fully expressed on a fast, gate-free, mobile-first skeleton — informed by the measured examples)

| # | Theme | Wow | Memor. | Signals eng. | Mobile/perf | Content scal. | Effort (5=easy) | Cliché safety | **Practicality** | **Weighted** |
|---|---|---|---|---|---|---|---|---|---|---|
| 10 | Blueprint / technical drawing | 4 | 4 | 5 | 5 | 5 | 4 | 3 | **5** | **49.0** |
| 9 | Editorial / Swiss *(skeleton)* | 3 | 3 | 3 | 5 | 5 | 4 | 3 | **5** | **43.0** |
| 18 | Physical-object index (pre-rendered) | 4 | 5 | 3 | 4 | 4 | 3 | 4 | **4** | **42.5** |
| 1 | Paper / print / tactile | 3 | 4 | 2 | 5 | 5 | 4 | 3 | **5** | **42.5** |
| 14 | Hand-drawn sketch / notebook | 4 | 5 | 3 | 4 | 4 | 2 | 4 | **4** | **41.5** |
| 8 | Neo-brutalism *(UI layer)* | 2 | 3 | 2 | 5 | 5 | 5 | 2 | **5** | **39.5** |
| 17 | ASCII rendering (as accent) | 3 | 3 | 4 | 4 | 3 | 4 | 3 | **4** | **39.0** |
| 3 | Animated vector (Rive/SVG) | 3 | 4 | 3 | 4 | 4 | 2 | 3 | **4** | **37.5** |
| 12 | Generative shaders (as accent) | 4 | 3 | 4 | 3 | 2 | 3 | 2 | **4** | **37.0** |
| 7 | OS / desktop simulation | 4 | 4 | 4 | 2 | 4 | 3 | 2 | **3** | **36.5** |
| 5 | Photoreal 3D | 5 | 4 | 4 | 2 | 3 | 2 | 2 | **3** | **36.5** |
| 13 | Liquid Glass | 3 | 2 | 3 | 3 | 4 | 4 | 1 | **4** | **34.5** |
| 15 | Y2K / chrome | 3 | 3 | 2 | 4 | 3 | 3 | 2 | **4** | **34.0** |
| 16 | Cinematic scroll-film | 5 | 4 | 4 | 3 | 2 | 2 | 2 | **2** | **34.0** |
| 2 | Diorama / miniature 3D | 5 | 5 | 4 | 2 | 2 | 1 | 2 | **2** | **33.0** |
| 4 | Stop-motion / claymation | 4 | 5 | 1 | 3 | 2 | 1 | 4 | **3** | **32.0** |
| 11 | Pixel art / RPG | 3 | 4 | 3 | 3 | 2 | 3 | 2 | **2** | **29.5** |
| 6 | Terminal / CLI | 2 | 2 | 3 | 3 | 2 | 5 | 1 | **2** | **26.5** |

**Weights:** Weighted = 2.5×Practicality + 2×Wow + 1.5×Signals-eng + Memorability + Mobile/perf + Content scalability + Effort + Cliché safety (max 55). Practicality outweighs Wow per the user's priority. Scores are [opinion] calibrated against the measured examples.
**Reading the ranking:** Editorial and neo-brutalism score high *because* they're practical, but alone they fail the "distinctive art direction" brief → they become the skeleton/UI layer. Diorama, photoreal and cinematic keep the highest Wow but drop on Practicality — if the user still wants one of them, it must be an optional layer (see #5).

## Top recommendations for this user

### #1 "Living Blueprint" — engineering drawings that come alive into the real UI
- **Pitch:** The site is a drawing set. Home = sheet index (A-00 Cover, A-01 … A-06 = case studies, C-01 Certifications, X-01 Contact) with a title block that always shows name, role, availability, email and a CV download. Each case study opens as a sheet: a line-art/architecture diagram with dimension callouts draws itself, then cross-fades into the real product screenshots/video, annotated with what you built, metrics and trade-offs; revision table = release history; bill of materials = tech stack.
- **Why it fits:** the decoration is proof of real-world shipping (architecture, constraints, results) instead of a costume; it reads "engineer" to both recruiters and tech leads, and it's distinctive against 2026's glass/grain/3D defaults.
- **Survives the skeleton:** it's SVG + CSS on top of static HTML pages (Astro/Next SSG); diagrams are inline SVG with text alternatives; stroke-draw animations are CSS/`stroke-dashoffset` and skip under reduced-motion; mobile shows sheets stacked; nothing loads before content.
- **Already done well:** Ciechanowski (technical drawing + plain article, 2.5 MB, perfect mobile), teenage engineering (spec-sheet typography over normal nav), Oryzo (mm-ruler cutting mat as stage, normal nav).
- **Main risk:** timid execution collapses into the generic "Vercel grid" look; it needs one real diagram per project and disciplined drafting conventions.

### #2 "Workbench index" — each project is a physical object, pre-rendered
- **Pitch:** A top-down workbench/cutting mat (or acrylic keytags, cartridges, trading cards) where each object is one shipped project; hover lifts it with real shadow, click routes to a normal case-study page. Certifications are enamel patches/badges, contact is a business card that copies your email. Objects are AI-rendered stills/short loops in one consistent material, not a live 3D scene.
- **Why it fits:** extremely memorable, scales 1:1 with projects, and leans on AI generation exactly where it looks good (product-shot objects).
- **Survives the skeleton:** the "bench" is a CSS grid of `<a>` elements with images; on mobile it becomes a swipeable stack; optional parallax/tilt only on pointer devices.
- **Already done well:** Wildy Riftian (keytag index, no WebGL, 2.5 MB, SOTD 2025), poke-holo (CSS-only holo cards), Oryzo (desk-object stage with normal nav).
- **Main risk:** asset consistency across 8–12 renders; metaphor can feel decorative if objects aren't tied to project identity.

### #3 "Tactile dossier" — paper/print system with a precise code layer
- **Pitch:** An editorial print system (newspaper/archival dossier): each case study is a filed report with stamps, paper-clipped screenshots and margin notes; a toggle or hover reveals the "machine layer" — the actual code diff, request waterfall or Lighthouse score behind each clipping. Front page lists all projects as headlines; contact is a tear-off slip pinned to every page.
- **Why it fits:** strong taste signal plus a concrete engineering reveal; very cheap to make fast; content-scalable.
- **Survives the skeleton:** pure HTML/CSS with 1–2 texture images (or Paper Shaders' paper filter); code layer is real `<pre>` text.
- **Already done well:** Niccolò Miranda (newspaper skin, ~2.3 MB, mobile clean), Lynn Fisher (book-index nav, 0.38 MB), Juan Mora Romero (grain editorial with availability + contact up top).
- **Main risk:** grain/paper alone is common in 2026 — without the code layer it reads "designer portfolio".

### #4 "Sketchbook that inks itself" — pencil-sketch layer that paints in on interaction
- **Pitch:** Pages of an engineer's notebook: projects start as pencil sketches (wireframes, flow arrows, sticky notes) that ink and colour in on hover/scroll into the real screenshots; margin notes explain decisions. A tiny walking-character or doodle mascot can guide between tabs.
- **Why it fits:** memorable and human, and "sketch → shipped" is itself a story about real work.
- **Survives the skeleton:** the paint-reveal can be a CSS mask/clip-path or a single shader on the image only; text stays HTML.
- **Already done well:** ITom (paint-reveal shader on hand-drawn textures; but gated + audio-on — copy the move, not the gate), ishikawa.co (0.47 MB hand-drawn atlas), Maggie Appleton (sketch illustrations inside a plain editorial skeleton).
- **Main risk:** illustration consistency without an illustrator; can undersell seniority if too cute.

### #5 (stretch) "Miniature diorama hub" — optional 3D world, DOM case studies
- **Pitch:** One small, stylised diorama (e.g., your desk or a tiny workshop) where each object is a project, sitting behind a normal HTML menu that's visible from first paint; the 3D canvas lazy-loads after LCP, and phones/low-end get a static rendered poster with the same hotspots as links.
- **Why it fits:** the user explicitly wants astonishment; this is the top wow lever and continues their three.js experience — but now gated by practicality rules.
- **Survives the skeleton:** HTML first, canvas second, never a START screen; budget ≤5–6 MB like Messenger; each hotspot links to a real route.
- **Already done well (partially):** Messenger (light, reported smooth on phones [anecdote], Dev SOTY 2025 — but has no portfolio content), Oryzo (3D product stage + always-visible nav). Counter-examples: Bruno Simon, Jesse Zhou, Jordan Breton (gates/loaders).
- **Main risk:** production effort without a 3D artist; AI GLBs rarely look like one world; easy to slip back into "space portfolio 2.0".

### Strongest combination [opinion]
- **#1 + #2 = "Drafting table":** a cutting-mat/drafting-table stage (mm rulers, title block) where each shipped project is a pre-rendered "part" with a part number; clicking opens its blueprint sheet that resolves into the real UI. Engineering signal of #1, memorability of #2, both pure HTML/SVG/images — no WebGL needed; an optional diorama (#5) can be added later as L3 without changing the skeleton.

### Add-on pattern (any concept): command palette
- ⌘K/Ctrl+K palette ("go to case study…, copy email, download CV") gives the terminal/OS flavour, keyboard power-user delight and true non-linear navigation without the terminal or OS cliché [opinion].

## Themes to avoid (as the main concept) and why

| Theme | Why |
|---|---|
| Terminal / CLI | Most-templated dev portfolio genre; hides content behind typing; hostile on mobile [data/anecdote] |
| Full OS / desktop | Very common since 2022; breaks on phones; window UX fights the browser (PostHog HN feedback) [anecdote] |
| Cinematic scroll-film | Linear — repeats the old site's main failure |
| Liquid Glass | Saturated Apple-2025 trend; contrast/perf costs [expert] |
| Y2K / chrome | Reads fashion/brand, weak engineering signal, little dev precedent [measured gap] |
| Pixel/RPG game as the nav | Gates, controls, poor scalability; classic example now offline [measured] |
| Real stop-motion | Enormous craft cost, no dev-portfolio precedent found; AI versions look cheap [opinion] |

## Sources

- Awwwards site pages (award + live URL): https://www.awwwards.com/sites/miranda-paper-portfolio · /wildy-riftian-portfolio · /aimees-papercraft-world · /messenger · /brunos-portfolio · /bruno-simon-portfolio · /igloo-inc · /lando-norris · /oryzo-ai · /lusion-v3 · /active-theory-v6 · /patrick-heng-portfolio-1 · /henri-heymans-25 · /dennis-snellenberg-portfolio · /cyd-stumpel-portfolio-2025 · /henry-desroches-portfolio-2 · /1-bit-pixel-art-dev-portfolio · /jreyes-mc-portfolio · /tomasz-itom-szmajda-folio · /ishikawa-co-walkable-atlas · /parinazs-desktop-portfolio · /chris-pokrzywa-ux-portfolio · /fluid-glass · /warm-fuzzy · /aralesk-collages-motion · /areyoudami-creative-portfolio · /juan-mora-romero · /y2k-never-dies-by-vjc-and-nss · /holidayos · /diorama
- Awwwards 2025 annual winners (Lando Norris SOTY, Messenger Developer SOTY): https://www.awwwards.com/annual-awards/winners
- Igloo SOTY 2024 claim: https://x.com/IglooInc/status/1900238493147877734
- Bruno Simon submissions: https://www.awwwards.com/bruno.simon/submissions
- Three.js portfolio roundups: https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025 · https://www.utsubo.com/blog/best-threejs-websites-2026 · https://www.hontran.dev/blog/best-award-winning-websites-2026
- Lando Norris case study/stack: https://www.itsoffbrand.com/our-work/lando-norris · https://github.com/Kayforkind/reimagine-it/blob/main/skills/reimagine-it/references/research/web-craft-2025.md
- Messenger build/perf notes: https://medium.com/@sujaltalreja04/messenger-by-abeto-didnt-change-three-js-it-changed-how-we-think-about-building-for-the-web-3349d966748f · https://news.ycombinator.com/item?id=45396441
- PostHog OS site + reception: https://posthog.com/handbook/engineering/posthog-com/technical-architecture · https://news.ycombinator.com/item?id=45217269
- Terminal portfolio popularity/feedback: https://github.com/satnaing/terminal-portfolio · https://github.com/topics/terminal-portfolio · https://news.ycombinator.com/item?id=44039481
- ITom case study: https://tympanus.net/codrops/author/tomaszszmajda/ · https://itomdev.com/
- Martin Gauer cartridge portfolio: https://martingauer.medium.com/i-released-a-playable-portfolio-as-a-game-boy-game-for-my-website-3c3a66c1d67a
- Blueprint-grid trend: https://www.setproduct.com/blog/complete-guide-to-blueprint-grid-design
- Liquid Glass web libraries: https://liquidgl.naughtyduk.com/ · https://liquid-glass.ybouane.com/
- Neo-brutalism catalogues: https://reallygooddesigns.com/neo-brutalist-website-examples/ · https://retroui.dev/blogs/12-neobrutalist-websites-you-should-know-in-2026
- Rive use (Duolingo/Spotify Wrapped, CLI): https://rive.app/ · https://rive.app/use-cases
- All live example URLs listed in the theme tables above (visited 2026-10-05).

Not covered: real-device (iPhone/Android) frame-rate testing and Lighthouse runs per example (headless approximations only); live stop-motion and Y2K developer-portfolio examples (none verified — search budget exhausted); Dribbble/Behance illustration-style references; FWA/CSSDA award verification (Awwwards only); vinyl, film-contact-sheet and museum metaphors beyond one-line mentions (Cartier's museum-style site returned "Access Denied" to headless Chromium).
