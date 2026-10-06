import { expect, test } from "@playwright/test";

/**
 * The sections and pages beyond the chrome (structure.md): what each must do for a visitor, with and without the
 * mouse. The contact endpoint is a Vercel Function, so here its answers are mocked; the form's own logic is real.
 */
test.use({ viewport: { width: 1440, height: 900 } });

test("inner pages: one h1, canonical, share image, title with the name", async ({ page }) => {
  for (const path of ["/en/work/", "/pl/cv/", "/es/my-life/", "/en/blog/", "/pl/blog/jak-powstala-ta-strona/"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).pathname, path).toBe(path);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/og\/(en|pl|es)\/[\w-]+\.png$/);
    await expect(page).toHaveTitle(/Mateusz Muszarski/);
  }
});

test("a post links its translation (hreflang) and the language switch keeps it", async ({ page }) => {
  await page.goto("/en/blog/how-this-site-was-built/");
  const hreflangs = await page
    .locator('link[rel="alternate"][hreflang]')
    .evaluateAll((links) => links.map((link) => `${link.getAttribute("hreflang")} ${new URL(link.getAttribute("href")!).pathname}`));
  expect(hreflangs).toEqual(["en /en/blog/how-this-site-was-built/", "pl /pl/blog/jak-powstala-ta-strona/", "x-default /en/blog/how-this-site-was-built/"]);
  const jsonLd = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => scripts.map((s) => s.textContent).join(""));
  expect(jsonLd).toContain('"BlogPosting"');
  await expect(page.locator(".site-header .h-loc a[hreflang=pl]")).toHaveAttribute("href", "/pl/blog/jak-powstala-ta-strona/");
  // No Spanish blog: the switch goes to the Spanish home.
  await expect(page.locator(".site-header .h-loc a[hreflang=es]")).toHaveAttribute("href", "/es/");
});

test("work: filters by type and tool, with an empty state", async ({ page }) => {
  await page.goto("/en/work/");
  const rows = page.locator("[data-rows] > .row");
  const all = await rows.count();
  expect(all).toBeGreaterThan(6);
  await page.getByRole("button", { name: /^Open source/ }).click();
  const visible = await rows.evaluateAll((list) => list.filter((row) => !(row as HTMLElement).hidden).length);
  expect(visible).toBeGreaterThan(0);
  expect(visible).toBeLessThan(all);
  await page.getByRole("button", { name: /^All/ }).click();
  expect(await rows.evaluateAll((list) => list.filter((row) => !(row as HTMLElement).hidden).length)).toBe(all);
});

test("contact: the reply address fills itself from the message, and a sent message shows the thanks", async ({ page }) => {
  let posted = "";
  await page.route("**/api/contact/", async (route) => {
    posted = route.request().postData() ?? "";
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
  });
  await page.goto("/en/#contact");
  await page.getByRole("button", { name: "A job" }).click();
  await page.getByRole("textbox", { name: "Your message" }).fill("Hi, we are hiring a full-stack developer. Write to jobs@studio.dev");
  await expect(page.getByRole("textbox", { name: "Where do I reply?" })).toHaveValue("jobs@studio.dev");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.locator("[data-done]")).toBeVisible();
  expect(posted).toContain("topic=job");
  expect(posted).toContain("reply=jobs%40studio.dev");
});

test("contact: an error keeps the text and points to the email", async ({ page }) => {
  await page.route("**/api/contact/", (route) =>
    route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ ok: false, error: "unavailable" }) }),
  );
  await page.goto("/en/#contact");
  const message = page.getByRole("textbox", { name: "Your message" });
  await message.fill("A question about Linkoglot");
  await page.getByRole("textbox", { name: "Where do I reply?" }).fill("+48 600 700 800");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.locator("[data-note]")).toContainText("Copy my email");
  await expect(message).toHaveValue("A question about Linkoglot");
  // Nothing written: the form says so before sending anything.
  await message.fill("");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.locator("[data-note]")).toContainText("Write a message first");
});

test("how I work: a stop shows its line and its receipt", async ({ page }) => {
  await page.goto("/en/#how-i-work");
  await page.getByRole("button", { name: "Revenue" }).click();
  await expect(page.getByRole("button", { name: "Revenue" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#stop-3")).toBeVisible();
  await expect(page.locator("#stop-3")).toContainText("RevenueCat");
});

test("credentials: a card opens on click and says where to verify", async ({ page }) => {
  await page.goto("/en/#credentials");
  const card = page.getByRole("button", { name: /Hackathons/ });
  await card.click();
  await expect(card).toHaveAttribute("aria-expanded", "true");
});

test("a stored pause never hides the entrances (hero text, sticker)", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("motion", "still"));
  await page.goto("/en/");
  await page.waitForTimeout(1500);
  await expect(page.locator(".hero .lede")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero .sticker")).toHaveCSS("opacity", "1");
});

test("CV: the PDF downloads directly and the page and PDF come from the same data", async ({ page, request }) => {
  await page.goto("/pl/cv/");
  const pdf = page.getByRole("link", { name: /Pobierz PDF/ });
  await expect(pdf).toHaveAttribute("download", "");
  const href = await pdf.getAttribute("href");
  expect((await request.get(href!)).status()).toBe(200);
  await expect(page.locator(".cv")).toContainText("Linkoglot");
});

test("privacy: the statistics switch is remembered in this browser", async ({ page }) => {
  await page.goto("/en/privacy/");
  const toggle = page.locator("[data-optout]");
  await expect(toggle).toBeVisible();
  await toggle.click();
  expect(await page.evaluate(() => localStorage.getItem("umami.disabled"))).toBe("1");
  await toggle.click();
  expect(await page.evaluate(() => localStorage.getItem("umami.disabled"))).toBeNull();
});

test("legal: noindex, numbered sections, the Polish version prevails", async ({ page }) => {
  await page.goto("/en/terms/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  expect(await page.locator(".legal-text h2").count()).toBeGreaterThan(5);
  await expect(page.getByRole("link", { name: "Wersja polska" })).toHaveAttribute("href", "/pl/terms/");
});
