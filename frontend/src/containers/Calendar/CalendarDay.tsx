import styled from '@emotion/styled';
import { format } from 'date-fns';
import React, { memo, MouseEvent, useCallback, useMemo } from 'react';
import { cloneDate } from '../../utils';
import carrotImage from './carrot.svg';

interface Props {
  day: Date;
  showCarrot?: boolean;
  showDot?: boolean;
  isEmptyCell?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  tabIndex?: 0 | -1;
  onDayClick?: (day: Date, event: MouseEvent) => void;
}

function isFirstDayOfWeek(date: Date) {
  return date.getDay() === 0;
}

function isLastDayOfWeek(date: Date) {
  return date.getDay() === 6;
}

function CalendarDay({
  day,
  showDot,
  showCarrot,
  isEmptyCell,
  isSelected,
  isDisabled,
  tabIndex = -1,
  onDayClick,
}: Props) {
  const content = useMemo(() => format(day, 'd'), [day]);
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (isEmptyCell || isDisabled) {
        return;
      }

      if (onDayClick !== undefined) {
        onDayClick(cloneDate(day), event);
      }
    },
    [day, onDayClick, isEmptyCell, isDisabled]
  );

  return (
    <Day
      role={isEmptyCell ? 'presentation' : 'button'}
      aria-disabled={isEmptyCell ? undefined : isDisabled}
      onClick={handleClick}
      tabIndex={isEmptyCell ? undefined : tabIndex}
      empty={isEmptyCell}
      selected={isSelected}
      disabled={isDisabled}
      firstDayOfWeek={isFirstDayOfWeek(day)}
      lastDayOfWeek={isLastDayOfWeek(day)}
    >
      <Inner>{isEmptyCell ? '' : content}</Inner>
      {showDot && !isEmptyCell && <Dot />}
      {showCarrot && !isEmptyCell && <CarrotImage src={carrotImage} aria-hidden={true} alt="" />}
    </Day>
  );
}

export default memo(CalendarDay);

const Day = styled.td<{
  empty?: boolean;
  selected?: boolean;
  showCarrot?: boolean;
  disabled?: boolean;
  firstDayOfWeek?: boolean;
  lastDayOfWeek?: boolean;
}>`
  flex: 1 1 14.285%; // 100 / 7 = 14.285%

  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  border: none;
  margin: 0;
  padding: 2px;

  user-select: none;

  cursor: ${props => (props.disabled || props.empty ? 'default' : 'cursor')};

  ${props =>
    props.selected
      ? `
    border-radius: 8px;
    background-color: #44484e;
  `
      : ''};
`;

const Inner = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #e8e6e6;
  line-height: 18px;
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  background-color: #ff5001;
  border-radius: 50%;
  margin-top: 4px;
`;

const CarrotImage = styled.img`
  width: 17px;
  height: 17px;
  position: absolute;
  display: inline-block;
  right: 4px;
  top: 3px;
`;
