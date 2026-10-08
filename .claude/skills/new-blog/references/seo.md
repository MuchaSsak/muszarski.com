# Search and crawlers

The site already does the plumbing for every post. The writer's job is the part a template can't do: the words a
searcher sees, the question the post answers, and the links that tie it into the site. Site-wide rules:
`.claude/project-info/site/seo.md`.

## What every post gets for free (don't duplicate it)

- `BlogPosting` JSON-LD: headline (the title), description, `inLanguage`, published and modified dates, the share card
  as `image`, tags as `keywords`, `wordCount`, the author as the site's one `Person` (`#person`, url → My life), plus a
  `BreadcrumbList` (`src/lib/schema.ts` `postGraph`).
- Canonical, `og:type` article with `article:published_time` / `modified_time` / `tag`, `twitter:card`.
- hreflang between the en and pl versions that share a `translationKey`; none for a one-language post.
- RSS per blog locale, the sitemap with `lastmod` from the dates, `/llms.txt`, the author box (E-E-A-T: a real person
  with a photo, a page about him, contact), the dated Sources list.
- The share card, once you run `bun run og` after a build.

## Checklist (step 7)

**Frontmatter**

| Field | Rule |
| --- | --- |
| `title` | 20-110 chars (the H1 and the JSON-LD headline). The honest promise, with the query's words early |
| `seoTitle` | ≤ 60 chars, the `<title>` when `title` runs past ~60. Query first: "Hover effects on phones: tap and focus twins" |
| `description` | 110-155 chars: what the reader gets and why to trust it. Not a copy of the title; no "In this post" |
| slug (file name) | lowercase, short, the query's words, per locale (Polish words in Polish). Never changes after publishing (see SKILL.md § Updating) |
| `translationKey` | short, the same in both locales |
| `published` / `updated` | ISO dates; `updated` only for a change a reader would notice, in both locales |
| `tags` | 1-4 from `BLOG_TAGS`; `case-study` makes it a case study everywhere (card, OG, breadcrumb) |
| `cover` | a `BLOG_COVERS` motif that fits the topic; a new one is drawn in `PostCover.astro` |
| `related` | 2-3 `translationKey`s, closest first; add this post to their `related` when it fits better than what's there |
| `featured` | one post at a time (the case study today): it leads the index and wears the home rail's sticker |
| `sources` | every outside fact: `title` (name + publisher), `url`, `accessed` |

**Body**

- The opening paragraph answers the query in plain words (it is what a snippet and an AI overview quote).
- Question headings match how people ask (People also ask, the docs' own wording).
- Internal links: 2+ to other posts, with anchor text that says where it goes ("[how the CV PDF is printed](...)",
  never "here"), and 1+ to the work, the CV, My life or a home section. Links use full locale paths
  (`/en/blog/<slug>/`, `/pl/cv/`); `content.test.ts` checks they exist.
- Links in: add the new post to 1-3 older posts where it answers a question they raise, in both locales.
- External links go to primary sources.
- Every figure has alt text that says what it shows and what to notice; captions carry the point or the credit.
- Nothing hidden from a crawler: the text is in the HTML (no text inside images or canvases only), and every image or
  clip has words next to it.

**Wiring**

- A new Polish slug goes into the Polish list in `apps/web/vercel.json` (`/blog/:slug(...)/` → `/pl/blog/:slug/`), so
  `muszarski.com/blog/<slug>/` reaches it. A slug both locales share goes into the shared rule instead (the case
  study's `case-study`). `locale-free.test.ts` fails until it's there.
- After `bun run build`: `bun run og`, then commit `public/og/{en,pl}/blog-<slug>.png` (the launch gate fails on a
  missing card).
- After the deploy (owner): URL Inspection in Search Console for a new flagship post; the IndexNow ping runs with the
  deploy (`seo.md` § Crawl and indexing setup).

## Speed is SEO too

A post must keep the site's budget (Lighthouse mobile ≥ 90, the H1 is the LCP). Pictures go through `Shots`
(`astro:assets`, responsive widths, lazy) and clips through `Clips` (no bytes until the reader interacts and scrolls
near). No iframes or third-party scripts: they cost speed and need a privacy-policy entry first. Run `bun run lhci`
on a post with clips or more than ~6 pictures.
