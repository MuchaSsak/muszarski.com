# Home-page section patterns (hero → footer)

Date: 2026-10-05

Status: complete (1 agent, 2026-10-05). It includes the coordinator's mid-task brief: 4 home flagships under the "Drafting Table" direction (see "b+c applied").

Scope: only what earlier tracks did not cover. Read with `2026-10-05-synthesis.md`, `-ui-patterns-galleries.md` (contact drawer, ticket card, footer basics, cert tiles), `-project-showcase-patterns.md` (card anatomy, video recipe, NDA ladder), `-awwwards-dev-portfolios.md`, `-art-direction-themes.md`.

Tags: [measured] = observed live by me on 2026-10-05 (Playwright, Chrome, 1440×900 and 390×844) · [data] = Mobbin / curated dataset · [expert] = docs, standards, named practitioner · [opinion] = my judgment.

Screenshots: `inspirations/img/sec-*.jpg`.

## TL;DR

1. **Hero hook without clichés: a skim-line sentence.** Write the H1 + value sentence as real text with 4–5 fact "pills" readable in 3 s, and the full bio one tap away (ped.ro). Add a **build-time proof strip** (last deploy · Lighthouse · years · CET). The drawing loads after LCP. Mobile gets its own composition (Railway, Metalab).
2. **Per-project theming = fixed slots, free paint** (Stripe Press spines, Clay's same-camera renders, Tines' metric covers).
   - For Drafting Table: one sheet skeleton (frame, title block, notes, CTA order, line weights, 2 typefaces).
   - Only 4 tokens vary: `--paper`, `--ink`, `--accent`, `--motif`, with paper and ink locked to an OKLCH lightness band so contrast holds on every sheet.
3. **Mixed aspect ratios: normalise the slot (16:10 desktop / 4:5 mobile), not the media.**
   - Web apps go in a drawn browser.
   - The phone-only app becomes a **multi-view drawing** (phone + 2 detail callouts), with a QR on desktop and a store badge on phones (Linear Mobile).
   - The WebGL piece is a video in a drawn monitor with a device-aware "Launch on desktop" / "Copy link" action.
   - The repo-only internship becomes an **annotated BOM drawing** with numbered callouts.
4. **Business thinking needs receipts:**
   - Result lines written as *verb + metric + scale + time* (Evil Martians).
   - A decision ledger reusing each case study's decisions.
   - An evidence-gated 4-phase process with exit artefacts (Wild).
   - Principles that link to where they were applied (Linear Method).
   - Not "Dig dig dig"-style process cards.
5. **AI workflow, credibly:**
   - Real task strings (Amp), real transcripts and commit receipts (Simon Willison's colophon: 237 tools, transcript links, "AI generated" labels).
   - A hairline flow diagram with mono labels (Cloudflare / Linear / Factory).
   - **Verification as the centrepiece:** 66% of recruiters value "catches & fixes AI mistakes" (CoderPad 2026).
   - No purple and no sparkles.
6. **Credentials: a ledger, not a logo wall.**
   - Columns `YEAR · ITEM · ISSUER · TYPE · PROOF`, filter chips, a 4-cell highlights strip.
   - ESC certificates verify by code on youth.europa.eu.
   - Polish INF qualifications have **no public verification portal**: link the official qualification description (ZRK) and mark "scan on request".
   - Don't use instructors' photos for "learned from".
7. **Rhythm:**
   - Polished long pages run *4 tall chapters (~1–1.4 vh) then thin bands (0.15–0.6 vh)* (Linear, measured). Stripe's hero is 0.76 vh.
   - Proposed home ≈ 8.5–9.5 vh on desktop: hero 0.85 → 4 sticky-stacked sheets × 1.0 → bands of 0.15–0.8 → footer 0.4–0.6. On mobile everything is content height.
8. **Contact:**
   - Intent routing (*Hiring / Project / Other*), a response-time promise, a 3-field form, Copy email.
   - A Cal link (not an inline embed): the booking page is 2.3 MB on mobile [measured].
   - **Footer:** a "revision block" with build receipts.
   - Only 9/23 famous dev portfolios ship `Person` JSON-LD, 4/23 a real `llms.txt`, 0/23 `hreflang` [measured]: cheap differentiators.

## a) Hero hooks (non-cliché, H1 stays server-rendered text)

The clichés are already banned in the synthesis (§7): typewriter, name marquee, scramble, "Hello" preloader, custom cursor, magnetic everything, pulsing green dot. The question is what to use instead, so that the hook is real HTML and the visual layer can arrive later.

| # | Hook | Example | Steal | Skip | Practicality |
|---|---|---|---|---|---|
| a1 | **Skim-line paragraph.** The whole bio is rendered as text, but only the key facts are sharp, set in outlined pills ("I'm PEDRO", "I work at RAYCAST", "I live in BARCELONA", "find me on X"). The rest of the paragraph sits blurred behind them | [ped.ro](https://ped.ro/) · `sec-pedro-desktop.jpg`, `sec-pedro-mobile.jpg` | A 3-second layer and a 3-minute layer in **one** text element. For Mateusz the pills become proof: role, years, shipped products, city + CET, availability date | The blurred body as the only way to read the bio. Give it a "Read full bio" toggle and un-blur on focus. Pedro's page has **no `<h1>`** in the HTML [measured] | 0.48 MB [measured]. All text, so the LCP is text. Blur is a CSS `filter` on a sibling layer, not on the LCP node |
| a2 | **The product is the hero visual.** Serif H1 + 2 CTAs over an illustrated sky. A real product canvas (service graph with "Just deployed via GitHub" and a cursor pressing Deploy) rises from below the fold | [railway.com](https://railway.com/) · `sec-railway-desktop.jpg`, `-mobile.jpg` | The visual is a working slice of the real thing, framed as a card that peeks above the fold. Railway shows **a different composition on mobile**: the canvas is replaced by a 2-column logo grid inside the same card | Logo wall (cliché for us); 4.7 MB first load [measured] | H1 in HTML [measured]. The canvas card is below the H1, so the H1 stays the LCP |
| a3 | **Index-as-hero.** H1 "We make interfaces" + a column of client-name pills (Robinhood … All Work) + "LDN 4:36 PM" + a mail icon in the header | [metalab.com](https://www.metalab.com/) · `sec-metalab-desktop.jpg`, `-mobile.jpg` | Flagship project names *are* the first navigation: 1 click to any case study. Hovering or focusing a pill can tint the page in that project's palette, a bridge to §b | The 3D video background (7.3 MB first load [measured]); every pill marked up as an `<h1>` [measured] | Mobile stacks the pills under the headline: fine |
| a4 | **One signature object, pre-rendered.** Text left; one custom 3D illustration right (mascot + floating objects) | [kentcdodds.com](https://kentcdodds.com/) · `sec-kentcdodds-desktop.jpg` | A single owned illustration as an `<img>` beside the H1, not a canvas | Characters/mascots; AI-generated 3D characters read cheap (themes track). The promo toast over the hero | 0.65 MB first [measured]. Keep the image smaller than the H1 block, or it becomes the LCP element |
| a5 | **Annotated / exploded line drawing.** A technical line drawing with red callout boxes ("IBC 1015.3 LOW WINDOW SILL HEIGHT") or an exploded motor beside a giant word ("INTEGRATE") | Mobbin: [Heron AI](https://mobbin.com/sites/sections/b9316f64-5154-4826-ba08-759cb29bbf75), [Atlas](https://mobbin.com/sites/sections/f4bb0189-fdb7-4075-a704-8f2f7b91f926) | Evidence that the synthesis' "exploded-view hero" (Living Blueprint) reads well. Callouts carry **real facts** ("Next.js 16 · 98 Lighthouse · 14 k MAU") and link to case-study anchors | Giant word + drawing with no facts (pure decoration) | Inline SVG, a few KB. Draw-on via `stroke-dashoffset` after LCP; static under reduced motion |
| a6 | **Live proof strip** [opinion] | Railway's "Just deployed via GitHub" chip; Resend's status pill (footer track) | One mono line under the H1, built at SSG/ISR time: `last deploy 2 h ago · Lighthouse mobile 98 · 6 yrs · CET 14:32`. Real data, no client fetch before LCP | A ticking counter animation | The clock hydrates after paint; the rest is static HTML |

**Rules that keep any hook LCP-safe** [expert web.dev + measured]:
1. The H1 (name + role) and the value line are SSR text, never inside a canvas, SVG `<text>` or video. Of the 15 sites probed in batches 1–2, 13 had an `<h1>` in the raw HTML. ped.ro and instrument.com/work had none [measured].
2. The hook visual mounts after LCP (idle callback), is `aria-hidden`, and its box is reserved in CSS (`aspect-ratio`) so CLS stays at 0.
3. If an image is in the hero, either it is clearly smaller than the text block or it is the intended LCP (`fetchpriority="high"`, AVIF, ≤ 80 KB at 390 px).
4. A different composition on mobile (Railway, Metalab), not a scaled-down desktop.

## b) Per-project theming on one skeleton

**How the strongest sites stay coherent.** They fix the *slots* and vary only the *paint*:

| Example | What varies per item | What stays fixed (the skeleton) | Notes |
|---|---|---|---|
| [Stripe Press](https://press.stripe.com/) · `sec-stripe-press-*.jpg` | Full cover art: marbled paper, pixel weave, kintsugi cracks, engraving | Spine slots: author left · title centre · logo right, one serif family, same proportions | WebGL spines, 9 MB first load, 2 canvases [measured]. On mobile the stack is only cropped (weak). **Steal the slot rule, not the WebGL** |
| [14islands](https://www.14islands.com/) · `sec-14islands-*.jpg` | Each case has its own backdrop (editorial photo for Cartier, dark holographic field for an AI security client) | The client UI floats **frameless** as a centred "screen card" in a rounded media slab; caption is always "Client — Category" | Same slabs full-width on mobile, caption below. Mixed section heights: 1.0 / 0.9 / 0.83 / 0.74 vh … then a long work list [measured] |
| [Instrument /work](https://www.instrument.com/work) · `sec-instrument-desktop.jpg` | Art direction of each video | 3-line caption (Client / outcome sentence / `#CATEGORY`); 2-column masonry with large + small tiles; **a pause button on every autoplay tile** | Filter chips + STACK/GRID display toggle ([Mobbin](https://mobbin.com/sites/sections/05811dd7-a07a-41ae-9fa7-192b8eede1b1)). Heavy: 3.8 → 28.6 MB after a scroll sweep [measured] |
| Tines case studies ([Mobbin](https://mobbin.com/sites/sections/d7394009-61e7-4170-8a9f-a34aaca78a25)) | Client colour | Each case is a "folder" with logo + **one metric on the cover** ("45 min saved per onboarding request") | The metric is the hook; the colour only identifies the case |
| Clay case studies ([Mobbin](https://mobbin.com/sites/sections/66ffa87c-0bf5-47fe-acd4-2018636364a1)) | A 3D-rendered object per client (coin, "AI" letters, check mark, "Oyster") | **Same camera angle, same lighting, same two-tone ground plane**, same card | Exactly the "Workbench" theme's consistency problem, solved by fixing the render setup |
| Customer.io ([Mobbin](https://mobbin.com/sites/sections/4ff8eb23-5dca-4085-b6dc-f94fefe41976)) | Pastel per client | Logo + 3 stacked metrics in identical slots | Proof-first cards |
| [nan.fyi](https://www.nan.fyi/) · `sec-nanfyi-desktop.jpg` | A hand-drawn line icon per post (database, SVG grid, key, layout) | One ink style, serif title, date, one-line description, arrow; rows ≈ 0.21 vh each [measured] | Per-item motif at SVG cost. Fits Blueprint: **one ink object per project** |
| [Linear changelog](https://linear.app/changelog) · `sec-linear-changelog-desktop.jpg` | A custom diagram per entry | Shared grammar: mono uppercase labels, hairline connectors, dashed boxes, greys + one status colour | 6 `<video preload="metadata">`, 5 with posters; 9 sticky elements (dates) [measured] |
| Apple product slabs ([Mobbin](https://mobbin.com/sites/sections/a2f54b99-919c-4a5b-97c5-0cf35b841a62)) | Product palette + hero image | Name (one type style) · tagline · availability line · 2 CTAs, centred | Full-bleed slabs stack trivially on mobile |

**Recipe for Mateusz's chapters** [opinion, from the above]:
- **Fixed per chapter:** grid, type families, the caption/meta slots (outcome line, context tag, role, year, stack chips, proof chip, links: §4 of the synthesis), media frame radius and position, CTA set, spacing scale.
- **Varied per project (max 3 tokens):** `--accent` + its tinted `--surface`; one **motif** (texture, ink object, pattern, or a rendered object with a shared camera setup); optionally one display-type accent word. Keep every palette inside one lightness band so the text tokens pass contrast on all of them.
- **Mechanics:** `section[data-project="pstryk"] { --accent: …; --surface: …; --motif: url(…) }`. Register `--surface` with `@property` so the page background can interpolate between chapters. Use CSS scroll-driven animation (`animation-timeline: view()`) where supported, and a plain cut where not.

**Chapter layouts and how they behave on mobile:**

| Layout | Desktop | 390 px | Verdict |
|---|---|---|---|
| **Full-bleed slab per project** (Apple, 14islands) | ~80–100 vh each | `height: auto`, stacked; media first, then the caption | **Default.** No JS, robust, deep-linkable (`#project`) |
| **Stacked sticky cards** (each card `position: sticky; top: X`, the next slides over) | Strong "chapter" feel at near-zero JS: pure CSS `position: sticky`, or `@cnippet/stacking-cards` ([registry](#registry-components)) | Works natively, **but** each card must fit `100svh` minus the header, or its bottom (CTAs!) is covered by the next card. Focus can land on covered content | Desktop-only enhancement, or cap cards at ~80 svh with no internal overflow. Add `scroll-margin-top` so focused links are visible. Under reduced motion: no scale/dim |
| **Pinned horizontal reel** (vertical wheel → horizontal track) | Looks cinematic | Scroll-jacking | **Reject** (synthesis: no scroll-jacking) |
| **Native horizontal scroll-snap row** (`overflow-x: auto; scroll-snap-type: x mandatory`) | Next card peeks; arrow buttons | Native swipe, works | OK for the *archive* or a case's screenshot set, not for flagships (hidden content) |
| **Index list + sticky preview** (rows left, media sticks right) | Dense and fast to scan | Media moves inline under each row | Good for the archive section below the chapters |

## c) Mixed aspect-ratio media (portrait phone + landscape web)

| Example | Pattern | At 390 px | Media handling [measured] | Steal / skip |
|---|---|---|---|---|
| [Things](https://culturedcode.com/things/) · `sec-things-desktop.jpg`, `-mobile.jpg` | **Device-family bento**: flat, simplified frames (black-bezel iPhone, frameless Mac window with traffic lights, iPad, Watch) aligned on **shared baselines**: the phone is as tall as the window beside it | Becomes a 2×2 bento: phone + window on top, iPad + Watch below | 0.6 MB for the whole page; 1 `<video preload="none" poster>` | **Steal:** flat frames, shared baseline, crisp UI images. Skip the tilted-perspective hero window |
| [Apple Continuity](https://www.apple.com/macos/continuity/) · `sec-apple-continuity-*.jpg` | **Overlap cluster**: Mac centre, iPad right, iPhone front-right, as one composed image | The same cluster, scaled, kept whole (no re-layout) | 3 `<video preload="none" playsinline>`; 1.7 → 5.5 MB after a scroll sweep | Steal for a product that has both phone and web clients. Skip photoreal hardware for web apps |
| [Linear Mobile](https://linear.app/mobile) · `sec-linear-mobile-*.jpg` | **Portrait app inside a landscape scene**: a phone held in a hand, desaturated grainy photo, filling a 16:9 slab | Same photo cropped taller; the H1 below | Desktop shows **QR "Scan to download" + App Store / Play tiles**; mobile shows a single "Download on the App Store" button | **Steal both:** (1) this is how a portrait app fits the landscape grid of web projects; (2) the QR lets a recruiter on desktop install the app in one step |
| Wispr Flow ([Mobbin](https://mobbin.com/sites/sections/ddc48c4a-43de-4cdc-89f0-791148ca1b3e)) | Frameless desktop window + phone overlapping its lower-left corner, both on a blurred photographic backdrop in a rounded card; platform chips (iOS · Mac · Windows) | n/a (static capture) | — | Good combo for a product with both clients |
| Mural ([Mobbin](https://mobbin.com/sites/sections/2385468d-bbbc-451c-87f1-e528b9151471)) | Solid brand-colour half-panel; tablet + phone overlap, cropped by the panel edge | — | — | Per-project colour panel + device overlap = §b and §c in one move |
| Notion ([Mobbin](https://mobbin.com/sites/sections/60a559ff-803a-4207-b39f-1988f1420014)) | Two equal-height frameless cards: "Web app" (minimal browser chrome) vs "Desktop app" | — | — | For web work: **a real browser viewport with minimal chrome, never a tilted MacBook** (showcase track) |

**Rules for the chapters** [opinion, from the above + showcase track]:
1. **Normalise the slot, not the media.** Every chapter's media slot is 16:10 on desktop and 4:5 at 390 px.
   - Web app: a frameless browser window (3 dots + URL pill) fills the slot.
   - Mobile app: the phone stands at ~90% of the slot height on the project's colour/motif backdrop, plus one floating UI detail or a second phone screen (Linear Mobile, Mural). The portrait app then sits in the same grid as the landscape apps.
   - Product with both clients: window + phone overlapping one corner (Wispr, Apple). At 390 px the phone is ~45–55% of the slot width and must not cover the key UI.
2. **Flat, current, simple frames** (Things), not photoreal hardware. Last year's device "looks behind the times" (showcase track). Registry: `@magicui/iphone`, `@magicui/safari`, `@cult-ui/mock-browser-window` (table below).
3. **One encode per aspect.**
   - Phone loop: ~590×1280. Desktop loop: ~1280×800. AV1/WebM + H.264 MP4.
   - `<video muted playsinline loop preload="none" poster="…avif">` sits inside the frame's screen rectangle, so the frame is HTML/SVG and the video stays small.
   - Play in view (IntersectionObserver), at most 1 playing at a time on mobile, **a pause button on every tile** (Instrument), poster only under reduced motion or Save-Data.
4. **The mobile app's CTA is device-aware:** QR on desktop, a store badge on phones (Linear Mobile).
5. **Composite art per breakpoint** (Apple ships one composed image for each breakpoint) beats absolute-positioned overlap math when the combo is complex. Use `<picture>` with `media` queries.

## b+c applied: the four home chapters under "Drafting Table"

Owner's decision (2026-10-05):
- The home page shows exactly 4 flagships: PstrykWeb, Linkoglot, the old 3D space portfolio and Neoteric Clockful. Everything else lives on `/work/`.
- Art direction is "Drafting Table". Every project is a drafting **sheet** with its own paper and ink colour. Device frames are drawn as technical drawings, and illustrations are code-drawn SVG.

Everything below is [opinion], derived from the evidence in §b and §c.

### One sheet skeleton (what never changes)

This follows the Stripe Press rule (fixed slots, free paint) and the Clay rule (same camera and lighting for every object).

| Slot | Desktop (≥ 1024 px) | 390 px |
|---|---|---|
| Sheet frame | Same outer margin, a double border line (2 px + 0.5 px), corner registration marks, an optional 8 mm grid at 6% ink opacity | Same, with the margin reduced to 12 px |
| **Title block** (bottom-right, always the same cell layout) | `SHEET 01/04` · project name · context tag (`Product` / `Mobile app` / `Experiment` / `Internship · Neoteric`) · role · year · `REV` (last update) · scale bar | Becomes a full-width block **under** the drawing, in the same cell order |
| Drawing area | One "view" composition (rules below), media slot 16:10 | Media slot 4:5 |
| Notes column | Outcome line (1 sentence) · ≤ 5 stack chips · **1 proof chip** · 2–3 numbered callouts | Below the title block |
| CTA row (fixed order) | `Case study →` first, then the project's one live action (see table), then the secondary link | Same order, full-width buttons ≥ 44 px |
| Line weights | 2 px outline (frames) · 1 px detail · 0.5 px dimension/construction lines. **The same on all 4 sheets** | Same |
| Type | One mono for labels, dimensions and title-block cells; one text face for outcome and titles. No per-project fonts | Same |

### Per-sheet tokens (the only things that vary)

| Token | Rule |
|---|---|
| `--paper` | Light tint, OKLCH L between 0.93 and 0.97, low chroma (≤ 0.04). Every sheet stays "paper" |
| `--ink` | Dark hue of the project's brand, OKLCH L between 0.22 and 0.32. Guarantees ≥ 7:1 on its own paper, so body text can be ink-coloured |
| `--accent` | One brand colour, used only for strokes ≥ 2 px, dimension arrowheads, the proof chip and focus rings. Never for body text |
| `--motif` | One code-drawn SVG object per project, drawn in the same isometric 30° projection and line weights. This is the Clay "same camera" rule in line-art form |

Implement as `section.sheet[data-project="…"]` setting the 4 custom properties. Register `--paper` and `--ink` with `@property` so the page background can interpolate between sheets. Under reduced motion, use a plain cut.

### The four sheets

| # | Project · media kind | Drawing composition (desktop) | 390 px | Media + budget | Live action (CTA 2) | Motif |
|---|---|---|---|---|---|---|
| 01 | **PstrykWeb**: business pipeline product, "both" | **Three views on one sheet**, like an engineering drawing set. (A) "Front elevation": drawn browser frame with the **admin panel** loop. (B) "Side elevation": drawn phone overlapping A's lower-right corner, playing a **generated client site** loop. (C) "Section": the AI generation **pipeline drawing** (brief → generation → review → client site → admin) as a horizontal flow across the bottom third, nodes with real labels | A + B as one overlap cluster in the 4:5 slot (phone ≈ 50% of the width, never covering the admin's key UI). C becomes a **vertical** flow under the title block (Cloudflare-style top-to-bottom; see §e) | 2 loops: landscape 1280×800 and portrait 590×1280, AV1 + H.264, ≤ 600 KB + ≤ 400 KB. AVIF posters ≤ 60 KB each. Pipeline: inline SVG ≤ 8 KB, nodes are HTML/SVG text (crawlable) | `Live site ↗` + `See a generated site ↗` | Isometric stack of 3 sheets/pages with an arrow (generation) |
| 02 | **Linkoglot**: mobile app, portrait phone only, stores | **Multi-view of one device**: the phone drawn front-on at 90% of the slot height (dimension line on the right: real screen height, or a metric like "cold start 1.1 s" as the dimension label). Two smaller **detail views** ("DETAIL A: review card", "DETAIL B: streak") drawn as circular callouts with leader lines to the phone. This fills the 16:10 slot without a fake landscape scene (the Linear Mobile problem, solved the drafting way) | Phone centred at ~62% width in the 4:5 slot; the detail views become 2 small circles below it | 1 portrait loop 590×1280 (≤ 500 KB) inside the drawn phone's screen rect. Detail views are static AVIF crops (≤ 25 KB each) | **Desktop:** QR code (drawn as a "stamp" in the title block) + App Store / Play badges. **Phone:** the badge for the visitor's OS first (Linear Mobile pattern) | Isometric speech bubble with two-language glyphs |
| 03 | **Old 3D space portfolio**: WebGL, desktop-only live | Drawn **monitor/browser frame** with a 20–40 s landscape loop of the experience (the video *is* the demo). A dimension line across the frame reads "desktop · WebGL2 · ~N MB" (honest weight label). A small notes box "Why it was rebuilt": 2 lines linking to the case study (linear scroll, disabled on mobile). Honesty reads as seniority (showcase track) | Same frame in the 4:5 slot (letterboxed video on paper). **No WebGL on the home page**, ever | 1 loop 1280×720, ≤ 900 KB (the heaviest, so `preload="none"` + play-in-view only). Poster AVIF ≤ 70 KB | **Pointer fine + width ≥ 1024:** `Launch on desktop ↗` (new tab). **Coarse pointer / narrow:** the button becomes `Desktop-only experience` + `Copy link` (copy-to-clipboard, announced via `aria-live`) + "watch the video above". It never auto-launches, and the mobile layout never breaks | Orbit ellipses drawn as compass construction lines (keeps the old "space" identity as drafting) |
| 04 | **Neoteric Clockful**: internship dashboard, desktop, repo only | Drawn browser frame with an **annotated** dashboard loop or still. **Numbered balloon callouts** (①②③, like a bill of materials) point to the 3 features he built, with a parts list in the notes column ("① timesheet grid · React Query", …). The annotations replace the missing live URL as proof | Frame + balloons. The parts list moves under the title block, and the balloons stay as small numbers on the image | 1 loop 1280×800 ≤ 500 KB, or 1 AVIF still ≤ 90 KB plus a 6 s loop of one interaction | `Code ↗ (GitHub)`. No "Live" button. Instead a title-block cell `DEPLOYMENT: none (internship)` and the context tag `Internship · Neoteric · 2024` (or the real year). Check the repo is public and the NDA rung (synthesis §4) before publishing | Isometric clock face with gear teeth |

### How the 4 sheets read as one system

1. **Fixed slots + fixed line weights + fixed type**; only paper, ink, accent and motif change (the table above). Same rule as Stripe Press spines and Clay renders.
2. **Same projection for every motif and every frame.** Frames are front orthographic; motifs are isometric 30°. Never mix in perspective mockups or photoreal devices (Things proves flat frames age well).
3. **Frames are code, not PNG mockups.** Each drawn frame is a ~2–4 KB SVG that takes `currentColor = --ink`, so the same `<DrawnBrowser>` / `<DrawnPhone>` / `<DrawnMonitor>` component re-inks per sheet.
   - The `<video>` sits in an HTML layer positioned over the SVG's screen rectangle (CSS grid overlap). Avoid `<foreignObject>`, which has Safari quirks.
   - Registry frames (`@magicui/iphone`, `@magicui/safari`) are useful as geometry references only: restyle them as line drawings or hand-build them.
4. **Sheet numbering 01/04 → 04/04** in each title block + an "All work (N) →" sheet-edge tab after sheet 04 leading to `/work/`. This makes "4 of many" explicit.
5. **Stacking = sheets laid on the drafting table.**
   - Desktop: each sheet is `position: sticky; top: header-height` with a small `translate`/rotation offset (±0.6°), so sheet 02 slides over sheet 01 like paper. CSS only.
   - Cap each sheet at `100svh − header`, so the CTA row is never covered.
   - At ≤ 1023 px and under `prefers-reduced-motion`, the sheets are a normal static stack (`position: static`, auto height).
   - Focused links get `scroll-margin-top`, so keyboard users never land on a covered sheet.
6. **Only the sheet in view plays its video**, at most one at a time, with a visible pause control drawn as a small title-block cell `▶ / ❚❚` (WCAG 2.2.2). Posters show under reduced motion or Save-Data.
7. **Home budget for all 4 chapters before any interaction:**
   - 4 AVIF posters ≤ 280 KB total.
   - Videos load only in view (worst case ≈ 2.4 MB if a visitor scrolls through all 4).
   - SVG ≤ 40 KB total.
   - Fits the synthesis' "initial page ≤ 1 MB" because no video is fetched at load.

## d) "Not only a coder": business thinking, process, principles with evidence

| Example | What it does | Steal | Skip |
|---|---|---|---|
| [Evil Martians](https://evilmartians.com/) · `sec-evilmartians-desktop.jpg` | The hero radar labels its targets as **business KPIs**: "Target #1 Reduce time to first value", "#2 Improve user retention", "#3 Grow organic acquisition", "#4 Improve free-to-paid conversion", "#5 Increase net revenue retention" [screenshot]. The page backs this with result lines: "scaled bolt.new's platform to 3M+ MAU and $40M ARR in 5 months", "designed and built new UX driving 100x gains for Tines", "sped up NATS Ruby SDK by 3x under high load", "65% of our clients raise their next round within 1–3 years" [fetched] | **Name the business metric each project moved**, then write result lines as *verb + metric + scale + time*. Engineering framed in the hiring company's language | VC-scale claims he can't back. The 6.7 vh dark single-page treatment |
| [CSS Wizardry](https://csswizardry.com/) (Harry Roberts) · `sec-csswizardry-*.jpg` | Services written as **business problems**: "Your website is slow. I can tell you why." "Learn what a one-second slowdown costs, how to measure its impact… and what speed is worth to your bottom line." | Problem-first copy. Every service starts from the client's cost, not the tech | **Counter-example:** the case-study index shows only client + service type, with **no numbers at all** [fetched]. Also a 40-logo "Trusted by" wall (a cliché for us) |
| Wild ([Mobbin](https://mobbin.com/sites/sections/1bac0acb-c4fe-46ec-acd7-fe0bf057faf2)) | "We build it together over about 14 weeks, in four phases… Each phase stands on its own, and **nothing moves to the next without evidence that the last one worked.**" A timeline row: `PHASE 1 · WKS 1–4` Brand Truth → `PHASE 2 · WKS 5–8` The loop → … | **Evidence-gated process**: phases with time boxes and an exit criterion each | — |
| [Linear Method](https://linear.app/method) · `sec-linear-method-desktop.jpg` | Principles as a **numbered outline** (1.1 · 2.1–2.4 · 3.1–3.6), each item a link to its own page; big serif "Practices for building" | Principles as a short, linkable TOC. For a portfolio, **each principle links to the case-study section where it was applied** | Principles with no link to work |
| Fluff to avoid (Mobbin) | Craft Agency "Dig dig dig / Map the terrain / Cross-pollination / Breakthrough"; Anima "Spot the signal / Build what matters / Scale and secure"; Daydream's 4 pastel "Approach" cards | — | Verbs with no artefact, number or time box. They read as agency boilerplate |

**Pattern for section 3 ("Not only a coder"), Drafting Table version** [opinion]: one sheet, "SHEET 05: Engineering economics", about 60–80 vh on desktop, built from 3 blocks:
1. **Decision ledger** (3–4 rows, a table on desktop and stacked cards at 390 px). Columns: *Situation → Decision (and what I rejected) → Business effect (number + how measured) → Case-study link*. This reuses each case's decisions section (synthesis §4), so it costs no new content.
2. **How I work with a client: 4 phases, time-boxed, each with an exit artefact** (Wild):
   - Discover → *brief + estimate in ranges*.
   - Shape → *spec + cost table (hosting €/month)*.
   - Build → *weekly demo + preview URL*.
   - Hand over → *docs, monitoring, a "what I'd do next" note*.
   Each artefact can be an anonymised thumbnail (proof ladder tier 7: process artefacts).
3. **Principles with receipts.** 3–4 one-line principles, each with a chip `↗ seen in PstrykWeb §Decisions`.

Avoid: logo walls, "passionate", anonymous testimonials, and percentages without a baseline.

## e) AI-native workflow, presented credibly

| Example | What makes it credible | Visual language | Practicality [measured] |
|---|---|---|---|
| [Amp](https://ampcode.com/) · `sec-ampcode-*.jpg` | The hero floats **real engineering tasks** as chips: "Handle 429s from the payment provider", "Profile the slow dashboard query", "Trim the bundle by 200 kB", "Reproduce the bug from ticket #4821". Below it, **"Watch Thorsten Build in Amp"**: one real working session with **timestamped chapters** ("0:16 An agent that wakes itself to check production" … "22:52 Cut a release, email the user, close the bug") | Earthy brown/green/cream, orange CTA, editorial serif + mono kicker. **No purple, no sparkles** | 3.6 MB first; 4 `<video preload="metadata">`; mobile keeps 2–3 chips around the H1 |
| [Factory](https://factory.ai/) · `sec-factory-desktop.jpg` | A real-looking agent session in a window: "Migrating Auth Service to gRPC with Protobuf → Explore codebase structure → Audit auth middleware usage → Generate gRPC server stubs with buf" | Monochrome, uppercase mono labels, a copyable install command | 1.65 MB first |
| [Simon Willison: tools colophon](https://tools.simonwillison.net/colophon) · `sec-simon-tools-colophon-desktop.jpg` | **Receipts:** 237 tools, each with its commit history, many commits linking to **the LLM transcript that produced the code**; machine-written descriptions are labelled "AI generated" | Plain HTML, disclosure rows "Development history (4 commits)" | 0.17 MB |
| Linear changelog + agent pages ([changelog](https://linear.app/changelog), [Mobbin](https://mobbin.com/sites/sections/45eb5e36-ec17-4e15-bb2c-70472761a434)) | The diagram uses real-looking ticket IDs: `WEB-1284 TYPO IN BUTTON COPY → LUNA 00:06 → UPDATED BUTTON COPY`. The agent transcript shows actual commands: "Searching for root AGENTS file… `rg --files -g 'AGENTS.md'`" | Hairline connectors, dashed boxes, mono labels, one status colour | — |
| Cloudflare "Build agentic AI" ([Mobbin](https://mobbin.com/sites/sections/c70381eb-7c40-49e2-8500-3aa1385d9efb)) | Numbered steps (1 Get user input · 2 Ask AI · 3 Guarantee execution · 4 Take action), **each listing the real tools with ↗ links**; a vertical line-flow diagram beside them | Orange line art on cream, drafting-like frame lines. **Top-to-bottom flow = free mobile layout** | — |
| Runner ([Mobbin](https://mobbin.com/sites/sections/2a7bf924-dcef-490b-ae4d-f9ed8bbec018)) | "Review before anything goes out": steps with **status chips** (Gathering · Thinking · Waiting · ✓) | Paper texture, serif | — |
| [Zed /agentic](https://zed.dev/agentic) · `sec-zed-agentic-desktop.jpg` | A real editor recording; keyboard-shortcut chips on the buttons (`Download now D`, `Clone source C`) | Blueprint-like grid with crosshair corners, serif + mono | 6.8 MB first (videos auto-preload). Skip the weight |

Text sources that give the structure real names:
- **Every, "Compound Engineering"** (Kieran Klaassen & Trevin Chow). The loop is **"Plan → Work → Review → Compound → Repeat"**. "The plan and review steps should comprise 80 percent of an engineer's time." Their plugin ships "26 specialized agents, 23 workflow commands, 13 skills" [fetched].
- **Harper Reed, "My LLM codegen workflow atm"** (2025-02-16). The stages are "Idea honing" → `spec.md`, "Planning" → `prompt_plan.md` + `todo.md`, "Execution". For existing code, "Get context" → `output.txt` via Repomix [fetched].
- **Evil Martians** markets "AI Harnesses: open source skill sets that encode architectural patterns into AI coding tools like Claude Code, Cursor, and Copilot" [fetched].
- **Jakub Krehel** lists `/skills` as a project tile on his home page (`sec-jakub-desktop.jpg`).

So publishing your own skills is now a portfolio item.

**Credibility rules** [opinion, anchored on CoderPad 2026 from the showcase track: 66% of recruiters value "catches & fixes AI mistakes", 56% value "explains trade-offs"]:
1. **Show artefacts, not adjectives:** a real `SKILL.md` excerpt (≤ 15 lines), the MCP list with *what each is for*, the LLM-wiki file tree, a transcript excerpt. Link a public repo of skills (Evil Martians, Jakub).
2. **Make verification the centrepiece.** One concrete "AI mistake I caught" (before → diff → test that now guards it). Show the gate stack: types, tests, Playwright screenshots, Lighthouse CI. This is the step the 66% care about.
3. **Receipts with numbers:** for this very site, report commits, the share made with agents, the share reviewed (100%), the Lighthouse result and cost per month. Simon Willison's colophon is the model; labelling what is AI-generated is a trust signal, not a weakness.
4. **Real task strings** (Amp, Linear) instead of "AI-powered ✨".
5. **Visual language:** hairline flow diagram + mono labels + one accent (Cloudflare / Linear / Factory). In Drafting Table this is naturally "SHEET 06: Process drawing": nodes `brief → wiki/context → plan (skill) → build (agent + MCPs) → verify (tests · Playwright · Lighthouse) → review → ship`, each node a link to an artefact.
6. **Avoid:** purple/blue gradients, sparkles, glowing orbs, robot mascots, chat-bubble mockups ("Sure thing!"), and fake typing that runs longer than 5 s without a pause control.

**Layout:** desktop is a 2-column sheet, steps + artefact links left and the flow drawing right (Cloudflare). At 390 px it becomes one vertical flow, with each step's artefact as a collapsible row.

**Optional:** a 60–90 s captioned screen recording of one real session with chapter timestamps (Amp), click-to-play only.

## f) Credentials, education, volunteering, hackathons, "learned from" + section rhythm

The previous track gives the tile anatomy: badge · name · issuer · date · ID · Verify ↗ (Dovetail and Linear compliance sections). The new question is how to make **~10–20 mixed items** compact, scannable and checkable.

| Example | Pattern | Steal | Skip |
|---|---|---|---|
| basement.studio "Awards x30" ([Mobbin](https://mobbin.com/sites/sections/bb09f59f-11c2-4b8c-9858-b424eacabb8b)) | **Ledger rows**: Award · Project · Date, one hairline row each, newest first, the count in the heading | Dense, honest, scannable. In Drafting Table it is literally a **revision table / parts list** | — |
| Büro "272" ([Mobbin](https://mobbin.com/sites/sections/70c3a42f-4d7d-4142-b657-5d512360f7f5)) | Giant count + a table grouped **by year** (year · contest · distinction · project) | Year grouping; a "distinction" column (placement at a hackathon, grade, hours) | A giant number when the count is small: put the count in the heading instead |
| Locomotive "Awards & Recognitions (278)" ([Mobbin](https://mobbin.com/sites/sections/3972031f-245c-461e-bed8-9b8845b92fd0)) | Grouped **by issuer** with a count per distinction | Grouping when several items share an issuer (for example several Udemy courses) | — |
| Craft ([Mobbin](https://mobbin.com/sites/sections/f708431b-4051-472b-9494-a2d98b738a5c)) | A strip of **4 highlights**: icon + name + one-line distinction, ~15–20 vh | A "top 4" strip above the full ledger | — |
| [cv.jarocki.me](https://cv.jarocki.me/) (Bartosz Jarocki, Wrocław) · `sec-jarocki-cv-*.jpg` | Compact HTML CV: name · role · "Wrocław, Poland, CET" · icon links; Work Experience rows with company · stack chips · dates · title · bullets; `Ctrl+J` command menu; `ProfilePage` JSON-LD; 0.32 MB [measured] | Density and per-role chips; a good model for the `/cv` route | **Template-ness:** it is a popular open-source CV template that has been widely forked, so steal the structure, not the look |
| MasterClass / Skillshare instructor rows ([Mobbin](https://mobbin.com/sites/sections/797fcbf2-a089-4078-9e7c-c0339b4bf482)) | Portraits with **typographic names** + "Teaches …" | The typographic name treatment for "Learned from" | **The instructors' photos or logos** on a personal site imply endorsement (and raise likeness/trademark questions) [opinion]. Use name + course + hours + year + certificate link |

**Verifiability by credential type** [search, 2026-10-05]:

| Credential | How to make it checkable |
|---|---|
| **European Solidarity Corps** certificate | The EU portal validates it by code at [youth.europa.eu/solidarity/validate](https://youth.europa.eu/solidarity/validate_en). The result shows participant, dates, location and host organisation. A per-certificate URL pattern exists (`/solidarity/validate/<code>_en`), so **Verify ↗ can deep-link** |
| **Youthpass** (Erasmus+ youth) | Certificates carry a QR code to validate authenticity ([Youthpass FAQ](https://www.youthpass.eu/en/help/faqs/youthpass2021-2027/)). Link the validation URL from the QR |
| **Polish vocational qualifications (INF.02 / INF.03 / INF.04)** | The certificate is issued by the regional exam board (OKE). **No public online verification portal was found.** Results are visible only to the holder in the SIOEZ "Portal zdającego". INF.03 + INF.04 + secondary education gives the *technik programista* diploma ([zawodowe.edu.pl](https://zawodowe.edu.pl/kwalifikacje-w-zawodzie/inf-04/)). **Recommendation:** link the qualification's official description in the Integrated Qualifications Register ([kwalifikacje.gov.pl](https://kwalifikacje.gov.pl/zrk2/current/public/kwalifikacja/12983&doc=true)), add a one-line English gloss ("Polish state vocational qualification: application design, programming and testing"), and mark the proof as `scan on request` |
| Online courses ("learned from") | Link the platform's public certificate page where one exists. Show instructor (text), course, hours, year |
| Hackathons | Link the event page or the repo / demo built there. Show placement, team size, duration, and *what I built* in 1 line |

**Recommended section** [opinion]: "SHEET 07: Parts list & revisions", 40–60 vh on desktop.
- **Highlights strip (Craft):** 4 cells, for example *Technik programista (INF.03 + INF.04)* · *European Solidarity Corps · <country> · <months>* · *Learned from Bruno Simon (Three.js Journey)* · *best hackathon result*.
- **Ledger (basement / Büro):**
  - Columns: `YEAR · ITEM · ISSUER · TYPE · PROOF`.
  - Filter chips with counts (Dennis pattern): *All · Qualifications · Learned from · Abroad · Hackathons · Short courses*.
  - The proof column is always one of `Verify ↗` / `Certificate ↗` / `Repo ↗` / `On request`.
  - Short courses (marketing, psychology, UX) sit in the same ledger, tagged, so they read as breadth rather than padding.
- **390 px:** each row becomes 2 lines (title / `issuer · year · type`), with the proof link right-aligned as a 44 px target. Show the first 6 rows, then "Show all 14". The highlights strip becomes a 2×2 grid.
- **Avoid:** an auto-scrolling logo marquee of issuers (cliché, and WCAG 2.2.2 applies), badge images larger than the text, and a "taught by" line that sounds like a personal relationship.

### Section rhythm: what polished long pages actually do [measured, section heights in viewport heights, desktop 1440×900]

| Site | Sequence (vh) | Total |
|---|---|---|
| Linear home | 1.14 hero · **0.16** logos · 0.52 intro · **1.36 · 1.37 · 1.37 · 1.36** (4 product chapters) · 0.47 · 0.63 · 0.25 · footer 0.55 | 11.1 (mobile 7.0; chapters ≈ 0.68 each at 390 px) |
| Resend | 1.0 hero · then alternating 0.63–1.52 bands · footer 0.66 | 13.7 |
| Stripe | **0.76** hero · 2.44 · 0.62 · 1.09 · 5.03 · 2.6 · 1.98 · 0.42 · footer 1.22 (86 links) | 16.3 |
| Raycast | 1.07 · 1.53 · 0.8 · 1.4 · 1.54 · 1.22 · 1.27 · 1.1 · 0.88 · 3.54 · 1.38 · 1.38 | 17.8 |
| 14islands | 1.0 · 0.9 · 0.83 · 0.74 · 5.81 (work list) · 1.37 · 0.79 · 1.0 | 11.4 |
| Things | 1.26 · 1.57 · 0.99 · 1.1 · 2.97 · 0.69 · 0.34 | 9.0 |
| Dev portfolios (total only) | Brittany 4.3 (mobile 6.2) · Josh Comeau home 4.6 · Maggie Appleton 4.6 · Jakub Krehel 2.7 · Pedro 1.1 | — |

Takeaways:
- Even product sites put **thin bands (0.15–0.6 vh) between their full chapters**. Linear's 4 chapters of ~1.37 vh sit between a 0.16 vh logo strip and 0.25–0.63 vh bands. The rhythm is *tall, tall, tall, tall, short, short*, never ten 100 vh screens.
- Stripe's hero is only 0.76 vh: the next section peeks, which is the synthesis' "first project card peeks above the fold".
- With 4 chapters, a home of ~9–11 vh on desktop (Linear / Things range) is the natural length. That is roughly double a typical dev portfolio, so every non-chapter section must be a band, not a screen.

## g) Low-friction contact

Already covered by the UI track: the header contact drawer (Copy email + mailto fallback + CV + local time), derolez's "For hire." ticket, Hex's 4-field form, Ragged Edge's label/value rows with Copy, and the clipboard mechanics. New here:

| Example | Pattern | Steal | Skip |
|---|---|---|---|
| Biograph ([Mobbin](https://mobbin.com/sites/sections/921aedd1-a3b1-4c3c-aa24-a5208212c47b)) | **Intent-routing cards** (Schedule a call / Send a message / Partnerships / Already a member) | Route by visitor intent: *Hiring? → CV + email* · *Project? → book a 20-min call* · *Anything else → message* | Stock-photo thumbnails |
| Charma ([Mobbin](https://mobbin.com/sites/sections/5bf003e4-ce42-46f0-b15a-7fd5a2ca6950)) | Form on the left, channels on the right, with an explicit **"Maximum response time: 1 business day, M–F 9–5pm"** | A response-time promise + hours, stated in the visitor's terms | — |
| United Carriers ([Mobbin](https://mobbin.com/sites/sections/7e65a424-f68b-4e4d-81b4-fa938436dc52)) | **Reason chips** (radio grid) instead of a dropdown; a side column with hours · socials · email; "call you back within one business day" | Chips = a single tap on mobile; side column = no-form fallback | Phone + company fields |
| Lightship ([Mobbin](https://mobbin.com/sites/sections/0791334e-985a-4902-b866-3be56684576c)) | "How would you like us to reach out?" email / call toggle | A preferred-channel toggle (email vs a video call) | 6 required fields |
| Shader ([Mobbin](https://mobbin.com/sites/sections/4d6c6c50-ebc6-4765-8847-faf418e7690c)) | A tongue-in-cheek **"cut along the dotted line"** coupon: dashed border, scissors icon, "Book a Call Today" | A contact **slip** fits Drafting Table: a dashed tear-off strip at the sheet's edge holding email + copy + book + CV | The satire copy |
| [Cal.com booking page](https://cal.com/peer) · `sec-cal-peer-mobile.jpg` | Duration · confirmation · **auto-detected timezone ("Europe/Warsaw")** · month grid | Booking flow done for you | **Weight:** the booking page transferred **2.3 MB** on mobile (≈ what an inline embed iframe loads). `embed.js` alone is ~91 KB decoded. Calendly's `widget.js` is ~12 KB + 2.5 KB CSS before its iframe [measured] |

**Recommended contact sheet** [opinion]: "SHEET 08: Contact slip", 50–70 vh on desktop, ~1.2 screens at 390 px.
1. **Left: the slip.**
   - A primary `Copy email` with a mailto fallback and an `aria-live` "Copied".
   - `Book 20 min ↗`: a link to the Cal page, or an iframe loaded **only on click**, never on page load.
   - `CV PDF · EN | PL · 140 KB`.
   - A line: *"Replies within 1 business day · Poland, CET (UTC+1/+2) · it's 14:32 here, same time as you"*.
2. **Right: a 3-field form.**
   - Fields: email · message · reason chips (*Hiring* / *Project* / *Other*).
   - A honeypot instead of a captcha. A server action sends it, with an inline success state.
   - Mobile basics: 16 px inputs (no iOS zoom), `type=email` + `autocomplete=email`, and a full-width submit.
3. Social row: LinkedIn · GitHub (with `rel="me"`).
4. The header's Contact button opens the same slip as a drawer, so contact stays 1 click from anywhere (synthesis).

## h) Developer footer (useful + SEO)

Already covered by the UI track: oversized wordmark, the Cursor utility footer (language + 3-way theme), status pill, text-mode toggles, local time, "no mega-sitemap", "repeat email + CV". New here:

**SEO features of 23 well-known dev portfolios (raw HTML, 2026-10-05)** [measured; script `sec-seo.mjs`]:

| Feature | Count | Who |
|---|---|---|
| JSON-LD `Person` / `ProfilePage` | **9/23** | leerob, rauno, taniarascia, maggieappleton, derolez, olaolu (`ProfilePage` + `Person`), zenorocha, cassidoo, csswizardry |
| A real `/llms.txt` (text/plain) | **4/23** | cassidoo, swyx, overreacted, csswizardry (antfu returns an HTML soft-404 with status 200) |
| `rel="me"` identity links | 2/23 | maggieappleton (7), csswizardry (1) |
| RSS link inside `<footer>` | 5/23 | joshwcomeau, taniarascia, kentcdodds, maggieappleton, swyx |
| `mailto:` inside `<footer>` | **2/23** | dennissnellenberg, olaolu |
| `hreflang` | 0/23 | none bilingual |
| `<h1>` in raw HTML | 20/23 | missing on emilkowal.ski, ped.ro, overreacted.io |

**Footer sizes** [measured, desktop, in vh / number of links]: CSS Wizardry 0.14 / 1 · Evil Martians 0.15 / 6 · Amp 0.33 / 21 · Factory 0.48 / 20 · Maggie Appleton 0.53 / 18 · Linear 0.55 / 42 · Josh Comeau 0.59 / 22 · Zed 0.70 / 37 · Vercel 0.94 / 81 · Stripe 1.22 / 86.

| Example | Steal | Skip |
|---|---|---|
| [Josh Comeau](https://www.joshwcomeau.com/) · `sec-joshwcomeau-*-footer.jpg` | Footer links to **topic hubs** (crawlable internal links), a utility icon row (search · sound · theme · RSS · socials), legal row. Mobile **drops the category column** but keeps courses + general | Newsletter (only if he writes) |
| [Maggie Appleton](https://www.maggieappleton.com/) · `sec-maggie-desktop-footer.jpg` | "Subscribe via RSS Feed", social icons, two columns of site sections including **Now** and **Colophon**; `WebSite` + `Person` + `WebPage` JSON-LD and 7 `rel="me"` links | — |
| [Paul Stamatiou](https://paulstamatiou.com/) · `sec-stamatiou-desktop-footer.jpg` | One line: "Handcrafted by Stammy for **21.07 years** · Contact". A computed tenure as personality | Too sparse for a hiring site |
| [Vercel](https://vercel.com/) · `sec-vercel-desktop-footer.jpg` | "● ALL SYSTEMS NORMAL." + a compact theme switch | 81-link mega footer |

**Recommended footer: the drawing's revision block** [opinion], 40–60 vh on desktop.
1. **Last-chance contact:** Copy email · CV PDF · Book a call.
2. **≤ 10 crawlable links:** the 4 case studies · All work · CV · Colophon ("how this site was built", case study #0) · Uses/Now (optional) · Privacy. Plus LinkedIn/GitHub with `rel="me"`, the language switch (autonyms, `hreflang` partner link) and the theme switch.
3. **Revision row (mono, small),** all generated at build time, no client JS:
   `REV 2026-10-05 · commit a1b2c3 ↗ · Lighthouse mobile 97 (CI) · built with Next.js · source ↗ · llms.txt · text mode · © Mateusz Muszarski`.
4. **Head, not footer:**
   - `Person` + `ProfilePage` JSON-LD (`name`, `jobTitle`, `sameAs` [LinkedIn, GitHub], `knowsAbout`, `address.addressLocality`, `email`).
   - `/llms.txt` as a plain-text CV + project index (Jesper Landberg already does this, per the Awwwards track).
   - `sitemap.xml`; reciprocal `hreflang` EN/PL + `x-default`. 0 of the 23 portfolios had `hreflang`, so a bilingual one is rare.
5. **390 px:** a single column. Contact first, links as 2 columns of 44 px targets, the revision row wrapping.

## Registry components

Searched with Shoogle, then inspected with `bunx shadcn@latest view` (2026-10-05). "Src" = characters of component source (not gzip), a rough size signal. The reject list in `usage/shoogle.md` applies: remote `registryDependencies`, odd targets, CMS imports, paid.

| Name | Registry | Install | Weight / deps | Fit |
|---|---|---|---|---|
| `iphone` | @magicui | `bunx shadcn@latest add @magicui/iphone` | 5.9 k src · React only · `videoSrc` / `src` props | **Geometry reference** for `<DrawnPhone>`. Its video uses `autoPlay` + `preload="metadata"`: change to `preload="none"` + poster + IntersectionObserver + pause, and restyle as line art |
| `safari` | @magicui | `… add @magicui/safari` | 13.1 k src · React only · `imageSrc` / `videoSrc` | Reference for `<DrawnBrowser>` (minimal chrome) |
| `mock-browser-window` | @cult-ui | `… add @cult-ui/mock-browser-window` | 10.7 k src · reg dep `texture-overlay` | Alternative browser chrome (Chrome / Safari / generic) |
| `iphone-mockup` | @gaia | `… add @gaia/iphone-mockup` | 10.7 k src · no deps · `role="img"` | Accurate geometry (390×815 chassis, 56/46 px radii, 120×37 Dynamic Island) for the drawn phone's dimension lines |
| `stacking-cards` | @cnippet | `… add @cnippet/stacking-cards` | 2.3 k src · `motion` · `sticky top-0` | Desktop "sheets laid on the table". **No reduced-motion handling:** add it, or hand-build with pure CSS `position: sticky` (0 KB JS, preferred) |
| `stacking-cards` | @stealth | — | 6 k src · `motion` · **remote** registry deps (URLs) | Reject (remote deps) |
| `css-card-stacking` | @ui-layouts | — | imports `lenis/react`; target is a `.txt` in a registry path | Reject (Lenis + odd target) |
| `copy-button` | @hirael | `… add @hirael/copy-button` | 4.6 k src · `lucide-react` + `button` · **`execCommand` fallback for non-secure contexts** · `role="status" aria-live="polite"` | **Best fit** for the contact slip, drawer and footer |
| `terminal` | @stealth | (vet first) | 19.3 k src · `@base-ui/react` + `motion` · 5 remote reg deps · **honours reduced motion** · "types itself… in space it already reserved" (no CLS) | AI section session replay. Port by hand because of the remote deps |
| `video-player` | @soralabs | `… add @soralabs/video-player` | 86 k src · `motion` · chaptered timeline, keyboard shortcuts, focus trap, reduced-motion aware | Click-to-play **chaptered walkthrough** (the Amp pattern, Stamatiou's chapter picker). Lazy-load on click only |
| `timeline-1` | @7ovr | `… add @7ovr/timeline-1` | 4.9 k src · `@base-ui/react` + `badge` | Milestone rail with Shipped / In progress badges. Optional for the process or credentials |
| `timeline` | @diceui | — | `view` returned "not found" | Skip |
| `bento-3` | @7ovr | `… add @7ovr/bento-3` | 6.3 k src · no deps | Hairline bento with a build-pipeline tile + terminal snippet: a layout reference for §e |
| `marquee` | @magicui | `… add @magicui/marquee` | 1.6 k src · `pauseOnHover` only | Avoid for credentials. If ever used, add a visible pause button (WCAG 2.2.2) |
| `table-of-contents` | @toc-cn | `… add @toc-cn/table-of-contents` | 23.5 k src · `lucide-react` + 5 shadcn primitives · scroll-spy, SVG tree indicator, mobile sticky collapsible | Case-study pages, not the home |
| `command-palette` | @hirael | (vet) | 13.5 k src · shadcn `command` (cmdk) + remote `kbd.json` | ⌘K with nested pages + recents. Or build on shadcn `command` directly (UI track). Lazy-load |
| `qr-code` | @cubby-ui | `… add @cubby-ui/qr-code` | 63 k src across 15 files, zero deps | Prefer a **build-time static SVG QR** (0 KB JS) for Linkoglot's store link |
| `contact-routing-form` | @payload-components | — | imports `payload` (CMS) | Reject |
| `contact-10` (booking layout) | @shadcncraft | — | 401 (paid) | Skip |

## Proposed section order + height rhythm

Heights in viewport heights at 1440×900. "auto" = content height on mobile. Rhythm modelled on Linear's measured *tall ×4, then thin bands* (§f).

| # | Section | Desktop | 390 px | Why here |
|---|---|---|---|---|
| 0 | Sticky header: name · Work · About · CV · **Contact** (opens the slip drawer) | 56–64 px | 56 px | Contact and CV 1 click from anywhere (synthesis) |
| 1 | **Hero, "title sheet"**: H1 + skim-line value sentence (a1) + proof strip (a6) + 2 CTAs; signature drawing after LCP | **~0.85 svh**: sheet 01's edge and title-block tab peek at the bottom (Stripe's hero is 0.76) | auto, ≤ 1 screen including both CTAs | Proof in 3 s; the next section visibly invites a scroll |
| 2 | **Sheets 01–04** (PstrykWeb, Linkoglot, 3D space, Clockful) | each `100svh − header` (≈ 1.0), sticky-stacked like paper | auto (~1.2–1.8 screens each), static stack | Projects are the product; Linear runs 4 chapters of ~1.37 vh back to back |
| 2b | "All work (N) →" sheet-edge tab to `/work/` | ~0.15 | ~0.2 | Makes "4 of many" explicit; a thin band after the tall run |
| 3 | **Engineering economics** (decision ledger + 4-phase process + principles with receipts) | 0.6–0.8 | auto (~1.5 screens) | The product-engineer differentiator for software houses comes right after the proof it references |
| 4 | **Process drawing: AI workflow** (steps + flow diagram + artefact links + optional click-to-play session) | 0.9–1.1 (the diagram needs room) | auto (~1.5–2 screens, vertical flow) | The "how" after the "what" and the "why". Verification is the centrepiece |
| 5 | **Parts list & revisions**: highlights strip + credentials ledger (6 rows + "Show all") | 0.2 + 0.4–0.5 | auto (~1.2 screens collapsed) | Low hiring weight (showcase track), so late and compact, but verifiable |
| 6 | **Contact slip** | 0.5–0.7 | auto (~1.2 screens) | Natural end of the argument; also always reachable from the header |
| 7 | **Footer revision block** | 0.4–0.6 | auto (~1–1.3 screens) | Last-chance contact + crawlable links + build receipts |

**Total ≈ 8.5–9.5 vh on desktop.** That sits between Things (9.0) and Linear (11.1); dev portfolios are 3–7, product sites 11–18.

Rhythm rules [opinion, from the measurements]:
- Never more than 4 consecutive ~1 vh sections, and the 4 are the chapters.
- Every non-chapter section is a band (≤ 0.8 vh) except the process drawing.
- On mobile nothing is height-locked. Linear's chapters shrink to ≈ 0.68 vh at 390 px, so content height, not `100vh`, drives it.
- Use `svh`, not `vh`, for anything that must fit the visible phone viewport (dynamic toolbars).

**Open alternative for the owner:** if the target software houses weigh the Polish *technik programista* qualification heavily, add a single highlights cell for it to the hero's proof strip (a6) and keep the ledger in place. The showcase track recommends never putting certificates in the hero itself.

## Sources

All accessed 2026-10-05.

**Live captures** (Playwright 1.63 + Chrome, 1440×900 and 390×844 @2x, JPEG q70, files `inspirations/img/sec-*.jpg`). Probe data (raw-HTML `<h1>`, video attributes, sticky count, section heights, footer, transfer MB) is in `tools/data/sec-probe.jsonl` (script `tools/sec-cap.mjs`). The SEO probe is in `tools/data/sec-seo.jsonl` (script `tools/sec-seo.mjs`).
- Hero: https://ped.ro/ · https://railway.com/ · https://www.metalab.com/ · https://kentcdodds.com/ · https://jakub.kr/ · https://www.nan.fyi/
- Theming: https://press.stripe.com/ · https://www.14islands.com/ · https://www.instrument.com/work · https://linear.app/changelog
- Devices: https://culturedcode.com/things/ · https://www.apple.com/macos/continuity/ · https://linear.app/mobile
- Business: https://evilmartians.com/ · https://csswizardry.com/ · https://linear.app/method
- AI: https://ampcode.com/ · https://factory.ai/ · https://tools.simonwillison.net/colophon · https://zed.dev/agentic
- Credentials: https://cv.jarocki.me/
- Contact: https://cal.com/peer
- Footers: https://www.joshwcomeau.com/ · https://paulstamatiou.com/ · https://vercel.com/ · https://www.maggieappleton.com/
- Rhythm (probe only): https://stripe.com/ · https://linear.app/ · https://www.raycast.com/ · https://resend.com/ · https://www.apple.com/iphone/ (detector failed: one wrapper) · https://brittanychiang.com/ · https://dennissnellenberg.com/ · https://emilkowal.ski/
- SEO probe, raw HTML (`sec-seo.mjs`), 23 portfolios: joshwcomeau.com, leerob.com, brittanychiang.com, paco.me, rauno.me, emilkowal.ski, antfu.me, taniarascia.com, paulstamatiou.com, kentcdodds.com, maggieappleton.com, jakub.kr, ped.ro, dennissnellenberg.com, derolez.dev, olaolu.dev, zenorocha.com, cassidoo.co, swyx.io, overreacted.io, lynnandtonic.com, nan.fyi, csswizardry.com
- Embed weights: https://app.cal.com/embed/embed.js (~91 KB decoded) · https://assets.calendly.com/assets/external/widget.js (~12 KB) + widget.css (~2.5 KB)

**Fetched text**
- https://csswizardry.com/case-studies/ (index has no numbers)
- https://evilmartians.com/ (result lines, "AI Harnesses")
- https://linear.app/method (numbered outline)
- https://every.to/guides/compound-engineering (Plan → Work → Review → Compound; 80% plan + review; 26 agents / 23 commands / 13 skills; K. Klaassen & T. Chow; undated)
- https://harper.blog/2025/02/16/my-llm-codegen-workflow-atm/ (2025-02-16)

**Search (2 of the shared budget)**
- https://youth.europa.eu/solidarity/validate_en
- https://www.youthpass.eu/en/help/faqs/youthpass2021-2027/
- https://zawodowe.edu.pl/kwalifikacje-w-zawodzie/inf-04/
- https://kwalifikacje.gov.pl/zrk2/current/public/kwalifikacja/12983&doc=true
- https://bip.cke.gov.pl/attachments/download/9220 (CKE informator)

**Mobbin (web sections/screens)**
- Devices:
  - [Riverside](https://mobbin.com/sites/sections/601ce269-1efe-407c-9fb5-7272f7504f43)
  - [Notion](https://mobbin.com/sites/sections/60a559ff-803a-4207-b39f-1988f1420014)
  - [Apple](https://mobbin.com/sites/sections/a2f54b99-919c-4a5b-97c5-0cf35b841a62)
  - [Mural](https://mobbin.com/sites/sections/2385468d-bbbc-451c-87f1-e528b9151471)
  - [Framer](https://mobbin.com/sites/sections/e31ec4d6-1dc4-4f2e-bd3a-7e6588adbb01)
  - [Wispr Flow](https://mobbin.com/sites/sections/ddc48c4a-43de-4cdc-89f0-791148ca1b3e)
- Case cards:
  - [Tines](https://mobbin.com/sites/sections/d7394009-61e7-4170-8a9f-a34aaca78a25)
  - [Clay](https://mobbin.com/sites/sections/66ffa87c-0bf5-47fe-acd4-2018636364a1)
  - [Customer.io](https://mobbin.com/sites/sections/4ff8eb23-5dca-4085-b6dc-f94fefe41976)
  - [Contra](https://mobbin.com/sites/sections/005afd6c-c2e6-4b81-8b19-b0453d4871df)
  - [Instrument](https://mobbin.com/sites/sections/05811dd7-a07a-41ae-9fa7-192b8eede1b1)
  - [Contractbook](https://mobbin.com/sites/sections/baea2cfc-b770-44d4-802d-52700c67ead2)
- Process:
  - [Wild](https://mobbin.com/sites/sections/1bac0acb-c4fe-46ec-acd7-fe0bf057faf2)
  - [Atlas](https://mobbin.com/sites/sections/f4bb0189-fdb7-4075-a704-8f2f7b91f926)
  - [Craft Agency](https://mobbin.com/sites/sections/698886b8-377c-40e9-97e1-767a59eb9f28)
  - [Anima](https://mobbin.com/sites/sections/fb48321e-47e3-4800-9680-e9e5c9af9270)
  - [Daydream](https://mobbin.com/sites/sections/c93f0730-2be5-4d34-b6e6-c7ae4da069b7)
- AI:
  - [Cloudflare agents](https://mobbin.com/sites/sections/c70381eb-7c40-49e2-8500-3aa1385d9efb)
  - [Cloudflare generative/agentic](https://mobbin.com/sites/sections/fc321e05-769e-4f3a-b404-aad0f87301e7)
  - [Runner](https://mobbin.com/sites/sections/2a7bf924-dcef-490b-ae4d-f9ed8bbec018)
  - [Linear agents](https://mobbin.com/sites/sections/45eb5e36-ec17-4e15-bb2c-70472761a434)
  - [Heron AI](https://mobbin.com/sites/sections/b9316f64-5154-4826-ba08-759cb29bbf75)
  - [Greptile](https://mobbin.com/sites/sections/a40ecf6e-dc62-4e36-acfa-ba2e27f4688a)
  - [Ada](https://mobbin.com/sites/sections/8b9d52f3-05d9-47d9-81a2-aad5a6a8fa71)
- Credentials:
  - [basement.studio](https://mobbin.com/sites/sections/bb09f59f-11c2-4b8c-9858-b424eacabb8b)
  - [Büro](https://mobbin.com/sites/sections/70c3a42f-4d7d-4142-b657-5d512360f7f5)
  - [Locomotive](https://mobbin.com/sites/sections/3972031f-245c-461e-bed8-9b8845b92fd0)
  - [Craft](https://mobbin.com/sites/sections/f708431b-4051-472b-9494-a2d98b738a5c)
  - [Hims](https://mobbin.com/sites/sections/c30e9ea3-98bc-4f93-9620-0171ac97cbc5)
  - [MasterClass instructors](https://mobbin.com/sites/sections/797fcbf2-a089-4078-9e7c-c0339b4bf482)
  - [Skillshare](https://mobbin.com/sites/sections/935733d7-1755-4eae-b4d7-010320758748)
- Contact:
  - [Biograph](https://mobbin.com/sites/sections/921aedd1-a3b1-4c3c-aa24-a5208212c47b)
  - [Charma](https://mobbin.com/sites/sections/5bf003e4-ce42-46f0-b15a-7fd5a2ca6950)
  - [United Carriers](https://mobbin.com/sites/sections/7e65a424-f68b-4e4d-81b4-fa938436dc52)
  - [Lightship](https://mobbin.com/sites/sections/0791334e-985a-4902-b866-3be56684576c)
  - [Shader](https://mobbin.com/sites/sections/4d6c6c50-ebc6-4765-8847-faf418e7690c)
  - [Calendly booking](https://mobbin.com/screens/57876292-340c-408a-9563-fe0ab9f5dcbd)

**Registry:** Shoogle MCP queries `iphone`, `browser`, `stacking cards`, `timeline`, `marquee`, `bento`, `copy button`, `contact form`, `table of contents`, `terminal`, `command palette`, `qr code`, `video player`; item JSON via `bunx shadcn@latest view` (not kept; re-run `view` before installing).

**Inspiration notes written:**
- Hero, theming, devices: `inspirations/sec-ped-ro.md`, `sec-railway.md`, `sec-stripe-press.md`, `sec-things.md`, `sec-linear-mobile.md`, `sec-instrument.md`, `sec-nan-fyi.md`
- Business, AI, credentials, footer, rhythm: `sec-evil-martians.md`, `sec-ampcode.md`, `sec-simon-willison-colophon.md`, `sec-basement-awards-ledger.md`, `sec-maggie-footer.md`, `sec-linear-home-rhythm.md`

38 screenshots `img/sec-*.jpg` (3.1 MB).

Not covered:
- **Real-device testing:** all emulated, single runs on a shared machine, so read MB figures as rankings.
- **Section heights** come from a DOM heuristic (descend through single-child wrappers). It failed on apple.com/iphone, Metalab, Amp and Brittany's split layout, so those were excluded from the rhythm table.
- **Stacked-sticky-card behaviour on a live production site** was not observed (no captured site used it for projects). The mobile guidance for it is [opinion] + registry code review.
- **Motion and timing** (draw-on, sheet transitions) were judged from static captures only.
- **Calendly's full iframe weight** (only `widget.js` was measured).
- **Recruiter-side evidence** that business/AI sections change hiring outcomes (none found; anchored on CoderPad 2026 via the showcase track).
- **Verification of specific course platforms' certificate URLs** (Three.js Journey, Udemy) was not checked live.
- **The owner's actual credential list and project media** (needed to size the ledger and the 4 sheets).
- **Godly, Land-book, SiteInspire and OnePageLove** were not browsed this pass; Mobbin + direct URLs covered the needs.
