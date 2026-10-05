# Usage: Lingui in `apps/web`

> Binding conventions for translatable copy. Policy (locales, URL scheme, review status, coverage): `site/i18n.md`.
> S0 passed on the real scaffold 2026-10-05: extract → build, 3 locales, macros in `.astro` and the catalogs compiled on import.

## Writing copy

- `.astro`: `import { t, Trans, Plural } from "lingui-for-astro/macro"` → `{t`Text`}`. The request's locale comes from
  `src/middleware.ts` (`setLinguiContext` from `params.locale`).
- `.tsx` sections: `@lingui/react/macro` inside an `I18nProvider` per React root, with `getI18n(locale)` from `~/lib/i18n` (one
  cached instance per locale; never a global `activate()`).
- Hydrated islands get already-translated strings as props, so no catalog ships to the browser.
- Interpolations use named local variables (`t`Language: ${current}``), never a bare variable as the whole message.
- Long-form text (case studies, posts, legal) is per-locale content files, not Lingui.
- Render-time typography: wrap body copy in `typo(locale, …)` (`~/lib/typography`). It binds Polish/Spanish one-letter words
  and number + unit with a no-break space, so catalogs never hold raw no-break spaces.

## The loop

1. Write the English string in code.
2. `bun run i18n:extract` (`lingui extract --clean`): adds/removes msgids in `src/locales/{en,pl,es}/messages.po`.
3. Fill `pl` (owner-reviewed for high-visibility strings) and `es` (AI translation; the catalog header keeps
   `X-Review-Status: unreviewed (AI translation)`).
4. `bun run test`: `src/locales/catalogs.test.ts` fails on a missing msgid, an empty msgstr, changed `{placeholders}` / `<n>`
   tags, a raw no-break space or an em/en dash.
5. `bun run build`: `@lingui/vite-plugin` compiles `.po` on import and, in builds, fails on a message missing from a catalog
   (`failOnMissing: "catalog"`). There is no committed compiled catalog.

## Gotchas

- `npx lingui` outside `apps/web` reaches the npm registry; use `bun run i18n:extract`.
- The Write tool decodes `\uXXXX` escapes into raw characters; keep invisible characters out of source and catalogs
  (write `"\u00a0"` via a script, or use `typo()`).
- `lingui-for-astro` is pre-1.0 with one maintainer: keep `.astro` copy thin so dropping it costs a few `i18n._(msg…)` calls.
