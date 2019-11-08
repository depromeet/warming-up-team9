import { CalendarDaySchedule } from '../reducers/calendar';

export const CALENDAR_ACTIONS = {
  navigateToPrevMonth: 'calendar/navigate-to-prev-month',
  navigateToNextMonth: 'calendar/navigate-to-next-month',
  updateSchedules: 'calendar/update-schedules',
};

export const navigateToPrevMonthAction = () => ({
  type: CALENDAR_ACTIONS.navigateToPrevMonth,
});

export const navigateToNextMonthAction = () => ({
  type: CALENDAR_ACTIONS.navigateToNextMonth,
});

export const updateSchedulesAction = (schedules: CalendarDaySchedule) => ({
  type: CALENDAR_ACTIONS.updateSchedules,
  payload: { schedules },
});
