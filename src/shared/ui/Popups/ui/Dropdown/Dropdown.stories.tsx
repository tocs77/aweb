import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownItem } from './Dropdown';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { CenterDecorator } from '@/shared/config/storybook/CenterDecorator/CenterDecorator';

const items: DropdownItem[] = [
  { content: 'Label 1' },
  { content: 'Label 2ddd;lklkdlks' },
  { content: 'Label 4' },
  { content: 'Label 5' },
  { content: 'Label 6' },
];

const meta = {
  title: 'shared/Dropdown',
  component: Dropdown,
  args: { title: <h2>{'Dropdown'}</h2>, items },
  tags: ['autodocs'],
  decorators: [CenterDecorator()],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};
export const Dark: Story = {
  args: {},
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const BottomRight: Story = {
  args: { direction: 'bottom-right' },
};

export const TopLeft: Story = {
  args: { direction: 'top-left' },
};

export const TopRight: Story = {
  args: { direction: 'top-right' },
};
