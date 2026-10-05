import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

/**
 * Mechanical alignment of the catalogs (site/i18n.md § Translation workflow): every msgid translated,
 * the same `{placeholders}` and `<n>` tags, no raw no-break spaces or em/en dashes, es marked unreviewed.
 */
const read = (locale: string) => readFileSync(new URL(`./${locale}/messages.po`, import.meta.url), "utf8");

const entries = (po: string) =>
  [...po.matchAll(/^msgid "(.*)"\nmsgstr "(.*)"$/gm)].filter((m) => m[1] !== "").map((m) => ({ id: m[1]!, str: m[2]! }));

const tokens = (text: string) => [...text.matchAll(/\{\w+\}|<\/?\d+>/g)].map((m) => m[0]).sort();

describe.each(["pl", "es"])("%s catalog", (locale) => {
  const po = read(locale);
  const list = entries(po);
  const sourceIds = entries(read("en")).map((entry) => entry.id);

  it("has every source message", () => {
    expect(list.map((entry) => entry.id).sort()).toEqual([...sourceIds].sort());
  });

  it("translates every message", () => {
    expect(list.filter((entry) => !entry.str).map((entry) => entry.id)).toEqual([]);
  });

  it("keeps placeholders and tags identical", () => {
    for (const entry of list) expect(tokens(entry.str), entry.id).toEqual(tokens(entry.id));
  });

  it("has no raw no-break spaces or em/en dashes", () => {
    for (const entry of list) expect(entry.str, entry.id).not.toMatch(/[\u00a0\u2013\u2014]/);
  });
});

describe("es catalog", () => {
  it("is marked as an unreviewed AI translation", () => {
    expect(read("es")).toContain("X-Review-Status: unreviewed (AI translation)");
  });
});
