import { addons } from '@storybook/manager-api';
import { lightTheme, darkTheme } from './themes';

// El Manager UI sigue la preferencia del SO al cargar.
// El canvas de preview tiene su propio toggle en el toolbar (ver preview.tsx).
const prefersDark =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  theme: prefersDark ? darkTheme : lightTheme,
});
