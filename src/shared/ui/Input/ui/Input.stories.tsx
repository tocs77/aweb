import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta = {
  title: 'shared/Input',
  component: Input,
  args: {
    value: 'input val',
    placeholder: 'input placeholder',
    onChange: (val: string) => {
      console.log(val);
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};
export const Dark: Story = {
  args: {},
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
