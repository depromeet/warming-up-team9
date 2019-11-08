import { combineEpics } from 'redux-observable';
import { calendarEpics } from './calendar';

export const rootEpic = combineEpics(calendarEpics);
