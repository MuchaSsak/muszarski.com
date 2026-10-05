# Open questions

> Every `Unknown` in the wiki, who can answer it, what it blocks. An answer moves the fact into its
> owning page (then mark the row `answered <date>`). Placeholders used in place of an answer block launch.

| # | Question | Blocks | Who | Default if unanswered | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | **Project inventory:** flagships (3–5) + archive; outcome, role, year, links, real metrics with sources, recordings for loops, theme ideas, rights/permission per client project | F03–F06, F11, case studies, CV | owner | placeholders, clearly marked | open (owner sending) |
| 2 | City for local SEO and the JSON-LD address (city or region only?) | `seo.md` titles, hero, schema | owner | "Pomorskie, Poland" | open |
| 3 | Target job titles; contract (B2B / UoP); mode (remote / hybrid / on-site, relocation?); start date | hero availability, quick facts, CV | owner | "Full-stack developer · B2B or UoP · remote/hybrid · available now" [assumption] | open |
| 4 | Deadline for the job hunt / launch | v1 scope cut | owner | none; build in vertical slices | open |
| 5 | Domain: keep `matmuszarski.space` or move to a name domain (availability via SEO research) | canonical URLs, Search Console, OG | owner | decide after the availability check | deferred by owner 2026-10-05: placeholder domain, `placeholders.md` P1 |
| 6 | Real client testimonials (name, role, written consent)? | proof elements | owner | no testimonials shown | open |
| 7 | Photos of the owner (my-life, Person image, maybe hero) | F13, schema image, OG | owner | my-life + schema only; the hero uses a drawing | open |
| 8 | Locale URL segments `/en/` or pstryk-style `/eng/`? | routing, hreflang | owner | `/en/` | answered 2026-10-05: `/en/` |
| 9 | Instructor photos: ask Jonas Schmedtmann / Bruno Simon for written permission? | credentials band | owner | names + course titles + certificate links only | default per legal research: text credit + certificate links (no photos without written permission) |
| 10 | Credentials data: INF.02/.03/.04 dates; course certificates + verify URLs; Erasmus+/ESC (programme, country, dates, role); hackathons (name, date, result, team); short courses | F08, CV | owner | placeholders | open |
| 11 | Contact facts: public email, LinkedIn, Discord, Messenger, npm/dev.to/X profiles | contact, footer, `sameAs` | owner | GitHub only until given | open |
| 12 | Booking link (Cal.com) in contact? | F09 | owner | no (fewer third parties) | open |
| 13 | Make the portfolio repo public (the wiki, skills and hooks become AI-workflow proof)? The scrub must remove PstrykWeb internals (dossier + research file) | F07, F23 | owner | public at launch after a scrub | open |
| 14 | Hosting: "open to projects" = commercial under Vercel's terms → **Vercel Pro ($20/mo) or Cloudflare Workers ($0)**; Hobby only if employment-only copy | `technologies.md` | owner | Cloudflare Workers [assumption] | answered 2026-10-05: Vercel Pro |
| 15 | Lawyer review of the legal pages before launch? | F14 launch | owner | ship marked as drafts; owner decides | open |
| 16 | Is `/terms` legally required? | F14 | legal research | pending | research: required only with freelance + an e-service; contact form disputed → recommend a short regulamin (owner confirms) |
| 17 | Umami Cloud Hobby (EU, 6-month retention) vs self-host | `analytics.md`, privacy policy | owner | Umami Cloud Hobby [research] | research default: Umami Cloud Hobby, EU region |
| 18 | CV PDF locales: en only, en + pl, or all three? | F11 | owner | all three generated; es flagged unreviewed | open |
| 19 | A native Spanish reviewer? | es quality | owner | none; es marked unreviewed | open |
| 20 | Blog posts at launch: how many, which topics | F12, SEO | owner + Claude | 2–3 from `seo.md` topic plan | open |
| 21 | PstrykWeb: who owns it; what may be shown (code, screenshots, metrics) | its case study | owner | not shown until answered | open |
| 22 | Light + dark theme both? | F18, design tokens | owner | both (paper / cyanotype) [assumption] | open |
| 23 | Old site: redirect, keep, or revive the space scene as `/explore` later? | domain, F24 | owner | 301 to the new home if the domain changes | open |
| 24 | "Open to projects": what kind of work; show rates? | contact copy | owner | "selected freelance projects", no rates | open |
| 25 | **Seniority story:** coding since 2022 (~4 years), confirmed 2026-10-05. Still open: still at technikum (which ZSE, which year), matura / graduation date, years of paid work (since when?) | hero, CV, LinkedIn, SEO entity, availability | owner | "Building software since 2022" | partly answered 2026-10-05 |
| 26 | **Display name + handles:** "Mateusz Muszarski" everywhere, `alternateName` MuchaSsak, drop "Matt"/"Matthew"? | SEO entity, all profiles | owner | yes to all [assumption] | open |
| 27 | **Public city line:** Starogard Gdański (business register) / Tricity / "Pomorskie, Poland"? | SEO, hero, schema | owner | "Pomorskie, Poland" | open |
| 28 | **JDG "MATEUSZ MUSZARSKI - ENROLLO"** (public register): mention it (B2B-ready), is Enrollo a project to show, and is the JDG the data controller for the site? | legal pages, CV, `/work/` | owner | not mentioned until answered | open |
| 29 | AI training bots (GPTBot, Google-Extended, ClaudeBot) in robots.txt: allow or block? (search bots always allowed) | `seo.md` | owner | allow [assumption] | open |
| 30 | **CV button:** "navigate + auto-download" is unreliable on iOS (needs a direct tap). OK to use a split CTA: "CV" → `/cv/` + a "↓ PDF" that downloads directly? | F11, header | owner | split CTA [research] | answered 2026-10-05: split CTA |
| 31 | English at `/<locale>/` (your pstryk pattern, root 308 → `/en/`) vs English at `/` unprefixed (SEO research: root = entity home, the WebSite site-name markup sits at the domain root) | `i18n.md`, `seo.md` | owner | `/en/` (owner pattern) | answered 2026-10-05: `/en/` prefix |
| 32 | PstrykWeb: may the site say the client sites are **AI-generated** (the old Cetuspro landing says "not an automatic generator")? | PstrykWeb case study, AI section | owner + Cetuspro | not said | answered 2026-10-05: no, not for now. The site shows public PstrykWeb info only (dossier § Public disclosure); revisit when the owner opens it up |
| 33 | Profile clean-up (owner actions): fix the GitHub README link to the lapsed muszarski.space, LinkedIn headline, npm author/homepage, Play developer site → new domain | SEO P0 | owner | — | open |
| 34 | Analytics position under PKE art. 399: (a) consent prompt for statistics, (b) banner-less with disclosure + opt-out + DNT/GPC (pstryk choice), (c) no client-side analytics | privacy policy, `analytics.md` | owner | (b) [assumption] | open |
| 35 | Get 1–2 merged PRs into other people's OSS repos before applying (counters the weakest objection) | `audience.md` | owner | — | open |
| 36 | Which postal address to publish if the site serves freelance (UŚUDE art. 5): CEIDG business address / correspondence address | `/terms/`, `/privacy/` | owner | Unknown | open |
| 37 | **Security:** `language-ai` (Linkoglot snapshot) put AI keys client-side (`EXPO_PUBLIC_*`). Repo made private 2026-10-05. Still: rotate any key that was ever in its history (private doesn't un-leak), and keys in the shipped app are readable from the bundle → move provider calls server-side | Linkoglot security, case study | owner | not linked | partly answered 2026-10-05 (repo private) |
| 38 | Linkoglot: a landing exists at www.linkoglot.eu/en (Next.js, 30 locales, AI-credits pricing): link it? Trial length? (a free trial exists: confirmed 2026-10-05) | Linkoglot dossier | owner | link the stores only; "free trial" without a length | partly answered 2026-10-05 |
| 39 | GitHub housekeeping: dead homepage links (`muszarski.space`, `2d.muszarski.space`, `ludwig.muszarski.space`), mesku.art down, GRIND APK 400, 3 public repos without a licence | recruiter click-through, `/work/` | owner | fix or hide before launch | open |
| 40 | Neoteric Clockful: the repo is **private** (UNLICENSED). Make it public with Neoteric's OK, or show "Code private · walkthrough on request"? Also: the repo rejects shadcn (brief said shadcn); Neoteric HQ is Gdańsk (brief said Pruszcz Gdański); team or solo? | Clockful card + case study | owner + Neoteric | "Code private · on request" | open |
| 41 | Archive: confirm the suggested show/hide list (`content/projects.md`); which private projects to add (Enrollo? others) | `/work/` | owner | the suggested list | open |

