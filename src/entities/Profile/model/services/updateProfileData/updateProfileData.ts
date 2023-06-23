import { createAsyncThunk } from '@reduxjs/toolkit';
import { PROFILE_SLICE_NAME, Profile, StoreWithProfile } from '../../types/profile';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  `${PROFILE_SLICE_NAME}/updateProfileData`,
  async (_, { extra, rejectWithValue, getState }) => {
    const formData = getProfileForm(getState() as StoreWithProfile);
    try {
      const response = await extra.api.put<Profile>('/profile', formData);
      if (!response.data) {
        throw new Error('Error updating profile');
      }

      return response.data;
    } catch (error) {
      let errorMsg = 'Unknown error in fetching';
      if (axios.isAxiosError(error)) {
        errorMsg = error?.response?.data || errorMsg;
        errorMsg = error.message || errorMsg;
      }
      return rejectWithValue(errorMsg);
    }
  },
);
