import type { Meta, StoryObj } from '@storybook/react';
import { AppLink, AppLinkTheme } from './AppLink';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

const meta = {
  title: 'shared/AppLink',
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
    theme: AppLinkTheme.PRIMARY,
  },
};
export const LightSecondary: Story = {
  args: {
    theme: AppLinkTheme.SECONDARY,
  },
};

export const DarkPrimary: Story = {
  args: {
    theme: AppLinkTheme.PRIMARY,
  },
};
DarkPrimary.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkSecondary: Story = {
  args: {
    theme: AppLinkTheme.SECONDARY,
  },
};
DarkSecondary.decorators = [ThemeDecorator(Theme.DARK)];
