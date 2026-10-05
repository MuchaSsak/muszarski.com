import { type Locale } from "@package/shared/locales";

import { pathTo } from "~/lib/routes";

/**
 * Where the chrome's links go (site/structure.md § Home, § Navigation and footer). One place, so the
 * header, the mobile menu and the footer never disagree.
 * - Sections on the home page are anchors (`#work`, `#how-i-work`, `#ai`, `#contact`), reachable from every page.
 *   The header's "Work" is the home chapters (`#work`); `/work/` is the all-projects index (footer).
 * - Blog posts exist in en + pl only (i18n.md § Locale coverage): es links to the English blog, marked "(EN)".
 */
export const BLOG_LOCALES: readonly Locale[] = ["en", "pl"];

export function chromeLinks(locale: Locale) {
  const blogLocale: Locale = BLOG_LOCALES.includes(locale) ? locale : "en";
  return {
    home: pathTo(locale),
    work: `${pathTo(locale)}#work`,
    workIndex: pathTo(locale, "work"),
    howIWork: `${pathTo(locale)}#how-i-work`,
    ai: `${pathTo(locale)}#ai`,
    contact: `${pathTo(locale)}#contact`,
    blog: pathTo(blogLocale, "blog"),
    blogLocale,
    rss: `/${blogLocale}/rss.xml`,
    cv: pathTo(locale, "cv"),
    myLife: pathTo(locale, "my-life"),
    thisSite: pathTo(blogLocale, `blog/${blogLocale === "pl" ? "jak-powstala-ta-strona" : "how-this-site-was-built"}`),
    privacy: pathTo(locale, "privacy"),
    terms: pathTo(locale, "terms"),
    /** A flagship's chapter on the home page (case studies live in the blog: open-questions Q43). */
    project: (anchor: string) => `${pathTo(locale)}#${anchor}`,
  };
}
