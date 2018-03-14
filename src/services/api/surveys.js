import * as requests from './requests';
import config from '../../config';

const rootURI = config.SURVEY_API_URL;

const surveys = {
    getSurveys: (callback) => { // Coming soon.
        requests.apiGetRequest(`${rootURI}/surveys?status=all`, callback);
    },
    postSurvey: (requestBody, callback) => {
        requests.apiPostRequest(`${rootURI}/surveys`, requestBody, callback);
    },
    patchSurvey: (surveyId, requestBody, callback) => {
        requests.apiPatchRequest(`${rootURI}/surveys/${surveyId}`, requestBody, callback);
    },
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
