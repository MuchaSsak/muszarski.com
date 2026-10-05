/** Every built page the gates sweep. Grows with each slice (working-agreement.md § 9). */
export const LOCALIZED = ["/en/", "/pl/", "/es/"] as const;
export const ROUTES = [...LOCALIZED, "/does-not-exist/"] as const;
export const WIDTHS = [320, 390, 768, 1024, 1280, 1440, 1920, 2560] as const;
