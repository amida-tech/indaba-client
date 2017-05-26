import React, { Component } from 'react';
import AddSubject from './AddSubject';
import AddStage from './AddStage';

const modalIDToComponent = {
  'addsubject': AddSubject,
  'addstage': AddStage
};

class ModalContent extends Component {
  render() {
    const ContentComponent = modalIDToComponent[this.props.id];
    return (
        <ContentComponent {...this.props}/>
    )
  }
}

export const modalIDs = {
  ADD_SUBJECT_MODAL: 'addsubject',
  ADD_STAGE_MODAL: 'addstage'
}

export default ModalContent;
