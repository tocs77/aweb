import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/consts/theme';
import { Notification } from '@/entities/Notification/model/types/notification';

import avatar from '@/shared/assets/test/avatar.png';

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Уведомление 1',
    description: 'Произошло какое-то событие',
  },
  {
    id: '2',
    title: 'Уведомление 2',
    description: 'Произошло какое-то событие',

    href: 'http://localhost:3005/admin',
  },
  {
    id: '3',
    title: 'Уведомление 3',
    description: 'Произошло какое-то событие',

    href: 'http://localhost:3005/admin',
  },
  {
    id: '4',
    title: 'Уведомление 4',
    description: 'Произошло какое-то событие',
  },
  {
    id: '5',
    title: 'Уведомление 1',
    description: 'Произошло какое-то событие',
  },
];

const meta = {
  title: 'widgets/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    mockData: [
      {
        url: `${__API__}notifications`,
        method: 'GET',
        status: 200,
        response: notifications,
      },
    ],
  },
  decorators: [StoreDecorator({ user: { authData: undefined } })],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};
export const Dark: Story = {
  args: {},
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const LightLogged: Story = {
  args: {},
};
LightLogged.decorators = [StoreDecorator({ user: { authData: { avatar } } })];

export const DarkLogged: Story = {
  args: {},
};
DarkLogged.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({ user: { authData: { avatar } } })];
