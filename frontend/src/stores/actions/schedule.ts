import { Schedule } from '../../models/schedule';

export const SCHEDULE_ACTION_TYPES = {
  loadTodaySchedules: 'schedule/load-today-schedules',
  loadTodaySchedulesComplete: 'schedule/load-today-schedules-complete',
  loadTodaySchedulesFail: 'schedule/load-today-schedules-fail',
  addTodaySchedule: 'schedule/add-schedule',
};

export const loadTodaySchedulesAction = () => ({
  type: SCHEDULE_ACTION_TYPES.loadTodaySchedules,
});

export const loadTodaySchedulesActionComplete = (schedules: Schedule[]) => ({
  type: SCHEDULE_ACTION_TYPES.loadTodaySchedulesComplete,
  payload: { schedules },
});

export const loadTodaySchedulesActionFail = (error: Error) => ({
  type: SCHEDULE_ACTION_TYPES.loadTodaySchedulesFail,
  error,
});

export const addTodayScheduleAction = () => ({
  type: SCHEDULE_ACTION_TYPES.addTodaySchedule,
});
