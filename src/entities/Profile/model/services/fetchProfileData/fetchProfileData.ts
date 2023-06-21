import { createAsyncThunk } from '@reduxjs/toolkit';
import { PROFILE_SLICE_NAME, Profile } from '../../types/profile';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localstorage';
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
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error', error?.response?.data);
        return rejectWithValue(error?.response?.data.message);
      } else {
        return rejectWithValue('Unknown error in fetching');
      }
    }
  },
);
