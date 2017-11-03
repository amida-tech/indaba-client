import * as requests from './requests';
import config from '../../config';

const rootURI = config.SURVEY_API_HTTP_URL;

const surveys = {
    getSurveys: (callback) => { // Coming soon.
        requests.apiTokenGetRequest(`${rootURI}/surveys?status=all`, callback);
    },
    getSurveyById: (surveyId, callback) => {
        requests.apiTokenGetRequest(`${rootURI}/surveys/${surveyId}`, callback);
    },
    postSurvey: (requestBody, callback) => {
        requests.apiTokenPostRequest(`${rootURI}/surveys`, requestBody, callback);
    },
    patchSurvey: (surveyId, requestBody, callback) => {
        requests.apiTokenPatchRequest(`${rootURI}/surveys/${surveyId}`, requestBody, callback);
    },
};

export default surveys;
