import React from 'react';
import { Route, IndexRoute } from 'react-router';
import DashboardContainer from './views/Dashboard';
import { LoginContainer } from './views/Login';
import { ProfileContainer } from './views/Profile';
import { ProjectManagementContainer } from './views/ProjectManagement';
import { CreateProjectWizard } from './views/CreateProjectWizard';
import { TaskReview } from './views/TaskReview';
import { PMDashboard } from './views/PMDashboard';
import { UserDashboard } from './views/UserDashboard';
import { MessagesContainer } from './views/Messages';
import { PMAllUsersContainer } from './views/PMAllUsers';
import { PMAllSubjectsContainer } from './views/PMAllSubjects';
import Inbox from './views/Messages/Inbox/components/Inbox';
import MessageContainer from './views/Messages/Message/components';
import Activate from './views/Activate/components';
import ResetPassword from './views/ResetPassword/components';
import App from './views/App';

export default (
    <Route
        path='/'
        component={App}
        indexRoute={DashboardContainer}>
        <Route
            path='/project'
            component={PMDashboard}/>
        <Route
            path='/profile'
            component={ProfileContainer}/>
        <Route
            path='/task(/:userId)'
            component={UserDashboard}/>
        <Route
            path='/project/:projectId'
            component={ProjectManagementContainer}/>
        <Route
            path='/task-review/:projectId/:taskId'
            component={TaskReview}/>
        <Route
            path='/login(/:realm)'
            component={LoginContainer}/>
        <Route
            path='/create-new-project'
            component={CreateProjectWizard}/>
        <Route
            path='/users'
            component={PMAllUsersContainer}/>
        <Route
            path='/subjects'
            component={PMAllSubjectsContainer}/>
        <Route
            path='/messages'
            component={MessagesContainer}
            indexRoute={Inbox}>
            <IndexRoute component={Inbox}/>
            <Route
                path='new'
                component={MessageContainer}/>
            <Route
                path=':id'
                component={MessageContainer}/>
        </Route>
        <Route
            path='/activate/:realm/:token'
            component={Activate} />
        <Route
            path='/reset-password/:token'
            component={ResetPassword} />
    </Route>
);
