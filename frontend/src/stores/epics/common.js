import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { fetchUser } from '../../remotes/api';
import { checkAuthFailAction, checkAuthSuccessAction, COMMON_ACTION_TYPES } from '../actions/index';

export const checkAuthEpic = (action$, state$) =>
  action$.pipe(
    ofType(COMMON_ACTION_TYPES.checkAuth),
    switchMap(() => {
      const { authToken } = state$.value.common;

      if (!authToken) {
        return of(checkAuthSuccessAction({ isAuthenticated: false }));
      }

      return fetchUser(authToken).pipe(
        map(user => checkAuthSuccessAction({ isAuthenticated: true, user })),
        catchError(error => of(checkAuthFailAction({ error })))
      );
    })
  );

export const commonEpic = combineEpics(checkAuthEpic);
