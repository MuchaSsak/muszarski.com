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
  /** A one-line version for the home "Experience" card: the place and what it was. */
  short?: { name: string; note: Text };
  placeholder?: boolean;
}

export interface Credential {
  id: string;
  /** `experience` is the home card that sums up `education` + `experience`; the CV shows those sections instead. */
  kind: "experience" | "qualification" | "course" | "volunteering" | "hackathon" | "knowledge";
  icon: IconName;
  title: Text;
  issuer: Text;
  summary: Text;
  when: Text;
  verifyUrl?: string | undefined;
  /** The course's own site, linked next to the certificate. */
  courseUrl?: string | undefined;
  /** Places drawn on the card's route (the international card). */
  places?: Text[] | undefined;
  /** The certificates behind a card, each with its own proof: a verify link, a code to check, or both. */
  items?: CertItem[] | undefined;
  placeholder?: boolean;
}

export interface CertItem {
  /** The title as printed on the certificate (not translated). */
  title: string;
  /** A short name for the proof chip on the home card (the full title stays in the link's accessible name). */
  label?: Text | undefined;
  /** Date and length, or date and place. */
  when: Text;
  href?: string | undefined;
  /** An event's own site, for entries without a certificate to check (hackathons). */
  site?: string | undefined;
  /** A credential ID or verification code, as printed. */
  code?: string | undefined;
}

const UDEMY = (id: string) => ({ href: `https://www.udemy.com/certificate/${id}/`, code: id });
const YOUTHPASS = (code: string) => ({ href: "https://www.youthpass.eu/en/verify/", code: `Youthpass ${code}` });

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
      title: { en: "Intern, Cetuspro", pl: "Praktykant, Cetuspro", es: "Becario, Cetuspro" },
      org: { en: "Software house, remote", pl: "Software house, zdalnie", es: "Software house, en remoto" },
      // [user 2026-10-06] "june to currently".
      when: { en: "June 2026 – now", pl: "czerwiec 2026 – obecnie", es: "junio de 2026 – actualidad" },
      short: {
        name: "Cetuspro",
        note: {
          en: "remote, real commercial projects",
          pl: "zdalnie, prawdziwe projekty komercyjne",
          es: "en remoto, proyectos comerciales reales",
        },
      },
      bullets: [
        {
          en: "Real commercial projects for a software house, worked on remotely.",
          pl: "Prawdziwe projekty komercyjne dla software house'u, w pracy zdalnej.",
          es: "Proyectos comerciales reales para una software house, en remoto.",
        },
        {
          en: "Built PstrykWeb for the software house Cetuspro: bespoke websites for local businesses, ordered through one online form.",
          pl: "Zbudowałem PstrykWeb dla software house'u Cetuspro: strony na zamówienie dla lokalnych firm, zamawiane przez jeden formularz online.",
          es: "Construí PstrykWeb para la software house Cetuspro: webs a medida para negocios locales, encargadas con un solo formulario online.",
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
      // [user 2026-10-06] six weeks, working with AI.
      when: { en: "2026 · 6 weeks", pl: "2026 · 6 tygodni", es: "2026 · 6 semanas" },
      short: {
        name: "Neoteric",
        note: {
          en: "6 weeks, building with AI agents",
          pl: "6 tygodni, budowanie z agentami AI",
          es: "6 semanas, construir con agentes de IA",
        },
      },
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
      title: {
        en: "Founder and developer, Linkoglot",
        pl: "Twórca i programista, Linkoglot",
        es: "Fundador y desarrollador, Linkoglot",
      },
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
      id: "beniaminek",
      // Soft skills and social projects lead, not the programming [user 2026-10-07].
      title: { en: "Intern", pl: "Praktykant", es: "Becario" },
      org: { en: "KS Beniaminek 03, sports club", pl: "KS Beniaminek 03, klub sportowy", es: "KS Beniaminek 03, club deportivo" },
      // PLACEHOLDER (P16): the month and year and the social projects by name, owner confirms [user 2026-10-06: one month].
      when: { en: "1 month", pl: "1 miesiąc", es: "1 mes" },
      placeholder: true,
      short: {
        name: "KS Beniaminek 03",
        note: {
          en: "soft skills and social projects",
          pl: "umiejętności miękkie i projekty społeczne",
          es: "habilidades sociales y proyectos sociales",
        },
      },
      bullets: [
        {
          en: "Social projects at a sports club: work with people, communication and teamwork.",
          pl: "Projekty społeczne w klubie sportowym: praca z ludźmi, komunikacja i praca w zespole.",
          es: "Proyectos sociales en un club deportivo: trabajo con personas, comunicación y trabajo en equipo.",
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

  education: [
    {
      id: "zse",
      // English names, not the Polish ones [user 2026-10-07]: technikum = technical secondary school (the term that does
      // not read as post-secondary), technik programista = programmer technician, KKZ = vocational qualification course.
      title: { en: "Programmer technician", pl: "Technik programista", es: "Técnico programador" },
      org: {
        en: "ZSE Starogard Gdański, technical secondary school",
        pl: "ZSE Starogard Gdański, technikum",
        es: "ZSE Starogard Gdański, escuela técnica secundaria",
      },
      // [user 2026-10-06] in progress; the years wait for the full resume.
      when: { en: "In progress", pl: "W trakcie", es: "En curso" },
      short: {
        name: "ZSE Starogard Gdański",
        note: {
          en: "programmer technician, plus an IT technician course",
          pl: "technik programista, do tego KKZ technik informatyk",
          es: "técnico programador, más un curso de técnico informático",
        },
      },
      bullets: [
        {
          en: "Also taking the IT technician vocational qualification course (KKZ) at the same school.",
          pl: "Równolegle kwalifikacyjny kurs zawodowy (KKZ) technik informatyk w tej samej szkole.",
          es: "Además, el curso de cualificación profesional de técnico informático (KKZ) en la misma escuela.",
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
          en: "Astro, React, Lingui (en/pl/es); Lighthouse mobile 99 on the home page and 100 on the other pages, about 8 KB of JavaScript; built with a Claude Code setup of a project wiki, hooks and skills.",
          pl: "Astro, React, Lingui (en/pl/es); Lighthouse mobile 99 na stronie głównej i 100 na pozostałych, około 8 KB JavaScriptu; zbudowana z Claude Code, wiki projektu, hookami i skillami.",
          es: "Astro, React, Lingui (en/pl/es); Lighthouse móvil 99 en la portada y 100 en las demás páginas, unos 8 KB de JavaScript; hecho con Claude Code, una wiki del proyecto, hooks y skills.",
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
    {
      group: { en: "Frontend", pl: "Frontend", es: "Frontend" },
      items: ["TypeScript", "React", "Next.js", "Astro", "Tailwind CSS"],
    },
    { group: { en: "Mobile", pl: "Mobile", es: "Móvil" }, items: ["React Native", "Expo", "RevenueCat"] },
    {
      group: { en: "Backend and data", pl: "Backend i dane", es: "Backend y datos" },
      items: ["Node.js", "Supabase", "PostgreSQL (RLS)", "TanStack Query"],
    },
    {
      group: { en: "3D and motion", pl: "3D i animacja", es: "3D y animación" },
      items: ["three.js", "React Three Fiber", "GLSL", "GSAP"],
    },
    {
      group: { en: "AI and quality", pl: "AI i jakość", es: "IA y calidad" },
      items: ["Claude Code", "MCP", "Playwright", "Vitest", "Lighthouse"],
    },
    { group: { en: "i18n", pl: "i18n", es: "i18n" }, items: ["Lingui", "lingui-translate-ai"] },
  ],

  credentials: [
    {
      id: "experience",
      kind: "experience",
      icon: "tb:briefcase",
      title: { en: "Experience", pl: "Doświadczenie", es: "Experiencia" },
      // [user 2026-10-07] "4 years of improving"; the summary stays close to his words (no selling beyond them).
      issuer: {
        en: "4 years of steady improvement",
        pl: "4 lata ciągłego rozwoju",
        es: "4 años de mejora constante",
      },
      summary: {
        en: "Since 2022: studying, freelancing solo, launching my own startups, internships, and building real-world products.",
        pl: "Od 2022 roku: nauka, freelance na własną rękę, własne startupy, praktyki i budowanie prawdziwych produktów.",
        es: "Desde 2022: estudios, freelance por mi cuenta, mis propias startups, prácticas y productos reales.",
      },
      when: { en: "Since 2022", pl: "Od 2022", es: "Desde 2022" },
    },
    {
      id: "inf",
      kind: "qualification",
      icon: "tb:certificate",
      title: same("INF.02 · INF.03 · INF.04"),
      // [user 2026-10-07] all three state exams passed; dates and results still wait (P11).
      issuer: {
        en: "Polish state vocational exams (CKE / OKE)",
        pl: "Egzaminy zawodowe (CKE / OKE)",
        es: "Exámenes profesionales estatales de Polonia (CKE / OKE)",
      },
      summary: {
        en: "Computer systems and networks; websites, web applications and databases; designing, programming and testing applications.",
        pl: "Systemy komputerowe i sieci; strony i aplikacje internetowe oraz bazy danych; projektowanie, programowanie i testowanie aplikacji.",
        es: "Sistemas informáticos y redes; webs, aplicaciones web y bases de datos; diseño, programación y pruebas de aplicaciones.",
      },
      // PLACEHOLDER (P11, Q10): exam dates and whether each certificate is issued.
      when: { en: "Secondary school", pl: "Technikum", es: "Secundaria" },
      placeholder: true,
    },
    {
      id: "threejs-journey",
      kind: "course",
      icon: "si:threedotjs",
      title: same("Three.js Journey"),
      issuer: { en: "Course by Bruno Simon", pl: "Kurs Bruno Simona", es: "Curso de Bruno Simon" },
      summary: {
        // [user 2026-10-07] 90+ hours; WebGL, shaders, Blender; Bruno Simon as the teacher; link the course too.
        en: "90+ hours of WebGL, shaders and Blender: bringing 3D worlds to the web, taught by Bruno Simon, one of the best-known creative developers out there.",
        pl: "Ponad 90 godzin WebGL, shaderów i Blendera, czyli przenoszenie światów 3D do przeglądarki. Uczy Bruno Simon, jeden z najbardziej znanych creative developerów.",
        es: "Más de 90 horas de WebGL, shaders y Blender para llevar mundos 3D a la web, con Bruno Simon, uno de los creative developers más conocidos.",
      },
      // Certificate dated 30 Jan 2025 [owner's certificate, 2026-10-06].
      when: { en: "January 2025", pl: "Styczeń 2025", es: "Enero 2025" },
      verifyUrl: "https://threejs-journey.com/certificate/view/45175",
      courseUrl: "https://threejs-journey.com/",
    },
    {
      id: "jonas",
      kind: "course",
      icon: "si:udemy",
      title: {
        en: "Full-stack development courses",
        pl: "Kursy programowania full-stack",
        es: "Cursos de desarrollo full-stack",
      },
      issuer: {
        en: "Courses by Jonas Schmedtmann, Udemy",
        pl: "Kursy Jonasa Schmedtmanna, Udemy",
        es: "Cursos de Jonas Schmedtmann, Udemy",
      },
      summary: {
        // [user 2026-10-07] the challenges, assignments, projects and the "under the hood" theory.
        en: "JavaScript and React from the fundamentals up: about 135 hours of video, lots of coding challenges and assignments, practice projects, and theory lessons on how things work under the hood.",
        pl: "JavaScript i React od podstaw: około 135 godzin nagrań, mnóstwo zadań i wyzwań programistycznych, projekty do przećwiczenia i lekcje teorii o tym, jak wszystko działa pod spodem.",
        es: "JavaScript y React desde los fundamentos: unas 135 horas de vídeo, muchos retos y ejercicios de código, proyectos de práctica y lecciones de teoría sobre cómo funciona todo por dentro.",
      },
      when: same("2023"),
      // From the owner's certificates [2026-10-06]; titles as printed.
      items: [
        {
          title: "The Complete JavaScript Course 2023: From Zero to Expert!",
          label: same("JavaScript"),
          when: { en: "Sep 2023 · 68.5 h", pl: "Wrz 2023 · 68,5 h", es: "Sep 2023 · 68,5 h" },
          ...UDEMY("UC-8c6e4b4f-2f3f-4c3e-9773-8b2b2f9ee1a7"),
        },
        {
          title: "The Ultimate React Course 2024: React, Redux & More",
          label: same("React"),
          when: { en: "Dec 2023 · 67 h", pl: "Gru 2023 · 67 h", es: "Dic 2023 · 67 h" },
          ...UDEMY("UC-f3d532a0-be9d-43e9-b822-0f511752b87c"),
        },
      ],
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
      issuer: {
        en: "Youth exchanges and volunteering",
        pl: "Wymiany młodzieżowe i wolontariat",
        es: "Intercambios juveniles y voluntariado",
      },
      summary: {
        // [user 2026-10-07] also two months of ESC volunteering with Caretta caretta turtles in Demre (Türkiye) and a
        // project in Georgia (Erasmus+ or Visegrad, the owner isn't sure), so the line stays general.
        en: "Youth exchanges, trainings and volunteering in Latvia, Lithuania, Georgia and Türkiye, with people from other countries, in English. In Demre I spent two months volunteering with the European Solidarity Corps for Caretta caretta sea turtles.",
        pl: "Wymiany młodzieżowe, szkolenia i wolontariat na Łotwie, Litwie, w Gruzji i Turcji, z ludźmi z innych krajów, po angielsku. W Demre spędziłem dwa miesiące jako wolontariusz Europejskiego Korpusu Solidarności, pomagając żółwiom Caretta caretta.",
        es: "Intercambios juveniles, formaciones y voluntariado en Letonia, Lituania, Georgia y Turquía, con gente de otros países, en inglés. En Demre pasé dos meses de voluntariado del Cuerpo Europeo de Solidaridad con las tortugas Caretta caretta.",
      },
      // PLACEHOLDER (P11): the years of the Georgia and Demre projects, owner to confirm (the Youthpass ones are 2025).
      when: same("2025"),
      places: [
        same("Saraiķi"),
        same("Daugirdiškės"),
        same("Palanga"),
        { en: "Georgia", pl: "Gruzja", es: "Georgia" },
        same("Demre"),
      ],
      // From the owner's Youthpass certificates [2026-10-06]. The PDFs print personal data: never publish them, link
      // the Youthpass check and the code instead.
      items: [
        {
          title: "Digital Youth Work Methods",
          label: same("Saraiķi"),
          when: {
            en: "Apr-May 2025 · Saraiķi, Latvia",
            pl: "Kwi-maj 2025 · Saraiķi, Łotwa",
            es: "Abr-may 2025 · Saraiķi, Letonia",
          },
          ...YOUTHPASS("EKGX-9QF3-9D1R-NCVU"),
        },
        {
          title: "Developing Infrastructure to Work with Youth",
          label: same("Daugirdiškės"),
          when: {
            en: "May 2025 · Daugirdiškės, Lithuania",
            pl: "Maj 2025 · Daugirdiškės, Litwa",
            es: "May 2025 · Daugirdiškės, Lituania",
          },
          ...YOUTHPASS("ZCY6-LYHV-Y2WF-U5VD"),
        },
        {
          title: "Youth Entrepreneurship 2025",
          label: same("Palanga"),
          when: { en: "Jun 2025 · Palanga, Lithuania", pl: "Cze 2025 · Palanga, Litwa", es: "Jun 2025 · Palanga, Lituania" },
          ...YOUTHPASS("E5WH-X1BC-UXR9-YSXD"),
        },
      ],
    },
    {
      id: "hackathons",
      kind: "hackathon",
      icon: "tb:clock-hour-4",
      title: { en: "Hackathons", pl: "Hackathony", es: "Hackathones" },
      issuer: { en: "Team events", pl: "Wydarzenia zespołowe", es: "Eventos en equipo" },
      summary: {
        en: "A hard problem, a team and a clock. They teach me to decide fast, split the work and ship something that works under pressure.",
        pl: "Trudny problem, zespół i zegar. Uczą mnie szybko decydować, dzielić pracę i dowozić coś, co działa, pod presją.",
        es: "Un problema difícil, un equipo y un reloj. Me enseñan a decidir rápido, repartir el trabajo y entregar algo que funcione bajo presión.",
      },
      when: same("2026"),
      // [user 2026-10-07] HackYeah, Hack4Change and Vibe the Future; dates, places and sites from the events' own pages
      // (hackyeah.pl, hack4change.tech + the 2026 sign-up page, vibethefuture.pl), read 2026-10-07. Newest first.
      items: [
        {
          title: "HackYeah 2026",
          when: {
            en: "Oct 2026 · Kraków · Europe's biggest on-site hackathon",
            pl: "Paź 2026 · Kraków · największy stacjonarny hackathon w Europie",
            es: "Oct 2026 · Cracovia · el mayor hackathon presencial de Europa",
          },
          site: "https://hackyeah.pl/",
        },
        {
          title: "Hack4Change 2026",
          when: {
            en: "Jun 2026 · Gdańsk · 48 hours for the Baltic Sea",
            pl: "Cze 2026 · Gdańsk · 48 godzin dla Bałtyku",
            es: "Jun 2026 · Gdansk · 48 horas por el mar Báltico",
          },
          site: "https://hack4change.tech/",
        },
        {
          // From the owner's certificate of participation [2026-10-06].
          title: "Product Challenge 2026: Vibe the Future",
          label: same("Vibe the Future"),
          when: {
            en: "May 2026 · Rzeszów · Cetus Pro, LOTAMS, University of Rzeszów",
            pl: "Maj 2026 · Rzeszów · Cetus Pro, LOTAMS, Uniwersytet Rzeszowski",
            es: "May 2026 · Rzeszów · Cetus Pro, LOTAMS, Universidad de Rzeszów",
          },
          site: "https://vibethefuture.pl/",
        },
      ],
    },
    {
      id: "short-courses",
      // "Knowledge", not "Course" [user 2026-10-07].
      kind: "knowledge",
      icon: "tb:brain",
      title: {
        en: "Marketing, psychology and UX",
        pl: "Marketing, psychologia i UX",
        es: "Marketing, psicología y UX",
      },
      // [user 2026-10-07] "additional knowledge", from experience and courses: users and conversions, not just compiling.
      issuer: { en: "Additional knowledge", pl: "Wiedza dodatkowa", es: "Conocimientos adicionales" },
      summary: {
        en: "What experience and courses taught me about how people decide, buy and use products. It's why I think about users and conversions, not just about making the code compile.",
        pl: "Z doświadczenia i kursów wiem, jak ludzie podejmują decyzje, kupują i korzystają z produktów. Dlatego myślę o użytkownikach i konwersji, a nie tylko o tym, żeby kod się kompilował.",
        es: "Lo que la experiencia y los cursos me enseñaron sobre cómo la gente decide, compra y usa productos. Por eso pienso en los usuarios y en las conversiones, no solo en que el código compile.",
      },
      when: same("2025"),
      // From the owner's certificates [2026-10-06]; titles as printed.
      items: [
        {
          title: "Marketing Psychology and Consumer Behavior",
          label: { en: "Consumer psychology", pl: "Psychologia konsumenta", es: "Psicología del consumidor" },
          when: { en: "Sep 2025 · 4 h", pl: "Wrz 2025 · 4 h", es: "Sep 2025 · 4 h" },
          ...UDEMY("UC-69a3d782-44a9-4e70-8502-92f4f87d39de"),
        },
        {
          title: "UX Writing: Microcopy, User Research, Accessibility & More",
          label: same("UX writing"),
          when: { en: "Sep 2025 · 7.5 h", pl: "Wrz 2025 · 7,5 h", es: "Sep 2025 · 7,5 h" },
          ...UDEMY("UC-ccd766df-76e3-4c9d-8339-c87eabe681de"),
        },
      ],
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
