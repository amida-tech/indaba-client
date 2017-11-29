import * as actionTypes from './actionTypes';

// Form/data related.
export function updateInstructions(instructions) {
    return {
        type: actionTypes.SURVEY_BUILDER_UPDATE_INSTRUCTIONS,
        instructions,
    };
}

export function insertSection(tempName) {
    return {
        type: actionTypes.SURVEY_BUILDER_INSERT_SECTION,
        tempName,
    };
}

// Only name for now until we add instructions per each section?
export function updateSection(sectionIndex, name) {
    return {
        type: actionTypes.SURVEY_BUILDER_UPDATE_SECTION,
        sectionIndex,
        name,
    };
}

export function insertQuestion(sectionIndex, question) {
    return {
        type: actionTypes.SURVEY_BUILDER_INSERT_QUESTION,
        sectionIndex,
        question,
    };
}

export function updateQuestion(sectionIndex, questionIndex, field, value) {
    return {
        type: actionTypes.SURVEY_BUILDER_UPDATE_QUESTION,
        sectionIndex,
        questionIndex,
        field,
        value,
    };
}

export function updateMeta(sectionIndex, questionIndex, field, value) {
    return {
        type: actionTypes.SURVEY_BUILDER_UPDATE_META,
        sectionIndex,
        questionIndex,
        field,
        value,
    };
}

export function resetMeta(sectionIndex, questionIndex, field) {
    return {
        type: actionTypes.SURVEY_BUILDER_RESET_META,
        sectionIndex,
        questionIndex,
        field,
    };
}

export function deleteQuestion(sectionIndex, questionIndex) {
    return {
        type: actionTypes.SURVEY_BUILDER_DELETE_QUESTION,
        sectionIndex,
        questionIndex,
    };
}

export function moveUpQuestion(sectionIndex, questionIndex, errorMessages) {
    return {
        type: actionTypes.SURVEY_BUILDER_MOVE_UP_QUESTION,
        sectionIndex,
        questionIndex,
        errorMessages,
    };
}

export function moveDownQuestion(sectionIndex, questionIndex, errorMessages) {
    return {
        type: actionTypes.SURVEY_BUILDER_MOVE_DOWN_QUESTION,
        sectionIndex,
        questionIndex,
        errorMessages,
    };
}
