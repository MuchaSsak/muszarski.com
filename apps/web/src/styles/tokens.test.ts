import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

/**
 * Guards for the colour tokens (design/design.md § Color tokens): the two dark blocks stay equal, and
 * every text pairing keeps WCAG AA while the grid stays faint enough to sit under text.
 */
const css = readFileSync(new URL("./global.css", import.meta.url), "utf8");

const block = (selector: string) => {
  const start = css.indexOf(selector);
  if (start < 0) throw new Error(`missing ${selector}`);
  const body = css.slice(css.indexOf("{", start) + 1, css.indexOf("}", start));
  return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]!.toLowerCase()]));
};

const light = block(":root,\n.theme-light");
const darkSystem = block(':root:not([data-theme="light"])');
const darkToggle = block(':root[data-theme="dark"],\n.theme-dark');

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

describe("colour tokens", () => {
  it("defines the same 8 tokens in every block", () => {
    const names = ["paper", "paper-raised", "ink", "ink-muted", "line", "grid", "accent", "on-accent"];
    for (const set of [light, darkSystem, darkToggle]) expect(Object.keys(set).sort()).toEqual([...names].sort());
  });

  it("keeps the system-dark and toggle-dark blocks identical", () => {
    expect(darkToggle).toEqual(darkSystem);
  });

  for (const [name, set] of [
    ["light", light],
    ["dark", darkToggle],
  ] as const) {
    it(`${name}: text pairings pass AA (4.5:1), grid stays <= 1.3:1`, () => {
      for (const fg of ["ink", "ink-muted", "accent"]) {
        for (const bg of ["paper", "paper-raised"]) expect(contrast(set[fg]!, set[bg]!), `${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
      }
      expect(contrast(set["on-accent"]!, set.accent!)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(set.ink!, set.paper!)).toBeGreaterThanOrEqual(7);
      expect(contrast(set.grid!, set.paper!)).toBeLessThanOrEqual(1.3);
    });
  }
});
