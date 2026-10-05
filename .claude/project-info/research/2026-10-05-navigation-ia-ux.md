# Navigation, IA & UX Evidence: Fast Paths Without Losing the "Experience"

Date: 2026-10-05

Scope: how to fix the old portfolio's problems (linear scroll through a three.js scene, contact and certifications reached last, mobile disabled) while keeping an immersive feel. Evidence tags: [data] = study or measurement by others, [expert] = named practitioner or researcher, [doc] = spec or vendor documentation, [anecdote], [opinion], [measured] = measured for this report (Playwright 1.63, headless Chromium, 2026-10-05, desktop 1440×900 plus iPhone 13 emulation, about 9 s settle time, one run per site).

## TL;DR: implications for this portfolio

1. **Flip the default: content first, immersion optional or ambient.** The old site made the 3D journey the only way to reach content. NN/g's advice on animated intros is to let users choose them and "don't make it the default" [expert, 2011]. Users hidden behind a gate tend to look for the skip button [expert, 2011]. In a 2026 controlled study (n=20), scrolljacking gave significantly more errors and less sense of control, and participants asked for "Go to top/bottom"-style jumps [data].
2. **Keep the main nav visible, with text labels, on desktop.** Labels: Work · Experience · CV · Contact. Hiding navigation "cut discoverability almost in half". On desktop, hidden menus were used in 27% of cases against 48–50% for visible nav, and tasks took at least 39% longer [data, n=179, 2016]. Better icon recognition in 2025 "doesn't necessarily mean task times or success rates… have changed" [expert, 2025]. Icon-only nav, as on bruno-simon.com, is mystery meat [measured; NN/g 2014].
3. **Contact and CV one click from anywhere.** Use a persistent header CTA ("Contact", or a copy-email button) plus a "CV" link (HTML page with a PDF download). This directly removes the old "contact takes forever" failure. Good examples: Lusion's persistent "LET'S TALK" button, David Heckhoff's "GET IN TOUCH" button, and Cyd Stumpel's "Copy email" as the second tab stop [measured].
4. **Give each project its own page with a real URL** (`/work/<slug>`), so recruiters can paste a deep link into an email or ATS note. Use the History API, never `#` fragments, and real `<a href>` links. Google: "don't use fragments to load different page content" [doc, 2026]. Native back and forward then work for free.
5. **Create the "experience" feel with continuity, not gating.** Shared-element View Transitions (project card → case-study hero) are cross-browser for same-document transitions (Baseline since Oct 2025). Cross-document transitions work in Chrome/Edge 126+ and Safari 18.2+ but not yet in Firefox stable [doc]. In a 2008 review of overview+detail and zoom interfaces, animating the overview→detail transition "can dramatically reduce the cognitive load" [data-review, 2008].
6. **If you use a 3D "hub world", make it a hub-and-spoke overview, never a linear track.** Every portal is a URL. Content renders in DOM overlays or pages. A DOM nav sits above the canvas. Every page loads directly without replaying the intro. Free-roam navigation (driving or walking) is fun but makes reaching any one piece of content take an unknown amount of time and skill [anecdote: HN thread, ~Dec 2025].
7. **Above the fold:** name, role, a one-line proof of shipped work, the three CTAs (View work / CV / Contact), visible nav, and a peek of the first project. Users spent 57% of viewing time above the fold and 74% in the first two screens [data, NN/g 2018, n=120]. Rank projects before certifications.
8. **Mobile gets parity, not a "disabled" screen.** Show ≤4 top-level links visibly (NN/g) or use a 3–5 item labeled bottom bar (Material 3). Never capture one-finger vertical swipes on a full-screen canvas: use `touch-action: pan-y` and cooperative two-finger gestures. Never use `touch-action: none`, which can block zoom [doc].
9. **Motion budget:** UI transitions 100–400 ms. Ease-out for entering, ease-in for exiting [expert, NN/g 2020]. Honor `prefers-reduced-motion` (Lenis does by default). Provide a pause control for ambient WebGL motion that runs longer than 5 s alongside content (WCAG 2.2.2, Level A) [doc].
10. **Accessibility baseline the inspected immersive sites mostly lack:** skip link first, landmarks, one `h1`, focus moved and route announced on client-side navigation, all text in the DOM rather than in WebGL, single-key shortcuts that can be turned off or remapped (WCAG 2.1.4), and sticky header/bottom bar never covering focus (WCAG 2.4.11, fix with `scroll-padding`). 8 of the 9 sites probed for landmarks had zero `<main>` landmarks [measured].
11. **Avoid on the main path:** scrolljacking or virtual scroll, start/begin gates, long loaders, horizontal scroll triggered by vertical gestures, auto-advancing carousels, and custom cursors (which ignore OS cursor-size settings on Windows [expert, 2025]).
12. **Recommendation: Blueprint A+** (details in §7). Overview home plus one page per case study. A WebGL/shader "stage" as the hero. Shared-element transitions between cards and case studies. A ⌘K palette as a secondary accelerator. Optionally, later, an opt-in `/explore` hub world that deep-links back into the same pages.

---

## 0. The old site's failure modes mapped to evidence

| Old portfolio behaviour | Why it hurts hiring outcomes | Evidence |
|---|---|---|
| Linear scroll is the only path, contact is last | Navigation time grows with section count. Recruiters doing a specific task (finding contact or CV) get frustrated | NN/g: "Task-oriented users showed significantly less patience than exploratory users" [expert, 2023]. Voinea & Murano: participants wanted fast jumps, one said "I would have given up and left the page by now" [data, n=20, 2026] |
| 3D scene drives the scroll (scrolljacking) | Disorientation, scroll looks broken | NN/g: "majority… at least mildly disoriented"; some took it for a bug [expert, 2023] |
| Mobile disabled | Many first visits come from a link opened on a phone (assumption, not measured). A disabled site means zero signal | NN/g: scrolljacking issues are "exacerbated" on mobile [expert, 2023] |
| Content outdated, inside WebGL | Not indexable, not scannable, unreadable by screen readers | Google: links only discovered as `<a href>` [doc, 2026]. Inspected canvas-only sites expose 0 links or tab stops [measured] |

## 1. UX evidence

### 1.1 Scrolljacking, parallax, smooth-scroll libraries

| Finding | Tag / date | Implication |
|---|---|---|
| NN/g usability study: most participants were at least mildly disoriented by scrolljacking. Long scrolljacks were worse. Some read it as a bug. Task-oriented users were least tolerant. Guidance: only with functional value, never horizontal under vertical gestures, little text, avoid on mobile, mix with normal-scrolling sections. The study's n is not reported | [expert] NN/g, Sara Paul, 2023-08-06 | Recruiters are task-oriented, so no scrolljacking on the main path |
| Controlled experiment, scrolljack vs normal prototype, n=20 (ICT-literate, ages 18–50). Errors significantly higher with scrolljacking (Wilcoxon z=−3.842, p<.001, large effect). Sense of control significantly lower (p=.017). Speed difference not significant (p=.156). 13/20 preferred no scrolljacking. Participants tried to drag the scrollbar, missed find-in-page, and wanted "Go to the top / Go to the bottom" helpers | [data] Voinea & Murano, CHIRA 2025 proceedings, published 2026-02-13 | Native scroll keeps scrollbar dragging, Ctrl/⌘+F and keyboard paging. Provide an index or jump nav |
| Parallax vs non-parallax site: participants were faster on average without parallax and preferred parallax, but neither difference was significant | [data] Murano & Pandey, HCII 2024 LBP, published 2024-12-17 | Parallax is a cosmetic choice, not a usability gain. Fine as an accent under reduced-motion rules |
| Lenis eases the native scroll position, so the scrollbar, anchors, find-in-page and keyboard keep working. It respects `prefers-reduced-motion` by default (smoothing off, programmatic scroll instant). `syncTouch` defaults to false, so mobile scroll stays native. Limits: no CSS scroll-snap (use `lenis/snap`), 60 fps cap in Safari, no smoothing over iframes | [doc] darkroomengineering/lenis README, v1.3.x, accessed 2026-10-05 | If smooth scroll is wanted, use native-scroll easing (Lenis-style), never transform-based virtual scroll |
| On lusion.co, `window.scrollY` stayed 0 after 6 wheel ticks while content moved (`html, body {overflow:hidden}`), so scrolling is virtual, not native. On david-hckh.com and cydstumpel.nl (both use Lenis), native `scrollY` moved 2269 px and 1500 px | [measured] 2026-10-05 | Two award-level approaches. Only the native one keeps browser affordances |

### 1.2 Long single page vs multipage; the fold

| Finding | Tag / date | Implication |
|---|---|---|
| Eyetracking, n=120, 130k+ fixations, 1920×1080: 57% of viewing time above the fold, 74% in the first two screenfuls, 81% in the first three. In 2010 the above-the-fold share was 80% | [data] NN/g, Fessenden, 2018-04-15 | Put the hiring-critical content in the first 1–2 screens. Avoid "false floors" so people know to scroll |
| NN/g's 2023 scrolljacking article still quotes "80% of their time… above the page fold", the 2010 figure. Its own 2018 replication found 57% | [expert], noted inconsistency | Cite 57% / 74% (2018), not 80% |
| In-page links "do not meet users' mental model for a link". They are acceptable as a TOC or back-to-top, and "the benefit… increases as screen size decreases". They must be labelled ("On this page") | [expert] NN/g, Schade, 2017-05-07 | If a long home page is used, label the section index explicitly |
| In-page TOCs help users form a mental model and skip to relevant sections (9/11 participants engaged). NN/g warns one-page designs with in-page links are "problematic" on mobile because of long scrolling and load cost | [data, small n] NN/g, Wang, 2023-10-01 | Supports page-per-project over one giant page |
| The "3-click rule" is "not supported by data in any published studies". Information scent and wayfinding matter more than click counts | [expert] NN/g, Laubheimer, 2019-08-11 | Count clicks only as a sanity check. Strong labels matter more |
| No rigorous study comparing one-page and multipage designs for portfolios was found. Vendor blogs (Wix, Slickplan and others) give opinion only | none found | Treat the choice as a trade-off decision (see §2.1) |

### 1.3 Persistent, sticky and hidden navigation

| Finding | Tag / date | Implication |
|---|---|---|
| 179 participants, 6 live sites, desktop and phone. Hidden nav "cut discoverability almost in half". Desktop: hidden menus used in 27% of cases vs visible 48% and combo 50%. Hidden nav ≥39% slower, 21% harder (perceived). Mobile: hidden 15% slower than combo. Use 4 or fewer top-level links visibly on mobile | [data] NN/g, Pernice & Budiu, 2016-06-26 (age: 10 yrs) | Visible labeled nav on desktop. On mobile, show ≤4 items visibly |
| Desktop discoverability depends on position (top or left), contrast, and labels such as "Browse" instead of an icon | [data] NN/g, 2016-07-24 | If a hamburger is unavoidable (e.g. over a canvas), label it "Menu" like lusion.co [measured] |
| 2025 update: the hamburger icon is now widely recognized, but "Increased recognizability doesn't necessarily mean that task times or success rates… have changed". Hidden nav "still adds interaction cost" | [expert] NN/g, Kaplan, 2025-06-13 | The 2016 conclusion still holds |
| Sticky headers help when they are small (content-to-chrome ratio about 13:1 is fine, 2:1 is bad), opaque or high-contrast, minimally animated, and "partially persistent" (hide on scroll down, reappear on scroll up) with about 300–400 ms motion | [expert] NN/g, Laubheimer, 2021-04-04 | Use a slim sticky header that hides on scroll down and reappears on scroll up, with the Contact CTA always in it |

### 1.4 "Creative" or mystery-meat navigation and icons

| Finding | Tag / date | Implication |
|---|---|---|
| "A text label must be present alongside an icon". For navigation "labels are particularly critical. Don't rely on hover". Only home, print and search icons are near-universal | [expert] NN/g, Harley, 2014-07-27 (age: 12 yrs) | No icon-only nav and no hover-reveal labels |
| bruno-simon.com (folio-2025): the menu and map triggers are icon-only buttons. Menu items (home, options, controls, achievements, circuit, whispers…) are `<button>`s containing only `<img>` elements with no `alt` attribute. 0 visible links, 0 landmarks, 0 `h1`. The URL never changes | [measured] 2026-10-05 | A beautiful, famous site that a recruiter cannot scan. Use it as inspiration for craft, not for information architecture |
| Mystery-meat navigation: the term was coined in 1998 by Vincent Flanders for links whose destination is only revealed on hover or click | [expert] (Wikipedia summary) | Avoid making "orbs or planets as nav" the only nav |

### 1.5 Carousels

| Finding | Tag / date | Implication |
|---|---|---|
| ≤5 frames. Show how many frames there are and where the user is. "Dots are a particularly poor cue on mobile". Don't auto-forward on mobile. Eyetracking: animated ads looked at 27% of the time | [expert] NN/g, Pernice, 2013-09-14, last reviewed 2026-08-07 | Show projects as a grid or list. If a horizontal rail is used: no autoplay, visible count, labeled arrows |

### 1.6 Scanning patterns

| Finding | Tag / date | Implication |
|---|---|---|
| Patterns: F-pattern (least effective), spotted, layer-cake (headings first), commitment (full reading when motivated). Fix: chunk content, use meaningful subheadings and bold keywords, avoid walls of text | [expert] NN/g, Pernice, 2019-08-25. F-pattern revisited 2017 | Case studies should use layer-cake headings: Problem → Role → Stack → Outcome (numbers bold) → Links |
| Recruiters skim resumes for an average of 7.4 s. Simple layouts with clear section headings and an F/E-pattern did best; multi-column cluttered layouts did worst | [data] Ladders 2018 via HR Dive (2018-11-08). Sample reported elsewhere as 30 recruiters; small n, not peer-reviewed, resumes rather than portfolios | Treat as directional only: put a 1-screen summary at the top of the home page and of each case study |

### 1.7 Motion: durations, purpose, vestibular issues, reduced motion

| Finding | Tag / date | Implication |
|---|---|---|
| UI animations 100–500 ms, typically 100–400 ms. Simple feedback about 100 ms. Large screen changes 200–300 ms. "At 500ms, animations start to feel like a real drag". Ease-out for entering, ease-in for exiting. Frequent animations should be shorter | [expert] NN/g, Laubheimer, 2020-02-09 | Page/VT transitions 300–400 ms, hovers about 100–150 ms. Signature moments may be longer, but only once and skippable |
| Response-time limits: 0.1 s feels instant, 1 s keeps flow of thought, 10 s keeps attention | [expert] Nielsen 1993, updated 2014 | Nav clicks must respond within 0.1 s, even if a camera flight follows |
| WCAG 2.3.3 (AAA): interaction-triggered motion "can be disabled, unless… essential". Parallax is "often non-essential" | [doc] W3C Understanding WCAG 2.2 | Global "reduce motion" toggle plus honoring the OS setting |
| WCAG 2.2.2 (A): moving content that starts automatically, lasts >5 s and runs in parallel with other content needs pause, stop or hide | [doc] W3C | An ambient WebGL background next to text arguably qualifies. Add a pause control |
| Vestibular nuance: the often-quoted "35% of adults 40+ have vestibular dysfunction" comes from NHANES 2001–04, where 35.4% of US adults over 40 failed a balance test (foam surface, eyes closed). That is subclinical dysfunction, not measured sensitivity to on-screen motion | [data] Agrawal et al. 2009 as cited in Bermúdez Rey et al., Frontiers in Neurology, 2016-10-03 | Real but often overstated. Reduced-motion support is cheap, so do it anyway |
| React `<ViewTransition>` docs: "React doesn't automatically disable animations… We recommend always using `@media (prefers-reduced-motion)`" | [doc] react.dev, accessed 2026-10-05 | Gate `view-transition-name`s under `prefers-reduced-motion: no-preference`, as Cyd Stumpel does [expert, 2026-07-08] |

### 1.8 Preloaders, intro screens, "skip intro"

| Finding | Tag / date | Implication |
|---|---|---|
| Splash screens: users "hate these designs so much that they can't overcome their negative first impressions". In testing, "the user immediately clicked away" | [expert] Nielsen, 2011-03-13 (age: 15 yrs) | No start or begin gate before the content |
| Progress indicators: in a University of Nebraska–Lincoln study, people who saw an animated progress bar waited about 3× longer. Spinners suit waits of 2–10 s, percent-done bars ≥10 s, nothing for <1 s | [data via expert] NN/g, Sherwin, 2014-10-26 | If WebGL assets load, render DOM content immediately and show progress only inside the hero stage |
| "53% of mobile site visits are abandoned if a page takes longer than 3 seconds". Primary source: DoubleClick (Google), *The Need for Mobile Speed*, Sept 2016, built on aggregated, anonymized publisher analytics data from 2015–16. Exact sample details could not be verified here. It describes 2016 networks and ad-supported sites | [data, industry, methodology only partly traceable] | Use as a direction only. Do not quote it as a portfolio statistic |
| Google/SOASTA 2017 neural-net model: as load time goes 1→3 s, bounce probability +32%; 1→5 s +90%; 1→10 s +123% | [data, model, industry] Think with Google, 2017 | Same direction: the hero must not block LCP on WebGL |
| Inspected immersive sites behind a gate: bruno-simon.com ("Click to start"), henryheffernan.com (BIOS loader → START → "Click anywhere to begin"), messenger.abeto.co ("BEGIN"), jesse-zhou.com (loader at 16% after 10 s, then START). rleonardi.com/interactive-resume was still on "LOADING" after 6 s on emulated iPhone 13 | [measured], single run, headless (GPU-less timing is pessimistic) | 4 of the 11 inspected URLs gate content behind a start click. Don't copy this |

### 1.9 Custom cursors

| Finding | Tag / date | Implication |
|---|---|---|
| CSS custom cursors ignore the Windows cursor-size accessibility setting (macOS respects it). Many are about 2× normal size. Problems: unclear hotspot, poor contrast, JS cursors with `cursor:none` breaking with the Fullscreen API on macOS. If used at all: default size, obvious hotspot, contrast, and only under `@media (any-hover:hover) and (pointer:fine)` | [expert] David Bushell, 2025-10-27 | Skip the custom cursor, or limit it to the hero canvas as a hover effect while keeping the system cursor |

## 2. Portfolio-specific IA

### 2.1 Single page vs page-per-project

| Criterion | Single long page | Page per project (`/work/<slug>`) |
|---|---|---|
| Recruiter can paste a link to one project | Only via `#anchor`, which is fragile with JS-driven scenes | Yes, plus a per-page `<title>` and OG image for email, Slack or LinkedIn previews (inference) |
| SEO | One URL competes for everything | Each project can rank. Google wants History API routes and `<a href>` [doc, 2026] |
| Back button | Anchors create confusing history entries (NN/g: Back should return to the previous position) | Native |
| Mobile length and performance | Very long, loads everything. NN/g calls this "problematic" [2023] | Each page is light |
| Narrative flow | Strong, one continuous story | Needs transitions for continuity (§4) |
| Build cost | Lowest | Low with SSG/MPA. Medium for SPA with route focus management |

Verdict [opinion grounded in the evidence above]: a short overview home with a teaser card per project, plus one page per case study. Experience, skills and certifications can stay as home sections with anchors, as long as the header nav reaches them.

### 2.2 Section order and above the fold (home)

Order [opinion; based on NN/g 2018 attention data, layer-cake scanning, and the user's "shipped work > degree" thesis]:

1. **Hero:** name, role, one-line proof ("Shipped X for Y, used by Z"), location/remote, availability, CTAs **View work · CV · Contact**. The 3D/shader stage goes here, behind or beside the text, with DOM text on top.
2. **Selected work (3–4 real projects):** outcome first, live link, repo link, stack chips. The first card must peek above the fold so there is no false floor.
3. **Experience:** compact timeline, roles linked to the projects they produced.
4. **Skills:** grouped and tied to projects as evidence ("used in → Project A"), not progress bars.
5. **Certifications:** compact row, reachable from the nav even though it sits low.
6. **About (short) + Contact (repeated).**

Above the fold (≥ 360×640 mobile, 1440×900 desktop): name, role, proof line, the 3 CTAs, visible nav, and the start of project card 1.

### 2.3 Fast paths

| Mechanism | Evidence | Recommendation |
|---|---|---|
| Always-visible labeled nav | NN/g 2016 / 2025 [data/expert] | Required. 4–5 items: Work, Experience, About, CV, plus a Contact button |
| Persistent Contact CTA + copy email | Measured on Lusion, David Heckhoff, Cyd Stumpel [measured] | Required. Copy-to-clipboard with an `aria-live` "Copied" message. Also a real `mailto:` |
| CV always reachable | Ladders 2018 [data, weak] | "CV" in the nav goes to `/cv` (HTML, indexable) with a PDF download button. Robby Leonardi's 2013 game résumé also offers a PDF [measured] |
| ⌘K command palette | No portfolio-specific research. Practitioner guides only (setproduct, Oct 2025) [opinion] | Optional accelerator. Show a visible "⌘K" or "Search" button. Must follow the ARIA combobox/listbox pattern. Never the only route (it is hidden navigation by definition) |
| "Recruiter / TL;DR mode" toggle | No study found [opinion] | Better: make the default view the recruiter-friendly one (summary on top of each page), so the immersive layer is the opt-in. A toggle adds a decision before the content |
| Section index / scrollspy / progress | NN/g in-page links 2017/2023 [expert/data]. Voinea & Murano 2026 participants wanted navigational feedback and quick jumps [data] | Case-study pages get a sticky "On this page" index on desktop and a collapsible version on mobile. Home gets nav highlighting of the current section |
| Minimap of a 3D world | Overview+detail is "preferred over other techniques" in several studies; costs are screen space and integrating two views [data-review, Cockburn et al. 2008] | Only relevant to Blueprint B. The overview can be a 2D DOM list or grid that doubles as the accessible nav |

## 3. Immersive navigation models

### 3.1 Model comparison

| Model | How you move | Time to Contact or a specific project | Deep links | Mobile | Hiring risk | Evidence |
|---|---|---|---|---|---|---|
| **Linear track** (old site; igloo.inc) | Scroll drives the camera along a path | Grows with section count | Rarely | Poor (scrolljacking on touch) | High | NN/g 2023; Voinea & Murano 2026 |
| **Free-roam** (bruno-simon.com) | Drive or walk to areas, map key M | Unbounded, depends on skill | None (URL constant) [measured] | Hard (touch-control mode exists) | High for recruiters, great for creative-dev roles | HN: "functions poorly as a website… a very well made little game" [anecdote, ~Dec 2025] |
| **Hub-and-spoke / hub world** (rooms, portals, objects) | Central scene → portal → room → back to hub | 1–2 actions | Possible per room | Medium | Medium | NN/g: hub suits single-task sessions, but "requires returning to homepage" between tasks [expert, 2015] |
| **Overview + zoom** (map of nodes → zoom into one) | See everything, click to zoom into detail | 1 | Natural (each zoom level = URL) | Good if the overview collapses into a list | Low–medium | Zooming "is easy to do badly". Animating the transition "can dramatically reduce the cognitive load" [data-review, 2008] |
| **DOM-first pages + 3D stage** (david-hckh.com, lusion.co) | Normal nav. 3D as hero, backdrop or transition | 1 | Yes [measured] | Good | Low | NN/g visible nav [data]; measured examples |

### 3.2 How real immersive sites let you jump [measured 2026-10-05]

| Site | Nav model | Visible DOM nav? | Real URL per view? | Path to contact | Gate / loader | Mobile | A11y signals |
|---|---|---|---|---|---|---|---|
| bruno-simon.com (folio-2025, WebGPU with fallback notice) | Free-roam world. Icon-only menu and map buttons, keys M (map) and R (respawn) | Icon-only buttons only | No, URL never changes | Inside menu panels (Discord links). 0 visible `<a>` | "Click to start" | Renders, with Mobile/Tablet control mode | 0 landmarks, 0 `h1`, `<img>` without `alt` in menu buttons, single-key shortcuts (check WCAG 2.1.4) |
| henryheffernan.com | 3D desk; "computer" opens an OS-style site in an `<iframe>` | None on the outer page (0 tab stops) | Outer: no. Inner `os.henryheffernan.com` has `/about /experience /projects /contact` | Via the inner OS site | BIOS loader → START → "Click anywhere to begin" | Same gates | Escape hatch: the inner DOM site is reachable directly, with 4 labeled links in tab order |
| lusion.co (studio) | DOM + WebGL, virtual scroll | Labeled "MENU" button + persistent "LET'S TALK" CTA (desktop) | Yes, `/projects/devin_ai` with its own `<title>` | 1 click | None | Labeled "Menu button", Contact visible | Fresh tab already had `history.length` = 3. Back from a deep-linked project landed on the same project (trailing-slash URL) rather than the previous page. No reduced-motion CSS found |
| activetheory.net (studio) | WebGL; pill nav "WORK — CONTACT" | Yes, 2 text links | No: links are `href="#"` | 1 click | None (cookie banner) | Native scroll on mobile | 0 landmarks, 0 `h1` |
| igloo.inc | Linear "Scroll down to discover" track | No | No | Not found | None | Same | Empty `body.innerText`, 0 links, 0 tab stops in the light DOM (text drawn in WebGL or a closed shadow root) |
| messenger.abeto.co | Game-like planet (art piece, not a portfolio) | No | No | n/a | "BEGIN" | Same | 0 DOM text, 0 tab stops |
| david-hckh.com (WebGL dev portfolio) | 3D room hero + normal page (Lenis, native scroll) | Pill nav ABOUT / PROJECTS / CONTACT + orange "GET IN TOUCH" `mailto:` | Yes, `/project/cubewar` etc. | 0–1 click | None | Top nav buttons hidden at 390 px (only the language toggle visible) | Reduced-motion CSS present. Nav items are `<button>` rather than links (not crawlable or shareable) |
| cydstumpel.nl (creative dev, no WebGL) | Normal MPA + swup + native view transitions | Yes: About, Archive, Speaking, Blogs, Contact | Yes, `/work/<slug>/` | "Copy email" is the 2nd tab stop. Header shows "Available October 2026" | None | Labeled "Menu" button | "Skip to content" is the 1st tab stop. `nav` ×2, `main`. Reduced-motion CSS |
| rleonardi.com/interactive-resume (2013 classic) | Linear side-scroll game résumé | No | No | Social links + **PDF résumé link** | Loader (still on "LOADING" after 6 s on emulated iPhone 13) | Same content | The PDF is the escape hatch |
| jesse-zhou.com | 3D scene | No (START only) | No | n/a | Loader at 16% after 10 s, then START | n/a | n/a |

Screenshots: `C:\Users\Mucha\Desktop\new-portfolio\.claude\project-info\research\inspirations\img\nav-*.jpg`. The best ones to open are `nav-davidh-desktop.jpg`, `nav-lusion-wheel.jpg`, `nav-bruno-desktop.jpg`, `nav-igloo-desktop.jpg` and `nav-activetheory-desktop.jpg`.

**Pattern [measured]:** the sites that work as places to get hired (david-hckh.com, the inner henry OS, cydstumpel.nl) all expose a DOM path with labeled links and real URLs. The award-style "experiences" (igloo, messenger, bruno) expose almost nothing to the DOM.

### 3.3 Escape-hatch checklist (if any immersive layer is built)

- DOM nav and Contact CTA rendered above the canvas and **interactive before WebGL finishes loading**.
- Every scene or room has a URL (`/work/x`, not `#x`). Direct loads land in that scene with no intro replay. Back and forward animate the camera back.
- "Skip to content" link first. A visible "View as page" or "List view" toggle. A global "Reduce motion" and "Pause" control.
- Keyboard: Tab order follows the DOM overlay. Arrow or WASD control only while the canvas has focus (WCAG 2.1.4). Esc closes overlays.
- No start gate. Audio off by default.
- Low-power or no-WebGL fallback: a static poster image plus the same DOM content. Never "disabled on mobile".

## 4. Transitions: View Transitions API

| Item | Status / guidance | Tag / date |
|---|---|---|
| Same-document VT (`document.startViewTransition`) | Baseline Newly available since 2025-10-14 (Firefox 144). Firefox's first version lacks VT *types* | [doc] web.dev, 2025-10-16 |
| Cross-document VT (`@view-transition { navigation: auto; }`) | Chrome/Edge 126+, Safari/iOS 18.2+. Firefox not in stable: MDN "Limited availability… not Baseline" (page modified 2026-04-20); Cyd Stumpel (2026-07-08): "supported in all major browsers except for Firefox". caniuse lists Firefox as "partial" and global support at about 87.8% | [doc] MDN, caniuse, [expert] Stumpel |
| Mechanics | Same-origin only. Runs on push, replace and traverse (so Back animates too), not on URL-bar navigations or reloads. Skipped if navigation takes >4 s in Chrome. `pageswap` and `pagereveal` events let you set names dynamically (e.g. only the clicked card). `<link rel="expect" blocking="render">` is available but costs LCP | [doc] Chrome docs, updated 2024-04-14 |
| Shared element card → case study | Give the card image and the case-study hero the same `view-transition-name`. Keep the **same aspect ratio** in both states. Stagger with an `--order` variable. Duration about 0.4 s. Put names inside `@media (prefers-reduced-motion: no-preference)`. Put the `@view-transition` rule early in `<head>` CSS | [expert] Cyd Stumpel, 2026-07-08 |
| Why it matters for the "experience" | Animated overview→detail transitions reduce reorientation cost. Without animation, "abrupt transitions… meant that the participants had to reorient themselves with each zoom action" | [data-review] Cockburn, Karlson & Bederson, ACM Computing Surveys 2008 |
| React | `<ViewTransition>` docs examples use `react@19.3.0-canary-…-20260904`, so it is still canary. It only animates updates inside Transition, Suspense or `useDeferredValue` and waits up to 500 ms for fonts | [doc] react.dev, accessed 2026-10-05 |
| WebGL + VT | The canvas is snapshotted as an image during a transition (inference, needs testing). For a continuous 3D camera move between routes, use one persistent canvas in the app shell and animate the camera on route change, with the DOM transitioning via same-document VT | [opinion] |
| Fallback | Unsupported browsers just navigate instantly. No polyfill needed | [doc] |

## 5. Mobile IA

| Topic | Evidence | Recommendation |
|---|---|---|
| Visible vs hidden | ≤4 top-level links: show them visibly [data, NN/g 2016]. Material 3 nav bar: 3–5 destinations with icon + label [doc] | 4 items: Work · Experience · CV · Contact. Either a bottom bar or a compact top row. No hamburger needed |
| Thumb zone | Hoober 2013: 1,333 observations, 49% one-handed. Hoober 2017: 75% touch with one thumb, grips shift constantly, people prefer the screen centre. The top-corner Back button is "usually the most-used button". Targets about 7 mm in the centre, about 12 mm in corners [data/expert, UXmatters 2017-03-06] | Don't over-index on bottom placement. Keep targets big, especially in corners. WCAG 2.5.8 minimum 24×24 CSS px (AA) [doc]. Aim for 44–48 px |
| Sticky CTA | NN/g partially persistent header [expert 2021]. WCAG 2.4.11: sticky bars must not fully hide focused elements. Fix with `scroll-padding` [doc] | Hide-on-scroll-down header with a Contact pill, or a bottom bar. Add `scroll-padding-top` / `scroll-padding-bottom` |
| Sheets | NN/g bottom sheets: Back gesture must close, visible close button, don't stack, short interactions only, "do not [use] a bottom sheet to replace typical page-to-page user flows" [expert, 2023-06-11] | Case studies are pages, not sheets. A sheet is fine for "Contact quick actions" (copy email, LinkedIn, CV) |
| Gesture conflicts with WebGL | `touch-action: pan-y` keeps vertical page scroll. `touch-action:none` "may inhibit… zooming" [doc, MDN 2026-04-20]. Google Maps "cooperative" mode: one finger scrolls the page, two fingers pan the map [doc, 2026-09-28]. Lenis `syncTouch` is off by default [doc] | Hero canvas: no one-finger capture. Orbit or drag only with two fingers, or after an explicit "Explore" tap. Never trap scroll |
| Orientation | No study found | Don't lock orientation. Test 360×640 to 430×932 portrait and landscape |
| Performance as IA | Load time vs bounce [data, industry 2016/2017] | DOM content first, 3D lazy after LCP. Pause rendering off-screen and when the tab is hidden |

## 6. Accessibility of navigation

| Requirement | Source | Note for this build |
|---|---|---|
| Skip link as first focusable | WCAG 2.4.1 Bypass Blocks (A); example cydstumpel.nl [measured] | Target `#main` |
| Landmarks + one `h1` per page | WCAG 1.3.1 / ARIA landmarks | 8 of 9 probed sites had 0 `<main>` (only cydstumpel.nl had one); bruno, henry (outer), activetheory, messenger and igloo had 0 `h1` [measured] |
| Client-side route change: move focus and announce | Marcy Sutton + Fable Tech Labs, 5 sessions (NVDA, JAWS, ZoomText, Dragon, switch access), 2019-07-11: focus a skip link or other small interactive control on the new view, and append the page name to an ARIA live region [data, small n] | MPA plus cross-document VT gives this natively. In an SPA, implement it |
| All content in the DOM | Canvas text is invisible to assistive tech and crawlers. Google discovers only `<a href>` [doc] | 3D objects that act as links need DOM equivalents. `@react-three/a11y` adds focus, roles, `A11yAnnouncer` and a reduced-motion preference hook to R3F scenes [doc] |
| Single-key shortcuts | WCAG 2.1.4 (A): letter-only shortcuts must be possible to turn off, remap, or be active only on focus | Scope M/WASD-style keys to a focused canvas. Use ⌘K/Ctrl+K for the palette |
| Focus not obscured | WCAG 2.4.11 (AA) | Sticky header and bottom bar must allow for this with `scroll-padding` |
| Motion and pause | WCAG 2.3.3 (AAA), 2.2.2 (A) | Respect the OS setting, add a site toggle, pause ambient WebGL |
| Target size | WCAG 2.5.8 (AA) 24×24 CSS px | Applies to nav pills, the copy-email button and carousel arrows |

## 7. IA blueprint options

### Blueprint A: Overview home + one page per case study (MPA/SSG), 3D stage hero, shared-element transitions

```
/                     Home: hero stage (WebGL/shader, DOM text on top) → Selected work (3–4 cards) → Experience → Skills → Certifications → About → Contact
/work/                All projects (grid/list, filters optional)
/work/<slug>/         Case study: TL;DR card (role, stack, outcome, links) → sticky "On this page" → Problem / Approach / Result / Media / Code
/cv/                  HTML CV + "Download PDF"
/contact/ (optional)  or #contact section + copy-email + mailto + LinkedIn/GitHub
Header (all pages):   Name/logo · Work · Experience · About · CV · [Contact]   (+ optional ⌘K button)
```

- **Above the fold:** name, role, proof line, View work / CV / Contact, visible nav, peek of card 1. The 3D stage loads after LCP.
- **Clicks from anywhere:** Contact **1** (header CTA; the copy-email action is 1). CV **1**. Work index **1**. A specific project **1** from home, **2** from elsewhere.
- **Mobile:** 4-item labeled bottom bar or compact top row. Hero stage shows a simplified scene or poster with no touch capture. Case studies use a collapsible TOC.
- **Pros:** fastest, deep-linkable, SEO per project, native back button, accessible by default, low risk, works without WebGL.
- **Cons:** risk of looking "template-ish", so the wow has to come from the hero stage, typography, motion and transitions.
- **Evidence:** NN/g visible nav (2016/2025), attention above the fold (2018), in-page links (2017/2023), Google JS SEO (2026), Cockburn 2008 (animated transitions), real examples david-hckh.com, cydstumpel.nl, lusion.co [measured].

### Blueprint B: Hub world with portals + DOM overlay + deep links

```
/                     3D hub scene (portals/objects: Work, Experience, Skills, Certs, Contact) + DOM header nav + hero text overlay
/work/<slug>          Camera flies to portal → DOM overlay panel (desktop) / full page (mobile) over dimmed scene
/experience, /skills, /certifications, /contact   same pattern
/explore?off          "List view" = Blueprint A pages rendered without the scene
```

- **Above the fold:** the hub, the DOM nav, name, role and Contact CTA overlaid. Portals are labeled in DOM text, not only as 3D objects.
- **Clicks:** Contact **1** (DOM CTA). A project **1–2** (portal or nav, then card). The scene path is optional.
- **Mobile:** scene drops to a static or low-poly hub with portals as large labeled buttons. Overlays become full pages. Bottom bar. No one-finger capture.
- **Pros:** memorable, keeps the "space experience" lineage, hub-and-spoke instead of a linear track, still deep-linkable.
- **Cons:** 3–5× the build and QA effort (camera paths, overlay focus management, history sync, perf tiers). Hub pattern costs: you must "return to homepage" between tasks. Every portal must be labeled to avoid mystery meat. Biggest LCP and battery risk.
- **Evidence:** NN/g hub pattern (2015), Cockburn 2008 (overview+detail preferred, zooming easy to do badly), henry OS escape hatch, bruno's lack of URLs and labels [measured], HN reception [anecdote].

### Blueprint C: Single page + sticky section index + command palette

```
/                     One long page: Hero → Work → Experience → Skills → Certs → About → Contact
                      Sticky header with section links + scrollspy; ⌘K palette (jump to section/project, copy email, open CV)
/work/<slug>          (still recommended) case-study pages, or modal routes with real URLs
```

- **Above the fold:** same as A.
- **Clicks:** Contact **1** (anchor or CTA). A project **1**.
- **Mobile:** very long page. In-page links help but NN/g calls one-page mobile designs "problematic". ⌘K is irrelevant on touch.
- **Pros:** simplest mental model, a continuous narrative, scroll-driven CSS animations fit naturally.
- **Cons:** a single URL (weak deep links and SEO unless project pages are added), heavy initial load, anchor/back-button confusion, ⌘K invisible to non-dev recruiters.
- **Evidence:** NN/g in-page links (2017/2023), sticky headers (2021), scrolling attention (2018).

### Comparison

| | A | B | C |
|---|---|---|---|
| Time to contact / CV | 1 / 1 | 1 / 1 (DOM) | 1 / 1 |
| Deep link per project | Native | Yes, if built carefully | Only if project pages are added |
| Mobile parity | High | Medium | Medium |
| "Experience" feel | Medium–high (stage + transitions) | Highest | Medium |
| A11y risk | Low | High | Low–medium |
| Build/perf risk | Low | High | Low |

### Recommendation: A+ (A, with a B-style signature layered on later)

- Build **Blueprint A** as the backbone now: overview home, case-study pages, `/cv`, header CTA, cross-document View Transitions with a shared card→hero element, and a WebGL/shader **hero stage** that never gates content.
- Add **⌘K** as a visible, accessible accelerator for developer reviewers. It is a delight feature, not navigation.
- If time allows, add an **opt-in `/explore` hub** (Blueprint B in miniature). Each portal links to the same `/work/<slug>` URLs, so the immersive mode adds to the main site instead of becoming a second site. It keeps the old portfolio's "space" identity without the linear trap.
- Why: every hiring-critical action costs ≤1 click from anywhere. The evidence against hidden nav, scrolljacking, gates and fragment URLs is consistent across the 2011–2026 sources. The "experience" moves into continuity (transitions) and one signature scene, which the data says reduces reorientation cost rather than adding to it.

## Sources

| # | URL | Title | Pub date | Accessed |
|---|---|---|---|---|
| 1 | https://www.nngroup.com/articles/scrolljacking-101/ | Scrolljacking 101 (NN/g, S. Paul) | 2023-08-06 | 2026-10-05 |
| 2 | https://link.springer.com/chapter/10.1007/978-3-032-16454-4_6 (PDF: http://pietromurano.org/Papers/Voinea%20Murano%20Published%20Version.pdf) | A Usability and Universal Design Investigation into Scrolljacking for Web Pages (Voinea & Murano, CHIRA) | 2026-02-13 | 2026-10-05 |
| 3 | https://link.springer.com/chapter/10.1007/978-3-031-76821-7_9 | A Usability Investigation of Parallax Scrolling for Web Pages (Murano & Pandey, HCII 2024 LBP) | 2024-12-17 | 2026-10-05 |
| 4 | https://www.nngroup.com/articles/scrolling-and-attention/ | Scrolling and Attention (NN/g, T. Fessenden) | 2018-04-15 | 2026-10-05 |
| 5 | https://www.nngroup.com/articles/hamburger-menus/ | Hamburger Menus and Hidden Navigation Hurt UX Metrics (NN/g) | 2016-06-26 | 2026-10-05 |
| 6 | https://www.nngroup.com/articles/find-navigation-desktop-not-hamburger/ | Beyond the Hamburger: What Makes Navigation Discoverable on Desktops (NN/g) | 2016-07-24 | 2026-10-05 |
| 7 | https://www.nngroup.com/articles/hamburger-menu-icon-recognizability/ | The Hamburger-Menu Icon Today: Is it Recognizable? (NN/g, K. Kaplan) | 2025-06-13 | 2026-10-05 |
| 8 | https://www.nngroup.com/articles/sticky-headers/ | Sticky Headers: 5 Ways to Make Them Better (NN/g, P. Laubheimer) | 2021-04-04 | 2026-10-05 |
| 9 | https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/ | Text Scanning Patterns: Eyetracking Evidence (NN/g, K. Pernice) | 2019-08-25 | 2026-10-05 |
| 10 | https://www.nngroup.com/articles/animation-duration/ | Executing UX Animations: Duration and Motion Characteristics (NN/g) | 2020-02-09 | 2026-10-05 |
| 11 | https://www.nngroup.com/articles/icon-usability/ | Icon Usability (NN/g, A. Harley) | 2014-07-27 | 2026-10-05 |
| 12 | https://www.nngroup.com/articles/designing-effective-carousels/ | Carousel Usability (NN/g, K. Pernice) | 2013-09-14 (reviewed 2026-08-07) | 2026-10-05 |
| 13 | https://www.nngroup.com/articles/making-hated-design-elements-work/ | Can Hated Design Elements Be Made to Work? (J. Nielsen) | 2011-03-13 | 2026-10-05 |
| 14 | https://www.nngroup.com/articles/progress-indicators/ | Progress Indicators Make a Slow System Less Insufferable (NN/g) | 2014-10-26 | 2026-10-05 |
| 15 | https://www.nngroup.com/articles/response-times-3-important-limits/ | Response Times: The 3 Important Limits (J. Nielsen) | 1993 (upd. 2014) | 2026-10-05 |
| 16 | https://www.nngroup.com/articles/in-page-links/ | Anchors OK? Re-Assessing In-Page Links (NN/g, A. Schade) | 2017-05-07 | 2026-10-05 |
| 17 | https://www.nngroup.com/articles/in-page-links-content-navigation/ | In-Page Links for Content Navigation (NN/g, H. Wang) | 2023-10-01 | 2026-10-05 |
| 18 | https://www.nngroup.com/articles/3-click-rule/ | The 3-Click Rule for Navigation Is False (NN/g) | 2019-08-11 | 2026-10-05 |
| 19 | https://www.nngroup.com/articles/mobile-navigation-patterns/ | Basic Patterns for Mobile Navigation: A Primer (NN/g, R. Budiu) | 2015-11-15 | 2026-10-05 |
| 20 | https://www.nngroup.com/articles/bottom-sheet/ | Bottom Sheets: Definition and UX Guidelines (NN/g) | 2023-06-11 | 2026-10-05 |
| 21 | https://faculty.cc.gatech.edu/~stasko/7450/Papers/cockburn-surveys08.pdf | A Review of Overview+Detail, Zooming, and Focus+Context Interfaces (Cockburn, Karlson, Bederson, ACM CSUR 41(1)) | 2008-12 | 2026-10-05 |
| 22 | https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/ | Eye tracking study shows recruiters look at resumes for 7 seconds (Ladders 2018) | 2018-11-08 | 2026-10-05 |
| 23 | https://blog.google/products/admanager/the-need-for-mobile-speed/ | The need for mobile speed (DoubleClick/Google) | 2016-09 | 2026-10-05 (via search summary) |
| 24 | https://business.google.com/ca-en/think/marketing-strategies/mobile-page-speed-new-industry-benchmarks/ | New Industry Benchmarks for Mobile Page Speed (Think with Google, Google/SOASTA) | 2017-02 | 2026-10-05 (via search summary) |
| 25 | https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html | Understanding SC 2.3.3 Animation from Interactions | WCAG 2.2 (2023, upd. 2024-12) | 2026-10-05 |
| 26 | https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html | Understanding SC 2.2.2 Pause, Stop, Hide | WCAG 2.2 | 2026-10-05 |
| 27 | https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html | Understanding SC 2.4.11 Focus Not Obscured (Minimum) | WCAG 2.2 | 2026-10-05 |
| 28 | https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html | Understanding SC 2.1.4 Character Key Shortcuts | WCAG 2.2 | 2026-10-05 |
| 29 | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | Understanding SC 2.5.8 Target Size (Minimum) | WCAG 2.2 | 2026-10-05 |
| 30 | https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2016.00162/full | Vestibular Perceptual Thresholds Increase above the Age of 40 (Bermúdez Rey et al.; cites NHANES 35.4%) | 2016-10-03 | 2026-10-05 |
| 31 | https://dbushell.com/2025/10/27/custom-cursor-accessibility/ | Custom Cursor Accessibility (D. Bushell) | 2025-10-27 | 2026-10-05 |
| 32 | https://github.com/darkroomengineering/lenis | Lenis README (v1.3.x) | rolling | 2026-10-05 |
| 33 | https://developer.chrome.com/docs/web-platform/view-transitions/cross-document | Cross-document view transitions for MPAs (Chrome) | upd. 2024-04-14 | 2026-10-05 |
| 34 | https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available | Same-document view transitions are Baseline Newly available | 2025-10-16 | 2026-10-05 |
| 35 | https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition | @view-transition (MDN) | mod. 2026-04-20 | 2026-10-05 |
| 36 | https://caniuse.com/cross-document-view-transitions | Can I use: cross-document view transitions | rolling | 2026-10-05 |
| 37 | https://cydstumpel.nl/a-deep-dive-into-how-i-set-up-view-transitions/ | A deep dive into how I set up view transitions (C. Stumpel) | 2026-07-08 | 2026-10-05 (via Playwright) |
| 38 | https://react.dev/reference/react/ViewTransition | `<ViewTransition>` (React docs) | rolling (canary 2026-09-04) | 2026-10-05 |
| 39 | https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/ | What we learned from user testing of accessible client-side routing (M. Sutton) | 2019-07-11 | 2026-10-05 |
| 40 | https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics | JavaScript SEO basics (Google Search Central) | upd. 2026-03-04 | 2026-10-05 |
| 41 | https://www.uxmatters.com/mt/archives/2017/03/design-for-fingers-touch-and-people-part-1.php | Design for Fingers, Touch, and People, Part 1 (S. Hoober) | 2017-03-06 | 2026-10-05 |
| 42 | https://m3.material.io/components/navigation-bar/guidelines | Navigation bar guidelines (Material Design 3) | rolling | 2026-10-05 (via search summary) |
| 43 | https://developers.google.com/maps/documentation/javascript/interaction | Controlling zoom and pan / gestureHandling (Google Maps JS API) | upd. 2026-09-28 | 2026-10-05 |
| 44 | https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action | touch-action (MDN) | mod. 2026-04-20 | 2026-10-05 |
| 45 | https://github.com/pmndrs/react-three-a11y | @react-three/a11y | rolling | 2026-10-05 |
| 46 | https://news.ycombinator.com/item?id=46206531 | HN discussion: Bruno Simon (folio-2025) | ~2025-12 | 2026-10-05 |
| 47 | https://bruno-simon.com/, https://henryheffernan.com/, https://os.henryheffernan.com/, https://lusion.co/, https://activetheory.net/, https://www.igloo.inc/, https://messenger.abeto.co/, https://david-hckh.com/, https://cydstumpel.nl/, http://www.rleonardi.com/interactive-resume/, https://jesse-zhou.com/ | Live sites inspected with Playwright [measured] | live | 2026-10-05 |
| 48 | https://www.setproduct.com/blog/command-palette-ui-design-guide | Command Palette UI Design, 8 States and 10 Teardowns | 2025-10 | 2026-10-05 (via search summary) |
| 49 | https://en.wikipedia.org/wiki/Mystery_meat_navigation | Mystery meat navigation | rolling | 2026-10-05 (via search summary) |

Not covered: real user testing with recruiters on this portfolio (none exists; recommend 5 quick remote tests with recruiters and engineers once a prototype exists); Baymard (e-commerce-focused, paywalled, no portfolio-relevant navigation findings retrieved); a primary-source check of the DoubleClick 2016 methodology and of the Ladders sample (only secondary summaries were available); exact GPU-accelerated load timings of the inspected sites (headless runs without a GPU only show gating behaviour, not real-world speed); Firefox's 2026 roadmap for cross-document View Transitions; a "hiring managers spend 6–8 s / 55 s on a portfolio" claim, seen in newsletters but untraceable to a primary source, so not used; RTL/i18n navigation (e.g. a PL/EN language switch placement).
