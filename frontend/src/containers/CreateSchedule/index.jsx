import React, { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import range from 'lodash.range';
import TaskForm from '../TaskForm';
import { useTodayTimer } from '../../hooks';
import decreaseIcon from './decreaseIcon.svg';
import increaseIcon from './increaseIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { selectTodayAssignedHours } from '../../stores/selectors/schedule';
import { selectAllTasks, selectAuthToken } from '../../stores/selectors';
import { addSchedule } from '../../remotes/api';
import { addTodayScheduleAction } from '../../stores/actions/schedule';

export default function CreateSchedule({ onClose }) {
  const { date } = useTodayTimer();
  const todayDate = date.substr(0, 7);

  const dispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);
  const allTasks = useSelector(selectAllTasks);

  const [inputTask, setInputTask] = useState('');
  const [blockTime, setBlockTime] = useState(0);

  const todayAssignedHours = useSelector(selectTodayAssignedHours);
  const availableHours = useMemo(() => 12 - todayAssignedHours, [todayAssignedHours]);

  const fetchInput = inputValue => {
    setInputTask(inputValue);
  };

  const increaseTimeBlock = useCallback(() => {
    setBlockTime(prev => {
      if (prev < availableHours) {
        return prev + 1;
      }
      return prev;
    });
  }, [availableHours]);

  const decreaseTimeBlock = useCallback(() => {
    setBlockTime(prev => (prev > 0 ? prev - 1 : prev));
  }, []);

  const createSchedule = useCallback(async () => {
    const task = allTasks.find(t => t.title === inputTask);

    if (task == null || blockTime === 0) {
      return;
    }

    const scheduleDate = format(new Date(), 'yyyy-MM-dd');

    try {
      await addSchedule(authToken, {
        scheduleDate,
        taskId: task.taskId,
        estimatedHour: blockTime,
      });

      dispatch(addTodayScheduleAction());
      onClose();
    } catch (error) {
      alert(error.message);
    }
  }, [dispatch, authToken, allTasks, inputTask, blockTime, onClose]);

  return (
    <Wrapper>
      <Top>
        <DateStr>{todayDate}</DateStr>
        <Title>
          {blockTime > 0 ? (
            <b>당신의 알찬 하루를 도와줄게요!</b>
          ) : (
            <>
              오늘의 블록이 비어있어요
              <br />
              <strong>Task를 추가해서 일정관리를 시작해봐요!</strong>
            </>
          )}
        </Title>
      </Top>
      <ColorBlocks>
        <BlockHead>
          {blockTime > 0 ? `오늘 ${blockTime}시간 일해요` : '하루에 12시간 일해요'}
          <BlockDescription>
            <BlockUnit />
            &#61; 1시간
          </BlockDescription>
        </BlockHead>
        <Blocks>
          {range(todayAssignedHours).map((_, i) => (
            <Block key={`filled-${i}`} color="filled" />
          ))}
          {range(blockTime).map((_, i) => (
            <Block key={`scheduling-${i}`} color="scheduling" />
          ))}
          {range(availableHours - blockTime).map((_, i) => (
            <Block key={`available-${i}`} />
          ))}
        </Blocks>
      </ColorBlocks>
      <Hr />
      <TaskSelect>
        <SmallHead>Task</SmallHead>
        <TaskForm fetchInput={fetchInput} />
      </TaskSelect>
      <SelectTimeBlock>
        <SmallHead>Block(시간) 배분하기</SmallHead>
        <SetTime>
          <InputTime type="text" value={blockTime} readOnly={true} />
          <ChangeTimeButton aria-label="한 시간 추가" onClick={increaseTimeBlock}>
            <img src={increaseIcon} alt="" aria-hidden={true} />
          </ChangeTimeButton>
          <ChangeTimeButton aria-label="한 시간 삭감" onClick={decreaseTimeBlock}>
            <img src={decreaseIcon} alt="" aria-hidden={true} />
          </ChangeTimeButton>
          <TimeDescription>시간이 걸릴것 같아요</TimeDescription>
        </SetTime>
      </SelectTimeBlock>
      <CompleteButton onClick={createSchedule}>시간 배분 완료하기</CompleteButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 584px;
  display: grid;
  grid-template-column: repeat(5, 1fr);
  grid-gap: 12px;
  justify-content: center;
  box-sizing: border-box;
  margin: auto;
  color: #61676f;
  padding-top: 48px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const DateStr = styled.span`
  font-size: 40px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -2.12px;
  margin-bottom: 22px;
`;

const Title = styled.h1`
  height: 68px;
  padding-bottom: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.33px;
`;

const ColorBlocks = styled.div`
  height: 79px;
`;

const BlockHead = styled.div`
  display: flex;
  justify-content: space-between;
  height: 20px;
  margin-bottom: 17px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: -0.65px;
`;

const BlockDescription = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: -0.56px;
`;

const BlockUnit = styled.div`
  display: inline-block;
  width: 20.4px;
  height: 20.4px;
  margin-right: 7.6px;
  border-radius: 3px;
  background-color: #ff5001;
  position: relative;
  top: 1.4px;
`;

const Blocks = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  margin-top: 8px;
  & > *:not(:last-child) {
    margin-right: 7.3px;
  }
`;

const Block = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 3px;
  background-color: ${props =>
    props.color === 'filled' ? '#61676f' : props.color === 'scheduling' ? '#ff5001' : '#ffe8de'};
`;

const Hr = styled.hr`
  border-top: solid 2px #f4f9ff;
`;

const SmallHead = styled.h3`
  font-size: 15px;
  font-weight: bold;
  letter-spacing: -0.7px;
  padding-bottom: 9px;
`;

const TaskSelect = styled.div`
  margin-bottom: 21px;
`;

const SelectTimeBlock = styled.div``;

const SetTime = styled.div`
  display: flex;
  align-items: center;
`;

const InputTime = styled.input`
  width: 84px;
  height: 45px;
  border: none;
  border-radius: 7px;
  background-color: #f6f7f9;
  outline: none;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.84px;
  color: #61676f;
  box-sizing: border-box;
  padding: 9px 15px;
  margin-right: 18px;
  cursor: default;
  user-select: none;
`;

const ChangeTimeButton = styled.button`
  height: 35px;
  box-sizing: border-box;
  padding: 1px 8.5px;
  border: none;
  outline: none;
  border-radius: 4px;
  background-color: #838e9b;
  margin-right: 8px;
  cursor: pointer;
`;

const TimeDescription = styled.h3`
  font-size: 16px;
  letter-spacing: -0.74px;
  padding-left: 12px;
`;

const CompleteButton = styled.button`
  height: 50px;
  box-sizing: border-box;
  padding: 14px 86px 14px 87px;
  margin: auto;
  border: none;
  border-radius: 7px;
  background-color: #ff5001;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.64px;
  text-align: center;
  color: #ffffff;
  outline: none;
`;
