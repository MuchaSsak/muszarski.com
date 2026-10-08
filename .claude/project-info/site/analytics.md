# Analytics

> Owns what we measure and how. The tool is Umami (cookieless) [user] 2026-10-05: Umami Cloud Hobby, EU region
> [research default; the owner confirms in Q17]. Legal facts (consent, privacy text): `compliance-and-data.md`. CTAs: `structure.md` § CTA inventory.

## Questions we need answered

1. Do visitors who arrive (mostly via links) reach a case study, the CV or contact?
2. Which projects get opened, and which get skipped?
3. Which locale do people use, and do they switch?
4. Which search queries and pages bring people (Search Console, not Umami)?
5. Does the signature moment or video hurt engagement on mobile (bounce on phones vs desktop)?

## Events (no PII; property values from a fixed list)

| Event | When | Properties |
| --- | --- | --- |
| `cv_download` | a PDF download starts | `source` (header/hero/menu/footer from the CV button; cv-page; cv-papers, the PDF's pages on `/cv/`; blog), `locale` |
| `cv_view` | `/cv/` page view (pageview) | — |
| `contact_open` | contact panel opened (no panel is built, so not wired) | `source` |
| `contact_submit` | form sent successfully | `topic` (job/project/question/none) |
| `contact_error` | form error shown | `kind` (validation/turnstile/network/429/5xx) |
| `copy_email` | email copied | `source` (contact; cv-bar, cv-page on `/cv/`) |
| `copy_cv_link` | the CV's address copied on `/cv/` | `source` |
| `case_open` | a case study opened from a chapter or archive | `project` (slug) |
| `outbound` | Live / Code / npm / LinkedIn / GitHub clicked | `target`, `project?` |
| `locale_switch` | locale changed | `from`, `to` |
| `motion_toggle` | pause-motion control used | `paused` |
| `cta` | any other CTA in `structure.md` § CTA inventory (Hire me / Contact, See work, All projects, walkthrough, How this site was built, All posts) | `id`, `source` |

Wired so far (no-ops until `PUBLIC_UMAMI_WEBSITE_ID` is set):
- slice 0: `locale_switch` (Umami data attributes on the flag links, 0 JS)
- slice 1: `cta` id=contact (header "Hire me", footer), `outbound` (GitHub, LinkedIn, npm, astro) - data attributes
- overnight build 2026-10-05: `cta` (see-work, all-projects, walkthrough, this-site, blog), `outbound` (every chapter and
  /work/ link with `project`), `cv_download` (cv-page: data attributes), `copy_email` (contact),
  `contact_submit` (topic) / `contact_error` (kind), `case_open` (/work/ → case study), `motion_toggle`
- 2026-10-06 [user feedback pass]: the CV button (`layout/CvLink.astro`) sends `cv_download` with source
  header/hero/menu/footer **from its script** (`umami.track`), because Umami's own click handler would race the
  navigation to `/cv/`; the `cv` cta id, `theme_toggle` (theme switch cut) and the `open-to-projects` cta (line removed)
  are gone, and so is the contact section's `cv_download` (its CV tile was removed); the post author box uses the
  same button (source `blog`) instead of its old CV + PDF pair
- 2026-10-06 (second round): `outbound` targets `pstrykweb-site` (was `pstrykweb-konfigurator`; the chapter links the
  landing now), `malatro-live`, `yws-live` and `npm-lingui-translate-ai` (the "Also shipped" tickets, with `project`)
- The script loads after `load`, never with DNT/GPC or the `umami.disabled` opt-out (`layout/UmamiLoader.astro`); the
  privacy page has the opt-out switch (`legal/AnalyticsOptOut.astro`)
- The tracker counts the production domain only (`data-domains`: apex + www from `SITE_HOSTS` in `scripts/launch.mjs`),
  never a preview or localhost. A new domain → add it there. 2026-10-06: the first deploy baked its preview host in
  and Umami dropped every real visit (0 visitors).

## Funnels and KPIs

- **Hire funnel:** home view → case_open or cv_download → contact_open → contact_submit / copy_email.
- **KPIs:** CV downloads per week; contacts per week; % of sessions reaching a case study; mobile vs desktop.
  No numeric targets yet (`project-brief.md`).

## Tools, consent, retention

- **Umami script:** loaded `defer` after content. Never on the LCP path. Never blocking.
- **Gating:** no consent gating unless the legal research says it's needed (`compliance-and-data.md`).
- **Search:** Google Search Console + Bing Webmaster Tools for queries and indexing (`seo.md`).
- **Retention:** 6 months (Umami Cloud Hobby, `technologies.md` § limits).
