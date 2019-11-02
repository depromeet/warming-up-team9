import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from '../TextField';
import Button from '../Button';
import classnames from 'classnames/bind';
import styles from './LoginForm.module.scss';

const cx = classnames.bind(styles);

class LoginForm extends Component {
  render() {
    return( 
      <div className={cx('login-box')}>
        <p>짜요짜요</p>
        <div className={cx('form-contents')}>
          <TextField
            name="id"
            label="이메일"
          />
          <TextField
            name="password"
            label="비밀번호"
          />
        </div>
        <div className={cx('sign-btn')}>
          <Button 
            children = "로그인"
          />
        </div>
        <span className={cx('sign-link')}>
          <Link to='/signup'>혹은 회원가입</Link>
        </span>
      </div>
    );
  }
}

export default LoginForm;
