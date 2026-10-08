/**
 * The My life photo gallery (site/structure.md § /my-life/): the owner's own photos, newest facts from him only. One list
 * feeds the hero's stack of prints (`hero: true`), the pin board and the page's `ImageGallery` JSON-LD
 * (place, description, creator), so what a visitor reads and what Google reads never drift.
 *
 * To add a photo: drop `src/assets/photos/mateusz-muszarski-<place>.jpg` (his name in the file name helps image search)
 * and add an entry. `alt` says what is in the picture; `description` and `place` are his facts and stay out until he
 * gives them. No third persons in a photo without their consent (legal/compliance-and-data.md).
 */
import type { Text } from "~/data/cv";

export interface Place {
  name: Text;
  country: Text;
  /** ISO 3166-1 alpha-2, for the JSON-LD address. */
  countryCode: string;
}

export interface GalleryPhoto {
  /** Base name of the file in `src/assets/photos/`. */
  file: string;
  /** What is in the picture (the alt text). */
  alt: Text;
  /** The short line on the print. */
  caption: Text;
  /** The owner's words about it, shown on the board's index card and in the JSON-LD. */
  description?: Text;
  place?: Place;
  /** "2025-06": shown as a month; only from the owner or a dated source. */
  when?: string;
  /** One of the prints stacked in the hero. */
  hero?: boolean;
  /** `false`: a hero print only, kept off the pin board (and so out of its JSON-LD and the image sitemap). */
  board?: false;
}

const LITHUANIA: Text = { en: "Lithuania", pl: "Litwa", es: "Lituania" };
const POLAND: Text = { en: "Poland", pl: "Polska", es: "Polonia" };
/** A country-level place: the board shows the country once. */
const TURKIYE: Text = { en: "Türkiye", pl: "Turcja", es: "Turquía" };

export const GALLERY: GalleryPhoto[] = [
  {
    // [user 2026-10-08] The first print in the hero, off the board ("the one that's not on the pinboard, me in a hat").
    // PLACEHOLDER (P15): where it was taken, owner to say (the coast looks Turkish; not guessed).
    file: "mateusz-muszarski-coast",
    alt: {
      en: "Mateusz Muszarski in a straw hat and sunglasses, the sea and a rocky coast behind him",
      pl: "Mateusz Muszarski w słomkowym kapeluszu i okularach przeciwsłonecznych, za nim morze i skaliste wybrzeże",
      es: "Mateusz Muszarski con sombrero de paja y gafas de sol, con el mar y una costa rocosa detrás",
    },
    caption: { en: "me, probably smiling", pl: "ja, pewnie uśmiechnięty", es: "yo, seguramente sonriendo" },
    hero: true,
    board: false,
  },
  {
    // [user 2026-10-07] Palanga, on the Baltic, on an Erasmus+ project (cv.ts: Youth Entrepreneurship 2025, June 2025).
    file: "mateusz-muszarski-palanga",
    alt: {
      en: "Mateusz Muszarski in sunglasses on a pier, the Baltic Sea and a sandy beach behind him",
      pl: "Mateusz Muszarski w okularach przeciwsłonecznych na molo, za nim Bałtyk i piaszczysta plaża",
      es: "Mateusz Muszarski con gafas de sol en un muelle, con el mar Báltico y una playa de arena detrás",
    },
    caption: { en: "me, squinting at the sea", pl: "ja, mrużę oczy nad morzem", es: "yo, entrecerrando los ojos frente al mar" },
    description: {
      en: "On the pier in Palanga, during an Erasmus+ youth exchange on the Baltic coast.",
      pl: "Na molo w Połądze, podczas wymiany młodzieżowej Erasmus+ nad Bałtykiem.",
      es: "En el muelle de Palanga, durante un intercambio juvenil Erasmus+ en la costa báltica.",
    },
    place: { name: { en: "Palanga", pl: "Połąga", es: "Palanga" }, country: LITHUANIA, countryCode: "LT" },
    when: "2025-06",
    hero: true,
  },
  {
    // [user 2026-10-07] Türkiye, European Solidarity Corps volunteering with Caretta caretta turtles (cv.ts: Demre).
    file: "mateusz-muszarski-turkiye",
    alt: {
      en: "Mateusz Muszarski in a straw hat and sunglasses in front of tall reeds at sunset",
      pl: "Mateusz Muszarski w słomkowym kapeluszu i okularach przeciwsłonecznych przed wysokimi trzcinami o zachodzie słońca",
      es: "Mateusz Muszarski con sombrero de paja y gafas de sol delante de unos juncos altos al atardecer",
    },
    caption: { en: "me, hat on again", pl: "ja, znowu w kapeluszu", es: "yo, otra vez con sombrero" },
    description: {
      en: "Volunteering with the European Solidarity Corps for Caretta caretta sea turtles.",
      pl: "Wolontariat w Europejskim Korpusie Solidarności na rzecz żółwi morskich Caretta caretta.",
      es: "Voluntariado del Cuerpo Europeo de Solidaridad con las tortugas marinas Caretta caretta.",
    },
    place: { name: TURKIYE, country: TURKIYE, countryCode: "TR" },
    hero: true,
  },
  {
    // [user 2026-10-07] Vilnius, on a project (cv.ts: the Erasmus+ project in Lithuania, May 2025).
    file: "mateusz-muszarski-vilnius",
    alt: {
      en: "Mateusz Muszarski on a footbridge, glass skyscrapers and a blue sky behind him",
      pl: "Mateusz Muszarski na kładce, za nim szklane wieżowce i błękitne niebo",
      es: "Mateusz Muszarski en una pasarela, con rascacielos de cristal y un cielo azul detrás",
    },
    caption: { en: "me, in the big city", pl: "ja, w wielkim mieście", es: "yo, en la gran ciudad" },
    description: {
      en: "A day in Vilnius during an Erasmus+ project in Lithuania.",
      pl: "Dzień w Wilnie podczas projektu Erasmus+ na Litwie.",
      es: "Un día en Vilna durante un proyecto Erasmus+ en Lituania.",
    },
    place: { name: { en: "Vilnius", pl: "Wilno", es: "Vilna" }, country: LITHUANIA, countryCode: "LT" },
    when: "2025-05",
  },
  {
    // [user 2026-10-08] In front of the University of Rzeszów, before the Vibe the Future 2026 hackathon (cv.ts:
    // May 2026, Rzeszów).
    file: "mateusz-muszarski-rzeszow",
    alt: {
      en: "Mateusz Muszarski in a white shirt and black tie in front of a curved glass university building",
      pl: "Mateusz Muszarski w białej koszuli i czarnym krawacie przed zaokrąglonym, przeszklonym budynkiem uczelni",
      es: "Mateusz Muszarski con camisa blanca y corbata negra delante de un edificio universitario curvo de cristal",
    },
    caption: { en: "me, before the hackathon", pl: "ja, przed hackathonem", es: "yo, antes del hackathon" },
    description: {
      en: "At the University of Rzeszów, before the Vibe the Future 2026 hackathon.",
      pl: "Na Uniwersytecie Rzeszowskim, przed hackathonem Vibe the Future 2026.",
      es: "En la Universidad de Rzeszów, antes del hackathon Vibe the Future 2026.",
    },
    place: { name: { en: "Rzeszów", pl: "Rzeszów", es: "Rzeszów" }, country: POLAND, countryCode: "PL" },
    when: "2026-05",
  },
  {
    // [user 2026-10-08] The principal of his school (ZSE Starogard Gdański, cv.ts) at the end-of-year ceremony, giving
    // him a money award and a commendation for building an app for a local youth space. The school published the
    // photo on its Facebook page; the principal appears in his official role (owner's call, 2026-10-08).
    file: "mateusz-muszarski-starogard-gdanski",
    alt: {
      en: "Mateusz Muszarski in a dark suit and red tie next to his school's principal, under an end-of-school-year banner",
      pl: "Mateusz Muszarski w ciemnym garniturze i czerwonym krawacie obok dyrektora szkoły, pod banerem uroczystości zakończenia roku szkolnego",
      es: "Mateusz Muszarski con traje oscuro y corbata roja junto al director de su escuela, bajo una pancarta de fin de curso",
    },
    caption: { en: "me, in a full suit", pl: "ja, w garniturze", es: "yo, de traje" },
    description: {
      en: "My school's principal gave me a money award and a commendation for building a real project: an app for a local youth space.",
      pl: "Dyrektor mojej szkoły wręczył mi nagrodę pieniężną i pochwałę za zbudowanie prawdziwego projektu: aplikacji dla lokalnej przestrzeni młodzieżowej.",
      es: "El director de mi escuela me dio un premio en metálico y una mención por crear un proyecto real: una aplicación para un espacio juvenil local.",
    },
    place: {
      name: { en: "Starogard Gdański", pl: "Starogard Gdański", es: "Starogard Gdański" },
      country: POLAND,
      countryCode: "PL",
    },
  },
];
