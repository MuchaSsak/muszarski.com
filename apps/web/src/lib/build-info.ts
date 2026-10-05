import { execSync } from "node:child_process";

/**
 * Build-time revision for the footer's revision row (design-references.md § Footer): the build date
 * and the short commit. On Vercel the commit comes from the system env; locally from git.
 */
const fromGit = () => {
  try {
    return execSync("git rev-parse HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "";
  }
};

const sha = (process.env.VERCEL_GIT_COMMIT_SHA ?? fromGit()).slice(0, 7);

export const BUILD_INFO = {
  /** ISO date, the drafting convention for a revision (locale-neutral). */
  date: new Date().toISOString().slice(0, 10),
  sha,
} as const;
