import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './containers/Login';
import { createBrowserHistory } from 'history';
import Main from './containers/Main';
import SignUp from './containers/SignUp';

import { withStore } from './stores';
import { checkAuthAction } from './stores/actions';
import { State } from './stores/reducers';

const history = createBrowserHistory({ basename: '/' });

function App() {
  const dispatch = useDispatch();

  const isInitialized = useSelector((state: State) => state.common.isInitialized);
  const showLoading = useSelector((state: State) => state.common.isCheckingAuth);
  const user = useSelector((state: State) => state.common.user);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(checkAuthAction.request());
    }
  }, [isInitialized, dispatch]);

  if (showLoading) {
    // TODO: 로딩 애니메이션 필요
    return <>Loading...</>;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route exact={true} path="/login">
          <Login />
        </Route>
        <Route exact={true} path="/">
          {user != null ? <Main /> : <Redirect to="/login" />}
        </Route>
        <Route exact={true} path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default withStore(App);

