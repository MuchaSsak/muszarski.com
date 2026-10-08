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
| P1 | ~~Site domain~~ **resolved** [owner] 2026-10-08: `https://muszarski.com` (was `matmuszarski.space`, `seo.md` § Domain); `apps/web/scripts/launch.mjs` | — | — | attach the domain to the new Vercel project only at launch; Search Console | 5 |
| P2 | Seniority line: "since 2022" is real; years of paid work and student status are not yet | hero, CV, LinkedIn copy | owner | fill + same words on LinkedIn/GitHub | 25 |
| P3 | City line "Pomorskie, Poland" | hero, CV, `Person.address` | owner | replace | 27 |
| P4 | Availability line (role, B2B/UoP, remote/hybrid, start date) | hero sticker ("Open to work · Poland, CET · Remote"), contact, CV | owner | replace | 3 |
| P5 | Contact facts (public email `hi@muszarski.com` [owner 2026-10-08, was `hi@matmuszarski.space`]; Discord, Messenger, Telegram real since 2026-10-06): LinkedIn = the profile the SEO research found (`mateusz-muszarski-b1168a28a`), owner to confirm | `src/data/site.ts`, footer, `sameAs` | owner | replace / confirm; test every link | 11 |
| P6 | Positioning copy drafts: the hero line "Code is the tool. I build products that solve real business problems, at a cost that makes sense." (2026-10-06: Claude's positive rewrite of the owner's draft, waiting for his OK; `brand.md` § Positioning), the proof line, section copy, the footer line "Let's talk about what you're building." | `home/Hero.astro`, `layout/SiteFooter.astro` (`PLACEHOLDER` comments), `brand.md` drafts → catalogs | owner OKs the hero line; rewrites the rest in his voice | owner approves the final copy | — |
| P7 | PstrykWeb temporary captures (show the OLD landing, stock people, 3rd-party thumbnails) | `assets/projects/pstrykweb/` | owner recordings | delete; never publish | 1, 21 |
| P8 | Linkoglot store screenshots + 332×720 preview as interim media | `assets/projects/linkoglot/` | owner recordings | replace with real loops (own app, OK as interim) | 1 |
| P9 | Space portfolio + Clockful temporary captures (the space capture shows an unverified lens-dirt texture: licence check or re-record) | `assets/projects/space-portfolio/`, `.../neoteric-clockful/` | owner recordings | replace | 1 |
| P10 | Rights statuses `check` (PstrykWeb, Clockful) | project dossiers | Cetuspro + Neoteric emails | set `ok` or remove the project | 21, 32 |
| P11 | Credentials: INF.02/.03/.04 exam dates and results (courses, Erasmus+, hackathon and short courses filled from the owner's certificates 2026-10-06); the years of the Georgia project (Erasmus+ or Visegrad) and the two months of ESC in Demre: the international card shows 2025 (`PLACEHOLDER` in `cv.ts`) [user 2026-10-07] | credentials data, CV | owner | replace | 10 |
| P12 | Spanish (es) copy: AI-translated, unreviewed | catalogs + es content files | a fluent reviewer | review, or keep the visible "Translated with AI" line by explicit owner choice | 19 |
| P13 | Legal pages: drafts, not lawyer-reviewed; postal address; mailbox provider; Umami plan confirmation (Q17) | `/privacy/`, `/terms/` | owner + lawyer | review; fill Unknowns | 15, 16, 17, 36 |
| P14 | ~~Drafting Table visual layer~~ **resolved 2026-10-05:** replaced by Poster (tokens, Anybody, header, hero, footer); the old look is archived (`comps/HISTORY.md`) | — | — | — | — |
| P15 | Photos are real (800 px portrait, five pin board photos in `src/data/gallery.ts`, the principal photo and Rzeszów added 2026-10-08). Left: where the coast photo (first hero print, off the board) was taken, and the month of the award photo | `/my-life/` hero + pin board | owner | fill `place` / `when` | 0 |
| P17 | ~~Chrome links to routes that later slices build~~ **resolved 2026-10-05:** every route exists (work, blog, posts, cv + PDFs, my-life, privacy, terms, RSS, anchors) | — | — | a link checker before launch stays a good idea | — |
| P18 | Drawn stand-ins marked "Video soon" in the PstrykWeb and Clockful chapters (the credential "image soon" slots became certificate tickets 2026-10-06) | `home/chapters/ChapterPstrykWeb.astro`, `ChapterClockful.astro` | owner recordings (Q46) | replace | 46 |
| P19 | ~~AI section counts typed by hand~~ **resolved 2026-10-05:** counted from the repo at build (`src/lib/repo-stats.ts`); MCP servers are named (user-level config). **2026-10-06:** no counts at all now [user: "dont give precise numbers"]; examples instead, `repo-stats.ts` deleted | — | — | — | — |
| P20 | Blog posts drafted by AI agents from fetched sources (10 topics + case study #0); the owner hasn't read them. A review pass (2026-10-06) found no invented facts, no PstrykWeb leaks, no broken links; claims to check: HTTP Archive 2026 figures (astro posts, l. 79-87), Claude Code cost averages (claude-code-po-polsku l. 47, 161), Karpathy gist date (llm-wiki l. 40), hook handler types (skills-hooks l. 54, 160), Neoteric/Clockful named while rights = `check`. Added 2026-10-07: "Psychology in UX and on the frontend" (en + pl, primary sources, a review pass found the course and Linkoglot facts match `cv.ts` and the dossier) | `src/content/blog/{en,pl}/` | owner reads, corrects voice and facts | owner approves each post (or drafts them) | 20 |
| P21 | My life: intro and hobby lines are drafts (`components/life/LifePrints.astro`); Music, Faith, Travel, Motorcycles, Parties and Photography are his words [user 2026-10-07] | `/my-life/` | owner | rewrite the other four in his voice | 7 |
| P22 | Legal tokens rendered as marked gaps: postal address, mailbox provider and its location (`[[POSTAL_ADDRESS]]`, `[[MAILBOX_PROVIDER]]`, `[[MAILBOX_LOCATION]]`) | `src/content/legal/*/*.md` | owner | fill the values in `astro.config.mjs` `legalTokens` known map | 36 |
| P23 | CV entries with unconfirmed dates (PstrykWeb year, "since 2022" freelance, credentials dates, verify URLs on `.example`) | `src/data/cv.ts` | owner | confirm, then `bun run cv:pdf` | 10, 25 |
| P24 | `/work/` cards show captures of the live sites (temporary, `assets.md` § Inventory) and drawn stand-ins (Clockful, the screensaver) | `public/media/work/`, `pages/[locale]/work/index.astro` | owner recordings or his OK on the captures | replace or approve | 1 |
| P16 | Project facts not yet supplied (years, metrics, decisions) | dossiers, case studies | owner | replace or drop the claim | 1 |

## Launch runbook (in order; owner steps marked **owner**)

1. **owner** Replace or accept every row above; `IS_FULL_PRODUCTION=true bun run build` (apps/web) lists what still blocks.
2. **owner** Lawyer review of `/privacy/` + `/terms/` (P13); the gap values go in `astro.config.mjs` `legalTokens` (P22).
3. **owner** Services: Resend (verify the sending domain's DNS, SPF + DKIM), Turnstile widget for the domain, Umami Cloud
   website. Names of the values: `apps/web/.env.example`.
4. **owner** Vercel (Pro): Root Directory `apps/web`; env vars in Production (+ Preview without `IS_FULL_PRODUCTION`);
   `IS_FULL_PRODUCTION=true` in Production only; WAF rate-limit rule on `/api/contact/` (e.g. 5 per 10 min per IP, the
   function's own limit).
5. Preview deploy (no domain): send a real message through the form, check the mail arrives with the reply address;
   Lighthouse mobile against the preview URL (`--base`); compare the LCP with `memory/run-notes.md`.
6. **owner** Make `muszarski.com` primary in Vercel → Domains (www → apex); the production build must pass the gate.
7. **owner** Search Console: Domain property (DNS TXT), submit `/sitemap-index.xml`, URL Inspection on home, the case
   study, one post and `/en/cv/`; Bing Webmaster: import from GSC.
8. **owner** Same day: the site URL on LinkedIn, GitHub and the CV sources (`sameAs` must match).
9. **owner** Launch-day checklist [owner 2026-10-08: "to do once i fully deploy to prod"]; tick each one off here:
   - [ ] Vercel: `IS_FULL_PRODUCTION=true` set in Production (and `IS_AVAILABLE_FOR_HIRE` as wanted), then redeploy.
   - [ ] Google Search Console for `muszarski.com` (step 7).
   - [ ] Website field → `https://muszarski.com/` on GitHub, LinkedIn, Instagram; the domain in the Discord profile.
   - [ ] yws.lu: run `/link-portfolio-author-to-website` in its repo (a client site: the client's OK first, and its
     rights row in `content/projects.md`).
   - [ ] pstrykweb.pl (Cetuspro's product): no credit without Cetuspro's written OK. Options to ask them for: an author
     box on the blog posts he wrote, linking `https://muszarski.com/` (the "pstrykweb.pl author page" of `seo.md`
     § Entity strategy); a team/credits page naming him. Never "built by" or "solo" (lessons).
