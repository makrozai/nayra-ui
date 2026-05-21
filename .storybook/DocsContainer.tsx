import React, { useState, useEffect } from 'react';
import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import { lightTheme, darkTheme } from './themes';
import config from '../nayra.config.json';

const DEFAULT_THEME = config.storybook.defaultTheme;

function readDataTheme(): string {
  return document.documentElement.getAttribute('data-theme') ?? DEFAULT_THEME;
}

export function ThemedDocsContainer({
  children,
  context,
}: React.PropsWithChildren<DocsContainerProps>) {
  const [themeName, setThemeName] = useState(readDataTheme);

  useEffect(() => {
    // withTheme decorator sets data-theme on documentElement on every theme change.
    // Observing that attribute is the only reliable sync point available to a
    // DocsContainer (channel hooks and useGlobals() are restricted to decorators).
    const observer = new MutationObserver(() => {
      setThemeName(readDataTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  const sbTheme = themeName === 'dark' ? darkTheme : lightTheme;

  if (!DocsContainer) {
    return (
      <div style={{ padding: '2rem', color: 'red' }}>
        <h2>DocsContainer error</h2>
        <p>The original DocsContainer from @storybook/addon-docs/blocks is undefined in this build.</p>
        <div>{children}</div>
      </div>
    );
  }

  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}
      >
        {themeName === 'dark' ? 'Tema oscuro activado' : 'Tema claro activado'}
      </div>
      <DocsContainer context={context} theme={sbTheme}>
        {children}
      </DocsContainer>
    </>
  );
}
