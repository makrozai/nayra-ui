import { addons } from 'storybook/manager-api';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';
import { lightTheme, darkTheme } from './themes';

const prefersDark =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

// Inject CSS into the manager shell so background/color respond to data-theme
// instantly — before addons.setConfig's async React re-render completes.
(function injectManagerThemeCSS() {
  const style = document.createElement('style');
  style.id = 'nayra-manager-theme';
  style.textContent = `
    html[data-theme='dark']  body { background: #0f172a; color: #f8fafc; }
    html[data-theme='light'] body { background: #f8fafc; color: #0f172a; }
    /* Short transition hides the async React render lag in the manager shell */
    body, #storybook-root, #storybook-panel-root {
      transition: background-color 120ms ease, color 120ms ease;
    }
  `;
  document.head.appendChild(style);
})();

addons.setConfig({
  theme: prefersDark ? darkTheme : lightTheme,
});

addons.register('nayra/theme-sync', () => {
  const channel = addons.getChannel();
  channel.on(
    GLOBALS_UPDATED,
    ({ globals }: { globals: Record<string, string> }) => {
      const isDark = (globals['theme'] ?? 'light') === 'dark';
      // Synchronous: instant CSS cascade on manager shell via data-theme
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
      // Async: React re-render of Storybook manager UI (now masked by the CSS above)
      addons.setConfig({ theme: isDark ? darkTheme : lightTheme });
    },
  );
});
