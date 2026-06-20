import { test, expect } from '@playwright/test';

test.describe('M12 Navigation and SEO', () => {
  test('header contains /work link on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    
    const workLink = page.locator('nav.hidden.lg\\:flex >> text=Case Studies');
    await expect(workLink).toBeVisible();
    await expect(workLink).toHaveAttribute('href', '/work');
  });

  test('mobile nav contains /work link', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    const mobileLink = page.locator('nav.glass').last().locator('a:has-text("Case Studies")');
    await expect(mobileLink).toBeVisible();
    await expect(mobileLink).toHaveAttribute('href', '/work');
  });

  test('/work page contains all four case-study links and JSON-LD', async ({ page }) => {
    await page.goto('/work');
    
    const links = [
      '/work/manal-alhihi',
      '/work/qasr-alfarah',
      '/work/curevie',
      '/work/horvath-survey'
    ];

    for (const link of links) {
      // Use .first() as there are mobile and desktop cards
      await expect(page.locator(`a[href="${link}"]`).first()).toBeVisible();
    }

    const script = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(script).toBeTruthy();
    const jsonLd = JSON.parse(script!);
    expect(jsonLd['@type']).toBe('CollectionPage');
    expect(jsonLd.mainEntity.itemListElement).toHaveLength(4);
  });

  test('/work/[slug] has JSON-LD script', async ({ page }) => {
    await page.goto('/work/curevie');
    const script = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(script).toBeTruthy();
    const jsonLd = JSON.parse(script!);
    expect(jsonLd['@type']).toBe('CreativeWork');
    expect(jsonLd.name).toBeTruthy();
  });
});
