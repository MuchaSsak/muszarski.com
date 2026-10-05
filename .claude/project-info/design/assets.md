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

- **Allowed:**
  - the owner's own recordings and screenshots of his own products
  - code-drawn SVG and shaders made for this site
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

## Inventory (2026-10-05)

| Files | What | Source | Rights | Allowed use | Notes |
| --- | --- | --- | --- | --- | --- |
| `projects/pstrykweb/landing-home-{390,1440}-{viewport,full}.jpg`, `app-konfigurator-start-{390,1440}-viewport.jpg`, `raw/landing-home-{390,1440}-scroll.webm` | captures of live pstrykweb.pl (the OLD Cetuspro landing) + konfigurator start | Playwright 2026-10-05 | Cetuspro; contains stock people + third-party thumbnails | **reference only, never publish** | P7 |
| `projects/linkoglot/store-ios-01…06.jpg`, `store-play-01…06.png`, `icon-{ios,play}.png`, `store-ios-preview.mp4` (+ poster), `store-page-{ios,play}-{390,1440}.png`, `landing-1440.png` | store listing media + page captures | App Store / Google Play / linkoglot.eu, 2026-10-05 | owner (his app) | interim placeholders | P8; preview only 332×720 |
| `projects/space-portfolio/tmp-desktop-1440-00…12-*.png`, `tmp-phone-390-0{0,1}-*.png`, `raw/tmp-desktop-1440-*.{webm,mp4}` (100 s journey + two 20 s clips) | captures of matmuszarski.vercel.app | Playwright 2026-10-05 | owner; third-party textures inside → check the licences (space dossier) | interim placeholders | P9 |
| `projects/neoteric-clockful/tmp-mock-data-{desktop-1440,phone-390}-*.png`, `raw/tmp-mock-data-desktop-1440-walkthrough-13s.mp4` | the app run locally **with mock data** | Playwright 2026-10-05 | code: owner/Neoteric (rights check); data: fake | interim placeholders | P9; no real user data |

## Missing / needed (→ `open-questions.md`, `placeholders.md`)

- **Owner recordings per flagship:** shot lists in the research files (PstrykWeb, Linkoglot 11 shots, space, Clockful).
- **Owner photo:** square ≥ 800 px, same as the GitHub/LinkedIn avatars (Q7).
- **Fonts:** candidates in `design.md` § Typography (Archivo, IBM Plex Mono; OFL); files + licence files land in slice 0.
- **Certificates:** scans or links (Q10).
- **OG images:** generated at build (Phase 1).
