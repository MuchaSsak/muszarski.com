/**
 * The blog's pure helpers (structure.md § Blog, content-model.md § Blog post). Pages read posts through
 * `astro:content`; nothing here imports it, so unit tests run without a build.
 */
export const BLOG_TAGS = [
  "case-study",
  "ai",
  "claude-code",
  "i18n",
  "astro",
  "react",
  "performance",
  "accessibility",
  "design",
  "privacy",
  "typography",
] as const;
export type BlogTag = (typeof BLOG_TAGS)[number];

/** Code-drawn covers (PostCover.astro), one motif per topic. */
export const BLOG_COVERS = [
  "blueprint",
  "terminal",
  "wiki",
  "bubbles",
  "scale",
  "type",
  "motion",
  "cookie",
  "catalogs",
  "gauge",
  "planet",
  "signpost",
  "mailbox",
  "sheet",
  "rocket",
  "tap",
  "anchor",
] as const;
export type BlogCover = (typeof BLOG_COVERS)[number];

/** Words per minute for technical prose on a screen (code and tables read slower; this is conservative). */
const WORDS_PER_MINUTE = 220;

/** The words a reader reads: code fences, link targets, HTML and Markdown syntax stripped. */
export function proseWords(body: string): number {
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^import .*$/gm, "")
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>|[\]-]+/g, " ");
  return text.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
}

export function readingMinutes(body: string): number {
  return Math.max(1, Math.round(proseWords(body) / WORDS_PER_MINUTE));
}

/** The slug of an entry id "en/my-post" → "my-post". */
export const slugOf = (id: string) => id.split("/").slice(1).join("/");
/** The locale of an entry id "en/my-post" → "en". */
export const localeOf = (id: string) => id.split("/")[0] as "en" | "pl";

/** Newest first; same day: featured first, then by title. */
export function byNewest<T extends { data: { published: Date; featured: boolean; title: string } }>(a: T, b: T): number {
  return (
    b.data.published.getTime() - a.data.published.getTime() ||
    Number(b.data.featured) - Number(a.data.featured) ||
    a.data.title.localeCompare(b.data.title)
  );
}

/** Headings for the table of contents: H2 and H3 only. */
export function tocOf(headings: { depth: number; slug: string; text: string }[]) {
  return headings.filter((heading) => heading.depth === 2 || heading.depth === 3);
}
