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
  const { data } = await axios.post(
    `${API_ROOT}/users/me/tasks`,
    { title: newTask },
    {
      headers: {
        Authorization: authToken,
      },
    }
  );

  return data;
}

export async function addSchedule(authToken, data) {
  await axios.post(`${API_ROOT}/users/me/schedules`, data, {
    headers: {
      Authorization: authToken,
    },
  });
}

export async function login(email, password) {
  const { data } = await axios.post(`${API_ROOT}/auth/login`, { email, password });
  return data.token;
}

export async function playScheduleAPI(scheduleId) {
  await axios.post(`${API_ROOT}/users/me/schedules/${scheduleId}/start`);
}

export async function completeScheduleAPI(scheduleId) {
  await axios.post(`${API_ROOT}/users/me/schedules/${scheduleId}/done`);
}
