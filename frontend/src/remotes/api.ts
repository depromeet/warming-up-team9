import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { User } from '../models';

export const API_ROOT = '_api';

export function fetchUser(authToken: string) {
  return ajax({
    url: `${API_ROOT}/auth`,
    method: 'GET',
    headers: {
      Authorization: `JWT ${authToken}`,
    },
  }).pipe(map(data => data.response as User));
}
