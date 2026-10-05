import { defineConfig, devices } from "@playwright/test";

/**
 * Browser checks of the BUILT site (working-agreement.md § 2): `bun run build` first, then `bun run e2e`.
 * Tests run against `astro preview` of dist/ (what ships), never `astro dev`.
 */
const PORT = Number(process.env.E2E_PORT ?? 4322);

export default defineConfig({
  testDir: "e2e",
  outputDir: ".cache/e2e-results",
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  timeout: 60_000,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    ...devices["Desktop Chrome"],
    serviceWorkers: "block",
  },
  webServer: {
    command: `bunx astro preview --port ${PORT}`,
    url: `http://localhost:${PORT}/en/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
