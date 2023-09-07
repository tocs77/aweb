import type { Meta, StoryObj } from '@storybook/react';
import { AppLogo } from './AppLogo';

const meta = {
  title: 'shared/AppLogo',
  component: AppLogo,

  tags: ['autodocs'],
} satisfies Meta<typeof AppLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Logo: Story = {};
