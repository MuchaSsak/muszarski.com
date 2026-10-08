/**
 * Every character the copy uses must be in the shipped font subset (`unicode-range` in styles/fonts.css, from
 * scripts/fonts.mjs). A missing one silently falls back to Arial mid-word: the en and em dash did (lessons.md).
 * Scans the catalogs, the long-form content (code excluded: it renders in the mono stack) and the data files.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const SRC = join(import.meta.dirname, "..");

function ranges(): [number, number][] {
  const css = readFileSync(join(SRC, "styles", "fonts.css"), "utf8");
  const face = /font-family:\s*"Anybody";[\s\S]*?unicode-range:\s*([^;]+);/.exec(css)?.[1] ?? "";
  return face.split(",").map((part) => {
    const [from = "0", to = from] = part.trim().replace(/^U\+/i, "").split("-");
    return [parseInt(from, 16), parseInt(to, 16)];
  });
}

function files(dir: string, ext: RegExp): string[] {
  return readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile() && ext.test(entry.name))
    .map((entry) => join(entry.parentPath, entry.name));
}

const withoutCode = (text: string) => text.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
const withoutComments = (text: string) => text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
const msgstrs = (po: string) => [...po.matchAll(/^msg(?:id|str) "(.*)"$/gm)].map((match) => match[1]).join("\n");

describe("font coverage", () => {
  const covered = ranges();
  // An emoji renders in the system's colour emoji font on purpose (it sets its own emoji stack), never in Anybody.
  const emoji = /\p{Extended_Pictographic}/u;
  const inFont = (char: string) => {
    const code = char.codePointAt(0) ?? 0;
    return code < 0x20 || emoji.test(char) || covered.some(([from, to]) => code >= from && code <= to);
  };

  it("reads the subset ranges", () => {
    expect(covered.length).toBeGreaterThan(5);
  });

  const sources: [string, string][] = [
    ...files(join(SRC, "locales"), /\.po$/).map((file): [string, string] => [file, msgstrs(readFileSync(file, "utf8"))]),
    ...files(join(SRC, "content"), /\.mdx?$/).map((file): [string, string] => [file, withoutCode(readFileSync(file, "utf8"))]),
    ...["data", "components", "pages", "lib"]
      .flatMap((dir) => files(join(SRC, dir), /\.(ts|astro)$/))
      .filter((file) => !/\.(test|gen)\.ts$/.test(file))
      .map((file): [string, string] => [file, withoutComments(readFileSync(file, "utf8").replace(/<!--[\s\S]*?-->/g, ""))]),
  ];

  it.each(sources.map(([file, text]) => [file.slice(SRC.length + 1), text]))("%s uses only subset characters", (_file, text) => {
    const missing = [...new Set([...text].filter((char) => !inFont(char)))].map(
      (char) => `${char} U+${(char.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")}`,
    );
    expect(missing).toEqual([]);
  });
});
