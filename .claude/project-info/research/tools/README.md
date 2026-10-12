# Research measurement scripts

Date: 2026-10-05

These scripts were copied from the session scratchpad after the 9-track research run. They are kept for two reasons: to reproduce the numbers, and to **reuse as acceptance tests against our own build** (target: "impressive within 3 s AND usable in 1 click").

They were written during research, so they contain hardcoded site lists and paths. Edit the URL list before running.

| Script | Measures | Used by |
|---|---|---|
| `spec-usable.mjs` | Time until a nav, project or contact link, or ≥150 chars of text, is visible. Also detects gates or loaders at 3 s, counts clicks to contact, and takes screenshots at 3 s | spectrum track |
| `aw-ttu.mjs` | Time-to-usable for a control that is visible and hit-testable (`elementFromPoint`), under CDP slow-4G and 4× CPU throttling | Awwwards track |
| `theme-practical.mjs` | First contentful paint, time-to-usable, work/contact links in the DOM, contact on screen 1, mobile horizontal overflow | themes track |
| `spec-audit.mjs` | Transfer weight, readable DOM text, link counts | spectrum track |
| `stack-detect.mjs` | Fingerprints the framework and libraries of a live site (Next, Nuxt, Astro, Webflow, Framer, three, lenis, gsap) | stack track |
| `perf-run-lh.mjs`, `perf-median.mjs`, `perf-summarize.mjs` | Sequential Lighthouse mobile runs, the median of 3, and a summary table | perf track |
| `perf-mobile-check.mjs` | Phone viewport: whether the canvas renders, the DPR used, DOM text length, and whether `prefers-reduced-motion` is honoured (rAF rate under emulated reduce) | perf track |
| `perf-ctx-limit.mjs` | WebGL context limit probe | perf track |
| `data/lighthouse-*.json` | Raw medians and summary behind the table in `../2026-10-05-performance-mobile-a11y.md` §4 | — |
| `sec-cap.mjs` (`node sec-cap.mjs list.json`) | Desktop and mobile screenshots at a target (`top`, `footer`, `y:<vh>`, `css:`, `text:`). Also probes: `<h1>` in raw HTML, video `preload` / poster / orientation, sticky/fixed counts, top-level section heights in vh, footer links and height, JSON-LD types, forms, iframes, transfer MB. Output: `data/sec-probe.jsonl` | landing-sections track |
| `sec-seo.mjs` (`node sec-seo.mjs <urls…>`) | Raw-HTML SEO probe: JSON-LD types, `<h1>`, footer links / mailto / RSS, `rel="me"`, og:image, canonical, hreflang, status of `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/rss.xml`, `/feed.xml`. A 200 can be a soft-404, so check the content-type. Output: `data/sec-seo.jsonl` | landing-sections track |
| `serp-capture.mjs` (`node .claude/project-info/research/tools/serp-capture.mjs <outDir> [id\|g\|nog]`, from the repo root) | Name-search SERPs for "Mateusz Muszarski" on Google (en/pl, desktop + phone, images), Bing, DuckDuckGo and Startpage: full-page + first-screen shots and a JSON dump (organic results, knowledge-panel text). Headed Chrome; Google's CAPTCHA waits for a person to solve it. Uses the repo's Playwright | SERP before/after (`../2026-10-11-serp-baseline.md`) |
| `linkedin-banner/` (`node .claude/project-info/research/tools/linkedin-banner/render.mjs <outDir> [a,b,c]`, from the repo root) | The LinkedIn banner (1584 × 396) in three variants: a wall of real projects, the space remix (live since 2026-10-12), the fitted name. Own shaders, Anybody (OFL) and the site's own thumbnails; plus a sheet with LinkedIn's photo circle on desktop and phone. Uses the repo's Playwright | `../2026-10-12-linkedin-profile.md` § 10 |

**Requirements:** `npm i playwright lighthouse` in the folder you run from. For Lighthouse, set `CHROME_PATH` to a Chromium binary (for example Playwright's `chromium-*/chrome-win64/chrome.exe`).

**Caveat:** every result is a single run (or a median of 3) on one machine shared with other agents. Read the numbers as rankings, not absolutes.
