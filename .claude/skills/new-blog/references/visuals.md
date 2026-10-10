# Pictures, clips and diagrams

Every post shows something. The best figure is the real thing on this site (a screenshot, a clip of it moving, the
code that matters); the next best is a diagram made from text (`Flow`, `Matrix`, a table). A figure carries one point,
and the prose points at it instead of repeating it.

## Pick the figure by its job

| Job | Use | Notes |
| --- | --- | --- |
| Show a page, a component, a before and after | `Shots` | 1 = big; 2-4 = a grid; `phones` puts phone screens in one row; `tag` ("Before", "Now"), `picked` highlights one |
| Show motion (hover, a shader, an animation, a flow through the UI) | `Clips` | ≤ 6 s, muted loop, 960×600; `dir="/media/blog/<key>/"` for articles |
| A whole film with sound (a walkthrough, a film made for the client) | `Film` | one per post, near the top; 1920×1080 AV1 + H.264 with AAC in `public/media/blog/<key>/`, a WebP poster in `src/assets/blog/<key>/`; plays in a dialog only on click |
| Explain a process or a pipeline | `Flow` | 3-7 steps: icon, short title, one line; `loop` for a cycle. Icons are `IconName`s from `src/lib/icons.gen.ts` (new ones: `scripts/icons.mjs`, then `bun run icons`) |
| Compare options | a Markdown table | the rejected option in the table is half the story |
| Two scores across many items | `Matrix` | a real table (screen readers), the sweet spot hatched, not colour alone |
| Versions over time | `Timeline` | date, verdict stamp (`tone`: yes / no / plain), one line; a screenshot or a cover motif |
| One part through its rounds | `Versions` | tabs: screenshot, the decision, why it changed |
| Send the reader to a live demo on the site | `Breaker` | a dark band with steps and a button; mirrors a live part, so it joins the "keep current" table |
| Code | a fenced block with a language | the ≤ 15 lines that matter; link the full file on GitHub if public |

Components take all their text as props from the MDX (per locale) and have their CSS in `src/styles/case.css` (the
CSP blocks styles injected by MDX components; `tech/usage/astro.md` § Gotchas). A new figure type goes there too, with
a `cs-`-style prefix, and in `content-model.md` § Blog post.

Import in the MDX (after the frontmatter):

```mdx
import Shots from "~/components/blog/case/Shots.astro";
import pressEn from "~/assets/blog/hover-tap/press-en.webp";

<Shots
  shots={[{ image: pressEn, alt: "A primary button pressed into its shadow under a fingertip, on a phone", tag: "Tap" }]}
  caption="The press state works with a finger; the lift only with a mouse."
/>
```

## Making the pictures

1. **Build in launch mode** so projects without cleared rights never appear, and serve it on its own port (one
   `astro preview` per project; e2e owns 4322):
   ```sh
   cd apps/web
   IS_FULL_PRODUCTION=true npx astro build --outDir C:/Users/Mucha/wtb-shots
   npx astro preview --outDir C:/Users/Mucha/wtb-shots --port 4345     # in the background
   ```
2. **Capture** with `scripts/capture.mjs` (repo root; `--out` is relative to `apps/web`):
   - `page --url /en/work/ --out src/assets/blog/<key>/work-en.webp` (1440×900 → 1200 px; `--phone` for 390×844 @2×)
   - `el --url /en/ --sel ".more" --out ... [--scale 2]` (one element, e.g. a card, the footer, the author box; `--scale 2` for small ones)
   - `strip --urls /en/,/en/work/,/en/cv/ --out ...` (phone screens side by side on navy)
   - `clip --url /en/work/ --sel "[data-xray]" --out public/media/blog/<key>/xray [--seconds 6] [--click]` (records
     while the pointer glides over the element; writes AV1 + H.264 + a WebP poster). Needs `ffmpeg` with libsvtav1.
   - `--wait 2500` gives entrances and shaders time; `--reduced` shoots the reduced-motion state.
3. **Both locales:** a shot of the UI is taken in the post's language (`/pl/...` for the Polish post). Code and
   diagrams can be shared.
4. **Look at every file** before using it: the right state, nothing half-loaded (a black poster means it hadn't
   loaded), no rights-`check` project, no personal data, no other person's face.
5. **Sizes:** stills are WebP (the launch gate fails on other formats), 1200 px wide, usually 40-150 KB; clips 100-450
   KB for AV1. Anything bigger: shorter clip, smaller crop, fewer frames of motion.

Old versions of the site come from `comps/` and the `history/*` git tags (`comps/HISTORY.md` indexes them); never
re-create an old version from memory.

## Words for pictures

- **alt** says what the picture shows and what to notice, in one sentence, ≤ ~150 chars: "Round 2: a grid of seven
  credential cards, each with a paragraph". Never "screenshot of" or "image of". A picture that only decorates gets
  `alt=""`, which is rare in a post.
- **caption** carries the point, the date or the credit ("The home page in Lighthouse on mobile, 7 October 2026").
- **Clips** get a `label` (their accessible name) and keep the pause button; they never autoplay before an interaction.
- **Film** gets a visible `label` ("Watch the film"), a `title` (the dialog's name) and its length in `seconds`; the
  caption says what it is and that it has sound.
- **Tables** have a header row; a `Matrix` has its caption.

## Rights

- Everything follows the licence rule (`assets.md`): the owner's work, code-drawn, or a licence that allows commercial
  use with its credit. Unknown licence = not used.
- Screenshots of other people's sites: only as a quotation in critical analysis, and only with the owner's OK for that
  post (the `assets.md` exception was granted for the case study's research): small, the author's name and domain on
  it, commentary next to it, no person's photo in the frame.
- Logos only where the brand's own guideline allows it (`assets.md` § CV marks); a tool's name in text is always fine.
- Client or internship work only with rights `ok`; PstrykWeb shows nothing internal.
