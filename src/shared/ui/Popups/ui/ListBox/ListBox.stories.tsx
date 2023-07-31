import type { Meta, StoryObj } from '@storybook/react';
import { ListBox, ListBoxItem } from './ListBox';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { CenterDecorator } from '@/shared/config/storybook/CenterDecorator/CenterDecorator';
import { Theme } from '@/shared/consts/theme';

const items: ListBoxItem<string>[] = [
  { value: 'value1', content: 'Label 1' },
  { value: '2', content: 'Label 2' },
  { value: '3', content: 'Label dddfffffff4' },
  { value: '4', content: 'Label 5' },
  { value: '5', content: 'Label 6' },
];

const meta = {
  title: 'shared/ListBox',
  component: ListBox,
  args: {
    value: 'value1',
    items,
  },
  tags: ['autodocs'],
  decorators: [CenterDecorator()],
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const TopRight: Story = { args: { direction: 'top-right' } };
export const TopLeft: Story = { args: { direction: 'top-left' } };
