import * as actionTypes from './actionTypes';

export function changeSectionView(sectionView) {
    return {
        type: actionTypes.SURVEY_BUILDER_CHANGE_SECTION_VIEW,
        sectionView,
    };
}

// Form/data related.
export function updateInstructions(instructions) {
    return {
        type: actionTypes.SURVEY_BUILDER_UPDATE_INSTRUCTIONS,
        instructions,
    };
}

export function insertSection() {
    return {
        type: actionTypes.SURVEY_BUILDER_INSERT_SECTION,
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

export function moveQuestion(sectionIndex, questionIndex, move, errorMessages) {
    return {
        type: actionTypes.SURVEY_BUILDER_MOVE_QUESTION,
        sectionIndex,
        questionIndex,
        move,
        errorMessages,
    };
}

export function deleteQuestion(sectionIndex, questionIndex) {
    return {
        type: actionTypes.SURVEY_BUILDER_DELETE_QUESTION,
        sectionIndex,
        questionIndex,
    };
}

export function upsertChoice(sectionIndex, questionIndex, choiceIndex, value) {
    return {
        type: actionTypes.SURVEY_BUILDER_UPSERT_CHOICE,
        sectionIndex,
        questionIndex,
        choiceIndex,
        value,
    };
}

export function deleteChoice(sectionIndex, questionIndex, choiceIndex) {
    return {
        type: actionTypes.SURVEY_BUILDER_DELETE_CHOICE,
        sectionIndex,
        questionIndex,
        choiceIndex,
    };
}

export function upsertWeight(sectionIndex, questionIndex, choiceIndex, value) {
    return {
        type: actionTypes.SURVEY_BUILDER_UPSERT_WEIGHT,
        sectionIndex,
        questionIndex,
        choiceIndex,
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
