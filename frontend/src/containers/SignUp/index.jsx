import React, { Fragment } from 'react';
import SignUpForm from '../../components/SignUpForm';
import Hero from '../../components/Hero';

const SignUp = () => {
  return (
    <Fragment>
      <SignUpForm />
      <Hero />
    </Fragment>
  );
}

export default SignUp;