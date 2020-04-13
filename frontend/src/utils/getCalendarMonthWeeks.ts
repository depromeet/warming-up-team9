import { addDays, differenceInDays, format, isSameMonth, lastDayOfMonth, startOfMonth, subDays } from 'date-fns';
import { normalizeCalendarDay } from './normalizeCalendarDay';
import { cloneDate } from './cloneDate';

export interface WeekDay {
  yyyyMMdd: string;
  day: Date;
  isOutsideDay: boolean;
}

function getMonthKey(month: Date) {
  return format(month, 'yyyy-MM');
}

const memoizedMonthWeeks = new Map<string, WeekDay[][]>();

export function getCalendarMonthWeeks(month: Date): WeekDay[][] {
  const memoKey = getMonthKey(month);

  if (memoizedMonthWeeks.has(memoKey)) {
    return memoizedMonthWeeks.get(memoKey)!;
  }

  // set utc offset to get correct dates in future (when timezone changes)
  const firstDateOfMonth = normalizeCalendarDay(startOfMonth(month));
  const lastDateOfMonth = normalizeCalendarDay(lastDayOfMonth(month));

  const prevDays = firstDateOfMonth.getDay();
  const nextDays = 7 - lastDateOfMonth.getDay();
  const firstDay = subDays(firstDateOfMonth, prevDays);
  const lastDay = addDays(lastDateOfMonth, nextDays);

  const totalDays = differenceInDays(lastDay, firstDay);

  const weeks: WeekDay[][] = [];
  let currentDay = firstDay;

  for (let i = 0; i < totalDays; i += 1) {
    if (i % 7 === 0) {
      weeks.push([]);
    }

    weeks[weeks.length - 1].push({
      yyyyMMdd: format(currentDay, 'yyyyMMdd'),
      day: cloneDate(currentDay),
      isOutsideDay: !isSameMonth(month, currentDay),
    });

    currentDay = addDays(currentDay, 1);
  }

  memoizedMonthWeeks.set(memoKey, weeks);
  return weeks;
}
