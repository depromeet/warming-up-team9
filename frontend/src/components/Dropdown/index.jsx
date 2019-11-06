import styled from '@emotion/styled';
import React, { useState, useCallback } from 'react';
import DropdownItem from '../DropdownItem'

function Dropdown( {suggestions, addSuggestion} ) {
  
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [filteredSuggestions, setfilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState("해야할 Task를 적어주세요");

  // TODO: 더 나은 필터 방식 적용하기
  const onInputChange = useCallback(
    e => {
      setfilteredSuggestions(prev => {
        if (!suggestions.length) {
          return prev;
        }
        return suggestions.filter(s => (
          s.toLowerCase().indexOf(userInput.toLowerCase()) > -1)
      )});
      setActiveSuggestionIndex(-1);
      setShowSuggestions(true);
      setUserInput(e.target.value);
    },
    [suggestions, setfilteredSuggestions, setShowSuggestions, userInput]
  );

  const onClickSuggestion = e => {
    setActiveSuggestionIndex(-1);
    setfilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.target.innerText);
  };

  const onKeyPress = e => {
    // enter key 눌렀을 경우,
    if (e.keyCode === 13) {
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestionIndex]);
      setActiveSuggestionIndex(-1);
    }
    // ↑ key 눌렀을 경우, 
    else if (e.keyCode === 38) {
      if (activeSuggestionIndex === -1) {
        setActiveSuggestionIndex(filteredSuggestions.length - 1);
        setUserInput("");
      }
      setUserInput(filteredSuggestions[activeSuggestionIndex - 1]);
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
    // ↓ key 눌렀을 경우,
    else if (e.keyCode === 40) {
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        setActiveSuggestionIndex(-1);
        setUserInput("");
      }
      setUserInput(filteredSuggestions[activeSuggestionIndex + 1]);
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const addNewSuggestion = () => {
    if (userInput.trim().length > 0) {
      addSuggestion(userInput);
    } else {
      setInputPlaceholder("빈 Task는 추가할 수 없습니다");
    }
    setUserInput("");
  }

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
        <Button onClick={addNewSuggestion}>추가하기</Button>
      </Top>
      <br />
      {(showSuggestions && userInput && filteredSuggestions.length) ? (
        <UnorderedList>
          {filteredSuggestions.map(suggestion => (
            <DropdownItem key={suggestion} suggestion={suggestion} onClickSuggestion={onClickSuggestion} />
         ))}
        </UnorderedList>
      ) : null
    }
    </Wrapper>
  )
}

export default React.memo(Dropdown);

const Wrapper = styled.div`
  width: 584px;
  height: 340px;
  box-sizing: border-box;
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
  width: 584px;
  height: 287px;
  list-style-type: none;
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
