import type { APIRoute } from "astro";

import { CV } from "~/data/cv";
import { visibleProjects } from "~/data/projects";
import { ELSEWHERE, SITE } from "~/data/site";
import { postPath, postsIn } from "~/lib/posts";

/**
 * /llms.txt (seo.md § Crawl): a plain-text summary for AI assistants and screeners, generated from the same data as
 * the CV and the work index, so it can't drift from the site.
 */
export const GET: APIRoute = async ({ site }) => {
  const origin = (site ?? new URL("http://localhost:4321")).origin;
  const posts = await postsIn("en");
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${CV.title.en}.`,
    "",
    CV.summary.en,
    "",
    `Location: ${CV.location.en}. Languages: ${CV.languages.map((l) => `${l.name.en} (${l.level.en})`).join(", ")}.`,
    `Contact: ${SITE.email}. Profiles: ${ELSEWHERE.map((p) => `${p.label} ${p.href}`).join(", ")}.`,
    "",
    "## Pages",
    "",
    `- [Home](${origin}/en/): who he is, selected work, how he works, AI workflow, credentials, contact`,
    `- [All projects](${origin}/en/work/)`,
    `- [CV](${origin}/en/cv/) (PDF: ${origin}/files/mateusz-muszarski-cv-en.pdf)`,
    `- [Blog](${origin}/en/blog/)`,
    `- [My life](${origin}/en/my-life/)`,
    "",
    "## Work",
    "",
    ...visibleProjects().map((p) => `- ${p.name} (${p.year}): ${p.line.en}`),
    "",
    "## Writing",
    "",
    ...posts.map((post) => `- [${post.data.title}](${origin}${postPath(post)}): ${post.data.description}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
