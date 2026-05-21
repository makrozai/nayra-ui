import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],

  addons: [
    '@storybook/addon-docs',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  async viteFinal(config, { configType }) {
    if (configType === 'PRODUCTION') {
      config.base = '/nayra-ui/';
    }
    return config;
  }
};
export default config;
