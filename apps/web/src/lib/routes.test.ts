import { describe, expect, it } from "vitest";

import { alternates, localeFromPath, pathTo, switchPath } from "~/lib/routes";

const SITE = "https://muszarski.com";

describe("pathTo", () => {
  it("prefixes the locale and always ends with a slash", () => {
    expect(pathTo("en")).toBe("/en/");
    expect(pathTo("pl", "work")).toBe("/pl/work/");
    expect(pathTo("es", "/work/linkoglot/")).toBe("/es/work/linkoglot/");
  });

  it("uses the per-locale slug and refuses a missing locale", () => {
    const post = { en: "blog/astro-i18n", pl: "blog/astro-wielojezycznosc" };
    expect(pathTo("pl", post)).toBe("/pl/blog/astro-wielojezycznosc/");
    expect(() => pathTo("es", post)).toThrow();
  });
});

describe("alternates", () => {
  it("is reciprocal, self-referencing and has x-default -> en", () => {
    const links = alternates(SITE, "work");
    expect(links).toEqual([
      { hreflang: "en", href: `${SITE}/en/work/` },
      { hreflang: "pl", href: `${SITE}/pl/work/` },
      { hreflang: "es", href: `${SITE}/es/work/` },
      { hreflang: "x-default", href: `${SITE}/en/work/` },
    ]);
  });

  it("only links real translations", () => {
    const links = alternates(SITE, { en: "blog/a", pl: "blog/b" });
    expect(links.map((link) => link.hreflang)).toEqual(["en", "pl", "x-default"]);
  });

  it("gives a single-locale page no hreflang at all", () => {
    expect(alternates(SITE, { pl: "blog/tylko-po-polsku" })).toEqual([]);
  });
});

describe("switchPath", () => {
  it("keeps the page when it exists in the target locale", () => {
    expect(switchPath("work", "pl")).toBe("/pl/work/");
  });

  it("falls back to the section, never a silent English page", () => {
    expect(switchPath({ en: "blog/a", pl: "blog/b" }, "es", "")).toBe("/es/");
  });
});

describe("localeFromPath", () => {
  it("reads the first segment", () => {
    expect(localeFromPath("/pl/work/")).toBe("pl");
    expect(localeFromPath("/nope/")).toBe("en");
    expect(localeFromPath("/")).toBe("en");
  });
});
