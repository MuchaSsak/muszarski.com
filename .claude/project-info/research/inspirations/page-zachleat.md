# Zach Leatherman: résumé + "Is this still being maintained??" projects table

Date: 2026-10-05 · Page types: /cv, /work index · URLs: https://www.zachleat.com/resume/, https://www.zachleat.com/projects/
Screenshots: `img/page-cv-zachleat-1440.jpg`, `img/page-work-zachleat-projects-1440.jpg`

## What works [measured]
- **Résumé written as quantified achievements, not duties.** For example: "**Public Speaker** in 9 countries: 24 conferences, 20 meetups, 7 barcamps, 19 podcasts…", "**Technical Writer** … 364 posts since February 2007", "4,026,079 lifetime pageviews".
  - Peer quotes sit inline, with avatars and source links ("Paul Irish called me 'damn smart'").
  - An "ON THIS PAGE" mini-TOC in the sidebar (Community / Professional / Education).
  - An **"updated data on <date>"** stamp.
  - A print stylesheet.
- **Projects page as an honest health table.**
  - 127 sortable rows. Columns:
    - **Neglect %**
    - Name + description + blog post + GitHub/npm links
    - **Popularity:** npm and CDN download sparklines
    - **Versions:** "218 versions in 9 years", latest version and how old it is
    - Audit: dependency count, Socket link
    - Issues and PRs counts
  - A summary at the top: "Open Source Health 97".
  - On mobile the table scrolls inside its own region (637 px wide in a 390 px viewport) instead of breaking the page.
- **"Reply on… Mastodon · 3 replies"**: webmention-style discussion instead of comments.

## Steal
- Achievement sentences with numbers on the CV.
- The **status column** (Maintained / Archived / Experiment) plus the last-release age for boilerplates and side projects on `/work`.
- Linking a related blog post from each project row.
- Letting wide tables scroll inside a region (`overflow-x: auto` + `tabindex=0` + an `aria-label`).

## Skip
- The density. For about 25 projects, show 5 columns at most.
- A sidebar layout on the CV. Keep it to one column so it stays ATS-safe.
