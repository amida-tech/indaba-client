import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
import ProtectedRoute from './ProtectedRoute';
import PrivateRoute from './PrivateRoute';
import Inbox from './views/Messages/Inbox/components/Inbox';
import MessageContainer from './views/Messages/Message/components';
import Activate from './views/Activate/components';
import ResetPassword from './views/ResetPassword/components';

export default (
    <div>
        <Switch>
            <ProtectedRoute path='/project'
                exact
                component={PMDashboard}/>
            <ProtectedRoute path='/project/:projectId'
                exact
                component={ProjectManagementContainer}/>
        </Switch>
        <Switch>
            <PrivateRoute path='/task'
                exact
                component={UserDashboard}/>
            <PrivateRoute path='/task/:userId'
                component={UserDashboard}/>
        </Switch>
        <Switch>
            <Route path='/login'
                exact
                component={LoginContainer}/>
            <Route path='/login/:realm'
                component={LoginContainer}/>
        </Switch>
        <MessagesContainer>
            <Switch>
                <PrivateRoute path='/messages/new'
                    exact
                    component={MessageContainer}/>
                <PrivateRoute path='/messages/:id'
                    exact
                    component={MessageContainer}/>
                <PrivateRoute path='/messages'
                    exact
                    component={Inbox}/>
            </Switch>
        </MessagesContainer>
        <PrivateRoute path='/profile'
            component={ProfileContainer}/>
        <PrivateRoute path='/task-review/:projectId/:taskId'
            component={TaskReview}/>
        <ProtectedRoute path='/create-new-project'
            component={CreateProjectWizard}/>
        <ProtectedRoute path='/users'
            component={PMAllUsersContainer}/>
        <ProtectedRoute path='/subjects'
            component={PMAllSubjectsContainer}/>
        <Route path='/activate/:realm/:token'
            component={Activate} />
        <Route path='/reset-password/:token'
            component={ResetPassword} />
    </div>
);
