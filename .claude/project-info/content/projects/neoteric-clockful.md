# Project: Neoteric Clockful — time tracking dashboard

> Dossier for flagship #3. Owns this project's facts, story angles, theme, rights and shot list.
> Fields: `content-model.md`. Raw research: `research/2026-10-05-project-space-clockful-archive.md` § B, C2.

## Facts

| Fact | Value | Source |
| --- | --- | --- |
| What | role-based time tracker (timer, entries, projects, clients, reports, users); closed dashboard, no sign-up | [user], [research: repo] |
| Context | internship project for **Neoteric**, a Polish software house. The owner said Pruszcz Gdański; neoteric.eu gives its HQ as Gdańsk (Q40) | [user], [research] |
| Constraints | tight deadline; instruction to build **only with AI** | [user] |
| Build window | ≈ 19–27 Aug 2026 (a dated spec on 19.08, uploaded 27.08); **~9 days is an estimate** from those dates | [research: repo] |
| Spec | 15 requirements | [research] |
| Access model | employee/admin roles enforced by **Postgres RLS on 5/5 tables, 12 policies**, an audit trigger, no delete policy | [research: migrations] |
| Tests | **118 automated tests** (49 Vitest + 69 Playwright) | [research: counted] |
| AI-only evidence | `.claude/` plugins and skills, 12 planning docs, the working rule "build, don't ask, collect doubts at the end" | [research: repo] |
| Stack | Next.js 16.3, Supabase, TanStack Query. **It explicitly rejects shadcn**, which the owner had named (Q40) | [research: package.json] |
| Code | **private repo** (UNLICENSED), contrary to the earlier note; git shows solo, 2 commits | [research] |
| Live | none | [user] |
| Neoteric branding | only in the repo name and description | [research] |
| Runs locally | yes, without secrets, on the repo's own mock data (how the screenshots were made) | [research: measured] |

## Card candidates

- **Outcome:** "A role-based time tracker built from a 15-requirement spec in ~9 days with AI agents, backed by
  118 automated tests."
- **Proof chip:** "118 automated tests" (alt: "RLS on every table").
- **Stack chips:** Next.js · Supabase · Postgres RLS · TanStack Query · Playwright.
- **Context tag:** "Internship · Neoteric" (pending OK).
- **Links:**
  - "Code private · walkthrough on request", or make the repo public with Neoteric's OK (Q40)
  - never a dead "Code ↗"

## What it proves

- **Worked inside a software house:** brief, deadline, delivery. This counters "always solo" (`audience.md`).
- **Disciplined AI-only delivery:** planning docs + skills + 118 tests + RLS. Speed with verification, the centrepiece of the AI-workflow
  section. Write up "what I delegated, what I checked, where the AI was wrong".
- **Security done properly:** row-level security on every table, an audit trigger.

## Rights (status: **check**)

- **Ownership:** depends on the internship's legal form (`legal/compliance-and-data.md`).
- **Before naming Neoteric, or making the repo public:** ask them the 5 questions in the legal research § E.2.

## Presentation

- **Media kind:** `desktop`. A drawn browser frame with numbered balloon callouts ①②③ (timer · reports · RLS roles) and a parts list.
  Title-block cell: `DEPLOYMENT: none (internship)`.
- **Theme:** a timesheet / clock-face drawing; the motif is an isometric clock face with gear teeth.
- **Media (2026-10-11):** the owner's 15 s walkthrough (`assets/projects/neoteric-clockful/raw/recording-2026-10-11.mp4`,
  gitignored; mock data: clients, projects, users, the timer, reports) plays whole in the chapter and on `/work/`. The
  older `tmp-mock-data-` screenshots stay local.

## Open (project-specific)

Neoteric permission + make the repo public? · the shadcn discrepancy · location wording (Q40) · did Neoteric use it, any
feedback? · where the AI was wrong (for the write-up).
