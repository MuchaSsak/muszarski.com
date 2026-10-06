/**
 * The functional specs in Firefox and WebKit (`bun run e2e:xb`, after a build). Layout, axe and screenshot specs stay
 * Chromium-only: Playwright's Windows WebKit paints variable fonts at the default instance (memory/run-notes.md).
 * Needs `bunx playwright install firefox webkit` once.
 */
import { defineConfig, devices } from "@playwright/test";

import base from "./playwright.config";

export default defineConfig({
  ...base,
  projects: [
    { name: "firefox", use: { ...devices["Desktop Firefox"] }, testMatch: /(pages|chrome|theme|motion|i18n)\.spec\.ts/ },
    { name: "webkit", use: { ...devices["Desktop Safari"] }, testMatch: /(pages|chrome|theme|motion|i18n)\.spec\.ts/ },
  ],
});
