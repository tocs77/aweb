import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LOGIN_SLICE_NAME } from '../../types/loginSchema';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localstorage';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
  `${LOGIN_SLICE_NAME}/loginByUsername`,
  async ({ username, password }, thunkAPI) => {
    console.log('thunk api', thunkAPI);
    try {
      const response = await axios.post<User>('http://localhost:3006/login', { username, password });
      if (!response.data) {
        throw new Error('Wrong username or password');
      }
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
      thunkAPI.dispatch(userActions.setAuthData(response.data));
      return response.data;
    } catch (error) {
      console.log('error', error.response.data);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);
