import { get, flatten } from 'lodash';

export const questionListLengthFromSurvey = (section) => {
    return get(section, 'questions.length', 0) +
        (section.sections || []).reduce(
            (acc, current) => questionListLengthFromSurvey(current) + acc,
            0,
        );
};

export const questionListFromSurvey = (section) => {
    return [
        ...get(section, 'questions', []),
        ...flatten((section.sections || [])
        .map(sectionIter => questionListFromSurvey(sectionIter))),
    ];
};

export const renderPermissions = (stage, permissionArray) => {
    if (stage.blindReview) {
        return permissionArray[1];
    } else if (stage.discussionParticipation) {
        return permissionArray[2];
    } else if (stage.allowEdit) {
        return permissionArray[3];
    }
    return permissionArray[0];
};
