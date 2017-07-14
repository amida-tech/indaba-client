import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import * as CommonReducers from './common/reducers';
import { ProjectManagementReducer } from './views/ProjectManagement';
import { TaskReviewReducer } from './views/TaskReview';
import { CreateProjectWizardReducer } from './views/CreateProjectWizard';

const reducers = {
    nav: CommonReducers.NavReducer,
    settings: CommonReducers.SettingsReducer,
    user: CommonReducers.UserReducer,
    projects: CommonReducers.ProjectReducer,
    surveys: CommonReducers.SurveysReducer,
    tasks: CommonReducers.TasksReducer,
    discuss: CommonReducers.DiscussReducer,
    routing: routerReducer,
    manager: ProjectManagementReducer,
    taskreview: TaskReviewReducer,
    projectwizard: CreateProjectWizardReducer,
    form: formReducer,
};

export default combineReducers(reducers);
