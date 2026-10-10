/** Every built page the gates sweep. Grows with each slice (working-agreement.md § 9). */
export const LOCALIZED = ["/en/", "/pl/", "/es/"] as const;
const PER_LOCALE = ["", "work/", "cv/", "my-life/", "privacy/", "terms/"] as const;
export const PAGES = [
  ...(["en", "pl", "es"] as const).flatMap((locale) => PER_LOCALE.map((path) => `/${locale}/${path}`)),
  "/en/blog/",
  "/pl/blog/",
  "/en/blog/case-study/",
  "/pl/blog/case-study/",
  "/en/blog/lingui-vs-i18next/",
  "/en/blog/yws-lu-case-study/",
  "/pl/blog/yws-lu-case-study/",
] as const;
/** The 404 in each language (one 404.html, swapped by the first segment: components/NotFound.astro). */
export const ROUTES = [...PAGES, "/does-not-exist/", "/pl/does-not-exist/", "/es/does-not-exist/"] as const;
export const WIDTHS = [320, 390, 768, 1024, 1280, 1440, 1920, 2560] as const;
/** In-between screens (large phones, small tablets, small laptops): the header's Menu sat off screen at 480-590 px,
 *  between the gate widths (2026-10-08). The header and text-fit sweeps add them on the home pages. */
export const ODD_WIDTHS = [360, 480, 600, 900, 1366] as const;
/** Inner pages get a lighter width sweep than the home pages. */
export const INNER_WIDTHS = [320, 390, 1024, 1920, 2560] as const;
