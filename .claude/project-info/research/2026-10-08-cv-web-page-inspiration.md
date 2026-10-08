# CV web page inspiration: what a screen can do that the A4 sheet can't

> **Question:** which interaction and layout moves from award-level sites and real web résumés should the `/cv/` web page use, so that it is not a copy of the PDF, shows exactly the PDF's information, words and links, and still survives a recruiter's skim, Lighthouse mobile ≥ 90 and a one-thumb phone visit?
> **Method:**
> - Followed `.claude/skills/awwwards/SKILL.md`. Browsed Awwwards with the repo's Playwright 1.63 (Chrome channel; desktop 1440 × 900, mobile 390 × 844 at 2x). Searched "resume" and "cv", read each entry's award and live URL, then scouted 26 recent personal portfolios from the Portfolio list for a CV page [measured].
> - Mobbin MCP: 5 searches (sections and screens) for experience timelines, profile résumés, filter chips and copy-email patterns.
> - Captured real web résumés with Playwright, including hover states and a command menu. Read DOM classes where the mechanics matter [measured].
> - 3 WebSearches (results were mostly SEO lists and résumé builders).
> - Matched the CV's tool names against the entry text in the working-tree `apps/web/src/data/cv.ts` (the file was being edited the same day) [measured].
> - Screenshots are in `inspirations/img/cv-web/` (gitignored, never commit). Looked at every image before describing it.
>
> **Date:** 2026-10-08.
>
> **Not found / dead ends:**
> - No Site of the Day with a dedicated web CV page. Of 26 personal portfolios listed Sep 18 to Oct 7, 2026, 25 were nominees and 1 was SOTD (Gil Huybrecht, no CV). 6 link a résumé PDF or a CV route; only eddyOS has a dedicated CV page, and product.inc a résumé section on its home page [measured].
> - Awwwards' "resume" and "cv" searches return templates and nominees. The best rated are Honorable Mentions from 2013, 2020 and 2022.
> - resume.enricmor.eu refused the connection. christophelozano.com returned a Cloudflare 521. matthieugivelet.com/about still showed a preloader at "65%" after 5 s [measured].
> - Mobbin returned 0 screens for a LinkedIn experience section.
> - No live résumé found that cross-highlights entries from a skill. Move 1 below is assembled from Brittany Chiang's sibling dimming, Jarocki's stack chips and Webflow's group-by.
> - read.cv is closed (see `2026-10-08-cv-design-inspiration.md` § 4).
>
> Nothing here is copied 1:1. We learn moves only.

## References

### A. Real web résumés of developers and designers

**1. Brittany Chiang, brittanychiang.com (experience list)**
- **Link:** https://brittanychiang.com/ · `brittany-d-top.jpg`, `brittany-d-exp.jpg`, `brittany-d-exp-hover.jpg`, `brittany-m-exp.jpg`
- **Moves:**
  - A sticky left column holds the name, role, a one-line pitch and a line nav (About / Experience / Projects). The active item's dash grows longer.
  - Hovering one role dims every sibling [measured]: the list is `group/list`, each row `lg:group-hover/list:opacity-50` and `lg:hover:!opacity-100`. The hovered row gets a tinted card and a teal title.
  - A cursor spotlight: a fixed layer with a 600 px radial gradient (blue at 15%) that follows the pointer [measured].
  - Each role has a date column on the left and stack chips under its text. Promotions at one company stack as grey lines under the top title.
  - "View Full Résumé" links the PDF at the end of the list.
  - On phones each section label becomes a sticky, blurred bar (`sticky top-0 … backdrop-blur … lg:sr-only`) [measured].
- **Risk:** the dimming and the spotlight are desktop only, with no touch twin. The chips are decoration: they do nothing. The layout is cloned so widely that it reads as a template.

**2. Bartosz Jarocki, cv.jarocki.me**
- **Link:** https://cv.jarocki.me/ · `jarocki-d.jpg`, `jarocki-d-cmdj.jpg`, `jarocki-m.jpg`
- **Moves:**
  - A bottom hint "Press Ctrl+J to open the command menu". The menu lists one action (Print) and the links (website, GitHub, LinkedIn, X), with search.
  - On phones a round ⌘ button floats bottom-right: the tap twin of the shortcut.
  - The stack sits as chips on the company line, the years flush right. "Wrocław, Poland, CET" under the role.
- **Risk:** low. The palette is a developer in-joke: a recruiter will not press Ctrl+J, and it repeats links already on the page.

**3. Zach Leatherman, zachleat.com/resume**
- **Link:** https://www.zachleat.com/resume/ · `zachleat-d.jpg`, `zachleat-m.jpg`
- **Moves:**
  - A condensed uppercase name, with the email and `zachleat.com/resume` as underlined plain text right under it.
  - Jump links (Community / Professional / Education) under the name. Each section title has a grey "#" that deep-links it.
  - The desktop sidebar has "On this page" with an active marker, and a sparkline of posts from 2007 to 2026.
  - Proof sits in the sentence ("in 9 countries: 24 conferences, 20 meetups…").
- **Risk:** long, with favicons on every link. On phones the sidebar is gone; the jump links at the top are the only twin.

**4. Alex Zapadenko, product.inc (Awwwards nominee, Oct 6, 2026)**
- **Link:** https://www.product.inc/ · https://www.awwwards.com/sites/alex-zapadenko-portfolio · `aw-productinc-top-d.jpg`, `aw-productinc-resume-d.jpg`, `aw-productinc-resume-m.jpg`
- **Moves:**
  - A "RESUME / The path so far" section with a "Download resume" button on the section's top-right.
  - A zig-zag timeline: cards alternate left and right of a centre line. A filled orange dot marks the current role, hollow dots the past ones.
  - Each card: a logo tile, company, role, then "Sep 2026 – Present · 2 mos". The duration is computed, LinkedIn style.
  - On phones the line moves to the left edge and the cards stack.
  - The hero is a real cut-out photo (him and his dog) in front of a dotted globe.
- **Risk:** the zig-zag doubles eye travel, and on desktop half of each row is empty. A stats row ("YEARS OF EXPERIENCE 0+", "LARGEST TEAM LED 0+") still read "0+" after 5 s [measured]. Count-ups show zeros to screenshots, bots and anyone who has not scrolled.

**5. Eddy Naboulet, eddyOS, eddy-naboulet.dev/cv (Awwwards nominee, Oct 5, 2026)**
- **Link:** https://eddy-naboulet.dev/cv · https://www.awwwards.com/sites/eddyos-eddy-naboulet · `aw-eddy-cv-d.jpg`, `aw-eddy-cv-d-entered.jpg`
- **Moves:**
  - The career is a git history. Each entry is a commit with a hash and a message ("1e4000 design: LE 400, graphic design training"), opened by a terminal line `git checkout 1e4000 --detach && git show 1e4000`.
  - A branch graph at the foot draws parallel lanes (design, main, freelance, feat/ios). Overlapping roles read as lanes, not as a confusing list.
  - Each entry: title, role · place · dates, 2-3 bullets, tag chips, and one proof figure ("4 integrated AI tools", "2 years of C").
  - The menu bar shows "● available · Thu 08 · 15:56" (status and his local time) and a "⎙ PDF" button.
- **Risk:** high. A boot screen "PRESS ANY KEY TO ENTER" with a sound toggle gates the page [measured at 6 s]. Entries slide sideways one at a time (a horizontal carousel). A retro OS costume. Learn the lanes, not the costume.

**6. Alexander Löhn, loehx.com (Awwwards nominee, Sep 21, 2026)**
- **Link:** https://loehx.com/ · https://www.awwwards.com/sites/loehx-com · `aw-loehx-skills-d.jpg`
- **Moves:**
  - A fitted display word "EXPERIENCE" bleeds off the top edge, in one flat colour.
  - Skills are accordion rows: name, years ("21 yrs"), a thin bar scaled by years, and a tool line ("HTML · CSS · JavaScript").
  - The open row shows a short story and a speaker button ("Read aloud, Web Development"): text to speech per row.
  - The PDF link is written as a file name, "CV-2026.pdf".
- **Risk:** an intro sequence ("ARE YOU?") stands before the content. Experience started about 2,400 px of wheel scrolling down [measured]. Bars by years encode a number our CV does not hold.

**7. Elena Gonci, elenagonci.com (Awwwards nominee, Sep 29, 2026)**
- **Link:** https://elenagonci.com/ · https://www.awwwards.com/sites/elena-gonci-portfolio · `aw-elenagonci-d.jpg`
- **Moves:**
  - An OS desktop: a clock set to her city, a calendar, weather, a music player, folders and a dock.
  - Two links open claude.ai and chatgpt.com with a prefilled prompt ("Tell me about Elena Gonci, Head of Product at Arrive… Summarize her background") [measured].
- **Risk:** the desktop costume is the "drawn props" look the owner rejected. The AI links add words that are not on the PDF.

### B. Awwwards' résumé list

**8. Awwwards "resume" / "cv" entries**
- **Link:** https://www.awwwards.com/websites/?text=resume · https://www.awwwards.com/websites/?text=cv · https://www.awwwards.com/sites/interactive-resume-s-casalino · `aw-search-resume.jpg`, `aw-search-cv.jpg`, `aw-casalino-resume-d.jpg`
- **Moves:**
  - The highest rated are HMs: Martin Ježek's "My London CV" (2013), Salvatore Casalino's "Interactive resume" (2020) and Enric Moreu's "3D resume" (2022).
  - Casalino: a cartoon avatar in front of a house, a banner "WELCOME TO MY INTERACTIVE RESUME", and "Scroll down or press key arrow" to walk through it.
- **Risk:** this is the costume end of the spectrum: illustration, scroll hijack, the CV hidden behind a game. It confirms the owner's call against drawn props. Learn nothing but the warning.

### C. Patterns from product and studio sites (Mobbin)

**9. Büro (Burocratik): chapters and an awards ledger**
- **Link:** https://mobbin.com/sites/sections/bcad6cf8-5eb5-4590-bb1f-b8f4d4ecfb88 · https://mobbin.com/sites/sections/2d7b43f4-652c-4b06-9f21-b9586826c501 · `mobbin-buro-chapters.jpg`, `mobbin-buro-awards-ledger.jpg`
- **Moves:**
  - "(04) Chapters": chapter names on hairlines, year ranges flush right ("2004 - 2012"). A thin line with a dot runs across the intro as a progress mark.
  - The awards page is a solid red field. A ruled ledger (project, award) runs behind; years sit on a left rail with long hairlines (2022, 2021, 2020).
  - A floating pill carries a little voice ("Scroll, this is a website!!", "Quite the list! +").
- **Risk:** two huge count lines ("33 Sites of the Day / 22 Developer Awards") sit on top of the ledger. The owner banned counts on All projects [design.md], and big type over rows hurts reading.

**10. Aino Agency and Ragged Edge: ledger states, text mode, copy rows**
- **Link:** https://mobbin.com/sites/sections/aee9192a-eebd-4223-989c-64543cf5ec44 · https://mobbin.com/sites/sections/1083cf3c-a197-4ee7-9632-e9bfe0d4e416 · https://mobbin.com/sites/sections/5f1d322f-b76b-4468-90ef-ab85700b0c44 · `mobbin-aino-ledger-textmode.jpg`, `mobbin-aino-copy-email.jpg`, `mobbin-raggededge-copy-rows.jpg`
- **Moves:**
  - Aino's client ledger is monospace columns: name and year range ("2010-", "2019-2022"). Current clients are black, past ones light grey.
  - Its footer has switches: "TEXT MODE: OFF", "DARK MODE: OFF".
  - Its contact panel puts "OPEN GMAIL" and "COPY EMAIL" buttons next to the address.
  - Ragged Edge's contact rows are label / value / a small "Copy" at the end of each row.
- **Risk:** Aino's grey past rows are low contrast. Text mode is the right idea; a hidden footer switch is the wrong place for it.

**11. Locomotive and A24: real media and type over a list**
- **Link:** https://mobbin.com/sites/sections/22cb319c-0c07-42ff-8281-53ee9406076d · https://mobbin.com/sites/sections/b645a881-adf5-43f3-a86c-758cd54f0b72 · `mobbin-locomotive-team-ledger.jpg`, `mobbin-a24-fitted-list.jpg`
- **Moves:**
  - Locomotive's team page: a red field, ruled rows (name, role, year joined), and a real video cut-out of a person walking across the rows. One row scrambles its letters as she passes.
  - A24's film list: each title set huge, the year as a tiny superscript after it.
- **Risk:** the scramble makes a row unreadable for a moment. Huge titles fit about 7 rows in the captured view, too few for a CV skim.

**12. Handshake and Dovetail: a sticky year index and a stepper**
- **Link:** https://mobbin.com/sites/sections/ec153601-7b86-4380-946e-655696b65bbd · https://mobbin.com/sites/sections/0c8a622e-7ba8-4695-8e33-c1a6138dda78 · `mobbin-handshake-year-index.jpg`, `mobbin-dovetail-stepper.jpg`
- **Moves:**
  - Handshake's "Our story": a sticky year index on the left (2014 / 2019 / 2020 / Today). The active year is white, the rest grey; the story scrolls on the right.
  - Dovetail's hiring process: a vertical line with square nodes. Only the active step shows its paragraph; the others show the title only.
- **Risk:** low. Years alone are not labels; the stepper hides text until it is active.

**13. Recruiter tools and profile platforms**
- **Link:** https://mobbin.com/screens/ce090dd1-36dd-466d-a228-4810cfb2e86b (Juicebox) · https://mobbin.com/screens/e4698360-358b-4e6a-a70c-94ac70c65cbe (Pin) · https://mobbin.com/screens/896f4d11-45af-409e-a1f5-ca3fff6e8f2d (Behance) · https://mobbin.com/screens/196c4c34-6845-4a74-835e-9874dcc7bb2d (Peerlist) · https://mobbin.com/screens/928c9e80-3fc4-44cd-9d7c-561a3b0f26d3 (Figma Sites) · https://mobbin.com/sites/sections/cf7a8366-eb93-4d9d-9161-38e4df9be676 (Webflow) · `mobbin-juicebox-tenure.jpg`, `mobbin-behance-print-resume.jpg`, `mobbin-peerlist-pdf.jpg`, `mobbin-figma-profile-date-rail.jpg`, `mobbin-webflow-group-by.jpg`
- **Moves:**
  - Sourcing tools compute time: Juicebox shows "Average tenure / Current tenure / Total experience" tiles and a duration per role; Pin heads the list "Work experience 16yr 10mo".
  - Behance's résumé page has a "Print Resume" button; Peerlist has a "PDF Resume" button on the profile.
  - A Figma Sites profile: a grey date rail ("2017 - Now"), "Role at Company ↗", and a strip of three images under one entry.
  - Webflow's checklist regroups the same rows by "Category / Where / When" from one menu.
- **Risk:** computed durations need exact months, which several of our entries lack.

## Patterns that repeat

1. **The list stays one stream; the screen adds a way to query it.** Brittany dims siblings, Jarocki puts chips on the line, Webflow regroups. Nobody hides the text.
2. **Dates become navigation.** Handshake's sticky years, Brittany's sticky labels, Büro's year rail, Zach's jump links.
3. **Parallel lives need lanes.** eddyOS's branch graph is the only reference that shows overlapping roles honestly.
4. **The PDF is one visible button near the top.** product.inc, Behance, Peerlist, eddyOS, Brittany (at the end).
5. **Contact is text you can copy.** Zach's email under the name, Aino's Copy email, Ragged Edge's Copy rows.
6. **The award entries that fail all fail the same way:** a gate, an intro, a carousel or a costume between the reader and the dates.

## Moves for our /cv/ page

Ranked by value to a recruiter per unit of risk. All of them re-present the PDF's own facts; none adds a fact. UI labels they need ("Copy", "Link copied", "Skim", "Read") are new interface words and go through Lingui. One move is the signature (move 1); the rest stay quiet, so effects never stack in one view. The in-progress `CvWeb.astro` already plans parts of moves 2, 5 and 8 (sticky labels, a timeline that fills, copy buttons, project media).

**1. The tool lens: point at a tool, the CV shows where he used it**
- **What:** every tool name in Skills is a button. Hover or focus one: entries whose text names the tool stay at full strength, and the word gets a pink highlighter under navy text (pink as a fill, never as text). Every other entry drops to about 35% opacity; their date-rail ticks stay. A click or tap pins the lens. A small chip at the top of the ledger reads "React · Clear"; Esc or a second tap clears it. Buttons carry `aria-pressed`; a polite live region names the matching entries.
- **Why it helps:** it answers the recruiter's real question ("the ad says React Native; where?") in one gesture, and proves that the skills list is backed by work.
- **Cost / risk:** about 1 KB of JS. The matches are computed at build from the same text (`data-tools` per entry). **[measured]** On today's working-tree data, 7 of the 20 tools in the tools block appear in no entry text (Tailwind CSS, shadcn/ui, TanStack Query, Playwright, Mobbin, GitHub, GitLab), and Node.js and PostgreSQL appear only in the profile. Those chips stay plain text, or the owner names the tool in a real bullet. Never tag an entry with a tool its text does not name (Truth). It dims and never hides, but the owner said "no filters" on All projects: confirm before building.
- **Mobile twin:** tap pins (hover is never needed). The pinned chip sits under the sticky section label, and the page scrolls to the first match.
- **From:** 1, 2, 13 (Webflow).

**2. The live date rail: the PDF's 27 mm rail, made sticky**
- **What:** a narrow left rail of the years the CV holds (for example "now", 2026, 2025, 2023, 2022). It sticks while the ledger scrolls. The year of the entry crossing the middle of the screen widens from condensed to expanded on Anybody's `wdth` axis and turns cobalt; the rest stay condensed and grey-navy. A thin line fills down the rail with the scroll (CSS scroll-driven animation where supported; a static rail elsewhere). Each year is a jump link.
- **Why it helps:** "how recent?" is answered from any scroll position, without reading. The width axis does the hierarchy, as on the rest of the site.
- **Cost / risk:** CSS plus about 0.5 KB (one IntersectionObserver for the active year). Fuzzy dates ("2025 · 1 month", "In progress", "Since 2022") don't sit on a scale: keep the words exactly, put them under their nearest real year, never invent months. Reduced motion: the active year changes without a transition.
- **Mobile twin:** the rail folds into the sticky section label ("Experience · 2026"), as Brittany's phone labels do.
- **From:** 1, 9, 12, 13 (Figma Sites).

**3. Lanes: the career at a glance, as parallel tracks**
- **What:** one full-width strip under the hero. A year axis from 2022 to "now", and one lane per track, from today's data: school (in progress), freelance and own projects (since 2022), internships (KS Beniaminek 03 2025; Neoteric 2026; Cetuspro, June 2026 to now), projects (PstrykWeb, Linkoglot, Portfolio, all 2026). Bars at year resolution, a month only where the CV has one. Open-ended bars end in an arrow. Each bar links its entry (`#cetuspro`). The tool lens (move 1) lights the matching bars too.
- **Why it helps:** in 3 seconds it shows what the list hides: school, freelance and work ran in parallel since 2022, and the internships are this year. Honest about experience without a count.
- **Cost / risk:** static SVG or a CSS grid, no JS. Truth is the main risk: the school entry says "In progress" with no start year, so its bar shows only a "now" end until the owner gives one; never draw a start the CV doesn't state. No new words beyond the year labels.
- **Mobile twin:** the same strip at full width, four lanes about 28 px tall each; the axis compresses, it never scrolls sideways. A tap on a bar jumps to the entry.
- **From:** 5 (the branch graph, without its gate and carousel), 13 (sourcing tools think in tenure).

**4. The paper object: the real PDF, shown as a sheet**
- **What:** near the head, page 1 of the actual PDF rendered as an image by the same build, so it is never out of date. It sits on the cobalt field, tilted 2-3°, with a navy hard shadow. Hover or focus straightens it and grows the shadow; a click downloads the file. A small label gives pages, format and size ("2 pages · A4 · 1xx KB"; the size already comes from the file).
- **Why it helps:** the recruiter sees what they will forward before downloading, and "there is a PDF" is impossible to miss. It also says, on purpose: this page is the web, that is the paper.
- **Cost / risk:** one lazy WebP (estimate 30-60 KB) below the H1, never the LCP. It must regenerate with every PDF (extend the `cv.test.ts` digest check). Alt text names it; it is not a second copy of the text.
- **Mobile twin:** the same sheet, smaller; tap downloads; a pressed state instead of the hover lift.
- **From:** 4, 5, 13 (Behance, Peerlist).

**5. The contact slip follows you**
- **What:** the PDF's pink contact slip (navy text, navy hard shadow, the same words and links) docks bottom-right once the hero has scrolled away. The email has a Copy button that says "Copied" in place for 2 s. The QR code stays, but its job changes: on a desktop it opens this page on your phone (the PDF's QR target, `muszarski.com/cv`). It tucks away while the contact section itself is on screen, so it never appears twice.
- **Why it helps:** the email and the PDF are one click away at every scroll position (the "contact 1 click away" rule), and copying beats a `mailto:` that opens the wrong mail app.
- **Cost / risk:** CSS plus the existing copy script (the home Contact section already has Copy email). One fixed element only; it must not cover text on short screens.
- **Mobile twin:** a 56 px bottom bar with Email, Copy and PDF. It hides while scrolling down and returns on scroll up. No QR on a phone.
- **From:** 2 (the floating ⌘ button), 3, 10.

**6. Skim / Read, plus Copy as text**
- **What:** a two-state switch at the top of the ledger. "Skim" folds each entry to its four-corner head (title, org, dates) and its first bullet. "Read" shows everything and is the default, so all text is in the HTML for search and Ctrl+F. The choice is remembered per viewer (`localStorage` in try/catch). Next to it, "Copy as text" puts the plain-text CV on the clipboard: the same words as the PDF's text layer.
- **Why it helps:** on a phone, Skim shows about five entry heads per screen instead of one and a half. Copy as text saves a recruiter retyping into an ATS or a hiring note.
- **Cost / risk:** a class on the ledger and about 0.3 KB. In Skim, folded text is not found by Ctrl+F unless it uses `hidden="until-found"`, which only Chromium honours; other browsers then hide it fully. Keep Read as the default for that reason.
- **Mobile twin:** the same switch, full width, at the top of the ledger.
- **From:** 10 (text mode), 12 (Dovetail), 2 (print in the palette).

**7. A link to every entry**
- **What:** every entry and section has a stable id (`#cetuspro`, `#linkoglot`, `#skills`). A "#" shows next to the title on hover or focus; a click copies the full address and says "Link copied". Arriving at a hash flashes the entry's pink tab once.
- **Why it helps:** a recruiter can forward "look at this role" to a hiring manager.
- **Cost / risk:** tiny. The ids must be the same in every locale (the data ids already are), on the locale-free address (`muszarski.com/cv#linkoglot`).
- **Mobile twin:** the "#" is always visible, small, since there is no hover.
- **From:** 3.

**8. A media peek for entries that have real media**
- **What:** hovering or focusing an entry tied to a project (PstrykWeb, Linkoglot, Clockful; the space portfolio is off the CV) shows its real capture or reel in a plate in the right column, in the project's colour. Same captures as the work page, behind the rights gate.
- **Why it helps:** proof in one glance without leaving the CV.
- **Cost / risk:** media loads only on intent, never on load. This is the one place the web adds something the PDF lacks (pictures, no new facts). Skip it if the owner wants strict parity.
- **Mobile twin:** a thumbnail strip under the entry, loaded when it comes near.
- **From:** 11 (Locomotive's real cut-out), 13 (Figma Sites' image strip), 4.

**Considered, not ranked:** a command palette (2: an in-joke recruiters won't use), years-per-skill bars (6: a number we don't hold), "ask an AI about me" links (7: new words), an OS desktop or a boot screen (5, 7), count-up stats (4, 9), computed durations ("2 mos", 4, 13: several entries have no months).

## Anti-patterns seen

- **Gates and intros:** eddyOS "PRESS ANY KEY TO ENTER" [measured], loehx's "ARE YOU?" sequence (about 2,400 px before Experience) [measured], Givelet's preloader at 65% after 5 s [measured].
- **Count-ups that read "0+"** until scrolled (product.inc) [measured].
- **Horizontal carousels** for entries (eddyOS).
- **Costumes:** an OS desktop with widgets (Elena Gonci), an illustrated side-scroller (Casalino).
- **Hover-only mechanics** with no touch twin (Brittany's dimming and spotlight).
- **Decorative chips** that look interactive and do nothing (Brittany, Jarocki).
- **Big counts over a ledger** (Büro).

## Sources

| URL | Title | Accessed |
| --- | --- | --- |
| https://brittanychiang.com/ | Brittany Chiang | 2026-10-08 |
| https://cv.jarocki.me/ | Bartosz Jarocki - Resume | 2026-10-08 |
| https://www.zachleat.com/resume/ | Résumé, zachleat.com | 2026-10-08 |
| https://www.product.inc/ | Alex Zapadenko, Product Design Leader | 2026-10-08 |
| https://www.awwwards.com/sites/alex-zapadenko-portfolio | Alex Zapadenko Portfolio (Awwwards Nominee, Oct 6, 2026) | 2026-10-08 |
| https://eddy-naboulet.dev/cv | Résumé, Eddy Naboulet, senior front-end developer | 2026-10-08 |
| https://www.awwwards.com/sites/eddyos-eddy-naboulet | eddyOS (Awwwards Nominee, Oct 5, 2026) | 2026-10-08 |
| https://loehx.com/ | Alexander Löhn, Web & AI Developer (freelance) | 2026-10-08 |
| https://www.awwwards.com/sites/loehx-com | loehx.com (Awwwards Nominee, Sep 21, 2026) | 2026-10-08 |
| https://elenagonci.com/ | Elena Gonci | 2026-10-08 |
| https://www.awwwards.com/sites/elena-gonci-portfolio | Elena Gonci Portfolio (Awwwards Nominee, Sep 29, 2026) | 2026-10-08 |
| https://www.awwwards.com/websites/?text=resume | Awwwards Nominees, search "resume" | 2026-10-08 |
| https://www.awwwards.com/websites/?text=cv | Awwwards Nominees, search "cv" | 2026-10-08 |
| https://www.awwwards.com/websites/portfolio/ | Best Portfolio Websites, Awwwards | 2026-10-08 |
| https://www.awwwards.com/sites/interactive-resume-s-casalino | Interactive resume S Casalino (Awwwards HM, Apr 21, 2020) | 2026-10-08 |
| https://www.salvatorecasalino.it/interactive-resume | Salvatore Casalino, Interactive Resume | 2026-10-08 |
| https://www.awwwards.com/sites/3d-resume-enric-moreu | 3D resume, Enric Moreu (Awwwards HM, Feb 22, 2022) | 2026-10-08 |
| https://www.awwwards.com/sites/my-london-cv | My London CV (Awwwards HM, Sep 26, 2013) | 2026-10-08 |
| https://mobbin.com/sites/sections/bcad6cf8-5eb5-4590-bb1f-b8f4d4ecfb88 | Büro, chapters (Mobbin) | 2026-10-08 |
| https://mobbin.com/sites/sections/2d7b43f4-652c-4b06-9f21-b9586826c501 | Büro, awards ledger (Mobbin) | 2026-10-08 |
| https://mobbin.com/sites/sections/aee9192a-eebd-4223-989c-64543cf5ec44 | Aino Agency, client ledger (Mobbin) | 2026-10-08 |
| https://mobbin.com/sites/sections/1083cf3c-a197-4ee7-9632-e9bfe0d4e416 | Aino Agency, contact panel (Mobbin) | 2026-10-08 |
| https://mobbin.com/sites/sections/5f1d322f-b76b-4468-90ef-ab85700b0c44 | Ragged Edge, contact rows (Mobbin) | 2026-10-08 |
| https://mobbin.com/sites/sections/22cb319c-0c07-42ff-8281-53ee9406076d | Locomotive, team ledger (Mobbin) | 2026-10-08 |
| https://mobbin.com/sites/sections/b645a881-adf5-43f3-a86c-758cd54f0b72 | A24, film list (Mobbin) | 2026-10-08 |
| https://mobbin.com/sites/sections/ec153601-7b86-4380-946e-655696b65bbd | Handshake, our story (Mobbin) | 2026-10-08 |
| https://mobbin.com/sites/sections/0c8a622e-7ba8-4695-8e33-c1a6138dda78 | Dovetail, hiring process (Mobbin) | 2026-10-08 |
| https://mobbin.com/screens/ce090dd1-36dd-466d-a228-4810cfb2e86b | Juicebox, candidate experience (Mobbin) | 2026-10-08 |
| https://mobbin.com/screens/e4698360-358b-4e6a-a70c-94ac70c65cbe | Pin, candidate panel (Mobbin) | 2026-10-08 |
| https://mobbin.com/screens/896f4d11-45af-409e-a1f5-ca3fff6e8f2d | Behance, résumé with Print Resume (Mobbin) | 2026-10-08 |
| https://mobbin.com/screens/196c4c34-6845-4a74-835e-9874dcc7bb2d | Peerlist, profile with PDF Resume (Mobbin) | 2026-10-08 |
| https://mobbin.com/screens/928c9e80-3fc4-44cd-9d7c-561a3b0f26d3 | Figma Sites, profile with a date rail (Mobbin) | 2026-10-08 |
| https://mobbin.com/sites/sections/cf7a8366-eb93-4d9d-9161-38e4df9be676 | Webflow, checklist with group-by (Mobbin) | 2026-10-08 |
