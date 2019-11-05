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
          alert(error)
      }
      <label>
        <input type="checkbox" name="check" checked={value} {...rest}/>
        <span className={cx('label-text')}>{label}</span>
      </label>
    </div>
  )
}

export default Checkbox;
