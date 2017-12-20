import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import * as CommonReducers from './common/reducers';
import { LoginReducer } from './views/Login';
import { ProjectManagementReducer } from './views/ProjectManagement';
import { TaskReviewReducer } from './views/TaskReview';
import { SurveyBuilderReducer } from './views/SurveyBuilder';
import { CreateProjectWizardReducer } from './views/CreateProjectWizard';
import { PMDashboardReducer } from './views/PMDashboard';
import { UserDashboardReducer } from './views/UserDashboard';
import { MessagesReducer } from './views/Messages';
import { UserProfileReducer } from './views/UserProfile';
import { PMAllUsersReducer } from './views/PMAllUsers';
import { PMAllSubjectsReducer } from './views/PMAllSubjects';

const reducers = {
    nav: CommonReducers.NavReducer,
    settings: CommonReducers.SettingsReducer,
    user: CommonReducers.UserReducer,
    projects: CommonReducers.ProjectReducer,
    surveys: CommonReducers.SurveyReducer,
    tasks: CommonReducers.TaskReducer,
    messages: MessagesReducer,
    login: LoginReducer,
    routing: routerReducer,
    manager: ProjectManagementReducer,
    taskreview: TaskReviewReducer,
    surveybuilder: SurveyBuilderReducer,
    wizard: CreateProjectWizardReducer,
    form: formReducer,
    pmdashboard: PMDashboardReducer,
    userdashboard: UserDashboardReducer,
    userprofile: UserProfileReducer,
    pmallusers: PMAllUsersReducer,
    pmallsubjects: PMAllSubjectsReducer,
};

export default combineReducers(reducers);
