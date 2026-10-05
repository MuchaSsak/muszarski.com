import { type Locale } from "@package/shared/locales";

import { type IconName } from "~/lib/icons.gen";

/**
 * THE CV (wiki: content/content-model.md § CV). One source renders the `/cv/` page, the print route the PDF is made
 * from (`bun run cv:pdf`) and the home credentials. Never edit the page or the PDF alone: change this file, then run
 * `bun run cv:pdf`; `cv.test.ts` fails while a PDF was made from older data.
 *
 * Text is per locale (long-form content, not UI strings: i18n.md). Facts come from the wiki; every value that is not
 * real yet is marked `placeholder: true` (or PLACEHOLDER) and logged in placeholders.md (P2, P3, P4, P11, P16).
 * Spanish is machine-assisted and unreviewed (P12).
 */
export type Text = Record<Locale, string>;

export interface CvEntry {
  id: string;
  title: Text;
  org?: Text | undefined;
  /** Shown as written ("2026", "Since 2022"); per locale when it holds words. */
  when: Text;
  bullets: Text[];
  links?: { label: string; href: string }[];
  placeholder?: boolean;
}

export interface Credential {
  id: string;
  kind: "qualification" | "course" | "volunteering" | "hackathon";
  icon: IconName;
  title: Text;
  issuer: Text;
  summary: Text;
  when: Text;
  verifyUrl?: string | undefined;
  placeholder?: boolean;
}

const same = (value: string): Text => ({ en: value, pl: value, es: value });

export const CV = {
  title: {
    en: "Full-stack developer (React, Node.js, TypeScript)",
    pl: "Programista full stack (React, Node.js, TypeScript)",
    es: "Desarrollador full stack (React, Node.js, TypeScript)",
  } satisfies Text,
  // PLACEHOLDER (P4, Q3): role type, contract and mode wait for the owner.
  availability: {
    en: "Open to full-time and contract roles · remote or hybrid",
    pl: "Otwarty na etat i kontrakt B2B · zdalnie lub hybrydowo",
    es: "Disponible para empleo o contrato · en remoto o híbrido",
  } satisfies Text,
  // PLACEHOLDER (P3, Q27): region line.
  location: { en: "Pomorskie, Poland", pl: "Pomorskie, Polska", es: "Pomerania, Polonia" } satisfies Text,
  summary: {
    en: "Full-stack developer who builds web and mobile products end to end, from the business problem to the shipped app, since 2022. I work in TypeScript, React, Next.js, Astro, React Native (Expo), Node.js and Supabase/Postgres. I use AI agents (Claude Code) as leverage and keep the decisions and the verification: tests, accessibility and performance checks on every change.",
    pl: "Programista full stack, który od 2022 roku buduje produkty webowe i mobilne od początku do końca: od problemu biznesowego do wdrożonej aplikacji. Pracuję w TypeScript, React, Next.js, Astro, React Native (Expo), Node.js i Supabase/Postgres. Agentów AI (Claude Code) używam jako dźwigni, a decyzje i weryfikację zostawiam sobie: testy, dostępność i wydajność sprawdzane przy każdej zmianie.",
    es: "Desarrollador full stack que construye productos web y móviles de principio a fin, desde el problema de negocio hasta la app publicada, desde 2022. Trabajo con TypeScript, React, Next.js, Astro, React Native (Expo), Node.js y Supabase/Postgres. Uso agentes de IA (Claude Code) como palanca y me quedo con las decisiones y la verificación: tests, accesibilidad y rendimiento en cada cambio.",
  } satisfies Text,

  experience: [
    {
      id: "pstrykweb",
      title: { en: "Developer, PstrykWeb", pl: "Programista, PstrykWeb", es: "Desarrollador, PstrykWeb" },
      org: same("Cetuspro"),
      // PLACEHOLDER (P16): dates from the repo history, owner confirms.
      when: { en: "2026", pl: "2026", es: "2026" },
      placeholder: true,
      bullets: [
        {
          en: "Built PstrykWeb solo for the software house Cetuspro: bespoke websites for local businesses, ordered through one online form.",
          pl: "Samodzielnie zbudowałem PstrykWeb dla software house'u Cetuspro: strony na zamówienie dla lokalnych firm, zamawiane przez jeden formularz online.",
          es: "Construí PstrykWeb en solitario para la software house Cetuspro: webs a medida para negocios locales, encargadas con un solo formulario online.",
        },
        {
          en: "Built the public konfigurator, the online order form (Next.js, TypeScript, Vercel).",
          pl: "Zbudowałem publiczny konfigurator, czyli formularz zamówienia online (Next.js, TypeScript, Vercel).",
          es: "Construí el configurador público, el formulario de pedido online (Next.js, TypeScript, Vercel).",
        },
      ],
    },
    {
      id: "neoteric",
      title: { en: "Intern, Neoteric", pl: "Stażysta, Neoteric", es: "Becario, Neoteric" },
      org: { en: "Software house, Poland", pl: "Software house, Polska", es: "Software house, Polonia" },
      when: { en: "August 2026", pl: "sierpień 2026", es: "agosto de 2026" },
      bullets: [
        {
          en: "Built Clockful, a role-based time tracker, with AI agents only, from a 15-requirement spec in about 9 days (an estimate from the repo dates).",
          pl: "Zbudowałem Clockful, aplikację do mierzenia czasu pracy z rolami, wyłącznie z agentami AI, na podstawie specyfikacji z 15 wymaganiami, w około 9 dni (szacunek z dat w repozytorium).",
          es: "Construí Clockful, un control de horas con roles, solo con agentes de IA, a partir de una especificación de 15 requisitos en unos 9 días (estimación por las fechas del repositorio).",
        },
        {
          en: "118 automated tests (49 Vitest, 69 Playwright); Postgres row-level security on all 5 tables, with an audit trigger.",
          pl: "118 testów automatycznych (49 Vitest, 69 Playwright); row-level security w Postgresie na wszystkich 5 tabelach i trigger audytowy.",
          es: "118 tests automáticos (49 Vitest, 69 Playwright); row-level security de Postgres en las 5 tablas, con un trigger de auditoría.",
        },
      ],
    },
    {
      id: "linkoglot",
      title: { en: "Founder and developer, Linkoglot", pl: "Twórca i programista, Linkoglot", es: "Fundador y desarrollador, Linkoglot" },
      org: { en: "Own product", pl: "Własny produkt", es: "Producto propio" },
      when: same("2026"),
      links: [
        { label: "App Store", href: "https://apps.apple.com/app/id6768303316" },
        { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.linkoglot.app" },
      ],
      bullets: [
        {
          en: "Designed, built and shipped an AI language-learning app to the App Store and Google Play, solo: snap a photo to get flashcards, quizzes and voice practice.",
          pl: "Samodzielnie zaprojektowałem, zbudowałem i wydałem w App Store i Google Play aplikację do nauki języków z AI: zdjęcie zamienia się w fiszki, quizy i ćwiczenia mówienia.",
          es: "Diseñé, construí y publiqué en solitario en App Store y Google Play una app de idiomas con IA: una foto se convierte en tarjetas, tests y práctica oral.",
        },
        {
          en: "Free trial, then monthly or yearly plans through RevenueCat; 30 languages with Lingui (Expo, React Native, Supabase).",
          pl: "Darmowy okres próbny, potem plan miesięczny lub roczny przez RevenueCat; 30 języków z Lingui (Expo, React Native, Supabase).",
          es: "Prueba gratuita y después planes mensuales o anuales con RevenueCat; 30 idiomas con Lingui (Expo, React Native, Supabase).",
        },
      ],
    },
    {
      id: "freelance",
      title: { en: "Freelance and own projects", pl: "Freelance i własne projekty", es: "Freelance y proyectos propios" },
      // PLACEHOLDER (P2, P16): years of paid work, owner confirms.
      when: { en: "Since 2022", pl: "Od 2022", es: "Desde 2022" },
      placeholder: true,
      bullets: [
        {
          en: "Websites and 3D landing pages for clients (React, React Three Fiber, GSAP).",
          pl: "Strony i landingi 3D dla klientów (React, React Three Fiber, GSAP).",
          es: "Webs y landings 3D para clientes (React, React Three Fiber, GSAP).",
        },
        {
          en: "lingui-translate-ai: an npm CLI that translates Lingui catalogs with an LLM, grown out of Linkoglot.",
          pl: "lingui-translate-ai: CLI na npm, które tłumaczy katalogi Lingui przez LLM; wyrosło z Linkoglota.",
          es: "lingui-translate-ai: una CLI en npm que traduce catálogos de Lingui con un LLM, nacida de Linkoglot.",
        },
      ],
    },
  ] satisfies CvEntry[],

  projects: [
    {
      id: "this-site",
      title: { en: "This site", pl: "Ta strona", es: "Este sitio" },
      when: same("2026"),
      bullets: [
        {
          en: "Astro, React, Lingui (en/pl/es); Lighthouse mobile 100 on the home page, about 3 KB of page JavaScript; built with a Claude Code setup of a project wiki, hooks and skills.",
          pl: "Astro, React, Lingui (en/pl/es); Lighthouse mobile 100 na stronie głównej, około 3 KB JavaScriptu; zbudowana z Claude Code, wiki projektu, hookami i skillami.",
          es: "Astro, React, Lingui (en/pl/es); Lighthouse móvil 100 en la portada, unos 3 KB de JavaScript; hecho con Claude Code, una wiki del proyecto, hooks y skills.",
        },
      ],
    },
    {
      id: "space",
      title: { en: "3D space portfolio", pl: "Portfolio 3D w kosmosie", es: "Portfolio 3D espacial" },
      when: same("2025"),
      links: [{ label: "GitHub", href: "https://github.com/MuchaSsak/3d-space-portfolio" }],
      bullets: [
        {
          en: "A scroll-driven WebGL journey from Earth to Neptune in 12 camera stops; 13 hand-written GLSL shaders (three.js, React Three Fiber, GSAP).",
          pl: "Podróż WebGL od Ziemi do Neptuna sterowana przewijaniem, 12 przystanków kamery; 13 ręcznie pisanych shaderów GLSL (three.js, React Three Fiber, GSAP).",
          es: "Un viaje WebGL de la Tierra a Neptuno guiado por el scroll, 12 paradas de cámara; 13 shaders GLSL escritos a mano (three.js, React Three Fiber, GSAP).",
        },
      ],
    },
  ] satisfies CvEntry[],

  skills: [
    { group: { en: "Frontend", pl: "Frontend", es: "Frontend" }, items: ["TypeScript", "React", "Next.js", "Astro", "Tailwind CSS"] },
    { group: { en: "Mobile", pl: "Mobile", es: "Móvil" }, items: ["React Native", "Expo", "RevenueCat"] },
    {
      group: { en: "Backend and data", pl: "Backend i dane", es: "Backend y datos" },
      items: ["Node.js", "Supabase", "PostgreSQL (RLS)", "TanStack Query"],
    },
    { group: { en: "3D and motion", pl: "3D i animacja", es: "3D y animación" }, items: ["three.js", "React Three Fiber", "GLSL", "GSAP"] },
    {
      group: { en: "AI and quality", pl: "AI i jakość", es: "IA y calidad" },
      items: ["Claude Code", "MCP", "Playwright", "Vitest", "Lighthouse"],
    },
    { group: { en: "i18n", pl: "i18n", es: "i18n" }, items: ["Lingui", "lingui-translate-ai"] },
  ],

  credentials: [
    {
      id: "inf",
      kind: "qualification",
      icon: "tb:certificate",
      title: same("INF.02 · INF.03 · INF.04"),
      issuer: {
        en: "Polish state vocational qualifications (CKE / OKE)",
        pl: "Kwalifikacje zawodowe (CKE / OKE)",
        es: "Cualificaciones profesionales estatales de Polonia (CKE / OKE)",
      },
      summary: {
        en: "Computer systems and networks; websites, web applications and databases; designing, programming and testing applications.",
        pl: "Systemy komputerowe i sieci; strony i aplikacje internetowe oraz bazy danych; projektowanie, programowanie i testowanie aplikacji.",
        es: "Sistemas informáticos y redes; webs, aplicaciones web y bases de datos; diseño, programación y pruebas de aplicaciones.",
      },
      // PLACEHOLDER (P11, Q10): exam dates and whether each certificate is issued.
      when: { en: "Technikum", pl: "Technikum", es: "Technikum" },
      placeholder: true,
    },
    {
      id: "threejs-journey",
      kind: "course",
      icon: "si:threedotjs",
      title: same("Three.js Journey"),
      issuer: { en: "Course by Bruno Simon", pl: "Kurs Bruno Simona", es: "Curso de Bruno Simon" },
      summary: {
        en: "WebGL, shaders and 3D for the web. My space portfolio is built with what it taught.",
        pl: "WebGL, shadery i 3D w przeglądarce. Na tym kursie zbudowałem swoje kosmiczne portfolio.",
        es: "WebGL, shaders y 3D en la web. Mi portfolio espacial está hecho con lo que enseña.",
      },
      when: same("2025"),
      // PLACEHOLDER (P11): the certificate URL.
      verifyUrl: "https://threejs-journey.example/certificate",
      placeholder: true,
    },
    {
      id: "jonas",
      kind: "course",
      icon: "si:udemy",
      title: { en: "JavaScript and React courses", pl: "Kursy JavaScript i React", es: "Cursos de JavaScript y React" },
      issuer: { en: "Courses by Jonas Schmedtmann, Udemy", pl: "Kursy Jonasa Schmedtmanna, Udemy", es: "Cursos de Jonas Schmedtmann, Udemy" },
      summary: {
        en: "JavaScript and React from the fundamentals up. Course certificates, not an accredited qualification.",
        pl: "JavaScript i React od podstaw. Certyfikaty ukończenia kursu, nie akredytowana kwalifikacja.",
        es: "JavaScript y React desde los fundamentos. Certificados de curso, no una titulación acreditada.",
      },
      // PLACEHOLDER (P11): course titles, dates and certificate links.
      when: same("2022"),
      verifyUrl: "https://udemy.example/certificates",
      placeholder: true,
    },
    {
      id: "erasmus",
      kind: "volunteering",
      icon: "tb:world",
      title: {
        en: "Erasmus+ and European Solidarity Corps",
        pl: "Erasmus+ i Europejski Korpus Solidarności",
        es: "Erasmus+ y Cuerpo Europeo de Solidaridad",
      },
      issuer: { en: "Youth exchanges and volunteering", pl: "Wymiany młodzieżowe i wolontariat", es: "Intercambios juveniles y voluntariado" },
      summary: {
        en: "Youth exchanges and volunteering with people from other countries, in English.",
        pl: "Wymiany młodzieżowe i wolontariat z ludźmi z innych krajów, po angielsku.",
        es: "Intercambios juveniles y voluntariado con gente de otros países, en inglés.",
      },
      // PLACEHOLDER (P11): programmes, countries, dates, Youthpass.
      when: { en: "Dates to confirm", pl: "Daty do potwierdzenia", es: "Fechas por confirmar" },
      placeholder: true,
    },
    {
      id: "hackathons",
      kind: "hackathon",
      icon: "tb:clock-hour-4",
      title: { en: "Hackathons", pl: "Hackathony", es: "Hackathones" },
      issuer: { en: "Team events", pl: "Wydarzenia zespołowe", es: "Eventos en equipo" },
      summary: {
        en: "A hard problem, a team and a clock.",
        pl: "Trudny problem, zespół i zegar.",
        es: "Un problema difícil, un equipo y un reloj.",
      },
      // PLACEHOLDER (P11): names, dates, results, team size.
      when: { en: "Dates to confirm", pl: "Daty do potwierdzenia", es: "Fechas por confirmar" },
      placeholder: true,
    },
    {
      id: "short-courses",
      kind: "course",
      icon: "tb:brain",
      title: {
        en: "Marketing, psychology and UX",
        pl: "Marketing, psychologia i UX",
        es: "Marketing, psicología y UX",
      },
      issuer: { en: "Short courses", pl: "Krótkie kursy", es: "Cursos breves" },
      summary: {
        en: "Short courses on how people decide, buy and use products.",
        pl: "Krótkie kursy o tym, jak ludzie decydują, kupują i korzystają z produktów.",
        es: "Cursos breves sobre cómo la gente decide, compra y usa productos.",
      },
      // PLACEHOLDER (P11): course names and dates.
      when: { en: "Dates to confirm", pl: "Daty do potwierdzenia", es: "Fechas por confirmar" },
      placeholder: true,
    },
  ] satisfies Credential[],

  languages: [
    { name: { en: "Polish", pl: "polski", es: "polaco" }, level: { en: "native", pl: "ojczysty", es: "nativo" } },
    { name: { en: "English", pl: "angielski", es: "inglés" }, level: { en: "fluent", pl: "biegły", es: "fluido" } },
    { name: { en: "Spanish", pl: "hiszpański", es: "español" }, level: { en: "basic", pl: "podstawowy", es: "básico" } },
  ],

  interests: {
    en: "Calisthenics, travel, motorcycles, films, music of every kind, gaming with friends.",
    pl: "Kalistenika, podróże, motocykle, filmy, muzyka każdego rodzaju, granie ze znajomymi.",
    es: "Calistenia, viajes, motos, cine, música de todo tipo, jugar con amigos.",
  } satisfies Text,
};

/** A stable digest of the CV content of one locale: the PDF records it, `cv.test.ts` compares. */
export function cvDigestSource(locale: Locale): string {
  const pick = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(pick);
    if (value && typeof value === "object") {
      const record = value as Record<string, unknown>;
      if ("en" in record && "pl" in record && "es" in record && typeof record.en === "string") return record[locale];
      return Object.fromEntries(Object.entries(record).map(([key, inner]) => [key, pick(inner)]));
    }
    return value;
  };
  return JSON.stringify(pick(CV));
}
