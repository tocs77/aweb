import { createSelector } from '@reduxjs/toolkit';
import { getLoginState } from '../getLoginState/getLoginState';
export const getError = createSelector(getLoginState, (state) => state.error);
