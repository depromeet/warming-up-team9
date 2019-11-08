import styled from '@emotion/styled';
import { format, isSameDay } from 'date-fns';
import React, { memo, useCallback, useMemo } from 'react';
import { CalendarDaySchedule } from '../../stores/reducers/calendar';
import { getCalendarMonthWeeks } from '../../utils';
import arrowLeft from './arrow-left.svg';
import arrowRight from './arrow-right.svg';
import CalendarDay from './CalendarDay';
import CalendarMonthHead from './CalendarMonthHead';
import CalendarWeek from './CalendarWeek';
import { NAVIGATOR_SIZE } from './sizes';

interface Props {
  month: Date;
  schedules: CalendarDaySchedule;
  onNavigateToPrev?: () => void;
  onNavigateToNext?: () => void;
  focusedDay?: Date;
  className?: string;
}

function CalendarMonth({ month, schedules, onNavigateToPrev, onNavigateToNext, focusedDay, className }: Props) {
  const weeks = useMemo(() => getCalendarMonthWeeks(month), [month]);
  const monthTitle = useMemo(() => format(month, 'MMMM'), [month]);

  const getIfFocusedDay = useCallback(
    (date: Date) => {
      return focusedDay !== undefined && isSameDay(focusedDay, date);
    },
    [focusedDay]
  );

  return (
    <Wrapper className={className}>
      <Navigator>
        <NavigateButton aria-label="이전 달" onClick={onNavigateToPrev}>
          <img src={arrowLeft} alt="" aria-hidden={true} />
        </NavigateButton>
        <Title>{monthTitle}</Title>
        <NavigateButton aria-label="다음 달" onClick={onNavigateToNext}>
          <img src={arrowRight} alt="" aria-hidden={true} />
        </NavigateButton>
      </Navigator>
      <Table role="presentation">
        <CalendarMonthHead />
        <tbody>
          {weeks.map((week, i) => (
            <CalendarWeek key={i}>
              {week.map(({ yyyyMMdd, day, isOutsideDay }, dayOfWeek) => {
                const isFocusedDay = getIfFocusedDay(day);

                return (
                  <CalendarDay
                    key={dayOfWeek}
                    day={day}
                    isEmptyCell={isOutsideDay}
                    tabIndex={isFocusedDay ? 0 : -1}
                    isSelected={isFocusedDay}
                    showCarrot={schedules[yyyyMMdd].hasReview}
                    showDot={schedules[yyyyMMdd].hasSchedule}
                  />
                );
              })}
            </CalendarWeek>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}

export default memo(CalendarMonth);

const Wrapper = styled.div`
  padding: 20px 0 0 0;
  background-color: #61676f;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
`;

const Navigator = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const NavigateButton = styled.button`
  width: ${NAVIGATOR_SIZE}px;
  height: ${NAVIGATOR_SIZE}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #838e9b;
  outline: 0;

  &:disabled {
    cursor: default;
    opacity: 0.75;
  }

  & > img {
    width: 10px;
  }
`;

const Table = styled.table`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 1 auto;

  & > tbody {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    flex: 1 1 auto;
  }
`;

const Title = styled.h1`
  margin: 0;
  line-height: ${NAVIGATOR_SIZE}px;
  min-width: 150px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;
