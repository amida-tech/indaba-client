import * as CommonReducers from './common/reducers';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ProjectManagementReducer } from './views/ProjectManagement';
import { CreateProjectWizardReducer} from './views/CreateProjectWizard';

const reducers = {
    nav: CommonReducers.NavReducer,
    settings: CommonReducers.SettingsReducer,
    routing: routerReducer,
    project: ProjectManagementReducer,
    projectwizard: CreateProjectWizardReducer
};

export default combineReducers(reducers);
