import styled from '@emotion/styled';
import React, { memo } from 'react';
import deleteIcon from './deleteIcon.svg'

function DropdownItem(props) {

  const { suggestion, onClickSuggestion} = props;

  return (
    <ListItem
      key={suggestion}
      onClick={onClickSuggestion}
    >
      <SuggestionText>{suggestion}</SuggestionText>
      <DeleteButton>
        <img src={deleteIcon} alt="Delete Icon"/>
      </DeleteButton>
    </ListItem>
  )
}

export default DropdownItem;

const ListItem = styled.li`
  width: 584px;
  height: 34px;
  box-sizing: border-box;
  display: flex;
  margin-bottom: 10px;
`;

const SuggestionText = styled.span`
  padding: 11px 7px;
  border-radius: 7px;
  color: #61676f;
  background-color: #f8f9fa;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: -0.65px;
`;

const DeleteButton = styled.button`
  width: 13px;
  height: 34px;
  box-sizing: border-box;
  padding: 11px 0 12px 18px;
  background-color: transparent;
  border: none;
`;