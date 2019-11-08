import styled from '@emotion/styled';
import React from 'react';
import Dialog from '../../components/Dialog';
import image from './01.png';
import image2x from './01@2x.png';
import image3x from './01@3x.png';

export default function ScheduleCompleteDialog() {
  return (
    <Dialog show={true} handleClose={() => {}}>
      <Wrapper>
        <Title>
          잘했어요! 당근을 드릴게요!
          <br />
          <b>3시간을 절약했어요!</b>
        </Title>
        <LogoImage src={image3x} srcSet={`${image} 1x, ${image2x} 2x, ${image3x} 3x`} alt="" aria-hidden={true} />
        <Help>해야 할 일 전체목록에서도 같이 완료할까요?</Help>
        <ScheduleName>디프만 자소서 완성하기</ScheduleName>
        <ScheduleTime>02 : 45 : 21</ScheduleTime>
        <Blank />
      </Wrapper>
    </Dialog>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 300;
  line-height: 1.35;
  letter-spacing: -2.12px;
  text-align: center;
  color: #61676f;
`;

const LogoImage = styled.img`
  margin-top: 35px;
  width: 150px;
`;

const Help = styled.div`
  font-size: 20px;
  font-weight: bold;
  line-height: 1.45;
  letter-spacing: -1.06px;
  text-align: center;
  color: #61676f;
  margin-top: 40px;
`;

const ScheduleName = styled.div`
  border-radius: 7px;
  background-color: #f8f9fa;
  padding: 7px 11px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: -0.65px;
  color: #61676f;
  margin-top: 11px;
  text-align: center;
`;

const ScheduleTime = styled.div`
  margin-top: 9px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: -0.65px;
  color: #61676f;
  text-align: center;
`;

const Blank = styled.div`
  flex: 1 1 auto;
  min-height: 50px;
`;
