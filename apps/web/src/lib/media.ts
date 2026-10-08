import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Whether a file sits in `public/` at build time (every page that asks is prerendered), so a media slot switches on
 * the day its file lands and the build passes before that (design/assets.md). The build runs from `apps/web`; the
 * second root covers a run from the repo root.
 */
const ROOTS = [join(process.cwd(), "public"), join(process.cwd(), "apps", "web", "public")];

export const inPublic = (path: string) => ROOTS.some((root) => existsSync(join(root, path)));
