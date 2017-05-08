import * as CommonReducers from './common/reducers';
import { combineReducers } from 'redux';

const Reducers = {
    nav: CommonReducers.NavReducer
};

export default combineReducers(Reducers);
