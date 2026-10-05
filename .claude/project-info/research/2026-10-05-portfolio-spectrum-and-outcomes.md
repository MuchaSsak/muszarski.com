# Developer Portfolio Spectrum (Flat to Immersive) and Hiring Outcomes

Date: 2026-10-05

## TL;DR — implications for this portfolio

- **Aim for Band 2–3: a DOM-first site with crafted micro-interactions and ONE signature WebGL/shader moment.** Don't go Band 5 (a fully immersive world). All 7 Band-5 portfolios I measured showed a blank screen, a loader or a START gate at 3 s on mobile. 6 of the 7 had no email/LinkedIn/contact link in the mobile DOM (it lives inside the 3D world, or there is none) [measured]. Hiring signals only work if the reviewer reaches them. Recruiters skim, about 20 s on average according to Josh Comeau [expert].
- **Hard targets, from the coordinator's brief: "impressive within 3 s AND usable in 1 click".** Concretely: real HTML text, the name/role and the nav paint in under 1 s on mobile with no preloader. The signature visual comes in after first paint as progressive enhancement. Projects and contact are each 1 click from the first viewport on both desktop and mobile. Only a handful of measured sites met all of it: Brittany Chiang, Delba, Lee Robinson and Henry Heffernan's 2D OS site. Lynn Fisher, Paco and Josh Comeau are one scroll short on contact. **None of the WebGL-led sites did.** 13 of 14 Band 3–5 sites showed a blank screen, loader or gate at 3 s on at least one device (9 of 14 on mobile) [measured].
- **Your old space portfolio's failure modes are the common ones.** I saw a linear scroll gate, mobile disabled, and stale content (like Aristide Benoist's site, which still says "available Apr. 2023"). Henry Heffernan's site warns "best viewed on desktop" on mobile, and Aristide's says "visit on a desktop for a full portfolio" [measured]. Don't repeat them. The mobile version must be first-class. A reduced visual effect is fine. A reduced content set is not.
- **Proof beats spectacle for most roles.** A CodePath survey of more than 200 engineering leaders ranked side projects/portfolios (38%) above degree (23%) as hiring signals [data, Dec 2025]. That supports your "shipped work beats a degree" thesis. But CoderPad found only 20.5% of about 1,500 recruiters use portfolio review [data, 2025]. So the site has to hand reviewers proof fast: case studies, live demos, short videos, impact numbers. It shouldn't make them explore for it.
- **Spectacle helps only when the spectacle is the job.** Bruno Simon, Jesse Zhou, Robin Noguier and Henry Heffernan all report career boosts from immersive or WebGL portfolios [anecdote, self-reported]. They were targeting creative-dev, WebGL or design-engineer roles. HN commenters on Bruno's Dec 2025 launch: "perfect portfolio site" if you're hiring for web games, but "terrible as an actual home page" [anecdote]. In Poland, JustJoin.it lists 10 "three.js" offers against 1,298 "react" offers [measured 2026-10-05]. Optimise for product-frontend/full-stack reviewers first.
- **If you want 3D, use the dual-mode pattern, done right.** Make the content site the default. Offer an optional "Explore in 3D" or "Lab" entry that never blocks content. Real precedents: Henry Heffernan's 2D site lives at a separate URL (os.henryheffernan.com, 0.5 MB, nav in under 4 s), but the 3D landing page doesn't link to it. Robin Noguier serves a canvas-free list on mobile. Bruno Simon auto-lowers quality on mobile [measured / case study].
- **Avoid the 2025–26 clichés reviewers now pattern-match as template or AI output:** skill bars, "passionate developer" copy, Brittany-Chiang-v4 clones (8.3k stars, 4.2k forks), the JS Mastery floating-3D-computer template (7.1k stars, 1.7k forks), and the AI-slop look: Inter, lavender/purple gradients, glows, permanent dark mode, identical icon cards, badge above the H1 [data: GitHub API; opinion: Krebs/Developers Digest 2026]. Also avoid generic 3D "islands", "rooms" and "drivable cars". 3 islands and 3 vehicles appear in one 12-site "best three.js portfolios" list [measured count].
- **Craft-forward minimal sites get top product hires.** Rauno Freiberg (self-taught, Staff Design Engineer at Vercel), Emil Kowalski (Linear), Paco Coursey and Delba sit in Band 1–2. Their "wow" is interaction detail, OSS with real adoption, and writing, not 3D [expert/anecdote]. Vercel's own design-engineering post lists "page speed", "cross-browser support" and accessibility next to "delightful user interactions" [expert, Mar 2024].
- **Budget weight like a product page.** Measured first-load transfer: most Band 1–2 sites were 0.3–2.9 MB. Band-5 sites were 5–19 MB, and one DOM-only creative site (Olivier Larose) was 29 MB of media [measured]. Keep the hero under about 1 MB, lazy-load the WebGL chunk after first paint, and pause it offscreen.
- **No preloaders and no intro gates.** A preloader counter, a "Hello/Bonjour" greeting intro or a START button costs exactly the 3 seconds you have. Dennis Snellenberg and Grégory Lallé (award-winning) still showed intro/preloader screens at 3 s [measured].

---

## 1. How I measured (applies to every [measured] tag)

| Item | Method |
|---|---|
| Tool | Playwright 1.63, headless Chromium, run 2026-10-05 from this machine (Poland [assumption]), cold cache |
| Desktop / mobile | 1440×900 / Playwright `iPhone 13` profile (390×844, isMobile, hasTouch, DPR 3, iOS UA) |
| WebGL | SwiftShader (software GL). **WebGL-heavy sites will be slower here than on a real GPU**, so treat times as relative. Bytes and DOM facts are reliable. |
| "Usable" time | First moment an unobstructed nav/project/contact link, or ≥150 chars of readable DOM text, is in the viewport. Polled every 250 ms, cap 20 s. Overlays with `pointer-events:none` can fool it, so I cross-checked with 3 s screenshots. |
| 3 s state | Screenshot at t = 3 s. Contact sheets: `inspirations/img/spec-contact-mobile-3s.jpg` and `spec-contact-desktop-3s.jpg` (individual shots `spec-3s-*.jpg`) |
| Clicks to contact | 1 = contact/email/LinkedIn visible in the first viewport. 2 = behind a menu. "scroll" = present in the DOM but below the fold. "none in DOM" = inside the 3D world or absent. |
| Weight | Sum of response bodies until network idle + 2.5 s (first-load only; later lazy assets not counted) |
| Scripts | `spec-audit.mjs` (weight/DOM), `spec-usable.mjs` (usable time, gate, clicks, 3 s shots), `spec-sheet.mjs` (contact sheets) in the session scratchpad `tools/` folder. Temporary; copy them before reuse |

## 2. Catalog: 30 portfolios across the 5 bands

Verdict: **PASS** = stunning or crafted AND usable (content within 3 s, contact/projects 1 click on mobile). **MIXED** = one of the two. **FAIL** = practicality failure (gate/loader at 3 s, contact unreachable without exploring, or mobile degraded).

### Band 1: flat / content-first

| Site | Nav pattern & clicks to contact [measured] | Mobile 390px [measured] | Weight D/M [measured] | Notable trick | Known outcome (evidence) | Verdict |
|---|---|---|---|---|---|---|
| Brittany Chiang, brittanychiang.com | Sticky left column (About/Experience/Projects) + scrolling right column; usable 0.7 s / 0.2 s; LinkedIn/GitHub icons 1 click (no mailto) | Full content at 3 s | 2.9 / 1.5 MB | Spotlight-cursor glow, tabbed experience | v4 repo 8,281 stars / 4,212 forks; README asks forkers for credit [data: GitHub API]. Her employment outcome isn't attributable to the site (unverified) | PASS, but it's the most cloned look in the genre |
| Lee Robinson, leerob.com | Text list; usable 1.8 / 0.5 s; mailto 1 click | Full | 0.9 / 1.0 MB | Pure writing + notes | Reputation via writing; outcome not attributable | PASS (not hiring-oriented) |
| Paco Coursey, paco.me | Two-column project list (⌘K/cmdk, next-themes, Linear, Vercel); usable 0.4 s; contact by scroll | Full | 0.36 / 0.32 MB | Typographic restraint; OSS with adoption | Worked at Linear/Vercel per site; causation unverified | PASS |
| Delba de Oliveira, delba.dev | "Let's talk" CTA + Work list in first viewport; 1 click; usable 1.4–1.6 s | Full | 0.49 MB | Explicitly states the role she wants ("I'm looking for my next role in developer education...") | Outcome unverified, but a model of hiring-oriented copy | PASS |
| Sam Selikoff, samselikoff.com | Header nav (Projects, Blog, Talks) | Full | 1.3 / 1.2 MB | Video/teaching-first | n/a | PASS |
| Zach Leatherman, zachleat.com | Classic blog nav; skip link | Full | 0.3 / 0.2 MB | Performance as identity (Eleventy author) | n/a | PASS |
| Pedro Duarte, ped.ro | Minimal header nav; socials at top | Full | 0.49 MB | Personal voice ("not sure how to intro myself anymore") | Site links RainbowKit and an app; outcome n/a | PASS |

### Band 2: minimal + crafted micro-interactions

| Site | Nav / contact [measured] | Mobile [measured] | Weight D/M | Notable trick | Outcome (evidence) | Verdict |
|---|---|---|---|---|---|---|
| Rauno Freiberg, rauno.me | Big typographic bio; Craft/Projects links; contact by scroll | Bio visible at 3 s (yellow cursor blob) | 0.63 MB | "Craft" page of interaction experiments = the proof | Self-taught (economics major). Rejected for many junior roles, then hired by a design studio because his test assignment "generally looked good and was by design"; now Staff Design Engineer, Vercel [anecdote, interview 2025-07-07] | PASS |
| Emil Kowalski, emilkowal.ski | Text list of projects (Sonner, Vaul, animations.dev); **no contact link in DOM** | Full at 3 s | 1.96 MB | OSS components used widely | Works on Linear's web team, previously Vercel (site text) [anecdote] | PASS for craft, but no contact path |
| Josh W. Comeau, joshwcomeau.com | Blog header; usable 0.9 / 1.4 s; contact by scroll | Full at 3 s | 0.94 / 0.62 MB | Whimsical hover/sound/physics details | Built a course business; wrote the free portfolio ebook [expert] | PASS |
| Jhey Tompkins, jhey.dev | Single page of demos; usable 3.2 s (desktop) / 1.2 s; no contact link found | Full | 0.3 MB | "Wait, how did you do that?" demos | Ex-Google Chrome DevRel, now Shopify Brand Design Studio (site text) | MIXED (desktop blank at 3 s) |
| Lynn Fisher, lynnandtonic.com | Index list (About/Work/Thoughts/Archive); usable 0.4–0.5 s | Full; the gimmick turns off below 500px | 0.39 MB | Yearly redesign since 2007 (v. XIX); 2025 = elastic "squishy" resize [case study 2026-01-13] | Industry-famous; outcome n/a | PASS. The best "gimmick that never blocks content" example |
| Dennis Snellenberg, dennissnellenberg.com | "Hello/Bonjour/…" greeting intro, then Work/About/Contact; desktop usable 1.0 s; mobile = Menu button, contact by scroll | Intro greeting still on screen at 3 s | 0.66 / 0.48 MB | Magnetic buttons, curved page transitions | Widely re-built in tutorials (Olivier Larose: "Originally made by Dennis Snellenberg… Remade the landing page") | MIXED: lovely, but the intro costs about 2–3 s and the look is heavily cloned |
| Olivier Larose, olivierlarose.com | Project table + hover media; Contact/LinkedIn 1 click; usable 0.7–1.0 s | Full | **28.9 MB** (media) | Hover image reveal | Runs a tutorial site recreating award effects | MIXED (huge payload) |
| Elliott Mangham, elliott.mangham.dev | LinkedIn/Email/Schedule-call in first viewport; credentials + price ranges on page | Content at 0.35 s on mobile; desktop intro still dark at 3 s | 1.2 / 1.1 MB | Business-first creative dev: "Avg. project costs" shown | Awwwards SOTD 2025-12-02; "10 Site of the Day awards" per Awwwards blurb [data] | PASS on mobile, MIXED on desktop |
| Grégory Lallé, gregorylalle.com | Works/About/Contact links | Preloader counter still running at 3 s | 5.6 / 2.0 MB | Minimal type + transitions | Awwwards SOTD 2024-10-30 (7.48) | MIXED (preloader) |
| Cassie Evans, cassie.codes | — | — | 0.57 MB | Previously a famous SVG/GSAP animation site | **Now replaced by a farewell note** ("Thanks for reading… it no longer nourishes me") [measured] | n/a. Famous portfolios are snapshots, not permanent references |

### Band 3: DOM-first with shader/WebGL accents

| Site | Nav / contact [measured] | Mobile [measured] | Weight D/M | Notable trick | Outcome | Verdict |
|---|---|---|---|---|---|---|
| Maxime Heckel, maximeheckel.com | About/Work/Contact header; contact 1 click **after** load; usable 12.8 / 12.4 s (software GL) | **Black screen at 3 s** (WebGL progress loader) | 3.7 MB | Shader hero over a deep-dive blog | Known for shader/R3F writing [expert] | MIXED: the content is gold, but the hero gate hurts the 3 s test |
| Kenta Toshikura, kentatoshikura.com | WebGL distortion slider of works; no contact link in DOM | Slider visible at 3 s on mobile; loader ring on desktop | 0.65 / 0.56 MB | GPU distortion transitions | ©2021, not updated | MIXED/stale |
| David Heckhoff, david-hckh.com | "Get in touch" + Projects list in DOM; desktop usable 8.1 s; mobile contact by scroll | Illustrated hero visible at 3 s on mobile; loader on desktop | 1.8 / 1.7 MB | WebGL particles behind DOM content; lists real multiplayer projects | Outcome unverified | MIXED |
| Bilal, bilal.show | Canvas-led scroll story; nav text present on mobile | Illustrated scene at 3 s | 3.8 MB | Scroll-driven narrative | Listed among "best three.js portfolios 2026" [opinion] | MIXED |

### Band 4: hybrid (3D/WebGL showcase + DOM content)

| Site | Nav / contact [measured] | Mobile [measured] | Weight D/M | Notable trick | Outcome | Verdict |
|---|---|---|---|---|---|---|
| Robin Noguier, robin-noguier.com | WebGL project carousel + "Open case study"; no contact link on home; usable 14.2 s desktop / 8.3 s mobile | **Device-adaptive: mobile serves a canvas-free DOM list** (0 canvases) | 5.0 / 1.8 MB | WebGL slider; case studies | His earlier (2016) portfolio: "I received more than 100 inquiries for jobs and internships"; led to Ueno in San Francisco [anecdote, interview 2017-09-18] | MIXED: good mobile strategy, slow first view |
| Aristide Benoist, aristidebenoist.com | Desktop: WebGL gallery with EXPLORE at about 8 s; email/LinkedIn visible after | **Mobile = reduced page (38 KB) saying "(VISIT ON A DESKTOP FOR A FULL PORTFOLIO)"** | 3.9 MB / 38 KB | Award-level GPU gallery | Still advertises "AVAILABLE APR. 2023" [measured] | FAIL on mobile parity and freshness |
| Henry Heffernan, 2D inner site os.henryheffernan.com | ABOUT/EXPERIENCE/PROJECTS/CONTACT, 1 click; usable 2.5–3.6 s (boot animation) | Works | 0.5 MB | The "classic" version of the 3D site lives at its own URL | See Band 5 entry | PASS as a fallback, but **not linked from the 3D landing DOM** (0 anchors found) |

### Band 5: fully immersive / game-like

| Site | Nav / contact [measured] | Mobile [measured] | Weight D/M | Notable trick | Known outcome (evidence) | Verdict |
|---|---|---|---|---|---|---|
| Bruno Simon (folio 2025), bruno-simon.com | Drive a car; hamburger menu (top-right overlay, users had to discover it per HN); **0 readable DOM chars on load; no email/LinkedIn/contact link in DOM** (only X/GitHub/YouTube/Linktree credits) | Blank at 3 s; touch joystick + speed buttons; auto "lower quality preset" on mobile [Awwwards case study] | 7.5 / 5.3 MB | Three.js WebGPU + TSL with WebGL fallback, Rapier physics, weather, achievements, visitor "whispers" | 2019 folio "went viral and jump-started my career" [anecdote, 2026-03-11]; "started to find clients" [anecdote, Mux 2024-02-21]. Awwwards SOTD 2026-01-21, 8.11/10, with **usability the lowest sub-score (7.83)** [data]. HN 777 pts / 188 comments (2025-12-09). Repos: folio-2019 4.75k stars, folio-2025 1.9k stars | Iconic for creative/WebGL roles. FAIL on "1 click to contact" |
| Henry Heffernan, henryheffernan.com | BIOS boot text, then START, then a 3D 90s PC with the OS in an iframe; contact none in landing DOM | Shows "WARNING: This experience is best viewed on a desktop or laptop computer" | 8.0 / **12.4 MB** | Retro OS inside a 3D monitor; DOOM easter egg | Tweet 2022-05-09: "I'm currently looking for a job, DMs are open!". Joined Vercel as SWE July 2022 (LinkedIn/theorg); now Senior Design Engineer; co-authored Vercel's design-engineering post 2024 [anecdote, timeline verified, **causation not stated in sources accessed**]. Repo 2.5k stars. Show HN 2022: "maybe have a way to view the site without all the simulation fanfare" | FAIL on mobile & time-to-content. Strong for design-eng/creative |
| Jesse Zhou, jesse-zhou.com | "Cooking your ramen…" loader, then START gate; all content inside 3D | Gate on mobile | 7.6 / 8.6 MB | Cyberpunk ramen shop modelled in Blender | Consultant to SWE; "won him several web design awards and attracted multiple job offers" [anecdote, **bio on his course vendor's page**, potential bias] | FAIL practicality; strong outcome story |
| Jordan Breton, jordan-breton.com | Loader ("Sculpting hillsides…") then "Explore"; About/Contact links exist | Loader at 3 s | **19.0 / 18.8 MB** | Floating island, achievements, renderer settings | Outcome unverified | FAIL on weight |
| Sébastien Lempens, sebastien-lempens.com | START gate + "Switch to desktop" text | Gate; tells mobile users to switch | 12.4 / 7.4 MB | 3D Paris tour (scooter, skydiving) | Outcome unverified | FAIL on mobile |
| Samsy, samsy.ninja | Canvas only + SKIP; its own HUD reported 21–27 FPS (software GL) | Black at 3 s | 8.9 / 10.0 MB | WebGPU cyberpunk city | Outcome unverified | FAIL practicality |
| JReyes MC, jreyes-mc-portfolio.com | Load event never fired within 40 s (11.7 MB by then); UI says "First visit takes longer to load" | Loader | ≥11.7 MB | Minecraft-style student portfolio | Awwwards Honorable Mention (per search listing) | FAIL |
| Joseph Santamaria (Codrops case study, 2026-04-28) | Scroll-driven 3D scenes with snap-scroll; tesseract project transitions | "Low-resolution custom shaders for mobile performance" | not measured | KTX2/Draco/instancing/culling; user-toggled audio ("nothing auto-plays") | 3 months of build plus 3 unreleased versions [anecdote] | Not measured. A good list of perf techniques |

**Stunning AND practical** (the target): Lynn Fisher (yearly gimmick, content in 0.4 s), Rauno Freiberg (craft as proof, 0.63 MB), Josh Comeau (whimsy without gates), Brittany Chiang (polish + 1-click nav; just don't clone it), Elliott Mangham on mobile (award-winning, contact and pricing above the fold), Henry Heffernan's 2D OS site (retro charm, 0.5 MB).
**Famous but impractical**: Bruno Simon (no DOM contact, blank at 3 s), Henry's 3D site (12 MB on mobile, desktop warning), Jesse Zhou and Sébastien Lempens (START gates), Jordan Breton (19 MB), Aristide Benoist (mobile = "visit on desktop", stale availability), Maxime Heckel's and Robin Noguier's heroes (8–14 s to first usable content in my software-GL run).

## 3. Outcome evidence: what actually got people hired

| Person / portfolio | Claimed outcome | Evidence & strength | What specifically worked |
|---|---|---|---|
| Robin Noguier (2016 WebGL portfolio) | "more than 100 inquiries for jobs and internships"; led to Ueno (SF); "changed my life completely" | First-person interview 2017-09-18 [anecdote]; Net Awards top-5 shortlist + CSSDA (interview 2016-03-18) [anecdote] | A student portfolio built to the level of the agencies he wanted to join; awards brought the distribution. **Old (2016–17); the pre-saturation era of WebGL portfolios** |
| Bruno Simon (2019 car portfolio) | "went viral and jump-started my career"; clients wanted "the same thing, but being paid" | Self-report, Awwwards case study 2026-03-11; Mux interview 2024-02-21 [anecdote] | Novel interaction in 2019 + open-source code (4.75k stars) + it was his actual product skill (creative dev → Three.js Journey course) |
| Henry Heffernan (2022 retro PC) | Job-search launch → Vercel two months later | Tweet 2022-05-09 + LinkedIn/theorg timeline [anecdote; causation unverified] | Showcased React + Three.js + design taste, which is exactly the design-engineer skill set Vercel hires for |
| Jesse Zhou (ramen shop) | Career switch from consulting to SWE; "multiple job offers" | Course-vendor bio [anecdote, possible bias] | Self-taught; 3D portfolio as proof of skill instead of a CS degree |
| Rauno Freiberg | Self-taught economics major → hired on craft of test assignment → Arc → Vercel Staff DE | Interview 2025-07-07 [anecdote] | Visible craft in real work, not credentials. Supports your "projects > degree" thesis |
| Brittany Chiang v4 template | 8.3k stars / 4.2k forks | GitHub API [data] | Strong for her visibility; **outcome for the thousands of forkers unverified**, and clones now read as template |
| Aggregate: CodePath survey (n > 200 engineering leaders) | Side projects/portfolios 38%, internships 35%, GitHub 34% vs degree 23%, school prestige 17% | Fortune 2025-12-18 [data] | Proof-of-work signals beat credentials |
| Aggregate: CoderPad 2025 (n > 5,000; about 1,500 recruiters) | Portfolio review used by 20.51% of recruiters; 33.23% of devs think it's the best showcase | [data] | Portfolio is a minority channel, so it must be skimmable and link to proof |
| Aggregate: CoderPad 2026 (n ≈ 650) | 69% of recruiters use resume review; only 16% think it predicts performance | [data] | Recruiters know CVs are weak signals, which opens the door for demonstrable work |

**Counter-evidence (portfolios that hurt or don't matter):**
- HN "Building a Kickass Portfolio" thread (2018-08-02, 648 pts) [anecdote, old]. A hiring manager (ohmatt): "we have been much more critical on some prospects due to their personal site… they were ATROCIOUS". A developer (andrew_wc_brown): "I always ask people if they looked at website, my code or anything before hiring me and the overwhelming answer is no."
- Blind 2022 [anecdote]: portfolios are checked mostly for "borderline" candidates or ones who "might be exactly what we are looking for". It "serves only to help, not to hurt".
- HN on Bruno Simon 2025-12-09 [anecdote]: "terrible as an actual home page. It's slow as molasses and difficult to navigate" (gldrk). "Is it really 'extremely well executed' if it takes so long to load that I've closed the tab before seeing anything" (BugsJustFindMe). "loading took 30 seconds and too many studders/lag on my phone" (sech8420). "spend about 30 seconds on it before deciding 'this is cool!' and moving on" (andrenotgiant).
- Stale signals [measured]: Aristide Benoist "AVAILABLE APR. 2023", Kenta Toshikura "©2021". Your old site had outdated content too. Freshness is a credibility signal.
- **The genre is saturated.** The novelty that made 2016–2022 immersive portfolios go viral is gone. JS Mastery's 3D-portfolio tutorial repo alone has 7.1k stars / 1.7k forks [data].

## 4. Wow vs usable: how the best immersive portfolios handle navigation and mobile

| Pattern | Real example | Measured / reported behaviour | Use it? |
|---|---|---|---|
| Separate "classic" 2D site | Henry Heffernan, os.henryheffernan.com | 0.5 MB, nav 1 click; but the 3D landing DOM has no link to it [measured] | Yes, but link it visibly ("Skip to classic site") |
| Device-adaptive rendering | Robin Noguier | Desktop: WebGL carousel (5 MB). Mobile: DOM list, 0 canvases (1.8 MB) [measured] | Yes. Same content, cheaper visual |
| Auto quality presets | Bruno Simon 2025 | Mobile disables water blur/DoF, reduces shadow-map resolution [case study 2026-03-11]; WebGPU→WebGL fallback with a warning [measured UI text] | Yes, for any WebGL accent |
| Reduced mobile page + "visit on desktop" | Aristide Benoist, Sébastien Lempens, Henry Heffernan | Mobile users get less, or a warning [measured] | **No.** That's the mistake your old site made |
| Skip button | Samsy ("SKIP") | Skips the intro, but content is still canvas-only [measured] | Only if an intro exists. Better: no intro |
| In-canvas hamburger menu | Bruno Simon | Menu exists inside canvas UI, but HN users had to discover it ("it's a learning curve… click the hamburger icon") [anecdote] | Put the menu in the DOM, always visible |
| Gimmick only where harmless | Lynn Fisher 2025 | Elastic resize on desktop; regular responsive below 500px [case study] | Yes. The best model for "astonishing but safe" |
| Toggle effects/sound in settings | Bruno ("Toggles some effects", "Toggles sound"), Jordan Breton (renderer, audio settings), Santamaria (audio off by default) | [measured/case study] | Yes. Also honour `prefers-reduced-motion` |
| Snap-scroll scenes | Santamaria 2026 | "Getting the snap to feel intentional… took a lot of tuning" [anecdote] | Avoid for a hiring site. It recreates the linear-scroll problem you had |

## 5. What's overdone in 2025–2026

| Cliché | Who's calling it out | Strength |
|---|---|---|
| Skill bars / % ratings | Josh Comeau: "probably the clearest example of a thing that many people do that really nobody should do… There's no way to win with it." (Scrimba podcast 2022-07-19) | [expert] |
| "Passionate developer who loves solving problems" / "I turn ideas into reality" taglines; full-page hero animations delaying content | Multiple 2026 dev.to guides | [opinion], low quality |
| Brittany Chiang v4 clones (navy + teal, side-rail socials, tabbed experience) | 4.2k forks; her README: "Please give me proper credit" | [data] + [opinion] |
| Floating 3D computer/room hero (JS Mastery template) | 7.1k stars / 1.7k forks on adrianhajdin/project_3D_developer_portfolio | [data] |
| Generic three.js "worlds": floating islands, drivable cars, cozy rooms | 2026 "best three.js portfolios" list: 3 islands, 3 vehicle-driven, ≥8/12 explorable worlds [measured count] | [measured] |
| AI-slop look: Inter everywhere, Space Grotesk/Instrument Serif/Geist combos, serif-italic accent word, "VibeCode purple", permanent dark mode with low-contrast grey text, gradients + coloured glows, badge above H1, identical icon cards, numbered 1-2-3 steps, stat banners, all-caps labels | Adrian Krebs / Developers Digest "16 patterns" (2026-04-22); prg.sh (2025-10-26): LLMs output "the median of every Tailwind CSS tutorial" | [opinion] (systematic) |
| Dennis-Snellenberg-style magnetic buttons + curved transitions + "Hello" greeting intro | Tutorial rebuilds ("Originally made by Dennis Snellenberg") | [anecdote] |
| Preloader counters (0→100), greeting intros and START gates | Blank/loader/gate at 3 s on 13 of 14 Band 3–5 sites (at least one device), 9 of 14 on mobile; also on Band-2 award sites (Dennis Snellenberg, Grégory Lallé, Elliott Mangham desktop) [measured, contact sheets] | [measured] |

## 6. Role dependence

| Target role | Best band | Evidence |
|---|---|---|
| Creative developer / WebGL / agency | 4–5 (with a fast 2D path) | Job posts require "Portfolio with interactive WebGL / Three.js work" (three.js forum, 2026-03-09) and "portfolio / GitHub / demos" (2026-03-19) [data: job posts]. HN: "if you want someone to make a game on the web then this is a perfect portfolio site" (hahn-kev) [anecdote]. Poland: only 10 "three.js" / 15 "webgl" offers on JustJoin.it [measured] |
| Design engineer (Vercel/Linear-type) | 2–3 | Vercel lists "delightful user interactions", "page speed", "cross-browser support", accessibility [expert, 2024-03-29]. Exemplars Rauno, Emil, Henry (his hire came from a 3D site, but the job values the craft, not the 3D) |
| Frontend product engineer | 2 (+ one Band-3 accent) | JustJoin.it: "react" 1,298, "next.js" 350 offers vs three.js 10 [measured]. Comeau: two audiences, HR and developers; text interlaced with screenshots works best [expert] |
| Full-stack | 1–2 | Case studies with architecture, live demos, GitHub. CodePath: side projects 38%, GitHub 34% [data] |
| Backend / infra | 1 | "My portfolio is my github. I don't need fancy graphics" (HN 2018) [anecdote]; heavy visuals read as off-target |
| Junior (any) in Poland | 1–2 with depth | JustJoin.it shows only 32 junior JavaScript offers out of 19,378 total [measured], so a junior competes hard. Proof of shipped work matters more than visuals |

## 7. Conclusion: recommended position

**Recommendation: "Band 2.5". A fast, DOM-first, content-complete site with crafted micro-interactions and one signature WebGL/shader moment that enhances the hero but never gates it, plus an optional "Lab / Explore in 3D" route for showing off three.js.**

Reasoning:
1. **3-second impression**: a hero painted in HTML with a crafted typographic composition and a GPU accent that fades in after first paint. A shader background, a reactive object or a cursor-driven distortion all work. The visitor sees name, role and proof (a featured shipped project with a real screenshot/video) immediately, even before WebGL loads. If WebGL fails or `prefers-reduced-motion` is on, a static poster frame shows.
2. **1-click usability**: persistent DOM nav (Work / About / Contact, plus a CV link) on every viewport including 390px. Each project is a card linking straight to a case study with live demo, repo and impact. Contact = mailto + LinkedIn visible in the hero or nav. Optional ⌘K palette for power users (Paco's cmdk lineage).
3. **Mobile first-class**: same content, cheaper effect (Robin Noguier / Bruno presets model). No "visit on desktop".
4. **Proof over polish**: what the CodePath/CoderPad data and the Rauno/Jesse stories say actually converts: shipped projects, explained decisions, outcomes.
5. **Optional Lab**: reuse your three.js "space" skills as an opt-in experiment page linked from the site (Henry's os-site pattern, inverted). It shows creative capability to agencies without taxing product-company reviewers.

**Acceptance tests for "impressive within 3 s AND usable in 1 click"** (re-use `spec-usable.mjs` on our own build; run on iPhone-13 profile + throttled 4G, and on a real mid-range Android):

| # | Test | Target |
|---|---|---|
| 1 | Name + role + one proof line readable in HTML (no JS needed) | First paint ≤ 1 s; LCP ≤ 2.5 s at p75 (web.dev "good" threshold) |
| 2 | Signature visual on screen | Starts ≤ 3 s, after LCP; never delays text; static poster if WebGL unavailable or `prefers-reduced-motion` |
| 3 | No preloader, counter, greeting intro or START gate | 0 |
| 4 | Projects reachable | 1 tap from first viewport, mobile + desktop |
| 5 | Contact (mailto + LinkedIn) reachable | 1 tap from first viewport, or persistent nav |
| 6 | Mobile parity | Same content as desktop; only the effect quality differs |
| 7 | Initial transfer (excl. lazy WebGL chunk) | ≤ ~1 MB; WebGL/3D assets lazy-loaded and paused offscreen |
| 8 | Freshness | Dated "currently" line + latest project, no stale availability |
| 9 | Optional Lab/3D | Opt-in link only; content site works fully without it |

| Option | Upside | Risks |
|---|---|---|
| Band 1 flat | Fastest, safest, ATS-adjacent reviewers love it | Forgettable; reads as template (Chiang/shadcn); wastes your 3D skill |
| **Band 2–3 (recommended)** | Memorable + skimmable; shows craft + performance discipline, which is what product companies hire for | Needs real design taste; one accent done badly looks like AI-slop glow. WebGL accent must be lazy, paused offscreen and reduced-motion aware |
| Band 4 hybrid | Strong for creative/design-eng roles | Easy to drift into loaders, heavy payloads and desktop-first (Robin 8–14 s, Aristide mobile downgrade) |
| Band 5 immersive | Viral potential; ideal for WebGL/game roles | Measured: blank/gated at 3 s, 5–19 MB, contact hidden; HN reviewers call it "terrible as an actual home page"; genre saturated; it's what failed for you before |

## Sources

| # | URL | Title | Published | Accessed |
|---|---|---|---|---|
| 1 | https://github.com/bchiang7/v4 | bchiang7/v4 (Brittany Chiang portfolio v4) | repo 2018-08-16 | 2026-10-05 |
| 2 | https://brittanychiang.com/ | Brittany Chiang | live | 2026-10-05 |
| 3 | https://www.mux.com/blog/3d-web-development-and-beyond-a-chat-with-bruno-simon | 3D web development and beyond: a chat with Bruno Simon | 2024-02-21 | 2026-10-05 |
| 4 | https://www.awwwards.com/brunos-portfolio-case-study.html | Bruno's Portfolio Case Study (Awwwards) | 2026-03-11 | 2026-10-05 |
| 5 | https://www.awwwards.com/sites/brunos-portfolio | Bruno's Portfolio, Awwwards SOTD | 2026-01-21 | 2026-10-05 |
| 6 | https://github.com/brunosimon/folio-2025 | brunosimon/folio-2025 | repo 2024-10-12 | 2026-10-05 |
| 7 | https://github.com/brunosimon/folio-2019 | brunosimon/folio-2019 | repo 2019-07-13 | 2026-10-05 |
| 8 | https://news.ycombinator.com/item?id=46206531 | HN: Bruno Simon – 3D Portfolio | 2025-12-09 | 2026-10-05 |
| 9 | https://x.com/henryheffernan/status/1523634736157315073 | Henry Heffernan portfolio launch tweet (text via search snippet; page paywalled) | 2022-05-09 | 2026-10-05 |
| 10 | https://www.linkedin.com/in/henryheffernan/ and https://theorg.com/org/vercel/org-chart/henry-heffernan | Henry Heffernan, Senior Design Engineer at Vercel (via search snippets) | undated | 2026-10-05 |
| 11 | https://news.ycombinator.com/item?id=31313187 | Show HN: 3D Portfolio website with late 90s aesthetic | 2022-05-09 | 2026-10-05 |
| 12 | https://github.com/henryjeff/portfolio-website | henryjeff/portfolio-website | repo 2022-03-11 | 2026-10-05 |
| 13 | https://os.henryheffernan.com/ | Henry Heffernan inner 2D OS site | live | 2026-10-05 |
| 14 | https://vercel.com/blog/design-engineering-at-vercel | Design Engineering at Vercel | 2024-03-29 | 2026-10-05 |
| 15 | https://www.cssdesignawards.com/judge-interview/robin-noguier/259 | CSSDA interview with Robin Noguier | 2016-03-18 | 2026-10-05 |
| 16 | https://spaces.is/loversmagazine/interviews/robin-noguier | Lovers Magazine: Robin Noguier | 2017-09-18 | 2026-10-05 |
| 17 | https://spaces.is/loversmagazine/interviews/rauno-freiberg | Lovers Magazine: Rauno Freiberg | 2025-07-07 | 2026-10-05 |
| 18 | https://zerotomastery.io/about/instructor/jesse-zhou/ | Jesse Zhou, ZTM instructor bio | undated | 2026-10-05 |
| 19 | https://podcast.scrimba.com/72/transcript | Scrimba Podcast E72 with Josh Comeau (transcript) | 2022-07-19 | 2026-10-05 |
| 20 | https://www.joshwcomeau.com/effective-portfolio/ | Building an Effective Dev Portfolio (free ebook) | ~2020 | 2026-10-05 |
| 21 | https://news.ycombinator.com/item?id=17671490 | HN: Building a Kickass Portfolio | 2018-08-02 (old) | 2026-10-05 |
| 22 | https://www.teamblind.com/post/do-you-look-at-candidates-portfolio-zlbuydfd | Blind: do you look at candidates' portfolio | 2022-01-17 | 2026-10-05 |
| 23 | https://coderpad.io/survey-reports/coderpad-and-codingame-state-of-tech-hiring-2025/ | CoderPad & CodinGame State of Tech Hiring 2025 | 2025 | 2026-10-05 |
| 24 | https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/ | CoderPad State of Tech Hiring 2026 | 2026 | 2026-10-05 |
| 25 | https://fortune.com/2025/12/18/tech-hiring-slow-but-not-fully-stalled-exclusive-codepath-data-new-secret-to-land-tech-role/ | Fortune: CodePath engineering-leader survey | 2025-12-18 | 2026-10-05 |
| 26 | https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it | AI Design Slop: 16 Patterns | 2026-04-22 | 2026-10-05 |
| 27 | https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website | Why Your AI Keeps Building the Same Purple Gradient Website | 2025-10-26 | 2026-10-05 |
| 28 | https://github.com/adrianhajdin/project_3D_developer_portfolio | JS Mastery 3D developer portfolio template | repo 2023-02-28 | 2026-10-05 |
| 29 | https://blog.olivierlarose.com/tutorials/awwwards-landing-page | Rebuild an Awwwards Landing page (Dennis Snellenberg rebuild) | undated | 2026-10-05 |
| 30 | https://lynnandtonic.com/thoughts/entries/case-study-2025-refresh/ | Case Study: lynnandtonic.com 2025 refresh | 2026-01-13 | 2026-10-05 |
| 31 | https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/ | Codrops: More Than a Portfolio (Joseph Santamaria) | 2026-04-28 | 2026-10-05 |
| 32 | https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025 | Best Three.js Portfolio Examples (2026) | 2026-05-04 | 2026-10-05 |
| 33 | https://discourse.threejs.org/t/we-re-hiring-a-creative-developer-three-js-webgl/90260 | three.js forum job: Creative Developer (Three.js/WebGL) | 2026-03-09 | 2026-10-05 |
| 34 | https://discourse.threejs.org/t/hiring-creative-developer-three-js-webgl-interactive-ads/90431 | three.js forum job: Creative Developer, interactive ads | 2026-03-19 | 2026-10-05 |
| 35 | https://justjoin.it/job-offers/all-locations?keyword=three.js (also ?keyword=webgl, react, next.js; /javascript?experience-level=junior) | JustJoin.it offer counts | live snapshot | 2026-10-05 |
| 36 | https://www.awwwards.com/sites/elliott-mangham | Elliott Mangham, Awwwards SOTD | 2025-12-02 | 2026-10-05 |
| 37 | https://www.awwwards.com/sites/gregory-lalle-24 | Grégory Lallé '24, Awwwards SOTD | 2024-10-30 | 2026-10-05 |
| 38 | https://rocketdevs.com/blog/frontend-developer-portfolios | Frontend Developer Portfolios: 5 Common Styles | 2025-10-09 | 2026-10-05 |
| 39 | https://web.dev/articles/lcp | Largest Contentful Paint (LCP), web.dev | updated 2025-09-04 | 2026-10-05 |
| 40 | https://www.awwwards.com/websites/winner_category_portfolio/ | Awwwards portfolio winners listing (used to pick 2024–26 SOTD dev portfolios) | live | 2026-10-05 |
| 41 | Live sites measured with Playwright: leerob.com, paco.me, delba.dev, samselikoff.com, zachleat.com, ped.ro, joshuawootonn.com, rauno.me, emilkowal.ski, joshwcomeau.com, jhey.dev, lynnandtonic.com, dennissnellenberg.com, olivierlarose.com, elliott.mangham.dev, gregorylalle.com, cassie.codes, maximeheckel.com, kentatoshikura.com, david-hckh.com, bilal.show, robin-noguier.com, aristidebenoist.com, henryheffernan.com, jesse-zhou.com, jordan-breton.com, sebastien-lempens.com, samsy.ninja, jreyes-mc-portfolio.com | [measured] | live | 2026-10-05 |

Not covered: real-GPU/real-device timings (all WebGL timings are from software GL, so relative only); Lighthouse/CWV scores per site; Yuri Artiukh's personal site (couldn't verify a current URL after the search budget ran out); verified first-person hiring write-ups for Brittany Chiang/Emil Kowalski/Paco; recruiter device split (mobile vs desktop) for portfolio views (no trustworthy source found; the widely repeated "68% mobile" figure is unsourced); Polish-language hiring-manager commentary on portfolios.
