import { StoreWithProfile, PROFILE_SLICE_NAME } from '../../types/profile';

export const getProfileForm = (state: StoreWithProfile) => state[PROFILE_SLICE_NAME]?.form;
