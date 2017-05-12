import * as CommonReducers from './common/reducers';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const reducers = {
    nav: CommonReducers.NavReducer,
    settings: CommonReducers.SettingsReducer,
    routing: routerReducer
};

export default combineReducers(reducers);
