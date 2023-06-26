import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProfileSchema, PROFILE_SLICE_NAME, Profile } from '../types/profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const initialState: ProfileSchema = {
  data: undefined,
  form: undefined,
  isLoading: false,
  readonly: true,
};

export const profileSlice = createSlice({
  name: PROFILE_SLICE_NAME,
  initialState,
  reducers: {
    setReadOnly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      state.form = { ...state.form, ...(action.payload as Profile) };
    },
    cancelEditProfile: (state) => {
      state.readonly = true;
      if (state.data) state.form = { ...state.data };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.form = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProfileData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateProfileData.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
      state.validateErrors = undefined;
    });
    builder.addCase(updateProfileData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.form = action.payload;
      state.readonly = true;
      state.isLoading = false;
      state.validateErrors = undefined;
    });
    builder.addCase(updateProfileData.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
        return;
      }
      state.validateErrors = action.payload;
    });
  },
});

export const { actions: profileSliceActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
