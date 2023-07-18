import { StoreWithProfile, PROFILE_CARD_SLICE_NAME } from '../../types/editableProfileCardSchema';

export const getProfile = (state: StoreWithProfile) => state[PROFILE_CARD_SLICE_NAME]?.data;
