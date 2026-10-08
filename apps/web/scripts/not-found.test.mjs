import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import { foldNotFound } from "./not-found.mjs";

const SWAP = "(() => { swap(); })();";
const page = (body) =>
  `<html><head><meta http-equiv="content-security-policy" content="default-src 'self';script-src 'self' 'sha256-a='"><title>Page not found</title></head><body>${body}</body></html>`;

describe("foldNotFound", () => {
  const english = page(`<main>Page not found</main><script data-nf-swap>${SWAP}</script>`);
  const polish = page(`<main>Nie znaleziono strony</main><script type="module">bind()</script>`).replace(
    "<title>Page not found</title>",
    '<title>Nie znaleziono "strony"</title>',
  );
  const html = foldNotFound(english, { pl: polish });

  it("puts each copy's body, without its scripts, in a template before the swap script", () => {
    expect(html).toContain(
      '<template id="nf-pl" data-title="Nie znaleziono &quot;strony&quot;"><main>Nie znaleziono strony</main></template><script data-nf-swap>',
    );
    expect(html).not.toContain("bind()");
  });

  it("adds the swap script's hash to script-src", () => {
    const hash = createHash("sha256").update(SWAP).digest("base64");
    expect(html).toContain(`script-src 'sha256-${hash}' 'self'`);
  });

  it("fails loudly when the page lost its swap script or its CSP", () => {
    expect(() => foldNotFound(page("<main></main>"), { pl: polish })).toThrow(/data-nf-swap/);
    expect(() => foldNotFound(english.replace(/<meta[^>]+>/, ""), { pl: polish })).toThrow(/script-src/);
  });
});
