# Case studies

Case studies live in the blog (`structure.md`: no `/work/<slug>/` pages), tagged `case-study`, so they get the poster
card, the "Case study" share card and breadcrumb. A case study proves a claim on the CV with evidence: what the
problem was, what he owned, what he decided and what came of it. It shows how he thinks, not only what he built.

## Before writing: the gate

- Read the project's dossier, `.claude/project-info/content/projects/<project>.md`: its rights status (client or
  internship work is shown only with `ok`), its Public disclosure section (what may be named, shown, counted) and its
  NDA level. Anything unclear goes to the owner before a word is written.
- PstrykWeb: nothing internal (AI generation, the pipeline, internal tools, counts), ever (`brand.md`).
- Collect the evidence: `log.md` (the timeline, with the owner's verdicts), `comps/HISTORY.md` and the `history/*` tags
  (every version), `research/` notes, `memory/run-notes.md` (measured numbers), Lighthouse reports, the git history.

## The sections

Headings are questions (`content-model.md` § Case-study body). Keep the ones that have something true to say:

1. TL;DR box: before → after, in 2-4 bullets. The only place besides the result where the big numbers sit.
2. What is it, and for whom?
3. What was wrong before? (the before-state, measured, with a picture or a clip of it)
4. What did I own? (role, team, the parts that were his)
5. What were the constraints? (time, budget, devices, law, a client's rules)
6. 2-3 decisions, each with the rejected options and why (a table works well)
7. How does it fit together? (a `Flow` or a code-drawn diagram with a text alternative)
8. What was the hard part? (≤ 15 lines of code, or a clip)
9. What came of it, and how was it measured?
10. Limits

## The build-story pattern (case study #0)

`/blog/case-study/` tells how this site was built. Its parts are a pattern for any case study about a process:

| Part | What it shows | Figure |
| --- | --- | --- |
| The rules I worked by | the framework, up front, short | a list |
| Version by version | each round, its verdict, why it changed | `Timeline` |
| Why rebuild? | the old thing's measured problems | a clip of the old thing + a list |
| What is it for? | the goal that decided everything else | text |
| The research | method, findings, what I took from others | `Matrix`, quoted phone shots (owner's OK) |
| Why not the other option? | the rejected direction, fact by fact | a table + clips of what was chosen |
| How I run the AI | the process as a team | `Flow` + a `Breaker` to the live story on home |
| Each part through its rounds | the decision per round | `Versions` |
| The other pages, the details | breadth | `Shots` (desktop + a phone strip) |
| Accessibility, SEO, checks, stack | the quality behind it | short lists, a `Flow`, a table |
| Where did it end up? | the result | one picture |

## Mindset, not a diary

- Show the thinking at each step: the goal, the constraint, the options, the choice, the verdict. A reader should be
  able to reuse the framework.
- Keep the owner's honest verdicts ("too vibe coded", "the safe first look was rejected"): they make it real and fun.
- The rejected option is half the story; never pretend the first idea was the right one.
- Don't narrate every day. One line per round; the pictures carry the rest.

## Keeping it current

A case study about the live site goes stale when the site changes. Every part that mirrors the live site gets a row
in `content-model.md` § Keeping the case study current (what changes → what to update), and the working agreement makes
that update part of the same change. History (old rounds, rejected directions, the old site, quoted references) is
never replaced.

## Slugs

The main one is `/en/blog/case-study/` + `/pl/blog/case-study/` (a slug both locales share; `vercel.json` sends `/blog/case-study/` by the reader's language).
Later case studies take `<project>-case-study` in both locales (e.g. `linkoglot-case-study`), added to the shared-slug
rule in `vercel.json` the same way.
