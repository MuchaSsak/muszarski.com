---
name: new-blog
description: "Plan, write, update or review a blog post or case study on Mateusz's site (MDX in apps/web/src/content/blog, English + Polish): research, outline, real pictures and clips of the site, native Polish, SEO for Google and the checks. Use whenever the owner wants a new article, post, write-up, case study, wpis or artykuł; wants a post updated, shortened, made easier to read, more visual, more fun or better for search; asks to audit or polish the blog; or types /new-blog. Use it too when a change to the site makes a post or the case study out of date."
argument-hint: "[topic, project, or the post to update]"
---

# New blog post or case study

Every post has two readers. A person, often a recruiter or a tech lead skimming between calls, who should get the point
from the title, the TL;DR and the headings, and enjoy the rest. And a crawler, which should understand who wrote it,
what question it answers and how it links to the rest of the site. The owner's bar, from the case study round
(2026-10-08): "really simple and quick to read, and even more visuals", "fun to read and go through", "highly
informational, with accurate research and quick explanations of my thought processes".

## The map

| Piece | Where | Notes |
| --- | --- | --- |
| Posts | `apps/web/src/content/blog/{en,pl}/<slug>.mdx` | Polish slugs are Polish; `translationKey` pairs the two. Polish-only posts exist (`claude-code-po-polsku`) |
| Schema + tags + covers | `apps/web/src/content.config.ts`, `src/lib/blog.ts` (`BLOG_TAGS`, `BLOG_COVERS`) | title 20-110, seoTitle 15-60, description 80-160, ≤ 4 tags, ≤ 3 related, sources with `accessed` |
| Hard rules (tests) | `src/content/content.test.ts`, `src/lib/locale-free.test.ts` | translations pair up, related keys and internal links exist, no em/en dashes or raw no-break spaces, nothing about PstrykWeb, every slug has a locale-free redirect |
| Post page | `src/pages/[locale]/blog/[slug].astro` | prints the H1, dates, reading time (220 wpm), TOC (H2 + H3), sources, author box, related; JSON-LD, hreflang, RSS, sitemap and share card come for free (`references/seo.md`) |
| Figures | `src/components/blog/case/` (`Shots`, `Clips`, `Flow`, `Matrix`, `Timeline`, `Versions`, `Breaker`), CSS in `src/styles/case.css` | what each is for: `references/visuals.md` |
| Covers | `src/components/blog/PostCover.astro` | code-drawn, one motif per topic; a new motif = a `BLOG_COVERS` entry + a palette + the drawing |
| Pictures | `src/assets/blog/<translationKey>/` (articles), `src/assets/case/` (case study #0); clips in `public/media/blog/<translationKey>/` | WebP stills, AV1 + H.264 clips with a WebP poster |
| Tools | `scripts/post-check.mjs` (reading + SEO lint), `scripts/capture.mjs` (screenshots, phone strips, clips, overflow) | both in this skill's folder |
| Rules this skill applies | `brand.md` (voice, banned words), `content-model.md` § Blog post + § Keeping the case study current, `seo.md`, `i18n.md`, `assets.md` (licences, quotation), `compliance-and-data.md` (embeds) | read the parts the post touches |

## Workflow

1. **Intake.** Decide the kind: an article (one question, answered) or a case study (`references/case-study.md`). Name
   the reader, the search query it should win, and the CV claim it proves (`brand.md` § Four proof pillars). Collect the
   owner's own angle and words. Ask only what blocks you: a fact only he knows, a client's rights, quoting someone
   else's screenshots. Never invent a fact, number, date or quote.
2. **Research.** Search the query: what the top results say and miss, the questions people ask. Read primary
   sources (MDN, W3C, official docs, the statute) and note each with its access date. Gather this project's own
   evidence: `log.md`, `git log`, the wiki page, `run-notes.md`, real command output, the code itself. A measurement
   says how it was taken (device, throttling, date, lab or field). Bigger research goes in
   `.claude/project-info/research/<date>-blog-<topic>.md`.
3. **Outline.** Title, seoTitle, description, slug, then the headings as the questions a reader asks, in the order
   they'd ask them. Mark where each figure goes and what it proves. The headings alone should tell the story.
4. **Pictures first.** Make or pick the figures before the prose, so the text points at them instead of repeating
   them (`references/visuals.md`). At least one per post; about one per 600 words.
5. **Write English** (`references/writing.md`): opening paragraph that answers the title, a TL;DR, short sections, a
   plain "Limits" list, a next step at the end. First person, his voice.
6. **Write Polish natively** (`references/writing.md` § Polish): the same story, headings, figures (Polish UI in the
   shots) and sources, in natural Polish, not a translation. Spanish has no blog (`i18n.md`).
7. **Wire it** (`references/seo.md` § Checklist): frontmatter, cover, `related` both ways, links from 1-3 older posts
   to the new one, the Polish slug in `vercel.json`, a share card. A Breaker or figure that mirrors a live part of the
   site gets a row in `content-model.md` § Keeping the case study current, if it is the case study.
8. **Check.** From the repo root:
   - `node .claude/skills/new-blog/scripts/post-check.mjs <locale>/<slug>`: 0 errors; fix each warning or say why not.
   - `bun run check` (schema, content and redirect tests, typecheck).
   - In `apps/web`: `bun run i18n:extract` if a component changed, `bun run build` (launch gate), then `bun run og` and
     commit the new `public/og/{en,pl}/blog-<slug>.png`.
   - Look at it: `node .claude/skills/new-blog/scripts/capture.mjs overflow --urls /en/blog/<slug>/,/pl/blog/<slug>/`
     and shots at 390 and 1440 (`bun run shots -- --paths ...`); posts with clips or many pictures also get
     `bun run lhci -- /en/blog/<slug>/` (mobile ≥ 90; prefix `MSYS_NO_PATHCONV=1` in Git Bash).
   - e2e when a component or the post page changed: `bunx playwright test e2e/a11y.spec.ts e2e/layout.spec.ts`
     (add the post to `e2e/routes.ts` `PAGES` if it carries new components).
9. **Truth pass + fresh eyes.** Re-read every number, date, count and claim against its source; fix what drifted.
   For a new post or a case study, hand the rendered text to a fresh subagent with `references/writing.md` § Review:
   the 7-second skim, facts vs sources, voice, the Polish read aloud. Fix what it finds.
10. **Close.** Wiki: `seo.md` § Content plan (the post exists), `content-model.md` for a new figure type or rule,
    `log.md` line. Commit your own paths (Conventional Commit, `docs(blog):` or `feat(blog):`). Report: the URLs,
    minutes to read, figures, what post-check still warns and why, what wasn't verified.

## Updating or polishing a post

Update in place: keep the slug, the `translationKey` and `published`. Bump `updated` (both locales) when the content
changes for a reader (a new section, a corrected fact, new figures), not for a typo. Re-run step 8. A slug that has to
change gets a permanent redirect in `vercel.json` and a line in `locale-free.test.ts`, like the case study's move.
A post that names code (`scripts/x.mjs`, a component) is checked against the code: post-check flags files that no
longer exist, and the prose around them usually drifted too.

## Rules that keep posts good

- The work is the point: show the thing (a shot, a clip, the code that matters), then explain it. A portfolio blog
  proves skill; it isn't an essay about the author.
- Simple beats complete: one question per post, one idea per section, the rest in Sources.
- Numbers only where they are the point (the before, the result, the measured claim); never decorate with counts, and
  never repeat in text what a figure shows [user 2026-10-08: "talks too many times about lighthouse and numbers"].
- Fun from real things: a story with stakes ("the bug that failed every message"), honest verdicts, the rejected
  option, a clip. Never a drawn gag or a joke in every heading; a wink is an emoji at most.
- No self-review sections ("Takeaways", "What I'd do differently"); honest gaps go in "Limits".
- Nothing internal about PstrykWeb; client or internship work only with rights `ok` and within the project's Public
  disclosure (`content/projects/*.md`).
- No third-party embed (YouTube, CodePen, tweets) without a privacy-policy update first: it is a new service seeing
  visitor data (`compliance-and-data.md` § Keeping the legal pages current).
