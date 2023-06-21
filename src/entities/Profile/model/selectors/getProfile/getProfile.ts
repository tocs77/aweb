import { StoreWithProfile, PROFILE_SLICE_NAME } from '../../types/profile';

export const getProfile = (state: StoreWithProfile) => state[PROFILE_SLICE_NAME]?.data;
