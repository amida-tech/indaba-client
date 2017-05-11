import * as CommonReducers from './common/reducers';
import SettingsReducer from './views/Workflow'
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

console.log("Does SettingsReducer exist in the reducers.js?");
console.log(SettingsReducer);

const Reducers = {
    nav: CommonReducers.NavReducer,
    settings: SettingsReducer,
    routing: routerReducer
};

export default combineReducers(Reducers);
