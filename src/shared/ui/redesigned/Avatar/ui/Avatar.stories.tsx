import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import src from './avatar.png';

const meta = {
  title: 'shared/AvatarNew',
  component: Avatar,
  args: { src },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AvatarDefault: Story = {
  args: {},
};

export const AvatarBig: Story = {
  args: { size: 100 },
};

export const AvatarError: Story = {
  args: { src: '' },
};
