# Conventions

> Code style, folders, git and the definition of done. How a session works: `working-agreement.md`.
> Stack and commands: `technologies.md`. Code-level rules get filled when Phase 1 scaffolds the app
> (start from the pstrykweb.pl landing's conventions, `research/2026-10-05-pstryk-reuse-audit.md`).

## Code style and naming

- **TypeScript strict** everywhere; React components in `.tsx` (PascalCase file + export); Astro components
  in `.astro` (PascalCase); routes and content files in kebab-case [assumption].
- **No hardcoded copy:** every user-facing string goes through Lingui (`i18n.md`); facts (name, email,
  availability) come from the site-facts data (`content-model.md`), never inline.
- **Islands are the exception:** a component hydrates (`client:*`) only when it needs interaction; the
  directive is chosen consciously (`visible` / `idle` / `media`), never `load` by default [research].
- **Design tokens only:** colours, spacing and motion come from tokens (`design.md`); a project's look is a
  theme object, never ad-hoc CSS.
- **Import alias:** a single one (`~/` → `src/`), no deep relatives [assumption, set at scaffold].

## Folder rules (target layout; created in Phase 1)

| Path | Holds |
| --- | --- |
| `src/pages/[locale]/` | routes (static, `getStaticPaths` over locales) |
| `src/components/` | `layout/`, `ui/`, `home/`, `work/`, `blog/`, `cv/`, `islands/` (hydrated only) |
| `src/content/` | collections: `projects/`, `blog/`, `legal/` (per locale) |
| `src/data/` | site facts, CV, credentials, skills, life items |
| `src/locales/` | Lingui catalogs |
| `public/` | robots.txt, llms.txt, favicons, `files/` (CV PDFs) |
| `scripts/` | build gates (SEO, links, launch, CV sync), media encoding, OG images |
| `assets/` | source assets + `references/` (never shipped), `assets.md` |
| `screenshots/` | accepted visual-QA proof (`working-agreement.md` § 2) |

## Error handling and logging

- **Contact endpoint:** validate on the server; return typed errors (400 / 429 / 502). Never log message
  bodies or emails; log only the event and the status.
- **Client:** every async UI has loading, success and error states; errors keep the user's input.

## Testing bar

Unit (vitest) for data and gates (CV hash, sitemap, slugs). Playwright e2e for flows (`requirements.md`
§ Key flows) plus the a11y/contrast/layout gates. Lighthouse on every route that a change can move.

## Git

- **Branch:** `main` + short-lived feature branches when useful.
- **Commits:** Conventional Commits (`feat(home): …`, `fix(cv): …`, `docs(wiki): …`, `chore: …`); WIP at a pause
  is `chore(wip): <where>`. Author and push rules: `CLAUDE.local.md`. Never skip hooks.
- **Never commit:** `context/`, `.env*`, research screenshots, large raw media (keep the encoded outputs only).

## Definition of done

`working-agreement.md` § 2 (owner chose the full bar from the `code` skill, 2026-10-05).

## Do NOT

- Hydrate a whole page, or ship the 3D chunk on the LCP path.
- Autoplay video during load.
- Put text over an image without a scrim.
- Add a tracker, cookie or third-party script without updating `compliance-and-data.md` and the privacy policy.
- Show a number, quote or project fact without a source (`requirements.md` § Content truth).
