import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from '../vite.config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';
import type { UserConfig } from 'vite';

export default mergeConfig(viteConfig as UserConfig, defineConfig({
  plugins: [
    storybookTest(),
  ],
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    setupFiles: ['.storybook/vitest.setup.ts'],
  },
  optimizeDeps: {
    include: ['@storybook/react-vite', '@storybook/addon-vitest'],
  },
}));
