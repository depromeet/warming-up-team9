import styled from '@emotion/styled';
import React, { memo, useMemo } from 'react';
import { Schedule } from '../../models/schedule';
import { parseToSpendTimeStr } from '../../utils/time';
import playButton from './play-button.svg';
// import pauseButton from './pause-button.svg';

interface Props {
  schedule: Schedule;
}

function TodayTaskListItem({ schedule }: Props) {
  const spendTimeStr = useMemo(() => parseToSpendTimeStr(schedule.processTimeSec), [schedule.processTimeSec]);

  return (
    <Item>
      <Cell flex={1}>
        <Text>{schedule.title}</Text>
        <Blocks>
          <Block />
          <Block />
          <Block completed={true} />
        </Blocks>
      </Cell>
      <Cell fixedWidth={106}>
        <Text>{spendTimeStr}</Text>
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

export default memo(TodayTaskListItem);

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
