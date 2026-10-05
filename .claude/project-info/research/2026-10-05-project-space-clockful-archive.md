# Project research: 3D Space Portfolio, Neoteric Clockful, and the public-repo archive

Date: 2026-10-05

Scope: everything verifiable about flagship A (the 3D space portfolio, `matmuszarski.space`), flagship B
(Neoteric Clockful), and an inventory of every public GitHub repo of `MuchaSsak` for the all-projects page.
It fills `content/content-model.md` § Project and `design/design.md` § Per-project themes.
Evidence tags: [measured] fetched/run this session (method stated) · [repo] from the GitHub API or repo files ·
[owner] the owner's own words in the brief · [web] read on a live page today · [opinion] my judgement.

## TL;DR

- **A, 3D Space Portfolio (2025, solo, public, MIT):** R3F + three 0.177 + GSAP + 13 hand-written GLSL programs; a 12-stop,
  wheel-only camera journey Earth → Neptune. Measured: **13.8 MB transferred before START** (7.6 MB of it an emoji font),
  Lighthouse **desktop 60 (LCP 1.2 s, TBT 1.24 s)**, **mobile 34 (FCP 42.5 s, LCP 46.9 s)**; phones get an "Oops!" gate and
  touch can't advance the journey. Great craft card and a ready-made "before" for case study #0.
- **B, Neoteric Clockful (2026, solo in git, PRIVATE repo, UNLICENSED):** Next 16.3 + Supabase RLS + TanStack Query, Polish
  UI "clockful". Postgres enforces employee/admin roles (5/5 tables RLS, 12 policies, audit trigger, no DELETE). Tests: 49 Vitest + 69
  Playwright. Built autonomously with Claude Code from a 19.08.2026 spec; uploaded 27.08.2026 (≈ 9 days, inferred). Runs locally
  without secrets for UI review (captured). The name Neoteric appears only in the repo name.
- **D, Archive:** 26 public repos, none are forks. 2 homepage hosts and 1 README link don't resolve (`*.muszarski.space`),
  mesku.art is down, and the GRIND APK link is dead. Keep about 12, hide about 13.

## A. 3D Space Portfolio (matmuszarski.space)

### A1. Identity and links

| Fact | Value | Source |
| --- | --- | --- |
| Repo | `MuchaSsak/matmuszarski.space`, public, MIT, 8 stars, 0 forks, 0 open issues | [repo] |
| Live | `https://matmuszarski.space` → 307 → `https://www.matmuszarski.space/` (200); `https://matmuszarski.vercel.app/` (200), the same build | [measured] curl 2026-10-05 |
| Repo description | "Fully immersive 3D portfolio which explores the solar system 🚀" | [repo] |
| README | Title "3D Space Folio 🌌", one line ("A fully immersive 3D portfolio themed around space. Built using React + WebGL/Three.js"), an acknowledgements list, MIT. No screenshots, no setup steps | [repo] |
| `package.json` version | `1.1.7` (releases cut by a Conventional Changelog GitHub Action) | [repo] |
| Languages | TypeScript 327 KB · CSS 5 KB · HTML 2 KB · JS 1 KB | [repo] `/languages` |
| Locales | en + pl (Lingui `.po` catalogs) | [repo] |
| "Older portfolio" fallback link | `https://2d.matmuszarski.space` → `www.2d.matmuszarski.space` (200). Note: the `2d-space-folio` repo's homepage field says `2d.muszarski.space`, which does **not** resolve | [measured] |

### A2. Exact stack (from `package.json`, caret ranges as written)

- **3D:** `three ^0.177.0` · `@react-three/fiber ^9.1.2` · `@react-three/drei ^10.1.2` ·
  `@react-three/postprocessing ^3.0.4` · `@andersonmancini/lens-flare ^1.0.1` · `r3f-perf ^7.2.3` (only on `#debug`) ·
  `leva ^0.10.0` (debug UI).
- **Motion / audio:** `gsap ^3.13.0` · `use-sound ^5.0.0`.
- **UI:** `react ^19.1.0` · `react-dom ^19.1.0` · `tailwindcss ^4.1.11` (+ `@tailwindcss/vite`) · shadcn/ui-style
  Radix primitives (`@radix-ui/react-*`: alert-dialog, avatar, checkbox, dialog, label, popover, select, slider, slot,
  tooltip) · `cmdk` · `lucide-react ^0.541.0` · `sonner ^2.0.7` · `class-variance-authority` · `clsx` · `tailwind-merge`.
- **Forms / contact:** `react-hook-form ^7.62.0` · `zod ^4.1.3` · `@hookform/resolvers ^5.2.1` · `@emailjs/browser ^4.4.1`.
- **i18n:** `@lingui/core` / `@lingui/react ^5.4.0` (+ cli, swc-plugin, vite-plugin).
- **Build:** `vite ^6.3.5` · `@vitejs/plugin-react-swc ^3.9.0` · `typescript ~5.8.3` · ESLint 9 + `typescript-eslint` +
  `simple-import-sort`. Yarn lockfile. Manual chunks for three / R3F / drei / postprocessing / gsap / leva.
- **No tests** in the repo (no test runner in `package.json`, no test files) [repo].

### A3. Structure and notable techniques [repo]

```
src/
├─ canvases/space/
│  ├─ SpaceCanvas.tsx           R3F <Canvas>, EffectComposer + LensFlare, lazy-loaded sections
│  ├─ components/CameraControls.tsx   the scroll journey: 12 GSAP camera tweens (16 KB)
│  ├─ contexts/SpaceContext.tsx       planet positions/refs shared by sections
│  ├─ earth|mars|jupiter|saturn|neptune/   per planet: Model + hooks (textures, position, leva debug) + shaders/
│  ├─ stars/                    points with a per-star size attribute, custom shader
│  ├─ asteroids/                GLB model + float animation (asteroids carry job-experience logos)
│  └─ sections/ hero · jobExperience · certificates · projects · contact   (drei <Html> + <Text3D> content)
├─ canvases/shaders/classic3DPerlinNoise.ts   GLSL classic 3D Perlin noise
├─ components/ StartupScreen · MobileWarning · TopBar · ScrollIndicator · Credits/Graphics/Audio/Language buttons · ui/
├─ contexts/ ScrollContext · SettingsContext · LanguageContext
├─ lib/constants.tsx           all content (jobs, certificates, projects, links, EmailJS ids)
└─ locales/en|pl/
public/assets/ fonts · models/asteroids.glb · textures/<planet>/2k_*.jpg · pictures/ (startup screen + project thumbnails) · résumé PDFs (en, pl)
```

- **Custom GLSL (inline template strings): 13 shader programs (26 vertex/fragment files) + a classic 3D Perlin noise include.** Every planet has its own `base` + `atmosphere`
  vertex/fragment pair; Earth also has a `clouds` pass; Saturn has a `ring` shader; stars have a points shader.
  The Earth base shader mixes day/night textures by sun orientation (`smoothstep(-0.25, 0.5, …)`), adds a fresnel
  atmosphere with a day/twilight colour mix, and specular highlights masked by the clouds texture; the atmosphere
  shell fades by view angle and sun side [repo]. [opinion] The Earth shader follows the structure of the "Earth shaders"
  lesson of Bruno Simon's Three.js Journey (which the owner lists as completed 12/2024–01/2025), extended to five
  planets and a ring. Say "built on the Three.js Journey approach" if asked; do not claim the technique as invented.
- **Post-processing:** `EffectComposer` (MSAA 0 or 4 by preset) + Anderson Mancini's `LensFlare` with a lens-dirt texture
  (occlusion disabled in v1.1.2 "fix: disable lens flare occlusion").
- **Graphics presets** (`SettingsContext`): `low` 🥔 = anisotropy 2, no MSAA, no antialias, no depth; `high` ⚡ = anisotropy 8,
  MSAA 4, antialias, depth. ACES filmic tone mapping. Settings persist in `localStorage`; there is a reset dialog.
- **Startup screen:** a pre-rendered spaceship console image (Blender; CC-BY "Modular Sci-fi Floor" and "Type 30 Console"
  models credited) with perspective-skewed DOM buttons (Language / Graphics / Sounds / START) placed onto the render.
  START plays a door SFX, closes two door panels with a GSAP bounce, opens them onto the scene, then starts music at 5 s.
- **3D text:** drei `<Text3D>` with a Space Grotesk Bold typeface JSON (322 KB) for "MUSZARSKI PORTFOLIO".
- **Animated document title** (`AnimateDocumentTitle.tsx`), a scroll indicator coloured per planet.

### A4. The scroll journey (what it contains) [repo + measured]

The page never scrolls. A `wheel` listener (`{ once: true }`, re-armed after each step, `flushSync` to stop fast wheels from
skipping steps; the code comment: "You have no idea how much trouble and time this little wheel event firing too fast for state
to update cost me…") advances a **discrete state machine of 12 stops**. While a camera tween runs (1–8 s), input is ignored.

| Stop | Planet | Content | Camera tween |
| --- | --- | --- | --- |
| 0 | Earth | "MUSZARSKI PORTFOLIO" 3D title, lens flare | 1 s |
| 1 | Earth | close-up of the title | 1 s |
| 2 | Earth | "About me 👋" (3 paragraphs: technikum student, full-stack + creative dev, hobbies) | 3.5 s |
| 3 | Earth | "I originate from Poland 🇵🇱", Instagram link for travel photos | 2.25 s |
| 4 | Mars | "Job Experience" title | 3.5 s |
| 5 | Mars | asteroids carrying logos (Beniaminek 03, European Solidarity Corps/LIDOSK, Ruigrok); click opens a dialog | 3.5 s |
| 6 | Mars | download résumé (en/pl PDFs) | 1.75 s |
| 7 | Jupiter | "Certificates" title | 5 s |
| 8 | Jupiter | certificate cards (4 Erasmus+/youth exchanges 2025, Three.js Journey, Jonas Schmedtmann React + JS courses, Blender, CompTIA A+, UX writing, marketing psychology); inner wheel-scroll list | 3 s |
| 9 | Saturn | "Projects" title | 5–8 s |
| 10 | Saturn | carousel of 7 projects (React ClickMe, Home Budget, LingoType, Youth Work Synergy, Enrollo, 2D Space Portfolio, Beniaminek 03 Screensaver) with Code / Visit buttons; inner list needs **100 wheel ticks** (0.01 each) to leave | 7 s |
| 11 | Neptune | Contact form (subject + message → EmailJS) | 8 s |

Measured: a full pass took **≈ 85 s** from START to the contact form with a script scrolling as fast as the tweens allowed
(START at 6.3 s → Neptune at 90.0 s) [measured, Playwright].

### A5. Third-party assets and licences (credits dialog 🏅, `CreditsDialogButton.tsx`) [repo]

| Asset | Author / source | Licence as credited | Bytes |
| --- | --- | --- | --- |
| Planet textures (`2k_earth_daymap/nightmap/specular_clouds`, mars, jupiter, saturn + ring, neptune) | Solar System Scope | CC BY 4.0 | 2.6 MB on disk (Earth specular-clouds JPG alone 1.65 MB) |
| `asteroids.glb` — "Wandering Asteroids Of Andromeda" | ARCTIC WOLVES™ (Sketchfab `skfb.ly/psECZ`) | CC BY 4.0 | 4.6 MB |
| "Modular Sci-fi Floor" (startup render) | decstar77 (Sketchfab) | CC BY 4.0 | baked into JPGs |
| "Type 30 Console" (startup render) | themighty808 (Sketchfab) | CC BY 4.0 | baked into JPGs |
| Music (`music.ogg`) | Reed Mathis, YouTube Audio Library | (no licence named) | 672 KB |
| 3 SFX | freesound_community ×2, floraphonic — Pixabay | (Pixabay licence implied) | 89 KB |
| Lens dirt texture | not credited | — | 13 KB |
| Fonts | Space Grotesk (OFL), **Noto Color Emoji TTF (OFL) 23.7 MB on disk** | not in credits (OFL needs none on a site) | — |
| Logos on asteroids | Beniaminek 03, ESC, Ruigrok | third-party marks, used as references | — |

[opinion] Only relevant if the scene is revived (`open-questions.md` Q23): the YouTube Audio Library terms are written for
videos, so background music on a website should be re-checked or replaced; the lens-dirt texture has no credited source.

### A6. Commit timeline [repo]

- **32 commits** on `main`: **14 by the owner** (13 non-merge), the rest are the release bot ("chore(release): vX [skip ci]")
  and "Merge release info" commits. One contributor (MuchaSsak).
- **First commit:** 2025-09-02 17:56 UTC, `feat: initial commit` (the whole app arrived in one import; the development
  history before it is not public). **v1.0.0** the same minute.
- **Last commit:** 2026-03-26, `fix: work experience ruigrok title` (v1.1.7).
- Between: v1.1.0 new startup screen images (2025-09-11); v1.1.1 scroll fixes (2025-09-28); v1.1.2 lens flare (2025-10-09);
  v1.1.3 startup button alignment (2025-10-20); v1.1.4–1.1.7 content updates + domain rename (2026-03-17/26).
- Build duration is **not** derivable from git. The certificate list dates Three.js Journey to 12/2024–01/2025 and the repo
  was created 2025-09-02, so the build sits in 2025 [inference]. Ask the owner (open question).

### A7. Live capture [measured, Playwright 1.63 Chromium, 2026-10-05]

- **WebGL in headless works with the real GPU** when launched with `--use-gl=angle --use-angle=d3d11 --enable-gpu
  --ignore-gpu-blocklist`: renderer `ANGLE (NVIDIA GeForce RTX 2060, Direct3D11)`. Default headless falls back to SwiftShader.
- **Desktop 1440×900:** startup screen ready 0.8 s after `load`; FPS sampled at the Earth hero for 3 s = **34 fps**
  (headless, RTX 2060; [caveat] headless frame pacing differs from a real browser window, so treat it as indicative).
- **Bytes over the wire (CDP `encodedDataLength`):** **13.8 MB before the visitor clicks START**, **18.4 MB** after the full
  journey. Largest: Noto Color Emoji TTF **7.6 MB** (compressed), `asteroids.glb` 4.5 MB, Earth specular-clouds JPG 1.65 MB,
  music 672 KB, `yws_lu_thumbnail.jpg` 594 KB. Fonts 7.9 MB, images 4.4 MB, fetch 4.7 MB, JS 0.7 MB.
- **Console:** no errors or warnings during the run.
- **Phone 390×844 (iPhone 13 profile, touch):** a full-screen "Oops! 😞 … your device is incompatible with this experience"
  overlay (`MobileWarning.tsx`, shown when `innerWidth ≤ 900`, i.e. tablets and small laptop windows too), linking to the
  2D portfolio, with "click here" to ignore. **The same 13.8 MB downloads behind the overlay.** After ignoring it and tapping
  START, the hero renders cropped ("…SKI …IO"), the top bar overflows the viewport, and a **touch swipe does nothing**: the
  journey only listens to `wheel`, so a phone can never leave stop 0 [measured: progress stayed at stop 0 after a CDP touch
  swipe]. The two bullet points inside the warning are hard-coded English (not wrapped in Lingui `t`) [repo].
- **Keyboard:** there is no keyboard path through the journey (no `keydown`/arrow/PageDown handler anywhere in `src/`)
  [repo grep]. Screen-reader users get the DOM text of all sections at once (drei `<Html>`), but cannot "travel".

### A8. Lighthouse 13.5.0 (simulated throttling, headless Chrome without GPU flags), 2026-10-05 [measured]

| Run | Perf | A11y | BP | SEO | FCP | LCP | TBT | SI | TTI | CLS | Weight | Requests |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Desktop (`--preset=desktop`) | **60** | 84 | 100 | 91 | 0.8 s | **1.2 s** | **1,240 ms** | 2.9 s | 8.5 s | 0 | **13,527 KiB** | 55 |
| Mobile (default Moto G-class, slow 4G) | **34** | 83 | 100 | 91 | **42.5 s** | **46.9 s** | 930 ms | 42.5 s | 55.7 s | 0 | **13,527 KiB** | 55 |

- Main-thread work: 10.5 s (desktop) / 43.1 s (mobile); JS boot-up 9.8 s / 40.5 s.
- Font-display insight: the emoji TTF delays text by ~1.4 s (desktop estimate); image-delivery savings ≈ 1.3 MB.
- Failing a11y audits: `button-name` (emoji-only icon buttons), `image-alt`, `link-name`, `heading-order`
  (+ `landmark-one-main` on mobile). Raw JSON: scratchpad `tools/sp-lh/{desktop,mobile}.json`.

### A9. Case-study angle

**As case study #0 ("the before"): measured flaws, stated plainly**
1. **Weight:** 13.8 MB transferred before any interaction; 18.4 MB for the full tour; more than half of the first 13.8 MB is one
   emoji font (7.6 MB) and one asteroid model (4.5 MB).
2. **Speed on a normal phone:** Lighthouse mobile FCP 42.5 s / LCP 46.9 s (simulated slow 4G), perf 34. Desktop perf 60 with
   TBT 1.24 s and TTI 8.5 s.
3. **Gating:** a recruiter on a phone (or any window ≤ 900 px) gets "Oops! … incompatible"; even after dismissing it, touch can't
   move the journey. Desktop visitors must click START, wait for a door animation, then sit through up to 8 s tweens per step.
4. **Time to the facts:** ≈ 85 s of scrolling to reach the contact form; projects need 100 wheel ticks to pass.
5. **Access:** no keyboard path, emoji-only buttons without names, Lighthouse a11y 83–84; content lives in a canvas overlay.
6. **SEO/sharing:** a single SPA URL; all sections in one document; no per-project pages.
These map 1:1 to the new site's rules (text first, LCP = H1, no gates, one signature moment, ≤ budget) and give case
study #0 real numbers to beat.

**As its own project card: craft strengths**
1. Thirteen hand-written GLSL shader programs across five planets (day/night blend, fresnel atmospheres, cloud specular, ring, stars).
2. Twelve-stop choreographed camera journey with direction-aware reverse tweens (going back plays a different path),
   input locking during tweens, and nested list scrolls.
3. A whole "experience" shell: startup console with diegetic buttons, door transition, SFX + music, graphics presets,
   persisted settings, en/pl, credits for every CC asset.
4. Clean modular structure (per-planet folders, debug controls behind `#debug` with leva + r3f-perf), release automation.
5. Zero console errors in a 100 s run on a real GPU.

## B. Neoteric Clockful

### B1. Identity, access, branding

| Fact | Value | Source |
| --- | --- | --- |
| Repo | `MuchaSsak/neoteric-clockful`, **private** (404 to the public API and to other accounts; read here with the owner's own `gh` login). Description: "neoteric". 12 MB. One branch (`main`), 0 PRs | [repo] |
| Homepage field | `https://neoteric-clockful.vercel.app` → 307 → `/logowanie` (200, a login screen). Not a public demo: sign-up is disabled | [measured] curl |
| Licence | **No LICENSE file**; `package.json` `"license": "UNLICENSED"`, `"private": true` | [repo] |
| Product name in UI | **"clockful"** (own clock-icon wordmark). The name "Neoteric" appears **only** in the repo name and description, nowhere in code, README or UI (grep) | [repo] |
| UI language | Polish only (URLs too: `/wpisy`, `/raporty`, `/administracja/…`). Code and comments in English | [repo] README |
| README | 20 KB, Polish: setup from zero, first admin, demo data, daily commands, DB change flow, tests, Vercel deploy, backups, repo map, scope and decisions | [repo] |

**Neoteric (public facts, [web] neoteric.eu + /about-us, 2026-10-05):** "software development and AI" company; "We're a
technology partner for companies ready to build impactful digital products." **HQ: ul. Marynarki Polskiej 163, 80-868 Gdańsk**;
office in New York (35 W 31st St). "+50 people", "300+ projects", featured clients incl. Jeppesen, 4com, Boeing, World Bank,
Nestlé, Siemens. **Pruszcz Gdański does not appear on the site** (the owner said Pruszcz Gdański → open question). No
internship page found.

### B2. Stack (exact pinned versions from `package.json`) [repo]

- **App:** `next 16.3.1` (App Router; `src/proxy.ts` = the Next 16 replacement for middleware) · `react 19.2.8` ·
  `typescript 5.9.3` · `@tanstack/react-query 5.101.4` · `@supabase/ssr 0.12.4` · `@supabase/supabase-js 2.112.3` ·
  `tailwindcss 4.3.3` · `react-hook-form 7.85.0` + `zod 4.4.3` · `date-fns 4.4.0` + `date-fns-tz 3.2.0` · `sonner 2.0.8` ·
  `lucide-react 1.32.0` · Radix primitives (alert-dialog, avatar, checkbox, collapsible, dialog, dropdown-menu, label,
  popover, select, slot, switch, tabs, tooltip) · `server-only`.
- **Tooling:** Bun 1.3 · `@playwright/test 1.62.1` · `vitest 4.1.11` · `pgsql-parser 18.2.3` (libpg_query) · `supabase` CLI
  `2.101.0` · ESLint 9 + `eslint-config-next 16.3.1` · Prettier 3.9 + tailwind plugin · `tsx`.
- **Not used, on purpose** (README + `03-tech-stack.md`): **shadcn/ui** ("the task says plainly: not generic AI slop" →
  own primitives on Radix, styled by tokens), chart libraries (two hand-written SVG charts, ~300 lines), i18n layer, dark
  mode, edge functions, Realtime. [conflict] The owner's brief says "shadcn"; the repo explicitly rejects shadcn/ui. Use
  "Radix + own design system" on the card unless the owner corrects it.
- Languages: TypeScript 608 KB · PLpgSQL 158 KB · Python 142 KB (only the bundled Claude skills) · PowerShell 28 KB · CSS 11 KB.

### B3. Structure [repo]

- **Routes:** `(auth)/logowanie` · `(app)/` Pulpit (timer + today/week/month cards + recent entries) · `(app)/wpisy` (my entries)
  · `(app)/raporty` · `(app)/administracja/{uzytkownicy, klienci, projekty, wpisy}` · `konto-nieaktywne` · Route Handler
  `api/admin/users` (create user, set password, ban) · dev-only `dev/ui` (every primitive in every state) and `dev/ekrany`
  (any screen without the auth gate; `notFound()` in production).
- **Components:** `ui/` (own primitives) · `layout/` (app shell, sidebar → bottom bar < 768 px, running-timer indicator) ·
  `timer/` · `entries/` (list, edit sheet, revision history) · `reports/` (period picker, filters, summary tree) · `admin/`
  (form sheets) · `charts/` (bar-chart-days, donut-breakdown).
- **Data access:** 7 TanStack Query hooks (`use-catalog`, `use-entries`, `use-me`, `use-now`, `use-report`, `use-timer`,
  `use-users`); all Polish copy in one `lib/copy.ts`; `lib/time.ts` = all period/zone maths.
- **Three Supabase clients:** browser (anon key, authorisation = RLS) · server (anon + cookies; session, route guard) ·
  admin (service role, only in Route Handlers, `import "server-only"` makes a client-side import break the build).

### B4. Database, roles, permissions [repo]

- **Declarative schemas are the source of truth:** `supabase/schemas/` (01 extensions → 02 enums → 03 utils → 04 tables →
  05 views → 06 RPC: `admin`, `reports`, `timer`) → one generated initial migration
  `20260819120000_initial_schema.sql` (87 KB): **5 tables, RLS enabled on all 5, 12 policies, 25 functions, 9 triggers**
  [measured grep].
- **Tables:** `profiles`, `clients`, `projects`, `time_entries`, `time_entry_revisions`.
- **Roles:** `create type user_role as enum ('employee','admin')`, described as "a ladder rather than a set of flags".
  `is_admin()` is `SECURITY DEFINER`, `search_path` pinned, execute revoked from `anon`.
- **RLS on `time_entries`:** SELECT own-or-admin; INSERT own-or-admin; **UPDATE admin only** (employees stop their timer
  through the `stop_timer()` RPC, not UPDATE); **no DELETE policy** (the only delete: `cancel_timer()` on a still-running entry).
  Report RPCs override `p_user_id` with `auth.uid()` for non-admins.
- **Integrity in the schema, not in JS:** one running timer per user = partial unique index `on time_entries (user_id) where
  ended_at is null` (survives two tabs and a double click); `duration_seconds` is a `GENERATED STORED` column; a composite FK
  `(project_id, client_id) → projects` makes "entry's project belongs to its client" declarative; `check (ended_at > started_at)`;
  archived clients blocked for new entries by a trigger; every insert/update writes a before/after row to
  `time_entry_revisions` via an `AFTER INSERT OR UPDATE` `SECURITY DEFINER` trigger.
- **Reports aggregate in SQL** (`report_summary()` returns total + by user/client/project/day in one call) because PostgREST
  caps unbounded selects at 1,000 rows and a browser-side sum would be silently wrong.
- **Auth:** Supabase Auth with cookies; `enable_signup = false`; min password 10; deactivation = `is_active=false` **plus** an
  Auth ban so a token can't be issued; protection of the last admin; no email flows (spec §12).
- **Safe deploys without Docker:** `safe-push.ps1` gates every push: offline parse of all SQL with the server's parser
  (libpg_query), migration name/order check, the initial migration must still match `schemas/`, idempotency guard,
  `db push --dry-run`, print destructive lines, then ask. Reason in the script: `supabase db push` does not wrap a migration in a
  transaction.

### B5. Tests [repo + measured]

- **Vitest:** 49 cases for `src/lib/time.ts`: both Polish DST weekends (167- and 169-hour weeks), month/year edges, ISO week 1,
  the three Polish plural forms; machine-timezone-independent (checked for UTC, Europe/Warsaw, Europe/London, America/Los_Angeles).
  Found a real bug: formatters rendered in the machine's zone (fine on a laptop in Poland, an hour off on Vercel in UTC).
- **Playwright:** `ac-database.spec.ts` 36 tests + `ac-interface.spec.ts` 18 tests = acceptance criteria AC-01…AC-10 against a
  real Supabase (skip themselves without one); `visual.spec.ts` 15 tests on `/dev/ekrany` with a fake Supabase at
  1440/1024/375: no horizontal scroll, no clipped table column, clean console, Polish copy present, design rules (no card
  shadows, tokenised colours, tabular numerals), keyboard reachability.
- **Seed:** `seed:demo` = 4 accounts, 4 clients, 6 projects, ~1,000 entries over 14 months; deterministic and idempotent;
  prints control sums the AC-06/07 tests compare against.
- [measured] **Gotcha found while running it here:** with `next 16.3.1` the dev server blocks dev chunks requested from
  `127.0.0.1` ("Blocked cross-origin request to Next.js dev resource … add it to allowedDevOrigins"). The repo's Playwright
  default base URL is `http://127.0.0.1:3100`, so screens stayed on loading skeletons until I used `localhost`. The `visual`
  suite may therefore be testing un-hydrated pages on this Next version. Fix: `allowedDevOrigins: ['127.0.0.1']` in
  `next.config.ts` or a `localhost` base URL. Owner to confirm.
- [measured] **Phone 390 px:** on the running-timer card the "Stop" pill sticks out past the card's right edge (clipped by the
  viewport) — see `tmp-mock-data-phone-390-pulpit-timer-running.png`. The repo's checks run at 375 px. Fix before recording.

### B6. Build timeline, team, AI-only workflow [repo]

- **Commits: 2**, both by `MuchaSsak` on 2026-08-27 (21:20 `feat: initial commit`, 21:31 `fix(types): correct generated
  Supabase nullability at the type layer`). **1 contributor** → solo in git. The history was squashed into one import, so
  **git can't show build duration**.
- **Dating evidence:** spec analysed = `specyfikacja-systemu-ewidencji-czasu.pdf`, **"wersja 1.0 z 19.08.2026"**; npm versions
  "checked in the registry 19.08.2026"; migration timestamp `20260819120000`; repo upload 2026-08-27. So the build window was
  **≈ 19 → 27 August 2026 (≈ 9 days)** [inference; owner to confirm the real deadline and hours].
- **Process (from `.claude/project-info/`, Phase 0 → Phase 1, 11 milestones):** 12 planning documents (Clockify research, spec
  breakdown FR-01…15 / AC-01…10 / Q-01…08 with a coverage matrix, tech stack, data model, design system, every screen with
  states, 52 Mobbin references + Clockify screenshots, Polish copy deck, implementation plan, asset licences, decisions log).
- **Evidence of the AI-only workflow:**
  - `.claude/settings.json` enables the `frontend-design`, `playwright` and `supabase` plugins from `claude-plugins-official`.
  - `.claude/skills/ui-ux-pro-max/` (a third-party design skill with CSV data + Python scripts) and `.claude/watch/` (a video
    "watch" skill) are committed.
  - `11-decisions-and-questions.md` opens with: *"Polecenie brzmiało: nie pytać w trakcie, budować, a wątpliwości zebrać na
    koniec"* ("The instruction was: don't ask along the way, build, and collect the doubts for the end"): an autonomous agent
    run. It lists 15 decisions beyond the spec (A1–A15), 10 deliberate omissions (B1–B10), 8 questions answered by default
    (C1–C8), 6 post-deploy checks (D1–D6) and **11 defects found by an in-browser visual review (E1–E11)**, e.g. a 399 px
    horizontal scroll on phones caused by an `sr-only` span, the report's TIME column pushed off-screen at 1440 px, all date
    formatters using the machine's time zone.
  - The `03-tech-stack.md` line "zadanie brzmi wprost »nie generyczny AI slop«" quotes the brief.
  - No `CLAUDE.md`, `AGENTS.md` or `.cursor/` in the repo. Commit messages are conventional but there are only two.
- **Screenshots in the repo:** none of the app itself. `references/` holds **14.8 MB of third-party screenshots** (Clockify
  marketing/help + 52 Mobbin screens). They are research material, not usable on the portfolio, and should be removed before the
  repo is ever made public (Mobbin/Clockify rights).

### B7. Can it run locally without secrets? [measured]

- **Yes, for UI review:** `bun install` (476 packages, 65 s) + a `.env.local` with any placeholder
  (`NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co`, any anon key) + `bun run dev` → `/dev/ui` and
  `/dev/ekrany?ekran=<pulpit|wpisy|raporty|klienci|projekty|uzytkownicy|admin-wpisy>&rola=<admin|pracownik>` render the real views.
  I drove them with the repo's own Supabase mock (`e2e/fixtures/supabase-mock.ts`, variants `full` / `running` / `empty`) from a
  throw-away spec in a scratchpad clone and captured all 7 screens at 1440 and 390 px plus the running-timer state.
  Without a placeholder URL the client throws "Brak zmiennej środowiskowej…" (by design).
- **For real data / login:** a Supabase project (free tier, Frankfurt), `NEXT_PUBLIC_SUPABASE_URL`, anon key,
  `SUPABASE_SERVICE_ROLE_KEY`, plus `SUPABASE_DB_PASSWORD` and `SUPABASE_PROJECT_REF` for scripts; `supabase:link`,
  `supabase:deploy:db`, `seed:demo`; first admin created by hand in Supabase Studio + one SQL `update`. Docker is not needed.
- **Security note:** the README prints one shared password for all seeded demo accounts. If the production project at
  `neoteric-clockful.vercel.app` was seeded with `seed:demo`, anyone who reads the README can log in. The repo is private today;
  rotate or remove before any public release. (I did not try to log in.)

## C. Content-model fields (A and B)

**Corrections to the dossiers in `content/projects/`** (they were written from the owner's brief before this research):
- `neoteric-clockful.md` says "Code … (public)" and "The public repo suggests it's allowed": **the repo is private.** There is
  no public code link today, and no permission signal from a public repo.
- It says "Live: none": there is a production deploy at `neoteric-clockful.vercel.app` (login screen only).
- It says "shadcn/ui": the repo explicitly does **not** use shadcn/ui (own Radix primitives + tokens).
- Team: **solo in git** (1 contributor). Year: **2026**. Space portfolio year: **2025** (v1.0.0 on 2025-09-02).

### C1. Flagship A — 3D Space Portfolio

| Field | Proposal | Evidence |
| --- | --- | --- |
| `slug` | `space-portfolio` | matches the assets folder |
| `title` | "3D Space Portfolio" | README "3D Space Folio" |
| `outcome` options | 1. "A portfolio you fly through: Earth to Neptune in a 12-stop WebGL camera journey." · 2. "Thirteen hand-written GLSL shaders and a choreographed camera, built solo in React Three Fiber." · 3. (case study #0) "Beautiful, and 13.8 MB before the first click: the numbers that shaped this site." | § A3, A4, A7 |
| `context` | `side` (own portfolio) | — |
| `role` / `team` | Design, 3D, shaders, code, content · solo | 1 contributor [repo] |
| `year` / `status` | 2025 · `live` now → `archived` once the new site launches (Q23) | v1.0.0 2025-09-02, last change 2026-03-26 |
| `stack` (≤ 5) | three.js · React Three Fiber · GLSL · GSAP · TypeScript | `package.json`, shader files |
| `proof` candidates | **"13 GLSL shader programs"** (source: repo `shaders/` count) · "12-stop camera journey" (source: `CameraControls.tsx`) · "8 ★ on GitHub" (source: GitHub API; changes over time) | all checkable in the public repo |
| `links` | `live: https://www.matmuszarski.space` (label "desktop only") · `code: https://github.com/MuchaSsak/matmuszarski.space` | 200 / public |
| `media.kind` | `live` (desktop loop on the card; "Launch the experience (desktop)"; phones get the video only) | dossier |
| `nda` / `rights` | L0 (own work) · holder: owner; third-party CC-BY assets credited in-scene (§ A5) | — |
| `featured` | per dossier: 4 | — |

**Decision candidates (evidence-based; rejected options are inferred from the code unless the owner confirms):**
1. **Discrete 12-stop "step" navigation with input locked during tweens** (`ScrollContext.tsx`, `CameraControls.tsx`) **vs. a
   continuous scroll-scrubbed timeline** (GSAP ScrollTrigger / drei `ScrollControls`). Gain: every stop is framed exactly and the
   reverse path differs from the forward one. Cost: wheel-only, no touch or keyboard, up to 8 s per step.
2. **Custom `ShaderMaterial` per planet vs. stock `MeshStandardMaterial` + textures.** Gain: day/night terminator, fresnel
   atmospheres, cloud-masked specular, ring shading. Cost: 13 programs to maintain, tuned by eye with leva.
3. **A pre-rendered Blender cockpit (image + skewed DOM buttons) vs. a real-time 3D cockpit.** Gain: rich look for 344 KB of JPG and
   no extra geometry. Cost: a fixed 1,500 px-wide composition (`w-[93.75rem]`) that can't adapt to the viewport.
4. (Optional) **Gate ≤ 900 px with a warning + link to the 2D site vs. a lighter mobile mode.** Rejected because "small devices have
   generally worse performance" (warning copy). Case study #0 argues the opposite.

**The hard part:** wheel events from trackpads fire faster than React state updates, so stops were skipped. The fix: a
`{ once: true }` listener re-armed by the effect, `flushSync` around the state update, and a pause flag while a tween runs
(`ScrollContext.tsx`, ~15 lines; the owner's own code comment says it cost a lot of time). Alternative "hard part": the Earth
day/night fragment shader (~15 lines of GLSL, § A3).

**Results (measured, § A7–A8):** 0 console errors in a 100 s run; desktop Lighthouse perf 60 / LCP 1.2 s / TBT 1.24 s; 34 fps
headless on an RTX 2060; ≈ 85 s START → contact. Unknown, ask: did it get interviews, client leads or feedback? Was it
submitted anywhere (Awwwards, etc.)?

**Theme proposal ("Orrery plate", dark sheet; tokens only):**
- `paper` `#0B1020` (night-chart stock) · `ink` `#E8E4D8` (bone ink, 14.9:1) · `accent` `#E5B61E` (the old site's own Jupiter
  amber from `AVAILABLE_SCROLLING_SECTIONS`, 9.95:1) · muted ink `#9AA3B8` (7.5:1). Its Neptune blue `#2D3EFA` is only 2.9:1, so use it for
  lines, never text.
- `motif`: a code-drawn **orrery / star-chart plate**: concentric orbit ellipses as dashed "hidden" lines, five planet discs at
  their stop positions with leader-line callouts ("STOP 05 · MARS · EXPERIENCE"), the camera path as a chain-dotted spline with
  arrowheads and dimension labels taken from the real tweens ("8.0 s", "Δ 1,942 u"), plus a small star field of dot marks.
- `typeAccent`: technical mono for the callouts. `motion`: "orbit": the orbits ink in, then one planet travels a quarter
  turn once (≤ 900 ms); static under reduced motion.

**Shot list for the owner** (his GPU machine, browser window 1440×900 or 1920×1080, 60 fps, OS cursor hidden, sound off; the
temporary captures in `assets/` came from headless Chromium):
1. Startup console → START → doors open on the Earth title (≈ 8 s): **card loop candidate**.
2. Earth close-up → "About me" orbit move (≈ 5 s).
3. Mars: asteroids with logos, hover one, open its dialog (≈ 6 s).
4. Jupiter → Saturn transfer, the 8 s camera flight (≈ 8 s).
5. Saturn projects carousel scrolled (≈ 5 s), Neptune contact form (≈ 3 s).
6. `#debug` view with leva + r3f-perf on screen (FPS, draw calls) (≈ 5 s): proof of performance awareness.
7. Stills: Earth day/night terminator close-up (shader section), Saturn ring, the startup console.
8. Case study #0 stills: the phone "Oops" gate (390 px), the DevTools Network panel showing ~13.8 MB before START, the Lighthouse
   mobile report.

### C2. Flagship B — Neoteric Clockful

| Field | Proposal | Evidence |
| --- | --- | --- |
| `slug` | `neoteric-clockful` (or `clockful` if Neoteric may not be named) | folder name |
| `title` | "Clockful: time tracking for a software house" | README |
| `outcome` options | 1. "A role-based time-tracking system built from a 15-requirement spec in about 9 days, driven by AI agents and backed by 118 automated tests." · 2. "Timer, admin corrections with a full audit trail, and reports, with every permission enforced in Postgres rather than in the UI." · 3. "An internship brief turned into a tested product in under two weeks, with AI writing the code and me owning the spec, the data model and the review." | § B4–B6; "9 days" and "118" need the owner's OK |
| `context` | `client`, tag text "Internship · Neoteric" (needs permission) or anonymised "Internship at a Gdańsk software house" (NDA L2) | — |
| `role` / `team` | Sole developer (spec analysis, data model, UI, tests), building with Claude Code agents · team: solo (owner to confirm mentors/reviewers) | 1 contributor; `.claude/` |
| `year` / `status` | 2026 · `archived` (an internship deliverable; production login exists but is closed) | commits 2026-08-27; spec 19.08.2026 |
| `stack` (≤ 5) | Next.js · Supabase (Postgres + RLS) · TypeScript · TanStack Query · Playwright | `package.json` |
| `proof` candidates | **"118 automated tests"** = 49 Vitest + 69 Playwright (source: test count in the repo, 2026-10-05; verifiable only if the repo or a recorded test run is shown) · "RLS on 5/5 tables, 12 policies" (source: migration) · "AC-01…AC-10 each mapped to a test" (source: `02-spec-analysis.md`; do **not** claim "all pass" until the owner runs `ac` against a real project) | § B4–B5 |
| `links` | none public: code is private, live is a closed login. Show the case study + video. Optionally make a scrubbed public copy (open question) | — |
| `media.kind` | `desktop` (per dossier). [opinion] `both` would also be honest: phone layout with bottom nav exists and is a spec requirement | screenshots |
| `nda` / `rights` | L1–L2 until Neoteric says yes · holder: Neoteric? (internship IP, spec PDF is theirs) · permission **pending** → launch gate | — |
| `featured` | per dossier: 3 | — |

**Decision candidates (all documented in the repo, with the rejected option written down):**
1. **Authorisation in Postgres RLS vs. checks in Next.js route handlers / hidden UI.** README: a route-handler check "is one place
   that can be skipped — any new browser query goes straight to PostgREST"; RLS runs on every row. Spec §11 demanded server-side
   authorisation.
2. **Report sums in a SQL RPC vs. summing in the browser.** PostgREST caps unbounded selects at 1,000 rows, so a client-side total
   would be silently wrong past 1,000 entries; `report_summary()` returns totals and breakdowns in one call.
3. **Integrity as declarative constraints vs. application checks:** a partial unique index for "one running timer" (beats two
   tabs and double clicks), a generated `duration_seconds`, a composite FK so an entry's project must belong to its client, no
   DELETE policy plus a revision trigger that no write path can bypass.
4. (Design angle) **Own Radix primitives + tokens and two hand-written SVG charts vs. shadcn/ui + a chart library (~400 kB).**
   Reason given: the brief said "not generic AI slop".
5. (Ops angle) **No Docker: offline SQL gates (libpg_query parse, migration consistency, idempotency guard, dry run) vs. a local
   Supabase stack.**

**The hard part:** time. Polish DST weeks have 167 or 169 hours, the week starts on Monday, and the first implementation
formatted dates in the **machine's** time zone: right on a laptop in Poland, one hour off on Vercel (UTC). It was caught by 49
time-zone-independent unit tests (`src/lib/time.ts`). Alternative: the race-proof single running timer (partial unique index +
RPC that maps `23505` to a Polish message), ≤ 15 lines of SQL.

**Results (measured in the repo):** 49 unit + 69 end-to-end tests; RLS on all 5 tables; 15 decisions beyond the spec, each
reversible and documented; 11 layout/data defects found by an in-browser review and fixed (E1–E11). Unknown, ask the owner:
did the AC suite pass against the real project? Was it presented or adopted at Neoteric? Any feedback, grade or offer?
Real build hours?

**Theme proposal ("Timesheet", light sheet; tokens taken from the app's own `globals.css`):**
- `paper` `#EEECE7` (the app's "stone", ledger stock) · `ink` `#003C33` (the app's "forest", 10.5:1) · `accent` `#FF7759` (the app's
  coral running dot: **2.2:1, so marks and stamps only, never text**). For accent text use `#B4442C` (4.7:1).
- `motif`: a code-drawn **clock face + timesheet**: a 60-tick dial whose hand sits at 01:24, set on a ruled week grid (Mon–Sun ×
  hours) with one hatched bar per day; a punch-clock stamp "01:24:17" as the proof stamp; a small ER drawing of the 5 tables as the
  architecture motif (dashed FK lines, a lock glyph on each RLS table).
- `typeAccent`: tabular mono numerals (the app uses JetBrains Mono for durations). `motion`: "tick": the hand steps once by 6°
  on reveal, the stamp lands; static under reduced motion.

**Shot list for the owner** (local run with `seed:demo` data on his own Supabase project, or the mocked `/dev/ekrany` screens; a
**production build**, so Next's dev "N" badge is not in frame; 1440×900 browser; Polish UI with English captions on the site):
1. Employee: pick client → project, Start, timer ticks, browser tab title shows the time, Stop → entry appears (≈ 10 s): **card loop
   candidate**.
2. Second-timer guard: try Start in a second tab → the Polish error toast (≈ 5 s): proof of the DB-level guarantee.
3. Admin: correct an entry's end time → open revision history showing "12:00 → 13:00" (≈ 8 s).
4. Reports: switch week/month/year, apply user + client + project filters, chart and donut update (≈ 8 s).
5. Employee session typing `/administracja/uzytkownicy` → 403 / redirect (≈ 4 s): permissions.
6. Phone 390 px: Pulpit with the running timer and bottom nav (≈ 5 s); fix the "Stop" overflow first (§ B5).
7. Terminal: `bun run test` (49 passed) and `bunx playwright test` summary (≈ 6 s): a verifiable proof chip.
8. Stills: Raporty with charts, the admin entries table, the revision history panel.

## D. Archive: all public repos

Source: `gh api users/MuchaSsak/repos?per_page=100` → **26 public repos, 0 forks of other projects** [repo]. Live = HTTP status
after redirects (`curl -L`, 2026-10-05) for the homepage field only [measured]. Commits = count on the default branch.
Most repos were created and pushed within minutes ("initial commit" imports), so `created` is the upload date, not the
build date. Sorted by last push.

| Repo | Description (as on GitHub) | Homepage | Topics | Lang | ★/forks | Created | Pushed | Fork | Live | Commits | Licence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| yws.lu | A 3D landing page for a beautiful organization in Luxemburg 🏠💖 | https://yws.lu | 3d, gsap, react, threejs | TS | 2/0 | 2025-08-13 | 2026-09-29 | no | 200 | 113 | MIT |
| malatro | A Balatro clone where the cards are real Polish matura math tasks 🃏📐 | https://malatro.vercel.app | balatro, ogl, opus-5-5, react, webgl | TS | 0/0 | 2026-09-26 | 2026-09-26 | no | 200 | 11 | none set |
| MuchaSsak | Config files for my GitHub profile ⚙️ | https://muszarski.space | config, github | — | 0/0 | 2025-07-19 | 2026-09-20 | no | **no DNS** | 6 | none |
| lingui-translate-ai | NPX Package for Lingui JS AI translations 🌍 | npmjs.com/package/lingui-translate-ai | ai, cli-tool, lingui-js, npm-package | TS | 1/0 | 2026-06-17 | 2026-07-10 | no | npm ok (v1.1.0, 4 versions, **40 downloads/30 d**) | 15 | MIT |
| mesku.art | Marketing website to showcase beautiful graffiti art 🎨 | https://mesku.art | gsap, html, splidejs, supabase | HTML | 0/0 | 2025-02-27 | 2026-06-16 | no | **no DNS** | 15 | MIT |
| language-ai | my commercial app | — | — | TS | 0/0 | 2026-06-03 | 2026-06-03 | no | — | 2 | none set |
| lndexecutivetaxi.com | Vibe coded landing page for unc using Replit 🚕 | https://lndexecutivetaxi.com | landing-page, react, replit, vibe-coding, vite | TS | 0/0 | 2026-05-03 | 2026-05-07 | no | 200 | 17 | none set |
| matmuszarski.space | Fully immersive 3D space portfolio which explores the solar system 🚀 | https://matmuszarski.space | 3d-portfolio, gsap, react, threejs, webgl | TS | 8/0 | 2025-09-02 | 2026-03-26 | no | 200 | 32 | MIT |
| expo-i18n-auth-boilerplate | Fully prepared React Native application with Supabase authentication, testing, internationalization & more! 📱 | — | boilerplate, expo, i18n, react-native, supabase | TS | 1/1 | 2025-09-24 | 2025-09-24 | no | — | 3 | MIT |
| learning-gems | My subjective recommendations list of awesome online courses 💎 | https://learning-gems.vercel.app | magic-ui, motion, react, shadcn-ui | TS | 1/1 | 2025-09-14 | 2025-09-14 | no | 200 | 6 | MIT |
| r3f-vite-boilerplate | Three.js boilerplate for React with TailwindCSS, GSAP, Drei and shadcn/ui ready to go! 3️⃣ | https://mm-r3f-vite-boilerplate.vercel.app | gsap, r3f, drei, threejs | TS | 0/0 | 2025-09-14 | 2025-09-14 | no | 200 | 4 | MIT |
| nextjs-i18n-boilerplate | Internationalization ready and highly robust Next.js starter project ⚛️ | https://nextjs-i18n-boilerplate.vercel.app | boilerplate, i18n, lingui, nextjs, supabase | TS | 1/0 | 2025-09-13 | 2025-09-13 | no | 200 | 3 | MIT |
| 2d-space-folio | A nicely animated Next.js portfolio ☄️ | https://2d.muszarski.space | motion, nextjs, react, threejs | TS | 1/0 | 2025-08-27 | 2025-08-28 | no | **no DNS** (works at `www.2d.matmuszarski.space`) | 6 | MIT |
| lingotype | A foreign language learning app for vocabulary reinforcement by typing ⌨️ | https://lingotype.vercel.app | better-auth, drizzle-orm, motion, neondb | TS | 0/1 | 2025-06-09 | 2025-06-09 | no | 200 | 19 | MIT |
| beniaminek03-screensaver | 3D screensaver for a sports club using GPGPU computing in R3F ⚡ | https://beniaminek03-screensaver.vercel.app | gpgpu, motion, r3f, threejs | TS | 0/0 | 2025-05-29 | 2025-05-29 | no | 200 | 3 | MIT |
| GRIND | A mobile app for tracking your gym progress, workout plans and more 💪 | expo.dev/artifacts/eas/… .apk | expo, react-native, supabase, tanstack-query | TS | 1/0 | 2025-04-06 | 2025-04-06 | no | **400** (EAS artifact link dead) | 5 | MIT |
| ludwig-citadelle | A Next.js website to view quotes of my math teacher taken out of context 😂 | https://ludwig-citadelle.vercel.app | nextjs, shadcn-ui, supabase, tanstack-query | TS | 1/1 | 2024-06-06 | 2025-03-19 | no | 200 (→ /login; README's `ludwig.muszarski.space` has no DNS) | 25 | MIT |
| christmas-2024 | A Three.js themed challenge from a course instructor 🧑‍🎄 | https://mm-christmas-2024.vercel.app | challenge, gsap, threejs, webgl | TS | 0/1 | 2024-12-29 | 2024-12-29 | no | 200 | 3 | MIT |
| techbook | A quick online store demo for a school project 🏫 | https://mm-techbook.vercel.app | demo, nextjs, store, supabase | TS | 0/0 | 2024-11-20 | 2024-11-20 | no | 200 (→ /login) | 8 | MIT |
| gc-bot | Discord.js Bot made specifically for the GroupChat server! 💬 | discord.gg invite | bot, discordjs, express, nodejs | TS | 0/0 | 2024-09-20 | 2024-09-20 | no | 200 (Discord invite page) | 3 | MIT |
| supabase-auth | Reliable authentication and authorization example made with Supabase 🔐 | — | auth, nextjs, shadcn-ui, supabase | TS | 0/1 | 2024-04-03 | 2024-04-13 | no | — | 7 | MIT |
| home-budget | SPA for managing your finances by taking track of your budgets and expenses 💸 | https://mm-homebudget.vercel.app | react, react-router-dom, spa, tailwind | JS | 0/0 | 2023-12-05 | 2023-12-07 | no | 200 | 9 | MIT |
| react-clickme | A react library full of highly customizable and animated buttons out of the box 🎈 | https://react-clickme.vercel.app | library, npm, react, ui-components | TS | 0/0 | 2023-12-05 | 2023-12-05 | no | 200; npm `react-clickme` v1.0.2 (2023-12-07), **15 downloads/30 d** | 3 | MIT |
| clickme-website | Website for the ClickMe React library 🎈 | https://react-clickme.vercel.app | landing-page, npm, react, react-jss, spa | TS | 0/0 | 2023-12-05 | 2023-12-05 | no | 200 | 3 | MIT |
| conventional-changelog | Generate semantic releases and changelogs using Conventional Commits 📃 | — | conventional-commits, github-actions | — | 0/0 | 2023-12-05 | 2023-12-05 | no | — | 3 | MIT |
| fungi-shroomer | Discord bot made specifically for the Fungus Inc. server 🍄 | — | discordjs, javascript, nodejs | JS | 0/0 | 2023-12-05 | 2023-12-05 | no | — | 3 | MIT |

**What each is, suggested tag, keep/hide** (tags use `content-model.md` `context`: client · product · oss · side · course;
"boilerplate" is not in the enum, so I map it to `oss` and flag it; [opinion] throughout):

| Repo | What it is (one line) | Tag | Suggest |
| --- | --- | --- | --- |
| yws.lu | 3D (R3F + GSAP) landing page for the Youth Work Synergy organisation, Luxembourg; README: built in under a week; 113 commits (most active repo) | client | **Keep** (strong archive card; maybe flagship-adjacent). Needs rights/permission row |
| malatro | Balatro-style deckbuilder where every card is a real matura maths task; "fully vibe coded" (topic `opus-5-5`); 130 MB repo | side | Keep (AI-assisted fun build; fits the AI story). Keep its non-affiliation note |
| MuchaSsak | GitHub profile README config | — | Hide (not a project). Fix its homepage (`muszarski.space` has no DNS) |
| lingui-translate-ai | `npx` CLI that machine-translates Lingui catalogs with AI; published on npm (4 versions) | oss | **Keep** (real npm package; proof chip "on npm" is verifiable) |
| mesku.art | Static marketing site for a graffiti artist (HTML + GSAP + Splide + Supabase) | client | Keep only if the domain comes back or a recording exists; today it's dead (no DNS) |
| language-ai | Public teaser of Linkoglot: README says it contains only a few features and bypasses auth/subscription on purpose; "my commercial app" | product | Hide from the archive; link it from the Linkoglot case study as "public code sample" if wanted |
| lndexecutivetaxi.com | Landing page for a family member's executive-taxi business, vibe-coded on Replit | client | Keep low (shows a real shipped client site + AI workflow); owner to confirm it may be shown |
| matmuszarski.space | Flagship A (this file, § A) | side | Featured |
| expo-i18n-auth-boilerplate | Expo / React Native starter: Supabase auth, i18n, tests | oss (boilerplate) | Keep (group with the other starters) |
| learning-gems | Curated list site of recommended online courses (React + shadcn + Magic UI) | side | Hide or fold into the courses/credentials area |
| r3f-vite-boilerplate | R3F + Vite starter with Tailwind, GSAP, Drei, shadcn/ui | oss (boilerplate) | Keep (group with starters) |
| nextjs-i18n-boilerplate | Next.js starter with Lingui i18n + Supabase | oss (boilerplate) | Keep (group with starters) |
| 2d-space-folio | The previous 2D portfolio (Next.js, Three.js, Motion, `.webm` tricks) | side | Hide (superseded twice); fix the dead homepage field |
| lingotype | Typing-based vocabulary trainer (Better Auth, Drizzle, Neon); built with Fabian Dróżkowski (RocketPLN, 4 commits) | side | Keep (one of few team projects; credit the co-author) |
| beniaminek03-screensaver | GPGPU particle screensaver for the Beniaminek 03 sports club (where he interned) | client | Keep (visual, short; ask permission to show the club's name/logo) |
| GRIND | Unfinished React Native gym tracker (Expo, Supabase); README says abandoned | side | Hide (dead APK link, unfinished) |
| ludwig-citadelle | Next.js + Supabase site of a teacher's out-of-context quotes | side | **Hide** (a real, named private person as the subject: reputational/privacy risk on a hiring site) |
| christmas-2024 | Three.js Journey Christmas challenge entry | course | Hide or show under credentials as course work |
| techbook | School-project online-store demo (Next.js + Supabase) | course | Hide (school demo) |
| gc-bot | Discord.js bot for a "GroupChat" Discord server | side | Hide |
| supabase-auth | Next.js + Supabase auth/authorization example | oss | Hide (superseded by the boilerplates and Clockful's RLS work) |
| home-budget | 2023 React SPA budget tracker (localStorage, Context + useReducer) | course | Hide (early learning project) |
| react-clickme | React animated-button library published to npm (2023) | oss | Keep low (real npm package, but old; pair with its site) |
| clickme-website | Docs SPA for react-clickme | oss | Merge into the react-clickme entry |
| conventional-changelog | GitHub Actions template for semantic releases + changelogs | oss | Hide (config snippet; the release pipeline shows up in other repos anyway) |
| fungi-shroomer | Discord bot for the "Fungus Inc." server | side | Hide |

**Not in the public list:** the owner's account also has **14 private repos plus 9 private repos under other accounts he
collaborates on** (Fungus-Team, RocketPLN; counted with his `gh` login). They are not inventoried here because this wiki may become public (`open-questions.md` Q13). Ones already
known to the project from other sources: Enrollo (shown on the old site; `https://enrollo.pl` → 200), Linkoglot, PstrykWeb,
Neoteric Clockful. Ask the owner which other private ones belong on the all-projects page.

**Housekeeping found:** two homepage fields and one README link point at hosts that don't resolve (`muszarski.space`,
`2d.muszarski.space`, and `ludwig.muszarski.space` in a README); `mesku.art` is down; GRIND's APK link returns 400. Four repos have no licence set
(`malatro`, `language-ai`, `lndexecutivetaxi.com`, `MuchaSsak`). A recruiter who clicks through will hit these, so fix or hide
them before launch.

## E. Temporary media saved

All files are **temporary placeholders** (prefix `tmp-`), captured by script on 2026-10-05. Replace them with the owner's
own recordings (shot lists in § C). Do not use them as final media.

`assets/projects/space-portfolio/` (live site, headless Chromium with the real GPU, English UI):
- `tmp-desktop-1440-00-startup.png` … `tmp-desktop-1440-12-neptune-contact.png`: 13 stills, one per stop (startup, hero,
  close-up, about me, origin, Mars title, Mars asteroids, download CV, Jupiter title, certificates, Saturn title, projects,
  Neptune contact).
- `tmp-phone-390-00-mobile-gate.png` (the "Oops!" overlay) · `tmp-phone-390-01-after-ignoring-gate.png` (cropped hero).
- `raw/tmp-desktop-1440-startup-to-earth-20s.mp4` (H.264, 20 s: console → START → doors → Earth → about me) ·
  `raw/tmp-desktop-1440-mars-to-jupiter-20s.mp4` (20 s) · `raw/tmp-desktop-1440-full-journey-100s.webm` (the whole run, 12.9 MB).

`assets/projects/neoteric-clockful/` (local dev server, **mock data** from the repo's own fixtures, Polish UI; the Next dev "N"
badge is visible; nothing comes from Neoteric or real users):
- `tmp-mock-data-{desktop-1440|phone-390}-{pulpit-pracownik, pulpit-timer-running, wpisy-pracownik, raporty-admin,
  admin-wpisy-admin, klienci-admin, projekty-admin, uzytkownicy-admin, logowanie}.png` (18 stills).
- `raw/tmp-mock-data-desktop-1440-walkthrough-13s.mp4` (running timer → reports → admin entries).
- The repo has **no screenshots of the app itself**. Its `references/` images are third-party (Clockify, Mobbin) and were not copied.

Raw measurements (scratchpad, not in the project): Lighthouse JSON `tools/sp-lh/{desktop,mobile}.json`; capture logs
`tools/sp-out/desktop-result.json`, `tools/sp-vid/mobile-result.json`; scripts `tools/sp-cap.mjs`, `sp-vid.mjs`, `sp-mob.mjs`.

## Open questions for the owner

**Space portfolio**
1. When was it actually built (start → v1.0.0 on 2025-09-02)? Hours? The git history starts with one import.
2. Any results: interviews, leads, feedback, awards submissions, analytics?
3. Were continuous scroll (ScrollTrigger / `ScrollControls`) or a real-time cockpit considered and rejected? Why low/high presets
   instead of auto-detecting the GPU tier?
4. Is it fair to say the Earth shader follows the Three.js Journey "Earth" lesson, extended to five planets? (Honest attribution.)
5. Q23: after launch, redirect `matmuszarski.space`, keep the scene alive at its own URL, or revive it as `/explore`? If revived,
   the YouTube Audio Library music and the uncredited lens-dirt texture need re-checking.

**Neoteric Clockful**
6. The repo is **private**: may it become public (after removing the third-party `references/` screenshots and the demo password
   in the README)? If not, the card has no code link.
7. Permission: may Neoteric be named and its brief described? Who holds the IP (you or Neoteric)? Is the spec PDF confidential?
8. Location: neoteric.eu lists HQ in **Gdańsk (Marynarki Polskiej 163)**; you said Pruszcz Gdański. Which is right for the
   internship?
9. Real deadline and hours (the docs suggest 19 → 27 Aug 2026)? Solo, or with mentors / other interns reviewing?
10. "Only AI": which tools (Claude Code with the plugins in `.claude/settings.json`?), and what did you do yourself (spec reading,
    review, testing, deploy)? Did the `ac` suite pass against the real Supabase project?
11. Outcome: was it presented, used or graded at Neoteric? Any feedback?
12. Was production seeded with `seed:demo`? If so, rotate the shared demo password.
13. The brief says "shadcn/ui"; the repo says no shadcn. Which wording do you want on the card?

**Archive**
14. Which of the 14 private repos (beyond Linkoglot, PstrykWeb, Enrollo, Clockful) should appear on the all-projects page?
15. Permission to show client/club work by name: Youth Work Synergy (yws.lu), Beniaminek 03, the taxi site, mesku.art (also: is
    mesku.art coming back?).
16. Your GitHub profile says you "began my coding journey in 2022". Other material speaks of more years. Which number is right for
    the site and CV? A recruiter will compare them.

Not covered: no real-browser (non-headless) FPS measurement; no Lighthouse run with the GPU or on a real phone; the Clockful
production login was not entered and its acceptance (`ac`) suite was not run (it needs a real Supabase project); the repo's
`visual` suite itself was not run (only my mock-driven capture spec); no deep audit of the Clockify/Mobbin reference rights;
private repos were counted, not inventoried; no WebSearch used (Neoteric facts come from neoteric.eu only); Clockful's
`06-screens.md`, `07-design-references.md` and `08-copy-pl.md` were not read in full.
