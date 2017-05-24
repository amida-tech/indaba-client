import React, { Component } from 'react';
import AddSubject from './AddSubject';
import ProjectStatusChange from './ProjectStatusChange';

const modalIDToComponent = {
  'addsubject': AddSubject,
  'activate': ProjectStatusChange
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
