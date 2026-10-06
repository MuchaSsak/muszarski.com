/**
 * The one list of locales (wiki: .claude/project-info/site/i18n.md). Used by the Lingui config, the
 * Astro routes, the path builder, sitemaps and scripts. The URL segment equals the locale id.
 */
export const LOCALES = ["en", "pl", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const SOURCE_LOCALE: Locale = "en";
export const DEFAULT_LOCALE: Locale = "en";

/** Autonyms: each language named in itself; the switcher pairs them with drawn flags (site/i18n.md § Switcher). */
export const AUTONYMS: Record<Locale, string> = {
  en: "English",
  pl: "Polski",
  es: "Español",
};

/** Open Graph needs a territory; `<html lang>` and hreflang use the bare code. */
export const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  pl: "pl_PL",
  es: "es_ES",
};

/** Locales whose copy is machine-translated and not yet read by a fluent speaker (placeholders.md P12). */
export const UNREVIEWED_LOCALES: readonly Locale[] = ["es"];

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (LOCALES as readonly string[]).includes(value);
