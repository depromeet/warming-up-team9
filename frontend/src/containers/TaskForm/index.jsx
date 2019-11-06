import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllTasksAction, loadAllTasksFailAction, loadAllTasksSuccessAction, addNewTaskAction } from '../../stores/actions';
import { selectAllTasks, selectAuthToken, selectIsAllTasksLoaded } from '../../stores/selectors';
import { updateNewTask } from '../../remotes/api';
import Dropdown from '../../components/Dropdown'

async function postNewTask(authToken, newTask) {
  if (!newTask) {
    return null;
  }

  const dispatch = useDispatch();

  updateNewTask(authToken, newTask)
    .then(() => {
      dispatch(addNewTaskAction(authToken, newTask));
    })
    .catch(error => {
      dispatch(loadAllTasksFailAction(error));
    });
}

function TaskForm() {

  const dispatch = useDispatch();

  const authToken = useSelector(selectAuthToken);
  const isAllTasksLoaded = useSelector(selectIsAllTasksLoaded);
  const allTasks = useSelector(selectAllTasks);

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
      suggestions={allTasks}
      addSuggestion={(newTask) => postNewTask(authToken, newTask)}
    />
  )
}

export default React.memo(TaskForm);
