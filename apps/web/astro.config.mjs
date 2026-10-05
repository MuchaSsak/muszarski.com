// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { lingui } from "@lingui/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import linguiForAstro from "lingui-for-astro/integration";

import { isLaunchBuild, siteUrl } from "./scripts/launch.mjs";

/**
 * The portfolio site (wiki: .claude/project-info/tech/technologies.md). `output: "static"`: every page is
 * pre-rendered and served from Vercel's CDN; React/TSX renders to HTML (0 KB JS unless an island hydrates).
 * The contact endpoint (slice 10) adds the Vercel adapter for its one function.
 */
const SITE_URL = siteUrl();
const LAUNCH = isLaunchBuild();
const BUILD = process.argv.includes("build");

// Third-party origins the pages may talk to. Everything else is 'self'.
const UMAMI_SCRIPT = process.env.PUBLIC_UMAMI_SCRIPT_URL ?? "https://cloud.umami.is/script.js";
const UMAMI = new URL(UMAMI_SCRIPT).origin;
// Umami Cloud collects on a separate host from the script.
const UMAMI_COLLECT = process.env.PUBLIC_UMAMI_COLLECT_ORIGIN ?? "https://gateway.umami.is";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "always" },
  compressHTML: true,
  prefetch: false,
  devToolbar: { enabled: false },
  integrations: [
    linguiForAstro(),
    react(),
    sitemap({
      // The dev specimen, the root redirect and 404 are never in the sitemap.
      filter: (page) => /\/(en|pl|es)\//.test(page) && !page.includes("/specimen/"),
      i18n: { defaultLocale: "en", locales: { en: "en", pl: "pl", es: "es" } },
    }),
  ],
  // Shiki's inline styles break the CSP; code blocks get CSS-only highlighting when the blog slice needs
  // them. Smart punctuation (English curly quotes, wrong in Polish) is switched off there too.
  markdown: { syntaxHighlight: false },
  vite: {
    plugins: [
      tailwindcss(),
      // Native macro transform (no Babel) for .tsx/.ts + `.po` compiled on import. A production build
      // fails when a pl/es catalog misses a message (site/i18n.md).
      lingui({ macroTransform: true, failOnMissing: BUILD ? "catalog" : false, failOnCompileError: true }),
    ],
  },
  image: { responsiveStyles: false },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "media-src 'self'",
        `connect-src 'self' ${UMAMI} ${UMAMI_COLLECT}`,
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      scriptDirective: { resources: ["'self'", UMAMI] },
      // React renders `style={{...}}` as attributes; hashes can't cover those.
      styleDirective: { resources: ["'self'", { resource: "'unsafe-inline'", kind: "attribute" }] },
    },
  },
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({ context: "client", access: "public", default: SITE_URL }),
      PUBLIC_UMAMI_WEBSITE_ID: envField.string({ context: "client", access: "public", optional: true }),
      PUBLIC_UMAMI_SCRIPT_URL: envField.string({ context: "client", access: "public", default: UMAMI_SCRIPT }),
      // Search Console's HTML-tag token, only when the property is not verified by DNS. Unset = no tag.
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({ context: "server", access: "public", optional: true }),
      // True only for the real launch build (scripts/launch.mjs); every other build is noindex.
      LAUNCH_BUILD: envField.boolean({ context: "server", access: "public", default: LAUNCH }),
    },
  },
});
