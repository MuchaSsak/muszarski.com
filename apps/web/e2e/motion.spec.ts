import { expect, test } from "@playwright/test";

/**
 * Motion safety (requirements.md F19, design.md § Motion): one control (menu, footer) pauses every loop and is
 * remembered; reduced motion gets the final state with no letter accordion, no marquee and no pause button; the fitted name stays flush.
 */
test.use({ viewport: { width: 1440, height: 900 } });

test("the fitted name fills its line, before and after the accordion starts", async ({ page }) => {
  await page.goto("/en/");
  await page.evaluate(() => document.fonts.ready);
  const measure = () =>
    page.evaluate(() => {
      const h1 = document.querySelector("#hero-title")!;
      const host = h1.parentElement!.getBoundingClientRect().width;
      return [...h1.querySelectorAll(".line")].map((line) => line.getBoundingClientRect().width / host);
    });
  for (const share of await measure()) expect(share).toBeGreaterThan(0.97);
  // The accordion waits for the reader's first move (a load-time loop costs main-thread time on phones).
  await page.waitForTimeout(600);
  await expect(page.locator("#hero-title .ch")).toHaveCount(0);
  await page.mouse.move(400, 300);
  await expect(page.locator("#hero-title .ch").first()).toBeAttached({ timeout: 5000 });
  for (const share of await measure()) {
    expect(share).toBeGreaterThan(0.97);
    expect(share).toBeLessThanOrEqual(1.005);
  }
  // Screen readers get the name once, not letter by letter.
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Mateusz Muszarski");
});

test("pause motion stops loops everywhere and is remembered", async ({ page }) => {
  await page.goto("/en/");
  const toggle = page.locator("footer [data-motion-toggle]");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(toggle).toHaveText("Play motion");
  const state = await page.evaluate(() => getComputedStyle(document.querySelector(".band .track")!).animationPlayState);
  expect(state).toBe("paused");

  await page.goto("/pl/", { waitUntil: "domcontentloaded" });
  expect(await page.evaluate(() => document.documentElement.classList.contains("still"))).toBe(true);
  await page.locator("footer [data-motion-toggle]").click();
  expect(await page.evaluate(() => localStorage.getItem("motion"))).toBeNull();
});

test("reduced motion: final state, no accordion, no marquee, no pause button", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/");
  await page.waitForTimeout(2000);
  await expect(page.locator("#hero-title .ch")).toHaveCount(0);
  await expect(page.locator("[data-band]")).not.toHaveClass(/running/);
  await expect(page.locator("footer [data-motion-toggle]")).toBeHidden();
  await expect(page.locator(".hero .lede")).toHaveCSS("opacity", "1");
});
