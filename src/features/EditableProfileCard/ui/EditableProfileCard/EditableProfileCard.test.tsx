import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { EditableProfileCard } from './EditableProfileCard';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Profile } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

import { profileCardReducer } from '@/features/EditableProfileCard/models/slice/profileCardSlice';
import { PROFILE_CARD_SLICE_NAME } from '@/features/EditableProfileCard/models/types/editableProfileCardSchema';
import { $api } from '@/shared/api/api';

const profile: Profile = {
  id: '1',
  first: 'admin',
  lastname: 'admin',
  age: 465,
  currency: Currency.USD,
  country: Country.Brazil,
  city: 'Moscow',
  username: 'admin213',
  avatar: '',
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      form: profile,
      data: profile,
      isLoading: false,
    },
    user: { authData: { id: '1' } },
  },
  asyncReducers: { [PROFILE_CARD_SLICE_NAME]: profileCardReducer },
};

describe('features/EditableProfileCard', () => {
  test('should switch to edit mode', async () => {
    componentRender(<EditableProfileCard id='1' />, options);
    const editBtn = screen.getByTestId('EditableProfileCardHeader.EditBtn');
    await userEvent.click(editBtn);
    expect(screen.getByTestId('EditableProfileCardHeader.CancelBtn')).toBeInTheDocument();
  });

  test('on cancel values should be reset', async () => {
    componentRender(<EditableProfileCard id='1' />, options);
    const editBtn = screen.getByTestId('EditableProfileCardHeader.EditBtn');
    await userEvent.click(editBtn);

    const firstNameInput = screen.getByTestId('ProfileCard.firstname');
    const lastNameInput = screen.getByTestId('ProfileCard.lastname');

    await userEvent.clear(firstNameInput);
    await userEvent.clear(lastNameInput);

    await userEvent.type(firstNameInput, 'test1');
    await userEvent.type(lastNameInput, 'test2');

    expect(firstNameInput).toHaveValue('test1');
    expect(lastNameInput).toHaveValue('test2');

    const cancelBtn = screen.getByTestId('EditableProfileCardHeader.CancelBtn');
    await userEvent.click(cancelBtn);
    expect(firstNameInput).toHaveValue(profile.first);
    expect(lastNameInput).toHaveValue(profile.lastname);
  });

  test('validation error', async () => {
    componentRender(<EditableProfileCard id='1' />, options);
    const editBtn = screen.getByTestId('EditableProfileCardHeader.EditBtn');
    await userEvent.click(editBtn);

    const firstNameInput = screen.getByTestId('ProfileCard.firstname');
    await userEvent.clear(firstNameInput);

    const saveBtn = screen.getByTestId('EditableProfileCardHeader.SaveBtn');
    await userEvent.click(saveBtn);

    const error = screen.getByTestId('EditableProfileCard.Error-text');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('INCORRECT_USER_DATA');
  });

  test('on save send put to server', async () => {
    const mockPutRequest = jest.spyOn($api, 'put').mockImplementation(jest.fn());
    componentRender(<EditableProfileCard id='1' />, options);
    const editBtn = screen.getByTestId('EditableProfileCardHeader.EditBtn');
    await userEvent.click(editBtn);

    const firstNameInput = screen.getByTestId('ProfileCard.firstname');
    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, 'test1');

    const saveBtn = screen.getByTestId('EditableProfileCardHeader.SaveBtn');
    await userEvent.click(saveBtn);
    expect(mockPutRequest).toHaveBeenCalledWith('/profile/1', {
      age: 465,
      avatar: '',
      city: 'Moscow',
      country: 'Brazil',
      currency: 'USD',
      first: 'test1',
      id: '1',
      lastname: 'admin',
      username: 'admin213',
    });
  });
});
