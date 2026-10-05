import { expect, test } from "@playwright/test";

import { LOCALIZED, WIDTHS } from "./routes";

/**
 * Header (title block) + footer (revision block): structure.md § Navigation and footer, slice 1.
 * The page-level overflow sweep can't see content spilling inside a header cell, so each cell is checked.
 */
for (const width of WIDTHS) {
  for (const route of LOCALIZED) {
    test(`title block fits ${width} ${route}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const spills = await page.evaluate(() => {
        const frame = document.querySelector(".tb")!.getBoundingClientRect();
        return [...document.querySelectorAll<HTMLElement>(".tb-cell")]
          .filter((cell) => getComputedStyle(cell).display !== "none")
          .flatMap((cell) => {
            const rect = cell.getBoundingClientRect();
            const problems: string[] = [];
            if (cell.scrollWidth > cell.clientWidth + 1) problems.push(`${cell.className} content ${cell.scrollWidth} > ${cell.clientWidth}`);
            if (rect.right > frame.right + 1) problems.push(`${cell.className} right ${Math.round(rect.right)} > frame ${Math.round(frame.right)}`);
            return problems;
          });
      });
      expect(spills).toEqual([]);
      // Name, CV and Contact are always visible (structure.md); the menu button exactly when the nav is hidden.
      await expect(page.locator(".tb-name")).toBeVisible();
      await expect(page.locator(".tb-actions .cv-split-page")).toBeVisible();
      await expect(page.locator(".tb-contact")).toBeVisible();
      const navVisible = await page.locator(".tb-nav").isVisible();
      await expect(page.locator(".tb-menu")).toBeVisible({ visible: !navVisible });
    });
  }
}

test("mobile menu opens from the keyboard, holds every link, and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/pl/");
  await page.locator(".tb-menu").focus();
  await page.keyboard.press("Enter");
  const menu = page.locator("#site-menu");
  await expect(menu).toBeVisible();
  const hrefs = await menu.locator("a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(hrefs).toEqual(["/pl/work/", "/pl/#how-i-work", "/pl/blog/", "/pl/my-life/", "/files/mateusz-muszarski-cv-pl.pdf", "/en/", "/pl/", "/es/"]);
  await expect(menu.locator("[data-theme-toggle]")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
});

test("es links to the English blog, marked (EN)", async ({ page }) => {
  await page.goto("/es/");
  const blog = page.locator(".tb-nav a", { hasText: "Blog" });
  await expect(blog).toHaveAttribute("href", "/en/blog/");
  await expect(blog).toHaveAttribute("hreflang", "en");
  await expect(blog).toHaveText("Blog (EN)");
});

test("the sticky title block never covers the focused element", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 700 });
  await page.goto("/en/");
  const header = await page.locator(".site-header").boundingBox();
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press("Tab");
    const box = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      // The skip link sits over the header on purpose (it is the first stop and leaves on Enter).
      if (!el || el === document.body || el.closest(".site-header, [popover], .sr-only-focusable") || el.matches(".sr-only-focusable")) return null;
      const rect = el.getBoundingClientRect();
      return { top: rect.top, name: el.textContent?.trim().slice(0, 30) };
    });
    if (box) expect(box.top, `focus on "${box.name}" sits under the header`).toBeGreaterThanOrEqual(header!.height - 1);
  }
});

test("footer: 4 labelled columns, rel=me profiles, revision row", async ({ page }) => {
  await page.goto("/en/");
  const footer = page.locator("footer.site-footer");
  await expect(footer.locator(".rb-column-title")).toHaveText(["Work", "Site", "Elsewhere", "Legal"]);
  const profiles = footer.locator('a[rel="me"]');
  await expect(profiles).toHaveCount(3);
  await expect(footer.locator(".rb-rev-line time")).toHaveAttribute("datetime", /^\d{4}-\d{2}-\d{2}$/);
  await expect(footer.locator(".rb-locales a")).toHaveCount(3);
});
