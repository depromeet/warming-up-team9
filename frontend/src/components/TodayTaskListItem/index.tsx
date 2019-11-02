import styled from '@emotion/styled';
import React from 'react';
import playButton from './play-button.svg';
// import pauseButton from './pause-button.svg';

export default function TodayTaskListItem() {
  return (
    <Item>
      <Cell flex={1}>
        <Text>디프만 자소서 완성하기</Text>
        <Blocks>
          <Block />
          <Block />
          <Block completed={true} />
        </Blocks>
      </Cell>
      <Cell fixedWidth={106}>
        <Text>02 : 45 : 21</Text>
      </Cell>
      <Cell fixedWidth={78}>
        <IconButton aria-label="시작">
          <img src={playButton} alt="" aria-hidden={true} />
        </IconButton>
      </Cell>
      <Cell fixedWidth={68} />
    </Item>
  );
}

const Item = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 0;
  cursor: default;
  user-select: none;
  border-bottom: 1px solid #f9f9f9;
`;

const Cell = styled.div<{ flex?: number; fixedWidth?: number }>`
  flex: ${props => (props.flex ? `${props.flex} ${props.flex} auto` : 'none')};
  ${props => (props.fixedWidth ? `width: ${props.fixedWidth}px` : '')};
  font-size: 14px;
  font-weight: bold;
  letter-spacing: -0.65px;
  color: #61676f;
  display: block;
`;

const Text = styled.span`
  display: block;
  user-select: text;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Block = styled.div<{ completed?: boolean }>`
  width: 20.4px;
  height: 20.4px;
  border-radius: 3px;
  background-color: ${props => (props.completed ? '#01e165' : '#ff5001')};
`;

const Blocks = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;

  & > *:not(:last-child) {
    margin-right: 4px;
  }
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  margin: 0;
  padding: 0;
  outline: 0;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  > img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
