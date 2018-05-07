/** Modules **/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { push, syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { Router, browserHistory } from 'react-router'; // Scaled back to 3.0.2 because of history bug on later versions.
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { get } from 'lodash';

/** Developer Tools **/
import ChartMonitor from 'redux-devtools-chart-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import { createLogger } from 'redux-logger';
import { createDevTools } from 'redux-devtools';

import 'react-infinite-calendar/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-select/dist/react-select.css';
import './styles/main.scss';
import { logOut } from './common/actions/navActions';

/** User Imports **/
import reducers from './reducers';
import routes from './routes';

const DEVELOP = process.env.NODE_ENV === 'development' && !(navigator.userAgent.match('MSIE|Trident/7.0|Edge'));

const authInterceptor = ({ dispatch }) => next => (action) => {
    if (get(action, 'err.response.status') === 401) {
        dispatch(logOut(document.location.pathname));
        dispatch(push('/login'));
    } else {
        next(action);
    }
};

let middleware = [routerMiddleware(browserHistory), thunk, authInterceptor];
if (DEVELOP) {
    middleware = [...middleware, createLogger()];
}

const DevTools = DEVELOP ?
createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
    fluid={true}
    defaultSize={0.2}
    defaultIsVisible={false}>
      <LogMonitor />
      <SliderMonitor />
      <ChartMonitor />
  </DockMonitor>,
) :
null;

const enhancer = DEVELOP ?
compose(applyMiddleware(...middleware), DevTools.instrument()) :
applyMiddleware(...middleware);

const store = createStore(
    reducers,
    enhancer,
);

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: () => store.getState().routing,
});

ReactDOM.render(
    <Provider store={store}>
      <div className="main-page">
          <Router history={history}>
              {routes}
          </Router>
          { DEVELOP && <DevTools /> }
      </div>
    </Provider>,
    document.getElementById('root'),
);
