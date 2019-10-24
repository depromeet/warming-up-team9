import React, { Fragment, Component } from 'react';
import SignUpForm from '../../components/SignUpForm';
import Hero from '../../components/Hero';

class SignUp extends Component {
  render() {
    return (
      <Fragment>
        <SignUpForm />
        <Hero />
      </Fragment>
    );
  }
}

export default SignUp;
