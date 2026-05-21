import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon } from '~/components/atoms/Icon';
import { ConfigProvider } from '~/config/ConfigProvider';
import React from 'react';

describe('Icon', () => {
  it('debe renderizar un ícono de FontAwesome correctamente', () => {
    const { container } = render(
      <ConfigProvider prefixCls="nayra">
        <Icon icon="fas fa-home" title="Home" />
      </ConfigProvider>
    );
    
    const iconElement = container.querySelector('i');
    expect(iconElement).toBeInTheDocument();
    // Verifica que el prefijo dinámico esté aplicado y la clase nativa
    expect(iconElement).toHaveClass('fas', 'fa-home', 'nayra-icon');
    expect(iconElement).toHaveAttribute('aria-label', 'Home');
  });

  it('debe ocultarse de lectores de pantalla si no hay título', () => {
    const { container } = render(<Icon icon="fas fa-user" />);
    const iconElement = container.querySelector('i');
    
    expect(iconElement).toHaveAttribute('aria-hidden', 'true');
    expect(iconElement).not.toHaveAttribute('aria-label');
  });
});
