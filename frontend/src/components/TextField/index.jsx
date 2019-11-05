import React, { Fragment } from 'react';
import classnames from 'classnames/bind';
import styles from './TextField.module.scss';
const cx = classnames.bind(styles);

const TextField = ({ label, value, error, ...rest }) => {
  return (
    <div className={cx('label-input')}>
      {
        error === '' || error === undefined ?
          <Fragment>
            <div className={cx('label')}>{label}</div>
            <input value={value} {...rest} />
          </Fragment>
          :
          <Fragment>
            <div className={cx('error')}>{error}</div>
            <div className={cx('label')}>{label}</div>
            <input className={cx('err-border')} value={value} {...rest} />
          </Fragment>
      }
    </div>
  )
}

export default TextField;