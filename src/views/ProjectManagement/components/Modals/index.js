import React, { Component } from 'react';
import AddSubject from './AddSubject';
import StatusChange from './StatusChange';

const modalIDToComponent = {
  addsubject: {
    component: AddSubject
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
  PROJECT_STATUS_MODAL: 'projectstatuschange',
  SURVEY_STATUS_MODAL: 'surveystatuschange'
}

export default ModalContent;
