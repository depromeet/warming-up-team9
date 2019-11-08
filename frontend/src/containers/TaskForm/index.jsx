import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadAllTasksAction,
  loadAllTasksFailAction,
  loadAllTasksSuccessAction,
  addNewTaskAction,
} from '../../stores/actions';
import { selectAllTasks, selectAuthToken, selectIsAllTasksLoaded } from '../../stores/selectors';
import { createNewTask, fetchAllTasks } from '../../remotes/api';
import Dropdown from '../../components/Dropdown';

function TaskForm({ fetchInput, showAddButton = true }) {
  const dispatch = useDispatch();

  const authToken = useSelector(selectAuthToken);
  const isAllTasksLoaded = useSelector(selectIsAllTasksLoaded);
  const allTasks = useSelector(selectAllTasks);

  const postNewTask = useCallback(
    async newTaskTitle => {
      try {
        const newTask = await createNewTask(authToken, newTaskTitle);
        dispatch(addNewTaskAction(newTask));
      } catch (error) {
        dispatch(loadAllTasksFailAction(error));
      }
    },
    [dispatch, authToken]
  );

  useEffect(() => {
    if (isAllTasksLoaded) {
      return;
    }

    dispatch(loadAllTasksAction());

    fetchAllTasks(authToken)
      .then(allTasks => {
        dispatch(loadAllTasksSuccessAction({ allTasks }));
      })
      .catch(error => {
        dispatch(loadAllTasksFailAction(error));
      });
  }, [dispatch, authToken, isAllTasksLoaded]);

  return (
    <Dropdown
      showAddButton={showAddButton}
      allTasks={allTasks}
      addTask={newTask => postNewTask(newTask)}
      fetchInput={fetchInput}
    />
  );
}

export default React.memo(TaskForm);
