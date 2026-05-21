import { test, expect } from '@playwright/test';

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────

async function gotoDocsWithTheme(page: Parameters<typeof test>[1]['page'], theme: 'dark' | 'light') {
  await page.goto(
    `iframe.html?id=atoms-icon--docs&viewMode=docs&globals=theme:${theme}`,
  );
  // Wait until the actual docs title is visible (not just the loading skeleton)
  await expect(page.locator('h1.sbdocs-title')).toBeVisible({ timeout: 15000 });
  // Allow Storybook JS + Emotion to finish settling
  await page.waitForTimeout(800);
}

function rgb(r: number, g: number, b: number) {
  return `rgb(${r}, ${g}, ${b})`;
}

// ──────────────────────────────────────────────────────────────────────────────
// Dark mode
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Dark mode — Autodocs', () => {
  test.beforeEach(async ({ page }) => {
    await gotoDocsWithTheme(page, 'dark');
  });

  test('sbdocs-wrapper has dark background', async ({ page }) => {
    const bg = await page.locator('.sbdocs-wrapper').evaluate(
      (el) => window.getComputedStyle(el).backgroundColor,
    );
    expect(bg).toBe(rgb(15, 23, 42)); // #0f172a
  });

  test('sbdocs-wrapper title has light text', async ({ page }) => {
    const color = await page.locator('h1.sbdocs-title').evaluate(
      (el) => window.getComputedStyle(el).color,
    );
    expect(color).toBe(rgb(241, 245, 249)); // #f1f5f9
  });

  test('sbdocs-preview has dark background', async ({ page }) => {
    const bg = await page.locator('.sbdocs-preview').first().evaluate(
      (el) => window.getComputedStyle(el).backgroundColor,
    );
    expect(bg).toBe(rgb(30, 41, 59)); // #1e293b
  });

  test('story canvas (.docs-story) is not white', async ({ page }) => {
    const bg = await page.locator('.docs-story').first().evaluate(
      (el) => window.getComputedStyle(el).backgroundColor,
    );
    // Must NOT be pure white
    expect(bg).not.toBe(rgb(255, 255, 255));
  });

  test('controls: text input has dark background', async ({ page }) => {
    // The text input for the "icon" argument (type=text, not radio)
    const input = page.locator('.docblock-argstable-body input:not([type="radio"])').first();
    const count = await input.count();
    if (count === 0) {
      test.skip(); // No text inputs on this page variant
      return;
    }
    const bg = await input.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor,
    );
    // Must NOT be the default light form background
    expect(bg).not.toBe(rgb(246, 249, 252)); // was the broken value
    expect(bg).not.toBe(rgb(255, 255, 255));
  });

  test('controls: "Set string" buttons have visible text (not transparent)', async ({ page }) => {
    const button = page.locator('.sb-argstableBlock-body button').first();
    const count = await button.count();
    if (count === 0) {
      test.skip();
      return;
    }
    const color = await button.evaluate(
      (el) => window.getComputedStyle(el).color,
    );
    // rgba(0,0,0,0) = invisible — this was the broken value
    expect(color).not.toBe('rgba(0, 0, 0, 0)');
    expect(color).not.toBe('rgb(0, 0, 0)');
  });

  test('canvas toolbar buttons have visible light text', async ({ page }) => {
    // Toolbar buttons (zoom/fullscreen) live in .sbdocs-preview outside .sb-story
    const buttons = page.locator('.sbdocs-preview button:not(.sb-story button)');
    const count = await buttons.count();
    if (count === 0) {
      test.skip();
      return;
    }
    const color = await buttons.first().evaluate(
      (el) => window.getComputedStyle(el).color,
    );
    // rgb(92,101,112) = dark gray barely visible on dark bg — was broken value
    expect(color).not.toBe(rgb(92, 101, 112));
    // Must not be fully transparent
    expect(color).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('html element has data-theme=dark before any story renders', async ({ page }) => {
    // Navigate without waiting for stories — we want to catch early initialization
    await page.goto(
      'iframe.html?id=atoms-icon--docs&viewMode=docs&globals=theme:dark',
      { waitUntil: 'domcontentloaded' },
    );
    // ES modules are deferred and run after DOMContentLoaded.
    // Wait for our URL-parse initialization to set data-theme (max 5s).
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-theme') !== null,
      { timeout: 5000 },
    );
    const theme = await page.evaluate(
      () => document.documentElement.getAttribute('data-theme'),
    );
    expect(theme).toBe('dark');
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Light mode — regression guard
// ──────────────────────────────────────────────────────────────────────────────

test.describe('Light mode — regression guard', () => {
  test.beforeEach(async ({ page }) => {
    await gotoDocsWithTheme(page, 'light');
  });

  test('sbdocs-wrapper has white background', async ({ page }) => {
    const bg = await page.locator('.sbdocs-wrapper').evaluate(
      (el) => window.getComputedStyle(el).backgroundColor,
    );
    expect(bg).toBe(rgb(255, 255, 255)); // #ffffff
  });

  test('sbdocs-wrapper title has dark text', async ({ page }) => {
    const color = await page.locator('h1.sbdocs-title').evaluate(
      (el) => window.getComputedStyle(el).color,
    );
    // Must be a dark color — either our #0f172a or Storybook's default #2e3338.
    // Parsing "rgb(r, g, b)" and checking channels are all below 100.
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    expect(r).toBeLessThan(100);
    expect(g).toBeLessThan(100);
    expect(b).toBeLessThan(100);
  });

  test('controls: text input has light background in light mode', async ({ page }) => {
    const input = page.locator('.docblock-argstable-body input:not([type="radio"])').first();
    const count = await input.count();
    if (count === 0) {
      test.skip();
      return;
    }
    const bg = await input.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor,
    );
    // Must NOT be a dark background in light mode
    expect(bg).not.toBe(rgb(30, 41, 59)); // #1e293b
    expect(bg).not.toBe(rgb(15, 23, 42)); // #0f172a
  });

  test('html element has data-theme=light', async ({ page }) => {
    const theme = await page.evaluate(
      () => document.documentElement.getAttribute('data-theme'),
    );
    expect(theme).toBe('light');
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// ButtonTest — Autodocs (additional coverage)
// ──────────────────────────────────────────────────────────────────────────────

test.describe('ButtonTest Autodocs — dark mode', () => {
  test('renders without React errors in dark mode', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(
      'iframe.html?id=atoms-buttontest--docs&viewMode=docs&globals=theme:dark',
    );
    await expect(page.locator('h1.sbdocs-title')).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(500);

    expect(errors.some((e) => e.includes('Minified React error'))).toBe(false);

    const bg = await page.locator('.sbdocs-wrapper').evaluate(
      (el) => window.getComputedStyle(el).backgroundColor,
    );
    expect(bg).toBe(rgb(15, 23, 42));
  });
});
