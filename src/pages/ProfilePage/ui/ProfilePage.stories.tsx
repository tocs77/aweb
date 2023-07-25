import type { Meta, StoryObj } from '@storybook/react';
import ProfilePage from './ProfilePage';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import src from '@/shared/assets/test/avatar.png';
import { ProfileCardSchema } from '@/features/EditableProfileCard';
import { ValidateProfileError } from '@/features/EditableProfileCard/models/consts/consts';

const baseProfile: ProfileCardSchema = {
  form: {
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
  readonly: true,
};

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  args: {},
  tags: ['autodocs'],
  parameters: {
    reactRouter: {
      routePath: '/profile/:id',
      routeParams: { id: '1' },
    },
  },
  decorators: [
    StoreDecorator({
      profile: baseProfile,
    }),
  ],
} satisfies Meta<typeof ProfilePage>;

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
WithError.decorators = [StoreDecorator({ profile: { ...baseProfile, error: 'ERROR' } })];

export const WithValidationError: Story = {
  args: {},
};
WithValidationError.decorators = [
  StoreDecorator({ profile: { ...baseProfile, readonly: false, validateErrors: [ValidateProfileError.INCORRECT_AGE] } }),
];

export const Pending: Story = {
  args: {},
};
Pending.decorators = [StoreDecorator({ profile: { ...baseProfile, isLoading: true } })];
