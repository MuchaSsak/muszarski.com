#!/usr/bin/env node
/**
 * Wires the start-project-info machinery into a project (idempotent, safe to re-run to update):
 *   1. copies session-start.mjs, wiki-context.mjs, wiki-check.mjs into <project>/.claude/hooks/
 *   2. merges three hooks into <project>/.claude/settings.json (keeps everything else in it):
 *        SessionStart     -> session-start.mjs  (startup, resume, clear, compact: the session card)
 *        UserPromptSubmit -> wiki-context.mjs   (the routed pages for each prompt)
 *        Stop             -> wiki-check.mjs --stop-hook  (code changed without the wiki: block once)
 *   3. adds /CLAUDE.local.md to .gitignore (personal rules are never committed)
 *
 *   node <skill>/scripts/install-hooks.mjs [projectDir=.] [--no-stop] [--dry]
 *
 * --no-stop skips the Stop hook (projects without code, or without git). --dry prints the plan only.
 * Refuses to touch a settings.json it cannot parse (prints the snippet to merge by hand instead).
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const dry = args.includes("--dry");
const noStop = args.includes("--no-stop");
const project = resolve(args.find((arg) => !arg.startsWith("--")) ?? ".");
const SCRIPTS = ["session-start.mjs", "wiki-context.mjs", "wiki-check.mjs"];
const say = (line) => console.log(`${dry ? "[dry] " : ""}${line}`);

const command = (script, extra = "") => `node "\${CLAUDE_PROJECT_DIR:-.}/.claude/hooks/${script}"${extra}`;
const HOOKS = [
  { event: "SessionStart", script: "session-start.mjs", entry: { type: "command", shell: "bash", command: command("session-start.mjs"), timeout: 10 } },
  { event: "UserPromptSubmit", script: "wiki-context.mjs", entry: { type: "command", shell: "bash", command: command("wiki-context.mjs"), timeout: 10 } },
  ...(noStop
    ? []
    : [
        {
          event: "Stop",
          script: "wiki-check.mjs",
          entry: { type: "command", shell: "bash", command: command("wiki-check.mjs", " --stop-hook"), timeout: 30, statusMessage: "Checking the wiki moved with the code..." },
        },
      ]),
];

if (!existsSync(project)) {
  console.error(`No such project directory: ${project}`);
  process.exit(1);
}

// 1. scripts
const hooksDir = join(project, ".claude", "hooks");
if (!dry) mkdirSync(hooksDir, { recursive: true });
for (const script of SCRIPTS) {
  const target = join(hooksDir, script);
  const same = existsSync(target) && readFileSync(target, "utf8") === readFileSync(join(HERE, script), "utf8");
  if (same) say(`= .claude/hooks/${script} (up to date)`);
  else {
    say(`${existsSync(target) ? "~ updated" : "+ added"} .claude/hooks/${script}`);
    if (!dry) copyFileSync(join(HERE, script), target);
  }
}

// 2. settings.json
const settingsFile = join(project, ".claude", "settings.json");
let settings = {};
if (existsSync(settingsFile)) {
  try {
    settings = JSON.parse(readFileSync(settingsFile, "utf8"));
  } catch (error) {
    console.error(`Cannot parse .claude/settings.json (${error.message}). Merge this by hand:`);
    const snippet = {};
    for (const hook of HOOKS) snippet[hook.event] = [{ hooks: [hook.entry] }];
    console.error(JSON.stringify({ hooks: snippet }, null, 2));
    process.exit(1);
  }
}
settings.hooks ??= {};
let changed = false;
for (const hook of HOOKS) {
  const groups = (settings.hooks[hook.event] ??= []);
  const present = groups.some((group) => (group.hooks ?? []).some((h) => String(h.command ?? "").includes(`/.claude/hooks/${hook.script}`)));
  if (present) say(`= ${hook.event} hook already wired`);
  else {
    groups.push({ hooks: [hook.entry] });
    changed = true;
    say(`+ ${hook.event} -> .claude/hooks/${hook.script}`);
  }
}
if (changed && !dry) writeFileSync(settingsFile, `${JSON.stringify(settings, null, 2)}\n`);

// 3. .gitignore
let ignored = false;
try {
  execFileSync("git", ["check-ignore", "-q", "CLAUDE.local.md"], { cwd: project, stdio: "ignore" });
  ignored = true;
} catch {
  ignored = false;
}
const isRepo = (() => {
  try {
    execFileSync("git", ["rev-parse", "--git-dir"], { cwd: project, stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
})();
if (!isRepo) say("- not a git repository: skipped .gitignore (keep CLAUDE.local.md out of any shared copy)");
else if (ignored) say("= CLAUDE.local.md already gitignored");
else {
  say("+ /CLAUDE.local.md added to .gitignore");
  if (!dry) {
    const file = join(project, ".gitignore");
    const before = existsSync(file) ? readFileSync(file, "utf8") : "";
    writeFileSync(file, `${before}${before && !before.endsWith("\n") ? "\n" : ""}# personal Claude Code rules (never committed)\n/CLAUDE.local.md\n`);
  }
}

const at = `CLAUDE_PROJECT_DIR="${project}"`;
say("Done. Test (Git Bash or any POSIX shell):");
say(`  echo '{"source":"compact"}' | ${at} node "${project}/.claude/hooks/session-start.mjs"`);
say(`  ${at} node "${project}/.claude/hooks/wiki-context.mjs" --test "a realistic task in the user's words" "another one"`);
say(`  ${at} node "${project}/.claude/hooks/wiki-check.mjs"`);
say("Hooks load when a session starts: open a new chat to activate them.");
