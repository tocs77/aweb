import type { Meta, StoryObj } from '@storybook/react';
import ArticlesPage from './ArticlesPage';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/consts/theme';
import { ARTICLES_PAGE_SLICE_NAME } from '@/pages/ArticlesPage/model/types/articlesPageSchema';

const meta = {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
  decorators: [StoreDecorator({ [ARTICLES_PAGE_SLICE_NAME]: {} })],
  tags: ['autodocs'],
} satisfies Meta<typeof ArticlesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};
export const Dark: Story = {
  args: {},
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
