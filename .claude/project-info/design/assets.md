# Assets

> Owns: the sourcing policy, the asset inventory with rights, and what is still missing. Rights rules:
> `legal/compliance-and-data.md`. Temporary items are also rows in `placeholders.md`.

## Folders

| Path | Holds | In git? |
| --- | --- | --- |
| `assets/projects/<slug>/` | temporary captures for the flagships (`raw/` = unencoded recordings) | **no** (gitignored: placeholders; PstrykWeb ones show third-party content) |
| `assets/references/` | research references, never shipped | no |
| `.claude/project-info/research/inspirations/img/` | research screenshots of third-party sites | no |
| `src/assets/` (Phase 1) | shipped, encoded media (AVIF/WebP posters, AV1 + H.264 loops), fonts with licence files | yes |

## Sourcing policy

- **Hard rule [user] 2026-10-05:** only fonts and assets whose licence allows **free commercial use** (SIL OFL, Apache 2.0,
  MIT, CC0, CC BY with the credit shown where the asset appears) or the owner's own work. A licence that can't be verified
  means the asset is not used. This covers comps, the site, the CV PDF and OG images. Record the licence in the inventory.
- **Allowed:**
  - the owner's own recordings and screenshots of his own products
  - code-drawn SVG and shaders made for this site (blog covers, My life scenes, the case-study frames)
  - sounds synthesised at run time with Web Audio (the My life toys): no audio files, nothing to license
  - screenshots of this site's own earlier versions (`comps/`, `src/assets/case/`) for the case study
  - official store badges, unmodified
  - fonts with a verified licence (licence file next to the font)
  - the owner's own photos (or with the photographer's OK)
- **Allowed as temporary placeholders only:** captures of live sites and store listings (marked `tmp-` / listed below).
- **Forbidden:**
  - stock photos of people
  - AI-generated people or fake UI screenshots
  - instructor photos without written permission
  - client logos or sites without consent
  - third-party site screenshots in shipped pages
  - the EU flag next to his name
- **Who approves:** the owner, for anything showing a person, a client or a company name.

## Image formats [user 2026-10-07: "always convert to optimal webp"]

- **Every picture a page shows ships as WebP** (or SVG for drawings and marks). Photos and screenshots go through
  `astro:assets` (`<Image>`, `getImage()`), which encodes WebP at build time (sharp, quality 80: no visible loss, a
  board thumbnail is 15-55 KB from a 135-208 KB JPEG) in the widths the layout needs. JSON-LD images use the same
  WebP files. Sources may stay JPEG/PNG in `src/assets/`; nothing in `public/` may be a raster other than WebP.
- **Exceptions (PNG):** favicons and app icons in `public/icons/` (Google and Apple want PNG/ICO/SVG) and share
  images in `public/og/` (LinkedIn and some chat apps don't preview WebP).
- **Checked:** the launch gate fails any build with a non-WebP raster in the built HTML (`img`, `source`, JSON-LD,
  the pin board's large files) or in `public/`, outside those two folders.

## Inventory (2026-10-05)

| Files | What | Source | Rights | Allowed use | Notes |
| --- | --- | --- | --- | --- | --- |
| `projects/pstrykweb/landing-home-{390,1440}-{viewport,full}.jpg`, `app-konfigurator-start-{390,1440}-viewport.jpg`, `raw/landing-home-{390,1440}-scroll.webm` | captures of live pstrykweb.pl (the OLD Cetuspro landing) + konfigurator start | Playwright 2026-10-05 | Cetuspro; contains stock people + third-party thumbnails | **reference only, never publish** | P7 |
| `projects/linkoglot/store-ios-01…06.jpg`, `store-play-01…06.png`, `icon-{ios,play}.png`, `store-ios-preview.mp4` (+ poster), `store-page-{ios,play}-{390,1440}.png`, `landing-1440.png` | store listing media + page captures | App Store / Google Play / linkoglot.eu, 2026-10-05 | owner (his app) | interim placeholders | P8; preview only 332×720 |
| `projects/space-portfolio/tmp-desktop-1440-00…12-*.png`, `tmp-phone-390-0{0,1}-*.png`, `raw/tmp-desktop-1440-*.{webm,mp4}` (100 s journey + two 20 s clips) | captures of matmuszarski.vercel.app | Playwright 2026-10-05 | owner; planet textures Solar System Scope **CC BY 4.0** (commercial OK with credit); the lens-dirt texture has **no recorded source** → verify or re-record without it before any public use | interim placeholders | P9 |
| `projects/neoteric-clockful/tmp-mock-data-{desktop-1440,phone-390}-*.png`, `raw/tmp-mock-data-desktop-1440-walkthrough-13s.mp4` | the app run locally **with mock data** | Playwright 2026-10-05 | code: owner/Neoteric (rights check); data: fake | interim placeholders | P9; no real user data |

| `comps/media/lk-camera.{mp4,jpg}`, `lk-icon.png`, `space-clip.mp4` (960 px, 20 s), `space-poster.jpg` | encoded copies for the rebrand comps (gitignored) | from the rows above | as above; the comp shows the CC BY credit under the space clip | comps only | P8, P9 |
| tool marks in `comps/poster-r3.html` (TypeScript, React, Next.js, Astro, Expo, Supabase, PostgreSQL, Tailwind, three.js, GSAP, Vercel, Claude, MCP, …) | brand silhouettes, one colour | Simple Icons 16.34.0 (npm `simple-icons`) | package CC0-1.0; the marks stay their owners' trademarks (Git's logo is CC BY 3.0, not used) | nominative only: name a tool he uses, unaltered, one colour, no endorsement implied | check each brand's guideline link (in the package data) before launch; LinkedIn is not in Simple Icons (Tabler's outline is used) |
| UI icons in `comps/poster-r3.html` | outline icons | Tabler Icons 3.49.0 (npm `@tabler/icons`) | MIT | any, incl. commercial | keep the MIT notice with the bundle |
| icons in the site (`apps/web/src/lib/icons.gen.ts`, `bun run icons`) | tool marks (`si:`), UI outline (`tb:`) and filled (`tbf:`) icons, only the listed ones, inlined | Simple Icons 16.34.0 + Tabler Icons 3.49.0 (devDependencies) | CC0-1.0 (marks stay trademarks, nominative use) + MIT (`public/licenses/tabler-icons-MIT.txt`) | as above | credits line in the footer |
| font in the site: Anybody (`apps/web/public/fonts/anybody.<hash>.woff2`, `bun run fonts`) | variable `wdth` 50-150 / `wght` 400-900, Latin + Latin-1 + Polish, 49.5 KB | github.com/google/fonts `ofl/anybody` | SIL OFL 1.1 (`public/fonts/LICENSE-Anybody.txt`) | any, incl. commercial; never sold alone | replaces Archivo + Plex Mono (Drafting Table, rejected) |
| fonts in `comps/*.html` (Anybody, Roboto Flex, Mona Sans, Martian Mono, Recursive, Bodoni Moda, Hanken Grotesk, Schibsted Grotesk) | Google Fonts | fonts.google.com | SIL OFL 1.1 | any, incl. commercial | self-host with the licence file when one ships |

## Missing / needed (→ `open-questions.md`, `placeholders.md`)

- **Owner recordings per flagship:** shot lists in the research files (PstrykWeb, Linkoglot 11 shots, space, Clockful).
- **Owner photos (2026-10-07):** `apps/web/src/assets/photos/mateusz-muszarski.jpg` (800×800 crop of the Vilnius
  photo: Person image, author box) and `mateusz-muszarski-<place>.jpg` (coast, palanga, turkiye, vilnius: the My life
  pin board, listed with alt, caption, place, month and story in `src/data/gallery.ts`). Name new files by place. The
  superseded 460 px portrait is kept in `photos/archive/` (not shipped). Photos with other people (e.g. the ZSE award
  photo with the principal, kept private in `context/photos/`) need that person's consent and the photographer's OK
  first (Q47).
- **Owner photo (history):** square ≥ 800 px, same as the GitHub/LinkedIn avatars (Q7). **Slots ready 2026-10-06** [owner sent two photos in chat: a pier selfie for the avatar, a straw-hat seaside selfie for My life; chat images don't reach the disk]: drop `me.*` and `life.*` into `apps/web/src/assets/photos/` (`lib/photos.ts`); the author box, the home Person JSON-LD `image` and the My life hero switch on by themselves. Own photos = owner's rights. Astro re-encodes them and strips EXIF/GPS (verified with a GPS-tagged test JPEG).
- **Fonts (Poster, 2026-10-05):** `apps/web/public/fonts/` holds one subset variable woff2 (Anybody, 49.5 KB) +
  `LICENSE-Anybody.txt` (SIL OFL 1.1, from github.com/google/fonts). The Drafting Table faces (Archivo, Plex Mono) are gone
  from the site; their history is in git (`history/drafting-table`).
- **Certificates:** scans or links (Q10).
- **OG images:** generated at build (Phase 1).
