---
name: new-cv
description: "Build, update, tailor or translate Mateusz's CV: the designed two-page A4 PDF in en / pl / es and the /cv/ page, both made from apps/web/src/data/cv.ts. Use whenever the owner wants a new or updated CV, resume, życiorys or currículum; adds or removes a job, project, course, certificate, skill or language; changes CV wording, photo or contact details; wants the CV tailored to a job ad, company or country; asks to regenerate, check or fix the CV PDFs; or types /new-cv. Use it even when the message only mentions one fact that belongs on the CV (\"I finished the internship\", \"add HackYeah\")."
argument-hint: "[what changed, or a job ad to tailor to]"
---

# New CV

The CV is one data file rendered twice: a designed A4 sheet (the PDF) and the `/cv/` web page. This skill keeps both
true, current, localized and printable on one duplex sheet. The owner's words: "build the best template for all future
ones and be fluid enough with it that if I ever need to add or remove some more or less content, then it flows nicely."

## The map

| Piece | Where | Notes |
| --- | --- | --- |
| Data (the one source) | `apps/web/src/data/cv.ts` | per-locale `Text`. Never edit the PDF or the page alone. Also read by: home Competences and its Experience card (`credentials`, `when`, `short`), the Person JSON-LD `jobTitle` (`lib/schema.ts`, from `CV.title`) and `llms.txt`; say so when a change shows there too |
| Credentials on the CV | `CV.qualifications` (ids, in the CV's order) + each credential's `cv` override (`cvQualifications()`) | the home card keeps its full text and certificates; the CV shows the override: its own title, date, one summary line (`summaryOnly`), a `gain` line |
| The sheet (PDF layout) | `apps/web/src/components/cv/CvSheet.astro` | how it works and its rules: `references/template.md` |
| Print route | `apps/web/src/pages/[locale]/cv/print/index.astro` | page CSS (`@page`), metadata, digest; noindex, out of the sitemap |
| Fonts | `bun run cv:fonts` → `public/fonts/cv/`, `src/styles/cv-fonts.css`, `src/lib/cv-fonts.gen.ts` | static Anybody instances + the fitted name + the sticker outlines |
| Print + checks | `bun run cv:sheet` (= `cv:pdf`, `apps/web/scripts/cv-sheet.mjs`) | builds, serves, fits ≤ 2 pages, writes `public/files/*.pdf` + `cv-digest.json` + page previews (`*-p1.webp`, `*-p2.webp`), checks; report in `.cache/cv-sheet-report.json`. A print with a `FAIL` goes to `.cache/cv-rejected/` and never replaces a live PDF |
| Web page | `apps/web/src/pages/[locale]/cv/index.astro` (head, contact bar) + `components/cv/CvWeb.astro` (body) + `CvPapers.astro` (the PDF's pages as paper) | the same sections, order, words and links as the sheet, laid out for a screen (`design.md` § CV page) |
| Evidence | `.claude/project-info/research/2026-10-08-cv-*.md` | recruiters + ATS, locale conventions, design inspiration |

## Workflow

1. **Intake.** Find out what changes and why: a new job or project, a cut, a wording fix, a job ad to tailor to, a new
   market (en / pl / es). Collect facts from the owner; never invent dates, numbers, titles or levels. Ask only for what
   is missing and say why it matters ("recruiters filter on dates", "CEFR level, since 'fluent' isn't one"). Something
   that doesn't exist yet (a package to be published next month) is not added: ask for it once it's real. A real entry
   with an unconfirmed fact gets `placeholder: true` + a `// PLACEHOLDER (Pn)` comment in `cv.ts` and a row in
   `placeholders.md`, disclosed in chat; `cv:sheet` lists those entries as warnings. Never put the word in a printed
   string (that fails the print).
2. **Decide the content** with `references/content.md`: what goes in, what stays out (personal data included), how to
   write a bullet, per-locale conventions, the cutting order. Page 1 must sell him alone.
3. **Edit the data** (`cv.ts`): English first, then Polish and Spanish (Spanish stays marked unreviewed, `i18n.md`).
   Polish and Spanish run ~15% longer than English: write them to the English line count (`references/content.md` § 5).
   Keep the
   structure; add fields rather than overloading strings. A new section type also needs the sheet
   (`references/template.md` § Adding a section) and the page. Where things go:
   - Seniority words ("junior", "looking for") go in `CV.availability`, not `CV.title`: the title is fixed by
     `brand.md` and feeds the JSON-LD.
   - A phone number goes in `CV` (so the digest covers it) and renders in the contact bar after the email as a
     `tel:` link whose visible text is the number (`+48 600 000 000`), with `data-cv-link` + `data-cv-must`.
   - A new section goes after Selected projects unless there's a reason (`content.md` § 3).
4. **Fonts:** only when the name, a type role or the sticker changed: `bun run cv:fonts` (in `apps/web`).
5. **Print and check:** in `apps/web`, `bun run cv:sheet --png` (about 1 min per locale after a ~35 s build; `--no-build`
   reuses the last build, `--locales en` narrows it). Read every line it prints:
   - `FAIL …` must be fixed (meaning of each: `references/template.md` § Checks). Exit code 1 until they're gone.
   - `N pages even at the densest setting` = too much content: cut (`references/content.md` § Cutting), never shrink the
     type below the template's floor.
   - `warn page 2 holds only N% content` = add substance or aim for one page.
   - `warn facts still to confirm` = entries with `placeholder: true`; list them in the report.
   - `--d` near 0 = dense but legal; near 1 = roomy. Report it.
   - Variants write to `apps/web/.cache/cv-variants/` (gitignored) unless `--out` is given: `--no-photo` (UK, Irish
     and US applications) and `--stress more|less` (template tests).
6. **Look at every page** (`*-p1.png`, `*-p2.png`, all three locales; pl runs longest). Check: nothing clipped or
   overlapping (the sticker, long titles in the rail, the contact bar), no orphan heading at a page foot, no widow line
   alone at a page top, each page reads on its own, the closing band sits at the foot of the last page.
7. **Sync the web page** 1:1 with the PDF: same sections, order, wording and links (`CvWeb.astro` reads the same data,
   so a data change shows by itself; a new section or field needs markup there too). Then, from the repo root,
   `bun run check` (typecheck + lint + unit; `cv.test.ts` compares the PDF digests and wants the page previews) and,
   in `apps/web`, the CV e2e tests: `bunx playwright test e2e/pages.spec.ts -g CV`.
8. **Close:** wiki (`content-model.md` § CV for any rule change, `log.md` line; `placeholders.md` and
   `open-questions.md` when an answer clears a row), commit your own paths per the working agreement, and a short
   report: what changed, pages + `--d` per locale, what was cut and why, open owner questions, the PDFs' paths, and
   other places that show the same fact (the availability line also sits in the hero sticker and the contact section).

A tailored copy for one job ad skips steps 7-8 except the report: it is temporary (`references/content.md` § 6).

What the CV may say about client or internship work follows that project's dossier (`content/projects/*.md`, Public
disclosure); naming the employer and the role is his work history.

## Rules that keep the sheet working

These broke once and cost time; `references/template.md` has the why and the fix for each.

- Text order is paint order: never `position` or `transform` an element that holds text.
- Fonts are static instances only (a variable font prints as Type 3); never use a glyph Anybody lacks (arrows `→ ↗`,
  primes, `■`, `✓`, U+202F).
- Letter-spacing ≤ 0.05 em on anything a parser reads (wider splits words: `E D U C AT I O N`).
- Sizes and gaps scale with `--d`; never hard-code a size that should breathe, and never go below the floor
  (body 10 pt at `--d: 0`).
- Every link is visible text (`github.com/MuchaSsak`), underlined, never colour alone; the email is a `mailto:` link.
- Pink is a fill or a marker, never text on white (2.97:1).
- Marks only where we know they're allowed: Tabler outline icons; GitHub and LinkedIn only as links to his profiles,
  in white or black, LinkedIn's own artwork; no other logo (not a tool's, a company's, a client's, nor the projects'
  own: the owner dropped them, 2026-10-08).
- Lists are reset by their own class, never by `.cs ul` (a scoped element rule outranks one class).

## History

Approved by the owner on 2026-10-08 ("the cv that is current is quite good as the template"), English first, then
localized; the same day the draft data merged into `cv.ts`, the sheet replaced the old print template and its PDFs,
and `/cv/` got its own screen layout [user: "it would be too boring if it was the same as pdf"]. Old versions:
`comps/cv/v6`-`v8`, the old page in `comps/history/cv-page-v1/`, the old code at tag `history/cv-page-v1`.

## Changing the template itself

A template change is a change to the layout, type, colour or fit logic; adding a data section in the existing shape is
not (print, stress and look are enough for that). Treat a template change like a design slice: research first (the
three `2026-10-08-cv-*` notes), change one thing, then evaluate:
`bun run cv:sheet --png` for all locales, `--stress more` (must fail cleanly with the overflow message), `--stress less`
(must still compose: the slip under the content, no big empty gap) and `--no-photo` (the band without the photo), a
greyscale look at page 1, `pdftotext -enc UTF-8 <pdf> -` reading like
a CV (name first, no split words; for dates beside their titles use PyMuPDF, see `template.md` § 8), and an independent review by a fresh subagent with the
renders and the extracted text (7-second skim, ATS field extraction, design score against `design-quality.md`). Keep the
old look in `comps/cv/v<N>/` and a row in `comps/HISTORY.md`, as for every other version of the site.
