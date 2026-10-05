# Maggie Appleton: digital garden (blog index + post + about + now)

Date: 2026-10-05 · Page types: blog index, blog post, about, now

URLs:
- https://maggieappleton.com/garden
- https://maggieappleton.com/garden-history
- https://maggieappleton.com/about
- https://maggieappleton.com/now

Screenshots: `img/page-blog-maggie-garden-1440.jpg`, `-390.jpg`, `img/page-blog-maggie-post-1440.jpg`, `img/page-life-maggie-about-1440.jpg`

## What works [measured]
- **The only personal blog in the sample with a complete JSON-LD graph.** It links three nodes by `@id`:
  - `WebSite` (`#website`): author and publisher point to `#person`, `inLanguage en-GB`.
  - `Person` (`#person`): url `/about`, `sameAs` ×6, description.
  - `Article` (`#article`): headline, `datePublished` 2020-06-10, `dateModified` 2021-05-28, image, author and publisher pointing to `#person`.

  The post also sets `og:type=article`, `article:published_time` / `modified_time` and `article:author` = `/about`, plus a canonical and `robots: index, follow`.
- **Garden index:**
  - a "167" count above a huge serif H1 "The Garden", then a one-line dek;
  - a TOPICS chip scroller plus "All Growth Stages" and "All Types" selects;
  - a mixed masonry: essays as cover cards, notes as text rows, podcasts with a thumbnail, each with type and a relative date.
- **Post header:**
  - eyebrow "ESSAYS · 🌿 EVERGREEN" (type + growth stage);
  - H1, then a grey serif dek;
  - topic links on the left, **"Planted over 6 years ago / Last tended over 5 years ago"** on the right, both above a hairline.
- **Left sticky "Table of Contents"** (28 anchors, nested), with a big illustrated cover.
- **Prose:** 22 px / 44 px Canela Text, about 78 characters per line. Generous and very readable.
- **About:** a giant name with a self-deprecating one-liner, then a "A LITTLE CONTEXT" section and a portrait.
- **Now:** a dated log, newest first.

## Steal
- The `@id` graph: one Person referenced everywhere.
- A dek under every H1.
- Growth-stage or type metadata. For this portfolio: Note / Essay / Case-study companion.
- Human date labels **backed by real `<time datetime>` values**.
- A left TOC on wide screens.

## Skip
- The garden filters before there are 15+ posts.
- A 34k px tall Now page. Show the last 3 entries.
- Her 404 is a bare host default, with no navigation or links. Don't copy that.
