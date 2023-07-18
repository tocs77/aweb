import { createSelector } from '@reduxjs/toolkit';
import { getProfile } from '../getProfile/getProfile';

export const getProfileFirstName = createSelector(getProfile, (state) => state?.first || '');
