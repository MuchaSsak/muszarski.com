# Not-real register (placeholders, dummies, guesses)

> The owner's rule (2026-10-05): placeholders, guessed links and dummy content are **allowed while building**.
> Each one is (1) disclosed briefly in chat when introduced, (2) marked in code or data, and (3) logged here. When
> the owner says **"finish" / "wrap up" / "go to prod"**, this register is worked through until it is empty, or
> each remaining row is explicitly accepted by the owner. The launch gate fails the production build while any
> marker is left in the code, or while a built page shows a "soon" stand-in ("Recording soon", "Photo soon", pl/es too) [owner 2026-10-11].
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
| P2 | ~~Seniority line~~ **resolved** [owner 2026-10-11]: building and paid client work on and off since 2022 | — | — | — | 25 |
| P3 | ~~City line~~ **resolved** [owner 2026-10-11]: "Pomorskie, Poland" | — | — | — | 27 |
| P4 | ~~Availability~~ **resolved** [owner 2026-10-11]: B2B or UoP · remote or hybrid · available now (sticker: "Remote or hybrid"). The blog figure `cv-phone-{en,pl}.webp` still shows the old sticker wording (re-shoot when convenient) | — | — | — | 3 |
| P5 | Contact facts (public email `hi@muszarski.com` [owner 2026-10-08, was `hi@matmuszarski.space`]; Discord, Messenger, Telegram real since 2026-10-06): LinkedIn `mateusz-muszarski-b1168a28a` confirmed [owner 2026-10-09]; the row stays for the email | `src/data/site.ts`, footer, `sameAs` | owner | replace / confirm; test every link | 11 |
| P6 | ~~Positioning copy~~ **resolved** [owner 2026-10-11]: hero = "Code is only the tool. I build products that solve real problems and bring results." (his words); the footer line and section copy accepted as they are | — | — | — | — |
| P7 | ~~PstrykWeb temporary captures~~ **resolved 2026-10-11:** the owner's recording replaced them (the chapter and `/work/` loop: the public landing and the order form, `assets.md` § Inventory); the old captures stay local and gitignored in `assets/projects/pstrykweb/`, never published | — | — | — | 1, 21 |
| P8 | Linkoglot store screenshots + 332×720 preview as interim media | `assets/projects/linkoglot/`; the blog figure `assets/blog/solo-app/chapter-{en,pl}.webp` (re-shoot) | owner recordings | replace with real loops (own app, OK as interim) | 1 |
| P9 | ~~Space portfolio + Clockful temporary captures~~ **resolved 2026-10-11:** the owner's recordings replaced them: the space loop (Earth, Mars, Jupiter, Neptune; no lens-flare stop, so no lens-dirt texture) and the Clockful walkthrough (mock data) | — | — | — | 1 |
| P10 | ~~Rights `check`~~ **resolved** [owner 2026-10-11]: Cetuspro and Neoteric gave their OK; PstrykWeb + Clockful `ok`. The club screensaver stays `check` and hides at launch | — | — | — | 21 |
| P11 | ~~Credentials dates~~ **resolved** [owner 2026-10-11]: INF.03 passed 2024; INF.02 + INF.04 are taken in a few months and stay OFF the site until then (Q10); Bakuriani spring 2024, Demre (ESC) summer 2024 | — | — | add INF.02/.04 when passed | 10 |
| P12 | ~~Spanish copy~~ **resolved** [owner 2026-10-11]: es stays live, unreviewed, with no visible AI-translation note (removed from the privacy policy too) | — | — | — | 19 |
| P13 | ~~Legal pages~~ **resolved** [owner 2026-10-11]: `/privacy/` ships un-reviewed as his accepted risk, no postal address (contact = e-mail, enough for GDPR art. 13); `/terms/` removed (a hiring portfolio, no e-service). Re-add a regulamin if he takes paid work through the site | — | — | — | 15, 16, 36 |
| P14 | ~~Drafting Table visual layer~~ **resolved 2026-10-05:** replaced by Poster (tokens, Anybody, header, hero, footer); the old look is archived (`comps/HISTORY.md`) | — | — | — | — |
| P15 | ~~Photo facts~~ **resolved** [owner 2026-10-11]: the coast print is Antalya, Türkiye; the award photo June 2026 | — | — | — | 0 |
| P17 | ~~Chrome links to routes that later slices build~~ **resolved 2026-10-05:** every route exists (work, blog, posts, cv + PDFs, my-life, privacy, terms, RSS, anchors) | — | — | a link checker before launch stays a good idea | — |
| P18 | ~~"Video soon" stand-ins in the PstrykWeb and Clockful chapters~~ **resolved 2026-10-11:** both chapters play the owner's recordings in their drawn browser window | — | — | — | 46 |
| P19 | ~~AI section counts typed by hand~~ **resolved 2026-10-05:** counted from the repo at build (`src/lib/repo-stats.ts`); MCP servers are named (user-level config). **2026-10-06:** no counts at all now [user: "dont give precise numbers"]; examples instead, `repo-stats.ts` deleted | — | — | — | — |
| P20 | ~~Blog posts~~ **resolved** [owner 2026-10-11]: all posts accepted as they are | — | — | — | 20 |
| P21 | ~~My life lines~~ **resolved** [owner 2026-10-11]: the drafts accepted | — | — | — | 7 |
| P22 | ~~Legal tokens~~ **resolved** [owner 2026-10-11]: mailbox = ImprovMX (catch-all forwarding, US/EU) + Gmail (`LEGAL_FACTS` in `astro.config.mjs`); no postal address token | — | — | — | 36 |
| P23 | ~~CV dates~~ **resolved** [owner 2026-10-11]: see P2, P11; CV PDFs reprinted 2026-10-11 | — | — | — | 10, 25 |
| P24 | ~~`/work/` captures and "Recording soon" plates~~ **resolved 2026-10-11:** the PstrykWeb, Clockful and Space plates play the owner's recordings (1280 × 628, the window keeps the video's shape) and their wall thumbnails are cut from the posters; yws.lu, Malatro and LingoType keep their captures of the live sites (real pictures, not stand-ins); a project without media is left off the page, so no "soon" plate can show. The club screensaver is **removed for now [owner 2026-10-11], bring back later with a recording** (Q51) | — | — | — | 1, 51 |
| P16 | Project facts not yet supplied (years, metrics, decisions) | dossiers, case studies | owner | replace or drop the claim | 1 |

## Launch runbook (in order; owner steps marked **owner**)

1. **owner** Replace or accept every row above; `IS_FULL_PRODUCTION=true bun run build` (apps/web) lists what still blocks.
2. **owner** Lawyer review of `/privacy/` + `/terms/` (P13); the gap values go in `astro.config.mjs` `legalTokens` (P22).
3. **owner** Services: EmailJS (service, template, keys; "API requests for non-browser applications" switched on in its Security settings, since the function calls it from the server), Turnstile widget for the domain, Umami Cloud
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
   - [ ] yws.lu: run `/link-portfolio-author-to-website` in its repo (client site, rights `ok` since
     2026-10-09).
   - [ ] pstrykweb.pl (Cetuspro's product): no credit without Cetuspro's written OK. Options to ask them for: an author
     box on the blog posts he wrote, linking `https://muszarski.com/` (the "pstrykweb.pl author page" of `seo.md`
     § Entity strategy); a team/credits page naming him. Never "built by" or "solo" (lessons).

## Go-to-prod answers [owner 2026-10-11] (applied 2026-10-11, commit `feat(launch)`; rows above updated)

- P10: Cetuspro and Neoteric OK given: PstrykWeb + Clockful rights → `ok`.
- P6: hero line = "Code is only the tool. I build products that solve real problems and bring results." (owner's words).
- P4: "Full-stack developer · B2B or UoP · remote or hybrid · available now".
- P3: "Pomorskie, Poland" stays.
- P20: all posts shipped as accepted by the owner.
- P12: es stays live; drop the visible "Translated with AI" line (owner's choice).
- P7/P9/P18/P24: owner recordings landed at the repo root (`pstrykweb.mp4` 114 s, `neoteric-clockful.mp4` 15 s, `3d-space-folio.mp4` 67 s, 1920×942); to cut into loops, never commit the raw files.
- P13/P22: proposed: no postal address (a hiring portfolio, not an e-service), drop `/terms/`, ship un-reviewed drafts as the owner's risk; waits on the owner's OK + mailbox provider.
- Still owed by the owner: mailbox provider, INF dates, Georgia/Demre years, coast photo place, award photo month, years of paid work, footer line, four My-life lines. GSC + social links done by the owner.
