---
name: awwwards
description: "Optional craft-elevation resource for this site: study award-level sites on Awwwards (free to browse via Playwright) and lift ONE section or signature moment from correct-but-flat to memorable, inside the rules this project already has. Use when a built section reads generic/template-like in screenshots, when design research wants a craft/motion/typography reference Mobbin doesn't show, or when design-references.md asks for a signature moment. Never replaces gen-design, design.md or the section plan; no quota, no fixed time box: use it when it adds value, skip it when it doesn't."
user-invocable: false
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebSearch
  - WebFetch
  - mcp__playwright
  - mcp__shoogle
  - mcp__shadcn
  - mcp__magicui
  - mcp__aceternityui
---

# awwwards — optional craft elevation

Adapted from Sam Luker / Switchyard's MIT "awwwards" skill for this pipeline. An extra
resource next to Mobbin, web search and the component MCPs. Nothing here is mandatory.

## What stays in charge

- `design.md` owns palette, type, spacing, the signature element. `design-references.md`
  owns each section's archetype, surface and visual. This skill sharpens execution; it
  never re-picks fonts or colors, and never asks for sign-off (there is no human in the loop).
- The bars are unchanged: `design-quality.md`, `performance.md` (LCP/TBT/CLS budgets),
  `usage/motion.md` (one library: Motion; reduced motion; one signature moment per view),
  `color.md`, the Playwright screenshot loop (`usage/playwright.md`).
- Real content only: no fake logos, metrics or testimonials.

## When it earns its place

- A section's screenshot reads like the "default shape" `design-references.md` said to beat.
- The brand/feel calls for a showcase moment (hero, a gallery, a signature scroll beat)
  and the plan names it but not HOW.
- Design research wants a craft reference for motion, typography or art direction.

A calm, utilitarian brand may not need any of it. That's a valid outcome.

## How

1. **Look (only as long as it's useful).** Playwright → `https://www.awwwards.com/websites/`
   (Sites of the Day; filter by category close to the business or the feel). Open 1–3
   winners that match THIS brand's register, screenshot desktop + ~390px mobile, and note
   the specific move: type scale contrast, image cropping, a scroll reveal's pacing,
   hover micro-interaction, how whitespace carries weight. If something is worth keeping,
   record it in `.claude/project-info/inspirations/<slug>.md` like any other source.
   Most winners are agency showcases: borrow the craft, never WebGL heroes or
   scroll-jacking that a local-business site on a phone can't afford.
2. **Find the parts.** Before hand-building, check whether a component already exists:
   `shadcn` / `magicui` / `aceternityui` MCPs, or `shoogle` for every other public registry
   (`usage/shoogle.md`). Retoken whatever you pull.
3. **Apply to ONE thing at a time.** One section or one signature moment, then screenshot
   at 390 / 1024 / 1920 and compare with the before. Keep it only if it's clearly better
   and stays within the performance and motion budgets.

## Moves that usually lift a flat section

- Stronger type contrast: a much larger display size against quiet body copy, tight
  leading on headlines, one italic/serif accent where `design.md` allows it.
- Asymmetry and overlap instead of centred stacks: image bleeding off the grid, text
  over a cropped detail, staggered columns (while respecting the archetype ledger).
- Depth without weight: grain/noise overlay, layered transparencies, soft shadows from
  the token set, a subtle gradient mesh behind a section, never the default purple glow.
- Motion with meaning: a paced entrance stagger (never on the hero's h1 / lead / primary CTA /
  hero image, which paint in the first frame - `e2e/lcp.spec.ts`), a scroll-linked reveal or progress, a
  magnetic CTA, a tilt on a card that invites a click (recipes: `reference/motion-recipes.md`,
  mechanics and gotchas: `usage/motion.md`).

## Anti-patterns (reject)

- Centred hero with one heading + one subhead + one button and nothing else.
- Purple/blue gradient on white, default library colors, demo copy left in.
- Effects stacked in one view (marquee + beams + tilt + parallax).
- Motion that delays content or ignores `prefers-reduced-motion`.
- Anything that pushes LCP/CLS over budget for a flourish.
