import type { ImageMetadata } from "astro";

/**
 * The owner's own photos (design/assets.md § Photos), in `src/assets/photos/`: `mateusz-muszarski.*` (a square
 * portrait: the author avatar and the Person image) and `mateusz-muszarski-<place>.*` (the My life pin board and the
 * hero's prints, listed in `data/gallery.ts`). A slot shows its photo when the file is there and its drawn fallback
 * when it isn't, so the site builds either way. Astro re-encodes them (metadata such as GPS is not copied into the
 * shipped files). File names carry his name and the place: Astro keeps the base name in the shipped URL, which helps
 * image search [user 2026-10-07: "they can have good seo and show up in google images"].
 */
const FILES = import.meta.glob<{ default: ImageMetadata }>("../assets/photos/*.{jpg,jpeg,png,webp,avif}", { eager: true });

const baseName = (path: string) =>
  path
    .split("/")
    .pop()
    ?.replace(/\.\w+$/, "") ?? "";

/** The photo whose file name (without extension) is `file`. */
export function photoFile(file: string): ImageMetadata | undefined {
  return Object.entries(FILES).find(([path]) => baseName(path) === file)?.[1].default;
}

/** The square portrait (`mateusz-muszarski.*`; `me.*` still accepted). */
export function portrait(): ImageMetadata | undefined {
  return photoFile("mateusz-muszarski") ?? photoFile("me");
}

/** The absolute URL of the portrait for the Person `image` in JSON-LD (site/seo.md § Entity strategy), or undefined
 * without the file. One helper so every page that carries the full Person shows the same photo. */
export async function personImageUrl(site: URL): Promise<string | undefined> {
  const me = portrait();
  if (!me) return undefined;
  const { getImage } = await import("astro:assets");
  return new URL((await getImage({ src: me, width: Math.min(me.width, 1200), format: "webp" })).src, site).href;
}
