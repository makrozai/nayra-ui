import type { Preview, Decorator } from '@storybook/react-vite';
import React from 'react';
import '~/assets/css/main.css';
import config from '../nayra.config.json';

const { storybook: sb, componentPrefix } = config;

// ---------------------------------------------------------------------------
// Decorator: aplica data-theme al <html> y provee contexto de color explícito
// para que los componentes siempre rendericen sobre el fondo correcto.
// ---------------------------------------------------------------------------
const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals['theme'] as string) ?? sb.defaultTheme;
  document.documentElement.setAttribute('data-theme', theme);

  return (
    <div
      style={{
        background: 'var(--na-color-bg)',
        color: 'var(--na-color-text)',
        padding: '2rem',
        minHeight: '100vh',
        transition: 'background 200ms ease, color 200ms ease',
      }}
    >
      <Story />
    </div>
  );
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
    // El fondo lo controla nuestro decorator via CSS variables
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
