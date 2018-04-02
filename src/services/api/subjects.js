import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const subjects = {
    getSubjects: () => requests.apiGetRequest(getFullPath('uoas')),
    deleteSubject: (id, callback) => {
        requests.apiDeleteRequest(getFullPath(`uoas/${id}`), {}, callback);
    },
};

export default subjects;
