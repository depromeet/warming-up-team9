import React from 'react';
import classnames from 'classnames/bind';
import styles from './SignButton.module.scss';
const cx = classnames.bind(styles);

const SignButton = ({ label, col, backCol, onClick }) => {
  return (
    <button className={cx('intro-btn')} style={{ color: col, backgroundColor: backCol }} onClick={onClick}>
      {label}
    </button>
  );
};

export default SignButton;
