import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { USER_SLICE_NAME } from '../../types/user';
import { JsonSettings } from '../../types/jsonSettings';
import { getAuthData } from '../../selectors/getAuthData/getAuthData';
import { getJsonSettings } from '../../selectors/getJsonSettings/getJsonSettings';
import { setJsonSettingsMutation } from '../../../api/userApi';

export const saveJsonSettings = createAsyncThunk<JsonSettings, JsonSettings, ThunkConfig<string>>(
  `${USER_SLICE_NAME}/saveJsonSettings`,
  async (newJsonSettings: JsonSettings, { dispatch, rejectWithValue, getState }) => {
    const state = getState();
    const authData = getAuthData(state);
    if (!authData) return rejectWithValue('No current user auth data');
    const currentSettings = getJsonSettings(state);
    try {
      const response = await dispatch(
        setJsonSettingsMutation({ jsonSettings: { ...currentSettings, ...newJsonSettings }, userId: authData.id }),
      ).unwrap();
      if (!response.jsonSettings) {
        return rejectWithValue('Error updating json settings');
      }

      return response.jsonSettings;
    } catch (error) {
      return rejectWithValue('Unknown error in updating settings');
    }
  },
);
