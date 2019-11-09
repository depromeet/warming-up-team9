import React, { memo } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { selectUser } from '../../stores/selectors';
import { useTodayTimer } from '../../hooks';
import illustration from './illustration.png';
import illustration2x from './illustration@2x.png';
import illustration3x from './illustration@3x.png';

function RetrosForm({ }) {

  const user = useSelector(selectUser);
  const { date, time } = useTodayTimer();

  return (
    <Wrapper>
      <RetrosFormBox>
        <Title>
          <MainTitle>디프만 자소서 완성하기</MainTitle>
          <SubTitle>총 {time} 시간 소요</SubTitle>
        </Title>
        <WriteInput>
          <Icon>
            <img src={illustration3x} srcSet={`${illustration} 1x, ${illustration2x} 2x, ${illustration3x} 3x`} alt="" aria-hidden={true} />
          </Icon>
          <Info>
            회고를 작성해주세요
          </Info>
        </WriteInput>
      </RetrosFormBox>
    </Wrapper>
  )
};

export default React.memo(RetrosForm);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin: auto;
`;

const RetrosFormBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  left: 50%;
  transform: translate(-50%);
`;

const Title = styled.h1`
  margin-left: 5%;
`;

const MainTitle = styled.span`
  font-family: SpoqaHanSans;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.65px;
  color: #61676f;
  padding: 5px 10px;
  border-radius: 7px;
  background-color: #f8f9fa;
  `;

const SubTitle = styled.span`
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.65px;
  color: #61676f;
  padding-top: 10px; 
  padding-left: 14px;
`;

const WriteInput = styled.div`
  position: relative;
  top: 10%;
  width: 88%;
  height: 160px;
  padding: 10px;
  border-radius: 7px;
  background-color: #f8f9fa;
  margin: auto;
`;

const Info = styled.span`
  opacity: 0.5;
  font-family: SpoqaHanSans;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  color: #61676f;
`;

const Icon = styled.span`
  margin-right: 10px;
`;
