# Tool Reference

Read this file when you need parameter details, response fields, or pagination behavior.

## MCP server

| Field | Value |
| ----- | ----- |
| Server | `shoogle` (registered in the runner's mcp.json + the project `.mcp.json`) |
| Tools | `mcp__shoogle__search_registry_items`, `mcp__shoogle__search_registry_items_scoped` (adds `registries: string[]`) |
| Endpoint | `https://mcp.shoogle.dev/mcp` |

Call the tools directly (`mcp__shoogle__…`). The live descriptor wins if parameters changed.

## Search behavior

`query` runs **full-text matching** on indexed item **names** (the live tool description says names; descriptions may help ranking). It does not use semantic/vector ranking. `search_registry_items_scoped` also takes `registries: string[]` with `@`-prefixed namespaces (`"@magicui"`); unprefixed ones are returned under `unknownRegistries`.

- Prefer short keywords: `button`, `hero`, `data-table`
- Description matches are valid — e.g. `animated` may surface items whose description mentions animation
- Avoid registry prefixes in the query (`@acme/button` → query `button`)


| Parameter | Type | Required | Default | Notes |
| --------- | ---- | -------- | ------- | ----- |
| `query` | string | yes | — | Full-text search on item `name` and `description` |
| `offset` | number | no | `0` | Pagination start index |
| `limit` | number | no | `100` | Page size; max `100` |

## Response

```json
{
  "query": "button",
  "pagination": {
    "total": 42,
    "offset": 0,
    "limit": 100,
    "hasMore": false
  },
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "description": "…",
      "registry": "shadcn",
      "addCommandArgument": "shadcn/button"
    }
  ],
  "totalResults": 42,
  "timestamp": "2026-05-22T…"
}
```

## Item fields

| Field | Use |
| ----- | --- |
| `name` | Item name in the registry JSON |
| `type` | e.g. `registry:ui`, `registry:block` |
| `description` | Optional short description |
| `registry` | Namespace used as `@`-prefix in CLI |
| `homepage` | Registry homepage (has UTM params) — docs for its `components.json` URL template |
| `addCommandArgument` | Pass verbatim to `bunx shadcn@latest add` — e.g. `@acme/button` |

## Pagination

Increment `offset` by `limit` while `pagination.hasMore` is `true`. Stop when you have enough candidates or `hasMore` is `false`.

## Call examples

```json
{ "query": "button" }
{ "query": "card", "offset": 100, "limit": 100 }
{ "query": "sidebar", "limit": 20 }
```
