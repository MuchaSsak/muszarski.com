# Bartosz Jarocki: print-friendly CV page (cv.jarocki.me)

Date: 2026-10-05 · Page type: /cv (web + print = PDF)

- **URLs:** https://cv.jarocki.me · source https://github.com/BartoszJarocki/cv (9,674★, last push 2026-03-03, MIT-style template).
- **Author:** Full-stack engineer from Wrocław, Poland, so the closest peer to Mateusz.
- **Screenshots:** `img/page-cv-jarocki-1440.jpg`, `-390.jpg`, `img/page-cv-jarocki-print-1440.jpg` (print-media emulation).

## What works [measured]
- **One centred column, about 680 px wide.**
  - Header: name (H1) + a one-line role in mono + "🌐 Wrocław, Poland, CET" + an icon contact row, with a square photo on the right.
  - Sections, in order: About → Work Experience → Education → Skills → Side projects.
  - Each role: Company + **stack chips** + right-aligned years, then the job title in mono, then a one-line summary and bullets.
- **All data comes from one file** (`resume-data.tsx`), which renders the page and its metadata.
- **Print is the PDF.** The site ships an `@media print` stylesheet. Printing it with Playwright to A4 gave **2 pages and 248 KB**.
  - In print it hides the "Press Ctrl+J to open the command menu" hint, the command-menu nav, some stack-chip rows and the side-project link URLs.
- **SEO:**
  - `ProfilePage` (`dateCreated`/`dateModified`) with a `Person` `mainEntity`, which carries `alternateName`, `jobTitle`, `worksFor`, `alumniOf`, `hasOccupation[]` (each with `occupationLocation`), `contactPoint` (email, phone), `address` and `sameAs`.
  - Also `og:type=profile`, a generated `opengraph-image`, a canonical and `robots: index, follow`.
- A **Ctrl+J command menu** for links and actions. On mobile it's a floating ⌘ button.

## Steal
- The architecture: typed data → page → print = PDF.
- The ProfilePage + Person markup, reusing the site-wide Person `@id`.
- Stack chips inside each role ("skills in context").
- `CET` next to the city.

## Skip / adapt
- **The look is a popular template** (about 10k stars, widely forked), so retheme it to the site's art direction.
- Icon-only contact buttons. Use text links, which are readable by ATS parsers and screen readers.
- Hiding stack chips in print. Keep them in the PDF so web and PDF stay identical.
- The phone number in JSON-LD. That's a privacy choice for the user to make.
