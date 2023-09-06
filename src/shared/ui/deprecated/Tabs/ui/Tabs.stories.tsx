import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

const meta = {
  title: 'shared/Tabs',
  component: Tabs,
  args: {
    tabs: [
      { value: 'Tab 1', content: 'Tab 1' },
      { value: 'Tab 2', content: 'Tab 2' },
      { value: 'Tab 3', content: 'Tab 3' },
    ],
    onTabClick: (val: string) => console.log(val),
    value: 'Tab 2',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
