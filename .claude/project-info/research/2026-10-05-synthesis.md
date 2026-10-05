# Research Synthesis: What to Build

Date: 2026-10-05

This file distils 9 parallel research tracks (all dated 2026-10-05, in this folder) into one direction plus the decisions that are still the user's. Every claim below points to the track file that owns its evidence. Raw files:

| Track | File |
|---|---|
| Hiring side (who looks, how long, PL market) | `2026-10-05-hiring-perspective.md` |
| Flat → immersive spectrum + outcomes | `2026-10-05-portfolio-spectrum-and-outcomes.md` |
| Navigation / IA / UX evidence | `2026-10-05-navigation-ia-ux.md` |
| Project showcase, NDA, skills | `2026-10-05-project-showcase-patterns.md` |
| Performance, mobile, WebGL/WebGPU, a11y, SEO (+ Lighthouse runs) | `2026-10-05-performance-mobile-a11y.md` |
| Tech stack (versions verified on npm) | `2026-10-05-tech-stack.md` |
| Awwwards dev portfolios (visual) | `2026-10-05-awwwards-dev-portfolios.md` + `inspirations/<slug>.md` |
| Art direction / theme catalog | `2026-10-05-art-direction-themes.md` + `inspirations/theme-*.md` |
| UI building blocks (Mobbin + galleries) | `2026-10-05-ui-patterns-galleries.md` |

Screenshots: `inspirations/img/` (prefixes `spec-`, `nav-`, `show-`, `theme-`, `ui-`, and unprefixed Awwwards slugs).

## TL;DR

1. **The site's job is to convert people who already have the link, not to get discovered.** In Ashby's data on 38M applications, referrals reach interview 40% of the time, sourced candidates 25% and cold applications 3%. Hiring managers give a portfolio 5–30 s, and some use it only to find reasons against a candidate. So: proof on the first screen, perfect link previews (OG), and a job search that leads with referrals and outreach. [hiring]
2. **Spectrum position: "Band 2.5".** The content is fast HTML rendered first, with crafted micro-interactions and **one signature WebGL moment** that loads after the content and never blocks it. An optional `/lab` or `/explore` immersive layer can come later. All 9 tracks converge on this independently. [spectrum, nav, perf, themes, hiring]
3. **The practicality gap is the opportunity.** Lighthouse mobile medians: immersive portfolios score **35.5**, minimal ones **74.5**. Only 1 of 16 scored 90 or more, and no immersive site scored above 64. 6 of 7 immersive sites had no contact link on mobile, and every immersive site ignored `prefers-reduced-motion` [measured]. **An immersive-feeling portfolio that scores 90+ on mobile and is properly accessible is rare. That rarity is a hiring signal in itself, and the site can document it as its own case study.**
4. **Structure: "Blueprint A+".** A short home page, `/work/<slug>` per case study, and `/cv` (HTML + PDF). A persistent header with text labels and a Contact + CV button, so both are 1 click from anywhere. Shared-element View Transitions from each card to its case study. ⌘K palette as an extra shortcut, never the only way to navigate. No preloader or start gate, no scroll-jacking, and the same content on mobile. [nav, ui]
5. **Projects are the product.**
   - Feature 3–5 flagships; the rest go in an archive list.
   - Every flagship gets a TL;DR box, a decisions section that names the rejected options (in CoderPad 2026, 56% of recruiters say they value candidates who explain trade-offs), an architecture diagram, real metrics, and links: Live / Code / "Code private (NDA)".
   - Short muted video loops of the real UI, not GIFs.
   - **NDA ladder:** get written permission from the software house before writing anything up. Under art. 74 ust. 3 PrAut, the employer owns the economic rights to code an employee writes. [showcase]
6. **Art-direction front-runner: "Living Blueprint", or its hybrid "Drafting Table".** The site is an engineering drawing set: each case study is a sheet whose diagram draws itself and then turns into the real UI. This is the only theme where the decoration itself is proof of shipping. It is SVG-light, scales to many case studies, and mobile is easy. Avoid as the main concept: terminal, fake OS, cinematic scroll-film (linear, the old site's failure), Liquid Glass, Y2K, pixel-RPG. **This is the user's taste call; see Decisions.** [themes]
7. **Stack default: Next.js 16.3 + React 19.3 + TS + R3F 9.8 / three r186 (WebGL2) + GSAP 3.15 + Motion + Tailwind 4.3 + typed MDX, on Vercel.**
   - Hire signal: JustJoin.it lists React 1,446 and Next.js 351 offers, against Astro 8 and Svelte 10.
   - One persistent canvas lives in the root layout and is lazy-loaded.
   - WebGPU is not ready to rely on: R3F's WebGPU support is still alpha, Firefox and Android are partial, and about 12% of iPhones lack it. [stack, perf]
8. **Budgets:**

   | Budget | Target |
   |---|---|
   | LCP (lab, mobile) | ≤ 2.5 s |
   | TBT | ≤ 200 ms |
   | CLS | ≤ 0.05 |
   | Initial JS | ≤ 150 KB gz |
   | Fonts | ≤ 100 KB |
   | Initial page | ≤ 1 MB |
   | Lighthouse mobile | ≥ 90 on every page |
   | 3D chunk (lazy) | ≤ ~300 KB gz (see conflict C1) |
   | 3D assets | ≤ 1 MB mid-tier, ≤ 2 MB high-tier |

   Enforced with Lighthouse CI. [perf]

## 1. Where the tracks converge (high confidence)

| # | Conclusion | Evidence strength | Owner track |
|---|---|---|---|
| 1 | Real content is server-rendered HTML first. 3D, shaders and video are a lazy layer, gated by device capability, with a poster fallback | [measured] 16 Lighthouse runs plus about 80 Playwright checks; web.dev (a canvas is never the LCP element) | perf, spectrum |
| 2 | No preloaders, START gates, greeting intros or scroll-jacking on the main path | [data] n=20 study, 2026: scroll-jacking causes more errors and less control; [measured] 13 of 14 WebGL-led sites were gated or blank at 3 s | nav, spectrum |
| 3 | Labelled header nav always visible; Contact and CV 1 click from anywhere | [data] NN/g, n=179: hidden navigation ≥ 39% slower; 2025 recheck | nav |
| 4 | A URL per project (`/work/<slug>`) with its own title and OG image | [doc] Google JS SEO; shareable in recruiter emails | nav, perf |
| 5 | Mobile parity: same content, with fidelity tiered as High / Mid / Low / Reduced-motion | [measured] every famous immersive site renders on phones now; the old site's mobile block is below the bar | perf |
| 6 | 3–5 flagship projects, each with a trade-off-centred case study and checkable proof | [data] CoderPad 2026; [expert] Comeau, NN/g | showcase, hiring |
| 7 | No skill bars. Skill chips filter the projects; certifications shrink to one compact, verifiable row | [expert] Comeau and others | showcase, ui |
| 8 | English first, Polish optional. An availability line: role, UoP/B2B, city/remote, CET, start date | [data] NFJ/JJIT 2025–26 | hiring, ui |
| 9 | Accessibility (reduced motion, pause control, pinch-zoom kept, DOM overlays) as a stand-out feature | [measured] no immersive site handled any of these | perf, nav |
| 10 | A distinctive identity. Default shadcn/AI-template looks read as low effort or copied work | [anecdote] a hiring manager rejected a candidate over downloaded templates; [opinion] Krebs on AI-slop patterns | spectrum, hiring |

## 2. The recommended concept (draft, pending user decisions)

**"A fast, complete website with one astonishing moment, documented like an engineering project."**

- **3-second impression:**
  - The hero paints instantly in HTML: name, role, a one-line proof, availability, and Contact / CV / View work.
  - The signature visual fades in after LCP.
  - The first project card peeks above the fold.
- **1-click usability:** labelled header everywhere, a contact drawer with Copy email + CV + live local time, ⌘K for power users, and a HUMAN/TEXT mode toggle that leads to a plain mirror of the site. The text mode is also the low-power fallback and is readable by AI screeners.
- **Signature moment:** one idea, executed perfectly, tied to the art direction. Candidates for the Blueprint direction:
  - **(a) Exploded-view hero.** An axonometric line-drawing of a real shipped system assembles under the cursor or on scroll, with callouts that link to case studies. On mobile it's lower-DPR or a pre-rendered loop.
  - **(b) Sheet transition.** Clicking a project card makes the drawing "ink in" and morph into the case-study hero (View Transition plus a shader on the image only).
  - **(c) Optional `/explore` hub.** A small 3D space whose portals link to the same `/work/<slug>` URLs. This keeps the old "space" identity without the linear trap.
- **Proof layer:** the per-project template in §4. The portfolio itself becomes case study #0, written up as "How I built an immersive site that scores 90+ on mobile": perf budget, tiers, a11y, Lighthouse CI.

## 2b. What the Awwwards visual track adds (20 award-winning dev portfolios)

- **Awards don't predict usability.** The 4 game- or gate-style sites averaged a *higher* SOTD score (7.57) and a higher jury Usability score (7.25) than the 3 most practical sites (7.26 / 6.98).
  - Awwwards' published weights are Design 40 / Usability 30 / Creativity 20 / Content 10. The jurors are designers and developers exploring on desktop.
  - Usability was the lowest of the four sub-scores on 39 of 43 scraped pages. Accessibility is the weakest developer sub-score (6.87); Animations is the strongest (8.15) [measured].
- **Stunning and practical together** (Wow ≥ 4 and Practicality ≥ 4, only 4 of 20):
  - **Edoardo Lunardi.** OS windows over a dithered WebGL field, usable at 0.7 s, a URL per project, and a credits table per project: [DESIGN] others / [DEVELOPMENT] me / [STACK].
  - **Jesper Landberg.** A 3D carousel whose cards are real links, a FEATURED/FULL plain-list toggle, a separate vertical layout on mobile, and `/llms.txt` as a CV for AI assistants.
  - **Antoine Wodniack.** A cursor-warped 2D line canvas; the whole site is 0.48 MB, with "Hire me" visible at every breakpoint.
  - **Stefan Vitasović.** One consistent redaction-glitch effect, with email always visible.
  - The most hire-shaped site is **Clément Grellier**: a bottom tab bar, an `/overview` skim route, and an About page written as a CV.
- **Immersive but navigable, done right:**
  - Rafa Heras: "Enter directly →" skip, a "Back to the room" link, and a 0.38 MB tile hub on mobile.
  - Hiroto Sato: 3D signs work as the menu, with a twin HTML nav.
  - Lusion: WebGL framed inside a card on a normal page.
- **Recurring failures:** intros that block clicks (Corentin's page looked ready but ignored clicks for about 24 s); zero HTML links (Samsy, Jordan, Bruno's landing); WebGPU-only rendering with no fallback, landscape-only on mobile (Kris). On throttled mobile, 9 of 20 sites weren't usable within 10 s.
- **Weight comes from media, not JS.** JS was ≤ 1.2 MB everywhere; video previews and 3D models made up the rest. Budget posters, play-in-view only, and load only the active card ±1.
- **Adds to the concept:**
  - (a) a per-project **credits table** showing what *I* did;
  - (b) a FULL/plain-index toggle beside any 3D index;
  - (c) `/llms.txt` + text mode;
  - (d) on mobile, a *different composition* rather than a shrunk scene;
  - (e) "one signature effect is enough". A framed shader (Lusion card) or a 2D canvas (Wodniack) can carry the wow at near-zero cost.

## 3. Art-direction shortlist (user's call; scores from the themes track, weighted with practicality 2.5× and wow 2×)

| Option | Pitch | Score / 55 | Main risk |
|---|---|---|---|
| **Living Blueprint** | The site is a drawing set. The title block always shows name, role, availability, email and CV. Each case study is a sheet whose architecture diagram draws itself, then cross-fades into the real screenshots. Stack = bill of materials; revisions = release history | 49 | A timid version collapses into the generic "Vercel grid" look; needs one real diagram per project |
| **Drafting Table** (Blueprint + Workbench) | A cutting-mat or drafting-table stage. Each shipped project is a pre-rendered "part" with a part number; clicking it opens the part's blueprint sheet, which resolves into the real UI | hybrid of 49 + 42.5 | Making 8–12 object renders look consistent |
| **Tactile Dossier** | Paper and print editorial system. Each case study is a filed report, with a "machine layer" that reveals the real diffs, waterfall and Lighthouse numbers | 42.5 | Without the code layer it reads as a designer portfolio |
| **Sketchbook that inks itself** | An engineer's notebook: pencil wireframes paint into the shipped UI, with margin notes explaining decisions | 41.5 | Keeping one consistent hand-drawn style without an illustrator |
| **Space, reborn** (continuity with the old site) | Keep the cosmic identity, but as Blueprint A+: a fast DOM site with one orbital signature scene and an opt-in `/explore` hub | not scored | The space theme is common in three.js portfolios; diorama-class production cost |

Examples to open: `inspirations/img/theme-blueprint-ciechanowski.jpg`, `theme-blueprint-teenage.jpg`, `theme-real-oryzo.jpg`, `theme-paper-wildy-riftian.jpg`, `theme-paper-niccolo-miranda.jpg`, `theme-hand-itom.jpg`, `theme-obj-ishikawa.jpg`.

## 4. Per-project template (from the showcase track)

- **Card:** outcome line · context tag (`Client work · via <software house>` / Product / OSS / Side) · role + team · year · ≤ 5 stack chips · 1 proof chip · muted loop · Live / Case study / Code.
- **Case study:**
  1. TL;DR box
  2. What and for whom
  3. Before-state
  4. What I owned
  5. Constraints
  6. **2–3 decisions with rejected options**
  7. Architecture SVG
  8. The hard part (≤ 15 lines of code or a live mini-demo)
  9. Results + how they were measured
  10. What I'd do differently

  Write the headings as questions.
- **NDA ladder:** L0 written permission → L1 public facts → L2 anonymised → L3 rebuild the hard part on fake data → L4 process only → L5 "on request". Label each project's NDA status.

## 5. Conflicts between tracks (resolve in planning)

| # | Conflict | Positions | Proposed resolution |
|---|---|---|---|
| C1 | Size of the lazy 3D chunk | perf: ≤ 200 KB (plain three) or ≤ 250 KB (R3F); stack: ≤ 450 KB | Cap at **~300 KB gz** with R3F and minimal drei. Load only on Mid/High tiers, after LCP and idle. Re-measure in a spike; switch to vanilla three or OGL for the hero if TBT goes over budget |
| C2 | React `<ViewTransition>` readiness | stack: "works in App Router with no config"; nav: React docs examples still use a 19.3 canary | Verify in the first spike. Fallback: `document.startViewTransition` with the router, or the Motion `AnimateView` helper |
| C3 | Lenis smooth scroll | stack: desktop only; nav/perf: native scroll preferred, Lenis acceptable because it eases native scroll and respects reduced motion | Default to native scroll. Lenis is an opt-in, desktop-only experiment, removed if it hurts INP or a11y |
| C4 | Vercel Hobby terms | Non-commercial only; advertising freelance services counts as commercial | Depends on decision D5 |

## 6. Decisions only the user can make

| # | Decision | Why it matters | Default if skipped |
|---|---|---|---|
| D1 | **Target role(s):** product frontend, full-stack, design engineer, creative/WebGL developer, or a mix | Sets the spectrum band and how loud the signature moment is (Poland: 10 three.js offers vs 1,300 React) | Frontend / full-stack product engineer with visible 3D craft [assumption] |
| D2 | **Art direction:** pick 1–2 from §3 to prototype | Taste; drives every later design page | Living Blueprint [assumption] |
| D3 | **Project inventory:** which real-world projects, live links, metrics, NDA status; permission from the software house | Projects are the product; NDA status sets each project's rung on the ladder | — (blocking) |
| D4 | **Languages:** EN only, or EN + PL | Routing, content effort | EN first, PL later [assumption] |
| D5 | **Freelance offer on the site?** | Vercel Hobby vs Pro/Cloudflare; copy | Employment only → Vercel Hobby [assumption] |
| D6 | **Analytics:** none, or cookieless (Plausible / Umami / Vercel / Cloudflare) | Polish PKE art. 399 has no analytics exemption | Cookieless + privacy notice [assumption] |
| D7 | **Deadline** for job hunting | Scope of v1 vs later layers (`/explore`, PL) | Unknown |

## 7. Explicitly rejected (and why)

| Rejected | Why | Track |
|---|---|---|
| Fully immersive world as the home page | Gated or blank at 3 s, 5–19 MB, contact hidden; "terrible as an actual home page" (HN); the genre is saturated | spectrum, perf, themes |
| Linear scroll-driven camera journey | The old site's failure; scroll-jacking errors | nav |
| Disabling or degrading content on mobile | Below today's bar | perf |
| WebGPU-first renderer | Experimental per the three.js manual; R3F v10 alpha; coverage gaps | perf, stack |
| Spline runtime, Rapier physics | ~1 MB and ~1.6 MB gz | stack, perf |
| Theatre.js, TanStack Start, SvelteKit 3 (now) | Dormant / RC with a fresh CVE / 4 days old | stack |
| AI chatbot as a core feature | Hallucination risk, no recruiter-side evidence | showcase |
| Skill bars, logo walls, typewriter hero, custom cursor, magnetic everything, name marquee, "Hello" preloader, text scramble | Named clichés in 2025–26 | spectrum, ui |

## 8. Next steps

1. User answers D1–D7 (D3 is blocking for content; D1–D2 for design).
2. Run `/start-project-info` Phase 0+ using this folder as the research input. Write `project-brief.md`, `requirements.md`, `structure.md`, `design-references.md`, `design.md` and `technologies.md` from it.
3. Spikes before the full build:
   - (S1) Next 16.3 + persistent R3F canvas + View Transition card→case: measure TBT and LCP on the Lighthouse mobile profile.
   - (S2) A signature-moment prototype in the chosen art direction, on Mid and Low tiers.
4. Send the NDA permission request to the software house now, since it has the longest lead time.

Not covered: real-device testing (everything here is lab or emulated); user testing with actual recruiters (recommend 5 quick tests once a prototype exists); FWA / CSS Design Awards (the shared search budget ran out, so the research used Awwwards only); the user's real project inventory (D3), which was deliberately left to Phase 0. Caveat: all timings are single runs on one machine shared by 9 agents, so read them as rankings, not absolutes.
