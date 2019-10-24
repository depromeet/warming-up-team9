import React from 'react';
import styles from './Button.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles); 

const Button = () => { 
  return(
    <button className={cx('btn')}>버튼</button>
  )

}

export default Button;