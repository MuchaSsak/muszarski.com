# Rebrand comps (design exploration, never shipped)

Live HTML comps of the hero + one project section (Linkoglot), one per rebrand direction, built for the owner to pick
from (`working-agreement.md` § 9, Rebrand gate). They are throwaway prototypes: plain HTML, inline CSS/JS, Google Fonts,
raw WebGL2. Nothing here is imported by `apps/web`; the picked direction is rebuilt properly in the app.

| File | Direction | Signature |
| --- | --- | --- |
| `orbit.html` | 1 Orbit | 52k GPU particles: a ringed planet behind the name that re-forms into the project's device on scroll |
| `poster.html` | 2 Poster | the name justified edge to edge by a variable font's width axis; letters breathe around the cursor |
| `toybox.html` | 3 Toybox | ray-marched clay toys with soft shadows; each toy is a fact, the phone stands on a toy plinth |
| `exhibit.html` | 4 Exhibit | a night gallery: oxblood wall, shader spotlights, dust, cursor torch, museum placards |
| `poster-full.html` | round 2: Poster, the owner's pick | the whole home page: 4 project chapters (own colour + product visual), How I work, AI workflow, credentials, contact, footer; themes Cobalt / Paper / Ink and fonts Anybody / Roboto Flex via the bottom bar, `?theme=&type=` or `#paper-flex` |
| `poster-r3.html` | round 3: the owner's notes | tool marks with names, a reel per project (seek chips, play/pause, expand), PstrykWeb #1 order loop, product loop, AI pipeline, Stack grid, expanding credentials, message-first contact, pause motion. Icons are an inline sprite from Simple Icons 16.34.0 (CC0) + Tabler 3.49.0 (MIT), built by a script from the npm tarballs |
| `index.html` | review page | published as an artifact (the link is in `.claude/project-info/log.md`); round 3 on top, then round 2 before/after, then round 1 |

- **View locally:** `python -m http.server 4391 --bind 127.0.0.1` inside `comps/`, then open `http://127.0.0.1:4391/`.
  `media/` is gitignored (the owner's Linkoglot store preview + icon, copied from `assets/projects/linkoglot/`).
- **Shoot:** `node comps/shoot.mjs orbit poster toybox exhibit [--widths=1440,390] [--t=5] [--reduced=1]` with that server
  running; `?shot&t=<s>` freezes the animation clock. `poster-full` adds `--sections` (one shot per `[data-shot]` section),
  `--q=theme=paper` and `--tag=paper` for variants. Scratch shots go to `shots/.work/` (gitignored); the accepted
  webp shots sit in `shots/`.
- **Placeholders in the comps:** "open to work", "Poland, CET" / "remote" wording, the CV size (70 KB), dead nav links,
  the 332 px Linkoglot clip, the email `hello@matmuszarski.space`, the demo form, credential details, the Cetuspro / Neoteric
  labels (pending permission). None of it is a decision.
- **Licences (hard rule):** all comp fonts are Google Fonts under SIL OFL; media is the owner's own. The space clip's planet
  textures are CC BY 4.0 (credited under the clip); its lens-dirt texture is unverified (`design/assets.md`).
