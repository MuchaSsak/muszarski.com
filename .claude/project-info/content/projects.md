# Projects (index)

> The project inventory. Owns: which projects exist, their order on the home page, and where each
> one's dossier lives. Each project's facts, story, theme, rights and shot list live ONLY in its dossier
> `content/projects/<slug>.md`. Field shapes: `content-model.md`. Look: `design.md` § Per-project themes.

## Flagships (home page chapters, in order) [user] 2026-10-05

| # | Project | Dossier | What it is | Media kind | Public links |
| --- | --- | --- | --- | --- | --- |
| 1 | PstrykWeb | `content/projects/pstrykweb.md` | commercial website-generation product + pipeline, built solo for Cetuspro | `both` | pstrykweb.pl |
| 2 | Linkoglot | `content/projects/linkoglot.md` | own AI language-learning mobile app (App Store + Google Play) | `phone` | linkoglot.eu/Download |
| 3 | Neoteric Clockful | `content/projects/neoteric-clockful.md` | internship time-tracking dashboard, built AI-only under a deadline | `desktop` | none (repo private) |
| 4 | 3D space portfolio | `content/projects/space-portfolio.md` | the old immersive three.js site | `live` (desktop) | matmuszarski.vercel.app + repo |

- **Order:** commercial → own product → software house → creative [assumption; owner may reorder].
  The space portfolio closes the chapters because it is the "before" of this site and leads into "how this
  site was built".
- **Why this mix:** a business system, a mobile app, a team/software-house dashboard and a WebGL experience
  [user]. Each proves a different point (each dossier § "What it proves").

## Archive (the `/work/` index lists everything)

Suggested from the 26 public repos (`research/2026-10-05-project-space-clockful-archive.md` § D, [opinion]). **The owner confirms**
which to show and which private ones to add (Enrollo, others: Q41) [user].

| Show (suggested) | Tag | Why |
| --- | --- | --- |
| yws.lu | client | live 3D (R3F + GSAP) landing for Youth Work Synergy, Luxembourg; 113 commits. Needs a permission row |
| lingui-translate-ai | oss | real npm CLI (v1.1.0), born from Linkoglot. Never quote download counts |
| malatro | side | Balatro × matura maths; openly AI-built (fits the AI story) |
| lingotype | side | **team project** (co-author Fabian Dróżkowski, RocketPLN). Credit him; counters "solo" |
| beniaminek03-screensaver | client | GPGPU particles in R3F for a sports club. Ask before using the club's name/logo |
| lndexecutivetaxi.com | client | a real shipped client site, vibe-coded on Replit; owner confirms |
| expo-i18n-auth-boilerplate · nextjs-i18n-boilerplate · r3f-vite-boilerplate | oss (starters) | grouped as one "starters" row |
| react-clickme (+ clickme-website) | oss | npm library (2023); kept low |
| mesku.art | client | only if the domain comes back or a recording exists (no DNS today) |

**Hide (suggested):**
- not projects or superseded: MuchaSsak (profile config), language-ai (link it from the Linkoglot case study instead, after Q37),
  2d-space-folio, GRIND (unfinished; dead APK), supabase-auth, conventional-changelog
- school or course work: learning-gems, christmas-2024 (could go under credentials as course work), techbook, home-budget
- Discord bots: gc-bot, fungi-shroomer
- **ludwig-citadelle** (a named private person as the subject: privacy/reputation risk on a hiring site)

**Housekeeping before launch** (Q39):
- Fix the homepages that don't resolve: `muszarski.space`, `2d.muszarski.space`; `ludwig.muszarski.space` in a README.
- mesku.art is down; GRIND's APK link returns 400.
- 4 repos have no licence: malatro, language-ai, lndexecutivetaxi.com, MuchaSsak.

## Rules

- A project becomes visible only when its dossier has: outcome line, role, year, links, and media
  (placeholder allowed until launch). For client or internship work, the rights status must be `ok`.
- Temporary media (live-site captures, store screenshots) is marked in `design/assets.md` and replaced
  by the owner's recordings before launch.
