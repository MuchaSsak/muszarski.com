import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { cvDigestSource } from "~/data/cv";

/**
 * One source for the CV (content-model.md § CV): the PDFs in public/files/ must have been printed from the current
 * CV data. `bun run cv:sheet` records the digest it printed; a change to `src/data/cv.ts` without a new PDF fails here.
 */
const files = new URL("../../public/files/", import.meta.url);
const digest = (locale: "en" | "pl" | "es") => createHash("sha256").update(cvDigestSource(locale)).digest("hex").slice(0, 16);

describe.each(["en", "pl", "es"] as const)("CV PDF (%s)", (locale) => {
  it("exists", () => {
    expect(existsSync(new URL(`mateusz-muszarski-cv-${locale}.pdf`, files))).toBe(true);
  });

  it("was printed from the current CV data", () => {
    const recorded = JSON.parse(readFileSync(new URL("cv-digest.json", files), "utf8")) as Record<string, string>;
    expect(recorded[locale], "run `bun run cv:sheet` (in apps/web)").toBe(digest(locale));
  });

  it("has its page previews for the /cv/ page", () => {
    // Written by the same `cv:sheet` run as the PDF (CvPapers.astro shows them).
    expect(existsSync(new URL(`mateusz-muszarski-cv-${locale}-p1.webp`, files))).toBe(true);
  });
});
