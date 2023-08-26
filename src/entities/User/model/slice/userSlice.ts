import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserSchema, USER_SLICE_NAME, User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings/saveJsonSettings';
import { initAuthData } from '../services/initAuthData/initAuthData';

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

    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveJsonSettings.fulfilled, (state, action) => {
      if (state.authData) {
        state.authData.jsonSettings = action.payload;
      }
    });
    builder.addCase(initAuthData.fulfilled, (state, action) => {
      if (!state.authData) {
        state.authData = action.payload;
        setFeatureFlags(action.payload.features);
        state._inited = true;
      }
    });
    builder.addCase(initAuthData.rejected, (state) => {
      state._inited = true;
    });
  },
});

export const { reducer: userReducer } = userSlice;

export const userActions = { ...userSlice.actions, saveJsonSettings, initAuthData };
