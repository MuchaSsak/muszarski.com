import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

/**
 * Guards for the Poster fields (design/design.md § Themes and fields): every field token is defined, and every
 * field's text colour keeps WCAG AA on its background (body copy sits on all of them).
 */
const css = readFileSync(new URL("./global.css", import.meta.url), "utf8");

const block = (selector: string) => {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`missing ${selector}`);
  const body = css.slice(css.indexOf("{", start) + 1, css.indexOf("}", start));
  return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]!.toLowerCase()]));
};

const FIELDS = ["hero", "alt", "deep", "bar"] as const;
const TOKENS = [...FIELDS.flatMap((f) => [`${f}-bg`, `${f}-fg`]), "accent", "on-accent"].sort();

const cobalt = Object.fromEntries(Object.entries(block(":root")).filter(([name]) => TOKENS.includes(name!))) as Record<string, string>;

const luminance = (hex: string) => {
  const channel = (i: number) => {
    const c = parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(1) + 0.0722 * channel(2);
};
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
};

describe("field tokens", () => {
  it("defines every field token", () => {
    expect(Object.keys(cobalt).sort()).toEqual(TOKENS);
  });

  it("every field's text passes AA (4.5:1)", () => {
    for (const field of FIELDS) {
      expect(contrast(cobalt[`${field}-fg`]!, cobalt[`${field}-bg`]!), field).toBeGreaterThanOrEqual(4.5);
    }
    expect(contrast(cobalt["on-accent"]!, cobalt.accent!), "accent").toBeGreaterThanOrEqual(4.5);
  });
});
