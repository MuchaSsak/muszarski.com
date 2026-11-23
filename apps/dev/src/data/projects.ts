import type { Lang } from "./i18n";

/**
 * The side projects on dev.muszarski.com, newest first. Add one = add an entry; the card's thumbnail is the live
 * site in a scaled-down iframe, so the site must allow framing (no `X-Frame-Options: DENY` / `frame-ancestors`).
 */
export interface SideProject {
  /** Per language (en source; es unreviewed). */
  name: Record<Lang, string>;
  /** One short line per language, in the owner's words (en source; es unreviewed). */
  description: Record<Lang, string>;
  url: string;
  /** Languages the project serves at `url` + `<lang>` (same pattern as here). Other languages get the bare url. */
  locales?: Lang[];
}

/** The project's link for a language: its own locale path when it has one. */
export const projectUrl = (p: SideProject, lang: Lang) =>
  p.locales?.includes(lang) ? new URL(lang, p.url).href : p.url;

export const projects: SideProject[] = [
  {
    // Polish only: every language links to the bare url.
    name: { en: "Tanie loty", pl: "Tanie loty", es: "Tanie loty" },
    description: {
      en: "Searches for last-minute flights. In Polish.",
      pl: "Wyszukuje loty last minute.",
      es: "Busca vuelos de última hora. En polaco.",
    },
    url: "https://tanie-loty-krolu-zloty.vercel.app/",
  },
  {
    name: { en: "Denominations Compass", pl: "Kompas denominacji", es: "Brújula de denominaciones" },
    description: {
      en: "A quick Christian quiz to find which denomination you fit into most.",
      pl: "Szybki chrześcijański quiz, który pokaże, do którego wyznania pasujesz najbardziej.",
      es: "Un test cristiano rápido para descubrir con qué denominación encajas más.",
    },
    url: "https://denoms.muszarski.com/",
    locales: ["en", "pl"],
  },
];
