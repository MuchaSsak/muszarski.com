# SEO, Entity & Discoverability: "Mateusz Muszarski" → this site

Date: 2026-10-05 · Track 10 (SEO, entity, discoverability) · complements `2026-10-05-synthesis.md` and `2026-10-05-performance-mobile-a11y.md` §9

Tags:

- [web: url] = read on that URL, accessed 2026-10-05.
- [measured] = run by me on 2026-10-05. Scripts are in the shared scratchpad `tools/seo-*.mjs`, raw output in `tools/seo/`.
- [assumption] = my inference, not verified.

Baseline read first: `context/pstryk-turborepo/.claude/project-info/landing/seo.md` (the user's own SEO wiki for pstrykweb.pl, 2026-09-27..10-02). Rules that carry over unchanged are cited as **[pstryk §n]** instead of being re-researched.

## TL;DR

1. **Today Google does not connect his name to his site.**
   - For "Mateusz Muszarski", Google results (via Startpage) show his site **nowhere in the top 30**: another Mateusz Muszarski's Instagram, his Linkoglot Play listing and his LinkedIn appear instead.
   - Bing ranks the site **#10** for the quoted name, behind business-register scrapers (gowork, monitorfirm) and LinkedIn "Student at Technikum".
   - The site wins only for "matmuszarski", where Google shows it under the rewritten title "Ready for launch!".
   - Autocomplete has **zero** completions for his name. [measured]
2. **The old site is invisible to non-JS crawlers.** Raw HTML is an empty `#root`. There is no canonical, JSON-LD, robots.txt or sitemap, the apex→www redirect is a 307, and desktop content sits behind a START gate. [measured]
3. **The identity is split.**
   - Names: "Mateusz", "Matt", "Matthew".
   - Handles: MuchaSsak / muchassakkk / mat.muszarski.
   - Portfolio domains: matmuszarski.space, plus **muszarski.space, which has lapsed but is still linked from his GitHub README**.
   - Seniority: public sources say "began coding in 2022, technikum student", which conflicts with the brief's "~6 years". **Fixing consistency is the #1 lever and costs nothing.**
4. **No Knowledge Panel can be requested.** Panels are automatic and claimable only once one exists. AI Overviews / AI Mode need no special markup or files (Google). Bing/Copilot explicitly reward static HTML, explicit facts and clearly defined entities. So: an entity-home page with one factual sentence, a `Person`/`ProfilePage` graph with `sameAs`, bidirectional profile links, and 3–5 earned mentions.
5. **"full stack developer Gdańsk" is a job-board SERP** (10/10 results). Target name + occupation + place instead. Google Business Profile is not eligible for a remote developer.
6. **All 11 candidate domains are unregistered.** Recommended: `mateuszmuszarski.com` (or `.dev`) with `.pl` as a defensive redirect. Moving costs little, because `matmuszarski.space` is only 7 months old (registered 2026-03-17, expires 2027-03-17).
7. **Multilingual:** EN at `/` is recommended over `/en/`, with reciprocal hreflang + x-default and per-locale titles. **Defer `es`** unless a native speaker reviews it: Google accepts machine translation "as long as there's a human involved in the review process".

## 1. Current presence audit

### 1.1 What search engines show today [measured]

Method: Playwright (headless Chromium, from Poland), unpersonalized, 2026-10-05, script `tools/seo-serp.mjs` + `seo-serp2.mjs`, raw dumps `tools/seo/serp*.json`. **google.com served a CAPTCHA on all 4 queries**, so Google's organic results were read through **Startpage** (which serves Google results, unpersonalized, language=English). DuckDuckGo (html + lite) and Brave returned bot challenges; Brave's challenge page still leaked one result (below). Bing's *unquoted* headless results were degraded (it dropped the surname and returned pages about the given name "Mateusz", and zhihu.com junk for "Muszarski"), so the Bing rows below use the quoted / disambiguated retries.

| Query | Engine | Where his own site is | What owns the page |
|---|---|---|---|
| Mateusz Muszarski | Google (via Startpage) | **Not in the top 30** (pages 1-3 checked) | An Instagram account of a different Mateusz Muszarski (`@doktorek_muszarski`), LinkedIn "Mateusz Mus" directory, **Linkoglot on Google Play** (developer name shown: "Mateusz Muszarski"; it is his app), Polish PDFs/BIP lists naming other Muszarskis |
| "Mateusz Muszarski" (quoted) | Google (via Startpage) | Not in top 10 | Same as above + `pstrykwebsites.com/privacy` (names him; that deployment now returns 503 DEPLOYMENT_PAUSED) |
| "Mateusz Muszarski" (quoted) | Bing (mkt pl-PL) | **#10**, title "Mateusz Muszarski \| 3D Space Portfolio" | #1 gowork.pl "Kontakt - Mateusz Muszarski Enrollo Starogard Gdański", #3 LinkedIn "Mateusz Muszarski - Student at Technikum nr 1 im. …", #4 + #9 monitorfirm.pb.pl "MATEUSZ MUSZARSKI - ENROLLO, NIP …" (business-register aggregators), Instagram/Facebook of "Muszalski" (a near-namesake) |
| "Muszarski" developer | Bing | **#1** matmuszarski.space, #2 GitHub profile, #8 GitHub README repo | LinkedIn of other Muszarskis (Gdańsk area), register aggregators |
| matmuszarski | Google (via Startpage) | **#1, the only result**, shown with the title **"Ready for launch!"** (Google rewrote the `<title>`) and the raw-HTML meta description | – |
| matmuszarski | Bing | #1 | Instagram `@mat.muszarski`, LinkedIn, GitHub, gowork, monitorfirm |
| Mateusz Muszarski full stack developer | Google (via Startpage) | Not in top 3 (only 3 results) | #1 his LinkedIn, #2 his Instagram `@mat.muszarski` |
| MuchaSsak | Bing | GitHub profile #1, README repo #2 | NameMC/Minecraft skins, freesound.org/people/MuchaSsak |
| "Mateusz Muszarski" | Brave (leaked under the challenge) | `2d.muszarski.space` "Mateusz Muszarski \| 2D Space Portfolio" | – (this host's domain has lapsed, see 1.3) |

**Reading:** the name "Mateusz Muszarski" is *shared* (at least one other living Mateusz Muszarski with an active Instagram, plus several Muszarski family names in Pomorskie: Gdańsk, Nowy Dwór Gdański, Starogard Gdański) and Google currently does **not** associate the name with his site at all. The site only wins on the made-up token "matmuszarski". Business-register scrapers (gowork, monitorfirm) and LinkedIn outrank him on Bing for his own name. This is the gap the rebuild must close; it is very winnable because nobody else holds "Mateusz Muszarski + developer" [assumption, based on the competing results being unrelated people].

### 1.2 matmuszarski.space crawl [measured]

Raw HTML = what non-JS bots, link-preview scrapers and most AI crawlers get (`curl` with a Googlebot UA). Rendered = Playwright after `networkidle` + 8 s.

| Item | Finding |
|---|---|
| Host | `https://matmuszarski.space/` → **307 Temporary** → `https://www.matmuszarski.space/` (Vercel). http → 308 to https apex, then 307. A temporary redirect for the canonical host is the wrong signal (should be 308/301), and `og:url` points at the apex, i.e. the *redirecting* URL |
| Raw HTML | 2 763 bytes. `<body><div id="root"></div>`: **zero indexable body text, zero links, zero headings** before JS. Vite + React SPA (`three`, `@react-three/fiber`, `drei`, `postprocessing`, `gsap`, `leva` modulepreloaded) |
| `<title>` | Raw: "Mateusz Muszarski \| 3D Space Portfolio"; after JS: "Mateusz Muszarski \| Portfolio" (title changes at runtime). Google shows neither: it rewrote it to "Ready for launch!" |
| Meta description | "My name is Mateusz Muszarski and I am a fullstack & creative web developer and this is my fully immersive 3D portfolio themed about space." (English, 140 chars; fine wording-wise) |
| Meta keywords | Present (25 terms). Ignored by Google [web: https://developers.google.com/search/docs/crawling-indexing/special-tags] |
| Canonical / hreflang / JSON-LD | **None / none / none** |
| `lang` | `en` in raw HTML; the app switches UI language at runtime (a pl-PL browser got Polish text with `lang` still "en") |
| OG | og:title, og:description, og:url (apex), og:image 1920×1080 JPEG **443 KB** (`/assets/pictures/3d_space_folio_thumbnail.jpg`), og:locale en_US, og:type website. No `twitter:card` |
| robots.txt / sitemap.xml / llms.txt / site.webmanifest / apple-touch-icon | **All 404** (Vercel NOT_FOUND). Only `/favicon.ico` (67 KB) exists |
| Rendered, desktop 1440×900 | 1 `<canvas>`, an H1 "Deploying…"/"Przygotowywanie…" and a **START gate**; 104 characters of text; links: GitHub + mailto only |
| Rendered, mobile (Googlebot smartphone UA, en-US) | A DOM fallback: ~3 400 chars, headings "About me", "I originate from Poland", "Job Experience", "Certificates", "Projects"; 30+ outbound links (projects, certificates, Instagram). So Google's smartphone renderer *can* see some text, but it is a generic "About me" with no occupation keywords beyond "full-stack and creative web development", says "Currently, I'm studying as programming technician in my technical college", and has no per-project URLs (one URL for everything) |
| Per-project URLs | None. Everything is one URL; projects link out to `*.vercel.app` demos |
| Old 2D portfolio `2d.matmuszarski.space` | Next.js, `robots: index, follow`, title "Mateusz Muszarski \| 2D Space Portfolio", H1 **"Hi, I'm Matthew."**; links to `muszarski.space`, `2d.muszarski.space` and `uk.linkedin.com/in/mateusz-muszarski-b1168a28a`. No canonical, no JSON-LD |

**Indexable vs canvas-only:** in the raw HTML only the `<title>`, description and OG tags exist. In the rendered mobile DOM the about/experience/certificates/projects text exists; on desktop the content sits behind START and the canvas. Anything drawn in WebGL (planet labels, 3D text) is not indexable [web: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics, already cited in `2026-10-05-performance-mobile-a11y.md` §9].

### 1.3 Public profiles and identity facts (facts only) [measured]

| Profile / record | URL | Facts read 2026-10-05 |
|---|---|---|
| GitHub | https://github.com/MuchaSsak | Name "Mateusz Muszarski", location "Poland, Pomorskie", blog → `https://matmuszarski.space`, bio empty, 26 public repos, 12 followers, created 2022-06-21. Social accounts: LinkedIn only |
| GitHub profile README | https://github.com/MuchaSsak/MuchaSsak | "Hi, I'm Matt! … But my real name is Mateusz Muszarski"; "I began my coding journey in 2022"; "studying as a programming technician in my technical college"; Polish native, English fluent, GMT+1; main tech TS, Next.js, three.js, React, Tailwind, Supabase; certs: Three.js Journey, Ultimate React Course (Udemy), **INF.03 (CKE)**, 4 Erasmus+-style youth-work trainings (Latvia, Lithuania ×2, Georgia). **Links to `https://muszarski.space` as "Portfolio"** and the repo homepage is also `https://muszarski.space` |
| `muszarski.space` | – | **Not registered** (RDAP via rdap.radix.host: 404, 2026-10-05). Still linked from the GitHub README, the README repo's homepage field and the 2D portfolio. A lapsed domain that profiles still point to can be re-registered by anyone [assumption about risk] |
| LinkedIn | https://www.linkedin.com/in/mateusz-muszarski-b1168a28a | Behind the auth wall for bots; search snippet headline: "Mateusz Muszarski - Student at Technikum nr 1 im. …" (Bing + Google). Linked from GitHub social accounts |
| Instagram | https://www.instagram.com/mat.muszarski/ | Linked from the old site ("amateur photography"); ranks for "Mateusz Muszarski full stack developer" (#2 on Google via Startpage) |
| npm | https://www.npmjs.com/~muchassakkk | User **`muchassakkk`**. Packages: `lingui-translate-ai` 1.1.0 (created 2026-06-17, 4 versions, keywords lingui/i18n/ai/openrouter/cli; 40 downloads 2026-09-05..10-04) and `react-clickme` 1.0.2 (2023-12-07; 15 downloads in the same window) [api.npmjs.org]. `author` field = "MuchaSsak" (no real name, no homepage to the portfolio) |
| Google Play | https://play.google.com/store/apps/details?id=com.linkoglot.app | App **Linkoglot** ("Real Studying with AI"), developer name "Mateusz Muszarski", 10+ downloads. Ranks top-3 on Google for his name |
| Business register (via aggregators) | gowork.pl, monitorfirm.pb.pl | Sole proprietorship "MATEUSZ MUSZARSKI - ENROLLO" with a NIP, Starogard Gdański (Pomorskie). Public CEIDG data; aggregators rank #1 and #4 on Bing for the quoted name |
| Enrollo | https://enrollo.pl/ | Live (affiliate/cashback offers app, `WebApplication` JSON-LD, Polish). Does not name him on the landing |
| Other projects with own domains | yws.lu (live client site), malatro.vercel.app, lndexecutivetaxi.com, mesku.art (**DNS does not resolve today**) | From GitHub repo homepages |
| Not found | dev.to (`muchassak`, `matmuszarski`, `mateuszmuszarski`: API 404), npm search by "muszarski" (0) | Medium/X/Stack Overflow not probed (bot walls); no Wikidata item assumed [assumption: not checked to save budget] |

**Identity inconsistencies to fix (they split the entity):**

1. Name variants in the wild: "Mateusz Muszarski", "Matt" (GitHub README), **"Matthew"** (2D portfolio H1), handles `MuchaSsak` / `muchassakkk` / `mat.muszarski` / `matmuszarski`. Pick one display name ("Mateusz Muszarski") and declare the rest as `alternateName` (§2.3).
2. Three portfolio hosts: `matmuszarski.space` (live), `muszarski.space` (**lapsed**), `2d.matmuszarski.space` / `2d.muszarski.space`. Profiles point at different ones.
3. Seniority story: the public record says "began my coding journey in 2022" and "Student at Technikum" (LinkedIn headline + old site). The brief for this rebuild says "~6 years, solo freelance + own startups". Google, AI summaries and recruiters will merge whatever the public sources say, so the new site, LinkedIn headline, GitHub bio and README must tell **one** consistent, true story (e.g. "building since 2020, shipping professionally since 2022" if that is what is true). **Open question for the user.**
4. Location: GitHub "Poland, Pomorskie"; business register Starogard Gdański; old site "I originate from Poland". Decide the public city line (e.g. "Starogard Gdański / Tricity, Pomorskie, Poland · remote") and use it everywhere.

## 2. Entity SEO for a person

### 2.1 Knowledge Panels for individuals (official)

| Fact | Quote / source |
|---|---|
| Panels cannot be requested or created | "Knowledge Panels are created automatically by Google Search Algorithm when there is enough information available on the open web." [web: https://support.google.com/knowledgepanel/answer/9787176] |
| Sources | "Facts in the Knowledge Graph come from a variety of sources that compile factual information." (same page) |
| Claiming | Search yourself → "Claim this knowledge panel" → sign in with an official account: "YouTube, Search Console, Twitter, Facebook". Prerequisite: "you must already have a knowledge panel"; "Not all knowledge panels are claimable as of now." After verifying: suggest changes via "Feedback", add Manager/Owner/Contributor users [web: https://support.google.com/knowledgepanel/answer/7534902] |
| Wikidata shortcut? | Wikidata accepts an item only with a Wikimedia sitelink, or an entity "that can be described using serious and publicly available references", or a structural need; disputes go to "request for deletion" [web: https://www.wikidata.org/wiki/Wikidata:Notability, modified 2026-09-28]. His own site, GitHub and LinkedIn are not "serious" third-party references → a self-made item is likely to be deleted [assumption]. **Don't create one now**; revisit if press, conference talks or a notable OSS project give independent references |

**What is realistic for him [assumption]:** a classic Knowledge Panel needs third-party coverage he does not have yet. The achievable target for 6–12 months is the *panel-like* SERP: his site #1 for "Mateusz Muszarski" with sitelinks (Work, CV, Blog), LinkedIn/GitHub/npm/Play below it, his photo in image results, and an AI Overview / Copilot answer that summarises him from those pages. Each of those is driven by the same thing: **one entity home plus consistent, mutually-linking profiles**.

**Entity-home recipe:**

1. The home page `/` is the entity home. Its first paragraph is a plain factual sentence, in HTML, not canvas: "Mateusz Muszarski is a full-stack developer from <city>, Pomorskie, Poland, building <X> with TypeScript, React and three.js." Bing says it directly: "Define Entities Clearly and Consistently", "Surface Key information early", "Facts and definitions are explicit" [web: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a, rendered via Playwright, `tools/seo/bing-guidelines.txt`].
2. Every profile links back to the site's root URL with the same name and the same one-line description: GitHub blog field + bio + README, LinkedIn website + headline, npm `author` / `homepage` in both packages' `package.json`, Play Console developer website, Instagram bio link, the pstrykweb.pl author page (`/pl/blog/autor/<slug>/`, see [pstryk §13, §18]).
3. The site's Person JSON-LD lists those same URLs in `sameAs` (§2.3). The links must be **bidirectional**: site → profile *and* profile → site [assumption: the widely-used practitioner model; Google documents only `sameAs` as "URLs to external profiles", web: https://developers.google.com/search/docs/appearance/structured-data/profile-page].
4. Kill the stale identities: fix the GitHub README "Portfolio" link and the repo homepage (`muszarski.space` has lapsed), and either re-register `muszarski.space` and 301 it to the new site or remove every link to it. 301 or retire `2d.matmuszarski.space` ("Hi, I'm Matthew."). One display name everywhere.
5. Earn 3–5 independent mentions that name him and link to the site: an npm package README featured somewhere, a dev.to / Hashnode cross-post with a canonical link, a talk at a Tricity meetup, a client credit link (`yws.lu` footer "site by Mateusz Muszarski"), a guest post. This is what eventually gives Google "enough information on the open web".

### 2.2 AI Overviews / AI Mode: what is known

**Official (Google):**

| Statement | Source |
|---|---|
| "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary." | [web: https://developers.google.com/search/docs/appearance/ai-features, updated 2025-12-10] |
| "You don't need to create new machine readable files, AI text files, or markup to appear in these features." / "There's also no special schema.org structured data that you need to add." | same |
| Eligibility: "a page must be indexed and eligible to be shown in Google Search with a snippet" | same |
| Selection mechanism: query fan-out, "issuing multiple related searches across subtopics and data sources" | same |
| Controls: `nosnippet`, `data-nosnippet`, `max-snippet`, `noindex` | same |
| Reporting: AI-feature traffic is inside Search Console Performance → "Web" (not separable) | same |
| `Google-Extended` "does not impact a site's inclusion in Google Search nor is it used as a ranking signal"; it controls Gemini training/grounding in Gemini Apps and Vertex AI | [web: https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers, updated 2026-07-14] |

**Official (Bing / Copilot):** Bing's guidelines now cover "Bing search experiences, Copilot, and grounding API results", with "SEO Fundamentals Still Apply to Grounding and AI Experiences". They add AI-specific advice: "Hiding critical content behind client-side rendering" is to be avoided, and "Content that cannot be reliably rendered may not be indexed or selected for grounding results". The same page says "Use IndexNow to notify Bing when: URLs are added, Content is updated, URLs are removed"; "Structured data may support clearer grounding but does not guarantee visibility". [web: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a]

**Official (OpenAI):** "Sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers"; GPTBot is the *training* crawler, a separate opt-out [web: https://developers.openai.com/api/docs/bots]. So, for "AI should talk about me", `robots.txt` must **not** block OAI-SearchBot, and should allow Bingbot (Copilot) and Googlebot. GPTBot / Google-Extended / ClaudeBot (training) are the user's call: allowing them is consistent with the goal [assumption].

**Third-party studies (not official; methodology varies):**

| Finding | Source |
|---|---|
| Ahrefs, 863k keywords / 4M AI Overview URLs: **38%** of cited pages rank top-10 for the same query (76% in July 2025); 31.2% rank 11–100, 31.0% outside the top 100. Caveat: Ahrefs changed its parsing between the two runs | [web: https://www.searchenginejournal.com/google-ai-overview-citations-from-top-ranking-pages-drop-sharply/568637/, 2026-03-02; original https://ahrefs.com/blog/ai-overview-citations-top-10/ not opened] |
| BrightEdge puts top-10 overlap at ~17% (different method) | as reported in the same SEJ article |

**Practical reading for a name query [assumption]:** for "Mateusz Muszarski" / "who is Mateusz Muszarski", the fan-out pulls pages *about the entity*: his site, LinkedIn, GitHub, business-register scrapers, Play Store. The AI summary will repeat whatever those pages say. Today they say "Student at Technikum" and "Enrollo, NIP …". So the lever is (1) the site stating the facts in crawlable text near the top of the page, (2) updating LinkedIn's headline and GitHub bio to match, and (3) a `/cv` page in HTML (not only PDF) with dated roles. No special file or markup is needed (Google, above).

### 2.3 JSON-LD graph (stable `@id`s)

Rules: one `Person` node with `@id` `https://SITE/#person` (SITE = final domain, §7), declared in full on the home page, `/cv` and the blog author page, and referenced by `@id` everywhere else. Content must match visible text (Google: markup about content not visible to users is a structured-data guideline violation; Bing: "Markup must accurately reflect visible content").

| Page | Types | Notes |
|---|---|---|
| `/` (+ `/pl/`, `/es/`) | `WebSite` + `ProfilePage` (mainEntity → `#person`) + full `Person` | Google lists "About Me pages on blogs" as valid ProfilePage use; "The primary focus of the page must be a single person … affiliated with the overall website" [web: …/structured-data/profile-page, updated 2026-09-08]. `WebSite` "must be on the home page of the site" at domain root; subdirectory site names are not supported [web: https://developers.google.com/search/docs/appearance/site-names, updated 2025-12-10] |
| `/cv` | `ProfilePage` (or `WebPage`) + full `Person` with `hasOccupation`, `hasCredential`, `alumniOf` (only if graduated), `knowsLanguage` | HTML CV is what crawlers and AI read; the PDF is linked, not the source of truth |
| `/work/<slug>` | `WebPage` / `Article` + `BreadcrumbList`; optionally `CreativeWork` or `SoftwareApplication` (`about` the shipped product, `creator` → `#person`) | Understanding only: no rich result for portfolio items. `SoftwareApplication` rich results need real ratings/offers (search-gallery "Software app"), so don't fake them |
| `/blog/<slug>` | `BlogPosting` + `BreadcrumbList` | `author` = `{ "@type":"Person", "@id":"https://SITE/#person", "name":"Mateusz Muszarski", "url":"https://SITE/blog/author/mateusz-muszarski" }`. Google: "Only specify the name of the author" in `author.name`; `author.url` → "a web page that uniquely identifies the author"; `datePublished`/`dateModified` ISO 8601 with timezone; images 16x9, 4x3, 1x1, ≥ 50K pixels [web: https://developers.google.com/search/docs/appearance/structured-data/article, updated 2026-09-08] |
| `/blog/author/<slug>` | `ProfilePage` → `#person` | Google's own examples include author pages. Or make `/` the author URL and skip a separate author page (one fewer duplicate) [assumption] |
| `/my-life` | `AboutPage` → `about` `#person` | Personal page; keep private facts out of markup |
| `/privacy` | none | `noindex,follow` |

Property choices for `Person` (all verified to exist on `Person` in the current schema.org vocabulary, `tools/seo/schemaorg.jsonld`, 2026-10-05 [measured]): `name`, `alternateName` (only real variants: "MuchaSsak"; "Matt Muszarski" only if he still uses it), `url` (root), `image` (`ImageObject`, a real square photo ≥ 50K pixels per ProfilePage doc, e.g. 800×800), `description`, `jobTitle` (Text), `hasOccupation` → `Occupation` {`name`, `occupationLocation` (AdministrativeArea Pomorskie/Poland), `skills`}, `address` → `PostalAddress` {`addressLocality`, `addressRegion` "Pomorskie", `addressCountry` "PL"}, **locality only, never street** (or `homeLocation` → `Place`), `knowsAbout` (Text/Thing/URL: use `Thing` with `sameAs` to Wikidata for TypeScript, React, three.js, Astro, so the topics are unambiguous), `knowsLanguage` ("pl", "en"; "es" only if true), `hasCredential` (range now `Credential`; `EducationalOccupationalCredential` with `credentialCategory` "certificate" and `recognizedBy` CKE for INF.03; these two are in schema.org's *pending* area), `alumniOf` (`EducationalOrganization`; only for a finished school), `worksFor` (only a real employer/own company, e.g. his JDG or a product; never a client under NDA), `sameAs` (§2.1), `nationality` (Country), `seeks` (Demand) is valid but useless for Google [assumption], `makesOffer` only if D5 = freelance.

Example (home page, EN). Values are placeholders the user must confirm:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://SITE/#website",
      "url": "https://SITE/",
      "name": "Mateusz Muszarski",
      "alternateName": ["SITE", "Mateusz Muszarski – Full-stack developer"],
      "inLanguage": ["en", "pl", "es"],
      "publisher": { "@id": "https://SITE/#person" }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://SITE/#webpage",
      "url": "https://SITE/",
      "name": "Mateusz Muszarski – Full-stack developer (TypeScript, React, three.js)",
      "inLanguage": "en",
      "isPartOf": { "@id": "https://SITE/#website" },
      "mainEntity": { "@id": "https://SITE/#person" },
      "dateModified": "2026-10-05T12:00:00+02:00"
    },
    {
      "@type": "Person",
      "@id": "https://SITE/#person",
      "name": "Mateusz Muszarski",
      "alternateName": "MuchaSsak",
      "url": "https://SITE/",
      "image": { "@type": "ImageObject", "url": "https://SITE/img/mateusz-muszarski.jpg", "width": 800, "height": 800 },
      "jobTitle": "Full-stack developer",
      "description": "Full-stack developer from Pomorskie, Poland. TypeScript, React, Astro, three.js, AI-assisted workflows.",
      "address": { "@type": "PostalAddress", "addressLocality": "CITY", "addressRegion": "Pomorskie", "addressCountry": "PL" },
      "knowsLanguage": ["pl", "en"],
      "knowsAbout": [
        { "@type": "Thing", "name": "TypeScript", "sameAs": "https://www.wikidata.org/wiki/Q978185" },
        { "@type": "Thing", "name": "React", "sameAs": "https://www.wikidata.org/wiki/Q19399674" },
        { "@type": "Thing", "name": "three.js", "sameAs": "https://www.wikidata.org/wiki/Q3525922" }
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "name": "INF.03 – Tworzenie i administrowanie stronami i aplikacjami internetowymi oraz bazami danych",
        "credentialCategory": "certificate",
        "recognizedBy": { "@type": "Organization", "name": "Centralna Komisja Egzaminacyjna", "url": "https://cke.gov.pl" }
      },
      "sameAs": [
        "https://github.com/MuchaSsak",
        "https://www.linkedin.com/in/mateusz-muszarski-b1168a28a",
        "https://www.npmjs.com/~muchassakkk"
      ]
    }
  ]
}
```

Wikidata Q-ids checked through the Wikidata API on 2026-10-05 [measured]: Q978185 = TypeScript, Q19399674 = React, Q3525922 = Three.js, Q56062435 = Next.js, Q102173844 = Tailwind CSS. My first guess for three.js was an insect species, so look up every new Q-id rather than writing it from memory. INF.03's official Polish name must be copied from the CKE certificate.

Per-locale: the `Person` and `WebSite` `@id`s stay the same in every locale (one entity); only the `ProfilePage` `@id`, `url` and `inLanguage` change (`https://SITE/pl/#webpage`). `description` can be localized.

### 2.4 Rich-result eligible vs "understanding only"

Google's current gallery lists: Article, Breadcrumb, Carousel, Course list, Dataset, Discussion forum, Education Q&A, Employer aggregate rating, Event, Image metadata, Job posting, Local business, Math solver, Movie, Organization, Product, Profile page, Q&A, Recipe, Review snippet, Software app, Speakable, Subscription and paywalled content, Vacation rental, Video [web: https://developers.google.com/search/docs/appearance/structured-data/search-gallery, updated 2026-06-15]. FAQ and HowTo are no longer listed (FAQ rich results gone 2026-05-07 [pstryk §5]).

| Markup on this site | What it can get | Verdict |
|---|---|---|
| `WebSite` (name, alternateName) | **Site name** in results (not a rich result, but visible) | P0 |
| `BlogPosting` | Better "title text, images, and date information" (Article feature) | P0 on posts |
| `BreadcrumbList` | Breadcrumb path in the result (desktop-only since 2025 [pstryk §5]) | P1 |
| `ProfilePage` + `Person` | Profile page feature appears in Discussions & Forums contexts; for a portfolio it is **understanding** (entity, author attribution) | P0 (cheap, high entity value) |
| `Image metadata` (IPTC/`ImageObject` creator, license) | "Licensable" badge in Google Images | P2 (his photography on /my-life only) |
| `Video` | Video features only on a real watch page | Skip for muted UI loops |
| `SoftwareApplication` (Linkoglot page) | Software app rich result needs a real rating or offer | Only if real Play ratings exist; never self-rated |
| `Person.knowsAbout`, `hasCredential`, `alumniOf`, `hasOccupation`, `CreativeWork` per project | No visual result; entity understanding only | Add when true; low cost |
| `FAQPage`, `HowTo`, `AggregateRating` about himself, `LocalBusiness` | Nothing / policy risk | Never [pstryk §13] |

### 2.5 E-E-A-T author signals for the blog

Google: "Of these aspects, trust is most important" (experience, expertise, authoritativeness, trust). Ask "Who, How, and Why": make authorship clear with bylines and author pages, "Disclose when automation or AI substantially generates content", and fabricating creator profiles is deceptive [web: https://developers.google.com/search/docs/fundamentals/creating-helpful-content, updated 2026-10-01]. AI-assisted text is allowed, but "It is critical to manually factcheck and review all AI-generated content", and the same applies to AI-written titles, descriptions, structured data and alt text [web: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content, updated 2026-10-01].

Checklist (mirrors what pstrykweb.pl already ships, [pstryk §18]):

- A byline on every post links (`rel="author"`) to the author URL, with a real photo, a one-line role and links to GitHub/LinkedIn.
- Visible "Published" and "Updated" dates, matching `datePublished` / `dateModified`.
- First-hand evidence in every post: his repo, commit, benchmark, screenshot or Lighthouse run. "Experience" is the E he can prove, "expertise" the one he can't claim yet [assumption].
- A one-line "How this was written" note (e.g. "Drafted with Claude Code, every command and number re-run by me on <date>").
- Sources listed under the post. No invented stats (the same rule as the research files).
- The post's code lives in a public repo linked from the post. That's a backlink from GitHub and a proof point.

## 3. Multilingual en/pl/es

### 3.1 Official rules that drive the design

| Rule | Source |
|---|---|
| Use different URLs per language, not cookies or browser settings; "Avoid automatic redirects based on detected language preferences" | [web: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites, updated 2025-12-10] |
| "Google uses the visible content of your page to determine its language. We don't use any code-level language information such as `lang` attributes, or the URL." Translating only the boilerplate while the main content stays in one language makes for a poor experience | same |
| hreflang via HTML `<link>`, HTTP header or sitemap; "Each language version must list itself **as well as** all other language versions", or the annotations may be ignored; fully-qualified URLs; codes ISO 639-1 (+ optional ISO 3166-1 region) | [web: https://developers.google.com/search/docs/specialty/international/localized-versions, updated 2026-09-21] |
| `x-default`: for users whose language matches no version; "designed for language selector pages" | same |
| Translated pages are not duplicates: they count as duplicates only "if the main content of the page remains untranslated"; hreflang has no canonicalization effect | same |
| Canonical with hreflang: "specify a canonical page in the same language, or the best possible substitute language if a canonical page doesn't exist for the same language" | [web: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls, updated 2026-07-10] |
| "Use words in your audience's language in the URL (and, if applicable, transliterated words)"; hyphens, not underscores | [web: https://developers.google.com/search/docs/crawling-indexing/url-structure, updated 2025-12-10] |

### 3.2 Recommended scheme

1. **Root.** The brief says `en` (default), `pl`, `es` all under `/<locale>/`. That forces `/` to become a redirect. Astro's static output implements `redirectToDefaultLocale` with a `<meta>` refresh page [web: https://docs.astro.build/en/guides/internationalization/], which is not a server redirect.
   - **Recommended (decision for the user):** serve English unprefixed at `/` (`prefixDefaultLocale: false`), with `/pl/` and `/es/` prefixed. Then the root URL is the entity home, the `WebSite` site-name markup sits "on the home page at the domain root" exactly as Google requires (§2.3), and `sameAs` / profile links point at one stable URL.
   - **If `/en/` is kept:** make `/` a real **308** in `vercel.json` (not meta refresh, not JS, never by Accept-Language) and point `x-default` at `/en/`. A `/` language-selector page is the documented alternative, but it adds a click for recruiters.
2. **hreflang.** On every page that has translations: `en`, `pl`, `es` (bare language codes, because the audience is not one country [pstryk §7]) plus `x-default` → the EN URL. Self-referencing and reciprocal. A page that exists in one language only (e.g. an EN-only post) carries **no** hreflang. Emit `<link>` tags in `<head>` *and* the sitemap alternates from the same route map, so the two can't disagree.
3. **Canonical.** Absolute, self-referencing per locale (`/pl/cv` → `/pl/cv`). Never canonicalize PL/ES to EN.
4. **Slugs.** Keep the *structural* slugs identical across locales (`/work/`, `/blog/`, `/cv`, `/my-life`, `/privacy`) [assumption: trade-off below]. Translate only **blog post slugs** written natively for that language (`/pl/blog/claude-code-po-polsku`).
   - Why: `@astrojs/sitemap`'s `i18n` option builds the `xhtml:link` alternates by matching the same path across locale prefixes [web: https://docs.astro.build/en/guides/integrations-guide/sitemap/]. Translated slugs would need a custom route map and serializer.
   - The URL words matter little next to the title and H1. "praca" (= "work" in Polish) also reads as "job offers" in Polish search, so a literal translation sends the wrong signal.
   - Project slugs are proper names (`/work/linkoglot`), identical everywhere.
5. **Titles and descriptions per locale, written natively, not literal translations.** Each locale's title uses the word people type there: "programista full stack" (pl), "desarrollador full stack" (es), "full-stack developer" (en). Every autocomplete probe in §6 confirms these as the head terms.
6. **OG per locale:** localized `og:title` / `og:description`, `og:locale` (`en_US` / `pl_PL` / `es_ES`) + `og:locale:alternate` for the others, and `og:url` = that locale's canonical. OG images can be text-free and shared, or rendered per locale at build.
7. **`<html lang>`:** set correctly (screen readers, browser translation), even though Google ignores it for language detection.
8. **Language switcher:** real `<a href>` links to the counterpart URL (not the locale home), `hreflang` + `lang` attributes on the links. No auto-redirect.
9. **Sitemap:** `@astrojs/sitemap` with `i18n: { defaultLocale: 'en', locales: { en: 'en', pl: 'pl', es: 'es' } }`, `filter` out `/privacy` and any noindex page, `serialize` to set `lastmod` from content dates. Google ignores `priority`/`changefreq` [pstryk §14].

### 3.3 Spanish (`es`): value vs risk when the owner can't verify it

| | Evidence |
|---|---|
| Value | The `es` autocomplete for "desarrollador full stack" is dominated by job-seeker and course intent, and by Latin American places: sueldo, curso, junior, remoto, argentina, guatemala, bogota, mexico, uruguay, peru, tijuana, madrid, valencia [measured, §6]. Nothing in the hiring track points at Spanish-speaking employers for him [`2026-10-05-hiring-perspective.md` covers PL/EN only]. **Expected hiring value: low** [assumption] |
| Policy | Machine translation is not banned. Google (Lizzi Sassman, Oct 2022 office hours): "this is totally fine for Google as long as there's a human involved in the review process. That's the key." [web: https://www.searchenginejournal.com/is-google-okay-with-minor-tweaks-to-machine-translations/468763/]. The current spam policy lists "automated transformations like … translating" under scaled content abuse *"where little value is provided to users"* [web: https://developers.google.com/search/docs/essentials/spam-policies, updated 2026-08-28]. The older example "Text translated by an automated tool without human review or curation before publishing" is **no longer on that page** (checked 2026-10-05). Google reportedly removed its old "block auto-translated pages with robots.txt" advice in June 2025 (reported by multilingual.com, search result only; the page returned 403) |
| Risk | Not a penalty risk at ~10–30 pages [assumption: "scaled" is about volume]. The real risks are (1) a stiff or wrong translation read by a Spanish-speaking reviewer undermines the "attention to detail" signal; (2) every ES page doubles the content upkeep (posts, CV, case studies) and goes stale; (3) hreflang errors from pages missing in ES |
| Recommendation | **Default: ship en + pl at launch, defer es.** If es stays, scope it to home + CV + the 3 strongest case studies, have a native speaker review it (paid or a friend; one pass per change), show a visible line "Translated with AI, reviewed by <name>", and keep posts EN/PL only (no hreflang to a missing ES post). Without any reviewer, don't ship es |

## 4. Local / occupation SEO

### 4.1 Who owns the occupation + place queries today [measured]

Google results via Startpage, 2026-10-05 (`tools/seo/serp-local.json`):

| Query | Top 10 |
|---|---|
| full stack developer Gdańsk | **10/10 job boards**: pracuj.pl ×2, justjoin.it ×2, LinkedIn Jobs ×2, nofluffjobs, englishjobs.pl, Michael Page, Bulldogjob |
| programista full stack Gdańsk | **10/10 job boards**: pracuj, LinkedIn Jobs ×2, nofluffjobs, Bulldogjob, theprotocol, justjoin, Jooble, Sii careers, Indeed |
| programista freelancer Trójmiasto | Mixed: **3 personal/freelancer sites** (mcgoo.pl "O mnie - Freelancer Webmaster Wrocław", wppoland.com "Programista WordPress w Trójmieście", marcin.rudzki.net), useme.com, wpfreelancer.pl, job boards, a Facebook group |
| freelance react developer Poland | Job boards (Glassdoor, NFJ, englishjobs, LinkedIn, justjoin, pracuj, Bulldogjob) + talent marketplaces (arc.dev "Hire Top Freelance React Developers in Poland", freelancer.com, TITANS) |

Autocomplete (pl, gl=pl) [measured]:

- "full stack developer gdańsk" and "programista react gdańsk" return **no completions**.
- "programista full stack gdańsk" completes only to generic forms (praca, zarobki).
- "programista gdańsk" completes to praca, praktyki, staż, technikum, PLC/CNC… and **one personal query, "mateusz kubiak programista gdańsk"**. That is the pattern a known local developer earns: name + occupation + city.
- "software house gdańsk / trójmiasto / sopot / pomorskie" all exist. That is people looking for *companies*.

**Conclusion:** "full stack developer + city" is a job-seeker query owned by job boards. A personal site won't outrank them, and those searchers are other candidates, not hiring managers [assumption, consistent with the synthesis TL;DR #1: referrals and outreach drive interviews]. The attainable local targets are:

1. **Name + occupation + place**: "Mateusz Muszarski programista", "Mateusz Muszarski Gdańsk / Starogard", the "mateusz kubiak programista gdańsk" pattern. Won through §2's entity work plus the city stated on home, `/cv` and in `Person.address`.
2. **Freelancer intent, only if D5 = freelance**: "programista freelancer trójmiasto", "tworzenie aplikacji webowych", "tworzenie stron gdańsk" (autocomplete-confirmed). One honest PL page, e.g. `/pl/wspolpraca` "Programista full stack · Trójmiasto / Pomorskie · zdalnie". No per-city doorway pages [pstryk §5: doorway and keyword-stuffing policies].

### 4.2 Google Business Profile for an individual developer

Rules [web: https://support.google.com/business/answer/3038177]:

- The business must have "a physical location that customers can visit, or travels to customers where they are"; "Online-only operations don't meet this standard".
- A service-area business must "hide your business address", with a service area of roughly 2 hours' driving.
- A home-based provider should "clear the address".
- Individual practitioners (doctors, lawyers, agents) qualify only in "a public-facing role" and if they "can be contacted directly at the verified location during stated hours".
- The name must be the real-world business name, with no keywords.

**Verdict:** a remote developer who doesn't meet clients in person is **not eligible** [assumption applying the rule]. If he really visits Pomorskie clients (freelance), a service-area profile under the JDG's real name is allowed, but it helps "near me" / Maps queries, not hiring. **Skip** (P2 at most, only with D5 = freelance + in-person work). Never use a virtual office.

### 4.3 Legitimate local signals (cheap, consistent)

- The same city/region string on the site (home subline, `/cv`, footer, `Person.address` locality-only), LinkedIn location, GitHub location ("Poland, Pomorskie" today) and npm/Play developer profiles.
- Polish-language content (the `/pl/` locale and PL posts) for PL queries. Google detects language from visible text (§3.1).
- Local community links: a talk or write-up at a Tricity meetup, a school/technikum project page, credits on Pomorskie client sites. Earned mentions, not directories [assumption].
- ccTLD trade-off: a `.pl` domain gives "clear geotargeting" to Poland but is "limited to single countries" [web: managing-multi-regional-sites]. That's wrong for an EN-first, international-remote profile, so use `.pl` only as a redirecting defensive registration (§7).

## 5. Technical checklist (Astro static on Vercel)

Many rules repeat the pstrykweb.pl wiki, which is already built and tested in Astro; reuse its code (`src/lib/seo.ts`, `src/lib/sitemap.ts`, launch gate, OG script) where it fits.

| # | Item | Rule | Source |
|---|---|---|---|
| T1 | Static HTML for all content | Every word a recruiter or crawler needs is in the served HTML. Canvas/WebGL is decoration on top. The old site served 0 bytes of body text (§1.2). Bing: avoid "Hiding critical content behind client-side rendering"; content that can't be reliably rendered "may not be indexed or selected for grounding results" | [web: Bing guidelines]; [web: Google JS SEO basics via perf track §9] |
| T2 | `<title>` | Unique, static (no runtime change; the old site's runtime title change ended with Google showing "Ready for launch!"), site name at the start or end with a delimiter. Pattern: home `Mateusz Muszarski – Full-stack Developer · TypeScript, React, three.js`; inner pages `<Page> – Mateusz Muszarski`; PL `Mateusz Muszarski – programista full stack (Pomorskie)`; ES `Mateusz Muszarski – desarrollador full stack`. Keep ~≤ 60 chars (pstryk CI convention); Google truncates "as needed" | [web: https://developers.google.com/search/docs/appearance/title-link, updated 2025-12-10] |
| T3 | H1 = the main visual title | One prominent H1 per page that agrees with the title (Google lists "main visual title" and headings as title-link sources) | same |
| T4 | Meta description | Per page, factual, ≤ ~155 chars, localized. Used "in some situations" for the snippet. Drop `meta keywords`: "not used by Google Search … no effect on indexing and ranking at all" | [web: https://developers.google.com/search/docs/crawling-indexing/special-tags, updated 2025-12-10] |
| T5 | Canonical host | One host (apex *or* www) with a **308/301** from the other. Today apex→www is a **307 temporary**, and `og:url` points at the redirecting apex. `canonical` + `og:url` + sitemap `<loc>` all use the final host | [measured] §1.2; pstryk launch gate |
| T6 | `robots.txt` | `Allow: /`, a `Sitemap:` line, block only true utility paths. Don't block Googlebot, Bingbot or **OAI-SearchBot** ("opted out … will not be shown in ChatGPT search answers"). Training bots (GPTBot, Google-Extended, ClaudeBot) are the user's call; Google-Extended "does not impact a site's inclusion in Google Search" | [web: https://developers.openai.com/api/docs/bots]; [web: Google common crawlers] |
| T7 | Legal pages | `/privacy` (all locales): `<meta name="robots" content="noindex,follow">`, **not** a robots.txt block: "For the noindex rule to be effective, the page or resource must not be blocked by a robots.txt file." Exclude it from the sitemap | [web: https://developers.google.com/search/docs/crawling-indexing/block-indexing, updated 2025-12-10] |
| T8 | Sitemap index | `@astrojs/sitemap` → `sitemap-index.xml` + `sitemap-0.xml`, with `i18n` alternates, `filter` for noindex pages and `lastmod` from content dates. With < 100 URLs one child is enough; split per locale only if Search Console coverage per locale is wanted [pstryk §14] | [web: https://docs.astro.build/en/guides/integrations-guide/sitemap/] |
| T9 | Search Console | **Domain property** verified by DNS TXT (covers http/https, www/apex, subdomains like `2d.`). Submit the sitemap index; URL Inspection → "Test live URL" on home, one case study, one post, `/cv`; "Request indexing" for those only. Add the old domain too (for Change of Address, §7) | [pstryk §16 #1, #3, #6, #7] |
| T10 | Bing Webmaster Tools + IndexNow | Import from GSC (auto-verifies, imports sitemaps). Host `/<key>.txt` (8–128 chars: a-z, A-Z, 0-9, dashes) in `public/`; a post-deploy step POSTs added/changed/removed URLs (≤ 10 000/request) to `api.indexnow.org`. "Submitted URLs will be automatically shared with all other participating search engines." Bing: notify IndexNow when URLs are added, updated or removed, which reduces "outdated or incorrect URL references in Copilot responses". Google ignores IndexNow | [web: https://www.indexnow.org/documentation]; [web: Bing guidelines]; [pstryk §14] |
| T11 | OG / link previews | Per page: `og:title`, `og:description`, `og:url`, `og:type` (`article` on posts), `og:image` **1200×630** JPEG/PNG (LinkedIn needs ≥ 1200×627 [perf track S58]), absolute URL, `og:image:alt`, `og:locale` + alternates, `twitter:card=summary_large_image`. Generated at build per page (the pstryk `bun run og` approach). The old site's 1920×1080 443 KB image works but is not per page | [measured]; perf track §9 |
| T12 | Favicon set | Google supports BMP, GIF, ICO, PNG, JPEG, PPM, TIFF and **does not list SVG**: ship a PNG/ICO ≥ 48×48 (e.g. 96×96 PNG + `favicon.ico`) next to an SVG for browsers, `apple-touch-icon` 180×180, manifest icons 192/512. Square, declared on the home page, crawlable by Googlebot-Image | [web: https://developers.google.com/search/docs/appearance/favicon-in-search, updated 2026-08-28] |
| T13 | RSS | `@astrojs/rss` per locale (`/blog/rss.xml`, `/pl/blog/rss.xml`), announced with `<link rel="alternate" type="application/rss+xml">`. It doubles as the feed for cross-posting (dev.to / Hashnode RSS import with the canonical pointing home [assumption: verify each platform's canonical setting before relying on it]) | pstryk §14 (built) |
| T14 | Core Web Vitals | "Core Web Vitals are used by our ranking systems"; "There is no single signal"; "Google Search always seeks to show the most relevant content, even if the page experience is sub-par". The budgets in the synthesis (LCP ≤ 2.5 s, CLS ≤ 0.05, Lighthouse ≥ 90) are about hiring impressions first, ranking second | [web: https://developers.google.com/search/docs/appearance/page-experience, updated 2026-09-22] |
| T15 | `llms.txt` | Google: "You don't need to create new machine readable files, AI text files, or markup to appear in these features" [web: ai-features]. Gary Illyes (Search Central Live, July 2025): Google "does not support llms.txt and has no plans to"; Mueller compared it to the keywords meta tag (both via a secondary roundup [web: https://hybridranking.com/blog/llms-txt-one-year-later, 2026-05-25]). Adoption evidence (third party, same roundup): SE Ranking, ~300k domains, **10.13%** adoption, "no statistically significant correlation" with AI citations; OtterlyAI, 62,100+ AI-bot requests over 90 days, **84 (0.1%)** hit llms.txt. **Verdict: optional P2.** It costs nothing if generated from the same data as `/cv`, and Jesper Landberg uses it as an "AI CV" (synthesis §2b). Never count on it for ranking | as cited |
| T16 | JS / canvas crawling | Google renders JS, but text drawn into `<canvas>` is not indexable, and link-preview bots read only the raw HTML (perf track §9). Bing explicitly penalises client-only critical content (T1). Keep the WebGL moment `aria-hidden` with an HTML equivalent | perf track §9; Bing |
| T17 | Structured data | §2.3 graph; validate with the Rich Results Test + Schema.org validator in CI on one page per template; "Don't mark up content that is not visible to readers of the page"; "Google does not guarantee that your structured data will show up" | [web: https://developers.google.com/search/docs/appearance/structured-data/sd-policies, updated 2026-07-10] |
| T18 | PDF CV | Keep `/cv` (HTML) as the canonical. Serve the PDF with `Link: <https://SITE/cv>; rel="canonical"` (Vercel `headers`), which Google supports for non-HTML documents. Set the PDF's Title/Author metadata to "Mateusz Muszarski – CV" | [web: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls, updated 2026-07-10] |
| T19 | Images | `Person.image` = a real photo (a filename like `mateusz-muszarski.jpg`, alt "Mateusz Muszarski"), ≥ 50K pixels (ProfilePage doc), used consistently as the GitHub/LinkedIn avatar too. `<meta name="robots" content="max-image-preview:large">` sitewide [pstryk §14] | [web: profile-page] |
| T20 | Trailing slash + 404 | One `trailingSlash` policy in Astro and Vercel; a real 404 status page; no soft-404s [pstryk §7, §5] | pstryk |
| T21 | Launch gate | Port the pstryk `launch-gate.mjs` idea: fail the build on a missing title/description/OG image, wrong host in canonical/sitemap, preview `noindex` leaking into production, or JSON-LD that doesn't parse | pstryk §14 |

## 6. Blog strategy + autocomplete

### 6.1 Method [measured]

`suggestqueries.google.com/complete/search?client=chrome` (the same endpoint as [pstryk §3]): en `hl=en&gl=us`, pl `hl=pl&gl=pl`, es `hl=es&gl=es`. **66 seeds + 115 a–z expansions = 181 probes → 2,017 suggestions, 1,536 unique**. Run 2026-10-05, ~0.6 s apart. Script `tools/seo-suggest.mjs`, dump `tools/seo/suggest.json`. **Autocomplete proves a query exists and roughly orders by popularity; it is not volume.** Calibrate with Keyword Planner ranges before investing in a cluster. Low-rate, occasional use only (ToS-gray).

Name check: "mateusz muszarski" → mateusz muskala · mateusz mudrecki · mateusz skrzyszowski · mateusz zarski · mateusz vs michal; "muszarski" → muszanski · muszalski · muszkal · muszkiewicz · muszynski. **Google has no autocomplete for his name**: zero name demand today. Success metric for the entity work: "mateusz muszarski" starts completing to "… developer / programista / github".

### 6.2 Clusters in his niches (verbatim completions, abridged)

| Cluster | en | pl | es | Read |
|---|---|---|---|---|
| **Claude Code workflow** (largest) | claude code skills (examples · best practices · vs agents · to reduce token usage · for web design · folder · location) · claude code hooks (examples · vs skills · lifecycle · best practices · use cases) · claude code mcp (config file location · add · setup · servers) · claude code vs codex / cursor / copilot · claude code worktrees · plan mode · output styles · status line · ai assisted development with claude code · ai assisted development vs vibe coding · vibe coding vs agentic coding | claude code co to · jak używać · jak zacząć · jak zainstalować · ile kosztuje · cena / cennik · kurs · komendy · za darmo · **po polsku** ("czy claude code rozumie po polsku") · claude code for students · best skills · best plugins | claude code precio · gratis · instalar · windows · descargar · **three.js skills for claude code** | Huge and fast-moving; EN head terms belong to Anthropic docs and big blogs [assumption]. **His edge: first-hand setups and the intersections** (Claude Code × R3F, × Lingui, × Astro) and **PL how-tos** |
| **Lingui / i18n** (his npm package) | lingui vs i18next · lingui vs react i18next · lingui vs react intl · lingui vs next intl · lingui react native · lingui react 19 · lingui react vite · lingui react plural / trans / macro / compiler | "lingui" alone → pasta (linguine) | – | Small but precise developer intent; comparison posts + `lingui-translate-ai` docs. Low competition [assumption] |
| **three.js / R3F** | react three fiber vs three js · webgpu · v10 · performance · portfolio · next js 15 · claude skill · mcp · skills · three.js portfolio (website · examples · template · github · ideas) | three.js co to · three.js journey · three js react | react three fiber (r3f) · tutorial · webgpu · three.js / react three fiber | The portfolio itself is the case study ("three.js portfolio" + "react three fiber performance") |
| **Astro** | astro vs next js (for seo · for blog · performance · 2026) · astro i18n (routing · dynamic routes · example · blog) · astro view transitions (not working · safari · fallback · **'view transitions' is deprecated**) | – | astro framework (vs react · portfolio · tutorial) | The stack decision post + i18n how-to from his real config |
| **Performance** | core web vitals inp · assessment failed · what is a good lighthouse score · lighthouse score explained | – | – | Original measurements win here (§6.3) |
| **Solo product building** | solo developer (startup · saas · success stories) · indie hackers | – | – | Linkoglot, Enrollo, Malatro as build logs |
| **PL career / education** | – | jak zostać programistą bez studiów / bez doświadczenia · technik programista (zarobki · egzamin · kwalifikacje · praktyki) · inf.03 (egzamin praktyczny · arkusze · github · 2026 czerwiec) · programista b2b (jaki podatek · ryczałt · vat · ksef) | – | Big PL demand, but the audience is students and juniors, not employers. One honest personal-story post is worth it (experience + entity facts); a full INF.03 cluster is off-goal |
| **Occupation** (for the hire/home pages, not posts) | freelance full stack developer (portfolio · hourly rate · resume) · polish software developer (salary) | programista full stack (co to · zarobki · praca) · portfolio programisty (przykłady) | desarrollador full stack (que hace · sueldo · freelance · remoto · españa) · portfolio desarrollador web (ejemplos) | Mostly job-seeker/salary intent (§4.1) |

### 6.3 What earns links and rankings (evidence is thin; labelled)

- **Third-party, old, generic:** Backlinko × BuzzSumo, 912M posts, 2019: "94% of the world's content gets zero external links"; posts > 3,000 words get "77.2% more referring domain links" than < 1,000 words; "'Why Posts', 'What Posts' and infographics" get "25.8% more referring domain links" than how-tos and videos. Shares and links barely correlate (r = 0.078) [web: https://backlinko.com/content-study, published 2019-02-19]. It is correlational and marketing-blog-heavy, so read it as a direction only.
- **For a developer, links come from things other people cite** [assumption]: original measurements, open-source tools with docs, reproducible benchmarks, and "why we chose X over Y" decision write-ups. He already has original data in this research folder (e.g. Lighthouse mobile medians of immersive vs minimal portfolios, 35.5 vs 74.5, `2026-10-05-performance-mobile-a11y.md`). That's a ready link-earning post.
- **Google's frame:** people-first, "Who, How, Why", first-hand experience (§2.5). No official cadence rule exists; a fixed publishing frequency is not a documented ranking factor [assumption, no Google statement found].

### 6.4 Plan

**Architecture:**

- Posts live on the main domain under `/blog/` (and `/pl/blog/`), not on Medium or a subdomain, so links accrue to the entity home.
- Cross-posts to dev.to / Hashnode carry a canonical back to the original (T13).
- Every post links to one case study and one pillar; every case study lists its related posts.

**Cadence [assumption]:** 1–2 posts/month the user can sustain while job hunting. A pillar every quarter. Update posts in place with a visible "Updated" date instead of re-publishing.

**Pillars → supporting posts:**

| Pillar (lang) | Supporting posts (target completions) |
|---|---|
| **AI-assisted dev with Claude Code: my real setup** (EN; PL version) | skills vs hooks vs MCP: when to use which · my CLAUDE.md + skills folder (claude code skills examples / folder) · R3F/three.js skills for Claude Code (react three fiber claude skill · three.js skills for claude code) · PL: "Claude Code po polsku: jak zacząć, ile kosztuje i czy rozumie polski" (co to · jak zacząć · cena · po polsku) |
| **i18n with Lingui, translated by AI** (EN) | Lingui vs i18next vs react-intl vs next-intl in 2026 (all four "lingui vs" completions) · Lingui + React 19 + Vite · `lingui-translate-ai`: how it works, cost, quality limits (which is also the honest answer to §3.3) |
| **Immersive but fast: three.js / R3F performance** (EN) | case study #0 "How I built a three.js portfolio that scores 90+ on mobile" (three.js portfolio · react three fiber performance) · "I ran Lighthouse on N award-winning portfolios" (original data) · R3F + WebGPU in 2026: what works (react three fiber webgpu · v10) |
| **Astro for a multilingual personal site** (EN; PL) | Astro vs Next.js for a portfolio + blog (astro vs next js for seo / for blog / 2026) · Astro i18n routing with hreflang done right (astro i18n routing) · View Transitions in Astro: what changed (astro 'view transitions' is deprecated · not working · fallback) |
| **Building products solo** (EN/PL) | Linkoglot build log (AI flashcards, Play Store) · Malatro (Balatro × matura math, PL audience) · PL story: "Od technikum do własnych produktów" (jak zostać programistą bez studiów) |

**First 6 posts at launch, in priority order:**

1. Case study #0 (portfolio performance).
2. Lighthouse on award-winning portfolios (original data).
3. Lingui vs i18next 2026.
4. Claude Code skills vs hooks vs MCP.
5. PL: Claude Code po polsku.
6. Astro vs Next.js for a portfolio.

Together they cover 4 of 5 pillars, two languages and the strongest proof of skill.

## 7. Domain

### 7.1 Availability [measured, 2026-10-05 ~15:27 UTC]

Method:

- **.com:** `rdap.verisign.com/com/v1/domain/<name>`.
- **.dev / .space:** `rdap.org` → redirected to the authoritative server (Google Registry `pubapi.registry.google`, Radix `rdap.radix.host`).
- **.pl:** `rdap.dns.pl`, cross-checked with `whois.dns.pl`.
- **.me:** has **no RDAP service** (even the control `nic.me` returns 404), so it was checked with `whois.nic.me:43`.
- **Controls:** `google.com`, `web.dev`, `onet.pl` → 200. Script `tools/seo-whois.mjs`, JSON in `tools/seo/rdap-*.json`.

"Not found" means unregistered at the registry right now. It doesn't guarantee standard pricing (premium or reserved lists) and could change at any moment. **Register before announcing.**

| Domain | Result |
|---|---|
| mateuszmuszarski.com | **Not registered** (Verisign 404) |
| mateuszmuszarski.pl | **Not registered** (dns.pl 404; WHOIS "No information available") |
| mateuszmuszarski.dev | **Not registered** (Google Registry 404 "mateuszmuszarski.dev not found") |
| mateuszmuszarski.me | **Not registered** (WHOIS "Domain not found.") |
| muszarski.com | **Not registered** (Verisign 404) |
| muszarski.pl | **Not registered** (dns.pl 404; WHOIS "No information available") |
| muszarski.dev | **Not registered** (Google Registry 404) |
| matmuszarski.com | **Not registered** (Verisign 404) |
| matmuszarski.dev | **Not registered** (Google Registry 404) |
| matmuszarski.pl | **Not registered** (dns.pl 404) |
| muszarski.space (old portfolio, still linked from GitHub) | **Not registered** (Radix 404): lapsed |
| **matmuszarski.space** (current) | Registered **2026-03-17** via GoDaddy, **expires 2027-03-17**, last changed 2026-03-22, NS `ns09/ns10.domaincontrol.com`, status flags `client delete/renew/update/transfer prohibited` (registrar locks) |

### 7.2 Keep matmuszarski.space or move?

| | Keep `matmuszarski.space` | Move to `mateuszmuszarski.com` (or `.dev`) |
|---|---|---|
| Equity to lose | Little: registered only ~7 months ago, no backlinks found beyond his own profiles, and Google ranks it only for the token "matmuszarski" (§1.1) | – |
| Name match | "mat" + surname is a handle, not the name people type | Exact full name: what a recruiter types after hearing it, and what appears in the email signature |
| TLD reading | `.space` ties the brand to the space theme the rebuild is leaving (synthesis §3) [assumption] | `.com` is the default people guess [assumption]; `.dev` signals developer, and the whole TLD is HTTPS-only via HSTS preload (fine on Vercel) [assumption: well-known registry policy, not re-checked] |
| Geo | – | Avoid `.pl` as primary: a ccTLD geotargets Poland only (§4.3) |
| Work | Zero | One migration (below), about an hour plus monitoring |

**Recommendation [assumption, user's call]:**

1. Primary **`mateuszmuszarski.com`**, or `.dev` if he prefers the signal.
2. Register **`mateuszmuszarski.pl`** + the other of .com/.dev as 301 redirects (defensive, and recruiters may type `.pl`).
3. Optional `muszarski.dev`/`.com` for a short email.
4. Re-register **`muszarski.space`** only if he wants to catch the stale GitHub/2D-portfolio links; fixing those links is cheaper.

The surname-only domains are short, but other Muszarskis in Pomorskie run businesses under the name (`skp-muszarski.pl`), so a surname domain identifies him less clearly than the full name.

### 7.3 Migration procedure (if moving)

1. **Before launch:** register the new domain(s); **renew matmuszarski.space through at least 2028-03** (expiry 2027-03-17 would otherwise fall inside the redirect window). Add both as **Domain properties** in Search Console with the same Google account ("You must be an owner of both the old and new properties … same Google account") [web: https://support.google.com/webmasters/answer/9370220].
2. **Map old → new.** The old site has only one HTML URL, so the map is short:

   | Old | New |
   |---|---|
   | `https://matmuszarski.space/` and `https://www.matmuszarski.space/` | `https://NEW/` |
   | `/assets/pictures/*.jpg` (the OG image other sites may have cached) | the new OG image, or let it 404 |
   | `2d.matmuszarski.space/*` | `https://NEW/` (or `/work/2d-space-portfolio`) |

   Any other path → `https://NEW/`, or a matching new page if it exists.
3. **Redirect with server-side permanent redirects (301/308)**, configured in Vercel on the old project (the domain stays attached to a redirect-only project). Google: "Keep the redirects for as long as possible, generally at least 1 year" [web: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes, updated 2026-08-20]; Change of Address requires "at least 180 days".
4. **New site live with self-canonicals, hreflang and sitemap on the new host;** submit the sitemap in GSC + Bing; IndexNow ping of all new URLs.
5. **GSC Change of Address** (old property → Settings → Change of address → new). Domain-level only. Not used for http→https, www/non-www, or subdomain-only moves, so `2d.` just gets a 301. It "forwards various signals … for a 180-day period" (same source).
6. **Bing Webmaster Tools:** add the new site and use its Site Move tool [assumption: tool exists in BWT; not re-verified]; IndexNow covers the URL changes.
7. **Update every external link the same day:** GitHub blog field, profile README "Portfolio" link (currently `muszarski.space`), repo homepages (`MuchaSsak`, `matmuszarski.space`, `2d-space-folio`), LinkedIn website, npm `package.json` `homepage`/`author.url` in both packages, Play Console developer website, Instagram bio, the pstrykweb.pl author page, the CV PDF. Google: "attempt contacting external sites to update their links" (site-move doc).
8. **Monitor:** expect "a few weeks or more" before the new URLs replace the old (site-move doc). Check GSC Page indexing on both properties weekly, and "Mateusz Muszarski" / "matmuszarski" SERPs monthly.

## 8. Prioritized SEO plan

### P0: before or at launch (these decide whether "Mateusz Muszarski" → this site)

| # | Action | Why (section) |
|---|---|---|
| 1 | Decide and register the domain (`mateuszmuszarski.com` or `.dev`, + `.pl` defensive); renew `matmuszarski.space` to ≥ 2028-03 | §7 |
| 2 | Decide the **one public story**: display name, seniority ("since 2022" vs "~6 years"), city line, current role. Apply it to the site, LinkedIn headline + website, GitHub bio/README, npm `author`/`homepage`, Play developer site, the pstrykweb.pl author page | §1.3, §2.1–2.2 |
| 3 | All content as static HTML. The home page opens with one factual sentence (name, occupation, place, stack). WebGL stays decorative and lazy | §2.1, T1, T16 |
| 4 | Unique static titles/descriptions/H1 per page per locale (T2–T4); one canonical host with a 308 (T5); self-canonicals | §5 |
| 5 | JSON-LD graph: `WebSite` + `ProfilePage` + `Person` (`@id` `/#person`, `sameAs`, `address` locality-only, real photo) on home and `/cv`; `BlogPosting` + `BreadcrumbList` on posts | §2.3 |
| 6 | i18n: EN at `/` (recommended) or a real 308 `/` → `/en/`; hreflang en/pl/es + x-default, reciprocal; per-locale OG; sitemap alternates | §3.2 |
| 7 | `robots.txt` (allow OAI-SearchBot/Bingbot/Googlebot), sitemap index, `/privacy` `noindex,follow`, OG 1200×630 per page, favicon PNG/ICO + SVG, a real 404 | T6–T8, T11, T12, T20 |
| 8 | HTML `/cv` (+ PDF with `Link: rel=canonical` to `/cv`) | T18 |
| 9 | GSC Domain property (DNS) + Bing import + IndexNow on deploy; URL Inspection on 4 templates | T9, T10 |
| 10 | Old domain: 308 everything, Change of Address, update every profile link the same day; kill the "Matthew" / `muszarski.space` traces | §7.3 |

### P1: first 3 months

| # | Action | Section |
|---|---|---|
| 11 | Blog launch with the 6 posts in §6.4; byline + author URL; "how this was written" line; RSS; dev.to/Hashnode cross-posts with a canonical | §2.5, §6.4, T13 |
| 12 | Complete `/pl/`. Decide `/es/`: ship only with a native reviewer, otherwise defer | §3.3 |
| 13 | Earn 3–5 independent mentions: client credit links (yws.lu …), npm READMEs linking the site, one Tricity meetup talk or write-up, a guest post | §2.1 #5 |
| 14 | Monthly check: "Mateusz Muszarski" SERP (Startpage + Bing), autocomplete for the name, GSC queries containing the name, an AI-answer spot check ("who is Mateusz Muszarski" in Google AI Mode / Copilot / ChatGPT search) | §1.1, §6.1 |
| 15 | Launch-gate script (title/OG/canonical/JSON-LD checks) in the build | T21 |

### P2: later or conditional

| # | Action | Condition |
|---|---|---|
| 16 | `/llms.txt` generated from the `/cv` data | Costs nothing; no ranking expectation (T15) |
| 17 | Freelance page `/pl/wspolpraca` for freelancer-intent PL queries | Only if D5 = freelance (§4.1) |
| 18 | Google Business Profile (service-area, hidden address) | Only if freelance **and** really meets clients in person (§4.2) |
| 19 | Claim the Knowledge Panel (sign in via Search Console/YouTube) | Only once a panel appears (§2.1) |
| 20 | Wikidata item | Only with independent, serious references (press, talks) (§2.1) |
| 21 | IPTC/`ImageObject` license metadata on `/my-life` photos | If his photography matters to him (§2.4) |

### Open questions for the user

1. Seniority: public sources say "began my coding journey in 2022" and "Student at Technikum"; the brief says ~6 years. What is the true, citable story?
2. Public location string: Starogard Gdański? Tricity? "Pomorskie, Poland" only?
3. Domain: `.com` vs `.dev`, and should `/` serve EN directly (recommended) instead of `/en/`?
4. Spanish: is there a native reviewer? If not, defer es?
5. D5 (freelance offer) decides the `/pl/wspolpraca` page and GBP.
6. Which photo becomes the one avatar everywhere?
7. Keep the "MuchaSsak" handle as `alternateName`? Drop "Matt/Matthew"?

## Not covered

- **Keyword volumes**: autocomplete only, no Keyword Planner/Senuto ranges.
- **Google SERP directly**: google.com returned a CAPTCHA, so Google results came via Startpage (unpersonalized, English UI), which can differ from google.pl's localized results, local pack and AI Overview.
- **DuckDuckGo and Brave**: bot walls.
- **Bing**: unquoted headless queries were degraded.
- **Profiles**: LinkedIn content behind the auth wall (only the search snippets were seen). X, Medium, Stack Overflow, Hashnode, CodePen not probed.
- **Backlinks**: no backlink audit (no Ahrefs/GSC access).
- **AI answers**: no test of what ChatGPT, Perplexity or Gemini say about him today.
- **Unverified claims**: Bing Site Move tool, `.dev` HSTS preload, dev.to/Hashnode canonical handling. The original Ahrefs AI Overview study was read via SEJ only. The llms.txt adoption studies and the Illyes/Mueller quotes come from one secondary roundup. The June 2025 removal of Google's robots.txt advice for auto-translated pages comes from a search result only.
- **Legal/privacy**: no review of showing business-register data or a street address. This file recommends locality-only.

Shared-machine caveat: SERP and autocomplete snapshots are single runs on 2026-10-05 from one Polish IP. Treat them as a snapshot, not a trend.
