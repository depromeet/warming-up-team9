import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '../TextField';
import Button from '../Button';
import classnames from 'classnames/bind';
import styles from './LoginForm.module.scss';

const cx = classnames.bind(styles);

const LoginForm = ({ 
  login,
  history
}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = () => {
    try{
      login({ email, password });
      history.push('/');
    } catch (e) {
      alert('다시 입력해주세요.');
      setEmail('');
      setPassword('');
    }
  }

  return( 
    <div className={cx('login-box')}>
      <p>짜요짜요</p>
      <div className={cx('form-contents')}>
        <TextField
          type="email"
          name="email"
          value={email}
          label="이메일"
          onChange={({target: {value}}) => setEmail(value)}
        />
        <TextField
          type="password"
          name="password"
          value={password}
          label="비밀번호"
          onChange={({target: {value}}) => setPassword(value)}
        />
      </div>
      <div className={cx('sign-btn')} onClick={onFormSubmit}> 
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

export default LoginForm;
