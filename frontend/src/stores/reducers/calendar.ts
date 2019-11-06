import { addMonths, subMonths } from 'date-fns';
import produce from 'immer';
import { Action } from 'redux';
import { CALENDAR_ACTIONS } from '../actions/calendar';

export interface CalendarState {
  readonly month: Date;
}

export function createInitialCalendarState(): CalendarState {
  return {
    month: new Date(),
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
    }
  });
}
