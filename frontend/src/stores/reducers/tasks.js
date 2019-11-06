import produce from 'immer';
import { TASKS_ACTION_TYPE } from '../actions/tasks';

export function createInitialTasksState() {
  return {
    isAllTaskLoaded: false,
    allTasks: [],
  };
}

export function tasksReducer(state = createInitialTasksState(), action) {
  return produce(state, draft => {
    switch (action.type) {
      case TASKS_ACTION_TYPE.loadAllTasks:
        draft.isAllTaskLoaded = false;
        break;
      case TASKS_ACTION_TYPE.loadAllTasksSuccess:
        draft.allTasks = action.payload.allTasks;
        draft.isAllTaskLoaded = true;
        break;
      case TASKS_ACTION_TYPE.loadAllTasksFail:
        break;
      case TASKS_ACTION_TYPE.addNewTask:
        draft.allTasks.push(action.newTask);
        break;
    }
  });
}
