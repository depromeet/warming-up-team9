import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './reducers';

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
  const store = createStore(rootReducer, undefined, withDevTools());

  function ComponentWithStore({ ...props }) {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  }

  return ComponentWithStore;
}
