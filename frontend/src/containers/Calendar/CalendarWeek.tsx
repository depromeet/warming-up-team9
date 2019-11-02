import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function CalendarWeek({ children }: Props) {
  return <Week className="calendar-week">{children}</Week>;
}

const Week = styled.tr`
  display: flex;
  width: 100%;
`;
