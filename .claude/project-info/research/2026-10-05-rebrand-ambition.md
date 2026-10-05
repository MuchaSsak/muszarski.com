# Rebrand ambition: what makes a portfolio hero and project section astonishing (2025–2026)

Date: 2026-10-05 · Why: the owner rejected "Drafting Table" as "ugly", "no creative effort", "a careful safe system". The earlier passes
(`2026-10-05-art-direction-themes.md`, `2026-10-05-awwwards-dev-portfolios.md`) optimised for safety and practicality. This pass
optimises for **ambition** and lists the moves that can be stolen as patterns. The hard rules don't change: the H1 is the LCP, no gate,
preloader or scroll-jacking, WebGL after first paint with a static fallback, Lighthouse mobile ≥ 90, contact and CV one tap away.

## TL;DR

- **Four levers separate "astonishing" from our rejected look** [measured across 41 rendered sites]:
  1. ONE dominant element: type at 120–250 px, or a single 3D object with a physical material.
  2. A saturated full-bleed colour field.
  3. Depth, with something crossing between the text and the image.
  4. A 1–3 s motion that "becomes" the content.

  The Drafting Table used none of them.
- **The blueprint idea was under-powered, not wrong.** maximeheckel.com uses the same cyanotype grid as a live 3D drafting space: full-bleed `#004BB0`,
  perspective plus depth of field, a glass "M" that assembles itself, and real data as the annotations (a git commit hash, camera
  coordinates). It is the bridge from Drafting Table to "astonishing".
- **Cheap astonishment exists:**
  - darkroom.engineering: 0.6 MB at 3 s, no WebGL, one red, a 200 px pixel-face H1.
  - Marcus Lorenzet: 0.9 MB, a 160 px headline with stat chips set inline.
  - Lee Holmes: the H1 is the LCP at 0.84 s, in a bitmap serif with generative pixel growths.
  - anime.js: one canvas dial that morphs per section.
- **Text-first and WebGL coexist when the H1 stays DOM.** The shader can either re-render the H1 or sit behind it. Examples: 14islands' type
  melts and then turns crisp, Raycast puts a logo-shaped light behind its H1, and basement's mobile H1 paints at 0.41 s. Sites that lose
  text-first draw their text late or only in canvas (Maxime: LCP 4.95 s; Colombel: no text LCP).
- **Gates are still common in 2026 SOTDs:** Unseen, Michael Gatt, Meer Mohsin, EddyOS, Gil Huybrecht (≈25 s loader, 49 MB) and Immersive
  Garden (≈10 s counter). Copy their visuals, never their entry.
- **Best project-section moves for Mateusz's real products:**
  - A live, sandboxed product demo (Terminal Industries).
  - One object re-skinned per project (Colombel).
  - A viewfinder fixed over a scrolling strip (Obys).
  - A project shown as a contact sheet of its real screens (Gil Huybrecht).

## Method

- **Browser:** Playwright with bundled headless Chromium, GPU through ANGLE/D3D11, one cold run per site on 2026-10-05, desktop unthrottled.
  44 sites attempted, 41 rendered. zach.li failed on its TLS certificate and yugop.com on SSL; nothing.tech was blocked by modals.
- **Shots:** `inspirations/img/rebrand/<slug>-1440-{3s,6s,hero,work}.jpg` and `<slug>-390-{3s,work}.jpg` (390×844, DPR 2).
  - **"hero"** is the settled state at about 10–30 s. If a gate was present, I clicked "Enter without audio/sound" or pressed a key.
  - **"work"** is after wheel-scrolling to the first project section.
  - The folder is **gitignored**. Never commit or publish these third-party screenshots.
- **Measurements:**
  - **MB** = CDP transfer bytes during the run (≈15–35 s including the scroll), not total page weight. **LCP** = PerformanceObserver.
  - **Type sizes** were read from computed styles where the text is DOM; everything else is eyeballed (≈).
  - **Colours** were sampled from pixels or computed styles.
- **Technique:** inferred from the libraries detected and from keyword hits in GLSL source (via a hook on `shaderSource`; no code was stored or
  read by me), plus the screenshots. Treat it as a likely technique, not a confirmed one.
- **Awards:** read from each site's Awwwards page. Several are for an **earlier version** of the site (date given). "Nominee" is not an award.

## Per-site findings

Columns: **Prac.** = practicality [measured]. **D** = desktop, **M** = mobile. **@3s → end** = MB transferred at 3 s and at the end of the run.

### 1. WebGL / 3D signature object or shader hero

| Site (`slug`) | Award | Signature move (concrete) | Prac. | Steal as pattern |
|---|---|---|---|---|
| maximeheckel.com (`maximeheckel`) | — (no Awwwards page found) | Full-bleed cyanotype `#004BB0` isometric grid rendered in 3D with perspective, depth-of-field blur and vignette. A glass (transmission) extruded "M" logo assembles from flying pieces between 3 s and 6 s. Mono annotations sit on the grid planes and are *live*: vertex coords "x0: −0.0316…", "camera: −0.48…", a git `commit: 63d1f9…` hash, a 0.30–0.70 scale, compass circles. Tiny 24 px caps "THE ONLINE HOME OF MAXIME'S WORK" bottom-left; pill nav top-centre. three.js, dither + grain post. | No gate · 3.5 MB · LCP (small caps) 4.95 s: text paints late · mobile shows an intro paragraph | The blueprint as a live 3D drafting space with one physical-material object and real build data as ornament |
| basement.studio (`basement`) | SOTD 15 Jun 2022 (2022 version) | White edges-only wireframe of their real studio interior (stairs, trusses, doors) on `#000`. The surfaces are filled with drifting 8–16 px greyscale pixel blocks, like a LiDAR scan. A "HUMAN / MACHINE" segmented toggle bottom-centre (active `#FF4D00`) switches the render mode. Geist + Geist Mono. Desktop H1 (87 px) is visually hidden; mobile shows a 46 px H1 first. Work: "Featured Projects", then rows with a black media card on the left and the project name + blurb on the right. three.js lines + pixelate/dither post. | No gate · 3.1 MB @3s → 14.9 MB · M LCP = H1 at 0.41 s | Wireframe of a real object + pixel-mosaic fill + a 2-state "UI / code" toggle |
| 14islands.com (`14islands`) | SOTD 29 Jun 2020 (2020 version) | H1 "Design & Technology" (≈120 px) first paints as soft, blobby, hand-cut grey letters drifting apart. By about 6 s they tighten into crisp black BentonSans ("&" stays grey). Asymmetric two-column layout with tiny caps "CREATIVE PARTNER / WE CRAFT DIGITAL PRODUCTS AND BRANDS"; a reel card rises underneath. Work: black media cards with red corner ticks and a two-tone headline (grey / black). WebGL over DOM text (noise / fbm / displace / sdf). | No gate · 2.9 MB · M LCP 0.76 s (DOM text) | DOM H1 = LCP, then a shader "settles" the same glyphs in 1–2 s |
| unseen.co (`unseen`) | SOTD 6 Feb 2023 | Behind the gate: a surreal pastel 3D set (pink plaster arches, stairs into still water with reflections, an iridescent bubble, a boulder). Centred mixed type: "Creating the" in Saol Display italic over "unexpected" in Neue Montreal (≈60 px), plus a "View our work" pill. The gate screen has a googly-eyes mascot. | **"Enter" / "Enter without audio" gate** · 7.2 MB | Serif-italic + grotesk word pair over a 3D poster; ship the poster as an AVIF still first |
| Shopify Editions Winter '26 (`shopify-editions`) | SOTD 9 Feb 2026 | On black, golden-section construction lines (rectangles, circles, diagonals) draw themselves around a small "The Ren(ai)ssance Edition" lockup. Then it cuts to a Renaissance-style painting (figures flying through clouds) with anachronistic hot-pink props (a shopping bag, a graffiti skateboard) and a framed chapter index in roman numerals (Sidekick I … Developer XX). Sections that follow: beige `#DEDED2` paper, serif heads, product UI cards on painted textures. three.js + Spline + video. | No gate · 1.1 MB @3s → 5.8 MB · LCP = cookie banner 3.7 s | Construction lines that resolve into a finished illustration; a numbered chapter index as the TOC |
| raycast.com (`raycast`) | — | "Your shortcut to everything." (64 px Inter 600) is centred over a WebGL light sculpture: diagonal crimson bars echoing the logo's slashes, blurred, with chromatic edges, slowly extending between 3 s and 6 s. | No gate · 3.0 MB · H1 = LCP 1.1 s (M 0.96 s) | A hero shape derived from your own mark, as glowing light behind a DOM H1 |
| guillaumezhu.com (`gzhu`) | Nominee 22 Sep 2026 | Full-bleed rounded card with a blurred `#FE1000` → orange → magenta gradient. The pale name "guillaume zhu" (≈110 px) has a glossy pink 3D "gz" monogram rotating *through* it: in front of some letters, behind others. Work: kinetic words ("development.", "Today") with per-letter baseline offsets on scroll. | Monogram loader ≈3 s · 0.95 → 1.7 MB | A 3D monogram crossing a DOM headline (depth sandwich) |
| guillaumecolombel.fr (`gcolombel`) | Nominee 24 Sep 2026 | The loader is a pebble outline drawn in one hairline. It becomes a glowing agate-like 3D stone that wears the current project's texture. Project names are wrapped on a cylinder around it ("SALOMON LIGHTH…"). Projects change through a pixel-block grid with crosshair marks. | Hairline loader · 1.3–2.8 MB · no text LCP (canvas) | One object, re-skinned per project = the project switcher |
| gionatannese.com (`gionatannese`) | SOTD 5 Sep 2026 | White page with only 16 px text (name / "GN.D" / role) and a 000→100 counter. Then ≈25 small project thumbnails orbit as a rotating 3D cloud. Tabs: "Creative Space 1 · Projects 2 · About 3". | Counter · 3 → 14 MB · work is canvas-only | A thumbnail cloud as an "archive" view |
| michaelgatt.com (`michaelgatt`) | SOTD 18 Aug 2026 | The sound prompt is typeset as a falling staircase of tiny caps. Then a dark 3D tunnel of film and game stills drifts toward the camera through fog, with centred Zapf Humanist small caps ("WELCOME TO MICHAEL GATT'S UNIVERSE…") and a "+ INDEX VIEW" toggle. | **Sound gate** · 2.7 MB | An always-visible index toggle next to a spatial gallery |
| immersive-g.com (`immersive-g`) | SOTD 7 Jan 2025 | The whole page is a pale `#C4C4C4`–`#E8E8E8` plaster wall. A white bas-relief dove and flowers rise out of it, softly lit, next to 28 px serif "Innovative digital experiences studio". The showreel is set into the plaster. | **Counter loader ≈10 s** · 25.7 MB D / 22 MB M | A monochrome "carved from the page" relief; pre-render it |
| sergii-butrii.com (`sergiibutrii`) | Nominee 4 Oct 2026 | HTML hero over a pastel illustration (lavender `#A59ED4` → peach sky, rolling hills, striped doghouse, shiba) with "A portfolio you can walk around". **EXPLORE** enters a walkable chibi 3D world (joystick on mobile); **Quick overview** is the escape hatch. | Hero image LCP 0.55 s · 6.2 → 12.5 MB once you explore | Illustrated poster + opt-in world + quick overview |
| terminal-industries.com (`terminal-industries`) | SOTD 3 Sep 2025 | A line-art road and truck sketch on light grey, then a truck video in a capsule mask that grows ("SCROLL TO EXPLORE"). Explore opens the *actual* product dashboard ("Yard Operating System") filled with labelled **DEMONSTRATION DATA**: check-in queues, charts, tables. | 12.7 MB @3s D, 1.8 MB @3s M · H2 LCP 3.1 s | A live, sandboxed product demo as the project section |

### 2. Kinetic / editorial typography

| Site (`slug`) | Award | Signature move (concrete) | Prac. | Steal as pattern |
|---|---|---|---|---|
| darkroom.engineering (`darkroom`) | — | Everything in one red (`#E7141B`) on `#000`. "WHERE THINGS GET DEVELOPED" is set in a pixel/LCD display face at **200 px**, leading 0.8, tracking −5%, justified edge to edge. Microcopy is a dictionary entry in red mono ("[DARKROOM], NOUN 1. A LIGHTPROOF ROOM…"). Header chips are filled red boxes, with dotted-glyph corner strips and hairline red rules. Projects are full-bleed video bands, with the name in the same pixel face. | No gate · **0.6 MB @3s**, 2.3 MB end · no WebGL · LCP 0.88 s (M 0.44 s) | A one-colour display system + a full-width H1 = hardware-panel feel for ≈0 KB of JS |
| exoape.com (`exoape`) | SOTD 23 May 2022 | "Digital Design Experience" in **250 px** Lausanne Light (tracking −4.6%, leading 0.73), white over a full-bleed dusk photo of Venice. The lines slide away on scroll; a round "Scroll" badge. | Logo loader ≈3 s · 7 MB · LCP 3.8 s | Light-weight giant type over one cinematic image |
| locomotive.ca (`locomotive`) | SOTD 23 Jul 2014 (2014 version) | The loader decodes text from random glyphs ("$fr %RLgTa" → "Based in Montreal, Canada"). The hero is a duotone video portrait (blue, then red) with a pixelation block over the eyes and type projected on the skin, plus a boxed OPS/DES/DEV logotype. Work: a centred list of project names (≈70 px light condensed serif) between hairlines; hovering inserts a thumbnail *between the words* ("Scout [img] Motors"). | ≈3 s intro · 10 MB (video) · H1 LCP 0.36 s | An inline image inside a type list |
| neuemontreal.com (`neuemontreal`) | SOTD 13 Jul 2026 | A type specimen framed as an "Official Travel Guide": grainy tomato `#F14C46`, black "Neue Montreal" at ≈190 px, guide-style hairline rules, a vintage Montreal photo inset. Next section: "Out with the old, in with the Neue." with every word in a different colour and style, plus a handwritten postcard. The loader is a rotating ring of "NM" glyphs. | 7.5 MB · LCP 0.9 s (SVG title) | An editorial "issue/guide" frame; a multi-colour mixed-style sentence |
| marcuslorenzet.com (`marcuslorenzet`) | Nominee 29 Sep 2026 | "WEBSITES & DIGITAL PRODUCTS ↓" in **160 px** Plus Jakarta 700 (tracking −3%), beige `#D0C5AB` on `#11100D`, lines staggered. Small **stat tiles sit inline in the headline** ("15+ YEARS OF EXPERIENCE", "300+ PROJECTS"); a sepia portrait sits behind. Bottom dock: "PROJECTS ABOUT ARCHIVE [avatar] LET'S TALK"; email in the header. Work: a statement paragraph with screenshots floating around it in parallax. | Brief image intro · **0.9 MB** · LCP 0.42 s | Stat chips set inside a giant headline |
| leeholmes.uk (`leeholmes`) | Nominee 27 Sep 2026 | The niche positioning is the art: "CUSTOM SOFTWARE FOR ALTERNATIVE CLOTHING BRANDS" in a 122 px bitmap serif, each line blurrier from top to bottom. Faint grey pixel "circuit" growths are scattered across the page (canvas2D). "◆ (AVAILABLE FOR NEW PROJECTS)" + "Start a project →". A mini card bottom-left cycles project images. Work: image + mono name + what he built ("spreadsheet → app"); images resolve from a pixel mosaic. | No gate · 3.3 MB · **H1 = LCP 0.84 s** (M 0.60 s) | A positioning sentence as the hero art + cheap generative pixel texture |
| obys.agency (`obys`) | — (their experiment.obys.agency was SOTD 28 Jul 2026) | Project index: a vertical film strip of project images scrolls through a fixed black bracket "viewfinder" ( ) at the centre. The left column lists every project (the active one darkens); the right column shows category / role / count. Modes: "Vertical, Horizontal, Grid". The loader is a wire globe + counter. | Loader ≈6–8 s · 1.5 MB | A fixed viewfinder over a scrolling strip, with a synced name list |
| aristidebenoist.com (`aristide`) | — (v1 was SOTD 11 Oct 2017) | Home: a horizontal strip of ≈12 narrow image slivers on `#141414`. Opening a project gives a red-orange `#DE4C3F` full-bleed where giant condensed cream letters "C AN AL S" (≈340 px) *part* to frame the image, plus an A/B/C meta list. Mobile: giant scrambled code + "visit on a desktop". | 3.9 MB · mobile is a reduced site | Letters that spread apart to open a window onto the image |
| artemartemartem.com (`artem`) | SOTD 25 Jul 2026 | White page: a heavy black "Hey I'm Artem" with neon-green marker scribbles drawn over it, a green doodle face and a pill-shaped video window. Work: full-bleed CG video with CRT scan lines and RGB split, melted-blob white titles and a green scribble "CG". | Blank ≈6 s · 2.5 MB @3s → 29 MB | Hand-drawn neon annotations over clean type |
| meermohsin.me (`meermohsin`) | SOTD 26 Sep 2026 | A `#8F0101` red loader counts in huge script numerals ("083"), then "click anywhere to activate" and red plasma. Final hero: a portrait with a red tribal mask graphic, standing *in front of* a giant white word ("WAYS…DOING"). | **Click gate** · 3 MB | Text behind the subject (cut-out portrait over the H1) |

### 3. Hardware / dot-matrix / system aesthetic

| Site (`slug`) | Award | Signature move (concrete) | Prac. | Steal as pattern |
|---|---|---|---|---|
| animejs.com (`animejs`) | SOTD 6 May 2025 | On `#252422`: "All-in-one animation engine." in 64 px DIN (variable `wdth` 125). Beside it, a 640 px instrument dial: a glowing rainbow segmented ring, tick marks, and an inner canvas where red dot-matrix line fields morph (lines → diamond lattice → dots). The **same dial is re-used per section** ("Runs like clockwork": a clock hand, a code card, a timeline scrubber). CTA chip "npm i animejs ⧉". | No gate · 4.5 MB · H2 LCP 1.26 s | One persistent instrument that demos each capability as you scroll |
| vercel.com/ship (`vercel-ship`) | HM 5 Mar 2024 (earlier Ship page) | On black: "Ship what's next" in 96 px Geist Pixel, a white pixel button with an offset shadow, and pixel-art box mascots with eyes that line up in a pyramid and then tumble (physics). A mono countdown ("9D.19H.10M.40S"). | 3.9 MB · H1 = LCP 0.72 s | Pixel mascots built from your own product icon + a pixel display H1 |
| teenage.engineering (`teenage`) | — | An inked manga-style illustration ("Mr. Update" buried in paper stacks) under a black condensed headline and a calendar-stamp icon. The nav is icons with tiny two-line labels plus Japanese micro-text. The cookie banner is a yellow `#FABA39` hazard triangle with a hand. | 1.2 MB · LCP = illustration 0.66 s | One bold authored illustration with a story caption; UI as signage |
| linear.app (`linear`) | — | The H1 (64 px Inter Variable 510, −2.2%) arrives blurred and sharpens; below it, the **real app UI** in a tilted frame with an agent panel overlaid; isometric line icons for features. | 2.5 MB · LCP 2.9 s (the blur-in delays it) | The real product UI as the hero image |
| eddy-naboulet.dev (`eddynaboulet`) | Nominee 5 Oct 2026 | An amber CRT boot screen: blackletter "EDDY-OS v2.6 — BORDEAUX, FR", a gradient progress bar, and the **boot log as a CV** ("[OK] react.sys, typescript.sys … ready", "[OK] webgl.drv (three.js)", "[!!] coffee.sys … running low"). After a key press: his waving portrait drawn as orange halftone glyph dots, his name in 190 px pixel blackletter, a four-corner nav "01 Projects (projets.exe) … 04 Contact", and a header "● available · Mon 05 · 19:54". | **PRESS ANY KEY gate** · 2.8 MB | A boot-log skills list + a halftone portrait, without the gate |

### 4. Generative / creative-coding

| Site (`slug`) | Award | Signature move (concrete) | Prac. | Steal as pattern |
|---|---|---|---|---|
| lhbzr.com (`lhbzr`) | — | Black with a faint dot grid. A huge rotating string-art iris (hundreds of thin white chords forming a twisted ring) surrounds a tall, thin stacked "LHBZR" logotype; bracket-shaped edge nav "About" / "Work"; now-playing track text. | 4 MB · LCP = small text 4.1 s | One parametric line object (canvas2D) as the hero |
| tylerxhobbs.com (`tylerxhobbs`) | — | An off-white `#FFFDF8` page that is only a sparse grid: some cells hold small square artworks, the rest stay empty, so the layout itself looks generated. The portrait is one of the tiles. | 2.3 MB · LCP 0.66 s | A random-occupancy grid for the archive |
| field.io (`fieldio`) | HM 16 Apr 2014 (2014 version) | "Creative Intelligence for a Living World" (72 px DM Sans) stays fixed bottom-left while the full-bleed background cycles project media (the IBM Quantum Compass sphere grid, a Kia projection, a GRAMMY Museum touch table), with a "client · project" label. | 6.3 MB @3s → **46.6 MB** (video) | A fixed headline over a rotating project reel; use posters |
| mamboleoo.be (`mamboleoo`) | — | A hairline-boxed layout in a light geometric display face (Gosha, 50 px). The self-description noun changes per visit ("front-end snowman ☃" / "front-end spider"); inline icon chips sit in the sentences; a labs grid of pen-plotter and generative pieces. | 2 MB · LCP 1.3 s | A randomised one-word identity + inline chips |
| unicorn.studio (`unicornstudio`) | — | A purple aurora/light-ray shader in a rounded card behind "Craft Interactive Graphics that **Ship**". This no-code shader tool is behind many 2025–26 "aurora card" heroes (keywords: raymarch, ascii, dither, bloom). | 2.8 MB · H1 LCP 0.9 s | Technique reference only: the look is now generic |

Counterpoints: Matt DesLauriers (`mattdesl`, 0.73 MB, a plain mono list) and Patricio Gonzalez Vivo (`patricio`, a plain white carousel).
Top generative artists keep their own sites plain and put the art in the work. Behfar Behzad (`behfar`, Nominee 22 Sep 2026) uses a
galaxy-particle hero: the old space-portfolio look is still being made, and it reads dated next to the rows above.

### Wildcards (illustration-led, Awwwards 2025–2026)

| Site (`slug`) | Award | Signature move (concrete) | Prac. | Steal as pattern |
|---|---|---|---|---|
| ponpon-mania.com (`ponponmania`) | SOTD 22 Oct 2025 | An interactive comic. Flat, thick-outline cartoon animals (a kangaroo with a drink, a wolf, a green dinosaur on a phone) are layered inside a **cloud-shaped mask** on periwinkle `#7F7EFE`, with a pink cloud foreground, a sun disc, parallax balloons, a "read now" pill and a mascot loader. WebGL fluid/curl/particle shaders (≈620 shader sources). | Mascot loader · 2.8 → 7.4 MB · nav is just "chapters / about" | A layered illustration in an organic mask with parallax depth |
| juliencalot.com (`juliencalot`) | SOTD 8 Jul 2026 | The handwritten "jc" signature + a % loader lead into full-bleed paintings, one per series (a meditating orange-haired girl, leopards in a jungle), with a small condensed caps title, year and piece count on top. | 10 MB · LCP 2.0 s (image) | A full-bleed illustration as each project section's background |
| gilhuybrecht.com (`gilhuybrecht`) | SOTD 21 Sep 2026 (page mentions Portfolio Honors) | Each project is a horizontal **contact sheet of 3–5 real page screenshots** numbered 1–5, stacked as rows on black. Toggles "Grid / Gallery" and "Normal / **Star Wars**" (a perspective-crawl mode). The header lists "Available September 2026", services and recognition counts. | **D: % loader ≈25 s, 49 MB**; M: list at once, 4.6 MB | A project shown as its page spread, not one hero shot |
| alejandroha.com (`alejandroha`) | Nominee 23 Sep 2026 | On blue `#2B4093`, a handwritten signature draws itself (SVG stroke). Then a B/W seated portrait under a 100 px thin "ALEJANDRO [HA]" with two CTA pills (book a call / get a quote). Work: stacked perspective cards with a "01 / 05" counter. | Signature ≈3 s · **0.46 MB** | A signature stroke-draw (SVG) |

## Moves worth stealing for a hero (ranked by wow per cost, within our rules)

| # | Move | Source (`shot`) | How, concretely | Cost |
|---|---|---|---|---|
| 1 | **Live 3D drafting space** instead of a paper blueprint | maximeheckel (`-1440-hero`) | Full-bleed saturated blue isometric grid in perspective + DoF. One physical-material object (glass/metal monogram) assembles in ≈2 s. Mono annotations are *real*: git SHA, build date, Lighthouse score, camera coords. DOM H1 on top; AVIF poster until idle. | three.js |
| 2 | **Shader "settle" on a DOM H1** | 14islands (`-1440-3s` vs `-6s`) | The H1 paints as HTML (LCP). A WebGL overlay draws the same glyphs as SDF/texture, displaced by noise, and relaxes them into the real font in 1–2 s; under reduced motion, no overlay. | raw WebGL shader |
| 3 | **Positioning sentence as the art** | darkroom, leeholmes, marcuslorenzet | H1 at 120–200 px, tracking −3…−5%, leading 0.75–0.9, edge to edge, one distinctive display face (pixel / bitmap / condensed), one colour on black. Stat chips set inline ("2 apps · App Store + Google Play", "N sites shipped"). | CSS-only + 1 font |
| 4 | **Wireframe of a real thing + pixel-mosaic fill + 2-state toggle** | basement (`-1440-hero`) | An edges-only model of a phone running Linkoglot or a PstrykWeb storefront. Surfaces fill with drifting square pixels. Toggle "UI / CODE" (their HUMAN / MACHINE). | three.js (or canvas2D projected lines) |
| 5 | **One persistent instrument that morphs per section** | animejs (`-1440-6s`, `-work`) | One canvas dial/ring whose inner pattern changes per section (stack → deploys → Lighthouse → languages), with a code card beside it. | canvas2D + CSS scroll-driven |
| 6 | **Hero shape derived from your mark, as light** | raycast | Take the monogram's strokes, blur them into glowing bars with chromatic edges, drift slowly; a CSS-gradient poster is the fallback. | raw WebGL shader (CSS fallback) |
| 7 | **Depth sandwich**: an object crossing the name | gzhu, meermohsin | The name in DOM; a 3D monogram or cut-out portrait passes in front of some letters and behind others (canvas between two text layers, or a clip-path on the top copy). | three.js, or CSS with a pre-rendered AVIF |
| 8 | **Illustrated poster + opt-in "Explore" + "Quick overview"** | sergiibutrii, teenage, ponponmania | One authored illustration, layered for parallax and set in an organic mask. HTML CTAs; any world loads only on click. | SVG/AVIF + CSS (world: three.js on demand) |
| 9 | **Construction lines → finished image** | shopify-editions (`-1440-6s` → `-hero`) | Golden rectangles, arcs and diagonals stroke themselves in about 1.5 s, then the full-colour illustration or screenshot fades in inside them. Keeps the "drawing" DNA but resolves to colour. | SVG + CSS |
| 10 | **Live data as ornament** | maximeheckel, eddynaboulet, vercel-ship | Mono microtype that is real: commit SHA and build time (injected at SSG), local time, "● available", a countdown to a date. | CSS + tiny JS |
| 11 | **Halftone/glyph portrait** | eddynaboulet (`-1440-hero`) | Sample a photo into a grid of glyph dots in a two-tone palette; a slight ripple on the cursor; a PNG poster on mobile. | canvas2D |
| 12 | **Parametric hairline object** | lhbzr, leeholmes | Hundreds of chords or pixel growths, slow rotation, paused off-screen. | canvas2D (≈3 KB) |
| 13 | **Mixed-style sentence** | neuemontreal, unseen | Each word changes style (italic serif / grotesk / colour). | CSS-only |
| 14 | **Signature stroke-draw** | alejandroha | A handwritten SVG name draws itself once, non-blocking. | SVG |

## Moves worth stealing for a project section (ranked)

| # | Move | Source (`shot`) | How, concretely | Cost |
|---|---|---|---|---|
| 1 | **Live sandboxed product demo** | terminal-industries (`-1440-hero`) | Embed the real UI with labelled demo data: a Linkoglot flashcard deck you can flip, a PstrykWeb configurator → live preview. Lazy island on view, static screenshot first. | framework island (JS) |
| 2 | **One object, re-skinned per project** | gcolombel (`-1440-work`, `-390-work`) | One 3D object (phone / card / stone) wears each project's screenshot as its texture; titles wrap a cylinder around it; a pixel-block dissolve between projects. The list is HTML. | three.js |
| 3 | **Viewfinder over a scrolling strip** | obys (`-1440-work`) | Fixed brackets at the viewport centre; the project images scroll through; a synced name list on the left, meta on the right; Vertical/Horizontal/Grid modes. | CSS scroll-driven + sticky |
| 4 | **Project as a contact sheet** | gilhuybrecht (`-1440-hero`) | Each project row = 3–5 real screens side by side, numbered; a Grid/Gallery toggle. | CSS + lazy images |
| 5 | **Type list with an inline image** | locomotive (`-1440-work`) | Big project names between hairlines; on hover a thumbnail opens between the words; on mobile the thumbnail is always shown. | CSS-only (+ a hover class) |
| 6 | **Full-bleed band per project in the display face** | darkroom (`-1440-work`) | Each project is a full-width band (poster → muted loop on view) with its name in the 200 px face overlapping the edge. | CSS + video posters |
| 7 | **The hero instrument follows into projects** | animejs | The same dial shows that project's numbers (downloads, sites generated, LCP). | canvas2D |
| 8 | **Real UI, tilted, with a detail panel** | linear | A crisp real screenshot in CSS perspective with an overlaid annotation panel (what I built). | CSS 3D transforms |
| 9 | **Floating collage around a statement** | marcuslorenzet (`-1440-work`) | One statement paragraph; 4–6 screenshots drift around it at different parallax speeds. | CSS scroll-driven |
| 10 | **Letters part to frame the image** | aristide (`-1440-hero`) | A huge condensed project title whose letter gaps open into a window showing the screenshot. | CSS (gap / clip-path) |
| 11 | **Spatial gallery + index toggle** | michaelgatt, gionatannese | A 3D tunnel or cloud of stills, always beside an "INDEX VIEW" HTML list. | three.js (optional layer) |
| 12 | **Illustration as the section background** | juliencalot, shopify-editions | Each case section sits on its own illustration, with a small title / year / count overlay. | AVIF images |
| 13 | **Pixel-mosaic → sharp reveal** | leeholmes, gcolombel | Images arrive as coarse pixels and resolve on view. | canvas2D or CSS `image-rendering` swap |
| 14 | **Fixed headline over a rotating reel** | fieldio | The headline stays; the background cycles project media with a "client · project" label. Posters only on mobile (46 MB otherwise). | video (watch the MB) |

## What makes these feel astonishing vs. our rejected safe look

- **Scale.** The winners give one element the whole stage: Exo Ape 250 px, darkroom 200 px, EddyOS 190 px, Marcus 160 px, Lee Holmes 122 px,
  all with negative tracking and leading under 0.9. Drafting Table boxed its H1 into title-block cells, so the frame was louder than the
  words.
- **Saturated colour fields, not "paper stock".** Maxime's blueprint is our idea at full-bleed `#004BB0` with depth. darkroom is `#E7141B` on
  black, Neue Montreal is `#F14C46`, PonPon is `#7F7EFE`. We chose `#F2EFE6` cartridge and `#0C2240`, with the grid tuned to ≈1.2:1 so it is
  barely visible. The restraint was the design.
- **Depth with crossings.** Almost every strong hero stacks a field, an object and type, and lets one of them cross the others: gz's
  monogram through the letters, Meer's portrait over the word, PonPon's cloud masks, Locomotive's image between words. Our sheets were flat
  planes of hairlines.
- **An object with a material.** Glass "M" (Maxime), agate stone (Colombel), plaster relief (Immersive Garden), wireframe + pixels (basement),
  the instrument dial (anime.js). Drafting Table had no object, only frames, rules and labels.
- **Motion that resolves into the content.** Melt → crisp (14islands), construction lines → painting (Shopify), glyph scramble → text
  (Locomotive), boot log → desktop (EddyOS), signature → page (Alejandro). Each is a 1–3 s "becoming". Our motion only revealed
  decorative strokes.
- **Ornament that is real data.** Commit hash, camera coords, live clock, "● available", a countdown, a boot log. Our title-block fields
  (SHEET, REV, SCALE) were static labels: costume, not data.
- **Authored marks.** teenage engineering's inked manga, PonPon's thick-outline cartoons, Calot's paintings and Artem's neon scribbles are
  all clearly made by someone. Code-drawn construction lines read as a template.
- **Commitment to one idea at full strength.** darkroom is red pixel everywhere; Neue Montreal is a travel guide on every screen. We spread
  restraint evenly ("decorative strokes only", one accent per view), which reads as timid, not precise.

## Not covered

- Real phones, CPU/network throttling and Lighthouse per site: MB and LCP come from one unthrottled run (mobile = emulation only).
  Motion was sampled as 3 s / 6 s / settled stills plus one scroll position; hover and cursor effects were barely exercised (one synthetic
  mouse move).
- Failed or blocked sites:
  - nothing.tech: a consent wall plus a store-locator modal blocked the view; only the dot-matrix wordmark (NType82 / Ndot fonts) was seen.
  - zach.li: TLS certificate error.
  - yugop.com: SSL error.
- Captured but not tabled: cuberto.com and madewithgsap.com (conventional layouts). Lusion, Igloo, Active Theory, Bruno Simon and the
  earlier dev-portfolio sample are already in the earlier research files.
- Awards not found for Raycast, Linear, teenage engineering, darkroom.engineering, Maxime Heckel, Tyler Hobbs, lhbzr, Mamboleoo and Unicorn
  Studio. Several verified awards belong to earlier site versions (dates given).
- No WebSearch and no build write-ups (Codrops etc.) were read. Technique claims are inferences, not source-confirmed.
