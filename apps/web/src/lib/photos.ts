import type { ImageMetadata } from "astro";

/**
 * The owner's own photos (design/assets.md § Photos): drop `me.*` (a square portrait, the author avatar and the
 * Person image) and `life.*` (the My life hero) into `src/assets/photos/`. A slot shows its photo when the file is
 * there and its drawn fallback when it isn't, so the site builds either way. Astro re-encodes them (metadata such as
 * GPS is not copied into the shipped files).
 */
const FILES = import.meta.glob<{ default: ImageMetadata }>("../assets/photos/*.{jpg,jpeg,png,webp,avif}", { eager: true });

export type PhotoName = "me" | "life";

export function photo(name: PhotoName): ImageMetadata | undefined {
  const hit = Object.entries(FILES).find(
    ([path]) =>
      path
        .split("/")
        .pop()
        ?.replace(/\.\w+$/, "") === name,
  );
  return hit?.[1].default;
}
