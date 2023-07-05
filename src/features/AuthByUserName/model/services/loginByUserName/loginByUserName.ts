import { createAsyncThunk } from '@reduxjs/toolkit';
import { LOGIN_SLICE_NAME } from '../../types/loginSchema';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localstorage';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  `${LOGIN_SLICE_NAME}/loginByUsername`,
  async ({ username, password }, { dispatch, extra, rejectWithValue }) => {
    try {
      const response = await extra.api.post<User>('/login', { username, password });
      if (!response.data) {
        throw new Error('Wrong username or password');
      }
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
      dispatch(userActions.setAuthData(response.data));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error', error?.response?.data);
        return rejectWithValue(error?.response?.data.message);
      } else {
        return rejectWithValue('Unknown error in request login');
      }
    }
  },
);
