import { createSelector } from 'reselect';
import { ScheduleState } from '../reducers/schedule';

export const selectScheduleState = (state: any) => state.schedule as ScheduleState;

export const selectIsScheduleInitialized = createSelector(
  selectScheduleState,
  state => state.isInitialized
);

export const selectTodaySchedules = createSelector(
  selectScheduleState,
  state => state.todaySchedules
);

export const selectTodayAttainmentRate = createSelector(
  selectTodaySchedules,
  schedules => {
    if (schedules.length === 0) {
      return 0;
    }

    const total = schedules.reduce((acc, s) => acc + s.estimatedHour * 60 * 60, 0);
    const spend = schedules.reduce((acc, s) => acc + s.processTimeSec, 0);

    return Math.floor((spend / total) * 100);
  }
);

export const selectTodayAssignedHours = createSelector(
  selectTodaySchedules,
  schedules => schedules.reduce((acc, s) => acc + s.estimatedHour, 0)
);
