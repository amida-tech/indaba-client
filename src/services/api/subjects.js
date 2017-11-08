import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const subjects = {
    getSubjects: (callback) => {
        requests.apiGetRequest(getFullPath('uoas'), callback);
    },
};

export default subjects;
