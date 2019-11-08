import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllTasksAction, loadAllTasksFailAction, loadAllTasksSuccessAction, addNewTaskAction } from '../../stores/actions';
import { selectAllTasks, selectAuthToken, selectIsAllTasksLoaded } from '../../stores/selectors';
import { createNewTask, fetchAllTasks } from '../../remotes/api';
import Dropdown from '../../components/Dropdown'

function TaskForm( { fetchInput }) {

  const dispatch = useDispatch();

  const authToken = useSelector(selectAuthToken);
  const isAllTasksLoaded = useSelector(selectIsAllTasksLoaded);
  const allTasks = useSelector(selectAllTasks);

  const postNewTask = useCallback(async (newTask) => {
    try {
      await createNewTask(authToken, newTask);
      dispatch(addNewTaskAction(newTask));
    } catch (error) {
      dispatch(loadAllTasksFailAction(error));
    }
  }, [dispatch, authToken]);

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
      allTasks={[
        {title: "디프만 지원서 작성하기", titleId: 1},
        {title: "디프만 지원서 작성하기", titleId: 1},
        {title: "디프만 지원서 작성하기", titleId: 1},
        {title: "디프만 지원서 작성하기", titleId: 1},
        {title: "디프만 지원서 작성하기", titleId: 1},
        {title: "디프만 지원서 작성하기", titleId: 1},
        {title: "디프만 지원서 작성하기", titleId: 1},
      ]}
      addTask={(newTask) => postNewTask(newTask)}
      fetchInput={fetchInput}
    />
  )
}

export default React.memo(TaskForm);
