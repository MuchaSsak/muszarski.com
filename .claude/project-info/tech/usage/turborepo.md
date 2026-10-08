# Usage: Turborepo + bun (the monorepo)

> Binding conventions for the repo layout and commands. Decided by the owner 2026-10-05 ("i want turborepo"), same
> shape as his pstryk repo. Stack versions: `technologies.md`. Folder rules inside the app: `conventions.md`.

## Layout

| Path | Package | Holds |
| --- | --- | --- |
| `apps/web/` | `@package/web` | the site (Astro 7, `usage/astro.md`) |
| `packages/shared/` | `@package/shared` | code more than one app or script needs; today only `@package/shared/locales` (the one locale list) |
| root | `muszarski-portfolio` | `turbo.json`, `tsconfig.base.json`, `eslint.config.js` (one flat config), `prettier.config.js`, `bun.lock`, `.gitattributes` |

- A new package goes in `packages/<name>` with `"name": "@package/<name>"`, `exports` pointing at `src/*.ts` (no build step), and
  `typecheck` / `lint` / `test` scripts so `turbo run check` covers it.
- Something moves into `packages/shared` only when a second consumer exists (an OG script, a future app). One consumer = it stays in the app.

## Commands

| Do | Run (repo root) | Notes |
| --- | --- | --- |
| install | `bun install` | text lockfile `bun.lock` is committed; CI and Vercel use `--frozen-lockfile` |
| dev | `bun run dev` | `turbo run dev --filter=@package/web` (astro dev on 4321) |
| check | `bun run check` | typecheck + lint + test in every package, cached by turbo |
| build | `bun run build` | `turbo run build` (cached by inputs; `PUBLIC_*`, `IS_FULL_PRODUCTION`, `VERCEL_*` are part of the hash) |
| app scripts | `bun run e2e` · `lhci` · `shots` · `fonts` · `i18n:extract` | forwarded to `apps/web` |

- Binaries live in each package's `node_modules/.bin` (bun's isolated linker). Use `bun run <script>` or `bunx <bin>`; `npx lingui`
  from the wrong folder goes to the npm registry instead.
- Turbo prints `cache hit` when nothing changed: that is a real pass of the cached result, not a skipped check.

## Vercel

- Project **Root Directory = `apps/web`**; framework Astro; install and build on auto (bun is detected from `bun.lock`).
- The quick deploy check before a push: a clean clone (only committed files), `bun install --frozen-lockfile`, `bun run build`.
  Passed 2026-10-05 (install 5.3 s, build 1/1). `bun.lock` carries the Linux Lingui native binary.
- A production build on the domain (`muszarski.com`) is not the launch: only `IS_FULL_PRODUCTION=true` is, and the launch gate fails it
  while placeholders remain (`apps/web/scripts/launch.mjs`, `placeholders.md`).
