# Sam Rose (samwho.dev) + Emil Kowalski: interactive explainer posts

Date: 2026-10-05 · Page type: blog post with live demos

URLs:
- https://samwho.dev/load-balancing/
- https://emilkowal.ski/ui/great-animations

Screenshots: `img/page-blog-samwho-post-1440.jpg`, `img/page-blog-emil-post-1440.jpg`

## What works [measured]
- **Sam Rose's simulations** sit inline between paragraphs, each in a dashed-border stage with a **restart button, a tortoise/hare speed slider and a pause button**. That gives the user control, which is good for accessibility and is what WCAG 2.2.2 asks for when something moves.
- **Coloured inline legend words** ("● requests", "● drop", "■ servers") tie the prose to the simulation without needing a separate legend.
- **Emil Kowalski's demos** sit in bordered "stage" cards with a **Replay** pill and a small credit line under the demo ("This visualizer is inspired by Morses's work").
- Posts are short, with each H2 stating one principle ("Great animations are fast", "…are interruptible").

## SEO gaps [measured]
- Neither site has JSON-LD or a canonical.
- Sam's `og:image` is a relative path.
- Emil's posts are `og:type=website`, and the `/ui` index URL returns 404.

## Steal
- A "demo stage" component: border + controls (Play/Pause, Replay, speed) + a caption/credit line.
- Hydrate the stage when it comes into view. Under reduced motion it starts paused, and a static poster is shown first so there's no layout shift.
- Inline colour-keyed terms that match the demo.

## Skip
- Demos as the only carrier of meaning. Always state the conclusion in text, so it works without JavaScript and for screen readers.
