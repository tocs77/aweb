import type { Meta, StoryObj } from '@storybook/react';
import { ListBox, ListBoxItem } from './ListBox';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const items: ListBoxItem<string>[] = [
  { value: 'value1', content: 'Label 1' },
  { value: '2', content: 'Label 2' },
  { value: '3', content: 'Label 4' },
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
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Top: Story = { args: { direction: 'top' } };
