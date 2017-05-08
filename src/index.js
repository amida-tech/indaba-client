/* eslint-disable */ 
// ^ disabling ESLINT errors for stuff we aren't using yet... we will use it in the future.
/** Modules **/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { LOCATION_CHANGE, syncHistoryWithStore, routerMiddleware, routerActions } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router';
import { createStore } from 'redux';

/** Developer Tools **/
import ChartMonitor from 'redux-devtools-chart-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import createLogger from 'redux-logger';
import { createDevTools, persistState } from 'redux-devtools';

/** User Imports **/
import Reducers from './reducers';

const IS_PROD = process.env.NODE_ENV !== 'development';
const NOOP = () => null;

let DevTools = IS_PROD ? NOOP : createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
    fluid={true}
    defaultSize={0}
    defaultIsVisible={false}>
      <LogMonitor />
      <SliderMonitor />
      <ChartMonitor />
  </DockMonitor>
);

const Wrapper = props => {
    return <div>
        <App />
        <DevTools />
    </div>
};

const store = createStore(
    Reducers,
    {}, // Middleware
    DevTools.instrument() // Store Enhancers
);



ReactDOM.render(
    <Provider store={store} >
        <Wrapper />
    </Provider>,
    document.getElementById('root')
);
