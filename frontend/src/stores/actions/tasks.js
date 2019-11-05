export const TASKS_ACTION_TYPE = {
  loadAllTasks: 'tasks/loadAllTasks',
  loadAllTasksSuccess: 'tasks/loadAllTasksSuccess',
  loadAllTasksFail: 'tasks/loadAllTasksFail',
};

export const loadAllTasksAction = () => ({
  type: TASKS_ACTION_TYPE.loadAllTasks,
});

export const loadAllTasksSuccessAction = payload => ({
  type: TASKS_ACTION_TYPE.loadAllTasksSuccess,
  payload,
});

export const loadAllTasksFailAction = error => ({
  type: TASKS_ACTION_TYPE.loadAllTasksFail,
  error,
});
