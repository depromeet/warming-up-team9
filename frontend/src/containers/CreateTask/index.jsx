import React from 'react';
import styled from '@emotion/styled';
import TaskForm from '../TaskForm';
import { useSelector } from 'react-redux';
import { selectUser } from '../../stores/selectors';
import illustration from './illustration.png';
import illustration2x from './illustration@2x.png';
import illustration3x from './illustration@3x.png';

function CreateTask( {onButtonClick} ) {

  const user = useSelector(selectUser);

  return (
    <Wrapper>
      <Title>
        <Illustration role="img">
          <img src={illustration3x} srcSet={`${illustration} 1x, ${illustration2x} 2x, ${illustration3x} 3x`} alt="" aria-hidden={true} />
        </Illustration>
        환영합니다, 님!
        <br />
        <strong>해야 할 일을 추가해볼까요?</strong>
      </Title>
      <SelectTask>
        <TaskForm />
      </SelectTask>
      <Bottom>
        <SkipButton onClick={onButtonClick}>건너뛸래요</SkipButton>
        <CompleteButton onClick={onButtonClick}>작성완료</CompleteButton>
      </Bottom>
    </Wrapper>
  )
};

export default React.memo(CreateTask);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-gap: 33px;
  box-sizing: border-box;
  margin: auto;
`;

const Illustration = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 0 10.6px 0;
`;

const Title = styled.h1`
  grid-row: 1 / 5;
  box-sizing: border-box;
  padding-bottom: 47px;
  margin: auto;
  font-family: SpoqaHanSans;
  font-weight: 300;
  font-size: 28px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -1.59px;
  text-align: center;
  color: #61676f;
`;

const SelectTask = styled.div`
  max-height: 287px;
  grid-row: 5 / 9;
  margin-bottom: 38px;
`;

const Bottom = styled.div`
  width: 484px;
  grid-row: 9 / 10;
  box-sizing: border-box;
  padding: 0;
  margin: auto;
  display: flex;
  justify-content: space-between;
`

const SkipButton = styled.div`
  height: 50px;
  border-radius: 7px;
  background-color: #e2edff;
  border: none;
  box-sizing: border-box;
  padding: 14px 59px;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.64px;
  text-align: center;
  color: #0b79ff;
`;

const CompleteButton = styled.div`
  height: 50px;
  box-sizing: border-box;
  padding: 14px 116px;
  border-radius: 7px;
  background-color: #ff5001;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: -0.64px;
  text-align: center;
  color: #ffffff;
`;
