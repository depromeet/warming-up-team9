import { combineReducers } from 'redux';
import { commonReducer } from './common';

export const rootReducer = combineReducers({
  common: commonReducer,
});
