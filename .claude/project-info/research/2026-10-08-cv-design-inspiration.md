# CV design inspiration: a Poster-brand creative CV (A4, max 2 pages)

> **Question:** which concrete design moves from admired CVs and code-built templates should a new Poster-brand CV use? Target: an A4 PDF, max 2 pages (one duplex sheet), that looks designed, survives a 7-second skim and keeps a clean text layer for ATS.
> **Method:**
> - Captured 23 references (plus the current muszarski.com CV for context) with the repo's Playwright: page screenshots, print emulation and `page.pdf` A4 prints. Downloaded template previews and real PDFs. Looked at every image before describing it.
> - Read each PDF's text stream with PyMuPDF 1.28.2, as a proxy for what a parser gets. The full ATS evidence is in `2026-10-08-cv-recruiters-ats.md`; locale rules are in `2026-10-08-cv-locale-conventions.md`.
> - Ran three small print tests of my own in Chromium: grain cost, hard shadows, and how positioning changes text order. Tagged [measured].
> - Used 3 WebSearches, plus Mobbin (read.cv), Behance, Dribbble and Awwwards via Playwright.
> - Screenshots are in `inspirations/img/cv/` (gitignored, never commit). PDFs stayed in the scratchpad.
>
> **Date:** 2026-10-08.
>
> **Not found / dead ends:**
> - rauno.me, paco.me and joshwcomeau.com/about-josh have no CV or résumé link [measured].
> - cassidoo.co/resume is a 404.
> - read.cv shut down in 2025, so it is seen through a Wayback capture and Mobbin.
> - Dribbble's "typographic resume" search is mostly resume-builder SaaS UI.
> - Awwwards' `/websites/cv/` list is CV themes and low-scoring nominees.
>
> Nothing here is copied 1:1. We learn moves only.

## References

### A. Real CVs of developers and designers

**1. Brittany Chiang, resume PDF**
- **Link:** https://brittanychiang.com/resume.pdf · `dev-brittany-chiang-p1.jpg` (US Letter, 1 page)
- **Moves:**
  - The name is the one loud element (big, cobalt-like blue). Everything else is small and grey-black.
  - The entry head is "Role · **Company**" with the dates as a grey inline suffix. Three promotions at one company stack as three short lines over one shared bullet list.
  - A right sidebar groups Skills into three labelled lists (Languages / Libraries & Frameworks / Tools & Platforms).
  - "Selected Projects" gives one line of proof each ("with 100k+ installs", "7k+ stars").
- **Risk [measured]:** looks clean but parses badly. The text stream runs sidebar-first and bottom-up (Interests → Education → Projects → Skills → jobs in reverse). Bullets extract as `¶` and last letters drop ("jQuer").

**2. Bartosz Jarocki, cv.jarocki.me** (MIT, 9.7k★)
- **Link:** https://cv.jarocki.me · `dev-jarocki-print.jpg`, `print-jarocki-p1.jpg`, `print-jarocki-p2.jpg`
- **Moves:**
  - One data file → one web page → print = the PDF.
  - The entry head is Company + tiny stack chips + right-aligned years on one line, with the title in mono under it.
  - "Wrocław, Poland, CET" sits under the role.
  - In print, contacts become visible text: `jarocki.me / email / phone`.
- **Risk [measured]:** low. 2 A4 pages, clean text order, 13 links. But page 2 holds only one row of three side-project cards, so most of the sheet's back is empty.

**3. Zach Leatherman, zachleat.com/resume**
- **Link:** https://www.zachleat.com/resume/ · `dev-zachleat-resume.jpg`, `print-zachleat-p1.jpg`
- **Moves:**
  - The name and section heads are a heavy condensed uppercase, close to Poster.
  - Proof sits inside the sentence: "Public Speaker in 9 countries: 24 conferences, 20 meetups…".
  - The role word is bold and the organisation is a link.
  - Print CSS drops the site sidebar.
- **Risk [measured]:** the print has no top margin, so the name is clipped at the page edge. 4 pages, ~100 links, inline favicons. A web résumé, not a PDF résumé.

**4. read.cv profiles (Rauno Freiberg archive; Mobbin captures)**
- **Link:** https://web.archive.org/web/20250122011342/https://read.cv/rauno · `dev-readcv-rauno-archive.jpg`, `mobbin-readcv-colour-field.jpg`, `mobbin-readcv-editor-print.jpg`
- **Moves:**
  - Each row has a narrow grey year column (~1/5 of the width), then "Role at Company" on one line, then a short paragraph.
  - A whole profile can sit on one flat colour field: an orange theme with serif type.
  - The editor had a "Print Profile" setting, so print was a first-class output.
- **Risk:** web only. Date-first rows put the date before the title in the text stream. That is mild; parsers cope.

**5. Kristian Adi Nugraha, "CV/Resume Layout" (Behance, 2025)**
- **Link:** https://www.behance.net/gallery/233091093/CVResume-Layout · `be-kristian-2.jpg`, `be-kristian-1.jpg`
- **Moves:**
  - A hairline frame is inset from the page edge, with a running strip inside it ("Curriculum Vitae" left, "2025" right).
  - The first name is set enormous across ~2/3 of the width, with the surname stacked small beside it: the name as a poster headline.
  - The B/W photo is a wide landscape plate, not a circle.
- **Risk:** high. Sections are scattered on a staggered grid with no reading order. Body type is tiny. A 7-second skim cannot find Experience. Learn the header only.

**6. "Minimalist Swiss Resume and Cover Letter" (Behance, 2026)**
- **Link:** https://www.behance.net/gallery/256334703/Minimalist-Swiss-Resume-and-Cover-Letter-Design · `be-minswiss-1.jpg`, search context `gal-behance-swiss-resume.jpg`
- **Moves:**
  - Contacts are three labelled columns top-right (bold "Portfolio / LinkedIn / Email" over the value).
  - The red name is the only colour, with a short red rule segment under it on a hairline.
  - The CV and the cover letter share one header, so they read as a system.
- **Risk:** seen only as a mockup. The body is a dense 4-column grid.

### B. Typographic, editorial and poster-like templates (code-built)

**7. JSON Resume theme "Brutalist", rendering Thomas Davis's real CV** (registry theme; the jsonresume.org repo is MIT)
- **Link:** https://registry.jsonresume.org/thomasdavis?theme=brutalist · `jr-brutalist.jpg`, `print-jr-brutalist-p1.jpg`
- **Moves:**
  - The top strip has three ruled cells: a yellow "CURRICULUM VITAE" tag, the city, and "REV. 0.1".
  - A fat display name sits over the role in an inverted black tag.
  - Links get a thick yellow highlighter underline.
  - Sections are tagged "01" on a yellow square.
  - Entries are bordered cards with a hard black offset shadow (no blur) and yellow square bullets.
- **Risk [measured]:**
  - Printed to A4 it runs 12 pages: no print CSS, and cards split across pages.
  - The letter-spaced role tag extracts as `F U L L S T A C K …`.

**8. JSON Resume theme "Art School Modern" (same CV)** (MIT)
- **Link:** https://registry.jsonresume.org/thomasdavis?theme=art-school-modern · `jr-art-school-modern.jpg`, `print-jr-artschool-p1.jpg`
- **Moves:**
  - A red wide-caps micro label ("PORTFOLIO / CURRICULUM VITAE") sits above a two-line stacked display name. An italic serif role line contrasts with it.
  - The photo is a "plate": a hard black frame with a grey hard offset shadow and a micro caption.
  - Contacts are label/value pairs (tiny grey caps "EMAIL", then the value).
  - A left rail holds "— Statement" and "(01) WORK" labels, with the content in the right 2/3.
- **Risk [measured]:**
  - 12 pages in print, and the statement eats half of page 1.
  - Letter-spaced labels extract as `E M A I L` and `P L AT E I`.

**9. friggeri-cv** (LaTeX, MIT, 2012)
- **Link:** https://github.com/friggeri/cv · `latex-friggeri-p1.jpg`, `latex-friggeri-p2.jpg`
- **Moves:**
  - A full-width dark header band holds the name in two weights ("adrien" UltraLight + "friggeri" Bold) over a light role line.
  - A right-aligned left aside with bold labels (about / languages / programming).
  - Each section title colours only its first 3 letters, in its own colour.
  - A fixed date column sits on the left and the org is grey, right-aligned.
  - The README offers a `print` option that renders black and white and flips the header to dark-on-light.
- **Risk [measured]:** the name extracts as `adrienfriggeri`, because only the weight changes and there is no space. US Letter.

**10. Awesome-CV and its Typst heir brilliant-cv** (Awesome-CV LPPL-1.3c, 28.7k★; brilliant-cv Apache-2.0)
- **Link:** https://github.com/posquit0/Awesome-CV · https://typst.app/universe/package/brilliant-cv · `latex-awesome-cv.jpg`, `latex-awesome-cv-p2.jpg`, `typst-brilliant-cv.jpg`
- **Moves:**
  - The accent colour covers only the first 3 letters of each section title, and a rule runs from the title to the margin.
  - Small-caps role in the accent. Location in italic accent, right-aligned, with the dates in grey under it.
  - Every page has a footer: date · "Name · Résumé" · page number.
  - brilliant-cv adds keyword chips under each entry and ships en/fr/zh previews (multilingual by design).
- **Risk:** low-medium. Small red italics, icon contact rows, and company logos as images.

**11. Deedy Resume** (XeTeX, Apache-2.0)
- **Link:** https://github.com/deedy/Deedy-Resume · `latex-deedy.jpg`
- **Moves:**
  - A hairline-weight, very large name.
  - Asymmetric columns: a narrow left one for education / links / coursework / skills, and a wide right one for experience.
  - Section titles are big light-grey caps. "Last Updated" sits top-right.
- **Risk:** high. Sidebar-first text order, and thin grey type that greyscale printing kills.

**12. moderncv (via RenderCV previews)** (moderncv LPPL-1.3c; RenderCV MIT, 17.7k★)
- **Link:** https://github.com/moderncv/moderncv · https://github.com/rendercv/rendercv · `rendercv-moderncv.jpg`, `rendercv-engineeringresumes.jpg`
- **Moves:**
  - A thick colour bar exactly as wide as the date column runs before each section title. The bar *is* the margin rail.
  - Dates sit right-aligned in that rail.
  - Footer "John Doe – 1/3"; "Last updated in Mar 2026" top-right.
  - RenderCV builds the PDF from YAML (one data source).
- **Risk:** low. Dates come before titles in the stream.

**13. Jake's Resume (the ATS baseline)** (LaTeX, MIT)
- **Link:** https://github.com/jakegut/resume · `latex-jake.jpg`
- **Moves:**
  - A four-corner entry head: title (bold, left) / dates (right) on line 1, org (italic, left) / place (italic, right) on line 2.
  - Small-caps section heads with a full-width rule.
  - Skills as 4 labelled lines.
- **Risk:** the lowest parse risk, but the look is everywhere, so it reads as "template".

**14. typographic-resume** (Typst, MIT)
- **Link:** https://typst.app/universe/package/typographic-resume · `typst-typographic-resume.jpg`
- **Moves:**
  - A stacked name: the first name small, then the surname large.
  - Each entry: a grey date range left and the place right *above* the title, then the title in uppercase bold "– Company", then a hairline, then the body.
  - Section labels are right-aligned light caps on a rule.
- **Risk:** body in grey serif (low contrast), and a vertical tech-stack list wastes height.

**15. neat-cv** (Typst, MIT)
- **Link:** https://typst.app/universe/package/neat-cv · `typst-neat-cv-p1.jpg`, `typst-neat-cv-p2.jpg`
- **Moves:**
  - A full-bleed dark header band holds the name (light + bold) and the role in small caps.
  - A grey date column, right-aligned, beside a bold title. The org is in small caps with the place on the right.
  - A vertical hairline separates the sidebar.
  - The footer reads "Name CV · June 2026 · Page 1 of 3".
- **Risk:** sidebar (photo, about, contact) on the left, and 3 pages.

**16. meridian-cv** (Typst, MIT AND MIT-0)
- **Link:** https://typst.app/universe/package/meridian-cv · `typst-meridian-cv.jpg`
- **Moves:**
  - The name block is right-aligned (name, role, contact line).
  - Section labels are right-aligned caps, with the rule running in from the left.
  - Entries are one line, "**Title** – Org in grey", with the date on the right and the place small underneath. Very calm.
- **Risk:** low. Its tracked caps would split in extraction if we copied the tracking.

**17. vivid-cv** (Typst, MIT)
- **Link:** https://typst.app/universe/package/vivid-cv · `typst-vivid-cv.jpg`
- **Moves:**
  - One dark colour card holds the name (yellow), the role, a rule and the contacts (white). It is the only colour on the page.
  - The photo straddles the card's lower edge.
  - Skills come right after About, as 5 bold-label lines.
- **Risk:** low, single column. The sample shows a date of birth and "References available upon request".

**18. finely-crafted-cv** (Typst, MIT)
- **Link:** https://typst.app/universe/package/finely-crafted-cv · `typst-finely-crafted-cv.jpg`
- **Moves:**
  - Roman-numeral section titles ("II. EXPERIENCE").
  - The org sits left, a dotted leader runs across, and the date sits right, like a table of contents.
  - An explicit "Eligibility and location" section.
  - A footnote for the full list, and "Last updated" in the footer.
- **Risk:** leader dots extract as long `. . . .` runs, plus emoji icons and a QR code.

**19. AltaCV** (LaTeX, LPPL-1.3c; Typst port `altacv` MIT)
- **Link:** https://github.com/liantze/AltaCV · `latex-altacv.jpg`, `typst-altacv-p1.jpg`
- **Moves:** page 2 gets its own column split (wide publications + narrow referees) instead of repeating page 1's grid.
- **Risk:** high. Two columns, icon headings, dot ratings and a "day of my life" pie chart.

### C. Builders and galleries (what recruiters are sold as "ATS-safe")

**20. Reactive Resume, 17 templates** (MIT, 44k★)
- **Link:** https://github.com/reactive-resume/reactive-resume · `rxr-sheet.jpg`
- **Moves:**
  - The product offers "ATS-safe template filters" and an in-browser ATS checker.
  - Colour sidebars (green, blue, purple) or colour header bars carry the identity.
- **Risk:** most templates use star, dot or bar skill ratings, circular photos and icon rows. Useful mainly as a list of what not to look like.

**21. Enhancv, FlowCV, Kickresume, Novoresume galleries**
- **Links:**
  - https://enhancv.com/resume-templates/ · `gal-enhancv.jpg`
  - https://flowcv.com/resume-templates · `gal-flowcv.jpg`
  - https://www.kickresume.com/en/templates/resume/ · `gal-kickresume.jpg`
  - https://novoresume.com/resume-templates · `gal-novoresume.jpg`
- **What they claim:**
  - Enhancv badges every template "ATS", double-column ones included. It says: "We've tested these templates with major ATS vendors."
  - Novoresume: "all our resume templates are entirely ATS-friendly".
  - Kickresume keeps a separate "ATS-friendly" set. Its "creative" set is Doodle, Bubbles, iMessage, Pipeline (percent rings, dot ratings).
  - FlowCV sorts by Simple / Modern / Creative / Compact. Sidebars dominate.
- **Risk:** all vendor claims, unverified. Visually they are the "template" look: dark sidebars, photo circles, ratings.

**22. OpenResume (builder + parser)** (AGPL-3.0)
- **Link:** https://www.open-resume.com/resume-builder · https://www.open-resume.com/resume-parser · `tool-openresume-builder.jpg`
- **Moves:**
  - A thin colour bar along the top edge.
  - Section heads in bold UPPERCASE after a short colour dash.
  - No photo, by design.
  - The parser docs explain its heading heuristic: one text item, bold, all caps. It is "designed to parse single column resume in English".
- **Risk:** none. Use it as a free self-test.

**23. JSON Resume colour-header themes**
- **Link:** https://registry.jsonresume.org/thomasdavis?theme=bold-header-statement · `jr-bold-header-statement.jpg`, `jr-tokyo-modernist.jpg`, `jr-new-york-editorial.jpg`, others `jr-*.jpg`
- **Moves:**
  - A solid teal header field holds the name and contact (bold-header-statement).
  - A pink vertical rule and a corner triangle mark the header (tokyo-modernist).
  - An italic summary has a red left rule (new-york-editorial).
- **Risk:** web-first like 7 and 8, so print length is uncontrolled.

**Context, not a reference:**
- `ctx-muszarski-home.jpg` shows the brand: cobalt field, fitted ice name, condensed role, pink round sticker.
- `ctx-muszarski-cv-print.jpg` shows today's PDF source: plain one column, wide-caps labels on rules. The committed `mateusz-muszarski-cv-en.pdf` has **3 pages** [measured], which matches the ATS note.

## Patterns that repeat in the best ones

1. **One loud thing, then calm.** The name carries all the display energy (Brittany, Kristian, Brutalist, Art School, Zach). Everything after it is small, dark and regular.
2. **A four-corner entry head.** Title left / dates right, org left / place right. This is the F-pattern the Ladders 2018 study rewarded ("bold titles and bulleted accomplishments").
3. **A rail makes the grid, not a second column.** It is either a date rail (moderncv, read.cv, friggeri, neat-cv) or a label rail (Art School, friggeri's aside). Content stays one stream.
4. **Section labels are small; the rule does the work.** A small label plus a hairline or bar (Jake, meridian, Awesome-CV, OpenResume's dash). Big section titles waste height (Deedy, Kristian).
5. **Colour appears once or twice.** A header band or the name, plus one accent detail (Awesome's first letters, OpenResume's dash, Brutalist's yellow). Body text stays near-black.
6. **Every page says whose it is.** Footer or top strip with name, page "1/2" and a date (Awesome-CV, neat-cv, moderncv, Brutalist's "REV" strip, Kristian's frame strip).
7. **Proof sits in the line.** Counts and outcomes inside the sentence ("100k+ installs", "24 conferences").
8. **Links are words you can read on paper.** Short visible URLs (Jarocki in print, Brittany's header), never icons alone.
9. **Print is designed on purpose.** read.cv had "Print Profile", friggeri has a B/W `print` mode, Jarocki has print CSS. Every failure skipped this step: JSON Resume themes run to 12 pages, and Zach's print clips the name.

## What to adopt for a Poster-brand CV

These are moves to build with, not a spec. All numbers assume A4 (210 × 297 mm) and Chromium `page.pdf`. Each page is its own fixed A4 `<section>`, so we control the break and page 2 never starts mid-entry.

**Grid and margins**
- Margins: 14 mm left/right, 13 mm top/bottom. That is above the 12.7 mm minimum in the ATS note, and keeps text clear of printers' unprintable edge.
- Content is 182 mm wide on a 12-column grid with 4 mm gutters.
- Use one content stream. No second text column on page 1.
- Entry heads use the full width: title left, dates flush right. Bullets indent 4 mm.
- `break-inside: avoid` on every entry.

**Header (page 1, top ~60-65 mm)**
- One cobalt field bleeds off the top, left and right. It is the poster.
- A micro strip runs along its top edge: "CV · 2026" left, "Pomorskie, Poland · CET · EU" middle, "1/2" right. Set it in wide caps 7-7.5 pt, ice.
- Then the fitted name in ice, Anybody 900, two lines (MATEUSZ / MUSZARSKI) fitted to 182 mm. That is ~56-64 pt with line-height 0.86, as on the site.
- Under the name: the condensed role line "FULL-STACK PRODUCT ENGINEER" (14-16 pt, `wdth` 50-60, 800-900). Then a one-line lede at 10 pt. Then the contact row as label/value pairs (Art School move): label 6.5-7 pt wide caps, value 9 pt.
- Make sure "Mateusz Muszarski" also appears once as one plain line in the stream (micro strip or PDF Title). A two-line fitted name extracts as two lines, and friggeri shows how name extraction can fail.
- **The header stays in normal flow (no `position`)**, or every top-level block gets the same positioning. **[measured]** A `position: relative` header band moved the name *after* the body in the PDF text stream. With all blocks positioned alike, or none, the order was right.
- One pink sticker at the band's lower-right edge, straddling it like vivid-cv's photo: navy text on pink, e.g. "Open to work · remote / hybrid". Keep it straight in print, or test rotated text with all three extractors first. Put it last in the header's DOM.

**Type scale (Anybody; width carries the hierarchy, not tracking)**

| Role | Size | Width / weight | Notes |
| --- | --- | --- | --- |
| Name | 56-64 pt fitted | 900, wide | lh 0.86, uppercase |
| Role line | 14-16 pt | `wdth` 50-60, 800-900 | uppercase |
| Section label | 8-8.5 pt | `wdth` 150, 800 | uppercase, **letter-spacing 0** |
| Entry title | 11-12 pt | `wdth` 100, 800 | |
| Meta (org · place · dates · stack) | 8.5-9 pt | `wdth` 75-85, 600 | dates right-aligned |
| Body / bullets | 10 pt | `wdth` 90-100, 400 | lh 1.35-1.4; never under 10 pt |
| Micro (strips, footer) | 7-7.5 pt | `wdth` 150, 700 | uppercase |

- Wide caps come from the `wdth` axis, never from `letter-spacing`. **[measured]** Letter-spaced labels extracted as `F U L L S T A C K` and `E M A I L`. The ATS note found the same at 0.08-0.15 em.
- Variable Anybody prints as unnamed Type 3 fonts (ATS note). Upstream ships static OFL instances in three widths: UltraCondensed, normal and ExtraExpanded, each in Thin-Black. Its OFL declares **no Reserved Font Name**, so fontTools instancing at our exact `wdth` values is also allowed. Decide after the 3-extractor test.

**Colour, print and greyscale** (contrast measured with the WCAG formula)
- The paper is **white**, not ice. Ice as a page fill prints as a faint dither and costs toner.
- Body text is navy #0A0D33 (18.8:1 on white).
- Accents and links are cobalt #2433FF (7.0:1 on white, 6.2:1 on ice). Ice on cobalt is 6.2:1, AA at every size.
- **Never set text in pink on white (2.97:1)** or navy on cobalt (2.68:1). Pink is a fill under navy text (6.3:1) or a tiny marker. Navy on cobalt is for shadows and rules only.
- Greyscale check (luma): cobalt → dark grey (~70), pink → mid grey (~144), ice → near white (~241). The header still reads in B/W; the pink sticker becomes a grey tag with black text.
- Coloured area: the page-1 band plus the page-2 closing band, at most ~25% of one page in total.
- **Hard shadows:** navy, 1.5-2 mm offset, 0 blur. **[measured]** They print as vectors (a test page with a band and a shadowed card was 42 KB).
- **Grain:** only on colour fields, as a pre-rendered PNG tile under 10 KB set as the band's `background-image`. No filter, no blend mode. Or no grain in print. **[measured]** A 160 px PNG tile added 7 KB. The SVG `feTurbulence` grain made the PDF 3.3 MB as a tiled SVG and 6.3 MB as a CSS filter, which Chrome rasterised to a 2481 × 765 bitmap. Those sizes approach or exceed Textkernel's ~3 MB and Workable's 5 MB caps (ATS note).

**Photo** (optional; the locale note covers when)
- A square plate, not a circle: 24-28 mm, greyscale or cobalt/navy duotone.
- 1.5 pt navy frame plus a 2 mm hard offset shadow (Art School's "plate"), in the header's right columns.
- It must never push the profile below the band.
- Ship a no-photo variant. Duotone and greyscale both survive B/W printing.

**Section headings**
- A small cobalt "ticket" tag (ice text, 8-8.5 pt wide caps, 1.5 mm × 3 mm padding). After it, a 1 pt navy rule runs to the right margin (Awesome-CV / meridian rule move).
- Use plain words: Experience, Projects, Education, Skills, Languages.
- Skip numbered labels ("01"). They look editorial, but they add a token that parsers must strip. OpenResume's main heuristic wants a heading line that is only one bold, all-caps item.

**Entries**
- Four corners: **Title**, Org (left) · dates (right). Line 2: org type · place in meta.
- Then 2-3 bullets, ideally one line each, starting with the outcome or proof in numbers (Brittany, Zach).
- Then one stack line in meta cobalt ("Expo · React Native · Supabase · RevenueCat"), plain text with " · " separators. No pill boxes.
- Bullets are 3 pt navy squares (Brutalist's square bullet, recoloured). Pink marks only the current role ("now").

**Skills**
- 5-6 labelled lines (Frontend / Mobile / Backend & data / 3D & motion / AI & quality / i18n). The label is wide caps 8 pt cobalt in a ~30 mm label column; values are 10 pt.
- No bars, dots, stars or percentages.

**Page 2**
- It opens with its own strip: "MATEUSZ MUSZARSKI — CV" left, "muszarski.com · 2/2" right, micro type over a 1 pt navy rule. It is normal-flow text, so it appears once, in order.
- It starts on a section boundary. It carries Projects (if they overflow), qualifications and training as one line each, Skills, Education, Languages and Interests in one line.
- It ends with a **closing band**: navy or cobalt, at most 30-35 mm, bleeding off the bottom. It holds the email fitted large (a real `mailto:` link) and "this CV as a web page: muszarski.com/en/cv". This way the back of the sheet also carries the contact.
- Never leave page 2 mostly empty (Jarocki's print) or add "References available upon request".

**Running header and footer**
- The page 1 strip sits inside the band; the page 2 strip sits at its top. Both show page "1/2" / "2/2" and "Updated Oct 2026" (finely-crafted, moderncv).
- Don't use `position: fixed` or Playwright header templates. The pages are fixed, so plain flow content is simpler and extracts once.

**Links**
- Show every link as short readable text without `https://`: muszarski.com, github.com/MuchaSsak, linkedin.com/in/…, the email.
- Style them cobalt with a 1 pt underline. Brutalist's thick highlighter underline is a possible accent, in pink at ~40% under navy text.
- Project titles link to their live pages. Store links go to the case-study page on muszarski.com, which then links the stores. That way a paper reader still has one readable URL.

## Anti-patterns seen

- **Skill ratings:** stars, dots, bars and percent rings (Reactive Resume, AltaCV, Kickresume "Pipeline", "Dotts", Behance "2026 CV" `be-2026cv-1.jpg`).
- **Infographic costume:** a "day of my life" pie chart (AltaCV). Doodles, bubbles and an iMessage theme (Kickresume). A collage of app mockups, call bubbles and a typewriter (Behance "2026 CV").
- **Scattered poster grid with no reading order:** Kristian's staggered sections.
- **Sidebar-first or bottom-up text streams:** Brittany Chiang's PDF [measured], and Deedy's left column.
- **Letter-spaced labels** that extract as spaced letters (JSON Resume themes) [measured].
- **Web themes with no print design:** 12 A4 pages (Brutalist, Art School) [measured]. No `@page` margin clips the name (Zach) [measured].
- **Positioned header blocks** that push the name after the body in the text stream [measured, own test].
- **SVG noise grain in print:** 3.3-6.3 MB PDFs [measured, own test].
- **A name glued by a weight change** with no space: `adrienfriggeri` [measured].
- **Contact rows** with icons only or emoji icons (brilliant-cv, finely-crafted). Dotted leaders as text. QR codes.
- **Thin or grey body type** (Deedy hairline, typographic-resume grey serif). It dies in greyscale print.
- **Filler and private data in samples:** date of birth, "References available upon request" (vivid-cv).
- **Cartoon avatars as the photo**, in template samples (brilliant-cv, typographic-resume, vivid-cv).
- **A page 2 that is mostly empty** (Jarocki's printed A4).

## Sources

| URL | Title | Accessed |
| --- | --- | --- |
| https://brittanychiang.com/resume.pdf | Brittany Chiang, resume (PDF) | 2026-10-08 |
| https://cv.jarocki.me/ | Bartosz Jarocki - Resume | 2026-10-08 |
| https://github.com/BartoszJarocki/cv | BartoszJarocki/cv (MIT) | 2026-10-08 |
| https://www.zachleat.com/resume/ | Résumé—zachleat.com | 2026-10-08 |
| https://web.archive.org/web/20250122011342/https://read.cv/rauno | rauno – Read.cv (Wayback, 2025-01-22) | 2026-10-08 |
| https://mobbin.com/screens/a3955d6b-c6a9-4bf9-8c3e-6b93f4c9ede9 | Read.cv profile on a colour theme (Mobbin) | 2026-10-08 |
| https://mobbin.com/screens/a72588e5-1943-40a2-bd8c-dd52acd43ae2 | Read.cv profile editor with "Print Profile" (Mobbin) | 2026-10-08 |
| https://www.behance.net/gallery/233091093/CVResume-Layout | CV/Resume Layout, Kristian Adi Nugraha (Behance) | 2026-10-08 |
| https://www.behance.net/gallery/256334703/Minimalist-Swiss-Resume-and-Cover-Letter-Design | Minimalist Swiss Resume and Cover Letter Design (Behance) | 2026-10-08 |
| https://www.behance.net/gallery/246057935/2026-CV | 2026 CV (Behance) | 2026-10-08 |
| https://www.behance.net/search/projects/swiss%20resume | Swiss Resume Projects (Behance search) | 2026-10-08 |
| https://dribbble.com/search/typographic-resume | Typographic resume (Dribbble search) | 2026-10-08 |
| https://www.awwwards.com/websites/cv/ | Awwwards Nominees, CV tag | 2026-10-08 |
| https://registry.jsonresume.org/thomasdavis?theme=brutalist | Thomas Davis, JSON Resume, theme Brutalist | 2026-10-08 |
| https://registry.jsonresume.org/thomasdavis?theme=art-school-modern | Thomas Davis, JSON Resume, theme Art School Modern | 2026-10-08 |
| https://registry.jsonresume.org/thomasdavis?theme=bold-header-statement | Thomas Davis, JSON Resume, theme Bold Header Statement | 2026-10-08 |
| https://jsonresume.org/themes | Themes — JSON Resume | 2026-10-08 |
| https://github.com/jsonresume/jsonresume.org | jsonresume/jsonresume.org (MIT) | 2026-10-08 |
| https://github.com/friggeri/cv | friggeri/cv (MIT) | 2026-10-08 |
| https://github.com/posquit0/Awesome-CV | posquit0/Awesome-CV (LPPL-1.3c) | 2026-10-08 |
| https://typst.app/universe/package/brilliant-cv | brilliant-cv – Typst Universe (Apache-2.0) | 2026-10-08 |
| https://github.com/deedy/Deedy-Resume | deedy/Deedy-Resume (Apache-2.0) | 2026-10-08 |
| https://github.com/moderncv/moderncv | moderncv/moderncv (LPPL-1.3c) | 2026-10-08 |
| https://github.com/rendercv/rendercv | rendercv/rendercv (MIT) | 2026-10-08 |
| https://github.com/jakegut/resume | jakegut/resume (MIT) | 2026-10-08 |
| https://github.com/liantze/AltaCV | liantze/AltaCV (LPPL 1.3) | 2026-10-08 |
| https://typst.app/universe/search/?q=cv&kind=templates | Typst Universe search: cv templates | 2026-10-08 |
| https://packages.typst.org/preview/index.json | Typst package index (licences) | 2026-10-08 |
| https://typst.app/universe/package/typographic-resume | typographic-resume (MIT) | 2026-10-08 |
| https://typst.app/universe/package/neat-cv | neat-cv (MIT) | 2026-10-08 |
| https://typst.app/universe/package/meridian-cv | meridian-cv (MIT AND MIT-0) | 2026-10-08 |
| https://typst.app/universe/package/vivid-cv | vivid-cv (MIT) | 2026-10-08 |
| https://typst.app/universe/package/finely-crafted-cv | finely-crafted-cv (MIT) | 2026-10-08 |
| https://typst.app/universe/package/altacv | altacv Typst port (MIT) | 2026-10-08 |
| https://github.com/reactive-resume/reactive-resume | reactive-resume (MIT) | 2026-10-08 |
| https://enhancv.com/resume-templates/ | Free & Premium Resume Templates, Enhancv | 2026-10-08 |
| https://flowcv.com/resume-templates | 100+ Free Resume & CV Templates, FlowCV | 2026-10-08 |
| https://www.kickresume.com/en/templates/resume/ | Best Resume Templates 2026, Kickresume | 2026-10-08 |
| https://novoresume.com/resume-templates | 16+ Free Resume Templates, Novorésumé | 2026-10-08 |
| https://www.open-resume.com/resume-parser | OpenResume parser and algorithm deep dive (AGPL-3.0) | 2026-10-08 |
| https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/ | Eye tracking study shows recruiters look at resumes for 7 seconds (HR Dive, 2018-11-08) | 2026-10-08 |
| https://github.com/Etcetera-Type-Co/Anybody | Anybody upstream (OFL-1.1, static instances in `fonts/ttf`) | 2026-10-08 |
| https://github.com/google/fonts/tree/main/ofl/anybody | Google Fonts Anybody (OFL.txt, no Reserved Font Name) | 2026-10-08 |
| https://muszarski.com/en/cv/print/ | Mateusz Muszarski – CV (current print view, context) | 2026-10-08 |
