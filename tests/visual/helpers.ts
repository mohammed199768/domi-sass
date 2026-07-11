import { expect, type Page } from "@playwright/test";

export type VisualState = {
  language: "en" | "ar";
  theme: "light" | "dark";
  viewport: { width: number; height: number };
  reducedMotion?: "no-preference" | "reduce";
  strictConsole?: boolean;
};

export const viewports = {
  desktop: { width: 1366, height: 768 },
  largeDesktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
  // Tablet / short-viewport coverage. These are >= 768px wide, so with motion
  // allowed they run the horizontal "fit" journey (compact, fitted, NOT vertical
  // scroll). Only the < 768px phone width stays stacked.
  tabletPortrait: { width: 768, height: 1024 },
  tabletPortraitLg: { width: 820, height: 1180 },
  tabletLandscape: { width: 1024, height: 768 },
  tabletLandscapeLg: { width: 1180, height: 820 },
  shortLaptop: { width: 1366, height: 650 },
} as const;

export async function openStablePage(page: Page, route: string, state: VisualState) {
  if (state.strictConsole !== false) {
    page.on("console", (message) => {
      if (message.type() === "error") {
        throw new Error(`Browser console error on ${route}: ${message.text()}`);
      }
    });
    page.on("pageerror", (error) => {
      throw new Error(`Uncaught page error on ${route}: ${error.message}`);
    });
  }

  await page.addInitScript(({ language, theme }) => {
    // Seed a fresh test context once. A reload must exercise saved-theme
    // restoration instead of overwriting the theme selected by the test.
    if (!window.sessionStorage.getItem("domi-visual-state-seeded")) {
      window.localStorage.setItem("domi-language", language);
      window.localStorage.setItem("dominase-theme", theme);
      window.sessionStorage.setItem("domi-visual-state-seeded", "1");
    }
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

  await expect(page.locator("html")).toHaveAttribute("data-theme", state.theme);
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

/**
 * Asserts the horizontal side-scroll journey is active (pinned). GSAP injects a
 * `.pin-spacer` only when it pins the section, so its presence proves the
 * journey is running — this is the M14B guarantee that tablets stay horizontal
 * rather than falling into vertical scroll.
 */
export async function expectHorizontalJourneyActive(page: Page) {
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  // The track is laid out as a horizontal flex row of full-width panels.
  await expect(page.locator("section[aria-label] > div").first()).toHaveClass(/flex-row/);
}

/**
 * Asserts no journey chapter panel is a usable vertical/horizontal scroller —
 * the M14B fit-to-viewport guarantee. Content is scaled to fit with a CSS
 * transform (which does not shrink layout boxes), so we cannot rely on
 * scrollHeight. Instead we verify each panel computes `overflow: hidden` and
 * cannot actually be scrolled (its scrollTop/Left stay 0 after a scroll attempt).
 */
export async function expectNoLocalPanelScrollInHorizontalFit(page: Page) {
  const offenders = await page.evaluate(() => {
    const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-panel]"));
    const bad: string[] = [];
    for (const p of panels) {
      const style = getComputedStyle(p);
      if (style.overflowY === "auto" || style.overflowY === "scroll") {
        bad.push(`${p.dataset.panel}: overflow-y=${style.overflowY}`);
        continue;
      }
      p.scrollTop = 50;
      p.scrollLeft = 50;
      if (p.scrollTop > 0 || p.scrollLeft > 0) {
        bad.push(`${p.dataset.panel}: scrolled to ${p.scrollLeft},${p.scrollTop}`);
      }
      p.scrollTop = 0;
      p.scrollLeft = 0;
    }
    return bad;
  });
  expect(offenders, `journey panels must not be scrollers: ${offenders.join("; ")}`).toEqual([]);
}

/**
 * Asserts every chapter panel is in the given layout mode (via `data-mode`).
 */
export async function expectAllPanelsMode(page: Page, mode: string) {
  const modes = await page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLElement>("[data-panel]")).map((p) => p.dataset.mode),
  );
  expect(modes.length, "expected all seven chapter panels to render").toBeGreaterThanOrEqual(7);
  expect(modes.every((m) => m === mode), `all panels should be mode="${mode}", got ${modes.join(",")}`).toBe(true);
}

/**
 * Asserts no chapter heading is clipped behind the fixed 4rem header or off the
 * bottom of the viewport, for the panel currently in view during the journey.
 */
export async function expectVisiblePanelHeadingUnclipped(page: Page) {
  const box = await page.locator("[data-panel] h1, [data-panel] h2").first().boundingBox();
  expect(box, "a chapter heading should have a layout box").not.toBeNull();
  expect(box!.y, "heading top should sit below the fixed header").toBeGreaterThanOrEqual(56);
  expect(box!.y + box!.height, "heading should not run past the viewport bottom").toBeLessThanOrEqual(
    (await page.evaluate(() => window.innerHeight)) + 1,
  );
}

export async function expectLoadedImage(page: Page, locator: string) {
  const image = page.locator(locator).first();
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBeTruthy();
}
