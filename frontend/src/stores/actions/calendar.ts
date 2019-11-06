export const CALENDAR_ACTIONS = {
  navigateToPrevMonth: 'calendar/navigate-to-prev-month',
  navigateToNextMonth: 'calendar/navigate-to-next-month',
};

export const navigateToPrevMonthAction = () => ({
  type: CALENDAR_ACTIONS.navigateToPrevMonth,
});

export const navigateToNextMonthAction = () => ({
  type: CALENDAR_ACTIONS.navigateToNextMonth,
});
