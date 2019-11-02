import styled from '@emotion/styled';
import React, { memo } from 'react';
import { HEAD_SIZE } from './sizes';
import TodayTaskListItem from '../TodayTaskListItem';

interface Props {
  className?: string;
}

const isEmpty = false;

function TodayTaskList({ className }: Props) {
  return (
    <Wrapper className={className}>
      <Head>
        <HeadCell flex={1}>Task 내용 / 할당 블록(시간)</HeadCell>
        <HeadCell fixedWidth={106}>소요시간</HeadCell>
        <HeadCell fixedWidth={78}>시작</HeadCell>
        <HeadCell fixedWidth={68}>완료</HeadCell>
      </Head>
      <List>
        {isEmpty ? (
          <Empty>
            아직 오늘의 할일 리스트를
            <br />
            작성하지 않았습니다
            <br />
            상단의 ‘오늘 할일 만들기’를 클릭하여 작성하여 보세요
          </Empty>
        ) : (
          <>
            <TodayTaskListItem />
            <TodayTaskListItem />
            <TodayTaskListItem />
            <TodayTaskListItem />
            <TodayTaskListItem />
            <TodayTaskListItem />
            <TodayTaskListItem />
            <TodayTaskListItem />
            <TodayTaskListItem />
            <TodayTaskListItem />
            <TodayTaskListItem />
            <TodayTaskListItem />
          </>
        )}
      </List>
    </Wrapper>
  );
}

export default memo(TodayTaskList);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #f7f8fc;
  height: ${HEAD_SIZE}px;
`;

const HeadCell = styled.div<{ flex?: number; fixedWidth?: number }>`
  flex: ${props => (props.flex ? `${props.flex} ${props.flex} auto` : 'none')};
  ${props => (props.fixedWidth ? `width: ${props.fixedWidth}px` : '')};
  font-size: 12px;
  font-weight: bold;
  letter-spacing: -0.56px;
  color: #61676f;
`;

const List = styled.div`
  display: block;
  height: calc(100% - ${HEAD_SIZE}px);
  overflow-y: auto;
`;

const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - ${HEAD_SIZE}px);

  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.74px;
  text-align: center;
  line-height: 1.5;
  color: #c3c4c6;
`;
