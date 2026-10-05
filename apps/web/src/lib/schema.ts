import { type Locale } from "@package/shared/locales";

import { CV } from "~/data/cv";
import { PROFILES, SITE } from "~/data/site";
import { pathTo } from "~/lib/routes";

/**
 * The structured-data graph (wiki: site/seo.md § Entity strategy): stable ids `/#person` and `/#website`, one Person
 * that every page points at. Only facts that are visible on the site go in; no street address, no photo until the
 * owner's own exists (placeholders.md P15), no credentials until they are confirmed (P11).
 */
type Node = Record<string, unknown>;

const origin = (site: URL) => site.origin;
export const personId = (site: URL) => `${origin(site)}/#person`;
export const websiteId = (site: URL) => `${origin(site)}/#website`;

/** Things with checked Wikidata ids (seo.md); add an id only after looking it up. */
const KNOWS_ABOUT: { name: string; wikidata?: string }[] = [
  { name: "TypeScript", wikidata: "Q978185" },
  { name: "React", wikidata: "Q19399674" },
  { name: "Next.js", wikidata: "Q56062435" },
  { name: "three.js", wikidata: "Q3525922" },
  { name: "Tailwind CSS", wikidata: "Q102173844" },
  { name: "Astro" },
  { name: "React Native" },
  { name: "Supabase" },
  { name: "Claude Code" },
];

export function personNode(site: URL, locale: Locale): Node {
  return {
    "@type": "Person",
    "@id": personId(site),
    name: SITE.name,
    alternateName: SITE.alternateName,
    url: `${origin(site)}${pathTo(locale)}`,
    jobTitle: CV.title[locale],
    description: CV.summary[locale],
    address: { "@type": "PostalAddress", addressRegion: SITE.region, addressCountry: SITE.countryCode },
    knowsAbout: KNOWS_ABOUT.map((thing) =>
      thing.wikidata ? { "@type": "Thing", name: thing.name, sameAs: `https://www.wikidata.org/wiki/${thing.wikidata}` } : thing.name,
    ),
    knowsLanguage: ["pl", "en"],
    sameAs: PROFILES.map((profile) => profile.href),
  };
}

export function websiteNode(site: URL): Node {
  return {
    "@type": "WebSite",
    "@id": websiteId(site),
    url: `${origin(site)}/`,
    name: SITE.name,
    alternateName: SITE.alternateName,
    inLanguage: ["en", "pl", "es"],
    publisher: { "@id": personId(site) },
  };
}

export function homeGraph(site: URL, locale: Locale, description: string): Node {
  const url = `${origin(site)}${pathTo(locale)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteNode(site),
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: SITE.name,
        description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId(site) },
        mainEntity: { "@id": personId(site) },
      },
      personNode(site, locale),
    ],
  };
}

export function pageGraph(site: URL, url: string, type: "WebPage" | "AboutPage" | "CollectionPage" | "ProfilePage", name: string, description: string, locale: string, crumbs: { name: string; url: string }[]): Node {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId(site) },
        ...(type === "AboutPage" || type === "ProfilePage" ? { mainEntity: { "@id": personId(site) } } : { author: { "@id": personId(site) } }),
      },
      breadcrumbs(crumbs),
    ],
  };
}

export function breadcrumbs(crumbs: { name: string; url: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({ "@type": "ListItem", position: i + 1, name: crumb.name, item: crumb.url })),
  };
}

export interface PostFacts {
  url: string;
  title: string;
  description: string;
  locale: string;
  published: Date;
  updated?: Date | undefined;
  image: string;
  tags: readonly string[];
  words: number;
  aboutUrl: string;
}

export function postGraph(site: URL, post: PostFacts, crumbs: { name: string; url: string }[]): Node {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${post.url}#article`,
        mainEntityOfPage: post.url,
        url: post.url,
        headline: post.title,
        description: post.description,
        inLanguage: post.locale,
        datePublished: post.published.toISOString(),
        dateModified: (post.updated ?? post.published).toISOString(),
        image: post.image,
        keywords: post.tags.join(", "),
        wordCount: post.words,
        author: { "@type": "Person", "@id": personId(site), name: SITE.name, url: post.aboutUrl },
        publisher: { "@id": personId(site) },
        isPartOf: { "@id": websiteId(site) },
      },
      breadcrumbs(crumbs),
    ],
  };
}
