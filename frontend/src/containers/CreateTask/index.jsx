import React from 'react';
import TaskForm from '../../components/TaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectTaskList } from '../../stores/selectors';
import { addTaskToList } from '../../stores/actions';

function CreateTask() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const taskList = useSelector(selectTaskList);

  return (
    <TaskForm 
        user={user} 
        taskList={taskList} 
        addTaskToList={(newTask) => dispatch(addTaskToList(newTask))}
    />
  );
};

export default React.memo(CreateTask);
