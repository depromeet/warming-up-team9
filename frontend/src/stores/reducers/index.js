import { combineReducers } from 'redux';
import { commonReducer } from './common';
import { tasksReducer } from './tasks';
import { calendarReducer } from './calendar';

export const rootReducer = combineReducers({
  common: commonReducer,
  tasks: tasksReducer,
  calendar: calendarReducer,
});
