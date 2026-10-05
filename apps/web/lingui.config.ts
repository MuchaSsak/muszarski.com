import babelExtractor from "@lingui/cli/api/extractors/babel";
import { DEFAULT_LOCALE, LOCALES, SOURCE_LOCALE } from "@package/shared/locales";
import { defineConfig } from "lingui-for-astro/config";
import { astroExtractor } from "lingui-for-astro/extractor";

/**
 * Lingui for the site (wiki: site/i18n.md § Lingui wiring). One catalog per locale, `.po` format.
 * The Vite plugin compiles `.po` on import, so there is no committed compiled catalog; production
 * builds fail on any message missing from a pl/es catalog (`failOnMissing: "catalog"`, astro.config).
 */
export default defineConfig({
  sourceLocale: SOURCE_LOCALE,
  locales: [...LOCALES],
  fallbackLocales: { default: DEFAULT_LOCALE },
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["<rootDir>/src"],
      exclude: ["**/node_modules/**", "<rootDir>/src/locales/**"],
    },
  ],
  extractors: [astroExtractor, babelExtractor],
});
