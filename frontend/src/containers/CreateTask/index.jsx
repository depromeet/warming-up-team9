import React from 'react';
import styled from '@emotion/styled';
import TaskForm from '../TaskForm';
import { useSelector } from 'react-redux';
import { selectUser } from '../../stores/selectors';

function CreateTask() {

  const user = useSelector(selectUser);

  // 따로 CreateTaskModal을 만들까? (= button + modal containing createTask(isModalForm prop))

  // TODO: isModalForm prop 받아서 <Title /> 스타일링 조건부로 적용하기
  //       -> illustration, title 글귀, 위아래 margin 차이

  // TODO: isModalForm prop 받아서 제일 아래 두 버튼 onClick 적용하기
  //       -> 메인 화면으로 넘어가기, 모달 화면 닫기
  const handleClick = () => { }

  return (
    <Wrapper>
      <Title>
        환영합니다, {user.nickname}님!
        <br />
        <strong>지금 해야 할 일을 추가해볼까요?</strong>
      </Title>
      <SelectTask>
        <TaskForm />
      </SelectTask>
      <Bottom>
        <SkipButton>건너뛸래요</SkipButton>
        <CompleteButton>작성완료</CompleteButton>
      </Bottom>
    </Wrapper>
  )
};

export default React.memo(CreateTask);

const Wrapper = styled.div`
  box-sizing: border-box;
  margin: auto;
`;

const Title = styled.h1`
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
  height: 342px;
  margin-bottom: 38px;
`;

const Bottom = styled.div`
  width: 484px;
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
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.64px;
  text-align: center;
  color: #ffffff;
`;
