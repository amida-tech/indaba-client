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
        requests.apiTokenGetRequest(`${rootURI}/answered-surveys/${surveyId}`, callback);
    },
    postAnswer: (requestBody, callback) => {
        requests.apiTokenPostRequest(`${rootURI}/answers`, requestBody, callback);
    },
};

export default surveys;
