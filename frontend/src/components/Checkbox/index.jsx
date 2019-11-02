import React from 'react';
import classnames from 'classnames/bind';
import styles from './Checkbox.module.scss';
const cx = classnames.bind(styles);

const Checkbox = ({ label, value, error, ...rest }) => {
  // console.log(value);
  return (
    <div className={cx('check-agree')}>
      {
        error === '' ?
          null
          :
          <div className={cx('error')}>{error}</div>
      }
      <input type="checkbox" value={value} {...rest} />
      <span className={cx('label')}>{label}</span>
    </div>
  )
}

export default Checkbox;