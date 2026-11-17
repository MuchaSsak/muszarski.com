/**
 * The side projects on dev.muszarski.com, newest first. Add one = add an entry; the card's thumbnail is the live
 * site in a scaled-down iframe, so the site must allow framing (no `X-Frame-Options: DENY` / `frame-ancestors`).
 */
export interface SideProject {
  name: string;
  /** One short line, in the owner's words. */
  description: string;
  url: string;
}

export const projects: SideProject[] = [
  {
    name: "Denominations Compass",
    description: "A quick Christian quiz to find which denomination you fit into most.",
    url: "https://denom-compass.vercel.app/",
  },
];
