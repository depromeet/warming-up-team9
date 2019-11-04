import * as authActions from '../actions/auth';

const initialState = {
  token: localStorage.getItem('token'), // 토큰 받아오기
  isAuthenticated: localStorage.getItem('token')? true : false, // 현재 상태 받아오기
  user: {},
  register: {
    status: 'INIT',
    error: -1
  }
}

export function authReducer(state = initialState, action){
  switch (action.type) {
    case authActions.AUTH_LOGIN:
      return {
        ...state,
        login: {
          ...state.login,
          status: 'WAITING'
        }
      };
    case authActions.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          status: 'SUCCESS'
        },
        isAuthenticated: true,
        user: action.payload
      };
    case authActions.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        login: {
          ...state.login,
          status: 'FAILURE'
        },
        isAuthenticated: false,
        user: null,
        token: null
      };

    case authActions.AUTH_REGISTER:
        return {
          ...state,
          register: {
            ...state.register,
            status: 'WAITING',
            error: -1
          }
        };
      case authActions.AUTH_REGISTER_SUCCESS:
        return {
          ...state,
          register: {
            ...state.register,
            status: 'SUCCESS'
          },
          token: action.payload.token,
          user: action.patload.user,
          isAuthenticated: true
        };
      case authActions.AUTH_REGISTER_FAILURE:
        return {
          ...state,
          register: {
            ...state.register,
            status: 'FAILURE',
            error: action.error
          },
          isAuthenticated: false,
          user: null,
          token: null
        };
    default: 
      return state;
  }
}