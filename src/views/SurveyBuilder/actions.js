import * as actionTypes from './actionTypes';

export function updateInstructions(instructions) {
    return {
        type: actionTypes.SURVEY_BUILDER_UPDATE_INSTRUCTIONS,
        instructions,
    };
}

export function insertQuestion(sectionIndex, question) {
    return {
        type: actionTypes.SURVEY_BUILDER_INSERT_QUESTION,
        sectionIndex,
        question,
    };
}

export function updateQuestion(sectionIndex, question) {
    return {
        type: actionTypes.SURVEY_BUILDER_UPDATE_QUESTION,
        sectionIndex,
        question,
    };
}
