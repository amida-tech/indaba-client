import * as CommonReducers from './common/reducers';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ProjectManagementReducer } from './views/ProjectManagement';
import { TaskReviewReducer } from './views/TaskReview';
import { CreateProjectWizardReducer} from './views/CreateProjectWizard';

const reducers = {
    nav: CommonReducers.NavReducer,
    settings: CommonReducers.SettingsReducer,
    user: CommonReducers.UserReducer,
    surveys: CommonReducers.SurveysReducer,
    tasks: CommonReducers.TasksReducer,
    routing: routerReducer,
    project: ProjectManagementReducer,
    taskreview: TaskReviewReducer,
    projectwizard: CreateProjectWizardReducer
};

export default combineReducers(reducers);
