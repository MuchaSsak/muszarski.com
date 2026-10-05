import { expect, type Page, test } from "@playwright/test";

/** Themes (design.md § Themes): Cobalt by default, the switch cycles Paper → Ink → Cobalt, stored before first paint. */
const BG = { cobalt: "rgb(36, 51, 255)", paper: "rgb(241, 237, 226)", ink: "rgb(11, 12, 17)" };
// Colours settle after a 0.01 ms reduced-motion transition, so read them with a poll.
const bodyBg = (page: Page) => expect.poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor));

test.use({ viewport: { width: 1440, height: 900 } });

test("Cobalt by default, whatever the system preference", async ({ page }) => {
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    await page.goto("/en/");
    await bodyBg(page).toBe(BG.cobalt);
  }
});

test("the switch cycles, persists, and the stored theme applies before first paint", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/");
  const cycle = page.locator(".site-header [data-theme-cycle]");
  await expect(cycle).toHaveAttribute("aria-label", "Change theme: Cobalt");
  await cycle.click();
  await bodyBg(page).toBe(BG.paper);
  await expect(cycle).toHaveAttribute("aria-label", "Change theme: Paper");

  await page.goto("/pl/", { waitUntil: "domcontentloaded" });
  expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("paper");
  await bodyBg(page).toBe(BG.paper);

  await page.locator(".site-header [data-theme-cycle]").click();
  await bodyBg(page).toBe(BG.ink);
  await page.locator(".site-header [data-theme-cycle]").click();
  await bodyBg(page).toBe(BG.cobalt);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBeNull();
});

test("still works when storage is blocked", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("blocked", "SecurityError");
      },
    });
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/");
  await page.locator(".site-header [data-theme-cycle]").click();
  await bodyBg(page).toBe(BG.paper);
  expect(errors).toEqual([]);
});
