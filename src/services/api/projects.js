import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const projects = {
    getProjects: (callback) => {
        requests.apiGetRequest(getFullPath('projects'), callback);
    },
    getProjectById: (projectId, callback) => {
        requests.apiGetRequest(getFullPath(`projects/${projectId}`), callback);
    },
    postProject: (requestBody, callback) => {
        requests.apiPostRequest(getFullPath('projects'), requestBody, callback);
    },
    postUOA: (requestBody, callback) => { // For time being, we don't delete these.
        requests.apiPostRequest(getFullPath('uoas'), requestBody, callback);
    },
    deleteUOA: (uoaId, callback) => {
        requests.apiDeleteRequest(getFullPath(`uoas/${uoaId}`), callback);
    },
    postProductUOA: (productId, requestBody, callback) => {
        requests.apiPostRequest(getFullPath(`products/${productId}/uoa`), requestBody, callback);
    },
    postProjectUsers: (requestBody, callback) => {
        requests.apiPostRequest(getFullPath('projects/users'), requestBody, callback);
    },
    deleteProjectUsers: (projectId, userId, callback) => {
        requests.apiDeleteRequest(getFullPath(`projects/${projectId}/users/${userId}`), callback);
    },
    postGroup: (organizationId, requestBody, callback) => {
        requests.apiPostRequest(getFullPath(`organizations/${organizationId}/groups`), requestBody, callback);
    },
    putWorkflowSteps: (workflowId, requestBody, callback) => { // Step Groups are part of this.
        requests.apiPutRequest(getFullPath(`workflows/${workflowId}/steps`), requestBody, callback);
    },
    // deleteWorkflows: (workflowsId, callback) => {
    //     requests.apiDeleteRequest(getFullPath(`workflows/${workflowsId}/`), callback);
    // },
};

export default projects;
