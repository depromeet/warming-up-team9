import React, { useState } from 'react';
import styled from '@emotion/styled';
import TaskForm from '../TaskForm'
import { useTodayTimer } from '../../hooks';
import decreaseIcon from './decreaseIcon.svg'
import increaseIcon from './increaseIcon.svg'

export default function Schedule() {

  const { date } = useTodayTimer();
  const todayDate = date.substr(0, 7);

  const [inputTask, setInputTask] = useState('');

  const fetchInput = (inputValue) => {
    setInputTask(inputValue);
  }

  return (
    <Wrapper>
      <Top>
        <Date>{todayDate}</Date>
        <Title>
          {/* TODO: 블록 배분에 따라 '~비어있어요' 있고 없고 설정 */}
          오늘의 블록이 비어있어요
          <br />
          <strong>Task를 추가해서 일정관리를 시작해봐요!</strong>
        </Title>
      </Top>
      <ColorBlocks>
        <BlockHead>
          하루에 12시간 일해요
        <BlockDescription>
          <BlockUnit/>
          &#61; 1시간
        </BlockDescription>
        </BlockHead>
        {/* TODO: 블록 색깔 배분하기 */}
        <Blocks>
          <Block color={'filled'} />
          <Block color={'scheduling'} />
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
        </Blocks>
      </ColorBlocks>
      <Hr />
      <TaskSelect>
        <SmallHead>Task</SmallHead>
        <TaskForm fetchInput={fetchInput}/>
      </TaskSelect>
      {/* TODO: 블록 개수 배분하기 */}
      <SelectTimeBlock>
        <SmallHead>Block(시간) 배분하기</SmallHead>
        <SetTime>
          <InputTime type="text" value={0}/>
          <ChangeTimeButton aria-label="한 시간 추가">
            <img src={increaseIcon} alt="" aria-hidden={true} />
          </ChangeTimeButton>
          <ChangeTimeButton aria-label="한 시간 삭감">
            <img src={decreaseIcon} alt="" aria-hidden={true} />
          </ChangeTimeButton>
          <TimeDescription>시간이 걸릴것 같아요</TimeDescription>
        </SetTime>
      </SelectTimeBlock>
      <CompleteButton>시간 배분 완료하기</CompleteButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 584px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  margin: auto;
  color: #61676f;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Date = styled.span`
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
  padding-bottom: 44px;
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
  background-color: ${props => (
    props.color === 'filled' ? '#61676f'
      : props.color === 'scheduling' ? '#ff5001'
        : '#ffe8de'
  )};
`;

const Hr = styled.hr`
  border-top: solid 2px #f4f9ff;
  margin-top: 29px;
  margin-bottom: 18px;
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

const SelectTimeBlock = styled.div`
  margin-bottom: 59px;
`;

const SetTime = styled.div`
  display: flex;
  align-items:center;
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
