/**
 * Content collections (wiki: content/content-model.md § Blog post, site/i18n.md § Long-form text).
 * - blog: MDX per locale in src/content/blog/<en|pl>/<slug>.mdx, served at /<locale>/blog/<slug>/. `translationKey`
 *   links the translations for hreflang; a post in one locale has no alternates. The case study #0 lives here too
 *   (`tags: [case-study]`, open-questions Q43).
 * - legal: Markdown per locale in src/content/legal/<en|pl|es>/<privacy|terms>.md, served at /<locale>/<privacy|terms>/
 *   (noindex,follow). Polish prevails. `legal.test.ts` checks the three versions have the same numbered sections.
 */
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { BLOG_COVERS, BLOG_TAGS } from "./lib/blog";

const blog = defineCollection({
  loader: glob({ pattern: "{en,pl}/*.mdx", base: "./src/content/blog" }),
  schema: z
    .object({
      title: z.string().min(20).max(110),
      /** The <title> when the H1 is too long for a search result. */
      seoTitle: z.string().min(15).max(60).optional(),
      description: z.string().min(80).max(160),
      translationKey: z.string().min(3),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.enum(BLOG_TAGS)).min(1).max(4),
      cover: z.enum(BLOG_COVERS),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      related: z.array(z.string()).max(3).default([]),
      sources: z.array(z.object({ title: z.string().min(3), url: z.url(), accessed: z.coerce.date() })).default([]),
    })
    .refine((post) => !post.updated || post.updated >= post.published, { message: "updated is before published", path: ["updated"] }),
});

const legal = defineCollection({
  loader: glob({ pattern: "{en,pl,es}/*.md", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string().min(5).max(80),
    description: z.string().min(60).max(180),
    version: z.string().regex(/^\d+\.\d+$/),
    updated: z.coerce.date(),
  }),
});

export const collections = { blog, legal };
