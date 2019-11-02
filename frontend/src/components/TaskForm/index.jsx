import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskToList } from '../../stores/actions';
import deleteIcon from './deleteIcon.svg'
import './styles.css';

function TaskForm({ user, taskList, dispatchAddTask }) {

  const [inputValue, setInputValue] = useState("");

  /* input field change에 따라 
     -> state.filtered 변경 => filtered 바탕으로 list item render하게끔 설정
  */
  const onInputChange = (e) => {
    setInputValue(e.target.value);
  }

  /* 추가하기 버튼 클릭 시 
     -> input.value 값을 state.tasks에 추가
     -> redux store에 추가
     -> 백엔드로 전달(?)
  */
  const addNewTask = () => {
    dispatchAddTask(inputValue);
    setInputValue("");
  }

  /* 건너뛸래요 & 작성완료 버튼 클릭 시 
     -> 메인 페이지로 이동하게끔
  */
  const nextPage = () => {

  }

  return (
    <div className="createTask-container">
      <div className="header">
        <span className="header-text">환영합니다, {user.nickname}님!</span>
        <strong className="header-text">지금 해야 할 일을 추가해볼까요?</strong>
      </div>
      <div className="add-task">
        <input
          type="text"
          name="할 일 추가하기"
          placeholder="해야할 Task를 적어주세요"
          list="options"
          className="new-task-input"
          onChange={(e) => onInputChange(e)}
          value={inputValue}
        />
        <button className="add-task-btn" onClick={addNewTask}>
          추가하기
        </button>
      </div>
      <ul className="dropdown-list">
        {taskList.map((task, i) => (
          <li key={i} className="dropdown-list-item">
            <span className="item-name">{task}</span>
            <button className="delete-task-btn"><img src={deleteIcon} alt="Delete Icon"/></button>
          </li>
        ))}
      </ul>
      <div className="next-btns">
        <button className="skip-btn">건너뛸래요</button>
        <button className="done-btn">작성완료</button>
      </div>
    </div>
  );
}

TaskForm.defaultProps = {
  user: 'username',
  taskList: [],
};


export default TaskForm;