import type { Preview } from '@storybook/react-vite';
import '~/assets/css/main.css';
import configData from '../nayra.config.json';

const prefix = configData.componentPrefix || 'Na';

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    docs: {
      source: {
        transform: (code: string, storyContext: any) => {
          const componentName = storyContext.component?.name;
          if (componentName && code) {
            // Reemplaza <Icon y </Icon> por <NaIcon y </NaIcon>
            const regexOpen = new RegExp(`<${componentName}(\\s|>)`, 'g');
            const regexClose = new RegExp(`<\\/${componentName}>`, 'g');
            return code
              .replace(regexOpen, `<${prefix}${componentName}$1`)
              .replace(regexClose, `</${prefix}${componentName}>`);
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
