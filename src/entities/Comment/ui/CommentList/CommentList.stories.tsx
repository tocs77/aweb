import type { Meta, StoryObj } from '@storybook/react';
import { CommentList } from './CommentList';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Comment } from '@/entities/Comment';

import src from '@/shared/assets/test/avatar.png';
import src2 from '@/shared/assets/test/tdms_logo.png';

const comments: Comment[] = [
  {
    id: '1',
    text: 'comment text',
    user: {
      id: '1',
      username: 'Admin',
      avatar: src,
      roles: ['ADMIN'],
    },
  },
  {
    id: '1',
    text: 'Another comment',
    user: {
      id: '1',
      username: 'User',
      avatar: src2,
      roles: ['ADMIN'],
    },
  },
];

const meta = {
  title: 'entities/CommentList',
  component: CommentList,
  args: { comments },
  tags: ['autodocs'],
  decorators: [StoreDecorator({})],
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};
export const Dark: Story = {
  args: {},
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const NoComments: Story = {
  args: { comments: undefined, isLoading: false },
};

export const Loading: Story = {
  args: { comments: undefined, isLoading: true },
};
