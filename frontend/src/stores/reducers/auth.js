import produce from 'immer';
import { AUTH_TOKEN_STORAGE_KEY } from '../../constants';
import { generateStorage } from '../../utils';
import * as authActions from '../actions/index';

export function createInitialCommonState() {
  const storage = generateStorage();

  return {
    authToken: storage.get(AUTH_TOKEN_STORAGE_KEY),
    user: null,
    loginStatus: 'INIT',
    isLoggingIn: false, // 로그인 시도중
    logInErrorRes: '', // 로그인 에러
    signUpStatus: 'INIT',
    isSignedUp: false, // 회원가입 성공
    isSigningUp: false, // 회원가입 시도중
    signUpErrorRes: '' // 회원가입 에러
  };
}

export function authReducer(state = createInitialCommonState(), action) {
  return produce(state, draft => {
    switch (action.type) {
      case authActions.AUTH_LOGIN: {
        draft.isLoggingIn = true;
        draft.logInErrorRes = '';
        break;
      }
      case authActions.AUTH_LOGIN_SUCCESS: {
        draft.isLoggingIn = false;
        draft.logInErrorRes = '';
        draft.user = action.payload.user;
        break;
      }
      case authActions.AUTH_LOGIN_FAILURE: {
        draft.isLoggingIn = false;
        draft.logInErrorRes = action.err;
        draft.user = null;
        break;
      }

      case authActions.AUTH_REGISTER: {
        draft.signUpStatus = 'WAITING';
        draft.isSignedUp = false;
        draft.isSigningUp = true;
        draft.signUpErrorRes = '';
        break;
      }
      case authActions.AUTH_REGISTER_SUCCESS: {
        draft.signUpStatus = 'SUCCESS';
        draft.isSignedUp = true;
        draft.isSigningUp = false;
        draft.authToken = action.payload.token;
        draft.user = action.payload.user;
        break;
      }
      case authActions.AUTH_REGISTER_FAILURE: {
        draft.signUpStatus = 'FAIL';
        draft.isSigningUp = false;
        draft.signUpErrorRes = action.err;
        break;
      }
      default: {
        break;
      }
    }
  });
}
