import React from 'react';
import { Route } from 'react-router';
import DashboardContainer from './views/Dashboard';
import { LoginContainer } from './views/Login';
import { ProjectManagementContainer } from './views/ProjectManagement';
import { CreateProjectWizard } from './views/CreateProjectWizard';
import { TaskReview } from './views/TaskReview';
import { PMDashboard } from './views/PMDashboard';
import { UserDashboard } from './views/UserDashboard';
import App from './views/App';

export default (
    <Route
        key='/'
        path='/'
        component={App}
        indexRoute={DashboardContainer}>
        <Route
            key='/project'
            path='/project'
            component={PMDashboard}/>
        <Route
            key='/task(/:userId)'
            path='/task(/:userId)'
            component={UserDashboard}/>
        <Route
            key='/project/:projectId'
            path='/project/:projectId'
            component={ProjectManagementContainer}/>
        <Route
            key='/task-review/:projectId/:taskId'
            path='/task-review/:projectId/:taskId'
            component={TaskReview}/>
        <Route
            key='/login(/:realm)'
            path='/login(/:realm)'
            component={LoginContainer}/>
        <Route
            key='/create-new-project'
            path='/create-new-project'
            component={CreateProjectWizard}/>
    </Route>
);
