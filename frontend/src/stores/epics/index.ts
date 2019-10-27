import { combineEpics } from 'redux-observable';
import { commonEpic } from './common';

export const rootEpic = combineEpics(commonEpic);
