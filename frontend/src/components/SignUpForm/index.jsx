import React from 'react';
import TextField from '../TextField';
import Checkbox from '../Checkbox';
import SignButton from '../SignButton';
import classnames from 'classnames/bind';
import styles from './SignUpForm.module.scss';

const cx = classnames.bind(styles);

const SignUpForm = ({
  onChange,
  onFormSubmit,
  email,
  password,
  checkpassword,
  checked,
  nickname,
  validation,
  // errorCode
}) => {

  // const errorCodeMsg = {
  //   1 : '이미 존재하는 메일입니다.'
  // }
  return (
    <div className={cx('sign-box')}>
      <p>회원가입</p>
      {/* {
        errorCode !== -1 ? 
        <div className={cx('request-error')}>
          {errorCodeMsg[errorCode]}
        </div>
        : 
        null
      } */}
      <div className={cx('form-contents')}>
        <TextField
          type="text"
          name="nickname"
          value={nickname}
          label="닉네임"
          onChange={onChange}
          error={validation.nickname.message}
        />
        <TextField
          type="email"
          name="email"
          value={email}
          label="이메일"
          onChange={onChange}
          error={validation.email.message}
        />
        <TextField
          type="password"
          name="password"
          value={password}
          label="비밀번호"
          onChange={onChange}
          error={validation.password.message}
        />
        <TextField
          type="password"
          name="checkpassword"
          value={checkpassword}
          label="비밀번호 확인"
          onChange={onChange}
          error={validation.checkpassword.message}
        />
        <Checkbox
          name="checked"
          onChange={onChange}
          value={checked}
        />
      </div>
      <div className={cx('sign-btn')} onClick={onFormSubmit}>
        <SignButton
          label="회원가입"
        />
      </div>
    </div>
  );
}

export default SignUpForm;
