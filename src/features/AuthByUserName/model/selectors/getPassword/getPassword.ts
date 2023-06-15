import { createSelector } from '@reduxjs/toolkit';
import { getLoginState } from '../getLoginState/getLoginState';
export const getPassword = createSelector(getLoginState, (state) => state.password);