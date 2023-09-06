import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { CenterDecorator } from '@/shared/config/storybook/CenterDecorator/CenterDecorator';
import { Theme } from '@/shared/consts/theme';

const meta = {
  title: 'shared/Popover',
  component: Popover,
  args: {
    label: 'Popover',
    children: <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }}>{'Content'}</div>,
  },
  tags: ['autodocs'],
  decorators: [CenterDecorator()],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const TopRight: Story = { args: { direction: 'top-right' } };
export const TopLeft: Story = { args: { direction: 'top-left' } };
