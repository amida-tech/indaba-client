import { get, flatten } from 'lodash';

export const questionListLengthFromSurvey = (section) => {
    return get(section, 'questions.length', 0)
        + (section.sections || []).reduce(
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

export const renderPermissions = (stage) => {
    if (stage.blindReview) {
        return 1;
    } if (stage.discussionParticipation) {
        return 2;
    } if (stage.allowEdit) {
        return 3;
    }
    return 0;
};
