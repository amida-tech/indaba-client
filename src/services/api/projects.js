import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const projects = {
    getProjects: (callback) => {
        requests.apiGetRequest(getFullPath('projects'), callback);
    },
    postProject: (requestBody, callback) => {
        requests.apiPostRequest(getFullPath('projects'), requestBody, callback);
    },
    postProduct: (requestBody, callback) => {
        requests.apiPostRequest(getFullPath('products'), requestBody, callback);
    },
    postUOA: (requestBody, callback) => { // For time being, we don't delete these.
        requests.apiPostRequest(getFullPath('uoas'), requestBody, callback);
    },
    postProductUOA: (productId, requestBody, callback) => {
        requests.apiPostRequest(getFullPath(`products/${productId}/uoa`), requestBody, callback);
    },
    // deleteProductUOA: (productId, uoaId, callback) => {
    //     requests.apiDeleteRequest(getFullPath(`products/${productId}/uoa/${uoaId}`), callback);
    // },
    postWorkflows: (requestBody, callback) => {
        requests.apiPostRequest(getFullPath('workflows'), requestBody, callback);
    },
    postWorkflowSteps: (workflowsId, requestBody, callback) => { // Step Groups are part of this.
        requests.apiPostRequest(getFullPath(`workflows/${workflowsId}/steps`), requestBody, callback);
    },
    // deleteWorkflows: (workflowsId, callback) => {
    //     requests.apiDeleteRequest(getFullPath(`workflows/${workflowsId}/`), callback);
    // },
};

export default projects;
