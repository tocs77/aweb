import type { Meta, StoryObj } from '@storybook/react';
import { AppLink } from './AppLink';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

const meta = {
  title: 'shared/AppLinkNew',
  component: AppLink,
  args: {
    to: '/',
    children: 'Link',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightPrimary: Story = {
  args: {
    variant: 'primary',
  },
};
export const LightSecondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const DarkPrimary: Story = {
  args: {
    variant: 'primary',
  },
};
DarkPrimary.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkSecondary: Story = {
  args: {
    variant: 'secondary',
  },
};
DarkSecondary.decorators = [ThemeDecorator(Theme.DARK)];
