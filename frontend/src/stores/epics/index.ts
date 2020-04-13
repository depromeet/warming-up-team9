import { combineEpics } from 'redux-observable';
import { calendarEpics } from './calendar';
import { scheduleEpics } from './schedule';

export const rootEpic = combineEpics(calendarEpics, scheduleEpics);
