import { expect, test } from "@playwright/test";

import { ROUTES, WIDTHS } from "./routes";

/**
 * The layout sweep (working-agreement.md § 2): no horizontal overflow from 320 to 2560, and the
 * content stays inside the 1920 poster cap so nothing smears across an ultrawide screen.
 */
for (const width of WIDTHS) {
  for (const route of ROUTES) {
    test(`layout ${width} ${route}`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, "horizontal overflow (px)").toBeLessThanOrEqual(0);
      const widest = await page.evaluate(() =>
        Math.max(
          ...[...document.querySelectorAll("main :is(h1, h2, h3, p, li, dd)")].map((el) => el.getBoundingClientRect().width),
          0,
        ),
      );
      // 120rem poster cap = 1920 px, minus the gutters.
      expect(widest, "widest text block (px)").toBeLessThanOrEqual(1920);
    });
  }
}
