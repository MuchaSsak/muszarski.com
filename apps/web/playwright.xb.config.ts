/**
 * Firefox and WebKit (`bun run e2e:xb`, after a build): the functional specs and the layout sweep in both (WebKit's
 * layout caught the CV's QR caption past the edge, 2026-10-08); axe and the text-fit probe in Firefox only. WebKit's
 * text checks stay out: Playwright's Windows WebKit paints variable fonts at the default instance and rounds advances,
 * so wraps at the edge differ from real Safari (memory/run-notes.md). Needs `bunx playwright install firefox webkit`.
 */
import { defineConfig, devices } from "@playwright/test";

import base from "./playwright.config";

export default defineConfig({
  ...base,
  projects: [
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      testMatch: /(pages|chrome|motion|i18n|layout|a11y|text-fit)\.spec\.ts/,
    },
    { name: "webkit", use: { ...devices["Desktop Safari"] }, testMatch: /(pages|chrome|motion|i18n|layout)\.spec\.ts/ },
  ],
});
