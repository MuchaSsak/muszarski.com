# Project brief

> What we build and why. Requirements: `requirements.md`. Pages and sections: `structure.md`.
> Raw evidence: `research/2026-10-05-synthesis.md` (start there) and the other `research/` files.

## One-liner

The personal site and blog of **Mateusz Muszarski**, a Polish full-stack developer. It proves he is a
product-minded engineer who ships real products. It is built to get him hired, software houses first,
and to rank for his name, his role and his location. [user]

## Problem and why now

- **The old site** is `matmuszarski.space` [web: github.com/MuchaSsak], a fully immersive three.js space scene:
  - linear scroll, so contact and certifications took a long time to reach
  - disabled on mobile
  - outdated content [user]
- **Job hunt starts soon** [user]. The thesis: real shipped projects beat a degree [user].
- **The market has moved.** Software houses are cutting developers who only execute tasks. They keep
  "product engineers" who combine business context, UX, architecture and code, think about what each
  feature costs to build, communicate early and know the client's business [file: context/klepacz.pdf].
  The site must *prove* that profile and never name the negative.
- **The research gap:** immersive portfolios score a Lighthouse mobile median of 35.5. A site that feels
  immersive, scores 90+ and is properly accessible is rare, and that rarity is itself a hiring signal
  [research: 2026-10-05-performance-mobile-a11y.md].

## Who he is (facts for copy; details → `audience.md`, `brand.md`)

| Fact | Source |
| --- | --- |
| **~4 years of coding:** started in 2022, 2–3 months before starting technikum at ZSE. This corrects the earlier "~6 years" and matches the public "began coding in 2022". Student status and graduation: Q25 | [user] 2026-10-05, [research: seo § 1.3] |
| Full-stack; solo on own products and freelance; commercial contract with Cetuspro (PstrykWeb); internship at Neoteric (Clockful) | [user] |
| Public business register: JDG "MATEUSZ MUSZARSKI - ENROLLO", Starogard Gdański (Q28) | [research: seo § 1.3] |
| Heavy on AI and automation: Claude Code MCPs, skills, hooks, LLM wiki | [user] |
| Thinks about business, conversions, clients and users, not only code | [user] |
| Creative coding and three.js; learned from Jonas Schmedtmann and Bruno Simon | [user] |
| Polish, lives in Poland ("Poland, Pomorskie" on GitHub); fluent English; basic Spanish | [user], [web: api.github.com/users/MuchaSsak] |
| Credentials: INF.02, INF.03, INF.04; Erasmus+; ESC volunteering; short marketing/psychology/UX courses; hackathons | [user] |
| Hobbies (for `/my-life`): calisthenics, Christianity, travelling, movies, web development, self-improvement, motorcycles, eclectic music, parties, gaming with friends | [user] |

## Goal and success metrics

| Metric | Target | By when | Source |
| --- | --- | --- | --- |
| Lighthouse mobile, every page | ≥ 90 (Perf, A11y, BP, SEO) | launch | [research] |
| Time to usable content / clicks to contact | impressive within 3 s AND usable in 1 click on mobile | launch | [user] feedback, [research] |
| Google rank for "Mateusz Muszarski" | #1 with the new site | Unknown (weeks after launch) | [assumption] |
| Ranking for role + location queries | top 10 for 2–3 target queries (`seo.md`) | Unknown | [assumption] |
| Contacts, CV downloads, case-study reads | tracked in Umami (`analytics.md`); no numeric target yet | — | [assumption] |
| Interviews from the site | Unknown | Unknown | open question |

## Scope

- **In (v1):**
  - **Home:** hero, project chapters, how I work, AI workflow, stack and credentials, contact, footer.
  - **Pages:** `/work/<slug>` for each flagship; `/cv` in HTML plus PDF from the same data; `/blog` with
    posts and author; `/my-life`; `/privacy` and `/terms` (if the law requires it, `compliance-and-data.md`);
    404.
  - **Locales:** en (default), pl, es.
  - **Services:** Umami analytics and a contact form.
  - **SEO machinery:** `seo.md`.
- **Later:**
  - an opt-in immersive `/explore` hub, which could revive the space identity
  - a ⌘K palette, if not done in v1
  - a text mode and more blog posts
- **Out of scope:**
  - an AI chatbot [research]
  - comments, a newsletter, a CMS, user accounts [assumption]
  - preloaders, gates, scroll-jacking [user]

## Constraints

- **Locales:**
  - en is the source and the default, then pl and es [user].
  - The owner cannot verify Spanish, so es copy is AI-translated and flagged for native review [user].
  - URLs follow `/<locale>/`, with Lingui, like context/pstryk-turborepo [user].
- **Legal pages:** a formal, "lawyer grade" tone, not the brand voice. Not indexed. Linked from the footer [user].
- **Quality bar:** accessible (WCAG 2.2 AA target), performant, responsive, intuitive [user]. Budgets live in `requirements.md`.
- **Team:** solo owner; Claude builds. Budget: free tiers except **Vercel Pro $20/month** [user] 2026-10-05 (`technologies.md`).
- **Deadline:** Unknown (open question).

## Stakeholders and decision rights

| Who | Decides |
| --- | --- |
| Mateusz (owner) | everything: scope, taste, content, publishing; supplies project info, photos and certificates |
| Claude | builds and researches; takes the documented defaults and marks them `[assumption]` |
| A lawyer (recommended, not engaged) | final review of `/privacy` and `/terms` before launch |

## Risks

| Risk | Mitigation |
| --- | --- |
| Project inventory not supplied → no proof | placeholders tracked in `placeholders.md`; the launch gate blocks placeholders |
| Per-project themes drift into a collage | one skeleton with theme tokens per project (`design.md`) |
| The WebGL moment hurts LCP or TBT | lazy island after LCP, capability tiers, budgets enforced by Lighthouse |
| Recruiter objection "always solo" | evidence of teamwork and communication (`audience.md`) |
| Legal pages wrong | cited statutes, facts only, lawyer review (`compliance-and-data.md`) |
| `lingui-for-astro` is pre-1.0 | verified in a spike; typed dictionaries as the fallback (`i18n.md`) |
