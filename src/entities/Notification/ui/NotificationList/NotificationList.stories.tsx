/* eslint-disable i18next/no-literal-string */
import type { Meta, StoryObj } from '@storybook/react';
import { NotificationList } from './NotificationList';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'entities/NotificationList',
  component: NotificationList,
  args: {},
  tags: ['autodocs'],
  parameters: {
    mockData: [
      {
        url: `${__API__}notifications`,
        method: 'GET',
        status: 200,
        response: [
          {
            id: '1',
            title: 'Уведомление 1',
            description: 'Произошло какое-то событие',
            userId: '1',
          },
          {
            id: '2',
            title: 'Уведомление 2',
            description: 'Произошло какое-то событие',
            userId: '1',
            href: 'http://localhost:3005/admin',
          },
          {
            id: '3',
            title: 'Уведомление 3',
            description: 'Произошло какое-то событие',
            userId: '1',
            href: 'http://localhost:3005/admin',
          },
          {
            id: '4',
            title: 'Уведомление 4',
            description: 'Произошло какое-то событие',
            userId: '1',
          },
          {
            id: '5',
            title: 'Уведомление 1',
            description: 'Произошло какое-то событие',
            userId: '2',
          },
        ],
      },
    ],
  },
  decorators: [StoreDecorator({ user: { authData: { id: '1' } } })],
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotificationListDefault: Story = {
  args: {},
};

export const NotificationListDark: Story = {
  args: {},
};

NotificationListDark.decorators = [ThemeDecorator(Theme.DARK)];
