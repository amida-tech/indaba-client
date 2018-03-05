import * as requests from './requests';
import config from '../../config';

const rootURI = config.SURVEY_API_URL;

const surveys = {
    getSurveys: () =>
        requests.apiGetRequest(`${rootURI}/surveys?status=all`),
    postSurvey: requestBody =>
        requests.apiPostRequest(`${rootURI}/surveys`, requestBody),
    patchSurvey: (surveyId, requestBody) =>
        requests.apiPatchRequest(`${rootURI}/surveys/${surveyId}`, requestBody),
    getSurveyById: (surveyId, callback) => {
        requests.apiGetRequest(`${rootURI}/surveys/${surveyId}`, callback);
    },
    getAssessment: (callback) => {
        requests.apiGetRequest(`${rootURI}/assessments`, callback);
    },
    getAssessmentAnswersStatus: (id, callback) => {
        requests.apiGetRequest(`${rootURI}/assessment-answers/${id}/status`, callback);
    },
    postAssessment: (requestBody, callback) => {
        requests.apiPostRequest(`${rootURI}/assessments`, requestBody, callback);
    },
    getAnswers: (assessmentId, callback) => {
        requests.apiGetRequest(`${rootURI}/assessment-answers/${assessmentId}`, callback);
    },
    postAnswer: (assessmentId, requestBody, callback) => {
        requests.apiPostRequest(`${rootURI}/assessment-answers/${assessmentId}`, requestBody, callback);
    },
    copyAnswers: (assessmentId, requestBody, callback) => {
        requests.apiPostRequest(`${rootURI}/assessment-answers/${assessmentId}/as-copy`, requestBody, callback);
    },
    postFile: (file, filename) =>
        requests.multipartFormDataPostRequest(`${rootURI}/files`, { file, filename }),
};

export default surveys;
