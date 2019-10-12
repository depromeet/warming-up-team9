import React from 'react';
import './App.css';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './containers/Login';
import { createBrowserHistory } from 'history';
import Main from './containers/Main';

const history = createBrowserHistory({ basename: '/' });

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact={true} path="/login">
          <Login />
        </Route>
        <Route exact={true} path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}
