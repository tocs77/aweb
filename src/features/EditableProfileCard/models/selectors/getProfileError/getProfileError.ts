import { StoreWithProfile, PROFILE_CARD_SLICE_NAME } from '../../types/editableProfileCardSchema';

export const getProfileError = (state: StoreWithProfile) => state[PROFILE_CARD_SLICE_NAME]?.error;
