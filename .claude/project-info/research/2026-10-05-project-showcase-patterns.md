# Project Showcase Patterns: proof, not talk

Date: 2026-10-05

Scope: how to make projects (including NDA'd software-house work) and skills **verifiable** on a hiring-focused developer portfolio. Evidence tags: [data] survey or study · [expert] named practitioner or hiring manager · [anecdote] · [opinion] · [measured] = measured by this research run (Playwright, 2026-10-05).

## TL;DR: implications for this portfolio

1. **Build two layers.** A **30-second skim layer** (project cards plus a TL;DR box at the top of each case study) and a **3-minute deep layer** (decisions, architecture, hard parts). Hiring managers scan and rarely read word for word. Only 11% of recruiters think a portfolio review reflects on-the-job ability. So the skim layer has to answer "is this real, and what did they own?" on its own. [expert NN/g] [data CoderPad 2026]
2. **Feature 3–5 flagship projects** with full case studies. Put everything else in a one-line archive list. Josh Comeau recommends 2–5, NN/g 3–5, and Brittany Chiang shows 4 plus "View Full Project Archive". [expert]
3. **Card anatomy:** an outcome-first one-liner, then role and team size, a context tag (`Client work · via <software house>` / `Product` / `OSS` / `Side project`), year, at most 5 stack chips, **one proof chip** (users, downloads, stars, "in production since 2024", Lighthouse score), a muted looping preview, and the links Live ↗ · Case study → · Code (or "Code private: NDA"). [pattern: Brittany Chiang, Emil Kowalski, Snellenberg]
4. **Case-study spine:** TL;DR box → context → problem and constraints → my role and the team → 2–3 key decisions *with rejected options* → architecture diagram → the hard part (≤15 lines of code) → results (numbers plus how they were measured) → what I'd do differently. Write the headings as questions so a skimmer can jump to the one they care about (Linear's pattern). In 2026, 56% of recruiters value "explains trade-offs and correctness" as an AI-era signal, so the trade-off section is the most important one. [data CoderPad 2026] [expert NN/g, Linear]
5. **Every flagship needs ≥1 verifiable artefact.** Options: a live URL, a usage number with its source, a before/after metric (Comeau shows Lighthouse Old/New even though New was *worse*), a named testimonial linked to LinkedIn, or a public repo whose README explains why it was built this way. Self-rated claims are the weakest evidence. [pattern] [expert profy.dev]
6. **Default media:** a 5–15 s muted looping screen recording per card. Encode AV1/WebM with an MP4 fallback, add a poster, use `preload="none|metadata"`, play only while in view, and add a pause control that respects `prefers-reduced-motion` (WCAG 2.2.2 requires pause for auto-moving content >5 s). Rauno's craft page carries 68 such videos and transferred about 0.7 MB on initial mobile load. Never use GIFs: web.dev measured 3.7 MB GIF → 551 KB MP4 → 341 KB WebM. [measured] [expert W3C, web.dev]
7. **One narrated 1–3 min walkthrough per flagship:** click to play, captioned, chaptered (Stamatiou's chapter-picker player is a good model). Wistia's 13M-video dataset shows engagement above 50% for videos under 5 min. [data Wistia 2025]
8. **NDA work: follow a disclosure ladder.** (a) Ask the software house **in writing**. (b) Public product → describe your own role in your own words. (c) Anonymise: "EU fintech client", redacted media, relative metrics. (d) **Rebuild the hard part** as your own sanitized demo on fake data. (e) Process-only write-up. (f) "Full case study on request". Label each project "Shown with permission" or "Anonymised under NDA". Never publish employer code: under Polish law, economic rights to code an employee writes belong to the employer (art. 74 ust. 3), and contractual confidentiality can be broader than statutory trade secret. [expert PL lawyers]
9. **Skills: no bars or percentages.** Use skill chips that **filter the project list** (with counts, like Snellenberg's "Development 11"), each skill linked to "where I used it", in three tiers (*shipping in prod / comfortable / exploring*), mirrored as plain text for parsers. Certifications go in a compact verifiable row. They carry real weight mainly at partner-tier consultancies (AWS Advanced tier requires 6 technically certified people). [opinion + data AWS]
10. **About and timeline:** a Tania-Rascia-style 4-row timeline that tells the non-degree path in 4 lines and **ends in proof numbers**. Add a real, recent photo (NN/g eye-tracking: real portraits get looked at, stock photos are ignored) and one human line. Experience rows: dates · title · company link · 1–2 lines · stack chips · press links. [expert NN/g] [pattern]
11. **No "ask my portfolio" chatbot as a core feature.** The evidence is anecdotal (CNBC 2026: 328 visitors a month for one bot). There is a hallucination risk (a bot invented credentials in Mark Ring's 2026 write-up), and generic bots are now common. If you build one, make it opt-in, grounded only in site content, citing sections, refusing unknowns, and **write it up as a case study** with an eval set. [anecdote] [opinion]
12. **3D/WebGL is a signature enhancement, never a gate.** Bruno Simon's site transferred about 7.2 MB in 15 s with about 5 characters of DOM text. Henry Heffernan's shows a "best viewed on a desktop" wall on mobile. Copy the GitHub globe instead: SVG placeholder → canvas, FPS-based quality tiers. Projects must live in crawlable HTML first. [measured] [expert GitHub]

---

## 0. Evidence hygiene: popular "stats" to NOT cite

Several 2025–26 SEO articles repeat statistics with no traceable primary source. Don't put these on the site or in decisions.

| Claim seen | Where | Status |
|---|---|---|
| "73% of hiring managers consider a portfolio more important than a resume (Stack Overflow Survey 2024)" | hakia.com and repeated elsewhere | Not in the SO survey's scope. Unverified |
| "83% of tech hiring managers trust GitHub over resumes (Beamery 2025)", "72% of recruiters use GitHub (HBR 2024)" | search-surface SEO pages | No primary found. Unverified |
| "2022 ResumeGo experiment: skill bars gave no callback lift", "Jobvista 2023: 23% more parse errors" | 1template.io, repeated | No link and not in ResumeGo's research index. Unverified |
| "Video walkthroughs increase recruiter engagement 42%" | search-surface career blogs | No source. Unverified |
| "Portfolios failing to quantify impact get filtered out 70% of the time (NN/g)" | figr/ux blogs | Not found in NN/g. Unverified |
| "6–8 seconds on a portfolio" | UX Playbook 2026 | No method given. Treat as [opinion] |

Verified anchors used instead: CoderPad 2025/2026, NN/g (n=204 and n=963 surveys), profy.dev (n≈60+), Wistia (13M videos), web.dev measurements, and this run's own measurements.

---

## 1. Reality check: who looks, and for how long

| Finding | Evidence |
|---|---|
| Portfolio review is a **minority** assessment method. Recruiters lean on technical discussion (75%), resume (72%), live coding (50%). Portfolio review: 20.5% | [data] CoderPad & CodinGame 2025, >5,000 devs + recruiters (figures via report page summary) |
| Only **23% of devs and 11% of recruiters** say portfolio review reflects on-the-job ability. Take-homes: 33% / 12% | [data] CoderPad 2026, n≈650 |
| AI-era signals recruiters value: "catches & fixes AI mistakes" 66%, "explains trade-offs & correctness" 56% | [data] CoderPad 2026 |
| 60+ hiring managers: most *would* look at a portfolio site, but most said *not* having one wouldn't lower chances. Bad design "can make you look incompetent". Broken links hurt | [data, small self-selected sample] Kettmann/profy.dev 2021, plus HN discussion [anecdote] |
| HN hiring managers prefer real code, detailed READMEs and **technical writing** ("I would prefer a non-experienced person with a bunch of articles…") | [anecdote] HN 2021 |
| 2025 market: referrals and pedigree dominate. Juniors who get outreach have "practical projects… production-ready" and AI fluency | [expert] Orosz/Wellfound CEO, Pragmatic Engineer, 2025-11-04 |
| Hiring managers "rarely read portfolios word-for-word" → scannability and hierarchy | [expert] NN/g Krause 2019 (n=204 UX hiring pros) |
| Reviewer sequence: decide to click → judge visual craft in seconds → hero for role fit → skim work → About page only if still interested | [opinion] Bölter, Open Doors Careers 2025-10-15 |
| PL context: about 76% of surveyed PL programmers hold a bachelor's (32.8%) or master's (42.8%) | [data, n not shown] Bulldogjob IT Report 2025 |

**Implication:** a degree is the norm in Poland and portfolio review is a minority, skeptical channel. So the site has to make proof **instantly checkable** (live, numbers, named people, code) rather than merely beautiful. The portfolio also feeds the channels that do work: referrals ("send me your link") and interview talking points.

---

## 2. Project index and cards

### 2a. Card anatomy (recommended)

| Slot | Content | Why / evidence |
|---|---|---|
| Title | Product name (or anonymised "Logistics dispatch dashboard") | — |
| **Outcome line** | Verb + result + scale: "Cut checkout p95 from 2.1 s to 0.8 s for ~40k MAU" | Emil opens with "downloaded over 40,000,000 times per week from npm and used by… Cursor, X, and OpenAI" [pattern] |
| Context tag | `Client work · via <software house>` / `Product` / `OSS` / `Side project` | Honest chain attribution, like Fossheim's "WHO (through Kore and Truth & Beauty)" [pattern] |
| Role + team | "Frontend lead · team of 5 · 2024–25" | NN/g and Indeed hiring managers ask for role and team makeup [expert] |
| Stack chips | ≤5, most relevant first | Brittany shows chips per project and per job [pattern] |
| **Proof chip** | ★ 722 · "100k+ installs" · "1,000 beta users" · "Live since 2024" · "LH 98" | Brittany shows stars and installs inline on cards [pattern] |
| Media | Muted loop (poster first), plays in view | §4 |
| Links | Live ↗ · Case study → · Code / "Code private (NDA)" | HN: reviewers want working links. Link rot hurts [anecdote] |

### 2b. Layout options

| Layout | Best when | Example | Mobile behaviour |
|---|---|---|---|
| **Text-first list rows + small thumbnail** | Few projects, text (outcome/role) is the decision driver | Brittany Chiang: thumbnail left, title, description, proof, chips. Hovering dims the siblings | Stacks cleanly |
| **Table rows (client · location · services · year) + filter chips + list/grid toggle** | 10+ projects, mixed types | Dennis Snellenberg /work: "All / Design 7 / Development 11" | Collapses to big image cards (seen in mobile screenshot) |
| **Media-first masonry/grid of looping videos** | Craft/interaction work where *seeing* is the proof | Rauno Freiberg /craft: dated tiles, "View Production" / "Read Essay" buttons | Single column of tiles |
| **Full-bleed rows (one project per screen)** | 3–4 flagships, strong visuals | (common on Awwwards sites) | Heavy. Watch the LCP |

NN/g's rule for lists: put the thumbnail on the **left** if the image is the main way people choose, and on the **right** (secondary) if the text drives the choice [expert NN/g Harley 2015]. For engineering work, the outcome text usually drives the choice, so lead with text and keep media secondary. The exception is UI-heavy flagships, which earn a media-first hero.

### 2c. How many, and in what order

- **Number:** 3–5 featured (Comeau: "between 2 and 5… a highlight reel", NN/g: 3–5 [expert]). Indeed hiring manager Annie Jarvis wants "a project or two that shows iterative design based on feedback" [expert]. Then an archive (Brittany's "View Full Project Archive") for breadth.
- **Order:** prioritise by **impact → process quality → recency** (NN/g researcher-portfolio guidance) [expert]. For this candidate's thesis ("real-world > degree"), the default is shipped professional work first. **But** if NDA limits make a professional entry thin, lead with whichever project has the strongest *verifiable* proof [opinion].
- **Diversity:** cover different capabilities (a UI-heavy piece, a data/perf-heavy piece, a deploy/infra piece) rather than three CRUD apps [opinion, hakia, low-trust source but sensible].

---

## 3. Case-study structure for engineers

### 3a. Template (adapted from UX conventions)

| # | Section (question heading) | Contents | Length | Source |
|---|---|---|---|---|
| 0 | **TL;DR box** (above the fold) | Problem in 1 line · my role · team · timeline · stack · 2–3 result numbers · Live/Code links · NDA label | 6 lines | NN/g: summarise key findings, describe context and team [expert]. UXfolio: the IBM example "leads with measurable outcomes" [expert] |
| 1 | What was this, and who was it for? | Product, users, business context (anonymised if needed) | 2–4 sentences | NN/g step 1 |
| 2 | What was broken / what was the goal? | Before-state, ideally with a number or a before screenshot | short | Indeed hiring manager Rhonda Gilligan: "show the before state" [expert] |
| 3 | What did I own? | Role, decisions you made vs the team, people you worked with (credit them) | bullets | Indeed (Susan Le): "team makeup, and the candidate's role" [expert] |
| 4 | What constrained us? | Deadline, legacy stack, budget, perf budget, devices, compliance | bullets | NN/g: acknowledge constraints [expert] |
| 5 | **Which decisions mattered, and what did I reject?** | 2–3 decisions × (options → chosen → why → cost) | the core | CoderPad 2026: trade-offs 56% [data]. Comeau: "If it wasn't for reasons 2 and 3, I probably would have given Astro a shot" [pattern] |
| 6 | How does it work? | One architecture diagram (SVG) + data flow | 1 figure | GitHub globe explains its 5-layer scene [expert] |
| 7 | What was the hard part? | One deep dive, ≤15 lines of code, a demo or recording | 1 section | Emil (stacking, swiping), GitHub (quality tiers) |
| 8 | What happened? | Metrics + **how they were measured** + date. Qualitative feedback | table | NN/g: demonstrate value with metrics [expert] |
| 9 | What would I do differently? | Honest misses | 3 bullets | profy: "If I had more time I would change this" [expert]. Stamatiou: "Going custom is almost always the absolutely wrong thing to do 99% of the time" |

### 3b. What reviewers read and skip

| Read | Skip / penalise |
|---|---|
| Titles, first visual, outcome numbers, role line [opinion Bölter] | Walls of text. "Final mockups with no understanding of how the candidate arrived at solution" (Susan Le, Indeed) [expert] |
| Why-decisions and rejected options [data CoderPad] [expert NN/g: "I'm curious to know what isn't in the design and why"] | Tutorial clones presented as original [opinion Scrimba 2022] |
| Live demo, then code/README ("How to navigate this project", "Why I built the project this way") [expert profy] | Broken links, outdated content [anecdote HN] |
| The messy process: "Don't just show me the finished product" (NN/g respondent) [expert] | Boastfulness. Teams want humility [opinion Scrimba] |

**Honesty is a feature.** Comeau publishes that the new blog's Lighthouse performance is "slightly worse" than the old one's, with both reports side by side. Stamatiou writes up a project he "designed, built and never launched", including why (data-API costs, support load from 1,000 TestFlight users). Linear explains that the work started during a co-founder's parental leave. Candour about trade-offs reads as seniority. [pattern]

---

## 4. Media that proves

| Medium | What it proves | Cost / perf | Mobile | A11y | Verdict |
|---|---|---|---|---|---|
| **Muted looping screen recording** (5–15 s) | It exists, it works, how it feels | Low if AV1/WebM + MP4, `preload=none/metadata`, lazy. Rauno: 68 `<video>` with `autoplay muted loop playsinline preload=metadata`, MP4 with `#t=0.01` used as a free first-frame poster. About 739 KB initial mobile transfer [measured] | Needs `playsinline` | WCAG 2.2.2 (Level A): auto-moving content that runs >5 s alongside other content needs pause/stop/hide [expert W3C]. Honour reduced motion | **Default for every card** |
| GIF | Same as above | 3.7 MB GIF vs 551 KB MP4 vs 341 KB WebM [measured web.dev 2018] | — | No pause | **Never** |
| **Narrated walkthrough** (Loom-style, 1–3 min) | Communication, reasoning | Click-to-load only | OK | Captions + transcript | **1 per flagship.** Wistia: <1 min average engagement 52%, 1–5 min >50% [data, 13M videos, 2025-07]. Stamatiou's chaptered player (dropdown + prev/next over an iPhone frame, WebM + MP4 + posters) [pattern] |
| **Live demo link** | Strongest "it's real" | Free, but the demo must stay alive | Depends on the app | Depends | **Mandatory where possible.** Monitor uptime |
| **Embedded live sandbox** (StackBlitz WebContainers / Sandpack) | Code quality, interactivity | Heavy. WebContainers: full support Chromium only, Firefox alpha, Safari beta (docs, 2023-02) [expert docs] | Weak | Variable | **Click-to-load, below the fold.** Comeau embeds a Sandpack iframe for teaching [pattern] |
| **Interactive mini-demo** of the hard part (real component, fake data) | Craft and depth | Moderate | Make it touch-ready | Keyboard-operable | **1 signature per flagship.** Emil's live "Add toast" demos. Ideal for NDA rebuilds |
| **Before/after** (toggle tabs or slider) | Improvement | Low | Prefer toggle tabs to drag sliders on touch [opinion] | Tabs = native buttons | Great for perf/UX refactors. Comeau's "(Old)/(New)" cards, incl. Lighthouse. Linear's before/after sets |
| **Architecture diagram** | Systems thinking | Low (inline SVG) | Must reflow or zoom | Text alternative | Static labelled SVG first. Interactive (hover a node → highlight a flow) only if it reveals something [opinion] |
| **Code snippet** | Taste, clarity | Low | Emil's snippets overflow horizontally on 390px [measured screenshot] → keep ≤15 lines, short lines | Real text, not images | Show the 10 interesting lines and link to the repo |
| **Annotated screenshot** | Detail, decision | Low | OK | Alt text | Best NDA medium (redact) |
| **Device mockup** | Context for mobile apps | Low | OK | — | Fine for **mobile apps** if the frame is current and minimal (Stamatiou uses a modern iPhone frame). Mockup vendors themselves warn that last year's device "looks behind the times" [opinion, vendor 2025]. For web work, show a real browser viewport, not a tilted MacBook [opinion] |
| **Scroll-scrubbed video** | Polish | Needs keyframe-dense encodes. Heavy | Janky risk | Must not trap scroll | Optional, single signature moment at most [opinion] |
| **WebGL/3D** | Graphics skill | Highest | Risky | Usually poor | Only with fallbacks: the GitHub globe ships an **SVG placeholder** with a 600 ms crossfade and drops through **quality tiers** when FPS < 55.5 over 50 frames (pixel ratio 2→1.5, ~12k→~8k geometry) [expert GitHub 2020] |

**Encoding cheat-sheet** [measured on case-study pages + caniuse]:
- `<video autoplay muted loop playsinline preload="metadata" poster="…">` with `<source type="video/webm">` (AV1 or VP9) then `<source type="video/mp4">` (H.264). Stamatiou ships WebM + MP4 + posters.
- AV1 is about 95% supported (80.4% full + 14.6% partial). Safari is only "partial" → always keep an H.264 MP4 fallback [data caniuse].
- Start playback with an IntersectionObserver and pause it off-screen. Add a visible pause toggle (WCAG 2.2.2).

---

## 5. Proof signals: a ladder from strongest to weakest

| Tier | Signal | Real examples |
|---|---|---|
| 1 | **Third-party-verifiable usage** with source/date | Emil: npm 40M+/week, named adopters. Brittany: "100k+ installs", ★ 8,281. Stamatiou: 1,000 TestFlight users. Tania: "20,000+ stars on GitHub" |
| 2 | **Live in production** + since-date | Live ↗ link on card |
| 3 | **Press / external mentions** | Brittany attaches 9to5Mac and The Verge links to her Apple co-op row |
| 4 | **Named testimonial** (name, role, relationship, link to LinkedIn rec) | No developer-hiring study found. Consumer analog: 5 reviews raise purchase likelihood 270%, and *perfect* 5.0 ratings are trusted less than 4.0–4.7 [data, Spiegel/e-commerce 2017]. So make quotes specific, verifiable, not gushing |
| 5 | **Before/after metrics** with method | Comeau's Lighthouse Old/New |
| 6 | **Public repo with an explanatory README** | profy README sections: "How I worked on this project", "How to navigate", "Why I built it this way", "If I had more time" [expert] |
| 7 | **Process artefacts** (ADR excerpt, PR description, redacted ticket) | — |
| 8 | Self-claims (skill lists, adjectives) | Weakest |

Rule [opinion]: each flagship should hold ≥1 item from tiers 1–5, and the card should surface it as the proof chip.

---

## 6. NDA, proprietary and employer work

### 6a. Legal frame (Poland; not legal advice)

| Point | Source |
|---|---|
| Economic rights to a program written by an **employee** in the course of duties belong to the employer unless the contract says otherwise (art. 74 ust. 3 PrAut) | [expert] KGM Legal IT (r. pr. Karolina Gabriel) and search-verified statute summaries |
| **B2B / civil-law contracts:** no automatic transfer. It depends on explicit contract clauses (and software houses usually do transfer rights onward to the client) | [expert] KGM Legal IT |
| **Moral rights** (authorship) are inalienable, so you may say "I built X", but *publishing* material is a separate question | [expert] Klisz (zakaz-konkurencji.pl). KGM Legal IT |
| Contractual "informacja poufna" ≠ statutory "tajemnica przedsiębiorstwa". **Contractual protection can be broader** | [expert] adw. Mikołaj Mrowiec, prawnikit, 2026-08-03 |
| Showing code fragments to another firm is "a textbook trade-secret breach". Do not upload code to a personal GitHub or cloud. Risks: contractual penalties, injunctions, even criminal liability | [expert] adw. Iwo Klisz |
| Things the company itself has published (live site, store listing, public talk) lose "not publicly known" status for *statutory* trade-secret purposes. The contract may still restrict you | [expert] Klisz (via search summary) + Mrowiec |

### 6b. Disclosure ladder (pick the highest rung you're allowed)

| Rung | What you show | How |
|---|---|---|
| L0 Permission | Full case study, client named | **Written** consent ("verbal agreements won't protect you", UX Playbook 2025). At a software house, ask the PM/CEO, who may need to ask the client |
| L1 Public facts | Live product link + your role, in your own words. Screenshots of *public* UI | Check the contract anyway |
| L2 Anonymised | "EU fintech client, 2024". Logos and brand colours neutralised. Data blurred. **Relative** metrics ("−62% p95") instead of business numbers | Label: "This case study is anonymised due to confidentiality agreements" [Bölter 2025] |
| L3 **Rebuild** | Re-implement the hard part generically on fake data, in your own repo, as a live demo | "Design recreation… using fictional data" [UX Playbook]. The strongest NDA-safe *proof* |
| L4 Process-only | Constraints, decisions, trade-offs, collaboration | "Most NDAs limit outputs — not thinking" [Bölter 2025] |
| L5 On request | Password-protected page or "walkthrough available in interview" | Corey Chandler (Indeed): "include your portfolio password with your application" [expert] |

Always label each case "Shown with permission of …" or "Anonymised under NDA". Saying clearly which projects are NDA-protected signals that you are a "trustworthy professional" [expert IxDF/Tremosa 2024]. Attribution pattern for software-house work: **Client X (via <software house>)**, modelled on Fossheim's "WHO (through Kore and Truth & Beauty)".

Permission-request skeleton [opinion]: *project name · what exactly you'd show (bullets: role description, these 3 redacted screenshots, these relative metrics, no code) · where (public site) · offer review before publishing · ask for a reply by email.*

---

## 7. Skills presentation

### 7a. Why bars and percentages fail

- No reference scale: "Four out of five compared to whom?" (Hiration ~2023). "100% skills in JavaScript would suggest you're the best JS developer in the world" (Kethmars 2020, reviewed 40+ portfolios) [expert/opinion].
- Graphic bars are invisible to text parsers (ATS/LLM screeners) [opinion Hiration].
- High self-ratings get tested in interviews. Partial bars "signal doubt" [opinion Hiration, Scrimba 2022].
- (The oft-cited "ResumeGo 2022" bar experiment is untraceable: see §0.)

### 7b. Credible alternatives

| Pattern | How it works | Example / evidence |
|---|---|---|
| **Skill → evidence index** | Each skill lists projects with role and last-used year, linked | [opinion] Strongest "proof, not talk" |
| **Filter chips with counts** | Chips (React 4, Node 3, WebGL 1) filter the project list | Snellenberg's "Design 7 / Development 11" filter + list/grid toggle [pattern] |
| **Per-role / per-project stack chips** | Tech attached to where it was used | Brittany's experience rows [pattern] |
| **Tiers** | *Shipping in prod* / *Comfortable* / *Exploring* | [opinion]. Kethmars suggests years or project counts instead of % |
| **Plain-text mirror** | Grouped text list for ATS/LLM parsing | [opinion Hiration] |

### 7c. Certifications

- No credible survey of developer-hiring weight was found (not covered).
- Mechanism where they **do** matter: partner-tier consultancies need certified staff. AWS Select tier needs 2 technical certified individuals, Advanced 6 (min. 3 Professional/Specialty), Premier 25 (min. 10) [data, AWS Partner requirements, accessed 2026-10-05]. Software houses chasing partner status therefore value certs.
- Placement [opinion]: a compact "Credentials" row in About/Experience with verify links (Credly etc.). Never on hero or cards, and never instead of projects.

---

## 8. Experience timeline and "About"

| Element | Pattern | Example |
|---|---|---|
| **Path in 4 lines** | Short timeline ending in proof numbers. Ideal for a "no degree, real work" story | Tania Rascia: "2007–2014 Professional chef… 2014–2020 Career change: Unpaid intern by day… junior dev to senior engineer… 2021–now Principal… 177 posts, 40+ publications, 20,000+ stars" |
| **Experience rows** | `2024 — PRESENT` · Title · Company ↗ · 1–2 lines of scope · stack chips · press links. "View Full Résumé" | Brittany Chiang |
| **Credential one-liners** | 3–4 bold facts under the name | Stamatiou: "Co-founder of Limitless (acquired by Meta)", "Joined Twitter design team pre-IPO, stayed 9 years" |
| **Human line** | One line of hobbies/personality | Brittany: climbing, tennis, two cats, "Korok seeds" |
| **"Colophon"** | How the portfolio itself was built (stack, hosting) | Brittany's footer. Stamatiou's About lists TanStack Start, Cloudflare R2 etc. The site itself becomes a case study |
| **Photo** | Real, recent, relevant | NN/g eye-tracking: users spent 10% more time on real portrait photos than on the bio text. Stock photos are ignored [data, Nielsen 2010, reviewed 2026] |

Reviewers tend to reach About *after* they've been convinced by the work [opinion Bölter]. Keep it lean and put it after projects in the IA.

---

## 9. AI "ask my portfolio" chatbots: useful or gimmick?

| For | Against |
|---|---|
| CNBC (2026-04-30): Vishal Patil's "VAi" had 3,300+ views, 328 unique visitors in one 30-day period, and 492 questions answered. He got an internship partly because a colleague was impressed. Joshua Curry open-sourced "ChatJC" (about 80 unique visitors) [anecdote] | Hallucination: at temperature 1.0 Mark Ring's bot "would occasionally hallucinate credentials I don't have" (2026-03-22) [anecdote] |
| Can double as a demo of RAG/guardrail skill [opinion] | Recruiter-side evidence of value is absent. CoderPad 2026 shows recruiters reward *verifying AI output and explaining trade-offs*, which a bot doesn't demonstrate by itself [data] |
| — | Generic portfolio chatbots are now common, so they don't differentiate [opinion, dev.to 2026] |

**Verdict [opinion]:** not a core feature. If built, it should be opt-in (not a popup), grounded only in site content, answer with links to case-study sections, say "I don't know" for unknowns, offer suggested questions, store no PII, and be rate-limited. Ship it **as a case study** (eval set, refusal rate, cost per query). A static, crawlable **"60-second recruiter summary"** plus a command-palette search over projects gives most of the value with no hallucination risk.

---

## 10. Dissected showcase pages

Screenshots: `inspirations/img/show-*-desktop.jpg` / `-mobile.jpg` (captured 2026-10-05).

### 10.1 Brittany Chiang: brittanychiang.com (index + experience) · current (2026)
- **Structure:** sticky left column (name, title, tagline, section nav, socials) → About (3 paras) → Experience rows → 4 Projects → Writing → colophon.
- **Does well:** proof chips inline (★ 722, "100k+ Installs", ★ 8,281). Press links on the Apple row. Per-job stack chips. Hover spotlights one row and dims the rest. "View Full Résumé" and "View Full Project Archive" as curated vs complete views. Initial mobile transfer about 1.35 MB [measured].
- **Steal:** proof chip on cards; curated list + archive; per-role chips; colophon.
- **Skip:** the sidebar nav state didn't update when scrolled to Projects in our capture (still "ABOUT"). The very widely cloned look.
- Files: `show-brittanychiang-desktop.jpg`, `-mobile.jpg`, `show-brittanychiang-projects-desktop.jpg`.

### 10.2 Emil Kowalski: "Building a toast component" (Sonner) · undated, built 2023
- **Structure:** outcome sentence (40M+/week npm, Cursor/X/OpenAI) → question ("what made Sonner stand out?") → Naming → Animations → Stacking → Swiping → Expanding → DX → "big little details" → "Why is Sonner successful?"
- **Media:** 10 videos (autoplay loops + click-to-play), live interactive demos, 9 code blocks, 27 SVGs [measured].
- **Steal:** **proof in sentence one**. Each section = one decision + live demo + minimal code. A "why it worked" retrospective.
- **Skip:** code blocks overflow on 390 px (wrap or shorten) [measured].
- Files: `show-emil-sonner-desktop.jpg`, `-mobile.jpg`, `show-emil-sonner-demo-mobile.jpg`.

### 10.3 Josh W. Comeau: "How I Built My Blog" · 2024-09-24, updated 2026-05-05
- **Structure:** Old/New side-by-side → core stack → content → styling → code snippets (Old/New) → playgrounds → widgets → database → "The Details" (view transitions, search, a11y) → App vs Pages Router with **Lighthouse Old/New** → foundation.
- **Does well:** explicit rejected alternatives (Astro, Tailwind, Prism "26kb"). Real numbers (dev server 7–12 s → 30–60+ s, CSS 245 KB loaded / 47 KB used). Admits the new version is "slightly worse". A Sandpack live playground.
- **Steal:** **(Old)/(New) toggle cards** for any before/after. A decision-with-alternatives paragraph. Honest metrics.
- **Skip:** length (32k px desktop). For a hiring portfolio, cap it and move detail to a linked appendix.
- Files: `show-comeau-blog-case-desktop.jpg`, `-mobile.jpg`, `show-comeau-lighthouse-beforeafter-desktop.jpg`.

### 10.4 GitHub / Tobias Ahlin: "How we built the GitHub globe" · 2020-12-21 (older, kept for the WebGL pattern)
- **Structure:** rendering → user-location → visualising PRs → "creative constraints from performance" → perceived speed → **graceful degradation with quality tiers**.
- **Does well:** a WebGL case study that's mostly about *constraints*: SVG placeholder, FPS-triggered tiers, disabled antialiasing compensated by a halo shader, a timezone-based (not IP) initial rotation for speed. Video, GIF, PNG and code media.
- **Steal:** a "how I kept it fast" section for any 3D/animation piece. The tiered-fallback architecture.
- **Skip:** GIFs (use video).
- Files: `show-github-globe-desktop.jpg`, `-mobile.jpg`.

### 10.5 Paul Stamatiou: "Stocketa" · 2023-10-16
- **Structure:** App overview (chaptered video player) → what it was → going custom → designing & building → SwiftUI note → what I built → website → API troubles → why I stopped.
- **Media:** 12 videos (WebM + MP4, posters, `preload=none` on loops), 71 images, an iPhone frame, a Figma explorations section, a job-interview deck [measured/fetched].
- **Steal:** the **chapter-picker walkthrough player** (dropdown + ‹ › over a device frame). A "why I stopped" honest ending. Hard numbers (≈13k LOC backend, 1,000 TestFlight users, $2,000+/month data APIs).
- **Skip:** very long (35k px). Mockup-heavy; fine for an iOS app, not for web work.
- Files: `show-stamatiou-stocketa-desktop.jpg`, `-mobile.jpg`, `show-stamatiou-desktop.jpg`.

### 10.6 Linear: "How we redesigned the Linear UI (part II)" · 2024-03-28 (team case study, design + engineering)
- **Structure:** intro → concept exploration → concept to prototype → **"What tests did we run before implementation?"** → "What milestones did we use?" → "How did we prioritize…?" → "How did the wider team help test?" → "How did we manage feedback?"
- **Does well:** **question headings** (perfect for skimmers). Before/after sets. A decision explained with a reason (HSL→LCH: "a red and a yellow color with lightness 50 will appear roughly equally light"). A 6-week timeline with daily designer-engineer pairing. Feature-flag dogfooding.
- **Steal:** Q-style headings. A "how we de-risked it" section (tests, flags, milestones), which is exactly what software-house work has.
- Files: `show-linear-redesign-desktop.jpg`, `-mobile.jpg`.

### 10.7 Lynn Fisher: "Case Study: lynnandtonic.com 2025 refresh" · 2026-01-13
- **Structure:** inspiration → technical "squash and stretch" → visual/type → accessibility & focus states → reflections.
- **Does well:** the playful gimmick (resize-to-stretch via `scale()` + ResizeObserver, 200 ms debounce) **only applies on desktop and reverts to a normal responsive layout below 500 px**. Documents focus-state and skip-link decisions. An annual case-study habit (2017–2025).
- **Steal:** "signature effect on capable viewports, plain on small ones". Write a case study of the portfolio itself.
- Files: `show-lynnfisher-case-desktop.jpg`, `-mobile.jpg`.

### 10.8 Rauno Freiberg: rauno.me/craft (media-first index) · items to Aug 2026
- **Structure:** masonry of dated tiles (title + month/year) with looping videos and "View Production" / "Read Essay" CTAs.
- **Does well:** 68 lightweight loops (`preload=metadata`, `#t=0.01` first-frame trick), blur placeholders while loading, dates on every item (shows recency and cadence). About 739 KB initial mobile transfer [measured, lower bound].
- **Steal:** dated tiles. Production-link CTA. The video-loading recipe.
- **Skip:** no outcome/role text on tiles. That works for a famous design engineer, not for an unknown candidate.
- Files: `show-rauno-craft-desktop.jpg`, `-mobile.jpg`.

### 10.9 Dennis Snellenberg: /work (filterable index) · projects 2024
- **Does well:** filter chips with counts. List (table: Client · Location · Services · Year) ↔ grid toggle. Mobile collapses to large image cards. About 472 KB initial mobile [measured].
- **Steal:** chips-with-counts as a **skill filter** over projects. A table row as a dense, honest summary.
- Files: `show-snellenberg-desktop.jpg`, `-mobile.jpg`, `show-snellenberg-hover-desktop.jpg`.

### 10.10 Counter-examples: immersive-first (relevant to the old three.js site)
| Site | Measured (2026-10-05) | Lesson |
|---|---|---|
| Bruno Simon (bruno-simon.com) | ~3.5 MB at 6 s (mobile), ~7.2 MB at 15 s. DOM innerText ≈5 chars. "Click to start". Renders on mobile | Great *for a WebGL specialist*, but nothing for crawlers, screen readers or 30-second skimmers |
| Henry Heffernan (henryheffernan.com, 2022) | ~11.7 MB desktop / ~7.3 MB mobile at 12 s. BIOS-style loader. Mobile shows "WARNING: This experience is best viewed on a desktop or laptop computer." | Same gating problem the old portfolio had (disabled on mobile) |
| Sarah Fossheim (fossheim.io/work) | Plain HTML services page | Positive counter-example for **client attribution through agencies** and availability dates |

Transfer figures come from Resource Timing `transferSize`. Cross-origin assets without Timing-Allow-Origin report 0, so treat them as lower bounds.

Files: `show-bruno-simon-*.jpg`, `show-henryheffernan-*.jpg`, `show-fossheim-work-*.jpg`.

---

## 11. Concrete build checklist for this portfolio

- [ ] Project data model: `title, outcomeLine, context(client|product|oss|side), via, role, teamSize, years, stack[≤5], proof{label,value,source,date}, links{live,case,code|ndaNote}, media{loopWebm,loopMp4,poster,walkthrough,captions}, ndaLevel(L0–L5), permissionNote`.
- [ ] 3–5 flagships with case studies (§3a), plus an archive table.
- [ ] TL;DR box component (role/team/timeline/stack/results/links/NDA badge).
- [ ] `<LoopVideo>`: in-view play, pause button, reduced-motion → poster only, AV1/WebM + MP4.
- [ ] `<BeforeAfter>` toggle tabs (keyboard-accessible). `<Diagram>` inline SVG with text alternative.
- [ ] Skill chips → filter projects (URL-synced), tiers, plain-text mirror.
- [ ] About: 4-row timeline ending in numbers, real photo, credentials row with verify links, colophon.
- [ ] NDA: send permission emails *before* writing. Rebuild one hard part as a public demo.
- [ ] Any 3D: enhancement layer with static fallback and quality tiers. All content in HTML.
- [ ] Link-rot and uptime check for every Live ↗ link.

---

## Sources

All accessed 2026-10-05.

| # | URL | Title | Pub date | Tag |
|---|---|---|---|---|
| 1 | https://coderpad.io/survey-reports/coderpad-state-of-tech-hiring-2026/ | CoderPad State of Tech Hiring 2026 | 2026 (n≈650) | [data] |
| 2 | https://coderpad.io/survey-reports/coderpad-and-codingame-state-of-tech-hiring-2025/ | CoderPad & CodinGame State of Tech Hiring 2025 | 2025 (>5,000 resp.; figures via search summary) | [data] |
| 3 | https://dev.to/profydev/this-survey-among-60-hiring-managers-reveals-don-t-waste-your-time-on-a-react-portfolio-website-17ge | Don't waste your time on a (React) portfolio website: 60+ hiring managers (J. Kettmann) | 2021-08-06 | [data, small n] |
| 4 | https://dev.to/profydev/impress-hiring-managers-by-presenting-your-react-projects-like-a-pro-part-2-3eje | Presenting your React projects like a pro, part 2 (J. Kettmann) | 2021-07-10 | [expert] |
| 5 | https://news.ycombinator.com/item?id=28233243 | HN: Don't waste time on a portfolio website | 2021-08 | [anecdote] |
| 6 | https://newsletter.pragmaticengineer.com/p/tech-jobs-market-2025-part-3 | Tech jobs market 2025, part 3 (G. Orosz) | 2025-11-04 | [expert] |
| 7 | https://www.nngroup.com/articles/ux-design-portfolios/ | 5 Steps to Creating a UX-Design Portfolio (R. Krause; n=204) | 2019-08-04 | [expert/data] |
| 8 | https://www.nngroup.com/articles/ux-researcher-portfolio/ | Portfolios for UX Researchers: Top 10 (L. Kane; n=963) | 2019-03-10 | [expert/data] |
| 9 | https://www.nngroup.com/articles/photos-as-web-content/ | Photos as Web Content (J. Nielsen; eye-tracking) | 2010-10-31 (reviewed 2026-08-13) | [data] |
| 10 | https://www.nngroup.com/articles/mobile-list-thumbnail/ | List Thumbnails on Mobile (A. Harley) | 2015-12-06 | [expert] |
| 11 | https://indeed.design/article/ux-design-portfolio-advice-from-hiring-managers/ | UX Design Portfolio Advice from Hiring Managers (6 named managers) | 2020-04 | [expert] |
| 12 | https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio | How Recruiters and Hiring Managers Actually Look at Your Portfolio (F. Bölter) | 2025-10-15 | [opinion] |
| 13 | https://blog.opendoorscareers.com/p/what-you-can-and-can-t-show-navigating-ndas-in-your-portfolio | What You Can (and Can't) Show: NDAs (F. Bölter) | 2025-10-29 | [opinion] |
| 14 | https://uxplaybook.org/articles/ux-design-portfolio-nda-guide-2026 | How to Present NDA Design Work (T. Hartwell) | 2025-01-23 | [opinion] |
| 15 | https://ixdf.org/literature/article/keep-it-confidential-how-to-showcase-your-nda-protected-design-work | Keep it Confidential (L. Tremosa, IxDF) | 2024-07-17 (mod. 2026-07-20) | [expert] |
| 16 | https://zakaz-konkurencji.pl/portfolio-pracownika-a-nda-co-wolno-pokazac-rekruterowi/ | Portfolio pracownika a NDA (adw. Iwo Klisz) | n/a | [expert] |
| 17 | https://kgmlegalit.pl/prawo-autorskie-a-umowa-o-prace-jakie-postanowienia-warto-zawrzec-w-umowie-z-programista-w-odniesieniu-do-programow-komputerowych/ | Prawo autorskie a umowa o pracę… programista (r. pr. K. Gabriel) | n/a | [expert] |
| 18 | https://www.prawnikit.com.pl/nda-dla-programisty-na-co-uwazac-przy-karach-umownych/ | NDA dla programisty: kary umowne (adw. M. Mrowiec) | 2026-08-03 | [expert] |
| 19 | https://www.joshwcomeau.com/effective-portfolio/ | Building an Effective Dev Portfolio (J. Comeau) | n/a | [expert] |
| 20 | https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/ | How I Built My Blog (J. Comeau) | 2024-09-24, upd. 2026-05-05 | [pattern/measured] |
| 21 | https://emilkowal.ski/ui/building-a-toast-component | Building a toast component (E. Kowalski) | n/a (project 2023) | [pattern] |
| 22 | https://github.blog/engineering/engineering-principles/how-we-built-the-github-globe/ | How we built the GitHub globe (T. Ahlin) | 2020-12-21 (upd. 2021-02-11) | [expert] |
| 23 | https://linear.app/now/how-we-redesigned-the-linear-ui | How we redesigned the Linear UI (part II) | 2024-03-28 | [pattern] |
| 24 | https://lynnandtonic.com/thoughts/entries/case-study-2025-refresh | Case Study: lynnandtonic.com 2025 refresh (L. Fisher) | 2026-01-13 | [pattern] |
| 25 | https://paulstamatiou.com/stocketa | Stocketa (P. Stamatiou) | 2023-10-16 | [pattern] |
| 26 | https://paulstamatiou.com/about | About, Paul Stamatiou | current | [pattern] |
| 27 | https://brittanychiang.com/ | Brittany Chiang | current (2026) | [pattern/measured] |
| 28 | https://rauno.me/craft | Craft, Rauno Freiberg | current (to 2026-08) | [pattern/measured] |
| 29 | https://dennissnellenberg.com/work | Work, Dennis Snellenberg | current | [pattern/measured] |
| 30 | https://www.taniarascia.com/ | Tania Rascia | current | [pattern] |
| 31 | https://fossheim.io/work/ | Work with Sarah Fossheim | current (2026) | [pattern] |
| 32 | https://bruno-simon.com/ | Bruno Simon portfolio | current | [measured] |
| 33 | https://henryheffernan.com/ | Henry Heffernan Portfolio 2022 | 2022 | [measured] |
| 34 | https://web.dev/articles/replace-gifs-with-videos | Replace animated GIFs with video (Djirdeh, Wagner) | 2018-11-05 | [measured] |
| 35 | https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html | Understanding SC 2.2.2 Pause, Stop, Hide | WCAG 2.2 | [expert] |
| 36 | https://wistia.com/learn/marketing/optimal-video-length | Optimal video length (13M videos) | 2025-07-01 | [data] |
| 37 | https://webcontainers.io/guides/browser-support | WebContainers browser support | 2023-02 | [expert] |
| 38 | https://caniuse.com/av1 | AV1 video format support | live | [data] |
| 39 | https://dev.to/kethmars/what-i-learned-after-reviewing-over-40-developer-portfolios-9-tips-for-a-better-portfolio-4me7 | 9 tips after reviewing 40+ portfolios (Kethmars) | 2020-07-19 | [expert/anecdote] |
| 40 | https://www.hiration.com/blog/skill-bars-resume/ | Stop Putting Skill Bars on Your Resume | ~2023-03 | [opinion] |
| 41 | https://scrimba.com/articles/web-developer-portfolio-mistakes/ | Common web developer portfolio mistakes (M. Larocca) | 2022-10-13 | [opinion] |
| 42 | https://www.cnbc.com/2026/04/30/these-2-job-seekers-built-ai-chatbots-to-talk-to-recruiters-for-them.html | These 2 job seekers built AI chatbots… (CNBC; 403 for us, read via mirror #43) | 2026-04-30 | [anecdote] |
| 43 | https://www.jobadvisor.link/2026/04/these-two-job-seekers-built-ai-chatbots.html | Mirror/summary of CNBC piece | 2026-04-30 | [anecdote] |
| 44 | https://dev.to/markring/my-portfolios-ai-chatbot-hates-its-job-its-the-best-career-decision-ive-made-4jel | My Portfolio's AI Chatbot Hates Its Job (M. Ring) | 2026-03-22 | [anecdote] |
| 45 | https://aws.amazon.com/partners/services-tiers/ | AWS Partner services path tiers | current | [data] |
| 46 | https://bulldogjob.com/it-report/2025/programmer | Bulldogjob IT Community Report 2025: Programmers | 2025 | [data] |
| 47 | https://spiegel.medill.northwestern.edu/how-online-reviews-influence-sales/ | How Online Reviews Influence Sales (Spiegel RC) | 2017 | [data, consumer analog] |
| 48 | https://blog.uxfol.io/product-design-portfolio/ | Product Design Portfolio (UXfolio) | 2026-05-06 | [opinion] |
| 49 | https://mockuuups.studio/blog/post/best-iphone-17-and-macbook-mockups/ | iPhone 17 & MacBook mockups (vendor) | 2025 | [opinion, vendor] |
| 50 | https://hakia.com/skills/building-portfolio/ · https://www.1template.io/blog/using-skill-levels-in-your-resume | Examples of untraceable statistics (§0) | 2025–26 | [do not cite] |

Not covered: eye-tracking or analytics studies of *developer* portfolio reviewing (none found; designer/resume studies used as proxies). Hiring-specific data on testimonials and on certification weight in the Polish market. Evidence that scroll-scrubbed video or interactive architecture diagrams change hiring outcomes. Recruiter-side data on portfolio chatbots. Whether reviewers mostly open portfolios on mobile (left to the navigation/IA track). The web-search budget ran out mid-run, so a few late items (Lynn Fisher, Linear, Tania Rascia) were verified by direct fetch rather than search.
