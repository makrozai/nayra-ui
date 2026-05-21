import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs'],
  staticDirs: [{ from: './static', to: '/' }],
  framework: { name: '@storybook/react-vite', options: {} },
  async viteFinal(config, { configType }) {
    if (configType === 'PRODUCTION') config.base = '/nayra-ui/';
    // Override react plugin to use classic runtime
    config.plugins = config.plugins?.map(plugin => {
      if (plugin && Array.isArray(plugin) && plugin.some(p => p.name === 'vite:react-babel')) {
        return react({ jsxRuntime: 'classic' });
      }
      return plugin;
    });
    return config;
  }
};
export default config;
