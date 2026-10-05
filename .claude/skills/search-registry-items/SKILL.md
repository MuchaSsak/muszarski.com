---
name: search-registry-items
description: >
  Find a component in ANY public shadcn registry by keyword via the Shoogle MCP, then
  install it. Use while coding a section that needs a specific piece (a wow-factor hero,
  gallery, before/after slider, timeline, or a clean accordion, hours table, pricing
  toggle, sticky CTA) that the shadcn/Magic UI/Aceternity defaults don't cover well.
  Keyword search on names/descriptions only. Optional: skip when nothing is needed.
user-invocable: false
allowed-tools:
  - mcp__shoogle
  - mcp__shadcn
  - Read
  - Edit
  - Bash(bunx shadcn@latest *)
metadata:
  source: "alibey-10/shoogle (adapted for headless Claude Code; see usage/shoogle.md)"
---

# Search Registry Items (Shoogle)

Binding conventions (where files go, retoken rules, paid registries, Do-NOTs) live in
`.claude/project-info/usage/shoogle.md`. Read it first. This skill is the procedure.

## Procedure

1. Call `mcp__shoogle__search_registry_items` with a short keyword, small page:
   `{ "query": "before-after", "limit": 15 }`. Scope to known namespaces with
   `mcp__shoogle__search_registry_items_scoped` (`"registries": ["@magicui", "@aceternity"]`).
2. Shortlist 1–3 from `description` + `type` (`registry:block` = a whole section,
   `registry:ui` = a piece). No hits → synonym (`modal`/`dialog`, `carousel`/`slider`)
   or a shorter fragment.
3. `bunx shadcn@latest view <addCommandArgument>`: read the JSON and apply the **reject
   list** in `usage/shoogle.md` → Install (targets outside `components/`/`hooks/`/`lib/`,
   `registry:file`/`registry:page`, `envVars`, Vue/Svelte files, unknown dependencies,
   remote fetches). Any hit → don't add it.
4. `bunx shadcn@latest add <addCommandArgument> --cwd apps/nextjs-landing-page`
   (use `addCommandArgument` verbatim). A 401/403/"not found" means a paid or private
   registry: pick another result or hand-build. Never try to authenticate.
5. Move it into `components/ui/vendor/<registry>/`, fix imports (`cn` from
   `@package/shared/utils`), retoken to `design.md`, replace demo content, screenshot-verify.

## Gotchas

- Keywords, not intent: "hero", "gallery", "pricing" work; "elegant salon hero with
  dark mode" doesn't.
- Query the item name, not the registry prefix (`button`, not `@acme/button`).
- Pagination: `offset += limit` while `pagination.hasMore`; you rarely need page 2.
- One query at a time, never parallel: Shoogle rate-limits. `Rate limit exceeded. Try again
  in Ns` → wait N s, retry once; a second failure (or any other error) → skip, move on.
- React/TSX only: skip Vue/Svelte registries. Scoped namespaces need the `@` prefix.
- Many hits are paid kits (401 on `view`): skip them, never authenticate.

Parameter and response details: [references/TOOL-REFERENCE.md](references/TOOL-REFERENCE.md).
