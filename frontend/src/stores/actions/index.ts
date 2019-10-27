import { ActionType } from 'typesafe-actions';
import * as commonActions from './common';

export type Actions = ActionType<typeof commonActions>;

export * from './common';
