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

## Styling (Tailwind 4 + scoped CSS)

- Poster tokens live in `global.css` (`design.md` § Themes and fields). A section takes a field class
  (`field-hero · field-alt · field-deep · field-bar · field-accent`) and `sec` (full-bleed field, content capped at 1920 via
  `--pad-x`); children read `--sbg` / `--sfg` and `--accent` / `--on-accent`. Tailwind colours: `sbg`, `sfg`, `accent`,
  `on-accent` only.
- Components style themselves in scoped `<style>` blocks; shared pieces are global: `.btn` (+ `btn-line · btn-acc · btn-inv ·
  btn-icon`), `.kick`, `.ico`, `.draw-line`, `.rise` (first-screen CSS entrance), `.rv` (reveal below the fold).
- Type: one face (`font-sans` = Anybody). Hierarchy through `font-stretch` (the `wdth` axis) and weight, never another family.
  Fitted lines: `<Fit lines={[...]} as="h2" base={[66, 96]} />`; add any new character to `DISPLAY` in `scripts/fonts.mjs`.
- Icons: `<Icon name="si:react" />` / `tb:*` / `tbf:*`; add a name to `scripts/icons.mjs`, run `bun run icons`.
- Breakpoints: `sm` 480 · `md` 768 · `lg` 1024 · `xl` 1440 · `2xl` 1920; the header collapses below 1180 (73.75rem).
- Motion: `--ease-out`, `--ease-pop`, `--dur-fast/base/slow` (200/350/800 ms). JS loops import `~/scripts/motion`
  (`motionStill`, `onMotion`); CSS loops pause through `.off` / `.still`. The reduced-motion rule shortens every transition
  to 0.01 ms (read colours in tests with a poll).

## Head, CSP, SEO

- Astro's CSP is on (`astro.config.mjs` `security.csp`): inline scripts and styles get hashes automatically. A new third-party
  origin goes into the directives AND `legal/compliance-and-data.md`. React `style={{}}` attributes are allowed (`style-src-attr`).
- `robots.txt` is generated (`src/pages/robots.txt.ts`): review builds disallow all; the launch allows all + sitemap.
- Sitemap: `@astrojs/sitemap` with i18n alternates; only `/<locale>/` pages, never `/specimen/`.

## Gotchas (paid for)

- Astro 7 runs ONE `astro preview` per project. e2e, shots and Lighthouse share port 4322 and reuse it when it is up.
- `markdown.smartypants` is deprecated in Astro 7; smart punctuation is set on the markdown processor when MDX arrives.
- `exactOptionalPropertyTypes` is on (strictest): optional props that may receive `undefined` are typed `T | undefined`.
