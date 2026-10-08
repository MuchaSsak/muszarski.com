import { appendFileSync } from "node:fs";

import { expect, type Page, test } from "@playwright/test";

import { INNER_WIDTHS, LOCALIZED, ODD_WIDTHS, ROUTES, WIDTHS } from "./routes";
import { findTextIssues } from "./text-fit";

/** Every declared face loaded, not just the ones already requested: a fitted title measured on the fallback font
 *  reads hundreds of pixels too wide (a busy machine starts the probe before the variable font arrives). */
async function fontsLoaded(page: Page) {
  await page.evaluate(async () => {
    await Promise.all([...document.fonts].map((face) => face.load().catch(() => undefined)));
    await document.fonts.ready;
    await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
  });
  // Fitted titles split into letters after load; let that settle.
  await page.waitForTimeout(200);
}

/**
 * Text fits in every locale at every width (visual-qa.md § Locales): no label wider than its sticker, no word cut in
 * half, nothing past the screen edge, no text on text. `TEXT_FIT_WIDTHS=390,1440` narrows the sweep;
 * `TEXT_FIT_REPORT=<file>` appends every issue as a JSON line and passes (the audit mode).
 */
const only = process.env.TEXT_FIT_WIDTHS?.split(",").map(Number);
const report = process.env.TEXT_FIT_REPORT;

for (const route of ROUTES) {
  const widths = only ?? ((LOCALIZED as readonly string[]).includes(route) ? [...WIDTHS, ...ODD_WIDTHS] : INNER_WIDTHS);
  for (const width of widths) {
    test(`text fit ${width} ${route}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      await page.goto(route);
      await fontsLoaded(page);
      const issues = await page.evaluate(findTextIssues);
      if (report) {
        for (const issue of issues) appendFileSync(report, JSON.stringify({ route, width, ...issue }) + "\n");
        return;
      }
      expect(issues.map((i) => `${i.kind} ${i.px}px ${i.where} "${i.text}"`)).toEqual([]);
    });
  }
}

/** Text the first paint never shows: the open menu and every step of the switchable panels. */
const STATES = [".menu-btn", ".stn", ".beat", ".xc-btn", ".topic", ".pr-name button", "[role='tab']"];
const STATE_ROUTES = [
  ...LOCALIZED,
  "/en/my-life/",
  "/pl/my-life/",
  "/es/my-life/",
  "/en/blog/case-study/",
  "/pl/blog/case-study/",
];
for (const route of STATE_ROUTES) {
  for (const width of only ?? [390, 1440]) {
    test(`text fit states ${width} ${route}`, async ({ page }) => {
      test.setTimeout(120_000);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      await page.goto(route);
      await fontsLoaded(page);
      const found: string[] = [];
      for (const selector of STATES) {
        const count = await page.locator(selector).count();
        for (let i = 0; i < count; i++) {
          const button = page.locator(selector).nth(i);
          if (!(await button.isVisible())) continue;
          await button.evaluate((el: HTMLElement) => el.click());
          await page.waitForTimeout(250);
          const issues = await page.evaluate(findTextIssues);
          for (const issue of issues) {
            const line = `${issue.kind} ${issue.px}px ${issue.where} "${issue.text}"`;
            if (!found.includes(line)) found.push(line);
            if (report) appendFileSync(report, JSON.stringify({ route, width, state: `${selector} #${i}`, ...issue }) + "\n");
          }
          if (selector === ".menu-btn") await page.keyboard.press("Escape");
        }
      }
      if (!report) expect(found).toEqual([]);
    });
  }
}
