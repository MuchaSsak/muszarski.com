import { DEFAULT_LOCALE, isLocale, type Locale, LOCALES } from "@package/shared/locales";

/**
 * The ONE path builder (wiki: site/i18n.md § Path builder). Canonical, hreflang, the locale switcher
 * and sitemaps all go through it, so every URL is `/<locale>/<path>/` with a trailing slash.
 *
 * `path` is the locale-free part: "" for home, "work/", "work/linkoglot/". Pages whose slug differs
 * per locale (blog posts) pass a `{ en, pl }` map instead.
 */
export type LocalizedPath = string | Partial<Record<Locale, string>>;

const clean = (path: string) => {
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return trimmed ? `${trimmed}/` : "";
};

const pathFor = (path: LocalizedPath, locale: Locale): string | null => {
  if (typeof path === "string") return path;
  return path[locale] ?? null;
};

/** `/pl/work/` for (`pl`, "work"). Throws when the page has no version in that locale. */
export function pathTo(locale: Locale, path: LocalizedPath = ""): string {
  const local = pathFor(path, locale);
  if (local === null) throw new Error(`No ${locale} version of ${JSON.stringify(path)}`);
  return `/${locale}/${clean(local)}`;
}

/** The locales a page exists in: every locale for a plain path, the map's keys otherwise. */
export function localesOf(path: LocalizedPath, available: readonly Locale[] = LOCALES): Locale[] {
  return available.filter((locale) => pathFor(path, locale) !== null);
}

export interface Alternate {
  hreflang: Locale | "x-default";
  href: string;
}

/**
 * Reciprocal, self-referencing hreflang links (absolute). A page in one locale only gets none
 * (`seo.md`: no hreflang for single-locale pages). `x-default` points at the English version.
 */
export function alternates(site: string | URL, path: LocalizedPath, available: readonly Locale[] = LOCALES): Alternate[] {
  const locales = localesOf(path, available);
  if (locales.length < 2) return [];
  const origin = new URL(site).origin;
  const links: Alternate[] = locales.map((locale) => ({ hreflang: locale, href: origin + pathTo(locale, path) }));
  const fallback = locales.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : locales[0];
  if (fallback) links.push({ hreflang: "x-default", href: origin + pathTo(fallback, path) });
  return links;
}

/**
 * Where the switcher sends a reader of `path` who picks `to`: the same page when it exists in `to`,
 * otherwise that locale's `fallback` section (e.g. its blog index), never a silent English page.
 */
export function switchPath(
  path: LocalizedPath,
  to: Locale,
  fallback: LocalizedPath = "",
  available: readonly Locale[] = LOCALES,
): string {
  if (localesOf(path, available).includes(to)) return pathTo(to, path);
  // The fallback section may not exist in `to` either (no Spanish blog): then that locale's home.
  return localesOf(fallback).includes(to) ? pathTo(to, fallback) : pathTo(to);
}

/** The locale of a URL path's first segment, or the default. */
export function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/").find(Boolean);
  return isLocale(first) ? first : DEFAULT_LOCALE;
}

/** Static paths for a page that exists in every locale. */
export const localeStaticPaths = () => LOCALES.map((locale) => ({ params: { locale } }));
