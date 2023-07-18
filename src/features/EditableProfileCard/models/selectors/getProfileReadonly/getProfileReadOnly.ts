import { StoreWithProfile, PROFILE_CARD_SLICE_NAME } from '../../types/editableProfileCardSchema';

export const getProfileReadOnly = (state: StoreWithProfile) => state[PROFILE_CARD_SLICE_NAME]?.readonly;
