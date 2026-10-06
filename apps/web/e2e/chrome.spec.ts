import { expect, test } from "@playwright/test";

import { LOCALIZED, WIDTHS } from "./routes";

/**
 * Header + footer (structure.md § Navigation and footer, design.md § Header). The page-level overflow sweep can't see
 * a control spilling out of the header row, so every visible child is checked against the header's box.
 */
for (const width of WIDTHS) {
  for (const route of LOCALIZED) {
    test(`header fits ${width} ${route}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const spills = await page.evaluate(() => {
        const header = document.querySelector("[data-site-header]")!;
        const box = header.getBoundingClientRect();
        const kids = [...header.querySelectorAll<HTMLElement>(":scope > *, .actions > *, .cv-split > *")].filter(
          (el) => getComputedStyle(el).display !== "none" && el.tagName !== "SCRIPT",
        );
        const problems = kids.flatMap((el) => {
          const r = el.getBoundingClientRect();
          return r.right > box.right + 1 || r.left < box.left - 1
            ? [`${el.className} ${Math.round(r.left)}-${Math.round(r.right)}`]
            : [];
        });
        // Neighbours must not overlap (the mark against the actions on phones).
        const row = kids.filter((el) => el.parentElement === header).map((el) => el.getBoundingClientRect());
        for (let i = 1; i < row.length; i++)
          if (row[i]!.left < row[i - 1]!.right - 1) problems.push(`overlap at ${Math.round(row[i]!.left)}`);
        return problems;
      });
      expect(spills).toEqual([]);
      // Name, CV and Contact are always visible (structure.md); the menu button exactly when the nav is hidden.
      await expect(page.locator(".site-header .mark")).toBeVisible();
      await expect(page.locator(".site-header .cv-split-page")).toBeVisible();
      await expect(page.locator(".site-header .btn-acc")).toBeVisible();
      const navVisible = await page.locator(".site-header nav.main").isVisible();
      await expect(page.locator(".site-header .menu-btn")).toBeVisible({ visible: !navVisible });
    });
  }
}

test("the header turns into the bar once the hero name scrolls away", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en/");
  const header = page.locator("[data-site-header]");
  await expect(header).not.toHaveClass(/stuck/);
  await page.mouse.wheel(0, 900);
  await expect(header).toHaveClass(/stuck/);
  await page.evaluate(() => scrollTo(0, 0));
  await expect(header).not.toHaveClass(/stuck/);
});

test("mobile menu opens from the keyboard, holds every link, and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/pl/");
  await page.locator(".menu-btn").focus();
  await page.keyboard.press("Enter");
  const menu = page.locator("#site-menu");
  await expect(menu).toBeVisible();
  const hrefs = await menu.locator("a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(hrefs).toEqual([
    "/pl/#work",
    "/pl/#how-i-work",
    "/pl/#ai",
    "/pl/blog/",
    "/pl/my-life/",
    "/pl/#contact",
    "/files/mateusz-muszarski-cv-pl.pdf",
    "/en/",
    "/pl/",
    "/es/",
  ]);
  await expect(menu.locator("[data-theme-cycle]")).toBeVisible();
  await expect(menu.locator("[data-motion-toggle]")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
});

test("a same-page link in the menu closes it", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/");
  await page.locator(".menu-btn").click();
  await page.locator("#site-menu").getByRole("link", { name: "Work", exact: true }).click();
  await expect(page.locator("#site-menu")).toBeHidden();
});

test("es links to the English blog, marked (EN)", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/es/");
  const blog = page.locator(".site-header nav.main a", { hasText: "Blog" });
  await expect(blog).toHaveAttribute("href", "/en/blog/");
  await expect(blog).toHaveAttribute("hreflang", "en");
  await expect(blog).toHaveText("Blog (EN)");
});

test("the sticky header never covers the focused element", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 700 });
  await page.goto("/en/");
  const header = await page.locator("[data-site-header]").boundingBox();
  const focused = () =>
    page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      // The skip link sits over the header on purpose (it is the first stop and leaves on Enter).
      if (!el || el === document.body || el.closest("[data-site-header], [popover]") || el.matches(".sr-only-focusable"))
        return null;
      const rect = el.getBoundingClientRect();
      return { top: rect.top, name: el.textContent?.trim().slice(0, 30) };
    });
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press("Tab");
    const box = await focused();
    // WebKit scrolls a focused element into view a frame later: wait for the scroll to settle.
    if (box)
      await expect
        .poll(async () => (await focused())?.top ?? Infinity, {
          message: `focus on "${box.name}" sits under the header`,
          timeout: 2000,
        })
        .toBeGreaterThanOrEqual(header!.height - 1);
  }
});

test("footer: 4 labelled columns, rel=me profiles, language codes, revision", async ({ page }) => {
  await page.goto("/en/");
  const footer = page.locator("footer.site-footer");
  await expect(footer.locator(".col-title")).toHaveText(["Work", "Site", "Elsewhere", "Legal"]);
  await expect(footer.locator('a[rel="me"]')).toHaveCount(3);
  await expect(footer.locator(".meta time")).toHaveAttribute("datetime", /^\d{4}-\d{2}-\d{2}$/);
  await expect(footer.locator(".f-loc a")).toHaveCount(3);
});
