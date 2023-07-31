import type { Meta, StoryObj } from '@storybook/react';
import LoginForm from './LoginForm';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/consts/theme';

const meta = {
  title: 'features/LoginForm',
  component: LoginForm,
  args: {},
  tags: ['autodocs'],
  decorators: [StoreDecorator({ login: { username: '123', password: 'password' } })],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};
export const Dark: Story = {
  args: {},
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithError: Story = {
  args: {},
};
WithError.decorators = [StoreDecorator({ login: { username: '123', password: 'password', error: 'Error' } })];

export const Pending: Story = {
  args: {},
};
Pending.decorators = [StoreDecorator({ login: { username: '123', password: 'password', isLoading: true } })];
