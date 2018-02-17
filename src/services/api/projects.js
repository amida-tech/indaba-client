import uuid from 'uuid/v4';

import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const projects = {
    getProjects: () => requests.apiGetRequest(getFullPath('projects')),
    getProjectById: projectId => requests.apiGetRequest(getFullPath(`projects/${projectId}`)),
    postProject: requestBody => requests.apiPostRequest(getFullPath('projects'), requestBody),
    putProject: (projectId, requestBody) => requests.apiPutRequest(getFullPath(`projects/${projectId}`), requestBody),
    putSurveyToProduct: (productId, requestBody, callback) => {
        requests.apiPutRequest(getFullPath(`products/${productId}`), requestBody, callback);
    },
    postUOA: requestBody => requests.apiPostRequest(getFullPath('uoas'), requestBody),
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
    putGroup: (groupId, requestBody, callback) => {
        requests.apiPutRequest(getFullPath(`groups/${groupId}`), requestBody, callback);
    },
    deleteGroup: (groupId, callback) => {
        requests.apiDeleteRequest(getFullPath(`groups/${groupId}`), {}, callback);
    },
    putWorkflowSteps: (workflowId, requestBody) =>
        requests.apiPutRequest(getFullPath(`workflows/${workflowId}/steps`), requestBody),
    deleteWorkflowStep: stepId =>
        requests.apiDeleteRequest(getFullPath(`workflows/${stepId}/steps`), {}),
    editSurvey: (surveyId) => {
        requests.apiPutRequest(getFullPath(`projects/survey/${surveyId}`), {}, () => null);
    },
    exportData: (productId, callback) => {
        requests.apiGetRequest(getFullPath(`products/${productId}/export.csv`), callback);
    },
    postFileToAws: (file, callback) => {
        const filename = `${file.name}_${uuid()}`;
        requests.apiGetRequest(`${getFullPath('sign-s3')}?file-name=${filename}&file-type=${file.type}`,
        (urlErr, { signedRequest, url }) => {
            if (!urlErr) {
                requests.putObjectRequest(file, signedRequest,
                    (putErr) => {
                        if (!putErr) {
                            callback(null, { url, filename });
                        } else {
                            callback(putErr);
                        }
                    });
            } else {
                callback(urlErr);
            }
        });
    },
    // deleteWorkflows: (workflowsId, callback) => {
    //     requests.apiDeleteRequest(getFullPath(`workflows/${workflowsId}/`), null, callback);
    // },
};

export default projects;
