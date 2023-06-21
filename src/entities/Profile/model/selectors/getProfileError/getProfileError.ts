import { StoreWithProfile, PROFILE_SLICE_NAME } from '../../types/profile';

export const getProfileError = (state: StoreWithProfile) => state[PROFILE_SLICE_NAME]?.error;
