import React from 'react';
/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import Button from '../../components/Button'
import Dropdown from '../../components/Dropdown'

export default class CreateTask extends React.Component {
  render() {

    return (<div>
        <h2>환영합니다, 님!</h2>
        <h2>지금 해야 할 일을 추가해볼까요?</h2>
        <Dropdown />
        <div>
            <Button>건너뛸래요</Button>
            <Button>작성완료</Button>
        </div>
    </div>);
  }
}
