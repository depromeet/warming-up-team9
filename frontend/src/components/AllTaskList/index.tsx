import React, { memo } from 'react';
import { Task } from '../../models';
import AllTaskListItem from '../AllTaskListItem';

interface Props {
  tasks: Task[];
}

function AllTaskList({ tasks }: Props) {
  return (
    <>
      {tasks.map(task => (
        <AllTaskListItem key={task.taskId} label={task.title} completed={task.state === 'DONE'} />
      ))}
    </>
  );
}

export default memo(AllTaskList);
