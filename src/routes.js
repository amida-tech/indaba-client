import React from 'react';
import { Route } from 'react-router';
import DashboardContainer from './views/Dashboard';
import LoginContainer from './views/Login';
import { ProjectManagementContainer } from './views/ProjectManagement';
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
            component={ProjectManagementContainer}/>
        <Route
            key='/login'
            path='/login'
            component={LoginContainer}/>
    </Route>
);
