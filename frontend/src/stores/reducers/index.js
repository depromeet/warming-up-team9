import { combineReducers } from 'redux';
import { commonReducer } from './common';
import { tasksReducer } from './tasks';

export const rootReducer = combineReducers({
  common: commonReducer,
  tasks: tasksReducer,
});
