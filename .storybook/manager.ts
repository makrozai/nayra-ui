import { addons } from 'storybook/manager-api';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';
import { lightTheme, darkTheme } from './themes';

const prefersDark =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  theme: prefersDark ? darkTheme : lightTheme,
});

addons.register('nayra/theme-sync', () => {
  const channel = addons.getChannel();
  channel.on(
    GLOBALS_UPDATED,
    ({ globals }: { globals: Record<string, string> }) => {
      const isDark = (globals['theme'] ?? 'light') === 'dark';
      addons.setConfig({ theme: isDark ? darkTheme : lightTheme });
    },
  );
});
