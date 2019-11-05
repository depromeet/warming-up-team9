import * as axios from 'axios';

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
