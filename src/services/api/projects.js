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
    putProject: (projectId, requestBody, callback) => {
        requests.apiPutRequest(getFullPath(`projects/${projectId}`), requestBody, callback);
    },
    putSurveyToProduct: (productId, requestBody, callback) => {
        requests.apiPutRequest(getFullPath(`products/${productId}`), requestBody, callback);
    },
    postUOA: (requestBody, callback) => { // For time being, we don't delete these.
        requests.apiPostRequest(getFullPath('uoas'), requestBody, callback);
    },
    deleteUOA: (uoaId, requestBody, callback) => {
        requests.apiDeleteRequest(getFullPath(`uoas/${uoaId}`), requestBody, callback);
    },
    postProductUOA: (productId, requestBody, callback) => {
        requests.apiPostRequest(getFullPath(`products/${productId}/uoa`), requestBody, callback);
    },
    postProjectUsers: (projectId, requestBody, callback) => {
        requests.apiPostRequest(getFullPath(`projects/${projectId}/users`), requestBody, callback);
    },
    deleteProjectUsers: (projectId, userId, callback) => {
        requests.apiDeleteRequest(getFullPath(`projects/${projectId}/users/${userId}`), null, callback);
    },
    postGroup: (organizationId, requestBody, callback) => {
        requests.apiPostRequest(getFullPath(`organizations/${organizationId}/groups`), requestBody, callback);
    },
    deleteGroup: (groupId, callback) => {
        requests.apiDeleteRequest(getFullPath(`groups/${groupId}`), {}, callback);
    },
    putWorkflowSteps: (workflowId, requestBody, callback) => { // Step Groups are part of this.
        requests.apiPutRequest(getFullPath(`workflows/${workflowId}/steps`), requestBody, callback);
    },
    // deleteWorkflows: (workflowsId, callback) => {
    //     requests.apiDeleteRequest(getFullPath(`workflows/${workflowsId}/`), null, callback);
    // },
};

export default projects;
