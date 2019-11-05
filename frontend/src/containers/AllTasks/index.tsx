import styled from '@emotion/styled';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllTaskList from '../../components/AllTaskList';
import { loadAllTasksAction, loadAllTasksFailAction, loadAllTasksSuccessAction } from '../../stores/actions';
import { selectAllTasks, selectAuthToken, selectIsAllTasksLoaded } from '../../stores/selectors';
import { fetchAllTasks } from '../../remotes/api';

interface Props {
  className?: string;
}

function AllTasks({ className }: Props) {
  const dispatch = useDispatch();

  const authToken = useSelector(selectAuthToken);
  const isAllTasksLoaded = useSelector(selectIsAllTasksLoaded);
  const allTasks = useSelector(selectAllTasks);

  useEffect(() => {
    if (isAllTasksLoaded) {
      return;
    }

    dispatch(loadAllTasksAction());

    fetchAllTasks(authToken)
      .then(allTasks => {
        dispatch(loadAllTasksSuccessAction({ allTasks }));
      })
      .catch(error => {
        dispatch(loadAllTasksFailAction(error));
      });
  }, [dispatch, authToken, isAllTasksLoaded]);

  return (
    <Wrapper className={className}>
      <Top>
        <Title>All Tasks</Title>
        <Button>추가하기</Button>
      </Top>
      <Bottom>
        {isAllTasksLoaded && allTasks.length > 0 ? (
          <AllTaskList tasks={allTasks} />
        ) : (
          <Empty>
            설정된 Task가 없습니다
            <br />
            Task를 만들어보세요
          </Empty>
        )}
      </Bottom>
    </Wrapper>
  );
}

export default memo(AllTasks);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px 8px 0 8px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 8px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  line-height: normal;
  letter-spacing: -0.93px;
  color: #61676f;
  margin-right: 25px;
  user-select: none;
  cursor: default;
`;

const Bottom = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  overflow-y: auto;
  background-color: #f9f9f9;
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

const Empty = styled.div`
  padding: 100px 0;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  letter-spacing: -0.74px;
  text-align: center;
  color: #c3c4c6;
`;
