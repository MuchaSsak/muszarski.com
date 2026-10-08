# CV PDF that gets a developer hired (2025-2026): recruiters, ATS, layout, content, personal data, file hygiene

> **Question:** what makes a developer CV PDF (max 2 A4 pages, HTML → Chrome PDF via Playwright) get Mateusz shortlisted by Polish software houses, product companies, EU remote and creative/product roles, without losing ATS or recruiter practicality?
> **Method:** web research (24 searches, ~45 fetches; primary sources first), plus my own tests: test PDFs printed with the repo's Playwright 1.63 / Chromium 153 and read with three extractors (Poppler `pdftotext` 26.x, PyMuPDF 1.28.2, pdf.js 6.4.299), and an audit of the committed `apps/web/public/files/mateusz-muszarski-cv-*.pdf`.
> **Date:** 2026-10-08. Evidence labels: [data] study/survey with n · [vendor] study by a company that sells a product · [expert] recruiter, hiring manager, career service or vendor docs · [anecdote] · [measured] my own test (method stated). "Dated" = older than 2020.

## Findings

### Layout and skim pattern

1. **The first pass is seconds, and it lands on titles, companies, dates and education.** Ladders 2018: average initial screen 7.4 s (up from 6 s in 2012) [vendor] (S1, S2). Ladders 2012 (dated): recruiters spent "almost 80%" of review time on six items: name, current title/company, current position start/end dates, previous title/company, previous position start/end dates, education. Beyond these they "did little more than scan for keywords" [vendor, dated] (S4). Counterpoint: interviewing.io had 76 recruiters judge 1,000+ resumes. The median time was 31 s, and accuracy was 55%, "just slightly better than a coin flip" [data] (S23). So the first screen is fast and noisy either way.
2. **What Ladders 2018 actually said about columns: "multiple columns", never "two-column".** The worst performers had "cluttered layouts, a lack of white space on the page, multiple columns and long sentences", plus no section or job headers and "text that didn't flow or draw the eye down the page". The best had "simple layouts, with clear sections and heading titles". Layouts that used "E- or F-pattern reading tendencies also did well, especially when they utilized bold titles and bulleted accomplishments". Top performers also had "a detailed overview or mission statement" at the top of page 1 [vendor] (S1, S2, S3). The phrase "two-column" is in none of the three copies of the 2018 text I found. Methods (n, how "performance" was scored) are undisclosed.
3. **Correction to our earlier note: `TheLadders-EyeTracking-StudyC2.pdf` is the 2012 study, not 2018.** A full copy (BU mirror, uploaded Oct 2018, before the 2018 release) contains the 2012 text: "Thirty professional recruiters... during a 10-week period", "6 seconds", citing Will Evans 2012 [measured: pdftotext of S4]. So "30 recruiters, 10 weeks" belongs to 2012. The 2018 study's PDF was not found. Bonus: the bullets in that PDF extract as `1DPH`, `(GXFDWLRQ`, a Caesar-shifted glyph map with no usable Unicode ("Name", "Education"). It is a live example of the font-mapping failure in finding 9 [measured].
4. **F-pattern is a symptom of poor formatting, not a goal.** NN/g: people scan in an F when text has "little or no formatting", they want efficiency and their interest is moderate. Counter it with distinct headings, important points first, bolded key phrases, headings that front-load information words, and bullets [expert/data: NN/g eye-tracking, 2017, reviewed 2026] (S5).
5. **Single vs two-column readability: no controlled study found.** The evidence is Ladders' "multiple columns" (above) and recruiter preference for "clear, skimmable structure" (92% of 25 US recruiters) and "simple, consistent formatting" (68%) [vendor, small n] (S14). In Poland, 60.4% of IT recruiters named "nieczytelny układ czy czcionkę" (an illegible layout or font) as a common CV mistake [data: No Fluff Jobs, n=588 PL+HU, 2023] (S20).

### ATS parsing (2025-2026)

6. **"75% of resumes are rejected by ATS" is a myth.** It traces to a 2012 sales pitch by Preptel, a resume-optimisation firm that closed in 2013. No method was ever published. HR consultant Christine Assaf: "It's simply not true that ATS systems auto-reject" [expert] (S13). Enhancv interviewed 25 US recruiters (Sep-Oct 2025). 92% (23/25) said their system does not auto-reject for formatting, content or design. 100% use knockout questions (work authorisation, location, degree, licences). 44% have AI match scores, but only 8% use them as hard filters [vendor, n=25] (S14). The real filter is the knockout question plus a human who stops reading when volume is high.
7. **Exact-match filtering still costs people.** In the HBS/Accenture "Hidden Workers" survey (2,275 executives, US/UK/DE, 2021), 88% agreed that qualified high-skills candidates are "vetted out... because they do not match the exact criteria" (94% for middle skills) [data, perception survey] (S15, S16). So match the job ad's words (stack, title) in plain text. This is about recruiter search and ranking, not about layout.
8. **Columns are not the failure; the order of the text stream is.** Resumap fed one synthetic resume in 36 layouts to real Zoho Recruit, Workable and Textkernel. Email and phone parsed 36/36 everywhere. All jobs were segmented 36/36 on Workable and 31/36 on Textkernel. Several two-column layouts scored perfectly. "The failure mode isn't columns. It's text-stream order": a sidebar emitted interleaved with the main column gives `Skills Senior Backend React Engineer`. Self-test: `pdftotext -layout cv.pdf - | head -40` should "read like a resume" [vendor, author sells templates, 2026-07-28] (S6).
9. **In OUR pipeline (Chromium 153 `page.pdf`), what extracts and what breaks** [measured: test page printed with the repo's Playwright, read by pdftotext, PyMuPDF and pdf.js; M1]:
   - **DOM order = text-stream order.** PyMuPDF and pdf.js follow DOM order even when CSS grid places the element elsewhere. `pdftotext` (raw) reorders by geometry, left column first. `pdftotext -layout` interleaves side-by-side columns line by line. Only a layout where DOM order = visual reading order reads the same in all three.
   - **Variable fonts are embedded as Type 3 fonts with no font name.** Anybody (woff2), Segoe UI Variable and Bahnschrift all became Type 3. Static TTFs (Arial, Calibri, Segoe UI) became named Type 0/TrueType subsets. Text still extracts (Chrome writes a ToUnicode map). But a parser that infers bold or headings from the font name sees nothing [inference].
   - **Letter-spacing splits words.** Arial at 0.08 em was clean in all three extractors. At 0.15 em, pdf.js and PyMuPDF output `E D U C AT I O N`. With the Type 3 variable font, pdftotext split even at 0.08 em.
   - **Safe:** ligatures (fi/ffi/fl extract as plain letters in all three); `text-transform: uppercase` (extracts as capitals); CSS `::before` text (extracts); SVG `<text>` (extracts); Polish diacritics (with UTF-8 output); link annotations (present, but the visible text is what gets parsed).
   - **Quirks:** `background-clip: text` gradient text moved to the top of PyMuPDF's output. A `position: fixed` element repeats on every page, so its text appears once per page.
10. **Vendor docs on what breaks.** Workable (candidate help, updated 2026-10-07): files up to 5 MB (.pdf/.doc/.docx/.odt/.rtf). "Divide the text into clear sections and use easily readable fonts". Include only one email. "Avoid using too many images". Avoid image-only "infographics" resumes [expert: vendor docs] (S7). RChilli (2025-09-23): text PDF and Word give the "highest fidelity". Accuracy "depend[s] more on the resume's text quality, layout, and formatting than the file type". Scanned/image PDFs need OCR and "can reduce accuracy" [expert: vendor docs] (S8, S9). OpenResume's parser is "designed to parse single column resume in English". It finds sections by text that is both bold and UPPERCASE [expert: OSS docs] (S12). Tech Interview Handbook: standard fonts, minimum 10 pt; non-standard fonts "may convert letters into special characters" [expert] (S18).
11. **LLM parsing helps but is not the default you can bank on.** Textkernel's LLM Parser (announced 2024-02-01, GPT-3.5 at launch) is opt-in per request at an add-on cost. It is "several seconds slower", capped at ~3 MB vs ~16 MB, and "can generate information that is factually incorrect" [expert: vendor docs] (S10, S11). Claims that Greenhouse or Ashby moved to LLM parsing come only from resume-tool blogs [unverified]. Not found: first-party parsing docs for Traffit, Recruitee, Breezy, Teamtailor or Ashby (Lever's help article is behind a login). A clean, linear text layer stays the baseline for every parser.
12. **Self-test tools.** `pdftotext -layout` (S6). OpenResume parser (single-column English only) (S12). Our own 3-extractor check (M1). Jobscan-style match scores are commercial and unverified. Use them for keyword gaps only.

### Length

13. **1 vs 2 pages: both are defensible. Two pages win only when page 2 has substance.** ResumeGo (2018, simulation, 482 hiring professionals, 7,712 resumes): two-page resumes were preferred 2.3x overall. At entry level the ratio was 1.4x [vendor, dated] (S17). Enhancv 2025: 64% of recruiters want "one to two pages maximum" [vendor, n=25] (S14). Ladders 2018: "a strict two-page limit" for experienced seekers [vendor] (S2). US early-career advice says one page: Tech Interview Handbook "Use only 1 page" and UT Austin "1-page for job and internship applications" [expert] (S18, S19). Implication: page 1 must work alone (finding 1). Page 2 is optional depth.

### Content

14. **Projects with links and personal outcomes beat duties.** Polish recruiters' top CV mistake: "brak informacji o zadaniach wykonywanych w ramach podejmowanych projektów" (no information on the tasks done in projects), named by 64.8% [data: No Fluff Jobs, n=588, 2023] (S20). Enhancv: 72% want short bullets over paragraphs and 52% value measurable achievements [vendor] (S14). Tech Interview Handbook: at least 2 projects with links. Bullet shape: "[Action] that resulted in [quantifiable outcome]" [expert] (S18). Engineering leaders rank side projects/portfolio (38%) above a degree (23%) [data: CodePath, Dec 2025, from S32]. But only ~20% of recruiters use portfolio review (CoderPad 2025, from S32), so the CV must carry the proof itself.
15. **Summary/profile: yes, short and specific.** Ladders 2018: top resumes had an overview at the top of page 1 [vendor] (S3). Tech Interview Handbook: under 50 words [expert] (S18).
16. **Skills: grouped plain-text lists, no bars or ratings.** Josh Comeau: "There's no way to win with it" [expert] (S32). A bar is a picture, so the parser gets no skill text from it [inference, consistent with S7]. Do not cite the "ResumeGo skill-bar experiment": it is not in ResumeGo's index (S32).
17. **Certificates, hackathons, volunteering, interests: low weight, keep them short.** UK National Careers Service: include "interests and hobbies that show some of the skills you have" [expert: gov] (S24). Earlier note: hiring managers "liked game jams and mini projects more" than certificates; cloud certs aside, certs mainly feed ATS keyword filters [anecdote] (S32). No data found that interests change callback rates.
18. **AI-written CVs are now a real negative signal.** TopResume (600 US hiring managers, May 2025): 19.6% would reject a candidate with an AI-generated resume or cover letter. 33.5% say they spot one in under 20 s. 52% accept AI for proofreading or drafting if the result "sound[s] human" [vendor] (S21). Simplify measured 110k+ resumes on its platform. Em dashes rose from 0.0% (2023) to 2.7% (2026). At least one of "spearheaded, leveraged, orchestrated, honed, streamlined" appeared in 32.2% of first-role descriptions in 2023 and 52.0% in 2025 [vendor data] (S22). A recruiter quoted by Enhancv sees "a big uptick in the exact same format from ChatGPT" [expert] (S14). A hiring manager on Reddit (2026-03): "clearly LLM. <10 seconds to bin" [anecdote] (S32). Other tells (bullets all 14-18 words with one grammar skeleton, buzzword adjectives) are described but not quantified (S22).

### Personal data

19. **Photo depends on the market; there are no outcome data for developers.**
    - **Poland:** optional but "częsta praktyka" (common practice) (Pracuj.pl experts, 2018, dated) [expert] (S26). PL IT recruiters already flag unneeded personal details (age, home address) as a mistake: 60.6% [data] (S20).
    - **Germany:** "nicht verpflichtend, [aber] erwarten die meisten Arbeitgeber ein Bewerbungsfoto" (not mandatory, but most employers expect one) [expert: StepStone, 2024] (S25).
    - **UK:** official guidance says leave out age, date of birth, marital status and nationality. Its list of what to include has no photo [expert: gov] (S24).
    - **Spain:** common practice (InfoJobs profiles have a photo field), not required. No primary data found [expert, weak].
    - Ladders 2012: on LinkedIn profiles, recruiters spent 19% of their time on the photo [vendor, dated] (S4).
    - For a mixed PL/EU/remote audience, a small photo is neutral to slightly positive. A PDF variant without a photo covers UK/US/Ireland.
20. **Phone, address, date of birth, nationality, LinkedIn.**
    - **Phone:** the UK guidance and StepStone (DE) both list it [expert] (S24, S25). Parsers extracted phone 36/36 (S6). No data found on how often recruiters actually call.
    - **Address:** city + country is enough. 60.6% of PL IT recruiters flag a home address as unneeded (S20). StepStone's "full address" rule is a German-local convention (S25).
    - **Date of birth:** omit (S20, S24, S25).
    - **Nationality / work authorisation:** every knockout question includes work authorisation (S14). StepStone: state nationality when applying "als EU-Bürger*in im EU-Ausland" (as an EU citizen in another EU country) (S25). So a short "EU citizen, no visa needed" line helps for EU remote roles [inference].
    - **LinkedIn:** the UK guidance asks for "a link to your work network profile" [expert] (S24).
21. **QR codes: weak case.** TopResume: an image the ATS can't read, and useless when the recruiter is reading on a phone [expert, 2024] (S28). The "31% of hiring managers scanned a QR code (LinkedIn 2022)" stat traces only to resume-tool blogs [untraceable]. Clickable text links do the same job in a PDF.

### Visual design

22. **Design can help in creative roles, but clutter hurts everywhere.** Creative Group (US, 500+ ad/marketing execs, 2012, dated): 46% said that for creative roles "how a resume looks matters as much as what it contains", and 43% said it is somewhat important [data, dated] (S29). TopResume (~400 recruiters, year not given): "format and/or design is too elaborate" is a top-10 resume offence [vendor] (S30). Enhancv: 20% of 25 recruiters flagged designs with "heavy graphics, fancy fonts, and pictures" as hard to scan [vendor] (S14). Ladders 2012: professionally rewritten resumes with a clear hierarchy scored 6.2/7 on usability vs 3.9 [vendor, dated] (S4). For a front-end/creative candidate, a well-designed CV is a mini work sample, provided the hierarchy stays obvious [inference].
23. **Minimums.** UT Austin: 10-12 pt, "Don't go smaller than 10 pt!"; margins at least ½ in (12.7 mm), because "Sometimes people need to print resumes!" [expert] (S19). Tech Interview Handbook: at least 10 pt [expert] (S18). Not found: data on colour or greyscale printing. Apply WCAG contrast (4.5:1 body text) and check a greyscale print [inference].

### File hygiene

24. **Name, size, metadata, tags.** File name with your name (UT Austin: "a unique file name that includes your name") [expert] (S19). Size well under 5 MB (Workable) and 3 MB (Textkernel LLM parser) (S7, S10). Playwright `page.pdf({tagged, outline})` exists since v1.40 (S31). No evidence found that any ATS reads PDF tags or metadata. They help accessibility and the browser-tab title.
25. **Audit of our current CV PDFs (en/pl/es)** [measured: M1, files dated 2026-10-08]:
    - **Good:** tagged (StructTreeRoot, MarkInfo, /Lang en/pl/es), outline from headings, Title "Mateusz Muszarski – CV", ~240 KB, diacritics extract, 7 clickable links with the URL also in visible text, no phone, no DOB.
    - **Problems:**
      - **3 pages** in every locale (target is 2).
      - All fonts are **Type 3**, because Anybody is a variable font.
      - Letter-spaced headings split in pdftotext: `E D U CAT I O N`, `C O NTACT`, `W Y K S Z TAŁ C E N I E`, `F O R M AC I Ó N`. pdf.js and PyMuPDF read them fine.
      - The contact/skills/languages sidebar comes **last** in the text stream, after page 2 content.
      - The email is **not** a `mailto:` link.
      - The Author metadata is empty.

### Stats not to cite (untraceable or unverified this pass)

- "75% of resumes rejected by ATS": Preptel 2012 pitch (S13).
- "Single-column PDFs 96% vs two-column 78% parse completeness": found only in resume-tool blogs. The cited page has no such data.
- "31% of hiring managers scanned a resume QR code": resume-tool blogs.
- "Greenhouse 2026: 91% of hiring managers caught AI misrepresentation" and "Resume Builder 2025: hiring managers spot AI resumes with 52-58% accuracy": search snippets only, not verified.
- Any "30 recruiters, 10 weeks" description of the 2018 Ladders study: that is the 2012 study (finding 3).

## Implications for our template

**Layout**
- DO make page 1 stand alone. Top band: name, role ("Full-stack developer (React, Node.js, TypeScript)"), city + country, EU citizen line, email, phone, site, GitHub, LinkedIn. Then a 2-3 line profile, then experience and projects with bold titles, one-line company/dates, and 2-3 short bullets each.
- DO keep DOM order = reading order: header, profile, experience, projects, education, then the rest. If a sidebar is used, put it first in the DOM on the left (or after the header) and keep it self-contained: skills, languages, links. Never let it carry information that only exists there.
- DO use clear section headings in plain words (Experience, Projects, Education, Skills, Languages; PL: Doświadczenie, Projekty, Wykształcenie, Umiejętności, Języki), bold, and placed above their content.
- DON'T use more than two columns, side-by-side text boxes inside sections, or long paragraphs. Bullets stay at 1-2 lines.

**ATS / text layer**
- DO print the PDF with a **static** font instance (or a static fallback in print CSS) so Chrome embeds named Type 0/TrueType fonts, not Type 3. The variable Anybody can stay on the web page.
- DO keep heading letter-spacing ≤ 0.05 em in print (0.08 em is already risky with Type 3).
- DO put every URL, email and phone in visible text. The link annotation is extra.
- DO use one date format everywhere (e.g., "06/2026 – now" or "Jun 2026 – now") and standard job titles ("Intern", "Founder & developer").
- DO run a gate on every build: `pdftotext -layout`, PyMuPDF and pdf.js must each read name, email and section headings in order. It must also check: no split headings, page count ≤ 2, and every Type 3 font flagged.
- DON'T put text in images, icons-only contact rows, skill bars, gradient-clipped text or `position: fixed` repeats (unless the repeat is wanted). No QR code needed.
- DON'T rely on LLM parsing to fix a bad text layer.

**Content**
- DO lead with shipped proof: Linkoglot (App Store + Google Play links), PstrykWeb, Clockful. One outcome per bullet, with numbers you can defend (tests, languages, Lighthouse, dates).
- DO write a profile of 50 words or less that names the target role and stack in the job-ad words.
- DO group skills as plain lists (Frontend / Mobile / Backend / 3D / AI and quality), with no ratings.
- DO keep certificates, courses, hackathons, Erasmus+ and interests to one compact block on page 2. Course IDs and Youthpass codes belong on the web CV, not the PDF.
- DON'T use em dashes or stock verbs (spearheaded, leveraged, orchestrated, honed, streamlined), don't give every bullet the same length and skeleton, and don't stack buzzword adjectives.

**Personal data**
- DO: email on own domain, phone (+48), "Pomorskie, Poland · EU citizen · remote/hybrid", LinkedIn, GitHub, site.
- DON'T: date of birth, full street address, marital status, RODO clause (not needed in PL for standard data, already known).
- Photo: optional small headshot in the PL/ES/DE variant. Offer a no-photo variant (or default) for UK/US/remote ads. Never let the photo push content below the fold of page 1.

**Visuals**
- DO: body 10-11 pt (never under 10 pt; 9 pt only for meta lines like dates), margins ≥ 12.7 mm, generous white space, one accent colour, body contrast ≥ 4.5:1, readable in a greyscale print. Any creative signature (type scale, one rule or band, a small mark) must sit outside the text flow.
- DON'T: skill bars, icon-only labels, low-contrast grey text, dense blocks, decorative full-bleed backgrounds that waste toner.

**File hygiene**
- DO: `mateusz-muszarski-cv-<locale>.pdf` (already fine), under 1 MB, keep `tagged` + `outline` + `/Lang`, set Title and Author (Chrome leaves Author empty; post-process with pdf-lib if wanted), make email a `mailto:` link, duplex-friendly 2 pages.

## Sources

| ID | URL | Title | Date |
| --- | --- | --- | --- |
| S1 | https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/ | Eye tracking study shows recruiters look at resumes for 7 seconds (HR Dive, Riia O'Donnell) | 2018-11-08 |
| S2 | https://onrec.com/node/118330 | Ladders Updates Popular Recruiter Eye-Tracking Study With New Key Insights (press release) | 2018-11-07 |
| S3 | https://hrdailyadvisor.hci.org/?p=65011 | Eye-Tracking: Recruiters Average 7.4 Seconds Reviewing a Résumé (HR Daily Advisor) | 2018-11-15 |
| S4 | https://www.bu.edu/com/files/2018/10/TheLadders-EyeTracking-StudyC2.pdf | Keeping an eye on recruiter behavior (TheLadders 2012 eye-tracking study; dated) | 2012 |
| S5 | https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/ | F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant (NN/g, Kara Pernice) | 2017-11-12 (reviewed 2026-08-19) |
| S6 | https://dev.to/resumap/we-ran-the-same-resume-through-4-real-ats-parsers-in-36-layouts-same-text-different-parses-3mfc | We ran the same resume through 4 real ATS parsers in 36 layouts (Resumap) | 2026-07-28 |
| S7 | https://jobseekers.workable.com/hc/en-us/articles/360036231313-Import-your-resume-details-to-autofill-the-application | Import your resume details to autofill the application (Workable help) | updated 2026-10-07 |
| S8 | https://help.rchilli.com/hc/en-us/articles/50944742931097-Which-resume-format-PDF-DOCX-or-TXT-provides-the-best-parsing-accuracy-and-performance-when-processed-through-RChilli | Which resume format provides the best parsing accuracy (RChilli help) | 2025-09-23 |
| S9 | https://help.rchilli.com/hc/en-us/articles/360011281033-What-Resume-file-formats-can-the-RChilli-Parser-process | What resume file formats can the RChilli Parser process | updated 2025-06-02 |
| S10 | https://developer.textkernel.com/tx-platform/v10/resume-parser/overview/llm-parser/ | LLM Parser (Textkernel Tx Platform docs) | n.d. (read 2026-10-08) |
| S11 | https://www.onrec.com/node/124446 | Textkernel introduces LLM Parser: a leap forward in resume parsing (also textkernel.com/newsroom/textkernel-introduces-llm-parser) | 2024-02-01 |
| S12 | https://www.open-resume.com/resume-parser | OpenResume resume parser (algorithm notes) | n.d. |
| S13 | https://blog.hiringthing.com/applicant-tracking-systems-arent-excluding-job-applicants-people-are | Applicant Tracking Systems Aren't Excluding Job Applicants, People Are (HiringThing, quoting Christine Assaf) | n.d. |
| S14 | https://enhancv.com/blog/does-ats-reject-resumes/ | Does ATS reject resumes? Interviews with 25 recruiters (Enhancv, Doroteya Vasileva) | 2025-11-03, updated 2026-09-30 |
| S15 | https://www.theregister.com/2021/09/08/harvard_jobs_report/ | Report on HBS/Accenture "Hidden Workers: Untapped Talent" (The Register) | 2021-09-08 |
| S16 | https://www.accenture.com/content/dam/accenture/final/a-com-migration/r3-3/pdf/pdf-169/accenture-hidden-worker-report.pdf | Accenture Hidden Worker Report (public-sector cut of the HBS/Accenture study) | 2021 |
| S17 | https://www.resumego.net/research/one-or-two-page-resumes/ | One-page vs two-page resumes study (ResumeGo; dated) | 2018 |
| S18 | https://www.techinterviewhandbook.org/resume/ | Software engineer resume guide (Tech Interview Handbook, Yangshun Tay) | updated 2026-08-07 |
| S19 | https://careerservices.cns.utexas.edu/resources/resumes/resume-formatting | Resume formatting (UT Austin CNS Career Services) | n.d. |
| S20 | https://kadry.infor.pl/wiadomosci/6394324,jakie-bledy-w-cv-najczesciej-popelniaja-kandydaci-z-branzy-it.html | Jakie błędy w CV najczęściej popełniają kandydaci z branży IT (No Fluff Jobs survey, n=588) | fieldwork Sep-Oct 2023 |
| S21 | https://topresume.com/career-advice/ai-in-hiring-survey | Survey: where employers draw the line on the use of AI in hiring (TopResume, n=600, Pollfish) | 2025-05 |
| S22 | https://simplify.jobs/blog/can-recruiters-tell-if-ai-wrote-your-resume | Can recruiters tell if AI wrote your resume? (Simplify, Ally Ariate; 110k+ resumes) | 2026-08-03 |
| S23 | https://interviewing.io/blog/are-recruiters-better-than-a-coin-flip-at-judging-resumes | Are recruiters better than a coin flip at judging resumes? (interviewing.io, Lerner & Bergman) | n.d. (c. 2024) |
| S24 | https://nationalcareers.service.gov.uk/careers-advice/cv-sections | How to write a CV (UK National Careers Service) | n.d. |
| S25 | https://www.stepstone.de/magazin/artikel/persoenliche-daten-lebenslauf | Persönliche Daten im Lebenslauf: Diese Angaben sind Pflicht (StepStone) | 2024-09-20 |
| S26 | https://forsal.pl/artykuly/1106390,dlaczego-warto-zamiescic-zdjecie-w-cv.html | Dlaczego warto zamieścić zdjęcie w CV (Pracuj.pl material; dated) | 2018-02-23 |
| S28 | https://topresume.com/career-advice/should-resume-have-qr-code | QR codes on resumes: to include or not? (TopResume, Marsha Hebert) | updated 2024-11-07 |
| S29 | https://press.roberthalf.com/news_releases?item=1435 | Pretty "on paper": The Creative Group survey (Robert Half; dated) | 2012-05-02 |
| S30 | https://www.topresume.com/career-advice/creative-resume-designs | Creative resume designs (TopResume, Amanda Augustine) | updated 2024-11-07 |
| S31 | https://playwright.dev/docs/api/class-page#page-pdf | page.pdf() options incl. `tagged`, `outline` (added v1.40) | read 2026-10-08 |
| S32 | .claude/project-info/research/2026-10-05-hiring-perspective.md and 2026-10-05-portfolio-spectrum-and-outcomes.md | Earlier notes: CoderPad 2025/2026, CodePath Dec 2025, Josh Comeau on skill bars, r/cscareerquestions 2026-03 | 2026-10-05 |
| M1 | scratchpad tests (not kept) + `apps/web/public/files/mateusz-muszarski-cv-{en,pl,es}.pdf` | [measured] Chromium 153 via Playwright 1.63 `page.pdf({format:'A4', printBackground, preferCSSPageSize, tagged, outline})`; read with Poppler pdftotext (raw, `-layout`, `-enc UTF-8`), PyMuPDF 1.28.2 `get_text`/`get_fonts`/`get_links`, pdf.js 6.4.299 `getTextContent` | 2026-10-08 |
