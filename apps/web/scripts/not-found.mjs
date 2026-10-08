// @ts-check
import { createHash } from "node:crypto";
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

/** The locales whose 404 copy is folded into the English `404.html` (pages/[locale]/404.astro). */
const LOCALES = ["pl", "es"];

/**
 * One `404.html` in the reader's language (site/i18n.md § 404, components/NotFound.astro). A static host serves the
 * same file for every missing address, so after the build this takes the Polish and Spanish 404 pages, puts each
 * one's body (scripts left out: the English page's own run once) into a `<template>` in `404.html` with its title,
 * just before the script that swaps it in, and deletes those pages so `/pl/404/` never ships. Astro's CSP hashes only
 * the scripts it bundles: the inline ones in the head run because they come before the CSP meta, the swap script at
 * the end of the body doesn't, so its hash is added to `script-src` here.
 * @param {string} html
 * @param {Record<string, string>} copies locale → its page's HTML
 * @returns {string}
 */
export function foldNotFound(html, copies) {
  const swap = /<script[^>]*\bdata-nf-swap\b[^>]*>([\s\S]*?)<\/script>/.exec(html);
  if (!swap?.[1]) throw new Error("404.html has no data-nf-swap script (components/NotFound.astro)");
  const csp = /(content-security-policy" content="[^"]*script-src )/i;
  if (!csp.test(html)) throw new Error("404.html has no CSP script-src to add the swap script's hash to");
  const hash = `'sha256-${createHash("sha256").update(swap[1]).digest("base64")}'`;
  const templates = Object.entries(copies)
    .map(([locale, page]) => {
      const title = /<title>([\s\S]*?)<\/title>/.exec(page)?.[1];
      const body = /<body[^>]*>([\s\S]*)<\/body>/.exec(page)?.[1];
      if (title === undefined || body === undefined) throw new Error(`the ${locale} 404 page has no title or body`);
      const content = body.replace(/<script\b[\s\S]*?<\/script>/g, "");
      return `<template id="nf-${locale}" data-title="${title.replaceAll('"', "&quot;")}">${content}</template>`;
    })
    .join("");
  const page = html.slice(0, swap.index) + templates + html.slice(swap.index);
  return page.replace(csp, `$1${hash} `);
}

/** @returns {import("astro").AstroIntegration} */
export function notFoundLocales() {
  return {
    name: "not-found-locales",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        /** @type {Record<string, string>} */
        const copies = {};
        for (const locale of LOCALES) copies[locale] = await readFile(`${root}${locale}/404/index.html`, "utf8");
        const file = `${root}404.html`;
        await writeFile(file, foldNotFound(await readFile(file, "utf8"), copies));
        for (const locale of LOCALES) await rm(`${root}${locale}/404`, { recursive: true, force: true });
        logger.info(`404.html carries ${LOCALES.join(", ")}`);
      },
    },
  };
}
