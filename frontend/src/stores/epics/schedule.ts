import { format } from 'date-fns';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mapTo, switchMap } from 'rxjs/operators';
import { Schedule } from '../../models/schedule';
import { API_ROOT } from '../../remotes/api';
import {
  loadTodaySchedulesAction,
  loadTodaySchedulesActionComplete,
  loadTodaySchedulesActionFail,
  SCHEDULE_ACTION_TYPES,
} from '../actions/schedule';

const loadSchedulesEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(SCHEDULE_ACTION_TYPES.loadTodaySchedules),
    switchMap(() => {
      const { authToken } = state$.value.common;
      const today = format(new Date(), 'yyyy-MM-dd');

      return ajax
        .get(`${API_ROOT}/users/me/schedules/${today}`, {
          Authorization: authToken,
        })
        .pipe(
          map(res => res.response as Schedule[]),
          map(loadTodaySchedulesActionComplete),
          catchError(error => of(loadTodaySchedulesActionFail(error)))
        );
    })
  );

const reloadSchedulesEpic: Epic = action$ =>
  action$.pipe(
    ofType(
      SCHEDULE_ACTION_TYPES.addTodaySchedule,
      SCHEDULE_ACTION_TYPES.playSchedule,
      SCHEDULE_ACTION_TYPES.pauseSchedule,
      SCHEDULE_ACTION_TYPES.completeSchedule
    ),
    mapTo(loadTodaySchedulesAction())
  );

export const scheduleEpics = combineEpics(loadSchedulesEpic, reloadSchedulesEpic);
