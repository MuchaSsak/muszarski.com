# Structure

> Owns the sitemap, the sections of each page in order, navigation, footer and the CTA inventory.
> Fields: `content-model.md`. Look: `design.md`. Feature IDs (F01…): `requirements.md`.
> Section order is the 2026-10-05 draft [user + research]. Heights and rhythm are refined by the section-patterns
> research and then by screenshot review at 390/1024/1920.

## Sitemap

```
/                                → 308 /en/                      (vercel.json; i18n.md)
/<locale>/                       home                            locale ∈ en (default) · pl · es
/<locale>/work/                  ALL projects index, filterable (F04) [user] 2026-10-05
/<locale>/work/<slug>/           case study per flagship (F05)
/<locale>/blog/                  blog index (F12); en + pl only (i18n.md § Locale coverage)
/<locale>/blog/<slug>/           post (slug per locale)
/<locale>/cv/                    web CV, same data as the PDF (F11)
/<locale>/my-life/               personal page (F13)
/<locale>/privacy/               privacy policy, noindex,follow (F14)
/<locale>/terms/                 only if required (compliance-and-data.md)
/404                             per-locale copy (F21)
/files/mateusz-muszarski-cv-<locale>.pdf
/en/rss.xml · /pl/rss.xml · /sitemap.xml (index) · /robots.txt · /llms.txt
```
- **Slugs:** `work`, `blog`, `cv`, `my-life`, `privacy` and `terms` stay English in every locale; only blog post
  slugs are per locale [assumption; seo research may change it].
- **Locale segments:** `en`/`pl`/`es`, rules in `i18n.md`.

## Home `/<locale>/` (order)

| # | Section | Must prove / do | CTA |
| --- | --- | --- | --- |
| 0 | Header (sticky) | name → home · Work (`/work/`) · How I work (`#how-i-work`) · Blog · CV (split) · **Contact** · locale · theme. My life sits in the footer + mobile menu [assumption 2026-10-05] | Contact (primary), CV |
| 1 | Hero | who, role, where, availability, proof strip; the signature drawing (F20) assembles after LCP | See work (primary) · Contact |
| 2 | Selected work | the 4 flagship chapters (`content/projects.md`), each in its own theme; then "All projects →" | Case study · Live · Code · All projects |
| 3 | How I work | product thinking: principles with receipts (F06) | links into case studies |
| 4 | AI workflow | the system and its verification gates (F07) | "How this site was built" (F23) |
| 5 | Stack + credentials | skill chips filter the work; credentials; learning; teamwork timeline (F08) | Verify links · full CV |
| 6 | Latest writing (optional) | 2–3 posts for internal links | Blog |
| 7 | Contact | form + direct links + quick facts (F09); the "open to projects" line | Send · Copy email · CV · LinkedIn |
| 8 | Footer | F10 | — |

- **Rhythm** (desktop, in viewport heights; mobile = content height) [research: landing-sections]:
  - hero ~0.85 svh, with sheet 01 peeking
  - 4 sheets ≈ 1.0 each, sticky-stacked
  - "All work" tab 0.15
  - How I work 0.6–0.8
  - AI process drawing ~1.0
  - credentials 0.6–0.7
  - contact 0.5–0.7
  - footer 0.4–0.6
  - **≈ 9 screens in total.** Never more than 4 consecutive ~1.0 sections. Compositions: `design/design-references.md`.
- **Merge:** if sections 3 + 4 read long in screenshots, they merge into one "How I work" with two halves
  [user agreed to evaluate].

## All projects `/<locale>/work/`

- Every project: the 4 flagships first, then the archive.
- Filters: type (`context` values in `content-model.md`: client / internship / own product / oss / side / course) and stack chips, with counts.
- Row: title, year, one line, tags, links (case study / live / code).
- Layout refined by the subpages research (list vs table vs grid; mobile).

## Case study `/<locale>/work/<slug>/`

- Hero in the project's theme: title, outcome, context tag, role/team, year, links.
- TL;DR box, then the spine in `content-model.md`.
- Credits table, NDA label.
- Prev / next project, then a contact band.

## `/<locale>/cv/`

- Header: name, title, location, availability, and a **Download PDF** button (`<a download>`, file size in the label).
- Sections from `content-model.md` § CV in the same order as the PDF, laid out on drafting sheets.
- Locale switch; print stylesheet.
- **No auto-download** (iOS needs a direct tap) [research: stack § 4.4]. Every CV CTA is a **split button**: "CV" opens `/cv/` and
  the attached "↓ PDF" downloads directly (`Content-Disposition: attachment`, proper file name) [user] 2026-10-05.

## Blog

- **Index:** featured post, list by date, tag filter, RSS link.
- **Post:**
  - title, description, dates, reading time
  - TOC (sticky on desktop)
  - prose with code blocks and drawings
  - author box (Person) → `/my-life/` + contact
  - related posts, share image

## `/<locale>/my-life/`

Photo · short intro · interests grid (content-model § Life item) · "hang out" links (Discord,
Messenger) · back to work / contact. Secondary nav item; not in the hero path.

## Legal

- `/privacy/` and `/terms/`: formal; TOC; numbered clauses; "last updated" + version; language note
  (prevailing version); `noindex,follow`. Linked from the footer on every page and from the form's privacy
  notice (`compliance-and-data.md`); never in the header.

## Navigation and footer

- **Header on mobile:** name, CV and Contact stay visible; the rest goes behind a labelled "Menu" button
  (never an icon alone). Below ~390 px the CV control is a single "CV" button and "↓ PDF" moves into the menu
  and `/cv/` [assumption 2026-10-05]; slice 1 verifies it fits at 320 px.
- **Contact panel:** the same content as the home contact section; opens from any page; Esc closes;
  focus is trapped and returned.
- **Footer columns** (this list owns the footer links; ~15 links):
  - Work (the 4 flagships + All projects)
  - Site (Blog, CV, My life, How this site was built, RSS)
  - Elsewhere (GitHub, LinkedIn, npm…; `rel="me"`)
  - Legal (Privacy, Terms)
  - plus the locale switch and the build-time revision row (`design-references.md` § Per home section, Footer row)

## CTA inventory (every CTA has an analytics event: `analytics.md`; the ones without their own event use `cta`)

| CTA | Where | Goes to |
| --- | --- | --- |
| Contact | header, hero, chapters' end, case-study end, footer | contact panel / section |
| CV (split: CV · ↓ PDF) | header, hero proof, contact, /cv | `/cv/` · direct PDF download |
| See work | hero | `#work` |
| Case study / Live / Code | chapters, `/work/` index | `/work/<slug>/` / external |
| All projects | after the chapters, footer | `/work/` |
| Copy email | contact panel and section | clipboard + toast |
| Open to projects | contact section (one line) | contact form, with the topic prefilled |
