import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigateToNextMonthAction, navigateToPrevMonthAction } from '../../stores/actions/calendar';
import { selectCalendarMonth } from '../../stores/selectors/calendar';
import CalendarMonth from './CalendarMonth';

export default function Calendar() {
  const dispatch = useDispatch();

  const month = useSelector(selectCalendarMonth);
  const today = useMemo(() => new Date(), []);

  const handleNavigateToPrev = useCallback(() => {
    dispatch(navigateToPrevMonthAction());
  }, [dispatch]);

  const handleNavigateToNext = useCallback(() => {
    dispatch(navigateToNextMonthAction());
  }, [dispatch]);

  return (
    <CalendarMonth
      month={month}
      onNavigateToPrev={handleNavigateToPrev}
      onNavigateToNext={handleNavigateToNext}
      focusedDay={today}
    />
  );
}
