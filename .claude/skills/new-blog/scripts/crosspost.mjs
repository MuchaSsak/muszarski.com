#!/usr/bin/env node
/**
 * Cross-posts an English blog post to dev.to (API) and Medium (a paste page), the canonical link always on
 * muszarski.com. The procedure and the owner's steps: ../references/crosspost.md.
 *
 *   node .claude/skills/new-blog/scripts/crosspost.mjs <slug> --plan              the owner's steps (YouTube, Medium)
 *   node .claude/skills/new-blog/scripts/crosspost.mjs <slug>                     print the dev.to markdown (dry run)
 *   node .claude/skills/new-blog/scripts/crosspost.mjs <slug> --out post.md       write it to a file
 *   node .claude/skills/new-blog/scripts/crosspost.mjs <slug> --devto             create or update the dev.to draft
 *   node .claude/skills/new-blog/scripts/crosspost.mjs <slug> --devto --publish   publish (or update) it, then --verify
 *   node .claude/skills/new-blog/scripts/crosspost.mjs <slug> --verify            check the published dev.to copy
 *   node .claude/skills/new-blog/scripts/crosspost.mjs <slug> --youtube <src>=<url-or-id>   record a video's upload
 *   node .claude/skills/new-blog/scripts/crosspost.mjs <slug> --medium <url>      check and record the Medium copy
 *
 * The figures become plain markdown: images from the live page, a Matrix as a table, a Flow as a numbered list, a
 * video as its YouTube embed once the owner uploaded it (unlisted), else its poster linking back. Code blocks are left
 * exactly as written. The page must be deployed first: images are read from the live HTML, so the hashed asset URLs
 * match what dev.to fetches. What went where is kept in ../crosspost.json; a re-run updates the same dev.to article.
 * dev.to needs DEV_TO_API_KEY (repo-root .env). English only: neither platform has language versions of a post.
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..", "..", "..", "..");
const BLOG = join(REPO, "apps", "web", "src", "content", "blog", "en");
const PUBLIC = join(REPO, "apps", "web", "public");
const STATE = join(HERE, "..", "crosspost.json");
const SITE = "https://muszarski.com";
const DEVTO = "https://dev.to/api/articles";
const GAP_DAYS = 3; // seo.md § Syndication: one new post at a time, never a burst

const argv = process.argv.slice(2);
const option = (name) => (argv.includes(name) ? argv[argv.indexOf(name) + 1] : null);
const VALUED = ["--out", "--youtube", "--medium", "--todo", "--done"];
const slug = argv.find((arg, i) => !arg.startsWith("--") && !VALUED.includes(argv[i - 1]));
const mode = {
  plan: argv.includes("--plan"),
  devto: argv.includes("--devto"),
  publish: argv.includes("--publish"),
  verify: argv.includes("--verify"),
  force: argv.includes("--force"),
  out: option("--out"),
  youtube: option("--youtube"),
  medium: option("--medium"),
  mediumPage: argv.includes("--medium-page"),
};
if (!slug) {
  console.error("usage: crosspost.mjs <en-slug> [--plan | --out file.md | --devto [--publish] | --verify | --youtube src=url | --medium url]");
  process.exit(1);
}

const state = existsSync(STATE) ? JSON.parse(readFileSync(STATE, "utf8")) : {};
const entry = (state[slug] ??= {});
const saveState = () => writeFileSync(STATE, `${JSON.stringify(state, null, 2)}\n`);
const today = () => new Date().toISOString().slice(0, 10);
const pageUrl = `${SITE}/en/blog/${slug}/`;
const youtube = (src) => entry.youtube?.[src];
const fail = (message) => {
  console.error(`✗ ${message}`);
  process.exit(1);
};

// ---- recording what the owner did ----------------------------------------------------------------------------------

// Open items show on every new chat's session card (.claude/hooks/session-start.mjs) until cleared.
if (option("--todo")) {
  entry.todo = [...(entry.todo ?? []), option("--todo")];
  saveState();
  console.log(`✓ ${slug}: todo added (${entry.todo.length} open)`);
  process.exit(0);
}
if (option("--done")) {
  const what = option("--done").toLowerCase();
  if (what === "canonical" && entry.medium) entry.medium.canonical = `confirmed by the owner ${today()}`;
  else entry.todo = (entry.todo ?? []).filter((item) => !item.toLowerCase().includes(what));
  if (!entry.todo?.length) delete entry.todo;
  saveState();
  console.log(`✓ ${slug}: "${what}" cleared; open: ${entry.todo?.length ?? 0} todo(s)${entry.medium?.canonical === "unchecked" ? ", Medium canonical unchecked" : ""}`);
  process.exit(0);
}

if (mode.youtube) {
  const [src, value] = mode.youtube.split("=");
  const id = value?.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)?([\w-]{11})(?:[?&#]|$)/)?.[1];
  if (!src || !id) fail(`--youtube wants <src>=<YouTube URL or id>, got "${mode.youtube}"`);
  const res = await fetch(`https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${id}`);
  if (!res.ok) fail(`YouTube ${id} is not embeddable (${res.status}): is it Unlisted or Public, not Private?`);
  entry.youtube = { ...entry.youtube, [src]: id };
  saveState();
  console.log(`✓ ${slug}: ${src} → YouTube ${id} ("${(await res.json()).title}"). Re-run --devto --publish to embed it.`);
  process.exit(0);
}


// ---- the post ------------------------------------------------------------------------------------------------------

if (!existsSync(join(BLOG, `${slug}.mdx`))) fail(`no English post "${slug}" in apps/web/src/content/blog/en/`);
const source = readFileSync(join(BLOG, `${slug}.mdx`), "utf8").replace(/\r\n/g, "\n");
const [, front, rest] = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
const field = (name) => front.match(new RegExp(`^${name}: "?(.*?)"?$`, "m"))?.[1];
const meta = {
  title: field("title"),
  seoTitle: field("seoTitle"),
  description: field("description"),
  tags: (field("tags") ?? "").replace(/^\[|\]$/g, "").split(",").map((tag) => tag.trim()).filter(Boolean),
  sources: [...front.matchAll(/- title: "(.*)"\n\s+url: "(.*)"/g)].map(([, title, url]) => ({ title, url })),
};

/**
 * What Medium's publish screen asks for, always handed to the owner with the paste page [owner 2026-10-11]: the
 * preview title (max 100), the preview subtitle (max 140), the preview image and always all 5 topics [owner
 * 2026-10-12]: the post's tags first, then broad ones. Words come from the post's own frontmatter, cut at a sentence,
 * never rewritten.
 */
const MEDIUM_TOPIC = { "case-study": "Case Study", ai: "Claude", performance: "Web Performance", i18n: "Internationalization", a11y: "Accessibility" };
const MEDIUM_TOPIC_FILL = ["Web Development", "Frontend Development", "Software Development", "Programming", "JavaScript"];
function mediumPublish() {
  const title = [meta.title, meta.seoTitle].find((t) => t && t.length <= 100);
  let subtitle = meta.description ?? "";
  if (subtitle.length > 140) subtitle = subtitle.replace(/^Case study:\s*(\w)/i, (_, c) => c.toUpperCase());
  if (subtitle.length > 140) subtitle = subtitle.slice(0, 141).match(/^.*[.!?](?=\s|$)/)?.[0] ?? `${subtitle.slice(0, 139).replace(/\s+\S*$/, "")}…`;
  const topics = [
    ...new Set([
      ...meta.tags.map((t) => MEDIUM_TOPIC[t] ?? t.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())),
      ...MEDIUM_TOPIC_FILL,
    ]),
  ].slice(0, 5);
  if (!title) fail("no title or seoTitle fits Medium's 100 characters: add a shorter seoTitle");
  return { title, subtitle, topics };
}

/**
 * dev.to tags: lowercase letters and digits, its maximum of 4, always all used [owner 2026-10-12]: the post's tags
 * first, then broad ones. `showdev` is its tag for "I built this".
 */
const DEVTO_TAG = { "case-study": "showdev" };
const DEVTO_TAG_FILL = ["webdev", "frontend", "programming", "javascript"];
const devtoTags = [...new Set([...meta.tags.map((tag) => DEVTO_TAG[tag] ?? tag.replace(/[^a-z0-9]/g, "")), ...DEVTO_TAG_FILL])]
  .filter(Boolean)
  .slice(0, 4);

/**
 * dev.to series: posts about building this site read as one story there [owner 2026-10-11]. A series shows once it
 * has two posts. Comparisons, the legal post, the app and client stories stand alone.
 */
const SERIES = {
  "Building my portfolio": [
    "case-study", "fit-text-to-width-at-build-time", "hover-effects-on-phones", "reduced-motion-and-a-pause-button",
    "contact-form-on-a-static-site", "multilingual-astro-site-with-lingui", "web-cv-and-pdf-from-one-source",
    "llm-wiki-project-memory-for-claude-code", "claude-code-skills-hooks-mcp-subagents", "astro-vs-nextjs-for-a-portfolio",
    "why-my-threejs-portfolio-was-slow-on-mobile",
  ],
};
const series = Object.entries(SERIES).find(([, slugs]) => slugs.includes(slug))?.[0] ?? null;

/**
 * Full AI disclosure [owner 2026-10-11]: dev.to's own label (API `ai_disclosure_level`, "AI-Assisted": he directs and
 * approves every post, Claude Code drafts it) plus the note in words, as DEV's guidelines ask. One note, the very last
 * line of every copy (after Sources) on dev.to and Medium alike, in the owner's words, never reworded [owner 2026-10-12].
 */
const AI_LEVEL = "some_ai";
const AI_NOTE =
  "How this post was made: I wrote it with Claude Code. It drafted the text from my project's wiki, code and notes. " +
  "Just a quick disclaimer for y'all out there :)";

/** Words that only make sense on the site itself (a tab you can tap, "the site you are on"). */
const OFF_SITE = [
  [/ Tap through them\./g, ""],
  [/"The site you are on"/g, '"The site today"'],
];

/** Every video in the post, by its `src` (the key for --youtube), with what the owner needs to upload it. */
const videos = [];
for (const [, tag, attrs] of rest.matchAll(/^\s*<(Film|Clips)\b([\s\S]*?)\/>/gm)) {
  const dir = attrs.match(/dir[=:] ?"([^"]+)"/)?.[1] ?? "/media/case/";
  if (tag === "Film") {
    const src = attrs.match(/src="([^"]+)"/)[1];
    videos.push({ src, dir, kind: "film", name: attrs.match(/title="([^"]+)"/)?.[1], about: attrs.match(/caption="([^"]+)"/)?.[1] });
  } else {
    const caption = attrs.match(/caption="([^"]+)"/)?.[1];
    for (const clip of attrs.matchAll(/\{\s*src: "([^"]+)"([^}]*)\}/g)) {
      videos.push({
        src: clip[1],
        dir: clip[2].match(/dir: "([^"]+)"/)?.[1] ?? dir,
        kind: "clip",
        name: clip[2].match(/name: "([^"]+)"/)?.[1],
        about: clip[2].match(/label: "([^"]+)"/)?.[1] ?? caption,
      });
    }
  }
}

if (mode.medium) {
  const url = mode.medium.split("?")[0];
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (crosspost check)" } });
  const canonical = res.ok ? (await res.text()).match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1] : null;
  entry.medium = { url, published: today(), canonical: canonical ?? "unchecked" };
  saveState();
  writeCopy("medium", url);
  if (canonical && canonical !== pageUrl)
    fail(`Medium canonical is ${canonical}, expected ${pageUrl}: fix it in the story's settings (Advanced → canonical link)`);
  if (canonical) {
    console.log(`✓ Medium copy recorded, canonical → ${canonical}`);
    await shoot(url, "medium");
    process.exit(0);
  }
  // Medium answers bots with a Cloudflare block (403, 2026-10-11); never work around it. Its RSS feed is meant for
  // programs: read the story there, and ask the owner for the one check only a browser can do, the canonical.
  console.log(`! Medium blocks automated visits (${res.status}): checked through the author's RSS feed instead.`);
  const user = url.match(/medium\.com\/(@[\w.-]+)/)?.[1];
  const feed = user ? await (await fetch(`https://medium.com/feed/${user}`)).text() : "";
  const item = feed.split("<item>").slice(1).find((it) => it.includes(meta.title)) ?? "";
  const content = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]>/)?.[1] ?? "";
  const postImages = (rest.match(/^import \w+ from "~\/assets\//gm) ?? []).length; // a floor: a poster may become a video
  const checks = [
    [Boolean(content), "the story is in the feed"],
    [(content.match(/<img/g) ?? []).length >= postImages, `${(content.match(/<img/g) ?? []).length} pictures (the post imports ${postImages})`],
    [videos.every((v) => !youtube(v.src) || content.includes(youtube(v.src))), "every YouTube video embedded"],
    [content.includes("How this post was made"), "the AI note at the end"],
  ];
  for (const [ok, label] of checks) console.log(`${ok ? "✓" : "✗"} ${label}`);
  console.log(`  The owner checks the canonical: open the story → Ctrl+U → Ctrl+F "canonical" → must be ${pageUrl}`);
  process.exit(checks.every(([ok]) => ok) ? 0 : 1);
}

if (mode.plan) {
  printPlan();
  process.exit(0);
}

const html = await (await fetch(pageUrl)).text();
const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
if (canonical !== pageUrl) fail(`the live page's canonical is ${canonical}, expected ${pageUrl}: is the post deployed?`);

if (mode.verify) {
  await verify();
  process.exit(0);
}

if (mode.mediumPage) {
  await mediumPage();
  process.exit(0);
}

/** `import oldSpace from "~/assets/case/old-space.webp"` → oldSpace = the URL the live page serves it at. */
const assets = {};
for (const [, name, file] of rest.matchAll(/^import (\w+) from "~\/assets\/.*?([\w-]+)\.\w+";$/gm)) {
  const hit = html.match(new RegExp(`src="(/_astro/${file.replace(/-/g, "\\-")}\\.[^"]+)"`));
  if (!hit) fail(`${file} is not on the live page: deploy the post first`);
  assets[name] = SITE + hit[1];
}

// Code blocks are set aside before anything is rewritten and put back unchanged at the end.
const code = [];
let body = rest.replace(/^(\s*)(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\2\s*$/gm, (block) => `\u0000${code.push(block) - 1}\u0000`);
body = body.replace(/^import .*;\n/gm, "").trim();
body = OFF_SITE.reduce((text, [from, to]) => text.replace(from, to), body);

// ---- figures → markdown --------------------------------------------------------------------------------------------

const abs = (href) => (href.startsWith("/") ? SITE + href : href);
const img = (alt, src) => `![${alt.replace(/[[\]]/g, "")}](${abs(src)})`;
const em = (text) => `*${text}*`;
const posterOf = (clip) => `${SITE}${clip.dir ?? "/media/case/"}${clip.src}-poster.webp`;

const FIGURES = {
  Film: (p) =>
    youtube(p.src)
      ? [`{% youtube ${youtube(p.src)} %}`, em(p.caption)].join("\n\n")
      : [`[${img(p.title, p.poster)}](${pageUrl}?film)`, `${em(p.caption)} [${p.label} ▶](${pageUrl}?film)`].join("\n\n"),
  Clips: (p) =>
    [
      ...p.clips.map((clip) => [
        youtube(clip.src) ? `{% youtube ${youtube(clip.src)} %}` : `[${img(clip.label, posterOf(clip))}](${pageUrl})`,
        p.clips.length > 1 ? em(clip.name) : "",
      ]),
      p.clips.every((clip) => youtube(clip.src)) ? em(p.caption) : `${em(p.caption)} The clips play on [the original post](${pageUrl}).`,
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
        [`**${step.date}: ${step.title}** (${step.verdict})`, step.image ? img(step.alt, step.image) : "", step.decision ? em(step.decision) : "", step.note]
          .filter(Boolean)
          .join("\n\n"),
      )
      .join("\n\n"),
  Flow: (p) => [p.steps.map((step, i) => `${i + 1}. **${step.title}.** ${step.text}`).join("\n"), p.loop ? em(`↻ ${p.loop}`) : ""].filter(Boolean).join("\n\n"),
  Matrix: (p) =>
    [
      `**${p.caption}**`,
      `| Site | ${p.xLabel} | ${p.yLabel} |\n| --- | --- | --- |\n` + p.points.map((pt) => `| ${pt.name} | ${pt.x} | ${pt.y} |`).join("\n"),
      p.goodLabel ? em(p.goodLabel) : "",
    ]
      .filter(Boolean)
      .join("\n\n"),
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
    if (i >= text.length || text[i] === ">") fail(`<${name}> is not self-closing: add a markdown form to FIGURES`);
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
    props[key] = new Function(...Object.keys(assets), `return (${text.slice(from + 1, i)});`)(...Object.values(assets));
    i++;
  }
}

let markdown = "";
for (let at = 0; at < body.length; ) {
  const next = body.slice(at).search(/^\s*<[A-Z]\w*/m);
  if (next === -1) {
    markdown += body.slice(at);
    break;
  }
  const open = at + next + body.slice(at + next).indexOf("<");
  markdown += body.slice(at, open);
  const element = readElement(body, open);
  if (!FIGURES[element.name]) fail(`no markdown form for <${element.name}>: add one to FIGURES`);
  markdown += FIGURES[element.name](element.props);
  at = element.end;
}

markdown = [
  em(`This post first appeared on [my site](${pageUrl}), where the clips play and the version tabs work.`),
  markdown.replace(/\]\(\//g, `](${SITE}/`).replace(/\n{3,}/g, "\n\n").trim(),
  meta.sources.length ? `## Sources\n\n${meta.sources.map((s) => `- [${s.title}](${s.url})`).join("\n")}` : "",
  `---\n\n${em(AI_NOTE)}`,
]
  .filter(Boolean)
  .join("\n\n");

const leftover = markdown.match(/^\s*<\/?[A-Z][\w.]*/m) ?? markdown.match(/\]\(\/(?!\/)/);
if (leftover) fail(`unconverted markup: ${leftover[0]}`);
markdown = markdown.replace(/\u0000(\d+)\u0000/g, (_, n) => code[n]);

// ---- quality and SEO checks (the same bar for every post) -----------------------------------------------------------

const problems = [];
if (!meta.title || meta.title.length > 128) problems.push(`title must be 1-128 characters for dev.to (${meta.title?.length})`);
if (!meta.description) problems.push("no description in the frontmatter");
if (!devtoTags.length) problems.push("no tags");
const cover = `${SITE}/og/en/blog-${slug}.png`;
const ours = [...new Set([cover, ...[...markdown.matchAll(/\((https:\/\/muszarski\.com[^)\s]*)\)/g)].map((m) => m[1])])];
for (const url of ours) {
  const res = await fetch(url, { method: "HEAD", redirect: "follow" });
  if (!res.ok) problems.push(`${res.status} ${url}`);
}
if (problems.length) fail(`not ready:\n  ${problems.join("\n  ")}`);
const embedded = videos.filter((v) => youtube(v.src)).length;
console.error(
  `✓ ${slug}: ${markdown.length} chars, ${ours.length} own URLs answer, ${code.length} code blocks kept, ` +
    `videos ${embedded}/${videos.length} on YouTube${videos.length > embedded ? " (the rest as posters linking back; --plan)" : ""}`,
);

if (mode.out) writeFileSync(mode.out, `# ${meta.title}\n\n${markdown}\n`);
else if (!mode.devto) console.log(markdown);

// ---- dev.to --------------------------------------------------------------------------------------------------------

if (mode.devto) {
  const known = entry.devto;
  if (mode.publish && !known?.published && !mode.force) {
    const recent = Object.entries(state)
      .filter(([other, e]) => other !== slug && e.devto?.publishedOn)
      .find(([, e]) => (Date.now() - Date.parse(e.devto.publishedOn)) / 864e5 < GAP_DAYS);
    if (recent) fail(`${recent[0]} went out on ${recent[1].devto.publishedOn}: keep new posts ${GAP_DAYS}+ days apart (--force if the owner says so)`);
  }
  const res = await devto(known ? `${DEVTO}/${known.id}` : DEVTO, known ? "PUT" : "POST", {
    article: {
      title: meta.title,
      body_markdown: markdown,
      published: mode.publish || Boolean(known?.published),
      canonical_url: pageUrl,
      description: meta.description,
      tags: devtoTags,
      main_image: cover,
      series,
      ai_disclosure_level: AI_LEVEL,
    },
  });
  const published = Boolean(res.published ?? (mode.publish || known?.published));
  entry.devto = {
    id: res.id,
    url: res.url,
    published,
    publishedOn: known?.publishedOn ?? (published ? today() : undefined),
    updated: today(),
  };
  saveState();
  if (published) writeCopy("devto", res.url);
  console.log(`✓ dev.to ${known ? "updated" : "created"} (${published ? "published" : "draft"}): ${res.url}`);
  if (published && !known?.published) console.log(`  Remind the owner: share ${res.url} on LinkedIn and Facebook.`);
  if (published) await verify();
  else console.log("  Drafts need a login to view: look at it on dev.to (Dashboard → the draft), then --devto --publish.");
}

// ---- helpers -------------------------------------------------------------------------------------------------------

/**
 * The copy's link in the English post's frontmatter (`syndication`), which the post header shows as "Also on" badges
 * and the BlogPosting JSON-LD lists as `sameAs`. The site only shows it after a commit and deploy.
 */
function writeCopy(platform, url) {
  const file = join(BLOG, `${slug}.mdx`);
  const text = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const [, head, body] = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const block = head.match(/^syndication:\n((?: {2}.*\n?)*)/m);
  const links = Object.fromEntries([...(block?.[1] ?? "").matchAll(/^ {2}(\w+): "?([^"\n]+)"?$/gm)].map((m) => [m[1], m[2]]));
  if (links[platform] === url) return;
  links[platform] = url;
  const yaml = `syndication:\n${["devto", "medium"].filter((k) => links[k]).map((k) => `  ${k}: "${links[k]}"`).join("\n")}`;
  const next = block ? head.replace(block[0].replace(/\n$/, ""), yaml) : head.replace(/^(related: .*)$/m, `$1\n${yaml}`);
  if (next === head) fail(`could not write the ${platform} link into ${file}: add "syndication:" by hand`);
  writeFileSync(file, `---\n${next}\n---\n${body}`);
  console.log(`✓ ${platform} link written to apps/web/src/content/blog/en/${slug}.mdx: commit and deploy so the post shows it.`);
}

/** Playwright from apps/web (the repo's e2e dependency). */
async function playwright() {
  const require = createRequire(join(REPO, "apps", "web", "package.json"));
  const mod = await import(pathToFileURL(require.resolve("@playwright/test")).href);
  return mod.chromium ? mod : mod.default;
}

async function devto(url, method, payload) {
  if (!process.env.DEV_TO_API_KEY && existsSync(join(REPO, ".env"))) process.loadEnvFile(join(REPO, ".env"));
  if (!process.env.DEV_TO_API_KEY) fail("DEV_TO_API_KEY is not set (repo-root .env)");
  const res = await fetch(url, {
    method,
    headers: { "api-key": process.env.DEV_TO_API_KEY, "content-type": "application/json", accept: "application/vnd.forem.api-v1+json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) fail(`dev.to ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

/** The published dev.to copy, as a reader and a crawler get it. */
async function verify() {
  const url = entry.devto?.url;
  if (!url || !entry.devto.published) fail("no published dev.to copy recorded: --devto --publish first");
  let page = "";
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url);
    if (res.ok) {
      page = await res.text();
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 3000)); // a fresh article can take a moment to be served
  }
  if (!page) fail(`${url} does not answer`);
  const articleBody = page.split('id="article-body"')[1]?.split("</article>")[0] ?? "";
  const images = [...articleBody.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));
  const broken = [];
  for (const src of images) {
    const res = await fetch(src, { method: "HEAD" });
    if (!res.ok) broken.push(`${res.status} ${src}`);
  }
  const checks = [
    [page.match(/<link rel="canonical" href="([^"]+)"/)?.[1] === pageUrl, `canonical → ${pageUrl}`],
    [/Originally published at/.test(page), `"Originally published at" shown`],
    [broken.length === 0, `${images.length} images load${broken.length ? ` (broken: ${broken.join(", ")})` : ""}`],
    [(articleBody.match(/youtube\.com\/embed/g) ?? []).length >= videos.filter((v) => youtube(v.src)).length, "YouTube embeds present"],
    [!/\{%|\]\(https?:|&lt;[A-Z]\w+/.test(articleBody.replace(/<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>/g, "")), "no raw markdown or liquid left"],
  ];
  for (const [ok, label] of checks) console.log(`${ok ? "✓" : "✗"} ${label}`);
  await shoot(url, "devto");
  if (checks.some(([ok]) => !ok)) process.exit(1);
}

/**
 * Screenshots of a published copy, popups closed: the article on a desktop in slices, and the first screens on a
 * phone. Open every file and look (references/crosspost.md § Look at it): a check passing is not the same as it
 * reading well.
 */
async function shoot(url, platform) {
  const { chromium } = await playwright();
  const dir = join(tmpdir(), "crosspost-shots", slug, platform);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const browser = await chromium.launch();
  const files = [];
  try {
    for (const [device, width, height, slices] of [["desktop", 1280, 900, 30], ["phone", 390, 844, 2]]) {
      const page = await browser.newPage({ viewport: { width, height } });
      await page.goto(url, { waitUntil: "load", timeout: 60000 });
      await page.waitForTimeout(1500);
      // load lazy images and embeds, then drop overlays (dev.to's bottom sheets, Medium's sign-in prompts)
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < total; y += 700) await page.evaluate((top) => scrollTo(0, top), y), await page.waitForTimeout(60);
      await page.evaluate(() => {
        for (const el of document.querySelectorAll("body *")) {
          const style = getComputedStyle(el);
          if (style.position === "fixed" && el.getBoundingClientRect().height > 120 && !el.querySelector("#article-body, article")) el.remove();
        }
        document.documentElement.style.overflow = document.body.style.overflow = "auto";
      });
      // page coordinates (a bounding box is relative to the scrolled viewport)
      const box = await page.evaluate((fallback) => {
        const rect = (document.querySelector("#article-body") ?? document.querySelector("article"))?.getBoundingClientRect();
        return rect ? { y: rect.top + scrollY, height: rect.height } : { y: 0, height: fallback };
      }, total);
      const step = device === "desktop" ? 2400 : height;
      for (let i = 0, y = Math.max(0, box.y - 400); i < slices && y < box.y + box.height; i++, y += step) {
        const file = join(dir, `${device}-${String(i + 1).padStart(2, "0")}.png`);
        await page.screenshot({ path: file, fullPage: true, clip: { x: 0, y, width, height: Math.min(step, box.y + box.height - y + 200) } });
        files.push(file.replace(/\\/g, "/"));
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
  console.log(`  Look at every screenshot before calling it done:\n${files.map((f) => `    ${f}`).join("\n")}`);
}

function printPlan() {
  const lines = [`Cross-posting "${meta.title}" (${pageUrl})`, ""];
  let step = 1;
  lines.push(`${step++}. Search Console → URL Inspection → ${pageUrl} → wait for "URL is on Google" before posting copies.`);
  const missing = videos.filter((v) => !youtube(v.src));
  if (missing.length) {
    lines.push(`${step++}. YouTube (studio.youtube.com → Create → Upload videos), one upload per video, each set to UNLISTED:`);
    for (const v of missing) {
      const file = join(PUBLIC, v.dir, `${v.src}.mp4`).replace(/\\/g, "/");
      lines.push(
        `   • ${v.src}: file ${existsSync(file) ? file : `${file} (missing: use the master)`}${v.kind === "film" ? " (or its sharper master, assets.md)" : ""}`,
        `     Title: ${v.name ?? v.src}`,
        `     Description: ${v.about ? `${v.about.replace(/[.!?]?$/, ".")} ` : ""}Full post: ${pageUrl}`,
        `     "No, it's not made for kids" → Visibility: Unlisted → Save. Send Claude the link.`,
      );
    }
    lines.push(`   Claude records each with: crosspost.mjs ${slug} --youtube <src>=<link>`);
  }
  lines.push(`${step++}. dev.to: Claude runs --devto (draft), you glance at it in Dashboard if you like, then Claude runs --devto --publish.`);
  lines.push(`${step++}. Share the dev.to post on LinkedIn and Facebook (a line or two in your own words + the dev.to link).`);
  lines.push(
    `${step++}. Medium, a few days after dev.to (one new post at a time). Its URL import drops every figure, so paste instead:`,
    `   a. Claude runs: crosspost.mjs ${slug} --medium-page, and gives you the file. Open it in Chrome, Ctrl+A, Ctrl+C.`,
    `   b. medium.com → Write. Click the title line, Ctrl+V. Wait until every picture has loaded in the editor.`,
    `   c. Each YouTube link sits alone on a line: click at its end and press Enter, it turns into the video.`,
    `   d. ··· (top right) → More settings → Advanced settings → "This story was originally published elsewhere"`,
    `      → paste ${pageUrl} → Save. This is the SEO step: never skip it.`,
    `   e. Publish opens "Story preview": fill it exactly like this, then Publish (skip "Submit to a publication"):`,
    ...mediumPublishLines("      "),
    `   f. Send Claude the story's link: it checks the canonical, takes screenshots and records it (--medium <url>).`,
  );
  console.log(lines.join("\n"));
}

/**
 * Medium has no API for new accounts and its URL import drops every figure, so the owner pastes the post instead:
 * a plain page made from dev.to's own render of the same markdown (proven to read well), reshaped for Medium's
 * editor: images unwrapped (dev.to keeps its own copies; Medium copies them again on paste), YouTube embeds as bare
 * links (the owner turns each into an embed), and tables as lists (Medium has no tables).
 */
async function mediumPage() {
  const url = entry.devto?.url;
  if (!url || !entry.devto.published) fail("publish on dev.to first: the Medium page is made from its render");
  const { chromium } = await playwright();
  const browser = await chromium.launch();
  let article;
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    article = await page.$eval("#article-body", (el) => el.innerHTML);
  } finally {
    await browser.close();
  }
  if (!article) fail("could not read the dev.to article body");
  const original = (src) => {
    const tail = src.replace(/&amp;/g, "&").match(/\/(https?%3A%2F%2F[^"?]+)$/)?.[1];
    return tail ? decodeURIComponent(tail) : src;
  };
  const text = (cell) => cell.replace(/<[^>]+>/g, "").trim();
  article = article
    .replace(/<a[^>]+class="anchor"[^>]*>\s*<\/a>/g, "")
    .replace(/<a[^>]+name="[^"]*"[^>]*>\s*<\/a>/g, "")
    .replace(/(src|href)="([^"]+)"/g, (_, attr, value) => `${attr}="${original(value)}"`)
    .replace(/<a[^>]+class="article-body-image-wrapper"[^>]*>(<img[^>]*>)<\/a>/g, "$1")
    // Medium's upload refuses WebP (every picture failed, 2026-10-11) and dev.to only serves WebP: a JPEG through
    // wsrv.nl, the open image proxy. Medium copies each picture on paste, so the proxy only matters for that moment.
    .replace(/(<img[^>]+src=")([^"]+)"/g, (_, head, src) => `${head}https://wsrv.nl/?url=${encodeURIComponent(src)}&amp;output=jpg&amp;q=88"`)
    .replace(/<iframe[^>]+youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})[\s\S]*?<\/iframe>/g, (_, id) => `</p><p>https://youtu.be/${id}</p><p>`)
    .replace(/<div class="table-wrapper[^"]*">|<\/table>\s*<\/div>/g, (m) => (m.startsWith("</table>") ? "</table>" : ""))
    .replace(/<table>([\s\S]*?)<\/table>/g, (_, table) => {
      const rows = [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) => [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((c) => c[1]));
      const [head, ...body] = rows;
      return `<ul>${body
        .map((cells) => `<li><strong>${text(cells[0]) || "—"}</strong>: ${cells.slice(1).map((c, i) => `${text(head[i + 1])} ${c.trim()}`.trim()).join("; ")}</li>`)
        .join("")}</ul>`;
    })
    // Medium's quotes hold one paragraph: a quote with a list (the TL;DR) splits into empty quote bars around every
    // bullet, so it loses the quote; a quote of several paragraphs becomes one, lines kept.
    .replace(/<blockquote>([\s\S]*?)<\/blockquote>/g, (_, inner) =>
      /<(ul|ol)\b/.test(inner)
        ? inner
        : `<blockquote><p>${[...inner.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => m[1].trim()).join("<br>")}</p></blockquote>`,
    )
    .replace(/<p>\s*<\/p>/g, "");
  // whitespace between tags pastes as empty paragraphs; code keeps its line breaks
  article = article
    .split(/(<pre[\s\S]*?<\/pre>)/)
    .map((part) => (part.startsWith("<pre") ? part : part.replace(/>\s+</g, "><")))
    .join("");
  // the AI note, re-set as the very last line (after Sources) in Medium-friendly markup
  const before = article;
  article = `${article.replace(/<hr>(?:<p>)?<em>How this post was made[\s\S]*?<\/em>(?:<\/p>)?/, "")}<hr><p><em>${AI_NOTE}</em></p>`;
  if (article.length >= before.length + AI_NOTE.length) fail("the dev.to AI note was not found to replace: check AI_NOTE's markup");
  const dir = join(tmpdir(), "crosspost-shots", slug);
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "medium.html");
  writeFileSync(
    file,
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${meta.title}</title>` +
      `<style>body{max-width:720px;margin:40px auto;padding:0 16px;font:18px/1.6 Georgia,serif}img{max-width:100%}</style></head>` +
      // the post's share card first: Medium's preview image and lead picture (a PNG, which Medium takes)
      `<body><h1>${meta.title}</h1>\n<p><img src="${SITE}/og/en/blog-${slug}.png" alt="${meta.title}"></p>\n${article}\n</body></html>`,
  );
  const jpegs = [...article.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));
  const bad = [];
  for (const src of jpegs) {
    const res = await fetch(src);
    if (!res.ok || res.headers.get("content-type") !== "image/jpeg") bad.push(`${res.status} ${src}`);
  }
  if (bad.length) fail(`pictures that would not paste:\n  ${bad.join("\n  ")}`);
  const links = (article.match(/https:\/\/youtu\.be\/[\w-]{11}/g) ?? []).length;
  console.log(`✓ Medium page: ${file.replace(/\\/g, "/")}`);
  console.log(`  ${(article.match(/<img/g) ?? []).length} images, ${links} YouTube links to embed, tables turned into lists.`);
  console.log(`  The owner's steps: crosspost.mjs ${slug} --plan (Medium). Always hand him these with the file:`);
  console.log(mediumPublishLines("  ").join("\n"));
}

function mediumPublishLines(indent) {
  const { title, subtitle, topics } = mediumPublish();
  return [
    `${indent}Preview title (${title.length}/100): ${title}`,
    `${indent}Preview subtitle (${subtitle.length}/140): ${subtitle}`,
    `${indent}Preview image: the share card with the title (the first picture; "Change preview image" if Medium picked another)`,
    `${indent}Topics (${topics.length}/5): ${topics.join(", ")}`,
  ];
}
