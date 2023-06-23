import { StoreWithProfile, PROFILE_SLICE_NAME } from '../../types/profile';

export const getProfileReadOnly = (state: StoreWithProfile) => state[PROFILE_SLICE_NAME]?.readonly;
