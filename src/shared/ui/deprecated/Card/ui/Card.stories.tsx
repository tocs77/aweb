/* eslint-disable i18next/no-literal-string */
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';
import { Text } from '@/shared/ui/deprecated/Text';

const meta = {
  title: 'shared/Card',
  component: Card,
  args: { children: <Text title='Card' text='Card content' /> },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardDefault: Story = {
  args: {},
};

export const CardDark: Story = {
  args: {},
};

CardDark.decorators = [ThemeDecorator(Theme.DARK)];
