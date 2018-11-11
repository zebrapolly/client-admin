import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import appReduser from './redusers/clientLogs';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware();
//@ts-ignore

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  appReduser,
  composeEnhancers(
    applyMiddleware(epicMiddleware)
  )
);
epicMiddleware.run(rootEpic)

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
