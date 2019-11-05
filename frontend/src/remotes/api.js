import * as axios from 'axios';
import { userInfo } from 'os';

export const API_ROOT = 'http://api-jjayo.depromeet.com';

export async function fetchUser(authToken) {
  const { data } = await axios.get(`${API_ROOT}/users/me`, {
    headers: {
      Authorization: authToken,
    },
  });

  return data;
}

export async function fetchAllTasks(authToken) {
  const { data } = await axios.get(`${API_ROOT}/users/me/tasks`, {
    headers: {
      Authorization: authToken,
    },
  });

  return data;
}

const users = [
  { email: 'bbongwa@naver.com', password: '123'},
  { email: 'lee@test.com', password: '456' },
  { email: 'park@test.com', password: '789' }
]

export function signIn({ email, password }) {
  const user = users.find(user => user.email === email && user.password === password);
  if (user === undefined) throw new Error();
  return user;
}
