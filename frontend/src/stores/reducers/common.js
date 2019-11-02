import produce from 'immer';
import { AUTH_TOKEN_STORAGE_KEY } from '../../constants';
import { generateStorage } from '../../utils';
import { COMMON_ACTION_TYPES } from '../actions/index';

// interface CommonState {
//   readonly isInitialized: boolean;
//   readonly isCheckingAuth: boolean;
//   readonly authToken: string | null;
//   readonly user: User | null;
// }

export function createInitialCommonState() {
  const storage = generateStorage();

  return {
    isInitialized: false,
    isCheckingAuth: true,
    authToken: storage.get(AUTH_TOKEN_STORAGE_KEY),
    user: null,
    taskList: [],
  };
}

export function commonReducer(state = createInitialCommonState(), action) {
  return produce(state, draft => {
    switch (action.type) {
      case COMMON_ACTION_TYPES.checkAuthRequest:
        draft.isCheckingAuth = true;
        break;
      case COMMON_ACTION_TYPES.checkAuthResponse:
        draft.isInitialized = true;
        draft.isCheckingAuth = false;

        if (action.payload.isAuthenticated) {
          draft.user = action.payload.user;
        }
        break;
      case COMMON_ACTION_TYPES.addTaskToList:
        draft.taskList.push(action.newTask);
        break;
      default:
        break;
    }
  });
}
