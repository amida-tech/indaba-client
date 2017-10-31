import * as requests from './requests';
import config from '../../config';

const rootURI = config.SURVEY_API_HTTP_URL;

const surveys = {
    getSurveysByIds: (surveyIds, callback) => {
        requests.apiTokenPostRequest(`${rootURI}/surveys-by-ids?status=all`, surveyIds, callback);
    },
    getSurveys: (callback) => { // Coming soon.
        requests.apiTokenGetRequest(`${rootURI}/surveys?status=all`, callback);
    },
};

export default surveys;
