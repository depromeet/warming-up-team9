import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigateToNextMonthAction, navigateToPrevMonthAction } from '../../stores/actions/calendar';
import { selectCalendarMonth, selectCalendarSchedules } from '../../stores/selectors/calendar';
import Dialog from '../../components/Dialog';
import RetrosWrite from '../../containers/RetrosWrite';
import CalendarMonth from './CalendarMonth';

export default function Calendar() {
  const dispatch = useDispatch();

  const month = useSelector(selectCalendarMonth);
  const schedules = useSelector(selectCalendarSchedules);
  const today = useMemo(() => new Date(), []);

  const handleNavigateToPrev = useCallback(() => {
    dispatch(navigateToPrevMonthAction());
  }, [dispatch]);

  const handleNavigateToNext = useCallback(() => {
    dispatch(navigateToNextMonthAction());
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const handleClick = useCallback(() => {
    setShow(!show);
  }, [show]);

  return (
    <>
      <CalendarMonth
        month={month}
        schedules={schedules}
        onNavigateToPrev={handleNavigateToPrev}
        onNavigateToNext={handleNavigateToNext}
        focusedDay={today}
        dayClick={handleClick}
      />
      <Dialog show={show} handleClose={handleClick}>
        <RetrosWrite onButtonClick={handleClick}/>
      </Dialog>
    </>
  );
}
