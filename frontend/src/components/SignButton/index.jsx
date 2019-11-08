import React from 'react';
import classnames from 'classnames/bind';
import styles from './SignButton.module.scss';
const cx = classnames.bind(styles);

const SignButton = ({ label, col, backCol }) => {
  return (
    <button style={{ color: col, backgroundColor: backCol }}>
      {label}
    </button>
  )
}

export default SignButton;
