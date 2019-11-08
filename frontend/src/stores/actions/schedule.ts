import { Schedule } from '../../models/schedule';

export const SCHEDULE_ACTION_TYPES = {
  loadTodaySchedules: 'schedule/load-today-schedules',
  loadTodaySchedulesComplete: 'schedule/load-today-schedules-complete',
  loadTodaySchedulesFail: 'schedule/load-today-schedules-fail',
  addTodaySchedule: 'schedule/add-schedule',
  playSchedule: 'schedule/play-schedule',
  pauseSchedule: 'schedule/pause-schedule',
  completeSchedule: 'schedule/complete-schedule',
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

export const playScheduleAction = () => ({
  type: SCHEDULE_ACTION_TYPES.playSchedule,
});

export const pauseScheduleAction = () => ({
  type: SCHEDULE_ACTION_TYPES.pauseSchedule,
});

export const completeScheduleAction = () => ({
  type: SCHEDULE_ACTION_TYPES.completeSchedule,
});
