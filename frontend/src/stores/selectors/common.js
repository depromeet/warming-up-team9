import { createSelector } from 'reselect';

export const selectCommonState = state => state.common;

export const selectAuthToken = createSelector(
  selectCommonState,
  state => state.authToken
);

export const selectIsCommonInitialized = createSelector(
  selectCommonState,
  state => state.isInitialized
);

export const selectIsCheckingAuth = createSelector(
  selectCommonState,
  state => state.isCheckingAuth
);

export const selectUser = createSelector(
  selectCommonState,
  state => state.user
);
