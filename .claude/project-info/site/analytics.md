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
| `cv_download` | a PDF download starts | `source` (header/hero/contact/cv-page/menu/footer), `locale` |
| `cv_view` | `/cv/` page view (pageview) | — |
| `contact_open` | contact panel opened | `source` |
| `contact_submit` | form sent successfully | `topic` (hiring/project/other/none) |
| `contact_error` | form error shown | `kind` (validation/turnstile/network/429/5xx) |
| `copy_email` | email copied | `source` |
| `case_open` | a case study opened from a chapter or archive | `project` (slug) |
| `outbound` | Live / Code / npm / LinkedIn / GitHub clicked | `target`, `project?` |
| `locale_switch` | locale changed | `from`, `to` |
| `theme_toggle` | theme changed by hand | `to` |
| `motion_pause` | pause-motion control used | — |
| `cta` | any other CTA in `structure.md` § CTA inventory (See work, All projects, Open to projects, How this site was built) | `id`, `source` |

Wired so far (no-ops until `PUBLIC_UMAMI_WEBSITE_ID` is set):
- slice 0: `locale_switch` (Umami data attributes on the locale links, 0 JS), `theme_toggle` (`umami.track` in the toggle script)
- slice 1: `cta` id=contact / id=cv (header, footer), `cv_download` (header, menu, footer), `outbound` (GitHub, LinkedIn,
  npm, astro) - all data attributes

## Funnels and KPIs

- **Hire funnel:** home view → case_open or cv_download → contact_open → contact_submit / copy_email.
- **KPIs:** CV downloads per week; contacts per week; % of sessions reaching a case study; mobile vs desktop.
  No numeric targets yet (`project-brief.md`).

## Tools, consent, retention

- **Umami script:** loaded `defer` after content. Never on the LCP path. Never blocking.
- **Gating:** no consent gating unless the legal research says it's needed (`compliance-and-data.md`).
- **Search:** Google Search Console + Bing Webmaster Tools for queries and indexing (`seo.md`).
- **Retention:** 6 months (Umami Cloud Hobby, `technologies.md` § limits).
