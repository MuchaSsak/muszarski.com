# Subpage Patterns: Blog, CV, My Life, Work Index, Legal, 404

Date: 2026-10-05

Scope: every page except home and `/work/<slug>` case studies (those are covered in `2026-10-05-project-showcase-patterns.md`, `2026-10-05-ui-patterns-galleries.md` and the synthesis). This file does not repeat them. Where a pattern was already captured there (Josh Comeau's sticky TOC, Brittany Chiang's experience rows, the 404s of zenorocha / olaolu / paco / Josh, the "CV · PDF" label), it is only referenced.

Baseline: the user's other project, PstrykWeb, already ships a signed blog with an author page (`context/pstryk-turborepo/apps/pstrykweb.pl/src/components/blog/*`, `src/data/authors.ts`, `src/lib/seo.ts`; reasoning in `.claude/project-info/landing/seo.md` §18). It already does:
- one `Author` record that feeds the byline, the "about the author" box, the author page, and the `Person` in `BlogPosting` and `ProfilePage` (same `@id`);
- `rel="author"` bylines, "Published" and "Updated" dates (Updated only when content changes), reading time;
- a `<details>` TOC that opens and sticks from 1024 px, dated sources under each post, an AI-use "how this was made" line, 2–3 related posts and RSS;
- drawn SVG covers that re-tint with the theme.

**Reuse that model.** This file covers what to change for a personal, three-locale developer site.

## TL;DR

1. **The blog's SEO opportunity is measurable.** Of 10 well-known personal developer blogs probed, only **1** (Maggie Appleton) emits `Article` JSON-LD on posts. Only 2 emit any JSON-LD at all. 5 of 10 post pages have no canonical, and most say `og:type=website` [measured]. Company blogs do it properly: Vercel, Stripe, GitHub and CSS-Tricks, 4 of 6 [measured].
   - So full hygiene is a real edge over peers: BlogPosting + BreadcrumbList + one `Person` `@id`, visible Published/Updated dates that match the markup, per-locale RSS, sitemap `lastmod`, and an OG image per post.
   - But those blogs rank on authority and links, not markup. **The real levers are content and internal links between posts and case studies.**
2. **Post layout to build:**
   - breadcrumb, a single H1, a dek, a byline row (author · Published · Updated · reading time · "Also in: Polski");
   - a TL;DR box, then a prose column of 65–75 ch;
   - a sticky TOC on wide screens and a `<details>` TOC on phones;
   - build-time Shiki code with Copy, callout asides, and interactive demos as lazy islands with Play/Pause (Sam Rose, Emil Kowalski);
   - dated sources, an author box with an AI-use line, series/related posts, and copy-link + LinkedIn share.
3. **Blog index: a dated list beats a card wall** for a growing personal blog: title, date, one-line description, topic (overreacted, TkDodo, Lee Robinson).
   - Experiment with art in only two places: one featured pillar post with a large illustration, and **a generative line-art SVG cover per post in the site's art direction** (Linear's monochrome per-post drawings; PstrykWeb's SVG scenes). These cost about 2–6 KB each and suit "Living Blueprint".
   - Maggie Appleton's "garden" filters (topic × growth stage × type) are worth stealing once there are 15+ posts.
4. **`/cv` = one typed data file rendered two ways.**
   - Web: Bartosz Jarocki's open-source CV (cv.jarocki.me) is the closest proven template. It is Polish, Next.js, 9.7k★, with a print stylesheet, `ProfilePage` + `Person` JSON-LD and a 2-page A4 print.
   - PDF: print the same route with Playwright `page.pdf({format:'A4', tagged:true, outline:true})` at build time, so the content cannot drift. A CI test diffs the PDF text against the data.
   - Creativity lives in the web view only: a year rail, skills ↔ roles cross-highlighting, case-study links.
   - The PDF stays single-column and text-based with standard headings, for ATS parsers.
5. **`/my-life`: an editorial page with personality**, built from:
   - a real photo;
   - a dated "Now" block;
   - a **bento of hobby cards**, each with one concrete fact (Josh Comeau's about page);
   - a travel map, where SVG is the default and a lazy three.js globe an option (levels.io's nomad globe);
   - a small lightbox gallery;
   - "say hi" via Discord and Messenger.

   Steal swyx's **Short / Medium / Long intro + "Copy intro"** and a pronunciation chip ("Muszarski = MOO-shar-skee 🔊").
6. **`/work/` index** (scope added mid-task):
   - Flagship cards on top, then **a filterable archive list** built as server-rendered HTML with every project present. Type chips with counts and stack chips, with state in the URL. Rows: Year · Project · Type · Built with · Links (Case study / Live / Code / "Private (NDA)").
   - Steal Brittany Chiang's archive table, Locomotive's "All projects ⁴³" count, and Zach Leatherman's **honest maintenance-status column** for boilerplates.
   - Fix what Brittany gets wrong: she hides the stack and link columns on mobile [measured].
7. **`/privacy`: "lawyer grade" content in a readable shell:**
   - H1, then an "Effective / Version / Last updated" row;
   - **"The short version" box** (Plausible's TL;DR, Craft);
   - a numbered TOC (Linear), sticky on desktop and `<details>` on mobile;
   - numbered clauses whose headings are plain questions (37signals);
   - a full GDPR art. 13 checklist;
   - "Changes" and **"Previous versions"** (Vercel, Wise). Better still, publish the policy as Markdown in the public repo so git history is the version log (37signals, GitHub site-policy).

   Mark it `noindex,follow` and leave it out of the sitemap. `/terms` is probably unnecessary for a portfolio. [legal check needed]
8. **404:**
   - a **real 404 status**: antfu.me and Linear return **200** for missing pages, and vercel.com redirects to login [measured];
   - `noindex`, and no canonical pointing to home (Stripe) or to the bad URL itself (Kent C. Dodds);
   - echo the path, "Did you mean…" (fuzzy match against the route list built at build time), search / ⌘K, and 3 suggestions;
   - one small art-direction gag ("SHEET 404 — DRAWING NOT FOUND") that never blocks.
9. **Components:**
   - **TOC:** `@toc-cn/table-of-contents` (scroll-spy + mobile collapsible) or a ~1 KB hand-rolled IntersectionObserver.
   - **Code:** build-time Shiki, so no registry component is needed. `@afterglow/code-block` and `@easeui/code-block` if a component is wanted.
   - **Timeline:** `@dashboardcn/timeline` or `@hirael/timeline` (0–1 deps, server-renderable).
   - **Lightbox:** `@hirael/lightbox` (Radix Dialog) or `@motion-lexicon/image-lightbox` (Motion).
   - **Masonry:** CSS columns; `@hirael/masonry` only if order matters.
   - **Tabs / accordion / toggle-group:** shadcn defaults.
   - **Filters:** hand-build. `@ecomcn/filter-panel` is overkill, `@stealth/filter-grid` pulls 5 remote deps, and `@kobra/*` is paid.

## Method and source quality

- **Live probes (Playwright 1.63, Chrome headless, 2026-10-05):** 60+ pages at 1440×900 and/or 390×844 (isMobile). Script: `scratchpad/tools/page-probe.mjs`. For each page it extracted:
  - JSON-LD (types and key fields);
  - title, description, canonical, robots, `og:type`, `article:*`, hreflang, RSS;
  - H1–H3 outline;
  - prose measure: the width of a body paragraph divided by the average glyph width, giving characters per line;
  - TOC, code blocks, copy buttons, asides, share links, `rel=author`, reading time, "updated" text;
  - print-CSS presence;
  - for legal pages: numbered headings and "previous versions" links;
  - for 404s: HTTP status, path echo, search, and canonical.

  The `/work` pages used a separate probe (`page-work.mjs`): tables and columns, filter buttons with counts, and which columns are hidden on mobile.
- **Screenshots:** 45 files `inspirations/img/page-*.jpg` (JPEG q70). This is slightly over the ~40 cap because the `/work` scope was added mid-task; 5 low-value shots were deleted to compensate. Cookie banners were auto-dismissed where possible; a few frames still show them (Stripe).
- **Mobbin (MCP, web sections):** 3 queries (article page, privacy page, about/collage). Strong for SaaS blog and legal shells; nothing for personal CVs.
- **Registry (Shoogle MCP):** 9 keyword queries. `bunx shadcn view` was run on 15 candidates to read their dependencies, files and remote registry dependencies. Nothing was installed.
- **Docs fetched directly:** Google Article structured data (updated 2026-09-08), ProfilePage (2026-09-08), publication dates (2025-12-10). **WebSearch used: 2 of the shared ~6** (resume-from-JSON repos; ATS parsing). The ATS results are **vendor and content-marketing blogs**, so treat them as low-confidence consensus.
- **Tags:**
  - [measured] = observed live today
  - [doc] = primary documentation
  - [vendor] = vendor blog
  - [opinion] = my judgment
  - [legal check needed] = must be confirmed by a lawyer or official source

---

## 1. Blog: `/[locale]/blog` and `/[locale]/blog/<slug>`

### 1.1 What the probes show (posts)

| Site (post probed) | JSON-LD | canonical | og:type | Measure (cpl @ size/line-height) | TOC | Code | Notable |
|---|---|---|---|---|---|---|---|
| joshwcomeau.com `/react/server-components/` | none | **no** | website | **80** @ 18/27 Wotfard | sticky "Table of contents" (11 anchors) | 13 `pre`, 13 copy buttons | 9 `aside` callouts, 99 inline SVGs, "Last updated" line, RSS, email signup |
| overreacted.io `/a-complete-guide-to-useeffect/` | none | **no** | none | **79** @ 16/28 Merriweather | none | 62 `pre` | Starts with a "# TLDR" section; `#` heading anchors; "Pay what you like" button above the fold; index has **no H1** |
| maggieappleton.com `/garden-history` | **WebSite + Person + Article** graph with `@id`s | yes | article | **78** @ **22/44** Canela Text | left sticky "Table of Contents" (28 anchors) | — | "ESSAYS · EVERGREEN" eyebrow, dek, topic tags, **"Planted 6 years ago / Last tended 5 years ago"**; `article:published/modified_time`; author = `/about` |
| kentcdodds.com `/blog/aha-programming` | none | yes | article | 92 @ 18/31.5 | none | copy buttons | **H1 is the site name, the post title is an H2** (SEO anti-pattern); a promo toast covers the article on mobile |
| emilkowal.ski `/ui/great-animations` | none | no | website | 83 @ 16/26 | none | 2 | Interactive demos in bordered "stage" cards with **Replay**; credit line under each demo; `/ui` index returns 404 |
| tkdodo.eu `/blog/practical-react-query` | none | yes | website | 98 @ 20/36 Inter (wide) | — | 3 + copy | **Series box** ("#1 Practical React Query · CURRENT … All 33 parts in the series"), **"Last Update: 2023-10-21"** banner, but `article:modified_time` = published (they disagree), Ctrl K search, EthicalAds |
| samwho.dev `/load-balancing/` | none | no | article | 96 @ 18.7/28 | none | — | **Simulations with restart / speed slider / pause** controls; **coloured legend words inline** ("● requests", "● drop"); newsletter field |
| antfu.me `/posts/why-reproductions-are-required` | none | no | none | 84 @ 16/28 | — | — | Reading time "9min", share links |
| paco.me `/writing/browser-default-font-size` | none | yes | website | — | — | 2 | 57-word note; post `<meta description>` is the site tagline (duplicate) |
| leerob.com (home) | **Person** (jobTitle, worksFor, sameAs, image) | yes | none | 76 @ 17/27 | — | — | Posts now live on x.com; the site is a hub |
| vercel.com/blog post | **BlogPosting** (authors as Person with jobTitle + url, dateModified, publisher Org) | yes | website | 80 @ 18/28 Geist | — | — | `robots: max-image-preview:large` |
| stripe.com/blog post | **Article+BlogPosting**; index = **CollectionPage + ItemList** | yes | none | 99 @ 18/28 | — | — | Author photo, name and role in a left rail beside the first paragraph; breadcrumb "Blog / Product"; **21 H1s** on the page (nav headings marked up as H1) |
| github.blog post | **TechArticle + BlogPosting** | yes | article | — | "Table of Contents" | — | Author archive pages `rel=author`, "Related posts", 8-minute read |
| css-tricks.com post | Yoast-style graph (Org, WebSite, WebPage, ImageObject…) | yes | article | 72 @ 19.7/33.5 | "In this article" | 11 | Live CodePen iframes (5) |
| smashingmagazine.com post | none | yes | article | 80 @ 20.4/33.5 | — | — | "11 min read", `article:author` → author page |
| linear.app/now | none | yes | — | — | — | — | **One monochrome generative line-art illustration per post** (consistent system); "Name · date" under each card; category tabs + search + RSS |

All rows [measured]. Patterns:
- Comfortable measure clusters at **72–84 cpl**, with body 16–22 px and line-height 1.5–2.0.
- TkDodo (98) and Stripe (99) run long and read worse [opinion].
- Personal blogs skip structured data entirely; company blogs do it.

### 1.2 Index patterns

- **Dated list, grouped by year or simply reverse-chronological:**
  - overreacted: coloured title, date, one-line subtitle; 59 H2s on one page; no H1.
  - TkDodo: "Latest Posts" with date, reading time, tags.
  - Lee Robinson: "Notes / Blogs" with `YYYY-MM`.

  Fastest, scales to hundreds, best for scanning [measured]/[opinion].
- **Garden** (maggieappleton.com/garden) [measured]:
  - a "167" count above the H1 "The Garden", plus a dek;
  - TOPICS scroller + "All Growth Stages" + "All Types" selects;
  - a mixed masonry of essay cards with covers, notes as text-only rows, podcasts with a thumbnail;
  - "Over 5 years ago" relative dates.

  Rich, but only pays off with 15+ entries of mixed types.
- **Search-first** (kentcdodds.com/blog) [measured]: H1 + "Search posts **214**" field with a live count, a 3D illustration, and a featured article. Good at scale, overkill at launch.
- **Card grid with a consistent illustration system** (linear.app/now) [measured]: every post gets a monochrome line drawing in one style, which makes a 3-column grid look curated. This is the template for "experiment with illustrations" without hiring an illustrator: generative SVG from a seed per post [opinion].
- **Mobbin SaaS analogs** [data]:
  - [Notion](https://mobbin.com/sites/sections/dc58e1c0-2cf6-4031-b9e4-cd8d852aabb1): "← All posts", "Published … in For Teams", a left meta rail with reading time + share.
  - [Teachable](https://mobbin.com/sites/sections/33780f80-6b9c-4199-98db-f1272cfea9ae): breadcrumb + "by Name | 13 min read" + "Published" + a boxed "In this article".
  - [monday](https://mobbin.com/sites/sections/cd29c418-cd35-44e3-a85f-5b35b996ca90): a left share rail that includes **print**, plus "Updated on".
  - [Pitch](https://mobbin.com/sites/sections/5c087f48-be52-4fb4-b5c4-87202563bbff): centred author with role.

### 1.3 Recommended spec: `/[locale]/blog` (index)

Blocks in order:
1. **Header.**
   - Eyebrow `Blog · 12 posts` (count from content).
   - H1 "Writing" (localised).
   - A one-line promise naming the topics: full-stack · AI/automation · three.js · freelancing & shipping in Poland.
   - RSS link (per locale) + "Follow on LinkedIn".
2. **Featured / pillar post (1).** Large card: generative cover, topic, title, dek, reading time. The whole card is the link, with one `<a>` and no nested links.
3. **Topic chips** (Maggie's TOPICS):
   - Each chip links to a real URL, `/blog/topic/<topic>`. It is indexable only once the topic has ≥ 3 posts; until then it is `noindex,follow`.
   - On mobile it is a horizontally scrolling row.
4. **Post list:**
   - Reverse-chronological, grouped by year with sticky year labels on mobile.
   - Row: title (H2 or H3), one-line description, `time` (Published), reading time, topic. A small 40–64 px cover thumb only from ≥ 768 px.
   - **Optional experiment:** a list ↔ grid toggle where the grid shows the generative covers (Linear style). Persist the choice in `localStorage`.
5. **Series** block, shown when any series exists: TkDodo-style "Part 1 of N".
6. **Footer strip:** a 2-line author mini-bio (links to `/cv` and `/my-life`) + RSS. A newsletter only after ≥ 5 posts [opinion].

- **Mobile:** single column; chips scroll; covers hidden in list mode; target ≥ 44 px rows.
- **SEO:**
  - `Blog` (or `CollectionPage` + `ItemList` like Stripe) with `blogPost` items carrying `@id`s;
  - real pagination URLs (`/blog/page/2`, self-canonical) and no infinite scroll;
  - hreflang only between locales that actually have the same list (see §1.5);
  - per-locale RSS `<link rel="alternate" type="application/rss+xml">`.

### 1.4 Recommended spec: `/[locale]/blog/<slug>` (post)

Blocks in order:
1. **Breadcrumb** Home › Blog › Topic, with `BreadcrumbList` JSON-LD.
2. **Header.**
   - Topic eyebrow (+ "Series: … · Part 2/4").
   - **A single H1 = the post title.** Never the site name, which is Kent's anti-pattern.
   - A dek (Maggie).
   - **Byline row:** 32 px photo + "Mateusz Muszarski" (`rel="author"` → `/cv`) · `Published <time>` · `Updated <time>` (only if the content changed; same value as `dateModified`; Google: label it and keep visible and structured dates consistent [doc]) · reading time · **"Also in: Polski · Español"** (only for real translations).
3. **Cover** (optional): generative SVG inline (aria-hidden) or AVIF with width/height. Never the LCP bottleneck.
4. **TL;DR box:** 2–4 bullets (overreacted). Helps skimmers, recruiters and AI overviews.
5. **Body.**
   - Prose column `max-width: 68ch`, body 18 px desktop / 17 px mobile, line-height 1.6–1.7 (inside the measured 72–84 cpl cluster).
   - Headings get `#` anchor links (overreacted, antfu).
   - **TOC:** at ≥ 1280 px a sticky left or right rail with scroll-spy and `aria-current` (Maggie left, GitHub right). Below that, a closed `<details>` "On this page" under the TL;DR (the PstrykWeb pattern).
   - **Code:** Shiki at build (rehype) with zero client highlighting; filename/language tab, Copy button (an island), line highlights and diff marks, horizontal scroll inside the block only.
   - **Asides** (Josh's 9 per post): Note / Tip / Warning / "Why I chose X over Y", done as `<aside>` with a heading.
   - **Sidenotes** on wide screens (swyx about page), falling back inline on mobile.
   - **Figures** with captions; diagrams as inline SVG in the site's line style.
   - **Interactive demos:**
     - client islands hydrated on visibility, each in a bordered "stage" with Replay / Play-Pause / speed (Emil, Sam Rose);
     - under `prefers-reduced-motion` they start paused;
     - a static poster first, so no CLS;
     - a credit line when inspired by someone (Emil does this).
6. **"Changelog of this post"** (when updated): 1–3 dated lines. This makes "Updated" honest; TkDodo shows "Last Update" but his meta disagrees.
7. **Sources:** dated list (the PstrykWeb `PostSources` pattern).
8. **Author box:**
   - photo, 2–3 sentence bio (role + what he builds);
   - **"How this post was made"** (AI-use honesty line, the PstrykWeb pattern);
   - links: CV, GitHub, LinkedIn;
   - **one CTA:** "Hiring? → Contact / CV".
9. **Series nav** (prev/next part) **or Related posts** (2–3, same topic) + **"Related project → /work/<slug>"** when the post explains something from a case study. This is the strongest internal link for the hiring goal.
10. **Share:** Copy link (with "Copied" `aria-live`), native `navigator.share` on touch, LinkedIn. No counters.
11. **Discuss:** "Reply on LinkedIn / Bluesky" link, or email. No comment system [opinion]; Zach Leatherman shows "Reply on… Mastodon · 3 replies".

- **Desktop:** three tracks: TOC (220–260 px) | prose (68 ch) | margin (sidenotes and figures can break wide to ~900 px).
- **Mobile:** one column; TOC in `<details>`; code blocks full-bleed with internal scroll; demos scale down or swap to a video loop with controls.
- **JS budget:** the post is server-rendered with ~0 KB of required JS. Islands only for TOC spy, Copy and demos. Fonts ≤ 2 families.

**SEO block (per post):**
- **`BlogPosting` JSON-LD:**
  - `headline` and `description`;
  - **`image` with 16:9, 4:3 and 1:1 variants**, ≥ 50K pixels each [doc];
  - `datePublished` / `dateModified` with timezone;
  - `author: {"@id": "https://<domain>/#person"}` with `name` = name only (no job titles in it, multiple authors listed separately [doc]) and `url`;
  - `publisher` = the same Person;
  - `mainEntityOfPage`, `inLanguage`, `keywords`, `wordCount`, `isPartOf` (the Blog `@id`).
- Plus `BreadcrumbList`.
- **Meta:**
  - `og:type=article`, `article:published_time`, `article:modified_time`, `article:author`, `article:tag`;
  - a per-post OG image generated at build (1200×630, title + cover);
  - `robots: max-image-preview:large` (Vercel and GitHub use it);
  - self canonical.
- **Feeds and sitemaps:** per-locale RSS/Atom with full content; sitemap `lastmod` = `dateModified`.
- **Content rules:**
  - descriptive slugs that are never changed (redirect if they must be);
  - every post links ≥ 2 other posts or case studies, and every case study links back to the posts about it;
  - alt text on every meaningful image;
  - one H1 and a strict H2/H3 hierarchy;
  - add `/llms.txt` + text mode later (see synthesis).

### 1.5 Locales for the blog (en default, pl, es)

- Write in EN by default. Publish PL/ES **only for posts actually translated** (hand-reviewed). Do not generate empty or auto-translated locale URLs: thin duplicates waste crawl budget and confuse hreflang [opinion; Google's hreflang rules: [doc](https://developers.google.com/search/docs/specialty/international/localized-versions)].
- The PL/ES index lists native posts first, then EN posts marked with an "EN" badge that link to the EN URL. Hreflang applies only to the translated pairs.
- "Also in: Polski" sits in the byline (reciprocal `hreflang`, `x-default` = EN).

### 1.6 Author presence (single author)

- **One `Person`** (`@id` `https://<domain>/#person`) referenced from:
  - the home page (`WebSite.publisher`)
  - every `BlogPosting.author` and `publisher`
  - the `/cv` `ProfilePage.mainEntity`
  - the `/my-life` `AboutPage.about`

  Maggie Appleton runs exactly this graph [measured].
- **Fields:** `name`, `url`, `image` (real photo), `jobTitle`, `knowsAbout` (React, Next.js, TypeScript, three.js, AI automation…), `knowsLanguage` (pl, en, es), `address` (PL), `sameAs` (GitHub, LinkedIn, X/Bluesky, Stack Overflow if any), `alumniOf` if applicable.
- **No separate `/blog/author/...` page.** That made sense for PstrykWeb's multi-author model. Here bylines link to `/cv`, which carries `ProfilePage` (Google lists "personal blog About Me pages" as valid ProfilePage uses [doc]). The author box also links `/my-life` [opinion].
- Keep the "how this was made" honesty line from PstrykWeb; Google's people-first guidance asks who, how and why.

### 1.7 Steal / skip (blog)

- **Steal:**
  - Maggie's `@id` graph, "Planted / Last tended" dates and dek;
  - overreacted's TLDR-first;
  - Josh's asides and Copy on every code block;
  - TkDodo's series box;
  - Sam Rose's and Emil's controllable demo stages;
  - Linear's one-style illustrations;
  - PstrykWeb's sources + AI-use line.
- **Skip:**
  - H1 = site name (Kent);
  - promo toasts over the text (Kent, mobile);
  - ads (TkDodo);
  - `og:type=website` on posts;
  - missing canonicals;
  - "Last update" text that disagrees with the meta (TkDodo);
  - duplicate site-tagline descriptions (paco);
  - 21 H1s (Stripe);
  - infinite scroll;
  - a newsletter popup.

Screenshots:
- `page-blog-maggie-garden-1440/390`, `page-blog-maggie-post-1440`
- `page-blog-overreacted-post-1440`
- `page-blog-tkdodo-post-1440/390`
- `page-blog-emil-post-1440`
- `page-blog-samwho-post-1440`
- `page-blog-kcd-index-1440`
- `page-blog-stripe-post-1440/390`
- `page-blog-linear-index-1440`
- prior: `ui-joshw-*`

---

## 2. CV: `/[locale]/cv` (+ PDF from the same data)

### 2.1 What the probes show

| Example | Layout | Pairing with PDF | SEO | Print CSS | Notes |
|---|---|---|---|---|---|
| **cv.jarocki.me** (Bartosz Jarocki, Wrocław; OSS `BartoszJarocki/cv`, **9,674★**, pushed 2026-03-03) | Single column, max ~680 px: name (H1), one-line role, "Wrocław, Poland, CET", icon contact row, square photo right. Sections: About · Work Experience (Company + **stack chips** + right-aligned years; title in mono; 1-line summary + bullets) · Education · Skills · Side projects | No file. **The page is the PDF** via browser print: 2 A4 pages, 248 KB; tagged with Playwright [measured] | **`ProfilePage` + Person** (jobTitle, worksFor, alumniOf, `hasOccupation[]`, contactPoint, address, sameAs), `og:type=profile`, generated OG image, canonical | yes. Print hides the command-menu hint, some chip rows and project links [measured] | "Press Ctrl+J to open the command menu"; data lives in one file (`resume-data.tsx`). Popular template, so the look is common: retheme it |
| **zachleat.com/resume** | Résumé as **quantified achievement sentences** ("Public Speaker in 9 countries: 24 conferences, 20 meetups…"), inline peer quotes with avatars, "ON THIS PAGE" mini-TOC, sections Community / Professional / Education | Web only | canonical; no JSON-LD | yes | Shows an "**updated data on <date>**" stamp |
| **karpathy.ai** | **Year rail + logo tile + paragraph** per role (2024 → 2011), big round photo, icon links | Web only | none (no OG, no canonical) | no | The most scannable "creative" timeline; plain HTML |
| **registry.jsonresume.org/thomasdavis** (JSON Resume) | LaTeX-like theme from the open JSON Resume schema | Same JSON → many themes → HTML/PDF | **no H1**, no meta | no | The schema is the reusable idea; the rendered page is weak SEO |
| **webpage-pdf-resume.vercel.app** (Astro + PandaCSS template) | Classic résumé, rule-lined section headings | **Floating "View as PDF"** → a static `/…-resume.pdf` | no canonical | yes | All data in `src/data.json` |
| brittanychiang.com (covered before) | Experience rows on home → "View Full Résumé" | PDF link | — | — | — |
| **read.cv** | — | — | — | — | **"Deployment Paused" (HTTP 402)** [measured]. Don't depend on third-party CV hosts |

[measured] unless noted. Pattern: the strongest dev CVs are **one data file → one HTML page whose print output is the PDF**: Jarocki, the Astro template, and good-software-engineer-resume ("website and PDF from a single resume.json", [repo](https://github.com/KrammerJake/good-software-engineer-resume.com)).

### 2.2 ATS notes for the PDF [vendor, low confidence, but consistent]

- A **text-based PDF** with selectable text is fine for Workday, Greenhouse and Lever in 2026. Image or flattened PDFs fail.
- **Single column.** Multi-column and table layouts are the most cited parse failures. Workday is the strictest.
- **Standard headings:** "Work Experience", "Education", "Skills", "Certifications", "Languages".
- **Contact details in the body.** Some parsers skip page headers and footers. Use real text for the email, not only an icon.
- **Consistent dates** ("Jan 2022 – Present"). File name `Mateusz-Muszarski-CV-EN.pdf`.

Sources:
- [applyarc Workday](https://applyarc.com/blog/workday-ats-resume-optimization)
- [applyarc Greenhouse](https://applyarc.com/blog/greenhouse-ats-resume-optimization)
- [hireflow](https://hireflow.net/blog/can-ats-read-pdf-resumes)
- [quickresumeai](https://www.quickresumeai.com/blog/best-resume-format-for-ats-2026)

### 2.3 Generation pipeline (one source of truth)

- **Data:** `content/cv.ts`, typed.
  - Per-locale strings `{ en, pl, es }` for the summary, role titles and bullets.
  - Shared fields: dates, companies, stack, URLs.
  - A JSON Resume–compatible export at `/cv.json` is free and machine-readable for AI screeners [opinion].
- **Web:** `/[locale]/cv` renders from `cv.ts` (RSC, zero required JS).
- **PDF:** at build, Playwright opens `/[locale]/cv?print=1` and calls `page.pdf({ format: 'A4', printBackground: false, tagged: true, outline: true })`. `tagged` and `outline` are in the Playwright 1.63 typings and default to false [measured in `playwright-core/types`].
  - Post-process with `pdf-lib` to set Title, Author, Subject, Keywords and Lang.
  - Output: `/cv/mateusz-muszarski-cv-{en,pl,es}.pdf`.
  - Budget: ≤ 200 KB and ≤ 2 pages.
- **CI guard:**
  - extract the PDF text (`pdf-parse`) and assert every role, date and bullet from `cv.ts` is present;
  - fail on more than 2 pages;
  - this enforces "exactly the same content".
- **Alternatives:**
  - `@react-pdf/renderer`: precise control, but it is a **second layout that can drift**.
  - Typst/LaTeX: best typography, but a second toolchain.

  Prefer printing the route [opinion].
- **Print stylesheet:**
  - `@page { size: A4; margin: 12mm 14mm }`;
  - `@media print`:
    - hide nav, locale switch, buttons, Copy;
    - black on white, body 10–10.5 pt;
    - `break-inside: avoid` per role;
    - links shown as text where they aren't obvious;
    - no backgrounds;
    - icons replaced by text labels.

### 2.4 Recommended spec: `/[locale]/cv`

1. **Utility bar** (screen-only, sticky on desktop):
   - locale switch EN · PL · ES (route-preserving, autonyms);
   - **Download PDF** ("EN · 2 pages · 160 KB · updated Oct 2026", `type="application/pdf"`, `hreflang`);
   - Print;
   - Copy email.
2. **Header:**
   - H1 = name;
   - role line ("Full-stack developer · AI automation · three.js");
   - "Poland · CET";
   - **availability date** (the same config value as the home page);
   - text contact row: email, website, GitHub, LinkedIn;
   - photo optional, but **identical in web and PDF** [opinion: common in PL, optional in EN markets].
3. **Summary:** 3 lines.
4. **Work Experience** (standard heading):
   - each entry: Company · Role · Remote/City · dates (right-aligned), then 2–4 **achievement bullets with numbers**, then ≤ 6 stack chips;
   - freelance and own startups are explicit entries;
   - each has an optional "Case study ↗" link that also prints as a URL;
   - **web-only creative layer:** a year rail in the left margin (Karpathy) and a hairline timeline.
5. **Selected projects:** the 4 flagships, 1 outcome line each + link.
6. **Skills:**
   - grouped text lists: Languages / Frontend / Backend / AI & automation / 3D / Infra & tooling;
   - **web-only:** clicking a skill highlights the roles and projects that used it (`?skill=react`). No bars.
7. **Education & Certifications:** "Verify ↗".
8. **Languages:** Polish (native), English, Spanish, with levels.
9. **Footer:**
   - "Last updated <date>";
   - the PL version carries a RODO clause if still expected [legal check needed: art. 22¹ KP since 2019 limits what employers may request, yet many postings still ask for the clause];
   - "Generated from `cv.ts` · view source".

- **Desktop:** one centred ~720 px column (Jarocki). Never two content columns, so the print stays ATS-safe.
- **Mobile:** the same order. The utility bar collapses to "PDF · EN ▾". Text links instead of icon-only rows.
- **SEO:**
  - `ProfilePage` (`dateCreated`/`dateModified`) with `mainEntity` → Person `@id` (§1.6), `og:type=profile`;
  - an OG image generated from `cv.ts`;
  - title "Mateusz Muszarski — Full-stack Developer CV";
  - reciprocal hreflang.
  - **PDFs:** send an HTTP `Link: <…/cv>; rel="canonical"` header so the HTML wins in results [doc, from memory: verify in Google's canonicalization docs], or send `X-Robots-Tag: noindex` on the PDF.
- **Don't:** let the PDF diverge from the page; use skill bars; add a form here.

Screenshots:
- `page-cv-jarocki-1440/390`, `page-cv-jarocki-print-1440` (print emulation)
- `page-cv-zachleat-1440`
- `page-cv-karpathy-1440`
- `page-cv-jsonresume-1440`
- `page-cv-astro-pdf-1440`

---

## 3. Personal: `/[locale]/my-life`

### 3.1 What the probes show

| Example | Pattern | Steal | Skip / caution |
|---|---|---|---|
| **joshwcomeau.com/about-josh** | Dark hero (H1 "Hi there! I'm Josh.", 3 short career paragraphs, cut-out photo, cloud divider), then a **bento of fact cards**: map "6,192 km away from your current location", pronouns, **pronunciation "kəum əʊ" 🔊**, height with a stick figure, a keycap card for OSS ("~600,000 downloads/month"), a desk photo, "learned to code by voice", talk photo, mascots | One concrete fact + one visual per card; pronunciation audio; facts that double as proof | IP-distance needs geolocation (privacy). The mascots are his brand |
| **swyx.io/about** | Photo + "Hey, I'm swyx." + "Pronounced 'swicks'" + **Intro: Short · Medium · Long + Copy intro**; a "WHAT BRINGS YOU HERE?" numbered router (… **Bio & photos** … The longer story); italic margin **sidenotes**; **`ProfilePage` + Person** JSON-LD | Intro-length tabs + copy; the router; a press-kit link | "Live readers" pill |
| **maggieappleton.com/about** + **/now** | Huge serif name + "Designer, anthropologist, and mediocre developer."; "A LITTLE CONTEXT" + portrait; `/now` = a **dated log** (Aug 2026, Jan 2026…) | Dated Now entries; a humble one-liner | A 34k px tall Now page. Show the last 3 + archive |
| **antfu.me/media** | Intro ("29,000 days…"), **tabs anime · drama · movie · game · song · book**, ruled two-column lists | The cheapest movies/music/games lists | — |
| **antfu.me/photos** | Full-width photo stream: **579 images, 51k px tall** [measured] | Photos as an artifact | Weight. Cap at 12–24, lazy, AVIF, dimensions set |
| **brianlovin.com/listening** | Table "synced from Spotify every hour": art · Song · Artist · Album · Played | Live data is charming | Cron + token + staleness. Use a static "On repeat ×5" monthly [opinion] |
| **taniarascia.com/me** | About + couple photo, Contact, "What I'm Doing Now", Tools, Publications, Books | Hobbies stated inline, plainly | — |
| **nomads.com/@levelsio** | **3D globe with travel arcs** + bio + stats row | The natural three.js moment for /my-life | Heavy page (878 imgs, 5 canvases): build light |
| **sive.rs/now**, **coryzue.com/now** | /now convention: dated "as of October 2025", "Previously" | Short, dated, honest | — |
| kentcdodds.com/about | Values, talks, interviews, awards (14k px) | Values list | Too long; H1 = site name |
| Mobbin [Bento](https://mobbin.com/sites/sections/d7286d46-1782-4d8f-87e0-7fab6482682f) · [Readymag](https://mobbin.com/sites/sections/fbdeae79-9c95-4a76-bba0-8efa93b731b2) · [Daydream](https://mobbin.com/sites/sections/ab9e85f5-5ef0-4eee-a30f-e5647df30371) | Widget grid (map "Where I live", Spotify…); scattered collage; one quirky fact per person | Bento proportions; one-fact copy | Overlapping collage breaks on mobile |

### 3.2 Recommended spec: `/[locale]/my-life`

Goal: personality without diluting the hiring message. Indexed but secondary: linked from the footer and the About area, not the main nav.

1. **Hero:**
   - real photo (AVIF, `fetchpriority=high`, the LCP);
   - H1 "Life outside the editor";
   - 2–3 sentences;
   - **pronunciation chip** "Muszarski · /muˈʂar.ski/ 🔊" (~5 KB audio);
   - **Intro: Short · Long + Copy** (swyx; tabs with `aria-selected`).
2. **Now** ("Updated Oct 2026"): 3–5 bullets (training goal, current build, reading/watching, next trip). Older entries go to an archive or are dropped.
3. **Interests bento:** 8 cards, a 3–4 column grid on desktop and 1 column on mobile, mixed sizes, no overlap. Each card: title + a line illustration in the site style + 1–2 sentences + **one concrete fact or link**.
   - **Calisthenics:** current skill or goal + a photo.
   - **Motorcycles:** the bike + a favourite route.
   - **Travelling:** links to the map.
   - **Eclectic music:** "On repeat": 5 tracks.
   - **Movies:** a top-5 list or Letterboxd.
   - **Gaming with friends:** what the group plays + "join us on Discord".
   - **Self-improvement:** 3 books or habits.
   - **Christianity:** one sincere short line (how much is the user's call) [opinion].
   - **Parties / friends:** a collage card.
   - **Web dev as a hobby:** links to `/work?type=side`.

   That is 10 topics; merge two to get 8.
4. **Travel map:**
   - default: inline SVG with visited countries filled + stats ("14 countries · 3 continents"), ~30–60 KB;
   - enhancement: a lazy three.js globe with arcs (Mid/High tier, on visibility or interaction); reduced motion falls back to the SVG.
5. **Photos:**
   - 9–12 in CSS-columns masonry;
   - a focus-managed **lightbox** (Esc / arrows / swipe / captions);
   - lazy-loaded, dimensions set, alt text;
   - no autoplay carousel.
6. **Media lists** (optional): antfu-style tabs Movies · Music · Games, 5–10 rows each.
7. **Say hi:**
   - Discord handle + Copy (or an invite link);
   - Messenger `m.me/<username>`;
   - "For work, email/LinkedIn is faster" + the email.
8. **Back links:** Work · CV.

- **SEO:**
  - `AboutPage` with `about` → Person `@id`;
  - `og:type=profile` with the real photo as OG image;
  - a descriptive title;
  - hreflang;
  - descriptive alt text and file names.
- **Privacy:** no live location or IP distance. Spotify/YouTube embeds only behind click-to-load facades, so no cookies.
- **Skip:** a 500-photo stream, live Spotify sync at v1, autoplay media, the pulsing "online" dot.

Screenshots:
- `page-life-josh-about-1440/390`, `page-life-josh-about-cards-1440`
- `page-life-swyx-about-1440`
- `page-life-maggie-about-1440`
- `page-life-antfu-media-1440`, `page-life-antfu-photos-390`
- `page-life-brian-listening-1440`
- `page-life-tania-me-1440`
- `page-life-levels-nomads-1440`

---

## 4. All-projects index: `/[locale]/work/` (scope added mid-task)

### 4.1 What the probes show

| Example | Form | Filters / counts | Mobile | Steal / skip |
|---|---|---|---|---|
| **brittanychiang.com/archive** | **Table** Year · Project · Made at · Built with (chips) · Link (domain ↗); 46 rows; H1 "All Projects"; "← Brittany Chiang" | none | Collapses to Year + Project ↗ and **hides Made at, Built with and Link** [measured] | Steal: the table, domain as link text, back link. Skip: losing the stack on mobile; no canonical |
| **jesperlandberg.com/full** | **Inline dot-separated names**, centred, no metadata; H1 "Index — every project by Jesper Landberg" | FEATURED / FULL toggle | same | Steal: the spectacle ↔ plain-list toggle. Skip: zero metadata |
| **clementgrellier.fr/overview** | One project per screen: video frame + name + "Live website" + → | — | bottom tab bar Home · Work · About | A fast skim, but **not scannable**. Skip as the index |
| **antfu.me/projects** | Grouped by category under giant outlined headings; icon + name + one-liner; 47 items; GitHub · Recent Releases · Yak Map buttons | grouping | single column | Steal: grouping for many small items. Skip: low-contrast grey text |
| **locomotive.ca/en/projects** | Text-only list Name · Industry · Location | **"All projects ⁴³"** dropdown | stacked | Steal: superscript count, text-first |
| **basement.studio/showcase** | Card grid | **Grid / Rows** toggle + category filters; **`CollectionPage`** JSON-LD | — | Steal: view toggle + CollectionPage |
| **zachleat.com/projects** ("Is this still being maintained??") | **Sortable health table**, 127 rows: Neglect % · Name (+ blog post, GitHub/npm) · Popularity (download sparklines) · Versions ("218 versions in 9 years", latest + age) · Audit · Issues · PRs; "Open Source Health 97" | sort buttons | the table scrolls inside its region (637 px in 390) | Steal for boilerplates: **honest status + last-release age**. Skip: the density |
| dennissnellenberg.com/work (prior track) | list ↔ grid, chips with counts | yes | — | see `ui-dennis-*` |
| lynnandtonic.com/archive | Every past **site version** (v.XIX…v.I) with year + "Case Study" | — | — | Idea: list the old space portfolio as "v1" [opinion] |

### 4.2 Recommended spec: `/[locale]/work/`

1. **Header:**
   - breadcrumb;
   - H1 "All work";
   - a data-driven summary: "4 case studies · 23 smaller projects · 2019–2026";
   - a CV link.
2. **Flagships:** 4 cards (the synthesis §4 card standard) → `/work/<slug>`. 2×2 on desktop, a stack on mobile, no carousel.
3. **Filter bar** (sticky on desktop; on mobile a scrolling chip row + a "Stack" sheet):
   - **Type** (single-select with counts): All ²⁷ · Client ⁶ · Product ⁴ · Internship ¹ · Side ¹² · Boilerplate ⁴;
   - **Stack** (multi-select, AND, top 8 + More), with live counts;
   - **Sort:** Newest · Oldest · A–Z;
   - **View:** List | Grid;
   - **URL state** (`?type=side&stack=react,three`) so filtered views are shareable;
   - "Showing 7 of 27 · Reset" in `aria-live`.
4. **Archive list** (default; `<table>` on desktop):
   - **Year · Project** (name + one-line outcome) **· Type · Built with** (≤ 4 chips) **· Status** (Live / Maintained / Archived / Experiment + last-commit month from the GitHub API at build) **· Links** (Case study → · Live ↗ · Code ↗ · "Private (NDA)");
   - **mobile:** each row is a 2–3 line block (Year · Type / Name / chips + link icons). **Never drop stack or links.**
5. **Grid view:** poster cards with the same metadata. Muted loops only for flagships, in view.
6. **Footer CTA:** "Something not written up? Ask me" + CV.

- **Mechanics:**
  - server-render every row; filtering is progressive enhancement;
  - a small island (`useSearchParams` + `router.replace`, or CSS `:has()`);
  - View Transition reorder only without reduced motion.
- **SEO:**
  - `CollectionPage` + `ItemList` of `CreativeWork` / `SoftwareSourceCode` (`name`, `url`, `codeRepository`, `programmingLanguage`, `dateCreated`, `creator` → Person `@id`);
  - small projects stay rows (no thin pages);
  - filtered URLs `noindex,follow` (or canonical to `/work/`);
  - hreflang;
  - an OG image with the counts.
- **Skip:** cursor-follow thumbnails as the only preview, hover-only info, client-only lists, pagination under 60 items.

Screenshots:
- `page-work-brittany-archive-1440/390`
- `page-work-jesper-full-1440`
- `page-work-clement-overview-1440/390`
- `page-work-antfu-projects-1440`
- `page-work-locomotive-1440`
- `page-work-zachleat-projects-1440`

---

## 5. Legal: `/[locale]/privacy` (+ maybe `/terms`)

### 5.1 What the probes show

| Example | Readability devices | Versioning | Notes |
|---|---|---|---|
| **stripe.com/privacy** (served `/en-pl/privacy` to a PL IP) | Left **legal-docs nav** (Privacy Policy & Centre, DPA, Sub-processors, Cookies…); **numbered H2s** "1. Personal Data we collect…" (28 numbered headings); "Last updated: April 28, 2026"; Defined Terms section; 99 cpl (too wide) | "Last updated" only | **Translation banner:** "this translation is informational only; the English version prevails" (in Polish). 23.7k words; 89 hreflang alternates |
| **linear.app/privacy** & **/terms** | Mono "EFFECTIVE DATE: MARCH 17, 2025"; intro with the key consent sentence in **bold**; **numbered mono TOC** ("1. What this Privacy Policy Covers…"); 76 cpl @ 17/27; "**If you have a disability, you may access this Privacy Policy in an alternative format**" | "Changes to this Privacy Policy" anchor | 3.6k words: proof that short is possible |
| **vercel.com/legal/privacy-notice** | "On this page" TOC; 82 cpl; 27 H2s; `<details>` for long sections | **"Changes" + "Previous Versions"** anchors + a **changelog post** for legal updates | indexable |
| **37signals.com/policies/privacy** (Basecamp) | Plain-English intro ("…We never sell your data."), bulleted TOC of **question-style headings** ("What we collect and why", "When we access or disclose your information", "Artificial intelligence"), 79 cpl @ **22 px** | "Changes and questions" section. Policies are also **public on GitHub** (`basecamp/policies`, pushed 2026-10-04), so git history is the change log | The most readable; brand colour as page background |
| **docs.github.com … github-general-privacy-statement** | Docs shell: breadcrumb, left site-policy nav, right "IN THIS ARTICLE" (18 anchors), **"Copy markdown"**, heading anchor links; "Effective date: April 27, 2026" | Source in **`github/site-policy`** repo (CC0, 2,175★): every change is a PR | Lawyer-grade content, dev-native versioning |
| **plausible.io/privacy** | **"TL;DR: For plausible.io visitors, we do not use cookies and we do not collect any personal data…"**, then sections by role (visitor vs customer), legal basis (GDPR), subprocessors; 76 cpl | "Last updated: September 2026" | 1.2k words. The closest model for a cookieless portfolio |
| Mobbin [Wise](https://mobbin.com/sites/sections/6be19668-a33c-436b-af1c-45b827f66c96) | "**Version Number: 2.0**", "**Our old Privacy Policy is available here for 60 days**", "**A PDF of this policy available for printing**", numbered TOC | explicit version number + old version | [data] |
| Mobbin [Craft](https://mobbin.com/sites/sections/186d65b3-ec98-4a7b-af3d-5e200b92debf) / [Loom](https://mobbin.com/sites/sections/48f8ae6c-9f70-4a00-901e-746e05f8e83e) / [Upwork](https://mobbin.com/sites/sections/628dc701-15b6-4444-9517-591272c30e8f) | Craft: **TLDR** box + left TOC with search. Loom: "**Privacy for Humans**" companion page. Upwork: numbered TOC + **tables** (categories of data × sources × purposes) | — | [data] |

[measured] unless marked [data].

### 5.2 Recommended spec: `/[locale]/privacy`

1. **Header:**
   - H1 "Privacy policy";
   - a meta row: **Effective <date> · Version 1.0 · Last updated <date>**;
   - **language note:** state which language version is binding, the way Stripe does [legal check needed: the controller is in PL, so likely PL binding and EN/ES as translations].
2. **"The short version" box** (5 bullets, Plausible/Craft):
   - who I am (controller + contact);
   - what I collect (emails you send; cookieless aggregate analytics if chosen in D6; server logs at the host);
   - no ads, no selling, no profiling;
   - how long I keep it;
   - your rights + how to exercise them.
3. **TOC:** numbered (Linear/Wise).
   - Desktop: sticky left rail with scroll-spy.
   - Mobile: a closed `<details>` "Contents" under the summary.
4. **Numbered clauses §1…§N.**
   - **Headings phrased as questions** (37signals): "1. Who is responsible for your data?", "2. What data do I collect and why?"…
   - Each clause starts with a 1-sentence plain summary in muted text, then the precise legal text.
   - Heading anchors with "copy link".
   - **GDPR art. 13 checklist:**
     - controller identity and contact;
     - purposes + legal basis per purpose (art. 6(1)(b/f/a));
     - recipients/processors (hosting e.g. Vercel, email provider, analytics), using a Upwork-style table **Data · Purpose · Legal basis · Retention · Processor**;
     - transfers outside the EEA and safeguards (EU–US DPF / SCCs);
     - retention;
     - rights (access, rectification, erasure, restriction, portability, objection, withdrawing consent);
     - **right to complain to the Prezes UODO**;
     - whether providing data is required;
     - no automated decision-making.
   - **Cookies / local storage** section:
     - e.g. theme preference in `localStorage`, which is necessary or user-requested [legal check needed: PKE art. 399, see synthesis D6];
     - click-to-load embeds on `/my-life`.
5. **Changes & previous versions:**
   - a dated list of versions, each linking to an archived copy;
   - **preferably the policy is Markdown in the public repo** (`content/legal/privacy.<locale>.md`) and the page links "View change history on GitHub" (37signals, GitHub site-policy);
   - an optional "Print / PDF" link (Wise).
6. **Contact block:** email, response time; Linear's "available in an alternative format on request" line.

- **Typography:** 68–75 ch, 17–18 px, line-height 1.6–1.7, numbered headings in tabular figures. Avoid Stripe's 99 cpl.
- **SEO:**
  - `robots: noindex, follow`;
  - left out of the sitemap;
  - still linked from the footer (users and Google's "who is behind this site" signals);
  - self canonical;
  - hreflang is unnecessary on noindex pages [opinion].
- **`/terms`:** a portfolio with no accounts, payments or service has little to put in terms [opinion].
  - If D5 = freelance offer, or there is a newsletter or contact form, consider a short "Terms of use / Regulamin". Polish UŚUDE may require a *regulamin* for electronically supplied services [legal check needed].
  - Otherwise a "Legal notice" section inside `/privacy` (operator name, contact, NIP if he trades) is enough.

Screenshots:
- `page-legal-stripe-privacy-1440`
- `page-legal-linear-privacy-1440`
- `page-legal-basecamp-privacy-1440/390`
- `page-legal-github-privacy-1440`

---

## 6. 404

### 6.1 What the probes show (new examples; zenorocha, olaolu, paco and Josh were covered in the UI track)

| Site | HTTP | What it shows | Technical notes |
|---|---|---|---|
| **github.com** | 404 | Star Wars parallax scene (Octocat Jedi, landspeeder) "404 — This is not the web page you are looking for." + a **search field "Find code, projects, and people"** + Contact Support · GitHub Status | Canonical = the bad URL; the illustration is the brand |
| **kentcdodds.com** | 404 | "404 - Oh no, you found a page that's missing stuff." + **path echo** ("'/this-does-not-exist' is not a page on kentcdodds.com. So sorry.") + "Search the site" + **"Looking for something to read?"** post cards + a looping video of Kent | Canonical = the bad URL (should be none); promo toast again |
| **smashingmagazine.com** | 404 | "Uh-Oh, We Lost Your Page! (404)" + mascot cat + apology + "return to the front page or use search" + **"WHAT ELSE CAN YOU DO?"** list | Canonical `/404.html` |
| **developer.mozilla.org** | 404 | "Page not found" | `noindex, nofollow` |
| **maggieappleton.com** | 404 | host default "404: NOT_FOUND / This page doesn't exist" (no nav, no links) | A dead end on a beautiful site |
| **tkdodo.eu**, **overreacted.io**, **cv.jarocki.me** | 404 | Minimal framework default (1–2 links) | overreacted sets `noindex` |
| **stripe.com** | 404 | "Page not found" + popular links (Pricing, Careers, Docs, API, Status, Support) | **Canonical → home** (wrong signal) |
| **antfu.me** | **200** | "404 #" | **Soft 404** |
| **linear.app** | **200** | Empty page (SPA shell, 1 word) | **Soft 404** |
| **vercel.com** | 200 | Redirects unknown paths to `/login?next=…` | Not a 404 at all |

All [measured].

### 6.2 Recommended spec: `not-found` (per locale)

1. **Status:** a **real HTTP 404** (Next `notFound()` / `not-found.tsx`); `noindex`; **no canonical**; title "Page not found · Mateusz Muszarski".
2. **H1** "This page doesn't exist" + **path echo** (`/blog/thre-js` isn't on this site).
3. **"Did you mean…?"** Fuzzy-match the path against a route manifest built at build time (all posts, projects and pages per locale; Levenshtein or trigram, ~2 KB). Show the top 1–3. This is a cheap, dev-flavoured, genuinely helpful touch [opinion].
4. **Search / ⌘K:** a button that opens the global palette **pre-filled with the path words** (UI track recommendation).
5. **Go-to links:** Work · Blog · CV · Contact (Copy email), plus **3 suggestions**: latest post + 2 flagship projects (Kent's "Looking for something to read?").
6. **One delightful element** in the art direction, e.g. Blueprint: a title-block stamp "SHEET 404 OF ∞ — DRAWING NOT FOUND", with a small SVG of a torn drawing sheet. Static by default; any motion respects reduced motion and has an off switch (Josh's "Disable flashlight").
7. **"Broken link? Tell me"**: a `mailto:` with subject "Broken link: <path>" and the referrer (Smashing's "What else can you do?"). Also log 404 paths (host analytics) and fix or redirect them.

- **Locales:** under `/pl/…` and `/es/…` show the localised copy. For a root-level unknown path, show EN with "Polski · Español" links. Never auto-redirect.
- **Mobile:** everything fits in 1–1.5 screens; the suggestions stack.
- **Skip:** soft 404s, redirect-to-home, a canonical to home, full-screen games that hide the links, auto-playing video.

Screenshots:
- `page-404-github-1440`
- `page-404-kcd-1440`
- `page-404-smashing-1440`
- prior: `ui-404-joshw-desktop`

---

## 7. Registry components (Shoogle → `bunx shadcn view`, nothing installed)

Reject-list check per the skill: install targets, `envVars`, remote fetches, unknown or paid registries. Weights are source size from `view`, not gzipped bundle size. **Re-measure after install.**

| Need | Name | Registry | Install | Deps / weight | Fit |
|---|---|---|---|---|---|
| TOC + scroll-spy | table-of-contents (block) | @toc-cn | `bunx shadcn@latest add @toc-cn/table-of-contents` | lucide-react; shadcn button, collapsible, item, scroll-area, separator; 3 files / 23.5k chars; client; no env/fetch | **Good**: scroll-spy + animated SVG tree indicator + **mobile sticky collapsible** matches the post spec. Retoken. If heavy, hand-roll ~1 KB of IntersectionObserver + `<details>` (PstrykWeb already does this) |
| Scroll-spy (headless-ish) | scroll-spy | @interior | `bunx shadcn@latest add @interior/scroll-spy` | motion; 1 file / 9.9k | OK because Motion is in the stack (synthesis) |
| Scroll-spy | scroll-spy | @diceui | — | — | `view` returned **not found** at the registry today: skip |
| Code block | code-block | @afterglow | `bunx shadcn@latest add @afterglow/code-block` | shiki, lucide-react; regDeps @afterglow/theme, use-copied; 3 files / 5.4k; **server-side Shiki** | Good model (server highlight + client copy), but its theme is "terminal/phosphor": retoken or copy the idea |
| Code block | code-block | @easeui | `bunx shadcn@latest add @easeui/code-block` | clsx, tailwind-merge, lucide-react; 3 files / 7.6k; **no highlighter dep** (light keyword colouring) | Good for small snippets in case studies; too naive for long posts |
| Code block | code-block | @hirael | `bunx shadcn@latest add @hirael/code-block` | lucide-react; shadcn badge, button + remote `hirael.com/r/copy-button.json`; 14.7k; line numbers, highlights, **diff gutters**, collapsible max-height | Feature-rich; dependency-free tokens |
| Code block | — | (no registry) | `rehype-pretty-code` or `@shikijs/rehype` in the MDX pipeline + a 1 KB Copy island | build-time only | **Recommended for the blog**: zero client highlighting cost [opinion] |
| Code block | code-block | @cult-ui | `bunx shadcn@latest add @cult-ui/code-block` | not inspected | tabs + copy + animations (mentioned only) |
| Prose | typography plugin | (npm) | `@tailwindcss/typography` (`@plugin` in Tailwind 4 CSS) | CSS only | Standard `prose` base; override measure, sizes, colours. `@ncdai/typography` `view` returned **0 files**: skip |
| Timeline (CV year rail) | timeline | @dashboardcn | `bunx shadcn@latest add @dashboardcn/timeline` | **0 deps**; 1 file / 4.5k; server-renderable | **Good**: restyle as the year rail |
| Timeline | timeline | @hirael | `bunx shadcn@latest add @hirael/timeline` | class-variance-authority; 4.1k; server | Good alternative (labelled time/title/description parts) |
| Timeline | timeline | @glint-ui | — | not inspected; "progress line fills as you scroll" | Skip: scroll-driven decoration |
| Lightbox | lightbox | @hirael | `bunx shadcn@latest add @hirael/lightbox` | @radix-ui/react-dialog, lucide-react + remote use-controllable-state; 15.7k; zoom/pan, swipe, captions, thumbnail strip | **Good** for /my-life (Radix focus trap) |
| Lightbox | image-lightbox | @motion-lexicon | `bunx shadcn@latest add @motion-lexicon/image-lightbox` | motion; 17k; "managing focus and keyboard browsing" | Good if Motion is already loaded on the page |
| Lightbox | lightbox | @interior | `bunx shadcn@latest add @interior/lightbox` | motion; 19.2k; "zoom that returns where it started" | Alternative |
| Masonry | masonry | @hirael | `bunx shadcn@latest add @hirael/masonry` | no npm deps + remote compose-refs; 6.9k; order-preserving | Use only if reading order matters; otherwise CSS `columns` (0 JS) |
| Filters (/work) | filter-panel (block) | @ecomcn | `bunx shadcn@latest add @ecomcn/filter-panel` | lucide-react; shadcn checkbox, input, slider, switch; 34k; **URL-state facets with counts** + server parser | Overkill (e-commerce price sliders); borrow the URL-param parser idea |
| Filters | filter-grid | @stealth | — | @base-ui/react, motion + **5 remote regDeps** | Skip |
| Filter chips | filter-chips | @kobra | — | **paid** ("Generate a registry token") | Skip (never authenticate) |
| Tabs / accordion / toggle group | tabs, accordion, toggle-group | @shadcn | `bunx shadcn@latest add tabs accordion toggle-group` | Radix primitives | Defaults: /my-life intro length + media tabs, /work type filter + list/grid toggle, legal mobile TOC (or native `<details>`) |
| Reading progress | scroll-progress | @balick | `bunx shadcn@latest add @balick/scroll-progress` | not inspected | Optional; a CSS `animation-timeline: scroll()` bar is cheaper |

---

## 8. Sources

**Blog (probed 2026-10-05)**
- https://www.joshwcomeau.com/react/server-components/
- https://overreacted.io/
  - https://overreacted.io/a-complete-guide-to-useeffect/
- https://maggieappleton.com/garden
  - https://maggieappleton.com/garden-history
- https://kentcdodds.com/blog
  - https://kentcdodds.com/blog/aha-programming
- https://emilkowal.ski/ui/great-animations
- https://tkdodo.eu/blog
  - https://tkdodo.eu/blog/practical-react-query
- https://leerob.com
- https://paco.me/writing/browser-default-font-size
- https://antfu.me/posts/why-reproductions-are-required
- https://samwho.dev/load-balancing/
- https://vercel.com/blog
  - https://vercel.com/blog/ai-gateway-jev-model-launch
- https://linear.app/now
- https://stripe.com/blog
  - https://stripe.com/blog/where-pricing-is-headed
- https://github.blog/engineering/architecture-optimization/improving-site-performance-by-shipping-more-css/
- https://www.smashingmagazine.com/2026/09/desktop-wallpaper-calendars-october-2026/
- https://css-tricks.com/css-random-function-polyfill/
- frontendmasters.com/blog returned **403** to the headless browser, so it was not analysed.

**CV**
- https://cv.jarocki.me
  - https://github.com/BartoszJarocki/cv
- https://www.zachleat.com/resume/
- https://karpathy.ai
- https://registry.jsonresume.org/thomasdavis
  - https://jsonresume.org
- https://webpage-pdf-resume.vercel.app
  - https://github.com/roginfarrer/webpage-pdf-resume
- https://github.com/KrammerJake/good-software-engineer-resume.com
- https://read.cv (402)
- https://brittanychiang.com
- ATS (vendor):
  - https://applyarc.com/blog/workday-ats-resume-optimization
  - https://applyarc.com/blog/greenhouse-ats-resume-optimization
  - https://hireflow.net/blog/can-ats-read-pdf-resumes
  - https://www.quickresumeai.com/blog/best-resume-format-for-ats-2026
  - https://owlapply.com/en/blog/ats-friendly-resume-guide-2026-format-keywords-score-and-fixes

**Personal**
- https://www.joshwcomeau.com/about-josh/
- https://www.swyx.io/about
- https://maggieappleton.com/about
  - https://maggieappleton.com/now
- https://antfu.me/media
  - https://antfu.me/photos
- https://brianlovin.com/listening
- https://www.taniarascia.com/me/
- https://www.nomads.com/@levelsio
- https://sive.rs/now
- https://www.coryzue.com/now/
- https://kentcdodds.com/about
- https://manuelmoreale.com/about
- https://ped.ro

**Work index**
- https://brittanychiang.com/archive
- https://jesperlandberg.com/full
- https://clementgrellier.fr/overview
- https://antfu.me/projects
- https://locomotive.ca/en/projects
- https://basement.studio/showcase
- https://www.zachleat.com/projects/
- https://dennissnellenberg.com/work
- https://lynnandtonic.com/archive/
- https://lusion.co/projects (canvas-only, no list)

**Legal**
- https://stripe.com/privacy
- https://linear.app/privacy
  - https://linear.app/terms
- https://vercel.com/legal/privacy-notice
- https://37signals.com/policies/privacy
  - https://github.com/basecamp/policies
- https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement
  - https://github.com/github/site-policy
- https://plausible.io/privacy

**404**
- https://github.com/this-page-does-not-exist-404x/nope
- https://kentcdodds.com/this-does-not-exist
- https://www.smashingmagazine.com/this-does-not-exist/
- https://developer.mozilla.org/en-US/docs/this-does-not-exist
- https://maggieappleton.com/this-does-not-exist
- https://tkdodo.eu/blog/this-does-not-exist
- https://overreacted.io/this-does-not-exist/
- https://stripe.com/this-does-not-exist
- https://antfu.me/this-does-not-exist
- https://linear.app/this-does-not-exist
- https://vercel.com/this-does-not-exist-404

**Mobbin (web sections)**
- Blog article:
  - [monday.com](https://mobbin.com/sites/sections/cd29c418-cd35-44e3-a85f-5b35b996ca90)
  - [Wise](https://mobbin.com/sites/sections/6cb42340-7c5b-4330-b5b0-42061d555f4d)
  - [Teachable](https://mobbin.com/sites/sections/33780f80-6b9c-4199-98db-f1272cfea9ae)
  - [Upwork](https://mobbin.com/sites/sections/ca2c2393-f71b-40a9-ac22-026bab25263f)
  - [Jitter](https://mobbin.com/sites/sections/6cd8def4-aa67-4562-953e-1c7d0c1f50bc)
  - [Notion](https://mobbin.com/sites/sections/dc58e1c0-2cf6-4031-b9e4-cd8d852aabb1)
  - [Canva](https://mobbin.com/sites/sections/5d8202c2-71ef-4513-8852-2569e1c6de0c)
  - [Pitch](https://mobbin.com/sites/sections/5c087f48-be52-4fb4-b5c4-87202563bbff)
- Privacy:
  - [Upwork](https://mobbin.com/sites/sections/628dc701-15b6-4444-9517-591272c30e8f)
  - [ClickUp](https://mobbin.com/sites/sections/bc246468-a583-4199-b5f6-78f7957aa779)
  - [Craft](https://mobbin.com/sites/sections/186d65b3-ec98-4a7b-af3d-5e200b92debf)
  - [Wise TOC](https://mobbin.com/sites/sections/94d4416e-762e-40f3-9edf-8c94ad639673)
  - [Skillshare](https://mobbin.com/sites/sections/7123e604-c885-45fb-866f-d27e756fabc6)
  - [Slack](https://mobbin.com/sites/sections/726896e0-b689-4ad3-ada4-194332689436)
  - [Loom](https://mobbin.com/sites/sections/48f8ae6c-9f70-4a00-901e-746e05f8e83e)
  - [Wise versions](https://mobbin.com/sites/sections/6be19668-a33c-436b-af1c-45b827f66c96)
- About:
  - [Daydream](https://mobbin.com/sites/sections/ab9e85f5-5ef0-4eee-a30f-e5647df30371)
  - [Resend](https://mobbin.com/sites/sections/76fb1eef-783c-46da-9588-ac576cd614ee)
  - [Mother Design](https://mobbin.com/sites/sections/ef9a104a-185e-4bb6-ad68-03ab36f29420)
  - [Melius](https://mobbin.com/sites/sections/56791fa8-e248-47f9-9b5a-6fefd978ed30)
  - [Bento](https://mobbin.com/sites/sections/d7286d46-1782-4d8f-87e0-7fab6482682f)
  - [Readymag](https://mobbin.com/sites/sections/fbdeae79-9c95-4a76-bba0-8efa93b731b2)

**Docs**
- https://developers.google.com/search/docs/appearance/structured-data/article (updated 2026-09-08)
- https://developers.google.com/search/docs/appearance/structured-data/profile-page (2026-09-08)
- https://developers.google.com/search/docs/appearance/publication-dates (2025-12-10)
- https://developers.google.com/search/docs/specialty/international/localized-versions
- Playwright 1.63 `page.pdf` typings (`tagged`, `outline`)

**Baseline:** `context/pstryk-turborepo/apps/pstrykweb.pl/src/components/blog/*`, `src/data/authors.ts`, `src/lib/seo.ts`, `.claude/project-info/landing/seo.md` §18.

**Inspiration notes written:** `inspirations/page-maggie-appleton.md`, `page-tkdodo.md`, `page-samwho.md`, `page-jarocki-cv.md`, `page-zachleat.md`, `page-swyx-about.md`, `page-josh-about.md`, `page-brittany-archive.md`, `page-37signals-policies.md`, `page-vercel-github-legal.md`.

Not covered:
- Real Lighthouse runs of these subpages. The perf track owns budgets; nothing here was scored.
- Recruiter testing of the CV page.
- **Legal correctness:**
  - the policy structure follows GDPR art. 13 from general knowledge;
  - the PKE art. 399, UŚUDE *regulamin*, binding-language and RODO-clause points all need a lawyer or official-source check;
  - the HTTP `rel=canonical` header for PDFs was cited from memory.
- Frontend Masters' blog (403 to headless).
- Medium / dev.to / Hashnode cross-posting strategy (canonical back to the site).
- Newsletter providers.
- Comment systems (deliberately skipped).
- Webmentions setup.
- Per-post OG image generator implementation.
- The `/my-life` hobby facts and photos themselves (content is the user's).
- Registry weights are source-character counts from `shadcn view`, not gzipped bundle sizes.
- Only 3 Mobbin queries; no Mobbin coverage of personal CVs.
