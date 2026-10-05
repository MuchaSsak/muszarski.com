# Usage: Astro + Tailwind in `apps/web`

> Binding conventions for writing pages and components. Why Astro: `technologies.md` § Decisions. Tokens and
> art direction: `design.md`. i18n mechanics: `usage/lingui.md`. Checks: `usage/visual-qa.md`.

## Pages and layout

- Every localized page lives under `src/pages/[locale]/`, exports `getStaticPaths = localeStaticPaths` (or its own list for
  pages that exist in fewer locales) and renders inside `BaseLayout` with `title`, `description` and `path` (the locale-free
  path, `""` for home). `BaseLayout` owns `<html lang>`, title (`Page – Mateusz Muszarski`, home = `Mateusz Muszarski – …`),
  description, robots, canonical, hreflang, OG basics, theme script, font preload, Umami and the skip link.
- Pass `locales` when a page exists in fewer locales; `path={null}` only for pages without a canonical (404).
- URLs: only through `~/lib/routes` (`pathTo`, `alternates`, `switchPath`). Never hand-write `/en/...`.
- Internal QA pages (the `/specimen/` token sheet) are built only in review builds (`getStaticPaths` returns `[]` when `LAUNCH_BUILD`).

## Components

- `.astro` for routes, layout, head and static chrome. React `.tsx` for sections (server-rendered, no directive) when they
  carry logic; hydrate (`client:visible` / `client:idle` / `client:media`) only for real interaction, never `client:load` by default.
- Small interactions are vanilla `<script>` in the `.astro` component (bundled, deferred): the theme toggle is ~1 KB this way.
  Anything that needs JS must be usable or hidden-without-shifting when JS is off (`visibility: hidden` until ready).
- Facts (name, links, dates) come from `src/data/site.ts`; copy comes from Lingui. No inline facts, no inline copy.

## Styling (Tailwind 4)

- Only design tokens exist: the default palette, breakpoints and type scale are reset in `@theme`. Colours: `paper`, `paper-raised`,
  `ink`, `ink-muted`, `line` (decorative only), `grid`, `accent`, `on-accent` (`bg-paper`, `text-ink-muted`, `border-line`...).
- Type: `text-label · sm · base · lg · xl · 2xl · 3xl · display` (fluid, 390 → 1440); faces `font-sans` (Archivo 400/600),
  `font-display` (Archivo Expanded 800, use `font-extrabold`), `font-mono` (IBM Plex Mono 400). Helpers: `.label` (mono caps),
  `.shell` (capped 90rem + gutter), `.tabular`.
- Breakpoints: `sm` 480 · `md` 768 · `lg` 1024 · `xl` 1440 · `2xl` 1920.
- A sheet that needs another stock sets `.theme-light` / `.theme-dark` or its own `--paper` / `--ink` / `--accent` on the element.
- Line weights: `--stroke-outline` 2 px, `--stroke-detail` 1 px, `--stroke-construction` 0.75 px; SVG strokes use
  `vector-effect: non-scaling-stroke`.
- Motion: `--ease-out`, `--ease-in-out`, `--dur-fast/base/slow` (200/400/900 ms). The global reduced-motion rule shortens every
  transition to 0.01 ms (read colours in tests with a poll).

## Head, CSP, SEO

- Astro's CSP is on (`astro.config.mjs` `security.csp`): inline scripts and styles get hashes automatically. A new third-party
  origin goes into the directives AND `legal/compliance-and-data.md`. React `style={{}}` attributes are allowed (`style-src-attr`).
- `robots.txt` is generated (`src/pages/robots.txt.ts`): review builds disallow all; the launch allows all + sitemap.
- Sitemap: `@astrojs/sitemap` with i18n alternates; only `/<locale>/` pages, never `/specimen/`.

## Gotchas (paid for)

- Astro 7 runs ONE `astro preview` per project. e2e, shots and Lighthouse share port 4322 and reuse it when it is up.
- `markdown.smartypants` is deprecated in Astro 7; smart punctuation is set on the markdown processor when MDX arrives.
- `exactOptionalPropertyTypes` is on (strictest): optional props that may receive `undefined` are typed `T | undefined`.
