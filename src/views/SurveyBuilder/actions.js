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
