import type { APIRoute } from "astro";
import { IS_FULL_PRODUCTION } from "astro:env/server";

/**
 * Review builds are closed to crawlers (and noindex in the head); the launch build opens the site
 * and points at the sitemap. AI-crawler rules and llms.txt come with the SEO slice (site/seo.md).
 */
export const GET: APIRoute = ({ site }) => {
  const body = IS_FULL_PRODUCTION
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap-index.xml", site).href}\n`
    : "User-agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
