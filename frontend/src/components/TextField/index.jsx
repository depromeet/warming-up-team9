import React from 'react';
import classnames from 'classnames/bind';
import styles from './TextField.module.scss';
const cx = classnames.bind(styles); 

const TextField = ({ label, value, ...rest }) => { 
  return(
    <div className={cx('label-input')}>
      <div className={cx('label')}>{label}</div>
      <input className={cx('input')} value={value} {...rest}/>
    </div>
  )

}

export default TextField;