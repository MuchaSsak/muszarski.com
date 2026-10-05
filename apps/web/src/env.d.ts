/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    locale: import("@package/shared/locales").Locale;
  }
}

declare module "*.po" {
  import type { Messages } from "@lingui/core";
  export const messages: Messages;
}

interface Window {
  umami?: { track: (event: string, data?: Record<string, string | number>) => void };
}
