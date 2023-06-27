import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserSchema, USER_SLICE_NAME, User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localstorage';

const initialState: UserSchema = {
  authData: undefined,
  _inited: false,
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (user) {
        state.authData = JSON.parse(user);
      }
      state._inited = true;
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
