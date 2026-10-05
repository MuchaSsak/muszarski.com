# Project: 3D space portfolio (the old site)

> Dossier for flagship #4. Owns this project's facts, story angles, theme, rights and shot list.
> Fields: `content-model.md`. Raw research: `research/2026-10-05-project-space-clockful-archive.md` § A, C1.

## Facts

| Fact | Value | Source |
| --- | --- | --- |
| What | a 12-stop scroll-driven WebGL camera journey, Earth → Neptune; each planet holds a portfolio section (about, experience, CV, certificates, projects, contact) | [user], [research: repo + live] |
| Stack | three 0.177, R3F 9, drei, postprocessing (lens flare), GSAP, Vite 6, EmailJS, React | [research: package.json] |
| Craft | **13 hand-written GLSL shader programs** | [research: counted in repo] |
| Year / licence / stars | 2025 · MIT · 8★ | [research] |
| Git history | one import (2025-09-02) + 14 owner commits up to 2026-03-26. The real build time can't be recovered | [research] |
| Code | https://github.com/MuchaSsak/3d-space-portfolio (public; was `MuchaSsak/matmuszarski.space`) | [user] 2026-10-05 |
| Live | https://3d-space-folio.vercel.app/ (moved off `matmuszarski.space`, which now belongs to the new site; the 2026-10-05 measurements below were taken on the same app at matmuszarski.vercel.app) | [user] 2026-10-05 |
| Role / team | solo | [user] |

## Measured flaws (the honest "before" for case study #0) [research, 2026-10-05]

- **13.8 MB** downloaded before the START gate (7.6 MB of it is an emoji font).
- **Navigation:** the journey moves only with the mouse wheel. No touch swipe, no keyboard path.
- **Phones:** an "Oops!" screen.
- **Lighthouse:**
  - desktop: perf 60, LCP 1.2 s, TBT 1,240 ms
  - mobile: perf 34, FCP 42.5 s, LCP 46.9 s
- **Crawlability:** no indexable body text in the raw HTML (`site/seo.md`).

## Card candidates

- **Outcome:** "A portfolio you fly through: Earth to Neptune in a 12-stop WebGL camera journey."
- **Proof chip:** "13 GLSL shader programs".
- **Stack chips:** three.js · React Three Fiber · GLSL · GSAP · Vite.
- **Context tag:** "Personal / creative".

## What it proves

- **Creative WebGL craft:** custom shaders, camera choreography, postprocessing (Bruno Simon's Three.js Journey).
- **Growth and judgment:** the new site exists because of these measured failures. Telling that honestly reads as
  seniority. Link to case study #0 (F23).

## Presentation

- **Media kind:** `live`.
  - A drawn monitor with a 20–40 s landscape loop, and a dimension label "desktop · WebGL2 · ~14 MB".
  - A "Why it was rebuilt" note.
  - Fine pointer: "Launch on desktop ↗". Coarse pointer: "Desktop-only experience" + Copy link.
  - **No WebGL on the home page.**
- **Theme:** a dark sheet with an orrery / star-chart plate. The motif is orbit ellipses as compass construction lines.
- **Temporary media** (`assets/projects/space-portfolio/`): 15 `tmp-` screenshots (13 desktop journey stops, 2 phone) +
  raw 100 s journey and two 20 s clips. `placeholders.md` P9.
- **Credits:** third-party textures/models are credited in the site's credits dialog. Carry those credits into the case study
  (research § A5).

## Open (project-specific)

Domain settled for now: the space site lives on at 3d-space-folio.vercel.app, the new site takes matmuszarski.space [user] 2026-10-05 · what he'd do differently (write it as the bridge to #0) · research
open questions § "Open questions for the owner".
