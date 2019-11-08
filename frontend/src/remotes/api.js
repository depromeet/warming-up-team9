import * as axios from 'axios';
import { userInfo } from 'os';

export const API_ROOT = 'https://jjayo.hinco.dev';

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

export async function createNewTask(authToken, newTask) {
  const { data } = await axios.post(`${API_ROOT}/users/me/tasks`, {
    headers: {
      Authorization: authToken,
    },
    body: {
      title: newTask,
    },
  });

  return data;
}
