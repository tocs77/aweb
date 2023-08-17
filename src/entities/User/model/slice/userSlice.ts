import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserSchema, USER_SLICE_NAME, User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage';
import { setFeatureFlags } from '@/shared/lib/features';

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
      setFeatureFlags(action.payload.features);
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (user) {
        const userData = JSON.parse(user) as User;
        state.authData = userData;
        setFeatureFlags(userData.features);
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
