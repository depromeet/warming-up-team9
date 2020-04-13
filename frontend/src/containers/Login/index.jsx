import React, { Fragment } from 'react';
import LoginFormContainer from './LoginFormContainer';
import Hero from '../../components/Hero';

const Login = () => {
  return (
    <Fragment>
      <LoginFormContainer />
      <Hero
        back={true}
      />
    </Fragment>
  );
}

export default Login;
