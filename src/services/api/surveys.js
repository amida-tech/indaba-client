import * as requests from './requests';
import config from '../../config';

const rootURI = config.SURVEY_MICROSERVICE_URL;

const surveys = {
    getSurveys: () => requests.apiGetRequest(`${rootURI}/surveys?status=all`),
    postSurvey: requestBody => requests.apiPostRequest(`${rootURI}/surveys`, requestBody),
    patchSurvey: (surveyId, requestBody) => requests.apiPatchRequest(`${rootURI}/surveys/${surveyId}`, requestBody),
    getSurveyById: surveyId => requests.apiGetRequest(`${rootURI}/surveys/${surveyId}`),
    getAssessmentAnswersStatus: id => requests.apiGetRequest(`${rootURI}/assessment-answers/${id}/status`),
    postAssessment: requestBody => requests.apiPostRequest(`${rootURI}/assessments`, requestBody),
    getAnswers: assessmentId => requests.apiGetRequest(`${rootURI}/assessment-answers/${assessmentId}`),
    postAnswer: (assessmentId, requestBody) => requests.apiPostRequest(`${rootURI}/assessment-answers/${assessmentId}`, requestBody),
    postFile: (file, filename) => requests.multipartFormDataPostRequest(`${rootURI}/files`, { file, filename }),
};

export default surveys;
