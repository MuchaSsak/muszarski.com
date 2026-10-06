// @ts-check
import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { lingui } from "@lingui/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import linguiForAstro from "lingui-for-astro/integration";

import { isLaunchBuild, siteUrl } from "./scripts/launch.mjs";
import { SITE } from "./src/data/site.ts";

/**
 * The portfolio site (wiki: .claude/project-info/tech/technologies.md). `output: "static"`: every page is
 * pre-rendered and served from Vercel's CDN; React/TSX renders to HTML (0 KB JS unless an island hydrates).
 * The contact endpoint is a plain Vercel Function next to it (`api/contact.ts`), so no adapter is needed.
 */
const SITE_URL = siteUrl();
const LAUNCH = isLaunchBuild();
const BUILD = process.argv.includes("build");

// Third-party origins the pages may talk to. Everything else is 'self'.
const UMAMI_SCRIPT = process.env.PUBLIC_UMAMI_SCRIPT_URL ?? "https://cloud.umami.is/script.js";
const UMAMI = new URL(UMAMI_SCRIPT).origin;
// Umami Cloud collects on a separate host from the script.
const UMAMI_COLLECT = process.env.PUBLIC_UMAMI_COLLECT_ORIGIN ?? "https://gateway.umami.is";
// Cloudflare Turnstile: loaded on the contact form only, once the visitor starts typing (requirements.md F09).
const TURNSTILE = "https://challenges.cloudflare.com";

/**
 * Legal texts carry tokens for facts that live in one place (`[[EMAIL]]` → site.ts) or are not known yet (the postal
 * address, the mailbox provider: placeholders.md P13). Known tokens become the value; unknown ones a visible, marked
 * gap, so a draft never pretends to be complete. A Sätteri mdast plugin that only runs on files under content/legal.
 */
/** @type {Record<string, Record<string, string>>} */
const LEGAL_GAPS = {
  en: {
    POSTAL_ADDRESS: "postal address to be completed",
    MAILBOX_PROVIDER: "mailbox provider to be completed",
    MAILBOX_LOCATION: "location to be completed",
  },
  pl: {
    POSTAL_ADDRESS: "adres do korespondencji do uzupełnienia",
    MAILBOX_PROVIDER: "dostawca skrzynki do uzupełnienia",
    MAILBOX_LOCATION: "lokalizacja do uzupełnienia",
  },
  es: {
    POSTAL_ADDRESS: "dirección postal pendiente",
    MAILBOX_PROVIDER: "proveedor del buzón pendiente",
    MAILBOX_LOCATION: "ubicación pendiente",
  },
};
/** @param {{ fileURL?: URL }} context */
function legalTokens(context) {
  const path = context.fileURL ? decodeURIComponent(context.fileURL.pathname) : "";
  const locale = /\/content\/legal\/(en|pl|es)\//.exec(path)?.[1];
  if (!locale) return null;
  /** @type {Record<string, string>} */
  const known = { EMAIL: SITE.email, SITE_URL };
  const gaps = LEGAL_GAPS[locale] ?? {};
  return {
    name: "legal-tokens",
    /** @param {any} node @param {any} ctx */
    text(node, ctx) {
      if (!node.value.includes("[[")) return;
      const parts = node.value
        .split(/(\[\[[A-Z_]+\]\])/)
        .filter(Boolean)
        .map((/** @type {string} */ part) => {
          const token = /^\[\[([A-Z_]+)\]\]$/.exec(part)?.[1];
          if (!token) return { type: "text", value: part };
          if (token in known) return { type: "text", value: known[token] };
          if (token in gaps) return { raw: `<mark class="tbd" data-placeholder>[${gaps[token]}]</mark>` };
          throw new Error(`Unknown legal token [[${token}]] in ${path}`);
        });
      ctx.replaceNode(node, parts);
    },
  };
}

/** Wide tables in posts scroll inside themselves; a focusable scroll region is reachable by keyboard (axe). */
const tableScroll = {
  name: "table-scroll",
  element: {
    filter: ["table"],
    /** @param {any} node @param {any} ctx */
    visit(node, ctx) {
      ctx.setProperty(node, "tabIndex", 0);
    },
  },
};

/** Links that leave the site open in a new tab, so a reader keeps their place in the post [user 2026-10-06]. */
/** @type {Record<string, string>} The same words as the catalogs' "(opens in a new tab)". */
const NEW_TAB = { en: "(opens in a new tab)", pl: "(otwiera się w nowej karcie)", es: "(se abre en una pestaña nueva)" };
/** @param {{ fileURL?: URL }} context */
function externalLinks(context) {
  const path = context.fileURL ? decodeURIComponent(context.fileURL.pathname) : "";
  const note = NEW_TAB[/\/content\/\w+\/(en|pl|es)\//.exec(path)?.[1] ?? "en"];
  return {
    name: "external-links",
    element: {
      filter: ["a"],
      /** @param {any} node @param {any} ctx */
      visit(node, ctx) {
        const href = String(node.properties?.href ?? "");
        if (!/^https?:\/\//.test(href) || href.startsWith(SITE_URL)) return;
        ctx.setProperty(node, "target", "_blank");
        ctx.setProperty(node, "rel", "noopener");
        // Screen readers hear it after the link text (WCAG 2.5.3: the visible words still start the name).
        ctx.appendChild(node, {
          type: "element",
          tagName: "span",
          properties: { className: ["sr-only"] },
          children: [{ type: "text", value: ` ${note}` }],
        });
      },
    },
  };
}

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
    mdx(),
    sitemap({
      // Only real, indexable pages: never the root redirect, 404, legal pages (noindex), the CV print route or the
      // contact result pages (seo.md § Robots).
      filter: (page) => /\/(en|pl|es)\//.test(page) && !/\/(privacy|terms|cv\/print|contact)\//.test(page),
      i18n: { defaultLocale: "en", locales: { en: "en", pl: "pl", es: "es" } },
    }),
  ],
  // Code blocks: Shiki with the css-variables theme, so token colours come from the site's tokens (style attributes
  // are allowed by the CSP). Smart punctuation is off: English curly quotes are wrong in Polish.
  markdown: {
    processor: satteri({
      mdastPlugins: [legalTokens],
      hastPlugins: [tableScroll, externalLinks],
      features: { smartPunctuation: false },
    }),
    syntaxHighlight: "shiki",
    shikiConfig: { theme: "css-variables", wrap: false },
  },
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
        `connect-src 'self' ${UMAMI} ${UMAMI_COLLECT} ${TURNSTILE}`,
        `frame-src ${TURNSTILE}`,
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      scriptDirective: { resources: ["'self'", UMAMI, TURNSTILE] },
      // React renders `style={{...}}` as attributes; hashes can't cover those.
      styleDirective: { resources: ["'self'", { resource: "'unsafe-inline'", kind: "attribute" }] },
    },
  },
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({ context: "client", access: "public", default: SITE_URL }),
      // The Umami Cloud website id [user 2026-10-06]. Public by design (it ships in every page's HTML); the script only
      // counts on the production host (`data-domains`), so previews and local runs send nothing.
      PUBLIC_UMAMI_WEBSITE_ID: envField.string({
        context: "client",
        access: "public",
        default: "ceeca8b5-55ea-4bce-a1f2-a9f7c45c3590",
      }),
      PUBLIC_UMAMI_SCRIPT_URL: envField.string({ context: "client", access: "public", default: UMAMI_SCRIPT }),
      // Turnstile's public site key; unset = the form sends without the widget (the function then skips the check
      // only when its secret is unset too).
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({ context: "client", access: "public", optional: true }),
      // Search Console's HTML-tag token, only when the property is not verified by DNS. Unset = no tag.
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({ context: "server", access: "public", optional: true }),
      // True only for the real launch build (scripts/launch.mjs); every other build is noindex.
      LAUNCH_BUILD: envField.boolean({ context: "server", access: "public", default: LAUNCH }),
    },
  },
});
