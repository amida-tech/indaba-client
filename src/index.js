/* eslint-disable */
// ^ disabling ESLINT errors for stuff we aren't using yet... we will use it in the future.
/** Modules **/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { LOCATION_CHANGE, syncHistoryWithStore, routerMiddleware, routerActions } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router'; // Scaled back to 3.0.2 because of history bug on later versions.
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

/** Developer Tools **/
import ChartMonitor from 'redux-devtools-chart-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import { createLogger } from 'redux-logger';
import { createDevTools, persistState } from 'redux-devtools';
import routes from './routes';

/** User Imports **/
import reducers from './reducers';

const IS_PROD = process.env.NODE_ENV !== 'development';
const NOOP = () => null;
// TODO: Figure out the production/development configuration setup later.


let DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
    fluid={true}
    defaultSize={0}
    defaultIsVisible={true}>
      <LogMonitor />
      <SliderMonitor />
      <ChartMonitor />
  </DockMonitor>
);

const store = createStore(
    reducers,
    compose(
      applyMiddleware(
        routerMiddleware(browserHistory),
        createLogger(),
        thunk
      ),
      DevTools.instrument()
    ) // Middleware
);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => store.getState().routing
});

// const Wrapper = props => {
//     return (<div>
//         <Router history={history}>
//           {routes.map(route =>
//               <Route
//                   key={route.path}
//                   path={route.path}
//                   component={route.component}
//               />
//           )}
//         </Router>
//         <DevTools />
//     </div>);
// };

ReactDOM.render(
    <Provider store={store}>
      <div>
          <Router history={history}>
            {routes.map(route =>
                <Route
                    key={route.path}
                    path={route.path}
                    component={route.component}
                />
            )}
          </Router>
          <DevTools />
      </div>
    </Provider>,
    document.getElementById('root')
);
