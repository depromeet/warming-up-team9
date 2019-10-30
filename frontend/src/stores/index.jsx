import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';
import { rootReducer } from './reducers';

const epicMiddleware = createEpicMiddleware();

const id = function(x) {
  return x;
};

const withDevTools = (() => {
  if (process.env.NODE_ENV === 'production' || window === undefined) {
    return id;
  }

  return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || id;
})();

export function withStore(Component) {
  const store = createStore(rootReducer, undefined, withDevTools(applyMiddleware(epicMiddleware)));

  epicMiddleware.run(rootEpic);

  function ComponentWithStore({ ...props }) {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  }

  return ComponentWithStore;
}
