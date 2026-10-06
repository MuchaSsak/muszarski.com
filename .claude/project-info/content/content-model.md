# Content model

> The shapes of everything the site renders, so content is data and pages are templates. Owns:
> project, case-study, CV, credential, blog and life-item fields, plus the CV sync rule. Where each
> renders: `structure.md`. Look per project: `design.md` § Per-project themes. Values for real projects come
> from the owner. Until then: placeholders, tracked in `placeholders.md` (Q1).

## Project (one file per project, in a content collection; per-locale text)

| Field | Type / values | Notes |
| --- | --- | --- |
| `slug` | kebab-case, the same in every locale [assumption] | URL `/<locale>/work/<slug>/` |
| `title`, `outcome` | string; `outcome` = one line of result, not features | the card headline is the outcome |
| `context` | `client` · `internship` · `product` (own startup) · `oss` · `side` · `course` | shown as a tag, e.g. "Client work" / "Own product" |
| `role`, `team` | string; team default "solo" | credits table on the case study |
| `year`, `status` | number; `live` · `archived` · `in-progress` | |
| `stack` | ≤ 5 chips (ids from the skills list) | drives the skill filter (F08) |
| `proof` | 1 chip: a real metric/fact + `source` | never invented; `source` required |
| `links` | `live?`, `code?`, `npm?`, `store?` (App Store / Play) | missing = omitted, never faked |
| `media.kind` | `phone` · `desktop` · `both` · `live` | picks the layout (`design.md`) |
| `media.loop` | `{ av1?, h264, poster, width, height }` | muted loop; poster is the LCP-safe frame |
| `media.stills` | images with alt text | for reduced motion, OG, print |
| `theme` | `{ paper, ink, accent, motif, typeAccent?, motion? }` | tokens only, no free CSS (`design.md`) |
| `nda` | `L0`–`L5` (ladder in `research/2026-10-05-synthesis.md` §4) | label shown on the card |
| `rights` | `{ holder, status: ok · check · no, note }` | **never shown**; a project with `status ≠ ok` and `context` = client or internship can't go live (launch gate) |
| `featured` | `1`–`4` today (max 5; flagship order) or `false` (archive) | |

**Case-study body (MDX per locale).**
- Headings are written as questions [research: showcase].
- Sections, in order:
  1. TL;DR box
  2. What and for whom
  3. Before-state
  4. What I owned
  5. Constraints
  6. 2–3 decisions with rejected options
  7. Architecture SVG (code-drawn, with a text alternative)
  8. The hard part (≤ 15 lines of code or a mini-demo)
  9. Results + how they were measured
  10. What I'd do differently

## CV (ONE source → `/cv/` page AND the PDF)

- **The rule:** `cv` data is the single source. The `/<locale>/cv/` page and `mateusz-muszarski-cv-<locale>.pdf`
  are both generated from it. **Never edit one without regenerating the other.** The build renders both
  from the data in the same run, and a pdfjs content test fails the build when the PDF text ≠ the CV data
  (mechanism: `technologies.md` § Stack, CV PDF row) [user] 2026-10-05.
- **Sections:** header (name, title, location, email, links, availability) · summary ·
  experience (freelance / own products / client projects, each with outcomes) · selected projects ·
  skills (grouped) · education + qualifications (INF.02/.03/.04) · certifications · volunteering +
  international (Erasmus+, ESC) · hackathons · languages · interests (short).
- **PDF:** single column, real selectable text, embedded fonts, ATS-safe headings, 1–2 pages.
  The web page may be more visual, but its content is the same.
- **Locales:** en first; pl and es per `open-questions.md` (Q18).

## Credential

`{ kind: qualification|course|certificate|volunteering|program|hackathon, title, issuer, date,
verifyUrl?, skills[], summary, image? }`.
- Instructors appear as text: "Course — Instructor". No photos unless permission is in writing
  (`compliance-and-data.md`).
- INF.02/.03/.04 get an English explanation line (wording from the legal/naming research).
- Data: `apps/web/src/data/cv.ts` `credentials`. The Jonas Schmedtmann (Udemy) entry is titled "Full-stack development
  courses" (pl "Kursy programowania full-stack", es "Cursos de desarrollo full-stack"), not "JavaScript and React
  courses" [user 2026-10-06]; the summary still names JavaScript and React. PDFs regenerated with the rename.
- `items[]` on a credential = its certificates `{ title (as printed), when, href?, code? }` [owner's certificates
  2026-10-06]. Home shows them as tickets with a "Verify" link (44 px) and the code; the CV page lists them with
  links; the PDF prints one run-on line per card (title, date, code) and drops that card's summary to stay at two
  pages. Udemy links use `udemy.com/certificate/<UC-id>/` (Udemy answers bots 403, so not fetch-checked); Youthpass
  links go to the public check page plus the code. The Youthpass PDFs print personal data: never publish them.

## Skill

`{ id, label, group: frontend|backend|mobile|creative|ai-automation|devops|product, projects→ computed }`.
Chips show counts; a chip with 0 projects is hidden.

## Blog post (MDX per locale)

`{ title, description (≤ 155 chars), slug (per locale), translationKey, published, updated?, tags[],
cover (code-drawn or real), coverAlt, author: "mateusz", draft, canonical? }`.
- `translationKey` links translations for hreflang. A post that exists in one locale has no
  alternates.
- The author is the single Person entity (`seo.md`).
- Posts may import the case-study pieces (`components/blog/case/`): `Timeline` (versions in order: thumbnail, date,
  verdict stamp, the owner's words verbatim, one line), `Versions` (one part of the site through its rounds as tabs:
  screenshot, what the owner said, why it changed) and `Shots` (framed screenshots with tags such as "Claude's pick").
  All text is passed from the per-locale MDX; their CSS lives in `styles/case.css` (see lessons: MDX component styles
  and the CSP). Images live in `src/assets/case/` (1200 px webp, made from `comps/` and fresh shots of the site).
- 2026-10-06 round [user: "make sure all of the blogs are quality and nice to read, write a bunch more"]: every post
  has a TL;DR, question headings and short paragraphs; seven new posts in en + pl (portfolio Lighthouse data, the
  three.js portfolio on mobile, multilingual Astro with Lingui, the contact form, CV + PDF from one source, hover on
  phones, shipping an app alone). Owner questions the Linkoglot post raised are Q-L* in `open-questions.md`.

## Life item (`/my-life/`)

`{ id, title, kind: hobby|faith|travel|media|music|social, blurb, image?, link? }`. Short entries; tone per `brand.md`.

## Site facts (single source for header, contact, CV, JSON-LD, llms.txt)

`{ name, jobTitle, location (city/region/country), email, availability {status, from, contract[], mode[]},
languages[], sameAs[] (GitHub, LinkedIn, npm…), social {discord?, messenger?} }`.
Unknown values → `open-questions.md`. Every surface reads these facts; none hardcodes them.
