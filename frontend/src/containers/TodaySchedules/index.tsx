import styled from '@emotion/styled';
import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import TodayTaskList from '../../components/TodayTaskList';
import Dialog from '../../components/Dialog';
import CreateSchedule from '../../containers/CreateSchedule';
import { selectUser } from '../../stores/selectors';
import { selectTodaySchedules } from '../../stores/selectors/schedule';

interface Props {
  className?: string;
}

function TodaySchedules({ className }: Props) {
  const [show, setShow] = useState(false);
  const toggleDialog = useCallback(() => {
    setShow(prev => !prev);
  }, []);

  const user = useSelector(selectUser);
  const schedules = useSelector(selectTodaySchedules);

  return (
    <Wrapper className={className}>
      <Top>
        <Title>
          안녕하세요 {user!.nickname}님!
          <br />
          <strong>오늘 하루 계획 세울 준비 되셨나요?</strong>
        </Title>
        <Button onClick={toggleDialog}>오늘 할일 추가하기</Button>
        <Dialog show={show} handleClose={toggleDialog}>
          {show ? <CreateSchedule onClose={toggleDialog} /> : null}
        </Dialog>
      </Top>
      <Bottom>
        <TodayTaskList schedules={schedules} />
      </Bottom>
    </Wrapper>
  );
}

export default memo(TodaySchedules);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
`;

const Top = styled.div`
  width: 100%;
  padding: 16px 16px 8px 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 30px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -1.39px;
  color: #61676f;
`;

const Bottom = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  padding: 16px;
`;

const Button = styled.button`
  height: 40px;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -0.56px;
  text-align: center;
  line-height: 40px;
  color: #ffffff;
  border-radius: 7px;
  background-color: #ff5001;
  border: none;
  padding: 0 36px;
  margin: 0;
  outline: 0;
  cursor: pointer;
`;
