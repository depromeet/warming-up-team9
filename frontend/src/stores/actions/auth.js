import axios from 'axios';

/* ActionTypes */
export const AUTH_LOGIN = "auth/AUTH_LOGIN";
export const AUTH_LOGIN_SUCCESS = "auth/AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "auth/AUTH_LOGIN_FAILURE";

export const AUTH_REGISTER = "auth/AUTH_REGISTER";
export const AUTH_REGISTER_SUCCESS = "auth/AUTH_REGISTER_SUCCESS";
export const AUTH_REGISTER_FAILURE = "auth/AUTH_REGISTER_FAILURE";

const API = 'http://jjayo-lb8a1-9y8obmv86z48-1047689790.ap-northeast-2.elb.amazonaws.com'


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

// export async function loginUser(values) {
//   return (dispatch) => {
//     // 서버에서 따로 응답을 받지 않았다면 정상 작동
//     dispatch(login());
//     // dispatch를 통해 받아온 값을 서버에 보냄
//     const { data } = await axios.post(`${API}/auth/login`, values);
//     // 서버에서 받아온 값이 SUCCESS, FAIL 인지 체크
//     try {
//       dispatch(loginSuccess());
//     } catch (err) {
//       dispatch(loginFailure());
//     }
//   }
// }


export function register() {
  return {
    type: AUTH_REGISTER
  };
}

export function registerSuccess(payload) {
  return {
    type: AUTH_REGISTER_SUCCESS,
    payload
  };
}

export function registerFailure(error) {
  return {
    type: AUTH_REGISTER_FAILURE,
    error
  };
}

export function registerUser(values) {
  return async function (dispatch) {
  console.log("회원가입!");
    dispatch(register());
    // dispatch를 통해 받아온 값을 서버에 보냄
    const { data } = await axios.post(`${API}/users/`, values);
    try{
      localStorage.setItem('token', data.token); 
      dispatch(registerSuccess(data));
    } catch (err) {
      if(data.email){
        console.log('이미 존재하는 이메일');
        dispatch(registerFailure(err));
      }
    }
    return data;
  }
}

