import { createAsyncThunk } from '@reduxjs/toolkit';
import { PROFILE_SLICE_NAME, Profile } from '../../types/profile';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
  `${PROFILE_SLICE_NAME}/fetchProfileData`,
  async (id: string, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Profile>(`/profile/${id}`);
      if (!response.data) {
        return rejectWithValue('Wrong fetching profile');
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
