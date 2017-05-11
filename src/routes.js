import { WorkflowContainer } from './views/Workflow/components';

console.log("Does workflow Container exist in routes?");
console.log(WorkflowContainer);

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
