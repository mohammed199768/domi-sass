import { expect, type Page } from "@playwright/test";

export type VisualState = {
  language: "en" | "ar";
  theme: "light" | "dark";
  viewport: { width: number; height: number };
  reducedMotion?: "no-preference" | "reduce";
};

export const viewports = {
  desktop: { width: 1366, height: 768 },
  largeDesktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
} as const;

export async function openStablePage(page: Page, route: string, state: VisualState) {
  page.on("console", (message) => {
    if (message.type() === "error") {
      throw new Error(`Browser console error on ${route}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    throw new Error(`Uncaught page error on ${route}: ${error.message}`);
  });

  await page.addInitScript(({ language, theme }) => {
    window.localStorage.setItem("domi-language", language);
    window.localStorage.setItem("theme", theme);
  }, { language: state.language, theme: state.theme });

  await page.setViewportSize(state.viewport);
  await page.emulateMedia({
    colorScheme: state.theme,
    reducedMotion: state.reducedMotion ?? "no-preference",
  });

  const response = await page.goto(route, { waitUntil: "networkidle" });
  expect(response?.ok(), `${route} should return a successful response`).toBeTruthy();

  if (route.startsWith("/work/")) {
    await expect(page.locator(`main[lang="${state.language}"]`)).toBeVisible();
  } else {
    const direction = state.language === "ar" ? "rtl" : "ltr";
    await expect(page.locator(`body > div[dir="${direction}"]`)).toBeVisible();
  }

  await expect(page.locator("html")).toHaveClass(new RegExp(`(^|\\s)${state.theme}(\\s|$)`));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(route === "/" ? 1_400 : 650);
  await page.evaluate(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.waitForTimeout(100);
}

export async function expectCorePageAccessibility(page: Page, workPage = false) {
  await expect(page.locator("h1").first()).toBeVisible();
  if (workPage) {
    await expect(page.getByRole("button", { name: /Switch to English|التبديل إلى العربية/ })).toBeVisible();
  } else {
    await expect(page.getByRole("button", { name: "Switch language" }).first()).toBeVisible();
  }
}

export async function expectNoHorizontalOverflow(page: Page) {
  const isOverflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(isOverflowing, "Page has horizontal overflow").toBe(false);
}

export async function expectLoadedImage(page: Page, locator: string) {
  const image = page.locator(locator).first();
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBeTruthy();
}
