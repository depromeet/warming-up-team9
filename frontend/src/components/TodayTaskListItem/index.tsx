import styled from '@emotion/styled';
import pauseButton from './pause-button.svg';
import range from 'lodash.range';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Schedule } from '../../models/schedule';
import { completeScheduleAction, playScheduleAction, updateProcessTimeSecAction } from '../../stores/actions/schedule';
import { selectAuthToken } from '../../stores/selectors';
import { parseToSpendTimeStr } from '../../utils/time';
import playButton from './play-button.svg';
import { playScheduleAPI, completeScheduleAPI } from '../../remotes/api';

interface Props {
  schedule: Schedule;
}

function TodayTaskListItem({ schedule }: Props) {
  const dispatch = useDispatch();

  const authToken = useSelector(selectAuthToken);
  const [processTimeSec, setProcessTimeSec] = useState(schedule.processTimeSec);
  const spendTimeStr = useMemo(() => parseToSpendTimeStr(processTimeSec), [processTimeSec]);
  const spendHours = useMemo(() => Math.floor(processTimeSec / (60 * 60)), [processTimeSec]);

  useEffect(() => {
    if (schedule.state === 'PROCESSING') {
      const id = setInterval(() => {
        setProcessTimeSec(prev => {
          const update = prev + 1;

          dispatch(updateProcessTimeSecAction(schedule.scheduleId, update));
          return update;
        });
      }, 1000);

      return () => {
        clearInterval(id);
      };
    }
  }, [schedule, dispatch]);

  const playSchedule = useCallback(async () => {
    if (schedule.state !== 'READY') {
      return;
    }

    try {
      await playScheduleAPI(authToken, schedule.scheduleId);
      dispatch(playScheduleAction());
    } catch (error) {
      alert(error.message);
    }
  }, [authToken, schedule, dispatch]);

  const completeSchedule = useCallback(async () => {
    if (schedule.state !== 'PROCESSING') {
      return;
    }

    try {
      await completeScheduleAPI(authToken, schedule.scheduleId);
      dispatch(completeScheduleAction());
    } catch (error) {
      alert(error.message);
    }
  }, [authToken, schedule, dispatch]);

  return (
    <Item>
      <Cell flex={1}>
        <Text>{schedule.title}</Text>
        <Blocks>
          {range(schedule.estimatedHour).map((i: number) => (
            <Block key={`estimate-${i}`} state={i < spendHours ? 'spend' : undefined} />
          ))}
        </Blocks>
      </Cell>
      <Cell fixedWidth={106}>
        <Text>{spendTimeStr}</Text>
      </Cell>
      <Cell fixedWidth={55}>
        <IconButton aria-label={schedule.state === 'PROCESSING' ? '멈추기' : '시작하기'} onClick={playSchedule}>
          <img src={schedule.state === 'PROCESSING' ? pauseButton : playButton} alt="" aria-hidden={true} />
        </IconButton>
      </Cell>
      <Cell fixedWidth={85}>
        <CompleteButton disabled={schedule.state === 'DONE'} onClick={completeSchedule}>
          {schedule.state === 'DONE' ? 'Task 완료됨' : 'Task 완료'}
        </CompleteButton>
      </Cell>
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

const stateColor = {
  spend: '#ff5001',
  done: '#01e165',
  exceed: '#61676f',
};

const Block = styled.div<{ state?: 'spend' | 'done' | 'exceed' }>`
  width: 20.4px;
  height: 20.4px;
  border-radius: 3px;
  background-color: ${props => (props.state ? stateColor[props.state] : '#ffe8de')};
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

const CompleteButton = styled.button`
  height: 32px;
  border-radius: 5px;
  background-color: #ff5001;
  line-height: 32px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: -0.56px;
  color: #ffffff;
  outline: 0;
  cursor: pointer;
  margin: 0;
  padding: 0 12px;
  text-align: center;
  border: none;
  box-sizing: border-box;

  &:disabled {
    background-color: #eceff2;
  }
`;
