import React from 'react';
import classnames from 'classnames/bind';
import styles from './Hero.module.scss';

const cx = classnames.bind(styles);

const Hero = ({ back }) => {
  return (
    back == true?
    <div className={cx('back')}></div>
    :
    <div className={cx('back')}>
      <div className={cx('back-contents')}>
        <p>환영합니다</p>
        <span>짜요짜요에서 당신의 일정을 관리하세요</span>
      </div>
    </div>
  );
}

export default Hero;
