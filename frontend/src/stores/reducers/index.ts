import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { commonReducer } from './common';

export const rootReducer = combineReducers({
  common: commonReducer,
});

export type State = StateType<typeof rootReducer>;
