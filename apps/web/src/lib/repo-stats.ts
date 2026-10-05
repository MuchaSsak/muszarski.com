import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";

/**
 * The AI section's numbers, counted from this repo at build time (placeholders.md P19: generate, never hand-type).
 * The repo root is found by walking up from the working directory to the folder that holds `.claude/project-info`.
 * A build without the `.claude` folder gets `null` and the section shows the steps without numbers.
 */
export interface RepoStats {
  wikiPages: number;
  hooks: number;
  skills: number;
  lessons: number;
}

function repoRoot(): string | null {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (existsSync(join(dir, ".claude", "project-info"))) return dir;
    const up = dirname(dir);
    if (up === dir) break;
    dir = up;
  }
  return null;
}

function markdownFiles(dir: string, skip: string): number {
  let count = 0;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name !== skip) count += markdownFiles(path, skip);
    } else if (name.endsWith(".md")) count += 1;
  }
  return count;
}

let cached: RepoStats | null | undefined;

export function repoStats(): RepoStats | null {
  if (cached !== undefined) return cached;
  const root = repoRoot();
  if (!root) return (cached = null);
  const claude = join(root, ".claude");
  // The wiki without its raw research notes (research/ is unrouted, wiki README).
  const wikiPages = markdownFiles(join(claude, "project-info"), "research");
  const settings = JSON.parse(readFileSync(join(claude, "settings.json"), "utf8")) as {
    hooks?: Record<string, { hooks: unknown[] }[]>;
  };
  const hooks = Object.values(settings.hooks ?? {}).reduce((sum, groups) => sum + groups.reduce((n, g) => n + g.hooks.length, 0), 0);
  const skills = readdirSync(join(claude, "skills")).filter((name) => existsSync(join(claude, "skills", name, "SKILL.md"))).length;
  // One rule per top-level bullet under "## Rules".
  const lessonsText = readFileSync(join(claude, "project-info", "lessons.md"), "utf8");
  const rules = lessonsText.split(/^## Rules/m)[1] ?? "";
  const lessons = rules.split("\n").filter((line) => line.startsWith("- ")).length;
  return (cached = { wikiPages, hooks, skills, lessons });
}

/** The MCP servers this site was built with (user-level config, not in the repo; named, not counted). */
export const MCP_SERVERS = ["Mobbin", "Component registry", "Playwright"] as const;
