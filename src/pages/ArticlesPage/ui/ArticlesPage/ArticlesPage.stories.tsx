import type { Meta, StoryObj } from '@storybook/react';
import ArticlesPage from './ArticlesPage';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta = {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,

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
