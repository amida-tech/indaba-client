import WorkflowContainer from './views/Workflow';
import LoginContainer from './views/Login';

export default [
    {
      path: '/',
      title: 'Dashboard',
      transTerm: 'DASHBOARD'
    },
    {
      path: '/login',
      title: 'Login',
      transTerm: 'LOGIN',
      component: LoginContainer
    },
    {
        path: '/workflow',
        title: 'Workflow',
        transTerm: 'WORKFLOW',
        component: WorkflowContainer
    }
];
