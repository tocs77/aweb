import { StoreWithProfile, PROFILE_CARD_SLICE_NAME } from '../../types/editableProfileCardSchema';

export const getProfileValidateErrors = (state: StoreWithProfile) => state[PROFILE_CARD_SLICE_NAME]?.validateErrors;
