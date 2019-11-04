import React, { useState } from "react";
import { connect } from "react-redux";
import LoginForm from '../../components/LoginForm'
import { loginUser } from '../../stores/actions/auth'
import * as authActions from '../../stores/actions/auth'
import { signIn } from '../../remotes/api';

const LoginFormContainer = ({history}) => {
  const [user, setUser] = useState(null);
  const isAuthenticated = user != null;

  const login = ({ email, password }) => setUser(signIn({ email, password }));

  return (
    <LoginForm
      isAuthenticated={isAuthenticated}
      login={login}
      history={history}
    />
  );
};

export default LoginFormContainer;

// const mapStateToProps = state => ({
//   status : state.auth.login.status,
//   errorCode : state.auth.login.error
// }); 

// const mapDispatchToProps = dispatch => ({
//   loginUser: ({ email, password }) => {
//     return dispatch(authActions.loginUser(email, password));
//   }
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(LoginFormContainer);