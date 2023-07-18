import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from 'entities/Profile';
import { PROFILE_CARD_SLICE_NAME, StoreWithProfile, ValidateProfileError } from '../../types/editableProfileCardSchema';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string | ValidateProfileError[]>>(
  `${PROFILE_CARD_SLICE_NAME}/updateProfileData`,
  async (_, { extra, rejectWithValue, getState }) => {
    const formData = getProfileForm(getState() as StoreWithProfile);

    const errors = validateProfileData(formData);
    if (errors.length) return rejectWithValue(errors);

    try {
      const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData);
      if (!response.data) {
        return rejectWithValue('Error updating profile');
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
