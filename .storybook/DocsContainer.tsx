import React from 'react';
import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import { useGlobals } from 'storybook/preview-api';
import { lightTheme, darkTheme } from './themes';

export function ThemedDocsContainer({ children, context }: React.PropsWithChildren<DocsContainerProps>) {
  const [globals] = useGlobals();
  const theme = (globals['theme'] as string) === 'dark' ? darkTheme : lightTheme;

  return (
    <DocsContainer context={context} theme={theme}>
      {children}
    </DocsContainer>
  );
}
