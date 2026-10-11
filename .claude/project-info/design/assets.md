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
  - **third-party site screenshots as a quotation in critical analysis** [user 2026-10-08, after being told the
    Polish right to quote (art. 29 of the copyright act) fits and the risk is low, not zero]: only in the case study's
    research, small first screens from the research run, each with the author's name, the source domain and our
    commentary next to it; never a frame with a person's photo in it (Kris Temmerman and Ravi Klaassens were left out)
  - official store badges, unmodified
  - fonts with a verified licence (licence file next to the font)
  - the owner's own photos (or with the photographer's OK)
- **Allowed as temporary placeholders only:** captures of live sites and store listings (marked `tmp-` / listed below).
- **Forbidden:**
  - stock photos of people
  - AI-generated people or fake UI screenshots
  - instructor photos without written permission
  - client logos or sites without consent
  - third-party site screenshots in shipped pages, except the quotation above
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
| `projects/space-portfolio/tmp-desktop-1440-00…12-*.png`, `tmp-phone-390-0{0,1}-*.png`, `raw/tmp-desktop-1440-*.{webm,mp4}` (100 s journey + two 20 s clips) | captures of matmuszarski.vercel.app | Playwright 2026-10-05 | owner; planet textures Solar System Scope **CC BY 4.0** (commercial OK with credit); the lens-dirt texture has **no recorded source** → verify or re-record without it before any public use | superseded 2026-10-11 by the owner's recording (the loops row below); local only | P9 |
| `projects/neoteric-clockful/tmp-mock-data-{desktop-1440,phone-390}-*.png`, `raw/tmp-mock-data-desktop-1440-walkthrough-13s.mp4` | the app run locally **with mock data** | Playwright 2026-10-05 | code: owner/Neoteric (rights check); data: fake | interim placeholders | P9; no real user data |

| `apps/web/public/media/work/{pstrykweb,yws}.webp` (pages cut at 3200 px; the taxi capture was deleted with its card 2026-10-08), `{malatro,lingotype}.webp` (first screen), `this-site-{en,pl,es}.webp` (WebP of this site's home share card) | captures of the owner's live sites for the `/work/` cards (the Space capture, the start console, was deleted 2026-10-11: its CC BY console render had no credit there) | Playwright 2026-10-07, 1280 px, WebP 9-59 KB | the owner's own builds; client sites (pstrykweb.pl public landing, yws.lu) follow their project's rights status and hide at launch while `check`; no stock people or third-party thumbnails in the crops | shipped (yws.lu, Malatro, LingoType; CV: PstrykWeb) | P24. The club screensaver renders with the GPU flags (`--use-angle=d3d11 --enable-gpu`), but its screen shows the club's email, phone and logo and a photo of people of unknown source, so it is not captured; it is off `/work/` for now [owner 2026-10-11] (Q51). The head's wall shows 480×300 thumbnails of these captures, `public/media/work/thumb/<slug>.webp` (the tall pages cut to their first screen, this site's card per locale; 3-14 KB, 2026-10-09): remake them from the capture when it changes; the PstrykWeb, Clockful and Space thumbnails are cut from their loops' posters (2026-10-11). `public/media/work/private-code.svg` (behind "There's more.") is drawn, not captured: line numbers and coloured bars from a seeded script (2026-10-09, own work). **Video slots** [user 2026-10-08]: drop `public/media/work/<slug>.mp4` (H.264) + `<slug>-poster.webp` (+ optional `<slug>.av1.mp4`) (`pstrykweb` and `neoteric-clockful` filled 2026-10-11), 1280 px wide at the recording's own shape (the owner's are 1280×628), encoded per `technologies.md` § video; the plate switches to a browser-framed video at build time (`lib/media.ts`), and a project with no media at all is left off the page |
| `apps/web/public/media/work/{pstrykweb,neoteric-clockful}.{av1.mp4,mp4}` + `-poster.webp`, `apps/web/public/media/space/folio.{av1.mp4,mp4}` + `folio-poster.webp` | the PstrykWeb, Clockful and Space loops (home chapters + `/work/`) | the owner's screen recordings, 2026-10-11 (1920×942, 60 fps; raw files in `assets/projects/<slug>/raw/recording-2026-10-11.mp4`, gitignored, never committed: 122 MB is over GitHub's limit), cut with `.case-study/loops/make.py`: picked segments, 0.25 s crossfades, 1280×628, 30 fps, no audio, AV1 SVT preset 4 CRF 46 + H.264 veryslow CRF 28 `-tune animation`. PstrykWeb 19 s at 1.5× (991 KB / 1.48 MB), Clockful 14 s (192 / 219 KB), Space 15 s (586 KB / 1.14 MB). Posters 960 px WebP q75 (31 / 12 / 24 KB), shown as a lazy `<img class="r-poster">` under the video, not a `poster` attribute (that loads with the page; all reels, `styles/chapters.css`) | the owner's own work. PstrykWeb: the public landing and the order form only (from 1:12 the recording shows the internal team panel and a client's generated site: never published). Space: Earth, Mars, Jupiter, Neptune (Solar System Scope CC BY 4.0, credited in the chapter and on the `/work/` card); left out: the start console (two more CC BY credits), the logo asteroids, the lens-flare stops (uncredited lens-dirt texture), the Saturn project cards. Clockful: mock data | shipped | `public/media/space/flight.*` (Mars → Jupiter, 960×540) stays for the Credentials flight and the old-site clips in three posts |
| `apps/web/src/assets/case/page-{work,life,cv,blog}-{en,pl}.webp`, `pages-phone-{en,pl}.webp`, `qa-sweep.webp` (redone), `seo-{author,footer}-{en,pl}.webp` | this site's inner pages, phones strip, home at 3 widths, author box and footer for the case study | Playwright 2026-10-08 on a launch-mode build (rights-`check` projects hidden), 1440 / 390 px | the owner's own site | case study | The My life shots show the owner's own holiday photo (his OK: it is on that page) |
| `apps/web/public/media/blog/yws-lu/film.{av1.mp4,mp4}` + `src/assets/blog/yws-lu/film-poster.webp` | the 1:51 film about the yws.lu revamp, with music (the yws.lu case study's `Film`) | made in Claude Motion for the client, 2026-10-10 (scenes from the live 2026 site and the 2025 build run locally); master 1920×1080 60 fps, 73.5 MB, kept out of the repo; AV1 SVT preset 4 CRF 44 (6.8 MB) + H.264 veryslow CRF 25 `-tune animation`, both AAC 96 kb/s + faststart; the poster is the frame at 4 s | the owner's own work about client work with rights `ok`; the 3D house's CC BY credit is on the end card | yws.lu case study | the music is Claude Motion's own synth score |
| `apps/web/public/media/case/film.{av1.mp4,mp4}` + `src/assets/case/film-poster.webp` | the 47 s portfolio film with music, featured in this site's case study (en, pl; `Film`) | made in code with Claude Code, 2026-10-11: the launch site filmed frame by frame in Chromium at 60 fps, the four round-1 comps live, a Web Audio score (A minor, 128 BPM, own work, no samples); source and the 89 MB master in `.case-study/film/` (gitignored), cut 2 approved by the owner [user 2026-10-11]. Encoded with `.case-study/film/site-encode.sh`: converted from the frames' full-range BT.601 to limited-range BT.709 with full tags (Safari, iOS); AV1 SVT preset 4 CRF 44 (11.5 MB) + H.264 two-pass 2.2 Mb/s (13.7 MB; CRF 25 was 21.8 MB, too heavy for the iPhones that need H.264), both AAC 96 kb/s + faststart; the poster is the frame at 10.3 s (the four directions, "Claude's pick") | the owner's own work; the old site's planet textures (Solar System Scope, CC BY 4.0) are credited on the end card; PstrykWeb and Clockful shown with rights `ok` | case study | the film's numbers are measured: 34 / 13.8 MB / 46.9 s (2026-10-05) and home mobile Lighthouse 98/100/100/100 (2026-10-11) |
| `apps/web/public/media/case/{contour,xray,prints,goo}.{av1.mp4,mp4}` + `-poster.webp` | 6-9 s loops of the site's four shaders (case study `Clips`) | CDP screencast of the launch build with the GPU flags, 2026-10-08; 960×600, 30 fps, AV1 CRF 46 (150-450 KB) + H.264 CRF 28 | the owner's own site | case study | the X-ray clip runs over the owner's Malatro capture |
| `apps/web/src/assets/case/ref-{bruno-simon,samsy,jordan-delcros,edoardo-lunardi,jesper-landberg,antoine-wodniack,stefan-vitasovic}.webp` | phone first screens of award-winning portfolios, from the research run | `research/inspirations/img/*-mobile.jpg`, throttled phone, 2026-10-05; 600 px WebP | **third-party works**, each © its author | **quotation for critical analysis only** (§ Sourcing policy): the case study's research section, with name, domain and commentary | no frames with people's photos |
| `comps/media/lk-camera.{mp4,jpg}`, `lk-icon.png`, `space-clip.mp4` (960 px, 20 s), `space-poster.jpg` | encoded copies for the rebrand comps (gitignored) | from the rows above | as above; the comp shows the CC BY credit under the space clip | comps only | P8, P9 |
| tool marks in `comps/poster-r3.html` (TypeScript, React, Next.js, Astro, Expo, Supabase, PostgreSQL, Tailwind, three.js, GSAP, Vercel, Claude, MCP, …) | brand silhouettes, one colour | Simple Icons 16.34.0 (npm `simple-icons`) | package CC0-1.0; the marks stay their owners' trademarks (Git's logo is CC BY 3.0, not used) | nominative only: name a tool he uses, unaltered, one colour, no endorsement implied | check each brand's guideline link (in the package data) before launch; LinkedIn is not in Simple Icons (Tabler's outline is used) |
| UI icons in `comps/poster-r3.html` | outline icons | Tabler Icons 3.49.0 (npm `@tabler/icons`) | MIT | any, incl. commercial | keep the MIT notice with the bundle |
| icons in the site (`apps/web/src/lib/icons.gen.ts`, `bun run icons`) | tool marks (`si:`), UI outline (`tb:`) and filled (`tbf:`) icons, only the listed ones, inlined | Simple Icons 16.34.0 + Tabler Icons 3.49.0 (devDependencies) | CC0-1.0 (marks stay trademarks, nominative use) + MIT (`public/licenses/tabler-icons-MIT.txt`) | as above | credits line in the footer |
| logo, favicon and blog author avatar: `apps/web/public/favicon.svg` (+ `public/icons/*.png` from `bun run og`) | the owner's social-media avatar: pixel art of Jinx (Arcane / League of Legends), traced cell by cell into a 64×64 SVG (crisp edges, a tight square crop) | made by someone else for the owner; his source PNG is private in `context/art/` | the artist's OK to the owner [user 2026-10-08: "someone else, I have OK"]; the character is Riot Games' (fan art) | his personal mark only: never on products, merch or anything sold | artist's name for a credit line still to come (Q) |
| font in the site: Anybody (`apps/web/public/fonts/anybody.<hash>.woff2`, `bun run fonts`) | variable `wdth` 50-150 / `wght` 400-900, Latin + Latin-1 + Polish, 49.5 KB | github.com/google/fonts `ofl/anybody` | SIL OFL 1.1 (`public/fonts/LICENSE-Anybody.txt`) | any, incl. commercial; never sold alone | replaces Archivo + Plex Mono (Drafting Table, rejected) |
| fonts in `comps/*.html` (Anybody, Roboto Flex, Mona Sans, Martian Mono, Recursive, Bodoni Moda, Hanken Grotesk, Schibsted Grotesk) | Google Fonts | fonts.google.com | SIL OFL 1.1 | any, incl. commercial | self-host with the licence file when one ships |

## CV marks (2026-10-08) [user: "use logos and icons when you know its okay"]

| Asset | Source | Permission | Use |
| --- | --- | --- | --- |
| LinkedIn [in] logo, white: `apps/web/public/media/cv/linkedin-in-white.webp` (280 px lossless, from 840 px) | brand.linkedin.com/downloads (`in-logo.zip`, `InBug-White.png`) | LinkedIn lets members use it "as a hyperlink to your LinkedIn profile", in blue, black or white, unmodified, only its own files ("logos found elsewhere on the web are not approved") | CV contact bar, as the profile link. The site's Tabler outline doesn't qualify (Q50) |
| Google Play + App Store icons: **not used** in the footer "Elsewhere" links; neutral Tabler glyphs instead (`tbf:player-play`, `tbf:apps`, MIT) [user 2026-10-09: "would be nice if you had icons"] | partnermarketinghub.withgoogle.com (Play lockups/icons/badges), developer.apple.com/app-store/marketing/guidelines | Google: the prism "should only be used within the context of the Google Play lockup", "Don't use the icon in marketing materials", monochrome needs approval. Apple: "Use only the badge artwork… Don't use icons, logos", no standalone Apple logo. Only the full badges are allowed | developer-page links in the footer; the badges stay on the Linkoglot chapter's store buttons |
| GitHub Invertocat (`si:github`, Simple Icons, source github.com/logos) | brand.github.com/foundations/logo | "Use the Invertocat logo as a social button to link to your GitHub profile"; white or black, unmodified | CV bar (white) and slip (black), as profile links only; not in a skills list |
| Project logos (Linkoglot's icon, the sticker as the Portfolio mark) | owner's own | owner's own | none since v8: the owner dropped them [user 2026-10-08]; the Jinx avatar stays off the CV either way (fan art of Riot's character) |
| Flags (Poland; the Union Jack for English) | drawn in `CvSheet.astro`; the Union Jack after the public-domain construction | flags are public domain | CV languages |
| QR code to the portfolio | generated at build by `uqr` 0.1.3 | MIT (devDependency) | CV contact slip |

Tool logos on the CV, from each brand's own guidelines (read 2026-10-08): TypeScript **OK** (single-colour variant);
Expo OK if less prominent than his name; Next.js OK only with Vercel's trademark notice printed; GitHub only as a
profile link; Supabase, TanStack, Tailwind CSS, Astro, shadcn/ui and Mobbin **unclear** (no terms, colour-only marks,
or "written consent" for the logomark); React and React Native (LF Projects), GitLab, Playwright (Microsoft),
Lighthouse (Google) and Claude (Anthropic) **no** without permission. So the CV shows no tool logos: the tools are
names in groups under outline icons. The site's tool marks (`si:`) face the same rules: Q50.

Cross-post badges (2026-10-11, the post header's "Also on"): **text only**. DEV: its brand page hands out the
badge, but its Terms (§ 9) allow logo use "only with express permission", and the old "add the DEV badge to your
site" page was withdrawn in 2021; write "DEV" or "dev.to", never "Dev.to". Medium: its logo guidelines
(medium.design, updated 2024-10-30) allow the icon for links on a personal site, unmodified, black or white, clear
space equal to its height, from its own files (a Google Drive folder linked there). Adding it = downloading those
files first (owner's OK), then both badges get a mark or neither does.

## Missing / needed (→ `open-questions.md`, `placeholders.md`)

- **Owner recordings per flagship:** shot lists in the research files (PstrykWeb, Linkoglot 11 shots, space, Clockful).
- **Owner photos (2026-10-07):** `apps/web/src/assets/photos/mateusz-muszarski.jpg` (800×800 crop of the Vilnius
  photo: the Person image; the blog author box shows the Jinx logo since 2026-10-08) and
  `mateusz-muszarski-<place>.jpg` (palanga, turkiye, vilnius, rzeszow, starogard-gdanski: the My life pin board;
  coast: the first hero print only, `board: false`), listed with alt, caption, place, month and story in
  `src/data/gallery.ts`. Name new files by place. The superseded 460 px portrait is kept in `photos/archive/` (not
  shipped). Photos with other people need that person's consent and the photographer's OK: the ZSE award photo with
  the principal (2026-10-08) rests on the school's own Facebook post and the principal's official role (art. 81
  ust. 2 pkt 1 prawa autorskiego); the school's written OK is still recommended (open-questions).
- **Owner photo (history):** square ≥ 800 px, same as the GitHub/LinkedIn avatars (Q7). **Slots ready 2026-10-06** [owner sent two photos in chat: a pier selfie for the avatar, a straw-hat seaside selfie for My life; chat images don't reach the disk]: drop `me.*` and `life.*` into `apps/web/src/assets/photos/` (`lib/photos.ts`); the author box, the home Person JSON-LD `image` and the My life hero switch on by themselves. Own photos = owner's rights. Astro re-encodes them and strips EXIF/GPS (verified with a GPS-tagged test JPEG).
- **Fonts (Poster, 2026-10-05):** `apps/web/public/fonts/` holds one subset variable woff2 (Anybody, 49.5 KB) +
  `LICENSE-Anybody.txt` (SIL OFL 1.1, from github.com/google/fonts). The Drafting Table faces (Archivo, Plex Mono) are gone
  from the site; their history is in git (`history/drafting-table`).
- **Certificates:** scans or links (Q10).
- **OG images:** generated at build (Phase 1).
