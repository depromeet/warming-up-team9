import { addMonths, subMonths } from 'date-fns';
import produce from 'immer';
import { Action } from 'redux';
import { CALENDAR_ACTIONS, updateSchedulesAction } from '../actions/calendar';

export interface CalendarDaySchedule {
  [yyyyMMdd: string]: {
    readonly hasSchedule: boolean;
    readonly hasReview: boolean;
  };
}

export interface CalendarState {
  readonly month: Date;
  readonly schedules: CalendarDaySchedule;
}

export function createInitialCalendarState(): CalendarState {
  return {
    month: new Date(),
    schedules: {},
  };
}

export function calendarReducer(state: CalendarState = createInitialCalendarState(), action: Action) {
  return produce(state, draft => {
    switch (action.type) {
      case CALENDAR_ACTIONS.navigateToPrevMonth:
        draft.month = subMonths(state.month, 1);
        break;
      case CALENDAR_ACTIONS.navigateToNextMonth:
        draft.month = addMonths(state.month, 1);
        break;
      case CALENDAR_ACTIONS.updateSchedules:
        draft.schedules = (action as ReturnType<typeof updateSchedulesAction>).payload.schedules;
        break;
    }
  });
}
