import { StoreWithProfile, PROFILE_SLICE_NAME } from '../../types/profile';

export const getProfileIsLoading = (state: StoreWithProfile) => state[PROFILE_SLICE_NAME]?.isLoading;
