import React, { Fragment } from 'react';
import SignUpFormContainer from './SignUpFormContainer';
import Hero from '../../components/Hero';

const SignUp = () => {
  return (
    <Fragment>
      <SignUpFormContainer />
      <Hero
        back = { false }
      />
    </Fragment>
  );
}

export default SignUp;
