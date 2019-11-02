import styled from '@emotion/styled';
import React from 'react';
import { HEAD_SIZE } from './sizes';

export default function CalendarMonthHead() {
  return (
    <MonthHead>
      <tr>
        <td>Sun</td>
        <td>Mon</td>
        <td>Tue</td>
        <td>Wed</td>
        <td>Thu</td>
        <td>Fri</td>
        <td>Sat</td>
      </tr>
    </MonthHead>
  );
}

const MonthHead = styled.thead`
  display: block;
  width: 100%;

  & > tr {
    display: flex;
    align-items: center;
    height: ${HEAD_SIZE}px;

    & > td {
      flex: 1 1 14.285%; // 100 / 7 = 14.285%

      font-size: 13px;
      font-weight: bold;
      letter-spacing: -0.6px;
      text-align: center;
      color: #bac5d3;
    }
  }
`;
