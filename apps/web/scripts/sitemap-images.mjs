// @ts-check
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

/**
 * Image entries in the sitemap (site/seo.md § Crawl and indexing): @astrojs/sitemap can't know the hashed URLs Astro
 * gives images, so after it writes the sitemap this reads each listed page from the build and adds an `<image:image>`
 * for every element marked `data-sitemap-image` (the My life pin board). Listed after `sitemap()` so its file exists.
 * Google reads `image:loc` only (caption, title and geo were retired in 2022); place and story live in the JSON-LD.
 * @returns {import("astro").AstroIntegration}
 */
export function sitemapImages() {
  return {
    name: "sitemap-images",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const files = (await readdir(root)).filter((name) => /^sitemap-\d+\.xml$/.test(name));
        let added = 0;
        for (const name of files) {
          const path = `${root}${name}`;
          let xml = await readFile(path, "utf8");
          if (!xml.includes('xmlns:image="')) {
            xml = xml.replace("<urlset ", '<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ');
          }
          const urls = [...xml.matchAll(/<url><loc>([^<]+)<\/loc>/g)];
          for (const [, loc] of urls) {
            if (!loc) continue;
            const page = new URL(loc);
            let html;
            try {
              html = await readFile(`${root}${page.pathname.replace(/^\//, "")}index.html`, "utf8");
            } catch {
              continue;
            }
            const images = [...new Set([...html.matchAll(/data-sitemap-image="([^"]+)"/g)].map((match) => match[1]))];
            if (!images.length) continue;
            const tags = images
              .map((src) => `<image:image><image:loc>${new URL(src ?? "", page.origin).href}</image:loc></image:image>`)
              .join("");
            xml = xml.replace(`<url><loc>${loc}</loc>`, `<url><loc>${loc}</loc>${tags}`);
            added += images.length;
          }
          await writeFile(path, xml);
        }
        logger.info(`${added} image entr${added === 1 ? "y" : "ies"} added to the sitemap`);
      },
    },
  };
}
