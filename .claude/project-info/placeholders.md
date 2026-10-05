# Not-real register (placeholders, dummies, guesses)

> The owner's rule (2026-10-05): placeholders, guessed links and dummy content are **allowed while building**.
> Each one is (1) disclosed briefly in chat when introduced, (2) marked in code or data, and (3) logged here. When
> the owner says **"finish" / "wrap up" / "go to prod"**, this register is worked through until it is empty, or
> each remaining row is explicitly accepted by the owner. The launch gate fails the production build while any
> marker is left in the code.
> Questions that a row waits on live in `open-questions.md` (the Q column links them).

## How to mark one

- **Code / content:**
  - a `PLACEHOLDER` comment, or `placeholder: true` in data
  - placeholder files under a `placeholder/` folder
  - placeholder URLs use the reserved `.example` TLD where possible
- **Wiki:** the fact is written `Unknown` or tagged `[placeholder]`, and a row goes here.
- **Find them all:** `rg -n "PLACEHOLDER|placeholder: true|\.example\b|\[placeholder\]"` (+ the launch gate in Phase 1).

## Register

| # | What is not real | Where it lives | Real value comes from | At launch | Q |
| --- | --- | --- | --- | --- | --- |
| P1 | ~~Site domain~~ **resolved** [user] 2026-10-05: `https://matmuszarski.space` ("for now", `seo.md` § Domain); `apps/web/scripts/launch.mjs` | — | — | attach the domain to the new Vercel project only at launch; Search Console | 5 |
| P2 | Seniority line: "since 2022" is real; years of paid work and student status are not yet | hero, CV, LinkedIn copy | owner | fill + same words on LinkedIn/GitHub | 25 |
| P3 | City line "Pomorskie, Poland" | hero, CV, `Person.address` | owner | replace | 27 |
| P4 | Availability line (role, B2B/UoP, remote/hybrid, start date) | hero, contact, CV | owner | replace | 3 |
| P5 | Contact facts: public email, Discord, Messenger URLs; LinkedIn = the profile the SEO research found (`mateusz-muszarski-b1168a28a`), owner to confirm | `src/data/site.ts`, footer, `sameAs` | owner | replace / confirm; test every link | 11 |
| P6 | Positioning copy drafts (H1 subline, proof line, section copy, the footer line "Let's talk about what you're building.") | `brand.md` drafts → catalogs | owner rewrite in his voice | owner approves the final copy | — |
| P7 | PstrykWeb temporary captures (show the OLD landing, stock people, 3rd-party thumbnails) | `assets/projects/pstrykweb/` | owner recordings | delete; never publish | 1, 21 |
| P8 | Linkoglot store screenshots + 332×720 preview as interim media | `assets/projects/linkoglot/` | owner recordings | replace with real loops (own app, OK as interim) | 1 |
| P9 | Space portfolio + Clockful temporary captures (the space capture shows an unverified lens-dirt texture: licence check or re-record) | `assets/projects/space-portfolio/`, `.../neoteric-clockful/` | owner recordings | replace | 1 |
| P10 | Rights statuses `check` (PstrykWeb, Clockful) | project dossiers | Cetuspro + Neoteric emails | set `ok` or remove the project | 21, 32 |
| P11 | Credentials: dates, verify URLs, Erasmus+/ESC/hackathon details | credentials data, CV | owner | replace | 10 |
| P12 | Spanish (es) copy: AI-translated, unreviewed | catalogs + es content files | a fluent reviewer | review, or keep the visible "Translated with AI" line by explicit owner choice | 19 |
| P13 | Legal pages: drafts, not lawyer-reviewed; postal address; mailbox provider; Umami plan confirmation (Q17) | `/privacy/`, `/terms/` | owner + lawyer | review; fill Unknowns | 15, 16, 17, 36 |
| P14 | **Reopened 2026-10-05:** the whole visual layer (tokens, fonts, title block, footer look) is the owner-REJECTED Drafting Table direction | `apps/web/src/styles/`, `public/fonts/`, `src/components/layout/` | the rebrand (`working-agreement.md` § 9 Rebrand gate) | replace everything visual | — |
| P15 | Owner photo (Person image, my-life) | schema, `/my-life/` | owner | replace | 7 |
| P17 | Chrome links to routes that later slices build (`/work/`, case studies, `/blog/`, `/cv/` + the PDFs, `/my-life/`, `/privacy/`, `/terms/`, RSS, `#how-i-work`, `#contact`): 404 in review builds until then | `SiteHeader.astro`, `SiteFooter.astro`, `src/lib/nav.ts` | slices 3-11+ | a link checker (SEO slice) must be green before launch | — |
| P18 | Round 3 comp stand-ins: PstrykWeb and Clockful reels are drawn loops marked "Video soon · placeholder"; credential cards hold photo/certificate slots | `comps/poster-r3.html` → the real chapters + credentials | owner recordings + images (Q46) | replace | 46 |
| P19 | AI section counts (33 wiki pages, 3 hooks, 7 skills, 27 lessons, 3 MCP servers) are this repo on 2026-10-05 | `comps/poster-r3.html` § AI | count at build time from the repo | generate, never hand-type | — |
| P16 | Project facts not yet supplied (years, metrics, decisions, "what I'd do differently") | dossiers, case studies | owner | replace or drop the claim | 1 |
