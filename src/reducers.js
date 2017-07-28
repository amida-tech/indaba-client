import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import * as CommonReducers from './common/reducers';
import { ProjectManagementReducer } from './views/ProjectManagement';
import { TaskReviewReducer } from './views/TaskReview';
import { CreateProjectWizardReducer } from './views/CreateProjectWizard';
import { PMDashboardReducer } from './views/PMDashboard';
import { UserDashboardReducer } from './views/UserDashboard';

const reducers = {
    nav: CommonReducers.NavReducer,
    settings: CommonReducers.SettingsReducer,
    user: CommonReducers.UserReducer,
    projects: CommonReducers.ProjectReducer,
    surveys: CommonReducers.SurveysReducer,
    tasks: CommonReducers.TasksReducer,
    discuss: CommonReducers.DiscussReducer,
    messages: CommonReducers.MessageReducer,
    routing: routerReducer,
    manager: ProjectManagementReducer,
    taskreview: TaskReviewReducer,
    projectwizard: CreateProjectWizardReducer,
    form: formReducer,
    pmdashboard: PMDashboardReducer,
    userdashboard: UserDashboardReducer,
};

export default combineReducers(reducers);
