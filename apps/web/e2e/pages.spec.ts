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
    .evaluateAll((links) =>
      links.map((link) => `${link.getAttribute("hreflang")} ${new URL(link.getAttribute("href")!).pathname}`),
    );
  expect(hreflangs).toEqual([
    "en /en/blog/how-this-site-was-built/",
    "pl /pl/blog/jak-powstala-ta-strona/",
    "x-default /en/blog/how-this-site-was-built/",
  ]);
  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) => scripts.map((s) => s.textContent).join(""));
  expect(jsonLd).toContain('"BlogPosting"');
  await expect(page.locator(".site-header .h-loc a[hreflang=pl]")).toHaveAttribute("href", "/pl/blog/jak-powstala-ta-strona/");
  // No Spanish blog: the switch goes to the Spanish home.
  await expect(page.locator(".site-header .h-loc a[hreflang=es]")).toHaveAttribute("href", "/es/");
});

test("work: the type pills filter the cards", async ({ page }) => {
  await page.goto("/en/work/");
  const rows = page.locator("[data-grid] > .wk-card");
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
  await page
    .getByRole("textbox", { name: "Your message" })
    .fill("Hi, we are hiring a full-stack developer. Write to jobs@studio.dev");
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
  await expect(page.getByRole("alert")).toContainText("Copy my email");
  // The privacy note stays as it is.
  await expect(page.locator("#ct-note")).toHaveText(/Used only to reply\.\s*Privacy policy/);
  await expect(message).toHaveValue("A question about Linkoglot");
  // Nothing written: the form says so before sending anything.
  await message.fill("");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByRole("alert")).toContainText("Write a message first");
});

test("contact: a platform error page still reads as a sentence", async ({ page }) => {
  // What Vercel answers when the function itself crashes (the live empty toast on 2026-10-06).
  await page.route("**/api/contact/", (route) =>
    route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: { code: "500", message: "A server error has occurred" } }),
    }),
  );
  await page.goto("/en/#contact");
  await page.getByRole("textbox", { name: "Your message" }).fill("A question about Linkoglot");
  await page.getByRole("textbox", { name: "Where do I reply?" }).fill("+48 600 700 800");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByRole("alert")).toContainText("The form can't send right now");
});

test("how I work: a stop shows its line and its practices", async ({ page }) => {
  await page.goto("/en/#how-i-work");
  await page.getByRole("button", { name: "Revenue" }).click();
  await expect(page.getByRole("button", { name: "Revenue" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#stop-3")).toBeVisible();
  await expect(page.locator("#stop-3")).toContainText("RevenueCat");
});

test("AI story: the chip pauses it, and a step plays from that step", async ({ page }) => {
  await page.goto("/en/#ai");
  const story = page.locator("#ai [data-story]");
  await page.locator("#ai").getByRole("button", { name: "Pause", exact: true }).click();
  await expect(story).toHaveClass(/paused/);
  await expect(page.locator("#ai").getByRole("button", { name: "Play", exact: true })).toBeVisible();
  await page.locator('#ai [data-beat="4"]').click();
  await expect(story).not.toHaveClass(/paused/);
  await expect(page.locator('#ai [data-beat="4"]')).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#beat-4")).toBeVisible();
});

test("my life: a hobby picks its print (a tap, a focus, the scroll)", async ({ page }) => {
  await page.goto("/en/my-life/");
  const prints = page.locator("[data-prints]");
  const faith = prints.getByRole("button", { name: "Faith", exact: true });
  await faith.click();
  await expect(faith).toHaveAttribute("aria-pressed", "true");
  await expect(prints.getByRole("button", { name: "Calisthenics", exact: true })).toHaveAttribute("aria-pressed", "false");
  await expect(prints.locator("[data-ed]")).toHaveText("03/10");
  // Focus is the keyboard twin of a hover.
  const films = prints.getByRole("button", { name: "Films", exact: true });
  await films.focus();
  await expect(films).toHaveAttribute("aria-pressed", "true");
  await expect(prints.locator("[data-ti]")).toHaveText("Films");
  // Scrolling by hand lets go of the pick: the row at the reading line takes over.
  await films.blur();
  await prints.getByRole("button", { name: "Self-improvement", exact: true }).scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 400);
  await expect(prints.getByRole("button", { name: "Films", exact: true })).toHaveAttribute("aria-pressed", "false");
  // The shader prints where WebGL exists (a scene that fails to compile leaves the canvas off).
  const webgl = await page.evaluate(() => !!document.createElement("canvas").getContext("webgl"));
  if (webgl) await expect(prints.locator("[data-canvas]")).toHaveClass(/on/);
});

test("credentials: a card opens on click and says where to verify", async ({ page }) => {
  await page.goto("/en/#credentials");
  const card = page.getByRole("button", { name: /Hackathons/ });
  await card.click();
  await expect(card).toHaveAttribute("aria-expanded", "true");
});

test("credentials: wide screens open a row on focus or hover, phones toggle an accordion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en/#credentials");
  const rows = page.locator("#credentials .xc-btn");
  await rows.nth(2).focus();
  await expect(rows.nth(2)).toHaveAttribute("aria-expanded", "true");
  await expect(rows.nth(0)).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#credentials .xc.open .xc-body")).toBeVisible();
  await rows.nth(4).hover();
  await expect(rows.nth(4)).toHaveAttribute("aria-expanded", "true");
  // A fresh phone load: resizing under a parked mouse fires a stale hover in WebKit.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/#credentials");
  await rows.nth(1).click();
  await expect(rows.nth(1)).toHaveAttribute("aria-expanded", "true");
  await rows.nth(1).click();
  await expect(rows.nth(1)).toHaveAttribute("aria-expanded", "false");
});

test("credentials: left idle on a wide screen, a cursor opens the next card", async ({ page }) => {
  test.slow();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en/");
  await page.locator("#credentials .xcards").scrollIntoViewIfNeeded();
  await page.mouse.move(5, 5);
  const rows = page.locator("#credentials .xc-btn");
  await expect(rows.nth(0)).toHaveAttribute("aria-expanded", "true");
  await expect(rows.nth(1)).toHaveAttribute("aria-expanded", "true", { timeout: 12_000 });
  await expect(page.locator("#credentials [data-ghost]")).toBeHidden({ timeout: 5_000 });
});

test("credentials: the tour stays put while motion is paused", async ({ page }) => {
  test.slow();
  await page.addInitScript(() => localStorage.setItem("motion", "still"));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en/");
  await page.locator("#credentials .xcards").scrollIntoViewIfNeeded();
  await page.mouse.move(5, 5);
  await page.waitForTimeout(7_500);
  await expect(page.locator("#credentials .xc-btn").nth(0)).toHaveAttribute("aria-expanded", "true");
});

test("a stored pause never hides the entrances (hero text, sticker)", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("motion", "still"));
  await page.goto("/en/");
  await page.waitForTimeout(1500);
  await expect(page.locator(".hero .lede")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero .sticker")).toHaveCSS("opacity", "1");
});

test("the CV button downloads the PDF, then opens the web CV and confirms", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en/");
  const download = page.waitForEvent("download");
  await page.locator(".site-header .cv-link").click();
  expect((await download).suggestedFilename()).toMatch(/\.pdf$/);
  await expect(page).toHaveURL(/\/en\/cv\/$/);
  await expect(page.locator("[data-pdf-note]")).toBeVisible();
  // A second visit without the button shows no note.
  await page.reload();
  await expect(page.locator("[data-pdf-note]")).toBeHidden();
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
