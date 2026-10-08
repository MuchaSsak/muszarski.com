# Structure

> Owns the sitemap, the sections of each page in order, navigation, footer and the CTA inventory.
> Fields: `content-model.md`. Look: `design.md`. Feature IDs (F01…): `requirements.md`.
> Section order is the 2026-10-05 draft [user + research]. Heights and rhythm are refined by the section-patterns
> research and then by screenshot review at 390/1024/1920.

## Sitemap

```
/                                → 308 /en/                      (vercel.json; i18n.md)
/<locale>/                       home                            locale ∈ en (default) · pl · es
/<locale>/work/                  ALL projects index (F04) [user] 2026-10-05; no filters since 2026-10-08 [user]
/<locale>/work/<slug>/           not built: **case studies live in the blog** [user 2026-10-05] (Q43); `/work/` links a
                                 flagship's home chapter (`/<locale>/#<anchor>`) and case study #0 (`/blog/how-this-site-was-built/`)
/<locale>/blog/                  blog index (F12); en + pl only (i18n.md § Locale coverage)
/<locale>/blog/<slug>/           post (slug per locale)
/<locale>/cv/                    web CV, same data as the PDF (F11)
/<locale>/my-life/               personal page (F13)
/<locale>/privacy/               privacy policy, noindex,follow (F14)
/<locale>/terms/                 regulamin, conservative draft (compliance-and-data.md; Q16)
/<locale>/contact/sent|error/     results of a no-JS form post (noindex)
/<locale>/cv/print/              the PDF's source (noindex)
/404                             per-locale copy (F21)
/files/mateusz-muszarski-cv-<locale>.pdf
/en/rss.xml · /pl/rss.xml · /sitemap.xml (index) · /robots.txt · /llms.txt
```
- **Slugs:** `work`, `blog`, `cv`, `my-life`, `privacy` and `terms` stay English in every locale; only blog post
  slugs are per locale [assumption; seo research may change it].
- **Locale segments:** `en`/`pl`/`es`, rules in `i18n.md`.

## Home `/<locale>/` (order)

| # | Section | Must prove / do | CTA |
| --- | --- | --- | --- |
| 0 | Header (sticky) | M—M mark → home · Work (`#work`) · How I work (`#how-i-work`) · AI (`#ai`) · Blog · language flags · CV · **Hire me** [user 2026-10-06]. My life sits in the footer + the menu. Built 2026-10-05, reworked 2026-10-06 (`design.md` § Components) | Hire me (primary, → `#contact`), CV |
| 1 | Hero | the fitted name (H1, the signature moment F20), role, one-line positioning (P6, `brand.md` § Positioning), icon facts, the availability sticker; then the tool band (marks + names). Built 2026-10-05 | See the work (primary) · Download CV |
| 2 | Selected work | the 4 flagship chapters (`content/projects.md`), each in its own skin, read in one order: badge → title → media → outcome → description → CTA → status → tools (`design.md` § Components, Chapters); then "Also shipped" (a tilted label tag, then Malatro and yws.lu as tilted tickets over moving colour blobs, lingui-translate-ai removed [user 2026-10-07]; client work behind the rights gate) + "All projects →", one row tall on wide screens | one primary per chapter: Visit pstrykweb.pl (the landing, never the konfigurator [user 2026-10-06]) · App Store + Google Play · Ask for a walkthrough · Launch (+ Code, secondary); All projects |
| 3 | How I work | product thinking: a 7-stop ring; each stop shows a drawn scene from a real project, one line and a receipt (F06) [user 2026-10-06: tell it visually, less reading] | links into case studies |
| 4 | AI workflow | an org chart (F07) [user 2026-10-06]: "I run AI like a team.", Me (Lead) → Claude Code (Builder) → a crew of six (memory, rules, research, tools, playbooks, quality gates), each with examples and tool pins, never counts [user 2026-10-06: "dont give precise numbers"]; typecheck, lint and tests are "the floor", one line [user 2026-10-06] | "How this site was built" (F23), the only CTA |
| 5 | Credentials | list + detail panel on wide screens, accordion on phones; each credential its own colour; on wide screens an idle tour (a drawn cursor opens the next card after 5 s without hover, focus or click) [user 2026-10-06]; media loads on open; learning; teamwork (F08). **The Stack section is cut** [user 2026-10-05: "they dont care THAT MUCH to have a whole section dedicated just for this"]: tools show in the band and per chapter | Certificate (verify) · Details on the CV |
| 6 | Latest writing (hidden without posts) | a compact teaser: kicker + plain heading, the case study on this site always first [user 2026-10-07], then the newest posts (at most 8, 2026-10-07: every card is inline HTML) as small cards (taped paper notes on a faint dot grid), for internal links [user 2026-10-06] | All posts |
| 7 | Contact | form + quick facts + three direct tiles (F09). The "Open to selected freelance projects / Start with a project" line and the CV tile are removed [user 2026-10-06] | Send · Copy email · LinkedIn · GitHub |
| 8 | Footer | F10 | — |

- **Rhythm** (desktop, in viewport heights; mobile = content height) [research: landing-sections]:
  - hero ~0.85 svh, with sheet 01 peeking
  - 4 sheets ≈ 1.0 each, sticky-stacked
  - "All work" tab 0.15
  - How I work 0.6–0.8
  - AI process drawing ~1.0
  - credentials 0.6–0.7
  - contact 0.5–0.7
  - footer 0.4–0.6
  - **≈ 9 screens in total.** Never more than 4 consecutive ~1.0 sections. Compositions: `design/design-references.md`.
- **Merge:** if sections 3 + 4 read long in screenshots, they merge into one "How I work" with two halves
  [user agreed to evaluate].
- **Focus over volume** [user 2026-10-06]: each section leads to one obvious next action; detail the landing no longer
  shows (the space site's Lighthouse receipt, PstrykWeb's icon tiles) moves to posts and case studies (`design.md` § Art direction).

## All projects `/<locale>/work/`

Rebuilt 2026-10-07 [user: "no videos/screenshots, it overwhelms users with so many buttons for filtering, and its so
very boring ... completely rethink"]; research: Mobbin sections (Unseen Studio and Instrument: one compact pill row;
Koto: an asymmetric wall of media; MOUTHWASH and Studio Freight: media first, little text). The look: `design.md` §
Components, All projects.

Reworked twice on 2026-10-08: first a TV hero and a spy-room breaker [user: "basically the same as on main landing",
"more creative and visually impressive"], then, the same day, the **night catalogue** [user: the TV version "looks too
vibe coded", "experiment with shaders, and interesting components", "a different style and theme"; the reason, for
the case study: "fun, but not that overly fun", `design.md` § Art direction]. The TV version: `comps/HISTORY.md` row 9.

- **Head:** the H1 "Things I’ve built" on a live contour map (a shader), a one-line lede, and an "On this page" index of
  every project (name, kind · year) that jumps to its plate. No counts, no "flagships" wording [user 2026-10-08].
- **Every project:** the 4 chapters first, then the archive, wide and narrow items alternating left and right, ordered
  so neighbours never look alike. **No filter row** [user 2026-10-08]; each item has an `id` (`wk-<slug>`) the index
  links to.
- **Item:** a plate (a live-site capture in a browser window, with an X-ray lens over it; a reel; a video; or real text
  where there is nothing to film), then number · kind · year, name, one line, tools, one primary action (the home
  chapter, the case study, or the live site / npm / code) + small links.
- **"There's more."** after the catalogue: the title and the private-repositories line ending in a winking emoji, type
  only [user 2026-10-08: no "wink wink" text].
- Phones: one column; the index lists names only; captures pan with the page instead of on hover, and the card in the
  middle of the screen gets a scan line instead of the lens.

## Case study `/<locale>/work/<slug>/`

- Hero in the project's theme: title, outcome, context tag, role/team, year, links.
- TL;DR box, then the spine in `content-model.md`.
- Credits table, NDA label.
- Prev / next project, then a contact band.

## `/<locale>/cv/`

- Header: name, title, location, availability, then **Download PDF** (`<a download>`, file size in the label) · Print · Contact.
- Sections from `content-model.md` § CV in the same order as the PDF, laid out on drafting sheets.
- Locale switch; print stylesheet.
- **One CV button** (`layout/CvLink.astro`) [user 2026-10-06: "just one button for CV"; replaces the 2026-10-05 split button]:
  - a plain click downloads the locale's PDF inside the tap (a direct `download` link, which iOS allows), sets
    sessionStorage `cv-pdf` and opens `/cv/` after 400 ms; `/cv/` then shows the `[data-pdf-note]` confirmation and its
    Download PDF button gets the file again. A click on `/cv/` itself shows the note in place
  - modified clicks (new tab, middle click, a modifier key) just open the page
  - without JS it is a plain link to `/cv/`, whose first button is the PDF
  - **no auto-download on page load** (iOS needs a direct tap) [research: stack § 4.4]: the download only happens inside the
    user's click
  - the post author box still has separate "CV" and "PDF" text links (`pages/[locale]/blog/[slug].astro`)

## Blog

- **Index:** featured post, list by date, tag filter, RSS link.
- **Post:**
  - title, description, dates, reading time
  - TOC (sticky on desktop)
  - prose with code blocks and drawings
  - author box (Person) → `/my-life/` + contact
  - related posts, share image

## `/<locale>/my-life/`

Hero (the title over a goo shader, a fanned stack of the owner's prints: tap, click or "Next photo" deals the next;
entries marked `hero` in `src/data/gallery.ts`; the coast print comes first and is hero-only, `board: false` [user 2026-10-08]) · **pin board** [user 2026-10-07: "an actual real life pinboard ...
evidence board", "great for seo and google knowledge panel"]: a cork board in a wooden frame, every photo from
`gallery.ts` (except `board: false`) as a tacked print with its caption, rows wrapped and centred, the country flag (`ui/Flag.astro`, drawn SVG) + place + month on
yellow tape and his story on an index card (real text next to the image), red yarn tying the prints of a row, on a
light plaster wall; prints are not links, no lightbox [user 2026-10-07]; `LifeBoard.astro` · a playground of
toys, one per interest, each a card with a title, one line and a small game: calisthenics reps, music beats, faith
(light), travel board, motorcycles (hold to rev), games with friends (Pong), films (roll a night: picture only, no
text [user 2026-10-06]), parties, photography (slide to develop a print), self-improvement (an orb race of 1.01ⁿ vs
0.99ⁿ with milestone chips, no figures [user 2026-10-06]) · socials · back to work / contact. The "hang out"
overload (moving windows, notifications) was called off [user 2026-10-06]. Toy scripts load with the page section
(no framework). Secondary nav item; not in the hero path.

## Legal

- `/privacy/` and `/terms/`: formal; TOC; numbered clauses; "last updated" + version; language note
  (prevailing version); `noindex,follow`. Linked from the footer on every page and from the form's privacy
  notice (`compliance-and-data.md`); never in the header.

## Navigation and footer

- **Header on mobile:** mark, CV and Hire me stay visible; the rest goes behind a labelled "Menu" button (a native
  popover, 0 KB JS for open/close). Built 2026-10-05 (Poster), reworked 2026-10-06:
  - < 1180 px: navigation and the flags move into the full-screen menu: Work · How I work · AI · Blog · My life · Contact,
    then Download CV + pause motion, then the flags with their names
  - < 480 px: button type condenses (`wdth` 82, 72 under 360 px) and the CV + Menu icons drop; the stuck full name stacks in
    two lines
  - `e2e/chrome.spec.ts` checks every header control for spill and overlap at 8 widths x 3 locales
- **Contact panel:** not built [assumption 2026-10-05]: every Contact link goes to the home section `#contact` (one form,
  one place to maintain). Revisit if analytics show people dropping on the jump.
- **Footer columns** (this list owns the footer links; ~15 links):
  - Work (the 4 flagships → their home chapters, + All projects)
  - Site (Blog, CV = the `CvLink` text link, My life, How this site was built → the blog case study, RSS)
  - Elsewhere (`ELSEWHERE` in `data/site.ts`: GitHub, LinkedIn, npm, Instagram, Facebook, Telegram, Discord; `rel="me"`,
    new tab) [owner 2026-10-07]
  - Legal (Privacy, Terms)
  - plus the locale switch and the build-time revision row (`design-references.md` § Per home section, Footer row)
  - the columns start left, next to the say-line (`.cols` = `max-content` + `1fr`) [user 2026-10-06]
- **External links open in a new tab** [user 2026-10-06] (`target="_blank" rel="noopener"`):
  - every one says so to screen readers: "(opens in a new tab)" (`sr-only`, after the visible words); components
    write it by hand (Lingui), posts get it from the Sätteri hast plugin `externalLinks` (`apps/web/astro.config.mjs`,
    per-locale words)
  - the launch gate fails any build with a new-tab link that lacks it (the print CV is exempt: no readers)
    [2026-10-06]

## CTA inventory (every CTA has an analytics event: `analytics.md`; the ones without their own event use `cta`)

| CTA | Where | Goes to |
| --- | --- | --- |
| Hire me | header, every width [user 2026-10-06]; reads "Contact" when `IS_AVAILABLE_FOR_HIRE=false` [owner 2026-10-08] | `#contact` |
| Contact | menu, footer, `/cv/`, post author box | `#contact` |
| CV / Download CV (one button, `CvLink`) | header ("CV"), hero + menu ("Download CV"), footer (text link) | PDF download inside the tap, then `/cv/` (§ `/cv/`) |
| Download PDF | `/cv/`, post author box ("PDF") | direct PDF download |
| See work | hero | `#work` |
| Chapter CTA (one primary each; Space adds Code) | chapters | external, new tab; Clockful's walkthrough → `#contact` |
| Live / Store / npm / Code | `/work/` index | external, new tab |
| All projects | after the chapters, footer | `/work/` |
| How this site was built | AI section, footer | the case-study post |
| All posts | latest writing | blog index |
| Copy email | contact section | clipboard + toast |
| Send fails | contact form | its own navy error box (`role=alert`) under Send; the note "Used only to reply. Privacy policy" never changes, link underlined [user 2026-10-06]; unknown answers read as "can't send right now" |
