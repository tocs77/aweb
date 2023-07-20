/* eslint-disable i18next/no-literal-string */
import type { Meta, StoryObj } from '@storybook/react';
import { EditableProfileCard } from './EditableProfileCard';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ProfileCardSchema } from '../../models/types/editableProfileCardSchema';

import src from 'shared/assets/test/avatar.png';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

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
  title: 'features/EditableProfileCard',
  component: EditableProfileCard,
  args: { id: '1' },
  tags: ['autodocs'],
  decorators: [
    StoreDecorator({
      profile: baseProfile,
    }),
  ],
} satisfies Meta<typeof EditableProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EditableProfileCardDefault: Story = {
  args: {},
};

export const EditableProfileCardDark: Story = {
  args: {},
};

EditableProfileCardDark.decorators = [ThemeDecorator(Theme.DARK)];
