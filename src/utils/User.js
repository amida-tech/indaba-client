import config from '../config';
import apiService from '../services/api';

const SYS_MESSAGE_USER_DISPLAY = 'Indaba';

export const renderNameByEmail = (email, users) => {
    if (email === config.SYS_MESSAGE_USER) {
        return SYS_MESSAGE_USER_DISPLAY;
    }
    const user = users.find(userIter => userIter.email === email);
    return user ? renderName(user) : email;
};

export const renderName = user => (user ? `${user.firstName} ${user.lastName}` : '');
export const renderInitials = user => `${user.firstName.slice(0, 1)}${user.lastName.slice(0, 1)}`;

export const DATA_STATE = {
    HAS_DATA: 'HAS_DATA',
    HAS_TASKS: 'HAS_TASKS',
    NEITHER: 'NEITHER',
};

export const getDataState = (userId, projectId) => {
    return new Promise((resolve, reject) => {
        apiService.tasks.getTasksByUser(userId, (tasksErr, tasks) => {
            if (tasksErr) {
                reject(tasksErr);
            } else {
                const statusPromises = (tasks || [])
                .filter(task => projectId === undefined || task.projectId === projectId)
                .map(task =>
                    new Promise((statusResolve, statusReject) =>
                        apiService.surveys.getAssessmentAnswersStatus(
                            task.assessmentId,
                            (statusErr, statusResponse) =>
                            (statusErr ?
                                statusReject(statusErr) :
                                statusResolve(statusResponse)))));
                if (statusPromises.length > 0) {
                    Promise.all(statusPromises)
                    .then(statuses => statuses.some(status => status.status !== 'new'))
                    .then(hasData => resolve(hasData ?
                        DATA_STATE.HAS_DATA :
                        DATA_STATE.HAS_TASKS))
                    .catch(reject);
                } else {
                    resolve(DATA_STATE.NEITHER);
                }
            }
        });
    });
};
