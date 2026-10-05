# TkDodo's blog (Dominik Dorfmeister): technical blog with series

Date: 2026-10-05 · Page types: blog index, post · URLs: https://tkdodo.eu/blog, https://tkdodo.eu/blog/practical-react-query
Screenshots: `img/page-blog-tkdodo-post-1440.jpg`, `-390.jpg`

## What works [measured]
- **Header:** "TkDodo's blog" next to a **Search box with a Ctrl K hint**, nav (Blog · Tags · Sponsors · RSS), social links on the right, and an Auto/Light/Dark theme select.
- **Post header:** H1, then "Nov 16, 2020 — ReactJs, React Query" (date plus tag links), a photo cover with a credit, and a bold **"Last Update: 2023-10-21"** line.
- **Series box:** a "REACT QUERY" panel listing #1 Practical React Query (CURRENT), #2, #3 and so on, then "All 33 parts in the series". This is the best long-form internal-linking device in the sample.
- **Index:** a short "👋 I'm Dominik" intro, then "Latest Posts" with date, reading time and tags. RSS is linked.
- Code blocks have Copy buttons, and there's a print stylesheet.

## Problems [measured]
- **The meta disagrees with the visible date.** `article:modified_time` equals the published date (2020-11-16), while the page says "Last Update 2023-10-21". Google asks for the two to be consistent.
- `og:type=website` on posts, and no JSON-LD.
- The prose runs to about 98 characters per line (20 px Inter in a 960 px column). Too wide.
- A floating EthicalAds unit.

## Steal
- The series panel (Part n of N, with the current part marked).
- A visible "Last update" line, wired to `dateModified` this time.
- Search advertised with a key hint.

## Skip
- Ads.
- The overly wide measure.
- Stock-photo covers.
