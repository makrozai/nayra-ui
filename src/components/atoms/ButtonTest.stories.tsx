import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const Button = () => <button>Click me</button>;

const meta = {
  title: 'Atoms/ButtonTest',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
