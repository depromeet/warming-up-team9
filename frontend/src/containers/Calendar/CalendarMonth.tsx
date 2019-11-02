import { format, isSameDay } from 'date-fns';
import React, { memo, useCallback, useMemo } from 'react';
import { getCalendarMonthWeeks } from '../../utils';
import styled from '@emotion/styled';
import CalendarDay from './CalendarDay';
import CalendarMonthHead from './CalendarMonthHead';
import CalendarWeek from './CalendarWeek';
import { NAVIGATOR_SIZE } from './sizes';
import arrowLeft from './arrow-left.svg';
import arrowRight from './arrow-right.svg';

interface Props {
  month: Date;
  focusedDay?: Date;
  className?: string;
}

function CalendarMonth({ month, focusedDay, className }: Props) {
  const weeks = useMemo(() => getCalendarMonthWeeks(month), [month]);
  const monthTitle = useMemo(() => format(month, 'MMMM'), [month]);

  const getTabIndexForDay = useCallback(
    (date: Date) => {
      return focusedDay !== undefined && isSameDay(focusedDay, date) ? 0 : -1;
    },
    [focusedDay]
  );

  return (
    <Wrapper className={className}>
      <Navigator>
        <NavigateButton aria-label="이전 달">
          <img src={arrowLeft} alt="" aria-hidden={true} />
        </NavigateButton>
        <Title>{monthTitle}</Title>
        <NavigateButton aria-label="다음 달">
          <img src={arrowRight} alt="" aria-hidden={true} />
        </NavigateButton>
      </Navigator>
      <Table role="presentation">
        <CalendarMonthHead />
        <tbody>
          {weeks.map((week, i) => (
            <CalendarWeek key={i}>
              {week.map(({ day, isOutsideDay }, dayOfWeek) => (
                <CalendarDay key={dayOfWeek} day={day} isEmptyCell={isOutsideDay} tabIndex={getTabIndexForDay(day)} />
              ))}
            </CalendarWeek>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}

export default memo(CalendarMonth);

const Wrapper = styled.div`
  padding: 24px 0;
  background-color: #61676f;
  border-radius: 10px;
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
  display: block;
  width: 100%;

  & > tbody {
    display: block;
    width: 100%;
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
