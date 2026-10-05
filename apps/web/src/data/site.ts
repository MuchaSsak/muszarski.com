/**
 * Site facts (wiki: content/content-model.md § Site facts). Facts live here, never inline in
 * components; translatable copy goes through Lingui. Every value that is not real yet is marked
 * PLACEHOLDER and has a row in .claude/project-info/placeholders.md.
 */
export const SITE = {
  name: "Mateusz Muszarski",
  /** Initials for the compact mark in the title block. */
  initials: "MM",
  github: "https://github.com/MuchaSsak",
  /** Building software since (product/project-brief.md: ~4 years, since 2022). */
  since: 2022,
} as const;
