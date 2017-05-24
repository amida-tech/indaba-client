import React, { Component } from 'react';
import AddSubject from './AddSubject';
import StatusChange from './StatusChange';

const modalIDToComponent = {
  'addsubject': AddSubject,
  'statuschange': StatusChange
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
  ADD_SUBJECT_MODAL: 'addsubject'
}

export default ModalContent;
