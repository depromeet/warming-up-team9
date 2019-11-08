import styled from '@emotion/styled';
import React, { memo } from 'react';
import { Schedule } from '../../models/schedule';
import { HEAD_SIZE } from './sizes';
import TodayTaskListItem from '../TodayTaskListItem';
import emptyImage1x from './4-01.png';
import emptyImage2x from './4-01@2x.png';
import emptyImage3x from './4-01@3x.png';

interface Props {
  schedules: Schedule[];
  className?: string;
}

function TodayTaskList({ schedules, className }: Props) {
  return (
    <Wrapper className={className}>
      <Head>
        <HeadCell flex={1}>Task 내용 / 할당 블록(시간)</HeadCell>
        <HeadCell fixedWidth={106}>소요시간</HeadCell>
        <HeadCell fixedWidth={78}>시작</HeadCell>
        <HeadCell fixedWidth={68}>완료</HeadCell>
      </Head>
      <List>
        {schedules.length === 0 ? (
          <Empty>
            <EmptyImage
              src={emptyImage2x}
              srcSet={`${emptyImage1x} 1x, ${emptyImage2x} 2x, ${emptyImage3x} 3x`}
              alt="오늘 할일을 추가하세요"
            />
            <EmptyText>
              좋은 아침
              <br />
              오늘 하루 무엇을 할 지
              <br />
              <b>계획을 시작</b>할까요?
            </EmptyText>
          </Empty>
        ) : (
          schedules.map(schedule => <TodayTaskListItem key={schedule.taskId} schedule={schedule} />)
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
  height: 100%;
`;

const EmptyImage = styled.img`
  height: 200px;
  margin-right: 40px;
`;

const EmptyText = styled.div`
  font-size: 18px;
  text-align: left;
  line-height: normal;
  letter-spacing: -1.14px;
  color: #61676f;
`;
