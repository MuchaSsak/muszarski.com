# Vercel, GitHub and Stripe: legal pages with versioning and navigation

Date: 2026-10-05 · Page type: /privacy (versioning + navigation chrome)

URLs:
- https://vercel.com/legal/privacy-notice
- https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement (and https://github.com/github/site-policy)
- https://stripe.com/privacy

Screenshots: `img/page-legal-github-privacy-1440.jpg`, `img/page-legal-stripe-privacy-1440.jpg`

## What works [measured]
- **Vercel:**
  - an "On this page" TOC;
  - "Last Updated June 1, 2026";
  - **"Changes" and "Previous Versions" anchors**;
  - a **changelog post announcing the legal update** (`/changelog/updates-to-legal-terms-june-2026`);
  - long sections folded into `<details>`.
- **GitHub:**
  - a docs shell: breadcrumb (Home / Site policy / Privacy Policies), the site-policy nav on the left, **"IN THIS ARTICLE"** on the right with 18 anchors;
  - heading permalinks and a **"Copy markdown"** button;
  - "Effective date: April 27, 2026";
  - the source lives in the public **`github/site-policy`** repo (CC0, 2,175★), so every change is a reviewable PR.
- **Stripe:**
  - a left legal-documents nav (Privacy Policy & Centre, DPA, Data Transfer Addendum, Sub-processors, Cookies);
  - **numbered H2s** ("1. Personal Data we collect and how we use and share it"), 28 in total;
  - a Defined Terms section;
  - a **translation banner** for Polish visitors: "We offer this translation for your convenience; it is informational only, and the English version is binding";
  - 89 hreflang alternates.

## Steal
- "Previous versions" with dated links. Better: a git-history link. Developers recognise it, and it's honest.
- Heading permalinks + Copy markdown (cheap with MDX).
- A binding-language banner on translated versions (PL/ES/EN). Which language is binding is a legal decision [legal check needed].
- Numbered sections for a "lawyer grade" feel.

## Skip
- Stripe's roughly 99-character lines and 23.7k words. Scale to a one-person site (2–4k words).
- Stripe's 404 sets its canonical to the home page. That's a separate mistake, but it comes from the same site.
