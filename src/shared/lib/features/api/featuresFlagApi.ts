import { rtkApi } from '@/shared/api/rtkApi';
import { FeatureFlags } from '@/shared/types';

interface UpdateFeatureFlagsArgs {
  userId: string;
  features: Partial<FeatureFlags>;
}

const featuresFlagApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsArgs>({
      query: ({ userId, features }) => ({ url: `/users/${userId}`, body: { features }, method: 'PATCH' }),
    }),
  }),
});

export const updateFeatureFlagsMutation = featuresFlagApi.endpoints.updateFeatureFlags.initiate;
