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
] as const;
export const ROUTES = [...PAGES, "/does-not-exist/"] as const;
export const WIDTHS = [320, 390, 768, 1024, 1280, 1440, 1920, 2560] as const;
/** Inner pages get a lighter width sweep than the home pages. */
export const INNER_WIDTHS = [320, 390, 1024, 1920, 2560] as const;
