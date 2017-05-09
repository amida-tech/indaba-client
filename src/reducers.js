import * as CommonReducers from './common/reducers';
import { combineReducers } from 'redux';

const Reducers = {
    nav: CommonReducers.NavReducer,
    settings: CommonReducers.SettingsReducer
};

export default combineReducers(Reducers);
