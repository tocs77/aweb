import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { updateFeatureFlagsMutation } from '../api/featuresFlagApi';
import { getAllFeatureFlags, setFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagOptions {
  userId: string;
  newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlag = createAsyncThunk<void, UpdateFeatureFlagOptions, ThunkConfig<string>>(
  'features/updateFeatureFlag',
  async ({ userId, newFeatures }, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
      await dispatch(
        updateFeatureFlagsMutation({
          userId,
          features: {
            ...getAllFeatureFlags(),
            ...newFeatures,
          },
        }),
      );
      setFeatureFlags(newFeatures);
      return undefined;
    } catch (e) {
      console.log(e);
      return rejectWithValue('');
    }
  },
);
