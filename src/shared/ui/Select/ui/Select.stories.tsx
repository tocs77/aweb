import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta = {
  title: 'shared/Select',
  component: Select,
  args: {
    label: 'Select',
    options: [
      { value: '1', content: 'Label 1' },
      { value: '2', content: 'Label 2' },
    ],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};
export const Dark: Story = {
  args: {},
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
