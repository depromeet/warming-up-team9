import React, { Component } from 'react';
import classnames from 'classnames/bind';
import styles from './SignUpForm.module.scss';

const cx = classnames.bind(styles);

class SignUpForm extends Component {
  render() {
    return <div className={cx('sign-box')}>SignUpForm</div>;
  }
}

export default SignUpForm;