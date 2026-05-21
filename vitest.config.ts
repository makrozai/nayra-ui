import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
import type { UserConfig } from 'vite';

export default mergeConfig(viteConfig as UserConfig, defineConfig({
  test: {
    name: 'unit',
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test-setup.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', 'tests/e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['src/index.ts', 'src/assets/**', '**/*.spec.tsx', 'src/test-setup.ts'],
    },
  },
}));
