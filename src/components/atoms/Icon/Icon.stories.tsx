import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Icon } from './Icon';
import { IconGallery } from './IconGallery';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    source: 'font',
    icon: 'house',
    type: 'solid',
  },
  argTypes: {
    source: {
      control: 'radio',
      options: ['font', 'svg'],
      description: 'Origen: fuente externa o SVG local',
      table: { category: 'Configuración' },
    },
    icon: {
      control: 'text',
      description: 'Nombre del icono (FA sin prefijo o nombre exacto del SVG)',
      table: { category: 'Configuración' },
    },
    type: {
      control: 'select',
      options: ['solid', 'regular', 'brands', 'colorful'],
      description: 'Variante / peso del icono',
      table: { category: 'Configuración' },
    },
    size: {
      control: 'number',
      description: 'Tamaño en px. Omitir = hereda font-size del padre.',
      table: { category: 'Apariencia' },
    },
    rotate: {
      control: 'number',
      description: 'Rotación en grados',
      table: { category: 'Apariencia' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Etiqueta accesible. Omitir = decorativo (aria-hidden).',
      table: { category: 'Accesibilidad' },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FontAwesomeSolid: Story = {
  args: { source: 'font', icon: 'heart', type: 'solid', size: 48 },
};

export const FontAwesomeRegular: Story = {
  args: { source: 'font', icon: 'heart', type: 'regular', size: 48 },
};

export const FontAwesomeBrands: Story = {
  args: { source: 'font', icon: 'github', type: 'brands', size: 48 },
};

export const SvgLocalSolid: Story = {
  args: { source: 'svg', icon: 'custom-star', type: 'solid', size: 64 },
};

export const SvgLocalRegular: Story = {
  args: { source: 'svg', icon: 'custom-star', type: 'regular', size: 64 },
};

export const SvgLocalColorful: Story = {
  args: { source: 'svg', icon: 'tech-vue', type: 'colorful', size: 64 },
  render: (args) => (
    <div style={{ color: 'var(--na-color-error, #ef4444)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
      <Icon {...args} />
      <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
        Preserva sus colores nativos sin heredar el rojo del padre
      </span>
    </div>
  ),
};

export const VariantFallback: Story = {
  args: { source: 'svg', icon: 'custom-star', type: 'brands', size: 48 },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
      <Icon {...args} />
      <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
        Se solicita variante <code>brands</code> del icono <code>custom-star</code>, la cual NO existe localmente.
        El componente resuelve automáticamente en la variante disponible (<code>solid</code>).
      </span>
    </div>
  ),
};

export const SizeInheritanceAndColor: Story = {
  args: { source: 'font', icon: 'bell' },
  render: (args) => (
    <div style={{ fontSize: '24px', color: 'var(--na-color-primary-500, #0ea5e9)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Icon {...args} />
      <span>Heredando color y tamaño de fuente (24px)</span>
    </div>
  ),
};

export const Transformations: Story = {
  args: { source: 'font', icon: 'arrow-right', rotate: 90, size: 32 },
};

export const Gallery: Story = {
  render: () => <IconGallery />,
  parameters: {
    layout: 'fullscreen',
  },
};
