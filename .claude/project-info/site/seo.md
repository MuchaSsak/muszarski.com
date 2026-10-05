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
  - hosts: matmuszarski.space, plus muszarski.space (lapsed, still linked from the GitHub README)
  - seniority: "began coding in 2022, technikum student" (public) vs "~6 years" (brief)
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
   `sameAs` (GitHub, LinkedIn, npm, Play developer page…), `worksFor` only for a real employer or his own business.
   The markup must match the visible text.
4. **Bidirectional links:** each profile links to the site and the site links to each profile (`rel="me"`).
5. **Earned mentions (P1):** 3–5 independent links (client credits, npm READMEs, a Tricity meetup write-up, a guest post).

## Metadata rules

- **Titles:** unique, static (never changed at runtime), ≤ ~60 chars, written natively per locale.
  - Home en: `Mateusz Muszarski – Full-stack Developer · TypeScript, React, three.js`
  - Home pl: `Mateusz Muszarski – programista full stack (Pomorskie)`
  - Home es: `Mateusz Muszarski – desarrollador full stack`
  - Inner pages: `<Page> – Mateusz Muszarski`
  - The H1 agrees with the title.
- **Descriptions:** ≤ ~155 chars, factual, per locale. No `meta keywords`.
- **Canonical:** absolute, self-referencing per locale; one host with a 308 from the other; `og:url` = canonical.
- **OG:**
  - per page × locale, generated at build: `og:image` 1200×630, `og:image:alt`
  - `og:type` article on posts
  - `twitter:card=summary_large_image`
  - `og:locale` + alternates
- **Robots:** `max-image-preview:large` sitewide; legal pages `noindex,follow` (never robots.txt-blocked) and out of
  the sitemap; preview builds `noindex` (`LAUNCH_BUILD`).
- **Favicons:** PNG/ICO ≥ 48 px (Google doesn't list SVG) + SVG + apple-touch 180 + manifest 192/512.
- **PDF CV:** served with `Link: <…/cv/>; rel="canonical"`, `Content-Disposition: attachment`; PDF Title/Author metadata set.

## Crawl and indexing setup

- **`robots.txt`:** allow all; `Sitemap:` line; never block Googlebot, Bingbot or OAI-SearchBot. Training bots
  (GPTBot, Google-Extended, ClaudeBot) are the owner's call [Q29].
- **Sitemap:** index + children with hreflang alternates (one route map feeds `<link>` tags and the sitemap);
  `lastmod` from content dates.
- **Search Console:** Domain property via DNS TXT; submit the sitemap; URL Inspection on home, one case study, one
  post and `/cv/`.
- **Bing Webmaster:** import from GSC + **IndexNow** ping (key file in `public/`) after every deploy.
- **`/llms.txt`:** P2, generated from the CV data; Google doesn't use it. Zero expectation, zero cost.
- **Launch gate** (port from pstryk): the build fails on a missing title/description/OG, a wrong host in canonical/sitemap,
  a preview noindex in production, or invalid JSON-LD.

## Spanish

- **Policy:** Google accepts machine translation "as long as there's a human involved in the review process";
  scaled low-value translation is spam.
- **At ~20 pages the risk is quality, not a penalty:** a stiff Spanish page undercuts "attention to detail".
- **Owner decision:** 3 locales [user]. Mitigation:
  - scope es to home, CV and the case studies
  - blog posts in en/pl only
  - a visible "Translated with AI" line until reviewed (open-questions Q19)

## Content plan (blog, 1–2 posts/month, update in place with "Updated" dates)

Launch set, in priority order:
1. Case study #0: how this site scores 90+ on mobile.
2. Lighthouse on award-winning portfolios (original data from `research/`).
3. Lingui vs i18next (2026).
4. Claude Code skills vs hooks vs MCP.
5. PL: "Claude Code po polsku".
6. Astro vs Next.js for a portfolio (the owner's benchmark).

Pillars:
- AI-assisted dev with Claude Code
- Lingui i18n (+ his npm package)
- three.js performance
- Astro multilingual
- building products solo

Every post links one case study and one pillar.

## Domain (open-questions Q5)

- **All candidates are unregistered (2026-10-05):** mateuszmuszarski .com/.pl/.dev/.me, muszarski .com/.pl/.dev,
  matmuszarski .com/.dev/.pl.
- **Recommended:** `mateuszmuszarski.com` (or `.dev`) as primary + `.pl` as a 301.
- **The current domain has little equity:** `matmuszarski.space` was registered 2026-03-17 and expires 2027-03-17.
- **Migration** (research § 7.3):
  1. renew the old domain to ≥ 2028-03
  2. 308 every old URL
  3. GSC Change of Address
  4. Bing site move
  5. update every profile link the same day
  6. monitor weekly
