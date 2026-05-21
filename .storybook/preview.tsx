import type { Preview, Decorator } from '@storybook/react-vite';
import { addons } from 'storybook/preview-api';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';
import React from 'react';
import '~/assets/css/main.css';
import './storybook.css';
import config from '../nayra.config.json';

const { storybook: sb, componentPrefix } = config;

function applyTheme(theme: string) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
}

// Set data-theme immediately from the URL globals param so the docs shell and
// sbdocs-wrapper get the right theme before any story renders.
if (typeof window !== 'undefined') {
  const globalsParam = new URLSearchParams(window.location.search).get('globals') ?? '';
  const themeMatch = globalsParam.match(/theme:(\w+)/);
  applyTheme(themeMatch ? themeMatch[1] : sb.defaultTheme);

  // Also subscribe to live theme switches — fires before React re-renders stories.
  try {
    addons.getChannel().on(
      GLOBALS_UPDATED,
      ({ globals }: { globals: Record<string, string> }) => {
        applyTheme((globals['theme'] as string) ?? sb.defaultTheme);
      },
    );
  } catch {
    // Channel not available during static build pre-render — safe to ignore.
  }
}

const withTheme: Decorator = (Story, context) => {
  applyTheme((context.globals['theme'] as string) ?? sb.defaultTheme);
  return <Story />;
};

const preview: Preview = {
  // ------------------------------------------------------------------
  // Toolbar: toggle Light / Dark para el canvas de preview
  // ------------------------------------------------------------------
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Tema visual de los componentes',
      defaultValue: sb.defaultTheme,
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', icon: 'sun',  title: 'Light' },
          { value: 'dark',  icon: 'moon', title: 'Dark'  },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [withTheme],

  parameters: {
    backgrounds: { disable: true },

    docs: {
      source: {
        transform: (code: string, storyContext: { component?: { name?: string } }) => {
          const componentName = storyContext.component?.name;
          if (componentName && code) {
            const regexOpen  = new RegExp(`<${componentName}(\\s|>)`, 'g');
            const regexClose = new RegExp(`<\\/${componentName}>`, 'g');
            return code
              .replace(regexOpen,  `<${componentPrefix}${componentName}$1`)
              .replace(regexClose, `</${componentPrefix}${componentName}>`);
          }
          return code;
        },
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
