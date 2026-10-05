# Award-winning developer portfolios, 2023–2026: what they look like, and whether they're usable

Date: 2026-10-05

Sample: 20 sites. 19 are personal developer or creative-developer portfolios that won Awwwards awards (SOTD, HM, and some on the SOTM / portfolio-winner listings), plus Lusion as one studio craft reference. Each has its own note in `inspirations/<slug>.md`, and screenshots are in `inspirations/img/`. The practicality numbers are my own Playwright measurements (method below).

## TL;DR — implications for this portfolio

- **An award doesn't mean recruiters can use the site.** The 4 least-practical sites (game/gated: Bruno Simon, Samsy, Jordan Delcros, Kris Temmerman) averaged a **higher** Awwwards SOTD (7.57) and even a **higher jury "Usability"** sub-score (7.25) than the 3 most-practical scored sites (Edoardo Lunardi, Clément Grellier, Elliott Mangham: 7.26 / 6.98). So I don't use Awwwards scores as a proxy for "a recruiter can find projects and contact in 10 s".
- **Sites that are both stunning and practical exist, but there are few.** Wow ≥ 4 and Practicality ≥ 4: **Edoardo Lunardi (P5/W4), Jesper Landberg (P4/W5), Antoine Wodniack (P4/W4), Stefan Vitasović (P4/W4)**. Even these have caveats: Jesper streams 33 MB of video, and Wodniack/Stefan block clicks for about 6 s during the intro. That's 4 of 20.
- **The structure that works:** real HTML nav and real per-project URLs exist from first paint, and the spectacle is an optional layer beside them. Jesper has a FEATURED (3D) / FULL (plain index) toggle, Hiroto pairs diegetic 3D signs with an HTML nav, and Rafa has an "Enter directly →" skip and a "Back to the room" return.
- **Never block input.** The biggest failure was intros or preloaders that block clicks: Corentin's page looks ready but swallowed clicks for about 24 s, Max Milkin's nav took 11.5 s, Jordan's preloader runs about 20 s and then shows a click gate, and Bruno has a click-to-start gate. Rule for us: nav and contact are clickable within ≤ 1 s, and any intro is skippable and under 1 s.
- **Mobile should get a different composition, not a shrunk scene.** Rafa serves a 0.38 MB tile hub on mobile against a 2.75 MB 3D room on desktop. Jesper turns the 3D carousel into a vertical card list, and Hiroto recomposes the same object for portrait. On throttled mobile, 9 of 20 sites weren't usable within 10 s [measured].
- **Put recruiter content in the first viewport:** role, location + timezone, an availability status, contact, and CV. See Elliott's dossier, Edoardo's "● AVAILABLE · 10:33 [VIE]", Valentin's "Open October 2026" mailto dot, Wodniack's "Hire me", and Valentin 2025's "Download resume".
- **Each project should say what I did:** a credits table (Edoardo: [DESIGN] others / [DEVELOPMENT] me / [STACK] / [LINK]), a role/agency meta row (Francesco, Valentin 2025), and a quick-skim route (Clément's `/overview` with a "Live website" button per project). Jordan's handwritten build notes (physics engine, threading) are the best "proof of engineering" in the sample, but they're trapped in WebGL.
- **Media drives page weight, not JS.** JS was ≤ 1.2 MB on every site. The heavy sites carry video previews (Jesper 26 MB, Gregory 10.7 MB, Edoardo 9.6 MB) or 3D models (Jordan 4.3 MB, Max 2.8 MB). Budget for poster images, play-in-view only, and the active ±1 item.
- **Developer-native themes beat generic 3D.** The OS/window metaphor (Edoardo), terminal (Rafa), spec sheet with rulers (Corentin, Wodniack) and keyboard shortcuts / command palette are all on-brand for a developer and cheap to build.
- **One signature effect is enough, and a whole world isn't needed.** Wodniack's cursor-bent line field (the whole site is 0.48 MB), Stefan's redaction-bar glitch and Edoardo's dithered field are memorable at near-zero cost.
- **Hard fails to avoid:** WebGPU-only rendering with no fallback content (Kris: "Sorry! Can't make the WebGPU adapter I need"), WebGL-only text with zero HTML links (Samsy, Jordan, Bruno's landing), landscape-only mobile (Kris), and unlabelled icon buttons (Bruno).
- **Where this puts us on the spectrum:** micro-interactions plus one framed shader/3D signature (Lusion-style WebGL in a card, Wodniack-style 2D canvas), with an optional deeper "explore" layer behind a toggle. Not a fully immersive site (that was the old space portfolio's failure mode).

## Comparison table

P = Practicality 1–5, W = Wow 1–5 (rubric below). "Usable" = first nav, project or contact control that is visible and hit-testable [measured]. Mobile = throttled (1.6 Mbps, 150 ms RTT, 4× CPU). Weight = transfer bytes on desktop after load, a wait and a scroll; "→" marks lazy growth.

| Site | Style / spectrum | Award (Awwwards) | SOTD / Dev | Usable desktop | Usable mobile | Projects / contact (clicks) | Mobile | Weight | P | W |
|---|---|---|---|---|---|---|---|---|---|---|
| [Edoardo Lunardi](inspirations/edoardo-lunardi.md) | OS windows + dithered WebGL bg | SOTD Nov 22 2025 | 7.18 / 7.35 | 0.7 s | 0.8 s | 0–1 / 0 | works | 0.37 → 10.5 MB (video) | 5 | 4 |
| [Clément Grellier](inspirations/clement-grellier.md) | minimal type + hero UI video | SOTD May 24 2025 | 7.36 / 7.69 | 2.9 s | 0.6 s | 1 / 1 | works | 1.9 MB | 5 | 3 |
| [Elliott Mangham](inspirations/elliott-mangham.md) | mono dossier + project strip | SOTD Dec 2 2025 | 7.24 / 7.40 | 0.5 s | 1.2 s | 0 / 0 | works | 1.2 MB | 5 | 3 |
| [Valentin Mor](inspirations/valentin-mor.md) | ultra-minimal one-screen | HM Aug 4 2025 | – / – | 0.5 s | 2.1 s | 0 / 0 | works | 0.34 MB | 5 | 2 |
| [Antoine Wodniack](inspirations/antoine-wodniack.md) | two-colour retro type + 2D line canvas | SOTD Dec 12 2024 | 7.56 / 7.58 | 5.8 s | 7.6 s | 1 / 0 | works | 0.48 MB | 4 | 4 |
| [Jesper Landberg](inspirations/jesper-landberg.md) | 3D curved-screen carousel on grid floor | SOTD Sep 29 2026 (Portfolio Honors nominee) | 7.73 / 8.17 | 1.2 s | 5.5 s | 0 / 1 | works (vertical list) | 0.43 → 33.7 MB | 4 | 5 |
| [Stefan Vitasović](inspirations/stefan-vitasovic.md) | Swiss type + redaction glitch | SOTD Sep 20 2025 | 7.25 / 8.04 | 6.2 s | 2.3 s | 1 / 0 | works | 0.25 → 6.7 MB | 4 | 4 |
| [Grégory Lallé](inspirations/gregory-lalle.md) | Swiss "Works," headline system | SOTD Oct 30 2024 | 7.48 / 7.57 | ≈0.5 s* | 0.6 s | 0 / 0 | works | 4.4 → 14.9 MB | 4 | 3 |
| [Rafa de las Heras](inspirations/rafa-heras.md) | 3D hacker room → terminal OS; mobile hub | HM Aug 17 2025 | – / – | 12.5 s (skip link) | 1.6 s | 1 / 1 | works (best adaptation) | 2.75 MB (mobile 0.38) | 3 | 4 |
| [Hiroto Sato](inspirations/hiroto-sato.md) | one chrome 3D sign-pole + HTML nav | SOTD Jul 17 2026 | 7.24 / 7.05 | 7.3 s | 11.8 s | 1 / 1 | works | 3.2 MB | 3 | 4 |
| [Ravi Klaassens](inspirations/ravi-klaassens.md) | datamosh portrait, art-directed | SOTD Apr 15 2026 | 7.48 / 7.20 | 8.0 s | 10.5 s | 1 / 1 | works (nav reduced) | 3.4 MB | 3 | 4 |
| [Francesco Michelini](inspirations/francesco-michelini.md) | dark mono project slider | SOTD Dec 19 2023 | 7.29 / 7.53 | 5.5 s | 9.1 s | 0 / 1+ | degraded (clips) | 0.44 MB | 3 | 3 |
| [Abhishek Jha](inspirations/abhishek-jha.md) | glossy 3D sculpture + poster | SOTD Sep 26 2025 | 7.21 / 7.52 | 3.2 s | none in 30 s | 1 / 0 | works but 10 MB | 10.4 MB at load | 3 | 4 |
| [Lusion](inspirations/lusion.md) (studio) | physics 3D in a framed card | SOTD Oct 2 2023 (+SOTM/SOTY listings) | 8.25 / 8.41 | 7.3 s | 0.7 s (menu) | 1 / 0 | works | 7.5 → 14.3 MB | 3 | 5 |
| [Max Milkin](inspirations/max-milkin.md) | sage minimal + photoreal 3D stone | SOTD Dec 13 2025 | 7.21 / 7.70 | 11.5 s | none in 30 s | 1 / 1 | degraded | 5.3 MB | 2 | 4 |
| [Corentin Bernadou](inspirations/corentin-bernadou.md) | photo Rubik's cube + spec-sheet frame | SOTD Mar 25 2026 | 7.42 / 7.53 | 23.6 s (UI looks ready at ~1.5 s) | 26 s | 0 / ≥1 | looks fine, locked | 3.5 MB | 2 | 4 |
| [Bruno Simon](inspirations/bruno-simon.md) | full driving game world | SOTD Jan 21 2026 (+SOTM & portfolio listings) | 8.11 / 7.65 | click-to-start gate; 0 HTML nav links | none | in-world / none on landing | renders | 1.3 → 7.4 MB | 1 | 5 |
| [Samsy](inspirations/samsy.md) | neon cyberpunk game world | SOTD Oct 16 2025 | 7.38 / 7.66 | tutorial + SKIP; 0 links | none | ≥2 / none | degraded | 3.1 → 9.4 MB | 1 | 5 |
| [Jordan Delcros](inspirations/jordan-delcros.md) | 3D scrapbook desk | SOTD May 28 2025 | 7.47 / 7.28 | ~20 s preloader + gate | none | ≥2 / LinkedIn only | slow | 0.28 → 10.6 MB | 1 | 5 |
| [Kris Temmerman](inspirations/kris-temmerman.md) | WebGPU comic game | SOTD Mar 20 2026 | 7.32 / 7.33 | WebGPU-only; 0 links | blocked (portrait) | in-game / fallback text | blocked | 0.19 → 7.2 MB | 1 | 4 |

\* Gregory: my probe skipped the nav because inactive links are styled at 32 % opacity. A manual click on "About" at 3 s navigated, so the nav works.

**Rubric.** *Practicality:* 5 = usable < 1.5 s desktop and < 3 s throttled mobile, projects and contact ≤ 1 click, mobile works, sensible weight. 4 = one weakness (intro ≤ 6 s, a modal-only contact, or heavy lazy media). 3 = two weaknesses, or a preloader / delayed nav of 6–12 s. 2 = nav blocked > 10 s or mobile degraded. 1 = no HTML route to projects or contact, blocked, or gated by a game/start screen. *Wow:* 5 = unforgettable signature and craft at studio level. 4 = a strong, distinctive signature. 3 = polished, with one nice move. 2 = clean but plain.

## Cross-site patterns

- **Always-visible minimal chrome** is nearly universal on the practical sites: four corners (Jesper), a two-pill header (Lusion), a bottom pill tab bar (Clément, Elliott), or a fixed text nav (Hiroto, Francesco, Max). Failures either have no chrome (Samsy, Kris, Jordan) or a non-sticky header on a long page (Wodniack: 24 screens).
- **Availability as a UI element:** "● AVAILABLE" (Edoardo), "Open October 2026" (Valentin), "Available Oct. 2026" (Corentin), "Available Q1 2026" (Gregory), "Available September 2026 · Book 30-min call" (Elliott), "Available for freelance projects" (Stefan, Abhishek), "Available for freelance work → Hire me" (Wodniack). It shows up on 8 of 20 sites. For a job hunt it becomes "Open to roles from <month>".
- **Live local time + city/timezone:** Edoardo, Ravi, Valentin 2025, Max, Elliott, Rafa (taskbar clock). It's a cheap signal of remote-readiness.
- **Real per-project URLs** were confirmed on at least 8 of 20 (Edoardo, Jesper, Ravi, Francesco, Lusion, Max, Corentin, plus Gregory's `/focus#<project>` anchors) [measured from the link lists]. The games, single pages, in-page panels (Valentin 2025, Rafa windows) and outbound-only lists (Wodniack, Elliott, Abhishek→Behance) have none.
- **Projects mostly shown as video previews** (Jesper, Edoardo, Gregory, Wodniack, Elliott, Clément hero), and that's what makes these pages heavy.
- **Role clarity is rare.** Only Edoardo (credits table), Francesco (role/agency meta row), Valentin 2025 (type/date/role/tools), Ravi (discipline tag) and Jordan (build notes, in WebGL) say what *they* did on each project.
- **Monospace + grotesk pairings** dominate (Edoardo, Elliott, Francesco, Rafa, Wodniack, Corentin). "Developer" is signalled through type, not stock code imagery.
- **Accessibility is the weakest sub-score** across the Awwwards developer juries (see below). Skip links appear only on Rafa and Clément.

## Signature moves (one per site, pattern level)

- Edoardo: a desktop-OS windows layer over a dithered WebGL field, plus ⌘K-style shortcuts and an AVAILABLE chip.
- Jesper: bent video screens on a 3D grid floor, with a **FEATURED/FULL** toggle as the escape hatch, and `/llms.txt` as a machine-readable CV.
- Wodniack: a cursor-warped line-field canvas, two-colour hairline-grid layout, binary microtype.
- Stefan: "redacted document" bars and scan-lines resolving into type, plus wheel-to-next-route.
- Hiroto: a single 3D street-sign pole as diegetic navigation, with a plain HTML nav twin.
- Rafa: a photoreal retro hacker room → "Turn on computer" → terminal OS. Skip and return links. Mobile goes straight to the hub.
- Corentin: a Rubik's cube built from project photos, with pixel rulers and catalogue codes.
- Clément: a viewport-wide name wordmark, a hero video of his own UI, and a `/overview` skim route.
- Elliott: a 5-column monospace dossier with a pre-filled enquiry mailto.
- Gregory: the active nav word becomes the headline ("Works,"), with a scroll-synced project index.
- Lusion: physics 3D inside a rounded card, with header pills that stay usable during the preloader.
- Ravi: an audience-split nav (For Brands / For Agencies) that collapses into a bottom dock.
- Francesco: P/01 slider with a YEAR · AGENCY · ROLE · AWARDS meta row, plus a theme toggle.
- Valentin: an availability dot as the main CTA, with a résumé PDF in the header (2025 version).
- Jordan: project dossiers as polaroids + keycap titles + handwritten engineering notes.
- Bruno: a physics toy world, with an always-present menu/map button and the source code open on GitHub.
- Samsy: a mascot avatar with an engine/FPS HUD flex.
- Kris: a "choose your hero" self-parody that makes the developer the character.
- Max: catalogue microlabels ("EDITION_2.0", "[N.002]") with one calm hero object.
- Abhishek: a 3D object piercing a flat poster frame, with numbered link groups.

## Best balance of wow + usability + mobile

1. **Edoardo Lunardi.** Developer-native wow (OS windows, dither shader, shortcuts), usable at 0.7 s and on mobile, real routes, honest credits and stack per project, blog/lab for depth. Fix the eager video.
2. **Jesper Landberg.** The top Developer score (8.17), real URLs inside the 3D scene, a FULL index escape hatch and a separate mobile layout. The weakness is media weight (33 MB), which is fixable with posters and loading only the active card.
3. **Antoine Wodniack.** Maximum identity for 0.48 MB, using CSS and a 2D canvas only, with "Hire me" on every breakpoint. Minus points for the ~6 s intro and the long single page.
4. **Stefan Vitasović.** One consistent effect, persistent email and availability, a numbered project index, and 0.26 MB on mobile.
5. **Clément Grellier** (most job-application-shaped, Wow 3). Bottom tab bar, `/overview` quick scan, About written as a CV. The "safe" baseline to add a signature onto.

## Best at "immersive but navigable"

- **Rafa de las Heras.** The immersion is opt-in ("Enter directly →", skip links) and reversible ("← Back to the room"), and mobile gets the lightweight hub instead. The pattern is right, but the execution needs the skip control rendered before the 3D assets (it took 12.5 s on desktop).
- **Hiroto Sato.** The 3D object *is* the menu (signs), and an HTML nav does the same job for keyboards, screen readers and impatient visitors. The preloader is the only flaw.
- **Jesper Landberg.** A WebGL carousel whose cards are real `<a href>` links to project pages, plus a plain-list toggle.
- **Lusion.** WebGL kept inside a card in a normal page, with the header usable while loading.
- Counter-examples: Bruno Simon (the menu/map is always present, but there's no projects or contact in HTML), and Samsy and Jordan (zero HTML links).

## Why award winners often fail at practicality

- **The jury scores something other than "can a recruiter find projects and contact in 10 s".** Awwwards' own weights are **Design 40 % · Usability 30 % · Creativity 20 % · Content 10 %**. Sites go to at least 18 jurors and the 3 scores furthest from the average are dropped. HM needs ≥ 6.5, SOTD goes to the top-scored sites, and the Developer Award needs > 7 (https://www.awwwards.com/about-evaluation/). The Developer Award sub-criteria shown on each site page are *Semantics/SEO, Animations/Transitions, Accessibility, WPO, Responsive Design, Markup/Meta-data*. Their weighting wasn't published on the pages I could read (the Developer Award page links to an external guideline doc: https://www.awwwards.com/developer-award/).
- **The jurors are peers, not hiring managers.** The vote lists on site pages name jurors like "web designer", "UX/UI designer", "Experience Designer" (SOTD) and "Senior Frontend Developer", "Creative Developer & Designer", "creative developer / CTO" (Dev). Source: https://www.awwwards.com/sites/brunos-portfolio.
- **Usability is consistently the lowest score, and accessibility is the weakest developer criterion.** In 43 Awwwards SOTD pages I scraped (mostly 2023–2026 portfolios, plus a few studio/company sites), **Usability was the lowest of the four sub-scores on 39**. Averages: Design 7.50, Usability 7.17, Creativity 7.72, Content 7.49. Across 42 Developer Award breakdowns, **Accessibility averaged 6.87** (lowest or tied-lowest on 31), against **Animations at 8.15** (highest; WPO 7.76, Responsive 7.58) [measured: scraped from each `/sites/<slug>` page]. Craft in motion gets rewarded, and access gets the least credit.
- **The jury's "Usability" and "WPO" scores don't match my measurements.** Bruno (Usability 7.83, WPO 8.2) has a start gate and no HTML nav. Samsy (WPO 8.2) has no links at all. Corentin (WPO 8.0) swallowed clicks for about 24 s. Max (WPO 7.4, Awwwards blurb "performance-first") took 11.5 s to its first usable nav and none within 30 s on throttled mobile [measured]. Jurors explore on capable desktops, and nobody times a recruiter's task.
- **Most of these portfolios are built to sell spectacle to agencies.** Many target freelance or agency clients: Elliott publishes price ranges, Ravi has "For Agencies / For Brands", Jordan's blurb says the site marks "the start of my new journey as a freelance developer", and 8 of 20 show a freelance/availability line. The spectacle *is* the product they sell. A job seeker's product is evidence of engineering judgement that can be scanned quickly: role, stack, outcomes, code, CV.
- **There's a desktop bias.** The evaluation page I read doesn't mention mobile. Mobile shows up as a separate badge (Elliott self-lists "Developer Award / Mobile Excellence") and as one of six developer sub-criteria. On throttled mobile, **only 8 of 20 sites were usable within 3 s, and 9 of 20 not within 10 s**. Kris is landscape-only, Max showed a blank screen at about 9 s, and Abhishek ships 10 MB before the load event [measured].

## Craft moves that cost nothing in usability or performance (borrow freely)

- **Typographic signature:** a viewport-wide name wordmark (Clément, Wodniack), the nav word as headline (Gregory), a condensed display face with mono microtype (Wodniack, Francesco), catalogue labels like "P/01", "Issue N°003", "EDITION_2.0" (Francesco, Corentin, Max).
- **A strict two-colour palette with a hairline grid** (Wodniack), or a monochrome base where colour comes only from project media (Edoardo, Jesper).
- **Status chips:** "● Available from <month>", local time + timezone, location (Edoardo, Valentin, Elliott, Ravi).
- **Persistent minimal chrome:** a bottom pill tab bar (Clément), four-corner UI (Jesper), a two-pill header (Lusion).
- **Developer affordances:** keyboard shortcuts / ⌘K palette (Edoardo), skip links (Rafa, Clément), a theme/contrast toggle (Wodniack, Francesco), `/llms.txt` (Jesper), an open-source repo link (Bruno), a pre-filled mailto (Elliott), a résumé PDF and per-project PDF dossiers (Valentin 2025, Rafa).
- **Content structure:** a per-project credits/meta table (Edoardo, Francesco), a quick-overview route (Clément), audience-split entry points such as "For recruiters / For engineers" (adapted from Ravi), a scroll-synced project index (Gregory), project discipline tags (Ravi).
- **Cheap motion:** text decode/scramble on hover (not as a blocking intro), redaction/glitch bars on type (Stefan; CSS/canvas), a small 2D canvas line field reacting to the cursor (Wodniack), hover-only video previews with posters.
- **An HTML OS/terminal metaphor** (Edoardo's windows, Rafa's mobile tiles). It's DOM, so it's crawlable and accessible.

### Expensive moves (budget them, keep them optional, never on the critical path)
- Full 3D worlds and game controls (Bruno, Samsy, Kris), WebGPU-only rendering, photoreal `.glb` models (Max 2.8 MB, Jordan 4.3 MB).
- Autoplaying high-bitrate video textures or previews (Jesper 26 MB, Gregory 10.7 MB, Edoardo 9.6 MB).
- Preloaders, start gates, scroll/pointer locks during intros (Corentin, Jordan, Max, Lusion, Ravi, Hiroto).
- WebGL-rendered text (Jordan, Samsy). It has zero SEO and accessibility value, and it hides the best content.
- Wheel-driven route changes (Stefan) and landscape-only layouts (Kris).

## Method [measured]

- **Browser:** system Google Chrome (headless) driven by Playwright 1.63, with a real GPU (NVIDIA RTX 2060 via ANGLE/D3D11, WebGPU adapter available). A first pass in Playwright's bundled Chromium with SwiftShader software GL was discarded for timings; it only supplied preloader frames and Kris's no-WebGPU fallback text.
- **Desktop:** 1440×900. **Mobile:** 390×844, DPR 2, `isMobile`/`hasTouch`, iPhone Safari 18.5 user-agent. Cold profile for every run, one run per site on 2026-10-05.
- **Weight:** the sum of CDP `Network.loadingFinished.encodedDataLength` (transfer bytes), recorded at the load event and again after waiting 5–10 s plus six wheel steps. It's split by resource type, with `.glb/.gltf/.ktx2/.drc/.bin` counted as 3D.
- **Time-to-usable (TTU):** polled every 250 ms from navigation commit. It records the first time a link or button matching nav/project/contact wording is in the viewport, at ≥ 50 % effective opacity, and **hit-testable at its centre** (`elementFromPoint` returns it). A visible link covered by an overlay doesn't count. Mobile TTU runs under CDP throttling of 1.6 Mbps down / 750 kbps up / 150 ms RTT and 4× CPU (Lighthouse-like slow 4G). The cap is 30 s.
- **Manual checks** corrected probe false negatives and positives: Gregory's 32 %-opacity links (clickable), Rafa's "Enter directly" skip, and Corentin's locked UI (a real click at about 6 s didn't navigate).
- **Caveats:** single runs. Other research agents were running browsers on the same machine, so absolute timings are ± and best read as a ranking. A desktop GPU makes the mobile-emulation GPU optimistic, so real phones will be slower for WebGL sites.

## Sources

- Awwwards evaluation system: https://www.awwwards.com/about-evaluation/ · Developer Award: https://www.awwwards.com/developer-award/
- Listings: https://www.awwwards.com/websites/portfolio/ · https://www.awwwards.com/websites/winner_category_portfolio/ · https://www.awwwards.com/websites/developer/ (pages 1–16) · https://www.awwwards.com/websites/sites_of_the_month/ (pages 1–3) · https://www.awwwards.com/websites/sites_of_the_year/ · https://www.awwwards.com/honors/winners
- Site pages (awards, scores, technologies, live URL): https://www.awwwards.com/sites/edoardo-lunardi · /sites/clement-grellier-portfolio-1 · /sites/elliott-mangham · /sites/valentin-mor-portfolio-2025 · /sites/aw-portfolio · /sites/jesper-landberg-4 · /sites/stefan-vitasovic-portfolio25 · /sites/gregory-lalle-24 · /sites/creative-developer-portfolio-2 · /sites/hiroto-sato · /sites/ravi-klaassens · /sites/francesco-michelini-folio23 · /sites/abhishek-jha-folio-25 · /sites/lusion-v3 · /sites/max-milkin-portfolio · /sites/corentin-bernadou-portfolio · /sites/brunos-portfolio · /sites/gen-02-smsy-portfolio · /sites/jordan-delcros-portfolio · /sites/stuff-by-kris-temmerman (all under https://www.awwwards.com)
- Score-statistics sample (also scraped, not profiled): /sites/gil-huybrecht, leo-parpeix-portfolio-2026, gionatan-nese-26, michael-gatt, artem-shcherbakov, pacome-pertant-portfolio, steven-com, juan-mora-1, jasmine-gunarto, adam-bricker, mr-pandas-paper-portfolio, nicola-romeitm, c-design-by-dylan, ethan-tom, etienne-planeix, glenn-catteeuw-portfolio-1, paolo-vendramini, wildy-riftian-portfolio, martin-briceno-portfolio-2, artiom-yakushev, gianluca-gradogna-portfolio, igloo-inc, nick-ho, maria-vasilyeva-portfolio, clay-boan-25, eduard-bodak-portfolio, mario-roudil (47 pages in total; 43 with SOTD breakdowns, 42 with Developer breakdowns)
- Live sites: https://www.edoardolunardi.dev/ · https://clementgrellier.fr/ · https://elliott.mangham.dev/ · https://www.valentin-mor.com/ (+ https://folioln.vercel.app/) · https://wodniack.dev/ · https://jesperlandberg.com/ (+ /llms.txt) · https://stefanvitasovic.dev/ · https://gregorylalle.com/ · https://rafaheras.dev/ · https://www.hirotos.com/ · https://www.raviklaassens.com/ · https://www.francescomichelini.com/ · https://abhishekjha.me/ · https://lusion.co/ · https://www.maxmilkin.com/ · https://corentinbernadou.com/ · https://bruno-simon.com/ · https://samsy.ninja/ · https://jordan-delcros.com/ · https://neuroproductions.be/
- Bruno Simon folio-2025 source: https://github.com/brunosimon/folio-2025

Not covered: FWA and CSS Design Awards juries (the shared web-search budget was exhausted, so I used only Awwwards data); Awwwards Annual Awards "Portfolio of the Year" nominee lists (the annual pages render client-side and weren't scraped); exact month/label of the SOTM and Portfolio Honors listings for Bruno; real-device phones and Safari/Firefox engines; Lighthouse/CWV scores (see the performance research file); full case-study page reviews beyond one sample page per site; pre-2023 classics (Aristide Benoist 2021, Bruno 2019) except as listing references; Bruno's mobile touch controls.
