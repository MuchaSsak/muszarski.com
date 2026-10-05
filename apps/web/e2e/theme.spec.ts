import { expect, type Page, test } from "@playwright/test";

/** Theme switch (design.md § Theme switch): system default, toggle, stored choice before first paint. */
const DARK_PAPER = "rgb(12, 34, 64)";
const LIGHT_PAPER = "rgb(242, 239, 230)";
const bodyBg = () => getComputedStyle(document.body).backgroundColor;
// Colours settle after a 0.01 ms reduced-motion transition, so read them with a poll.
const settle = (page: Page) => expect.poll(() => page.evaluate(bodyBg));

test("follows the system preference by default", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/en/");
  await settle(page).toBe(DARK_PAPER);
  await expect(page.locator(".tb-tools [data-theme-toggle]")).toHaveAttribute("aria-pressed", "true");
});

test("toggle switches, persists, and the stored theme applies before first paint", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/en/");
  const toggle = page.locator(".tb-tools [data-theme-toggle]");
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await settle(page).toBe(DARK_PAPER);

  await page.goto("/pl/", { waitUntil: "domcontentloaded" });
  expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("dark");
  await settle(page).toBe(DARK_PAPER);

  await page.locator(".tb-tools [data-theme-toggle]").click();
  await settle(page).toBe(LIGHT_PAPER);
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
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/en/");
  await page.locator(".tb-tools [data-theme-toggle]").click();
  await settle(page).toBe(DARK_PAPER);
  expect(errors).toEqual([]);
});
