import { existsSync, readdirSync, readFileSync } from "node:fs";

import { LOCALES } from "@package/shared/locales";
import { describe, expect, it } from "vitest";

/**
 * Locale-free addresses (wiki: site/i18n.md § Locales and URL scheme): `muszarski.com/cv` sends a reader to the page
 * in their language, English for any other [user 2026-10-08]: the browser's first language, else the visitor's country
 * (Poland → Polish, a Spanish-speaking country → Spanish) [user 2026-10-08: "by default for polish recruiters its
 * polish"]. Vercel runs the rules in vercel.json at the edge (they don't run in `astro preview`); this test runs them
 * the same way (first match wins, `has` = the Accept-Language prefix or the `x-vercel-ip-country` list) and checks
 * that they reach every page.
 */
interface Rule {
  source: string;
  destination: string;
  permanent?: boolean;
  has?: { type: string; key: string; value: { pre?: string; inc?: string[] } }[];
}

const APP = new URL("../../", import.meta.url);
const rules: Rule[] = JSON.parse(readFileSync(new URL("vercel.json", APP), "utf8")).redirects;
const PAGES = new URL("src/pages/[locale]/", APP);
const BLOG = new URL("src/content/blog/", APP);

/** A Vercel source (`/:page(a|b)/`, `/:slug/`) as an exact, case-sensitive regex. */
const pattern = (source: string) =>
  new RegExp(
    `^${source.replace(/:(\w+)(?:\(([^)]+)\))?/g, (_, name: string, alt?: string) => `(?<${name}>${alt ?? "[^/]+"})`)}$`,
  );

function redirect(path: string, acceptLanguage = "", country = ""): string | null {
  for (const rule of rules) {
    const match = pattern(rule.source).exec(path);
    if (!match) continue;
    const met = (rule.has ?? []).every(({ key, value }) =>
      key === "accept-language" ? acceptLanguage.startsWith(value.pre!) : value.inc!.includes(country),
    );
    if (!met) continue;
    return rule.destination.replace(/:(\w+)/g, (_, name: string) => match.groups?.[name] ?? "");
  }
  return null;
}

/** Top-level sections with an index page (contact has only its result pages). */
const sections = readdirSync(PAGES, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(new URL(`${entry.name}/index.astro`, PAGES)))
  .map((entry) => entry.name);
const blogLocales = readdirSync(BLOG);
const posts = blogLocales.flatMap((locale) =>
  readdirSync(new URL(`${locale}/`, BLOG))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ locale, slug: file.slice(0, -4) })),
);

/** Whether a redirect's target is a built page. */
function exists(path: string): boolean {
  const [locale, section, slug, ...rest] = path.split("/").filter(Boolean);
  if (!locale || !(LOCALES as readonly string[]).includes(locale) || rest.length > 0) return false;
  if (!section) return true;
  if (section === "blog")
    return slug ? posts.some((post) => post.locale === locale && post.slug === slug) : blogLocales.includes(locale);
  return !slug && sections.includes(section);
}

describe("locale-free addresses", () => {
  it("send a reader to their language, and English for any other", () => {
    expect(redirect("/cv/", "pl-PL,pl;q=0.9,en-US;q=0.8")).toBe("/pl/cv/");
    expect(redirect("/cv/", "es-ES,es;q=0.9")).toBe("/es/cv/");
    expect(redirect("/cv/", "en-GB,en;q=0.9")).toBe("/en/cv/");
    // Chuvash [user 2026-10-08: "we dont support Chuvash ... its okay to redirect to /<default>/cv"].
    expect(redirect("/cv/", "cv-RU,cv;q=0.9,ru;q=0.8")).toBe("/en/cv/");
    expect(redirect("/cv/")).toBe("/en/cv/");
    expect(redirect("/", "pl")).toBe("/pl/");
    expect(redirect("/")).toBe("/en/");
    // No Spanish blog (i18n.md): its readers get the English one.
    expect(redirect("/blog/", "es-ES")).toBe("/en/blog/");
  });

  it("fall back to the visitor's country when the browser's language isn't one of ours", () => {
    // A recruiter in Poland with an English browser reads Polish; the browser's own pl or es still wins.
    expect(redirect("/", "en-US,en;q=0.9", "PL")).toBe("/pl/");
    expect(redirect("/cv/", "", "PL")).toBe("/pl/cv/");
    expect(redirect("/cv/", "en-GB", "MX")).toBe("/es/cv/");
    expect(redirect("/", "de-DE", "AR")).toBe("/es/");
    expect(redirect("/", "es-ES", "PL")).toBe("/es/");
    expect(redirect("/", "pl-PL", "ES")).toBe("/pl/");
    expect(redirect("/", "en-US", "DE")).toBe("/en/");
    expect(redirect("/blog/", "en-US", "PL")).toBe("/pl/blog/");
    expect(redirect("/blog/", "en-US", "ES")).toBe("/en/blog/");
    expect(redirect("/blog/case-study/", "en-US", "PL")).toBe("/pl/blog/case-study/");
  });

  it("reach every section in every language", () => {
    expect(sections).toContain("cv");
    for (const section of sections) {
      for (const header of ["pl-PL", "es-ES", "en-US", "de-DE", ""]) {
        const target = redirect(`/${section}/`, header);
        expect(target, `/${section}/ for "${header}"`).not.toBeNull();
        expect(exists(target!), `/${section}/ -> ${target}`).toBe(true);
      }
    }
  });

  it("send a blog post's own slug to that post", () => {
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      // A slug both languages share (the case study) goes by the reader's language, English for any other.
      const shared = posts.filter((other) => other.slug === post.slug).length > 1;
      const header = shared && post.locale === "pl" ? "pl-PL" : "es-ES";
      const target = redirect(`/blog/${post.slug}/`, header);
      expect(target, `/blog/${post.slug}/ for "${header}"`).toBe(`/${post.locale}/blog/${post.slug}/`);
      expect(exists(target!)).toBe(true);
    }
  });

  it("move the case study's old addresses to /blog/case-study/", () => {
    expect(redirect("/en/blog/how-this-site-was-built/")).toBe("/en/blog/case-study/");
    expect(redirect("/pl/blog/jak-powstala-ta-strona/")).toBe("/pl/blog/case-study/");
    expect(redirect("/blog/jak-powstala-ta-strona/", "es-ES")).toBe("/pl/blog/case-study/");
    expect(redirect("/blog/how-this-site-was-built/", "pl-PL")).toBe("/en/blog/how-this-site-was-built/");
  });

  it("leave localized pages and files alone", () => {
    for (const path of ["/en/cv/", "/pl/", "/files/mateusz-muszarski-cv-en.pdf", "/_astro/app.js", "/robots.txt"]) {
      expect(redirect(path, "pl-PL"), path).toBeNull();
    }
  });

  it("stay temporary (307): the target depends on the reader; only moved addresses are permanent (308)", () => {
    const moved = ["/en/blog/how-this-site-was-built/", "/pl/blog/jak-powstala-ta-strona/", "/blog/jak-powstala-ta-strona/"];
    for (const rule of rules) expect(rule.permanent, rule.source).toBe(moved.includes(rule.source));
  });
});
