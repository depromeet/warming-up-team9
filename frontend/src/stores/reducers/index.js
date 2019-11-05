import { combineReducers } from 'redux';
import { commonReducer } from './common';
import { tasksReducer } from './tasks';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  common: commonReducer,
  tasks: tasksReducer,
  auth : authReducer
});
