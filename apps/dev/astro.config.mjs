// @ts-check
import { defineConfig } from "astro/config";

/**
 * dev.muszarski.com: a hidden, unindexed hub of side projects (wiki: site/structure.md § dev subdomain).
 * Its own Vercel project (root directory apps/dev), so it never touches the portfolio's routing, sitemap or budgets.
 */
export default defineConfig({
  site: "https://dev.muszarski.com",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "always" },
  compressHTML: true,
  devToolbar: { enabled: false },
});
