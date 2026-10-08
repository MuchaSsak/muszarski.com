# Usage: Astro + Tailwind in `apps/web`

> Binding conventions for writing pages and components. Why Astro: `technologies.md` § Decisions. Tokens and
> art direction: `design.md`. i18n mechanics: `usage/lingui.md`. Checks: `usage/visual-qa.md`.

## Pages and layout

- Every localized page lives under `src/pages/[locale]/`, exports `getStaticPaths = localeStaticPaths` (or its own list for
  pages that exist in fewer locales) and renders inside `BaseLayout` with `title`, `description` and `path` (the locale-free
  path, `""` for home). `BaseLayout` owns `<html lang>`, title (`Page – Mateusz Muszarski`, home = `Mateusz Muszarski – …`),
  description, robots, canonical, hreflang, OG basics, the head script (`ThemeScript.astro`: sets `html.js` + the stored
  motion pause; there is one colour theme), font preload, Umami and the skip link.
- Pass `locales` when a page exists in fewer locales; `path={null}` only for pages without a canonical (404).
- URLs: only through `~/lib/routes` (`pathTo`, `alternates`, `switchPath`). Never hand-write `/en/...`.
- Internal QA pages (the `/specimen/` token sheet) are built only in review builds (`getStaticPaths` returns `[]` when `IS_FULL_PRODUCTION`).

## Components

- `.astro` for routes, layout, head and static chrome. React `.tsx` for sections (server-rendered, no directive) when they
  carry logic; hydrate (`client:visible` / `client:idle` / `client:media`) only for real interaction, never `client:load` by default.
- Small interactions are vanilla `<script>` in the `.astro` component (bundled, deferred), like the CV button (`CvLink`) or
  the pause-motion toggle.
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
- Icons: `<Icon name="si:react" />` / `tb:*` / `tbf:*`; add a name to `scripts/icons.mjs`, run `bun run icons`. Icons
  reference the cached sprite; pass `inline` only for icons on the first screen (header, hero).
- JS-only controls (filters): class `js-only`, never the `hidden` attribute + reveal in a script (the late reveal
  shifted `/work/` by CLS 0.23). The head script sets `.js` before the first paint.
- The font subset must cover every character in the copy: `src/lib/font-coverage.test.ts` fails otherwise; add the
  character to `PUNCT` in `scripts/fonts.mjs` (or use one the font has), then `bun run fonts`.
- Breakpoints: `sm` 480 · `md` 768 · `lg` 1024 · `xl` 1440 · `2xl` 1920; the header collapses below 1180 (73.75rem).
- Motion: `--ease-out`, `--ease-pop`, `--dur-fast/base/slow` (200/350/800 ms). JS loops import `~/scripts/motion`
  (`motionStill`, `onMotion`); CSS loops run only in a section near the viewport (`.sec.near`, set by the motion
  script; a page's first section carries `near` in its markup) and pause under `.still`; the chapters' loops also
  wait for the first move (`html.woke`). The reduced-motion rule shortens every transition
  to 0.01 ms (read colours in tests with a poll).

## Head, CSP, SEO

- Astro's CSP is on (`astro.config.mjs` `security.csp`): inline scripts and styles get hashes automatically. A new third-party
  origin goes into the directives AND `legal/compliance-and-data.md`. React `style={{}}` attributes are allowed (`style-src-attr`).
- `robots.txt` is generated (`src/pages/robots.txt.ts`): review builds disallow all; the launch allows all + sitemap.
- Sitemap: `@astrojs/sitemap` with i18n alternates; only `/<locale>/` pages, never `/specimen/`.

## Gotchas (paid for)

- Astro 7 runs ONE `astro preview` per project. e2e, shots and Lighthouse share port 4322 and reuse it when it is up.
- `markdown.smartypants` is deprecated in Astro 7; smart punctuation is switched off on the processor instead
  (`satteri({ features: { smartPunctuation: false } })`: English curly quotes are wrong in Polish).
- `exactOptionalPropertyTypes` is on (strictest): optional props that may receive `undefined` are typed `T | undefined`.
- `satisfies Foo[]` keeps literal types, so optional fields vanish from items that lack them (ts2339 in the consumer):
  annotate the map callback (`(item: CertItem) =>`) (2026-10-06).
- Components rendered inside MDX get their `<style>` inlined without a CSP hash (blocked in the browser): put their CSS
  in a stylesheet the page imports (`styles/case.css`); check the console in a real browser, the build doesn't fail
  (2026-10-06).
- `Icon.astro` forwards Astro's scope attribute, so a scoped `svg` selector also hits icons: target drawn SVGs by class
  (2026-10-05).
- Inline `<script>`s render between sibling sections: count siblings with `:nth-of-type`, not `:nth-child` (2026-10-05).
- Astro does not scope `@keyframes` names: two components' `bob` collided. Prefix keyframes per component (`hw-`,
  `cr-`, `ai-`) (2026-10-06).
- A scoped `.cs :where(p)` reset is not low-specificity: Astro adds the scope attribute after the `:where()` too
  (`.cs[data-astro-cid-…] :where(p)[data-astro-cid-…]`, 0-3-0), so it beat the scoped class rules (0-2-0) and zeroed
  every margin of the CV sheet. Put resets in an unscoped `<style is:global>` (2026-10-08). A plain scoped element rule
  does the same: `.cs ul` (0-2-1) beat `.cs-bar` (0-2-0) and zeroed the contact bar's padding; reset lists by their own
  class (2026-10-08).
- `astro dev` is one per project too: a second one exits ("already running"). For a private run, `astro build --outDir
  .cache/<name>` and serve that folder yourself, as `scripts/cv-sheet.mjs` does (2026-10-08).

## Content, Markdown and generated files (2026-10-05)

- Posts: `src/content/blog/<en|pl>/<slug>.mdx`; legal: `src/content/legal/<en|pl|es>/<privacy|terms>.md`; schema in
  `src/content.config.ts`, cross-checks in `src/content/content.test.ts` (links, translations, PstrykWeb, legal numbering).
- Markdown runs on **Sätteri** (Astro 7's default): extend it with Sätteri mdast/hast plugin objects in `astro.config.mjs`
  (`satteri({ mdastPlugins, hastPlugins })`), never `markdown.remarkPlugins`. In use: `legalTokens` (mdast, the legal
  gap tokens), `tableScroll` and `externalLinks` (hast, a factory reading the post's locale from `fileURL`: an off-site
  `http(s)` link gets `target="_blank" rel="noopener"` and an `sr-only` "(opens in a new tab)" child via
  `ctx.appendChild` with a hast element; `rawHtml` is refused there) [user 2026-10-06]. Links in `.astro` components
  set the same attributes and note by hand (Lingui; hoist the string to the frontmatter when the macro sits in a nested
  conditional, or the build throws "t is not defined"). The launch gate fails a new-tab link without the note.
- Keyboard focus and the sticky header: `scroll-padding-top` does most of it; `SiteHeader.astro` re-scrolls a focused
  element left partly under the header (Firefox, focus moving up) and `Chapters.astro` re-scrolls to the flow position
  when WebKit leaves focus in a stuck chapter under the next poster; test focus in Firefox + WebKit (`bun run e2e:xb`).
  No `content-visibility: auto` (it threw WebKit's focus 300-700 px off and Lighthouse gained nothing). Animations in a
  section that is not `.near` wait on their first frame: don't fade what is visible on load (credentials' first card
  has no fade; axe once read a frozen fade at 1.6:1).
- Shared pieces for sections: `.sbar` (3-cell bar + drawn rule, add `draw`), `ui/StackList.astro` (`.stack`: "Built
  with" + plain marks and names, never chips), `.status`, `.toast` (global.css); chapters share `styles/chapters.css`
  (`ChapterBadge`, `.desc`, `.mstats`, reels with a `.r-hit` tap target); long text uses `styles/prose.css`.
- Entrance animations carry `.rise` or `.enter` so a stored pause shows them final. Never name a class after a Tailwind
  utility (`ring`, `shadow`, `border`, `container`...).
- Generated and committed: icons (`bun run icons`), fonts (`bun run fonts`), CV PDFs (`bun run cv:pdf`, needs the
  preview), share images + favicons (`bun run og`, needs a build). The launch gate fails while any is missing.

