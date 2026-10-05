import type { APIRoute, GetStaticPaths } from "astro";

import { SITE } from "~/data/site";
import { BLOG_LOCALES } from "~/lib/nav";
import { type BlogLocale, postPath, postsIn } from "~/lib/posts";
import { pathTo } from "~/lib/routes";

/** RSS 2.0 per blog locale: /en/rss.xml, /pl/rss.xml (structure.md § Sitemap, requirements.md F12). */
export const getStaticPaths: GetStaticPaths = () => BLOG_LOCALES.map((locale) => ({ params: { locale } }));

const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const GET: APIRoute = async ({ params, site }) => {
  const locale = params.locale as BlogLocale;
  const origin = (site ?? new URL("http://localhost:4321")).origin;
  const posts = await postsIn(locale);
  const title = locale === "pl" ? `${SITE.name}: blog` : `${SITE.name}: blog`;
  const description =
    locale === "pl"
      ? "Notatki z budowania produktów: AI w programowaniu, Lingui, wydajność i dostępność."
      : "Notes from building products: AI-assisted development, Lingui, performance and accessibility.";
  const items = posts
    .map((post) => {
      const url = origin + postPath(post);
      return `    <item>
      <title>${escape(post.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.data.description)}</description>
      <pubDate>${post.data.published.toUTCString()}</pubDate>
${post.data.tags.map((tag) => `      <category>${escape(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(title)}</title>
    <link>${origin}${pathTo(locale, "blog")}</link>
    <atom:link href="${origin}/${locale}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>${escape(description)}</description>
    <language>${locale}</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
