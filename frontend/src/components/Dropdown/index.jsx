import styled from '@emotion/styled';
import React, { useState, useCallback } from 'react';
import DropdownItem from '../DropdownItem';

function Dropdown({ allTasks, addTask, fetchInput, showAddButton = true }) {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showTasks, setShowTasks] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [inputPlaceholder, setInputPlaceholder] = useState('해야할 Task를 적어주세요');

  // TODO: 더 나은 필터 방식 적용하기
  const onInputChange = useCallback(
    e => {
      setFilteredTasks(prev => {
        if (!allTasks.length) {
          return prev;
        }
        return allTasks.filter(task => task.title.toLowerCase().indexOf(userInput.toLowerCase()) > -1);
      });
      setSelectedTaskIndex(-1);
      setShowTasks(true);
      setUserInput(e.target.value);

      if (typeof fetchInput === 'function') {
        fetchInput(e.target.value);
      }
    },
    [allTasks, setFilteredTasks, setShowTasks, userInput, fetchInput]
  );

  const onClickTask = e => {
    setSelectedTaskIndex(-1);
    setFilteredTasks([]);
    setShowTasks(false);
    setUserInput(e.target.innerText);
    fetchInput(e.target.innerText);
  };

  const onKeyPress = e => {
    // enter key 눌렀을 경우,
    if (e.keyCode === 13) {
      setShowTasks(false);
      setUserInput(filteredTasks[selectedTaskIndex].title);
      setSelectedTaskIndex(-1);
    }

    // ↑ key 눌렀을 경우,
    else if (e.keyCode === 38) {
      const prevIndex = (selectedTaskIndex - 1 + filteredTasks.length) % filteredTasks.length;
      setUserInput(filteredTasks[prevIndex].title);
      setSelectedTaskIndex(prevIndex);
    }
    // ↓ key 눌렀을 경우,
    else if (e.keyCode === 40) {
      const nextIndex = (selectedTaskIndex + 1 + filteredTasks.length) % filteredTasks.length;
      setUserInput(filteredTasks[nextIndex].title);
      setSelectedTaskIndex(nextIndex);
    }
  };

  const addNewTask = () => {
    if (userInput.trim().length > 0) {
      addTask(userInput);
    } else {
      setInputPlaceholder('빈 Task는 추가할 수 없습니다');
    }
    setUserInput('');
  };

  return (
    <Wrapper>
      <Top>
        <Input
          type="text"
          placeholder={inputPlaceholder}
          onChange={onInputChange}
          onKeyDown={onKeyPress}
          value={userInput}
        />
        {showAddButton && <Button onClick={addNewTask}>추가하기</Button>}
      </Top>
      {showTasks && userInput && filteredTasks.length ? (
        <UnorderedList show={showTasks}>
          {filteredTasks.map(task => (
            <DropdownItem
              key={task.taskId}
              label={task.title}
              suggestion={task.title}
              onClickSuggestion={onClickTask}
            />
          ))}
        </UnorderedList>
      ) : null}
    </Wrapper>
  );
}

export default React.memo(Dropdown);

const Wrapper = styled.div`
  width: 584px;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: auto;
`;

const Top = styled.div`
  width: 584px;
  height: 45px;
  display: flex;
  background-color: #f6f7f9;
  border: none;
  box-sizing: border-box;
  border-radius: 7px;
  font-size: 15px;
  letter-spacing: -0.7px;
`;

const Input = styled.input`
  width: 514px;
  padding: 12px 16px 11px 16px;
  box-sizing: border-box;
  background-color: transparent;
  color: #232323;
  opacity: 0.3;
  border: none;
  outline: none;
`;

const Button = styled.button`
  height: 22px;
  box-sizing: border-box;
  padding: 0;
  padding-right: 7px;
  margin-top: 12px;
  margin-bottom: 11px;
  color: #ff5001;
  background-color: #f6f7f9;
  font-weight: bold;
  text-align: left;
  border: none;
  outline: none;
`;

const UnorderedList = styled.ul`
  display: ${props => (props.show ? 'block' : 'none')};
  width: 584px;
  max-height: 200px;
  margin-top: 10px;
  background-color: white;
  list-style-type: none;
  position: absolute;
  z-index: 1;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 11px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #ff5001;
  }
`;
