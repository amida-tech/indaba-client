import DashboardContainer from './views/Dashboard';
import LoginContainer from './views/Login';
import ProjectManagementContainer from './views/ProjectManagement'

export default [
    {
      path: '/',
      title: 'Dashboard',
      transTerm: 'DASHBOARD',
      component: DashboardContainer
    },
    {
      path: '/login',
      title: 'Login',
      transTerm: 'LOGIN',
      component: LoginContainer
    },
    {
        path: '/projectmanager',
        title: 'Project Manager',
        transTerm: 'PROJECTMANAGEMENT',
        component: ProjectManagementContainer
    }
];
