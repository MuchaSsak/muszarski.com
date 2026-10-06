/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    locale: import("@package/shared/locales").Locale;
    /** Icons used on this page; the sprite at the end of the body defines each once (IconSprite.astro). */
    icons?: Set<import("~/lib/icons.gen").IconName>;
  }
}

declare module "*.po" {
  import type { Messages } from "@lingui/core";
  export const messages: Messages;
}

interface Window {
  umami?: { track: (event: string, data?: Record<string, string | number>) => void };
}
