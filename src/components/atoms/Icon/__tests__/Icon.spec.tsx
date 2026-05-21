import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { Icon } from '~/components/atoms/Icon';

// ---------------------------------------------------------------------------
// source='font' (default)
// ---------------------------------------------------------------------------

describe('Icon — source=font', () => {
  it('renderiza wrapper c-icon-wrapper e icono c-icon', () => {
    const { container } = render(<Icon icon="house" />);
    expect(container.querySelector('.c-icon-wrapper')).toBeInTheDocument();
    expect(container.querySelector('i.c-icon')).toBeInTheDocument();
  });

  it('aplica clases fa-solid y fa-{icon} por defecto', () => {
    const { container } = render(<Icon icon="house" />);
    const i = container.querySelector('i')!;
    expect(i).toHaveClass('fa-solid', 'fa-house');
  });

  it('aplica fa-regular para type=regular', () => {
    const { container } = render(<Icon icon="heart" type="regular" />);
    expect(container.querySelector('i')).toHaveClass('fa-regular', 'fa-heart');
  });

  it('aplica fa-brands para type=brands', () => {
    const { container } = render(<Icon icon="github" type="brands" />);
    expect(container.querySelector('i')).toHaveClass('fa-brands', 'fa-github');
  });

  it('agrega aria-label y role=img cuando se pasa ariaLabel', () => {
    const { container } = render(<Icon icon="house" ariaLabel="Inicio" />);
    const i = container.querySelector('i')!;
    expect(i).toHaveAttribute('aria-label', 'Inicio');
    expect(i).toHaveAttribute('role', 'img');
  });

  it('aplica aria-hidden=true cuando no hay ariaLabel (decorativo)', () => {
    const { container } = render(<Icon icon="house" />);
    const i = container.querySelector('i')!;
    expect(i).toHaveAttribute('aria-hidden', 'true');
    expect(i).not.toHaveAttribute('aria-label');
  });

  it('aplica font-size en el wrapper cuando se pasa size', () => {
    const { container } = render(<Icon icon="house" size={32} />);
    const wrapper = container.querySelector('.c-icon-wrapper') as HTMLElement;
    expect(wrapper.style.fontSize).toBe('32px');
  });

  it('aplica transform en el wrapper cuando se pasa rotate', () => {
    const { container } = render(<Icon icon="arrow-right" rotate={90} />);
    const wrapper = container.querySelector('.c-icon-wrapper') as HTMLElement;
    expect(wrapper.style.transform).toBe('rotate(90deg)');
  });

  it('pasa className adicional al elemento icono', () => {
    const { container } = render(<Icon icon="house" className="extra-class" />);
    expect(container.querySelector('i')).toHaveClass('extra-class');
  });

  it('no renderiza ningún elemento SVG en mode font', () => {
    const { container } = render(<Icon icon="house" />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// source='svg'
// ---------------------------------------------------------------------------

describe('Icon — source=svg', () => {
  it('retorna null para un icono no registrado', () => {
    const { container } = render(<Icon icon="nonexistent" source="svg" />);
    expect(container.firstChild).toBeNull();
  });

  it('renderiza el SVG registrado en solid', () => {
    const { container } = render(<Icon icon="bolt" source="svg" type="solid" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('aplica c-icon y c-icon--svg para type solid y regular', () => {
    const { container } = render(<Icon icon="bolt" source="svg" type="solid" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveClass('c-icon', 'c-icon--svg');
    expect(svg).not.toHaveClass('c-icon--colorful');
  });

  it('aplica c-icon--colorful para type=colorful', () => {
    const { container } = render(<Icon icon="tech-vue" source="svg" type="colorful" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveClass('c-icon', 'c-icon--colorful');
    expect(svg).not.toHaveClass('c-icon--svg');
  });

  it('propaga aria-label al SVG', () => {
    const { container } = render(
      <Icon icon="custom-star" source="svg" ariaLabel="Estrella" />
    );
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('aria-label', 'Estrella');
    expect(svg).toHaveAttribute('role', 'img');
  });

  it('aplica aria-hidden en SVG decorativo', () => {
    const { container } = render(<Icon icon="custom-star" source="svg" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('aplica font-size en wrapper SVG cuando se pasa size', () => {
    const { container } = render(<Icon icon="bolt" source="svg" size={48} />);
    const wrapper = container.querySelector('.c-icon-wrapper') as HTMLElement;
    expect(wrapper.style.fontSize).toBe('48px');
  });

  it('aplica fallback a solid cuando el type pedido no existe en el registro', () => {
    // custom-star no existe en colorful → fallback a solid
    const { container } = render(<Icon icon="custom-star" source="svg" type="colorful" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
