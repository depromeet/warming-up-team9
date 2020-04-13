import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '../TextField';
import SignButton from '../SignButton';
import carrot from '../../static/images/carrot.jpg';
import classnames from 'classnames/bind';
import styles from './LoginForm.module.scss';
import { login } from '../../remotes/api';
import { generateStorage } from '../../utils';
import { AUTH_TOKEN_STORAGE_KEY } from '../../constants';

const cx = classnames.bind(styles);
const storage = generateStorage();

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = useCallback(async () => {
    try {
      const token = await login(email, password);
      storage.set(AUTH_TOKEN_STORAGE_KEY, token);
      window.location.href = '/';
    } catch (error) {
      alert('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  }, [email, password]);

  return (
    <div className={cx('login-box')}>
      <div className={cx('carrot')}>
        <img src={carrot} alt="carrot" />
      </div>
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
      <div className={cx('sign-btn', 'first-btn')}>
        <SignButton label="로그인" onClick={handleFormSubmit} />
      </div>
      <div className={cx('sign-btn')}>
        <Link to="/signup">
          <SignButton label="회원가입" col="#0b79ff" backCol="#e2edff" />
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
