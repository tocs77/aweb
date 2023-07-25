import type { Meta, StoryObj } from '@storybook/react';
import { ArticleViewSelector } from './ArticleViewSelector';

import { ArticleView } from '@/entities/Article';

const meta = {
  title: 'entities/ArticleViewSelector',
  component: ArticleViewSelector,
  args: {
    onViewClick: () => {
      console.log('click');
    },
  },
  tags: ['autodocs'],
  decorators: [],
} satisfies Meta<typeof ArticleViewSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListOn: Story = {
  args: { view: ArticleView.LIST },
};
export const GridOn: Story = {
  args: { view: ArticleView.GRID },
};
