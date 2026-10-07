/**
 * Is this build the real launch? (wiki: tech/technologies.md § Environment variables, placeholders.md)
 * Only when the owner says so [owner 2026-10-06: "we consider full prod when i say it is, regardless of whether
 * deployed to domain or not"]: `LAUNCH_BUILD=true` or `--launch`. Every other build (local, preview, a production
 * deploy on the domain) is noindex; the launch gate refuses to ship a launch while placeholders are left.
 */

/** The production domain, "for now" (owner 2026-10-05; site/seo.md § Domain). Umami counts visits here only (apex + www). */
export const SITE_HOSTS = ["matmuszarski.space"];
export const FALLBACK_SITE_URL = "https://matmuszarski.space";

const productionHost = (env) =>
  (env.VERCEL_PROJECT_PRODUCTION_URL ?? "")
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");

export function isLaunchBuild(env = process.env, argv = process.argv) {
  return argv.includes("--launch") || env.LAUNCH_BUILD === "true";
}

/**
 * The origin for canonical, hreflang, og:image and sitemaps: PUBLIC_SITE_URL if set; the launch uses the fallback; a
 * production deploy its production domain (shared links show the domain); a review deploy its own host.
 */
export function siteUrl(env = process.env, argv = process.argv) {
  if (env.PUBLIC_SITE_URL) return env.PUBLIC_SITE_URL.replace(/\/$/, "");
  if (isLaunchBuild(env, argv)) return FALLBACK_SITE_URL;
  const host = productionHost(env);
  if (env.VERCEL_ENV === "production" && host) return `https://${host}`;
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return FALLBACK_SITE_URL;
}
