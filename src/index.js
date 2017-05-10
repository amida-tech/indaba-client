/* eslint-disable */
// ^ disabling ESLINT errors for stuff we aren't using yet... we will use it in the future.
/** Modules **/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { LOCATION_CHANGE, syncHistoryWithStore, routerMiddleware, routerActions, routerReducer } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router'; // Scaled back to 3.0.2 because of history bug on later versions.
import { createStore, combineReducers } from 'redux';
//import WorkflowContainer from './workflow/components';

/** Developer Tools **/
import ChartMonitor from 'redux-devtools-chart-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import createLogger from 'redux-logger';
import { createDevTools, persistState } from 'redux-devtools';
import routes from './routes';

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
    return (<div>
        <Router history={history}>
            <Route
              path="/workflow"
              component={WorkflowContainer} />
        </Router>
        <App />
        <DevTools />
    </div>);
};

// {routes.map(route =>
//     <Route
//         key={route.path}
//         path={route.path}
//     />
// )}


const store = createStore(
    combineReducers({
      Reducers, // TODO: Come back to and make better.
      routing: routerReducer
    }),
    {}, // Middleware
    DevTools.instrument() // Store Enhancers
);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => store.getState().routing
});

ReactDOM.render(
    <Provider store={store}>
        <Wrapper />
    </Provider>,
    document.getElementById('root')
);
