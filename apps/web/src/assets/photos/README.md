# The owner's photos

Drop two files here (jpg, png, webp or avif); the site picks them up at build time (`src/lib/photos.ts`):

- `me.*`: a square portrait. The author box under every post and the Person image in the home page's JSON-LD.
- `life.*`: the photo in the My life hero (portrait, cropped to 4:5).

Astro re-encodes them; EXIF and GPS data are not copied into the shipped files (checked 2026-10-06).
Without a file, each slot shows its drawn fallback.
