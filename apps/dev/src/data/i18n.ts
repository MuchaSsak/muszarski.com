/**
 * The hub's three languages, the portfolio's own (en source, pl native, es machine-made and unreviewed). en lives at
 * `/`, the others under their prefix. A handful of strings, so a plain dictionary instead of Lingui.
 */
export const LANGS = ["en", "pl", "es"] as const;
export type Lang = (typeof LANGS)[number];
/** Languages with a footer button. es is built and reachable at /es/ but has no button [owner 2026-11-17]. */
export const SWITCHER: Lang[] = ["en", "pl"];

export const LANG_NAMES: Record<Lang, string> = { en: "English", pl: "Polski", es: "Español" };
export const OG_LOCALES: Record<Lang, string> = { en: "en_US", pl: "pl_PL", es: "es_ES" };

/** The hub's path in a language. */
export const hubPath = (lang: Lang) => (lang === "en" ? "/" : `/${lang}/`);

export const STRINGS = {
  en: {
    heading: "Side projects",
    by: "Miscellaneous things by",
    name: "Mateusz Muszarski",
    description: "Miscellaneous things by Mateusz Muszarski.",
    preview: "preview",
  },
  pl: {
    heading: "Projekty poboczne",
    by: "Różne rzeczy od",
    name: "Mateusza Muszarskiego",
    description: "Różne rzeczy od Mateusza Muszarskiego.",
    preview: "podgląd",
  },
  es: {
    heading: "Proyectos personales",
    by: "Cosas variadas de",
    name: "Mateusz Muszarski",
    description: "Cosas variadas de Mateusz Muszarski.",
    preview: "vista previa",
  },
} satisfies Record<Lang, Record<string, string>>;
