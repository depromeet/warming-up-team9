import React, { Component } from 'react';
import TextField from '../TextField';
import Button from '../Button';
import classnames from 'classnames/bind';
import styles from './SignUpForm.module.scss';

const cx = classnames.bind(styles);

class SignUpForm extends Component {
  render() {
    return (
      <div className={cx('sign-box')}>
        <p>회원가입</p>
        <div className={cx('form-contents')}>
          <TextField
            name="nickname"
            label="닉네임"
          />
          <TextField
            name="e-mail"
            label="이메일"
          />
          <TextField
            name="password"
            label="비밀번호"
          />
          <TextField
            name="confirm-password"
            label="비밀번호 재입력"
          />
          <div className={cx('assent')}>
            <input type="checkbox" className={cx('check-box')} />
            <span>회원가입 조항에 동의하십니까?</span>
          </div>
        </div>
        <div className={cx('sign-btn')}>
          <Button 
            children = "회원가입"
          />
        </div>
      </div>
    );
  }
}

export default SignUpForm;
