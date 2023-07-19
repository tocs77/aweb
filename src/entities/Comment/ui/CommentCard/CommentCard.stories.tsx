import type { Meta, StoryObj } from '@storybook/react';
import { CommentCard } from './CommentCard';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Comment } from 'entities/Comment';

import src from 'shared/assets/test/avatar.png';

const comment: Comment = {
  id: '1',
  text: 'comment text',
  user: {
    id: '1',
    username: 'Admin',
    avatar: src,
    roles: ['USER'],
  },
};

const meta = {
  title: 'entities/CommentCard',
  component: CommentCard,
  args: { comment },
  tags: ['autodocs'],
  decorators: [StoreDecorator({})],
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};
export const Dark: Story = {
  args: {},
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Loading: Story = {
  args: { isLoading: true },
};
