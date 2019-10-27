import { Epic as _Epic } from 'redux-observable';
import { Actions } from '../actions';
import { State } from '../reducers';

export type Epic = _Epic<Actions, Actions, State>;
