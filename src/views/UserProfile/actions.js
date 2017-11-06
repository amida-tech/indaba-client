import * as actionTypes from './actionTypes';
import * as userActions from '../../common/actions/userActions';
import * as projectActions from '../../common/actions/projectActions';

export const getAllProfileData = (userId, projectId, errorMessages) => (dispatch) => {
    dispatch(_getAllProfileData());

    dispatch(userActions.getUsers(errorMessages));

    if (projectId !== undefined) {
        dispatch(projectActions.getProjectById(projectId));
    }
};

const _getAllProfileData = () => ({
    type: actionTypes.GET_ALL_PROFILE_DATA,
});
