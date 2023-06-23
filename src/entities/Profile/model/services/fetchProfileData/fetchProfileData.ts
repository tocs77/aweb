import { createAsyncThunk } from '@reduxjs/toolkit';
import { PROFILE_SLICE_NAME, Profile } from '../../types/profile';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  `${PROFILE_SLICE_NAME}/fetchProfileData`,
  async (_, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Profile>('/profile');
      if (!response.data) {
        throw new Error('Wrong fetching profile');
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
