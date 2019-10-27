import React from 'react';
import classnames from 'classnames/bind';
import styles from './TextField.module.scss';
const cx = classnames.bind(styles); 

const TextField = ({ label, value, required, error, ...rest }) => { 
  return(
    <div className={cx('label-input')}>
      {
        error === '' ?
        null
        : 
        <div className={cx('error')}>{error}</div>
      }
      <div className={cx('label')}>{label}</div>
      <input className={cx('input')} value={value} {...rest}/>
    </div>
  )

}

export default TextField;