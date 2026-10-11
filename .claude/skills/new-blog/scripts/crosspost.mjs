#!/usr/bin/env node
/**
 * Cross-posts an English blog post to dev.to (API) and prepares it for Medium (its import tool), with the canonical
 * link pointing at muszarski.com (seo.md § Syndication). The MDX figures become plain markdown: images from the live
 * page, clips as their poster linking back, a Matrix as a table, a Flow as a numbered list. The page must be deployed
 * first: images are read from the live HTML, so the hashed asset URLs match what dev.to fetches.
 *
 *   node .claude/skills/new-blog/scripts/crosspost.mjs case-study                  print the markdown
 *   node .claude/skills/new-blog/scripts/crosspost.mjs case-study --out post.md    write it to a file
 *   node .claude/skills/new-blog/scripts/crosspost.mjs case-study --devto          create or update a dev.to draft
 *   node .claude/skills/new-blog/scripts/crosspost.mjs case-study --devto --publish
 *
 * dev.to needs DEV_TO_API_KEY (repo-root .env). What went where is kept in ../crosspost.json, so a re-run updates the
 * same dev.to article instead of posting a second one. English only: neither platform has language versions of a post.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..", "..");
const BLOG = join(REPO, "apps", "web", "src", "content", "blog", "en");
const STATE = join(HERE, "..", "crosspost.json");
const SITE = "https://muszarski.com";
const DEVTO = "https://dev.to/api/articles";

const argv = process.argv.slice(2);
const slug = argv.find((arg) => !arg.startsWith("--") && argv[argv.indexOf(arg) - 1] !== "--out");
const outFile = argv.includes("--out") ? argv[argv.indexOf("--out") + 1] : null;
const toDevto = argv.includes("--devto");
const publish = argv.includes("--publish");
if (!slug) {
  console.error("usage: crosspost.mjs <en-slug> [--out file.md] [--devto [--publish]]");
  process.exit(1);
}

/** dev.to tags: lowercase letters and digits, at most 4. `showdev` is its tag for "I built this". */
const DEVTO_TAG = { "case-study": "showdev" };

/** Words that only make sense on the site itself (a tab you can tap, "the site you are on"). */
const OFF_SITE = [
  [/ Tap through them\./g, ""],
  [/"The site you are on"/g, '"The site today"'],
];
const devtoTags = (tags) =>
  [...new Set(tags.map((tag) => DEVTO_TAG[tag] ?? tag.replace(/[^a-z0-9]/g, "")))].filter(Boolean).slice(0, 4);

// ---- the post ------------------------------------------------------------------------------------------------------

const source = readFileSync(join(BLOG, `${slug}.mdx`), "utf8").replace(/\r\n/g, "\n");
const [, front, rest] = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
const field = (name) => front.match(new RegExp(`^${name}: "?(.*?)"?$`, "m"))?.[1];
const meta = {
  title: field("title"),
  description: field("description"),
  cover: field("cover"),
  tags: field("tags").replace(/^\[|\]$/g, "").split(",").map((tag) => tag.trim()),
  sources: [...front.matchAll(/- title: "(.*)"\n\s+url: "(.*)"/g)].map(([, title, url]) => ({ title, url })),
};
const pageUrl = `${SITE}/en/blog/${slug}/`;

const html = await (await fetch(pageUrl)).text();
const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
if (canonical !== pageUrl) throw new Error(`live page canonical is ${canonical}, expected ${pageUrl}`);

/** `import oldSpace from "~/assets/case/old-space.webp"` → oldSpace = the URL the live page serves it at. */
const assets = {};
for (const [, name, file] of rest.matchAll(/^import (\w+) from "~\/assets\/.*?([\w-]+)\.\w+";$/gm)) {
  const hit = html.match(new RegExp(`src="(/_astro/${file.replace(/[-]/g, "\\-")}\\.[^"]+)"`));
  if (!hit) throw new Error(`${file} is not on the live page: deploy the post first`);
  assets[name] = SITE + hit[1];
}
const body = OFF_SITE.reduce((text, [from, to]) => text.replace(from, to), rest.replace(/^import .*;\n/gm, "").trim());

// ---- figures → markdown --------------------------------------------------------------------------------------------

const abs = (href) => (href.startsWith("/") ? SITE + href : href);
const img = (alt, src) => `![${alt.replace(/[[\]]/g, "")}](${abs(src)})`;
const em = (text) => `*${text}*`;
const clipPoster = (clip) => `${SITE}${clip.dir ?? "/media/case/"}${clip.src}-poster.webp`;

const FIGURES = {
  Film: (p) =>
    [`[${img(p.title, p.poster)}](${pageUrl}?film)`, `${em(p.caption)} [${p.label} ▶](${pageUrl}?film)`].join("\n\n"),
  Clips: (p) =>
    [
      ...p.clips.map((clip) => [`[${img(clip.label, clipPoster(clip))}](${pageUrl})`, p.clips.length > 1 ? em(clip.name) : ""]),
      `${em(p.caption)} The clips play on [the original post](${pageUrl}).`,
    ]
      .flat()
      .filter(Boolean)
      .join("\n\n"),
  Shots: (p) =>
    [
      ...p.shots.map((shot) => [img(shot.alt, shot.image), shot.name ? em(shot.tag ? `${shot.name}: ${shot.tag}` : shot.name) : ""]),
      p.caption ? em(p.caption) : "",
    ]
      .flat()
      .filter(Boolean)
      .join("\n\n"),
  Timeline: (p) =>
    p.steps
      .map((step) =>
        [
          `**${step.date}: ${step.title}** (${step.verdict})`,
          step.image ? img(step.alt, step.image) : "",
          step.decision ? em(step.decision) : "",
          step.note,
        ]
          .filter(Boolean)
          .join("\n\n"),
      )
      .join("\n\n"),
  Flow: (p) => [p.steps.map((step, i) => `${i + 1}. **${step.title}.** ${step.text}`).join("\n"), em(`↻ ${p.loop}`)].join("\n\n"),
  Matrix: (p) =>
    [
      `**${p.caption}**`,
      `| Site | ${p.xLabel} | ${p.yLabel} |\n| --- | --- | --- |\n` + p.points.map((pt) => `| ${pt.name} | ${pt.x} | ${pt.y} |`).join("\n"),
      em(p.goodLabel),
    ].join("\n\n"),
  Versions: (p) =>
    [
      `### ${p.title}`,
      ...p.frames.map((frame) =>
        [`**${frame.label}**`, img(frame.alt, frame.image), frame.decision ? em(frame.decision) : "", frame.note].filter(Boolean).join("\n\n"),
      ),
    ].join("\n\n"),
  Breaker: (p) => `> **${p.kicker}: ${p.title}**\n>\n> ${p.text} [${p.cta}](${abs(p.href)})`,
};

/** Reads a self-closing `<Name …/>` starting at `start`: returns its props and where it ends. */
function readElement(text, start) {
  const name = text.slice(start + 1).match(/^\w+/)[0];
  const props = {};
  let i = start + 1 + name.length;
  for (;;) {
    while (/\s/.test(text[i])) i++;
    if (text.startsWith("/>", i)) return { name, props, end: i + 2 };
    const key = text.slice(i).match(/^[\w-]+/)[0];
    i += key.length;
    if (text[i] !== "=") {
      props[key] = true;
      continue;
    }
    i++;
    if (text[i] === '"') {
      const close = text.indexOf('"', i + 1);
      props[key] = text.slice(i + 1, close);
      i = close + 1;
      continue;
    }
    // {expression}: balanced braces, skipping strings
    let depth = 0;
    const from = i;
    for (; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"' || ch === "'" || ch === "`") {
        i = text.indexOf(ch, i + 1);
        continue;
      }
      if (ch === "{") depth++;
      if (ch === "}" && --depth === 0) break;
    }
    const expr = text.slice(from + 1, i);
    props[key] = new Function(...Object.keys(assets), `return (${expr});`)(...Object.values(assets));
    i++;
  }
}

let markdown = "";
for (let at = 0; at < body.length; ) {
  const next = body.slice(at).search(/^<[A-Z]\w*/m);
  if (next === -1) {
    markdown += body.slice(at);
    break;
  }
  markdown += body.slice(at, at + next);
  const element = readElement(body, at + next);
  if (!FIGURES[element.name]) throw new Error(`no markdown for <${element.name}>: add it to FIGURES`);
  markdown += FIGURES[element.name](element.props);
  at = element.end;
}

markdown = [
  em(`This post first appeared on [my site](${pageUrl}), where the clips play and the version tabs work.`),
  markdown.replace(/\]\(\//g, `](${SITE}/`).replace(/\n{3,}/g, "\n\n").trim(),
  meta.sources.length ? `## Sources\n\n${meta.sources.map((s) => `- [${s.title}](${s.url})`).join("\n")}` : "",
]
  .filter(Boolean)
  .join("\n\n");

const leftover = markdown.match(/^<[A-Za-z].*$/m) ?? markdown.match(/\]\(\/(?!\/)/);
if (leftover) throw new Error(`unconverted markup: ${leftover[0]}`);

// every image and link target on our own site must answer
const ours = [...new Set([...markdown.matchAll(/\((https:\/\/muszarski\.com[^)\s]*)\)/g)].map((m) => m[1]))];
const broken = [];
for (const url of ours) {
  const res = await fetch(url, { method: "HEAD", redirect: "follow" });
  if (!res.ok) broken.push(`${res.status} ${url}`);
}
if (broken.length) throw new Error(`broken URLs:\n${broken.join("\n")}`);

const cover = `${SITE}/og/en/blog-${slug}.png`;
console.error(`${slug}: ${markdown.length} chars, ${ours.length} own URLs checked, cover ${cover}`);

if (outFile) writeFileSync(outFile, `# ${meta.title}\n\n${markdown}\n`);
else if (!toDevto) console.log(markdown);

// ---- dev.to --------------------------------------------------------------------------------------------------------

if (toDevto) {
  if (!process.env.DEV_TO_API_KEY && existsSync(join(REPO, ".env"))) process.loadEnvFile(join(REPO, ".env"));
  if (!process.env.DEV_TO_API_KEY) throw new Error("DEV_TO_API_KEY is not set (repo-root .env)");
  const state = existsSync(STATE) ? JSON.parse(readFileSync(STATE, "utf8")) : {};
  const known = state[slug]?.devto;
  const article = {
    title: meta.title,
    body_markdown: markdown,
    published: publish,
    canonical_url: pageUrl,
    description: meta.description,
    tags: devtoTags(meta.tags),
    main_image: cover,
  };
  const res = await fetch(known ? `${DEVTO}/${known.id}` : DEVTO, {
    method: known ? "PUT" : "POST",
    headers: {
      "api-key": process.env.DEV_TO_API_KEY,
      "content-type": "application/json",
      accept: "application/vnd.forem.api-v1+json",
    },
    body: JSON.stringify({ article }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`dev.to ${res.status}: ${JSON.stringify(data)}`);
  state[slug] = {
    ...state[slug],
    devto: { id: data.id, url: data.url, published: data.published ?? publish, updated: new Date().toISOString().slice(0, 10) },
  };
  writeFileSync(STATE, `${JSON.stringify(state, null, 2)}\n`);
  console.log(`dev.to ${known ? "updated" : "created"} (${publish ? "published" : "draft"}): ${data.url}`);
}
