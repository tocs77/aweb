import { createSelector } from '@reduxjs/toolkit';
import { StoreWithUser, USER_SLICE_NAME } from '../../types/user';

export const getUserRoles = (state: StoreWithUser) => state[USER_SLICE_NAME].authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) => Boolean(roles?.includes('ADMIN')));
export const isUserManager = createSelector(getUserRoles, (roles) => Boolean(roles?.includes('MANAGER')));
