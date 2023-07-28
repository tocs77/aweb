/* eslint-disable i18next/no-literal-string */
import type { Meta, StoryObj } from '@storybook/react';
import { ArticleRating } from './ArticleRating';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const articleId = '1';

const meta = {
  title: 'features/Rating/ArticleRating',
  component: ArticleRating,
  args: { articleId: articleId },
  tags: ['autodocs'],
  parameters: {
    mockData: [
      {
        url: `${__API__}article-ratings?userId=1&articleId=${articleId}`,
        method: 'GET',
        status: 200,
        response: [],
      },
    ],
  },
  decorators: [StoreDecorator({ user: { authData: { id: '1' } } })],
} satisfies Meta<typeof ArticleRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ArticleRatingDefault: Story = {
  args: {},
};

export const ArticleRatingDark: Story = {
  args: {},
};

ArticleRatingDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ArticleRatingRated: Story = {
  args: {},
  parameters: {
    mockData: [
      {
        url: `${__API__}article-ratings?userId=1&articleId=${articleId}`,
        method: 'GET',
        status: 200,
        response: [
          {
            articleId: articleId,
            rate: 3,
            userId: '1',
            id: 'MW_9fd9',
          },
        ],
      },
    ],
  },
};
