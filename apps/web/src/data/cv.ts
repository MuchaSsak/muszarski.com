import { isLocale, type Locale } from "@package/shared/locales";

import { type IconName } from "~/lib/icons.gen";

/**
 * THE CV (wiki: content/content-model.md § CV; the /new-cv skill drives every change). One source renders the `/cv/`
 * page, the CV sheet the PDFs are printed from (`cv/print/`, `bun run cv:sheet`) and the home Competences. Never edit
 * the page or the PDF alone: change this file, then run `bun run cv:sheet`; `cv.test.ts` fails while a PDF was made
 * from older data.
 *
 * Text is per locale (long-form content, not UI strings: i18n.md). Facts come from the wiki; every value that is not
 * real yet is marked `placeholder: true` (or PLACEHOLDER) and logged in placeholders.md (P2, P3, P4, P11, P16).
 * Spanish is machine-assisted and unreviewed (P12). The content was approved in English first [user 2026-10-08], then
 * localized.
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
  /** The role he holds now (the /cv/ page marks it live). */
  current?: boolean;
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
  /** How the CV shows it where that differs from the home card (`CV.qualifications` lists which ones it shows). */
  cv?: CvOverride | undefined;
  placeholder?: boolean;
}

/** A credential's CV version [user 2026-10-08]: a shorter title or date, one summary line, what it gave him. */
export interface CvOverride {
  title?: Text;
  issuer?: Text;
  when?: Text;
  summary?: Text;
  /** What it gave him: one line the CV sets apart in the accent colour [user 2026-10-08]. */
  gain?: Text;
  /** One summary line in place of a line per certificate (the certificates stay on the home card). */
  summaryOnly?: boolean;
}

/** A credential as the CV shows it: the home card with its CV override applied. */
export type CvCredential = Credential & { gain?: Text | undefined };

/** A soft skill: what he's good at, and one line that shows it (facts from this file and the owner's words). */
export interface SoftSkill {
  icon: IconName;
  name: Text;
  line: Text;
}

/** A group of tools he works with, under an outline icon (Tabler, MIT); a tool's name is the same in every locale
 * unless it holds words. */
export interface ToolGroup {
  icon: IconName;
  name: Text;
  tools: (string | Text)[];
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
  // [user 2026-10-08] "call me more like on website, full-stack product engineer": the hero's role line, in the hero's
  // words per locale (the Polish hero keeps the English title).
  title: {
    en: "Full-stack product engineer",
    pl: "Full-stack product engineer",
    es: "Ingeniero de producto full stack",
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
    en: "Full-stack product engineer who builds web and mobile products end to end, from the business problem to the shipped app, since 2022. I work in TypeScript, React, Next.js, Astro, React Native (Expo), Node.js and Supabase/Postgres. I use AI agents (Claude Code) as leverage and keep the decisions and the verification: tests, accessibility and performance checks on every change.",
    pl: "Full-stack product engineer: od 2022 roku buduję produkty webowe i mobilne od początku do końca, od problemu biznesowego do wdrożonej aplikacji. Pracuję w TypeScript, React, Next.js, Astro, React Native (Expo), Node.js i Supabase/Postgres. Agentów AI (Claude Code) używam jako dźwigni, a decyzje i weryfikację zostawiam sobie: testy, dostępność i wydajność sprawdzane przy każdej zmianie.",
    es: "Ingeniero de producto full stack que construye productos web y móviles de principio a fin, desde el problema de negocio hasta la app publicada, desde 2022. Trabajo con TypeScript, React, Next.js, Astro, React Native (Expo), Node.js y Supabase/Postgres. Uso agentes de IA (Claude Code) como palanca y me quedo con las decisiones y la verificación: tests, accesibilidad y rendimiento en cada cambio.",
  } satisfies Text,

  experience: [
    {
      id: "pstrykweb",
      title: { en: "Intern, Cetuspro", pl: "Praktykant, Cetuspro", es: "Becario, Cetuspro" },
      org: { en: "Software house, remote", pl: "Software house, zdalnie", es: "Software house, en remoto" },
      // [user 2026-10-06] "june to currently".
      when: { en: "June 2026 – now", pl: "czerwiec 2026 – obecnie", es: "junio de 2026 – actualidad" },
      current: true,
      short: {
        name: "Cetuspro",
        note: {
          en: "remote, real commercial projects",
          pl: "zdalnie, prawdziwe projekty komercyjne",
          es: "en remoto, proyectos comerciales reales",
        },
      },
      // PstrykWeb has its own entry under Selected projects [user 2026-10-08]; the job keeps his concrete part of it.
      bullets: [
        {
          en: "Real commercial projects; built the public configurator of PstrykWeb, the online order form (Next.js, TypeScript, Vercel).",
          pl: "Prawdziwe projekty komercyjne; zbudowałem publiczny konfigurator PstrykWeb, czyli formularz zamówienia online (Next.js, TypeScript, Vercel).",
          es: "Proyectos comerciales reales; construí el configurador público de PstrykWeb, el formulario de pedido online (Next.js, TypeScript, Vercel).",
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
      // "15-requirement" broke at its hyphen and extractors joined it into "15requirement". The test and security
      // counts are off the CV [user 2026-10-08] (the home chapter keeps them).
      bullets: [
        {
          en: "Built Clockful, a role-based time tracker, with AI agents only, from a spec of 15 requirements in about 9 days (an estimate from the repo dates).",
          pl: "Zbudowałem Clockful, aplikację do ewidencji czasu pracy z rolami, wyłącznie z agentami AI, ze specyfikacji 15 wymagań w około 9 dni (szacunek z dat w repozytorium).",
          es: "Construí Clockful, un control de horas con roles, solo con agentes de IA, a partir de 15 requisitos en unos 9 días (estimación según las fechas del repositorio).",
        },
      ],
    },
    {
      id: "beniaminek",
      // Soft skills and social projects lead, not the programming [user 2026-10-07]. [user 2026-10-08] "ks beniaminek
      // was 2025"; title and place like the other internships.
      title: { en: "Intern, KS Beniaminek 03", pl: "Praktykant, KS Beniaminek 03", es: "Becario, KS Beniaminek 03" },
      org: { en: "Sports club", pl: "Klub sportowy", es: "Club deportivo" },
      when: { en: "2025 · 1 month", pl: "2025 · 1 miesiąc", es: "2025 · 1 mes" },
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
          pl: "Projekty społeczne w klubie: praca z ludźmi, komunikacja i praca w zespole.",
          es: "Proyectos sociales en el club: trabajo con personas, comunicación y trabajo en equipo.",
        },
      ],
    },
    {
      id: "freelance",
      title: { en: "Freelance and own projects", pl: "Freelance i własne projekty", es: "Freelance y proyectos propios" },
      // PLACEHOLDER (P2, P16): years of paid work, owner confirms.
      when: { en: "Since 2022", pl: "Od 2022", es: "Desde 2022" },
      placeholder: true,
      // [user 2026-10-08] described generally, with two examples: the yws.lu landing (Youth Work Synergy, a nonprofit
      // that houses young people in Luxembourg: yws.lu, checked 2026-10-08) and the youth-space app his school's
      // principal gave him an award for (gallery.ts). lingui-translate-ai is off the CV. yws.lu is client work: rights
      // `check` (projects.ts, placeholders.md P10) until the client's OK.
      bullets: [
        {
          en: "Landing pages for businesses and organisations, such as a 3D site for Youth Work Synergy, a youth housing nonprofit in Luxembourg (React, React Three Fiber, GSAP).",
          pl: "Landingi dla firm i organizacji, np. strona 3D dla Youth Work Synergy, luksemburskiej organizacji mieszkaniowej dla młodzieży (React, React Three Fiber, GSAP).",
          es: "Landings para empresas y organizaciones, como una web 3D para Youth Work Synergy, una ONG de vivienda juvenil de Luxemburgo (React, React Three Fiber, GSAP).",
        },
        {
          en: "A mobile app for a local youth space; the principal of my technical secondary school gave me an award for it.",
          pl: "Aplikacja mobilna dla lokalnej przestrzeni dla młodzieży; dyrektor mojego technikum nagrodził mnie za nią.",
          es: "Una app móvil para un espacio juvenil local; el director de mi escuela técnica me dio un premio por ella.",
        },
      ],
      links: [{ label: "yws.lu", href: "https://yws.lu/" }],
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

  // [user 2026-10-08] "list pstryk as the first one there, in collaboration with cetuspro"; Linkoglot moves here from
  // Experience; "Portfolio", never "This site"; the 3D space portfolio is off the CV. No project logos [user
  // 2026-10-08: "i changed my mind about project logos"].
  projects: [
    {
      id: "pstrykweb",
      title: same("PstrykWeb"),
      org: { en: "In collaboration with Cetuspro", pl: "We współpracy z Cetuspro", es: "En colaboración con Cetuspro" },
      when: same("2026"),
      // Public info only, and the landing is the one link (content/projects/pstrykweb.md).
      links: [{ label: "pstrykweb.pl", href: "https://pstrykweb.pl/" }],
      // The title names it: the line says what it is (one line, no orphan).
      bullets: [
        {
          en: "Bespoke websites for local businesses, ordered through one online form.",
          pl: "Strony na zamówienie dla lokalnych firm, zamawiane przez jeden formularz online.",
          es: "Webs a medida para negocios locales, encargadas con un solo formulario online.",
        },
      ],
    },
    {
      id: "linkoglot",
      title: same("Linkoglot"),
      org: {
        en: "Own product, founder and developer",
        pl: "Własny produkt, twórca i programista",
        es: "Producto propio, fundador y desarrollador",
      },
      when: same("2026"),
      links: [
        { label: "App Store", href: "https://apps.apple.com/app/id6768303316" },
        { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.linkoglot.app" },
      ],
      bullets: [
        {
          en: "Designed, built and shipped an AI language-learning app to the App Store and Google Play, solo: snap a photo to get flashcards, quizzes and voice practice.",
          pl: "Sam zaprojektowałem, zbudowałem i wydałem w App Store i Google Play aplikację do nauki języków z AI: zdjęcie zamienia się w fiszki, quizy i ćwiczenia mówienia.",
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
      id: "portfolio",
      title: same("Portfolio"),
      when: same("2026"),
      // One bullet, two lines on the sheet: the same facts, the scores as a range.
      bullets: [
        {
          en: "Astro, React and Lingui (en/pl/es); Lighthouse mobile 99–100, about 8 KB of JavaScript; built with a Claude Code setup: a project wiki, hooks and skills.",
          pl: "Astro, React i Lingui (en/pl/es); Lighthouse mobile 99–100, około 8 KB JavaScriptu; zbudowane z Claude Code: wiki projektu, hooki i skille.",
          es: "Astro, React y Lingui (en/pl/es); Lighthouse móvil 99–100, unos 8 KB de JavaScript; hecho con Claude Code: una wiki del proyecto, hooks y skills.",
        },
      ],
      links: [{ label: "muszarski.com", href: "https://muszarski.com/" }],
    },
  ] satisfies CvEntry[],

  // [user 2026-10-08] the soft skills first ("especially"), shown as skills with what backs them, not a list of names.
  softSkills: [
    {
      icon: "tb:users-group",
      name: { en: "Teamwork and clients", pl: "Praca w zespole i z klientem", es: "Trabajo en equipo y con clientes" },
      line: {
        en: "Software houses, hackathon teams",
        pl: "Software house'y i hackathony",
        es: "Software houses, equipos de hackathon",
      },
    },
    {
      icon: "tb:puzzle",
      name: { en: "Problem solving", pl: "Rozwiązywanie problemów", es: "Resolución de problemas" },
      line: {
        en: "From business problem to shipped app",
        pl: "Od problemu biznesowego do aplikacji",
        es: "Del problema de negocio a la app",
      },
    },
    {
      icon: "tb:target",
      name: { en: "Business thinking", pl: "Myślenie biznesowe", es: "Visión de negocio" },
      line: {
        en: "Solutions measured by business results",
        pl: "Rozwiązania mierzone wynikami biznesu",
        es: "Soluciones medidas por resultados",
      },
    },
    {
      icon: "tb:hand-click",
      name: { en: "Conversions and UX", pl: "Konwersja i UX", es: "Conversión y UX" },
      line: {
        en: "How people notice, trust and act",
        pl: "Jak ludzie zauważają, ufają i działają",
        es: "Cómo la gente se fija, confía y actúa",
      },
    },
    {
      icon: "tb:brain",
      name: { en: "User psychology", pl: "Psychologia użytkownika", es: "Psicología del usuario" },
      line: {
        en: "Consumer psychology and UX courses",
        pl: "Kursy psychologii konsumenta i UX",
        es: "Cursos de psicología del consumidor y UX",
      },
    },
    {
      icon: "tb:chart-line",
      name: { en: "Analytical thinking", pl: "Myślenie analityczne", es: "Pensamiento analítico" },
      line: {
        en: "Marketing planned around goals and data",
        pl: "Marketing planowany wokół celów i danych",
        es: "Marketing con objetivos y datos",
      },
    },
  ] satisfies SoftSkill[],

  // [user 2026-10-08] the owner's list, "small font", "in good visual order", icons only where we know they're
  // allowed: the tools' own logos are not (React, GitLab, Playwright, Lighthouse and Claude forbid this use, most
  // others don't say; design/assets.md § CV marks), so each group gets an outline icon and the tools stay names.
  // Node.js and PostgreSQL come from the profile (ATS keywords). [user 2026-10-08] WebGL under Web; Mobbin under
  // Quality (so the group says "and UX": Mobbin is a library of real app screens); Vercel API in the workflow.
  tools: [
    {
      icon: "tb:browser",
      name: same("Web"),
      tools: ["TypeScript", "React", "Next.js", "Astro", "Tailwind CSS", "shadcn/ui", "WebGL"],
    },
    { icon: "tb:device-mobile", name: { en: "Mobile", pl: "Mobile", es: "Móvil" }, tools: ["React Native", "Expo"] },
    {
      icon: "tb:database",
      name: { en: "Back end and data", pl: "Backend i dane", es: "Backend y datos" },
      tools: ["Node.js", "Supabase", "PostgreSQL", "TanStack Query"],
    },
    {
      icon: "tb:test-pipe",
      name: { en: "Quality and UX", pl: "Jakość i UX", es: "Calidad y UX" },
      tools: [
        { en: "Playwright E2E testing", pl: "Playwright (testy E2E)", es: "Playwright (pruebas E2E)" },
        "Lighthouse MCP",
        "Mobbin",
      ],
    },
    {
      icon: "tb:terminal-2",
      name: { en: "AI and workflow", pl: "AI i workflow", es: "IA y flujo de trabajo" },
      tools: ["Claude Code", "GitHub", "GitLab", "Vercel API"],
    },
  ] satisfies ToolGroup[],

  /**
   * The CV's qualifications and training, in its order: the formal qualification first, then newest first [review
   * 2026-10-08]. Each is a home card (below) with its `cv` override. "Marketing, psychology and UX" stays off the CV:
   * the soft skills carry it [user 2026-10-08].
   */
  qualifications: ["inf", "hackathons", "erasmus", "threejs-journey", "jonas"],

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
      // [user 2026-10-08] "instead of Secondary school in inf, you can say State exams".
      cv: { when: { en: "State exams", pl: "Egzaminy zawodowe", es: "Exámenes estatales" } },
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
      // [user 2026-10-08] a year, like every other date on the CV; what the course covers: "the webgl and stuff and 90h+
      // of video and challenges" (93 h of video, threejs-journey.com, checked 2026-10-08).
      cv: {
        when: same("2025"),
        summary: {
          en: "90+ hours of video and challenges: WebGL with three.js, GLSL shaders, physics, Blender models, post-processing, performance and React Three Fiber.",
          pl: "Ponad 90 godzin nagrań i wyzwań: WebGL z three.js, shadery GLSL, fizyka, modele z Blendera, post-processing, wydajność i React Three Fiber.",
          es: "Más de 90 horas de vídeo y retos: WebGL con three.js, shaders GLSL, física, modelos de Blender, posprocesado, rendimiento y React Three Fiber.",
        },
      },
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
      // One line instead of a line per certificate [user 2026-10-08: "whatever with those certs for hackathons or
      // european projects"]. [user 2026-10-08] "visegrad project in georgia bakuriani for alternative youth
      // participation"; "it helped me achieve fluency in communication with people, especially in English".
      cv: {
        title: {
          en: "International youth projects",
          pl: "Międzynarodowe projekty młodzieżowe",
          es: "Proyectos juveniles internacionales",
        },
        issuer: {
          en: "Erasmus+, European Solidarity Corps, Visegrad",
          pl: "Erasmus+, Korpus Solidarności, Wyszehrad",
          es: "Erasmus+, Cuerpo Europeo de Solidaridad, Visegrado",
        },
        summary: {
          en: "Digital youth work in Latvia, youth entrepreneurship in Lithuania, alternative youth participation in Bakuriani (Georgia), two months with sea turtles in Demre (Türkiye).",
          pl: "Cyfrowa praca z młodzieżą na Łotwie, przedsiębiorczość na Litwie, alternatywna partycypacja w Bakuriani (Gruzja), dwa miesiące z żółwiami morskimi w Demre (Turcja).",
          es: "Trabajo juvenil digital en Letonia, emprendimiento en Lituania, participación alternativa en Bakuriani (Georgia), dos meses con tortugas marinas en Demre (Turquía).",
        },
        gain: {
          en: "Made me fluent in communicating with people, especially in English.",
          pl: "Dzięki nim swobodnie porozumiewam się z ludźmi, zwłaszcza po angielsku.",
          es: "Me dieron soltura para comunicarme con la gente, sobre todo en inglés.",
        },
        summaryOnly: true,
      },
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
      // One line instead of a line per event [user 2026-10-08]; "they helped me improve in working under time pressure
      // and in a team".
      cv: {
        summary: {
          en: "HackYeah 2026 in Kraków, Europe's biggest on-site hackathon; Hack4Change 2026 in Gdańsk, 48 hours for the Baltic Sea; Product Challenge 2026: Vibe the Future in Rzeszów.",
          pl: "HackYeah 2026 w Krakowie, największy stacjonarny hackathon w Europie; Hack4Change 2026 w Gdańsku, 48 h dla Bałtyku; Product Challenge 2026: Vibe the Future w Rzeszowie.",
          es: "HackYeah 2026 en Cracovia, el mayor hackathon presencial de Europa; Hack4Change 2026 en Gdansk, 48 h por el Báltico; Product Challenge 2026: Vibe the Future en Rzeszów.",
        },
        gain: {
          en: "Made me better at working under time pressure and in a team.",
          pl: "Nauczyły mnie lepiej pracować pod presją czasu i w zespole.",
          es: "Me enseñaron a trabajar mejor bajo presión y en equipo.",
        },
        summaryOnly: true,
      },
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

  // Spanish is off the CV [user 2026-10-08]. The flags are drawn (Windows has no flag emoji).
  languages: [
    {
      name: { en: "Polish", pl: "polski", es: "polaco" },
      level: { en: "native", pl: "ojczysty", es: "nativo" },
      flag: "pl",
    },
    {
      name: { en: "English", pl: "angielski", es: "inglés" },
      level: { en: "fluent", pl: "biegły", es: "fluido" },
      flag: "gb",
    },
  ] satisfies { name: Text; level: Text; flag: "pl" | "gb" }[],

  interests: {
    en: "Calisthenics, travel, motorcycles, films, music of every kind, gaming with friends.",
    pl: "Kalistenika, podróże, motocykle, filmy, muzyka każdego rodzaju, granie ze znajomymi.",
    es: "Calistenia, viajes, motos, cine, música de todo tipo, jugar con amigos.",
  } satisfies Text,
  /** One outline icon per interest, in the line's order (the /cv/ page shows them as tags; none if the counts differ). */
  interestIcons: [
    "tb:barbell",
    "tb:plane",
    "tb:motorbike",
    "tb:movie",
    "tb:music",
    "tb:device-gamepad-2",
  ] satisfies IconName[] as IconName[],

  /**
   * The recruitment consent line at the end of the CV. Polish recruiters still expect it although the Labour Code data
   * needs no consent; Spanish and English CVs carry none (research/2026-10-08-cv-locale-conventions.md, RocketJobs'
   * one-line wording: no company name, covers the photo and future recruitments).
   */
  clause: {
    pl: "Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w aplikacji dla potrzeb niezbędnych do realizacji obecnego oraz przyszłych procesów rekrutacyjnych.",
  } satisfies Partial<Text>,
};

/** The CV's qualifications and training (`CV.qualifications`, in that order), each with its CV override applied. */
export function cvQualifications(): CvCredential[] {
  return CV.qualifications.map((id) => {
    const credential: Credential | undefined = CV.credentials.find((entry) => entry.id === id);
    if (!credential) throw new Error(`cv.ts: CV.qualifications names "${id}", which is not a credential`);
    const { cv, ...card } = credential;
    return {
      ...card,
      title: cv?.title ?? card.title,
      issuer: cv?.issuer ?? card.issuer,
      when: cv?.when ?? card.when,
      summary: cv?.summary ?? card.summary,
      items: cv?.summaryOnly ? undefined : card.items,
      gain: cv?.gain,
    };
  });
}

/** A stable digest of the CV content of one locale: the PDF records it, `cv.test.ts` compares. */
export function cvDigestSource(locale: Locale, cv: object = CV): string {
  const pick = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(pick);
    if (value && typeof value === "object") {
      const record = value as Record<string, unknown>;
      if ("en" in record && "pl" in record && "es" in record && typeof record.en === "string") return record[locale];
      // A text only some locales carry (the Polish clause) belongs to those locales' digests alone.
      const keys = Object.keys(record);
      if (keys.length > 0 && keys.every(isLocale) && Object.values(record).every((text) => typeof text === "string"))
        return record[locale];
      return Object.fromEntries(Object.entries(record).map(([key, inner]) => [key, pick(inner)]));
    }
    return value;
  };
  return JSON.stringify(pick(cv));
}
