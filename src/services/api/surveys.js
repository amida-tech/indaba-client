import * as requests from './requests';
// import getFullPath from '../../utils/getFullPath';
// You will need to change getFullPath to instead call the microservice.

const surveys = {
    getSurvey: (projectId, callback) => {
        requests.apiGetRequest(`surveys/JAMESISGUESSING/${projectId}`, callback);
    },
};

export default surveys;
