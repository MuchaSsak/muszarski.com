# Brittany Chiang: "All Projects" archive table (+ Jesper / Locomotive / antfu contrasts)

Date: 2026-10-05 · Page type: /work index · URL: https://brittanychiang.com/archive
Screenshots: `img/page-work-brittany-archive-1440.jpg`, `-390.jpg`; contrasts `img/page-work-jesper-full-1440.jpg`, `page-work-locomotive-1440.jpg`, `page-work-antfu-projects-1440.jpg`

## What works [measured]
- **"← Brittany Chiang" back link + H1 "All Projects"**, then a real `<table>` with 46 rows.
  - Columns: **Year · Project · Made at · Built with** (teal chips) **· Link** (domain text + ↗, e.g. "koala.health ↗").
  - Rows without a public link simply leave the cell empty. That's an honest way to show client work.
- The table is dense but scannable: a recruiter can answer "has she used Next.js at an agency?" in 3 seconds.

## Problems [measured]
- **Mobile hides the Made at, Built with and Link columns.** The view collapses to Year + Project ↗, so the stack information disappears exactly where recruiters skim most.
- No canonical and no JSON-LD.

## Contrasts
- **Jesper Landberg `/full`:** project names only, set inline with dots, plus a FEATURED / FULL toggle. The best escape hatch from a 3D showcase, but it carries no metadata.
- **Locomotive `/projects`:** a text list (Name · Industry · Location) with an **"All projects ⁴³"** filter dropdown that shows the count as a superscript.
- **antfu.me `/projects`:** groups under huge outlined category headings, each item an icon + name + one line. Works for 47 small OSS projects, but the grey text has poor contrast.

## Steal
- A `<table>` with a domain-text link column.
- A "Made at / Context" column. For Mateusz that becomes Type: Client via <software house> / Product / Internship / Side / Boilerplate.
- Superscript counts on filters.
- A FEATURED / FULL toggle if the home page ever gets a 3D project index.

## Skip / fix
- Dropping columns on mobile. Turn each row into a 2–3 line block that keeps the stack chips and links.
- Low-contrast text (antfu).
