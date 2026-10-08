# Design system: Poster

> Owns the art direction, tokens, type, components, motion, imagery and design do/don't. Scoring a view:
> `design-quality.md`. Sections and pages: `structure.md`. Media and licences: `assets.md`.
> **History:** the owner rejected the first look (Drafting Table, slices 0-1) on 2026-10-05, picked **Poster** from four
> live directions, and refined it over rounds 2 and 3 (`comps/poster-r3.html` is the reference comp). Every version is
> kept (`comps/HISTORY.md`). Production build started 2026-10-05 [user: "lets finally start coding"]: header, hero and
> tool band are built; the comp is a mock-up to improve on, not a spec to copy pixel for pixel [user].

## Art direction

- **Mental model:** the site is a series of printed posters. Each section is one flat colour field; the type is fitted
  edge to edge; depth is a hard offset shadow; a fine print grain sits over everything [user picked, round 1].
- **Signature moment (F20):** the fitted name in the hero. It renders final from the server (no JS on the LCP path);
  after load the letters breathe as an accordion that follows the pointer and idles as a slow wave. No WebGL in the
  hero; 3D lives only inside the space chapter's own media.
- **Less text, more to see** [user, round 3]: tools as one-colour marks with names, products as video, one line of
  copy where a paragraph was. Inside a chapter, a short plain description (`.desc`, 2-3 sentences) now beats icon tiles
  [user 2026-10-06: PstrykWeb's tiles and icon facts were replaced by text].
- **Composition and focal points first** [user 2026-10-06, his words: "think about composition and focal/focus points
  more, so that its not overwhelming, more intuitive and obvious where the CTA is, prioritize things by importance and
  the order we want users to look at them. I just want this site to be easy to use and intuitive for recruiters."]:
  - one primary action per block, read in a fixed order (§ Components, Chapters)
  - what the landing no longer emphasises moves to a blog post or case study, never deleted (e.g. the space site's
    Lighthouse numbers live in the "how this site was built" post)
- **Alive, cheaply** [user]: many small loops and micro-interactions, each pausing offscreen, on the pause button and
  under reduced motion; none on the load path.
- **Fun, not overly fun** [user 2026-10-08, ditching the All projects TV + spy room: "i didnt want to overdo the vector
  illustrations so very often, and make it look sort of slightly unprofessional. it was meant to be 'fun', but not that
  overly fun"]: drawn props (a TV, lasers, a safe, cameras) are a seasoning, not every section's dish. Prefer real
  media, type and one interesting component (a shader, a lens) over another illustrated scene; a wink is an emoji, not
  a gag with copy.
- **Same on every device** [user]: phones get the same content and a premium feel; every hover has a tap, focus or
  scroll twin; layouts are tweaked per platform where UX gains.

## Themes and fields

**One theme: Cobalt**, for everyone, not tied to the system light/dark setting [user 2026-10-06: the Paper/Ink switch
was cut as clutter]. `ThemeCycle.astro`, `e2e/theme.spec.ts` and the Paper/Ink tokens are deleted; `ThemeScript.astro`
still runs before first paint, but only sets `html.js` and the stored motion pause [repo: layout/ThemeScript.astro].
Tokens: `apps/web/src/styles/global.css` `:root`; `tokens.test.ts` checks AA for every field pairing.

| Field (`.field-*`) | Background / text | Used for |
| --- | --- | --- |
| hero | `#2433FF` / `#EEF0FF` | hero, header at rest, latest writing |
| alt | `#EEF0FF` / `#0A0D33` | How I work, credentials |
| deep | `#2433FF` / `#EEF0FF` | AI |
| bar | `#0A0D33` / `#EEF0FF` | header when stuck, tool band, menu, footer |
| accent | `#FF4FB8` / `#0A0D33` | contact section, CTAs, sticker |

- Components read `--sbg` / `--sfg` (the field they sit on) and `--accent` / `--on-accent`, never a raw colour.
- **Project skins** (one per chapter, `styles/chapters.css`): PstrykWeb yellow `#FFD23F` with navy text, Linkoglot
  orange `#FF5B1F`, Clockful lime `#C9F24A`, Space `#07081C` with ice text; each sets `--pop`, the colour of its
  primary buttons' resting shadow (the accent field sets cobalt).
- Content caps at 1920 px (`--container-poster`), centred with `--pad-x`; fields bleed full width.

## Typography

- **One face: Anybody** (OFL, variable `wdth` 50-150, `wght` 400-900), self-hosted, one 49.5 KB file, preloaded
  (`bun run fonts`). Metric-matched Arial fallbacks per weight band keep the swap shift-free.
- **The width axis is the hierarchy:** fitted display at 900; role lines condensed (`font-stretch` 62%); kickers and
  buttons wide (115-125%) uppercase; body at 100%, 17-19 px, line-height 1.5, ≤ 34-68 ch.
- **Fitted type (`Fit.astro` + `~/lib/fit.ts`):** the widest line at the base width (66 under 700 px of host, 96 above)
  sets the size; every other line takes the `wdth` that makes it exactly as wide. Advances and kerning of Anybody 900
  are linear in `wdth`, measured at 50 and 150 by `scripts/fonts.mjs` into `fit-metrics.gen.ts`, so the CSS is exact:
  `font-size` in `cqi` of the host + `font-stretch` per line. Unknown characters fail the build.
- **Letter accordion (enhancement):** after load + idle, each line splits into letters (one hidden copy speaks for
  screen readers), each letter is measured once at 50 and 150, and frames run on that linear model: letters near the
  pointer widen, a slow sine wave idles otherwise, the slope-weighted mean is subtracted so the line stays flush. No
  layout reads per frame; off when offscreen, paused or reduced motion.

## Components (built)

| Component | File | Notes |
| --- | --- | --- |
| Header | `layout/SiteHeader.astro` | sticky; on home starts on the hero field with "M—M", turns into the bar and rolls the mark into the full name once the hero name scrolls away (IntersectionObserver). ≥ 1180 px: mark → home · Work · How I work · AI · Blog · flags · CV · **Hire me** (the primary) [user 2026-10-06]. Below 1180: mark · CV · Hire me · Menu; under 480 the button type condenses (`wdth` 82, 72 under 360) and the CV + Menu icons drop, so all fit at 320 |
| Menu | same file | native popover, full-screen bar field, giant condensed links that widen on hover/focus and stagger in: Work · How I work · AI · Blog · My life · Contact; then Download CV + pause motion; flags with names ("Polski") |
| CV button | `layout/CvLink.astro` | the one CV control [user 2026-10-06], replaces the split button (`CvSplit.astro` deleted): header "CV", hero + menu "Download CV" (secondary outline), footer as a text link. Behaviour: `structure.md` § `/cv/` |
| Language switch | `layout/LocaleCodes.astro` | drawn flags (CSS gradients + an SVG data URI, never emoji), current one underlined, a small tilt on hover; the autonym is screen-reader text + a `title` tooltip, visible next to the flag with `names` (menu). Why flags: `i18n.md` § Switcher |
| Hero | `home/Hero.astro` | fitted name (H1 = LCP), 3 px rule that draws in, three columns: role · one-line lede (P6) · CTAs (See the work = primary, Download CV = `CvLink`) + three icon facts. Entrances are CSS (`.rise`) |
| Sticker | `home/Sticker.astro` | accent disc, ring text fitted to the circle at build time per locale, "Shipping since 2022", slow spin; over the name's last letter on desktop, beside the role on phones. The spin turns an HTML wrapper (`.st-spin`), never the `<svg>`: Chrome can't composite an SVG's transform, and the spinning `<svg>` re-laid out the page every frame (2026-10-07; same for PstrykWeb's burst, `.pw-spin`) |
| Tool band | `home/ToolBand.astro` | bar-field marquee of one-colour marks + names, edge to edge; one row from first paint (no shift), copy appended by JS; never stops on hover and has no button of its own [user 2026-10-05]: the site-wide Pause motion (menu, footer) covers WCAG 2.2.2; wraps without JS or under reduced motion |
| Footer | `layout/SiteFooter.astro` | say-line + Contact, 4 link columns pulled left (`.cols` = `max-content` + `1fr`) [user 2026-10-06], "All projects →" with an arrow [user 2026-10-07], flags, pause, credits (marks, icons, font), "Built with Astro and love"; the revision (date + commit) shows on review builds only, never at launch (`IS_FULL_PRODUCTION`) [user 2026-10-07], the surname fitted in accent |
| Buttons | `global.css` `.btn` | square, uppercase, wide. Hierarchy [user 2026-10-06]: **primary** `btn-acc` / `btn-inv` rests on a 4 px hard shadow (`--btn-shadow`; `btn-inv` takes `--pop`, set per field and chapter skin; 3 px in the header); **secondary** `btn-line` is an outline (a 3 px shadow only on hover); anything unframed is a label, not a control. Hover (fine pointers) lifts a primary and grows its shadow to 7 px; a press sinks it into the shadow |
| Tools | `ui/StackList.astro` + `.stack` (`global.css`) | a "Built with" kicker, then one-colour mark (or a two-letter monogram) + name as plain text; no frame, no hover, so a tool never reads as a button next to the real CTA [user 2026-10-06]; the last item of each chapter |
| Icons | `ui/Icon.astro`, `bun run icons` | Simple Icons marks (`si:`), Tabler outline (`tb:`) and filled (`tbf:`) from a generated list; `<use>` into one cached, content-hashed sprite (`/icons/sprite-<hash>.svg`, `~/lib/sprite.ts`); header and hero icons are `inline` so the first screen never waits for it |
| Pause motion | `layout/MotionToggle.astro` + `scripts/motion.ts` | every copy in sync; stored; hidden under reduced motion |

**Built 2026-10-05 (overnight build [user: "build everything ... in one go"]):**

| Component | File | Notes |
| --- | --- | --- |
| Chapters | `home/Chapters.astro`, `home/chapters/*.astro`, `styles/chapters.css` | 4 skins (yellow, orange, lime, space); sticky stack (JS sets each chapter's `top` so the poster sticks when its bottom meets the viewport); rights gate drops client/internship chapters at launch; then "Also shipped" (two tilted tickets, Malatro and yws.lu, in lime / orange, each a link with a site preview, name and one line; they straighten on hover or focus) + "All projects", on its own lighter navy (`--midnight`) with soft colour blobs (cobalt, pink, violet, orange) wandering on two out-of-step loops, no dots [user 2026-10-08: "move more and be more alive"]; the label is a tilted ice tag with a pink offset shadow [user 2026-10-08]; one row tall from 70 rem up (the label sits on two lines before the tickets), the tickets side by side from tablet width [user 2026-10-07: as small in height as possible]. **Backdrops** [user 2026-10-06: subtle illustrations like Space's stars]: `ChapterBackdrop.astro` puts the project's motifs as faint drifting line icons over a pattern (PstrykWeb dots, Linkoglot ruled lines, Clockful timesheet cells) at 10 %, under everything; Space keeps its stars. **Reading order** [user 2026-10-06]: badge → title → media → outcome → description (`.desc`) → one primary CTA → status → tools. ≤ 900 px stacks exactly so (`.stage-first`); wider, copy and media sit side by side (Linkoglot: copy · phone · CTAs, three columns). Linkoglot shows App Store + Google Play as two equal primaries; Space shows Launch (primary; "Desktop only · copy link" on touch) + Code (secondary), and its fitted title comes last, closing the poster |
| Chapter badge | `home/chapters/ChapterBadge.astro` | the tilted chip that opens a chapter: kind · who · year, so the context reads before the title [user 2026-10-06]. Replaced the 3-cell bar ("OWN PRODUCT" + a "01 / 04" counter). PstrykWeb "Commercial · Cetuspro · 2026" (never "solo", never "team" [user 2026-10-06]), Linkoglot "Own product · solo · 2026" (with its app icon), Clockful "Internship · Neoteric · 2026", Space "Personal · solo · 2025" |
| Reel | `scripts/reel.ts` | sources attach after the first interaction AND near view; plays at 50% visible, pauses offscreen, on Pause motion and under reduced motion. **No playback bar** [user 2026-10-06: `ReelControls.astro` and the lightbox deleted]: a `.r-hit` button over the frame pauses or resumes (labelled Play / Pause video); the big play glyph is visual only; the site-wide Pause motion still covers WCAG 2.2.2 |
| PstrykWeb stage | chapter 01 | #1 burst (ring text fitted at build), drawn order loop (CSS, 10 s), "Video soon" (P18); public info only. Copy: a short `.desc` (public info) in place of the 3 icon tiles and the "For local businesses" / "Built solo" icon facts [user 2026-10-06]. CTA "Visit pstrykweb.pl" (the landing, not the konfigurator), status "Live" [user 2026-10-06] |
| Linkoglot stage | chapter 02 | phone breaks into the title (overlap computed from the build-time fit), flash card flip, the owner's store preview as interim loop (AV1 + H.264, 0.5 MB, P8). The phone's width is capped by the viewport height (`(100svh - header - 4.5rem) × 320/694`), so the whole phone fits under the sticky header on short laptop screens |
| Clockful stage | chapter 03 | drawn dashboard; a real demo timer in CSS only (`@property` integer + counters), Start/Stop. The 4 stats (118 tests, 5/5 RLS tables, 15 requirements, 9 days) sit under the stage, small, each with its icon again (test pipe, shield lock, checklist, calendar [user 2026-10-06]) (`.mstats`, 2 columns on phones); an explainer `.desc` took their old place [user 2026-10-06] |
| Space stage | chapter 04 | monitor + loop cut to Mars and Jupiter (planet textures CC BY 4.0, credited; the stops with third-party logos and the uncredited lens-dirt texture are left out); stars only in the background, the CSS orrery removed [user 2026-10-08]. The Lighthouse receipt (34 / 60 / 13.8 MB) is removed: those numbers live only in the "how this site was built" post [user 2026-10-06] |
| How I work | `home/HowIWork.astro` | 7-stop ring (CSS trig), every stop's text in the HTML, auto-advance while visible, tap holds 9 s; receipts fall back when a project is hidden by the rights gate. Each stop opens on a **drawn scene** in its receipt's colour [user 2026-10-06: "more visually storytelling", less reading]: client (shop + an earnings bubble), users (a phone snaps, flashcards deal out), conversion (a short form fills, a tap, a check), revenue (free trial → monthly / yearly, RevenueCat mark), code (a test terminal: Clockful's 49 Vitest / 69 Playwright / RLS 5/5 + a "118" sticker; the fallback shows this site's checks), ship (both store badges checked, a rocket), measure (gauges 34 → 99). CSS only, sized in container units; paused or reduced motion shows the finished picture. The stop line shrank to a caption |
| AI workflow | `home/AiWorkflow.astro` | one change told as a story in seven steps [user 2026-10-06], redrawn 2026-10-07 so every slide reads without knowing the tools [user: "make them intuitive and perfect"]. The team on top (Me, Claude Code, Wiki, Subagents, MCP, Hooks, Skills + gates), each a button that jumps to the step showing its job; story bars; one drawn scene + one caption + tool chips per step, all on the same task (a contact form). Scenes: **Brief** a paper with real lines (Goal / Limits / Done), Claude answers "On it. Briefing the team."; **Memory** the real `project-info/` folder, the routing hook's chip "task: contact form" picks `structure.md` and `lessons.md` (marked READ), copies fly to Claude, the rest dim; **Research** three subagents type their queries, findings fly into a "Findings" sheet; **Tools** Mobbin / shadcn / Playwright, each named with what it brings, wired into an MCP plug above Claude, data pulsing down the wires (SVG dash offsets); **Build** a terminal, `git push --force` struck with a "blocked by a hook" tag; **Check** a labelled checklist (Types, Lint, Unit tests, Browser tests, Accessibility, Speed) ticking green; **Review** an APPROVED stamp, a real lesson typed into `lessons.md`. Drawn in container units on a 16:6 stage (2:1 tablets, 4:3 phones, where wide scenes drop a secondary piece and grow); paused or reduced motion shows the finished picture. **No counts**. One CTA, "How this site was built" |
| Credentials | `home/Credentials.astro` | from `data/cv.ts`. > 900 px: a readable list on the left, the open row's media + details on the right (hover on fine pointers, focus or tap opens a row; one is always open). ≤ 900 px: an accordion [user 2026-10-06]; opening a row scrolls it under the header [user 2026-10-08]. Each credential has its own palette pair: a tilted icon tile in the list, the open row's fill, the panel with a hard shadow. Kinds: Start here (experience), Qualification, Course, International, Teamwork, **Knowledge** [user 2026-10-07]. Media are drawn scenes, not stacks of ticket cards [user 2026-10-07]: the exam sheets stamped PASSED (INF), a course player and an editor with challenges (Jonas), a flight between the places with hellos in their languages (international: Latvia, Lithuania, Georgia, Türkiye; names alternate rows on phones), a team, a clock and three cities (hackathons), a Notice → Trust → Act funnel that converts (knowledge). Proofs are small secondary chips under the scene (none on the international card); the knowledge card's primary button opens the post on psychology in UX [user 2026-10-07]. **Idle tour** (> 900 px): after 5 s with the list in view and no hover, focus or click there, a drawn cursor clicks the next row; off under paused or reduced motion. Media loads on open; all open without JS |
| Latest writing | `home/LatestWriting.astro`, `blog/PostCard.astro` (`compact`), `blog/PostCover.astro` | the case study on this site always first [user 2026-10-07], then the newest posts (at most 8); compact [user 2026-10-06]: kicker + plain h2 + "All posts" on the right, small horizontal cards (cover thumbnail, date, title); covers are code-drawn SVG pictures, one per topic with its own fixed palette (ground + one ink + one accent; never orange next to pink) and no words on them [user 2026-10-06: better harmonies, more intuitive, no text]. The same palette shows on the index, the teaser, the post and its OG image. Cards are paper notes with a strip of tape, a slight tilt and a hard shadow on a faint dot grid; a drawn pencil inks them in |
| Contact | `home/Contact.astro`, `lib/contact.ts`, `api/contact.ts` | the Copy email tile is the widest and wraps the address at the "@", never cuts it [2026-10-06]; message first; reply field appears after typing and fills itself from the message; optional topic chips (A job / A project / A question); Turnstile on first keystroke; works without JS (303 to `/contact/sent/` or `/contact/error/`). Three direct tiles: Copy email, LinkedIn, GitHub (the CV tile and the "Open to selected freelance projects" line are removed [user 2026-10-06]) |
| Pages | `pages/[locale]/{work,cv,cv/print,my-life,privacy,terms,blog,blog/[slug]}` | Poster headers (fitted titles), prose on the alt field (`styles/prose.css`), sticky TOC on wide screens |
| All projects | `pages/[locale]/work/index.astro`, `work/WorkHero.astro`, `scripts/work-field.ts`, `scripts/work-xray.ts`, `ui/HoverType.astro`, `work/PrivateRepos.astro` | **Night catalogue** [user 2026-10-08: the TV + spy room version "looks too vibe coded" (kept as `history/work-tv-spyroom`, `comps/HISTORY.md` row 9); "experiment with shaders, and interesting components", "a different style and theme"]: one space-navy field from the head to the end, hairlines instead of frames and hard shadows, colour only where it means a project, real media and type, no drawn scenes. **Head**: a lime kicker "Work", the title "Things I’ve built" (`HoverType`: the letter under a fine pointer thins to 300 and turns lime, its neighbours to 600; a tap sends one wave; never on load, off under `.still` and reduced motion), one lede, and an "On this page" index (number, name, kind · year, a down arrow; a colour bar grows on hover or focus) that jumps to `#wk-<slug>`; two columns on tablets, names only on phones. Behind it a WebGL contour map (`work-field.ts`, no library: domain-warped noise, every 5th line an index line, derivative anti-aliasing with a moiré fade; a hill under the pointer, a ripple on a tap, the scroll slides it; hovering or focusing an index row tints it in that project's colour). It starts at the first interaction or a pointer over the head, only while visible, ~30 fps when nobody moves; paused or reduced motion = a frame only when the pointer moves; no WebGL = the CSS rings it starts on. **Catalogue**: a 12-column grid, wide (7) and narrow (5) items alternating left and right, the right column a step lower (margins, not translate: a translate overlapped the next row); 2 columns on tablets, 1 on phones. A plate: faint contour rings in the project's colour on deep ink; a browser window (Mac dots, the URL) rising from the plate's foot with the live-site capture, a tall page panning down on hover or focus (with the scroll on touch); the Linkoglot phone and the Space reels (`scripts/reel.ts`); real text where there is nothing to film (Clockful's test run, the CLI's run); "Recording soon" for the screensaver (P24). Clockful and the screensaver switch to a browser-framed video once `<slug>.mp4` + `<slug>-poster.webp` land (`lib/media.ts` `inPublic`). Caption: the number in colour, a rule that fills while the item is in play (hover, focus, or the middle of a touch screen), kind, year, the name (plain text: a letter split on every name cost ~120 ms of style), one line, the tools as text, one primary (`--pop` in the project's colour) + small links. **X-ray** (`work-xray.ts`): one WebGL canvas for the page moves into the capture under a mouse or pen: a square lens shows the page's edges (Sobel) on a blueprint grid, framed in lime with corner ticks; keyboard focus sends one scan line; on touch a card crossing the middle of the screen gets one scan, at most every 8 s; nothing moves on its own under `.still` or reduced motion; no WebGL = the plain capture. **No filters, no counts, no "flagships" wording** [user 2026-10-08]. **End** ("There's more.", type only) [user 2026-10-08: no "wink wink" text, "just some emoji"]: the `HoverType` title, the owner's private-repos line ending in 😉 (it tilts on hover), faint rings in the corner |

The Stack section is cut [user 2026-10-05: recruiters don't need a whole section for it]; tools show in the band and in each
chapter (`StackList`). Patterns came from `comps/poster-r3.html`; the owner's feedback pass of 2026-10-06 (header, CV
button, flags, single theme, chapters, AI, credentials, writing, contact, footer) is folded into the rows above.

## CV sheet (approved 2026-10-08)

The PDF CV is a poster on paper in the Cobalt palette (`components/cv/CvSheet.astro`; approved by the owner,
English first, then localized): a full-bleed cobalt band (photo with a pink hard shadow, the fitted name in Anybody Black, the hero
sticker's twin as outlines, MUSZARSKI.COM upright on top, role and availability), a navy contact bar of icon + text
(email, place; GitHub, LinkedIn) with the portfolio apart in a pink tile with a hard shadow [user 2026-10-08], then a
ledger: section labels (expanded caps, a pink tab, a navy rule to the edge), dates in a 27 mm cobalt rail, condensed
titles, pink square bullets, a little more air between entries and sections than v7 (v8). No project logos (the owner
dropped them, 2026-10-08). Skills and qualifications: soft skills as icon, skill and one line of proof in two columns,
the tools as small rows per group under an outline icon, then the credentials (the formal one first, then newest
first), some with a gain line in cobalt bold (what it gave him). Languages carry drawn flags. Page 2 has an outline running head and the page number;
a pink contact slip with a navy hard shadow and a QR code to the portfolio closes the last page, pinned to its foot (or
under the content when the page is short); it prints the locale-free `muszarski.com/cv` (`site/i18n.md`). Icons are
Tabler outlines; no tool, company or project logos (`assets.md` § CV marks). Static Anybody instances only (a variable font prints as Type
3); one density variable `--d` scales the body (10-10.8 pt, the print floor) and every gap so any amount of content
fills at most two pages. A no-photo variant (UK, IE, US) keeps the band whole. Pink is never text on white. Anatomy,
invariants and their reasons: `.claude/skills/new-cv/references/template.md`.

## CV page (2026-10-08)

`/cv/` shows the sheet's content, words and links in a layout made for a screen [user 2026-10-08: "it would be too
boring if it was the same as pdf, so i want you to go creative on it, but display all information that is on the cv
itself"] (`pages/[locale]/cv/index.astro`, `components/cv/CvWeb.astro`, `CvPapers.astro`; research:
`research/2026-10-08-cv-web-page-inspiration.md`). A sequence of poster fields instead of one white sheet:
- **Head** (hero field): the fitted name, then the photo (tilted, pink hard shadow), the title as a large condensed
  line, availability with a green dot, the three buttons, and **the PDF as paper**: its two real pages (rendered by
  `cv:sheet` in the same run as the PDF) fanned on a navy hard shadow; they fan wider on hover, a click or tap
  downloads. Then the sheet's navy contact bar with a copy button on the email and the portfolio in a pink tile.
- **Body** (alt field, sections parted by 3 px rules): a label column whose number and condensed heading stay in view
  while their section scrolls by (≥ 1024 px; on top on phones). Profile is a statement in large type with the stack it
  names picked out (bold, pink underline). Experience is a timeline: square stops on a spine, the current role's stop
  pink with a live dot by its date, the spine filling in pink as entries pass the middle of the screen
  (scroll-driven CSS). Skills: soft skills as bordered tiles (an icon on its own poster colour, tilted; they lift on
  hover), Technologies as a navy panel of named groups with the tools as tags, the qualifications as a ledger with
  the gain line on a pink marker. Education, Languages (drawn flags) and Interests (tags with Tabler icons) share a row.
- **Selected projects** (bar field): cards in each project's colour (PstrykWeb yellow, Linkoglot orange, Portfolio
  cobalt) with real media on a dotted plate: the pstrykweb.pl capture in a browser frame panning down as the card
  crosses the screen (scroll-driven, so phones see it too), the Linkoglot phone, the portfolio's share card; media
  only while the rights gate shows the project. Links are buttons.
- **Contact** (accent field): the email as the one big line, Copy email, the CV's locale-free address with Copy link,
  GitHub, the QR code; the Polish clause last.
- No tool lens / filter (the research's top idea: 7 of the 20 tools appear in no entry, and filters were cut from All
  projects). Scroll-driven CSS is written as longhands (`tech/usage/astro.md` § Gotchas). Paused or reduced motion:
  no fill, no pan, everything in its final state.

## Motion

- **Vocabulary:** rise (10 px settle, never hidden), draw (scaleX rules), pop (sticker), spin, marquee, letter accordion, hard
  shadow on hover, stagger in the menu. Ease-out `cubic-bezier(.2,.75,.1,1)`, pop `cubic-bezier(.3,1.6,.5,1)`;
  200-900 ms.
- **Rules:** the H1 never fades or moves on load; first-screen entrances are CSS and never hide content (no opacity 0,
  no delay over ~150 ms: a first visit showed only the name for up to 1 s [user 2026-10-06]); `.rv` reveals below the fold only (on phones the project chapters reveal 15% before entering, in 0.4 s [user 2026-10-08])
  hide once the script runs (`html.rv-ready`), so a failed script hides nothing. A section runs its CSS loops only while
  near the viewport (`.near`; each page's first section has it in the markup), and the chapters' loops wait for the
  reader's first move (`html.woke`); `html.still` pauses everything (WCAG 2.2.2); reduced motion shows the final state.
- **Cost:** page JS 3.0 KB gz at the hero slice (fit 1.7, motion 0.5, pause 0.4, band 0.3). The accordion reads one
  bounding box per visible block per frame (before any write), never per letter.
- **Load (2026-10-07):** nothing decorative works while the page loads: scenes ship their first state in the markup
  (no `show()` on load), hiding below the fold is instant (only the reveal transitions), the AI scene sits in block
  flow (a grid around its size container cost ~1 s of layout). Numbers: `memory/run-notes.md`.
- **Entrances under a stored pause:** `.still *` pauses every animation, which would freeze an entrance on its hidden first
  frame; entrances carry `.rise` / `.enter` and show their final state when paused (`global.css`, `e2e/pages.spec.ts`).

## Imagery

- **Tool marks:** Simple Icons, one colour (`currentColor`), unaltered, always with the name; nominative use only.
- **Product media:** real recordings of the real UI only; "Video soon" stand-ins are logged placeholders.
- **Photos:** the owner's own. No stock or AI people, no fake screenshots.
- **Grain:** one fixed SVG-noise layer at 13% overlay; never lowers text below AA (axe checks it).

## Accessibility

- WCAG 2.2 AA in the one theme, Cobalt (axe in e2e). Visible 3 px focus; nothing under the sticky header, in
  Chromium, Firefox and WebKit (`bun run e2e:xb`; the header and chapter scripts correct engines that misplace focus).
- A visible label starts the accessible name (2.5.3): the mark reads "Mateusz Muszarski, home"; a flag link is named by
  its autonym ("Polski"), which the menu also shows as text.
- A link that leaves the site opens in a new tab and says so to screen readers ("(opens in a new tab)"), checked by the
  launch gate: `structure.md` § Navigation and footer.
- Fitted and split text exposes one accessible name; decorative copies (`decorative`) are `aria-hidden`.
- Targets ≥ 40 px in the header, ≥ 44 px elsewhere on touch.

## Do / Don't

| Do | Don't |
| --- | --- |
| One face, the width axis for hierarchy | A second display family, faux bold, tracking hacks |
| Flat fields, hard offset shadows, grain | Gradients, glows, glassmorphism, blur shadows |
| Fit at build time, animate after load | Fit with JS on the LCP path, fade the H1 |
| Marks with names, in context | A wall of coloured logos without names |
| One primary per block on a resting shadow; tools as plain text [user 2026-10-06] | Framed tool chips that read as buttons; a row of equal buttons with no clear first action |
| Many small loops, all pausable and offscreen-aware | Loops that run unseen or ignore the pause button |
| Same content on phones, tap twins for every hover | Hover-only reveals, cursor effects, scroll-jacking |
| Native cursor always [user 2026-10-05: "we not building custom cursor"] | Replacing or hiding the cursor, a follower blob, cursor labels |
| Avoid: custom cursor, magnetic everything, "Hello" preloader, text scramble, typewriter hero, skill bars, floating 3D laptop, purple AI gradients | — |
