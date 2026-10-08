import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * Scroll-driven animations are written in longhands (lessons.md): the build folds `animation` + `animation-timeline`
 * into one shorthand that Chrome and Safari reject whole, so the effect silently never runs. Three rules had slipped
 * back to the shorthand by 2026-10-09; this guards every rule that sets a timeline.
 */
const SRC = fileURLToPath(new URL("..", import.meta.url));
const files = readdirSync(SRC, { withFileTypes: true, recursive: true })
  .filter((entry) => entry.isFile() && /\.(astro|css)$/.test(entry.name))
  .map((entry) => join(entry.parentPath, entry.name));

/** The innermost `{ … }` around a position. */
const ruleAt = (text: string, at: number) => text.slice(text.lastIndexOf("{", at) + 1, text.indexOf("}", at));

describe("scroll-driven animations", () => {
  const rules = files.flatMap((file) => {
    const text = readFileSync(file, "utf8");
    // Declarations only, not `@supports (animation-timeline: …)` conditions.
    return [...text.matchAll(/(?<!\()animation-timeline\s*:/g)].map((m) => ({
      where: `${relative(SRC, file)}:${text.slice(0, m.index).split("\n").length}`,
      rule: ruleAt(text, m.index),
    }));
  });

  it("finds the rules that set a timeline", () => expect(rules.length).toBeGreaterThan(0));

  it("never use the animation shorthand next to animation-timeline", () => {
    const shorthand = rules.filter(({ rule }) => /(^|[\s;])animation\s*:/.test(rule)).map(({ where }) => where);
    expect(shorthand).toEqual([]);
  });
});
