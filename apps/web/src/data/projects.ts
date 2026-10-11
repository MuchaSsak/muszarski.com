import { IS_FULL_PRODUCTION } from "astro:env/server";

import type { Text } from "~/data/cv";

/**
 * Every project (wiki: content/projects.md, content-model.md § Project): the flagships (home chapters, in order) and
 * the archive for /work/. Facts come from the dossiers and the archive research (repo dates are upload dates, so
 * years are approximate). Rights gate (CLAUDE.md invariants): client and internship work shows at launch only with
 * rights `ok`; review builds show everything so the layout is real, and placeholders.md P10 tracks the open statuses.
 */
export type Rights = "ok" | "check" | "no";
export type Context = "client" | "internship" | "product" | "oss" | "side" | "course";

export interface Project {
  slug: string;
  name: string;
  context: Context;
  year: number;
  rights: Rights;
  /** 1-4: a home chapter, in this order; the anchor is the chapter's id. */
  flagship?: number;
  anchor?: string;
  line: Text;
  stack: string[];
  links: { live?: string; code?: string; npm?: string; appStore?: string; googlePlay?: string; caseStudy?: boolean };
  /** A fact still waiting for the owner (placeholders.md). */
  placeholder?: boolean;
}

const gh = (repo: string) => `https://github.com/MuchaSsak/${repo}`;

export const PROJECTS: Project[] = [
  {
    slug: "pstrykweb",
    name: "PstrykWeb",
    context: "internship",
    year: 2026,
    // Cetuspro's OK [owner 2026-10-11].
    rights: "ok",
    flagship: 1,
    anchor: "pstrykweb",
    // Public info only (content/projects/pstrykweb.md § Public disclosure).
    line: {
      en: "Bespoke websites for local businesses, ordered through one online form. Built for Cetuspro.",
      pl: "Strony na miarę dla lokalnych firm, zamawiane przez jeden formularz online. Zbudowane dla Cetuspro.",
      es: "Webs a medida para negocios locales, encargadas con un solo formulario online. Hecho para Cetuspro.",
    },
    stack: ["Next.js", "TypeScript", "Vercel"],
    links: { live: "https://pstrykweb.pl/" },
  },
  {
    slug: "linkoglot",
    name: "Linkoglot",
    context: "product",
    year: 2026,
    rights: "ok",
    flagship: 2,
    anchor: "linkoglot",
    line: {
      en: "Snap a photo, get flashcards. A subscription language app in 30 languages, shipped solo to both stores.",
      pl: "Robisz zdjęcie, dostajesz fiszki. Aplikacja do nauki języków w 30 językach, z subskrypcją, wydana samodzielnie w obu sklepach.",
      es: "Haz una foto y ya tienes tarjetas. Una app de idiomas por suscripción en 30 idiomas, publicada en solitario en las dos tiendas.",
    },
    stack: ["Expo", "React Native", "Supabase", "RevenueCat", "Lingui"],
    links: {
      appStore: "https://apps.apple.com/app/id6768303316",
      googlePlay: "https://play.google.com/store/apps/details?id=com.linkoglot.app",
    },
  },
  {
    slug: "neoteric-clockful",
    name: "Neoteric Clockful",
    context: "internship",
    year: 2026,
    // Neoteric's OK [owner 2026-10-11].
    rights: "ok",
    flagship: 3,
    anchor: "clockful",
    line: {
      en: "A role-based time tracker built with AI agents in about 9 days, with 118 automated tests. Code private.",
      pl: "Aplikacja do ewidencji czasu pracy z rolami, zbudowana z agentami AI w około 9 dni, ze 118 testami automatycznymi. Kod prywatny.",
      es: "Una app de control horario con roles, hecha con agentes de IA en unos 9 días, con 118 tests automatizados. Código privado.",
    },
    stack: ["Next.js", "Supabase", "PostgreSQL", "TanStack Query", "Playwright"],
    links: {},
  },
  {
    slug: "space-portfolio",
    name: "3D Space Portfolio",
    context: "side",
    year: 2025,
    rights: "ok",
    flagship: 4,
    anchor: "space",
    line: {
      en: "My old portfolio: a WebGL flight from Earth to Neptune in 12 camera stops, with 13 hand-written shaders.",
      pl: "Moje stare portfolio: lot WebGL od Ziemi do Neptuna, 12 przystanków kamery i 13 ręcznie pisanych shaderów.",
      es: "Mi portfolio anterior: un vuelo WebGL de la Tierra a Neptuno en 12 paradas de cámara, con 13 shaders escritos a mano.",
    },
    stack: ["three.js", "React Three Fiber", "GLSL", "GSAP", "Vite"],
    links: { live: "https://3d-space-folio.vercel.app/", code: gh("3d-space-portfolio") },
  },
  {
    slug: "this-site",
    name: "muszarski.com",
    context: "side",
    year: 2026,
    rights: "ok",
    line: {
      en: "This site: Astro, Lingui in three languages, 99+ on mobile Lighthouse, built with a Claude Code setup I can show.",
      pl: "Ta strona: Astro, Lingui w trzech językach, 99+ w mobilnym Lighthouse, zbudowana z Claude Code; cały setup mogę pokazać.",
      es: "Esta web: Astro, Lingui en tres idiomas, 99+ en Lighthouse móvil, hecho con una configuración de Claude Code que puedo enseñar.",
    },
    stack: ["Astro", "TypeScript", "Lingui", "Tailwind CSS", "Claude Code"],
    links: { caseStudy: true },
  },
  {
    slug: "yws",
    name: "yws.lu",
    context: "client",
    year: 2025,
    // [user 2026-10-09] cleared to show, case study included.
    rights: "ok",
    line: {
      en: "A 3D landing page for Youth Work Synergy, an organisation in Luxembourg.",
      pl: "Landing 3D dla Youth Work Synergy, organizacji z Luksemburga.",
      es: "Una landing 3D para Youth Work Synergy, una organización de Luxemburgo.",
    },
    stack: ["React", "three.js", "GSAP"],
    links: { live: "https://yws.lu", code: gh("yws.lu") },
  },
  {
    slug: "lingui-translate-ai",
    name: "lingui-translate-ai",
    context: "oss",
    year: 2026,
    rights: "ok",
    line: {
      en: "An npx CLI that translates Lingui catalogs with an LLM. It grew out of Linkoglot.",
      pl: "CLI uruchamiane przez npx, które tłumaczy katalogi Lingui za pomocą LLM-a. Wyrosło z Linkoglota.",
      es: "Una CLI para npx que traduce catálogos de Lingui con un LLM. Nació de Linkoglot.",
    },
    stack: ["TypeScript", "Node.js", "Lingui"],
    links: { npm: "https://www.npmjs.com/package/lingui-translate-ai", code: gh("lingui-translate-ai") },
  },
  {
    slug: "malatro",
    name: "Malatro",
    context: "side",
    year: 2026,
    rights: "ok",
    line: {
      en: "A Balatro-style card game where every card is a real Polish matura maths task. Built with AI.",
      pl: "Gra karciana w stylu Balatro, w której każda karta to prawdziwe zadanie maturalne z matematyki. Zbudowana z AI.",
      es: "Un juego de cartas al estilo Balatro donde cada carta es un ejercicio real del examen de matemáticas de la selectividad polaca. Hecho con IA.",
    },
    stack: ["React", "WebGL", "OGL"],
    links: { live: "https://malatro.vercel.app", code: gh("malatro") },
  },
  {
    slug: "lingotype",
    name: "Lingotype",
    context: "side",
    year: 2025,
    rights: "ok",
    line: {
      en: "A vocabulary trainer: learn words by typing them. A team project with Fabian Dróżkowski.",
      pl: "Trener słówek: uczysz się, wpisując je. Projekt zespołowy z Fabianem Dróżkowskim.",
      es: "Una app para practicar vocabulario: aprendes palabras escribiéndolas. Un proyecto en equipo con Fabian Dróżkowski.",
    },
    stack: ["TypeScript", "Drizzle", "Neon", "Better Auth"],
    links: { live: "https://lingotype.vercel.app", code: gh("lingotype") },
  },
  {
    slug: "club-screensaver",
    name: "Club screensaver",
    context: "client",
    year: 2025,
    rights: "check",
    line: {
      en: "A GPGPU particle screensaver for a sports club, in React Three Fiber.",
      pl: "Wygaszacz ekranu z cząsteczkami liczonymi na GPU dla klubu sportowego, w React Three Fiber.",
      es: "Un salvapantallas de partículas calculadas en la GPU para un club deportivo, con React Three Fiber.",
    },
    stack: ["React Three Fiber", "three.js", "GLSL"],
    links: { live: "https://beniaminek03-screensaver.vercel.app", code: gh("beniaminek03-screensaver") },
  },
];

const visible = (project: Project) => project.rights === "ok" || (!IS_FULL_PRODUCTION && project.rights === "check");

/** Every project the build may show, flagships first (in chapter order), then the archive by year. */
export const visibleProjects = () =>
  PROJECTS.filter(visible).sort(
    (a, b) => (a.flagship ?? 99) - (b.flagship ?? 99) || b.year - a.year || a.name.localeCompare(b.name),
  );

/** The flagship chapters the build may show, in order. */
export const visibleFlagships = () => visibleProjects().filter((project) => project.flagship);
