import styled from '@emotion/styled';
import React, { memo } from 'react';
import { useTodayTimer } from '../../hooks';

interface Props {
  className?: string;
}

function Today({ className }: Props) {
  const { date, time } = useTodayTimer();

  return (
    <Wrapper className={className}>
      <Top>
        <Date>{date}</Date>
        <Time>{time}</Time>
      </Top>
      <Bottom>
        <Percent>0%</Percent>
        <Description>오늘 하루 달성량</Description>
      </Bottom>
    </Wrapper>
  );
}

export default memo(Today);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #ff5001;
  padding: 16px;
  box-sizing: border-box;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
`;

const Date = styled.div`
  font-size: 25px;
  font-weight: bold;
  letter-spacing: -1.28px;
  color: #ffffff;
  line-height: 37px;
  margin-right: 18px;
`;

const Time = styled.div`
  font-size: 25px;
  font-weight: bold;
  letter-spacing: -1.28px;
  color: #ffe8de;
  line-height: 37px;
`;

const Bottom = styled.div``;

const Percent = styled.div`
  line-height: 47px;
  font-size: 40px;
  font-weight: 100;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -1.86px;
  color: #ffffff;
  margin-bottom: 8px;
`;

const Description = styled.div`
  line-height: 18px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: -0.92px;
  color: #ffffff;
`;
