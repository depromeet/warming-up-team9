import { createAsyncAction } from 'typesafe-actions';
import { User } from '../../models';

type CheckAuthResult =
  | {
      isAuthenticated: true;
      user: User;
    }
  | {
      isAuthenticated: false;
    };

export const checkAuthAction = createAsyncAction(
  'common/check-auth',
  'common/check-auth-success',
  'common/check-auth-fail'
)<void, CheckAuthResult, { error: Error }>();
