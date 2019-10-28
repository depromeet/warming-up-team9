import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './containers/Login';
import { createBrowserHistory } from 'history';
import Main from './containers/Main';
import { checkAuthAction } from './stores/actions';
import { withStore } from './stores';

const history = createBrowserHistory({ basename: '/' });

function App() {
  const dispatch = useDispatch();

  const isInitialized = useSelector(state => state.common.isInitialized);
  const showLoading = useSelector(state => state.common.isCheckingAuth);
  const user = useSelector(state => state.common.user);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(checkAuthAction());
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
      </Switch>
    </Router>
  );
}

export default withStore(App);
