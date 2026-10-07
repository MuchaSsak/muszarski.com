import { type Locale } from "@package/shared/locales";

import { BLOG_LOCALES } from "~/lib/nav";
import { pathTo } from "~/lib/routes";

/**
 * Fixed paths into the blog that chrome and sections link to (the case study #0 lives in the blog: structure.md,
 * open-questions Q43). Posts exist in en + pl; a Spanish page links the English post (i18n.md § Locale coverage).
 */
export const THIS_SITE_SLUGS = { en: "how-this-site-was-built", pl: "jak-powstala-ta-strona" } as const;

export const blogLocaleFor = (locale: Locale): "en" | "pl" => (BLOG_LOCALES.includes(locale) ? (locale as "en" | "pl") : "en");

/** The post on psychology in UX, linked from the knowledge card in Competences [user 2026-10-07]. */
export const UX_PSYCHOLOGY_SLUGS = { en: "psychology-in-ux-and-frontend", pl: "psychologia-w-ux-i-frontendzie" } as const;

const postPath = (slugs: Record<"en" | "pl", string>, locale: Locale): string => {
  const blogLocale = blogLocaleFor(locale);
  return pathTo(blogLocale, `blog/${slugs[blogLocale]}`);
};

export const thisSitePath = (locale: Locale): string => postPath(THIS_SITE_SLUGS, locale);
export const uxPsychologyPath = (locale: Locale): string => postPath(UX_PSYCHOLOGY_SLUGS, locale);
