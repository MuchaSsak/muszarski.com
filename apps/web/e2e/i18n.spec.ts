import { expect, test } from "@playwright/test";

import { LOCALIZED, ROUTES } from "./routes";

/** Head + switcher per locale (site/i18n.md, site/seo.md § Metadata rules). */
for (const route of LOCALIZED) {
  const locale = route.split("/")[1]!;

  test(`head ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page).toHaveTitle(/^Mateusz Muszarski – /);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).pathname).toBe(route);
    const hreflangs = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((links) =>
        links.map((link) => `${link.getAttribute("hreflang")} ${new URL(link.getAttribute("href")!).pathname}`),
      );
    expect(hreflangs).toEqual(["en /en/", "pl /pl/", "es /es/", "x-default /en/"]);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test(`switcher ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(route);
    const codes = page.locator(".site-header .h-loc");
    await expect(codes).toHaveAttribute("aria-label", /\S/);
    await expect(codes.locator('a[aria-current="true"]')).toHaveAttribute("hreflang", locale);
    const links = await codes
      .locator("a")
      .evaluateAll((all) => all.map((a) => `${a.getAttribute("href")} ${a.textContent!.replace(/\s+/g, " ").trim()}`));
    expect(links).toEqual(["/en/ EN English", "/pl/ PL Polski", "/es/ ES Español"]);
  });
}

for (const route of ROUTES) {
  test(`no console errors or CSP violations ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error" && !/404 \(Not Found\)/.test(message.text())) errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(String(error)));
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    expect(errors).toEqual([]);
  });
}
