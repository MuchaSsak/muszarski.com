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
- No reflective template sections ("What I'd do differently", "Takeaways", "What I learned"): they read as
  an AI answering a prompt [user] 2026-10-07. Honest gaps go in a plain "Limits" list.

## CV (ONE source → `/cv/` page AND the PDF)

- **The rule:** `cv` data is the single source. The `/<locale>/cv/` page and `mateusz-muszarski-cv-<locale>.pdf`
  are both generated from it. **Never edit one without regenerating the other.** The PDFs are made by
  `bun run cv:sheet` (= `cv:pdf`: builds, prints `/<locale>/cv/print/` with Playwright, fits ≤ 2 A4 pages, checks) and
  committed with their page previews (`*-p1.webp`, `*-p2.webp`, shown on `/cv/`); each records a digest of `cv.ts`,
  and `cv.test.ts` fails while a PDF was made from older data (mechanism: `technologies.md` § Stack, CV PDF row)
  [user] 2026-10-05. The digest covers `cv.ts` only: after a change to `CvSheet.astro`, the print route, `SITE` or the
  CV headings, run `bun run cv:sheet` by hand. A print that fails a check never replaces a live PDF.
- **Sheet = PDF [approved 2026-10-08]** ("the cv that is current is quite good as the template"): the designed two-page
  sheet (`components/cv/CvSheet.astro`, `design.md` § CV sheet), English first, then localized; Europass dropped. How
  to change it: the `new-cv` skill (`.claude/skills/new-cv/`). Decided for him: photo, email, region, links and
  availability in; date of birth, address, PESEL, marital status and salary out; phone, "EU citizen" and CEFR levels
  once he gives them (Q49); the Polish CV ends with the one-line recruitment clause (`CV.clause.pl`, none in en / es).
- **Sections and order** [user 2026-10-08]: header (photo, name, title "Full-stack product engineer", availability) ·
  contact bar (email, region, site, GitHub, LinkedIn) · profile · experience · selected projects (PstrykWeb with
  Cetuspro, Linkoglot, Portfolio) · skills and qualifications (soft skills with a line of proof, technologies in named
  groups, then the qualifications: `CV.qualifications` lists which credentials and in what order, each with its `cv`
  override: a CV title or date, one summary line instead of the certificates, a `gain` line) · education · languages
  (Polish, English; flags) + interests (tags with icons) · contact slip (QR code) · (pl) clause. Writing and cutting rules:
  `.claude/skills/new-cv/references/content.md`.
- **The web page shows the same content in its own layout** [user 2026-10-08: "it would be too boring if it was the
  same as pdf ... display all information that is on the cv itself"]: same sections, order, words and links; the
  screen adds layout, colour, the projects' real media and copy buttons (`design.md` § CV page).
- **Locales:** pl and es run ~15% longer than en; they are written to the English line count, and the fit may tighten
  the gaps (never the type) below `--d 0` (2026-10-08, with the interest tags: en -0.04, pl -0.43, es -0.27). es is unreviewed (P12). The digest
  picks a partial text (the pl-only clause) per locale, so it changes the pl digest alone.

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
- 2026-10-07 [user]: `kind` also takes `knowledge` (the marketing, psychology and UX card, labelled "Knowledge").
  A `CertItem` may carry `label?` (a short localized chip name, e.g. "Consumer psychology") and `site?` (an event's
  site, for hackathons). A credential may carry `courseUrl?` (the course's own page, linked beside "Certificate", e.g.
  threejs-journey.com) and `places?` (localized names drawn on the international card's route). Home shows the items
  as small secondary chips under a drawn scene, not as ticket cards; the international card shows no chips.

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
  screenshot, what the owner said, why it changed) and `Shots` (framed screenshots with tags such as "Claude's pick";
  `phones` puts phone screens in one row), `Flow` (a process as tickets), `Matrix` (two scores as a table), `Clips`
  (muted loops of the site in motion, `public/media/case/<src>.{av1.mp4,mp4}` + `-poster.webp`, played by
  `scripts/reel.ts`: sources only after the first interaction and near, play while half visible) and `Breaker` (a dark
  band that links to a live showcase, e.g. the home AI story; its steps light up in turn, off under reduced motion).
  All text is passed from the per-locale MDX; their CSS lives in `styles/case.css` (see `tech/usage/astro.md` § Gotchas: MDX component styles
  and the CSP). Images live in `src/assets/case/` (1200 px webp, made from `comps/` and fresh shots of the site).
  Shots of the site come from a launch-mode build (`IS_FULL_PRODUCTION=true astro build --outDir <scratch>`) so
  rights-`check` projects never appear in them.
- **Case study #0** (`/en/blog/case-study/` + `/pl/blog/case-study/`, renamed 2026-10-08 from `how-this-site-was-built` / `jak-powstala-ta-strona`, which 308 to it; later case studies about projects get their own slugs, this one stays the main one) [user 2026-10-08: "fun to read and go
  through", "highly informational, with accurate research and quick explanations of my thought processes and of my
  framework"; "talks too many times about lighthouse and numbers such as KB"]: the working rules first, the versions,
  why rebuild, what a portfolio is for (the work first), the wiki, the research with quoted reference screenshots,
  why not another 3D world (a fact table + the site's four shaders as clips), the AI team with a breaker to the home
  story, the rejected design, the parts through their rounds, the other pages, accessibility, SEO, checks, the stack,
  the result. Speed numbers appear only in the TL;DR, the old site's measured issues (under its flight clip, `public/media/space/flight.*`, with the CC BY texture credit) and the result picture [user 2026-10-08: "include a video about old 3d portfolio, and then list some of the most important issues with it"].
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
