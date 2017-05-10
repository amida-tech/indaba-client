import { WorkflowContainer } from './workflow';

export default [
    {
      path: '/',
      title: 'Dashboard',
      transTerm: 'DASHBOARD'
    },
    {
        path: '/workflow',
        title: 'Workflow',
        transTerm: 'WORKFLOW',
        component: WorkflowContainer
    }
];
