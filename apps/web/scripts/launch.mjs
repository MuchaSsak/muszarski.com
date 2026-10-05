/**
 * Is this build the real launch? (wiki: tech/technologies.md § Environment variables, placeholders.md)
 * Every other build (local, preview, a production deploy on *.vercel.app) is noindex. `LAUNCH_BUILD=true`
 * or `--launch` forces the real mode; the launch gate then refuses to ship while placeholders are left.
 */

/** The production domain, "for now" (owner 2026-10-05; site/seo.md § Domain). */
export const SITE_HOSTS = ["matmuszarski.space"];
export const FALLBACK_SITE_URL = "https://matmuszarski.space";

const productionHost = (env) =>
  (env.VERCEL_PROJECT_PRODUCTION_URL ?? "")
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");

export function isLaunchBuild(env = process.env, argv = process.argv) {
  if (argv.includes("--launch") || env.LAUNCH_BUILD === "true") return true;
  if (env.VERCEL_ENV !== "production") return false;
  const host = productionHost(env);
  return SITE_HOSTS.some((ours) => host === ours || host === `www.${ours}`);
}

/**
 * The origin for canonical, hreflang, og:image and sitemaps. A review deploy points at its own
 * host so shared links resolve; the launch uses PUBLIC_SITE_URL (or the fallback).
 */
export function siteUrl(env = process.env, argv = process.argv) {
  if (env.PUBLIC_SITE_URL) return env.PUBLIC_SITE_URL.replace(/\/$/, "");
  if (!isLaunchBuild(env, argv) && env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return FALLBACK_SITE_URL;
}
