import { StoreWithProfile, PROFILE_SLICE_NAME } from '../../types/profile';

export const getProfileValidateErrors = (state: StoreWithProfile) => state[PROFILE_SLICE_NAME]?.validateErrors;
