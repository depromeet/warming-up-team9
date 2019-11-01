import React from 'react';
import Button from '../../components/Button';
import './styles.css';

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    // TODO: 스토어로부터 user.nickname 받기

    // TODO: 백엔드로부터 Task List 받기
    this.state = {
      listItems: [
        '디프만 자소서 완성하기',
        '디프만 신청서 작성하기',
        '워밍업 프로젝트 기획안 작성',
        '워밍업 프로젝트 와이어프레임',
        '워밍업 프로젝트 GUI 디자인',
        '로고 디자인',
        '디프만 보고서 쓰기',
      ],
    };
  }

  render() {
    const tasks = this.state.listItems;

    return (
      <div className="createTask-container">
        <div className="header">
          <span className="header-text">환영합니다, 님!</span>
          <strong className="header-text">지금 해야 할 일을 추가해볼까요?</strong>
        </div>
        <div className="add-task">
            <input
              type={this.props.type}
              name={this.props.name}
              placeholder={this.props.placeholder}
              list="options"
              className="new-task-input"
            />
            <Button onClick={this.props.handleClick} className="add-task-btn">
              추가하기
            </Button>
        </div>
        <ul className="dropdown-list">
            {tasks.map(task => (
                <li className="dropdown-list-item">
                    <span className="item-name">{task}</span>
                    <Button className="delete-task-btn"></Button>
                </li>
            ))}
        </ul>
        <div className="next-btns">
          <Button className="skip-btn">건너뛸래요</Button>
          <Button className="done-btn">작성완료</Button>
        </div>
      </div>
    );
  }
}

CreateTask.defaultProps = {
  type: 'text',
  name: 'input',
  placeholder: '해야할 Task를 적어주세요',
  handleClick: console.log('no handleClick prop passed'),
};
