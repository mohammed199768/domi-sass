import { test, expect, type Page } from "@playwright/test";

/**
 * HOME M15 — contact conversion portal functional tests.
 *
 * These never hit the real Formspree endpoint — the POST is intercepted. Tests
 * run with reduced motion so the portal reveal is instant and the form is
 * immediately interactive (no scroll choreography to wait on).
 */

async function openContact(page: Page, language: "en" | "ar" = "en") {
  await page.addInitScript((lang) => {
    window.localStorage.setItem("domi-language", lang);
    window.localStorage.setItem("theme", "dark");
  }, language);
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator("#contact").scrollIntoViewIfNeeded();
}

test("renders name, phone and company fields (no email/message)", async ({ page }) => {
  await openContact(page);
  await expect(page.locator("#contact-name")).toBeVisible();
  await expect(page.locator("#contact-phone")).toBeVisible();
  await expect(page.locator("#contact-company")).toBeVisible();
  // The focused conversion form intentionally drops the email + message fields.
  await expect(page.locator("#contact form textarea")).toHaveCount(0);
});

test("required validation blocks submit and announces errors", async ({ page }) => {
  let requestSent = false;
  await page.route("**/formspree.io/**", async (route) => {
    requestSent = true;
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });

  await openContact(page);
  await page.locator("#contact button[type=submit]").click();

  await expect(page.locator("#contact-name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#contact-phone")).toHaveAttribute("aria-invalid", "true");
  expect(requestSent, "no network request on invalid submit").toBe(false);
});

test("successful mocked submit shows the success state, reset returns the form", async ({ page }) => {
  await page.route("**/formspree.io/**", async (route) => {
    expect(route.request().method()).toBe("POST");
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
  });

  await openContact(page);
  await page.fill("#contact-name", "Test Client");
  await page.fill("#contact-phone", "+962790000000");
  await page.fill("#contact-company", "Acme Co");
  await page.locator("#contact button[type=submit]").click();

  const success = page.locator("[data-contact-success]");
  await expect(success).toBeVisible();
  await expect(success).toContainText("Your request was sent");

  // "Send another message" resets back to the empty form.
  await success.getByRole("button", { name: "Send another message" }).click();
  await expect(page.locator("#contact-name")).toBeVisible();
  await expect(page.locator("#contact-name")).toHaveValue("");
});

test("Formspree error keeps the user on the page and shows an error", async ({ page }) => {
  await page.route("**/formspree.io/**", async (route) => {
    await route.fulfill({ status: 500, contentType: "application/json", body: "{}" });
  });

  await openContact(page);
  await page.fill("#contact-name", "Test Client");
  await page.fill("#contact-phone", "+962790000000");
  await page.locator("#contact button[type=submit]").click();

  await expect(page.locator("#contact [role=alert]")).toBeVisible();
  await expect(page.locator("#contact-name")).toBeVisible(); // still on the form
});

test("contact action circles have valid whatsapp / tel / mailto hrefs", async ({ page }) => {
  await openContact(page);
  const wa = page.locator("#contact a[href^='https://wa.me/']");
  const tel = page.locator("#contact a[href^='tel:']");
  const mail = page.locator("#contact a[href^='mailto:']");

  await expect(wa).toHaveCount(1);
  await expect(tel).toHaveCount(1);
  await expect(mail).toHaveCount(1);
  await expect(wa).toHaveAttribute("href", /^https:\/\/wa\.me\/\d{6,}$/);
  await expect(tel).toHaveAttribute("href", /^tel:\+\d{6,}$/);
  await expect(mail).toHaveAttribute("href", /^mailto:.+@.+\..+/);
  await expect(wa).toHaveAttribute("aria-label", /.+/);
});

test("Arabic labels render and there is no horizontal overflow on mobile", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("domi-language", "ar");
    window.localStorage.setItem("theme", "dark");
  });
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator("#contact").scrollIntoViewIfNeeded();

  await expect(page.locator("#contact label[for=contact-name]")).toHaveText("الاسم");
  await expect(page.locator("#contact label[for=contact-phone]")).toHaveText("رقم الهاتف");
  await expect(page.locator("#contact label[for=contact-company]")).toHaveText("اسم الشركة");

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow, "homepage should not overflow horizontally on mobile").toBe(false);
});
