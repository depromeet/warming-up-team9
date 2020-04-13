import { createSelector } from 'reselect';

export const selectTasksState = state => state.tasks;

export const selectIsAllTasksLoaded = createSelector(
  selectTasksState,
  state => state.isAllTaskLoaded
);

export const selectAllTasks = createSelector(
  selectTasksState,
  state => state.allTasks
);
