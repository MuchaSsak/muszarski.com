# Writing a post

The voice is Mateusz's, in the first person: an engineer explaining a drawing to a colleague. Precise, candid, warm
(`brand.md` § Voice and tone). The post should read in one sitting and be skimmable in seven seconds.

## 1. The shape of an article

```mdx
---
(frontmatter, references/seo.md)
---

One paragraph, 2-3 sentences, ≤ 70 words, that answers the title outright. The answer, not a promise of one.

> **TL;DR**
> - 2 to 4 bullets: the answer, the rule or pattern, the catch.

## A question the reader asks first?

## The next question?

(figure, then the text that points at it)

## Limits

- What wasn't measured, tested on a real device, or reviewed by a lawyer.

One closing line with a next step: a link to the work, the CV, a related post or the live thing on the site.
```

- Headings are questions a reader would type or say ("How is a hover gated on this site?"), ≤ 60 characters, in the
  order they would ask them. "Limits" is the one plain heading. No H1 in the body: the page prints the title.
- The TOC lists H2 and H3, so H3s are for real sub-steps, not for styling.
- Sources go in the frontmatter (they print at the end with their access dates), not as a list in the body. Link a
  source inline where the claim is.

## 2. Quick to read

| Unit | Aim | Hard edge (post-check warns) |
| --- | --- | --- |
| Opening paragraph | 40-70 words | 80 |
| Paragraph | 2-4 sentences | 90 words |
| Sentence | 12-20 words | 35 words |
| Section | one idea, 1-4 paragraphs or a figure + 1-2 | |
| Code block | the ≤ 15 lines that matter, with a language | 25 lines |
| Article | 5-8 minutes | 10 minutes: cut or split |
| Figures | one per ~600 words, at least one | none |

- Lists for parallel items, tables for comparisons (a table is a figure too), bold for the one phrase per section a
  skimmer should catch.
- Cut: throat-clearing ("In this post I will"), restating the heading, a second example that proves the same thing,
  history the reader doesn't need, every "very", "really", "basically".
- Prefer the concrete: the file, the number, the date, the error message, what the screen showed.

## 3. Fun without being silly

Real things are fun: a clip of the thing moving, a before and after, the version that got rejected and why, the bug
that cost an evening, a verdict in his own words. Give each post one of those near the top. Keep the tone level: no
joke in every heading, no drawn gags, no exclamation marks; a wink is an emoji at most ("too vibe coded" was the
owner's verdict on props-with-jokes, lessons 2026-10-08).

## 4. Truth

- **Outside facts** (a spec, a statute, a vendor's limit, a statistic) have a primary source in `sources` with the
  date it was read. Quote the short phrase that carries the claim; paraphrase the rest.
- **Own facts** (what the site does, when, how long, how many) come from the code, `log.md`, `git log`, the wiki and
  real command output. Dates and durations are counted, not remembered ("three days" was four).
- **Measurements** say how: device or profile, throttling, date, lab or field, the median of how many runs.
- **The owner's facts** that no source confirms: ask. Owner-stated numbers can be off (lessons 2026-10-05).
- **Claims never to make** (`brand.md`): user or revenue numbers that don't exist, "Senior" by self-title, accredited
  Udemy, endorsements, anything internal about PstrykWeb, a metric without a source.
- Name the context of every project: client work, internship, own product, personal.

## 5. Words

- Follow `brand.md` § Voice and § Microcopy: no hype, no "passionate", "seamless", "robust" or "scalable" without a
  number, no "not just a coder" or any negative framing, "CV" never "resume", AI with the employers' verbs (delegate,
  verify, gates), never "10×" or "AI-powered developer".
- No em or en dashes (a test fails): a colon, a comma, parentheses or two sentences.
- Plain words over clever ones. Technical terms are fine when the reader searched for them; explain each the first
  time in a few words.
- The owner's chat phrasing can go in as his own sentence when it is the decision itself ("I wanted it to be fun to
  read"). Everything else is written for the reader.

## 6. Polish

- Written natively from the English outline, not translated line by line. Same headings (as questions), same
  figures, same sources, same "Limits"; post-check compares the pair.
- Informal "Ty" with courtesy capitals ("Twój", "Ci", "Cię"), as on the rest of the site (`brand.md` § Per locale).
- Polish quotation marks „…”; no em dashes either (the test covers both locales).
- Keep the terms Polish developers use ("build", "hook", "deploy", "commit") and translate the rest; avoid calques
  ("zrobić sens", "adresować problem").
- Polish runs ~10-15% longer; stay within ±25% of the English word count.
- Polish-specific context belongs in the Polish post (UODO, Polish law, Polish job market) and can replace an English
  example when it serves the Polish reader better.
- Read it aloud before committing. If a sentence sounds translated, rewrite it from the meaning.

## 7. Review (step 9, a fresh subagent)

Give the reviewer the post's text (MDX or the built page's text), the frontmatter, this file and `brand.md`. Ask for:

1. **7-second skim:** from the title, the TL;DR and the headings alone, what is the post's answer? Does it match?
2. **Facts:** every number, date, version and claim, checked against its source or the code; list the unsupported.
3. **Reading load:** the three hardest paragraphs and how to cut them.
4. **Voice:** banned words, marketing tone, AI-sounding filler, negatives.
5. **Pictures:** does each figure carry a point the text doesn't repeat? Alt text says what it shows?
6. **Polish:** sentences that read as a translation, with a native rewrite.
7. **Search:** would the title and description win the click for the target query? A better seoTitle?
