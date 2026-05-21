import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

vi.mock('../Icon', () => ({
  Icon: ({ icon, type }: { icon: string; type: string }) => (
    <span className="icon-stub" data-icon={icon} data-type={type} />
  ),
}));

import { IconGallery } from '../IconGallery';

describe('IconGallery', () => {
  it('renderiza sin errores', () => {
    const { container } = render(<IconGallery />);
    expect(container.querySelector('.c-icon-gallery')).toBeInTheDocument();
  });

  it('muestra al menos un icono', () => {
    const { container } = render(<IconGallery />);
    expect(container.querySelectorAll('.c-icon-gallery__item').length).toBeGreaterThan(0);
  });

  it('muestra el input de búsqueda con placeholder', () => {
    render(<IconGallery />);
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect((input as HTMLInputElement).placeholder).toBeTruthy();
  });

  it('el input tiene aria-label accesible', () => {
    render(<IconGallery />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('aria-label');
    expect((input as HTMLInputElement).getAttribute('aria-label')).toBeTruthy();
  });

  it('muestra el contador total/filtrado', () => {
    const { container } = render(<IconGallery />);
    expect(container.querySelector('.c-icon-gallery__count')).toBeInTheDocument();
    expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });

  it('el contador tiene formato "N / M"', () => {
    const { container } = render(<IconGallery />);
    const count = container.querySelector('.c-icon-gallery__count')!;
    expect(count.textContent).toMatch(/\d+ \/ \d+/);
  });

  it('filtra al escribir en el buscador', () => {
    const { container } = render(<IconGallery />);
    const totalBefore = container.querySelectorAll('.c-icon-gallery__item').length;
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'star' } });
    const totalAfter = container.querySelectorAll('.c-icon-gallery__item').length;
    expect(totalAfter).toBeLessThanOrEqual(totalBefore);
    expect(totalAfter).toBeGreaterThan(0);
  });

  it('el contador se actualiza al filtrar', () => {
    const { container } = render(<IconGallery />);
    const before = container.querySelector('.c-icon-gallery__count')!.textContent;
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'star' } });
    const after = container.querySelector('.c-icon-gallery__count')!.textContent;
    expect(after).not.toBe(before);
  });

  it('muestra mensaje empty cuando no hay resultados', () => {
    const { container } = render(<IconGallery />);
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'xzxzxz_inexistente' } });
    expect(container.querySelector('.c-icon-gallery__empty')).toBeInTheDocument();
    expect(container.querySelector('.c-icon-gallery__grid')).not.toBeInTheDocument();
  });

  it('el mensaje empty incluye el término buscado', () => {
    const { container } = render(<IconGallery />);
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'termino_raro' } });
    expect(container.querySelector('.c-icon-gallery__empty')!.textContent).toContain('termino_raro');
  });

  it('muestra el nombre de cada icono', () => {
    const { container } = render(<IconGallery />);
    const names = container.querySelectorAll('.c-icon-gallery__name');
    expect(names.length).toBeGreaterThan(0);
    names.forEach(n => expect(n.textContent?.trim()).toBeTruthy());
  });

  it('muestra al menos un badge de variante por icono', () => {
    const { container } = render(<IconGallery />);
    const items = container.querySelectorAll('.c-icon-gallery__item');
    items.forEach(item => {
      expect(item.querySelectorAll('.c-icon-gallery__badge').length).toBeGreaterThan(0);
    });
  });

  it('restaura resultados al borrar búsqueda', () => {
    const { container } = render(<IconGallery />);
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'star' } });
    const filtered = container.querySelectorAll('.c-icon-gallery__item').length;
    fireEvent.change(input, { target: { value: '' } });
    const restored = container.querySelectorAll('.c-icon-gallery__item').length;
    expect(restored).toBeGreaterThan(filtered);
  });

});
