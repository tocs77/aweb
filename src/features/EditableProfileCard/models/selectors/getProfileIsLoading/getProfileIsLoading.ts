import { StoreWithProfile, PROFILE_CARD_SLICE_NAME } from '../../types/editableProfileCardSchema';

export const getProfileIsLoading = (state: StoreWithProfile) => state[PROFILE_CARD_SLICE_NAME]?.isLoading;
