import React, { Fragment } from 'react';
import LoginForm from '../../components/LoginForm';
import Hero from '../../components/Hero';

const Login = () => {
    return (
      <Fragment>
        <LoginForm />
        <Hero />
      </Fragment>
    );
}

export default Login;
