import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta = {
  title: 'widgets/Navbar',
  component: Navbar,
  tags: ['autodocs'],
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
LightLogged.decorators = [StoreDecorator({ user: { authData: {} } })];

export const DarkLogged: Story = {
  args: {},
};
DarkLogged.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({ user: { authData: {} } })];
