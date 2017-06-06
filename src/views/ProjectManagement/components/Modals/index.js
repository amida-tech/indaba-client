import React, { Component } from 'react';
import AddSubject from './AddSubject';
import AddStage from './AddStage';
import TaskView from './TaskView';
import StatusChange from './StatusChange';
import CreateNewProject from './CreateNewProject';
import NewProjectTitle from './NewProjectTitle';

const modalIDToComponent = {
    addsubject: {
        component: AddSubject,
    },
    addstage: {
        component: AddStage,
    },
    taskview: {
        component: TaskView,
    },
    projectstatuschange: {
        component: StatusChange,
        props: {
            entity: 'project',
        },
    },
    surveystatuschange: {
        component: StatusChange,
        props: {
            entity: 'survey',
        },
    },
    createnewproject: {
        component: CreateNewProject,
    },
    newprojecttitle: {
        component: NewProjectTitle,
    },
};

class ModalContent extends Component {

    render() {
        const ContentComponent = modalIDToComponent[this.props.id].component;
        return (
            <ContentComponent {...this.props} {...modalIDToComponent[this.props.id].props}/>
        );
    }
}

export const modalIDs = {
    ADD_SUBJECT_MODAL: 'addsubject',
    ADD_STAGE_MODAL: 'addstage',
    TASK_VIEW_MODAL: 'taskview',
    PROJECT_STATUS_MODAL: 'projectstatuschange',
    SURVEY_STATUS_MODAL: 'surveystatuschange',
    CREATE_NEW_PROJECT: 'createnewproject',
    NEW_PROJECT_TITLE: 'newprojecttitle',
};


export default ModalContent;
