import { type Locale } from "@package/shared/locales";

import { BLOG_LOCALES } from "~/lib/nav";
import { pathTo } from "~/lib/routes";

/**
 * Fixed paths into the blog that chrome and sections link to (the case study #0 lives in the blog: structure.md,
 * open-questions Q43). Posts exist in en + pl; a Spanish page links the English post (i18n.md § Locale coverage).
 */
export const THIS_SITE_SLUGS = { en: "how-this-site-was-built", pl: "jak-powstala-ta-strona" } as const;

export const blogLocaleFor = (locale: Locale): "en" | "pl" => (BLOG_LOCALES.includes(locale) ? (locale as "en" | "pl") : "en");

export function thisSitePath(locale: Locale): string {
  const blogLocale = blogLocaleFor(locale);
  return pathTo(blogLocale, `blog/${THIS_SITE_SLUGS[blogLocale]}`);
}
