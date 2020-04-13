import styled from '@emotion/styled';
import React, { memo } from 'react';
import { ITEM_SIZE } from './sizes';

interface Props {
  completed?: boolean;
  label: string;
  className?: string;
}

function AllTaskListItem({ completed, label, className }: Props) {
  return (
    <Item className={className}>
      <input readOnly={true} type="checkbox" checked={completed} />
      <Text completed={completed}>{label}</Text>
    </Item>
  );
}

export default memo(AllTaskListItem);

const Item = styled.label`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: ${ITEM_SIZE}px;
  padding: 0 8px;
`;

const Text = styled.span<{ completed?: boolean }>`
  flex: 1 1 auto;
  display: inline-block;
  padding: 0 12px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: -0.65px;
  color: #61676f;
  opacity: ${props => (props.completed ? '0.3' : '1')};
`;
