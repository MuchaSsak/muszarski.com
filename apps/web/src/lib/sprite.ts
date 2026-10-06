/**
 * The site's icon sprite: every icon in `icons.gen.ts` as a `<symbol>`, served once as a static, content-hashed file
 * (`/icons/sprite-<hash>.svg`, cached immutably) and referenced by `<use href>` from Icon.astro. Kept out of the HTML
 * so the page and the font reach the first paint sooner (LCP -150 ms on the home page, wiki: memory/run-notes.md).
 */
import { createHash } from "node:crypto";

import { ICONS, type IconName } from "~/lib/icons.gen";

export const SPRITE_HASH = createHash("sha256").update(JSON.stringify(ICONS)).digest("hex").slice(0, 10);
export const SPRITE_HREF = `/icons/sprite-${SPRITE_HASH}.svg`;

export const symbolId = (name: IconName) => `i-${name.replace(":", "-")}`;

export function spriteSvg(): string {
  const symbols = (Object.keys(ICONS) as IconName[])
    .sort()
    .map((name) => `<symbol id="${symbolId(name)}" viewBox="${ICONS[name].viewBox}">${ICONS[name].body}</symbol>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>\n`;
}
