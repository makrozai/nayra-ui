import { defineConfig, devices } from '@playwright/test';

// Playwright config for testing against the live `storybook dev` server.
// Usage:
//   pnpm storybook &          # start dev server first
//   pnpm test:playwright:dev  # run tests against it
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false, // dev HMR can be flaky under full parallel load
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:6006/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm storybook',
    url: 'http://localhost:6006/',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
