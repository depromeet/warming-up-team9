import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

const MINUTES = 60 * 1000;
const getDate = () => format(new Date(), 'MM월 dd일 ') + days[new Date().getDay()];
const getTime = () => format(new Date(), 'hh:mm aaa');

export function useTodayTimer() {
  const [date, setDate] = useState(getDate());
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setDate(getDate());
      setTime(getTime());
    }, [MINUTES]);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return { date, time };
}
