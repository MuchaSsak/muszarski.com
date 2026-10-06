import type { APIRoute, GetStaticPaths } from "astro";

import { SPRITE_HASH, spriteSvg } from "~/lib/sprite";

export const getStaticPaths = (() => [{ params: { hash: SPRITE_HASH } }]) satisfies GetStaticPaths;

export const GET: APIRoute = () => new Response(spriteSvg(), { headers: { "Content-Type": "image/svg+xml" } });
