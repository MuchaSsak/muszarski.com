# CV content: what goes in, how it's written, what's cut

Evidence: `.claude/project-info/research/2026-10-08-cv-recruiters-ats.md` (R), `2026-10-08-cv-locale-conventions.md`
(L), `2026-10-08-cv-design-inspiration.md` (D), and the older `2026-10-05-software-house-hiring.md` /
`2026-10-05-hiring-perspective.md`. Product rules still apply: `brand.md` (voice), `audience.md` (who reads it), the
project dossiers in `content/projects/` (what may be said about client work).

## Contents

1. Who reads it, and how
2. Personal data: in or out
3. Sections and order
4. Writing rules
5. Locale conventions
6. Tailoring to a job ad
7. Cutting (when it won't fit two pages)

## 1. Who reads it, and how

- A recruiter skims in seconds. Most of the time goes to the name, the current and previous title, company and dates, and
  education; then they scan for keywords (R 1). So these must be findable in one look: the rail of dates, bold titles,
  and the stack in plain words.
- Columns don't break parsers; the order of the text does (R 8). The sheet keeps DOM order = reading order and checks
  it on every print.
- Two pages are fine when page 2 has substance; page 1 must work alone (R 13). Page 1: band (who, role, where,
  availability, contact), profile, skills, experience, and education when it fits. Page 2: the rest, ending with the
  contact slip.
- Polish IT recruiters' top three CV mistakes: no description of what you did in projects (64.8%), unneeded personal
  data (60.6%), an illegible layout or font (60.4%) (R 14, No Fluff Jobs 2023, n = 588).

## 2. Personal data: in or out

| Item | Decision | Why |
| --- | --- | --- |
| Photo | **In** (the owner's choice, 2026-10-08: `src/assets/photos/mateusz-muszarski-cv.png`, 250 px; a larger original is welcome). Leave it out for UK, Irish or US applications | common in PL / ES / DE; UK and US guidance says omit (L) |
| Email | In: `hi@muszarski.com` (own domain), as a `mailto:` link | legitimacy (hiring-perspective § identity) |
| Phone | In **once the owner gives it**, as `+48 …` | expected by PL, ES, UK and DE guidance (L); not in the data yet |
| Location | Region or city + country (`CV.location`, P3) | enough for hybrid; never a street |
| Links | Site, GitHub, LinkedIn as readable text; store or live links per project | paper readers type them; parsers read text, not annotations (R 9) |
| Availability | Role type, contract, mode (`CV.availability`, P4) | recruiters filter on it first |
| Work rights | "EU citizen" only after the owner confirms it | helps the work-authorisation knockout question (R 6, R 19) |
| Date of birth, street address, PESEL / DNI, marital status, gender | **Out**, always | not needed (KP art. 22¹ lists them as optional at most); a top PL recruiter complaint (R 14) |
| Salary | Out | belongs in the conversation, not the CV |
| Recruitment clause | Polish CV only: `CV.clause.pl` (RocketJobs' one-liner: current + future recruitments, no company name). None in en / es | PL recruiters still expect it although the law doesn't require it; Spain's AEPD says no consent is needed (L) |
| Interests | One short line | a human touch; costs one line |

## 3. Sections and order

Profile → Experience → Selected projects → Skills and qualifications (soft skills, technologies, then the
qualifications and training) → Education → Languages + Interests → Contact slip → (pl) clause [user 2026-10-08]. Page
1 sells the work: who, role, availability, contact, the profile (which names the stack), the jobs and the projects
with their links. Skills come after the proof, shown as skills rather than a list of names: each soft skill with one
line that shows it, the tools in a few small named groups. The research put the stack near the top (R 1, R 15); the
profile carries it on page 1. Education sits last before the languages (the owner's call; it is one short entry).
Certificates carry little weight with tech hiring (R 17, hiring-perspective § credentials), so they stay compact: a
head line, then the certificate lines (courses) or one summary line (hackathons, youth projects, what a course
covers). A credential may add one **gain** line, what it gave him (time pressure and teamwork; fluency with people,
in English), set apart in cobalt bold behind a rising-line icon so it isn't buried in the description [user
2026-10-08]. Keep gains for credentials whose value is a soft skill; one sentence, his words. A new section goes after
Selected projects unless there's a reason.

## 4. Writing rules

- **Truth first.** Every fact comes from the owner or a source he gave (certificates, store pages, repos, Lighthouse
  reports). An owner-stated number can be off: when it disagrees with a public source, show both and ask (lessons).
  PstrykWeb: public information only, never "solo" or "team", never a konfigurator link (its dossier). Linkoglot: no
  user or revenue numbers ("pre-traction"). Never a self-given "Senior".
- **Profile:** ≤ 50 words (R 15), the job-ad words for the role and stack, one proof. No adjectives that need a proof
  you don't give ("passionate", "results-driven").
- **Bullets:** 1-3 per entry; start with what he built or shipped, end with the result, the scale or the proof (a
  number with a source, a store, a test count) (R 14). Vary their length and shape: identical bullets read as AI (R 16).
  The owner trims engineering counts he finds noisy (the Clockful test and security counts went, 2026-10-08): ask
  before adding counts back. Freelance and own work reads general, with one or two named examples (a landing for
  Youth Work Synergy, the youth-space app his school's principal gave him an award for), not a list of repos.
- **AI tells to avoid** (R 16, resume data 2023-2026): em dashes in prose, and the verbs spearheaded, leveraged,
  orchestrated, honed, streamlined, plus "passionate about", "results-driven", "dynamic". Plain verbs: built, shipped,
  wrote, designed, cut, moved.
- **Skills:** soft skills first (the owner's: teamwork and clients, problem solving, business thinking, conversions
  and UX, user psychology, analytical thinking), each with one short line of proof drawn from the CV's own facts, kept
  to one line at the meta size. Tools in plain text, spelled like job ads (TypeScript, Next.js, Tailwind CSS, TanStack
  Query) (R 7), in a few named groups; never bars, dots or percentages (R 16), never the tools' logos (their brands
  don't allow it, `template.md` § 1).
- **Dates:** one format per locale (§ 5), the same in every entry; "now" / "obecnie" / "actualidad" for the current role.
- **Languages:** CEFR code + word ("English — C1"). "Fluent" is not a CEFR level; the levels are the owner's to give
  (L). Until then the words stay. Spanish is not listed [user 2026-10-08]. Each language shows its drawn flag (`flag`).
- **Dates:** years, as everywhere else on the sheet ("2025", "2026 · 6 weeks"); a month only for the current role's
  start [user 2026-10-08: no "January 2025" where the rest give no month].
- **Links:** short readable text (`github.com/MuchaSsak`), the full URL in the link. A project with a store or live link
  shows it.

## 5. Locale conventions (L, cross-locale table)

| | en | pl | es |
| --- | --- | --- | --- |
| Dates (research; the data still mixes styles, the owner picks one: Q49) | Jun 2026 – now | czerwiec 2026 – obecnie (or 06.2026) | junio de 2026 – actualidad |
| School | technical secondary school (technikum) | technikum | escuela técnica secundaria (technikum) |
| Qualification | programmer technician (technik programista; INF.03 + INF.04) | technik programista | técnico programador; never "equivalente a Técnico Superior" without homologación |
| Exams | Polish state vocational exams INF.02 / .03 / .04 (INF.02 belongs to the IT technician title, the KKZ course) | egzaminy zawodowe INF.02 / .03 / .04 | exámenes profesionales estatales de Polonia |
| Clause | none | `CV.clause.pl` | none |
| Spanish copy | — | — | machine-assisted, unreviewed (P12): flag it in the report |

Section headings come from the site's Lingui catalogs (the same words as the `/cv/` page). Research-preferred variants,
should the owner want them: pl "Doświadczenie zawodowe", "Języki obce", "Kursy i certyfikaty"; es "Experiencia
laboral", "Formación académica", "Formación complementaria".

## 6. Tailoring to a job ad

1. Read the ad; list what it asks for (title, stack, years, language, contract, location).
2. Map each ask to a true fact in `cv.ts`. Never add a skill, tool or level he doesn't have.
3. Put the matches first: profile wording, skill group order, bullet order. Mirror the ad's spelling of the tools.
4. Facts may come from `cv.ts` or the project dossiers (`content/projects/*.md`, within their Public disclosure
   section). Anything else (a tool the ad names, a WCAG level, years of experience) needs the owner's word.
5. Location: a job in another city or country never implies relocation; ask. UK, Irish and US ads: print without the
   photo (`--no-photo`).
6. A tailored copy is temporary and touches only the locale(s) it is for. Copy the data file (`cv-draft.ts` until
   the rollout, then `cv.ts`) to the scratchpad first (the
   working tree may hold uncommitted work: never restore with `git checkout`), edit, run
   `bun run cv:sheet --locales <l> --png --out .cache/cv-tailored/<company or role slug>` (gitignored), hand over the
   PDFs, then copy the backup back and diff to confirm. Skip the page sync, check, wiki and commit; the report lists
   what was reordered and what couldn't be claimed.

## 7. Cutting (when it won't fit two pages)

`cv:sheet` says `N pages even at the densest setting`. Cut in this order, re-print after each step, and tell the owner
what went:

1. Duplicates: a bullet that repeats the org line or another bullet.
2. Credential summaries and the weakest certificate items (short courses before long ones).
3. Third bullets on older or minor entries (two is plenty).
4. Long tails: shorten the interests line, merge two minor entries into one line.
5. A whole minor entry (a short non-tech role, the oldest course).

Never cut: the contact details, the current role, shipped products with their links, the stack, the education line.
