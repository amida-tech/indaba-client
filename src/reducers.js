import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import * as CommonReducers from './common/reducers';
import { ProjectManagementReducer } from './views/ProjectManagement';
import { CreateProjectWizardReducer } from './views/CreateProjectWizard';

const reducers = {
    nav: CommonReducers.NavReducer,
    settings: CommonReducers.SettingsReducer,
    user: CommonReducers.UserReducer,
    surveys: CommonReducers.SurveysReducer,
    routing: routerReducer,
    project: ProjectManagementReducer,
    projectwizard: CreateProjectWizardReducer,
    form: formReducer,
};

export default combineReducers(reducers);
