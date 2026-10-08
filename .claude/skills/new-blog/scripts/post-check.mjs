#!/usr/bin/env node
/**
 * Reads blog posts the way a reader and a crawler meet them and lists what to fix (the new-blog skill,
 * references/writing.md + references/seo.md). The hard rules (schema limits, dashes, links, PstrykWeb) are already
 * tests in apps/web (content.config.ts, content.test.ts); this adds the judgement calls as numbers.
 *
 *   node .claude/skills/new-blog/scripts/post-check.mjs                 every post, en + pl
 *   node .claude/skills/new-blog/scripts/post-check.mjs en/case-study   one post (and its translation)
 *   node .claude/skills/new-blog/scripts/post-check.mjs --json          machine-readable
 *
 * Levels: ERROR (fix before commit, exit code 1), warn (fix unless there's a reason, say the reason in the report),
 * info (numbers for the report).
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "..");
const BLOG = join(REPO, "apps", "web", "src", "content", "blog");
const argv = process.argv.slice(2);
const asJson = argv.includes("--json");
const wanted = argv.filter((arg) => !arg.startsWith("--")).map((arg) => arg.replace(/\.mdx$/, "").replace(/\\/g, "/"));

const WPM = 220; // apps/web/src/lib/blog.ts
const VISUALS = /^<(Shots|Clips|Flow|Matrix|Timeline|Versions|Breaker)\b/gm;
const PAGES = /^\/(en|pl|es)\/(|#[\w-]+|work\/|cv\/|my-life\/|blog\/)$/;

/** Phrases that read as marketing or as an AI answering a prompt (brand.md § Voice, § Microcopy; lessons). */
const BANNED = {
  en: [
    /\bpassionate\b/i, /\bcrafting\b/i, /\bseamless(ly)?\b/i, /\bgame[- ]changer\b/i, /\bdelve\b/i, /\bdive (in|into)\b/i,
    /\bin this (article|post),? (i|we)('ll| will)\b/i, /\bin conclusion\b/i, /\btakeaways?\b/i, /\bwhat i learned\b/i,
    /\bwhat would i do differently\b/i, /\bnot just a\b/i, /\bmore than a developer\b/i, /\bi don't just\b/i,
    /\bunlock(s|ing)?\b/i, /\belevate(s|d)?\b/i, /\bin today's\b/i, /\bever[- ]evolving\b/i, /\blet's dive\b/i,
    /\bAI-powered\b/i, /\b10x\b/i, /\b(a|the|my|your) r[eé]sum[eé]\b/i,
  ],
  pl: [
    /\bpasjonat/i, /\binnowacyjn/i, /\bnie tylko kode?r/i, /\bpodsumowując\b/i, /^#+ (wnioski|podsumowanie)/im, /\bw tym artykule\b/i,
    /\bzanurzmy się\b/i, /\bczego się nauczyłem\b/i, /\bco zrobiłbym inaczej\b/i, /\bklepacz/i,
  ],
};

const read = (path) => readFileSync(path, "utf8");
const words = (text) => text.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length;

function frontmatter(source) {
  const block = /^---\n([\s\S]*?)\n---\n/.exec(source)?.[1] ?? "";
  const scalar = (key) => new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, "m").exec(block)?.[1];
  const list = (key) =>
    (new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, "m").exec(block)?.[1] ?? "").split(",").map((v) => v.trim()).filter(Boolean);
  return {
    title: scalar("title") ?? "",
    seoTitle: scalar("seoTitle"),
    description: scalar("description") ?? "",
    key: scalar("translationKey") ?? "",
    published: scalar("published"),
    updated: scalar("updated"),
    tags: list("tags"),
    related: list("related"),
    sources: (block.match(/^\s+- title:/gm) ?? []).length,
  };
}

/** The prose a reader reads: no frontmatter, imports, components, code, tables. */
function prose(source) {
  return source
    .replace(/^---\n[\s\S]*?\n---\n/, "")
    .replace(/^import .*$/gm, "")
    .replace(/^```[\s\S]*?^```/gm, "")
    .replace(/^<([A-Z]\w*)[\s\S]*?^\/>|^<([A-Z]\w*)[\s\S]*?^<\/\2>/gm, "")
    .replace(/^\|.*$/gm, "");
}

/** Plain paragraphs (not headings, lists, quotes): the text a reader has to push through in one block. */
function paragraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter((block) => block && !/^(#|[-*] |\d+\. |>|<)/.test(block))
    .map((block) => block.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\s+/g, " "));
}

const sentences = (paragraph) => paragraph.split(/(?<=[.!?])\s+(?=[\p{Lu}"(`*[])/u).filter(Boolean);

const GENERIC = new Set(["index.md", "MEMORY.md", "log.md", "package.json", "settings.json"]);

/** Every repo file a post names in backticks, e.g. `scripts/cv-sheet.mjs`, must still exist (posts drift). */
let fileIndex;
function knownFiles() {
  if (fileIndex) return fileIndex;
  fileIndex = new Set();
  const skip = new Set(["node_modules", ".git", "dist", ".astro", ".cache", ".turbo", "screenshots", "context"]);
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (skip.has(entry.name)) continue;
      if (entry.isDirectory()) walk(join(dir, entry.name));
      else fileIndex.add(entry.name);
    }
  };
  walk(REPO);
  return fileIndex;
}

function check(locale, slug) {
  const path = join(BLOG, locale, `${slug}.mdx`);
  const source = read(path);
  const fm = frontmatter(source);
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, "");
  const noCode = body.replace(/^```[\s\S]*?^```/gm, "");
  const text = prose(source);
  const paras = paragraphs(text);
  const out = [];
  const add = (level, message) => out.push({ level, message });

  // Search result: the <title> is seoTitle ?? title; Google cuts around 60 characters.
  const shown = fm.seoTitle ?? fm.title;
  if (shown.length > 60) add("warn", `search title is ${shown.length} chars (> 60): add or shorten seoTitle`);
  if (fm.description.length > 155) add("warn", `description is ${fm.description.length} chars (> 155, content-model.md)`);
  if (fm.description.length < 110) add("info", `description is ${fm.description.length} chars: room for the query words`);
  if (fm.description.toLowerCase() === fm.title.toLowerCase()) add("ERROR", "description repeats the title");
  if (fm.related.length < 2) add("warn", `${fm.related.length} related posts (aim for 2-3)`);
  if (fm.sources.length === 0) add("warn", "no sources: every outside fact needs a dated source");

  // Opening: one short paragraph that answers the title, then the TL;DR.
  const tldr = body.search(/^> \*\*(TL;DR|W skrócie)\*\*/m);
  if (tldr < 0) add("ERROR", "no TL;DR box (> **TL;DR** or > **W skrócie** + 2-4 bullets)");
  else {
    const lead = paragraphs(prose(body.slice(0, tldr)));
    const leadWords = lead.reduce((sum, p) => sum + words(p), 0);
    if (lead.length === 0) add("warn", "no opening paragraph before the TL;DR");
    if (leadWords > 80) add("warn", `opening is ${leadWords} words before the TL;DR (aim ≤ 70)`);
    const bullets = (body.slice(tldr).match(/^> - /gm) ?? []).length;
    if (bullets > 4) add("warn", `TL;DR has ${bullets} bullets (2-4)`);
  }

  // Headings: questions a reader would ask, short enough for the table of contents.
  const h2 = [...noCode.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  const questions = h2.filter((h) => h.endsWith("?") || /^(limits|ograniczenia|sources|źródła)$/i.test(h));
  if (h2.length < 3) add("warn", `${h2.length} H2 headings`);
  if (questions.length < h2.length) add("warn", `${h2.length - questions.length} H2 not written as a question: ${h2.filter((h) => !questions.includes(h)).join(" | ")}`);
  for (const h of [...noCode.matchAll(/^#{2,3} (.+)$/gm)].map((m) => m[1])) if (h.length > 60) add("warn", `long heading (${h.length}): ${h}`);
  if (/^# /m.test(noCode)) add("ERROR", "an H1 in the body (the page prints the title as H1)");

  // Reading load.
  const total = words(text);
  const minutes = Math.max(1, Math.round(total / WPM));
  const long = paras.filter((p) => words(p) > 90);
  if (long.length) add("warn", `${long.length} paragraph(s) over 90 words (longest ${Math.max(...long.map(words))}): split or cut`);
  const longSentences = paras.flatMap(sentences).filter((s) => words(s) > 35);
  if (longSentences.length) add("warn", `${longSentences.length} sentence(s) over 35 words, e.g. "${longSentences[0].slice(0, 90)}…"`);
  if (minutes > 10) add("warn", `${minutes} min read: cut, or split into two posts`);

  // Something to look at: a figure, a table or a diagram every ~600 words.
  const visuals = (body.match(VISUALS) ?? []).length + (body.match(/!\[[^\]]*\]\(/g) ?? []).length;
  const tables = (body.match(/^\|\s*-{3}/gm) ?? []).length;
  const codeBlocks = (body.match(/^```/gm) ?? []).length / 2;
  const breaks = visuals + tables + codeBlocks;
  if (visuals === 0) add("warn", "no figure (Shots, Clips, Flow, Matrix, Timeline, Versions, Breaker or an image)");
  if (total / Math.max(1, breaks) > 600) add("warn", `${breaks} visual break(s) in ${total} words (aim for one per ~600)`);

  // Pictures need words: every alt says what the picture shows.
  for (const m of body.matchAll(/\balt:\s*"([^"]*)"/g)) {
    if (m[1].trim().length === 0) add("ERROR", "empty alt");
    else if (m[1].length < 20) add("warn", `short alt: "${m[1]}"`);
  }
  const bare = [...body.matchAll(/^```(\w*)$/gm)].filter((m, i) => i % 2 === 0 && m[1] === "").length;
  if (bare) add("info", `${bare} code block(s) without a language`);
  for (const fence of body.matchAll(/^```\w*\n([\s\S]*?)^```/gm)) {
    const lines = fence[1].split("\n").length - 1;
    if (lines > 25) add("warn", `a ${lines}-line code block (show the ≤ 15 lines that matter)`);
  }

  // Links: into the rest of the site (crawlers and readers follow them), and a next step at the end.
  const internal = [...body.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1]);
  const posts = internal.filter((href) => /\/blog\/[\w-]+\//.test(href));
  if (posts.length < 2) add("warn", `${posts.length} link(s) to other posts in the body (aim for 2+)`);
  if (!internal.some((href) => PAGES.test(href.replace(/#.*$/, "")) && !href.includes("/blog/"))) add("warn", "no link to the work, CV, my-life or home page");
  if (!/\]\(\/[^)]*\)/.test(body.slice(-700))) add("warn", "the post ends without a next step (a link in the last lines)");
  for (const m of body.matchAll(/\[(here|tutaj|link|this|this post|ten wpis)\]\(/gi)) add("warn", `vague link text: [${m[1]}]`);

  // Voice (quoted text is someone else's words).
  const own = text.replace(/"[^"\n]*"|„[^”\n]*”|“[^”\n]*”/g, "");
  for (const pattern of BANNED[locale] ?? []) {
    const hit = pattern.exec(own);
    if (hit) add("warn", `banned phrase: "${hit[0]}"`);
  }
  const bangs = (text.match(/[\p{L})]!(\s|$)/gu) ?? []).length;
  if (bangs) add("warn", `${bangs} exclamation mark(s)`);

  // Drift: files the post names must still exist.
  for (const m of body.matchAll(/`([\w@./-]+\.(?:mjs|cjs|ts|tsx|js|astro|json|css|po|md|mdx|yml|yaml))`/g)) {
    // An import specifier names the compiled file (`../lib/contact.js` is contact.ts); generic names belong to other projects.
    const name = basename(m[1]);
    if (!knownFiles().has(name) && !knownFiles().has(name.replace(/\.js$/, ".ts")) && !GENERIC.has(name))
      add("warn", `names a file that no longer exists: ${m[1]}`);
  }

  return { locale, slug, key: fm.key, words: total, minutes, h2: h2.length, visuals, tables, codeBlocks, sources: fm.sources, links: internal.length, updated: fm.updated ?? fm.published, issues: out };
}

const all = ["en", "pl"].flatMap((locale) =>
  readdirSync(join(BLOG, locale)).filter((name) => name.endsWith(".mdx")).map((name) => ({ locale, slug: name.slice(0, -4) })),
);
const keyOf = (post) => frontmatter(read(join(BLOG, post.locale, `${post.slug}.mdx`))).key;
let targets = all;
if (wanted.length) {
  const keys = new Set(all.filter((p) => wanted.includes(`${p.locale}/${p.slug}`) || wanted.includes(p.slug)).map(keyOf));
  targets = all.filter((p) => keys.has(keyOf(p)));
}
const results = targets.map((p) => check(p.locale, p.slug));

// Pairs: the translation tells the same story with the same pictures and sources.
for (const en of results.filter((r) => r.locale === "en")) {
  const pl = results.find((r) => r.locale === "pl" && r.key === en.key);
  if (!pl) continue;
  const note = (message) => pl.issues.push({ level: "warn", message: `vs en: ${message}` });
  if (pl.h2 !== en.h2) note(`${pl.h2} H2 vs ${en.h2}`);
  if (pl.visuals !== en.visuals) note(`${pl.visuals} figures vs ${en.visuals}`);
  if (pl.sources !== en.sources) note(`${pl.sources} sources vs ${en.sources}`);
  if (pl.updated !== en.updated) note(`updated ${pl.updated} vs ${en.updated}`);
  const ratio = pl.words / en.words;
  if (ratio < 0.75 || ratio > 1.25) note(`${pl.words} words vs ${en.words} (${ratio.toFixed(2)}×): a part is missing or added`);
}

if (asJson) console.log(JSON.stringify(results, null, 2));
else {
  for (const r of results) {
    console.log(`\n${r.locale}/${r.slug}  ${r.words} words · ${r.minutes} min · ${r.h2} H2 · ${r.visuals} figures · ${r.tables} tables · ${r.codeBlocks} code · ${r.links} internal links · ${r.sources} sources · updated ${r.updated}`);
    for (const issue of r.issues) console.log(`  ${issue.level.padEnd(5)} ${issue.message}`);
  }
  const count = (level) => results.reduce((sum, r) => sum + r.issues.filter((i) => i.level === level).length, 0);
  console.log(`\n${results.length} posts: ${count("ERROR")} errors, ${count("warn")} warnings`);
}
process.exit(results.some((r) => r.issues.some((i) => i.level === "ERROR")) ? 1 : 0);
