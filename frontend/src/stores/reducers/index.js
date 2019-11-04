import { combineReducers } from 'redux';
import { commonReducer } from './common';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  common: commonReducer,
  auth : authReducer
});
