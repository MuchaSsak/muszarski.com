import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * Checks on the long-form content a schema can't express (content-model.md § Blog post, i18n.md § Long-form text):
 * - blog: translations pair up, related keys exist, internal links point at real routes, no em/en dashes or raw
 *   no-break spaces, nothing about PstrykWeb's internals (pstrykweb.md § Public disclosure)
 * - legal: the three language versions have the same numbered sections, and only known tokens
 */
const ROOT = new URL(".", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const read = (path: string) => readFileSync(join(ROOT, path), "utf8");
const list = (dir: string) => (existsSync(join(ROOT, dir)) ? readdirSync(join(ROOT, dir)) : []);

const field = (source: string, key: string) => new RegExp(`^${key}:\\s*"?([^"\\n]*)"?\\s*$`, "m").exec(source)?.[1];
const arrayField = (source: string, key: string) =>
  (new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, "m").exec(source)?.[1] ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
const body = (source: string) => source.replace(/^---[\s\S]*?\n---\n/, "");

const posts = ["en", "pl"].flatMap((locale) =>
  list(`blog/${locale}`)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const source = read(`blog/${locale}/${name}`);
      return { locale, slug: name.replace(/\.mdx$/, ""), source, key: field(source, "translationKey")!, related: arrayField(source, "related") };
    }),
);

describe("blog posts", () => {
  it("exist", () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it("have one post per translation key and locale", () => {
    const seen = new Set<string>();
    for (const post of posts) {
      const id = `${post.locale}:${post.key}`;
      expect(seen.has(id), id).toBe(false);
      seen.add(id);
    }
  });

  it("list only related posts that exist in the same locale", () => {
    for (const post of posts) {
      for (const key of post.related) {
        expect(
          posts.some((other) => other.locale === post.locale && other.key === key),
          `${post.locale}/${post.slug} → ${key}`,
        ).toBe(true);
      }
    }
  });

  it("link only to blog posts and pages that exist", () => {
    const pages = /^\/(en|pl|es)\/(|#[\w-]+|work\/|cv\/|my-life\/|blog\/|privacy\/|terms\/)$/;
    for (const post of posts) {
      for (const [, href] of body(post.source).matchAll(/\]\((\/[^)\s]*)\)/g)) {
        const blog = /^\/(en|pl)\/blog\/([\w-]+)\/(#[\w-]+)?$/.exec(href!);
        const ok = blog ? posts.some((other) => other.locale === blog[1] && other.slug === blog[2]) : pages.test(href!);
        expect(ok, `${post.locale}/${post.slug}: ${href}`).toBe(true);
      }
    }
  });

  it("use no em or en dashes and no raw no-break spaces", () => {
    for (const post of posts) expect(body(post.source), `${post.locale}/${post.slug}`).not.toMatch(/[\u00a0\u2013\u2014]/);
  });

  it("say nothing about PstrykWeb's internals", () => {
    for (const post of posts) expect(post.source, `${post.locale}/${post.slug}`).not.toMatch(/pstryk/i);
  });
});

describe("legal texts", () => {
  for (const doc of ["privacy", "terms"]) {
    it(`${doc}: the same numbered sections in pl, en and es`, () => {
      const numbers = (locale: string) => [...read(`legal/${locale}/${doc}.md`).matchAll(/^## (§ )?(\d+)\./gm)].map((m) => m[2]);
      const pl = numbers("pl");
      expect(pl.length).toBeGreaterThan(5);
      expect(numbers("en")).toEqual(pl);
      expect(numbers("es")).toEqual(pl);
    });

    it(`${doc}: only known tokens`, () => {
      for (const locale of ["pl", "en", "es"]) {
        const tokens = [...read(`legal/${locale}/${doc}.md`).matchAll(/\[\[([A-Z_]+)\]\]/g)].map((m) => m[1]);
        for (const token of tokens) expect(["EMAIL", "SITE_URL", "POSTAL_ADDRESS", "MAILBOX_PROVIDER", "MAILBOX_LOCATION"]).toContain(token);
      }
    });
  }
});
