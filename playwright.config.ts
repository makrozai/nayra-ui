import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:6012/nayra-ui/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'rm -rf serve-dir && mkdir -p serve-dir/nayra-ui && cp -r storybook-static/* serve-dir/nayra-ui/ && python3 -m http.server 6012 -d serve-dir',
    url: 'http://127.0.0.1:6012/nayra-ui/',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
