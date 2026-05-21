import { test, expect } from '@playwright/test';

test.describe('Storybook UI', () => {
  test('should load the Storybook manager without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => {
      errors.push(err.message);
    });
    
    // Visit the root Storybook page
    await page.goto('./');
    
    // The sidebar should exist (checking for the Search input or Nayra UI title)
    await expect(page.locator('#storybook-explorer-searchfield')).toBeVisible({ timeout: 10000 });
    
    // Ensure no React #130 errors in manager
    expect(errors.some(e => e.includes('Minified React error #130'))).toBe(false);
  });

  test('should load the Icon Documentation variant without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => {
      console.error('PAGE ERROR CAUGHT:', err.message);
      errors.push(err.message);
    });

    // Visit the specific iframe for the autodocs story
    await page.goto('iframe.html?id=atoms-icon--docs&viewMode=docs');
    
    // The "Icon" title should be visible (Storybook docs generates an h1 with the component name)
    await expect(page.locator('h1.sbdocs-title')).toHaveText(/Icon/, { timeout: 10000 });

    // Wait a moment for rendering and potential errors
    await page.waitForTimeout(1000);

    // Ensure no React errors in iframe
    expect(errors.some(e => e.includes('Minified React error #130'))).toBe(false);
  });

  test('should apply dark mode correctly to the Autodocs wrapper', async ({ page }) => {
    // Visit the iframe with globals=theme:dark
    await page.goto('iframe.html?id=atoms-icon--docs&viewMode=docs&globals=theme:dark');
    
    // Wait for the title to be visible
    const titleLocator = page.locator('h1.sbdocs-title');
    await expect(titleLocator).toBeVisible({ timeout: 10000 });

    // Extract the background color of the wrapper and color of the title
    const wrapperBg = await page.locator('.sbdocs-wrapper').evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    const titleColor = await titleLocator.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    // Dark mode: wrapper must be a dark color (not white).
    // Our CSS sets #0f172a = rgb(15,23,42). Some Chromium builds apply sub-pixel
    // color correction so we check all channels are dark (< 50) instead of exact match.
    expect(wrapperBg).not.toBe('rgb(255, 255, 255)');
    const [wr, wg, wb] = wrapperBg.match(/\d+/g)!.map(Number);
    expect(wr).toBeLessThan(50);
    expect(wg).toBeLessThan(50);
    expect(wb).toBeLessThan(80);

    // Title must be a light color (> 200 on each channel).
    const [tr, tg, tb] = titleColor.match(/\d+/g)!.map(Number);
    expect(tr).toBeGreaterThan(200);
    expect(tg).toBeGreaterThan(200);
    expect(tb).toBeGreaterThan(200);
  });
});
