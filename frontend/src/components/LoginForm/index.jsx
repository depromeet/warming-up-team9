import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '../TextField';
import SignButton from '../SignButton';
import carrot from '../../static/images/carrot.jpg'
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
    try {
      login({ email, password });
      history.push('/');
    } catch (e) {
      alert('다시 입력해주세요.');
      setEmail('');
      setPassword('');
    }
  }

  return (
    <div className={cx('login-box')}>
      <div className={cx('carrot')}><img src={carrot} alt="carrot" /></div>
      <div className={cx('form-contents')}>
        <TextField
          type="email"
          name="email"
          value={email}
          label="이메일"
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <TextField
          type="password"
          name="password"
          value={password}
          label="비밀번호"
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </div>
      <div className={cx('sign-btn', 'first-btn')} onClick={onFormSubmit}>
        <SignButton
          label="로그인"
        />
      </div>
      <div className={cx('sign-btn')}>
        <Link to='/signup'>
          <SignButton
            label="회원가입"
            col="#0b79ff"
            backCol="#e2edff"
          />
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
