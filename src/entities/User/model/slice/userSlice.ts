import { createSlice } from '@reduxjs/toolkit';
import { UserSchema, USER_SLICE_NAME } from '../types/user';

const initialState: UserSchema = {
  authData: undefined,
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
