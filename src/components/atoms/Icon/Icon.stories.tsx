import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Icon } from './Icon';
import React from 'react';

const meta = {
  component: Icon,
  tags: ['autodocs'],
  args: {
    icon: 'house',
    source: 'font',
    type: 'solid',
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Font — variantes de type
// ---------------------------------------------------------------------------

export const FontSolid: Story = {
  args: { icon: 'heart', type: 'solid', size: 48, ariaLabel: 'Corazón solid' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByRole('img', { name: /corazón solid/i });
    await expect(icon).toBeVisible();
  },
};

export const FontRegular: Story = {
  args: { icon: 'heart', type: 'regular', size: 48, ariaLabel: 'Corazón regular' },
};

export const FontBrands: Story = {
  args: { icon: 'github', type: 'brands', size: 48, ariaLabel: 'GitHub' },
};

// ---------------------------------------------------------------------------
// Font — size y herencia
// ---------------------------------------------------------------------------

export const FontSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
      <Icon icon="star" size={16} ariaLabel="16px" />
      <Icon icon="star" size={24} ariaLabel="24px" />
      <Icon icon="star" size={32} ariaLabel="32px" />
      <Icon icon="star" size={48} ariaLabel="48px" />
    </div>
  ),
};

export const FontInheritSize: Story = {
  name: 'Font — hereda font-size del padre',
  render: () => (
    <div style={{ fontSize: '2rem' }}>
      <Icon icon="bell" ariaLabel="Campana" />
      <span style={{ marginLeft: '0.5rem', verticalAlign: 'middle' }}>Texto 2rem</span>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Font — rotación
// ---------------------------------------------------------------------------

export const FontRotate: Story = {
  args: { icon: 'arrow-right', rotate: 90, size: 32, ariaLabel: 'Flecha rotada 90°' },
};

// ---------------------------------------------------------------------------
// Font — decorativo (aria-hidden)
// ---------------------------------------------------------------------------

export const FontDecorative: Story = {
  name: 'Font — decorativo (aria-hidden)',
  args: { icon: 'circle-info', size: 24 },
  play: async ({ canvasElement }) => {
    const i = canvasElement.querySelector('i')!;
    await expect(i).toHaveAttribute('aria-hidden', 'true');
  },
};

// ---------------------------------------------------------------------------
// SVG — solid y colorful
// ---------------------------------------------------------------------------

export const SvgSolid: Story = {
  args: { icon: 'custom-star', source: 'svg', type: 'solid', size: 48, ariaLabel: 'Estrella solid' },
};

export const SvgRegular: Story = {
  args: { icon: 'custom-star', source: 'svg', type: 'regular', size: 48, ariaLabel: 'Estrella regular' },
};

export const SvgColorful: Story = {
  args: { icon: 'tech-vue', source: 'svg', type: 'colorful', size: 64, ariaLabel: 'Vue.js' },
};

// ---------------------------------------------------------------------------
// SVG — fallback automático
// ---------------------------------------------------------------------------

export const SvgFallback: Story = {
  name: 'SVG — fallback automático a solid',
  args: { icon: 'custom-star', source: 'svg', type: 'brands', size: 48, ariaLabel: 'Fallback a solid' },
};

// ---------------------------------------------------------------------------
// Galería — todos los iconos del proyecto
// ---------------------------------------------------------------------------

const SVG_ICONS: Array<{ icon: string; type: 'solid' | 'regular' | 'colorful' }> = [
  { icon: 'arrow-path', type: 'solid' },
  { icon: 'arrow-path', type: 'regular' },
  { icon: 'bolt', type: 'solid' },
  { icon: 'bolt', type: 'regular' },
  { icon: 'custom-star', type: 'solid' },
  { icon: 'custom-star', type: 'regular' },
  { icon: 'plus', type: 'solid' },
  { icon: 'plus', type: 'regular' },
  { icon: 'minus', type: 'solid' },
  { icon: 'minus', type: 'regular' },
  { icon: 'tech-vue', type: 'colorful' },
];

export const Gallery: Story = {
  name: 'Galería SVG del proyecto',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1.5rem' }}>
      {SVG_ICONS.map(({ icon, type }) => (
        <div
          key={`${icon}-${type}`}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', fontFamily: 'sans-serif', fontSize: '0.75rem' }}
        >
          <Icon icon={icon} source="svg" type={type} size={32} ariaLabel={`${icon} ${type}`} />
          <span>{icon}</span>
          <span style={{ opacity: 0.5 }}>{type}</span>
        </div>
      ))}
    </div>
  ),
};
