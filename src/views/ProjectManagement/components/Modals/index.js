import React, { Component } from 'react';
import AddSubject from './AddSubject';
import AddStage from './AddStage';

const modalIDToComponent = {
  'addsubject': AddSubject,
  'addstage': AddStage
import StatusChange from './StatusChange';

const modalIDToComponent = {
  addsubject: {
    component: AddSubject,
  },
  projectstatuschange: {
    component: StatusChange,
    props: {
      tab: 'project'
    }
  },
  surveystatuschange: {
    component: StatusChange,
    props: {
      tab: 'survey'
    }
  }
>>>>>>> develop
};

class ModalContent extends Component {
  render() {
    const ContentComponent = modalIDToComponent[this.props.id].component;
    return (
        <ContentComponent {...this.props} {...modalIDToComponent[this.props.id].props}/>
    )
  }
}

export const modalIDs = {
  ADD_SUBJECT_MODAL: 'addsubject',
<<<<<<< HEAD
  ADD_STAGE_MODAL: 'addstage'
=======
  PROJECT_STATUS_MODAL: 'projectstatuschange',
  SURVEY_STATUS_MODAL: 'surveystatuschange'
>>>>>>> develop
}

export default ModalContent;
