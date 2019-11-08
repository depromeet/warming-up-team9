import React, { useState } from "react";
import { connect } from "react-redux";
import LoginForm from '../../components/LoginForm';
import * as authAction from '../../stores/actions/auth';

const LoginFormContainer = ({ history }) => {
  const [user, setUser] = useState(null);

  const login = ({ email, password }) => setUser(
    authAction.loginUserAPI({ email, password })
  );

  return (
    <LoginForm
      login={login}
      history={history}
    />
  );
};

const mapStateToProps = state => ({
  status: state.auth.loginStatus,
  // errorCode : state.auth.login.error
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer);
