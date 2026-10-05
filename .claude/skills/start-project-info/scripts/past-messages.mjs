#!/usr/bin/env node
/**
 * The user's own messages from earlier Claude Code sessions in a project: the raw material for its
 * lessons and working agreement (standing rules, corrections, preferences). Reads ONLY the text the
 * user typed (never tool output, files or pasted secrets in tool results) from
 * ~/.claude/projects/<project>/*.jsonl, dedupes it, prints it oldest session first.
 * Ask the user before running it: it is their history.
 *
 *   node scripts/past-messages.mjs [projectDir=.] [--rules] [--max=1500] [--out=file.txt]
 *   --rules  only messages that look like standing rules or corrections ("always", "never", "from now
 *            on", "I want", "don't", "instead", Polish "zawsze", "nigdy"...)
 */
import { createReadStream, existsSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { createInterface } from "node:readline";

const args = process.argv.slice(2);
const flag = (name) => args.find((arg) => arg.startsWith(`--${name}=`))?.split("=")[1];
const project = resolve(args.find((arg) => !arg.startsWith("--")) ?? ".");
const onlyRules = args.includes("--rules");
const max = Number(flag("max") ?? 1500);
const out = flag("out");
const RULEISH =
  /\b(always|never|from now on|remember|don'?t|do not|stop|instead|i want|i don'?t want|make sure|new rule|prefer|should|zawsze|nigdy|pami[eę]taj|nie chc[eę]|chc[eę]|zamiast|musisz)\b/i;

const base = join(process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude"), "projects");
const slug = project.replace(/[^A-Za-z0-9]/g, "-").toLowerCase();
const dir = existsSync(base) ? readdirSync(base).find((name) => name.toLowerCase() === slug) : undefined;
if (!dir) {
  console.error(`No Claude Code history for ${project} (looked for ${slug} in ${base}).`);
  process.exit(1);
}

const files = readdirSync(join(base, dir))
  .filter((name) => name.endsWith(".jsonl"))
  .map((name) => join(base, dir, name))
  .sort((a, b) => statSync(a).mtimeMs - statSync(b).mtimeMs);

const seen = new Set();
const rows = [];
for (const file of files) {
  const session = file.split(/[\\/]/).pop().slice(0, 8);
  // streamed line by line: a long session's transcript passes 500 MB, near V8's string limit
  for await (const line of createInterface({ input: createReadStream(file, "utf8"), crlfDelay: Infinity })) {
    if (!line.includes('"type":"user"')) continue;
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue;
    }
    if (entry.type !== "user" || entry.isMeta || entry.isCompactSummary) continue;
    const content = entry.message?.content;
    const texts = typeof content === "string" ? [content] : Array.isArray(content) ? content.filter((b) => b?.type === "text").map((b) => b.text ?? "") : [];
    for (const raw of texts) {
      const text = raw.trim();
      if (!text || /^<(local-command|command-|system-reminder|ide_)/.test(text) || text.startsWith("This session is being continued")) continue;
      if (text.includes("<task-notification>") || text.startsWith("[Request interrupted")) continue;
      if (onlyRules && !RULEISH.test(text)) continue;
      const key = text.slice(0, 300);
      if (seen.has(key)) continue;
      seen.add(key);
      rows.push(`=== ${session} ${String(entry.timestamp ?? "").slice(0, 16)}\n${text.slice(0, max)}\n`);
    }
  }
}

const report = `${rows.length} message(s) from ${files.length} session(s)\n\n${rows.join("\n")}`;
if (out) {
  writeFileSync(out, report);
  console.log(`${rows.length} message(s) -> ${out}`);
} else process.stdout.write(report);
