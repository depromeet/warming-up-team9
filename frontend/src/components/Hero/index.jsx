import React from 'react';
import classnames from 'classnames/bind';
import styles from './Hero.module.scss';

const cx = classnames.bind(styles);

const Hero = () => {
  return (
    <div className={cx('back')}></div>
  );
}

export default Hero;
