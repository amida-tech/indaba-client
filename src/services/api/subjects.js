import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const subjects = {
    getSubjects: (callback) => {
        requests.apiGetRequest(getFullPath('uoas'), callback);
    },
    deleteSubject: (id, callback) => {
        requests.apiDeleteRequest(getFullPath(`uoas/${id}`), {}, callback);
    },
};

export default subjects;
