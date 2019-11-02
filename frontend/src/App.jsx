import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import Login from './containers/Login';
import { createBrowserHistory } from 'history';
import Main from './containers/Main';
import SignUp from './containers/SignUp';
import { fetchUser } from './remotes/api';
import { withStore } from './stores';
import { selectAuthToken, selectIsCheckingAuth, selectIsCommonInitialized, selectUser } from './stores/selectors';
import { checkAuthRequestAction, checkAuthResponseAction } from './stores/actions';
import Header from './containers/Header';
import styled from '@emotion/styled';
import { HEADER_SIZE } from './containers/Header/sizes';

const history = createBrowserHistory({ basename: '/' });

async function getUserData(authToken) {
  if (!authToken) {
    return null;
  }

  try {
    return await fetchUser();
  } catch {
    return null;
  }
}

function App() {
  const dispatch = useDispatch();

  const isInitialized = useSelector(selectIsCommonInitialized);
  const authToken = useSelector(selectAuthToken);
  const showLoading = useSelector(selectIsCheckingAuth);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(checkAuthRequestAction());

      getUserData(authToken).then(user => {
        if (user == null) {
          dispatch(checkAuthResponseAction({ isAuthenticated: false }));
        } else {
          dispatch(checkAuthResponseAction({ isAuthenticated: true, user }));
        }
      });
    }
  }, [authToken, isInitialized, dispatch]);

  if (showLoading) {
    // TODO: 로딩 애니메이션 필요
    return <>Loading...</>;
  }

  return (
    <Router history={history}>
      <Wrapper>
        <Header user={user} />
        <Content>
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
        </Content>
      </Wrapper>
    </Router>
  );
}

export default withStore(App);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.main`
  position: relative;
  display: block;
  width: 100%;
  height: calc(100% - ${HEADER_SIZE}px);
`;

