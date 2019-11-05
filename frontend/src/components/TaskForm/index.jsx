import React, { useState } from 'react';
import './styles.css';

export default function TaskForm(props) {
  
  const { user, taskList, addTaskToList } = props;

  const [inputValue, setInputValue] = useState("");

  // TODO: taskList -> filteredList (?)
  const onInputChange = (e) => {
    setInputValue(e.target.value);
  }

  // TODO: 백엔드 AJAX CALL (TASK LIST 업데이트)
  const addNewTask = () => {
    addTaskToList(inputValue);
    setInputValue("");
  }

  // TODO: 메인 화면으로 넘어가기
  const nextPage = () => {}

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
            <button className="delete-task-btn"></button>
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
  user: {
      nickname: '디프마니',
  },
  taskList: [],
};
