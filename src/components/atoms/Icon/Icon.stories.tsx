import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Icon } from './Icon';
import React, { SVGProps } from 'react';

const meta = {
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;


export default meta;
type Story = StoryObj<typeof meta>;

// Smoke check — one is enough per file
export const Primary: Story = {
  args: { icon: 'fas fa-home', title: 'Home icon' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByRole('img', { name: /home icon/i });
    await expect(icon).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: { icon: 'fas fa-check', color: 'var(--color-primary-500)', title: 'Check icon' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByRole('img', { name: /check icon/i });
    await expect(icon.style.color).toBe('var(--color-primary-500)');
  },
};

// Variant-only stories: no play needed
export const CustomSize: Story = { args: { icon: 'fas fa-user', size: 48 } };

export const SvgIcon: Story = { 
  args: { 
    icon: (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 100 100" {...props}><circle cx="50" cy="50" r="40" /></svg> 
  } 
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '1rem', fontFamily: 'sans-serif' }}>Tamaños (Sizes)</h4>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'end' }}>
          <Icon icon="fas fa-star" size={16} title="16px" />
          <Icon icon="fas fa-star" size={24} title="24px" />
          <Icon icon="fas fa-star" size={32} title="32px" />
          <Icon icon="fas fa-star" size={48} title="48px" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem', fontFamily: 'sans-serif' }}>Colores (Colors)</h4>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Icon icon="fas fa-heart" size={32} color="#ef4444" title="Rojo" />
          <Icon icon="fas fa-heart" size={32} color="#3b82f6" title="Azul" />
          <Icon icon="fas fa-heart" size={32} color="#10b981" title="Verde" />
          <Icon icon="fas fa-heart" size={32} color="#f59e0b" title="Amarillo" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem', fontFamily: 'sans-serif' }}>Tipos (FontAwesome vs SVG)</h4>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Icon icon="fas fa-camera" size={32} title="FontAwesome Camera" />
          <Icon 
            icon={(props: SVGProps<SVGSVGElement>) => (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            )} 
            size={32} 
            title="Custom SVG Icon" 
          />
        </div>
      </div>
    </div>
  ),
};

