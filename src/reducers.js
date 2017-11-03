import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import * as CommonReducers from './common/reducers';
import { LoginReducer } from './views/Login';
import { ProjectManagementReducer } from './views/ProjectManagement';
import { TaskReviewReducer } from './views/TaskReview';
import { CreateProjectWizardReducer } from './views/CreateProjectWizard';
import { PMDashboardReducer } from './views/PMDashboard';
import { UserDashboardReducer } from './views/UserDashboard';
import { MessagesReducer } from './views/Messages';

const reducers = {
    nav: CommonReducers.NavReducer,
    settings: CommonReducers.SettingsReducer,
    user: CommonReducers.UserReducer,
    projects: CommonReducers.ProjectReducer,
    surveys: CommonReducers.SurveysReducer,
    tasks: CommonReducers.TaskReducer,
    discuss: CommonReducers.DiscussReducer,
    messages: MessagesReducer,
    login: LoginReducer,
    routing: routerReducer,
    manager: ProjectManagementReducer,
    taskreview: TaskReviewReducer,
    wizard: CreateProjectWizardReducer,
    form: formReducer,
    pmdashboard: PMDashboardReducer,
    userdashboard: UserDashboardReducer,
};

export default combineReducers(reducers);
