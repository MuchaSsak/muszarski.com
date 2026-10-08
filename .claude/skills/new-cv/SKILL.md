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
| Data (the one source) | `apps/web/src/data/cv.ts` | per-locale `Text`; also feeds home credentials. Never edit the PDF or the page alone |
| The sheet (PDF layout) | `apps/web/src/components/cv/CvSheet.astro` | how it works and its rules: `references/template.md` |
| Print route | `apps/web/src/pages/[locale]/cv/print-v2/index.astro` | page CSS (`@page`), metadata, digest; noindex, out of the sitemap |
| Fonts | `bun run cv:fonts` → `public/fonts/cv/`, `src/styles/cv-fonts.css`, `src/lib/cv-fonts.gen.ts` | static Anybody instances + the fitted name + the sticker outlines |
| Print + checks | `bun run cv:sheet` (`apps/web/scripts/cv-sheet.mjs`) | builds, serves, fits ≤ 2 pages, writes PDFs + `cv-sheet-report.json`, checks |
| Web page | `apps/web/src/pages/[locale]/cv/index.astro` + `components/cv/CvBody.astro` | must say exactly what the PDF says (1:1) |
| Evidence | `.claude/project-info/research/2026-10-08-cv-*.md` | recruiters + ATS, locale conventions, design inspiration |

**Status [user 2026-10-08]: draft.** The owner approves the sheet and this skill first. Until then `cv:sheet` writes to
`comps/cv/` and the live PDFs (`public/files/`, old template, `bun run cv:pdf`) and the `/cv/` page stay as they are.
After approval, do § Rollout once and delete this paragraph.

## Workflow

1. **Intake.** Find out what changes and why: a new job or project, a cut, a wording fix, a job ad to tailor to, a new
   market (en / pl / es). Collect facts from the owner; never invent dates, numbers, titles or levels. Ask only for what
   is missing and say why it matters ("recruiters filter on dates", "CEFR level, since 'fluent' isn't one"). A fact you
   still don't have becomes a `PLACEHOLDER` in `cv.ts` + a row in `placeholders.md`, disclosed in chat.
2. **Decide the content** with `references/content.md`: what goes in, what stays out (personal data included), how to
   write a bullet, per-locale conventions, the cutting order. Page 1 must sell him alone.
3. **Edit `cv.ts`**: English first, then Polish and Spanish (Spanish stays marked unreviewed, `i18n.md`). Keep the
   structure; add fields rather than overloading strings. A new section type also needs the sheet
   (`references/template.md` § Adding a section) and the page.
4. **Fonts:** only when the name, a type role or the sticker changed: `bun run cv:fonts` (in `apps/web`).
5. **Print and check:** in `apps/web`, `bun run cv:sheet --png` (about 1 min per locale after a ~35 s build; `--no-build`
   reuses the last build, `--locales en` narrows it). Read every line it prints:
   - `FAIL …` must be fixed (meaning of each: `references/template.md` § Checks). Exit code 1 until they're gone.
   - `N pages even at the densest setting` = too much content: cut (`references/content.md` § Cutting), never shrink the
     type below the template's floor.
   - `warn page 2 holds only N% content` = add substance or aim for one page.
   - `--d` near 0 = dense but legal; near 1 = roomy. Report it.
6. **Look at every page** (`*-p1.png`, `*-p2.png`, all three locales; pl runs longest). Check: nothing clipped or
   overlapping (the sticker, long titles in the rail, the contact bar), no orphan heading at a page foot, no widow line
   alone at a page top, each page reads on its own, the closing band sits at the foot of the last page.
7. **Sync the web page** 1:1 with the PDF (after rollout this is the default, not optional): same sections, order and
   wording. Then `bun run check` (typecheck + lint + unit; `cv.test.ts` compares the PDF digests) and the e2e CV specs.
8. **Close:** wiki (`content-model.md` § CV for any rule change, `log.md` line), commit per the working agreement, and a
   short report: what changed, pages + `--d` per locale, what was cut and why, open owner questions, the PDFs' paths.

## Rules that keep the sheet working

These broke once and cost time; `references/template.md` has the why and the fix for each.

- Text order is paint order: never `position` or `transform` an element that holds text.
- Fonts are static instances only (a variable font prints as Type 3); never use a glyph Anybody lacks (arrows `→ ↗`,
  primes, `■`, `✓`, U+202F).
- Letter-spacing ≤ 0.05 em on anything a parser reads (wider splits words: `E D U C AT I O N`).
- Sizes and gaps scale with `--d`; never hard-code a size that should breathe, and never go below the floor
  (body 9.4 pt at `--d: 0`).
- Every link is visible text (`github.com/MuchaSsak`), underlined, never colour alone; the email is a `mailto:` link.
- Pink is a fill or a marker, never text on white (2.97:1).

## Rollout (once, after the owner approves the sheet)

1. Point the print route at the sheet: move `cv/print-v2/index.astro` to `cv/print/index.astro` (replacing the old one),
   drop `variant="print"` from `CvBody.astro`, update the sitemap filter in `astro.config.mjs`.
2. Make `cv:sheet` the PDF command: default `--out public/files`, write `cv-digest.json` from the page's `cv-digest`
   meta (as `cv-pdf.mjs` does), set `ROUTE = "cv/print"`; point `cv:pdf` at it and delete `cv-pdf.mjs`.
3. Rebuild `/cv/` to mirror the sheet 1:1 (sections, order, wording, the closing contact band, the Polish clause).
4. `bun run cv:sheet` → commit the PDFs; `bun run check`, e2e; update `content-model.md` § CV,
   `technologies.md` (CV PDF row), `seo.md` (PDF metadata now set), `design.md` (§ CV sheet), `log.md`.
5. Delete the Status paragraph above and this section's "once" note.

## Changing the template itself

Treat it like a design slice: research first (the three `2026-10-08-cv-*` notes), change one thing, then evaluate:
`bun run cv:sheet --png` for all locales, `--stress more` (must fail cleanly with the overflow message) and `--stress less`
(must still compose: contact band at the foot), a greyscale look at page 1, `pdftotext -enc UTF-8 <pdf> -` reading like
a CV (name first, dates next to their titles, no split words), and an independent review by a fresh subagent with the
renders and the extracted text (7-second skim, ATS field extraction, design score against `design-quality.md`). Keep the
old look in `comps/cv/` and a row in `comps/HISTORY.md`, as for every other version of the site.
