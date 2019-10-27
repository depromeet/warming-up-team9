import React, { ComponentClass, FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Actions } from './actions';
import { rootEpic } from './epics';
import { rootReducer, State } from './reducers';

const epicMiddleware = createEpicMiddleware<Actions, Actions, State>();

const id = function<T>(x: T) {
  return x;
};

const withDevTools = (() => {
  if (process.env.NODE_ENV === 'production' || window === undefined) {
    return id;
  }

  return (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || id;
})();

export function withStore(Component: ComponentClass | FunctionComponent) {
  const store = createStore(rootReducer, undefined, withDevTools(applyMiddleware(epicMiddleware)));

  epicMiddleware.run(rootEpic);

  function ComponentWithStore({ ...props }: any) {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  }

  return ComponentWithStore;
}
