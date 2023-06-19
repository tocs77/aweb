import { createSlice } from '@reduxjs/toolkit';
import { ProfileSchema, PROFILE_SLICE_NAME } from '../types/profile';

const initialState: ProfileSchema = {
  data: undefined,
  isLoading: false,
  readonly: true,
};

export const profileSlice = createSlice({
  name: PROFILE_SLICE_NAME,
  initialState,
  reducers: {},
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
