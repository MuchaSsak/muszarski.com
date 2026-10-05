import { LAUNCH_BUILD } from "astro:env/server";

/**
 * The flagship list as chrome needs it (footer, later the chapters). Full fields arrive with the
 * flagship slices (content-model.md § Project). Rights gate (CLAUDE.md invariants): client and
 * internship work shows at launch only with rights `ok`; review builds show everything so the
 * layout is real, and placeholders.md P10 tracks the open statuses.
 */
export type Rights = "ok" | "check" | "no";

export interface FlagshipLink {
  slug: string;
  name: string;
  rights: Rights;
}

export const FLAGSHIPS: readonly FlagshipLink[] = [
  { slug: "pstrykweb", name: "PstrykWeb", rights: "check" },
  { slug: "linkoglot", name: "Linkoglot", rights: "ok" },
  { slug: "neoteric-clockful", name: "Neoteric Clockful", rights: "check" },
  { slug: "space-portfolio", name: "3D Space Portfolio", rights: "ok" },
];

export const visibleFlagships = () => FLAGSHIPS.filter((project) => project.rights === "ok" || (!LAUNCH_BUILD && project.rights === "check"));
