import { type IconName } from "~/lib/icons.gen";

import { type Credential, CV, type CvEntry, type Text } from "./cv";

/**
 * DRAFT [user 2026-10-08]: the CV the new sheet prints while the owner approves the sheet and the /new-cv skill,
 * English first ("lets just first agree on an english version ... then you can localize and also update the cv
 * subpage"). Only the sheet's print route (cv/print-v2) reads it; /cv/, the home page and the live PDFs keep reading
 * cv.ts. At rollout (new-cv SKILL.md § Rollout) it merges into cv.ts with Polish and Spanish text and this file goes.
 * Until then new text repeats the English in every locale (`en()`): print it with `--locales en`.
 */
const en = (value: string): Text => ({ en: value, pl: value, es: value });

function byId<T extends { id: string }>(list: readonly T[], id: string): T {
  const item = list.find((entry) => entry.id === id);
  if (!item) throw new Error(`cv-draft: no entry "${id}" in cv.ts`);
  return item;
}

const credential = (id: string): Credential => byId<Credential>(CV.credentials, id);
const erasmus = credential("erasmus");

/** A soft skill: what he's good at, and one line that shows it (facts from cv.ts and the owner's words). */
export interface SoftSkill {
  icon: IconName;
  name: Text;
  line: Text;
}

/** A group of tools he works with, under an outline icon (Tabler, MIT). */
export interface ToolGroup {
  icon: IconName;
  name: Text;
  tools: string[];
}

/** A credential with what it gave him: one line the sheet sets apart in the accent colour [user 2026-10-08]. */
export type CvCredential = Credential & { gain?: Text };

export const CV_DRAFT = {
  ...CV,
  // [user 2026-10-08] "call me more like on website, full-stack product engineer" (the hero's role line).
  title: en("Full-stack product engineer"),
  summary: en(
    "Full-stack product engineer who builds web and mobile products end to end, from the business problem to the shipped app, since 2022. I work in TypeScript, React, Next.js, Astro, React Native (Expo), Node.js and Supabase/Postgres. I use AI agents (Claude Code) as leverage and keep the decisions and the verification: tests, accessibility and performance checks on every change.",
  ),

  experience: [
    {
      ...byId(CV.experience, "pstrykweb"),
      // PstrykWeb has its own entry under Selected projects [user 2026-10-08]; the job keeps his concrete part of it.
      bullets: [
        en(
          "Real commercial projects; built the public configurator of PstrykWeb, the online order form (Next.js, TypeScript, Vercel).",
        ),
      ],
    },
    {
      ...byId(CV.experience, "neoteric"),
      // "15-requirement" broke at its hyphen and extractors joined it into "15requirement". The test and security
      // counts are off the CV [user 2026-10-08].
      bullets: [
        en(
          "Built Clockful, a role-based time tracker, with AI agents only, from a spec of 15 requirements in about 9 days (an estimate from the repo dates).",
        ),
      ],
    },
    // [user 2026-10-08] "ks beniaminek was 2025". Title and place like the other internships.
    {
      ...byId(CV.experience, "beniaminek"),
      title: en("Intern, KS Beniaminek 03"),
      org: en("Sports club"),
      when: en("2025 · 1 month"),
      placeholder: false,
    },
    // [user 2026-10-08] described generally, with two examples: the yws.lu landing (Youth Work Synergy, a nonprofit
    // that houses young people in Luxembourg: yws.lu, checked 2026-10-08) and the youth-space app his school's
    // principal gave him an award for (gallery.ts). lingui-translate-ai is off the CV. yws.lu is client work: rights
    // `check` (projects.ts) until the client's OK, before the live PDF.
    {
      ...byId(CV.experience, "freelance"),
      bullets: [
        en(
          "Landing pages for businesses and organisations, such as a 3D site for Youth Work Synergy, a youth housing nonprofit in Luxembourg (React, React Three Fiber, GSAP).",
        ),
        en("A mobile app for a local youth space; the principal of my technical secondary school gave me an award for it."),
      ],
      links: [{ label: "yws.lu", href: "https://yws.lu/" }],
    },
  ] satisfies CvEntry[],

  // [user 2026-10-08] "list pstryk as the first one there, in collaboration with cetuspro"; Linkoglot moves here;
  // "Portfolio", never "This site"; the 3D space portfolio is off the CV.
  projects: [
    {
      id: "pstrykweb",
      title: en("PstrykWeb"),
      org: en("In collaboration with Cetuspro"),
      when: en("2026"),
      // Public info only, and the landing is the one link (content/projects/pstrykweb.md). No logo: the brand is the
      // software house's.
      links: [{ label: "pstrykweb.pl", href: "https://pstrykweb.pl/" }],
      // The title names it: the line says what it is (one line, no orphan).
      bullets: [en("Bespoke websites for local businesses, ordered through one online form.")],
    },
    // No project logos [user 2026-10-08: "i changed my mind about project logos"].
    {
      ...byId(CV.experience, "linkoglot"),
      title: en("Linkoglot"),
      org: en("Own product, founder and developer"),
    },
    {
      ...byId(CV.projects, "this-site"),
      title: en("Portfolio"),
      // Two lines, not three (the sheet's fit): the same facts, the scores as a range.
      bullets: [
        en(
          "Astro, React and Lingui (en/pl/es); Lighthouse mobile 99–100, about 8 KB of JavaScript; built with a Claude Code setup: a project wiki, hooks and skills.",
        ),
      ],
      links: [{ label: "muszarski.com", href: "https://muszarski.com/" }],
    },
  ] satisfies CvEntry[],

  // [user 2026-10-08] the soft skills first ("especially"), shown as skills with what backs them, not a list of names.
  softSkills: [
    {
      icon: "tb:users-group",
      name: en("Teamwork and clients"),
      line: en("Software houses, hackathon teams"),
    },
    {
      icon: "tb:puzzle",
      name: en("Problem solving"),
      line: en("From business problem to shipped app"),
    },
    {
      icon: "tb:target",
      name: en("Business thinking"),
      line: en("Solutions measured by business results"),
    },
    {
      icon: "tb:hand-click",
      name: en("Conversions and UX"),
      line: en("How people notice, trust and act"),
    },
    {
      icon: "tb:brain",
      name: en("User psychology"),
      line: en("Consumer psychology and UX courses"),
    },
    {
      icon: "tb:chart-line",
      name: en("Analytical thinking"),
      line: en("Marketing planned around goals and data"),
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
      name: en("Web"),
      tools: ["TypeScript", "React", "Next.js", "Astro", "Tailwind CSS", "shadcn/ui", "WebGL"],
    },
    { icon: "tb:device-mobile", name: en("Mobile"), tools: ["React Native", "Expo"] },
    { icon: "tb:database", name: en("Back end and data"), tools: ["Node.js", "Supabase", "PostgreSQL", "TanStack Query"] },
    { icon: "tb:test-pipe", name: en("Quality and UX"), tools: ["Playwright E2E testing", "Lighthouse MCP", "Mobbin"] },
    { icon: "tb:terminal-2", name: en("AI and workflow"), tools: ["Claude Code", "GitHub", "GitLab", "Vercel API"] },
  ] satisfies ToolGroup[],

  credentials: [
    // The formal qualification first, then newest first [review 2026-10-08].
    // [user 2026-10-08] "instead of Secondary school in inf, you can say State exams".
    { ...credential("inf"), when: en("State exams") },
    // One line each instead of a line per certificate [user 2026-10-08: "whatever with those certs for hackathons or
    // european projects"]; the certificates stay on the home cards.
    {
      ...credential("hackathons"),
      summary: en(
        "HackYeah 2026 in Kraków, Europe's biggest on-site hackathon; Hack4Change 2026 in Gdańsk, 48 hours for the Baltic Sea; Product Challenge 2026: Vibe the Future in Rzeszów.",
      ),
      // [user 2026-10-08] "they helped me improve in working under time pressure and in a team".
      gain: en("Made me better at working under time pressure and in a team."),
      items: undefined,
    },
    {
      ...erasmus,
      title: en("International youth projects"),
      issuer: en("Erasmus+, European Solidarity Corps, Visegrad"),
      // [user 2026-10-08] "visegrad project in georgia bakuriani for alternative youth participation". The issuer
      // line says what kind of projects; "in English" moved to the gain line (two lines, the sheet's fit).
      // PLACEHOLDER (P11): the years of Bakuriani and Demre.
      summary: en(
        "Digital youth work in Latvia, youth entrepreneurship in Lithuania, alternative youth participation in Bakuriani (Georgia), two months with sea turtles in Demre (Türkiye).",
      ),
      // [user 2026-10-08] "it helped me achieve fluency in communication with people, especially in English".
      gain: en("Made me fluent in communicating with people, especially in English."),
      items: undefined,
      placeholder: true,
    },
    // [user 2026-10-08] a year, like every other date on the sheet; what the course covers: "the webgl and stuff and
    // 90h+ of video and challenges" (the three.js course: 93 h of video, threejs-journey.com, checked 2026-10-08).
    {
      ...credential("threejs-journey"),
      when: en("2025"),
      summary: en(
        "90+ hours of video and challenges: WebGL with three.js, GLSL shaders, physics, Blender models, post-processing, performance and React Three Fiber.",
      ),
    },
    credential("jonas"),
    // "Marketing, psychology and UX" is off the list: the soft skills carry it [user 2026-10-08].
  ] as CvCredential[],

  // Spanish is off the CV [user 2026-10-08]; the flags are drawn in the sheet (Windows has no flag emoji).
  languages: [
    { ...CV.languages[0]!, flag: "pl" },
    { ...CV.languages[1]!, flag: "gb" },
  ] as { name: Text; level: Text; flag: "pl" | "gb" }[],
};
