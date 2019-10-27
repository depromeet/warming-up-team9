import React from 'react';
import TextField from '../TextField';
import Button from '../Button';
import classnames from 'classnames/bind';
import styles from './SignUpForm.module.scss';

const cx = classnames.bind(styles);

const SignUpForm = ({
  onChange,
  onFormSubmit,
  email,
  password,
  nickname,
  validation,
  registerError
}) => {

  const errorMsgAfterReq = {
    1 : '이미 존재하는 메일입니다.',
    2 : '비밀번호가 일상적인 단어입니다.'
  }

  return (
    <div className={cx('sign-box')}>
      <p>회원가입</p>
      {
        registerError !== -1 ? 
        <div className={cx('after-request-error')}>
          {errorMsgAfterReq[registerError]}
        </div>
        : 
        null
      }
      <div className={cx('form-contents')}>
        <TextField
          value={nickname}
          name="nickname"
          required
          label="닉네임"
          onChange={onChange}
          error={validation.nickname.message}
        />
        <TextField
          type="email"
          value={email}
          name="email"
          required
          label="이메일"
          onChange={onChange}
          error={validation.email.message}
        />
        <TextField
          type="password"
          value={password}
          name="password"
          required
          label="비밀번호"
          onChange={onChange}
          error={validation.password.message}
        />
        <TextField
          type="password"
          value={password}
          name="confirm-password"
          required
          label="비밀번호 재입력"
          onChange={onChange}
          error={validation.password.message}
        />
        <div className={cx('assent')}>
          <input type="checkbox" className={cx('check-box')} />
          <span>회원가입 조항에 동의하십니까?</span>
        </div>
      </div>
      <div className={cx('sign-btn')} onClick={onFormSubmit}>
        <Button
          children="회원가입"
        />
      </div>
    </div>
  );
}

export default SignUpForm;
