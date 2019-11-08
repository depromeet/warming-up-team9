import React, { memo } from 'react';
import styled from '@emotion/styled';
import TaskForm from '../TaskForm';
import { useSelector } from 'react-redux';
import { selectUser } from '../../stores/selectors';
import { useTodayTimer } from '../../hooks';
import illustration from './illustration.png';
import illustration2x from './illustration@2x.png';
import illustration3x from './illustration@3x.png';

function RestrosWrite( {onButtonClick} ) {

  const user = useSelector(selectUser);
  const { date, time } = useTodayTimer();

  return (
    <Wrapper>
      <AllTime>
          {date} {"100"}% 달성!
          <SubTitle>총 {time} 시간 소요</SubTitle> 
      </AllTime>
      <Title>
        <Info>
          <strong>회고하기</strong><br />
          {user.nickname}님의 하루를<br />
          되돌아볼까요?
        </Info>
        <Illustration role="img">
          <img src={illustration3x} srcSet={`${illustration} 1x, ${illustration2x} 2x, ${illustration3x} 3x`} alt="" aria-hidden={true} />
        </Illustration>
      </Title>
      <SelectTask>
        회고를 작성해주세요
      </SelectTask>
      <Bottom>
        <SkipButton onClick={onButtonClick}>안 할래요</SkipButton>
        <CompleteButton onClick={onButtonClick}>회고 완료</CompleteButton>
      </Bottom>
    </Wrapper>
  )
};

export default React.memo(RestrosWrite);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-gap: 33px;
  box-sizing: border-box;
  margin: auto;
`;

const AllTime = styled.div`
  display: flex;
  align-items: left;
  font-size: 25px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: -1.33px;
  color: #ff5001;
  padding-left: 10%;
`;

const Title = styled.h1`
  position: absolute;
  top: 16%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  box-sizing: border-box;
  padding-bottom: 47px;
  margin: auto;
  font-family: SpoqaHanSans;
  font-size: 30px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -1.59px;
  color: #61676f;
`;

const SubTitle = styled.p`
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.65px;
  color: #61676f;
  padding-top: 10px; 
  padding-left: 14px;
`;

const Info = styled.div`
  position: absolute;
  top: 20%;
  left: 5%;
`;

const Illustration = styled.div`
position: absolute;
right: 5%;
`;

const SelectTask = styled.div`
  max-height: 287px;
  grid-row: 6 / 9;
  margin-left: 20%;
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
