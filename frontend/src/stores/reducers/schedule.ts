import produce from 'immer';
import { Schedule } from '../../models/schedule';
import { loadTodaySchedulesActionComplete, SCHEDULE_ACTION_TYPES } from '../actions/schedule';

export interface ScheduleState {
  readonly todaySchedules: Schedule[];
  readonly isLoading: boolean;
  readonly isInitialized: boolean;
}

export function createInitialScheduleState(): ScheduleState {
  return {
    todaySchedules: [],
    isLoading: false,
    isInitialized: false,
  };
}

export function scheduleReducer(state = createInitialScheduleState(), action: any) {
  return produce(state, draft => {
    let index: number;

    switch (action.type) {
      case SCHEDULE_ACTION_TYPES.loadTodaySchedules:
        draft.isLoading = true;
        break;
      case SCHEDULE_ACTION_TYPES.loadTodaySchedulesComplete:
        draft.todaySchedules = (action as ReturnType<typeof loadTodaySchedulesActionComplete>).payload.schedules;
        draft.isLoading = false;
        draft.isInitialized = true;
        break;
      case SCHEDULE_ACTION_TYPES.loadTodaySchedulesFail:
        draft.isLoading = false;
        break;
      case SCHEDULE_ACTION_TYPES.updateProcessTimeSec:
        index = state.todaySchedules.findIndex(s => s.scheduleId === action.payload.scheduleId);

        if (index > -1) {
          draft.todaySchedules[index].processTimeSec = action.payload.processTimeSec;
        }
        break;
    }
  });
}
