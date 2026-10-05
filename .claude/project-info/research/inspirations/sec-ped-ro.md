# ped.ro (Pedro Duarte): skim-line bio hero

Date: 2026-10-05 · URL: https://ped.ro/ · Section: hero (a) · Screens: `img/sec-pedro-desktop.jpg`, `img/sec-pedro-mobile.jpg`

| Aspect | Observation [measured] |
|---|---|
| Move | The full bio paragraph is rendered as text but blurred; only 4 facts are sharp, in outlined pills: "Yo! I'm PEDRO", "I work at RAYCAST", "I live in BARCELONA", "find me on X" |
| Weight | 0.48 MB, no canvas; 1 `<video preload="auto">` background |
| Semantics | **No `<h1>`** in the raw HTML |
| Mobile | Same idea, but the 4 facts are spread over more than one screen (only 2 visible in 844 px) |

- **What works:** a 3-second layer and a full-depth layer in one element. Text-first, so LCP-safe.
- **Steal:** pills hold *proof* facts (role · years · shipped · CET · available from). Keep all of them within the first screen at 390 px. Add a "Read full bio" toggle and un-blur on focus.
- **Skip:** the blurred text as the only way to read the bio; the missing H1; a decorative autoplay video behind the text.
