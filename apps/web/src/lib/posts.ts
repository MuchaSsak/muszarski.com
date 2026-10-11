import { type CollectionEntry, getCollection } from "astro:content";

import { byNewest, localeOf, readingMinutes, slugOf } from "~/lib/blog";
import { BLOG_LOCALES } from "~/lib/nav";
import { pathTo } from "~/lib/routes";

/**
 * Blog posts as pages need them (structure.md § Blog). Drafts show in `astro dev` only. One read of the collection
 * per build (cached).
 */
export type Post = CollectionEntry<"blog">;
export type BlogLocale = "en" | "pl";

let cache: Post[] | undefined;

export async function allPosts(): Promise<Post[]> {
  cache ??= (await getCollection("blog", (entry) => import.meta.env.DEV || !entry.data.draft)).sort(byNewest);
  return cache;
}

export async function postsIn(locale: BlogLocale): Promise<Post[]> {
  return (await allPosts()).filter((post) => localeOf(post.id) === locale);
}

export const postLocale = (post: Post): BlogLocale => localeOf(post.id);
export const postSlug = (post: Post) => slugOf(post.id);
export const postPath = (post: Post) => pathTo(postLocale(post), `blog/${postSlug(post)}`);
export const postMinutes = (post: Post) => readingMinutes(post.body ?? "");

/**
 * The post's path in each locale it exists in (`translationKey`), for hreflang and the language switch, in locale
 * order (the collection order ties on equal dates, which flipped the hreflang order).
 */
export async function translationsOf(post: Post): Promise<Partial<Record<BlogLocale, string>>> {
  const posts = await allPosts();
  const map: Partial<Record<BlogLocale, string>> = {};
  for (const locale of BLOG_LOCALES as readonly BlogLocale[]) {
    const other = posts.find((p) => p.data.translationKey === post.data.translationKey && postLocale(p) === locale);
    if (other) map[locale] = `blog/${postSlug(other)}`;
  }
  return map;
}

/** The post's published copies on dev.to and Medium: set on the English post, shared by its translation. */
export async function copiesOf(post: Post): Promise<{ devto?: string | undefined; medium?: string | undefined }> {
  if (post.data.syndication) return post.data.syndication;
  const en = (await allPosts()).find((p) => p.data.translationKey === post.data.translationKey && postLocale(p) === "en");
  return en?.data.syndication ?? {};
}

/** Related posts in the same locale: the listed keys first, then the newest sharing a tag. */
export async function relatedTo(post: Post, limit = 3): Promise<Post[]> {
  const same = (await postsIn(postLocale(post))).filter((other) => other.id !== post.id);
  const listed = post.data.related
    .map((key) => same.find((other) => other.data.translationKey === key))
    .filter((p): p is Post => !!p);
  const sharing = same.filter((other) => !listed.includes(other) && other.data.tags.some((tag) => post.data.tags.includes(tag)));
  return [...listed, ...sharing, ...same.filter((other) => !listed.includes(other) && !sharing.includes(other))].slice(0, limit);
}

export const isBlogLocale = (locale: string): locale is BlogLocale => (BLOG_LOCALES as readonly string[]).includes(locale);
