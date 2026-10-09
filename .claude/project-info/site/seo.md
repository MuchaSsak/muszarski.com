# SEO

> Owns: target queries, entity strategy, metadata rules, structured data, crawl/indexing setup, the content
> plan and the domain move. Evidence: `research/2026-10-05-seo-entity-discoverability.md` (current SERPs
> measured 2026-10-05). URL scheme and hreflang mechanics: `i18n.md`. Pages: `structure.md`.

## Where we start (measured 2026-10-05)

- Google (via Startpage) does **not** show his site in the top 30 for "Mateusz Muszarski". Ahead of it:
  another Mateusz Muszarski's Instagram, his Linkoglot Play listing, his LinkedIn. Bing: #10, behind
  business-register scrapers.
- The old site has no indexable body text in raw HTML, no canonical / JSON-LD / robots / sitemap, a 307
  apex→www redirect, and a START gate. Google rewrote its title to "Ready for launch!".
- **The identity is split:**
  - names: "Mateusz" / "Matt" / "Matthew"
  - handles: MuchaSsak / muchassakkk / mat.muszarski
  - hosts: matmuszarski.space (the new site until 2026-10-08, now muszarski.com), plus muszarski.space (lapsed, still linked from the GitHub README)
  - seniority: now consistent: "since 2022" (owner confirmed 2026-10-05; the brief's "~6 years" was wrong)
- **Fixing consistency is lever #1 and costs nothing** (owner actions: open-questions Q25–Q28).

## Target queries

| Query type | Target | Page |
| --- | --- | --- |
| Name (primary) | "Mateusz Muszarski" (+ "developer", "programista", "github") | home (entity home), `/cv/` |
| Name + occupation + place | "Mateusz Muszarski programista <city>" | home, `/cv/` |
| Projects | "Linkoglot", "PstrykWeb developer", "lingui-translate-ai" | case studies |
| Topics (blog) | Claude Code skills/hooks/MCP, Lingui vs i18next, three.js portfolio performance, Astro vs Next, "Claude Code po polsku" | posts |
| NOT a target | "full stack developer Gdańsk" (10/10 job boards; searchers are candidates) | — |

Success signal: Google autocomplete starts completing "mateusz muszarski" to "… developer / programista".

## Entity strategy (P0)

1. **One public story.** Display name "Mateusz Muszarski" everywhere; `alternateName` "MuchaSsak"; drop
   "Matthew". The same seniority line, city line, photo and site link on GitHub (bio, README, blog field), LinkedIn
   (headline, website), npm (`author`, `homepage`), Play Console developer site, Instagram, and the pstrykweb.pl author page.
2. **Home opens with one factual sentence** (name, occupation, place, stack) as static HTML.
3. **JSON-LD graph** with stable ids: `/#person`, `/#website`, `/<locale>/#webpage`.

| Page | Types |
| --- | --- |
| home (each locale) | `WebSite` (name, alternateName) + `ProfilePage` (mainEntity → `#person`) + full `Person` |
| `/cv/` | `ProfilePage` + full `Person` (`hasOccupation`, `hasCredential`, `knowsLanguage`; `alumniOf` only for a finished school) |
| `/work/<slug>/` | `WebPage` + `BreadcrumbList` (+ `CreativeWork`/`SoftwareApplication` with `creator` → `#person`; never fake ratings) |
| `/blog/<slug>/` | `BlogPosting` (author `@id` → `#person`, `url` → author page) + `BreadcrumbList` |
| `/my-life/` | `AboutPage` → `#person` (no private facts in markup) |
| legal | none |

   `Person`: `name`, `alternateName`, `url`, `image` (real square photo ≥ 800×800, same as the avatars), `jobTitle`,
   `description`, `address` (**locality + region + country only, never a street**), `knowsAbout` (Things with
   checked Wikidata ids: TypeScript Q978185, React Q19399674, three.js Q3525922, Next.js Q56062435, Tailwind Q102173844;
   look up each new id), `knowsLanguage`, `hasCredential` (INF.0x, `recognizedBy` CKE; wording from the certificate),
   `sameAs` (every profile in `ELSEWHERE`: GitHub, LinkedIn, npm, Instagram, Facebook, Telegram, Discord [owner
   2026-10-07]; the Google Play and App Store developer pages, `STORES` in `data/site.ts` [owner 2026-10-09]), `worksFor` only for a real employer or his own business.
   The markup must match the visible text.
4. **Bidirectional links:** each profile links to the site and the site links to each profile (`rel="me"`). Owner
   to-do: put muszarski.com in the LinkedIn website field, the Instagram bio, the Facebook intro and the GitHub
   profile. Search Console can't verify social profiles; once a knowledge panel shows, claim it with Google.
5. **Earned mentions (P1):** 3–5 independent links (client credits, npm READMEs, a Tricity meetup write-up, a guest post).
   Credits on his other projects come from the user-level skill `/link-portfolio-author-to-website` (outside this
   repo, 2026-10-08): JSON-LD `creator` → the live `#person` id, `meta creator`, `humans.txt`, one visible footer link;
   client or employer sites only with the owner's written OK. Re-run it on each project after a domain move.

## Metadata rules

- **Titles:** unique, static (never changed at runtime), ≤ ~60 chars, written natively per locale.
  - Home en: `Mateusz Muszarski – Full-stack Developer · TypeScript, React, three.js`
  - Home pl: `Mateusz Muszarski – programista full stack (Pomorskie)`
  - Home es: `Mateusz Muszarski – desarrollador full stack`
  - Inner pages: `<Page> – Mateusz Muszarski`
  - The H1 agrees with the title.
- **Descriptions:** ≤ ~155 chars, factual, per locale. No `meta keywords`.
- **Canonical:** absolute, self-referencing per locale; one host with a 308 from the other; `og:url` = canonical.
  Locale-free addresses (`/cv/`, `/` itself) are 307s by the reader's language and never canonical (i18n.md).
- **OG:**
  - per page × locale, generated at build: `og:image` 1200×630, `og:image:alt`
  - `og:type` article on posts
  - `twitter:card=summary_large_image`
  - `og:locale` + alternates
- **Robots:** `max-image-preview:large` sitewide; legal pages `noindex,follow` (never robots.txt-blocked) and out of
  the sitemap; preview builds `noindex` (`IS_FULL_PRODUCTION`).
- **Favicons:** PNG/ICO ≥ 48 px (Google doesn't list SVG) + SVG + apple-touch 180 + manifest 192/512.
- **PDF CV:** served with `Link: <…/cv/>; rel="canonical"`, `Content-Disposition: attachment`; PDF Title/Author metadata set.
  The sheet (`bun run cv:sheet`, live since 2026-10-08) also writes Subject (the profile), Keywords (the skills),
  Creator (the site URL) and the document language, and keeps the print route `noindex` and out of the sitemap.

## Crawl and indexing setup

- **`robots.txt`:** allow all; `Sitemap:` line; never block Googlebot, Bingbot or OAI-SearchBot. Training bots
  (GPTBot, Google-Extended, ClaudeBot) are the owner's call [Q29].
- **Sitemap:** index + children with hreflang alternates (one route map feeds `<link>` tags and the sitemap);
  `<image:image>` entries for every element marked `data-sitemap-image` (the My life pin board), added after the build
  by `scripts/sitemap-images.mjs` (Google reads `image:loc` only; place and story go in the JSON-LD) [2026-10-07];
  `lastmod` from content dates.
- **Search Console:** Domain property via DNS TXT; submit the sitemap; URL Inspection on home, one case study, one
  post and `/cv/`.
- **Bing Webmaster:** import from GSC + **IndexNow** ping (key file in `public/`) after every deploy.
- **`/llms.txt`:** P2, generated from the CV data; Google doesn't use it. Zero expectation, zero cost.
- **Launch gate** (`apps/web/scripts/launch-gate.mjs`, after every build; also fails on a new-tab link without its
  screen-reader note, `structure.md`): fails on a missing title, description or
  canonical, more than one origin across canonicals / hreflang / og:url / sitemap, JSON-LD that does not parse, a
  broken internal link or #anchor, a missing share image or PDF; in a launch build also on placeholder markers and on
  wrong robots (legal, print and contact-result pages noindex, everything else indexable).

## Built (2026-10-05)

- JSON-LD: `src/lib/schema.ts` (WebSite + ProfilePage + Person on home, ProfilePage on /cv/, CollectionPage on /work/ and
  /blog/, AboutPage on /my-life/, BlogPosting + BreadcrumbList on posts; legal pages none). No credentials in the
  Person until they are real (P11). [2026-10-07] Knowledge-panel pass: home and /cv/ carry the full Person with the
  owner's portrait (`#portrait` ImageObject, `personImageUrl()` in `lib/photos.ts`), `givenName`/`familyName`,
  `hasOccupation`, `nationality`, `email`, `mainEntityOfPage`; profile links carry `rel="me"`; the portrait is an
  800×800 crop of the Vilnius photo. `/my-life/` adds an `ImageGallery` (`galleryNode()`): one `ImageObject` per pin
  board photo with `contentLocation` (Place + country code), `dateCreated`, `description`, and the Person as `about`,
  `creator` and `copyrightHolder`, built from the same `data/gallery.ts` the visitor reads.
- Share images: `bun run og` renders one 1200×630 Poster card per page × locale from the built pages; the launch gate
  fails on a missing one. Favicons: SVG + 48 px PNG + apple-touch 180 + manifest 192/512.
- `/llms.txt` from the CV + projects + posts; RSS per blog locale; the sitemap leaves out legal, CV print and contact
  result pages.
- Blog: 11 posts at launch (Q20): case study #0, Claude Code building blocks, LLM wiki, Claude Code po polsku (pl only),
  Lingui vs i18next, Astro vs Next.js, translating Lingui catalogs with an LLM, fitted type, reduced motion, cookieless
  analytics. Every external fact has a dated source in the frontmatter; `content.test.ts` checks links and PstrykWeb.

## Spanish

- **Policy:** Google accepts machine translation "as long as there's a human involved in the review process";
  scaled low-value translation is spam.
- **At ~20 pages the risk is quality, not a penalty:** a stiff Spanish page undercuts "attention to detail".
- **Owner decision:** 3 locales [user]. Mitigation:
  - es covers every page except the blog (posts en/pl only; `i18n.md` § Locale coverage)
  - a visible "Translated with AI" line until reviewed (open-questions Q19)

## Content plan (blog, 1–2 posts/month, update in place with "Updated" dates)

Each post is written with the `new-blog` skill (its `references/seo.md` is the per-post checklist).

Launch set, in priority order:
1. Case study #0: how this site scores 90+ on mobile. The owner wants the whole build process kept for it [user 2026-10-05]:
   wiki-first planning, the rejected first look, comp rounds on an artifact, the owner's notes per round (`log.md` is the
   timeline, `comps/` the evidence).
2. Lighthouse on award-winning portfolios (original data from `research/`).
3. Lingui vs i18next (2026).
4. Claude Code skills vs hooks vs MCP.
5. PL: "Claude Code po polsku".
6. Astro vs Next.js for a portfolio (benchmark re-run on a public demo; the internal PstrykWeb numbers are never published).

Published after the launch set: the yws.lu case study (2026-10-09, `/blog/yws-lu-case-study/` in en + pl, query
"Next.js to Astro migration"), a client site with rights `ok`; its facts come only from the yws.lu handover
(`portfolio-case-study.md`, `REPORT.md`), kept outside the repo in the gitignored `.case-study/`.

Pillars:
- AI-assisted dev with Claude Code
- Lingui i18n (+ his npm package)
- three.js performance
- Astro multilingual
- building products solo

Every post links one case study and one pillar.

## Domain (open-questions Q5)

- **Decided [owner] 2026-10-08: `https://muszarski.com`** is the site's domain. Every live reference moved (canonical
  fallback, Umami host and website, CV `Link` headers, the share-card footer, this site's project name, the public
  email `hi@muszarski.com`). Before launch: `muszarski.com` primary in Vercel → Domains (www → apex). No redirect or
  legacy support for `matmuszarski.space` [owner: "nobody knew about this yet"]; never indexed, so no Change of
  Address. The bullets below are the history.
- **Decided for now [user] 2026-10-05:** the new site launches on **`matmuszarski.space`**. The old space site moved to
  `3d-space-folio.vercel.app`, so the domain's indexed content gets replaced, not redirected (the old site was one URL).
  Renew it before it expires (2027-03-17). A name domain stays an option; if it comes, the migration below applies.
- **Deployed, not launched [owner] 2026-10-06:** the site runs on the domain as a noindex build until the owner calls the
  launch (`IS_FULL_PRODUCTION`). The www/apex redirect lives only in Vercel → Domains (the apex should be primary, www → apex);
  `vercel.json` has no host redirect (one there plus the dashboard's apex → www looped every font and script).

- **All candidates are unregistered (2026-10-05):** mateuszmuszarski .com/.pl/.dev/.me, muszarski .com/.pl/.dev,
  matmuszarski .com/.dev/.pl.
- **Earlier recommendation (research):** `mateuszmuszarski.com` (or `.dev`) as primary + `.pl` as a 308.
- **The current domain has little equity:** `matmuszarski.space` was registered 2026-03-17 and expires 2027-03-17.
- **Migration** (research § 7.3):
  1. renew the old domain to ≥ 2028-03
  2. 308 every old URL
  3. GSC Change of Address
  4. Bing site move
  5. update every profile link the same day
  6. monitor weekly
