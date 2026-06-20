import { expect, test } from "@playwright/test";
import { expectNoHorizontalOverflow, openStablePage, viewports } from "./helpers";

test("desktop navigation exposes bilingual Why Change and Why Us routes", async ({ page }) => {
  await openStablePage(page, "/", { language: "en", theme: "dark", viewport: viewports.desktop });
  const desktopNav = page.locator("header nav.hidden");
  await expect(desktopNav.getByRole("link", { name: "Why Change?" })).toHaveAttribute("href", "/why-change");
  await expect(desktopNav.getByRole("link", { name: "Why Us?" })).toHaveAttribute("href", "/why-us");
  // The old About scroll item is gone from the navbar.
  await expect(desktopNav.getByRole("link", { name: "About" })).toHaveCount(0);
  await expect(desktopNav.getByRole("button", { name: "About" })).toHaveCount(0);

  await page.getByRole("button", { name: "Switch language" }).first().click();
  await expect(desktopNav.getByRole("link", { name: "لماذا التغيير؟" })).toHaveAttribute("href", "/why-change");
  await expect(desktopNav.getByRole("link", { name: "لماذا نحن؟" })).toHaveAttribute("href", "/why-us");
  await expect(desktopNav.getByRole("link", { name: "من أنا" })).toHaveCount(0);
  const switchedAbout = page.locator("#about");
  await switchedAbout.scrollIntoViewIfNeeded();
  await expect(switchedAbout.getByRole("link", { name: "لماذا تحتاج شركتك إلى موقع؟" })).toHaveAttribute("href", "/why-change");
});

test("mobile navigation includes Why Change and Why Us without overflow", async ({ page }) => {
  await openStablePage(page, "/", { language: "ar", theme: "light", viewport: viewports.mobile });
  const mobileNav = page.locator("nav.glass").last();
  await expect(mobileNav.getByRole("link", { name: "لماذا التغيير؟" })).toHaveAttribute("href", "/why-change");
  await expect(mobileNav.getByRole("link", { name: "لماذا نحن؟" })).toHaveAttribute("href", "/why-us");
  await expect(mobileNav.getByRole("link", { name: "من أنا" })).toHaveCount(0);
  await expect(mobileNav.getByRole("link")).toHaveCount(3);
  await expectNoHorizontalOverflow(page);
});

test("About section presents English diagnostic copy and route CTA", async ({ page }) => {
  await openStablePage(page, "/", { language: "en", theme: "light", viewport: viewports.desktop });
  const about = page.locator("#about");
  await about.scrollIntoViewIfNeeded();
  await expect(about.getByRole("heading", { name: "A website is not a page. It is the decision point." })).toBeVisible();
  await expect(about.getByText("That is where the website matters:", { exact: false })).toBeVisible();
  await expect(about.getByRole("link", { name: "Why does your company need a website?" })).toHaveAttribute("href", "/why-change");
});

test("About section presents Arabic diagnostic copy and route CTA", async ({ page }) => {
  await openStablePage(page, "/", { language: "ar", theme: "dark", viewport: viewports.desktop });
  const about = page.locator("#about");
  await about.scrollIntoViewIfNeeded();
  await expect(about.getByRole("heading", { name: "الموقع ليس صفحة. إنه نقطة القرار." })).toBeVisible();
  await expect(about.getByText("هنا يأتي دور الموقع الإلكتروني:", { exact: false })).toBeVisible();
  await expect(about.getByRole("link", { name: "لماذا تحتاج شركتك إلى موقع؟" })).toHaveAttribute("href", "/why-change");
});

test("Why Change route still loads from the new entry point", async ({ page }) => {
  await openStablePage(page, "/why-change", { language: "en", theme: "dark", viewport: viewports.mobile });
  await expect(page.getByRole("heading", { level: 1, name: "Why Change?" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
