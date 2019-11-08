import { addDays, differenceInDays, format, lastDayOfMonth, startOfMonth } from 'date-fns';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { EMPTY } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { API_ROOT } from '../../remotes/api';
import { CALENDAR_ACTIONS, updateSchedulesAction } from '../actions/calendar';
import { CalendarDaySchedule, CalendarState } from '../reducers/calendar';

const calendarSchedulesEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CALENDAR_ACTIONS.navigateToNextMonth, CALENDAR_ACTIONS.navigateToPrevMonth),
    startWith(null),
    switchMap(() => {
      const state = state$.value;
      const { authToken } = state.common;
      const { month } = state.calendar as CalendarState;

      const startDate = startOfMonth(month);
      const endDate = lastDayOfMonth(month);

      const startDateStr = format(startDate, 'yyyy-MM-dd');
      const endDateStr = format(endDate, 'yyyy-MM-dd');

      return ajax
        .get(`${API_ROOT}/users/me/schedules?startDate=${startDateStr}&endDate=${endDateStr}`, {
          Authorization: authToken,
        })
        .pipe(
          map(res => res.response as Array<{ hasSchedule: boolean; hasReview: boolean }>),
          map(schedules => {
            let index = startDate;
            const totalDays = differenceInDays(endDate, startDate);
            const parsed: CalendarDaySchedule = {};

            console.log(schedules);

            for (let i = 0; i < totalDays; i += 1) {
              const yyyyMMdd = format(index, 'yyyyMMdd');

              parsed[yyyyMMdd] = {
                hasSchedule: false,
                hasReview: false,
                ...schedules[i],
              };
              index = addDays(index, 1);
            }

            return updateSchedulesAction(parsed);
          }),
          catchError(() => EMPTY)
        );
    })
  );

export const calendarEpics = combineEpics(calendarSchedulesEpic);
