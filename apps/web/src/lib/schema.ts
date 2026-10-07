import { type Locale } from "@package/shared/locales";

import { CV } from "~/data/cv";
import { ELSEWHERE, SITE } from "~/data/site";
import { type Pin, placeLabel } from "~/lib/gallery";
import { pathTo } from "~/lib/routes";

/**
 * The structured-data graph (wiki: site/seo.md § Entity strategy): stable ids `/#person` and `/#website`, one Person
 * that every page points at. Only facts that are visible on the site go in; no street address, the photo once the
 * owner's own file exists (lib/photos.ts), no credentials until they are confirmed (P11).
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

/** `image`: the absolute URL of the owner's photo, when there is one (lib/photos.ts). */
export function personNode(site: URL, locale: Locale, image?: string): Node {
  return {
    "@type": "Person",
    "@id": personId(site),
    name: SITE.name,
    givenName: SITE.name.split(" ")[0],
    familyName: SITE.name.split(" ").slice(1).join(" "),
    alternateName: SITE.alternateName,
    url: `${origin(site)}${pathTo(locale)}`,
    mainEntityOfPage: `${origin(site)}${pathTo(locale)}`,
    email: `mailto:${SITE.email}`,
    jobTitle: CV.title[locale],
    hasOccupation: {
      "@type": "Occupation",
      name: CV.title[locale],
      occupationLocation: { "@type": "Country", name: "Poland" },
      skills: KNOWS_ABOUT.map((thing) => thing.name).join(", "),
    },
    nationality: { "@type": "Country", name: "Poland" },
    description: CV.summary[locale],
    address: { "@type": "PostalAddress", addressRegion: SITE.region, addressCountry: SITE.countryCode },
    knowsAbout: KNOWS_ABOUT.map((thing) =>
      thing.wikidata
        ? { "@type": "Thing", name: thing.name, sameAs: `https://www.wikidata.org/wiki/${thing.wikidata}` }
        : thing.name,
    ),
    knowsLanguage: ["pl", "en"],
    sameAs: ELSEWHERE.map((profile) => profile.href),
    ...(image ? { image: { "@type": "ImageObject", "@id": `${origin(site)}/#portrait`, url: image, caption: SITE.name } } : {}),
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

export function homeGraph(site: URL, locale: Locale, description: string, image?: string): Node {
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
      personNode(site, locale, image),
    ],
  };
}

export function pageGraph(
  site: URL,
  url: string,
  type: "WebPage" | "AboutPage" | "CollectionPage" | "ProfilePage",
  name: string,
  description: string,
  locale: string,
  crumbs: { name: string; url: string }[],
  extra: Node[] = [],
): Node {
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
        ...(type === "AboutPage" || type === "ProfilePage"
          ? { mainEntity: { "@id": personId(site) } }
          : { author: { "@id": personId(site) } }),
      },
      breadcrumbs(crumbs),
      ...extra,
    ],
  };
}

/** The My life pin board: one ImageObject per photo with its place, month and story; he took them and is in them. */
export function galleryNode(site: URL, pageUrl: string, name: string, locale: string, pins: Pin[]): Node {
  const person = { "@id": personId(site) };
  return {
    "@type": "ImageGallery",
    "@id": `${pageUrl}#photos`,
    url: `${pageUrl}#photos`,
    name,
    inLanguage: locale,
    isPartOf: { "@id": `${pageUrl}#webpage` },
    about: person,
    associatedMedia: pins.map((pin) => {
      const contentUrl = new URL(pin.full.src, site).href;
      return {
        "@type": "ImageObject",
        "@id": `${pageUrl}#photo-${pin.file}`,
        contentUrl,
        url: contentUrl,
        width: pin.full.width,
        height: pin.full.height,
        name: pin.caption,
        caption: pin.alt,
        ...(pin.description ? { description: pin.description } : {}),
        ...(pin.when ? { dateCreated: pin.when.iso } : {}),
        ...(pin.place
          ? {
              contentLocation: {
                "@type": "Place",
                name: placeLabel(pin.place),
                address: {
                  "@type": "PostalAddress",
                  ...(pin.place.name !== pin.place.country ? { addressLocality: pin.place.name } : {}),
                  addressCountry: pin.place.countryCode,
                },
              },
            }
          : {}),
        about: person,
        creator: person,
        copyrightHolder: person,
        creditText: SITE.name,
        copyrightNotice: `© ${SITE.name}`,
      };
    }),
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
