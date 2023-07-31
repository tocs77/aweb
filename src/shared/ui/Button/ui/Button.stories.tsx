import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

const meta = {
  title: 'shared/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
export const Clear: Story = {
  args: {
    theme: ButtonTheme.CLEAR,
  },
};
export const ClearInverted: Story = {
  args: {
    theme: ButtonTheme.CLEAR_INVERTED,
  },
};

export const ClearDark: Story = {
  args: {
    theme: ButtonTheme.CLEAR,
  },
};
ClearDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Outline: Story = {
  args: {
    theme: ButtonTheme.OUTLINE,
  },
};

export const OutlineSizeL: Story = {
  args: {
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.L,
  },
};

export const OutlineDark: Story = {
  args: {
    theme: ButtonTheme.OUTLINE,
  },
};

OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Background: Story = {
  args: {
    theme: ButtonTheme.BACKGROUND,
  },
};
export const InvertedBackground: Story = {
  args: {
    theme: ButtonTheme.BACKGROUND_INVERTED,
  },
};

export const SquareSizeM: Story = {
  args: {
    size: ButtonSize.M,
    square: true,
    children: '<',
  },
};
export const SquareSizeL: Story = {
  args: {
    size: ButtonSize.L,
    square: true,
    children: '<',
  },
};

export const SquareSizeXL: Story = {
  args: {
    size: ButtonSize.XL,
    square: true,
    children: '<',
  },
};

export const Disabled: Story = {
  args: {
    theme: ButtonTheme.OUTLINE,
    disabled: true,
  },
};
