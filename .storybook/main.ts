import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.tsx'],

  addons: [
    '@storybook/addon-docs',
  ],

  staticDirs: [{ from: './static', to: '/' }],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },

  async viteFinal(config, { configType }) {
    if (configType === 'PRODUCTION') config.base = '/nayra-ui/';
    config.resolve = config.resolve || {};
    config.resolve.dedupe = ['react', 'react-dom'];
    
    // Force pre-bundling of react and MDX dependencies to prevent duplicate React instances
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = [
      ...(config.optimizeDeps.include || []),
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      '@mdx-js/react'
    ];
    
    if (config.build) {
      config.build.rollupOptions = config.build.rollupOptions || {};
      config.build.rollupOptions.treeshake = false;
    }
    return config;
  }
};
export default config;
