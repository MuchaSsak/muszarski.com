# UI Building-Block Patterns & Micro-interactions for a Developer Portfolio

Date: 2026-10-05

## TL;DR — implications for this portfolio

- **Contact one action away, from anywhere.** Keep a "Contact / For hire" trigger in the header on every page. It opens a drawer or card with **Copy email + Open mail + CV + local time**. Seen on derolez.dev, Aino and olaolu.dev. This fixes the old site's main failure (contact took forever to reach). [measured]/[opinion]
- **Hybrid navigation.** Use a visible top nav with 5 items or fewer, and add a **⌘K/Ctrl K palette** on top for power users (zenorocha.com, cmdk). Never make the palette the only nav. On mobile, use a full-screen sheet with oversized targets (Dennis Snellenberg). [measured]/[opinion]
- **The hero is facts, not flourish.** Show name, role, a specific value prop with the outcome highlighted (olaolu.dev), location + timezone (CET), and **dated availability** ("Available Oct. 2026", Corentin Bernadou). Add 2 CTAs, all above the fold at 390 px. No preloader. [measured]/[opinion]
- **Work index:** filter chips with counts plus a list/grid toggle (Dennis /work), synced to the URL. Cards show **muted, in-view video loops** (rauno.me/craft: 68 `<video>`, `preload="metadata"`, off-screen paused) instead of a WebGL gallery. [measured]
- **Case studies:** a metadata row (role, team, duration, stack, links, outcome), a sticky TOC with scroll-spy (Josh Comeau), a "Next case" link, and an embedded live demo where possible. Use a card→hero **cross-document View Transition** as progressive enhancement (87.78% global support per caniuse). [measured]/[data]
- **Skills in context, never skill bars.** Use tech pills per role/project (Brittany Chiang), sentence-style logo chips (antfu.me), or a category rail (ClickUp/Vercel integrations on Mobbin). [measured]/[data]
- **Memorable hiring hooks that cost little:** derolez.dev's **ticket-style "For hire." card** (live clock + "same time as you" + Copy). Also its career grid with a **"You?" slot** that spotlights the contact card when clicked. [measured]
- **Certifications** follow SaaS compliance sections (Dovetail, Linear on Mobbin): a tile with badge, name, issuer, date and a **Verify ↗** link. [data]/[opinion]
- **Bilingual PL/EN:** label languages by their own names (autonyms), never flags. Put the switcher in both header and footer, keep the same page when switching (no dumping to home), add reciprocal `hreflang` + `x-default`, and never auto-redirect. [expert]
- **Add a "text / machine mode".** basement.studio has a HUMAN/MACHINE toggle that opens `/ai/home`, a plain-text mirror "for AI agents, crawlers, and humans who prefer it raw". It serves AI screeners and low-end phones, and is the honest fallback the old WebGL site lacked. [measured]
- **Micro-interactions worth building:** copy feedback, live time + relative offset, a bio-length toggle (leerob.com), view-transition morph, CSS scroll progress, focus-dim lists, palette shortcuts. **2026 clichés to skip:** custom cursors, magnetic-everything, name marquees, multilingual "Hello" preloaders, text scramble, pulsing green dot. [opinion]
- **Gate all motion.** Wrap every motion in `prefers-reduced-motion` and every hover effect in `(hover: hover) and (pointer: fine)`. Any auto-moving element (marquee, carousel, loop) that runs longer than 5 s needs a pause control (WCAG 2.2.2, Level A). [expert]

## Method & source quality

- **Mobbin (MCP), web platform:** 17 queries (screens + sections). It is strong for SaaS-grade sections: command palettes, compliance badges, case-study metadata, filters, timelines, footers and toasts. It is **weak** for personal-portfolio heroes, 404s (mostly generic error states), language switchers (mostly settings pages), and anything hover- or motion-based, because it only has static captures.
- **Live captures (Playwright 1.63, Chromium):** 14 personal portfolios plus 1 studio (basement.studio), desktop 1440×900 and mobile 390×844 (isMobile/hasTouch), with interaction states: ⌘K open, menu open, hover, "For hire" panel, 404s. Files are in `inspirations/img/ui-*.jpg`.
- **Galleries scraped:** land-book.com/design/portfolio, minimal.gallery/tag/portfolio, onepagelove.com/genre/portfolio, siteinspire.com (portfolio), httpster.net, bestfolios.com, the Awwwards "Menu" collection, and the Codrops Creative Hub (hover tag) plus the portfolio tag.
  - The galleries are mostly **designer** portfolios.
  - **godly.website now redirects to recent.design** [measured].
  - Codrops served Cloudflare 403s after a few requests.
  - jacekjeznach.com (well-known PL dev portfolio) now redirects to an unrelated store, so it is not cited.
  - cassie.codes is closed.
- The shared WebSearch budget ran out mid-pass. Later facts were verified by fetching primary docs directly (caniuse, MDN, W3C, Google, Smashing).
- **Tags:**
  - [measured] = observed live by me on 2026-10-05
  - [data] = curated dataset (Mobbin) or caniuse stats
  - [expert] = standards, docs or author write-ups
  - [opinion] = my judgment

### Reference sites captured

| Site | Who | Study it for | Key files |
|---|---|---|---|
| brittanychiang.com | Frontend eng (Klaviyo) | sticky split layout, scroll-spy, experience rows, focus-dim hover | `ui-brittany-desktop`, `-hover-desktop`, `-mobile-2` |
| zenorocha.com | Founder (Resend) | ⌘K as primary CTA, key sequences, 404 echo | `ui-zeno-desktop`, `-cmdk-desktop`, `-cmdk-mobile` |
| dennissnellenberg.com | Freelance designer-dev | portrait hero + location pill, work filters/list-grid, case metadata, full-screen mobile menu, local time | `ui-dennis-*` |
| derolez.dev | Design engineer (BE) | "For hire." ticket, live time "same time as you", "You?" slot, inline copy | `ui-derolez-*` |
| corentinbernadou.com | Freelance dev (FR) | dated availability, "Copy email?", viewport readout, grid toggle (Alt+G), editorial comma nav | `ui-corentin-*` |
| rauno.me (+/craft) | Interaction designer | copy-email, crosshair cursor, video-loop masonry | `ui-rauno-*` |
| joshwcomeau.com | Educator/dev | header utility icons, sound/theme toggles, sticky TOC, card-sheet mobile menu, flashlight 404 | `ui-joshw-*`, `ui-404-joshw-desktop` |
| leerob.com | Engineer | Bio "Default / Long" toggle | `ui-leerob-desktop` |
| olaolu.dev | Software eng (Shopify) | outcome-highlighted value prop, contact panel with Résumé | `ui-olaolu-*` |
| paco.me | Webmaster (Linear), cmdk author | type-only hero, 3-column Building/Projects/Writing, poetic 404 | `ui-paco-desktop` |
| antfu.me | OSS design engineer | sentence-style logo chips for roles/skills | `ui-antfu-desktop` |
| lynnandtonic.com | Designer for the web | book-TOC nav, themed (not inverted) dark mode, "v. XIX" | `ui-lynn-*` |
| basement.studio | Dev studio | HUMAN/MACHINE toggle → `/ai/home` | `ui-basement-*` |

---

## Building blocks

### 1. Navigation bar & menus
1. **Sticky split pane with scroll-spy** (brittanychiang.com) [measured]
   - Left column is fixed: name, role, one-liner, section nav (a line indicator grows on the active item), socials at the bottom. The right column scrolls.
   - Why it works: every section, contact included, is one click away on a one-pager.
   - Mobile: becomes a stacked page with **sticky section labels** ("EXPERIENCE") (`ui-brittany-mobile-2`).
   - Avoid: copying the look. This exact template is heavily cloned [opinion].
2. **Inline desktop links + full-screen mobile sheet** (Dennis Snellenberg) [measured]
   - Desktop shows Work / About / Contact inline.
   - Mobile shows "• Menu", which opens a dark full-screen sheet: NAVIGATION label, oversized links, a dot marking the current page, a SOCIALS row at the bottom, and a circular close button (`ui-dennis-menu-mobile`).
   - Mobbin **Open** is the same idea: oversized links with → arrows and a small footer-link row ([screen](https://mobbin.com/screens/a1869a59-77fb-4ff5-8149-527f1fb06747)) [data].
   - Avoid: a hamburger on desktop for 4–5 items; no focus trap or Esc; animations over ~400 ms [opinion].
3. **Typographic nav as identity** [measured]
   - Corentin uses a comma-separated nav ("Featured Works, Archive, About"). It is identical on mobile.
   - Lynn Fisher uses a book table of contents with dotted leaders and roman numerals.
   - Why it works: distinctive at zero JS cost.
   - Avoid: more than ~5 items.
4. **Header utility cluster** [measured]
   - Josh Comeau: search, sound, theme and RSS as icon buttons with aria-labels. antfu.me does the same.
   - Josh's mobile version keeps search + theme in the bar and moves the rest into a **card sheet with accordions** (`ui-joshw-menu-mobile`).
   - Avoid: icon-only buttons without labels or tooltips.
- **Anti-pattern seen:** zenorocha.com's top nav overflows horizontally at 390 px (links cut off) [measured `ui-zeno-cmdk-mobile`].

### 2. Command palette (⌘K) as portfolio navigation
1. **Palette advertised in the hero** (zenorocha.com, kbar-style) [measured]
   - Hero CTA reads "Press `ctrl` `K` to start →". The key shown is OS-aware: ctrl on Windows.
   - A ⌘ icon button sits top-right.
   - Groups:
     - **General:** Copy Link `L`, Send Email `E`, View Source `S`
     - **Go to:** Home `G H`, About `G A`, Articles `G B`…
   - The 404 reuses it ("Press G H to go home").
2. **SaaS palette conventions** (Mobbin) [data]
   - Group headers.
   - "Recent" first ([Vapi](https://mobbin.com/screens/593d7acd-2e16-4365-bcd6-02ce52f48f3b)).
   - Footer legend: ↵ select · ↑↓ navigate · Tab jump sections · ⌘K toggle ([Juicebox](https://mobbin.com/screens/2af813bf-0129-45d1-81ed-069edee76e16)).
   - Per-item shortcut chips plus "Open in new tab" ([Magnific](https://mobbin.com/screens/e22e26e2-f813-4f1e-beda-43c9ecf26419)).
   - Breadcrumb results ([Devin](https://mobbin.com/screens/e37a4e69-9a61-4f36-803d-edbd89c1229d)).
   - A shortcut cheat-sheet mode ([Frame.io](https://mobbin.com/screens/7bf0c9af-dd42-4511-a35e-15e097df461b)).
3. **Build on cmdk** [expert]
   - By Paco Coursey; 2022 rewrite with Rauno Freiberg and Shu Ding.
   - Unstyled, accessible, auto filter/sort, groups, `Command.Dialog`.
   - Follow the WAI-ARIA combobox pattern.
   - Portfolio actions [opinion]:
     - Copy email
     - Download CV (EN / PL)
     - Switch language
     - Toggle theme
     - Text mode
     - "Projects using React" (skill → projects)
     - Jump to any case study
- **Mobile:** the same palette opens from a visible button. **Hide key hints on touch.** Zeno still shows `G H` chips on mobile [measured].
- **Avoid:**
  - Palette-only navigation; recruiters won't press ⌘K.
  - Shipping it in the initial bundle; lazy-load it on first keypress or click [opinion].
  - Palettes are spreading on dev portfolios, judging by several GitHub PRs/issues titled "add command palette" [data]. The *content* of the actions is the differentiator, not the palette itself [opinion].

### 3. Hero for a person (name / role / value prop / CTA / availability)
1. **Outcome-highlighted value prop + quantified bio** (olaolu.dev) [measured]
   - Kicker: "HEY, I'M OLAOLU".
   - Headline: "A Software Engineer **building fast, resilient web products at scale.**" The outcome clause is in the accent color.
   - Bio states impact ("contributed millions in incremental revenue").
   - Single "Contact me ↗".
2. **Specific availability, not a vibe** [measured]
   - Corentin's top bar: "Available Oct. 2026 · Copy email?".
   - derolez: a "For hire." ticket button in the header.
   - Dennis: a "Located in the Netherlands" globe pill.
3. **Photo-forward identity** [measured]/[data]
   - Dennis: portrait + giant name marquee. Mobile keeps the portrait full-bleed with the role at the bottom.
   - derolez: phone mockups cycling personal photos.
   - Ada: an inline portrait "pill" inside the headline ([Mobbin](https://mobbin.com/sites/sections/3eb52aa7-420a-4211-ba9b-5793316410d6)).
4. **Type-only, fastest LCP** (paco.me, zenorocha.com, leerob.com) [measured].
- **For this user** [opinion]: H1 = name. Then role + core stack, "Poland · CET", "Available from <date>", and **[Contact] [CV]**, all inside the first 844 px on mobile.
- **Avoid:**
  - Intro/preloader screens. Dennis plays a multi-language "Hello/Bonjour/…" intro before content [measured].
  - "Creative developer" with no proof.
  - The pulsing green dot as the only availability signal [opinion].

### 4. Project / case-study grid & cards
1. **Filter chips with counts + list/grid toggle** (dennissnellenberg.com/work) [measured]
   - Chips: All / Design⁷ / Development¹¹. Icon toggle: list ↔ grid.
   - The list is a table: CLIENT · LOCATION · SERVICES · YEAR.
   - SaaS equivalents on Mobbin [data]:
     - Left filter accordion + Grid/List ([Claude customers](https://mobbin.com/sites/sections/f18b1527-0a32-4297-900f-ab86377fda22))
     - Search + dropdown filters ([Ramp](https://mobbin.com/sites/sections/dcb1dbee-7909-4cd8-9dbc-6074fa11f09c))
     - "Showing 9 of 30 · Reset all" ([Webflow](https://mobbin.com/sites/sections/318e00ee-2fd4-49f4-92fc-88aa402b934a))
   - Dev version: filter by **type** (product / client / OSS) and **tech**; state lives in the URL [opinion].
2. **Scannable index list** [data]
   - Name / industry / location columns ([Locomotive](https://mobbin.com/sites/sections/280c1a2d-41d4-4495-a4bd-816763c93ad3)).
   - A dense year-ranged list ([Aino](https://mobbin.com/sites/sections/aee9192a-eebd-4223-989c-64543cf5ec44)).
   - Desktop add-on: a cursor-following thumbnail on row hover (Codrops [ImageRevealHover](https://github.com/codrops/ImageRevealHover/)).
3. **Muted video-loop cards** (rauno.me/craft) [measured]
   - Masonry with title + date on each card, blurred placeholders before load.
   - 68 `<video autoplay muted loop preload="metadata">` with a `#t=0.01` src fragment so the first frame acts as a poster. Off-screen videos stay paused.
   - Mobile: poster first, play when in view via IntersectionObserver, skip on Save-Data or reduced motion [opinion].
4. **Card content standard** [measured]/[data]
   - Title + one-line *outcome* + tag chips ([Fiasco](https://mobbin.com/sites/sections/4ed7c118-a866-41fa-824c-32a24323c927)).
   - Tech pills (Brittany).
- **Avoid:**
  - Info that only appears on hover.
  - A 3D gallery as the *only* path to projects. Corentin's WebGL cube still renders on mobile, but the text list is what makes it usable [measured]/[opinion].
  - Many concurrent autoplays.

### 5. Case-study detail layout
1. **Metadata row / sidebar** [measured]/[data]
   - Dennis /work/twice: giant title, then 3 columns ROLE/SERVICES · CREDITS · LOCATION & YEAR on hairline rules, then a magnetic circular **"Live site ↗"** overlapping the hero media.
   - [Dovetail](https://mobbin.com/sites/sections/93f952db-3d57-42d4-a50b-302a4b4fab50): Industry / HQ / Company size / Website + share icons beside the hero.
   - Dev fields [opinion]: Role · Team size · Duration · Stack · My contributions · Outcome metric · Live / Repo.
2. **Sticky TOC with nested levels + active highlight** [measured]/[data]
   - Josh Comeau articles: "TABLE OF CONTENTS", the current section in the accent color.
   - [Attio](https://mobbin.com/sites/sections/7866659c-1438-4186-8ec4-500d137ba8b1): "On this page" + share.
   - [Better Stack](https://mobbin.com/sites/sections/e7e957c6-5a4a-4cd8-831b-7f0a65f19d87): numbered contents.
   - Mobile: collapse into an "On this page" disclosure plus a thin progress bar.
3. **Next-case footer** ("Next case — The Damai", Dennis) keeps the browsing loop going [measured].
4. **Live embedded demo** [measured]
   - Josh embeds an interactive code + preview with a slider and a "Reveal Margin" toggle.
   - For a developer, a runnable mini-demo or before/after is stronger proof than screenshots [opinion].
- **Avoid:** an uncaptioned image wall; burying the outcome below the fold; scroll-jacking.

### 6. About / bio
- **Bio length toggle** "Bio · Default | Long" (leerob.com) [measured]. Recruiters scan; interested leads go deep.
- **Short bio + inline copy-email icon + photo carousel** (derolez.dev). On mobile, the photos stack above the bio [measured].
- **Two-panel bio + portrait** ([Kalstore](https://mobbin.com/sites/sections/5e1e6047-eef1-417c-b42b-c7ab44205e35)); **note + signature** ([incident.io](https://mobbin.com/sites/sections/67e11461-af20-4b7e-8e9a-8f0cdc669a8d)) [data].
- **Avoid:** life story before value; stock imagery; "passionate about…".

### 7. Skills / stack (not skill bars)
1. **Skills in context:** tech pills under each role or project (Brittany) [measured]. Answers "where did you use X".
2. **Sentence with logo chips** (antfu.me) [measured]:
   - "Working at [Vercel]/[Nuxt]"
   - "Creator of [Vitest][Slidev][VueUse]…"
   - "Core team of …"
   - "Maintaining …"
3. **Category rail + items** [data]:
   - [ClickUp](https://mobbin.com/sites/sections/bb3f7978-3e19-438c-a1ac-7fdec49dc8a9): category list on the left, logos on the right.
   - [Vercel](https://mobbin.com/sites/sections/6f09f09a-ddb8-4581-ba7c-603a1d7920c7): sidebar + cards with a one-line description.
   - [Kit](https://mobbin.com/sites/sections/8b3b4364-9a16-4530-a943-484d5e8977d9): filter pills.
   - Suggested groups: Languages / Frontend / Backend / Infra / Testing, each skill with "how I use it" plus a link to filtered projects [opinion].
4. **/uses page** ("USES" on zenorocha.com; "hardware/software I use" on antfu.me) [measured].
- **Avoid:** percentage bars, star ratings, 40-logo walls. Lattice-style scattered logo grids are decoration ([Mobbin](https://mobbin.com/sites/sections/2006d3b7-193b-4953-82c6-561f459bf832)) [opinion].

### 8. Experience timeline
1. **Date-column rows** (Brittany) [measured]
   - "2024 — PRESENT" | Title · Company ↗ | description | pills.
   - **Promotions stack as greyed earlier titles** under one company.
   - Hovering a row dims the others.
   - Mobile: a single column.
2. **Career list next to a contact card + "You?" slot** (derolez.dev) [measured]
   - The list shows company · date range · title.
   - A phone mock shows past companies as app icons plus a **"You?"** placeholder.
   - Clicking it ("Your company — highlight the contact card") dims everything but the For-hire card (`ui-derolez-yourcompany-desktop`).
3. **Editorial alternatives** [data]
   - A chapters table with year ranges ([Büro](https://mobbin.com/sites/sections/bcad6cf8-5eb5-4590-bb1f-b8f4d4ecfb88)).
   - A sticky heading on the left with milestones on the right ([Hims](https://mobbin.com/sites/sections/7c8a38c3-254e-4c0f-9aa9-b3bb8daf9ff7)).
- **Avoid:**
  - Alternating left/right zig-zag ([Wise](https://mobbin.com/sites/sections/56d6864d-7fa5-4649-85cd-a2730ff775ce), PayPal). It is slow to scan and collapses awkwardly on mobile [opinion].
  - An icon-studded central line.

### 9. Testimonials
- **No testimonial section appeared in the captured pages (home + a few subpages) of the 14 dev portfolios** [measured]. They are rare for individual developers, which makes them a differentiator if they're real [opinion].
- **Patterns from Mobbin** [data]:
  - Key phrase **bolded** inside the quote, avatar + role + "from Company" ([Clay](https://mobbin.com/sites/sections/70de8420-3d32-4e9a-90ef-b2881b615669)).
  - Tweet/masonry wall ([Notion](https://mobbin.com/sites/sections/07426824-d84a-45a5-a53a-efd241efa233)).
- **Dev version** [opinion]: 2–4 LinkedIn recommendations. Show name, role, the *relationship* ("led my team at X"), and a link to the source for verification. Place them near the contact CTA or inside the relevant case study.
- **Avoid:** auto-rotating carousels (WCAG 2.2.2 applies if over 5 s); anonymous or first-name-only quotes.

### 10. Certifications / badges
- **Compliance-section patterns** [data]:
  - Card = badge + name + one-line meaning ([Dovetail](https://mobbin.com/sites/sections/3ee471e1-fbad-429e-953e-57a309b5ebfd)).
  - Dark minimal 3-column with a small badge + verified-check label ([Linear](https://mobbin.com/sites/sections/a9b9de76-cd1f-45c8-8a09-a65013b57589)).
  - Uniform tiles ([Mural](https://mobbin.com/sites/sections/67449691-5625-444d-a2c6-79247168bc3f)).
  - A row + "Learn more" ([Miro](https://mobbin.com/sites/sections/49ef29d7-9efd-4672-9784-cef76f57ebe1)).
- **Dev version** [opinion]: tile = badge (small SVG/AVIF) · cert name · issuer · issued/expiry date · credential ID · **Verify ↗** to the issuer page. Order by relevance to the target role; drop expired certs. Mobile: 2-column tiles.
- **Avoid:** logo soup without dates; badges larger than the content.

### 11. Contact section / CTA
1. **Contact drawer reachable from anywhere** [data]/[measured]
   - Aino: "Let's build something great." + email + **OPEN GMAIL** + **COPY EMAIL** buttons ([Mobbin](https://mobbin.com/sites/sections/1083cf3c-a197-4ee7-9632-e9bfe0d4e416)).
   - olaolu.dev "Open contact menu": My Work / My Shelf / **My Résumé** + SAY HELLO email/Telegram + socials (`ui-olaolu-contact-desktop`).
2. **Ticket card** (derolez.dev) [measured]
   - Contents: "design engineer · № 008 · **For hire.** · name · `09:51:04 in Ghent, Belgium` · **same time as you** · Email ✉ | Copy".
   - Visuals: a perforation line with notch cut-outs.
3. **Label/value rows, each with Copy** ([Ragged Edge](https://mobbin.com/sites/sections/5f1d322f-b76b-4468-90ef-ab85700b0c44)) [data].
4. **Minimal form** if one is wanted at all: four fields + a privacy line ([Hex](https://mobbin.com/sites/sections/1ffa00ba-4d8b-45bf-bedb-8132cec47e34)) [data].
- **Copy-email mechanics** [expert]: `navigator.clipboard.writeText` is secure-context (HTTPS) only and throws `NotAllowedError` when blocked (MDN). Keep a `mailto:` fallback and announce "Copied" via `aria-live`.
- **Also add** [opinion]: expected response time, timezone, and a preferred channel.
- **Avoid:** form-only contact, captcha walls, and contact reachable only at the end of a long scroll (the old site's failure).

### 12. Footers
- **Oversized wordmark** [data]:
  - [Structured](https://mobbin.com/sites/sections/cf954a98-4f2e-41d3-b2a1-168e4ba0108d) (Locomotive-built)
  - [Feather](https://mobbin.com/sites/sections/8b7c16ff-9fcf-414a-90d1-3eb469c45ade)
  - Waka Waka
  - Zellerfeld
- **Utility footer** ([Cursor](https://mobbin.com/sites/sections/956c4125-2886-463c-9c81-772bfa1bc974)) [data]: email + socials + a **language select with globe** + a **3-way theme switch (system/light/dark)** + a small "SOC 2 Certified" pill.
- **Status pill** "All systems operational" ([Resend](https://mobbin.com/sites/sections/9301c687-40d0-4d8d-bbb8-b1325bac2679)) [data]. Portfolio analog: "● Available from <date>".
- **Text toggles** "TEXT MODE: OFF / DARK MODE: OFF" + "WE'RE HIRING" (Aino) [data]; **"LOCAL TIME 09:45 AM CEST"** (Dennis) [measured].
- **Avoid:** a mega-sitemap footer for a 5-page site. A footer is a last contact chance, so repeat email + CV.

### 13. 404 page
- **Reuse the palette** [measured]: zenorocha.com shows "four oh four · Press G H to go home → · This page doesn't exist."
- **Echo the path + contact** [measured]: olaolu.dev shows "You just navigated to: /nope-404" + SAY HELLO email + My Résumé.
- **Playful but opt-out** [measured]: Josh Comeau's 404 is a dark page with a **cursor flashlight**, a mascot, and "Go back home". It also has a **"Disable flashlight effect"** button.
- **Voice** [measured]: paco.me runs a short essay on lost HTML comments.
- **Weak** [measured]: default framework 404s (brittanychiang.com, leerob.com); derolez.dev serves home content under a 404 status.
- **Mobbin** [data]: an "500" built from product-UI tiles ([Acctual](https://mobbin.com/screens/e9cb3c9c-8b9d-458e-9bc5-54af312ca2da)); an error ID with copy ([Contractbook](https://mobbin.com/screens/e556dced-1023-41a8-a567-7a4d24570b72)).
- **Recommendation** [opinion]: echo the bad path, open the palette pre-filled, show the top 3 projects + contact, in both languages.

### 14. Theme toggle (dark/light)
- **Icon toggle in the header, kept visible on mobile** (Josh Comeau) [measured]. Dark mode re-tints the illustration rather than inverting it.
- **No-flash technique** [expert] (Josh, "The Quest for the Perfect Dark Mode"):
  - A blocking inline script runs before paint and sets CSS variables.
  - Priority: `localStorage`, then `prefers-color-scheme`.
  - In Next.js the off-the-shelf version is **next-themes** (Paco) [measured on paco.me].
- **3-way segmented system / light / dark** (Cursor footer) [data]. Respects the OS by default.
- **Themed mode, not an inversion** (lynnandtonic.com) [measured]: "mode" switches to a dark textured palette with its own type colors. The site also carries a version number ("v. XIX").
- **Avoid:** ignoring the system preference; a flash of the wrong theme; a toggle buried in the menu on mobile.

### 15. Language switcher (PL/EN)
- **Gap:** no live PL/EN developer portfolio was verified in this pass.
- **Expert rules** [expert]:
  - From Vitaly Friedman, Smashing (2022-05-04):
    - Flags are not languages.
    - Use native names ("Polski", "English").
    - Put the switcher in both header and footer.
    - Don't auto-redirect by IP or browser language.
    - Abbreviations like "EN" can break under browser auto-translate; globe/translate icons help.
  - From Google Search Central: `hreflang` per page, each version listing itself and all others (reciprocal), plus `x-default`.
- **Mobbin** [data]:
  - Native-name grid with a checkmark ([GetYourGuide](https://mobbin.com/screens/35db6784-f3c0-475b-9acd-321bb179e68f)).
  - Footer select with a globe (Cursor).
  - Header "🌐 EN" (Miro).
- **For 2 languages** [opinion]:
  - A single header link to the other language ("English" / "Polski"), marked `lang` + `hreflang` + `translate="no"`, maybe with a globe icon. Short "PL · EN" is acceptable if it has an `aria-label` and `translate="no"`.
  - Route-preserving: `/pl/projekty/x ↔ /en/projects/x`.
  - Persist the choice; mirror it in the palette ("Switch to Polski").
- **Avoid:** 🇬🇧/🇵🇱 flags, auto-redirect, switching that drops the visitor on the home page.

### 16. Résumé / CV download
- **CV link in the persistent contact panel, footer and 404** ("My Résumé", olaolu.dev) [measured].
- **"View Full Résumé" after the experience list** (brittanychiang.com) [measured]. It links to the PDF in context.
- **Recommendation** [opinion]:
  - Label: "CV · PDF · EN | PL · 140 KB · updated Sep 2026".
  - Also an **HTML résumé** route (searchable, ATS/AI-readable, part of text mode).
  - Add palette commands for both languages.
  - Open in a new tab rather than forcing a download on mobile.
- **Avoid:** an image-only CV; a stale PDF with a different job history than the site.

### 17. Bonus: text / machine mode
- **basement.studio** [measured]:
  - A floating **HUMAN | MACHINE** switch leads to `/ai/home`: an ASCII-art header, `/HOME /SERVICES …` nav, and "MACHINE-READABLE INDEX — plain-text mirror … for AI agents, crawlers, and humans who prefer it raw", with `KEY ....... value` records.
  - Its header also shows a live "Online ⁽⁷⁾" presence count and post counts in the nav ("Showcase ⁽²⁶⁾", "Blog ⁽²⁹⁾").
- **Aino footer** "TEXT MODE: OFF" [data].
- **Why it fits here** [opinion]:
  - Feeds AI-assisted screening.
  - Doubles as the low-power / no-WebGL fallback the old site lacked.
  - It's a crafty, on-brand signal for a developer.
  - It is generated from the same content source.

---

## Micro-interactions catalog

Value/Cost: L/M/H. Cost is relative dev effort [opinion]. "Cliché?" is a 2026 judgment [opinion].

| # | Micro-interaction | Seen at | Craft value | Cost | Perf / a11y risk | Cliché 2026? |
|---|---|---|---|---|---|---|
| 1 | **Copy email → inline "Copied ✓"** (1.5–2 s, `aria-live`) | rauno.me, derolez.dev, corentinbernadou.com ("Copy email?"), Aino | H | L | HTTPS-only; keep mailto fallback | No (utility) |
| 2 | **Live local time + relative offset** ("same time as you" / "+1 h from you") | derolez.dev; Dennis footer "09:45 AM CEST"; Corentin `LocaleTime` | H for remote hiring | L | Update ≤1/s; don't put the ticking clock in `aria-live`; avoid SSR hydration mismatch | Local time: mildly. Relative offset: fresh |
| 3 | **Dated availability badge** ("Available Oct. 2026") | corentinbernadou.com; Resend-style status pill | H | L | Stale-data risk; drive from one config value | Pulsing green dot = cliché; a date is not |
| 4 | **⌘K palette + key sequences** (G H…) | zenorocha.com; cmdk | H (dev audience) | M | Focus trap / Esc / restore focus; hide hints on touch; lazy-load | Getting common; differentiate by actions |
| 5 | **Ticket "For hire." card + "You?" spotlight** | derolez.dev | H (memorable, hiring intent) | L–M | Spotlight must not hide content from screen readers | No |
| 6 | **Bio / summary length toggle** (Default / Long) | leerob.com | H for recruiters | L | Segmented control semantics (`aria-pressed` / tabs) | No |
| 7 | **Card → detail morph (View Transitions)** | Codrops "Preview to full content" (concept); API: cross-doc Chrome/Edge 126+, Safari 18.2+, Firefox 144+ partial; 87.78% global | H | L–M | Progressive enhancement; disable under reduced motion | Not yet |
| 8 | **Scroll-linked progress / scroll indicator** (CSS `animation-timeline: scroll()`) | Corentin `ScrollIndicator`; caniuse: Chrome 115+, Safari 26+, Firefox 160+, 87.22% | M (long case studies) | L | Decorative: `aria-hidden` | Mild |
| 9 | **Sticky TOC with scroll-spy** | Josh Comeau articles; Brittany nav; Attio | H | L (IntersectionObserver) | Use `aria-current`; don't steal focus | No |
| 10 | **Focus-dim list hover** (hover/focus one row, others fade) | brittanychiang.com | M | L (CSS `:has()`) | Must also trigger on `:focus-visible` | Yes, as the Brittany look |
| 11 | **Filter chips with counts + URL state** | Dennis /work (Design⁷ / Development¹¹); Kit; Webflow | H | L–M | Empty states; announce result count | No |
| 12 | **List ↔ grid view switch** | Dennis /work; Corentin `ViewSwitcher`; Claude customers | M | L–M | Persist choice; toggle-button semantics | Mild |
| 13 | **In-view muted video loops** (`preload=metadata`, `#t=0.01` first-frame poster, pause off-screen) | rauno.me/craft (68 videos) | H (shows real UI motion) | M (encoding) | Data cost on mobile (respect Save-Data); WCAG 2.2.2 for loops over 5 s alongside content: pause control or reduced-motion stop | No |
| 14 | **Blur-up placeholders** | rauno.me/craft | M | L | Reserve dimensions (CLS) | No |
| 15 | **Cursor-following image preview on list rows** | Dennis work list; Codrops ImageRevealHover | M | M | Hover-only → `(hover:hover)`; never the only way to see media | Yes (agency staple) |
| 16 | **Magnetic buttons** | Dennis "Live site" disc; Codrops/GSAP hub "magnetic" demos | L–M | L | Vestibular motion; disable on touch / reduced motion | **Yes** |
| 17 | **Custom cursor / crosshair / flashlight** | rauno.me crosshair; Corentin `Cross.js`; Josh 404 flashlight | L (except one scoped moment) | L–M | Hides the native cursor, input lag; offer an off switch like Josh's "Disable flashlight effect" | **Yes** |
| 18 | **Name marquee** (infinitely scrolling name) | Dennis hero | M (identity) | L | WCAG 2.2.2 if over 5 s with no pause; stop under reduced motion | **Yes** |
| 19 | **Text scramble / split-letter reveals** | Codrops terminal-type hover (2024) and many others | L | L–M | Screen readers read garbage unless `aria-label` + `aria-hidden` spans; CLS | **Yes** |
| 20 | **Multilingual "Hello" preloader** | Dennis intro | L | L | Delays content/LCP perception | **Yes** |
| 21 | **Theme toggle with no-flash + themed dark** | Josh Comeau; Lynn Fisher; next-themes | M | L | Flash of the wrong theme; contrast in both themes | Toggle itself: no |
| 22 | **Viewport readout + grid overlay toggle (Alt+G)** | corentinbernadou.com ("1440px × 900px", "Toggle grid (Alt+G)") | M (craft flex for a dev) | L | Shortcut conflicts; keep it discoverable | Mild (Swiss-style trend) |
| 23 | **HUMAN / MACHINE text-mode switch** | basement.studio → `/ai/home`; Aino "TEXT MODE" | H (AI screening, perf fallback, a11y) | L–M | Keep content parity; `rel=alternate` | Not yet |
| 24 | **UI sound effects + toggle** | Josh "Disable sounds"; Goodgrowth (Codrops 2026) | L for hiring | M | WCAG 1.4.2 if audio auto-plays over 3 s; default **off** | Niche |
| 25 | **Live presence count** ("Online ⁽⁷⁾") | basement.studio | L | M–H (realtime backend) | Privacy, cost | Niche; skip |

**Worth it for this portfolio:** 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 23, plus 21 done properly. **Optional single "signature" moments:** 22, or a contained 17 on the 404 only. **Skip:** 15–20, 24, 25 [opinion].

### Cross-cutting rules (apply to every pattern)
- Wrap hover effects in `@media (hover: hover) and (pointer: fine)`. On touch, the default state must already show the info [expert, MDN `@media/hover`].
- `prefers-reduced-motion: reduce` disables non-essential motion. WCAG 2.3.3 (AAA) cites this media query as a sufficient technique [expert].
- Any auto-moving, blinking or scrolling content that starts automatically, lasts over 5 s and sits next to other content needs pause/stop/hide (WCAG 2.2.2, **Level A**). This applies to marquees, loops and carousels [expert].
- Corentin's component list is a useful map of the 2026 "craft vocabulary" [expert, Codrops 2026-03-05]: Availability badge · Cross cursor · Dimensions tracker · GridHelper · LocaleTime · ScrollIndicator · ViewSwitcher. Pick 3–4, not all of them [opinion].

## Sources

**Live sites (captured 2026-10-05; screenshots in `inspirations/img/ui-*.jpg`)**
- https://brittanychiang.com
- https://zenorocha.com
- https://dennissnellenberg.com
  - https://dennissnellenberg.com/work
  - https://dennissnellenberg.com/work/twice
- https://derolez.dev
- https://corentinbernadou.com
- https://rauno.me
  - https://rauno.me/craft
- https://www.joshwcomeau.com
  - https://www.joshwcomeau.com/css/center-a-div/
- https://leerob.com
- https://olaolu.dev
- https://paco.me
- https://antfu.me
- https://lynnandtonic.com
- https://emilkowal.ski
- https://taradash.me
- https://basement.studio
  - https://basement.studio/ai/home

**Mobbin (web)**
- Command palettes:
  - [Vapi](https://mobbin.com/screens/593d7acd-2e16-4365-bcd6-02ce52f48f3b)
  - [Juicebox](https://mobbin.com/screens/2af813bf-0129-45d1-81ed-069edee76e16)
  - [Magnific](https://mobbin.com/screens/e22e26e2-f813-4f1e-beda-43c9ecf26419)
  - [Devin](https://mobbin.com/screens/e37a4e69-9a61-4f36-803d-edbd89c1229d)
  - [Frame.io](https://mobbin.com/screens/7bf0c9af-dd42-4511-a35e-15e097df461b)
- Menus:
  - [Open](https://mobbin.com/screens/a1869a59-77fb-4ff5-8149-527f1fb06747)
  - [ZARA](https://mobbin.com/screens/fab9fd81-4397-423b-a03a-0c5c778c92fa)
- Case-study grids:
  - [Claude](https://mobbin.com/sites/sections/f18b1527-0a32-4297-900f-ab86377fda22)
  - [Ramp](https://mobbin.com/sites/sections/dcb1dbee-7909-4cd8-9dbc-6074fa11f09c)
  - [Webflow](https://mobbin.com/sites/sections/318e00ee-2fd4-49f4-92fc-88aa402b934a)
  - [Retool](https://mobbin.com/sites/sections/fa831f0a-a0f3-4608-9a83-b16654def417)
  - [Fiasco](https://mobbin.com/sites/sections/4ed7c118-a866-41fa-824c-32a24323c927)
  - [Locomotive](https://mobbin.com/sites/sections/280c1a2d-41d4-4495-a4bd-816763c93ad3)
  - [Aino work](https://mobbin.com/sites/sections/aee9192a-eebd-4223-989c-64543cf5ec44)
- Case-study detail:
  - [Dovetail metadata](https://mobbin.com/sites/sections/93f952db-3d57-42d4-a50b-302a4b4fab50)
  - [Attio TOC](https://mobbin.com/sites/sections/7866659c-1438-4186-8ec4-500d137ba8b1)
  - [Better Stack TOC](https://mobbin.com/sites/sections/e7e957c6-5a4a-4cd8-831b-7f0a65f19d87)
- Certifications:
  - [Dovetail](https://mobbin.com/sites/sections/3ee471e1-fbad-429e-953e-57a309b5ebfd)
  - [Linear](https://mobbin.com/sites/sections/a9b9de76-cd1f-45c8-8a09-a65013b57589)
  - [Mural](https://mobbin.com/sites/sections/67449691-5625-444d-a2c6-79247168bc3f)
  - [Miro](https://mobbin.com/sites/sections/49ef29d7-9efd-4672-9784-cef76f57ebe1)
- Timelines:
  - [Büro](https://mobbin.com/sites/sections/bcad6cf8-5eb5-4590-bb1f-b8f4d4ecfb88)
  - [Hims](https://mobbin.com/sites/sections/7c8a38c3-254e-4c0f-9aa9-b3bb8daf9ff7)
  - [Wise](https://mobbin.com/sites/sections/56d6864d-7fa5-4649-85cd-a2730ff775ce)
  - [Slash](https://mobbin.com/sites/sections/2acef3f3-6363-43c3-b1f8-9c457b424f27)
- Footers:
  - [Structured](https://mobbin.com/sites/sections/cf954a98-4f2e-41d3-b2a1-168e4ba0108d)
  - [Feather](https://mobbin.com/sites/sections/8b7c16ff-9fcf-414a-90d1-3eb469c45ade)
  - [Cursor](https://mobbin.com/sites/sections/956c4125-2886-463c-9c81-772bfa1bc974)
  - [Resend](https://mobbin.com/sites/sections/9301c687-40d0-4d8d-bbb8-b1325bac2679)
- Testimonials:
  - [Clay](https://mobbin.com/sites/sections/70de8420-3d32-4e9a-90ef-b2881b615669)
  - [Notion](https://mobbin.com/sites/sections/07426824-d84a-45a5-a53a-efd241efa233)
- Skills analogs:
  - [ClickUp](https://mobbin.com/sites/sections/bb3f7978-3e19-438c-a1ac-7fdec49dc8a9)
  - [Vercel](https://mobbin.com/sites/sections/6f09f09a-ddb8-4581-ba7c-603a1d7920c7)
  - [Kit](https://mobbin.com/sites/sections/8b3b4364-9a16-4530-a943-484d5e8977d9)
  - [Lattice](https://mobbin.com/sites/sections/2006d3b7-193b-4953-82c6-561f459bf832)
- Contact:
  - [Aino](https://mobbin.com/sites/sections/1083cf3c-a197-4ee7-9632-e9bfe0d4e416)
  - [Ragged Edge](https://mobbin.com/sites/sections/5f1d322f-b76b-4468-90ef-ab85700b0c44)
  - [Hex](https://mobbin.com/sites/sections/1ffa00ba-4d8b-45bf-bedb-8132cec47e34)
- Toasts:
  - [Mintlify](https://mobbin.com/screens/773c3d56-7b5b-4df3-ab2c-0ca63adb005d)
  - [Shopify](https://mobbin.com/screens/8a523434-0a78-4e51-b2d2-54f0d126426d)
- About:
  - [Ada](https://mobbin.com/sites/sections/3eb52aa7-420a-4211-ba9b-5793316410d6)
  - [Kalstore](https://mobbin.com/sites/sections/5e1e6047-eef1-417c-b42b-c7ab44205e35)
  - [incident.io](https://mobbin.com/sites/sections/67e11461-af20-4b7e-8e9a-8f0cdc669a8d)
- 404 / error:
  - [Acctual](https://mobbin.com/screens/e9cb3c9c-8b9d-458e-9bc5-54af312ca2da)
  - [Contractbook](https://mobbin.com/screens/e556dced-1023-41a8-a567-7a4d24570b72)
- Language:
  - [GetYourGuide](https://mobbin.com/screens/35db6784-f3c0-475b-9acd-321bb179e68f)

**Galleries & interaction references**
- https://recent.design (godly.website redirects here)
- https://land-book.com/design/portfolio
- https://minimal.gallery/tag/portfolio/
- https://onepagelove.com/genre/portfolio
- https://www.siteinspire.com/websites/category/portfolio
- https://httpster.net
- https://www.bestfolios.com/portfolios
- https://www.awwwards.com/awwwards/collections/menu/
- https://tympanus.net/codrops/hub/tag/hover/
- https://tympanus.net/codrops/tag/portfolio/
- https://tympanus.net/codrops/2026/03/05/inside-corentin-bernadous-portfolio-swiss-inspired-layouts-webgl-geometry-and-thoughtful-motion/
- https://tympanus.net/codrops/2026/08/27/goodgrowth-boot-sequences-spinning-discs-and-the-art-of-the-portfolio/
- https://github.com/codrops/ImageRevealHover/

**Docs / expert**
- https://caniuse.com/cross-document-view-transitions
- https://caniuse.com/mdn-css_properties_animation-timeline_scroll
- https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover
- https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
- https://github.com/dip/cmdk
- https://www.npmjs.com/package/kbar
- https://www.joshwcomeau.com/react/dark-mode/
- https://www.smashingmagazine.com/2022/05/designing-better-language-selector/
- https://developers.google.com/search/docs/specialty/international/localized-versions
- GitHub issues/PRs titled "add a command palette (Cmd+K)" on personal portfolios, e.g. https://github.com/PBartrina/paubartrina.cat/issues/233 (used as a signal that the pattern is spreading)

Not covered: no live PL/EN bilingual developer portfolio was verified, so the language-switcher advice rests on expert docs and Mobbin SaaS analogs. Hover, motion and timing behaviour was judged from static captures, attributes and a few interactions, not frame-by-frame recordings. Perf numbers (LCP/INP) for the reference sites were not measured; that belongs to the perf agent. Awwwards-winning developer portfolios and art direction are left to their dedicated agents. Testimonial and certification patterns come from SaaS sections, because none appeared on the captured dev-portfolio pages. Codrops demos after its Cloudflare block and the godly.website catalogue (now recent.design, a feed rather than a filterable portfolio gallery) were not explored in depth.
