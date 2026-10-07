import type { ImageMetadata } from "astro";

import { type Locale } from "@package/shared/locales";

import { GALLERY } from "~/data/gallery";
import { photoFile } from "~/lib/photos";

/** One pin on the My life board, in one locale, with the large file the JSON-LD and the image sitemap share. */
export interface Pin {
  file: string;
  src: ImageMetadata;
  alt: string;
  caption: string;
  description?: string | undefined;
  place?: { name: string; country: string; countryCode: string } | undefined;
  /** "2025-06" and the same month spelled for the locale ("Jun 2025"). */
  when?: { iso: string; label: string } | undefined;
  /** The large file (site-relative) and its size. */
  full: { src: string; width: number; height: number };
}

const FULL_WIDTH = 1600;

/** Every gallery entry whose file is on disk, newest data first as listed (data/gallery.ts). */
export async function galleryPins(locale: Locale): Promise<Pin[]> {
  const { getImage } = await import("astro:assets");
  const month = new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" });
  const pins = await Promise.all(
    GALLERY.map(async (entry): Promise<Pin | undefined> => {
      const src = photoFile(entry.file);
      if (!src) return undefined;
      const width = Math.min(src.width, FULL_WIDTH);
      const height = Math.round((src.height * width) / src.width);
      const full = await getImage({ src, width, format: "webp" });
      return {
        file: entry.file,
        src,
        alt: entry.alt[locale],
        caption: entry.caption[locale],
        description: entry.description?.[locale],
        place: entry.place && {
          name: entry.place.name[locale],
          country: entry.place.country[locale],
          countryCode: entry.place.countryCode,
        },
        when: entry.when ? { iso: entry.when, label: month.format(new Date(`${entry.when}-01T00:00:00Z`)) } : undefined,
        full: { src: full.src, width, height },
      };
    }),
  );
  return pins.filter((pin): pin is Pin => !!pin);
}

/** "Palanga, Lithuania" (or just the country when the place is the country). */
export function placeLabel(place: NonNullable<Pin["place"]>): string {
  return place.name === place.country ? place.country : `${place.name}, ${place.country}`;
}
