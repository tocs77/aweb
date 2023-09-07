import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

const meta = {
  title: 'shared/ButtonNew',
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
    variant: 'clear',
  },
};
export const ClearInverted: Story = {
  args: {
    variant: 'clearInverted',
  },
};

export const ClearDark: Story = {
  args: {
    variant: 'clear',
  },
};
ClearDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const OutlineSizeL: Story = {
  args: {
    variant: 'outline',
    size: 'l',
  },
};

export const OutlineDark: Story = {
  args: {
    variant: 'outline',
  },
};

OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Background: Story = {
  args: {
    variant: 'background',
  },
};
export const InvertedBackground: Story = {
  args: {
    variant: 'backgroundInverted',
  },
};

export const SquareSizeM: Story = {
  args: {
    size: 'm',
    square: true,
    children: '<',
  },
};
export const SquareSizeL: Story = {
  args: {
    size: 'l',
    square: true,
    children: '<',
  },
};

export const SquareSizeXL: Story = {
  args: {
    size: 'xl',
    square: true,
    children: '<',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'outline',
    disabled: true,
  },
};
