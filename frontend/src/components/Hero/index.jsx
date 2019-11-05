import React from 'react';
import classnames from 'classnames/bind';
import styles from './Hero.module.scss';
import signIllus from '../../static/images/signIllus.png';
import loginIllus from '../../static/images/loginIllus.png';

const cx = classnames.bind(styles);

const Hero = ({ back }) => {
  return (
    back?
    <div className={cx('back')}>
      <div className={cx('back-contents', 'log-pos')}>
        <img src={loginIllus} alt="sign"/>
        <p>
          <span>환영합니다!</span><br/>
          JJAYO가 당신의 시간관리를 도울거에요
        </p>
      </div>
    </div>
    :
    <div className={cx('back')}>
      <div className={cx('back-contents')}>
        <img src={signIllus} alt="sign"/>
        <p>
          <span>환영합니다!</span><br/>
          JJAYO가 당신의 시간관리를 도울거에요
        </p>
        
      </div>
    </div>
  );
}

export default Hero;
