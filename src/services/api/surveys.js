import * as requests from './requests';
import config from '../../config';

const rootURI = config.SURVEY_API_HTTP_URL;

const surveys = {
    getSurveys: (surveyIds, callback) => {
        requests.apiTokenPostRequest(`${rootURI}/surveys-by-ids`, surveyIds, callback);
    },
    getSurveyById: (surveyId, callback) => { // Coming soon.
        requests.apiGetRequest(`${rootURI}/`, callback);
    },
};

export default surveys;
