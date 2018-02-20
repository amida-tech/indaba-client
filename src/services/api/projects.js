import uuid from 'uuid/v4';

import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const projects = {
    getProjects: () => requests.apiGetRequest(getFullPath('projects')),
    getProjectById: projectId => requests.apiGetRequest(getFullPath(`projects/${projectId}`)),
    postProject: requestBody => requests.apiPostRequest(getFullPath('projects'), requestBody),
    putProject: (projectId, requestBody) =>
        requests.apiPutRequest(getFullPath(`projects/${projectId}`), requestBody),
    putSurveyToProduct: (productId, requestBody) =>
        requests.apiPutRequest(getFullPath(`products/${productId}`), requestBody),
    postUOA: requestBody => requests.apiPostRequest(getFullPath('uoas'), requestBody),
    deleteUOA: (uoaId, requestBody) =>
        requests.apiDeleteRequest(getFullPath(`uoas/${uoaId}`), requestBody),
    postProjectUsers: (projectId, requestBody) =>
        requests.apiPostRequest(getFullPath(`projects/${projectId}/users`), requestBody),
    deleteProjectUsers: (projectId, userId) =>
        requests.apiDeleteRequest(getFullPath(`projects/${projectId}/users/${userId}`), null),
    postGroup: (organizationId, requestBody) =>
        requests.apiPostRequest(getFullPath(`organizations/${organizationId}/groups`), requestBody),
    putGroup: (groupId, requestBody) =>
        requests.apiPutRequest(getFullPath(`groups/${groupId}`), requestBody),
    deleteGroup: groupId => requests.apiDeleteRequest(getFullPath(`groups/${groupId}`), {}),
    putWorkflowSteps: (workflowId, requestBody) =>
        requests.apiPutRequest(getFullPath(`workflows/${workflowId}/steps`), requestBody),
    deleteWorkflowStep: stepId =>
        requests.apiDeleteRequest(getFullPath(`workflows/${stepId}/steps`), {}),
    editSurvey: surveyId =>
        requests.apiPutRequest(getFullPath(`projects/survey/${surveyId}`), {}),
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
};

export default projects;
