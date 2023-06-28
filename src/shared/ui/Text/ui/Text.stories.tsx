import type { Meta, StoryObj } from '@storybook/react';
import { Text, TextSize, TextTheme } from './Text';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta = {
  title: 'shared/Text',
  component: Text,
  args: {
    text: 'Some text',
    title: 'Some title',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark: Story = {
  args: {},
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitle: Story = {
  args: { text: '' },
};

export const OnlyText: Story = {
  args: { title: '' },
};

export const Error: Story = {
  args: { theme: TextTheme.ERROR },
};

export const L_SIZE: Story = {
  args: { size: TextSize.L },
};

export const XL_SIZE: Story = {
  args: { size: TextSize.XL },
};
