import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { LOCATION_CHANGE, syncHistoryWithStore, routerMiddleware, routerActions } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
