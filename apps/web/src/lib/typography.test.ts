import { describe, expect, it } from "vitest";

import { typo, typoHtml } from "~/lib/typography";

const nb = (text: string) => text.replaceAll("~", "\u00a0");

describe("typo", () => {
  it("binds Polish one-letter words to the next word", () => {
    expect(typo("pl", "problem biznesowy w gotowy produkt i od początku")).toBe(
      nb("problem biznesowy w~gotowy produkt i~od początku"),
    );
    expect(typo("pl", "a w Polsce i z Gdańska")).toBe(nb("a~w~Polsce i~z~Gdańska"));
  });

  it("binds Spanish one-letter conjunctions", () => {
    expect(typo("es", "web y móvil o escritorio")).toBe(nb("web y~móvil o~escritorio"));
  });

  it("keeps a number with its unit in every locale", () => {
    expect(typo("en", "since 2022, 390 px wide")).toBe(nb("since 2022, 390~px wide"));
  });

  it("leaves English words alone apart from a / I", () => {
    expect(typo("en", "I turn a problem into a product")).toBe(nb("I~turn a~problem into a~product"));
  });
});

describe("typoHtml", () => {
  it("binds text across a page but leaves tags, attributes and code alone", () => {
    const html = '<p title="a w b">idę w <a href="/w x">las</a> i <code>a w b</code></p><script>const a = "w x";</script>';
    expect(typoHtml("pl", html)).toBe(
      nb('<p title="a w b">idę w~<a href="/w x">las</a> i~<code>a w b</code></p><script>const a = "w x";</script>'),
    );
  });

  it("keeps a separator with the word before it and a section sign with its number", () => {
    expect(typo("en", "React · Astro · Lingui, see § 3")).toBe(nb("React~· Astro~· Lingui, see §~3"));
  });
});

describe("product names", () => {
  it("never splits a two-word product name", () => {
    expect(typo("en", "React Native and App Store, Claude Code")).toBe(nb("React~Native and App~Store, Claude~Code"));
  });
});
