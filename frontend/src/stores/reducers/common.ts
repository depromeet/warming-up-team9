import produce from 'immer';
import { createReducer } from 'typesafe-actions';
import { AUTH_TOKEN_STORAGE_KEY } from '../../constants';
import { User } from '../../models';
import { generateStorage } from '../../utils';
import { Actions, checkAuthAction } from '../actions';

export interface CommonState {
  readonly isCheckingAuth: boolean;
  readonly authToken: string | null;
  readonly user: User | null;
}

export function createInitialCommonState(): CommonState {
  const storage = generateStorage();

  return {
    isCheckingAuth: false,
    authToken: storage.get(AUTH_TOKEN_STORAGE_KEY),
    user: null,
  };
}

export const commonReducer = createReducer<CommonState, Actions>(createInitialCommonState())
  .handleAction(checkAuthAction.request, state => {
    return produce(state, draft => {
      draft.isCheckingAuth = true;
    });
  })
  .handleAction(checkAuthAction.success, (state, action) => {
    return produce(state, draft => {
      draft.isCheckingAuth = false;

      if (action.payload.isAuthenticated) {
        draft.user = action.payload.user;
      }
    });
  })
  .handleAction(checkAuthAction.failure, state => {
    return produce(state, draft => {
      draft.isCheckingAuth = false;
    });
  });
