import { test, expect, type Page } from "@playwright/test";

/**
 * /contact — contact orbit + message form functional tests.
 *
 * The conversion form moved from the homepage portal (HOME M15) to the
 * dedicated /contact page: six orbit actions around the DOMINASE hub, with a
 * Message action that reveals the same Formspree form below the orbit.
 *
 * These never hit the real Formspree endpoint — the POST is intercepted. Tests
 * run with reduced motion so the orbit is static and the reveal is instant.
 */

async function openContact(page: Page, language: "en" | "ar" = "en") {
  await page.addInitScript((lang) => {
    window.localStorage.setItem("domi-language", lang);
    window.localStorage.setItem("theme", "dark");
  }, language);
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/contact", { waitUntil: "networkidle" });
}

/** Clicks the orbit's Message action and waits for the revealed form section. */
async function openMessageForm(page: Page) {
  await page.locator("button[aria-controls=contact-message]").click();
  await expect(page.locator("#contact-message")).toBeVisible();
}

test("orbit renders and Message reveals name, phone and company fields (no email/message)", async ({ page }) => {
  await openContact(page);
  await expect(page.locator("#contact-message")).toHaveCount(0); // hidden until requested
  await openMessageForm(page);
  await expect(page.locator("#contact-name")).toBeVisible();
  await expect(page.locator("#contact-phone")).toBeVisible();
  await expect(page.locator("#contact-company")).toBeVisible();
  // The focused conversion form intentionally drops the email + message fields.
  await expect(page.locator("#contact-message form textarea")).toHaveCount(0);
});

test("required validation blocks submit and announces errors", async ({ page }) => {
  let requestSent = false;
  await page.route("**/formspree.io/**", async (route) => {
    requestSent = true;
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });

  await openContact(page);
  await openMessageForm(page);
  await page.locator("#contact-message button[type=submit]").click();

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
  await openMessageForm(page);
  await page.fill("#contact-name", "Test Client");
  await page.fill("#contact-phone", "+962790000000");
  await page.fill("#contact-company", "Acme Co");
  await page.locator("#contact-message button[type=submit]").click();

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
  await openMessageForm(page);
  await page.fill("#contact-name", "Test Client");
  await page.fill("#contact-phone", "+962790000000");
  await page.locator("#contact-message button[type=submit]").click();

  await expect(page.locator("#contact-message [role=alert]")).toBeVisible();
  await expect(page.locator("#contact-name")).toBeVisible(); // still on the form
});

test("orbit actions have valid whatsapp / tel / mailto / profile hrefs", async ({ page }) => {
  await openContact(page);
  const orbit = page.getByRole("group");
  const wa = orbit.locator("a[href^='https://wa.me/']");
  const tel = orbit.locator("a[href^='tel:']");
  const mail = orbit.locator("a[href^='mailto:']");
  const github = orbit.locator("a[href*='github.com']");
  const upwork = orbit.locator("a[href*='upwork.com']");

  await expect(wa).toHaveCount(1);
  await expect(tel).toHaveCount(1);
  await expect(mail).toHaveCount(1);
  await expect(github).toHaveCount(1);
  await expect(upwork).toHaveCount(1);
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
  await page.goto("/contact", { waitUntil: "networkidle" });

  await page.locator("button[aria-controls=contact-message]").click();
  await expect(page.locator("#contact-message label[for=contact-name]")).toHaveText("الاسم");
  await expect(page.locator("#contact-message label[for=contact-phone]")).toHaveText("رقم الهاتف");
  await expect(page.locator("#contact-message label[for=contact-company]")).toHaveText("اسم الشركة");

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow, "/contact should not overflow horizontally on mobile").toBe(false);
});
