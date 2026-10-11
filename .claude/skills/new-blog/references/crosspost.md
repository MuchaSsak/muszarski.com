# Cross-posting to dev.to and Medium

Copies of a post bring readers from where developers already read; the original on muszarski.com stays the one
that ranks. Everything here serves that: same quality as the site, the canonical pointing home, no burst that looks
like spam. Owner's rules: `seo.md` § Syndication. Tool: `scripts/crosspost.mjs` (run from the repo root).

## When

- **Suggest it** at the end of every new post (SKILL.md step 11) and after a big update to a post already out there.
  Post only on the owner's yes, per post.
- **One new post at a time, 3+ days apart** on each platform. The script refuses a second new dev.to post inside 3
  days (`--force` only on the owner's word). Updates to a post already out don't count.
- **After Google has the original**: Search Console → URL Inspection → "URL is on Google". A copy on a bigger site
  that Google finds first can outrank the original even with a canonical.
- **English only.** Neither platform has language versions of a post; pl would only be a duplicate. If a platform
  ever offers languages: en + pl, never es.

## What the owner does (keep it this short when you tell him)

Print it for the post: `node .claude/skills/new-blog/scripts/crosspost.mjs <slug> --plan`. It lists, with the exact
files, titles and descriptions:

1. **Search Console:** check the original is on Google.
2. **YouTube:** each video in the post, uploaded **Unlisted** (embeddable everywhere, not cluttering the channel or
   competing with the post), not made for kids, title and description from the plan. He sends the links.
   The film: the sharper master if there is one (`assets.md`), and a proper title, not the file name.
3. **dev.to:** nothing; Claude does it.
   Then **share the dev.to post on LinkedIn and Facebook** [owner 2026-10-11]: a line or two in his words + the link.
   Remind him every time a post goes out on dev.to.
4. **Medium** (a few days after dev.to): open the paste page Claude made, Ctrl+A, Ctrl+C → Medium → Write → paste;
   press Enter at the end of each YouTube link; ··· → More settings → Advanced settings → "originally published
   elsewhere" → the post's URL (the SEO step); Publish with the plan's tags; send Claude the link.
   Not the URL import: it drops every figure and leaves empty boxes [owner 2026-10-11]. Root cause: Medium's upload
   refuses WebP, and both the site and dev.to serve WebP, so the paste page points every picture at a JPEG made by
   wsrv.nl (checked by `--medium-page`). Importing the dev.to URL fails the same way.
5. **Settings, once:** none needed. dev.to "RSS Import Feeds" stays empty (it would pull every post as a draft,
   twice for the ones already posted).

## What Claude does

1. **Dry run:** `crosspost.mjs <slug>` must end with ✓: every own URL answers, code blocks kept, no unconverted
   markup. A new figure component fails here with "no markdown form": add one to `FIGURES` (a picture, a list or a
   table carrying the same information, never just dropped).
2. **Videos:** for each link the owner sends, `--youtube <src>=<link>` (it checks the video is embeddable, so a
   Private upload is caught). Missing videos fall back to their poster linking to the post; say which.
3. **dev.to:** `--devto` (draft; drafts need a login to view, so the owner may glance at it), then
   `--devto --publish`. Publishing runs `--verify`: canonical, "Originally published at", every image loads, the
   YouTube embeds, no raw markdown or liquid left, then screenshots.
4. **Look at it.** Open every screenshot `--verify` lists (desktop slices + phone). A check passing is not the same
   as reading well: look for empty boxes, broken order, a caption without its picture, a table squeezed on the
   phone. Headless desktop Chrome leaves YouTube boxes blank; the phone shot and the embed check cover them.
5. **Medium:** `--medium-page` builds the paste page from dev.to's published render (so dev.to goes first). Give the
   owner the file path and his steps. When he sends the story link: `--medium <url>` checks the canonical, takes
   screenshots, records it. Look at those too.
6. **Record and close:** `crosspost.json` is updated by the script; commit it with the wiki line (`seo.md`
   § Syndication "Done", `log.md`). Report: the URLs, the check results, what you looked at, what wasn't verified.

## Updating a post that is already out

The MDX is the only source. After the site deploys: `--devto --publish` updates the same dev.to article (never a
new one) and re-verifies. Medium copies are edited by hand: tell the owner exactly which paragraph or picture changed.

## Quality bar (same for every post)

- Same title, description and story as the original; the site-only words are rewritten (`OFF_SITE`: "tap through
  them", "the site you are on").
- Opens with "This post first appeared on my site…"; every internal link absolute to muszarski.com.
- Every picture keeps its alt text and caption; every clip is either its YouTube embed or its poster linking home.
- dev.to tags: max 4, lowercase alphanumeric (`case-study` → `showdev`); cover = the post's OG image (dev.to crops it
  to 1000 × 420: look at the top screenshot).
- Sources list at the end, as on the site.
- **Full AI disclosure** [owner 2026-10-11]: dev.to's label set by the API (`ai_disclosure_level: some_ai`, shown as
  "AI-assisted") and the same in words at the end of every copy (`AI_NOTE`), Medium included (it has no label).
- **dev.to series** "Building my portfolio" for the posts about building this site (`SERIES` in the script; it
  shows once two of them are out). A new post about the site goes in it.
- Medium paste page: pictures as JPEG (Medium refuses WebP), quotes one paragraph each (a quote holding a list, like
  the TL;DR, loses the quote: Medium splits it into empty quote bars), tables as lists, no blank paragraphs.
