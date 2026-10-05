import { describe, expect, it } from "vitest";

import { fitLines, lineEm } from "~/lib/fit";

describe("fitted type", () => {
  it("grows linearly with wdth", () => {
    const a = lineEm("MATEUSZ", 50);
    const b = lineEm("MATEUSZ", 100);
    const c = lineEm("MATEUSZ", 150);
    expect(b - a).toBeCloseTo(c - b, 6);
    expect(c).toBeGreaterThan(a);
  });

  it("applies kerning", () => {
    const pairs = lineEm("AV", 100);
    expect(pairs).toBeLessThan(lineEm("A", 100) + lineEm("V", 100));
  });

  it("makes every line as wide as the widest one at the base width", () => {
    const fit = fitLines(["Mateusz", "Muszarski"], 96);
    const widths = fit.wdth.map((w, i) => lineEm(["MATEUSZ", "MUSZARSKI"][i]!, w));
    expect(widths[0]).toBeCloseTo(widths[1]!, 2);
    expect(fit.wdth[1]).toBe(96);
    expect(fit.wdth[0]).toBeGreaterThan(96);
    // size * width = the filled share of the host (99.5 cqi)
    expect(fit.size * widths[1]!).toBeCloseTo(99.5, 1);
  });

  it("clamps to the font's range", () => {
    const fit = fitLines(["AI", "Delegate everything"], 100);
    expect(fit.wdth[0]).toBe(150);
  });

  it("fails loudly on a character without metrics", () => {
    expect(() => lineEm("A→B", 100)).toThrow(/no metrics/);
  });
});
