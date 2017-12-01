import * as requests from './requests';
import config from '../../config';

const rootURI = config.SURVEY_API_HTTP_URL;

const surveys = {
    getSurveys: (callback) => { // Coming soon.
        requests.apiTokenGetRequest(`${rootURI}/surveys?status=all`, callback);
    },
    postSurvey: (requestBody, callback) => {
        requests.apiTokenPostRequest(`${rootURI}/surveys`, requestBody, callback);
    },
    patchSurvey: (surveyId, requestBody, callback) => {
        requests.apiTokenPatchRequest(`${rootURI}/surveys/${surveyId}`, requestBody, callback);
    },
    getSurveyById: (surveyId, callback) => {
        requests.apiTokenGetRequest(`${rootURI}/surveys/${surveyId}`, callback);
    },
    getAssessment: (callback) => {
        requests.apiTokenGetRequest(`${rootURI}/assessments`, callback);
    },
    getAssessmentAnswersStatus: (id, callback) => {
        requests.apiTokenGetRequest(`${rootURI}/assessment-answers/${id}/status`, callback);
    },
    postAssessment: (requestBody, callback) => {
        requests.apiTokenPostRequest(`${rootURI}/assessments`, requestBody, callback);
    },
    getAnswers: (assessmentId, callback) => {
        requests.apiTokenGetRequest(`${rootURI}/assessment-answers/${assessmentId}`, callback);
    },
    postAnswer: (assessmentId, requestBody, callback) => {
        requests.apiTokenPostRequest(`${rootURI}/assessment-answers/${assessmentId}`, requestBody, callback);
    },
    copyAnswers: (assessmentId, requestBody, callback) => {
        requests.apiTokenPostRequest(`${rootURI}/assessment-answers/${assessmentId}/as-copy`, requestBody, callback);
    },
};

export default surveys;
