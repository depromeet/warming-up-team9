import { createSelector } from 'reselect';
import { CalendarState } from '../reducers/calendar';

export const selectCalendarState = (state: any) => state.calendar as CalendarState;

export const selectCalendarMonth = createSelector(
  selectCalendarState,
  state => state.month
);

export const selectCalendarSchedules = createSelector(
  selectCalendarState,
  state => state.schedules
);
