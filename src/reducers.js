import * as CommonReducers from './common/reducers';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ProjectManagementReducer } from './views/ProjectManagement';
const reducers = {
    nav: CommonReducers.NavReducer,
    settings: CommonReducers.SettingsReducer,
    routing: routerReducer,
    projectmanagement: ProjectManagementReducer
};

export default combineReducers(reducers);
