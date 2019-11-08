import * as axios from 'axios';

/* ActionTypes */
export const AUTH_LOGIN = "auth/AUTH_LOGIN";
export const AUTH_LOGIN_SUCCESS = "auth/AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "auth/AUTH_LOGIN_FAILURE";

export const AUTH_REGISTER = "auth/AUTH_REGISTER";
export const AUTH_REGISTER_SUCCESS = "auth/AUTH_REGISTER_SUCCESS";
export const AUTH_REGISTER_FAILURE = "auth/AUTH_REGISTER_FAILURE";

export const API = 'http://api-jjayo.depromeet.com'


export function login() {
  return {
    type: AUTH_LOGIN
  };
}

export function loginSuccess(email) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    email
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE,
    // error
  };
}

export async function loginUserAPI(values) {
  try {
    const res = await axios.post(`${API}/auth/login`, values, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
    console.log(res);
    return res;
  } catch (err) {
    console.log(err.message, err.code);
  }
}

export function loginUser(values) {
  return async dispatch => {
    // 서버에서 따로 응답을 받지 않았다면 정상 작동
    dispatch(login());
    // dispatch를 통해 받아온 값을 서버에 보냄
    const data = await loginUserAPI(values);
    dispatch(registerSuccess(data));
    try {
      dispatch(loginSuccess());
    } catch (err) {
      dispatch(loginFailure());
    }
  }
}


export const register = () => {
  return {
    type: AUTH_REGISTER
  };
}

export const registerSuccess = (payload) => {
  return {
    type: AUTH_REGISTER_SUCCESS,
    payload
  };
}

export const registerFailure = (error) => {
  return {
    type: AUTH_REGISTER_FAILURE,
    error
  };
}

export async function registerUserAPI(values) {
  try {
    const res = await axios.post(`${API}/users`, values, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
    console.log(res);
    return res;
  } catch (err) {
    console.log(err.message, err.code);
  }
}

export function registerUser(values) {
  return async dispatch => {
    dispatch(register());
    try {
      console.log('성공');
      const data = await registerUserAPI(values);
      dispatch(registerSuccess(data));
    } catch (err) {
      console.log('이미 존재하는 이메일');
      dispatch(registerFailure(err));
    }
  }
}
