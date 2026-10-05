import { describe, expect, it } from "vitest";

import { typo } from "~/lib/typography";

const nb = (text: string) => text.replaceAll("~", "\u00a0");

describe("typo", () => {
  it("binds Polish one-letter words to the next word", () => {
    expect(typo("pl", "problem biznesowy w gotowy produkt i od początku")).toBe(nb("problem biznesowy w~gotowy produkt i~od początku"));
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
