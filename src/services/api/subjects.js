import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const subjects = {
    getSubjects: () => requests.apiGetRequest(getFullPath('uoas')),
    deleteSubject: id => requests.apiDeleteRequest(getFullPath(`uoas/${id}`), {}),
};

export default subjects;
