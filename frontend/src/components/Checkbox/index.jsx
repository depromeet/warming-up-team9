import React from 'react';
import classnames from 'classnames/bind';
import styles from './Checkbox.module.scss';
import { set } from 'date-fns/esm';
const cx = classnames.bind(styles);

const Checkbox = ({ value, ...rest }) => {
  return (
    <div className={cx('check-agree')}>
      <label>
        <input type="checkbox" value={value} {...rest} />
        <span className={cx('label-text')}>
          회원가입 조항에 동의하십니까?
        </span>
      </label>
    </div>
  );
}

export default Checkbox;
