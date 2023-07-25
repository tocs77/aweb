import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import src from '@/shared/assets/test/avatar.png';

const meta = {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  args: {
    profile: {
      id: '1',
      first: 'Bob',
      lastname: 'Smith',
      age: 33,
      currency: Currency.EUR,
      country: Country.Australia,
      city: '',
      username: 'admin',
      avatar: src,
    },
    isLoading: false,
    readOnly: true,
    onChangeFirstName: (value: string) => {
      console.log(value);
    },
    onChangeLastName: (value: string) => {
      console.log(value);
    },
    onChangeAge: (value: string) => {
      console.log(value);
    },
    onChangeCity: (value: string) => {
      console.log(value);
    },
    onChangeUsername: (value: string) => {
      console.log(value);
    },
    onChangeAvatar: (value: string) => {
      console.log(value);
    },
    onChangeCurrency: (value: Currency) => {
      console.log(value);
    },
    onChangeCountry: (value: Country) => {
      console.log(value);
    },
  },
  tags: ['autodocs'],
  decorators: [],
} satisfies Meta<typeof ProfileCard>;

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

export const Error: Story = {
  args: { error: 'Some error' },
};
