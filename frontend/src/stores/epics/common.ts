import { combineEpics } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { fetchUser } from '../../remotes/api';
import { checkAuthAction } from '../actions';
import { Epic } from './typings';

export const checkAuthEpic: Epic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(checkAuthAction.request)),
    switchMap(() => {
      const { authToken } = state$.value.common;

      if (!authToken) {
        return of(checkAuthAction.success({ isAuthenticated: false }));
      }

      return fetchUser(authToken).pipe(
        map(user => checkAuthAction.success({ isAuthenticated: true, user })),
        catchError(error => of(checkAuthAction.failure({ error })))
      );
    })
  );

export const commonEpic = combineEpics(checkAuthEpic);
