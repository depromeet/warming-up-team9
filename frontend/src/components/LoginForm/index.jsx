import React, { Component } from 'react';
import classnames from 'classnames/bind';
import styles from './LoginForm.module.scss';

const cx = classnames.bind(styles);

class LoginForm extends Component {
  render() {
    return <div className={cx('login-box')}>LoginForm</div>;
  }
}

export default LoginForm;
