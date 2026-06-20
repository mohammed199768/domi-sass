import { expect, test } from "@playwright/test";
import { expectCorePageAccessibility, expectNoHorizontalOverflow, openStablePage, viewports } from "./helpers";

test("why-us English desktop trust story", async ({ page }) => {
  await openStablePage(page, "/why-us", { language: "en", theme: "dark", viewport: viewports.desktop });
  await expectCorePageAccessibility(page);
  await expect(page.getByRole("heading", { level: 1, name: "Why Us?" })).toBeVisible();
  await expect(page.locator("[data-story-id]")).toHaveCount(7);
  await expect(page.locator("[data-process-step]")).toHaveCount(6);
  await expect(page.locator("footer a[href='/why-us']")).toContainText("Why Us?");
  await expect(page.locator(".why-us-button--primary")).toHaveAttribute("href", "/#contact");
  await expect(page.locator(".why-us-button--primary")).toContainText("Start building your website with us");
  await expect(page.locator(".why-us-cta__actions a[href='/work']")).toContainText("View case studies");
  // Reciprocal route back to the Why Change film.
  await expect(page.locator(".why-us-cta__actions a[href='/why-change']")).toContainText("Why Change?");
  await page.waitForTimeout(500);
  await expect(page).toHaveScreenshot("why-us-dark-desktop.png");
});

test("why-us Arabic mobile remains readable", async ({ page }) => {
  await openStablePage(page, "/why-us", { language: "ar", theme: "light", viewport: viewports.mobile });
  await expect(page.getByRole("heading", { level: 1, name: "لماذا نحن؟" })).toBeVisible();
  await expect(page.locator("#why-us-process-title")).toContainText("كيف نعمل معك؟");
  await expect(page.locator("[data-process-step]").first()).toContainText("نفهم المشروع");
  await expect(page.locator(".why-us-button--primary")).toHaveAttribute("href", "/#contact");
  await expect(page.locator(".why-us-button--primary")).toContainText("ابدأ بناء موقعك معنا");
  await expect(page.locator(".why-us-cta__actions a[href='/why-change']")).toContainText("لماذا التغيير؟");
  await expectNoHorizontalOverflow(page);
  await page.waitForTimeout(500);
  await expect(page).toHaveScreenshot("why-us-light-ar-mobile.png");
});

test("why-us supplied images load", async ({ page }) => {
  await openStablePage(page, "/why-us", { language: "en", theme: "light", viewport: viewports.desktop });
  const images = page.locator("img[src*='/assest/whyUs/']");
  await expect(images).toHaveCount(8);
  for (let index = 0; index < 8; index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBeTruthy();
  }
});

test("why-us reduced motion is static and unpinned", async ({ page }) => {
  await openStablePage(page, "/why-us", {
    language: "en",
    theme: "light",
    viewport: viewports.desktop,
    reducedMotion: "reduce",
  });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator("[data-why-us-reveal]").first()).toBeVisible();
  await expect(page.locator("[data-process-path]")).toHaveCSS("stroke-dashoffset", "0px");
});
