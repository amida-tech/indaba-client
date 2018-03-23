import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginContainer } from './views/Login';
import { ProfileContainer } from './views/Profile';
import { ProjectManagementContainer } from './views/ProjectManagement';
import { CreateProjectWizard } from './views/CreateProjectWizard';
import { TaskReview } from './views/TaskReview';
import { PMDashboard } from './views/PMDashboard';
import { UserDashboard } from './views/UserDashboard';
// import { MessagesContainer } from './views/Messages';
import { PMAllUsersContainer } from './views/PMAllUsers';
import { PMAllSubjectsContainer } from './views/PMAllSubjects';
// import { PrivateRoute } from './PrivateRoute';
// import Inbox from './views/Messages/Inbox/components/Inbox';
// import MessageContainer from './views/Messages/Message/components';
import Activate from './views/Activate/components';
import ResetPassword from './views/ResetPassword/components';

export default (
    <div>
        <Switch>
            <Route path='/project'
                exact
                component={PMDashboard}/>
            <Route path='/project/:projectId'
                exact
                component={ProjectManagementContainer}/>
        </Switch>
        <Route path='/profile'
            component={ProfileContainer}/>
        <Route path='/task(/:userId)'
            component={UserDashboard}/>
        <Route path='/task-review/:projectId/:taskId'
            component={TaskReview}/>
        <Switch>
            <Route path='/login'
                component={LoginContainer}/>
            <Route path='/login/:realm'
                component={LoginContainer}/>
        </Switch>
        <Route path='/create-new-project'
            component={CreateProjectWizard}/>
        <Route path='/users'
            component={PMAllUsersContainer}/>
        <Route path='/subjects'
            component={PMAllSubjectsContainer}/>

        <Route path='/activate/:realm/:token'
            component={Activate} />
        <Route path='/reset-password/:token'
            component={ResetPassword} />
    </div>
);

// New Inbox:
// <Switch>
//     <Route path='/messages'
//         component={MessagesContainer}/>
//     <Route path='new'
//         component={MessageContainer}/>
//     <Route path=':id'
//         component={MessageContainer}/>
//     <Route component={Inbox}/>
// </Switch>

// <Route
//     path='/messages'
//     component={MessagesContainer}
//     indexRoute={Inbox}>
//     <IndexRoute component={Inbox}/>
//     <Route
//         path='new'
//         component={MessageContainer}/>
//     <Route
//         path=':id'
//         component={MessageContainer}/>
// </Route>
