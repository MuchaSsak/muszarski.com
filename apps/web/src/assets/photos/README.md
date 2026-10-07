# The owner's photos

Picked up at build time (`src/lib/photos.ts`); Astro re-encodes them and does not copy EXIF or GPS data.

- `mateusz-muszarski.*`: the square portrait (≥ 800 px). The Person image in the JSON-LD and the author box under posts.
- `mateusz-muszarski-<place>.*`: photos for the My life pin board. Each one needs an entry in `src/data/gallery.ts`
  (alt, caption, and the place, month and story once the owner gives them). Mark up to three `hero: true` for the
  stack of prints in the hero.

The file names carry his name and the place on purpose: Astro keeps the base name in the shipped URL (image search).
`archive/` keeps superseded files; nothing there ships. No photos of other people without their consent.
