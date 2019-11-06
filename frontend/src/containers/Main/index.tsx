import styled from '@emotion/styled';
import React from 'react';
import AllTasks from '../AllTasks';
import Calendar from '../Calendar';
import Today from '../Today';
import TodayTask from '../TodayTask';

export default function Main() {
  return (
    <Wrapper>
      <Grid>
        <GridCell column="1 / 4" row="1 / 6">
          <Today />
        </GridCell>
        <GridCell column="4 / 6" row="1 / 10">
          <AllTasks />
        </GridCell>
        <GridCell column="1 / 4" row="6 / 19">
          <TodayTask />
        </GridCell>
        <GridCell column="4 / 6" row="10 / 19">
          <Calendar />
        </GridCell>
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px 48px;
  background-color: #f7f8fc;
  box-sizing: border-box;
  overflow: hidden;
`;

const Grid = styled.div`
  box-sizing: border-box;
  display: grid;
  width: 100%;
  max-width: 1184px;
  margin: 0 auto;
  height: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(18, 1fr);
  grid-gap: 16px;
`;

const GridCell = styled.div<{ column?: string; row?: string }>`
  ${props => (props.column ? `grid-column: ${props.column}` : '')};
  ${props => (props.column ? `grid-row: ${props.row}` : '')};
`;
