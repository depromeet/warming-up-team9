import * as axios from 'axios';

export const API_ROOT = '_api';

export async function fetchUser(authToken) {
  const { data } = await axios.get(`${API_ROOT}/auth`, {
    headers: {
      Authorization: authToken,
    },
  });

  return data;
}
