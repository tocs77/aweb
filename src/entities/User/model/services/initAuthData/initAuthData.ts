import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { getUserDataByIdQuery } from '../../../api/userApi';
import { USER_SLICE_NAME, User } from '../../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  `${USER_SLICE_NAME}/initAuthData`,
  async (_, { dispatch, rejectWithValue }) => {
    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    console.log('init user for id ', userId);
    if (!userId) return rejectWithValue('No saved user');
    try {
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();
      if (!response) {
        return rejectWithValue('Error getting user');
      }

      return response;
    } catch (error) {
      return rejectWithValue('Unknown error in updating settings');
    }
  },
);
